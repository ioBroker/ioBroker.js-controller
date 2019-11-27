---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homepilot/README.md
title: ioBroker.homepilot
hash: h4tiza7xEW571MRD8xKFFPGDnHTlUGekk6SiBhJIpKY=
---
![商标](../../../en/adapterref/iobroker.homepilot/admin/homepilot.png)

![安装数量](http://iobroker.live/badges/homepilot-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.homepilot.svg)
![下载](https://img.shields.io/npm/dm/iobroker.homepilot.svg)
![NPM](https://nodei.co/npm/iobroker.homepilot.png?downloads=true)
![编码徽章](https://api.codacy.com/project/badge/Grade/41e0e541711c47b996f11a2439a6663c)
![特拉维斯-CI](http://img.shields.io/travis/Pix---/ioBroker.homepilot/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.homepilot?branch=master&svg=true)

＃ioBroker.homepilot
适配器需要Homepilot基站的固件版本低于v5.0（2019年9月之前）。可以使用[ioBroker.homepilot20](https://github.com/homecineplexx/ioBroker.homepilot20)管理更新或更新的电台

：de：[Dokumentation](/docs/de/doc_homepilot_de.md)

：uk：[文档](/docs/en/doc_homepilot_en.md)

：ru：[Документация](/docs/en/doc_homepilot_en.md)

：葡萄牙：[Documentação](/docs/en/doc_homepilot_en.md)

：荷兰：[Documentatie](/docs/en/doc_homepilot_en.md)

：fr：[文档](/docs/en/doc_homepilot_en.md)

：it：[Documentazione](/docs/en/doc_homepilot_en.md)

：es：[Documentación](/docs/en/doc_homepilot_en.md)

：poland：[Dokumentacja](/docs/en/doc_homepilot_en.md)

##路线图
* 1.4.0在设置窗口中获取网络中所有已安装的duofern产品的列表
* 1.5.0将对象树重新排列为“ homepilot.0.device.channel.state”
* 2.0.0从Homepilot站（zwave）获取实时数据

欢迎捐款！

## Changelog
### 1.1.3 (2019-09-23)
+ (christofkac) Added support for Connect Actor

### 1.1.2 (2019-09-02)
+ (Apollon77) Update testing for nodejs12

### 1.1.1 (2019-01-09)
+ (homecineplexx) Added new device "Troll Comfort DuoFern"

### 1.1.0 (2018-11-18)
+ (homecineplexx) Improved integration of thermostats

### 1.0.4 (2018-11-11)
+ (pix) fixed typo in main.js

### 1.0.3 (2018-08-03)
+ (pix) design improvements settings window

### 1.0.2 (2018-04-22)
+ (pix) New design for settings window

### 1.0.1 (2018-04-20)
+ (pix) Readme/Documentation structure

### 1.0.0 (2018-04-20)
+ (pix) Admin 3 support, Translations to de, ru, pt, nl, fr, it, es and pl language

### 0.3.1 (2017-10-18)
+ (pix) new documentation structure

### 0.3.0 (2017-10-16)
+ (mikepa1) Support for more z-wave actuators
+ (pix) iobroker.discovery integration

### 0.2.9 (2017-10-15)
+ (pix) Minimum nodejs 4 is required

### 0.2.8 (2017-10-15)
+ (mikepa1) Fixed issues with Heizkörperstellantrieb Z-Wave

### 0.2.7 (2017-08-26)
+ (pix) Added support for Heizkörperstellantrieb Z-Wave

### 0.2.6 (2017-02-03)
+ (pix) Product "Dimmer" integrated (duofern id 48)

### 0.2.5 (2017-02-03)
+ (pix) CID datapoint now accepts input of 'true' or 'false' and translates it to command 10 or 11.

### 0.2.4 (2017-01-27)
* (pix) converted serial to duofern code

### 0.2.3 (2017-01-25)
* (pix) fixed regexp issue within level datapoints for input of value 0
* (pix) new datapoint serial number of duofern product

### 0.2.2 (2017-01-24)
* (pix) fixed state datapoint updates

### 0.2.1 (2017-01-23)
* (pix) Device recognition by serial number optimized

### 0.2.0 (2017-01-15)
* (pix) removed parent from setObjects

### 0.1.1 (2017-01-15)
* (pix) Roles added

### 0.1.0 (2017-01-05)
* (pix) Travis CI supported

### 0.0.7 (2016-06-21)
* (pix) fixed RegEx and log

### 0.0.6 (2016-06-20)
* (pix) fixed switch control "false" by command id (cid)
* (pix) names of datapoints

### 0.0.5 (2016-06-19)
* (pix) user can choose sync time in settings
* (pix) switch control by command id (cid)

### 0.0.4 (2016-06-18)
* (pix) datapoint "level_interted" added for Homematic like appearance
* (pix) productNumber 46 added to switches

### 0.0.3 (2016-06-18)
* (pix) datapoint "state" added for switches (incl. productNumber #43)

### 0.0.2 (2016-06-16)
* (pix) error fixed

### 0.0.1 (2016-06-15)
* (pix) adapter created

## License

The MIT License (MIT)

Copyright (c) 2019 pix

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