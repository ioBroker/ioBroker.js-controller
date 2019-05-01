---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iqontrol/README.md
title: 无题
hash: xijUS6BbpAAnc+2Vym97gcsN4+HERo6RkUFHbVMvJRg=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![依赖状态](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![已知的漏洞](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

<h1><img src="admin/iqontrol.png" width="64"/> ioBroker.iqontrol </h1>

适用于ioBroker的## iqontrol适配器
用于可视化的快速Web应用程序。

![例](img/screenshot1.jpg)![例](../../../en/adapterref/iobroker.iqontrol/img/screenshot2.jpg)

在任何浏览器中运行。
您可以将其保存为iOS-Homescreen上的Web应用程序，它看起来和感觉就像一个nativ应用程序。
它完全可定制。

＃＃ 如何使用
*开始创建视图。

您可以将视图视为类似页面的内容。

*然后在这些视图上创建设备。

设备有一个角色，它决定了设备的功能，使用了哪些图标等等。
根据该角色，您可以将多个状态链接到设备。这些将为设备提供其功能。
如果选择“链接到其他视图”作为角色，则可以创建指向其他视图的链接。我建议将链接映射到具有相同背景的其他视图，链接视图具有。
您还可以尝试使用Autocreate-Function从iobroker-object-tree中选择现有设备。 Autocreate尝试找出角色并尽可能多地匹配状态。

*之后您可以创建一个工具栏，它显示为页脚。

Toolbar-Entrys是视图的链接。
第一个工具栏条目将是您的“主视图”，将在开始时加载。

*为了给所有东西增添一种奇特的风格，你可以上传你自己的图像。

您可以将图像用作视图或设备的背景图像。
免费的内置演示壁纸来自www.pexels.com。

##知道问题
这是第一个alpha-Release，因此可能存在很多错误。但对我来说它完全稳定。
但是有一些限制：

 - 上传图像（作为背景图像或用于蒙皮设备按钮）有效，但重命名和删除不起作用
 - 创建和删除子目录也不起作用。

您可以在iobroker / iobroker-data / files / iqontrol / userimages下通过ftp手动执行这些操作

请随时发表评论，让我知道，如何解决这些问题！

访问[iobroker论坛](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol)。

## Changelog

### 0.0.10
* (Sebastian Bormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (Sebastian Bormann) "Philips HUE added to autocreate (colortemp is not working yet!).  
* (Sebastian Bormann) LinkedView now also works on windows, doors and fire-sensor.
* (Sebastian Bormann) Added translation (thanks ldittmar!).

### 0.0.8
* (Sebastian Bormann) Added icons to image selectboxes.

### 0.0.7
* (Sebastian Bormann) Changed order of tabs
* (Sebastian Bormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (Sebastian Bormann) Improved speed of select id and autocreate
* (Sebastian Bormann) Set filter to channel on autocreate

### 0.0.5
* (Sebastian Bormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (Sebastian Bormann) Bugfix: copy device created just a reference to old object
* (Sebastian Bormann) Addes Toolbar-Icons

### 0.0.3
* (Sebastian Bormann) various bugfixes

### 0.0.2
* (Sebastian Bormann) first partly running version

### 0.0.1
* (Sebastian Bormann) initial release

## License
MIT License

Copyright (c) 2019 Sebastian Bormann

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