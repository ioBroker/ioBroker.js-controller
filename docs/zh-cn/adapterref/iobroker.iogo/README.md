---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iogo/README.md
title: ioBroker.iogo
hash: aBmdaoGWO2ljGVbWQt5RUSWTCet+PJRr64BvVyuYySg=
---
![商标](../../../en/adapterref/iobroker.iogo/admin/iogo.png)

![安装数量](http://iobroker.live/badges/iogo-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.iogo.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.iogo.svg)
![特拉维斯](http://img.shields.io/travis/nisiode/ioBroker.iogo/master.svg)
![NPM](https://nodei.co/npm/iobroker.iogo.png?downloads=true)

＃ioBroker.iogo
=================

此适配器为ioGo https://play.google.com/store/apps/details?id=de.nisnagel.iogo智能家居应用程序增加了额外的功能。
请访问www.iogo.app以获取有关如何入门的更多信息。

##配置
您需要有效的许可证密钥才能使用此适配器。
在https://www.iogo.app创建帐户后，可以购买许可证。

请在实例配置中输入您的帐户信息（电子邮件/密码）。

##用法
您可以通过messageBox```sendTo('iogo', 'New message')```向所有经过身份验证的用户或特定用户§§JJJJJ_1_1§§发送消息。
必须先创建用户（请阅读应用程序文档以获取更多详细信息）。

可以指定多个收件人（只需用逗号分隔用户名）。例如：收件人：“ User1，User4，User5”

示例如何使用javascript发送通知定制消息：

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

还有一个例子：

![块状](../../../en/adapterref/iobroker.iogo/img/blockly.png)

还支持回调：

```
sendTo('iogo', {title: 'News', text: 'New message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

只需将路径发送到图像而不是文本即可，或使用url属性```sendTo('iogo.0', 'absolute/path/file.png')```

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

**可能的选项**：

-*用户*：单个用户或用户列表
-*文本*：消息本身
-* title *：通知的标题
-* url *：图片的绝对路径

## Changelog

### 0.5.x
* (nisio) Changes for ioGo app version 2.1.0+ (older versions no longer supported)
* (nisio) Split main.js into several files

### 0.4.x
* (nisio) Changes for ioGo app version 2.0.0+ (older versions no longer supported)

### 0.3.x
* (nisio) added support of compact mode
* (nisio) added support node 12

### 0.2.x
* (nisio) added pro features

### 0.1.x
* (nisio) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 - 2019 Nis Nagel <support@nisnagel.de>

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