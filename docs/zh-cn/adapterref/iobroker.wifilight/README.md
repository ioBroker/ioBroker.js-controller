---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wifilight/README.md
title: 无题
hash: iX5EastiflUGn7bjJvK4dyhqcdmfFAK23YDKRt3LuDc=
---
![商标](../../../en/adapterref/iobroker.wifilight/admin/wifilight.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.wifilight.svg)
![测试](http://img.shields.io/travis/soef/ioBroker.wifilight/master.svg)
![建立状态](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

#### IoBroker.wifilight
####说明
适用于WiFi Light的ioBroker适配器

####信息
支持LW12，LD382和LD382A。
增加了对Mi-Light / LimitlessLED RGBW的支持。

######如何使用命令状态：
+可能的标识符是：``red, r, green, g, blue, b, bri, sat, transition, on, off``+字符串可以是带或不带括号的JSON。
+您还可以通过= +颜色范围指定值：```0..255```+ bri范围：``0..100``

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

要更改颜色，您不必使用所有三个vallues。
例如，``` red = 0 ```，蓝色和绿色将保持不变。

###### R，g，b，w国家：
+值0..255 + \ #rrggbb [ww]

####安装
在iobroker根目录中执行以下命令（例如在/ opt / iobroker中）

```
npm install iobroker.wifilight
```

<!--

## License
The MIT License (MIT)

Copyright (c) 2016 soef <soef@gmx.net>

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
-->