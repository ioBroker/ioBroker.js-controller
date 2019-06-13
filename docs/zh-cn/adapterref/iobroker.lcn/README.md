---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: fqNOdd76eIu4H7mYnlg3q/hxtJukZdAZ2vLp8u0uEyw=
---
![商标](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.lcn.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![NPM](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

＃ioBroker.lcn
此适配器允许将本地控制网络[LCN](https://www.lcn.eu/)连接到ioBroker。

##支持的网关
 -  LCN-PKE

![PKE](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

 -  LCN-PKU与LCN-PCHK

![PKE](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

**不要忘记，ioBroker.lcn将阻止一个LCN连接许可证。**

扫描会自动检测配置和模块，必须从配置对话框中手动触发，并且可以随时重复。

##类型
支持以下读写组：

 - 模拟值（输出/输入）
 - 继电器（输出）
 - 传感器（输入）
 -  LED（输出/输入）
 - 变量（输入）

##变量
要将有效的转换函数应用于变量，变量必须具有有效的角色。支持以下角色：

 - **value.temperature** - 摄氏温度
 - **value.brightness** - lux中的勒克斯（I-输入）
 - **value.speed.wind** - 风速，单位为m / s
 - **value.voltage** - 伏特电压
 - **value.current** - 以安培为单位的电流
 - **value.sun.azimuth** - 太阳方位角
 - **value.sun.elevation** - 太阳高度

＃＃ 如何使用
首次启动后，必须扫描设备。可以使用扫描按钮在配置对话框中完成

![扫描](../../../en/adapterref/iobroker.lcn/img/scanButton.png)

＃＃ 去做
 - 配置对话框，用于定义变量类型。

## Changelog

### 0.4.2 (2019-06-12)
* (bluefox) Support of old measure values was added

### 0.3.2 (2018-11-19)
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018-2019 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.