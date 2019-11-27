---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bsblan/README.md
title: ioBroker.bsblan
hash: 9xmWWEjt1WlHXzCcxSovGCp40pOQ9NHKlrzoOme765A=
---
![商标](../../../en/adapterref/iobroker.bsblan/admin/bsblan.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.bsblan.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.bsblan.svg)
![依赖状态](https://img.shields.io/david/hacki11/iobroker.bsblan.svg)
![已知漏洞](https://snyk.io/test/github/hacki11/ioBroker.bsblan/badge.svg)
![NPM](https://nodei.co/npm/iobroker.bsblan.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/hacki11/ioBroker.bsblan/master.svg)

＃ioBroker.bsblan
## IoBroker的bsb_lan适配器
该适配器将[BSB_LAN接口](https://github.com/fredlcore/bsb_lan)连接到ioBroker。
BSB_LAN接口将BSB（锅炉系统总线）带到LAN。该适配器将其连接到ioBroker。

[BSB_LAN接口用户手册](https://github.com/1coderookie/BSB-LPB-LAN)

##支持的设备
-兼容BSB / LPB的设备（例如Brötje，Elco，MHG，Fujitsu）
-有关详情，请参见：[支持的设备]（https://github.com/1coderookie/BSB-LPB-LAN）

##用法
-BSB_LAN接口已启动并正在运行
-安装适配器
- 配置
    -IP
    -用户和密码（如果激活了基本身份验证）
    -轮询间隔（以秒为单位）（最小值为10）
    -应该轮询的ID（以逗号或换行符分隔，有关可用ID，请参见BSB_LAN的Web界面）

##局限性
-TODO：允许对ID进行写访问

##学分
-由[Freepik]（https://www.freepik.com/home）从www.flaticon.com制作的图标

## Changelog
### 0.0.3
* dynamically create states
* IDs without whitespaces
* add textarea for configuration

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2019 hacki11 <jur.schmid@gmail.com>

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