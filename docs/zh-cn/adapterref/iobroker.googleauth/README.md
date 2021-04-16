---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.googleauth/README.md
title: ioBroker.googleauth
hash: 1wMF7cNxCw6XrKvVD8nwrm18lNz4siJe1LV1GJJUBAc=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.googleauth.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.googleauth.svg)
![编码徽章](https://api.codacy.com/project/badge/Grade/9c7ca543cf1b48a8837cc14adb50a264)
![NPM](https://nodei.co/npm/iobroker.googleauth.png?downloads=true)

<img src="admin/logo-google.svg" alt="商标" width="100" height="100">

＃ioBroker.googleauth
此适配器是[网络适配器](https://github.com/ioBroker/ioBroker.web)上的扩展。它使您可以使用自己的Google帐户登录。
要使用适当的“使用Google登录”按钮扩展登录页面，请使用Web扩展适配器[网络登录](https://github.com/Vertumnus/ioBroker.weblogin)。

当然，该扩展仅在您已在ioBroker Web服务器上激活了身份验证的情况下才有用。

＃＃ 配置
### Google API
首先，您需要在[Google Developers Console](https://console.developers.google.com/)中创建一个应用程序。
这样，您将获得一个* client id *和一个* client secret *，这需要使Google登录功能正常工作。
您可以在Google Developers Page上找到[指导](https://developers.google.com/identity/protocols/oauth2/web-server)。
但是，在这里您可以得到简短的指导：

1.打开[Google Developers Console]（https://console.developers.google.com/）（如果需要，请使用您的Google帐户登录）
2.选择您喜欢的项目或创建一个新项目
3.转到“凭证”页面
4.点击“创建凭据> OAuth客户端ID” **
5.选择“ Web应用程序”应用程序类型
6.为您的应用程序命名（例如ioBroker）
7.指定授权的重定向URI

   *您需要使用的协议（http或https）
   *您的主机名（例如iobroker.example.com）
   *您使用的端口（例如8090）
   *和固定路线/ login / google / cb

     >完整示例：_https：//iobroker.example.com：8090 / login / google / cb_

创建应用程序后，您将获得下一步需要的* client id *和* client secret *。

> __授权重定向URI的提示__>>您可以使用多个重定向URI。唯一相同的是固定的路由/ login / google / cb。
>也可以使用localhost。您可以将其用于本地系统上的测试目的。
>但通常，您需要一个具有顶级域的主机名（例如.com或.org），因此您需要为网络中的ioBroker服务器配置合适的名称，例如：iobroker.mynetwork.net。

＃＃＃ 适配器
您必须填写三个字段。

__扩展的网络适配器__

在这里，您可以选择要通过Google身份验证扩展的Web适配器的实例。
默认值为所有实例。

__客户ID__

在此字段中，您必须从上一步中创建的应用程序中指定* client id *。

__客户秘密__

在此字段中，您必须从应用程序中指定*“客户机密”。

＃＃ 用法
为了以有意义的方式使用此扩展，建议也使用[网络登录适配器](https://github.com/Vertumnus/ioBroker.weblogin)。
如果进行了相应的配置，它会在Web服务器的登录页面上提供一个名为**首次使用帐户登录**和**使用Google登录**按钮的复选框。

>否则，您必须自己管理它才能使Google身份验证起作用。

如果您是第一次使用Google帐户登录，则必须选中“首次”复选框，并且必须指定*用户名*和*密码*。要将您的Google帐户与ioBroker中的用户个人资料相关联，这是必要的。您必须按下“使用Google登录”按钮，而不是“登录”按钮。

首次登录后，您只需再按一下“使用Google登录”按钮，便可以进行进一步的登录。

>如果您当前尚未登录Google帐户，则会将您重定向到Google进行登录。

## License
MIT License

Copyright (c) 2021 [Armin Junge](mailto:armin.junge.81@gmail.com)

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