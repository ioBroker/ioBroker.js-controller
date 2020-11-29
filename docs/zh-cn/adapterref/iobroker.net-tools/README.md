---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.net-tools/README.md
title: 网络工具
hash: IzxWLgZMxRAWfn8DB4DpXBGjGipYz94IyOFgl8VTfPw=
---
![商标](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![安装数量](http://iobroker.live/badges/net-tools-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.net-tools.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![测验](https://travis-ci.org/jey-cee/ioBroker.net-tools.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)

＃网络工具
###发现网络上的设备
将发现对象设置为true以发现网络上的设备，此过程需要一段时间。
该功能由发现适配器提供，这意味着如果未安装发现，则发现安装必须运行。

备注：此功能仅限于ioBroker主机的子网。

### Ping配置的IP地址
以定义的间隔ping指定的IP地址并监视结果。 （活动，RPS，时间）

###局域网唤醒
将wol对象设置为true，然后将3个WOL包以750ms的发送时间发送到您的设备。

###端口扫描
将scan设置为true，这将扫描0-65535范围内的所有打开的端口。此过程需要一段时间。
结果将被写入对象端口。

---

##对于开发人员
####获取特定设备的Mac
`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

备注：此功能仅限于ioBroker主机的子网。

#### Ping特定IP地址
`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

####局域网唤醒
`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

## [赞助商](https://github.com/iobroker-community-adapters/ioBroker.net-tools/blob/master/SPONSORS.MD)
如果您喜欢我的工作，请随时提供个人捐款（这是Jey Cee的个人捐款链接，与ioBroker项目无关！）[![捐赠]（https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url)

#####加入Discord服务器，讨论有关net-tools集成的所有内容！
<a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

## Changelog

### 0.1.0 
* initial release

## License

The MIT License (MIT)

Copyright (c) 2020, Jey Cee <jey-cee@live.com>

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