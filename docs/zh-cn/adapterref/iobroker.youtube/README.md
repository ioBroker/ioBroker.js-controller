---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.youtube/README.md
title: ioBroker.youtube
hash: odZi6WpqavriGlgD83pHDdtlCzP/e2UxBCr1NMmBGpo=
---
![商标](../../../en/adapterref/iobroker.youtube/admin/youtube.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.youtube.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.youtube.svg)
![稳定](http://iobroker.live/badges/youtube-stable.svg)
![已安装](http://iobroker.live/badges/youtube-installed.svg)
![依赖状态](https://img.shields.io/david/klein0r/iobroker.youtube.svg)
![已知漏洞](https://snyk.io/test/github/klein0r/ioBroker.youtube/badge.svg)
![建立状态](http://img.shields.io/travis/klein0r/ioBroker.youtube.svg)
![NPM](https://nodei.co/npm/iobroker.youtube.png?downloads=true)

＃ioBroker.youtube
将频道统计信息（例如观看次数，订阅者和最新视频）添加到ioBroker。使用此解决方案，您可以跟踪频道的增长或将您的价值与其他YouTubers进行比较。

由于所有这些信息都是公开可用的，因此您也可以使用此适配器来关注自己喜欢的YouTuber并通知您（例如，何时有新视频可用）。您只需要一个API密钥即可访问这些信息。有关详细信息，请参见“配置”部分。

##配置
要获取API密钥，您必须转到[console.developers.google.com](https://console.developers.google.com/apis/dashboard)。

1.创建一个新项目
2.创建一个新的API密钥
3.添加库的“ YouTube Data API v3”
4.在选项面板中使用该API密钥

## Changelog

### 0.0.2

* (klein0r) improved error handling

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2019 Matthias Kleine <info@haus-automatisierung.com>

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