---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.odl/README.md
title: ioBroker.odl
hash: Jts9Oc6Ce70T3TKN1f7AohQAa4ZawDryzULKAbAkGsY=
---
![商标](../../../en/adapterref/iobroker.odl/admin/odl.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.odl.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.odl.svg)
![安装数量（最新）](https://iobroker.live/badges/odl-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/odl-stable.svg)
![依赖状态](https://img.shields.io/david/crycode-de/iobroker.odl.svg)
![NPM](https://nodei.co/npm/iobroker.odl.png?downloads=true)

＃ioBroker.odl
**测试：**![测试与发布](https://github.com/crycode-de/iobroker.odl/workflows/Test%20and%20Release/badge.svg)

## IoBroker的ODL适配器
此适配器将德语[联邦辐射防护办公室（Bf.S.BundesamtfürStrahlenschutz）](https://www.bfs.de/)的指定测量点的ODL（Ortsdosisleistung /环境剂量率）值集成到ioBroker中。

有关德国环境剂量率的更多信息，请访问https://odlinfo.bfs.de/。

---

ioBroker中的Dieser Adapter integriert ODL（Ortsdosisleistung），由[德国联邦议院（BfS）](https://www.bfs.de/)组成。

联邦国防军总参谋长梅斯泰伦（Metsstellen）参加了1800场比赛，永久性比赛（Ortsdosisleistung）参加了比赛。 BfS gesammelt铸造工，德国_Datenlizenz铸造工匠。

有关ODL的信息，请访问https://odlinfo.bfs.de/。

“ Dieser Adapter”（第1部分）和“ Dester Adapter”（第1部分）和“ Dester-Mittelwerte der Messdaten”（第1部分）网络功能服务（WFS）。 Das BfS ist Urheber der vom适配器verwendeten Daten。
历史适配器（历史记录，influxdb oder sql），erkannt，dann werden gegebenenfalls in der Historie fehlende Datenpunkte durch den适配器自动生成，sadass sichvollständigeZeitreihen ergeben。

模具标准件适配器。 Ef geringerer Aktualisierungsintervall ist meist nicht sinnvoll，Df zu Grunde liegenden Messdaten auf dem BfS-Server（abhängigvon der Messstelle）größtenteilsstündlichaktualisiert werden。

---

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

## Changelog

### 1.1.0 (2020-12-21)
* (crycode-de) Added Sentry error reporting
* (crycode-de) Updated dependencies

### 1.0.7 (2020-10-14)
* (crycode-de) Added timeout to force exit the adapter after 10 minutes in case of any problems
* (crycode-de) Updated dependencies

### 1.0.6 (2020-10-01)
* (crycode-de) Hopefully fixed a bug where adapter did not exit as expected
* (crycode-de) Updated dependencies

### 1.0.5 (2020-02-05)
* (crycode-de) Use of `extendObject` to update names of existing objects.

### 1.0.4 (2020-02-03)
* (crycode-de) Updated connectionType and dataSource in io-package.json.

### 1.0.3 (2020-01-23)
* (crycode-de) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.0.2 (2019-10-22)
* (crycode-de) Minimum required js-conntroller version is now 1.5.7

### 1.0.1 (2019-10-14)
* (crycode-de) initial release

## License

Copyright (c) 2019-2020 Peter Müller <peter@crycode.de>

Data (c) [German Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/), [Data licence Germany – attribution – Version 2.0](http://www.govdata.de/dl-de/by-2-0)

### MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.