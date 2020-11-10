---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: elQeOPXkT5ba21PqxJof5sB4rxB8CwcIC0kGZtM23+Y=
---
![商标](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![安装数量](http://iobroker.live/badges/plenticore-installed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![NPM](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![稳定](http://iobroker.live/badges/plenticore-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![建立状态](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist[hier zu finden](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md)。

＃ioBroker.plenticore
用于KOSTAL Plenticore Plus逆变器的ioBroker适配器（即Plenticore Plus 8.5）

该适配器使用逆变器的内部Web界面访问逆变器和所连接设备（例如电池或智能电表）的属性和设置。要使用适配器，您需要将ioBroker实例连接到KOSTAL Plenticore所在的网络。

该适配器既不是KOSTAL的官方产品，也不是KOSTAL支持或认可的。这是一个仍处于早期开发状态的私有项目，因此使用风险自负！

##配置
设置您的逆变器的IP地址（例如192.168.0.23）和您用来作为工厂所有者连接到逆变器的Web界面的密码。轮询间隔以毫秒为单位（即10000为10秒）。

##适配器
适配器不使用屏幕抓取。它使用与Web界面相同的REST API。适配器可能尚未使用（很多）功能。

###为什么不（简单地）使用modbus？
变频器已启用modbus tcp，因此您可以使用modbus适配器查询值。但是，KOSTAL不允许编写任何Modbus地址。因此，您无法设置e。 G。使用ioBroker的电池最小SoC。

###使用适配器
适配器应在plenticore.X对象树下填充一些对象。其中一些是只读的，例如。 G。当前的光伏输出或家庭用电量。其他是可变的，例如。 G。电池的最小SoC或电池管理模式。我在Plenticore Plus 10上测试了适配器。

##对象
以下是此适配器使用和填充的最重要对象的摘录。标有`[**]`的所有设置都应该是可编辑的，但并非所有设置都已通过测试，并且可能存在错误。

### Plenticore.X.devices.local
devices.local树包含有关逆变器以及可能连接的智能电表和/或电池的信息。

`plenticore.X.devices.local.Dc_P`-当前的直流功率，包括逆变器的自用功率。该值应接近`plenticore.X.devices.local.ac.P`的值（大约+ 30-40W）`plenticore.X.devices.local.Pv_P`-当前产生的PV功率。该值由适配器通过将pvx.P值相加得出。
`plenticore.X.devices.local.Home_P`-当前使用的总家庭电力`plenticore.X.devices.local.HomeBat_P`-电池提供的当前家庭电力`plenticore.X.devices.local.HomePv_P`-工厂直接提供的当前家庭电力`plenticore.X.devices.local.HomeGrid_P`-当前家庭电网提供的功率`plenticore.X.devices.local.ToGrid_P`-发送到电网的当前功率。此值是由适配器计算得出的，可能不是100％准确的。
`plenticore.X.devices.local.LimitEvuAbs`-计算出的可能离开转换器的功率电流极限。如果工厂产生更多的电力，它将损失。
`plenticore.X.devices.local.StateKey0`-如果为true，则逆变器的电池管理已解锁

#### Plenticore.X.devices.local.ac
该通道包含有关逆变器交流侧的信息。最重要的是：`plenticore.X.devices.local.ac.Frequency`-净频率`plenticore.X.devices.local.ac.L1_P`-W中第1阶段的当前功率`plenticore.X.devices.local.ac.L2_P`-W中第2阶段的当前功率`plenticore.X.devices.local.ac.L3_P`-当前功率W`plenticore.X.devices.local.ac.P`中阶段3的变化-逆变器当前发射的总功率，包括电池放电

#### Plenticore.X.devices.local.battery
`plenticore.X.devices.local.battery.Cycles`-直到现在为止的电池寿命周期`[**] plenticore.X.devices.local.battery.MinSoc`-电池所需的最小SoC（充电状态）。如果缺少太阳光，实际的SoC可能会低于此值。
`plenticore.X.devices.local.battery.MinSocDummy`-如果配置中禁用了MinSoC管理，则此值由适配器设置。这是为了显示MinSoC将设置为什么值。
`plenticore.X.devices.local.battery.P`-当前电池电量（如果充电则为负，如果放电则为正极）`plenticore.X.devices.local.battery.Charge_P`-当前电池充电功率（如若为放电，则为0）`plenticore.X.devices.local.battery.Discharge_P`-当前电池放电功率（如若为充电，则为0 ）`[**] plenticore.X.devices.local.battery.SmartBatteryControl`-如果启用了智能电池管理，则为true。关于官方手册，只有在没有其他交流电源（如涉及第二个逆变器）的情况下，才应启用此功能`[**] plenticore.X.devices.local.battery.ExternControl`-0启用内部控制，1进行外部数字I / O，2进行外部Modbus TCP§§SSSSS_11§ §-电池的当前充电状态

#### Plenticore.X.devices.local.inverter
`plenticore.X.devices.local.inverter.MaxApparentPower`-逆变器可以提供的最大功率

#### Plenticore.X.devices.local.pv1 / pv2 / pv3
`plenticore.X.devices.local.pvX.P`-工厂X阶段提供的当前功率

### Plenticore.X.scb
该通道包含设备本身的信息和设置

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable`-如果启用了modbus tcp，则为true`[**] plenticore.X.scb.modbus.ModbusUnitId`-设备的modbus单元ID

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname`-逆变器的当前主机名`[**] plenticore.X.scb.network.IPv4Auto`-使用DHCP为逆变器提供ip地址设置`[**] plenticore.X.scb.network.IPv4Address`-逆变器的当前ip地址`[**] plenticore.X.scb.network.IPv4DNS1`和§ §SSSSS_4§§-当前使用的DNS服务器`[**] plenticore.X.scb.network.IPv4Gateway`-当前使用的网络网关`[**] plenticore.X.scb.network.IPv4Subnetmask`-网络子网掩码

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers`-当前使用的时间服务器（NTP）。这些可以是多个，以空格分隔。
`[**] plenticore.X.scb.time.NTPuse`-使用NTP设置当前设备时间设置`[**] plenticore.X.scb.time.Timezone`-设备的时区

### Plenticore.X.scb.statistic.EnergyFlow
本节中的数据点包含在Plenticore Web UI中可见的统计信息。仅提到了`Day`数据点，但是每个数据点也可用于`Month`，`Year`和`Total`。

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay`-当日的百分比自给自足`plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay`-当日的估计节省的二氧化碳量（kg）`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay`-当日的总家庭用Wh量§§SSSSS_3 §-光伏电站当天提供的总家用电量`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay`-电池当天提供的总家用电量`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay`-电网提供的当前总家用电量当日`plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay`-当日发送至电网的总电量`plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay`-当日自身的消耗率（发电设备未发送至电网的发电量）`plenticore.0.scb.statistic.EnergyFlow.YieldDay`-当天工厂的总产量

##预测数据
预测功率的功能使用不同的天气数据源。它可以直接使用，但是可以通过添加以下一个或多个天气适配器的实例来改善结果：ioBroker.darksky，ioBroker.weatherunderground，ioBroker.daswetter。为了使该功能正常工作，您需要配置系统的全局地理位置（经度和纬度），并设置plenticore适配器的扩展配置（面板和电池数据（如果适用））。

###预测如何运作
预测功能使用发电厂和电池提供的数据来计算一天中每个时间产生的最大可能功率。这是通过使用系统的位置来获取太阳高度和方位角并计算太阳辐射值来完成的。这些值与来自不同来源的天气预报数据相结合，以获取一天中每个小时的多云，大雾和大雨的预报。利用这些数据，适配器可以计算出植物在我们每一次阳光照射下可能产生的能量。

然后，预测值可用于设置电池的MinSoC，启用或禁用转换器的动态“智能电池管理”（均由适配器内部完成）或控制家庭中的其他设备。 G。加热，洗衣机，烘干机，洗碗机等（由外部JavaScript /用户集体完成）。

### Plenticore.0.forecast.consumption
`plenticore.0.forecast.consumption.day`-最近3天的白天平均功耗`plenticore.0.forecast.consumption.night`-最近3天的夜间当前平均功耗`plenticore.0.forecast.consumption.remaining`-直到日落之前的当前预测天的估计剩余电量

### Plenticore.0.cast.current
`plenticore.0.forecast.current.power.generated`-在当日至当前时间为止的当前发电量`plenticore.0.forecast.current.power.max`-计算出的晴朗天空上的最大发电量（云覆盖率为0％）`plenticore.0.forecast.current.power.sky`-考虑到当前的云量计算得出的发电量天气适配器`plenticore.0.forecast.current.power.skyvis`-考虑到当前的云覆盖和来自天气适配器的可见性的计算出的工厂功率`plenticore.0.forecast.current.power.skyvisrain`-考虑到来自天气适配器的当前云覆盖，可见性和降雨的计算出的工厂功率`plenticore.0.forecast.current.visibility.*` -相应的天气适配器`plenticore.0.forecast.current.rain.*`提供的当前能见度预报-相应的天气适配器`plenticore.0.forecast.current.rainChance.*`提供的当前降雨预报-相应的天气适配器`plenticore.0.forecast.current.sky.*`提供的当前降雨概率预报-当前的云预报由相应的天气适配器`plenticore.0.forecast.current.sky_high.*`提供-相应的天气适配器`plenticore.0.forecast.current.sky_medium.*`提供的-当前云预报（中间的空气由相应的天气适配器`plenticore.0.forecast.current.sky_low.*`提供-相应的天气适配器`plenticore.0.forecast.current.sun.azimuth`提供的当前云预报（较低的空气层）-当前太阳位置（方位角）`plenticore.0.forecast.current.sun.elevation`-当前太阳位置（提升）

### Plenticore.0.forecast.day1 –第2天同样适用
`plenticore.0.forecast.day1.power.date`-当前功率预测信息的日期`plenticore.0.forecast.day1.power.day`-一天的总功率预测`plenticore.0.forecast.day1.power.day_adjusted`-考虑到目前为止已产生的功率并使用预测数据的一天的总功率预测仅针对剩余的太阳小时`plenticore.0.forecast.day1.power.day_high`-忽略天气适配器的可见性数据的当天的总功率预测`plenticore.0.forecast.day1.power.remaining`-基于剩余的太阳小时的预测当天的总预测功率`plenticore.0.forecast.day1.power.Xh.power` -在预测日的星期日X时来自工厂的估计总功率，其中1h是日出时间`plenticore.0.forecast.day1.power.Xh.power_high`-在预测日的太阳X时来自工厂的估计总功率，但不考虑可见性或降雨数据`plenticore.0.forecast.day1.power.Xh.time`-`plenticore.0.forecast.power.Xh.power`开始的太阳时间`plenticore.0.forecast.day1.sun.sunrise`-预报日期的日出时间`plenticore.0.forecast.day1.sun.sunset`-预报日期的日落时间

##捐赠
[![贝宝]（https://www.paypalobjects.com/zh_CN/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

### 2.1.3
-   Fixed wrong hour of weather forecast from daswetter adapter

### 2.1.2
-   Added setting for minimum SoC to enable battery management

### 2.1.1
-   Fixed problems in config and translations

### 2.1.0
-   Added further forecast sources to provide better power forecasts
-   Added second day forecast
-   Improved code and fixed some minor issues
-   New dependency for xml2js
-   Updated readme

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