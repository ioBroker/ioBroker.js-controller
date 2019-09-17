---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.proxmox/README.md
title: ioBroker.proxmox
hash: ZT1/mtpdXzxKTr9inR426GZ7McKFUNaMke7stIR+xEw=
---
![商标](../../../en/adapterref/iobroker.proxmox/admin/logo.png)

![安装数量](http://iobroker.live/badges/proxmox-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.proxmox.svg)
![下载](https://img.shields.io/npm/dm/iobroker.proxmox.svg)
![NPM](https://nodei.co/npm/iobroker.proxmox.png?downloads=true)
![特拉维斯-CI](https://api.travis-ci.org/iobroker-community-adapters/ioBroker.proxmox.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.proxmox?branch=master&svg=true)
![Greenkeeper徽章](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.proxmox.svg)

＃ioBroker.proxmox
=================

此适配器从您的proxmox安装中读取数据

＃＃ 脚步
## Bugs
 无法使用密码中的特殊字符建立连接

＃＃ 要求
至少需要Node 8.X.X.

## Changelog
### 0.5.0 (17.09.2019)
* (MeisterTR) add act. disk size form vm and lxc
* (MeisterTR) add start/stop and shutdown for vm an lxc (nodes must be testet my dev is on the node so i cant test stop node)
### 0.3.1 (03.10.2018)
* (MeisterTR) fixed mem_lev, error at install, catch error no node and vm
### 0.3.0 (28.09.2018)
* (MeisterTR) add storage
* (MeisterTR) add password encryption
### 0.2.0 (27.09.2018)
* (MeisterTR) add container
### 0.0.5 (25.09.2018)
* (MeisterTR) cleaning up
### 0.0.5 (02.05.2018)
* (MeisterTR) fixed worong ram
### 0.0.5 (29.04.2018)
* (MeisterTR) Testing fixes, now ready for node4
### 0.0.3 (26.04.2018)
* (MeisterTR) first running version
### 0.0.2
* (MeisterTR) first running version
### 0.0.1
* (MeisterTR) initial release

## License

The MIT License (MIT)

Copyright (c) 2018 - 2019 MeisterTR <meistertr.smarthome@gmail.com>

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