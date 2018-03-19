var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    REACT_APP_SERVER: '"http://scmp.dev.cloudyigou.com/gateway"',
    REACT_APP_IMAGE_UPLOAD: '"http://scmp.dev.cloudyigou.com/gateway/upload"',
    REACT_APP_IMAGE_DOWNLOAD: '"http://dfs.dev.cloudyigou.com/dfs/"',
    REACT_APP_TITLEURL: '"/app"'
});
