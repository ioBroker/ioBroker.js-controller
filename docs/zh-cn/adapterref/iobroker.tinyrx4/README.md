---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tinyrx4/README.md
title: ioBroker.tinyrx4
hash: WCXvCw2USMZuNPV7OuAYAc/BhULhccxu9wUup20j7Hw=
---
![商标](../../../en/adapterref/iobroker.tinyrx4/admin/tinyRX4.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.tinyrx4.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tinyrx4.svg)
![依赖状态](https://img.shields.io/david/bowao/iobroker.tinyrx4.svg)
![已知漏洞](https://snyk.io/test/github/bowao/ioBroker.tinyrx4/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tinyrx4.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/bowao/ioBroker.tinyrx4/master.svg)

＃ioBroker.tinyrx4
##用于ioBroker的TinyRX4适配器
（德语版本见下文）

读取通过TinyRX4接收的无线传感器数据

无线收发器TinyTX4和接收器TinyRX4由meigrafd在德国Raspberry Pi论坛中开发。

项目页面：https://forum-raspberrypi.de/forum/thread/7472-batteriebetriebene-funk-sensoren/

Github：

*收发器：https://github.com/meigrafd/TinyTX4
*接收者：https://github.com/meigrafd/TinyRX4

该项目的目的是运行由电池供电的无线传感器，并通过RaspberryPI接收和评估数据。

原则上，您可以使用所有类型的传感器作为传感器，例如温度，湿度，气压，高度计，存在传感器，磁性开关，振动传感器，湿度计等。

该ioBroker适配器支持在https://github.com/meigrafd/TinyTX4上发布的所有传感器草图

* BMP085（压力/温度传感器）
* DHT22（温度/湿度传感器）
* DS18B20（温度传感器）
* HCSR04（超声波传感器）
* ReedSwitch（门/窗触点）

进一步支持的草图：

* BME280（压力/温度/湿度传感器）https://github.com/bowao/tinytx4_bme280

在适配器配置中，可以设置串行接口和关联的波特率。此外，可以在已创建的传感器中搜索新的或意外删除的数据点，而无需再次创建整个传感器。

第一次接收消息后，将自动使用其节点ID创建传感器。仅创建通过msg变量检测到的那些数据点。此外，在“ config”下创建了关联的偏移数据点，以便可以在必要时校正传感器值。仅在传感器提供温度和相对湿度值的情况下，才在“计算值”下创建计算出的数据点绝对湿度和露点。

如果您使用其他具有自定义msg变量的传感器，则可以在适配器中实现此功能，也可以提出请求。 msg变量必须与已使用的变量不同。

已经使用过的味精变量

* d =距离
* h =湿度
*他=身高
* p =气压
* r =簧片接触
* t =温度
* v =电池电压

-------------------------------------------------------------------------------------------

## TinyRX4适配器适用于ioBroker
Einlesen der vom TinyRX4 empfangenen Funksensordaten

Fun Renderender TinyTX4和FunkempfängerTinyRX4在德国Raspberry Pi论坛上引起了轰动。

Projekt-Seite：https：//forum-raspberrypi.de/forum/thread/7472-batteriebetriebene-funk-sensoren/

Github：

*发件人：https://github.com/meigrafd/TinyTX4
*Empfänger：https：//github.com/meigrafd/TinyRX4

Ziel des Projekts ist，schnurlose Funk Sensoren，überBatterien versorgt werden，zu betreiben和mit dem RaspberryPI和Daten zu empfangen sowie auszuwerten。

Als Sensor kann man im Prinzip alle Arten von Sensoren verwenden，z.B.温度，Luftfeuchtigkeit，Luftdruck，Höhenmesser，Anwesenheitssensoren，Magnetschalter，Erschütterungs-Sensoren，Feuchtigkeitsmesserusw。

Dieser ioBroker适配器在https://github.com/meigrafd/TinyTX4 hinterlegten Sensorsketche下进行：

* BMP085（德鲁克/温度传感器）
* DHT22（温度/ Feuchtesensor）
* DS18B20（温度传感器）
* HCSR04（超传感器）
* ReedSwitch（Tür-/ Fensterkontakt）

WeitereunterstützteSketche：

* BME280（Druck- / Temperatur- / Feuchtesensor）https://github.com/bowao/tinytx4_bme280

在Adapter Konfiguration中，Serielle Schnittstelle和ZugehörigeBaudrate einstellen都可以使用。最优惠的价格，是最优惠的价格。

Node-Id angelegt传感器传感器自动上载Nachrichten-Empfang自动机。埃斯·沃登（Es werden）使戴顿（Datenpunkte Angelegt）感到厌烦，而消息（MSG-Variablen erkannt wurden）也是如此。 Zusätzlichwerden在“配置”中抵消了Datenpunkte erstellt，并在Bedarf korrigiert werdenkönnen中失去了Sensorwerte。 “计算”出的日期不正确，日期则从绝对值开始，从传感器到温度和相对值从零开始。

下降，传感器下降，MSG-Variablen Verwendet下降，Kann ich死于Gerne，适配器下降，下降。死于味精-瓦里安·穆森（VichablenMüssen）

Bereits benutzte msg-Variablen：

* d =进修
* h = Luftfeuchte
*他=呵呵
* p =陆克文
* r =里德·康塔克
* t =温度
* v =电池寿命

## Changelog
### 0.1.4
- (bowao) fix typo

### 0.1.3
- (bowao) fix npm Version

### 0.1.2
- (bowao) close serialport on unload and cleanup 2

### 0.1.1
- (bowao) close serialport on unload and cleanup

### 0.1.0
- (boawo) add option to search new data points on already created sensors
- (bowao) add calculated data points humidity_absolute and dew point
- (bowao) remove TiNo support (TiNo now has his own adapter)

### 0.0.3
- (bowao) add support for TiNo
- (bowao) bugfix

### 0.0.2
- (bowao) cleanup and npm release

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