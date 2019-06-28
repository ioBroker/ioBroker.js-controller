---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.worx/README.md
title: ioBroker.worx
hash: q3qiXsEpzyky1I/1CpfgxTE74q7wQ2ddAe8q5BAaKnw=
---
![商标](../../../en/adapterref/iobroker.worx/admin/worx.png)

![安装数量](http://iobroker.live/badges/worx-installed.svg)
![稳定的版本](http://iobroker.live/badges/worx-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.worx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.worx.svg)
![已知的漏洞](https://snyk.io/test/github/MeisterTR/ioBroker.worx/badge.svg)
![NPM](https://nodei.co/npm/iobroker.worx.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/MeisterTR/ioBroker.worx/master.svg)

＃ioBroker.worx
[![依赖状态]（https://david-dm.org/MeisterTR/iobroker.worx/status.svg）](https://david-dm.org/MeisterTR/iobroker.worx)

适用于ioBroker的## worx适配器
通过云和mqtt控制

此适配器通过云连接ioBroker和Landroid S / M / L.
从割草机读出温度，割草时间，电池电量和各种其他数据。适配器可以控制割草机，您可以像mowtimes一样更改配置参数。

<img src="admin/worx_ada2.png" alt="画画" width="100%"/>

##设置
 - 从Config中的worx帐户连接到割草机类型的电子邮件和密码。
 - 边缘切割的延迟：如果切边开始弯曲或弯曲，割草机可能会丢失导线并因故障停止，或刀片可能不会旋转。为此，可以设定叶片开始旋转的起始点。

## Changelog
### 0.3.1 (12.06.2019)
* (MeisterTR) add delay for edgecut in config
* (MeisterTR) fix mowtime error

### 0.2.0 (01.06.2019)
* (MeisterTR) add border
* (MeisterTR) fix small errors
* (MeisterTR) code cleanup
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2019 MeisterTR

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