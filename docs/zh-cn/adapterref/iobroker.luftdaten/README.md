---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.luftdaten/README.md
title: ioBroker.luftdaten
hash: t++RIFfnayjNaUPWkpg1D5IUURSloAA+5zk3veApoN0=
---
![商标](../../../en/adapterref/iobroker.luftdaten/admin/luftdaten.png)

![安装数量](http://iobroker.live/badges/luftdaten-stable.svg)

＃ioBroker.luftdaten
此适配器将“luftdaten.info”传感器数据添加到ioBroker安装中。您可以决定是否要通过ip添加本地传感器，或者只是想使用lufdaten.info的API来获取另一个传感器的数据。

##配置
### Local
1.构建自己的适配器并将其添加到本地wifi网络
2.创建适配器的新实例
3.选择“本地”作为类型
4.在第二个输入中填写传感器的IP或主机名
5.选择名称并保存设置

等待几分钟，直到cronjob第一次收集数据。

*随意更改实例选项卡中的计划设置（默认为每5分钟）。*

###远程
1.在在线地图上选择一个传感器：[deutschland.maps.luftdaten.info]（https://deutschland.maps.luftdaten.info/）
2.单击传感器并复制ID（#XXXXX）
3.创建适配器的新实例
4.选择“远程”作为类型
5.在第二个输入中填充传感器的ID
6.选择名称并保存设置

等待几分钟，直到cronjob第一次收集数据。

*随意更改实例选项卡中的计划设置（默认为每5分钟）。*

##贡献者
 -  klein0r
 -  pix
 -  GermanBluefox
 -  Apollon77

## Changelog

### 0.0.7
* (klein0r) merged pull requests - thanks a lot for contribution

### 0.0.6
* (klein0r) changed type to weather

### 0.0.5
* (klein0r) fixed issues when sensor is not available
* (klein0r) added location information for remote sensors

### 0.0.4
* (pix) path is IP if sensor is local

### 0.0.3
* (pix) path and sensor name added

### 0.0.1
* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2019 Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.