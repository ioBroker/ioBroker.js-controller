---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: /+i1EKx2kcZ0F2S4MmNGtwjdE/pLoFWdnfSNLX9WYMM=
---
![商标](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![建立状态](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

＃ioBroker.plenticore
用于KOSTAL Plenticore Plus逆变器的ioBroker适配器（即Plenticore Plus 8.5）

该适配器使用逆变器的内部Web界面访问逆变器和所连接设备（例如电池或智能电表）的属性和设置。要使用适配器，您需要将ioBroker实例连接到KOSTAL Plenticore所在的网络。

该适配器既不是KOSTAL的官方产品，也不是KOSTAL支持或认可的。这是一个仍处于早期开发状态的私人项目，因此使用风险自负！

##配置
设置您的逆变器的IP地址（例如192.168.0.23）和您用来作为工厂所有者连接到逆变器的Web界面的密码。轮询间隔以毫秒为单位（即10000为10秒）。

##适配器
适配器不使用屏幕抓取功能。它使用与Web界面相同的REST API。适配器可能尚未使用（很多）功能。

###为什么不（简单地）使用modbus？
变频器已启用modbus tcp，因此您可以使用modbus适配器查询值。但是，KOSTAL不允许编写任何Modbus地址。因此，您无法设置e。 G。使用ioBroker的电池最小SoC。

###使用适配器
适配器应在plenticore.X对象树下填充一些对象。其中一些是只读的，例如。 G。当前的光伏输出或家庭用电量。其他是可变的，例如。 G。电池的最小SoC或电池管理模式。我在Plenticore Plus 10上测试了适配器。

我尚未实现所有API端点，尤其是用于Web界面“统计”页面的能流统计。另外，适配器非常缺乏翻译功能，因为我是ioBroker开发的新手。

##对象
以下是此适配器使用和填充的最重要对象的摘录。标有`[**]`的所有设置都应该是可编辑的，但并非所有设置都经过测试，并且可能存在（并将存在）错误。

### Plenticore.X.devices.local
devices.local树包含有关逆变器以及可能连接的智能电表和/或电池的信息。

`plenticore.X.devices.local.Dc_P`-当前的直流功率，包括逆变器的自用功率。该值应接近`plenticore.X.devices.local.ac.P`的值（约+ 30-40W）`plenticore.X.devices.local.Home_P`-当前使用的总家庭电力`plenticore.X.devices.local.HomeBat_P`-电池提供的当前家庭电力§§SSSSS_4§ §-由工厂直接提供的当前家庭电力`plenticore.X.devices.local.HomeGrid_P`-由电网提供的当前家庭电力`plenticore.X.devices.local.LimitEvuAbs`-计算出的发送至电网的电流极限。如果工厂产生更多的电力，它将损失。
`plenticore.X.devices.local.StateKey0`-如果为true，则逆变器的电池管理已解锁

#### Plenticore.X.devices.local.ac
该通道包含有关逆变器交流侧的信息。最重要的是：`plenticore.X.devices.local.ac.Frequency`-净频率`plenticore.X.devices.local.ac.L1_P`-W中第1阶段的当前功率`plenticore.X.devices.local.ac.L2_P`-W中第2阶段的当前功率`plenticore.X.devices.local.ac.L3_P`-当前功率W`plenticore.X.devices.local.ac.P`中阶段3的变化-逆变器当前发射的总功率，包括电池放电

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles`-直至现在为止的电池寿命周期`[**] plenticore.X.devices.local.battery.MinSoc`-电池所需的最小SoC（充电状态）。如果缺少阳光，实际的SoC可能会低于此值。
`plenticore.X.devices.local.battery.P`-当前电池电量（充电时为负，放电时为正）`[**] plenticore.X.devices.local.battery.SmartBatteryControl`-如果启用了智能电池管理，则为true。关于官方手册，只有在没有其他交流电源（如涉及第二个逆变器）的情况下才启用此功能`plenticore.X.devices.local.battery.SoC`-电池的当前充电状态

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower`-逆变器可以提供的最大功率

#### Plenticore.X.devices.local.pv1 / pv2
`plenticore.X.devices.local.pvX.P`-工厂X阶段提供的当前功率

### Plenticore.X.scb
该频道包含设备本身的信息和设置

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable`-如果启用了modbus tcp，则为true`[**] plenticore.X.scb.modbus.ModbusUnitId`-设备的modbus单元ID

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname`-逆变器的当前主机名`[**] plenticore.X.scb.network.IPv4Auto`-使用DHCP为逆变器提供ip地址设置`[**] plenticore.X.scb.network.IPv4Address`-逆变器的当前ip地址`[**] plenticore.X.scb.network.IPv4DNS1`和§ §SSSSS_4§§-当前使用的DNS服务器`[**] plenticore.X.scb.network.IPv4Gateway`-当前使用的网络网关`[**] plenticore.X.scb.network.IPv4Subnetmask`-网络子网掩码

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers`-当前使用的时间服务器（NTP）。这些可以是多个，以空格分隔。
`[**] plenticore.X.scb.time.NTPuse`-使用NTP设置当前设备时间设置`[**] plenticore.X.scb.time.Timezone`-设备的时区

### Plenticore.X.scb.statistic.EnergyFlow
本节中的数据点包含在Plenticore Web UI中可见的统计信息。仅提到了`Day`数据点，但每个数据点也可用于`Month`，`Year`和`Total`。

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay`-当日以百分比表示的自给自足`plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay`-当日以千克为单位的估计节省的二氧化碳排放量`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay`-当日以Wh计的家庭总消费§§SSSSS_3§ §-光伏电站当天提供的总家庭消耗量`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay`-电池当天提供的总家庭消耗量`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay`-电网提供给当前用户的总家庭消耗量当日`plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay`-当日自身的消耗率（发电设备未发送到电网的发电量）`plenticore.0.scb.statistic.EnergyFlow.YieldDay`-当日工厂的总产量

##预测数据
为了能够使用预测功能，您需要安装ioBroker.darksky或ioBroker.weatherunderground适配器。另外，您需要配置系统的全局地理位置（经度和纬度），并设置plenticore适配器的扩展配置（面板和电池数据（如果适用））。

### Plenticore.0.forecast.consumption
`plenticore.0.forecast.consumption.day`-最近3天内白天的平均功耗`plenticore.0.forecast.consumption.night`-过去3天内夜间的当前平均功耗`plenticore.0.forecast.consumption.remaining`-直到日落之前的当前预测天的估计剩余电量

### Plenticore.0.cast.current
`plenticore.0.forecast.current.sky`-来自天气适配器的当前云覆盖率`plenticore.0.forecast.current.visibility`-来自天气适配器的当前可见性`plenticore.0.forecast.current.power.max`-计算出的晴天最大工厂功率（云覆盖率为0％）`plenticore.0.forecast.current.power.sky`-计算出的工厂功率，考虑到来自天气适配器的当前云覆盖范围`plenticore.0.forecast.current.power.skyvis`-计算出的电厂功率，考虑到来自天气适配器的当前云覆盖范围和可见性`plenticore.0.forecast.current.sun.azimuth`-当前太阳位置（方位角）`plenticore.0.forecast.current.sun.elevation`-当前太阳位置（海拔）`plenticore.0.forecast.current.sun.sunrise`-预测日期的日出时间（今天或明天）`plenticore.0.forecast.current.sun.sunset`-预测日期的日落时间（今天或明天）

### Plenticore.0.forecast.power
`plenticore.0.forecast.power.date`-当前功率预测信息的日期`plenticore.0.forecast.power.day`-一天的总功率预测`plenticore.0.forecast.power.day_high`-忽略天气适配器的可见性数据的一天的总功率预测`plenticore.0.forecast.power.remaining`-根据`plenticore.0.forecast.power.day`§`plenticore.0.forecast.power.Xh.power`-预测日的星期日X时来自工厂的估计总功率，其中1h是日出时间`plenticore.0.forecast.power.1h.time`- `plenticore.0.forecast.power.Xh.power`的太阳时间开始的时间

##捐赠
[![贝宝]（https://www.paypalobjects.com/zh_CN/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 2.0.0

-   Code rework
-   Outsourced many functions to libraries
-   This version has new dependencies and requires a newer adapter-core version!
-   Several fixes

### 1.1.1

-   No changes

### 1.1.0

-   Added support for weatherunderground weather adapter. The adapter can be choosen as alternative forecast source over the DarkSky adapter.

### 1.0.2

-   Fixed a warning message occuring far too often

### 1.0.1

-   Added forecast features to readme

### 1.0.0

-	Added power forecast feature

### 0.1.5

-   Added translations
-   Fixed shadow management handling.

### 0.1.4

-   Added shadow management datapoint.

### 0.1.3

-   Do not query battery values if battery management is not unlocked.

### 0.1.2

-   Resolved adapter check issues, see https://github.com/StrathCole/ioBroker.plenticore/issues/1
-   Added statistics data points.

### 0.1.1

-   Removed admin adapter dependency

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