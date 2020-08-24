---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: Vm6u4S5Hm5i0K/bayhQgQbmkVZfQxch1DGJiUvq19jI=
---
![商标](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![依赖状态](https://img.shields.io/david/algar42/iobroker.accuweather.svg)
![已知漏洞](https://snyk.io/test/github/algar42/ioBroker.accuweather/badge.svg)
![NPM](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/algar42/ioBroker.accuweather/master.svg)

＃ioBroker.accuweather
## IoBroker的AccuWeather适配器
使用AccuWeather API进行天气预报

Adapter接收当前状况（每小时更新一次），5天每日预报（每天大约7am更新一次）和12小时预报（每6小时在12 am、6am、12pm和6pm更新一次）。

＃＃ 入门
###获取API密钥
要获取API密钥，请在https://developer.accuweather.com/上注册并在\“我的应用\”菜单中创建应用。创建应用程序后，您将生成API密钥。
对于免费使用，每天可以向API发出50个请求。
需要注意的是，要使API正常工作，最好使用以下设置（请选择您所在的国家！）：![设定](../../../en/adapterref/iobroker.accuweather/admin/image.png)

###获取位置密钥
为了获取位置键，请访问https://www.accuweather.com/并输入您的城市名称，或者尝试输入您的坐标（纬度，经度），例如在ioBroker设置中。
您的位置密钥将是预测URL末尾的数字。

###在Lovelace可视化中使用（从1.1.0版开始）
“摘要”通道包含当前和每天的预测，以及类型检测器支持的状态/状态类型。
可以使用新功能来在Lovelace UI中显示天气预报。
为了更好地查看，创建了一个定制的lovelace卡-请参见https://github.com/algar42/IoB.lovelace.accuweather-card

## Changelog

### 1.1.4
* (HGlab01) small bugfix regarding setTimeout range

### 1.1.3
* (algar42) Minor updates for compact mode

### 1.1.0
* (algar42) Summary channel added to support type-detector and automatic weather device creation

### 1.0.2
* (algar42) Production Release

## License
MIT License

Copyright (c) 2020 algar42 <igor.aleschenkov@gmail.com>

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