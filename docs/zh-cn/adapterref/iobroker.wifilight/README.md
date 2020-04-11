---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wifilight/README.md
title: ioBroker.wifilight
hash: h3yqoVsmU/F7BiffThXvqiZH/tuN6ByBLAJZL5cSJ4Y=
---
![商标](../../../en/adapterref/iobroker.wifilight/admin/wifilight.png)

![安装数量](http://iobroker.live/badges/wifilight-community-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.wifilight.svg)
![测验](http://img.shields.io/travis/soef/ioBroker.wifilight/master.svg)
![建造状态](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

＃ioBroker.wifilight
##说明
ioBroker WiFi适配器

##信息
支持LW12，LD382和LD382A。
添加了对Mi-Light / LimitlessLED RGBW的支持。

##初始创建
该适配器最初是由@soef在https://github.com/soef/ioBroker.wifilight创建的，但不再进行维护，因此我们将其移至iobroker-community，以便可以修复错误。感谢@soef的工作。

###如何使用命令状态：
+可能的标识符为：``red, r, green, g, blue, b, bri, sat, transition, on, off``+字符串可以是带或不带括号的JSON。
+您也可以通过=分配一个值+颜色范围：```0..255```+ bri范围：``0..100``

一些例子：

```
r = 100; g = 250, b = 100
r: 0, g: 0, b = 255
red: 200, green: 0, blue: 0
{r:100, b: 200, transition: 20}
off
on
{on:0}
```

要更改颜色，您不必全部使用三种颜色。
例如，§§JJJJJ_0_0§§，蓝色和绿色将保持不变。

### R，g，b，w状态：
+值0..255 + \ #rrggbb [ww]

##安装
使用iobroker中的“适配器”面板添加实例。

如果不存在，请在iobroker根目录（例如/ opt / iobroker）中执行以下命令。

```
npm install iobroker.wifilight
```

###错误修复
如果无法正常工作，请尝试安装soef npm软件包

```
cd /opt/iobroker/node_modules/iobroker.wifilight
sudo npm install soef
```

## Changelog
### 1.1.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

### 1.0.0 (2019-10-18)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2019-2020 soef <soef@gmx.net>

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