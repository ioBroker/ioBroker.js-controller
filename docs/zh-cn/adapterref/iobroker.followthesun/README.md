---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.followthesun/README.md
title: ioBroker。跟随太阳
hash: QJaTG0uxkQ3xon1cTidL/ivLp4eZABLgoaDzBRYWF3k=
---
![标识](../../../en/adapterref/iobroker.followthesun/admin/followthesun.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.followthesun.svg)
![安装数量（稳定）](http://iobroker.live/badges/followthesun-stable.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.followthesun.svg)
![安装数量（最新）](http://iobroker.live/badges/followthesun-installed.svg)
![依赖状态](https://img.shields.io/david/HGlab01/iobroker.followthesun.svg)
![已知漏洞](https://snyk.io/test/github/HGlab01/ioBroker.followthesun/badge.svg)
![NPM](https://nodei.co/npm/iobroker.followthesun.png?downloads=true)

＃ioBroker.followthesun
[![FOSSA状态]（https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=shield）](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_shield)![测试与发布](https://github.com/HGlab01/ioBroker.followthesun/workflows/Test%20and%20Release/badge.svg)

## Followthesun ioBroker适配器
该适配器根据地理区域计算太阳的当前高度和方位角。另外，还存储了罗盘方向和太阳的运动（日出或日落）。
它使用配置中定义的地理位置。可以在实例首选项中定义计算间隔。
也会存储今天，明天或春季/夏季/秋季/冬季开始的某几天的日正值。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.3.2 (2021-02-17)
* (HGlab01) add Sentry support

### 0.3.1 (2021-02-15)
* (HGlab01) add sunrise, sunset, dusk and dawn (#67)
* (HGlab01) smaller improvments
* (HGlab01) use iobroker-jsonexplorer for state-management

### 0.2.7 (2021-02-11)
* (HGlab01) Fix sun-movement bug (#61)
* (HGlab01) Optimize keywords
* (HGlab01) Bump node-schedule from 1.3.2 to 2.0.x

### 0.2.6 (2020-12-30)
* (HGlab01) implement license check provided by app.fossa.com

### 0.2.5 (2020-12-16)
* (HGlab01) add unit to solarnoon-values (issue #30)

### 0.2.4 (2020-12-13)
* (HGlab01) Prepare for stable repository

### 0.2.3 (2020-12-13)
* (HGlab01) Update dependencies
* (HGlab01) Change type to "geoposition" 

### 0.2.2 (2020-12-07)
* (HGlab01) Decrease log-level

### 0.2.1 (2020-12-07)
* (HGlab01) update dependecies
* (HGlab01) add solar-noon information
* (HGlab01) add compass information
* (HGlab01) breaking change! states moved from root to "current"

### 0.1.0 (2020-11-30)
* (HGlab01) first beta release

## License
MIT License

Copyright (c) 2021 HGlab01 <iobroker.followthesun@gmail.com>

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


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.followthesun?ref=badge_large)