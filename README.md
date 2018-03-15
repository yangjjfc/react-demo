
## 添加webpack编译scss功能
npm install sass-loader node-sass --save-dev
(https://www.jianshu.com/p/cf477a7eb48f)


##cerate-react-app 修改webpack基本配置添加更多更能插件

react一般不推荐直接修改官方的webpack配置,而是使用react-app-rewired插件来添加(覆盖)配置。
[react-app-rewired](https://github.com/timarney/react-app-rewired);


1.cnpm install react-app-rewired --save-dev 
2.cnpm install --save-dev codebandits/react-app-rewire-css-modules sass-loader node-sass //sass
3.cnpm install react-app-rewire-hot-loader --save-dev//支持热替换
# If you don't already, you also need:
cnpm install react-app-rewired --save-dev
cnpm install react-hot-loader --save-dev
4.cnpm install react-router-dom react-router-redux  --save-dev //安装router
5.cnpm install redux redux-thunk react-redux   --save-dev //安装redux
6.cnpm install axios --save //安装axios,http请求
7.cnpm install nprogress --save-dev //请求进度条
8.cnpm install antd --save //ui antd