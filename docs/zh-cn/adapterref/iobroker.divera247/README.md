---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.divera247/README.md
title: 第247章
hash: jNUIs0WuW0c8Li2RkhyJ6QwyNNP+DCU8W1H/sEhRHyk=
---
![商标](../../../en/adapterref/iobroker.divera247/admin/divera247_long.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.divera247.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.divera247.svg)
![安装数量（最新）](http://iobroker.live/badges/divera247-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/divera247-stable.svg)
![依赖状态](https://img.shields.io/david/TKnpl/iobroker.divera247.svg)
![已知漏洞](https://snyk.io/test/github/TKnpl/ioBroker.divera247/badge.svg)
![NPM](https://nodei.co/npm/iobroker.divera247.png?downloads=true)

＃ioBroker.divera247
**测试：**![测试与发布](https://github.com/TKnpl/ioBroker.divera247/workflows/Test%20and%20Release/badge.svg)

## Divera247 ioBroker适配器
警报服务“ Divera 24/7”的适配器

＃＃ 要求
为了充分利用此适配器，您的组织必须订阅Divera 24/7服务的“警报”计划

##配置此适配器
您必须从组织到此适配器输入“ Divera 24/7” API密钥。
要查找API密钥，请转到官方的[Divera 24/7网站](https://www.divera247.com/)并导航至管理->设置->接口-> API。在这里，您可以在“授权”区域中找到令牌。

此外，您可以将警报限制为特定用户或警报组。
为此，您必须在此适配器的管理页面中输入Divera用户ID或警报组号。可以指定多个用户ID和/或警报组编号，并用逗号（，）分隔。
该适配器首先检查userID，因为它会检查组。第一次点击将触发警报并更新所有状态。当前无法将userID和警报组结合使用。
要查找自己的用户ID，请转到官方的[Divera 24/7网站](https://www.divera247.com/)并导航至用户配置文件->设置->调试->“ Aktuelle ID”。

要订阅“所有警报”，只需将相关字段留空即可。

此外，请选择一个更新间隔以调用API服务器。建议30秒。最小为10秒。

## Changelog

### 0.1.2
* (TKnpl) added alarmed vehicles datapoint

### 0.1.1
* (TKnpl) small changes - wording

### 0.1.0
* (TKnpl) added possibility to specify alarm groups

### 0.0.10
* (TKnpl) bug in info.connection fixed and handling of user ids expanded

### 0.0.9
* (TKnpl) added default values for admin page

### 0.0.8
* (TKnpl) Changed API call from intervall to timeout, added states 'group' and 'foreign_id'

### 0.0.7
* (TKnpl) added object 'priority' and 'alarm' object updates only in case of an new alarm or when an alarm was closed

### 0.0.6
* (TKnpl) state handling while active alarm and connection check improved, fixed object types

### 0.0.5
* (TKnpl) fixed io-package news issue

### 0.0.4
* (TKnpl) Connection check to api improved, added timestamp of latest alert

### 0.0.3
* (TKnpl) added title, text, address, latitude, longitude, general formatting

### 0.0.2
* (TKnpl) adjusted translation

### 0.0.1
* (TKnpl) initial commit

## License
MIT License

Copyright (c) 2021 TKnpl <dev@t-concepts.de>

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