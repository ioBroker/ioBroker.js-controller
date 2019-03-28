---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.geofency/README.md
title: ioBroker.geofency
hash: /Hr5Dz3mNY4oC17SdjVrA3/ev+RnM3cakDuPwTgkyFk=
---
![商标](../../../en/adapterref/iobroker.geofency/admin/geofency.png)

![安装数量](http://iobroker.live/badges/geofency-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.geofency.svg)
![下载](https://img.shields.io/npm/dm/iobroker.geofency.svg)
![NPM](https://nodei.co/npm/iobroker.geofency.png?downloads=true)

＃ioBroker.geofency ====================
当您的移动设备进入或离开指定区域时，此适配器能够接收[geofency](http://www.geofency.com/)事件。
请求的geofency-webhook的所有值都存储在ioBroker中的位置名称下。

移动设备上的##配置：
*对于任何位置 - >属性 - > webhook设置：
 *进入和退出的网址：＆lt;您的ioBroker域＆gt;：＆lt;已配置的端口＆gt; /＆lt;任何位置名称＆gt;
 *帖子格式：JSON编码：启用
 *身份验证：从iobroker.geofency配置设置用户/密码

ioBroker论坛中的##（德语）
http://forum.iobroker.net/viewtopic.php?f=20&t=2076

##安全说明：
建议不要将此适配器公开给公共Internet。
应该在ioBroker之前放置某种WAF /代理/入口服务器。 （例如，nginx很好，易于配置）。

## Changelog
### 0.3.2 (2018-03-07)
* (Apollon77) Fix Authentication

### 0.3.0 (2017-10-04)
* (Apollon77) BREAKING!!! Make sure 'entry' is really a boolean as defined in object

### 0.2.0 (2017-06-09)
* (Apollon77) Add missing authentication check
* (Apollon77) Add option to send in data as Message when received over other ways
* (Apollon77) Add option not to start a webserver for cases where data are received using messages

### 0.1.5 (2016-09-19)
* (soef) support of certificates

### 0.1.4 (2016-03-29)
* (dschaedl) replaced geofency Icon (on request of bluefox)

### 0.1.3 (2016-03-29)
* (soef) fixed atHome and atHomeCount state creation

### 0.1.2 (2016-02-13)
* (soef) Dots in location name will be replaced by an underscore

### 0.1.1 (2016-02-01)
* (Pmant) Fix config page

### 0.1.0 (2016-01-26)
* (soef) Fix error with "at home" settings

### 0.0.4 (2016-01-24)
* (soef) Added some new states

### 0.0.3 (2016-01-21)
* (soef) Some modifications
* (bluefox) change type

### 0.0.2
* (dschaedl) moved to iobroker/iobroker.geofency

### 0.0.1
* (dschaedl) initial release

## License

The MIT License (MIT)

Copyright (c) 2015 dschaedl <daniel.schaedler@gmail.com>

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