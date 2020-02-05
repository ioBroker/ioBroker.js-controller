---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.digitalstrom/README.md
title: ioBroker.digitalstrom
hash: izv9U0SVdsQ/y0qwTJ8NJCouEXZw/b5hPx2WwM/sAhY=
---
![商标](../../../en/adapterref/iobroker.digitalstrom/admin/digitalstrom.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.digitalstrom.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.digitalstrom.svg)
![安装数量（最新）](http://iobroker.live/badges/digitalstrom-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/digitalstrom-stable.svg)
![依赖状态](https://img.shields.io/david/Apollon77/iobroker.digitalstrom.svg)
![已知漏洞](https://snyk.io/test/github/Apollon77/ioBroker.digitalstrom/badge.svg)
![NPM](https://nodei.co/npm/iobroker.digitalstrom.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Apollon77/ioBroker.digitalstrom/master.svg)

＃ioBroker.digitalstrom
**此适配器使用Sentry库向开发人员自动向我报告异常和代码错误以及新设备架构。**更多详细信息，请参见下文！

##用于ioBroker的Digitalstrom适配器
通过DSS支持Digitalstrom设备

##安装
请照常通过Admin UI安装适配器。

适配器正式发布后，他将进入回购协议中，并且可以选择。

在测试阶段，或为了测试较新版本（请参阅相关论坛主题），您还可以使用https://github.com/ioBroker/ioBroker.digitalstrom作为URL直接从GitHub安装适配器。请为此使用“自定义安装”管理员选项。

##用法
安装适配器并创建实例后，将显示管理对话框。
首先，您需要输入您的DSS IP /主机名。然后，您可以选择是否已经在DSS Web接口中手动创建了应用令牌。
如果您没有应用令牌，只需输入您的用户名和密码即可自动检索应用令牌。

除了身份验证设置（见上文）之外，您还可以根据需要编辑以下设置：

* **数据轮询间隔**：这是从DSM设备请求“电表”数据的间隔。默认值60s。如果您不想轮询Engerymeter数据，则可以设置0。
* **使用场景预设值**：Digitalstrom系统并不是真正设计为始终具有可用设备的实际输出值，并且大多数情况下都适用于场景。对于“ Light”和“ Shader / Blinds”，为许多可用场景定义了一些输出值。适配器知道它们，并且当激活此设置时，适配器将尝试在触发场景时查找这些值，并将这些值直接设置为状态。实际值需要延迟。设置/使用本地优先级时，此方法可能会传递错误的值！
* **主动请求设备输出值**：适配器在开始时以及对设备有效的场景之后初始化所有设备输出值。有延迟，但实际上所有这些消息都将通过Digitalstrom总线传递。如果这对您有问题，您可以尝试停用此功能。

提供应用令牌并保存设置后，适配器将自动重启。

当数据正确时，适配器将读取单元和设备结构，并将它们创建为ioBroker对象。这可能会花费一些时间（取决于设备和楼层/区域/组的数量以及系统的性能需要几秒钟）。请耐心等待。我真的是那样说的...这里很容易达到数千个物体！请给适配器时间！

此后，适配器将订阅多个DSS事件，以获取有关系统中操作的通知。

适配器状态指示灯将变为绿色，并且您将在信息日志中看到“已订阅状态...”。在此之后，一切都准备就绪，您可以例如：

*设置/撤消公寓，区域，团体或设备的场景
*读取状态和传感器值；对于区域，也可以推送传感器值
*请参阅二进制输入，传感器，按钮和输出的值

##状态和对象结构
适配器提供两种数据结构。带有楼层，区域（房间）和组的公寓结构，以及电路/ dSM和连接设备的结构及其详细数据。

在结构中，包括几种数据“类型”：

*场景：场景被实现为开关。将值tro设置为“ true”将为此场景发送“ callScene”命令。值为“ false”将为此场景发送“ undoScene”命令-由DSS服务器决定“ undo”是否为有效命令！当从DSS服务器触发callScene或undoScene作为事件时，将相关场景设置为“ true”或“ false”，且ack = true
*状态：显示系统状态和用户通过插件定义的状态，它们是只读的
*传感器值由事件触发时会更新，并且也可以部分更改赌注-更改将“ pushSensorValue”发送到服务器，如果值被接受，则取决于服务器！这主要与温度或湿度值有关

*

###公寓对象和状态
![公寓物件](../../../en/adapterref/iobroker.digitalstrom/img/dss-apartment.png)

对于“公寓”，将创建一个带有“ floor”。“ zone”的结构，其中包含以下子结构：

*为每个设备组创建一个子文件夹，其中包括可用的组场景
*该区域的场景
*此区域的状态
*该区域的传感器值

在“公寓”级别，所有设备组都可用于其场景。

在公寓级别，还包括传感器（以及室外值），状态和用户状态。

###设备对象和状态
![设备对象](../../../en/adapterref/iobroker.digitalstrom/img/dss-devices.png)

设备由“ circuit / dSM”。“ deviceID”构成，内部的子结构包括：

*设备场景，仅会为此设备触发
*设备传感器，从系统报告时。因此值可能为空
*输出值（例如，灯光的状态/亮度和阴影/阴影的位置/角度）位于设备正下方。目前只有灯光和阴影/盲区具有定义的功能。
*按钮和二进制输入也将由状态表示，并且是只读的

##已知问题/系统设计效果
* DSS系统主要使用场景而不是通过真实的设备值来工作，并且获取真实值的速度非常慢，因为需要通过总线来获取。
*当系统未报告值时，它们可能为空
*二进制输入实现为“盲”，因为我没有这样的设备。因此，我很高兴获得一些使用二进制输入设备的日志/报告：-)
*仅对Ligh（黄色）和Shade / Blind（灰色）设备实现有意义的输出值读取和写入。
*到目前为止，我没有机会检查系统在vDC上的行为。所以我需要在这里添加日志和详细信息
*通风和温度管理/设备也未完全实施...在这里有意义吗？

##如何报告问题和功能要求
请为此使用GitHub问题。

最好是将适配器设置为“调试”日志模式（“实例”->“专家”模式->“列日志”级别）。然后，请从磁盘获取日志文件（ioBroker安装目录中的子目录“ log”，而不是Admin，因为Admin会删掉行）。如果您不喜欢在GitHub问题中提供它，也可以通过电子邮件（iobroker@fischer-ka.de）将其发送给我。请添加对相关GitHub问题的引用，并描述我在日志中什么时候看到的内容。

##什么是Sentry，什么报告给服务器？
Sentry.io是开发人员从其应用程序中获得有关错误概述的一种方式。确切地说，这是在此适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给我们在德国托管的Sentry服务器。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一ID，**没有**关于您，电子邮件，姓名等的任何其他信息）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本不会崩溃的无错误适配器。

## Changelog

### 1.0.0 (2020-01-31)
* (Apollon77) bump version to 1.0.0
* (Apollon77) update dependecies
* (Apollon77) change default loglevel to info

### 0.5.5 (2020-01-29)
* (Apollon77) fix smaller errors
* (Apollon77) send Sentry reports to own server

### 0.5.0 (2020-01-19)
* (Apollon77) add buttons for more device types (also vDC) and try to detect button triggers

### 0.4.10 (2020-01-19)
* (Apollon77) state changes added
* (Apollon77) Fixed shade position control

### 0.4.9 (2020-01-18)
* (Apollon77) add unknown weather sensor "windgust"
* (Apollon77) change handling of Input types
* (Apollon77) Fix controlling of shaders 

### 0.4.7 (2020-01-17)
* (Apollon77) fix error when writing vdc output values

### 0.4.6 (2020-01-17)
* (Apollon77) fix missing datatypes for some states (mainly sensors and output values)

### 0.4.5 (2020-01-17)
* (Apollon77) fix error in sentry reporting

### 0.4.4 (2020-01-17)
* (Apollon77) fix error (Sentry IOBROKER-DIGITALSTROM-7)

### 0.4.2 (2020-01-16)
* (Apollon77) fix wrong scene state updates if same scene is triggered twice
* (Apollon77) also trigger scene update for all groups if scene was called on zone or to all zones and groups when done on apartment

### 0.4.1 (2020-01-16)
* (Apollon77) also add basic scenes to room groups

### 0.4.0 (2020-01-15)
* (Apollon77) add userActions as states and allow to trigger the actions

### 0.3.3 (2020-01-15)
* (Apollon77) fixes for scene lists
* (Apollon77) add some special szenes to more groups 

### 0.3.2 (2020-01-14)
* (Apollon77) fixes for adapter start

### 0.3.1 (2020-01-14)
* (Apollon77) fixes
* (Apollon77) make sure to initialize scenes, states and sensors really on startup - values will be overwritten if delivered with ack=true!
* (Apollon77) add all Presets (0-44) to Room/Zone and Group states 
* (Apollon77) also for unknown device types try to initialize output value IF only one is there (assuming it is offset/index 0!) Please check and report back!
* (Apollon77) make some initial processing async to block eventLoop less

### 0.3.0 (2020-01-14)
* (Apollon77) further optimize (lower) delays and timeouts, please give feedback!
* (Apollon77) add "stateId" State for each scenes folder with the scene number. This is updated with the scenes and also controllable.
* (Apollon77) scenes will not be cleared at the beginning and initialized with the "lastSceneId" returned from DSS; initialization may take some seconds longer!
* (Apollon77) update dependencies
* (Apollon77) increase loglevel of some "invalid cases" to warn to better see if they happen
* (Apollon77) fix handling of binaryInput events

### 0.2.2 (2020-01-13)
* (Apollon77) optimize event subscription logic and timeouts (should prevent "error 500 cases", now tries to resubscribe)

### 0.2.1 (2020-01-13)
* (Apollon77) optimize brightness handling
* (Apollon77) optimize error and reconnection handling

### 0.2.0 (2020-01-12)
* (Apollon77) initial official testing release (still GitHub)

### 0.1.x
* (Apollon77) initial release and finalization

## License
MIT License

Copyright (c) 2020 Apollon77 <iobroker@fischer-ka.de>

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