---
BADGE-Number of Installations: http://iobroker.live/badges/info-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.info.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.info.svg
BADGE-NPM: https://nodei.co/npm/iobroker.info.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/iobroker-community-adapters/ioBroker.info/master.svg
BADGE-Dependency Status: https://img.shields.io/david/iobroker-community-adapters/iobroker.info.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/iobroker-community-adapters/ioBroker.info/badge.svg
adapter: true
editLink: https://github.com/iobroker-community-adapters/ioBroker.info/edit/master//README.md
license: MIT
authors: ldittmar <iobroker@lmdsoft.de>
description: 这是一个ioBroker适配器，用于获取有关系统的信息以及有关ioBroker的一些新闻。
title: ioBroker信息页面
keywords: info, information
readme: https://github.com/iobroker-community-adapters/ioBroker.info/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2017-12-08T12:55:08.977Z
version: 1.2.7
---
信息适配器的开发是为了向用户提供有关系统，ioBroker和相关主题的各种信息。用户应该对所有有趣和重要的数据进行概述，如果有重要信息，ioBroker团队将有机会更快地联系用户。

# 安装

要在“选项卡”选项卡中查看信息窗口，必须先在安装后在Admin中将其检查为“可见”。要执行此操作，请单击“管理”窗口左上角的左侧三角形，然后在菜单中选择“信息”。

# 配置

* 不显示时钟 - 隐藏左上角的时钟。
* 显示适配器请求 - 显示带有适配器请求的面板。
    * 启动时关闭了适配器请求 - 当信息窗口启动时，具有适配器请求的面板将关闭。
* 查看已知错误 - 显示已知错误的面板以及已安装适配器的请求。
    * 启动时已知错误已关闭 - 启动信息窗口时，已关闭具有已知错误的面板。

* 显示来自iobroker.net的新闻 - 显示带有官方ioBroker新闻的面板。
* 显示最新论坛条目 - 显示包含最后论坛条目的面板。
* Feednami API密钥 - 如果您使用主机名称调用ioBroker，例如iobroker：8081或类似的东西，你需要在Feednami免费注册以获得适当的API密钥。这不是通过IP地址访问所必需的。

* 显示文档 - 显示文档的按钮。
    * 选择文档所需的语言 - 选择要包含在文档中的语言。

* 在Github中搜索未知适配器（专家） - 显示在github中搜索未批准的适配器的面板。
    * Sort Adapter by  - 按名称，创建日期或上次更新对搜索结果进行排序。
    * 逆序 - 反转结果的顺序。
    * 启动时关闭新适配器 - 启动信息窗口时，将关闭具有未知适配器的面板。

* 不加载当前系统数据 - 不会循环加载当前系统数据。
    * 每x秒加载CPU数据 -  CPU数据每2到10秒循环加载一次。 0关闭。
    * 每x秒加载内存数据 - 内存数据每2到10秒循环加载一次。 0关闭。
    * 每x秒加载硬盘数据 - 内存数据每2到10秒循环加载一次。 0关闭。

# Info标签

## 时钟

<img height="200" src="zh-cn/adapterref/iobroker.info/img/clock.png">

## 消息

<img height="200" src="zh-cn/adapterref/iobroker.info/img/messages.png">

## 文档

<img height="200" src="zh-cn/adapterref/iobroker.info/img/documentation.png">

## 更新

<img height="200" src="zh-cn/adapterref/iobroker.info/img/updates.png">

## 新适配器

<img height="200" src="zh-cn/adapterref/iobroker.info/img/new_adapters.png">

## 系统信息

<img height="200" src="zh-cn/adapterref/iobroker.info/img/systeminfo.png">

## 适配器请求

<img height="200" src="zh-cn/adapterref/iobroker.info/img/adapter_requests.png">

## 问题和错误

<img height="200" src="zh-cn/adapterref/iobroker.info/img/issues_bugs.png">

## ioBroker适配器Github上的

<img height="200" src="zh-cn/adapterref/iobroker.info/img/adapter_search.png">

## 新闻

<img height="200" src="zh-cn/adapterref/iobroker.info/img/news.png">

## 论坛

<img height="200" src="zh-cn/adapterref/iobroker.info/img/forum.png">

## Changelog

### 1.3.x (2019-04-01)
* (ldittmar) better system information

### 1.2.7 (2019-03-17)
* (ldittmar) little fixes
* (ldittmar) unknow adapters search new design
* (ldittmar) better design for PC monitor
* (ldittmar) unknow adapters show more informations
* (ldittmar) stable version

### 1.2.5 (2019-03-14)
* (ldittmar) show adapter requests
* (ldittmar) show bugs and issues
* (ldittmar) diyplay important links
* (ldittmar) show important popup news
* (ldittmar) vis widget for popup news

### 1.1.3 (2019-01-03)
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support
* (ldittmar) add new forum support
* (ldittmar) add chinese forum support
* (ldittmar) move to iobroker-community-adapters

### 1.0.2 (2018-11-30)
* (ldittmar) fixed problems with Node version info in multihost system

### 1.0.1 (2018-11-27)
* (ldittmar) search for new adapters on Github
* (ldittmar) check for Node.js update
* (ldittmar) https problems with news and forum data solved
* (ldittmar) polish added as language

### 1.0.0 (2018-11-25)
* (ldittmar) full compatibility to Admin 3.x
* (ldittmar) clock can be disabled

### 0.1.0 (2018-01-02)
* (ldittmar) compatibility to Admin 3.x / beta release

### 0.0.6 (2017-12-11)
* (ldittmar) some fixes / install and update implemented

### 0.0.4 (2017-12-08)
* (ldittmar) some fixes and design correction
* (ldittmar) show informations about adapters (update/new)
* (ldittmar) show system informations

### 0.0.1 (2017-11-23)
* (ldittmar) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017 - 2019 ldittmar <iobroker@lmdsoft.de>

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