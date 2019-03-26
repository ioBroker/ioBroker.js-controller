---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.corrently/edit/master//README.md
title: 相应的绿色能源指数
hash: vLf/DFEb+l/Lw5hXqMQ2J8upM/DHdFPC/PMWc8WeFPg=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: 阅读绿色能源指数
keywords: green energy, energy
readme: https://github.com/ioBroker/ioBroker.corrently/blob/master/README.md
mode: schedule
materialize: true
compact: false
published: 2019-20-07T23:30:01.182Z
version: 0.0.2
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.corrently.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.corrently.svg
BADGE-依赖状态: https://img.shields.io/david/GermanBluefox/iobroker.corrently.svg
BADGE-已知的漏洞: https://snyk.io/test/github/GermanBluefox/ioBroker.corrently/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.corrently.png?downloads=true
BADGE-特拉维斯-CI: http://img.shields.io/travis/GermanBluefox/ioBroker.corrently/master.svg
---
<h1><img src="zh-cn/adapterref/iobroker.corrently/admin/corrently.png" width="64"/> ioBroker.corrently </h1>

## Corrently适用于ioBroker的适配器
阅读[https://www.corrently.de/gsi/PLZ](https://www.corrently.de/gsi/80999)中的绿色能源指数。
将提供以下数据：

 - *data.json* - 使用绿色索引的下一个36小时的JSON表
 - *data.start* - 以绿色能量0 - 24开始下一个或当前时期的时间戳
 - *data.duration* - 绿色能量0 - 24的下一个或当前时期的持续时间
 - *data.green* - 现在是否是绿色能源
 - *data.price* - 当前时刻的绿色价格

##配置
适配器将每小时执行一次（例如可以设置为计划），用户必须在配置中输入post索引。

## CorrentlyAdapterfürioBroker
Lesen Sie den IndexdergrünenEnergievon [https://www.corrently.de/gsi/PLZ]（https://www.corrently.de/gsi/80999）。
Folgende Daten werdenzurVerfügunggestellt：

 - *data.json* - JSON-Tabellefürdienächsten36StundenmitgrünemIndex
 - *data.start* - Startzeitstempeldernächstenoderaktuellen PeriodemitgrünerEnergie0 - 24
 - *data.duration* - Dauerdernächstenoderaktuellen PeriodemitgrünerEnergie0 - 24
 - *data.green* - istjetztgrüneEnergieoder nicht
 - *data.price* - grünerPreisfürdenaktuellen当下

## Einstellungen
Der Adapterwirdstündlichausgeführt（kann beispielsweise als Zeitplan festgelegt werden），und der Benutzer muss den Post-index in der Konfiguration eingeben。

## Changelog

### 0.0.2
* (bluefox) CRON schedule was changed to "1 * * * *"

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019 bluefox

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