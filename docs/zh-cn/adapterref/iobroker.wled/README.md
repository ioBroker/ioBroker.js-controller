---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: JlfMTIl0oYXy1Blq5/3T6Uz/DHavUfRYnn7wB2ZZ4/A=
---
![商标](../../../en/adapterref/iobroker.wled/admin/wled_large.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.wled.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.wled.svg)
![安装数量（最新）](http://iobroker.live/badges/wled-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/wled-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.wled.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wled/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)

＃ioBroker.wled
##用于ioBroker的wled适配器
ESP8266 / ESP32网络服务器的快速且功能丰富的实现，用于控制NeoPixel（WS2812B，WS2811，SK6812，APA102）LED！

@Aircoookie的[WLED-Github项目](https://github.com/Aircoookie/WLED)

##说明
适配器会使用Bonjour服务自动尝试在网络中查找WLED设备。
已知问题：具有VLAN分隔的网络通常不会路由广播流量，这意味着自动检测将失败。 （请参阅待办事项）

1）确保您的WLED设备正在运行并且可以通过网络访问2）安装适配器3）配置数据轮询和自动检测周期的间隔时间4）启动适配器，应自动检测设备5）适配器将立即发送更改并进行轮询每x秒传输一次数据（可配置）

＃＃ 去做
* []可配置设备（目前仅由Bonjour自动检测）
* []调查更好的住宿变更公告方式，支持currentl polly
* [x]特殊命令未包含在rest-api中（例如保存预设）
* [x]个控制段
* [x]颜色变化

＃＃ 支持我
如果您喜欢我的工作，请随时提供个人捐款（这是DutchmanNL的个人捐款链接，与ioBroker项目无关！）[![捐赠]（https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png）](http://paypal.me/DutchmanNL)

## Changelog
### 0.1.4
- (DutchmanNL) Implement drop down menu for color pallets
- (DutchmanNL) New configuration page

### 0.1.2
- (DutchmanNL) Implement drop down menu for effects

### 0.1.1
* (DutchmanNL) Implemented states hidden from JSON-API : tt / psave / nn / time
* (DutchmanNL) Improve logging issue

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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