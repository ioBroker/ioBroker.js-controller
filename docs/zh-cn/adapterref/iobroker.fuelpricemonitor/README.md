---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fuelpricemonitor/README.md
title: ioBroker.fuelpricemonitor
hash: VveHgPApeFx1VhAc2EheNXz5kXX0ErbqiB6pBQmc9RI=
---
![标识](../../../en/adapterref/iobroker.fuelpricemonitor/admin/fuelpricemonitor.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.fuelpricemonitor.svg)
![安装数量（稳定）](http://iobroker.live/badges/fuelpricemonitor-stable.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.fuelpricemonitor.svg)
![安装数量（最新）](http://iobroker.live/badges/fuelpricemonitor-installed.svg)
![依赖状态](https://img.shields.io/david/HGlab01/iobroker.fuelpricemonitor.svg)
![已知漏洞](https://snyk.io/test/github/HGlab01/ioBroker.fuelpricemonitor/badge.svg)
![NPM](https://nodei.co/npm/iobroker.fuelpricemonitor.png?downloads=true)

＃ioBroker.fuelpricemonitor
[![FOSSA状态]（https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=shield）](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_shield)![测试与发布](https://github.com/HGlab01/ioBroker.fuelpricemonitor/workflows/Test%20and%20Release/badge.svg)

ioBroker的## fuelpricemonitor适配器
该适配器根据您配置的地理位置从奥地利官方数据库中检索燃油（柴油，Super95和CNG）的价格。可以添加其他位置。
默认计划是在实例选项卡中作为cron作业每20分钟完成一次。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

**使用JSCONTROLER 3.2.16版或更高版本的作品！**

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.2.1 (2021-03-08)
* (HGlab01) Bump js-controller to 3.2.16 for proper device/channel/state deletion
* (HGlab01) use function deleteEverything from json-Explorer@0.0.13
* (HGlab01) improve device/channel/state cleaning

### 0.2.0 (2021-03-04)
* (HGlab01) additional locations can be added
* (HGlab01) for a proper working of the new version a uninstall/install is recommended
* (HGlab01) small improvements

### 0.1.4 (2021-02-22)
* (HGlab01) optimize device/channel deletion
* (HGlab01) improve Sentry handling

### 0.1.3 (2021-02-20)
* (HGlab01) add attributes accessMod and clubCardText
* (HGlab01) Improve logs
* (HGlab01) fuel type (Diesel, Super95, CNG) can be selected

### 0.1.2 (2021-02-17)
* (HGlab01) first beta version

### 0.0.1-3 (2021-01-07)
* (HGlab01) first alpha version

## License
MIT License

Copyright (c) 2021 HGlab01 <iobroker.fuelpricemonitor@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.fuelpricemonitor?ref=badge_large)