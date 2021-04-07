---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecovacs-deebot/README.md
title: 适用于ioBroker的Ecovacs Deebot适配器
hash: 1d7KU08pEpgFEPk5lobDG6m7w25Ap2BBBkHzvhuuKN8=
---
![商标](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![稳定版](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![最新版本](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![安装数量](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![下载次数](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![npm](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)
![依赖状态](https://img.shields.io/david/mrbungle64/iobroker.ecovacs-deebot.svg)
![特拉维斯](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

＃适用于ioBroker的Ecovacs Deebot适配器
该适配器使用[ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js)库。

＃＃ 特征
一些值得注意的功能是：

*检索信息（例如电池，清洁日志，消耗品，清洁和充电状态）
*发送整洁的命令（例如自动，专色区域，自定义区域）
*发送其他一些命令（例如播放声音，重置消耗品，移动）
*保存上次运行的自定义区域，然后重新运行保存的区域
*调整真空功率（清洁速度）和水位
*在清洁过程中检索信息（例如当前位置和区域）
*检索地图信息，包括点区域和虚拟边界
*删除，保存和重新创建单个虚拟边界以及全套虚拟边界*）

*）实验

请注意：某些功能仅适用于某些型号

＃＃ 楷模
###支持的型号
* Deebot 900/901
* Deebot OZMO 930
* Deebot OZMO 920/950

列出的模型是我自己使用的模型，或者在技术上与这些模型相同的模型。

###这些模型应该正常运行或至少部分运行
* Deebot苗条2
* Deebot N79系列
* Deebot M88
* Deebot 600/601/605
* Deebot 710/711 / 711s
* Deebot OZMO 610
* Deebot OZMO 900/905
* Deebot OZMO T5
* Deebot OZMO T8系列
* Deebot OZMO苗条10
* Deebot N3 MAX
* Deebot N7
* Deebot N8系列
* Deebot U2系列

列出的模型已经众所周知可以使用，或者在技术上与这些模型相似。
但是，功能可能会受到部分限制。

我尝试实现广泛的功能，但要根据复杂性和其他各种标准来逐案决定。
当然，没有任何关于完整功能的声明。

＃＃ 安装
建议使用Node.js的10.x，12.x或14.x版本。最低要求版本是10.x

此适配器将[节点画布](https://www.npmjs.com/package/canvas)库用于某些与地图相关的功能，这些功能可能需要安装一些其他软件包。
这是可选的，对于没有地图功能的型号不是必需的，但是对于完整功能范围，请安装以下软件包。

对于基于Debian的Linux系统，应执行以下命令：

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

有关其他系统的说明，请访问https://www.npmjs.com/package/canvas#compiling

＃＃ 用法
*有关如何使用此适配器的信息可以在[此处]（https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki）中找到

＃＃＃ 状态
*有关状态的信息可以在[here]（https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29）（英文）和[here]（https://github.com/github .com / mrbungle64 / ioBroker.ecovacs-deebot / wiki / Datenpunkte-％28DE％29）（德语）

＃＃ 常问问题
*常见问题可以在[此处]找到（https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ）

＃＃ 已知的问题
*对于某些型号（例如Deebot OZMO 930），建议每天一次[安排重新启动]（https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content）因为有一些报告说大约过后连接会丢失。 24小时
*某些清洁功能可能不适用于Deebot 710/711 / 711s。请暂时使用0.5.8版。
*“边缘”功能不适用于Deebot U2（而是启动自动清洁）

##免责声明
我绝不隶属于ECOVACS。

## Changelog

### 1.1.2 (alpha)
* Using library version 0.6.0-beta.3
* Added experimental functions for deleting, saving and recreating saved virtual boundaries (920,950,T8)
* Added option to control clean speed and water level separately for each spot area
* Quite a lot of improvements for processing map data, spot areas and virtual boundaries
* Move some states from "info" channel to sub channels "info.library" and "info.network"
* Added some cleaning log values and some states for current cleaning stats
* Some improvements and fixes

### 1.1.1
* Using library version 0.6.0-alpha.3
  * Updated login process
  * Support for Chinese server login
* Initial support for some models (e.g. N3, N7 and N8 series)

### 1.1.0
* Stable release

### 1.0.13
* Using library version 0.5.6
* Some improvements and fixes

### 1.0.12
* Using library version 0.5.5
* Added some more T8 models
* Several improvements and fixes

### 1.0.11
* Enabled some features for OZMO 900
* Several minor improvements

### 1.0.10
* Using library version 0.5.4
* Several improvements and fixes
* Added available spot area boundaries to "map" channel (read only)

### 1.0.9
* Using library version 0.5.3
* Added some experimental features (for a few models only)
* Added option for virtual boundaries and some further improvements to adapter config
* Some improvements for js-controller 3.2.x

### 1.0.8
* Using library version 0.5.2 (0.5.2-beta.1)
* Added available virtualBoundaries channel for Deebot 900/901 and Ozmo 930 (read only)
* Added "volume" and buttons for resetting consumable values for 950 type models (920/950/T8)
* Improved synchronization of spot area buttons
* Add option for setting the language for spot area names
* Added some experimental features (for a few models only)
* Several enhancements and fixes
* Bump some dependencies

### 1.0.7
* Using library version 0.5.1 (0.5.1-beta.3)
* Initial support for Deebot U2 series
* Improved support for Ozmo T8 models
* (boriswerner) Fixed cleaning log for 950 type models (920/950/T8)
* (boriswerner) Added available virtualBoundaries to "map" channel (currently read only)
* Improved handling of device classes
* Several enhancements and fixes

### 1.0.6
* Using library version 0.5.0-beta.0
* Fix for running multiple devices
* Support for additional Ozmo T8 models
* Add option to synchronize spotArea buttons
* Set state value for triggered buttons to false
* Add option to suppress "unknown" value for "map.deebotPositionCurrentSpotAreaID" state
* Further enhancements and fixes

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

### 1.0.1 - 1.0.3
* Added support for Ozmo T8 AIVI
* Compact mode support
* Added a button to save the last used custom area values
* Added buttons to rerun saved custom areas
* Some enhancements and fixes

### 1.0.0
* Stable release

### 0.0.1 - 0.6.5
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive)#059)

## License

MIT License

Copyright (c) 2021 Sascha Hölzel <mrb1232@posteo.de>

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