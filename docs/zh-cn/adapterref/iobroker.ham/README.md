---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ham/README.md
title: ioBroker Homebridge配件经理
hash: VVjUsOWBM3T0R4hTH7h7G0A7fshotq1t3rSBmkuux4A=
---
![标识](../../../en/adapterref/iobroker.ham/admin/ham.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.ham.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.ham.svg)
![安装数量（最新）](https://iobroker.live/badges/ham-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ham-stable.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.ham.svg)
![NPM](https://nodei.co/npm/iobroker.ham.png?downloads=true)

＃ioBroker Homebridge配件管理器[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/ham/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
**测试：**![测试与发布](https://github.com/ioBroker/ioBroker.ham/workflows/Test%20and%20Release/badge.svg)

在ioBroker中使用Homebridge插件，或将全局安装的Homebridge作为ioBroker适配器运行。
来自Homebridge的所有州也将在ioBroker中可用，也可以在那里进行控制。

＃＃ 描述
该适配器提供三种不同的模式：

###默认（包装器）模式
在默认模式下，适配器允许您直接使用homebridge插件模块。
您可以通过[搜索关键字“ homebridge-plugin”](https://www.npmjs.com/search?q=homebridge-plugin)在NPM网站上浏览所有可用的插件。

您只需将模块列表添加到Adapter配置中，并在JSON编辑器中提供配置（请参阅插件说明）。
此后，所有Homebridge对象也将在ioBroker中创建，所有可写对象也可以更改。

**重要提示：此模式允许使用提供的homebridge插件的设备集成。没有提供Home App可以使用的“桥梁”！**

可以在此处找到已成功尝试的插件和示例的链接：https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### Local-Homebridge-Mode
如果您希望拥有一个已发布的网桥供Home App使用，并且还希望通过ioBroker与之交互并获取数据，但尚未安装Homebridge，请使用此模式。

本地模式将安装当前兼容的Homebridge版本，并以ioBroker用户身份运行它。您可以使用ioBroker提供完整的homebridge配置。
Homebridge模块的安装也可以通过ioBroker完成。

**重要提示：使用子桥（自1.3.x版以来具有新的家庭桥功能）时，适配器无法访问这些子桥提供的数据！仅主桥可访问！**

### Global-Homebridge-Mode
如果已经在运行ioBroker的主机上将Homebridge（Apple OpenSource SmartHome）用作全局安装，则可以使用此现有Homebridge安装并以ioBroker进程的形式启动此Homebridge安装。在这种情况下，Homebridge服务器由ioBroker启动。
此外，Homebridge的所有状态都可以作为ioBroker中的状态使用，并允许从ioBroker中进行控制。

为此，您需要提供系统全局节点模块文件夹的位置。为此调用** npm root -g **。另外，您需要提供homebridge配置目录的路径（通常是“ users”文件夹中的.homebridge）。

**重要提示：ioBroker以“ iobroker”用户身份运行，但homebridge通常以root或homebridge用户身份运行（取决于您的安装方式）。您需要确保ioBroker用户可以访问homebride的“ persistance”文件夹，否则您将看到无法保存文件的错误（这可能会使适配器崩溃！）**

**重要提示：使用子桥（自1.3.x版以来具有新的家庭桥功能）时，适配器无法访问这些子桥提供的数据！仅主桥可访问！**

##以下插件在默认模式下进行了测试
* homebridge-chamberlain v1.0.1-带MyQ的Chamberlain车库门开启器插件
* homebridge-doorbird v0.0.4-Doorbird插件
* homebridge-dyson-link v2.2.2-Dyson Link设备
* homebridge-edomoticz v2.1.11-适用于Domoticz的功能齐全的最新插件
* homebridge-Fibaro-HC2 v2.1.5-Fibaro HomeCenter集成
* homebridge-homee v0.2.4-适用于Homee的功能齐全的最新插件
* homebridge-ikea-tradfri-gateway v1.0.26-Tradfri
* homebridge-noolite v0.0.29-通过USB MTRF-64或МТRF-64模块的Noolite
* homebridge-platform-wemo v1.0.1-Belkin WeMo平台插件
* homebridge-seasons v1.0.1-一个显示一年中当前季节的插件。
* homebridge-vera v0.8.2-VeraLink是Vera的Z-Wave配件应用程序（Node.js 8.11.3）

... 还有很多

＃＃ 去做
*测试
*更多文档？！

## Changelog

### 4.0.1 (2021-03-24)
* (Apollon77) update homebridge and wrapper to 1.3.4 (latest as of today). IMPORTANT: Requires also homebridge 1.3.x installed when using global mode and local mode will update to 1.3.x too! Check your plugins for updates!
* (UncleSamSwiss) Add an experimental version of new plugin selection and configuration tab - TRY IT OUT!
* (Apollon77) IMPORTANT: Configurations in local/global mode with child bridges will NOT work because ioBroker can not access the data on the child bridge processes!

### 3.0.2 (2020-11-29)
* (Apollon77) update homebridge in wrapper to 1.1.6 (latest as of today)

### 3.0.1 (2020-08-08)
* (Apollon77) set a very high limit (again) on allowed accessories and services because irrelevant 

### 3.0.0 (2020-08-04)
* (Apollon77) BREAKING: ONLY WORKS WITH HOMEBRIDGE 1.1.x+ AND Node JS >=10.17.0!! Make sure plugins support it AND homebridge is updated to 1.1.x when you use the Global Mode!

### 1.1.2 (2019-07-08)
* (Apollon77) Allow more then 149 accessories in wrapper mode

### 1.1.1 (2019-07-05)
* (Apollon77) Add option to update NPM modules in Admin. Reinstall will happen after saving settings
* (Apollon77) Enhance NPM installation handling
* (Apollon77) Allow to specify special version of homebridge NPM packages using name@version
* (Apollon77) Allow to specify homebridge command line options. They will be added to the command line arguments (Some plugins need that or special features are only available with it)
* (Apollon77) Add "Local" mode that installs an own homebridge and run it as bridge

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

Copyright (c) 2018-2020 Apollon77 <ingo@fischer-ka.de>

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