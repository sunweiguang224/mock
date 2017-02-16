var express = require('express');
var glob = require('glob');
var cookieParser = require('cookie-parser');
var artTemplate = require('art-template');

// import express from 'express';
// import glob from 'glob';
// import cookieParser from 'cookie-parser';
// import artTemplate from 'art-template';


module.exports = function (env, port) {
  var relativePath = '../../';

  /*总路由*/
  var server = express();

  /*静态文件*/
  server.use('/', express.static(__dirname + '/' + relativePath + env));

  /*解析cookie到req.cookies*/
  server.use(cookieParser());

  /*模板*/
  // 注册一个模板引擎，如果res.render渲染文件的后缀是.html，则执行artTemplate为express提供的回调方法
  server.engine('html', artTemplate.__express);
  // 设置默认模板引擎
  server.set('view engine', 'html');
  // 设置取消view缓存，提升开发阶段很重要
  server.set('view cache', false);
  // 设置模板的物理base路径
  server.set('views', __dirname + '/' + relativePath + env + '/');
  // 为artTemplate模板引擎注册工具方法
  require(__dirname + '/' + relativePath + 'src/common/js/util/helper.js')(artTemplate);

  /*加载每个页面的路由*/
  console.log('已加载路由文件:');
  var files = glob.sync(__dirname + '/' + relativePath + env + '/page/*/router.js');
  for (var i = 0; i < files.length; i++) {
    server.use(require(files[i]));
    console.log(files[i]);
  }

  /*404页面，为防止提前匹配*，所以此处在其他路由之后加载，*/
  //server.get('*', function(req, res, next){
  //	res.render('page/404/404.html');
  //});

  /*异常处理*/
  server.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('服务器发生异常:\n' + err.stack);
  });

  /*启动监听*/
  var http = server.listen(port, function () {
    console.log('http服务已启动' + JSON.stringify(http.address()));
  });
};
