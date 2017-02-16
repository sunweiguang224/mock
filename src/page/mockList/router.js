var express = require('express');
var ajax = require('../../../config/express/ajax.js');
var db = require('../../../config/express/db.js');
var mockjs = require('mockjs');
var artTemplate = require('art-template');

var router = express.Router();

// 列表页面
router.get('/mockList', function (req, res, next) {
  db(function(connection){
    connection.query('SELECT * from mock order by id desc', function (err, rows, fields) {
      if (err) throw err;
      res.render(`${__dirname}/mockList.html`, {rows: rows});
      res.end();
    });
  })
});


// 删除接口
router.get('/mockDelete_interface', function (req, res, next) {
  db(function(connection){
    connection.query('delete from mock where id = '+req.query.id, {
      path: req.query.path,
      json: req.query.json
    }, function (err) {
      var result = '删除成功';
      if (err) {
        result = '删除失败  ' + err.toString();
      }
      // 输出
      res.write(result);
      res.end();
    });
  })
});

module.exports = router;
