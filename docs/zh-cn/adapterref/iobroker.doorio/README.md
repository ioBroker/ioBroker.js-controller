---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.doorio/README.md
title: ioBroker.doorio
hash: QgSlf1YyUrjQa8I4DORzXon8quUpSu++TVOFiois1iY=
---
![商标](../../../en/adapterref/iobroker.doorio/admin/doorio.png)

![建立状态](https://travis-ci.org/Bettman66/ioBroker.doorio.svg?branch=master)
![NPM版本](http://img.shields.io/npm/v/iobroker.doorio.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.doorio.svg)
![NPM](https://nodei.co/npm/iobroker.doorio.png?downloads=true)

＃ioBroker.doorio
ioBroker的自制DoorStation适配器

该适配器通过tcp.socket连接到Baresip Sip客户端，以与门电话进行通信。作为响铃触发器，可以使用ioBroker的每个输入。
适配器还识别DTMF音调以切换输出。
对于自制门禁系统，可以使用可以安装Baresip的任何硬件。

Dieser Adapter verbindet sichübertcp.socket mit dem Baresip Sip客户端，um mit einerTürsprechstellezu kommunizieren。 AlsKlingelauslöserkann jeder Eingang von ioBroker genutzt werden。 Der Adapter会因DTMF-TöneumAusgängezu schalten而失效。
硬件，设备和服务的硬件供应商，德国的硬件制造商Baresip installierenlässtgenutzt werden。

##链接
* https://forum.iobroker.net/topic/23413/ich-baue-eine-t%C3%BCrsprechstelle-ohne-cloud
* https://forum.iobroker.net/topic/22746/test-adapter-doorio-v0-0-x

## Changelog

### 1.0.8
* (bettman66) fix dtmf-timeout

### 1.0.7
* (bettman66) check states

### 1.0.6
* (bettman66) clearTimeouts

### 1.0.5
* (bettman66) update stable

### 1.0.4
* (bettman66) new config

### 1.0.3
* (bettman66) update adapter-core

### 1.0.2
* (bettman66) add selectID.js

## License
The MIT License (MIT)

Copyright (c) 2020 Walter Zengel <w.zengel@gmx.de>

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