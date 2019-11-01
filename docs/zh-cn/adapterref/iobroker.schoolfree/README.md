---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.schoolfree/README.md
title: ioBroker.schoolfree
hash: yiMSYlfKCxjeBsenYc2dabwdT1FA3HLmuutu2//xE20=
---
![商标](../../../en/adapterref/iobroker.schoolfree/admin/schoolfree.png)

![安装数量](http://iobroker.live/badges/schoolfree-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.schoolfree.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.schoolfree.svg)
![依赖状态](https://img.shields.io/david/simatec/iobroker.schoolfree.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.schoolfree/badge.svg)
![特拉维斯](http://img.shields.io/travis/simatec/ioBroker.schoolfree/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/simatec/ioBroker.schoolfree?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.schoolfree.png?downloads=true)

＃ioBroker.schoolfree
##适用于ioBroker的schoolfree适配器
**如果您愿意，请考虑捐赠：**

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

### Deutsche Beschreibung：
校内免费安装适配器。
在Datenpunkteübergeben的Schmiterien auswerten und Mit dem Adapter。
Die Datenpunktekönnensomitfürweitere Funktionen wie Heizungssteuerungen，Rolladen- and Anwesenheitssteuerungen ausgewertet and verarbeitet werden。

API的https://www.mehr-schulferien.de的Der aktuelle Bezug von Terminen的Schüfererienerfolgtüber的API

德国和德国之间的友谊。

从学校到学校的日程安排：

* info.current.end：Datumfürdas Ende der aktuellen Ferien
* info.current.name：Bezeichnung der aktuellen Schulferien
* info.current.start：起始日期
* info.next.end：费恩（Datumfürdas Ende dernächstenFerien）
*信息名称：Bezeichnung dernächstenSchulferien
* info.next.start：开始日期Ferien
*今日信息：切换状态列表（真/假）
* info。明天：Switch forfürden aktuellen Status morgen（true / false）

*************************************************************************************************************************************

###英文说明：
Schoolfree是用于iobroker安装的适配器。
使用适配器，可以评估学校假期并将其传输到数据点。
因此，可以针对其他功能（例如加热控制，快门和存在控制）评估和处理数据点。

当前的学校假期订阅是通过https://www.mehr-schulferien.de的API进行的

目前，支持德国的学校假期和放假时间。

以下数据点可用于Schoolfree的进一步处理：

* info.current.end：当前假期结束的日期
* info.current.name：当前学校假期的名称
* info.current.start：当前假期的开始日期
* info.next.end：下一个假期结束的日期
* info.next.name：下一个学校假期的名称
* info.next.start：下一个假期的开始日期
*今天的信息：今天切换为当前状态（是/否）
* info。明天：明天切换为当前状态（对/错）

*************************************************************************************************************************************

## Changelog

### 0.3.1 (28.10.2019)
* (simatec) Fix start after install

### 0.3.0 (18.10.2019)
* (simatec) end of node 6 support
* (simatec) changed dateformat

### 0.2.2 (04.06.2019)
* (simatec)new object structure

### 0.2.1 (14.05.2019)
* (simatec) fix travis and appveyor

### 0.2.0 (13.05.2019)
* (simatec) Add Objects for next school holiday
* (simatec) cleaned code

### 0.1.0 (10.05.2019)
* (simatec) First Beta

### 0.0.1 (08.05.2019)
* (simatec) initial release

*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 simatec

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