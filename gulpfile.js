const {
    src,
    dest,
    parallel
} = require('gulp');
const minifyCSS = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const deployDir = 'docs';

exports.default = parallel(() => serve('src'));
exports.bundle = parallel(html, css, js, pwaAssets);
exports.prelive = parallel(html, css, js, pwaAssets, () => serve(deployDir));

function html() {
    return src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(deployDir));
}

function css() {
    return src('src/style.css')
        .pipe(minifyCSS())
        .pipe(dest(deployDir));
}

function js() {
    return src('src/js/**/*.js')
        .pipe(webpack(webpackConfig))
        .pipe(dest(deployDir));
}

function pwaAssets() {
    src('src/images/*.png')
        .pipe(dest(`${deployDir}/images`));
    return src('src/manifest.json')
        .pipe(dest(deployDir));
}

function serve(dir) {
    const key = fs.readFileSync('ssl/privatekey.key', 'utf8');
    const cert = fs.readFileSync('ssl/certificate.crt', 'utf8');
    const app = express();

    app.use(express.static(dir));

    const httpServer = http.createServer(app);
    const httpsServer = https.createServer({ key, cert }, app);

    httpServer.listen(3000);
    httpsServer.listen(8443);
}