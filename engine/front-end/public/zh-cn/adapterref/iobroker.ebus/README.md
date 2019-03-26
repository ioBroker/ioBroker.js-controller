---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/rg-engineering/ioBroker.ebus/edit/master//README.md
title: ebus
hash: +glfxo8JhtjZ2bEms4bWeOoJPgDSbPZRpbsdo0hydak=
adapter: true
license: MIT
authors: René G. <info@rg-engineering.eu>
description: ebus Adapter; reads data from ebusd Interface
keywords: ebus
readme: https://github.com/rg-engineering/ioBroker.ebus/blob/master/README.md
mode: schedule
materialize: true
compact: true
published: 2018-01-08T19:33:17.193Z
version: 0.8.0
BADGE-安装数量: http://iobroker.live/badges/ebus-stable.svg
BADGE-NPM版本: https://img.shields.io/npm/v/iobroker.ebus.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.ebus.svg
BADGE-测试: https://travis-ci.org/rg-engineering/ioBroker.ebus.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.ebus.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.ebus/../../../en/adapterref/iobroker.ebus/admin/ebus.png)


＃ioBroker.ebus
这个适配器读取

 - 来自ebusd的数据使用html

在这种情况下，ebusd必须运行并且必须能够将数据发送到例如ebusd。探险家通过http：// IP：端口/数据（http://192.168.0.123:8889/data）当前版本的ebusd incl。配置文件可以从https://github.com/john30/ebusd复制所有包含数据，lastup和全局部分的字段都会被解析。目前所有其他人都被忽略了。

有可能轮询未经ebusd直接轮询的数据。命令'read -f'用于强制读取ebus。

另一个特征是向ebusd发送任何命令并接收答案以便与例如ebusd一起工作。脚本。

目前支持的ebusd版本：3.3

## Changelog

### 0.8.0 (2019-02-24)
* (René) hcmode2 value 5 = EVU Sperrzeit

### 0.7.0 (2019-01-28)
* (René) add adjustable timeout

### 0.6.0 (2019-01-06)
* (René) support of compact mode

### 0.5.5 (2018-11-04)
* (René) code clean up

### 0.5.4
* (René) arduino support removed

### 0.5.3
* (René) add error information

### 0.5.2
* (René) bug fix: in vis 1.x some values are not stored

### 0.5.1
* (René) bug fix: if nothing to poll then skip telnet connection

### 0.5.0
* (René) write date over TCP to ebusd

### 0.4.2
* (René) bug fix for admin V3 

### 0.4.1 
* (René) logo changed 

### 0.4.0 
* (René) reading data from ebusd 

### 0.3.0 
* (René) support of ebusd 
* (René) admin3 support

### 0.2.0
* (René) add history as JSON for vis
* (René) add flot based widget to display temperatur, status and power graph

### 0.1.0
* (René) scheduled adapter instead of deamon

### 0.0.3
* (René) UTF8 coding

### 0.0.2
* (René) initial release

## License
Copyright (C) <2017 - 2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.