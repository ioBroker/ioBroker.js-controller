---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/schmupu/ioBroker.contactid/edit/master//README.md
title: Contact ID Server für Alarmanlagen
hash: h7GfJ7f0d+XC/uERT7rhtunUIr+ortt6zJG4VANPgXU=
adapter: true
license: MIT
authors: Thorsten Stueben <thorsten@stueben.de>
description: ioBroker Contact ID server for burglar alarms
keywords: contactid, lupusec, burglar, alarm, contactid
readme: https://github.com/schmupu/ioBroker.contactid/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2018-05-12T17:59:52.182Z
version: 1.0.0
BADGE-Travis CI构建状态: https://travis-ci.org/schmupu/ioBroker.contactid.svg?branch=master
BADGE-AppVeyor构建状态: https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.contactid?branch=master&svg=true
BADGE-安装数量: http://iobroker.live/badges/contactid-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.contactid.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.contactid.svg
BADGE-NPM: https://nodei.co/npm/iobroker.contactid.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.contactid/../../../en/adapterref/iobroker.contactid/admin/contactid.png)


#ioBroker.contactid
==================

报警系统用于与中心站通信的协议联系人ID。

此适配器是Contact ID服务器。当触发警报事件时，警报系统通过IP将Contact ID消息发送到中心站。
您可以将ioBroker与此适配器一起用作中心站。例如。您可以通过Conntact ID发送电报信息。

Contact-ID消息

  SSSS 18QEEEGGZZZC

  * SSSS  - 订阅者。这四个数字标识中央站的特定报警系统或客户。 ioBroker允许更长的用户名。

  * 18  - 消息类型。基本上这个字段应该总是“18”。
  * Q  - 赛事资格赛。
  * EEE  - 事件代码。
  * GG  - 组/分区号码。
  * ZZZ  - 区号（001  -  999）。这是触发警报的区域编号。
  * C  - 校验和。

[联系ID协议](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

##安装和配置
1.安装适配器
2.适配器的配置：

选择用于侦听Conctact-ID请求的IP地址和端口。
注册您的订户名称以识别您的防盗警报消息并选择您的防盗警报类型。

3.配置您的防盗系统以发送联系人ID消息

    Lupusec XT1：

Einstellungen  - >联系人ID：rptn：// subcriber @ ip-address-iobroker：port示例：rptn：//test@192.168.20.1：50000

    Lupusec XT1 + / XT2 / XT2 + / XT3：

Einstellungen  - >联系人ID：ip：// subcriber @ ip-address-iobroker：port / CID示例：ip：//test@192.168.20.1：50000 / CID

4.测试Adpater

  打开命令shell并输入

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

现在您可以发送一个Conntact ID消息。对于Lupsec防盗报警系统，消息以[和]开始和结束。输入你的telnet会话：

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

  现在，您可以在ioBroker对象中看到该消息

## Changelog

### 1.0.0 (2019.01.05)
* (Stübi) Support js-controller compact mode 

### 0.1.6 (2018.12.27)
* (Stübi) Update Core Adapter

### 0.1.5 (2018.06.07)
* (Stübi) Translations

### 0.1.3 (2018.06.07)
* (Stübi) Cleanup

### 0.1.2 (2018.06.07)
* (Stübi) Improvements

### 0.1.1 (2018.06.03)
* (Stübi) Lupusec XT1 Plus, XT2 Plus and XT3 added

### 0.1.0 (18.05.2018)
* (Stübi) First Beta Release

### 0.0.6 (2018.05.18)
* (Stübi) fixed error i
* (Stübi) correction of README.md

### 0.0.5 (2018.05.17)
* (Stübi) fixed error in drop down menu

### 0.0.4 (15.05.2018)
* (Stübi) code improvements

## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten <thorsten@stueben.de>

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