/*
Navicat MySQL Data Transfer

Source Server         : ewr
Source Server Version : 50724
Source Host           : 127.0.0.1:3306
Source Database       : swell

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2020-07-02 10:39:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cls
-- ----------------------------
DROP TABLE IF EXISTS `cls`;
CREATE TABLE `cls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `class_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cls
-- ----------------------------
INSERT INTO `cls` VALUES ('1', '19移动APP二班');
INSERT INTO `cls` VALUES ('2', '20计算机程序一班');

-- ----------------------------
-- Table structure for sub
-- ----------------------------
DROP TABLE IF EXISTS `sub`;
CREATE TABLE `sub` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subname` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sub
-- ----------------------------
INSERT INTO `sub` VALUES ('1', 'HTML+CSS（刘富腾）');
INSERT INTO `sub` VALUES ('2', 'jQuery（刘富腾）');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '用户姓名',
  `level` tinyint(4) DEFAULT NULL COMMENT '用户等级',
  `pwd` varchar(20) DEFAULT NULL COMMENT '密码',
  `cid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uname` (`uname`),
  UNIQUE KEY `name1` (`name`,`cid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=420 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'laobiao', '刘富腾', '3', 'laobiao', null);
INSERT INTO `user` VALUES ('383', 'test', '测试用户', '1', 'test', '1');
INSERT INTO `user` VALUES ('384', '————ABC————', '张福鑫', '1', 'qq2664672565', '1');
INSERT INTO `user` VALUES ('390', '馒头~', '杨帅', '1', '520627', '1');
INSERT INTO `user` VALUES ('393', '离殇樱雪', '刘佳林', '1', '5201314LJL', '1');
INSERT INTO `user` VALUES ('396', 'zhouyu', '周瑜', '1', 'zy200592', '1');
INSERT INTO `user` VALUES ('408', 'mxl', '牟希梁', '1', '123123', '1');
INSERT INTO `user` VALUES ('409', '猪猪侠', '刘宁', '1', '3090629353', '1');
INSERT INTO `user` VALUES ('411', '.', '潘文文', '1', 'pww520cxm99', '1');
INSERT INTO `user` VALUES ('412', '缘~妙不可言~', '高志杰', '1', '1QAZ2WSX', '1');
INSERT INTO `user` VALUES ('413', '东邪', '范耀忠', '1', 'uc43rhug.', '1');
INSERT INTO `user` VALUES ('416', 'wyj', '王语佳', '1', 'wyj200315', '1');
INSERT INTO `user` VALUES ('419', '岚', '高健', '1', 'gaojian1314520', '1');

-- ----------------------------
-- Table structure for uwork
-- ----------------------------
DROP TABLE IF EXISTS `uwork`;
CREATE TABLE `uwork` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `wid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `file` varchar(200) DEFAULT NULL,
  `status` smallint(2) DEFAULT NULL,
  `subtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of uwork
-- ----------------------------
INSERT INTO `uwork` VALUES ('1', '393', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('2', '409', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('3', '396', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('4', '384', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('5', '390', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('6', '383', '1', '1', './uwork/测试作业/测试用户--新建文本文档 (4).txt', '1', '2020-05-27 23:55:40');
INSERT INTO `uwork` VALUES ('7', '411', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('8', '408', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('9', '416', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('10', '413', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('11', '419', '1', '1', null, '0', null);
INSERT INTO `uwork` VALUES ('12', '412', '1', '1', null, '0', null);

-- ----------------------------
-- Table structure for work
-- ----------------------------
DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clsid` int(11) DEFAULT NULL,
  `subid` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `file` varchar(200) DEFAULT NULL,
  `reuid` int(11) DEFAULT NULL,
  `retime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of work
-- ----------------------------
INSERT INTO `work` VALUES ('1', '1', '1', '测试作业', '<p><br></p>', '', '1', '2020-05-27 23:53:41');
