---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lg-ess-home/README.md
title: ioBroker.lg-ess-home
hash: 2eL0UVFcmdRSjNgOgVhDCAy9KFCsDkov29qCT4hXbg0=
---
![商标](../../../en/adapterref/iobroker.lg-ess-home/admin/lg-ess-home.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.lg-ess-home.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.lg-ess-home.svg)
![安装数量（最新）](http://iobroker.live/badges/lg-ess-home-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/lg-ess-home-stable.svg)
![依赖状态](https://img.shields.io/david/Morluktom/iobroker.lg-ess-home.svg)
![已知漏洞](https://snyk.io/test/github/Morluktom/ioBroker.lg-ess-home/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lg-ess-home.png?downloads=true)

＃ioBroker.lg-ess-home
**测试：**![测试与发布](https://github.com/Morluktom/ioBroker.lg-ess-home/workflows/Test%20and%20Release/badge.svg)

## IoBroker的LG ESS Home适配器
LG ESS混合逆变器的iobroker适配器。使用该适配器，可以读取逆变器的状态。也可以操作逆变器。

##配置
###获取密码
1.下载文件[LG_Ess_Password.exe]（https://github.com/Morluktom/ioBroker.lg-ess-home/tree/master/tools）
1.将计算机连接到LG_ESS系统的WLAN。 （WLAN密码在铭牌上）
1.启动LG_Ess_Password.exe（至少需要.Net Framework 4.5）
1.记下您的密码

对于那些不喜欢exe的用户：（感谢grex1975）\，您可以使用任何REST客户端获取密码：

1.连接到LG_ESS的WLAN
1.执行GET请求\

网址：https：//192.168.23.1/v1/user/setting/read/password \标头：“字符集”：“ UTF-8”，“内容类型”：“应用程序/ json” \正文：“键”： “ lgepmsuser！@＃”

这应该为您提供密码和状态。

## Changelog

### 0.0.8 (2021-02-06)
* (Morluktom) Code cleanup

### 0.0.7 (2021-02-01)
* (Morluktom) Code cleanup

### 0.0.6 (2020-12-23)
* (Morluktom) Data type recognition fixed

### 0.0.5 (2020-12-15)
* (Morluktom) ScalingFactor moved to nativ
* password encryption => auto encryption (Maybe you have to set the password new)

### 0.0.4
* (Morluktom) W => kW, values confirmed

### 0.0.3
* (Morluktom) Structure of the channel and states changed

### 0.0.2
* (Morluktom) Separate Intervall for Common and Home

### 0.0.1
* (Morluktom) initial release

## License
MIT License

Copyright (c) 2020 - 2021 Morluktom <strassertom@gmx.de>

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