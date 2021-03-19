---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: px4zk/3wJAeS3V3CIdF2pOm2GTLOP3JGncSlp+uWIX4=
---
![安装数量（最新）](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![安装数量（稳定）](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![依赖状态](https://img.shields.io/david/Grizzelbee/iobroker.dysonairpurifier.svg)
![已知漏洞](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![特拉维斯](https://travis-ci.org/Grizzelbee/iobroker.dysonairpurifier.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![资料下载](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

＃ioBroker.dysonAirPurifier
![徽标]（admin / dyson_logo.svg）！[徽标](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

##戴森空气净化器和风扇的ioBroker适配器
该适配器将ioBroker连接到各种戴森空气净化器。

由[Freepik]（https://www.flaticon.com/de/autoren/freepik）来自[www.flaticon.com](https://www.flaticon.com/de/)创建的徽标中的风扇图标。

###支持的设备
*戴森Pure Cool Link塔（TP02，产品类型475）
* Dyson Pure Cool Tower，2018年型号（TP04，ProductType 438）
*戴森Pure Cool Link办公桌（DP01，产品类型469）
* Dyson Pure Cool Desk，2018型号（DP04，ProductType 520）
* Dyson Pure Hot + Cool Link（HP02，产品类型455）
* 2018戴森Pure Hot + Cool（HP04，产品类型527）
*戴森Pure Humidify + Cool（PH01，产品类型358）

＃＃ 特征
将戴森的风扇，风扇加热器，空气净化器和空气加湿器连接到ioBroker。

*从设备和传感器读取值
*通过使您能够更改某些值（主功率，振荡，加热，风扇速度等），可以控制设备
*从Dyson服务器读取设备列表

＃＃ 安装
###先决条件
*此适配器需要Node.js> =版本10
*至少需要js-Controller 3.0.0
*至少需要管理员4.0.9
*要使此适配器运行，您需要一个Dyson帐户。
*确保将粉丝添加到您的帐户中。通过App或在线。

###适配器安装
####使用npm
在ioBroker安装上运行```npm install ioBroker.dysonairpurifier```，以从npm存储库中获取此适配器的最新版本。

####替代方法：使用GitHub URL
通过将ioBroker管理员UI指向GitHub上的最新稳定版本进行安装：<https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

您也可以使用此方法安装较早的发行版（通过指向版本标记，例如，URL中的§§JJJJ_0_0§§而不是```master```§），但是通常首选最新版本。

###需要配置数据
* Dyson帐户用户名
* Dyson帐户密码（此适配器最多可以处理32个字符的密码）
*您的局域网中的风扇/空气净化器IP地址。

*请注意*：由于早期开发状态以及Dyson不符合mDNS的实施，因此您需要在首次运行之后*提供设备的本地IP。

*附加说明*：自版本0.7.1起，适配器在未提供主机地址/ IP时尝试使用其主机名（序列号）连接到设备。这将在两个先决条件下起作用：

1.您的局域网中有一个DNS服务器正在运行。既可以在您的路由器中（例如FritzBox上运行的是DNS），也可以是专用的。
2.您尚未更改默认设备名称。

>在此适配器的首次启动时，将查询所有设备的Dyson API，并将在设备树中创建所有受支持的设备-其基本信息由API提供，并带有附加字段“ Hostaddress”。
>>>因此，请运行适配器一次，您的Dyson设备将使用其基本设置在设备树中创建。
>>然后停止适配器，在“主机地址”字段中输入IP，然后重新启动适配器。之后，应在设备树中的Dyson设备中填充数据。

##控制您的设备
该适配器当前能够控制设备的以下状态：

* FanSpeed，当前风扇速度
*夜间模式，夜间模式状态
*振荡，风扇振荡。
* ContinuousMonitoring，即使设备关闭也可以连续监视环境传感器。
* MainPower，风扇的主电源。
* AutomaticMode，风扇处于自动模式。
*气流方向，风扇吹向的方向。 ON =前； OFF =后退（又称Jet聚焦）
* Jetfocus，风扇吹向的方向。 ON =前； OFF =后退（又称Jet聚焦）
*加热模式，加热模式[ON / OFF]
* HeatingTargetTemp，加热目标温度
* AirQualityTarget，自动模式下的目标空气质量。
*加湿模式，开/关
* HumidifyAutoMode，自动/关
*自动加湿目标，自动加湿目标
*加湿目标，手动加湿目标
*水硬度，软，中，硬

据了解，这些状态的可能值记录在下面。
风扇速度仅允许从1到10以及“自动”的值。如果要将风扇速度设置为0，则需要关闭主电源。
戴森应用程序也可以做到这一点。

＃＃＃ 已知的问题
*不自动检测设备的IP

## Dyson API数据（消息有效负载）的说明
从<https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md>复制和扩展的信息

＃＃＃ 当前状态
|名称|意思|可能的值|单位 |
| ------------- | ----- | ----- | ----- |
|模式原因|当前模式已通过RemoteControl，App，Scheduler设置。 PRC，LAPP，LSCH，PUI | |
|国家原因| |模式| |
| rssi | WIFI强度| -100-0 | dBm |
|频道| WIFI频道| 52 | |
| fqhp | | 96704 | |
| fghp | | 70480 | |

####产品状态
|名称|意思|可能的值|单位 |
| ------------- | ----- | ----- | ----- |
| ercd |最后的错误代码| NONE或某些六进制值| |
|战利品|剩余滤清器寿命| 0000-4300 |小时|
| fmod |模式|风扇，汽车| |
| fpwr |主电源|开，关| |
| fnst |风扇状态|开，关，风扇| |
| fnsp |风扇转速0001-0010，自动| |
| fdir |又称Fandirection。喷气对焦/开=前，关=后|开，关| |
| ffoc | JetFocus |开，关|
| nmod |夜间模式|开启，关闭| |
|儿子|振荡|开启，关闭| |
| osal |振荡角度下界| 0005-355 | °（度）|
| osau | OscillationAngle上边界| 0005-355 | °（度）|
| oscs |振荡活动|开，关，空闲| |
| ancp |摆角| CUST，0180 |°（度）|
| qtar |空气质量指标| 0001 =好，0002 =正常，0003 =差，0004 =非常差| |
| rhtm |连续监控|开，关| |
|汽车| AutomaticMode |开，关| |
| nmdv | NightMode最大风扇速度？ | 0004 | |
| cflr |状态碳过滤器| 0000-0100 |百分比 |
| cflt |碳过滤器|车| |
| hflr |状态HEPA过滤器| 0000-0100 |百分比 |
| hflt | HEPA过滤器| GHEP | |
| sltm |睡眠计时器|开，关||
| hmod |加热器模式[ON / OFF] |热力| |
| hmax |加热目标温度| 0 .. 5000 | K |
|休ume加湿模式|开，关，|
|小屋|加湿自动模式| |
|哼！加湿目标| |
| cdrr | CleanDurationRemaining | |
| rect | AutoHumidificationTarget | |
| cltr | TimeRemainingToNextClean | |
|棉线|水硬度| |
| wacd |警告代码？ |没有... |
| rstf |重置过滤器生命周期|
| bril | | 0002 |
|科尔夫| |开，关|
| psta | [HP0x]未知| |
| hsta | [HP0x]未知| |
|倾斜[HP0x]未知| |
|拨| [DP0x]未知| |
| fqhp | fqhp ||
| msta | msta ||

|错误代码|含义|
| ----- | ----- |
|无|没有活动的错误|
| 57C2 |不明|
| 11E1 |振荡已被禁用。请按遥控器上的“振荡”按钮以继续。 |

####调度程序
|名称|意思|可能的值|单位 |
| ------------- | ----- | ----- | ----- |
| dstv | daylightSavingTime | 0001 ... | |
| srsc | ？ | 7c68 ... | |
| tzid |时区？ | 0001 ... | |

###环境电流传感器数据
＃＃＃＃ 数据
|名称|意思|可能的值|单位 |
| ------------- | ----- | ----- | ----- |
|事实|湿度（％）| 0000-0100 |百分比 |
|契约粉尘0000-0009 | |
| sltm |睡眠计时器|关闭... 9999 |分钟|
|机智开尔温的温度| 0000-5000 | K |
| vact |挥发性有机化合物| 0001-0009 | |
| pm25 | PM2.5 | 0018 ||
| pm10 | PM10 | 0011 ||
| va10 |挥发性有机化合物| 0004 ||
| noxl | NO2 | 0000-0014 ||
| p25r | | 0019 ||
| p10r | | 0018 ||

###环境和使用数据
冗余值？

＃＃＃＃ 数据
|名称|意思|可能的值|单位 |
| ------------- | ----- | ----- | ----- |
| pal0-pal9 |自小时开始以来在此级别的灰尘上花费的秒数| 0000-3600 | |
|手掌|似乎是palX的中位数| | |
| vol0-vol9 |自小时开始以来，此级别voc的第二次支出| 0000-3600 | |
| volm |似乎是volX的中间值| | |
| aql0-aql9 |在此空气质量水平上第二次消费的次数|从小时开始算起（max（pal，vol））| 0000-3600 | |
| aqlm |似乎是aqlX的中位数| | |
|收藏夹|似乎是在特定时间花费几秒钟| 0000-3600 | |
| faos |似乎是在特定时间花费几秒钟| 0000-3600 | |
| fofs |似乎是在特定时间花费几秒钟| 0000-3600 | |
| fons |似乎是在特定时间花费几秒钟| 0000-3600 | |
|哼！湿度 ？ （％）| 0000-0100 | |
| tmpm |开尔文的温度？ | 0000-5000 | |

＃＃ 法律声明
戴森，纯净，纯净，凉爽和其他均为[戴森有限公司](https://www.dyson.com)的商标或注册商标。所有其他商标均为其各自所有者的财产。

## Changelog

### 0.8.1 (2021-02-19) (Fall into the flames)
* (grizzelbee) New: added icons to each fan type in device tree
* (grizzelbee) New: Showing Filter type correctly - not as code anymore
* (grizzelbee) Upd: updated dependencies

### 0.8.0 (2021-02-18) (Beyond the mirror)
* (grizzelbee) New: Log as info if account is active on login; else log as warning. 
* (grizzelbee) New: [#21](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/21) Improvement for humidifier support
* (grizzelbee) Fix: [#67](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/67) Adapter sometimes wrote objects instead of values.

### 0.7.5 (2021-02-12) (I won't surrender)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/65) Adapter get online again after changes to dyson cloud API login procedure.
* (grizzelbee) New: Adapter reconnects with new host address when it gets changed manually

### 0.7.4 (2021-02-10) (Human)
* (grizzelbee) Fix: fixed adapter traffic light for info.connection
* (grizzelbee) Fix: Minor fixes

### 0.7.3 (2021-02-10) (When angels fall)
* (theimo1221) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) added default country
* (theimo1221) New: added function to mask password to dyson-utils.js
* (grizzelbee) New: extended config test and error logging
* (grizzelbee) New: added password to protectedNative in io-package.json
* (grizzelbee) Fix: fixed showing password in config (leftover from testing/fixing)
* (grizzelbee) Fix: fixed detection of needed js-controller features
* (grizzelbee) Fix: fixed detection if IP is given or not
* (grizzelbee) Upd: creating all data points with await 


### 0.7.2 (2021-02-10) (Songs of love and death)
* (grizzelbee) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) Fixed bug while loading/saving config which led to wrong values displayed for country and temperature unit
* (grizzelbee) Upd: switched "Skipping unknown ..." message from info to debug 

### 0.7.1 (2021-02-06) (Horizons)
* (grizzelbee) New: When no host address is given - adapter tries to connect via default hostname of the device
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) Filterlifetime is now correctly displayed in hours and percent for devices supporting this
* (grizzelbee) Fix: [#48](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/48) Fixed countrycodes for UK and USA
* (grizzelbee) Fix: [#52](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/52) Fixed VOCIndex
* (grizzelbee) Fix: Removed option to control Fan state since it corresponds to the state of the fan in auto-mode. Controlling it is senseless.
* (grizzelbee) Fix: Fixed await...then antipattern.
* (grizzelbee) Fix: Fixed undefined roles
* (grizzelbee) Fix: Fixed some bad promises and moved code to dysonUtils
* (grizzelbee) Fix: Fixed encrypting password using js-controller 3.0 build-in routine
* (grizzelbee) Upd: Added topic "Controlling your device(s)" to readme
* (grizzelbee) Upd: Removed unnecessary saving of MQTT password
* (grizzelbee) Upd: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) Added some more dyson codes for heaters and humidifiers


### 0.7.0 (2021-01-08) (Afraid of the dark)
* (jpwenzel)   New: Removing crypto from package dependency list (using Node.js provided version)
* (jpwenzel)   New: Introducing unit tests
* (jpwenzel)   New: At least NodeJs 10.0.0 is required
* (grizzelbee) New: [#23](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/23) - Introduced new data field AirQuality which represents the worst value of all present indexes.
* (grizzelbee) New: BREAKING CHANGE! - switched over to the adapter-prototype build-in password encryption. Therefore you'll need to enter your password again in config.
* (grizzelbee) New: At least js-controller 3.0.0 is required
* (grizzelbee) New: At least admin 4.0.9 is required
* (jpwenzel)   Fix: General overhaul of readme
* (jpwenzel)   Fix: Code refactoring
* (grizzelbee) Fix: fixed some datafield names - please delete the whole device folder and get them newly created.
* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/18) - Fixed creating the indexes when there is no according sensor
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Displaying Filter life value in hours again
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Creating additional Filter life value in percent
* (grizzelbee) Fix: removed materializeTab from ioPackage
* (grizzelbee) Fix: calling setState now as callback in createOrExtendObject
* (grizzelbee) Fix: Removed non compliant values for ROLE
* (grizzelbee) Fix: calling setState in callback of set/createObject now
* (grizzelbee) Fix: ensuring to clear all timeouts in onUnload-function

### 0.6.0 (2020-10-29) (Rage before the storm)
* (grizzelbee) New: [#17](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/17) - Added online-indicator for each device
* (grizzelbee) New: [#19](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/19) - Extended Password length from 15 characters to 32
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/20) - Improved errorhandling on http communication with Dyson API
* (grizzelbee) Fix: Fixed typo within data field anchorpoint - please delete the old ancorpoint manually.
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours

### 0.5.1 (2020-10-27) (Heart of the hurricance)
* (grizzelbee) Fix: Added missing clearTimeout

### 0.5.0 (2020-10-27) (Heart of the hurricance)
* (grizzelbee) New: Editable data fields have now appropiate value lists
* (grizzelbee) New: Added more country codes
* (grizzelbee) New: Target temperature of heater can now be set - **in the configured unit!**
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours
* (grizzelbee) Fix: [#6](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/6) - Changing the fanspeed does now fully work.  

### 0.4.1 (2020-10-16) (unbroken)
* (grizzelbee) New: [#8](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/8) - Documented ProductTypes for better overview and user experience in ReadMe
* (grizzelbee) New: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) - Added some Hot&Cool specific datafields
* (grizzelbee) New: Logging of from devices, when shutting down the adapter
* (grizzelbee) New: [#10](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/10) - Pollig device data every X (configurable) seconds for new data, hence sensors don't send updates on changing values
* (grizzelbee) New: [#11](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/11) - Added Austria and France to Country-List
* (grizzelbee) Fix: Fixed bug in error handling when login to Dyson API fails
* (grizzelbee) Fix: [#12](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/12) - Fixed Dyson API login by completely securing via HTTPS.
* (grizzelbee) Fix: Updated some descriptions in config
  
### 0.4.0 (2020-09-29)

* (grizzelbee) New: devices are now **controllable**
* (grizzelbee) New: state-change-messages are processed correctly now
* (grizzelbee) Fix: Added missing °-Sign to temperature unit
* (grizzelbee) Fix: Terminating adapter when starting with missing Dyson credentials
* (grizzelbee) Fix: NO2 and VOC Indices should work now
* (grizzelbee) Fix: Fixed build errors

### 0.3.0 (2020-09-27) - first version worth giving it a try

* (grizzelbee) New: Messages received via Web-API and MQTT getting processed
* (grizzelbee) New: datapoints getting created and populated
* (grizzelbee) New: Added config item for desired temperature unit (Kelvin, Fahrenheit, Celsius)
* (grizzelbee) New: Added missing product names to product numbers
* (grizzelbee) New: Hostaddress/IP is editable / configurable
* (grizzelbee) New: calculate quality indexes for PM2.5, PM10, VOC and NO2 according to Dyson App

### 0.2.0 (2020-09-22) - not working! Do not install/use

* (grizzelbee) New: Login to Dyson API works
* (grizzelbee) New: Login to Dyson AirPurifier (2018 Dyson Pure Cool Tower [TP04]) works
* (grizzelbee) New: mqtt-Login to [TP04] works
* (grizzelbee) New: mqtt-request from [TP04] works
* (grizzelbee) New: mqtt-request to [TP04] is responding

### 0.1.0 (2020-09-04) - not working! Do not install/use

* (grizzelbee) first development body (non functional)

## License

MIT License

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

Copyright (c) 2020 Hanjo Hingsen <hanjo@hingsen.de>