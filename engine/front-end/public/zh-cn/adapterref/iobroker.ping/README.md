---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.ping/edit/master//README.md
title: PING Adapter
hash: gvtpb9DhTrRG+6kkkThPnBq3CN/LevWUUeUtQXYV4BU=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: This adapter cyclic polls configured IPs.
keywords: poll, ping, ip
readme: https://github.com/ioBroker/ioBroker.ping/blob/master/README.md
mode: daemon
materialize: false
compact: true
published: 2015-01-02T23:47:36.408Z
version: 1.3.2
BADGE-安装数量: http://iobroker.live/badges/ping-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.ping.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.ping.svg
BADGE-测试: https://travis-ci.org/ioBroker/ioBroker.ping.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.ping.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.ping/../../../en/adapterref/iobroker.ping/admin/ping.png)ioBrokerPING适配器==============


#Pings配置的IP地址。
Ping在定义的时间间隔内指定IP地址并监视结果。

##安装
```node iobroker.js add ping```

##配置

## Changelog
### 1.4.1 (2019-01-08)
* (simatec) support compact mode

### 1.4.0 (2018-01-25)
* (vdemidov) refactored, added ping time and roundtrips per second for every host

### 1.3.2 (2017-09-20)
* (ldittmar) object values are converted to the valid type

### 1.3.0 (2017-02-21)
* (bluefox) allow to remove host name from state's name

### 1.2.0 (2016-12-09)
* (bluefox) change configuration dialog

### 1.1.3 (2016-11-16)
* (bluefox) catch error if no IP defined

### 1.1.1 (2016-04-10)
* (bluefox) remove ms

### 1.1.0 (2016-04-10)
* (bluefox) rewrite ping for windows

### 1.0.0 (2016-04-03)
* (bluefox) support of freebsd and all windows languages
* (bluefox) add tests

### 0.1.3 (2015-01-26)
* (bluefox) fix error if configuration changed

### 0.1.2 (2015-01-14)
* (bluefox) fix configuration page

### 0.1.1 (2015-01-03)
* (bluefox) enable npm install

### 0.1.0 (2014-11-26)
* (bluefox) use ping npm module instead of static one

### 0.0.5 (2014-11-21)
* (bluefox) make possible to have shorter ping intervals (down to 5 seconds)

### 0.0.4 (2014-11-07)
* (bluefox) fix ping node

### 0.0.3 (2014-11-03)
* (bluefox) fix ping node (do not forget to remove package from git when the npm get the update)

### 0.0.1 (2014-11-02)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2019, bluefox <dogafox@gmail.com>

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