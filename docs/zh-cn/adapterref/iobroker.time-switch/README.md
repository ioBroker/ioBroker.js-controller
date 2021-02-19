---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.time-switch/README.md
title: ioBroker。时间切换
hash: ymg0alu7xtAA9xvguwhrso2MAmmfaSFcjteq53VNNa4=
---
![标识](../../../en/adapterref/iobroker.time-switch/admin/time-switch.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.time-switch.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.time-switch.svg)
![依赖状态](https://img.shields.io/david/walli545/iobroker.time-switch.svg)
![已知漏洞](https://snyk.io/test/github/walli545/ioBroker.time-switch/badge.svg)
![特拉维斯](http://img.shields.io/travis/walli545/ioBroker.time-switch/master.svg)
![NPM](https://nodei.co/npm/iobroker.time-switch.png?downloads=true)

＃ioBroker.time-switch
[![安装次数](https://camo.githubusercontent.com/5d62363be94ae20ae8302ef5dc2f3c533268742d/687474703a2f2f696f62726f6b65722e6c6976652f6261646765732f74696d652d7377697463682d696e7374616c6c65642e737667)]（）[![codecov]（https://codecov.io/gh/walli545/ioBroker.time-switch/branch/master/graph/badge.svg）](https://codecov.io/gh/walli545/ioBroker.time-switch)

## IoBroker的时间切换适配器
该适配器使用户可以使用时间表打开和关闭设备。
时间表可以通过vis小部件完全配置。
一个时间表可切换一个或多个ioBroker状态，并由一个或多个触发器组成，这些触发器定义何时以及如何切换状态。
可以配置在什么时候，什么工作日触发。还可以创建Astro触发器。
也可以有自定义的开/关值。
在窗口小部件中，可以暂时禁用计划，可以手动控制切换状态。

![预览](../../../en/adapterref/iobroker.time-switch/widgets/time-switch/img/prev/prev-device-schedule.jpg)

＃＃ 设置
有关设置说明，请访问[维基](https://github.com/walli545/ioBroker.time-switch/wiki)（也提供德语说明）。

##将来可能的功能
-倒数触发
-任意值的切换

## Changelog

### 2.2.1
* (walli545)
    * (Fix) Set js-controller dependency to >= 2.0.0

### 2.2.0
* (walli545)
    * (New) Conditional triggers that only execute when a certain condition is met (#31)
    * (New) Option to hide edit name button in widget (#119)
    * (Fix) Astro triggers not executing on days after initial creation (#123)
    * (Fix) Improved error handling (#61)

### 2.1.0
* (walli545)
    * Added astro triggers which can trigger on sunrise, noon, sunset with +- 120 min offset (#30)
    * Added custom styling via css custom properties
    * Fixed a bug which lead to undefined button behaviour when the widget is used together with material design theme by Uhula (#62)
    * Changed state listening to be a be ack based and removed unused on object change listener (#6)

### 2.0.0
**Attention**: Due to breaking changes in the schedule data structure, schedules created with versions 1.x are not compatible with 2.x.

*Before upgrading, remove all schedules in the instance settings and remove widgets in vis.*
* (walli545)
    * Value type can now be configured, this enables switching of real booleans and numbers (#19)
    * Added a new state for each schedule to disable/enable automatic switching (#24)
    * Added option to hide current value switch in widget (#23)
    * Switching of multiple states with one schedule. This allows the creation of groups for devices of the same type
    * Added translations to widget (#35)
    * Fixed widget not working on Safari and fully browser

### 1.1.0
* (walli545) 
    * New option to hide switched oid in widget (#20)
    * Fixed admin page not working on Firefox (#18)
    * Showing full schedule oid in admin page (e.g. time-switch.0.schedule0 instead of schedule0).

### 1.0.0
* (walli545) initial release, features:
    * Admin settings to create schedules
    * vis widget to edit schedules and add actions

## License
MIT License

Copyright (c) 2019-2021 walli545 <walli5446@gmail.com>

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