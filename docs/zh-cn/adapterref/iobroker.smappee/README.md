---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smappee/README.md
title: ioBroker.smappee
hash: kN91vzBPwDEYQJ8D/N06TsAasHmzY/2EL0v63KAJldQ=
---
![商标](../../../en/adapterref/iobroker.smappee/admin/smappee.png)

![安装数量](http://iobroker.live/badges/smappee-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.smappee.svg)
![下载](https://img.shields.io/npm/dm/iobroker.smappee.svg)
![NPM](https://nodei.co/npm/iobroker.smappee.png?downloads=true)

#ioBroker.smappee
用于smappee的ioBroker适配器 - 设备

####您需要安装第一个ioBroker.MQTT适配器（或使用另一个MQTT代理）并激活您的Smappee的MQTT发布。请参阅以下说明，以便安装Smappee适配器。
该适配器为您提供实时（1s间隔）能源电力数据，能源聚合数据和可选传感器消耗数据，以及对Smappee  - 设备到ioBroker的交换机/插头的访问。

##说明
###安装ioBroker.mqtt  - 适配器。
请添加ioBroker.mqtt的实例 - 适配器：

![ioBMQ](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/ioBrokerMQTTBroker.PNG)

将实例配置为服务器/代理。默认端口1883是可以的，随意选择任何其他工作。
设置用户名和密码（smappee-和smappee-Adapter配置需要这个：

![ioBMC](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/ioBrokerMQTTConfig.PNG)

在MQTT设置选项卡中，必须选中“仅在更改时发布”复选框。

###激活Smappee的MQTT发布。
打开浏览器并访问URL：<http：//X.X.X.X/smappee.html>（用Smappee在您的网络中的IP地址替换X.X.X.X）。
单击登录/注销按钮并使用密码“admin”登录。

![smplogon](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/smplogon.png)

转到“高级”部分，激活表格最后一个字段中的“高级”复选框。

![smpadv](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/smpadv.jpeg)

那你应该在这里：

![smpmqt](https://github.com/forelleblau/ioBroker.smappee/blob/master/admin/smpmqt.png)

输入您的ioBroker的Ip，然后输入您为mqtt-broker指定的端口（默认为1883），即tcp：//192.168.1.111:1883

输入您指定的配置mqtt-broker的用户名和密码。
然后点击“应用更改并重新启动监视器”。

现在是时候了

###安装smappee-adapter
创建smappee-adapter的实例并输入您指定的配置mqtt-broker的用户名和密码。

如果您使用ioBrokers MQTT-Adapter以外的默认设置，则可以选择指定与MQTT Broker（主机和端口）的连接。

请给适配器几分钟时间来读取您的smappee设备中的数据。如果您缺少某些值，请重新加载对象树。

该适配器提供有关实际电流，总功耗和每相功耗的数据，实际负载以及燃气，水和开关传感器的状态和消耗数据。

###数据聚合或分离（每小时，每日，每年，..值）
一些smappee的值是'计数器'，一些是一段时间的值（5分钟值）。
要聚合或分离数据，请使用ioBroker.statistics适配器。

###控制插头/开关
Smappee允许您远程控制智能插头/智能开关。无论是smappee-one还是其他433Mhz RF插头/ swiches（即Intertechno IT-1500）。将开关与您的smappee-app配对，然后重新启动ioBroker smappee-adapter。您将获得插头的名称和状态，并通过将'switchON'设置为'true'，您打开开关，当您将其设置为'false'时，您将其关闭（当设置'switchON'ACK时必须为false） 。

## Changelog

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

Copyright (c) 2018-2019 forelleblau marceladam@gmx.ch

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