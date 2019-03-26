---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.daswetter/README.md
title: ioBroker.DasWetter。
hash: 44CyV5g3E0YiBrmL0XqYnV9wGegPocPi9FMLu641cH8=
---
![商标](../../../en/adapterref/iobroker.daswetter/admin/daswettercom.png)

![安装数量](http://iobroker.live/badges/daswetter-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.daswetter.svg)
![下载](https://img.shields.io/npm/dm/iobroker.daswetter.svg)
![测试](https://travis-ci.org/rg-engineering/ioBroker.daswetter.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)

＃ioBroker.DasWetter。
此适配器从DasWetter.com读取天气预报数据。

您需要在DasWetter.com上拥有一个帐户。在https://www.daswetter.com/api/#/login注册该帐户在特定条件下免费。

在您的帐户中，您会找到四个不同数据模型的三个网址：

*预测未来7天和当天的一般信息：高低，风（符号和描述），日符号和天气条件
* 5天和3小时的详细信息：一般日常信息如下：高峰，低谷，风，阵风，降水，相对湿度，

海平面气压，雪线，日出和日落，与月亮有关的日期，当地时间

*每小时预览详细数据（仅限前2天，然后每3小时）
*预测5天和每3小时（采用JSON格式）

所有四个模型都已实施，至少应使用一个模型。
在设置URL中，必须使用http://api.daswetter.com/index.php?api_lang=de&localidad=xxxx。只需从您的帐户中复制完整的网址即可。

##提示
在vis中使用的###图标
*访问图标，如`http：// ip：8082 / adapter / daswetter / icons / tiempo-weather / galeria1 / 1.png`。
*在galerie6中，原始图标采用svg格式。 Vis应用程序可能无法将其可视化。所以转换后的png可用。只需使用选项“使用png”
*在galerie5中，原始图标采用svg和png格式。除此之外，还提供彩色和白色版本

NextHours_Day1中###“current”：
* DasWetter.com无法提供真实的当前天气预报值
*但有时可以预测当前小时数
*所以我们添加了“当前”，它只是相关预测小时值的副本
*请确保每小时至少调用一次适配器，以确保“当前”更新
*另见github功能请求[issue24]（https://github.com/rg-engineering/ioBroker.daswetter/issues/24）

###路径4
*目前DasWetter.com发送的数据与他们自己的规格不同。

现在我们已经实现了“自动修复”，它将结构更改为记录的形状。

＃＃ 已知的问题
请参阅github问题列表

## Changelog

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
Copyright (C) <2017 - 2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.