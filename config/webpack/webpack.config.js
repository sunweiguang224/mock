/**
 * Created by weiguangsun on 2016/4/20.
 */
import Path from '../path.js';
import fs from 'fs';
import webpack from 'webpack';
import glob from 'glob';
import path from 'path';
import autoprefixer from 'autoprefixer';

module.exports = {
//export default {
  resolve: {
    // 为src/common/js/*/*.js文件提供别名
    alias: (function () {
      var alias = {};
      var filePaths = glob.sync(__dirname + '/../../' + Path.srcRoot + '/common/js/*/*.js');
      for (var i in filePaths) {
        var filePath = filePaths[i];
        alias[path.basename(filePath).replace('.js', '')] = filePath;
      }
      console.log('已加载webpack alias:');
      console.log(alias);
      return alias;
    })()
  },
  // 业务js
  entry: function (path) {
    var entry = {
      //commons: ['helper', 'setting', 'util']		// 此处指定的公共模块会被打包到common.js
    };
    var filePaths = glob.sync(path);
    for (var i in filePaths) {
      var filePath = filePaths[i];		// 读取文件路径
      var moduleName = filePath.replace(Path.srcRoot + '/', '').replace('.jsx', '').replace('.js', '');	// 文件编译后路径
      entry[moduleName] = './' + filePath;
    }
    return entry;
  }(Path.src.js.page),
  // 插件
  plugins: [
    // 将公共代码抽离出来合并为一个文件
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: 'common/js/common.bundle.js',
      minChunks: 2
    }),
    /*
     * 提供全局的变量，在模块(entry指定的)中使用无需用require引入
     * 此处把jQuery变量提供给jquery-lazyload（因jquery-lazyload内部没有require('jquery')）
     */
    new webpack.ProvidePlugin({
      // jQuery: "jquery.js",
      // $: "jquery.js"
    }),
    // 压缩混淆js,如果require的是css,则会输出压缩的css代码, (不能和gulp-uglify同时用,dist时候有问题)
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ],
  output: {
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.(css|scss)$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader'},	// ?modules css-loader后面加了一个查询参数modules，表示打开 CSS Modules 功能。style-loader,css-loader共同作用于.css文件。 前者将 css 文件以 <style></style> 标签插入 <head> 头部，后者负责解读、加载 CSS 文件。sass-loader 加载sass文件。等价于上面数组写法。webpack的loader的配置是从右往左的，从上面代码看的话，就是先使用css-loader之后使用style-loader, 参考http://www.tuicool.com/articles/fmUjUvZ
      {test: /\.tpl$/, loader: "tmodjs-loader"},	// artTemplate的webpack版
      {test: /\.json$/, loader: "json-loader"},	// json-loader，.json一般用于放假数据
      //{test: /\.png$/, loader: "url-loader?limit=102400" }	//引起gulp-uglify报错，原因不详// require100KB以下的图片将得到base64编码
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 5 versions'], cascade: false
    })
  ],
};
