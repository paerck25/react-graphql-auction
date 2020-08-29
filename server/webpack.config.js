const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
}