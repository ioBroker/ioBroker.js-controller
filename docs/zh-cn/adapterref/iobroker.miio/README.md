---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.miio/README.md
title: 无题
hash: XDMqwMWlFhKnECYCDK10wcbFmf9uJWhK5gUOJXXehi4=
---
![安装数量](http://iobroker.live/badges/miio-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.miio.svg)
![下载](https://img.shields.io/npm/dm/iobroker.miio.svg)
![依赖状态](https://img.shields.io/david/smarthomefans/iobroker.miio.svg)
![已知的漏洞](https://snyk.io/test/github/smarthomefans/ioBroker.miio/badge.svg)
![NPM](https://nodei.co/npm/iobroker.miio.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/smarthomefans/ioBroker.miio/master.svg)

<h1><img src="admin/miio.png" width="64"/> ioBroker.miio </h1>

适用于ioBroker的## miio适配器
该适配器控制遵循miIO协议的设备。

##当前支持的设备类型
|类型|图标|模型|测试|

--- | --- | --- | --- | airfresh |![](admin/icons/zhimi-airfresh-va2.png)| zhimi-airfresh-va2 |❌| airmonitor |！[]（）||❌| airpurifier |![](admin/icons/zhimi.airpurifier.m1.png) | zhimi.airpurifier.m1 |❌| airpurifier |![](admin/icons/zhimi.airpurifier.v1.png)| zhimi.airpurifier.v1 |❌| airpurifier |![](admin/icons/zhimi.airpurifier.v2.png)| zhimi.airpurifier.v2 |❌| airpurifier |![](admin/icons/zhimi.airpurifier.v3.png)| zhimi .airpurifier.v3 |❌| airpurifier |![](admin/icons/zhimi.airpurifier.v6.png)| zhimi.airpurifier.v6 |❌| fan |！[]（）||❌|加湿器|![](admin/icons/zhimi.humidifier.ca1.png)| zhimi.humidifier.ca1 |❌|加湿器|![](admin/icons/zhimi.humidifier.v1.png)| zhimi.humidifier.v1 |❌|水壶|![](admin/icons/yunmi.kettle.r1.png)| yunmi.kettle.r1 |✅| light |![](admin/icons/philips.light.bulb.png)| philips.light.bulb |✅| light | ![](admin/icons/philips.light.sread1.png)| philips.light.sread1 |✅| light |![](admin/icons/yeelink.light.color1.png)| yeelink.light.color1 |✅| light |![](admin/icons/yeelink.light.lamp1.png)| yeelink.light.lamp1 |✅| light |§§ IIIII_13§§| yeelink.light.mono1 |✅| light |![](admin/icons/yeelink.light.strip1.png)| yeelink.light.mono1 |✅| plug |![](admin/icons/chuangmi.plug.m1.png)| chuangmi.plug.m1 |❌| plug |§§IIIII_16§ §| chuangmi.plug.v1 |❌| plug |![](admin/icons/chuangmi.plug.v2.png)| chuangmi.plug.v2 |❌| plug |![](admin/icons/chuangmi.plug.v3.png)| chuangmi.plug.v3 |✅| powerstrip | §IIIII_19§§| qmi.powerstrip.v1 |❌| powerstrip |![](admin/icons/zimi.powerstrip.v2.png)| zimi.powerstrip.v2 |❌| waterpuri |![](../../../en/adapterref/iobroker.miio/admin/icons/yunmi.waterpuri.lx3.png)| yunmi.waterpuri.lx3 |✅| waterpuri |§§IIIII_22 §§| yunmi.waterpuri.v2 |✅

 - 如果您测试过任何设备，请创建一个问题并告诉我结果和设备型号。

## Changelog
### 0.0.6 (2019-04-13)
* Add power load for chuangmi plug

### 0.0.5 (2019-04-04)
* Fix URL mis-match issue

### 0.0.4 (2019-03-31)
* Add yunmi water purifier support. Perfect unit test

### 0.0.3 (2019-03-17)
* Add value mapper function. Add CommandInPara command

### 0.0.2 (2019-03-15)
* Add new device support. Fix some TS lint error

### 0.0.1
* (SchumyHao) initial release

## License
MIT License

Copyright (c) 2019 SchumyHao

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.