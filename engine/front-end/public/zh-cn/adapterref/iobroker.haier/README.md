---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/instalator/ioBroker.haier/edit/master//README.md
title: Haier air conditioning control
hash: N69K+jE3mMiQAZLXCzj7tUkAaIbUgB9nT/OOTczYy0o=
adapter: true
license: MIT
authors: instalator <vvvalt@mail.ru>
description: ioBroker haier Adapter
keywords: haier, air conditioning, climate control
readme: https://github.com/instalator/ioBroker.haier/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-08-26T18:38:38.677Z
version: 1.0.2
BADGE-安装数量: http://iobroker.live/badges/haier-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.haier.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.haier.svg
BADGE-测试: http://img.shields.io/travis/instalator/ioBroker.haier/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.haier.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.haier/../../../en/adapterref/iobroker.haier/admin/haier_admin.png)


＃ioBroker海尔空调适配器=================
IoBroker Haier适配器用于通过UART与TCP到串行网关一起控制您的海尔空调。
这项工作在'Lightera'系列的空调上进行检查。

＃＃ 硬件
作为TCP到串行网关，我使用此[代码]（https://github.com/instalator/ESP8266.TelnetToSerial）和这个[设备](https://blog.instalator.ru/archives/433)。

##使用
### Power
打开和关闭空调。 （真假）

### Temp
当前室温指示。（°C）

### Settemp
设定温度。 （16  -  30°C）

###模式
* **能**或** 0** - 一把钥匙可以给你一个舒适的房间！空调机组可以判断室内温度和湿度，并进行相应的调整。
* ****或** 1** - 冷却室。
* **量**或** 2** - 房间供暖。
* **丝**或** 3** - 只有粉丝。
* ****或** 4** - 空气除湿。

＃＃＃ 风扇转速
* **分**或** 2 **
* ** mid **或** 1 **
* **最大**或** 0 **
* ** auto **或** 3 **

＃＃＃ 摇摆
* ** ud **或** 1 ** - 自动向上/向下。
* ** lr **或** 2 ** - 自动左/右。
* ****或** 3** - 两个方向。
* ** false **或** 0 ** - 关闭。

### Health
（真/假）空调器中的水离子发生器可以产生大量的负离子，有效地平衡空气中的位置和负离子的数量，还可以杀死细菌，加速室内的灰尘沉积，最后清洁空气中的空气。房间。

### Lockremote
锁定IR遥控器（真/假）

###压缩机
如果压缩机已打开

###新鲜
（真/假）排出室内的空气，吸入新鲜空气。
（某些型号无法使用此功能。）

＃＃＃ 生的
发送RAW HEX代码而不启动字节和校验和示例：开机 - **0A000000000001014D02**

## Changelog

### 1.0.2
   (instalator) fix error

### 1.0.1
   (instalator) fix error parse packets

### 1.0.0
   (instalator) Up to stable

### 0.1.1
   (instalator) fix reconnect error

### 0.1.0
   (instalator) beta version

### 0.0.4
  (instalator) change level log
  (instalator) fix send command
  (instalator) change for test file setup.js
  (instalator) fix error
  (instalator) added object for send raw code
  
### 0.0.3
  (instalator) alfa version adapter

### 0.0.1
  (instalator) initial