/* eslint-disable */
/* config-overrides.js */
const path = require('path');
const rewireCssModules = require('react-app-rewire-css-modules');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
// const rewireEslint = require('react-app-rewire-eslint');
const { injectBabelPlugin } = require('react-app-rewired');

function resolve (dir) {
    return path.join(__dirname,dir);
}
const alias = {
    '~img': resolve('src/accets/img'),
    '@basic': resolve('src/style/base.scss'),
    '@': resolve('src')
};

module.exports = function override (config, env) {
    config.resolve.alias = { ...config.resolve.alias, ...alias };
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    // config = rewireEslint(config, env);
    config = rewireCssModules(config, env);
    config = rewireReactHotLoader(config, env);
    return config;
};