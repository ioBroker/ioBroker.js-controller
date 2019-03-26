---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/jens-maus/ioBroker.unifi/edit/master//README.md
title: UniFi Adapter
hash: +FJ3eN9WtCsnYiz6cbyFwcJvGQl4i3tOTcXYY7C5KLc=
adapter: true
license: MIT
authors: 
description: Communicates with a UniFi-Controller
keywords: unifi, wifi, network
readme: https://github.com/jens-maus/ioBroker.unifi/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-01-18T08:20:08.834Z
version: 0.3.1
BADGE-建立状态: https://travis-ci.org/jens-maus/ioBroker.unifi.svg?branch=master
BADGE-安装数量: http://iobroker.live/badges/unifi-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.unifi.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.unifi.svg
BADGE-Github问题: http://githubbadges.herokuapp.com/jens-maus/ioBroker.unifi/issues.svg
BADGE-捐: https://img.shields.io/badge/Donate-PayPal-green.svg
BADGE-NPM: https://nodei.co/npm/iobroker.unifi.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.unifi/../../../en/adapterref/iobroker.unifi/admin/unifi.png)


＃ioBroker.unifi
[![Code Climate]（https://codeclimate.com/github/jens-maus/ioBroker.unifi/badges/gpa.svg）](https://codeclimate.com/github/jens-maus/ioBroker.unifi)[![bitHound Score]（https://www.bithound.io/github/jens-maus/ioBroker.unifi/badges/score.svg）](https://www.bithound.io/github/jens-maus/ioBroker.unifi)

此ioBroker适配器允许使用公共UniFi控制器Web-API控制和监控[UniFi设备](http://www.ubnt.com/)，例如UniFi WiFi接入点。

##参考文献
此适配器使用以下第三方nodejs模块的功能：

* [node-unifi]（https://github.com/jens-maus/node-unifi）

## Changelog

### 0.3.1
  (jens-maus) added support for multi-site environments.

### 0.3.0
  (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
  (jens-maus) minor fixes

### 0.2.0
  (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
  (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
  (jens-maus) initial checkin of non-working development version

## License
The MIT License (MIT)

Copyright (c) 2016-2017 Jens Maus &lt;mail@jens-maus.de&gt;

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