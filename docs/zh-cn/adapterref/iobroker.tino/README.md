---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tino/README.md
title: ioBroker.tino
hash: 5EyTLSIHjhIfH6MS/cb+yVrDxgGfH0Kijr4bXEZyRNk=
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

读取通过TiNo协议版本1.01和TiNo协议版本2.0接收的无线传感器数据。
根据收到的数据自动检测到相应的协议版本。

无线收发器TiNo由nurazur开发。

项目页面：https：//nurazur.wordpress.com/

GitHub：https://github.com/nurazur/TiNo

“ **TI** ny **NO** de”：电池供电的无线传感器或无线actor。该项目的目标是开发小尺寸，经济高效的电池供电无线传感器。传感器与网关通信，例如树莓派。目标是：

*成本低（BOM低于5欧元）
*非常小的尺寸（火柴盒）
*超低睡眠电流
*电池寿命长：CR2032电池5年以上
*远程（这意味着什么：-)，但实际上很长）
*易于建立
*通讯安全
*即插即用固件

传感器几乎可以是任何传感器，例如温度，相对湿度，气压，高度计，光强度，紫外线指数，运动检测器，簧片开关等。

在适配器配置中，可以设置串行接口和关联的波特率。
激活学习模式后，将在第一次接收消息后自动创建传感器及其节点ID和所有识别的数据点。
学习模式将在10分钟后自动结束，并且可以通过数据点“ learningMode”在“ info”下重新激活10分钟。
关联的偏移数据点在“ config”下创建，以便可以根据需要校正传感器值。
仅在传感器提供温度和相对湿度值的情况下，才在“计算值”下创建计算出的数据点绝对湿度和露点。

将为接收器协议1.01版创建以下数据点：

* NodeId
* RSSI
* 电池电压
*留言台
*温度
*湿度
*心跳（仅在协议版本1.01中）
* Interupt 1、2和3
*频率错误指示器（仅在协议版本1.01中）
* RFM69温度（仅在协议版本1.01中）
*位错误

此外，还会为接收器协议版本2.0（如果有）创建以下数据点。

*中断4到8
*同步
*链接质量指标
*频偏
*距离（仅安装了距离传感器）
*高度（仅安装了高度传感器）
*气压（仅安装气压传感器）
*联系人（仅安装了簧片触点）

-------------------------------------------------------------------------------------------

## TiNo适配器适用于ioBroker
TiNo版本1.01和TiNo版本2.0的Funksensordaten。
模版Protokoll版本可以自动更新到Daten erkannt。

Dunk Funksender和-empfängerTiNo wurden von nurazur entwickelt。

Projekt-Seite：https：//nurazur.wordpress.com/

GitHub：https://github.com/nurazur/TiNo

“ **TI** ny **NO** de”：Batteriebetriebener Funksensor或Funk-Aktor。齐埃尔（Ziel）死于工程学专家（Entwicklung schnurloser Funk Sensoren），死于überBatterien versorgt werden und z.B. MIT DEM Raspberry Pi kommunizieren。 Entwicklung帽子zum Ziel：

*最低限度的科斯滕（Stückkosten下5欧元）
*极简格罗斯（Streichholzschachtel）
*最小的Stromverbrauch
*最大的Batterielebensdauer（5 Jahre oder mehr）
*最大Reichweite
*最大einfach nachzubauen
*即插即用固件

Als Sensor kann man so ziemlich alles verwenden，ob Temperatur，Luftfeuchtigkeit，Luftdruck，Höhenmesser，Lichtintensität，UV Index，Anwesenheitssensoren，Magnetschalter，Erschütterungs-Sensoren，Feuchtigkeitsmesser usw以及其他产品。

在适配器配置中，需要Serielle Schnittstelle和ZugehörigeBaudrate einstellen。
温恩·安德勒莫德斯（Wenn der Anlermodus）运动家，传感器节点的自动识别与节点标识符和日期的自动生成。
Der Anlernmodus缠绳10分钟。 10分钟后，自动发送信息和通知“信息”到“日期模式”。 erneut aktiviert werden。
取消“配置”设置后的偏移量，将Datenpunkte设置为，将传感器设置为Bedarf korrigiert的设置范围。
“计算”出的日期不正确，日期则从绝对值开始，从传感器到温度和相对值从零开始。

Folgende Datenpunkte版本1.01版本的Angelegt：

* NodeId
*Signalstärke（RSSI）
*电池
*Nachrichtenzähler
*温度
* Feuchte
*心跳（Protokoll版本1.01中的Nur）
*中断1之二3
* Frequenzfehler指标（Protokoll版本1.01中的Nur）
* RFM69 Temperatur（Protokoll版本1.01中的Nur）
* Bitfehler

版本2.0的原始版本。

*中断4之二8
*同步
*卡纳尔古特
* Frequenzversatz
* Entfernung（神经传感器安装Entfernungssensor）
*Höhe（Nur bei installiertemHöhensensor）
* Luftdruck（Nur bei installiertem Luftdrucksensor）
* Reed-Kontakt（努尔贝伊安装公司Reed-Kontakt）

## Changelog
### 0.1.1
- (bowao) New learning mode with 10min. auto-timeout

### 0.1.0
- (bowao) Add tino protocol V2.0 support
- (bowao) Add option to search new data points on already created sensors
- (bowao) Add calculated data points humidity_absolute and dew point

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