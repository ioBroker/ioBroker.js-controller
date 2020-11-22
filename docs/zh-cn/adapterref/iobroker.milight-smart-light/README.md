---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: sNYZ4pRzYCdPo+Z1noG5Vu/siGKkapBbADx0hC8kKOA=
---
![milight-smart-light徽标](../../../en/adapterref/iobroker.milight-smart-light/public/milight-smart-light-logo.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)
![测验](http://img.shields.io/travis/Steiger04/ioBroker.milight-smart-light/master.svg)
![稳定](http://iobroker.live/badges/milight-smart-light-stable.svg)
![已安装](http://iobroker.live/badges/milight-smart-light-installed.svg)
![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)

＃ioBroker.milight-smart-light
ioBroker的此适配器基于mwittig的节点模块控制Milight LED灯泡和LED灯带。

mwittig /[Node-milight-promise](https://github.com/mwittig/node-milight-promise)

使用适配器，您可以同时使用：** v6 Bridge **和** Legacy Bridge **。

** v6桥：**

-网桥（仅iBox1）
-白色
-rgb（w）
- 饱满的色彩
-fullColor8Zone

**旧桥：**

-白色
-rgb（w）

###版本
-** Node.js **：使用8.0.0或更高版本
-** iobroker.admin **：使用3.5.10或更高版本

## Changelog
### 1.0.0 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2

### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License

The MIT License (MIT)

Copyright (c) 2017-2020 Steiger04 <steiger04@posteo.de>