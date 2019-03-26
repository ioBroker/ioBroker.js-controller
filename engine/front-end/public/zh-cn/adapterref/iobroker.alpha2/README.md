---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/Eisbaeeer/ioBroker.alpha2/edit/master//README.md
title: Möhlenhoff Alpha2
hash: s+MSHp+45KY+zq2sC5OI4+Ed4K/7PvZ2HcLVGQsK0YI=
adapter: true
license: MIT
authors: Eisbaeeer <eisbaeeer@gmail.com>
description: ioBroker Moehlenhoff Alpha2 Adapter
keywords: Möhlenhoff, Alpha2
readme: https://github.com/Eisbaeeer/ioBroker.alpha2/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-07-16T12:45:33.660Z
version: 0.0.4
BADGE-安装数量: http://iobroker.live/badges/alpha2-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.alpha2.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.alpha2.svg
BADGE-特拉维斯-CI: https://travis-ci.org/Eisbaeeer/ioBroker.alpha2.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.alpha2.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.alpha2/../../../en/adapterref/iobroker.alpha2/admin/mh-logo-schrift.png)


＃ioBroker.alpha2
此适配器允许您获取和设置Moehlenhoff Alpha2加热控制器的值。
适配器使用Alpha2的XML-API。如果您使用多个Alpha2控制器，则必须安装第二个适配器实例。

##安装
 - 安装适配器
 - 填写您的IP地址或Alpha2控制器的主机名
 - 填写轮询间隔以获取状态

##用法
您可以在以下位置更改以下对象：

 - 每个HEATAREA（最多8个区域）

|说明|对象|值|
|---------------------|-----------------|---------------------------|
|目标温度| T_TARGET |温度。摄氏度|
|目标温度一天| T_HEAT_DAY |温度。摄氏度|
|目标温度晚上| T_HEAT_NIGHT |温度。摄氏度|
| HeatArea的模式| HEATAREA_MODE | 0 =自动，1 =日，2 =夜晚|
|计划工作日| PROGRAM_WEEK |程序编号0-3 |
|节目周末| PROGRAM_WEEKEND |程序编号0-3 |

 - 对于每个最大的计划每个项目有4个班次。
 - 分钟步数为15.仅允许00,15,30,45
 -  24小时的时间

|说明|对象|值|
|---------------------|-----------------|-------------------------------|
|开始时间|开始|程序启动时间[hh：mm] |
|结束时间|结束|程序结束时间[hh：mm] |

 - 度假

|说明|对象|值|
|-----------------------|---------------------|--------------------------|
|度假开始| VACATION.START_DATE | [YYYY-MM-DD] |
|假期结束| VACATION.END_DATE | [YYYY-MM-DD] |
|温度。在假期| T_HEAT_VACATION |温度。摄氏度|

 - 所有其他对象都是只读的

＃＃ 例子
###设置Room1的温度
要设置目标温度（仅对下一个程序的开始或结束有效），请在相应的Heatarea中设置对象T_TARGET。
适配器将使用XML-API在heatarea中设置值。

###设置假期
要设置休假，请注意使用对象T_HEAT_VACATION定义休假目标临时值。您将在DEVICE中找到该对象。
之后，设置两个对象VACATION.START_DATE和VACATION.END_DATE。如果您要停用休假设置，请在今天之前设置两个日期对象。
您可以检查对象VACATION.STATE以检查状态。如果状态显示为true，则休假处于活动状态。

##已知限制
 - 没有虚拟房间
 - 最多8个加热区（有2个加热站的Alpha2基站）
 - 没有房间控制器锁（儿童模式）

## Changelog

### 0.0.4
- (Eisbaeeer)   
Added refresh of states after setting states

### 0.0.3
- (Eisbaeeer)   
fixed issues #2

### 0.0.2
- (Eisbaeeer)   
fixed issues #1

### 0.0.1
- (Eisbaeeer) inital version of Alpha2

## License
The MIT License (MIT)