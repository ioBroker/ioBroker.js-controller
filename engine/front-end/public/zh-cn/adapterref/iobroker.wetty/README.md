---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.wetty/edit/master//README.md
title: ioBroker simple wetty Adapter
hash: HX7useGn1SM7p9OEGCbNWHhcTMwgmoHNNkKfPUt7w8o=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: opens a wetty server for the ioBroker
keywords: wetty, terminal, console
readme: https://github.com/ioBroker/ioBroker.wetty/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-02-08T23:39:19.698Z
version: 0.1.1
BADGE-安装数量: http://iobroker.live/badges/wetty-stable.svg
---
![商标](zh-cn/adapterref/iobroker.wetty/../../../en/adapterref/iobroker.wetty/admin/wetty.png)


＃ioBroker.wetty
基于[wetty](https://github.com/krishnasrinivas/wetty)。

Wetty = Web + tty。通过http / https在浏览器中进行终端访问

wetty服务器打开命令行界面。
请仅将其用于管理目的。

通过HTTP和HTTPS终端。 Wetty是ajaxterm / anyterm的替代品，但比他们好得多，因为wetty使用ChromeOS的终端模拟器（hterm），这是一个完全用Javascript编写的终端模拟的完整实现。
它还使用websockets而不是Ajax，因此响应时间更长。

![截图](zh-cn/adapterref/iobroker.wetty/../../../en/adapterref/iobroker.wetty/img/screen1.png)

## Changelog

#### 0.1.1
* (bluefox) inital commit