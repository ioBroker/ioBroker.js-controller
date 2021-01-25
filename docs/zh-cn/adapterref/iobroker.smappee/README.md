---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smappee/README.md
title: ioBroker.smappee
hash: gwcVX0Z9Crq0vyemPA0SsrxqNuHkE+VXpj/xJtFTXD4=
---
![商标](../../../en/adapterref/iobroker.smappee/admin/smappee.png)

![安装数量](http://iobroker.live/badges/smappee-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.smappee.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.smappee.svg)
![NPM](https://nodei.co/npm/iobroker.smappee.png?downloads=true)
![保镖徽章](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.smappee.svg)

＃ioBroker.smappee
适用于smappee的ioBroker适配器-设备

####您需要先安装ioBroker.MQTT适配器（或使用其他MQTT-broker）并激活Smappee的MQTT发布。在安装Smappee适配器之前，请参阅以下说明。
该适配器可为您带来实时（1s间隔）的能源数据，能源的汇总数据和可选的传感器消耗数据，以及访问ioBroker的Smappee-设备的开关/插头。

##说明
###安装ioBroker.mqtt-适配器。
请添加ioBroker.mqtt-适配器的实例：

![ioBMQ](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/ioBrokerMQTTBroker.PNG)

将实例配置为服务器/代理。默认情况下，端口1883可以，可以选择其他任何端口。
设置用户名和密码（对于smappee-和smappee-Adapter配置，您将需要此名称：

![ioBMC](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/ioBrokerMQTTConfig.PNG)

在“ MQTT设置”选项卡中，必须选中“仅在更改时发布”复选框。

###激活Smappee的MQTT发布。
打开浏览器并访问以下URL：<http：//X.X.X.X/smappee.html>（用网络中Smappee的IP地址替换X.X.X.X）。
单击登录/注销按钮，然后使用密码“ admin”登录。

![plo](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smplogon.png)

转到“高级”部分，然后在表格的最后一个字段中激活“高级”复选框。

![smpadv](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smpadv.jpeg)

然后，您应该在这里：

![smpmqt](https://github.com/iobroker-community-adapters/ioBroker.smappee/blob/master/admin/smpmqt.png)

输入ioBroker的Ip，然后输入为mqtt-broker指定的端口（默认为1883），即tcp：//192.168.1.111：1883

输入您配置mqtt-broker时指定的用户名和密码。
然后点击“应用更改并重新启动监视器”。

现在是时候

###安装smappee-adapter
创建smappee-adapter的实例，然后输入配置mqtt-broker时指定的用户名和密码。

如果您使用默认设置以外的ioBrokers MQTT-Adapter，则可以选择指定与MQTT Broker的连接（主机和端口）。

请给适配器几分钟时间，以从smappee设备读取数据。如果缺少某些值，请重新加载对象树。

该适配器提供有关实际电流，有关每个相的总功耗，有关实际负载以及有关气体，水和开关传感器的状态和功耗数据的数据。

###数据聚合或分离（每小时，每天，每年，..个值）
smappee的某些值是“计数器”，有些是特定时间段内的值（5分钟值）。
为了聚合或分离数据，请使用ioBroker.statistics适配器。

###控制插头/开关
Smappee允许您远程控制智能插头/智能开关。 smappee-one或其他433Mhz RF插头/三明治（即Intertechno IT-1500）。将交换机与您的smappee-应用程序配对，然后重新启动ioBroker smappee-adapter。您将获得插头的名称和状态，并通过将“ switchON”设置为“ true”，将开关打开，将其设置为“ false”时，则将其关闭（当设置“ switchON”时，ACK必须为false） 。 switchON的实际状态将更新为plug.state的状态。

## Changelog

### 0.2.3

-   'switchON' state is updated with actual state of a plug.

### 0.2.2

-   Readme - update.

### 0.2.1

-   Core Files/Testing Update and introduce adapter-core.
-   added counters for sensor that sum the 5-min values.

### 0.2.0

-   Gets state data for smartplugs and smartswitches, controls smart plugs and smart switches, gets 5-min power consumption for switch sensors (smart switches).

### 0.1.3

-   Controls smart plugs and smart switches, gets 5-min power consuption for switch sensors (smart switches). [For testing only]

### 0.1.1

-   Imports names & states of switches/plugs. Lets you control your swiches.

### 0.1.0

-   Gas_Water sensor integrated, 'alwaysOn' integrated.

### 0.0.5

-   design-bug fixed, Gas_Water Sensor integrated (only raw value).

### 0.0.4

-   credentials - bug fixed, more efficient design, gulp update

### 0.0.3

-   first tested version, bugs in config fixed.

### 0.0.2

-   reads phase config, reports single phase data.

### 0.0.1 Initial version

-   inital version, displays realtime power und energy consumption.

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