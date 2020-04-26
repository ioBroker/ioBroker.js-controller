---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.daswetter/README.md
title: ioBroker.DasWetter。
hash: DEY5HlXp/lCyqV21CoMhaIZ9fCxdePj71f6b2zaoMMM=
---
![商标](../../../en/adapterref/iobroker.daswetter/admin/daswettercom.png)

![安装数量](http://iobroker.live/badges/daswetter-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.daswetter.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.daswetter.svg)
![测验](https://travis-ci.org/rg-engineering/ioBroker.daswetter.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)

＃ioBroker.DasWetter。
**如果您愿意，请考虑捐赠：**

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

该适配器从DasWetter.com读取天气预报数据。

您需要在DasWetter.com上拥有一个帐户。在https://www.daswetter.com/api/#/login上注册该帐户在某些情况下是免费的。

在您的帐户中，您将找到四个不同数据模型的三个URL：

*未来7天的天气预报以及当天的一般信息：高低，风（符号和描述），日符号和天气情况
*每5天每3个小时的详细信息：每日的常规信息如下：高峰，低谷，大风，阵风，降水，相对湿度，

海平面气压，雪线，日出和日落，与月亮有关的日期，当地时间

*每小时预览一次，提供详细数据（仅前2天，然后每3小时）
*每3个小时进行5天的预测（JSON格式）

所有这四个模型均已实现，至少应使用其中一个。
在设置中，必须使用类似http://api.daswetter.com/index.php?api_lang=de&localidad=xxxx的URL。只需复制您帐户中的完整URL。

##提示
vis中使用的###图标
*访问图标，如“ http：// ip：8082 / adapter / daswetter / icons / tiempo-weather / galeria1 / 1.png”。
*在galerie6中，原始图标为svg格式。 Vis应用程序可能无法可视化。因此可以使用转换后的png。只需使用选项“使用png”
*在galerie5中，原始图标为svg和png格式。除了颜色和白色版本

NextHours_Day1中的###“当前”：
* DasWetter.com不提供实际的当前天气值
*但有时提供当前小时的预测会有所帮助
*因此，我们添加了“当前”，这只是相关的预测小时值的副本
*请确保您每小时至少调用一次适配器，以确保正确更新“ current”
*另请参见github功能请求[issue24]（https://github.com/rg-engineering/ioBroker.daswetter/issues/24）

###路径4
*目前，DasWetter.com发送的数据与其自己的规范不同。

现在，我们实现了“自动修复”功能，可以将结构更改为已记录的形状。

＃＃ 已知的问题
*如果发现错误或有新功能，请在[github]（https://github.com/rg-engineering/ioBroker.daswetter/issues）上创建问题

## Changelog

### 3.0.0 (2020-03-xx)
* (René) breaking change: old data structure is not supported anymore
* (René) "request" replaced by "bent"

### 2.8.2 (2020-03-20)
* (René) some more logs to find parser errors

### 2.8.1 (2019-09-08)
* (René) bug fix: some datapoints were created as number instead of string

### 2.8.0 (2019-03-19)
* (René) moon and wind icon set added in admin !!path to wind icons changed!!
* (René) path to customized icon set added 
* (René) exit code changed

### 2.7.3 (2019-02-24)
* (René) bug fix: some values are number instead of string

### 2.7.2 (2019-02-14)
* (bluefox) Serialization of the objects deletion

### 2.6.1 (2019-02-10)
* (René) update dependencies

### 2.6.0 (2019-01-20)
* (René) support of compact mode
* (René) new icons for galeria5 (color or white; svg or png) selectable in admin
* (René) auto-repair for path4

### 2.5.0 (2018-11-30)
* (René) since app has problems with svg we can use png instead. svg's are converted to png. In admin a new option is available to use original svg's or converted png's 
* (René) max. 500 datapoints are deleted per call to reduce work load, so it might take a few calls until all old data points are removed

### 2.4.0 (2018-11-26)
* (René) sunshine duration added
* (René) current in NextHours_Day1 and NextHours2_Day1 added

### 2.3.1 (2018-11-04)
* (René) clean up code

### 2.3.0 (2018-08-23)
* (René) support of 4. path (json)

### 2.2.0 (2018-08-20)
* (René) delete unused data structure

### 2.1.3 (2018-08-17)
* (René) typo fixed
* (René) missing Icon-URL's added

### 2.1.2 (2018-08-14)
* (bluefox) Configuration dialog was fixed

### 2.1.1 (2018-08-04)
* (René) parse timeout added
* (René) missing roles and states added
* (René) using of units from data structure

### 2.1.0 (2018-07-30)
* (bluefox) Added URLs to icons
* (bluefox) Added the roles and the names to states
* (bluefox) Icons moved to admin directory



### 2.0.0
* (René) new datastructure !not compatible to version 1.x!
now parsing all data from xml and store them in datapoints
for compatibility: in configuration old data structure can be enabled 
needs also 2.x of vis-weather-widget

## License
Copyright (C) <2017 - 2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.