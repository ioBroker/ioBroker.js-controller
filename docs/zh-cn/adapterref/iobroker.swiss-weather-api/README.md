---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: CPZQujwQq0ZDwyiBSYnMo2oF5Ya+m6HBcrh/60BZHrE=
---
![商标](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![安装数量（最新）](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![依赖状态](https://img.shields.io/david/baerengraben/iobroker.swiss-weather-api.svg)
![已知漏洞](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![NPM](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/baerengraben/ioBroker.swiss-weather-api/master.svg)

＃ioBroker.swiss-weather-api
##适用于ioBroker的swiss-weather-api适配器
连接到出色的SRG-SSR天气API（https://developer.srgssr.ch/apis/srgssr-weather）。

SRG-SSR Weather REST API可让您从瑞士超过25.000个地点获取天气预报和报告。

**图标**

天气图标可从https://erikflowers.github.io/weather-icons/重用

从0.1.8版开始，SRG-SSR甚至提供了自己的图标。因此，您可以选择要使用的图标集。

**请注意，此适配器仅支持瑞士境内的位置。**

＃＃＃ 入门
1.在https://developer.srgssr.ch/上获得免费帐户
1.转到“我的应用程序”并创建一个新的应用程序。这将创建一个特定的ConsumerKey和ConsumerSecret
1.找出需要进行预测的所选位置的经度/纬度（十进制）
1.在ioBroker上安装此适配器=>这可能需要几分钟（在Raspberry Pi 3上约为7分钟）
1.在“适配器配置”中填写
   1.应用名称
   1. App的ConsumerKey
   1. App的ConsumerSecret
   1.需要预测的所选瑞士位置的经度/纬度。 =>请使用十进制度数（例如苏黎世：47.36667 / 8.5）
   1.以分钟为单位的轮询间隔（默认为30分钟）

适配器启动后10秒钟将进行第一个查询。首次启动后，将根据配置参数（以分钟为单位的轮询间隔）定期执行查询

## Changelog

### 0.3.1
* (baerengraben)  Adapter-Config attributes longitude & latitude is optional now. If no longitude/latitude is set, the adpater is getting the longitude/latitude from ioBroker System-Attributes (https://github.com/baerengraben/iobroker.swiss-weather-api/issues/6).

### 0.3.0
* (baerengraben)  Change from Scheduled Adapter to Deamon Adapter(https://github.com/baerengraben/iobroker.swiss-weather-api/issues/11). The query interval is now configurable by parameter. The first query is made 10s after the adapter was started. Attention: For installing this version, please delete the older adapter version completely and install it again.

### 0.2.3
* (baerengraben) Update Dependencies

### 0.2.2
* (baerengraben) Some bug fixing
* (baerengraben) Enhancement https://github.com/baerengraben/iobroker.swiss-weather-api/issues/10

### 0.2.0
* (baerengraben) Updates in order to commit to iobroker stable

### 0.1.9
* (baerengraben) Dependency- and Vulnerabilites-Updates

### 0.1.8
* (baerengraben) Added Icons provided by SRGSSR => Thank you!! :)
* (baerengraben) Added new Object icon-url-srgssr => Contains the url-link to the srgssr Icon

### 0.1.7
**Attention**: If you have already installed a previous Version of swiss-weather-api (<= 0.1.6) please remove the adapter and install it completely new. This makes shure you get the new Unit-Names for "fff" and "ffx3" which where corrected by SRG. 
* (baerengraben) Added Icon-Codes -17 to -30 => These are not yet confirmed by srf - but I beleave these are correct.  
* (baerengraben) SRG is now providing the correct unit-names for "fff" and "ffx3". Adaptet this in the swiss-weather-adapter. **Attention**: You have to reinstall the swiss-weather-api (remove and install new Version) to make shure the Object-Name gets this Update.

### 0.1.6
* (baerengraben) Some fixes based on Feedback of forum.iobroker.net

### 0.1.5
* (baerengraben) Some fixes based on Feedback of forum.iobroker.net

### 0.1.4
* (baerengraben) Added Travis CI testing

### 0.1.3
* (baerengraben) Role-Definitions updated and added attribute 'icon-name'.

### 0.1.2
* (baerengraben) Some fixes.

### 0.1.0
* (baerengraben) Running version. Reads the complete weather forecast from https://api.srgssr.ch

### 0.0.2
* (baerengraben) first running version. Reads Current Forecast (https://api.srgssr.ch/forecasts/v1.0/weather/current)

### 0.0.1
* (baerengraben) initial release

## License
MIT License

Copyright (c) 2020 baerengraben <baerengraben@intelli.ch>

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