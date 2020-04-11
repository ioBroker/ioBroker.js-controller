---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.binance/README.md
title: ioBroker.binance
hash: dPWsMLNDNpUqbYRpdvoJlMZroTgWgY4ADFWZXh9fyFA=
---
![商标](../../../en/adapterref/iobroker.binance/admin/binance.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.binance.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.binance.svg)
![安装数量（最新）](http://iobroker.live/badges/binance-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/binance-stable.svg)
![依赖状态](https://img.shields.io/david/Kartax/iobroker.binance.svg)
![已知漏洞](https://snyk.io/test/github/Kartax/ioBroker.binance/badge.svg)
![NPM](https://nodei.co/npm/iobroker.binance.png?downloads=true)

＃ioBroker.binance
＃＃ 介绍
与加密货币交易平台币安通信的适配器

适配器在配置的更新间隔中拉动货币价格。
如果您配置了API密钥和相应的机密，它也会提取帐户余额。
您可以在binance.com上创建一个API密钥-我建议将其限制为“只读”。

![screenshot-1]（screenshot-1.png）！[screenshot-2](../../../en/adapterref/iobroker.binance/screenshot-2.png)

## Changelog
### 1.0.4
- npmjs repackage
### 1.0.3
- enrypted storage of apiKeySecret
### 1.0.2
- added translations
- additonal timeout options
- Travis CI
### 1.0.1
- some loggin cleanup
- adjusted documentation
### 1.0.0
- first fully functional release (polling of prices and account balances)
- introduces cropty-js to accomplish binance quthentication requirements
- moved from type schedule to daemon with setTimeout

## License
MIT License

Copyright (c) 2020 Kartax

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