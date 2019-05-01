---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tautulli/README.md
title: ioBroker.tautulli
hash: Q0WQWVcWeq+TZR4OE9XAqU+M5kNa8+TUODKvwAnAgoA=
---
![＃f03c15]（https://placehold.it/15/f03c15/000000?text=+)__这个项目已停止使用[ioBroker.plex]（https://github.com/Zefau/ioBroker.plex） （与Tautulli集成一起提供）__！[＃f03c15](https://placehold.it/15/f03c15/000000?text=+)

![安装数量](http://iobroker.live/badges/tautulli-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.tautulli.svg)
![特拉维斯CI](https://travis-ci.org/Zefau/ioBroker.tautulli.svg?branch=master)
![下载](https://img.shields.io/npm/dm/iobroker.tautulli.svg)
![NPM](https://nodei.co/npm/iobroker.tautulli.png?downloads=true)

___

![商标](https://raw.githubusercontent.com/Zefau/ioBroker.tautulli/master/admin/tautulli.jpeg)

＃ioBroker.tautulli[Tautulli是第三方应用程序](https://tautulli.com/#about)您可以与Plex Media Server一起运行以监控活动并跟踪各种统计信息。最重要的是，这些统计数据包括观看内容，观看内容，观看时间和地点以及观看方式。所有统计信息都显示在一个漂亮而干净的界面中，其中包含许多表格和图形，这使得您可以轻松地向其他人吹嘘您的服务器。
此适配器连接到[Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md)，并且还从Tautulli和Plex接收webhook事件（后者需要Plex Pass）。

**目录**

1.安装说明
   1. API设置
2. tbd
3.更改日志
4.许可证

##安装说明
如果您有兴趣，请查看[Tautulli预览]（https://tautulli.com/#preview）和[安装在您首选的系统上](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation)。

### API设置
安装Tautulli后，从Tautulli仪表板打开_Settings_页面并导航到_Web Interface_。向下滚动到_API_部分，确保选中```Enable API```。复制```API key```并在ioBroker.tautulli设置中输入。此外，添加Tautulli IP地址和端口以允许API通信。

## Changelog

### 0.2.0 (2019-02-01)
* (zefau) added support for Compact Mode
* (zefau) added support for gulp

### 0.1.0 (2019-01-03)
* (zefau) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.