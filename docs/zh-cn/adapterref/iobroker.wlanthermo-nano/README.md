---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wlanthermo-nano/README.md
title: ioBroker.wlanthermo-nano
hash: TCdxIYuhBO7sdgAgrQ053kqmZav2Q3PI+b5kJoAlLac=
---
![标识](../../../en/adapterref/iobroker.wlanthermo-nano/admin/wlanthermo-nano.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.wlanthermo-nano.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.wlanthermo-nano.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.wlanthermo-nano.svg)
![安装数量](http://iobroker.live/badges/wlanthermo-nano-stable.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.wlanthermo-nano/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wlanthermo-nano.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/DrozmotiX/ioBroker.wlanthermo-nano/master.svg)

＃ioBroker.wlanthermo-nano
## IoBroker的wlanthermo-nano适配器
[无线局域网](https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki "WLANThermo Nano")，您的烧烤运动的数字优势

＃＃ 配置
可以在管理界面中安装和配置适配器。
请在实例配置中输入IP地址，用户名和密码。

＃＃ 去做
* []优化pitmaster设置，使状态只能以相关方式可写，否则为只读
* []实现自动设备检测
* []实现设备在线状态
* [x]允许多个设备
* []代码清除

##加入Discord服务器，讨论有关ioBroker-WlanThermo集成的所有内容！
<a href="https://discord.gg/cNAeGjJ"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2" width="25%"></a>

＃＃ 支持我
如果您喜欢我的作品，请随时提供个人捐款（这是DutchmanNL的个人捐款链接，与ioBroker项目无关！）[![捐赠]（https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png）](http://paypal.me/DutchmanNL)

## Changelog

### 0.1.2
* (DutchmanNL) Support multiple devices

### 0.1.1
* (DutchmanNL) Code optimalisation
* (DutchmanNL) Implement state_attr.js to handle state options outside of source code
* (DutchmanNL) Optimised state creation in 1 function
* (DutchmanNL) Small cleanups

### 0.1.0
* (DutchmanNL) remove color settngs from pitmaster

### 0.0.9
* (DutchmanNL) optimize pid profile setting

### 0.0.8
* (DutchmanNL) fix post command for pitmaster

### 0.0.7
* (DutchmanNL) State unit fixes
* (DutchmanNL) start integration of pidmaster
* (DutchmanNL) rename  type  to modus for pitmaster

### 0.0.6
* (DutchmanNL) make type and alarm selectable with dropdown

### 0.0.5
* (DutchmanNL) add  capability to change sensors

### 0.0.4
* (DutchmanNL) Fix issue with password set
* (DutchmanNL) Implemented new states for config (reboot/update/checkupdate)
* (DutchmanNL) Change  configuration (way of ip-adress, also dyndns now supported)

### 0.0.3
* (DutchmanNL) implement secure storage of login credentials (required to enable setting changes later)

### 0.0.2
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2019 DutchmanNL <rdrozda86@gmail.com>

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