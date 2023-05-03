import mkcert from 'vite-plugin-mkcert';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig({
    plugins: [mkcert(), ViteMinifyPlugin({})],
    build: {
        emptyOutDir: true,
        outDir: './docs',
        // the service worker cannot control folders above it
        assetsDir: './',
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].[ext]',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    base: './',
    worker: {
        rollupOptions: {
            output: {
                entryFileNames: '[name].js'
            }
        }
    },
    server: {
        https: true,
    },
    define: {
        'process.env.appName': JSON.stringify('fitness-timer'),
        'process.env.appVersion': JSON.stringify(Date.now()),
    }
});