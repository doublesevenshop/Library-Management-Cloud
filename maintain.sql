/*
Navicat MySQL Data Transfer

Source Server         : mysql80
Source Server Version : 80034
Source Host           : localhost:3306
Source Database       : library

Target Server Type    : MYSQL
Target Server Version : 80034
File Encoding         : 65001

Date: 2023-10-23 21:49:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for maintain
-- ----------------------------
DROP TABLE IF EXISTS `maintain`;
CREATE TABLE `maintain` (
  `x_id` int NOT NULL COMMENT '序号',
  `x_wechat_id` varchar(255) NOT NULL COMMENT '用户微信号',
  `x_wechat_nick` varchar(255) NOT NULL COMMENT '微信名',
  `x_name` varchar(255) NOT NULL COMMENT '维修人',
  `x_code` varchar(255) NOT NULL COMMENT '维修人员编码',
  `m_code` varchar(255) NOT NULL COMMENT '设备编码',
  `m_name` varchar(255) NOT NULL COMMENT '设备名称',
  `x_describe` varchar(255) DEFAULT NULL COMMENT '设备描述',
  `x_time` datetime NOT NULL COMMENT '维修日期',
  `x_progress` varchar(255) NOT NULL COMMENT '维修进度',
  `x_mode` varchar(255) DEFAULT NULL COMMENT '维修方式',
  PRIMARY KEY (`m_code`),
  KEY `maintain_repair_m_wechat_id_fk` (`x_wechat_id`),
  CONSTRAINT `maintain_repair_m_code_fk` FOREIGN KEY (`m_code`) REFERENCES `repair` (`m_code`),
  CONSTRAINT `maintain_repair_m_wechat_id_fk` FOREIGN KEY (`x_wechat_id`) REFERENCES `repair` (`m_wechat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='维修信息表';

-- ----------------------------
-- Records of maintain
-- ----------------------------
INSERT INTO `maintain` VALUES ('3', 'ccccc', '小c', '老赵', '003', 'TY2019018889', '蓝牙耳机', null, '2023-10-21 10:34:23', '维修中', null);
INSERT INTO `maintain` VALUES ('2', 'bbbbb', '小b', '老李', '002', 'TY2019019074', '物联网无线网关', '无法使用', '2023-10-20 18:20:31', '已修好', null);
INSERT INTO `maintain` VALUES ('1', 'aaaaa', '小a', '老王', '001', 'TY2019019303', '新风空气净化系统 AD160', null, '2023-10-20 17:55:20', '已修好', null);
