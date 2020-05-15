---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hue/README.md
title: ioBroker飞利浦Hue桥适配器
hash: wls35NM9UwV531N1H0YvbRCmPKWBQwnTiWB9dd47wrA=
---
![商标](../../../en/adapterref/iobroker.hue/admin/hue.jpeg)

![安装数量](http://iobroker.live/badges/hue-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.hue.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.hue.svg)
![NPM](https://nodei.co/npm/iobroker.hue.png?downloads=true)

＃ioBroker飞利浦Hue桥适配器
==============

![建立状态](https://github.com/iobroker-community-adapters/ioBroker.hue/workflows/Test%20and%20Release/badge.svg)

##英语：gb：
该适配器将飞利浦Hue桥接器与ioBroker相连，以控制Philips Hue LED灯泡，Hue Hue LED灯，条纹，Osram之类的插头以及其他支持SmartLink的设备（如LivingWhites和某些LivingColors）。

＃＃＃ 设定
在ioBroker中安装此适配器后，请相应地创建一个适配器实例。接下来，您需要在适配器设置内将Hue桥与ioBroker连接：

1.如果您使用的不是v2，则将端口配置为80（非https），否则应使用443（https）。
2.单击“查找网桥”按钮以获取网桥的IP地址。这将搜索您环境中的所有网桥。然后选择要连接的网桥。字段“网桥地址”将填充您所选的色相网桥的IP地址。
3.接下来，在设置中单击“创建用户”按钮，然后步行至Hue桥接设备（即您的硬件）以按其圆形按钮。您将有30秒钟的时间进行。按下按钮后，应在字段“ Bridge User”中填充生成的字符串。
4.修改适配器设置中的任何其他选项，然后选择“保存并关闭”。
5.最后，您已经准备就绪：适配器将生成所有对象，以相应地控制Hue设备。

请注意：如果填写了“网桥地址”字段，则适配器设置按钮“查找网桥”将无效，而如果填写了“网桥用户”字段，则“创建用户”按钮将无效。

###设置
|名称|描述|
|---|---|
| __桥地址__ |您的色相桥的IP地址，您可以尝试通过按`Find Bridge`按钮检测到它。 |
| __Port__ | Hue网桥的端口，通常为443（SSL）和80（非SSL）。 |
| __User__ |网桥用户的用户名。您可以通过按`Create User`按钮并按照屏幕说明进行创建。 |
| __User__ |网桥用户的用户名。您可以通过按“创建用户”按钮并按照屏幕说明进行创建。 |
| __忽略场景__ |如果选中，则场景将不会由适配器显示/控制。 |
| __忽略组__ |如果选中，则适配器将不会显示/控制组。
| __“旧式”结构__ |为了支持向后兼容，可以在ioBroker中保留旧的对象结构。这个旧结构是`hue.<instance_number>.<brdige_name_channel>.<light_or_group_channel>.<state>`。新结构删除了`<brdige_name_channel>`，因此有必要改编旧脚本等。如果适配器检测到现有的旧结构，则将使用该结构而无需选中该复选框。但是，如果需要从旧结构迁移到新结构，请一次删除整个`hue.<instance_number>`命名空间。 |
| __同步软件传感器__ |也同步软件传感器。这些是虚拟传感器，例如由Hue Labs场景创建。通过控制此类传感器的`status`数据点，您可以启动/停止遵循此逻辑的场景。在大多数情况下，`0`将场景关闭，而`1`将其打开。 |
| __同步软件传感器__ |也同步软件传感器。这些是虚拟传感器，例如由Hue Labs场景创建。通过控制此类传感器的“状态”数据点，您可以按照该逻辑开始/停止场景。在大多数情况下，“ 0”关闭场景，而“ 1”打开场景。 |
| __轮询__ |如果选中，则适配器将轮询状态更改，否则只能用于控制指示灯，而不能显示其状态。 |
| __轮询间隔__ |定义轮询状态的频率，然后在ioBroker中进行更新。低轮询间隔可能会在某些设置中导致性能问题。因此，最小允许轮询间隔为2秒。如果将轮询间隔设置为小于2秒，则它将在运行期间设置为2秒。 |

＃＃＃ 附加信息
在版本3.3.0中，组状态`anyOn`和`allOn`变得可控制，请注意，它们在被控制时的行为就像`on`状态。在某些情况下，可能希望在可视化中具有可控制的`anyOn`状态。

## Deutsch：de：
Bindet飞利浦色相/ LivingColors / LivingWhites Lampen ein。
在Adapter-Settings中，使用IP der Hue Bridge软件作为用户名konfiguriert werden。 Um einen用户zu aktivieren einmal auf创建用户drücken和dann innerhalb von 30 Sekunden den Button Button der Hue桥drücken。 Dann wird自动用户übergeben。

##路线图/ Todo
*自动桥接发现
*通过桥接链接按钮自动设置用户

## Changelog
### 3.3.2 (2020-05-15)
* (foxriver76) internal optimizations - polling after change timeout removed, was 150 ms now instant

### 3.3.0 (2020-05-14)
* (foxriver76) introduce `allOn` state for groups
* (foxriver76) `anyOn` and `allOn` are now controllable and act like the `on` state
* (foxriver76) when native turn on/off behaviour is used, the brightness change of partially turned on groups will not turn
the whole group on, like the hue app does instead it will only change the brightness of the currently turned on lamps

### 3.2.9 (2020-05-12)
* (foxriver76) fixed issues on user creation
* (foxriver76) minor frontend (admin config) optimizations

### 3.2.8 (2020-04-26)
* (foxriver76) replace dots in light/group/sensor/.. names by underscores
* (foxriver76) fix potential state update delay after state change on lights/groups containing blanks

### 3.2.4 (2020-04-08)
* (xXBJXx) changed role of battery to `value.battery` and made unit `%`

### 3.2.3 (2020-02-20)
* (Apollon77) minor fix regarding handleParam called with non-existing id

### 3.2.2 (2020-02-12)
* (foxriver76) fix potential issues when error type is not HueError

### 3.2.1 (2020-01-26)
* (foxriver76) if lights/groups/sensors are deleted during runtime, restart of adapter is no longer necessary
* (foxriver76) if controller supports recursive deletion, device will be deleted automatically

### 3.1.1 (2020-01-15)
* (foxriver76) added additional frontend validation of polling interval
* (foxriver76) if errors are hue errors, log message instead of Error

### 3.1.0 (2020-01-12)
* (foxriver76) added new indicators for entertainment groups (class and activeStream)
* (foxriver76) added possibility to enable/disable streaming of entertainment group

### 3.0.3 (2020-01-11)
* (foxriver76) fixed turning on/off switchs like Osram Plug

### 3.0.1 (2020-01-10)
* (foxriver76) removed queue, because handled by dependency now
* (foxriver76) improved error handling
* __Nodejs >= 10 required__

### 2.5.0 (2019-12-23)
* (foxriver76) implemented a mechanic to prevent regular polling of recently changed state
* (foxriver76) this prevents fluctuating of buttons on low polling intervals + possible strange triggers in scripts

### 2.4.7 (2019-12-14)
* (foxriver76) do not set default values on every adapter start
* (foxriver76) this is now done only on object creation

### 2.4.6 (2019-12-06)
* (foxriver76) log unhandeld promise rejections
* (foxriver76) fix potential issue for negative temperature values

### 2.4.4 (2019-11-27)
* (foxriver76) only stringify huge jsons if necessary
* (foxriver76) prevent possible double polling at adapter start
* (foxriver76) use timeouts instead of interval
* (foxriver76) improved performance

### 2.4.3 (2019-11-19)
* (foxriver76) increased version of node-hue-api to fix authentication for old bridge

### 2.4.2 (2019-11-16)
* (foxriver76) we now use nupnp + upnp to discover bridges (previously only upnp)

### 2.4.1 (2019-11-13)
* (foxriver76) added possibility to control zones and entertainment areas
* (foxriver76) log queue retires on debug instead warn
* (foxriver76) __BETA__: added possibility to control software sensors (Note: this may be handled in a more suitable fashion soon)

### 2.3.1 (2019-11-02)
* (foxriver76) fixed controlling `on` state of sensors

### 2.2.3 (2019-10-21)
* (foxriver76) migrate everything to Hue v3
* (foxriver76) add possibility to turn on/off sensor
* (foxriver76) add anyOn state for all group
* (foxriver76) different kinds of fixes for v3 (Osram Plugs, SSL connection, etc)

### 2.1.0 (2019-10-15)
* (foxriver76) usage and adaptions for node-hue-api v3
* (foxriver76) ability to turn lights on with last settings
* (foxriver76) polling interval minimum is now 2 sec

### 2.0.1 (2019-10-04)
* (foxriver76) fixed bug, that prevented some sensor states getting updated during runtime

### 2.0.0 (2019-09-23)
__ATTENTION: Remove all objects once, ids have changed__
* (foxriver76) internal optimizations
* (foxriver76) usage of iobroker testing
* (foxriver76) add possibility to sync scenes
* (foxriver76) restart adapter when room is deleted in app
* (foxriver76) fix .hue value, user had to set 0-360° but adapter set 0-65535
* (foxriver76) fix .color.temperature
* (foxriver76) remove unnecessary bridge channel, adapter namespace is the bridge
* (foxriver76) add "update available" indicator for light bulbs
* (foxriver76) we now poll the root endpoint instead of (|lights| + |groups| + |sensors|) endpoints every pollingInterval seconds
* (foxriver76) min poll interval now 3 seconds instead of 5 seconds
* (foxriver76) add new indicator state 'anyOn'

### 1.2.4 (2019.09.18)
* (Apollon77) Make compatible with js-controller 2.0

### 1.2.3 (2019.03.11//2019.07.07)
* (jens-maus) Refactored command queue handling to use 'bottleneck' package so that command execution are processed with minimum delay.

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

Copyright (c) 2017-2020 Bluefox <dogafox@gmail.com>
Copyright (c) 2014-2016 hobbyquaker