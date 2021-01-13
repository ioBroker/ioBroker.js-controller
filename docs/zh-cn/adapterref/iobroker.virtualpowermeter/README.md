---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.virtualpowermeter/README.md
title: 无题
hash: LWL1G057vp6UifFgeueZESq/7mD3mWlfnJWE9QcpSGo=
---
![节点](https://img.shields.io/node/v/iobroker.virtualpowermeter.svg)
![安装数量](http://iobroker.live/badges/virtualpowermeter-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.virtualpowermeter.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.virtualpowermeter.svg)
![依赖状态](https://img.shields.io/david/Omega236/iobroker.virtualpowermeter.svg)
![已知漏洞](https://snyk.io/test/github/Omega236/ioBroker.virtualpowermeter/badge.svg)
![NPM](https://nodei.co/npm/iobroker.virtualpowermeter.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Omega236/ioBroker.virtualpowermeter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Omega236/ioBroker.virtualpowermeter?branch=master&svg=true)
![执照](https://img.shields.io/npm/l/iobroker.virtualpowermeter.svg)

<h1><img src="admin/virtualpowermeter.png" width="64"/>ioBroker.virtualpowermeter</h1>

##用于ioBroker的virtualpowermeter适配器
埃泽格·维图尔·斯特罗梅瑟

我是Smarthome帽子的生产商，生产商是zwar schalten kann，生产商是Powermeter haben（迈克·利希特）。

Mit Diesem Adapter ist das Ziel zu jedem eingestelltem Datenpunkt（überCustom-> MaxWatt（z.B. 60W））zweizusätzlicheDatenpunkte zubefüllen-> Energy_Power（z.B. 60 W）和Energy_Total（z.B. 2501,23 Wh）。
Zusätzlichwerden Gruppen gebildet（virtualpowermeter.0.xxx版本的死者werden）

您可以在这里找到更多信息。

Die neuen Datenpunkte（Besonders die Gruppen）könnten超级麻省理工学院valuetrackerovertime weiterverarbeitet werden

权力与权力的绝对统一Sobald der Pfad einen“。”热衷于绝对的继承和继承。等级较高的人员在Das eigene virtualpowermeter中导致Datenpunkte死亡0 abzulegen <img src="https://user-images.githubusercontent.com/25373047/104218659-5920eb80-543d-11eb-8e20-774822d489a7.png" />

Beispiel mit valuetracker超时：<img src="MeinBeispiel2.jpg" />

## Changelog
### 1.2.2 (2020-12-26
* (Lutz Sebastian) Group Calculations only after InitialFinished
### 1.2.1 (2020-04-15)
* (Lutz Sebastian) translation
### 1.2.0 (2020-04-15)
* (Lutz Sebastian) js-controller 3.x support
### 1.1.1 (2020-04-07)
* (Lutz Sebastian) bugfix translation
### 1.1.0 (2020-04-05)
* (Lutz Sebastian) inverted added
### 1.0.1
* (Lutz Sebastian) SecurityUpdates
### 1.0.0
* (Lutz Sebastian) Final Release
### 0.2.8
* (Lutz Sebastian) Bug found on travis unsubscribeStatesAsync
### 0.2.6
* (Lutz Sebastian) texts adapted
### 0.2.5
* (Lutz Sebastian) awaits missing
### 0.2.4
* (Lutz Sebastian) var remove and SettingPage Info and dic in class and .bind(this) (Template 1.10)
### 0.2.3
* (Lutz Sebastian) CodeOptimierung nach eslint
### 0.2.1
* (Lutz Sebastian) CodeOptimierung und bild
### 0.2.0
* (Lutz Sebastian) Alle Funktionen implementiert, code noch nicht überprüft/optimiert/getestet
### 0.1.0
* (Lutz Sebastian) Erste Version mit Grundfunktionalität
### 0.0.1
* (Lutz Sebastian) initial release

## License
MIT License

Copyright (c) 2021 Lutz Sebastian general.of.omega@googlemail.com

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