var dateFormat = require('../module/dateFormat.js');
var mockjs = require('mockjs');
/**
 * 功能描述：为artTemplate提供工具方法
 */
module.exports = function (templete) {
  /**
   * 日期格式化
   * 用法：{{时间戳 | dateFormat:'yyyy-MM-dd hh:mm:ss SSS'}}
   */
  templete.helper('dateFormat', function (timestamp, pattern) {
    return dateFormat(timestamp, pattern);
  });
  /**
   * 调用mockjs
   * 用法：{{json字符串 | mock}}
   */
  templete.helper('mock', function (json) {
    return JSON.stringify(mockjs.mock(JSON.parse(json)));
  });
  /**
   * 格式化json字符串
   * 用法：{{json字符串 | jsonFormat}}
   */
  templete.helper('jsonFormat', function (json) {
    if (json) {
      for (var i = 0; i < 10; i++) {
        console.log(json)
      }
      return JSON.stringify(JSON.parse(json), ' ', 2);
    } else {
      return '';
    }
  });
};
