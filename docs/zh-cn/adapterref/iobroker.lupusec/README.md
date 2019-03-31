---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: Gt5uZ5nX/rToGD0x5wmpugKiiDSWSHmNJr30gJbldwE=
---
![商标](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![特拉维斯建设状态](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)
![AppVeyor构建状态](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.lupusec?branch=master&svg=true)
![稳定的版本](http://iobroker.live/badges/lupusec-stable.svg)
![安装数量](http://iobroker.live/badges/lupusec-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

＃ioBroker.lupusec
**需要node.js 8.0或更高版本以及Admin v3！**

该适配器将Lupusec报警系统XT1 Plus，XT2，XT2 Plus和XT3与ioBroker连接起来。
不支持XT1（不带Plus）。您可以读取Lupusec传感器的状态，如门，窗，水，烟雾传感器和报警系统的状态。
您可以打开开关并布防/撤防警报系统。

您可以在此处找到详细信息：[狼疮](https://www.lupus-electronics.de/en)

##安装
1.安装适配器

最简单的方法是通过ioBroker中的发现适配器配置lupusec.iobroker适配器。发现适配器搜索Lupusec报警系统的正确IP地址。另一种方法是手动配置它

2.手动配置适配器

从Lupusec报警系统中选择IP地址或主机名。如果可能，请选择https（推荐）。
要仅读取状态，请选择没有写访问权限的用户。如果要更改状态（例如，打开/关闭指示灯或布防/撤防警报），请选择具有写入权限的用户。

默认情况下，所有Lupusec设备都将显示在ioBroker对象选项卡上。
完全支持和单独调整是以下设备：

   - 门触点/窗口触点（类型4）
   - 水传感器（5型）
   - 运动探测器/ 360度运动探测器（9型）
   - 烟雾探测器/热探测器（14型）
   - 状态指示灯/迷你室内警报器（22型）
   - 电源开关（24型）
   - 键盘（37型）
   - 电源开关表（49型）
   - 房间传感器V1（54型）
   - 调光器（66型）
   - 顺化（74型）
   - 卷帘继电器V1（76型）
   - 光传感器（78型）
   - 散热器温控器（79型）

支持Apple Homekit适配器yahka的两个州apple_home_a1和lupusec.0.status.apple_home_a2。除了lupusec之外，您还可以打开和关闭区域1和2的警报系统。

如果您拥有上面列表中未列出的设备，请通过Thorsten Stueben <thorsten@stueben.de>与我联系。

## Changelog
### 1.1.1 (27.03.2019)
* (Stübi) Lupusec alarm online status added

### 1.1.0 (23.03.2019)
* (Stübi) Totally redesign of the Lupusec adapter. Node 8 or higher is now required

### 1.0.0 (22.12.2018)
* (Stübi) Support js-controller compact mode
* (Stübi) Changed core adapter
* (Stübi) Add Light sensor (type 78)
* (Stübi) Add Apple home alarm status
* (Stübi) Add dimmer / relais (type 66)
* (Stübi) Bugfixing and new status alarm_ex
* (Stübi) Bugfixing and changing of the polling mechanism
* (Stübi) password will be encrypted. Translation of configuration
* (Stübi) add debug messages
* (Stübi) Hue, room sensor, power switch added
* (Stübi) Fixing error update function
* (Stübi) Improvements and new add/del/update Object function
* (Stübi) Changes of roles and icons added to devices
* (Stübi) Wrong device description removed
* (Stübi) RSSI Status an Device shutter (type 76) supported
* (Stübi) Devices thermostat (type 79) and switch (type 48) supported
* (Stübi) Directory widged deleted
* (Stübi) Port can be added

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de>

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