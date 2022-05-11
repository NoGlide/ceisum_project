const { defineConfig } = require('@vue/cli-service');
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        port: 4523, // 启动端口号
    },

    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{
                        from: path.join(cesiumSource, cesiumWorkers),
                        to: 'Workers',
                    },
                    { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                    { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
                ],
            }),
            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                CESIUM_BASE_URL: JSON.stringify(''),
            }),
        ],
    },
});