---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pi-hole/README.md
title: ioBroker.pi-hole！[徽标]（admin / pi-hole.png）
hash: FCNx3Suc9+EPF5ZDlsOuLVsxxLQISMOlUX5P/GY2zTA=
---
![安装数量](http://iobroker.live/badges/pi-hole-stable.svg)
![建立状态](https://api.travis-ci.org/unltdnetworx/ioBroker.pi-hole.svg?branch=master)
![NPM版本](https://img.shields.io/npm/v/iobroker.pi-hole.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.pi-hole.svg)
![NPM](https://nodei.co/npm/iobroker.pi-hole.png?downloads=true)

＃ioBroker.pi-hole![商标](../../../en/adapterref/iobroker.pi-hole/admin/pi-hole.png)
=================

该适配器可从运行中的pi孔读取值并控制设备（启动/停止）。

自行承担使用风险！！！绝对不为损坏提供保修，等等！！！

欢迎提供帮助或提示。

＃＃ 脚步
1.安装adpater

2.填写adapter-admin的字段。可以从pi-hole设备的管理Web界面（设置/ API /获取令牌）获得pi-hole设备的ip地址API令牌，并且必须间隔来更新pi-hole设备的值。 pi漏洞（iobroker中的最新统计信息）

3.有些对象是json-tables，您可以在vis内部使用。

4.单击“激活pi-hole”按钮激活过滤器，通过更改“ dactivate pi-hole”的值禁用过滤器（0表示永久，数表示秒数）

＃＃ 要求
*运行pi孔设备

##捐赠
卡菲·比迪恩（Kaffee budieren）/提供咖啡<https://paypal.me/unltdnetworx>

## Changelog

### 1.2.2

* (unltdnetworx) bugfix for objecttypes

### 1.2.1

* (unltdnetworx) bugfix for update notification

### 1.2.0

* (unltdnetworx) datapoint for available update

### 1.1.0

* (unltdnetworx) support for ssl-connection

### 1.0.1

* (unltdnetworx) bugfixes

### 1.0.0

* (unltdnetworx) rise of version-number - stable version

### 0.2.1

* (unltdnetworx) small bugfix for storage

### 0.2.0

* (unltdnetworx) cleanup and bugfix for restart and storage

### 0.1.0

* (unltdnetworx) fully working release for LTE_API

### 0.0.1

* (unltdnetworx) initial release

## License

MIT License

Copyright (c) 2020 Michael Schuster

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