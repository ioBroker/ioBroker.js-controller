---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mercury/README.md
title: ioBroker.mercury
hash: ikSSUb3TbTOnUW3NBRQWuJcu+dMe5mQdW8suNuSSWgo=
---
![商标](../../../en/adapterref/iobroker.mercury/admin/mercury.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.mercury.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.mercury.svg)
![依赖状态](https://img.shields.io/david/instalator/iobroker.mercury.svg)
![已知漏洞](https://snyk.io/test/github/instalator/ioBroker.mercury/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mercury.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/instalator/ioBroker.mercury/master.svg)

＃ioBroker.mercury
##适用于ioBroker的Mercury适配器
从电表Mercury接收数据。
支持TCP / IP和串行连接。

支持以下电表：

*水星200
*水星201
*水星206
*水星203
*水银203.2TD
*水星204
*水星208
*水星230
*水星231
*水星233
*水星234
*水星236
*水星238

##对象
** RAW **-发送RAW命令并接收响应。
命令不带地址和CRC，字节用空格分隔。示例：1个相位计数器-读取当月的能量

```
32 0F
```

以字符串形式返回缓冲区

```"{"type":"Buffer","data":[0,14,31,155,50,7,0,99,0,255,255,255,255,255,255,255,255,255,255,255,255,127,86]}"```

## Changelog

### 0.0.5
* (instalator) fixed error

### 0.0.4
* (instalator) added unit for state

### 0.0.3
* (instalator) added object send RAW command
* (instalator) refactor and fix error

### 0.0.2
* (instalator) added serial connect
* (instalator) fixed many error

### 0.0.1
* (instalator) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 instalator <vvvalt@mail.ru>

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