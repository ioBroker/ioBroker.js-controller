---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hue-extended/README.md
title: ioBroker.hue扩展
hash: y5kbOH0iJ5KCE3tYre3C2OhHSAN96aFMsxO7Pycpv7s=
---
![商标](../../../en/adapterref/iobroker.hue-extended/admin/hue-extended.png)

![Paypal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/hue-extended-installed.svg)
![稳定的版本](http://iobroker.live/badges/hue-extended-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.hue-extended.svg)
![特拉维斯CI](https://travis-ci.org/Zefau/ioBroker.hue-extended.svg?branch=master)
![下载](https://img.shields.io/npm/dm/iobroker.hue-extended.svg)
![Greenkeeper徽章](https://badges.greenkeeper.io/Zefau/ioBroker.hue-extended.svg)
![NPM](https://nodei.co/npm/iobroker.hue-extended.png?downloads=true)

#ioBroker.hue-extended将您的飞利浦Hue Lights与ioBroker连接。
＃＃ 特征
 - 同步配置
 - 同步组
 - 同步灯光
 - 同步资源
 - 同步规则
 - 同步场景
 - 同步计划
 - 同步传感器
 - 触发状态`on / off`，`bri`（`level`），`hue`，`sat`，`xy`，`ct`，`alert`，`effect`和`transitiontime`的更改
 - 基于色彩空间的附加触发器，用于`rgb`，`hsv`，`xyz`，`cmyk`和`hex`
 - 使用`commands`触发器应用自己的命令组合
 - 使用`0-all`组一次控制所有组的灯
 - 运行场景或在灯光或群组上应用“场景”

## Changelog

### 0.7.0 (2019-08-27)
- (Zefau) added `0-all`-group to apply action on all groups at once
- (Zefau) added `commands` action to apply own commands combination at once
- (Zefau) lowered minimum refresh time

### 0.6.2 (2019-08-18)
- (Zefau) fixed error when triggering scene (`Error setting /lights/undefined/state: resource, /lights/undefined/state, not available`)
- (Zefau) fixed display error in adapter configuration interface

### 0.6.1 (2019-08-16)
- (Zefau) Corrected German translations
- (Zefau) Completed README

### 0.6.0 (2019-08-15)
- (Zefau) implemented queue for any applied actions
- (Zefau) implemented user creation in interface configuration (admin panel)
- (Zefau) added additional actions for color spaces `rgb`, `hsv`, `cmyk`, `xyz` and `hex`

### 0.5.0 (2019-08-11)
- (Zefau) added support for scenes (reorganized states and added trigger)
- (Zefau) fixed action `xy`
- (Zefau) reorganized states within tree `state` into `action` in case they are executable

### 0.4.0 (2019-08-10)
- (Zefau) fixed applying action on group

### 0.4.0 (2019-08-09)
- (Zefau) renamed adapter to hue-extended (formerly hue-lights)
- (Zefau) changed roles of some states

### 0.3.2 (2019-08-07)
- (Zefau) refactored data retrieval and state creation

### 0.3.1 (2019-08-03)
- (Zefau) when turning on a device, set level / bri to 100 if it was set to 0

### 0.3.0 (2019-08-03)

__REMARK: If you are coming from an earlier version, please delete all your hue-extended states before running this release!__

- (Zefau) added error message when incorrect bridge credentials are provided ([see issue description](https://forum.iobroker.net/post/287505))
- (Zefau) when turning off a device, set level / bri to 0 ([see issue description](https://forum.iobroker.net/post/287566))
- (Zefau) fixed error that prevented `groups` being set / changed
- (Zefau) added specific role information to states under `lights`, `groups` and `sensors` ([see issue description](https://forum.iobroker.net/post/287566))
- (Zefau) fixed wrong value for temperature sensors ([see issue description](https://forum.iobroker.net/post/287564))

### 0.2.0 (2019-07-24)
- (Zefau) added support to change states _level_, _xy_, _effect_, _alert_, and _transitiontime_

### 0.1.0 (2019-07-21)
- (Zefau) retrieve lights, groups, resourcelinks, rules, scenes, schedules, sensors and config from Hue Bridge
- (Zefau) change states (e.g. on/off, brightness, saturation)

## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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