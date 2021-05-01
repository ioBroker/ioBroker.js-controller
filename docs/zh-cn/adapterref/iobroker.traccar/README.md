---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.traccar/README.md
title: ioBroker.traccar
hash: OFm1lXncX7HqJZ8Rc8bK6eA7dMOP9KvSDX7+HQY1cXU=
---
![商标](../../../en/adapterref/iobroker.traccar/admin/traccar.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.traccar.svg?dummy=unused)
![资料下载](https://img.shields.io/npm/dm/iobroker.traccar.svg?dummy=unused)
![安装数量（最新）](https://iobroker.live/badges/traccar-installed.svg?dummy=unused)
![安装数量（稳定）](https://iobroker.live/badges/traccar-stable.svg?dummy=unused)
![依赖状态](https://img.shields.io/david/o0shojo0o/iobroker.traccar.svg?dummy=unused)
![已知漏洞](https://snyk.io/test/github/o0shojo0o/ioBroker.traccar/badge.svg?dummy=unused)
![NPM](https://nodei.co/npm/iobroker.traccar.png?downloads=true)

＃ioBroker.traccar
[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/traccar/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker的Traccar适配器
该适配器从[特拉卡](https://www.traccar.org)实时导入位置和扩展数据，并使它们在ioBroker中可用。

＃＃ 配置
1.创建适配器的新实例
2.填写Traccar服务器的URL / IP和端口
3.配置用户名和密码
4.保存设置
5.玩得开心:)

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.0.8 (2021-04-30)

-   (o0shojo0o) bugfix wrong value type
-   (Weblate) german language update

### 0.0.7 (2021-03-24)

-   (o0shojo0o) bugfix special characters in password or username
-   (o0shojo0o) code refactor
-   (o0shojo0o) better handling with new device or geolocation at runtime

### 0.0.6 (2021-03-19)

-   (o0shojo0o) adjustments according to the adapter review

### 0.0.5 (2021-03-08)

-   (o0shojo0o) add [release-script](https://github.com/AlCalzone/release-script)

### 0.0.4

-   (o0shojo0o) add datapoint address (https://www.traccar.org/reverse-geocoding/)

### 0.0.3

-   (o0shojo0o) workaround for unclean geofences in the database

### 0.0.2

-   (o0shojo0o) add websocket connection
-   (o0shojo0o) add position url
-   (o0shojo0o) add dynamic datapoints for attributes

### 0.0.1

-   (braindead1) initial release

## License

MIT License

Copyright (c) 2021 Dennis Rathjen <info@bastelbunker.de>

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