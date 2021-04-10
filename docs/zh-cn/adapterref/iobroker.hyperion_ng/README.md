---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hyperion_ng/README.md
title: ioBroker.hyperion_ng
hash: yxrOejxWKCewRasC784zpVjNET7vUTpRyyQxMO8bB5U=
---
![标识](../../../en/adapterref/iobroker.hyperion_ng/admin/hyperion_ng.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.hyperion_ng.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.hyperion_ng.svg)
![安装数量（最新）](http://iobroker.live/badges/hyperion_ng-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/hyperion_ng-stable.svg)
![依赖状态](https://img.shields.io/david/felixganzer/ioBroker.hyperion_ng.svg)
![已知漏洞](https://snyk.io/test/github/felixganzer/ioBroker.hyperion_ng/badge.svg)
![NPM](https://nodei.co/npm/iobroker.hyperion_ng.png?downloads=true)

＃ioBroker.hyperion_ng
**测试：**![测试与发布](https://github.com/felixganzer/ioBroker.hyperion_ng/workflows/Test%20and%20Release/badge.svg)

## IoBroker的hyperion_ng适配器
使用此适配器，您可以控制HyperionNG设备

https://hyperion-project.org/

＃＃ 手动的
＃＃＃ 一般的
适配器将为每个Hyperion硬件实例创建一个包含实例编号的文件夹。在这些文件夹中，实际是调整，所有组件和所有活动优先级。

另外，将创建一个通用文件夹，其中包括控制权，以向Hyperion发送命令，有关Hyperion的所有可能的影响和系统信息。

###控制组件并停用Hyperion实例
您可以控制instance.components文件夹内的组件来设置布尔值。设置参数后，将更新受控实例及其后所有实例的所有组件参数

另外，您可以设置instance.running参数来激活和停用整个实例

###控制调整
您可以控制instance.components文件夹内的调整以设置参数。设置参数后，将更新受控实例和随后的每个实例的所有调整

###设置效果
要设置效果，您必须在general.control.instance下设置一个实例号。之后，您可以在general.control.setEffect下输入存在效果的正确名称。设置效果后，将更新已使用实例和随后的每个实例的优先级

在general.control.durationEffectColor上，您可以设置持续时间（以秒为单位）。在设置效果之前，必须先设置这些值。标准值0。这会将效果时间设置为无穷大。

###设置颜色
要设置颜色，您必须在general.control.instance下设置一个实例号。之后，您可以在general.control.setColorRGB下输入RGB值。设置颜色后，将更新使用实例和随后的每个实例的优先级

在general.control.durationEffectColor上，您可以设置持续时间（以秒为单位）。您必须先设置这些值，然后再设置颜色。标准值0。这会将效果时间设置为无穷大。

设置颜色的另一种可能性是通过HSL。对于这些，在general.control.setColorHSL处存在3个数据点。如果这些数据点之一将被更改，则颜色将被更新。

###设置抓取器可见
如果将general.control.setinternalGrabberVisible或setUSBGrabberVisible设置为true，则可以将内部或USB视频抓取器设置为可见优先级。在必须将实例设置为在general.control.instance下进行控制之前。如果您在hyperion上更改了标准优先级，则必须将适配器配置页面下的值更改为相同的值。

###清除效果和颜色
要清除优先级，您必须在general.control.instance下设置一个实例号。之后，您可以将参数general.control.clearAll或general.control.clearVisible设置为true以清除优先级。成功后，布尔值将设置为false。

###更新Hyperion中的数据
如果将general.control.updateAdapter设置为true，则可以手动更新整个适配器的数据。借助数据点general.control.updatePriorities，您可以更新所有实例的优先级

## Changelog

### 0.1.19 (2021.03.29)
* (felixganzer) little bugfixing

### 0.1.18 (2021.03.06)
* (felixganzer) increase stopTimeout to 3 seconds
* (felixganzer) add communicationTimer object


### 0.1.17 (2021.02.26)
* (felixganzer) bugfixing: add error event handler for socket connection
* (felixganzer) bugfixing: change state roles of control states
* (felixganzer) bugfixing: add try and catch at set RGB color

### 0.1.16 (2021.02.07)
* (felixganzer) bugfixing: clear socket at adapter unload
* (felixganzer) bugfixing: change logo
* (felixganzer) bugfixing: fix testing for github
* (felixganzer) bugfixing: remove all the stuff inserted by an npm install

### 0.1.13 (2021.02.03)
* (felixganzer) add set Color over HSL values

### 0.1.12 (2021.02.02)
* (felixganzer) bugfix: add type-of-is to dependencies

### 0.1.11 (2021.01.30)
* (felixganzer) bugfix: reduce warning "state has no existing object" for js-controller 3.2
* (felixganzer) bugfix: read out priority of color crash at js-controller 3.2

### 0.1.10 (2021.01.10)
* (felixganzer) reorginize config page and add config parameter
* (felixganzer) add set internal or USB Grabber Visible with boolean

### 0.1.9 (2021.01.09)
* (felixganzer) bugfix: reduce warnings
* (felixganzer) add set Grabber Visible without any error catching
* (felixganzer) add start update whole adapter data points and update Priorities

### 0.1.8 (2021.01.07)
* (felixganzer) add set duration of effect and color to set
* (felixganzer) bugfix: clearVisible did not work

### 0.1.7 (2021.01.06)
* (felixganzer) bugfix: only works with iobroker adapter instance 0
* (felixganzer) updating the manual

### 0.1.6 (2021.01.03)
* (felixganzer) add setColorRGB under general.control
* (felixganzer) add controlling adjustments of hyperion
* (felixganzer) add start and stop Instance

### 0.1.5 (2021.01.02)
* (felixganzer) read out all possible effects
* (felixganzer) add setEffect under general.control
* (felixganzer) read out video Mode and LED Mapping
* (felixganzer) read out adjustments of instance

### 0.1.4 (2021.01.01)
* (felixganzer) add control clear of colors and effects

### 0.1.3 (2021.01.01)
* (felixganzer) add read out priorities to see actual running colors and effects

### 0.1.2 (2020.12.30)
* (felixganzer) add read out sysinfos to check Version of Hyperion

### 0.1.1 (2020.12.30)
* (felixganzer) add controlling components of hyperion
* (felixganzer) create first config to set IP, Port and Priority

### 0.1.0 (2020.12.29)
* (felixganzer) creating api class to communicate with hyperion and adding read out instances of hyperionNG

### 0.0.1 (2020.12.29)
* (felixganzer) initial release

## License
MIT License

Copyright (c) 2020-2021 felixganzer <felixganzer@web.de>

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