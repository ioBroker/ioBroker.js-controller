---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: mdm2mZU9PL4s5vJkKXjVZUb+DjM1kXYMMi+ZG6+0Utk=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![安装数量（最新）](http://iobroker.live/badges/sureflap-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/sureflap-stable.svg)
![依赖状态](https://img.shields.io/david/Sickboy78/iobroker.sureflap.svg)
![已知漏洞](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap/badge.svg)
![特拉维斯](http://img.shields.io/travis/Sickboy78/ioBroker.sureflap/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Sickboy78/ioBroker.sureflap?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

＃ioBroker.sureflap
## SurePetcare®的SureFlap®猫和宠物皮瓣的Adpater
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p>

＃＃ 配置
在适配器配置页面上，从您的SurePetcare®帐户添加用户名和密码。

＃＃ 描述
适配器提供有关猫瓣的设置和状态的信息。

它还显示您的宠物的位置。

###可变值
以下状态可以更改，并且分别在您的设备上生效，将反映在您的SurePetcare®应用程序中。

|州|描述|允许值|
|-------|-------------|----------------|
| Household_name.hub_name.flap_name.control.curfew |启用或禁用配置的宵禁<br>（必须通过应用程序配置宵禁）| **真**或**假** |
| Household_name.hub_name.flap_name.control.lockmode |设置锁模式| ** 0 **-打开<br>** 1 **-锁定<br>** 2 **-锁定<br>** 3 **-关闭（锁定和锁定）|
| Household_name.pets.pet_name.inside |设置您的宠物是否在里面| **真**或**假** |

＃＃＃ 结构
适配器创建以下层次结构：

适配器<br>├户名<br>│├hub_name<br> ││├led_mode<br> ││├在线<br>││└flip_name<br> ││├电池<br>││├电池百分比<br>││├宵禁<br>││├在线<br>││├控制<br>│││├宵禁<br>│││└锁定模式<br>││├宵禁<br>│││└0..i<br> │││├启用<br>│││├锁定时间<br>│││└解锁时间<br>││└last_curfew<br> ││└0..i<br> ││├已启用<br>││├锁定时间<br>││└unlock_time<br> │└宠物<br>│└pet_name<br> │├名称<br>│├里面<br>│└自<br>└信息<br>├all_devices_online<br> └连接<br>

##注意
SureFlap®和SurePetcare®是[SureFlap Ltd.](https://www.surepetcare.com/)的注册商标。

[确定Petcare®](https://www.surepetcare.com/en-us/press)免费提供了猫翻板，集线器和智能手机应用程序的图片。

## Changelog

### 1.0.4 (2021-03-07)
* (Sickboy78) added state curfew_active for pet flap devices
* (Sickboy78) fixed normalization of device names
* (Sickboy78) fixed changeable values not resetting when change fails

### 1.0.3 (2021-02-28)
* (Sickboy78) code improvements from review
* (Sickboy78) fixed timezone bug

### 1.0.2 (2021-02-25)
* (Sickboy78) fixed bug setting lockmode and inside values

### 1.0.1 (2021-02-19)
* (Sickboy78) initial release

## License

MIT License

Copyright (c) 2021 Sickboy78 <asmoday_666@gmx.de>

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