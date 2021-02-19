---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.linktap/README.md
title: ioBroker.LinkTap
hash: 16rabwK6y7zbixpvaA6iHE662ds0W55+RqO08ypi1q0=
---
![标识](../../../en/adapterref/iobroker.linktap/admin/Logo_small.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.linktap.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.linktap.svg)
![依赖状态](https://img.shields.io/david/Smart-Gang/iobroker.linktap.svg)
![测验](https://img.shields.io/travis/Smart-Gang/ioBroker.linktap.svg)
![NPM](https://nodei.co/npm/iobroker.linktap.png?downloads=true)

＃ioBroker.LinkTap
## IoBroker.linktap
使用LinkTap无线水定时器制造商控制您的花园灌溉：https://www.link-tap.com/

＃＃ 安装
是在Node.js 12下开发的。因此，建议至少使用此版本。

##设置
使用LinkTap凭据在https://www.link-tap.com/#!/api-for-developers上创建Api密钥。

请在配置中输入用户名和API密钥。
启动适配器后，将检索所有连接的网关和Taplinker。制造商允许每5分钟轮询一次所有网关和设备。适配器每小时或每次重新启动适配器时都会自动执行检索。

浇水状态检索可以基于分钟数在配置中单独设置。 LinkTap的Web服务最多可能需要一分钟才能提供更新的浇水信息。

API提供的所有灌溉功能均已实现。

重要提示：使用前，必须在应用程序中设置所需的时间表。然后可以通过适配器启用/禁用这些功能。为此，必须另外设置角色“ Argument in”的相应状态。

## Changelog

### 0.1.7
* (Smart-Gang) First public release

## License
MIT License

Copyright (c) 2021 Author <gangrulez@gmail.com>

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