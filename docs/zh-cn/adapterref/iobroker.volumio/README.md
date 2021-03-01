---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.volumio/README.md
title: ioBroker.volumio
hash: DbvHbyB6CJysKT2u0D/hKX3zeydtPRIkex7ZxOvChCk=
---
![标识](../../../en/adapterref/iobroker.volumio/admin/volumio.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.volumio.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.volumio.svg)
![安装数量（最新）](http://iobroker.live/badges/volumio-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/volumio-stable.svg)
![依赖状态](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)
![已知漏洞](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)
![NPM](https://nodei.co/npm/iobroker.volumio.png?downloads=true)

＃ioBroker.volumio
**测试：**![测试与发布](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

＃＃＃ 支持我
如果此适配器帮助您在SmartHome中实现了凉爽的自动化并帮助您缩短了开发时间，则可以邀请我喝杯咖啡:)

[![捐赠]（https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png）](http://paypal.me/iske)

## IoBroker的volumio适配器
用于ioBroker的Volumio适配器这是用于远程控制volumio实例的适配器。

它使用以下REST api：https://volumio.github.io/docs/API/REST_API.html

目前，实现了以下功能：

*播放器命令
    *静音/取消静音
    *下一个/上一个
    * 玩
        *从播放列表播放第n首歌曲
    * 暂停
    *在播放/暂停之间切换
    * 停止
    * 音量控制
        *设置为特定值
        *音量提高/降低
* 队列
    *清除队列
    *重复曲目
    *混响模式
*接收玩家状态

去做：

-[]设定搜寻位置
-[]列出播放列表
-[]浏览

## Changelog

### 0.1.2
* (André Iske) Minor bug fixes 

### 0.1.1
* (André Iske) Minor bug fixes 

### 0.1.0
* (André Iske) Complete reworked adapter
    * Switched codebase to typescript
    * Changed License to MIT

### 0.0.1
* (André Iske) initial release

## License
MIT License

Copyright (c) 2021 André Iske <andre.iske@mailbox.org>

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