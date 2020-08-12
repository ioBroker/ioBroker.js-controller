---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: yh8XvPLUW6JXEm9Kg/mzld7CJMz1EZPbRbApTGMjN1w=
---
![商标](../../../en/adapterref/iobroker.trashschedule/admin/trashschedule.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.trashschedule.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.trashschedule.svg)
![稳定](http://iobroker.live/badges/trashschedule-stable.svg)
![已安装](http://iobroker.live/badges/trashschedule-installed.svg)
![依赖状态](https://img.shields.io/david/klein0r/iobroker.trashschedule.svg)
![已知漏洞](https://snyk.io/test/github/klein0r/ioBroker.trashschedule/badge.svg)
![建立状态](http://img.shields.io/travis/klein0r/ioBroker.trashschedule.svg)
![NPM](https://nodei.co/npm/iobroker.trashschedule.png?downloads=true)

＃ioBroker.trashschedule
扫描日历以计算直到下一次垃圾收集的剩余天数

##前提条件
1.创建一个**实例**
2.配置日历的网址（例如Google日历）
3.将“预览天数”设置为一个范围，该范围应包括每种垃圾类型至少两次（例如30天）
4.选择“隐藏事件的开始-结束”选项
5.如果使用“事件”选项卡，请确保为每个事件类型启用“显示”复选框，该类型也应在垃圾箱计划中使用（否则，该事件将被ical实例隐藏）

##配置
1.创建一个垃圾箱计划实例，然后选择该ical实例作为源
2.转到垃圾箱类型标签，然后添加类型名称和事件匹配项
3.启动实例

**有问题吗？**检查常见问题解答：[德语](https://github.com/klein0r/ioBroker.trashschedule/blob/master/faq_de.md)

## Changelog

### 0.0.11

* (klein0r) Better error reporting

### 0.0.10

* (klein0r) Added CSS classes for easier customization
* (klein0r) Added optional glow on due date for vis widget

### 0.0.9

* (klein0r) Fixed color correction calculation issue

### 0.0.8

* (klein0r) Fixed missing VIS translations

### 0.0.7

* (klein0r) Improved logging
* (klein0r) Several fixes, improved admin and vis (automatic color correction, resizeable widget)
* (ivosch68) Reset of states if no event matches

### 0.0.6

* (klein0r) updated dependencies

### 0.0.5

* (klein0r) added pickup dates after next date

### 0.0.4

* (klein0r) added VIS templates

### 0.0.3

* (klein0r) fixed issue with events after time change date

### 0.0.2

* (klein0r) added global offset in days
* (klein0r) added exact match for types

### 0.0.1

* (klein0r) initial release

## License

MIT License

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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