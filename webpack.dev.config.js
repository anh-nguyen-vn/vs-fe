const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api-gateway/**': {
                target: 'http://localhost:9090',
                secure: false
                // changeOrigin: true
            }
        }
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            pubKey: '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCFjOHrK7zBkY9biyIuKj+Ze3ljIXX2wnsuTPCsjQRlXLEGgLTGlqs+Bc+8FrkCmVMeSru0JPv0mXuhB19AdeXQO4jplPeo4hWQkiL/UjtUEbMNN4H/hgQH0yDzIFFPL0LvzqXDZLjq88KL/sfYVBtsXxNYP9naPLdzKCXX574s3QIDAQAB\n-----END PUBLIC KEY-----',
            clientId: 'test_client_id',
            clientSecret: 'test_client_secret',
            youTubeApiKey: 'AIzaSyAJlHbp7lYkcRjQYsPNrfNGwieGMDlxntY'
        })
    }
  });