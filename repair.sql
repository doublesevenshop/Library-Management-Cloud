/*
Navicat MySQL Data Transfer

Source Server         : mysql80
Source Server Version : 80034
Source Host           : localhost:3306
Source Database       : library

Target Server Type    : MYSQL
Target Server Version : 80034
File Encoding         : 65001

Date: 2023-10-23 21:50:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for repair
-- ----------------------------
DROP TABLE IF EXISTS `repair`;
CREATE TABLE `repair` (
  `m_id` int NOT NULL COMMENT '序号',
  `m_wechat_id` varchar(255) NOT NULL COMMENT '用户微信号',
  `m_wechat_nick` varchar(255) NOT NULL COMMENT '用户微信名',
  `m_name` varchar(255) NOT NULL COMMENT '设备名称',
  `m_code` varchar(255) NOT NULL COMMENT '设备编码',
  `m_place` varchar(255) NOT NULL COMMENT '设备地点',
  `m_describe` varchar(255) DEFAULT NULL COMMENT '故障描述',
  `m_time` datetime NOT NULL COMMENT '报修时间',
  PRIMARY KEY (`m_code`),
  UNIQUE KEY `repair_pk` (`m_wechat_id`),
  CONSTRAINT `repair_info_fk` FOREIGN KEY (`m_code`) REFERENCES `devices` (`asset_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='设备报修';

-- ----------------------------
-- Records of repair
-- ----------------------------
INSERT INTO `repair` VALUES ('3', 'ccccc', '小c', '蓝牙耳机', 'TY2019018889', '沙河图书馆', null, '2023-10-20 10:29:53');
INSERT INTO `repair` VALUES ('2', 'bbbbb', '小b', '物联网无线网关', 'TY2019019074', '沙河图书馆', '无法使用', '2023-10-19 10:29:53');
INSERT INTO `repair` VALUES ('1', 'aaaaa', '小a', '新风空气净化系统 AD160', 'TY2019019303', '沙河图书馆', null, '2023-10-19 11:23:00');
INSERT INTO `repair` VALUES ('4', 'ddddd', '小d', '新风空气净化系统', 'TY2019019360', '沙河图书馆', '无法使用', '2023-10-21 10:29:53');
