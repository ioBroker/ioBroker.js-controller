---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: xxNMxOww/Mb3yCrqbYQpAG95lD28PdziSWOPvmWfjAo=
---
![标识](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![安装数量](http://iobroker.live/badges/ebus-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.ebus.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![测验](https://travis-ci.org/rg-engineering/ioBroker.ebus.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

＃ioBroker.ebus
**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

**如果您愿意，请考虑捐赠：**

[![paypal]（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

该适配器读取

-使用html从ebusd提取数据

在这种情况下，ebusd必须运行并且必须能够将数据发送到例如通过http：// IP：port / data（http://192.168.0.123:8889/data）的资源管理器。可以从https://github.com/john30/ebusd复制配置文件。解析所有包含数据，lastup和来自global部分的字段。此刻，所有其他人都将被忽略。

可能会轮询未通过ebusd直接轮询的数据。命令“ read -f”用于强制通过ebus进行读取。

另一个功能是发送任何命令到ebusd并接收答案，例如脚本。

当前支持的ebusd版本：3.3

＃＃ 已知的问题
*如果发现错误或有新功能，请在[github]（https://github.com/rg-engineering/ioBroker.ebus/issues）上创建问题

## 2.2.4（2021-02-17）
*（René）请参阅问题＃42：未捕获的ReferenceError：在解决的小部件中未定义oView

## 2.2.3（2020-10-24）
*（René）创建历史记录DP（如果不可用）

## 2.2.0（2020-09-06）
*（René）仅在必要时才更改DP以减轻系统负载
*（René）更新依赖

## 2.1.1（2020-06-27）
*（René）问题＃26：错误修复：“找不到cmd”仅是调试消息，而不是错误

## 2.1.0（2020-06-17）
*（René）重构：使用了“异步/等待”

## 2.0.0（2020-04-26）
*（René）“请求”替换为“弯曲”

## 1.0.0（2019-12-15）
*（René）更新到我自己的flot 3.0

## 0.8.2（2019-11-10）
*（René）在数据点“错误”中出现了更多错误消息

## 0.8.1（2019-10-31）
*（René）将flot更新到3.0版

### 0.8.0（2019-02-24）
*（René）hcmode2值5 = EVU Sperrzeit

### 0.7.0（2019-01-28）
*（René）添加可调超时

### 0.6.0（2019-01-06）
*（René）支持紧凑模式

### 0.5.5（2018-11-04）
*（René）代码清理

### 0.5.4
*（René）arduino支持已删除

### 0.5.3
*（René）添加错误信息

### 0.5.2
*（René）错误修复：在vis 1.x中某些值未存储

### 0.5.1
*（René）错误修复：如果没有要轮询的内容，则跳过telnet连接

### 0.5.0
*（René）通过TCP将日期写入ebusd

### 0.4.2
*（René）管理员V3错误修复

### 0.4.1
*（René）徽标已更改

### 0.4.0
*（René）从ebusd读取数据

### 0.3.0
*（René）支持ebusd
*（René）admin3支持

### 0.2.0
*（René）将历史记录添加为vis的JSON
*（René）添加基于float的小部件以显示温度，状态和功率图

### 0.1.0
*（René）预定适配器，而不是守护进程

### 0.0.3
*（René）UTF8编码

### 0.0.2
*（René）初始版本

## Changelog

## License
Copyright (C) <2017 - 2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.