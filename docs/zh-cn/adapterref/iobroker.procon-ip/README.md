---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: lq6aPK/f3jS9/9tJe0w5W2aqj7uiH6EZYy7TeaZuxg4=
---
![商标](../../../en/adapterref/iobroker.procon-ip/admin/iobroker-procon-ip.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![装置](http://iobroker.live/badges/procon-ip-installed.svg)
![依赖状态](https://img.shields.io/david/ylabonte/iobroker.procon-ip.svg)
![已知漏洞](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![特拉维斯](http://img.shields.io/travis/ylabonte/ioBroker.procon-ip/master.svg)
![NPM](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)

＃ioBroker.procon-ip
## IoBroker的ProCon.IP池控制适配器
ioBroker适配器，用于ProCon.IP游泳池控制单元的基本支持。它旨在与您的ioBroker家庭自动化集成，例如。
建立涉及其他设备的逻辑或仅与您喜欢的语音助手配对：

*您可以使用[_cloud_]（https://github.com/ioBroker/ioBroker.cloud）或

适用于Alexa的[_IoT_](https://github.com/ioBroker/ioBroker.iot)适配器（我认为还有Google Home）和

* [_yahka_]（https://github.com/jensweigele/ioBroker.yahka）作为通往

  Siri或Apple可以访问Apple HomeKit

*使用[_javascript_]（https://github.com/ioBroker/ioBroker.javascript）进行

  建立自己的自定义逻辑。

有关更多信息，请参见[维基](https://github.com/ylabonte/ioBroker.procon-ip/wiki)。

###什么是ProCon.IP池控件？
![图片来自pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

ProCon.IP池控制是用于家庭游泳池的低预算网络连接控制单元。借助其软件开关继电器，它可以按时间计划简单地计划多个泵（用于池过滤器和不同剂量方面），也可以根据其多个测量输入通道之一的读数/值（例如，I / O流量）进行控制。传感器，达拉斯1-Wire温度计，氧化还原和pH电极）。至少还有按需切换这些继电器的选项，这使得它们也适用于打开/关闭灯（或其他任何想要的开关）。
并非所有功能都可以通过API获得。实际上，有一个文档化的API可以读取（轮询）CSV格式的值（`/GetState.csv`）。在我的记忆中，还有一个用于通过定时器打开/关闭继电器和打开继电器。但是我找不到第二个了。因此，它甚至不很漂亮，但具有功能性：ProCon.IP具有两个本机Web界面，可以对给定的功能（例如切换继电器）进行某种反向工程分析。

有关更多信息，请参见以下链接（很抱歉，它仅在德语中；到目前为止尚未找到英文文档/信息）：

* [pooldigital.de网上商店]（https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage）
* [pooldigital.de论坛]（http://forum.pooldigital.de/）

**请明确说明：我与池控制单元的开发，销售，营销或支持无关。我刚刚开发了一种与ioBroker集成的解决方案，以使父母的家更智能。**

###有关适配器的详细信息
适配器使用ProCon.IP的`/GetState.csv`API轮询其值，以及另一个（未记录的）API，该API与按位命令一起操作以切换继电器。 ProCon.IP的原始Web界面也使用第二个。因此，将来可能会进行固件升级，从而破坏与该适配器的兼容性，或者至少破坏其切换继电器的功能。

####兼容性
目前，该适配器已与ProCon.IP固件**修订版1.7.0.c **结合进行测试和开发。

##路线图
### 1.x.x
该计划没有什么特别的。您可以创建一个问题来建议新功能/功能...

**路线图上发生了什么事情，但是在1.0.0版本中没有实现？**嗯，文档已经得到改进。
标签视图对我来说似乎很有趣。如果您喜欢这种功能，请告诉我...
缺少关于控制器功能的自动化测试是非常令人不愉快的，但是现在的重点显然是变得稳定，并且为所有现有代码编写良好而有用的测试将花费大量时间（与使用复杂性和该软件项目的目标群体），并可能以进一步的重构而告终。因此，它将是将来的事情，但与1.0.0版本不再相关。

##发展与参与
如果您希望参与此适配器的开发或文档，请随时与我联系。

该方法的有用链接将是

* [TypeScript适配器模板]（https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript）

  我从开始

* [适配器开发人员指南]（https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md）。

## Changelog

### 1.0.1
Hotfix release:
* Fix Object State updates  
  For some reason the two js objects used to compare the before and after values
  of the GetState.csv calls became the same object (before was referencing the
  new values). That caused the adapter to never update the object states.

### 1.0.0
Official release in ioBroker adapter repository:  
The most exciting change with this release is, that it's available from the
ioBroker adapter repository. Hence you can just install it, without copy/
pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248))
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### 0.4.1
Bugfix release:
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### 0.4.0
Public release version:
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### 0.3.1
Functional and security update:
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### 0.2.0
Minor update:
* Update npm dependencies
* Group admin settings input fields in rows

### 0.1.1
Security update:
* Update vulnerable eslint-utils

### 0.1.0
Functional update and minor fixes:
* Fix object attributes regarding the cloud adapter
* Optimization for the cloud adapter
    * Pre-defined `smartName` attributes for active relays and temperature
      sensors
    * Recognize relays with 'light', 'licht' or 'leucht' in its name as
      `smartType` _LIGHT_ 

### 0.0.4
Security update:
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### 0.0.3
Bugfix release:
* Fix missing `value` states
* Reduce logging output

### 0.0.2
Bugfix release:
* Fix sys info state values

### 0.0.1
Initial release with following features:
* All information from `GetState.csv` as readonly states
* Writable states for all relays to toggle auto/manual
* Writable states for relays not configured for dosage control to toggle on/off

## License
MIT License

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

Copyright (c) 2020 Yannic Labonte <yannic.labonte@gmail.com>