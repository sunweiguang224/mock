/*
 Navicat MySQL Data Transfer

 Source Server         : 10.0.68.202
 Source Server Version : 50552
 Source Host           : 10.0.68.202
 Source Database       : mock

 Target Server Version : 50552
 File Encoding         : utf-8

 Date: 02/16/2017 16:31:58 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `mock`
-- ----------------------------
DROP TABLE IF EXISTS `mock`;
CREATE TABLE `mock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `json` varchar(9999) DEFAULT NULL,
  `des` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mock`
-- ----------------------------
BEGIN;
INSERT INTO `mock` VALUES ('1', '/mock/interface1', '{\"list|1-10\":[{\"id|+1\":1}]}', null), ('2', '/mock/interface2', '{\"list|1-10\":[{\"id|+1\":1}]}', null), ('8', '/mock/123', '{\"list|1-10\":[{\"id|+1\":1}]}', null), ('11', '/mock/1235', '{\"list|1-10\":[{\"id|+1\":1}]}', null), ('14', '/mock/xxx', '{\"list|1-10\":[{\"id|+1\":1}]}', null), ('15', '/mock/xxx11', '{\"list|1-10\":[{\"id|+1\":1}]}', null), ('16', '/mock/aaaaa111', '{\"list|1-10\":[{\"id|+1\":12432}]}', null), ('17', '/mock/test1', '1', null), ('18', '/mock/api', '{\"statusCode\":30090000,\"statusMsg\":\"success\",\"data\":{\"level\":4,\"token\":1483863633853,\"togo\":388,\"withdrawNum\":1,\"status\":0,\"isUpgrade\":false,\"packFee\":0.01,\"receiveNum\":59,\"isBindMobile\":true,\"commonCount\":107,\"receiveFee\":0,\"totalFee\":2.17,\"taskCount\":24,\"remainFee\":0.48,\"headUrl\":\"http://edc3f09a7c333.cdn.sohucs.com/s_mini/pic/2016/03/27/89940370711904384\",\"banner\":{\"content\":\"每周一晚8:08更有￥4888￥888￥128<br/>超大红包等你来抢！\",\"linkUrl\":\"http://3g.k.sohu.com/h5/pack/d.html\",\"overTime\":1462702080000,\"systermTime\":1483863633749,\"type\":3},\"isBind\":true,\"nackName\":\"追求技巧的小黑\",\"alipayPassport\":\"支付宝账号:13758****@qq.com\",\"notice\":\"每周一晚8:08更有￥4888￥888￥128\"},\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\",\"statusMsg\":\"success\"}', ''), ('19', '/mock/xxx2.go', '111', 'weff东风微风2%#$,.'), ('20', '/mock/xxx.go', '123', null), ('23', '/mock/xxx.go', '{\"statusCode\":30090000}', null), ('25', '/mock/xxx1.go', '1', null), ('26', '/mock/xxx2.go', '111', 'fwef'), ('27', '/mock/xxx.go', '{\"statusCode\":30090000,\"statusMsg\":\"success\",\"data\":{\"level\":4,\"token\":1483863633853,\"togo\":388,\"withdrawNum\":1,\"status\":0,\"isUpgrade\":false,\"packFee\":0.01,\"receiveNum\":59,\"isBindMobile\":true,\"commonCount\":107,\"receiveFee\":0,\"totalFee\":2.17,\"taskCount\":24,\"remainFee\":0.48,\"headUrl\":\"http://edc3f09a7c333.cdn.sohucs.com/s_mini/pic/2016/03/27/89940370711904384\",\"banner\":{\"content\":\"每周一晚8:08更有￥4888￥888￥128<br/>超大红包等你来抢！\",\"linkUrl\":\"http://3g.k.sohu.com/h5/pack/d.html\",\"overTime\":1462702080000,\"systermTime\":1483863633749,\"type\":3},\"isBind\":true,\"nackName\":\"追求技巧的小黑\",\"alipayPassport\":\"支付宝账号:13758****@qq.com\",\"notice\":\"每周一晚8:08更有￥4888￥888￥128\"}}', 'fff234234');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
