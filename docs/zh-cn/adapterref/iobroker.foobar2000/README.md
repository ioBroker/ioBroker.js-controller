---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.foobar2000/README.md
title: iobroker的Foobar2000适配器
hash: 23LA1gH4BQKVFN7ld70hp/wjxpY6JGRskAhLIhsXfjs=
---
![商标](../../../en/adapterref/iobroker.foobar2000/admin/foobar2000.png)

![安装数量](http://iobroker.live/badges/foobar2000-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.foobar2000.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.foobar2000.svg)
![测验](http://img.shields.io/travis/instalator/ioBroker.foobar2000/master.svg)
![NPM](https://nodei.co/npm/iobroker.foobar2000.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

＃Foobar2000 iobroker适配器
![管理员设置。](../../../en/adapterref/iobroker.foobar2000/admin/admin.png)

##使用
Описание[тут](http://blog.instalator.ru/archives/541)。
Дляуправленияпроигрывателемнеобходимоустановитьплагин[foo_httpcontrol](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/)。
§§JJJJJ_0_0§§изменитьпараметр§§JJ

要控制播放器，您必须安装插件[foo_httpcontrol](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/)。
要将封面显示为文件的链接，请在文件```c:\Users\{USER}\AppData\Roaming\foobar2000\foo_httpcontrol_data\foobar2000controller\config```中更改参数```albumart_prefer_embedded = 0```§

## Changelog

#### 2.0.2
* (instalator) fixed error

#### 2.0.0
* (instalator) Completely rewritten

#### 1.0.0
* (instalator) Up to stable

#### 0.2.0
* (instalator) Change for widgets vis-players

#### 0.1.2
* (instalator) del widgets folders
* (instalator) change log level
* (instalator) add news object

#### 0.1.1
* (instalator) fix start, exit for local

#### 0.1.0
* (instalator) beta (20.10.2016)

#### 0.0.1
* (instalator) initial (12.10.2016)

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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