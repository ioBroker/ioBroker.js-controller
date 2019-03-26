---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/Omega236/ioBroker.virtualpowermeter/edit/master//README.md
title: Virtual Powermeter
hash: HBsrvOqmlVU3gl72E4L7SD4u97k/4ZAYYxiWWwwoumY=
adapter: true
license: MIT
authors: Lutz Sebastian <general.of.omega@googlemail.com>
description: Generates virtual electricity meters
keywords: ioBroker, template, Smart Home, home automation
readme: https://github.com/Omega236/ioBroker.virtualpowermeter/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2019-03-07T23:23:01.398Z
version: 1.0.0
BADGE-安装数量: http://iobroker.live/badges/virtualpowermeter-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.virtualpowermeter.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.virtualpowermeter.svg
BADGE-依赖状态: https://img.shields.io/david/Omega236/iobroker.virtualpowermeter.svg
BADGE-已知的漏洞: https://snyk.io/test/github/Omega236/ioBroker.virtualpowermeter/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.virtualpowermeter.png?downloads=true
BADGE-特拉维斯-CI: http://img.shields.io/travis/Omega236/ioBroker.virtualpowermeter/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Omega236/ioBroker.virtualpowermeter?branch=master&svg=true
---
<h1><img src="zh-cn/adapterref/iobroker.virtualpowermeter/admin/virtualpowermeter.png" width="64"/> ioBroker.virtualpowermeter </h1>

适用于ioBroker的## virtualpowermeter适配器
Erzeugt Virtuelle Strommesser

Im Smarthome帽子男人vieleGerätedieman zwar schalten kann，diese aber keinen integrierten Powermeter haben（meist Lichter）。

Mit diesem Adapter ist das Ziel zu jedem eingestelltem Datenpunkt（überCustom - > MaxWatt（z.B.60W））zweizusätzlicheDatenpunktezubefüllen - > Energy_Power（z.B。60 W）und Energy_Total（z.B。2501,23 Wh）。
ZusätzlichwerdenGruppen gebildet（diese werden unter virtualpowermeter.0.xxx abgelegt）die die summe der einzelnen Datenpunkte darstellt

Mit diesen neuen Datenpunkten kann dann eine EinfacheVisualiserungdurchgeführtwerden。

Die neuen Datenpunkte（besonders die Gruppen）könntensupermit Sourceanalytix weiterverarbeitet werden

siehe MeinBeispiel.jpg

## Changelog

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

Copyright (c) 2019 Lutz Sebastian

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