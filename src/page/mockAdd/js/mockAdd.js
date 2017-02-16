/**
 * 页面: 添加模拟数据
 * 功能描述: 添加模拟数据
 * 作者: swg
 //var $body = $('body');
 //var tpl = require('../tpl/demo.tpl')({a: Date.now()});
 //var css = require('../css/demo.scss');
 //var json = require('../json/demo.json');
 */
import $ from 'jquery';
import PATH from 'path';
import helper from 'helper';
import lazyload from 'lazyload';
import mockjs from 'mockjs';
import param from 'param';

class Biz {
  /* 构造方法 */
  constructor() {
    this.init();
  }

  /* 初始化页面 */
  init() {
    var ts = this;
    // 先渲染页面，再绑定事件
    /*$.when(
     this.getData(),
     this.getData()
     ).then(function () {
     ts.bindEvent();
     });*/
    ts.bindEvent();
  }

  /* 获取数据- */
  getData() {
    let ts = this,
      defer = $.Deferred();
    $.ajax({
      async: true,
      url: 'xxx',
      type: 'get',
      data: {}
    }).then(function (data) {
      ts.renderPage(data);
      defer.resolve();
    });
    return defer;
  }

  /* 渲染页面- */
  renderPage(data) {
    //var html = require('../tpl/xxx.tpl')(data);
    //$('xxx').html(html);
  }

  /* 绑定事件 */
  bindEvent() {
    // 提交按钮点击
    $('#submit').click(function () {
      if (!$('#path').val().startsWith('/mock/')) {
        alert('路径必须以 /mock/ 开头')
        return;
      }
      try {
        var json = $('#json').val();
        if(json.length > 9999){
          throw new Error('json规则不能超过9999个字符。')
        }
        json = json.replace(/[ \t\n\r]/g, '');
        mockjs.mock(JSON.parse(json));
      } catch (error) {
        alert(error.toString());
        return;
      }
      $.ajax({
        async: true,
        url: '/mockAdd_interface',
        type: 'get',
        data: {
          id: param.get('id'),
          path: $('#path').val(),
          json: json,
          des: $('#des').val(),
        }
      }).then(function (data) {
        alert(data);
        if (data.indexOf('成功') != -1) {
          location.href = '/mockList';
        }
      });
    });
  }

  /* 工具方法 */
  util() {

  }
}

// 开始执行
$(document).on('DOMContentLoaded', function () {
  new Biz();
});
