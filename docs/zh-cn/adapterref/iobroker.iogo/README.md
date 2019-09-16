---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iogo/README.md
title: ioBroker.iogo
hash: 0xTE+p6KLGSVY0lkRWtH9z6KzXj+kkKOra/1nMNgTNE=
---
![商标](../../../en/adapterref/iobroker.iogo/admin/iogo.png)

![安装数量](http://iobroker.live/badges/iogo-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.iogo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iogo.svg)
![特拉维斯-CI](http://img.shields.io/travis/nisiode/ioBroker.iogo/master.svg)
![NPM](https://nodei.co/npm/iobroker.iogo.png?downloads=true)

＃ioBroker.iogo
=================

此适配器正在向智能家居应用程序ioGo https://play.google.com/store/apps/details?id=de.nisnagel.iogo添加额外功能。
有关如何入门的更多信息，请访问iogo.nisnagel.de。

##配置
您需要有效的许可证密钥才能使用此适配器。
在https://iogo.nisnagel.de创建公告后可以购买许可证。

请在实例配置中输入您的帐户信息（电子邮件/密码）。

##用法
您可以通过messageBox```sendTo('iogo', 'New message')```或特定用户```sendTo('iogo', {user: 'Username', text: 'Test message'})```向所有经过身份验证的用户发送消息。
必须先创建用户（请阅读应用程序文档以获取更多详细信息）。

可以指定多个收件人（只需用逗号分隔用户名）。例如：收件人：“User1，User4，User5”

示例如何使用javascript发送通知自定义消息：

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

还有一个例子：

![blockly](../../../en/adapterref/iobroker.iogo/img/blockly.png)

支持回调以及：

```
sendTo('iogo', {title: 'News', text: 'New message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

只需将路径发送到您的图像而不是文本或使用url属性```sendTo('iogo.0', 'absolute/path/file.png')```

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

**可能的选择**：

 - *user* 单个用户或用户列表
 - *text* 消息本身
 - *title* 通知的标题
 - *url* 图像的绝对路径

## Changelog

### 0.4.0
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