---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homee/README.md
title: ioBroker homee适配器
hash: 3uRJsfAB9U1IQXaTq33IPCZQe6ORZedhWuJoM4Mp/ZA=
---
![商标](../../../en/adapterref/iobroker.homee/admin/homee.png)

![安装数量](http://iobroker.live/badges/homee-stable.svg)
![环保管理员徽章](https://badges.greenkeeper.io/Apollon77/ioBroker.homee.svg)

＃ioBroker homee适配器
**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**更多详细信息，请参见下文！

##说明
该适配器将ioBroker连接到homee，并提供以下功能：

*允许通过IP或homee-ID和用户名/密码进行连接
*读取所有设备（节点）和状态（属性）并显示其值，包括ioBroker中的更新
*允许更改ioBroker中的值并将其发送回homee以控制设备
*充当在homee中启用了历史记录的所有状态设备的ioBroker历史记录提供程序。这意味着您可以使用flot，Admin或JavaScript使用homee中存储的历史记录值在ioBroker中显示，包括从数据级别得知的所有数据级别的聚合。历史记录适配器

还不支持：

*组，因为它们不提供任何功能，例如组级别状态或实时写入所有设备
*供暖计划

此适配器基于[stfnhmplr]（http://twitter.com/stfnhmplr）和他的[homee-api](https://github.com/stfnhmplr/homee-api)的出色工作。

＃＃ 已知的问题
*在js-controller <1.5.0上，当在某些角色上启用其他历史记录提供程序时，它会产生奇怪的效果（例如“ switch”）

##如何报告问题和功能要求
请为此使用GitHub问题。

最好是将适配器设置为“调试日志”模式（“实例”->“专家模式”->“列日志级别”）。然后，请从磁盘获取日志文件（ioBroker安装目录中的子目录“ log”，而不是Admin，因为Admin会删掉行）。如果您不喜欢在GitHub问题中提供它，也可以通过电子邮件（iobroker@fischer-ka.de）将其发送给我。请添加对相关GitHub问题的引用，并描述我什么时候在日志中看到的内容。

##什么是Sentry，什么报告给服务器？
Sentry.io是开发人员从其应用程序中获得有关错误概述的一种方式。确切地说，这是在此适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给我们在德国托管的Sentry服务器。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一ID，**没有**有关您，电子邮件，姓名等的任何其他信息）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本不会崩溃的无错误适配器。

## Changelog

### 0.5.0 (2020.03.13)
* (Seraphis411) fixed writing of HomeeMode
* (Seraphis411) bumped version of homee-api to 0.12.0 (no new features adopted)
* (Seraphis411) now support for nodejs 10 thanks to newer ws-library (^7.1.2) in homee-api
* (Apollon77) add sentry for error reporting
* (Apollon77) update homee api to 0.15.0

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Apollon77 <iobroker@fischer-ka.de>

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