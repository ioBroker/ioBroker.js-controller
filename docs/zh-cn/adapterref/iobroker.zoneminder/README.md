---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zoneminder/README.md
title: ioBroker.zoneminder
hash: ToV8enlU5mDfF2NTtGaQ9cJGLap+ep6FQoAQPFVRZjo=
---
![商标](../../../en/adapterref/iobroker.zoneminder/admin/zoneminder.png)

![安装数量](http://iobroker.live/badges/zoneminder-installed.svg)
![稳定版](http://iobroker.live/badges/zoneminder-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.zoneminder.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.zoneminder.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.zoneminder.svg)
![NPM](https://nodei.co/npm/iobroker.zoneminder.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.zoneminder/master.svg)

＃ioBroker.zoneminder
##用于ioBroker的zoneminder适配器
连接到您的Zoneminder。

＃＃ 入门
输入您的主机，例如“ http：// zoneminder / zm”未更改的用户，密码为“ admin”，如果您没有任何身份验证，请勿更改用户或密码。

设备间隔用于检查新相机和一些基本信息。该值以秒为单位。
监视间隔用于检查警报，它也以秒为单位。

如果要获取警报信息，请在您的zoneminder中安装zmEventNotification并在iobroker设置中启用它。

### Zoneminder设置
要使相机网址链接与用户和密码一起使用，您必须在设置中取消选择AUTH_HASH_IPS

![商标](../../../en/adapterref/iobroker.zoneminder/admin/auth_hash_ips.png)

## Changelog
### 0.3.3 (12.11.2019)
* (MeisterTR) error fixes, fix login error, fixes for latest
* (MeisterTR) add ZmEvents
* (MeisterTR) Select moniorfunction and disable/enable monitor
### 0.2.1
* (MeisterTR) add info states
* (MeisterTR) add camera-link with auth-key
* (MeisterTR) cange video link
### 0.1.0
* (MeisterTR) First running version
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2019 MeisterTR <meistertr.smarthome@gmail.com>

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