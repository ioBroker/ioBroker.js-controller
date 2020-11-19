---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecovacs-deebot/README.md
title: 适用于ioBroker的Ecovacs Deebot适配器
hash: /3S4rzqI/BvWFpuwJeHdCIZw2MqUrSjBc82muys1T8g=
---
![商标](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![npm](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)
![特拉维斯](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

＃适用于ioBroker的Ecovacs Deebot适配器
此适配器使用[ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js)库。

＃＃ 楷模
###支持的型号
* Deebot 900/901
* Deebot Ozmo 930
* Deebot Ozmo 950

###这些模型可以正常工作
* Deebot苗条2
* Deebot N79
* Deebot 601
* Deebot 710/711
* Deebot奥兹莫610
* Deebot Ozmo 900
* Deebot奥兹莫920
* Deebot Ozmo T8 AIVI

###这些模型应该可以工作
* Deebot M88
* Deebot 600/605
* Deebot Ozmo苗条10
* Deebot Ozmo T8（+）

##安装
建议使用Node.js版本10或更高版本。

该适配器使用画布库，可能需要其他安装。
要获得全部功能，请安装以下软件包。

对于基于Debian的Linux系统，应执行以下命令：

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

执行下一个命令之前可能需要重新启动

```bash
sudo npm install canvas --unsafe-perm=true
```

有关其他系统的说明，请访问https://www.npmjs.com/package/canvas#compiling

##用法
*有关如何使用此适配器的信息可以在[此处]找到（https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki）

＃＃ 已知的问题
*有报告称Ecovacs目前正在为Ozmo 920/950和Ozmo T8 / T8 + / T8 AIVI提供空的清洁日志。
*对于Deebot Ozmo 930，建议每天安排一次[安排重新启动]（https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content）报告在大约30分钟后连接断开。 24小时。
* Deebot 900/901的电池电量有奇怪的行为。这很可能是固件错误。
  *您可以使用适配器配置中的相应选项作为解决方法。
*“暂停”按钮不适用于Deebot 710/711。

＃＃ 常问问题
*常见问题可以在[此处]找到（https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ）

##免责声明
我绝不隶属于ECOVACS。

## Changelog

### 1.0.5
* Bump library to 0.4.25
* Initial support for Ozmo T8 and T8+
* Implement buttons for resetting consumable values (currently Deebot 900/901 and Ozmo 930 only)
* Several enhancements and fixes

### 1.0.4
* Bump library to 0.4.21
* Remove canvas from dependencies
* Several bugfixes and improvements (especially for N79 series)
* Possibility to specify the number of reruns for a spot area
* Spot areas in the "control" channel are now created automatically
* Remove number of spot areas from adapter settings
* Some refactoring
* Bump dependencies

### 1.0.3
* Improved Support for Ozmo T8 AIVI

### 1.0.2
* Initial Support for Ozmo T8 AIVI

### 1.0.1
   * Compact mode support
   * New features:
     * button to save the last used custom area values
     * buttons to rerun saved custom areas
   * Some enhancements and fixes

### 1.0.0
   * Stable Release

### 0.6.5
   * Set flag for compact mode to false

### 0.6.4
   * Some minor fixes

### 0.6.3
   * Using library version 0.4.13
   * Some translations added

### 0.6.2
   * Using library version 0.4.12
   * (boriswerner) Alternative API call for last clean log info (920/950)
   * (mrbungle64) Periodically polling of CleanLogs

### 0.6.1
   * Using library version 0.4.11
   * Several enhancements and fixes

### 0.6.0
   * Using library version 0.4.10
   * Several enhancements and fixes

### 0.5.9
   * Several enhancements and fixes

### 0.5.8
   * Several enhancements and fixes

### 0.5.7
   * Using library version 0.3.8
   
### 0.5.6
   * Using library version 0.3.7

### 0.5.5
   * Using library version 0.3.6

### 0.5.4
   * Using library version 0.3.5

### 0.5.3
   * Using library version 0.3.4

### 0.5.2
   * Bugfixes (MQTT/XML)
   * Start implement NetInfo (XMPP)

### 0.5.1
   * Using version 0.3.2 of ecovacs-deebot.js module
     * (boriswerner) Added Features for Ozmo 950
     * (mrbungle64) Some improvements for non Ozmo 950
   
### 0.5.0
   * Using version 0.3.x of ecovacs-deebot.js module (ng library)

### 0.4.2
   * Improved support for MQTT devices

### 0.3.10
   * (mrbungle64) Improved support for XML based MQTT devices
   
### 0.3.9
   * (mrbungle64) Improved support for XML based MQTT devices

### 0.3.8
   * (boriswerner) Improved support for Ozmo 950
   * (mrbungle64) Implemented waterbox info (XMPP based devices)

### 0.3.7
   * (mrbungle64) Bugfix
   
### 0.3.6
   * (boriswerner) Basic clean & charge working (Ozmo 950)

### 0.3.5
   * (mrbungle64) Improved support for MQTT devices
   * (boriswerner) Improved support for Ozmo 950 device

### 0.3.4
* (mrbungle64) Feature Release
   * Implemented handling water level
   * Preparing for latest repo

### 0.3.3
* (mrbungle64) Feature release
   * Implemented lifespan values of components
   
### 0.3.2
* (mrbungle64) Feature release
   * Implemented spotArea buttons
   
### 0.3.1
* (mrbungle64) Feature release (alpha)
   * Implemented spotArea command
   * Implemented customArea command
   * Implemented playSound command
   
### 0.3.0
* (mrbungle64) alpha release

### 0.2.0
* (mrbungle64) Pre-release (alpha)

### 0.1.0
* (mrbungle64) Initial release (pre-alpha)

### 0.0.1
* (mrbungle64) Initial development release

## License

MIT License

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

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