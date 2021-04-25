---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tahoma/README.md
title: 不能当前维护！！！
hash: O8jue3Vsog/1wlwxiQ4xFu6UGjUptJA7NZEfwi+kqQo=
---
![商标](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![安装数量](http://iobroker.live/badges/tahoma-installed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tahoma.svg)
![NPM](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![稳定的](http://iobroker.live/badges/tahoma-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![建置状态](https://travis-ci.org/StrathCole/ioBroker.tahoma.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

＃目前未维护！！！
＃ioBroker.tahoma
用于尚飞Tahoma的ioBroker适配器。该项目与尚飞没有从属关系。最初基于来自https://forum.iobroker.net/post/336001的脚本。

适配器连接到Tahomalink最终用户API，并控制通过Tahoma Box（最可能是Connexoon）设置的设备。
该适配器尚未完成功能，但它应支持大多数用于控制百叶窗和百叶窗等的操作。

跟随适配器创建的某些状态。

## Tahoma.X.location
该树中的状态包含用户的个人信息，例如城市，街道地址和经度/纬度。

## Tahoma.X.devices。*。deviceURL
此状态包含Tahoma用于标识设备的设备URL。

## Tahoma.X.devices。*。命令
这些状态包含用于控制设备的按钮命令。大多数设备将支持诸如`close`和`open`之类的命令，但还会支持更多命令。
如果设备支持，某些命令的末尾会有`:slow`。使用这些将启用低速或所谓的静音模式。

## Tahoma.X.devices。*。states
这些状态包含设备的当前状态，如下所示。标有`[**]`的所有设置都可编辑，以控制设备的行为/发送命令。
如果设备支持，某些状态的末尾会有`:slow`§。设置这些值将启用低速或所谓的静音模式。

`[**] tahoma.X.devices.*.states.core:DeploymentState`-提供有关当前部署的信息并控制其状态。 100表示已完全部署，而0则未部署。并非所有设备都具有此值，有些设备则具有`ClosureState`。
`[**] tahoma.X.devices.*.states.core:TargetDeploymentState`-请参阅`tahoma.X.devices.*.states.core:DeploymentState``[**] tahoma.X.devices.*.states.coreClosureState`-提供有关当前关闭状态的信息并控制其状态。 100表示完全关闭，0表示打开。并非所有设备都具有此值，有些设备则具有`DeploymentState`。
`[**] tahoma.X.devices.*.states.core:TargetClosureState`-参见`tahoma.X.devices.*.states.core:ClosureState``[**] tahoma.X.devices.*.states.core:OrientationState`-提供有关板条的方向信息（例如百叶窗）并对其进行控制。并非所有设备都提供此值。
`[**] tahoma.X.devices.*.states.core:TargetOrientationState`-请参阅`tahoma.X.devices.*.states.core:OrientationState``tahoma.X.devices.*.states.core:NameState`-包含设备的当前名称。
`tahoma.X.devices.*.states.core:OpenClosedState`-如果设备是100％关闭或0％部署的，则包含`closed`，否则包含`open`。
`tahoma.X.devices.*.states.core:PriorityLockTimerState`-如果传感器已锁定设备，则在此处说明。 G。挡住遮阳篷的风传感器。
`tahoma.X.devices.*.states.core:RSSILevelState`-设备的当前信号质量。
`tahoma.X.devices.*.states.core:StatusState`-`available`（如果设备当前可用）。
`tahoma.X.devices.*.states.io:PriorityLockLevelState`-请参阅`tahoma.X.devices.*.states.core:PriorityLockTimerState``tahoma.X.devices.*.states.io:PriorityLockOriginatorState`-请参阅`tahoma.X.devices.*.states.core:PriorityLockTimerState``tahoma.X.devices.*.states.moving`-设备当前正在移动的状态。 `0 = stopped`，`1 = up/undeploy`，`2 = down/deploy`，`3 = unknown direction`

##捐赠
[![paypal]（https://www.paypalobjects.com/zh_CN/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 0.3.3

-  Removed credentials from log on error and debug

### 0.3.2

-  Fixed silent modes (low speed) for newer Somfy devices
-  Fixed problem with wrong reference to `this`

### 0.3.1

-   Fixed adapter crash on empty response object after request error
-   Fixed problems with slow/silent mode for closure

### 0.3.0

-   Added possibility for low speed open and close on supported devices
-   Fixed commands not stopping on next command for device
-   Smaller fixes

### 0.2.6

-   Added queue for device commands not already covered by update to 0.2.1

### 0.2.5

-   Added README for states

### 0.2.4

-   Switched moving state values 1 / 2 for DeploymentState devices

### 0.2.3

-   Fixed direction (moving state) for deployment devices

### 0.2.2

-   Fixed problem with DeploymentState treated as ClosureState on setting values

### 0.2.1

-   Fixed problems with too many simultanous commands/devices

### 0.2.0

-   Added deployment actions
-   Added new state for moving direction
-   Changed command buttons to boolean type

### 0.1.2

-   Retry device command on error 400 (payload) once

### 0.1.1

-   No changes

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2020 Marius Burkard

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