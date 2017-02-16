/**
 * 页面: 模拟数据列表
 * 功能描述: 模拟数据列表
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

class Biz {
  /* 构造方法 */
  constructor() {
    this.init();
  }

  /* 初始化页面 */
  init() {
    var ts = this;
    // 先渲染页面，再绑定事件
    // $.when(
    // 	this.getData(),
    // 	this.getData()
    // ).then(function () {
    // 	ts.bindEvent();
    // })
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
    $(document).on('click', '.deleteBtn', function () {
      if (confirm('确定要删除这条记录吗?')) {
        $.ajax({
          async: true,
          url: '/mockDelete_interface',
          type: 'get',
          data: {
            id: $(this).data('id')
          }
        }).then(function (data) {
          alert(data);
          location.reload();
        });
      }
    });
    $(document).on('click', '.modifyBtn', function () {
      location.href = `/mockAdd?id=${$(this).data('id')}`;
    });
    $(document).on('click', '.lookBtn', function () {
      open(`${location.origin}${$(this).parent().siblings('.path').html()}`);
    });
    $('#addBtn').click(function(){
      location.href = '/mockAdd';
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
