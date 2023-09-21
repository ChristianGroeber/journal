'use strict'

const {merge} = require('webpack-merge')

const baseWebpackConfig = require('./base')
const cssWebpackConfig = require('./css')
const config = require('../project.config')

module.exports = merge(baseWebpackConfig, cssWebpackConfig, {
    mode: 'development',

    devtool: 'eval-cheap-module-source-map',

    devServer: {
        historyApiFallback: {
            rewrites: [{from: /./, to: '/index.html'}],
        },
        devMiddleware: {
            publicPath: config.dev.publicPath,
        },
        open: false,
        host: '0.0.0.0',
        port: config.dev.port,
        liveReload: true,
        proxy: {
            '/api': {
                target: 'http://172.23.162.161:86',
                pathRewrite: {'^/api': '/api'}
            },
            '/media': {
                target: 'http://172.23.162.161:86',
                pathRewrite: {'^/media': '/media'}
            },
            '/backup': {
                target: 'http://172.23.162.161:86',
                pathRewrite: {'^/backup': '/backup'}
            },
        },
    },

    infrastructureLogging: {
        level: 'warn',
    },

    stats: {
        assets: false,
        modules: false,
    },
})
