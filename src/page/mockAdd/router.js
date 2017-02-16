var express = require('express');
var ajax = require('../../../config/express/ajax.js');
var mysql = require('mysql');
var db = require('../../../config/express/db.js');
var mockjs = require('mockjs');

var router = express.Router();

// 新增+修改页面
router.get('/mockAdd', function (req, res, next) {
  if (req.query.id) {
    db(function (connection) {
      connection.query('SELECT * from mock where id=' + req.query.id, function (err, rows, fields) {
        if (err) throw err;
        console.log(JSON.stringify(rows[0]));
        res.render(`${__dirname}/mockAdd.html`, rows[0]);
      });
    });
  } else {
    res.render(`${__dirname}/mockAdd.html`);
  }
});

// 新增+修改接口
router.get('/mockAdd_interface', function (req, res, next) {
  if (req.query.id) {
    console.log({
      id: req.query.id,
      path: req.query.path,
      json: req.query.json,
      desc: req.query.desc,
    });
    db(function (connection) {
      connection.query('update mock set des = ?, path = ?, json = ? where id = ?', [
        req.query.des,
        req.query.path,
        req.query.json,
        req.query.id
      ], function (err) {
        var result = '修改成功';
        if (err) {
          result = '修改失败  ' + err.toString();
        }
        // 输出
        res.write(result);
        res.end();
      });
    });
  } else {
    db(function (connection) {
      connection.query('insert into mock set ?', {
        path: req.query.path,
        json: req.query.json,
        desc: req.query.desc,
      }, function (err) {
        var result = '添加成功';
        if (err) {
          result = '添加失败  ' + err.toString();
        }
        // 输出
        res.write(result);
        res.end();
      });
    });
  }
});

// 返回模拟的数据
router.get('/mock/*', function (req, res, next) {
  db(function (connection) {
    connection.query('SELECT * from mock where path=' + mysql.escape(req.originalUrl), function (err, rows, fields) {
      if (err) throw err;
      try {
        var row = rows[0];
        console.log(JSON.parse(row.json))
        var json = mockjs.mock(JSON.parse(row.json));
        res.write(JSON.stringify(json));
      } catch (error) {
        res.write(error.toString());
        console.log(error);
      }
      res.end();
    });
  });
});

module.exports = router;

/* 启动模拟接口服务 */
// db(function (connection) {
//   connection.query('SELECT * from mock', function (err, rows, fields) {
//     if (err) throw err;
//     // 遍历启动
//     for (var i in rows) {
//       var row = rows[i];
//       // 启动
//       router.get(row.path, function (req, res, next) {
//         try {
//           console.log(JSON.parse(row.json))
//           var json = mockjs.mock(JSON.parse(row.json));
//           res.write(JSON.stringify(json));
//         } catch (error) {
//           res.write(error.toString());
//           console.log(error);
//         }
//         res.end();
//       });
//       console.log('已经成功启动模拟接口:' + row.path)
//     }
//   });
// });
