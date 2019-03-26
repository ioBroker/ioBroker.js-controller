---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.lcn/edit/master//README.md
title: LCN connection
hash: huwsxU4/YbYGapJUD98J8NIoQW2t3uDw1T5ci8Vw/LE=
adapter: true
license: CC-BY-NC-4.0
authors: bluefox <dogafox@gmail.com>
description: LCN
keywords: LCN
readme: https://github.com/ioBroker/ioBroker.lcn/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-11-05T23:29:40.991Z
version: 0.3.2
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.lcn.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.lcn.svg
BADGE-NPM: https://nodei.co/npm/iobroker.lcn.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.lcn/../../../en/adapterref/iobroker.lcn/admin/lcn.png)


＃ioBroker.lcn =================
此适配器允许将本地控制网络[LCN](https://www.lcn.eu/)连接到ioBroker。

##支持的网关
 -  LCN-PKE

![PKE](zh-cn/adapterref/iobroker.lcn/../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

 -  LCN-PKU与LCN-PCHK

![PKE](zh-cn/adapterref/iobroker.lcn/../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

**不要忘记，ioBroker.lcn将阻止一个LCN连接许可证。**

扫描将自动检测配置和模块。

##类型
支持以下读写组：

 - 模拟值（输出/输入）
 - 继电器（输出）
 - 传感器（输入）
 -  LED（输出/输入）
 - 变量（输入）

##变量
要将有效的转换函数应用于变量，变量必须具有有效的角色。支持以下角色：

 -  value.temperature  - 以摄氏度为单位的温度
 -  value.brightness  -  lux中的勒克斯（I-输入）
 -  value.speed.wind  - 以m / s为单位的风速
 -  value.current  -  Volt中的当前电流
 -  value.power  -  Amper中的功率

-

## Changelog

### 0.3.0
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.