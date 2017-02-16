/**
 * 页面: ${{title}}
 * 功能描述: ${{desc}}
 * 作者: ${{author}}
 //var $body = $('body');
 //var tpl = require('../tpl/demo.tpl')({a: Date.now()});
 //var css = require('../css/demo.scss');
 //var json = require('../json/demo.json');
 */
import $ from 'jquery';
import PATH from 'PATH';
import helper from 'helper';
import lazyload from 'lazyload';
import param from 'param';

class Biz {
	/* 构造方法 */
	constructor() {
    this.params = param.getAll();
		this.init();
	}

	/* 初始化页面 */
	init() {
		// 先渲染页面，再绑定事件
		$.when(
			this.get(),
			this.get()
		).then(() => {
			this.bindEvent();
		})
	}

	/* 获取数据- */
	get() {
    let defer = $.Deferred();
		$.ajax({
			async: true,
			url: PATH.interface + '/xxx',
			type: 'get',
			data: {}
		}).then(data => {
			this.render(data);
			defer.resolve();
		});
		return defer;
	}

	/* 渲染- */
	render(data) {
		//var html = require('../tpl/xxx.tpl')(data);
		//$('xxx').html(html);
	}

	/* 绑定事件 */
	bindEvent() {

	}

	/* 工具方法 */
	util() {

	}
}

// 开始执行
$(document).on('DOMContentLoaded', function () {
	new Biz();
});
