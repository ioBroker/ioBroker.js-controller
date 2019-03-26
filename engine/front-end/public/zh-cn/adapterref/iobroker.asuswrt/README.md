---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/mcdhrts/ioBroker.asuswrt/edit/master//README.md
title: ASUSWRT
hash: th9msLcv0OCTB3cVH4NhjbOy3OabS7EF+q3Ckcxin84=
adapter: true
license: MIT
authors: mcdhrts
description: Find Active Devices in ASUS Routers running ASUSWRT for ioBroker
keywords: asus, asuswrt
readme: https://github.com/mcdhrts/ioBroker.asuswrt/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2018-01-03T16:02:17.077Z
version: 1.0.1
BADGE-安装数量: http://iobroker.live/badges/asuswrt-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.asuswrt.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.asuswrt.svg
BADGE-测试: https://api.travis-ci.org/mcdhrts/ioBroker.asuswrt.svg
BADGE-执照: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
BADGE-NPM: https://nodei.co/npm/iobroker.asuswrt.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.asuswrt/../../../en/adapterref/iobroker.asuswrt/admin/asuswrt.png)


＃ioBroker.asuswrt =================
适用于ioBroker的## ASUSWRT适配器
在运行ASUSWRT的ASUS路由器中查找活动设备。
您可以将此用作示例作为电话的存在检测，以跟踪某人是否在家。

经过华硕GT-AC5300测试，运行ASUSWRT 3.0.0.4.384_32799

你可以在华硕找到一个列表，路由器不要在这里使用ASUSWRT：https：//event.asus.com/2013/nw/ASUSWRT/

＃＃ 要求
您必须在路由器设置中激活并允许SSH连接

您至少需要NodeJS V6和Admin V3

如果您需要Admin V2安装最后支持的版本0.3.1

＃＃ 建立
*华硕路由器IP地址（强制性）
    *华硕路由器的IP地址
*登录用户（强制性）
    *华硕路由器的用户名登录
*登录密码（如果使用私钥文件，则为可选）
    *用户登录的密码
    *使用私钥文件时，请将此字段留空
*私钥文件（如果使用密码，则为可选）
    *当您不想使用Passwort-Login时，您可以为SSH登录设置私钥文件的路径
    *如果不需要，请留空
*私钥文件密码短语（如果加密私钥文件，则为可选）
    *使用密码短语加密密钥文件时，请在此处输入密码文件
    *如果没有必要，请留空
* SSH端口（强制）
    *与华硕路由器SSH连接的端口
*投票时间
    *检查有效设备的时间（毫秒）（最短时间为5000毫秒= 5秒）
*时间不活跃
    *设备不再处于活动状态时的毫秒数。
    *在我的情况下180000ms = 180s = 3分钟完美无缺。最低为60000毫秒
*监测地址
    *使用设备中的MAC地址添加要监视的设备是否激活。
    *不要忘记设置复选框以激活监控

## Changelog

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

## License
The MIT License (MIT)

Copyright (c) 2019 mcdhrts <mcdhrts@outlook.com>

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