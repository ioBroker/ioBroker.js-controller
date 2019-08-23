---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wlanthermo-nano/README.md
title: ioBroker.wlanthermo纳米
hash: 7PaDGgC1a8xJz51Pnob9s7EItyBZ6R+SG8c4g97UNIs=
---
![商标](../../../en/adapterref/iobroker.wlanthermo-nano/admin/wlanthermo-nano.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.wlanthermo-nano.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wlanthermo-nano.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.wlanthermo-nano.svg)
![安装数量](http://iobroker.live/badges/wlanthermo-nano-stable.svg)
![已知的漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wlanthermo-nano/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wlanthermo-nano.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.wlanthermo-nano/master.svg)

＃ioBroker.wlanthermo-nano
适用于ioBroker的## wlanthermo-nano适配器
[WLANThermo Nano](https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki "WLANThermo Nano")，是您烧烤运动的数字优势

##配置
可以在管理界面中安装和配置适配器。
请在实例配置中输入IP地址，用户名和密码。

支持Currenlty 1设备，如果要监控secode设备，请使用第二个实例。
（在将来版本中，将支持1个适配器的多个设备）。

＃暂时不要从github安装，只能通过ioBroker管理员安装！ （更改存储库中的进度）
＃＃ 去做
* []优化pitmaster设置，使状态只能以相关的模式写入，否则只读
* []允许多个设备
* []代码清理

## Changelog

### 0.1.2  (in progress, not released !)
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