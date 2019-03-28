---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ham/README.md
title: ioBroker Homebridge配件经理
hash: GXblfm8LZgTzMcAAaBLkqRMDAApWKCYG+LGhtLBXsNw=
---
![商标](../../../en/adapterref/iobroker.ham/admin/ham.png)

![安装数量](http://iobroker.live/badges/ham-stable.svg)
![Greenkeeper徽章](https://badges.greenkeeper.io/ioBroker/ioBroker.ham.svg)

＃ioBroker Homebridge配件经理
=================

在ioBroker中使用Homebridge插件或运行全局安装的Homebridge作为ioBroker适配器。
Homebridge的所有国家也将在ioBroker中提供，也可以在那里进行控制。

##说明
此适配器提供两种不同的模式：

###默认（包装）模式
在默认模式下，适配器允许您直接使用homebridge插件模块。
您可以通过[正在搜索关键字“homebridge-plugin”](https://www.npmjs.com/search?q=homebridge-plugin)在NPM网站上浏览所有可用的插件。

您只需将模块列表添加到适配器配置中，并在JSON编辑器中提供配置（请参阅插件说明）。
在此之后，所有Homebridge对象也将在ioBroker中创建，并且所有可写对象也可以更改。

可以在此处找到成功尝试过的插件与示例的链接：https：//forum.iobroker.net/viewtopic.php？f = 20＆t = 15021

### Global-Homebridge-Mode
如果您已经使用Homebridge（Apple OpenSource SmartHome）来控制您的设备，那么您可以使用现有的Homebridge安装并以ioBroker流程启动此Homebridge安装。在这种情况下，Homebridge服务器由ioBroker启动。
此外，Homebridge的所有州都可以作为ioBroker中的州使用，并允许从ioBroker进行控制。

为此，您需要提供系统global node-modules文件夹的位置。对于这个电话** npm root -g **。此外，您需要提供homebridge配置目录的路径（通常是users文件夹中的.homebridge）。

##以下适配器在默认模式下进行了测试
* homebridge-chamberlain v1.0.1  - 用MyQ插入Chamberlain车库门开启器
* homebridge-doorbird v0.0.4  - 门鸟插件
* homebridge-dyson-link v2.2.2  -  Dyson Link设备
* homebridge-edomoticz v2.1.11  -  Domoticz的完全成熟的插件
* homebridge-Fibaro-HC2 v2.1.5  -  Fibaro HomeCenter集成
* homebridge-homee v0.2.4  - 一个完全成熟的Homee最新插件
* homebridge-ikea-tradfri-gateway v1.0.26  -  Tradfri
* homebridge-noolite v0.0.29  -  Noolite通过USB MTRF-64或МТRF-64模块
* homebridge-platform-wemo v1.0.1  -  Belkin WeMo平台插件
* homebridge-seasons v1.0.1  - 显示当年当前季节的插件。
* homebridge-vera v0.8.2  -  VeraLink是Vera的Z-Wave配件应用程序（Node.js 8.11.3）

＃＃ 去做
*测试
*更多文档？！

## Changelog

### 1.0.1 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.0.0 (WIP)
* (Apollon77) add polling interval to global mode
* (Apollon77) add option to use insecure flag in wrapper mode

### 0.4.5 (2018.08.21)
* (Apollon77) issues fixed

### 0.4.4 (2018.08.07)
* (Apollon77) corrected automatic role determination and bugs fixed

### 0.4.2 (2018.06.25)
* (Apollon77) Fix for global mode

### 0.4.1 (2018.06.21)
* (Apollon77) option to poll values from the plugins added and other optimizations

### 0.3.1 (2018.06.20)
* (kirovilya) Fixed a bug in global mode that values were not reported back to iOS devices

### 0.3.0 (2018.06.20)
* (bluefox) Support of ham plugins was added

### 0.2.6 (2018.06.19)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.5 (2018.06.18)
* (Apollon77) Catch all console logs from Homegridge and make available as debug log

### 0.2.4 (2018.06.18)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.3 (2018.06.17)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.2 (2018.06.17)
* (Bluefox) Fixes for JSON editor in Firefox and Chrome

### 0.2.0/0.2.1 (2018.06.17)
* (Apollon77) Public test version with both modes
* (Bluefox) Admin3

### 0.1.0 (2018.06.09)
* (Apollon77) Update for working mode 1

### 0.0.1 (2018.03.24)
* (kirovilya) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018 Apollon77 <ingo@fischer-ka.de>

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