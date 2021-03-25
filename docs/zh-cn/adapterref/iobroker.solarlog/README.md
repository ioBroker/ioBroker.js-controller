---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarlog/README.md
title: ioBroker.solarlog
hash: kKAdXDlNvQdAVqIsZmi5a6+6azXQzT1PO2eqnZNa3Qk=
---
![标识](../../../en/adapterref/iobroker.solarlog/admin/solarlog.png)

![安装数量](http://iobroker.live/badges/solarlog-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.solarlog.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.solarlog.svg)
![NPM](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)

＃ioBroker.solarlog
用于Solarlog的ioBroker适配器-设备

## Solarlog-设置
必须在Solarlog的配置菜单中激活开放的JSON接口（offene Json-Schnittstelle）（Konfiguration-系统-Zugangskontrolle-Offene Json-Schnittstelle：aktivieren。）

##适配器-设置
＃＃＃ 基本设置
设置Solarlog-IP地址（192.XXX.X.XXX），端口（可选）和轮询-消耗/生产的间隔（以秒为单位）（“实时”-数据，最少10s）。

安全性：您可以在Solarlog中激活“用户”-密码，并在“用户登录已激活”复选框中添加密码，然后在适配器配置中添加密码，也可以不使用用户密码运行Solarlog和适配器。如果激活了用户登录，建议在使用solarlog-用户界面时停止适配器（否则，在每次请求适配器后都需要重新登录）。

＃＃＃ 高级设置
检查是否所有逆变器/电表/设备/智能能源-数据都将被收集。

设置轮询-以分钟为单位的平均值和汇总值的间隔（至少5分钟）。

检查是否要收集历史数据，并设置一天中更新历史数据对象的时间。

预测：（可选）适配器使用Forecast.Solar API获取预测-数据。实际上，可以预测今天和明天的总kWh，每小时刷新一次。可根据要求提供更详细的数据或其他数据（请提出问题）。

＃＃ 硬件
经过测试：Solarlog 200PM + / 300PM + / 500/1200米/ 50

SolarLog 50：没有开放的JSON接口@ SolarLog 50设备。因此，“信息”和“状态”通道中的某些值将为“访问权限被拒绝”。如果您希望使用其他解决方案，请打开一个问题或在相应的问题中发布您的偏好。

## Changelog

### 2.1.0

-   Cockpit-Data (consumption/production/battery/feed) added. Polling structure optimized for a faster polling of certain values ('live'-data).

### 2.0.2

-   smart energy 'switch group' data added.

### 2.0.1

-   bugfix (better timing to set inverter data).

### 2.0.0

-   Complete code redesign to reduce traffic between adapter and solarlog. NEW: System informations (info) and solarlogs setpoint-values for year, current and all month and current day (forecast).

### 1.3.0

-   user-login possibility added.

### 1.2.4

-   .npmignore and .gitignore added, small bugfix

### 1.2.3

-   Readme/License update.

### 1.2.2

-   It is now possible to set the time when historic data is requested.

### 1.2.1

-   'Forecast' - bug fixed (forecast request now only submitted if forecast is activated), dependencies updated.

### 1.2.0

-   Shows now forecast data: todays and tomorrows total kWh. Completed translations in words.js.

### 1.1.0

-   Shows detailed information on self - consumption. Imports yearly & monthly historic data.

### 1.0.0

-   Reads now devicetypes, -brands and -classes. Sets correct params for batteries. Displays self-consumption @'status'

### 0.1.6

-   Reads now battery data

### 0.1.5

-   Reads now historic data (yearly sum per Inverter), testing update

### 0.1.4

-   Readme - update

### 0.1.3

-   Core Files/Testing Update and introduce adapter-core

### 0.1.2

-   Inverter/meter - detecion optimized

### 0.1.1

-   support for compact mode

### 0.1.0

-   optional port declaration, readme updated

### 0.0.9

-   another bugfix daysum - function

### 0.0.8

-   bugfix daysum - function

### 0.0.7

-   import of daily sum of production/consumption per inverter/meter in Wh
-   info connection state fixed

### 0.0.6

-   optimized evaluation of number of inverters/meters to import

### 0.0.5

-   better readme
-   correct labes in config-dialogue

Planned for next version: reading solarlog smart energy settings and states

### 0.0.4

-   Inverter-import optional
-   Error - logs refer to functions
-   better readme

Planned for next version: reading solarlog smart energy settings and states

### 0.0.3

New functions added!

-   reads all defined inverters/meters
-   sets objects named as in solarlog
-   gets values (current production/consumption) and states for each inverter

Planned for next version: reading solarlog smart energy settings and states

### 0.0.2 First running version

Defined objects:

-   Time last data sync
-   Installed generator power
-   Total output PAC from all of the inverters and meters in inverter mode.
-   Total output PAC from all of the inverters
-   Average voltage UAC from the inverter
-   Average voltage UDC from the inverter
-   Total yield for the day from all of the inverters
-   Total yield for the previous day from all of the inverters
-   Total yield for the month from all of the inverters
-   Total yield for the year from all of the inverters
-   Total yield from all of the inverters
-   Current total consumption PAC from all of the consumption meters
-   Total consumption from all of the consumption meters
-   Total consumption for the previous day; all of the consumption meters
-   Total consumption for the month; all of the consumption meters
-   Total consumption for the year; all of the consumption meters
-   Accumulated total consumption, all Consumption meter

Planned Objects:

-   Description/Yield/Consuption of all connected inverters and meters

## License

The MIT License (MIT)

Copyright (c) 2018-2021 forelleblau marceladam@gmx.ch

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