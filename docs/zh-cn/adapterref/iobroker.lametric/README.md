---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: WC5mIQKmR7+YtXFf0eIZXBipXFHcfbzV4G5YwkZ6zkE=
---
![商标](../../../en/adapterref/iobroker.lametric/admin/lametric.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.lametric.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.lametric.svg)
![稳定](http://iobroker.live/badges/lametric-stable.svg)
![已安装](http://iobroker.live/badges/lametric-installed.svg)
![依赖状态](https://img.shields.io/david/klein0r/iobroker.lametric.svg)
![已知漏洞](https://snyk.io/test/github/klein0r/ioBroker.lametric/badge.svg)
![建立状态](http://img.shields.io/travis/klein0r/ioBroker.lametric.svg)
![NPM](https://nodei.co/npm/iobroker.lametric.png?downloads=true)

＃ioBroker.lametric
使用此适配器，您可以获取有关LaMetric Time的状态信息并向其发送通知。
您需要的只是设备的IP地址和api开发人员密钥。

##配置
您可以获取个人密钥[这里](https://developer.lametric.com/)。

![api键](../../../en/adapterref/iobroker.lametric/docs/apiKey.png)

##用法
您可以在此处阅读有关通知的更多信息：https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html

＃＃ 特征
-设置显示亮度（百分比，自动模式/手动模式）
-设置音量（百分比）
-配置屏幕保护程序（启用/禁用，基于时间，黑暗时）
-激活/停用蓝牙并更改蓝牙名称
-在应用之间切换（下一个，上一个，转到特定的应用）
-发送块状通知（具有可配置的优先级，声音，图标，文本等）
-控制特殊的应用程序，例如收音机，秒表和天气

##
您可以使用简单的字符串作为消息，将其显示为单个框架

![简单](../../../en/adapterref/iobroker.lametric/docs/blockly1.png)

要显示多个框架，您还可以提供一个数组作为消息

![简单](../../../en/adapterref/iobroker.lametric/docs/blockly2.png)

## Changelog

### 0.0.8

* (klein0r) Updated dependencies

### 0.0.7

* (klein0r) fixed blockly

### 0.0.6

* (klein0r) switched to setTimeout instead of setInterval, improved logging and fixes eslint complaints

### 0.0.5

* (klein0r) Fixed notification, html, updated github template, enable and disable screensaver

### 0.0.4

* (klein0r) Refactored blockly sendTo / notifications

### 0.0.3

* (klein0r) Added app switching support, refactored everything
* (bluefox) The deletion of the actual shown information was added

### 0.0.2

* (Sigi74) Change message_value for variables message
* (Sigi74) Leave sound none

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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