---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/iobroker-community-adapters/ioBroker.openhab/edit/master//README.md
title: OpenHAB
hash: 4ZdWn3iLr1RFw/oEu2l/uV8zXKJDY0DUGjmY+Mg2noo=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: 将ioBroker与OpenHAB连接
keywords: openhab
readme: https://github.com/iobroker-community-adapters/ioBroker.openhab/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2017-05-09T21:14:27.652Z
version: 1.1.0
BADGE-安装数量: http://iobroker.live/badges/openhab-stable.svg
---
＃已移至https://github.com/iobroker-community-adapters/ioBroker.openhab
![商标](zh-cn/adapterref/iobroker.openhab/../../../en/adapterref/iobroker.openhab/admin/openhab.png)

＃ioBroker.openhab =================
此适配器将ioBroker与[openhab](http://openhab.org/)连接。

它从openhab导出设备和组，然后监视变量的更新。

＃＃ 去做
 - 新设备检测到同义而不重启适配器？
 - 目前只有项目查看/可切换，也可以阅读“事物”
 - 从OpenHab中删除的项目不会在ioBroker中消失

## Changelog
### 1.1.0 (2019.02.12)
* (Schluesselmeister) Add first support for new OH type definition

### 1.0.0 (2018.12.29)
* (Schluesselmeister) New type quantity was added

### 0.3.0 (2018.08.12)
* (Schluesselmeister) Many fixes
* (bluefox) Admin3

### 0.2.1 (2017.11.30)
* (bluefox) Fix decimal types

### 0.2.0 (2017.10.14)
* (bluefox) Fix small error by the connection closing

### 0.1.5 (2017.08.15)
* (bluefox) changed the value types for openHAB

### 0.1.4 (2017.07.16)
* (bluefox) allow control of dimmer

### 0.1.3 (2017.05.22)
* (bluefox) change settings

### 0.1.0 (2017.05.09)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2018 bluefox <dogafox@gmail.com>

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