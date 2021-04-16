---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weblogin/README.md
title: ioBroker.weblogin
hash: I98oTzc18MVOyi5a4EIXQVplwWgB9HoaxPgmU/KEY9E=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.weblogin.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.weblogin.svg)
![编码徽章](https://app.codacy.com/project/badge/Grade/d2ff17f2787d4ad4ba0b5d8ad29504ba)
![NPM](https://nodei.co/npm/iobroker.weblogin.png?downloads=true)

<img src="admin/logo-login.png" alt="商标" width="100" height="100">

＃ioBroker.weblogin
此适配器是[网络适配器](https://github.com/ioBroker/ioBroker.web)上的扩展。
它通过其他登录方式（社交媒体登录）增强了登录页面。
当前，它仅支持[Google认证](https://github.com/Vertumnus/ioBroker.googleauth)。

当然，该扩展仅在您已在ioBroker Web服务器上激活了身份验证的情况下才有用。

＃＃ 配置
###扩展Web适配器
在这里，您可以选择要通过此适配器扩展的Web适配器的实例。
默认值为所有实例。

###显示首次登录复选框
如果需要登录页面上的首次登录复选框，请激活此复选框。
通常，这需要将您选择的社交媒体帐户与ioBroker中的用户个人资料相关联。
默认情况下，它被选中。

＃＃＃ 谷歌
当前仅支持替代登录方式。如果选中，登录页面将显示“使用Google登录”按钮。
这种可能性需要首次登录复选框。由于其唯一性，默认情况下将其选中。

＃＃ 用法
如果已安装并配置了此适配器，则Web登录页面将显示其他元素。
根据配置，它会显示“首次登录”复选框，并显示您选择的社交媒体登录名的登录按钮。

![登录页面](../../../en/adapterref/iobroker.weblogin/doc/login-page.jpg)

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