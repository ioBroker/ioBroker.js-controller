---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hue/README.md
title: 已移至https://github.com/iobroker-community-adapters/ioBroker.hue
hash: m83a+nzBh8badhfDiWEG6Fwf++rjPjLQbvzQP8bOTk0=
---
![安装数量](http://iobroker.live/badges/hue-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.hue.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hue.svg)
![NPM](https://nodei.co/npm/iobroker.hue.png?downloads=true)

＃已移至https://github.com/iobroker-community-adapters/ioBroker.hue
![商标](../../../en/adapterref/iobroker.hue/admin/hue.jpeg)

＃ioBroker Philips Hue Bridge Adapter ==============
##英文：gb：
通过飞利浦Hue Bridges将飞利浦Hue LED灯泡，Hue LED灯和条纹之友以及其他支持SmartLink的设备（LivingWhites，一些LivingColors）连接到ioBroker。

您必须先将HUE桥与ioBroker链接起来。

1.首先按“查找桥”按钮找到IP地址。仅在未输入IP地址时启用。
2.找到IP地址后，必须创建USER。为此，按“创建用户”按钮，然后按HUE桥上的“链接”按钮。仅当未输入USER时，才会启用“创建用户”按钮

## Deutsch：de：
Bindet Philips Hue / LivingColors / LivingWhites Lampen ein。
In den Adapter-Settings muss die IP der Hue Bridge sowie ein用户名konfiguriert werden。 Um einen用户zu aktivieren einmal auf创建用户drückenunddann innerhalb von 30 Sekunden den Button an der Huebridgedrücken。 Dann wird automatisch derUserübergeben。

##路线图/ Todo
*自动桥发现
*通过桥接链接按钮自动设置用户

## Changelog
### 1.1.2 (2019.01.25)
* (BasGo) Added compact mode

### 1.1.1 (2018.08.17)
* (bluefox) Ignoring of groups was implemented

### 1.1.0 (2018.08.17)
* (bluefox) The command queue was optimized

### 1.0.1 (2018.08.14)
* (bluefox) Roles were adjusted
* (bluefox) temperature changed from 153-cold, 500-warm to 2200-warm, 6500-cold
* (bluefox) hue changed from 0-65535 to 0-360°

### 1.0.0 (2018.04.12)
* (arteck) Enable/Disable OSRAM check from HUE Bridge
* (arteck) polling ZLLSwitch and ZGPSwitch     
* (bluefox) admin3
* (bluefox) do not send commands ofter than 10 in 10 seconds

### 0.6.9 (2017.05.18)
* (bluefox) Enable adapter by default

### 0.6.8 (2017.04.22)
* (bluefox) Poll groups

### 0.6.7 (2017.04.21)
* (bluefox) Fix error with turn on the lamp on start
* (bluefox) configurable port

### 0.6.6 (2017.04.20)
* (bluefox) Use new version of npm library

### 0.6.0 (2016.11.30)
* (pmant) support new lamps
* (pmant) add light name to log

### 0.5.9 (2016.10.11)
* (pmant) fix error with null values

### 0.5.8 (2016.06.05)
* (bluefox) fix typo

### 0.5.7 (2016.06.05)
* (soef) write back known states for group/room
* (soef) Integer conversion for bri_inc command

### 0.5.6
* (Pmant) (experimental) support for power switches

### 0.5.5
* (Pmant) fix error with xy state
* (Pmant) support level in command state

### 0.5.4
* (Pman) Lightset 0 fixed
* (Pman) support for diffent gamuts
* (Pman) support Rooms (new HUE App)

### 0.5.3
* (soef) Default Lightset 0 added

### 0.5.2
* (Pman) fix jscs warnings
* (Pman) improve RGB conversion
* (Pman) add update rgb color

### 0.5.1
* (Pman) fix find bridge popup

### 0.5.0
* (Pman) update to node-hue-api 1.2.x
* (Pman) add level state (bri percentage)

### 0.4.4
* (bluefox) fix config edit

### 0.4.3
* (Pmant) fix adapter crash

### 0.4.2
* (Pmant) add find bridge (experimental)
* (Pmant) add create user (experimental)
* (Pmant) fix enable polling

### 0.4.1
* (Pmant) calculate and write back inc values

### 0.4.0
* (Pmant) add command state

### 0.3.2
* (Pmant) add groups as channels (write only)
* (Pmant) fix prevent duplicate channel names

### 0.3.1
* (Pmant) fix another bug with spaces
* (Pmant) fix hue/sat bug
* (Pmant) fix effect bug
* (Pmant) fix xy colormode

### 0.3.0
* (Pmant) fix rgb states only for color lights
* (Pmant) change set known state changes immediately
* (Pmant) change on/off sets brightness to 254/0
* (Pmant) change changing any color (hs,ct,xy) while light is off sets brightness to max
* (Pmant) fix set brightness to zero if light is off
* (Pmant) change set bri to zero if lamp is not reachable
* (Pmant) fix bridges and lamps with spaces in name

### 0.2.1
* (Pmant) add rgb states (write only)
* (Pmant) fix parent/children warnings
* (Pmant) add switch light off if brightness is zero

### 0.1.4
* (bluefox) fix some null objects

### 0.1.3
* (hobbyquaker) config UI
* (hobbyquaker) added children

### 0.1.2
* (hobbyquaker) fixes

### 0.1.1

* (hobbyquaker) fixed min/max attributes
* (hobbyquaker) added common.oper.read/write attributes

### 0.1.0

* (hobbyquaker) first release

## License

Apache 2.0

Copyright (c) 2017-2018 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker