---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.omron-fins/README.md
title: ioBroker.omron鳍
hash: C6+WSTKgHSrkPim8raQuThxjy5jHkWNqoo4afVq6R74=
---
![商标](../../../en/adapterref/iobroker.omron-fins/admin/omron-fins.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.omron-fins.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.omron-fins.svg)
![安装数量（最新）](http://iobroker.live/badges/omron-fins-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/omron-fins-stable.svg)
![依赖状态](https://img.shields.io/david/thebam1990/iobroker.omron-fins.svg)
![已知漏洞](https://snyk.io/test/github/thebam1990/ioBroker.omron-fins/badge.svg)
![NPM](https://nodei.co/npm/iobroker.omron-fins.png?downloads=true)

＃ioBroker.omron-fins
**测试：**![测试与发布](https://github.com/thebam1990/ioBroker.omron-fins/workflows/Test%20and%20Release/badge.svg)

##对于德语
https://github.com/TheBam1990/ioBroker.omron-fins/blob/master/Readmede.md

## IoBroker的omron-fins适配器
通过FINS协议连接所有CJ2M或CJ1M型号的Omron PLC

##用户手册（英文）
在主设置选项卡中调整PLC的IP地址。
该端口是标准端口，通常不需要调整。
轮询值以毫秒为单位指定，并指示对值的周期性查询。

要拾取的变量在设备选项卡中输入。只需用+添加一个新变量，然后分配一个可自由选择的名称。请分别命名每个变量，而不要立即命名。
在“变量”区域中，输入要获取的输入或输出变量CB0：00，CB0：01 CB100：00等的变量。请始终使用冒号将它们分开。 W31：00等也适用于标志。 D1值等也可以获取。
在类型选项卡中，选择变量类型，因为它存储在PLC中。

## Changelog
<!--
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ ( - falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben )
-->
### 0.0.2 (2021-03-05)
* (Thebam) Änderungen im Abrufen Verbesserung des Intervall

### 0.0.1 (2021-02-22)
* (Thebam) Update Abhängigkeiten 

### 0.0.1-7 (2021-02-08)
* (Thebam) NPM Aktualisiert

### 0.0.1-6 (2021-02-07)
* (Thebam) Änderungen für Repro eingetragen

### 0.0.1-5 (2021-01-01)
* (Thebam) io-package angepasst

### 0.0.1-4 (2021-01-01)
* (Thebam) package json angepasst

### 0.0.1-3 (2021-01-01)
* (Thebam) adater checker anpassung

### 0.0.1-2 (2021-01-01)
* (Thebam) native objekt ip geändert


### 0.0.1-1 (2021-01-01)
* (Thebam) add GitHub Action

### 0.0.1
* (Thebam) initial release
Erste version zum Abholen und schreiben der variablen

## License
MIT License

Copyright (c) 2021 thebam 

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