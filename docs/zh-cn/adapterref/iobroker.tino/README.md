---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: Jsy7pGbLgbQrUXPWGCOXwH9kDfkuCeYCNcl/OjDrB3c=
---
![商标](../../../en/adapterref/iobroker.tino/admin/tino.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.tino.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tino.svg)
![依赖状态](https://img.shields.io/david/bowao/iobroker.tino.svg)
![已知漏洞](https://snyk.io/test/github/bowao/ioBroker.tino/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tino.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/bowao/ioBroker.tino/master.svg)

＃ioBroker.tino
## Tiio ioBroker适配器
（德语版本见下文）

读取通过TiNo 1.01版收到的无线传感器数据

无线收发器TiNo由nurazur开发。

项目页面：https：//nurazur.wordpress.com/

GitHub：https://github.com/nurazur/TiNo

TiNo是TinyTX4 / TinyRX4无线传感器的逻辑和一致的发展。

*优化的电池寿命（使用CR2032电池5年或更长时间）
*优化范围
*优化的安全性
*优化的简便性
*优化的可靠性

第一次接收消息后，将自动创建传感器及其节点ID。
此外，在“ config”下创建了关联的偏移数据点，以便可以在必要时校正传感器值。

将创建以下数据点：

* NodeId
* RSSI
* 电池电压
*留言台
*温度
*偏移温度（必要时校正值）
*湿度
*偏移湿度（必要时校正值）
*标志
* FEI
* RFM69温度
*比特错误

-------------------------------------------------------------------------------------------

## TiNo适配器适用于ioBroker
Einlesen der vom TiNo版本1.01 empfangenen Funksensordaten

Dunk Funksender和-empfängerTiNo wurden von nurazur entwickelt。

Projekt-Seite：https：//nurazur.wordpress.com/

GitHub：https://github.com/nurazur/TiNo

TinyTX4 / TinyRX4 Funksensoren的逻辑和识别方法。

* optimierte Batterielebensdauer（5 Jahre oder mehr mit einer CR2032 Batterie）
*优化Reichweite
*优化Sicherheit
*最佳实践
*优化Zuverlässigkeit

Node-Id angelegt传感器传感器自动上载Nachrichten-Empfang自动机。
Zusätzlichwerden在“配置”中抵消了Datenpunkte erstellt，并在Bedarf korrigiert werdenkönnen中失去了Sensorwerte。

Folgende Datenpunkte werden angelegt：

* NodeId
* RSSI
*电池
*Nachrichtenzähler
*温度
*偏移温度（Korrekturwert bei Bedarf）
* Feuchte
*偏移Feuchte（北贝达夫的Korrekturwert）
*标志
* FEI
* RFM69温度
*比特错误

## Changelog

### 0.0.5
- (bowao) Add datapoints interrupt an heartbeat
- (bowao) Set default baudrate to 38400
- (bowao) Close serialport on unload and cleanup

### 0.0.4
- (bowao) Resize logo

### 0.0.3
- (bowao) Update readme

### 0.0.2
- (nurazur) Add logo

### 0.0.1
- (bowao) initial release

## License
MIT License

Copyright (c) 2019 bowao

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