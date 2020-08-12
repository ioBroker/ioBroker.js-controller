---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.logparser/README.md
title: ioBroker.logparser
hash: hFhKajhDIfgI4rFcQpTTJLvbUvIFVnP+VaOy3rtMH2o=
---
![商标](../../../en/adapterref/iobroker.logparser/admin/logparser.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.logparser.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.logparser.svg)
![安装数量（最新）](http://iobroker.live/badges/logparser-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/logparser-stable.svg)
![依赖状态](https://img.shields.io/david/Mic-M/iobroker.logparser.svg)
![已知漏洞](https://snyk.io/test/github/Mic-M/ioBroker.logparser/badge.svg)
![NPM](https://nodei.co/npm/iobroker.logparser.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/Mic-M/ioBroker.logparser/master.svg)

＃ioBroker.logparser
##所有ioBroker适配器的日志解析器
该适配器解析（过滤）ioBroker适配器的所有日志，并以JSON形式在设置中配置的每个过滤器的状态下提供结果。
然后可以在VIS中使用结果JSON进行可视化。还提供了清空（清除）旧日志的状态（如`logparser.0.filters.Homematic.emptyJson`或`logparser.0.emptyAllJson`清空所有日志。）

![状态](../../../en/adapterref/iobroker.logparser/docs/en/img/states.png)

**请注意：**此适配器使用Sentry库自动向适配器开发者匿名报告异常和代码错误。有关如何禁用此错误报告的更多详细信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)。 Sentry报告从js-controller 3.0开始使用。

##说明
* ** [英文说明]（docs / zh / logparser.md）**

* ** [Deutsche Anleitung]（docs / de / logparser.md）**

##可视化示例（动画gif）
![可见](../../../en/adapterref/iobroker.logparser/docs/de/img/visintro.gif)

## Changelog

### 1.0.4
* (Mic-M) Fixed 'Today/Yesterday' updating issue - https://forum.iobroker.net/post/469757. Thanks to (Kuddel) for reporting and (Glasfaser) for further debugging.

### 1.0.3
* (Mic-M) Added [Sentry](https://github.com/ioBroker/plugin-sentry)

### 1.0.2
* (Mic-M) Added debug logging for callAtMidnight() and updateTodayYesterday()

### 1.0.1
* (Mic-M) Updated lodash dependency from 4.17.15 to 4.17.19

### 1.0.0
* (Mic-M) No changes - just prepare versioning to add adapter to stable repository per [Adapter dev docu](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#versioning)

### 0.4.11
* (Mic-M) Adapter is now in latest repository.
* (Mic-M) Removed unused adapter features 'extra tab' and 'custom state options'
* (Mic-M) Removed unused subscription to object changes

### 0.4.10
* (Mic-M) Fixed reference to 'visualization.table' for adapter instances other than instance 0.
* (Mic-M) Cleanup code.

### 0.4.9
* (Mic-M) Add option to remove script.js.Script_Name, update documentation

### 0.4.8
* (Mic-M) Fixed npm issue

### 0.4.7
* (Mic-M) Fixed translations, disabled 'supportCustoms', improved admin settings

### 0.4.6
* (Mic-M) Added error handling for invalid regex provided by user
* (Mic-M) A few other fixes/improvements under the hood

### 0.4.5
* (Mic-M) Fixed issue with merge option and other filter settings by now cloning input logObject prior to handling
* (Mic-M) Allow wildcard * for 'Whitelist AND' and 'Whitelist OR' to indicate matching all

### 0.4.4
* (Mic-M) Translations added, adapter instructions added, optimized admin interface

### 0.4.3
* (Mic-M) Fix multiple regex/string config values separated by comma

### 0.4.2
* (Mic-M) Fix issue #12 ('state is missing the required property val')
* (Mic-M) Fix issue with visualization.tableX.json and .selection. See https://forum.iobroker.net/post/408513

### 0.4.1
* (Mic-M) Fix 'Yesterday' for date, 2. Fix multiple filters, 3. Add description to settings page

### 0.4.0
* (Mic-M) Add new option "maxLength" to limit the length of each log message

### 0.3.0
* (Mic-M) initial public release

## License
MIT License

Copyright (c) 2020 Mic-M

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