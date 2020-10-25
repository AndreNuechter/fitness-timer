const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        main: [
            path.join(__dirname, '/src/main.js')
        ],
        'service-worker': path.join(__dirname, '/src/service-worker.js')
    },
    output: {
        filename: '[name].js'
    }
};