
## 添加webpack编译scss功能
npm install sass-loader node-sass --save-dev
(https://www.jianshu.com/p/cf477a7eb48f)


##cerate-react-app 修改webpack基本配置添加更多更能插件

react一般不推荐直接修改官方的webpack配置,而是使用react-app-rewired插件来添加(覆盖)配置。
[react-app-rewired](https://github.com/timarney/react-app-rewired);


1.cnpm install react-app-rewired --save-dev 
2.cnpm install --save-dev codebandits/react-app-rewire-css-modules sass-loader node-sass //sass
3.cnpm install react-app-rewire-hot-loader --save-dev//支持热替换
###If you don't already, you also need:
cnpm install react-app-rewired --save-dev
cnpm install react-hot-loader --save-dev
4.cnpm install react-router-dom react-router-redux  --save-dev //安装router
5.cnpm install redux redux-thunk react-redux   --save-dev //安装redux
6.cnpm install axios --save //安装axios,http请求
7.cnpm install nprogress --save-dev //请求进度条
8.cnpm install antd --save //ui antd


##添加eslint
cnpm i eslint eslint-config-standard eslint-friendly-formatter eslint-loader eslint-plugin-html eslint-plugin-jsx eslint-plugin-promise eslint-plugin-react eslint-plugin-standard babel-eslint -D
然后在根目录下添加.eslintrc.js文件 
issue :create-react-app 无法使用eslintignore忽略文件的检测,暂时只能在文件头部加上/eslint-disable*/来解决

##添加环境变量(process.env)
react 默认就有自定义添加环境变量的方法
[配置环境变量](https://www.jianshu.com/p/cec6de30fdd0);
[配置环境变量](http://joescott.coding.me/blog/2017/04/27/create-react-app-env-api/);
但是这里没采用官网的方法,直接自定义方法覆盖原官网所写,相对简单
config.plugins.unshift(new webpack.DefinePlugin({
    'process.env': env === 'development' ? myconfig.dev.env : myconfig.build.env,
})) //添加本地全局配置信息

##create-react-app 配置proxy
直接在package.json中配置proxy就行
