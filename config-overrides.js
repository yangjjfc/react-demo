/* eslint-disable */
/* config-overrides.js */
const path = require('path');
const webpack = require('webpack');
var merge = require('webpack-merge')
const myconfig = require('./config')
const rewireCssModules = require('react-app-rewire-css-modules');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const { injectBabelPlugin } = require('react-app-rewired');

function resolve (dir) {
    return path.join(__dirname,dir);
}
const alias = {
    '~img': resolve('src/assets/img'),
    '~global': resolve('src/utils/custom/global.common.js'),
    '~http': resolve('src/utils/axios'),
    '@basic': resolve('src/style/base.scss'),
    '@': resolve('src')
};

module.exports = function override(config, env) {
  config.resolve.alias = { ...config.resolve.alias, ...alias };
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  config = rewireCssModules(config, env);
  config = rewireReactHotLoader(config, env);
  config.plugins.unshift(new webpack.DefinePlugin({ //添加本地全局配置信息
    'process.env': env === 'development' ? myconfig.dev.env : myconfig.build.env,
  })) 
  return config;
};