---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/soef/iobroker.find-my-iphone/edit/master//README.md
title: Find my iPhone
hash: daxyieolHhbAq9VrluwQm72qUxweTgb7gdFxgwRZXyk=
adapter: true
license: undefined
authors: soef <soef@gmx.net>
description: Find my Apple device (iPhone, iPad, iMac...)
keywords: ioBroker, Apple, iPhone, iPad, macBook, MacMini, iMac
readme: https://github.com/soef/iobroker.find-my-iphone/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-10-10T18:31:04.566Z
version: 0.2.17
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.find-my-iphone.svg
BADGE-测试: http://img.shields.io/travis/soef/ioBroker.find-my-iphone/master.svg
BADGE-执照: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
BADGE-建立状态: https://ci.appveyor.com/api/projects/status/9n5s1wgam59b4fv9?svg=true
---
![商标](zh-cn/adapterref/iobroker.find-my-iphone/../../../en/adapterref/iobroker.find-my-iphone/admin/find-my-iphone.png)


### IoBroker.find-my-iphone
####说明
ioBroker Adapter找到Apple设备

####信息
适配器尝试从适配器ioBroker.javascript读取自己的位置。如果不可用，将确定外部IP的位置。否则将采用0.0 + 0.0。使用位置zu计算到设备的距离。

####两步验证（2FA Authentisierung）
如果您使用的是“新”两步验证/身份验证，请按以下步骤操作：

 - 步骤1：使用您的用户名和密码连接适配器。
 - 第2步：确认您在其中一台设备上的注册
 - 步骤3：只需添加6位代码即可更改适配器中的密码

<br><br>感谢ThorstenVoß的[小费](https://github.com/soef/ioBroker.find-my-iphone/issues/3#issuecomment-289200613)。

＃＃＃＃ 状态
-  **刷新**： <br>

root：刷新所有设备。
在设备下：强制设备重新定位和刷新

-  **警告**： <br>

在设备上播放声音。 <br>警报状态的文本将显示在设备上。 <br>参数：[文字] <br>文字是可选的。如果给定，它将显示在设备上

- **丢失**： <br>

将设备切换到**丢失模式**。 <br> *数：usertext [;电话号码调用[;密码]]* <br>如果给出了密码参数，则将设置设备的密码（如果尚未设置）。 <br>注意：解锁设备后，可以照常使用。如果未指定密码且设备没有密码，则滑动就足以使用它。 <br>提示：也可用于防止儿童玩耍本机

- **迷失模式**： <br>

  布尔值。如果处于丢失模式，则可以将其设置为false以停止丢失模式。

- **地点**： <br>

  设备位置的地址

- **map-url** <br>

  Google mapps url与设备的位置

- **positionType** <br>

  无线| GPS

-  **不言自明**： <br>

  batteryLevel，经度，latitide，time，timeState

####安装
在iobroker根目录中执行以下命令（例如在/ opt / iobroker中）

```
npm install iobroker.find-my-iphone
```

<!--

## License
The MIT License (MIT)

Copyright (c) 2016-2017 soef <soef@gmx.net>

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