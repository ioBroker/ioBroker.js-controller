---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weishaupt-wem/README.md
title: ioBroker.weishaupt-wem
hash: IqsQ4zF7LaGFo0WfA5V2IAz+kcKBdv+18rWMpdTAdKk=
---
![商标](../../../en/adapterref/iobroker.weishaupt-wem/admin/weishaupt-wem.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.weishaupt-wem.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.weishaupt-wem.svg)
![依赖状态](https://img.shields.io/david/ta2k/iobroker.weishaupt-wem.svg)
![已知漏洞](https://snyk.io/test/github/ta2k/ioBroker.weishaupt-wem/badge.svg)
![NPM](https://nodei.co/npm/iobroker.weishaupt-wem.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/ta2k/ioBroker.weishaupt-wem/master.svg)

＃ioBroker.weishaupt-wem
## Weishaupt-wem ioBroker适配器
weishaupt WEM门户适配器

##自定义Befehl
请自定义URL和eww的自定义Befehlbenötigst。
在WEM门户网站中添加URL选项，然后在Chrome浏览器中添加元素，然后在STRG + F服务器中添加元素名称=“ RDWWriteParameter”，并在URL中添加URL。
Fürden Werte nach <选择价值和价值的Werperen und als州的Wert eintragen。
z.B.：https://www.wemportal.com/Web/UControls...，208557

## Changelog

### 0.0.5

* (ta2k) fix remote for WWP

### 0.0.4

* (ta2k) remove spaces in ids

### 0.0.3

* (ta2k) Fix remote control

### 0.0.2

* (ta2k) Möglichkeit Parameter zu ändern
* Nummerische Werte als Zahlen in ioBroker geschrieben

### 0.0.1

* (ta2k) initial release

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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