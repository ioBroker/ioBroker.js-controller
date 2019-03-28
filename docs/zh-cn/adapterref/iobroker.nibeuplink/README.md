---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nibeuplink/README.md
title: ioBroker.nibeuplink
hash: 4PF8iWYeBdP1zNnMEqZ9mpBA5xjpHTgjGpENlqW246o=
---
![安装数量](http://iobroker.live/badges/nibeuplink-installed.svg)
![稳定的版本](http://iobroker.live/badges/nibeuplink-stable.svg)

＃ioBroker.nibeuplink
该ioBroker适配器从Nibe Uplink接收来自Nibe热泵的数据。

##使用此适配器
你需要一个Nibe热泵 - 再见一个，如果你没有;-)
2.您需要Nibe Uplink的帐户：https：//www.nibeuplink.com/
3.登录后，您可以使用以下格式的URL：https：//www.nibeuplink.com/System/XXXXX/Status/Overview
而不是XXXXX有一个数字。这是您的系统ID。我们需要这个ID。
5.转到Nibe Uplink Api：https：//api.nibeuplink.com/Account/LogIn并登录
6.单击“我的应用程序”，然后单击“创建应用程序”
7.填写：名称和描述可以是一切，例如ioBroker
8.回调URL非常重要。您可以使用https://z0mt3c.github.io/nibe.html
9.接受NIBE Uplink API服务协议，然后单击“创建应用程序”
10.然后你得到一个标识符和一个秘密 - 我们需要它们
11.在ioBroker中安装此适配器
12.在适配器设置页面填写标识符和密码。
13.单击“单击此处以在NIBE上行链路上生成验证码”链接。
14.按照说明操作。最后，你得到你的nibe-fetcher代码
15.复制此代码并将其粘贴到“Auth Code”的适配器设置中。
16.从Nibe上传链接URL填写您的系统ID。
17.选择你的语言。
18.单击“保存并关闭”

如果您（稍后）在日志中收到“400错误请求”错误，您必须获得新的验证码 -  13号和15号之间的号码也是如此。

## Changelog

### 0.2.2
* Internal clean-up

### 0.2.1
* Dependencies updated
* Fix problem with nodejs 6 and the spread operator and async

### 0.2.0
* Code change to new template
* Support for Compact mode (js-Controller 2.0 Feature) added (#1)
* Translations in settings page
* Type moved from general to climate control

### 0.1.1
* Do not create deprecated sub path objects - only update them if present (if you have them and don't use them, you can delete them)
* info.connection added

### 0.1.0
* Objects tree changed: New, more readable objects added

### 0.0.2
* Language support for objects tree

### 0.0.1
* Initial release

## License
MIT License

Copyright (c) 2019 Sebastian Häßelbarth <seb@sebmail.de>

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