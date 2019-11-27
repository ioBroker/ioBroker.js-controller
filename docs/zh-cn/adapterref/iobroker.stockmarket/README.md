---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.stockmarket/README.md
title: ioBroker.stockmarket
hash: xWJJynnsydVfVGFj/C4zT8ffzjIIGiWDYjb9wRP2XAk=
---
![商标](../../../en/adapterref/iobroker.stockmarket/admin/stockmarket.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.stockmarket.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.stockmarket.svg)
![依赖状态](https://img.shields.io/david/waoler/iobroker.stockmarket.svg)
![已知漏洞](https://snyk.io/test/github/waoler/ioBroker.stockmarket/badge.svg)
![NPM](https://nodei.co/npm/iobroker.stockmarket.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/waoler/ioBroker.stockmarket/master.svg)

＃ioBroker.stockmarket
## IoBroker的股票市场适配器
该ioBroker适配器将ioBroker中的股票市场整合在一起。您可以选择要观看的股票。

###配置
1.从https://www.alphavantage.co/support/#api-key获取自己的API密钥
2.将生成的密钥放在适配器配置中
3.在适配器配置中插入所需的股票符号（逗号分隔）
4.（可选）要查找所需的股票符号，可以使用以下URL进行检查：https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=STOCKNAME&apikey=YOUR_API_KEY

将STOCKNAME替换为您要搜索的股票，并将YOUR_API_KEY替换为您的Api键：)然后使用找到您的股票，并为适配器配置使用显示的SYMBOL。

5.保存设置

如果愿意，您可以更改计划设置（默认每15分钟更改一次）。

## Changelog

### 0.0.2
* (waoler) fixed error handling
* (waoler) fixed "instance already running "-Error

### 0.0.1
* (waoler) initial release

## License
MIT License

Copyright (c) 2019 waoler <waoler@web.de>

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