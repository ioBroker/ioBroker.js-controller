---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/t4qjXH8N/ioBroker.wiffi-wz/edit/master//README.md
title: wiffi-wz
hash: 6qBR46+TqcuITX7JMqfZPxt6U5rx04HZcDE4feHrczs=
adapter: true
license: MIT
authors: Christian Vorholt <chvorholt@gmail.com>
description: ioBroker adapter for Wiffi-wz, Weatherman and Rainyman
keywords: wiffi, wiffi-wz
readme: https://github.com/t4qjXH8N/ioBroker.wiffi-wz/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2017-12-10T19:27:01.107Z
version: 2.0.1
BADGE-安装数量: http://iobroker.live/badges/wiffi-wz-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.wiffi-wz.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.wiffi-wz.svg
BADGE-NPM: https://nodei.co/npm/iobroker.wiffi-wz.png?downloads=true
BADGE-建立状态: https://ci.appveyor.com/api/projects/status/58b8ygy9slf4oygx/branch/master?svg=true
---
![商标](zh-cn/adapterref/iobroker.wiffi-wz/../../../en/adapterref/iobroker.wiffi-wz/admin/wiffi-wz.png)适用于Wiffi-wz，Weatherman，Wiffi-pump，Rainyman以及其他人的ioBroker适配器=================


这是一个[ioBroker]（https://github.com/ioBroker/ioBroker）从Wiffi设备检索传感器数据的适配器请参阅[Stall.biz](http://www.stall.biz)以获取更多信息。

Stall.biz设备的典型示例是[Wiffi-wz]（http://www.stall.biz/project/der-wiffi-wz-2-0-der-wohnzimmersensor），[Weatherman]（https://www.stall.biz/project/weatherman -die-perfekte-wetterstation-fuer-die-hausautomation）和[Rainyman]](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr)。同时支持多个Wiffis。

由于适配器的延迟非常低（通常<3s），因此可以使用IR运动传感器触发打开或关闭灯的操作。

下面将详细介绍Stall.biz的一些设备：Wiffi-wz是一个将8个传感器组合在一个单元中的设备。目前可提供以下传感器：

 - 两个正交对齐的红外运动传感器
 - 温度传感器（可以是[DHT22]（https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf），或[BME280]（https://ae-bst.resource.bosch.com/媒体/ _tech /媒体/数据表/ BST-BME280_DS001-11.pdf））
 - 空气湿度传感器（可以是[DHT22]（https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf），或[BME280]（https://ae-bst.resource.bosch.com /media/_tech/media/datasheets/BST-BME280_DS001-11.pdf））
 - 大气压力（可以[BMP180]（https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf），[BMP280]（https://ae-bst.resource.bosch .com / media / _tech / media / datasheets / BST-BMP280-DS001-12.pdf）或[BME280]（https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST- BME280_DS001-11.pdf））
 - 灵敏度可调的噪音传感器
 -  luxmeter（[BH1750]（http://rohmfs.rohm.com/en/products/databook/datasheet/ic/sensor/light/bh1750fvi-e.pdf））
 - 空气质量传感器（[MQ135]（https://www.olimex.com/Products/Components/Sensors/SNS-MQ135/resources/SNS-MQ135.pdf））
 - 蜂鸣器

Weatherman可以配备许多传感器，详见[主页](https://www.stall.biz/project/weatherman-die-perfekte-wetterstation-fuer-die-hausautomation)。

Rainyman是Weatherman的某种简化版本，详见[主页](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr)。

＃＃ 这个怎么运作
通常，Wiffi-wz将传感器数据发送到Homematic CCU。 Homematic CCU在端口8181上接收主题脚本（或更好的JSON）。此适配器的管理页面重新配置Wiffi-wz以将传感器数据直接发送到ioBroker。传感器数据以[JSON](https://en.wikipedia.org/wiki/JSON)格式编码。因此，在ioBroker机器上打开端口8181上的本地套接字。请注意，出于安全原因，套接字**不得暴露于互联网。

＃＃ 建立
1.通过检索URL将ioBroker设置为传感器数据的接收者

    http：// [wiffi ip] /？ccu：[io-broker的ip]：

2.并将端口设置为8181

    http：// [wiffi ip] /？param：12：8181

3.告诉wiffi-wz它必须以JSON格式发送没有HTML标题的数据（注意，气象员可能使用不同的参数编号）

http：// [wiffi ip] /？param：27：1

如果发生任何错误，请将适配器loglevel设置为debug并通过电子邮件将数据电报发送给我。

##捐款
如果这个项目帮助你减少开发时间，你可以通过PayPal（chvorholt@gmail.com）给我一杯咖啡或一瓶啤酒:-)

## Changelog
#### 2.0.1 (08-Jan-2019)
- fixed "could not find ip" bug

#### 2.0.0 (03-Oct-2018)
- wiffi type does not need to be specified in the config anymore
- states are created and deleted by examining the received datagram
- some minor changes concerning the logging
- the buzzer of the wiffi can be activated (it may work for other actors as well, but it is untested at the moment)

#### 1.3.1 (01-Sep-2018)
- fixed npm installation problems

#### 1.3.0 (31-Aug-2018)
- support for Wiffi-pump

#### 1.2.6 (31-Aug-2018)
- fixed "adapter already running error"

#### 1.2.5 (31-Aug-2018)
- solved error when the adapter shuts down

#### 1.2.4 (16-Aug-2018)
- hotfix for wiffi-wz

#### 1.2.3 (15-Aug-2018)
- necessary modifications for publishing the adapter (fixing package.json, etc ...)

#### 1.2.2 (14-Aug-2018)
- necessary modifications for publishing the adapter (fixing roles, etc ...)

#### 1.2.1 (14-Aug-2018)
- fixed datagram evaluation

#### 1.2.0 (10-Aug-2018)
- added support for Rainyman (many thanks to Strobelix from [ioBroker forum](https://forum.iobroker.net) for testing)

#### 1.1.0 (26-Jul-2018)
- added support for Weatherman (many thanks to smartboart from [ioBroker forum](https://forum.iobroker.net) for testing)

#### 1.0.0 (17-Jul-2018)
- added support for Admin3

#### 0.3.3 (13-Dec-2017)
- corrected typos
- cleaner code

#### 0.3.2 (13-Dec-2017)
- added license file

#### 0.3.1 (10-Dec-2017)
- support for wiffi-wz, WEATHERMAN, and Rainymans, firmware should be greater or equal to _83
- some bugfixes

#### 0.2.1 (5-Dec-2017)
Bugfixes:
- JSON format sent by the Wiffi had been changed since Wiffi firmware wiffi_software_53. JSON data interpretation fixed.

#### 0.2.0 (10-Feb-2017)
Features:
- Added support for multiple Wiffis.

Changes:
- Removed expert functions from the admin interface.

#### 0.1.0 (12-Jan-2017)
Features:
- Mandatory settings can be done on the admin page.
- The wiffi-wz can be configured from the admin page (there are some problems, see known issues of this release).

#### 0.0.1 (12-Jan-2017)
Features:
- The sensor data is send to the ioBroker and saved as corresponding states.

## License
The MIT License (MIT)

Copyright (c) 2014-2019 Christian Vorholt <chvorholt@gmail.com>

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