---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: aAgpzMQSPRFzfXLU6vJ8g9hjY9lngmIhTi6UkHFu6Jo=
---
![商标](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![安装数量](http://iobroker.live/badges/schoolfree-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![下载](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![依赖状态](https://img.shields.io/david/simatec/iobroker.schoolfree.svg)
![已知的漏洞](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![特拉维斯-CI](http://img.shields.io/travis/simatec/ioBroker.schoolfree/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/simatec/ioBroker.schoolfree?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.schoolfree.png?downloads=true)

#ioBroker.schoolfree
适用于ioBroker的## schoolfree适配器
### Deutsche Beschreibung：
Schoolfree ist einAdapterfüriobrokerInstallationen。
Mit dem Adapter lassen sich die Schulferien auswerten und inDatenpunkteübergeben。
DieDatenpunktekönnenomitfürweitereFunktionen wie Heizungssteuerungen，Rolladen- und Anwesenheitssteuerungen ausgewertet und verarbeitet werden。

Der aktuelle Bezug vonTerminenfürdieSchulferienerfolgtüberdieAPI von https://www.mehr-schulferien.de

Aktuell werden die Schulferien und freienTagefürDeutschlandunterstützt。

Folgende Datenpunkte stehen mitSchoolfreefürdieweitere VerarbeitungzurVerfügung：

* info.current.end：DatumfürdasEnde der aktuellen Ferien
* info.current.name:Bezeichnung der aktuellen Schulferien
* info.current.start:Fartdatum der aktuellen Ferien
*info.next.end:GatumfürdasEndedernächstenFerien
* info.next.name:BezeichnungdernächstenSchulferien
* info.next.start:StartdatumdernächstenFerien
* info.today：Switchfürdenaktuellen状态heute（true / false）
* info.tomorrow：Switchfürdenaktuellen状态morgen（true / false）

*************************************************************************************************************************************

###英文说明：
Schoolfree是iobroker安装的适配器。
使用适配器，可以评估学校假期并将其转移到数据点。
因此，可以评估和处理数据点以用于其他功能，例如加热控制，快门和存在控制。

目前的学校假期订阅是通过https://www.mehr-schulferien.de的API

目前，支持德国的学校假期和休假。

以下数据点可供Schoolfree进一步处理：

* info.current.end：当前假期结束的日期
* info.current.name：当前学校假期的名称
* info.current.start：当前假日的开始日期
* info.next.end：下一个假期结束的日期
* info.next.name：下一个学校假期的名称
* info.next.start：下一个假期的开始日期
* info.today：今天切换当前状态（true / false）
* info.tomorrow：明天切换当前状态（true / false）

*************************************************************************************************************************************

## Changelog

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 simatec

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