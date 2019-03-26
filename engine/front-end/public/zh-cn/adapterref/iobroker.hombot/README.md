---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/AlGu1/ioBroker.hombot/edit/master//README.md
title: LG HomBot
hash: DwRKXKN9asmG7sZqS4HcJMOgWKUrIOQ4B0zUANzQ8xg=
adapter: true
license: MIT
authors: Alexander Gurtzick <algu1@outlook.de>
description: LG HomBot
keywords: LG HomBot
readme: https://github.com/AlGu1/ioBroker.hombot/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2019-03-13T16:10:00.000Z
version: 0.1.3
BADGE-安装数量: http://iobroker.live/badges/hombot-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.hombot.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.hombot.svg
BADGE-特拉维斯-CI: https://img.shields.io/travis/AlGu1/ioBroker.hombot/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/AlGu1/ioBroker.hombot?branch=master&svg=true
BADGE-NPM: https://nodei.co/npm/iobroker.hombot.png?downloads=true
---
<img src="zh-cn/adapterref/iobroker.hombot/admin/hombot.png"></img>

＃ioBroker.hombot
=================

DieserAdapterermöglichtdieSteuerung und das Auslesen eines LG HomBot Staubsauger-Roboters bei dem der WLAN-Hack installiert ist。 Das WidgetkannfürdieSteuerung und Anzeige der Statuswerte in Vis benutzt werden。

＃＃ 要求
*FürdieNutzung死亡适配器是WLAN Hack（http://www.roboter-forum.com/showthread.php?10009-LG-Hombot-3-0-WLAN-amp-Kamera-Steuerung-per-Weboberfläche）erforderlich 。

##配置
*FürdieKonfiguration muss mindestens die URL（mit Port）eingetragen werden。 Interstall是Das Polling und dessen Intervall的可选项目，其名称为Status-Werte auszulesen。

   ![截图](zh-cn/adapterref/iobroker.hombot/../../../en/adapterref/iobroker.hombot/img/settings.png)

*在Den Einstellungen des Vis-Widget muss als Object ID z.B. “hombot.0”eingetragen werden。

   ![截图](zh-cn/adapterref/iobroker.hombot/../../../en/adapterref/iobroker.hombot/img/widget.png)

＃＃ 去做
* Weitere Kommandos einbauen（Stimme，Nameändern，Manuelle Steuerung）
* WeiteresWidgetfürKamerabild
* WeiteresWidgetfürletzte地图
* Travis-CI / AppVeyor测试einbauen

*

## Changelog
### 0.1.3
* (AlGu1) Remove message receive handling, because not used

### 0.1.2
* (AlGu1) Latest repository settings and vis widget JS changes

### 0.1.1
* (AlGu1) Fix syntax error in main.js

### 0.1.0
* (AlGu1) Add JS-Controller compact mode 

### 0.0.9
* (AlGu1) Change settings

### 0.0.8
* (AlGu1) Merge pull request and change settings for adapter checker

### 0.0.7
* (AlGu1) Disable error log if hombot not conected

### 0.0.6
* (AlGu1) Admin3 changes

### 0.0.5
* (AlGu1) Adding test with Travis-CI and AppVeyor

### 0.0.4
* (AlGu1) Fix widget connection state icon

### 0.0.3
* (AlGu1) Extend ReadMe

### 0.0.2
* (AlGu1) Add many functions and vis widget

### 0.0.1
* (AlGu1) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 Alexander Gurtzick <algu1@outlook.de>

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