---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wiffi-wz/README.md
title: 无题
hash: NGgm7DK6E9ncrgi/aCWgVT5ULGjWqESD0iJ9uLBcDEw=
---
![商标](../../../en/adapterref/iobroker.wiffi-wz/admin/wiffi-wz.png)ioBroker适配器，用于Wiffi-wz，Weatherman，Wiffi-pump，Pulsecounter，Rainyman等

![安装数量](http://iobroker.live/badges/wiffi-wz-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.wiffi-wz.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.wiffi-wz.svg)
![NPM](https://nodei.co/npm/iobroker.wiffi-wz.png?downloads=true)
![建立状态](https://travis-ci.org/t4qjXH8N/ioBroker.wiffi-wz.svg?branch=master)

=================

这是[ioBroker]（https://github.com/ioBroker/ioBroker）用于从Wiffi设备检索传感器数据的适配器，请参阅[Stall.biz](http://www.stall.biz)的更多信息。

Stall.biz的设备的典型示例是[Wiffi-wz]（http://www.stall.biz/project/der-wiffi-wz-2-0-der-wohnzimmersensor），[气象员]（https://www.stall.biz/project/weatherman -die-perfekte-wetterstation-fuer-die-hausautomation）和[Rainyman](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr)。同时支持多个Wiffis。

由于适配器的等待时间非常短（通常<3s），因此可以使用IR运动传感器来触发诸如打开或关闭灯之类的动作。

下面，将详细介绍Stall.biz的某些设备：Wiffi-wz是在一个单元中结合了八个传感器的设备。当前，以下传感器可用：

-两个正交排列的红外运动传感器
-温度传感器（可以是[DHT22]（https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf）或[BME280]（https://ae-bst.resource.bosch.com/媒体/ _tech / media /数据表/BST-BME280_DS001-11.pdf））
-空气湿度传感器（可以是[DHT22]（https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf）或[BME280]（https://ae-bst.resource.bosch.com /media/_tech/media/datasheets/BST-BME280_DS001-11.pdf））
-大气压（可以是[BMP180]（https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf），[BMP280]（https://ae-bst.resource.bosch .com / media / _tech / media / datasheets / BST-BMP280-DS001-12.pdf）或[BME280]（https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST- BME280_DS001-11.pdf））
-灵敏度可调的噪音传感器
-照度计（[BH1750]（http://rohmfs.rohm.com/en/products/databook/datasheet/ic/sensor/light/bh1750fvi-e.pdf））
-空气质量传感器（[MQ135]（https://www.olimex.com/产品/组件/传感器/SNS-MQ135/resources/SNS-MQ135.pdf））
-蜂鸣器

Weatherman可以配备许多传感器，有关更多详细信息，请参见[主页](https://www.stall.biz/project/weatherman-die-perfekte-wetterstation-fuer-die-hausautomation)。

Rainyman是Weatherman的简化版本，有关更多详细信息，请参见[主页](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr)。

＃＃ 怎么运行的
通常，Wiffi-wz将传感器数据发送到Homematic CCU。 Homematic CCU在端口8181上接收homematic脚本（或更好的JSON）。此适配器的管理页面将Wiffi-wz重新配置为将传感器数据直接发送到ioBroker。传感器数据以[JSON格式](https://en.wikipedia.org/wiki/JSON)格式编码。因此，在ioBroker机器上打开了端口8181上的本地套接字。请注意，出于安全原因，不得将插座暴露在互联网上。

＃＃ 设定
1.通过检索url将ioBroker设置为传感器数据的接收者

    http：// [wiffi ip] /？ccu：[io-broker的IP]：

2.并将端口设置为8181

    http：// [wiffi ip] /？param：12：8181

3.告诉wiffi-wz，它必须以JSON格式发送没有HTML标头的数据（请注意，气象员可能使用其他参数号）

http：// [wiffi ip] /？param：27：1

如果发生任何错误，请设置适配器日志级别为调试并通过电子邮件向我发送数据电报。

##捐赠
如果这个项目帮助您减少了开发时间，您可以通过PayPal（chvorholt@gmail.com）给我一杯咖啡或一瓶啤酒:-)

## Changelog
#### 2.2.0 (08-Feb-2020)
- compact mode successfully tested

#### 2.1.5 (08-Feb-2020)
- fixed an error with numeric state names

#### 2.1.4 (29-Aug-2019)
- fixed "could not create a state null" error

#### 2.1.3 (27-Jun-2019)
- compatibility for boolean values and old Wiffi versions

#### 2.1.2 (21-Jun-2019)
- changed behaviour: if states are missing in the datagram, but present in the database, they are not removed from the database
- boolean and numeric values are correctly stored

#### 2.1.0 (14-Apr-2019)
- support for compact mode

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