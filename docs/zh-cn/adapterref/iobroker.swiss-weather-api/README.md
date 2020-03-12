---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: GJsLzI7hsrjrvfsCvzvsLffQXvnvvpKOlu4I1vOKqmQ=
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

SRG-SSR Weather REST API使您可以从瑞士超过25.000个位置获取天气预报和报告。

**图标**

天气图标可从https://erikflowers.github.io/weather-icons/重用

从0.1.8版开始，SRG-SSR甚至提供了自己的图标。因此，您可以选择要使用的图标集。

**请注意，此适配器仅支持瑞士境内的位置。**

＃＃＃ 入门
1.在https://developer.srgssr.ch/上免费获得权限
1.转到“我的应用程序”并创建一个新的应用程序。这将创建一个特定的ConsumerKey和ConsumerSecret
1.找出需要进行预测的所选位置的经度/纬度（十进制）
1.在ioBroker上安装此适配器=>这可能需要几分钟（在Raspberry Pi 3上约为7分钟）
1.在“适配器配置”上填写
   1. App的ConsumerKey
   1. App的ConsumerSecret
   1.需要预测的所选瑞士位置的经度/纬度。 =>请使用十进制度数（例如苏黎世：47.36667 / 8.5）

这是一个计划的适配器。它每30分钟安排一次，并读取SRG-SSR的预测API。您可以在实例视图（计划）中更改此间隔。由于最低预报为1小时，因此不建议使用较低的间隔。
**因此请记住，安装后，将需要30分钟才能立即提供预测数据并在数据视图中创建数据对象。**

首次安装时，您可能要检查一切是否正常，并且不想等待30分钟。在这种情况下，您可以将调度程序更改为1分钟。 =>如果一切正常，请**将其更改回30分钟**。

## Changelog

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