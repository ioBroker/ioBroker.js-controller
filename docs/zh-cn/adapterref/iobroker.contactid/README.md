---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.contactid/README.md
title: ioBroker.contactid
hash: oBxuLRhlt78n2XXNk74mEFQfg20OY49N3c+cguw4iq4=
---
![商标](../../../en/adapterref/iobroker.contactid/admin/contactid.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.contactid.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.contactid.svg)
![安装数量（最新）](http://iobroker.live/badges/contactid-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/contactid-stable.svg)
![依赖状态](https://img.shields.io/david/schmupu/iobroker.contactid.svg)
![已知漏洞](https://snyk.io/test/github/schmupu/ioBroker.contactid/badge.svg)
![NPM](https://nodei.co/npm/iobroker.contactid.png?downloads=true)

＃ioBroker.contactid
**测试：**![测试与发布](https://github.com/schmupu/ioBroker.contactid/workflows/Test%20and%20Release/badge.svg)

警报系统用于与中心站进行通信的协议联系人ID。

此适配器是联系人ID服务器。触发警报事件后，警报系统会通过IP将联系ID消息发送到中心站。
您可以将ioBroker与该适配器一起用作中央站。例如。您可以通过Conntact ID向电报消息发送警报。

联系人ID消息

  SSSS 18QEEEGGZZZC

  * SSSS –订户。这四个数字标识中心站的特定警报系统或客户。 ioBroker允许更长的订户名称。

  * 18-消息类型。基本上，此字段应始终为“ 18”。
  * Q –活动预选赛。
  * EEE-事件代码。
  * GG –组/分区号。
  * ZZZ-区域编号（001-999）。这是触发警报的区域的编号。
  * C –校验和。

[联系人ID协议](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

##安装与配置
1.安装适配器
2.适配器的配置：

选择IP地址和端口以侦听Conctact-ID请求。
注册您的用户名称，以识别防盗警报消息并选择防盗警报类型。

3.配置您的防盗系统以发送联系人ID消息

    狼疮XT1：

Einstellungen->联系人ID：rptn：// subcriber @ ip-address-iobroker：port示例：rptn：//test@192.168.20.1：50000

    Lupusec XT1 + / XT2 / XT2 + / XT3：

Einstellungen->联系人ID：ip：// subcriber @ ip-address-iobroker：port / CID示例：ip：//test@192.168.20.1：50000 / CID

4.测试Adpater

  打开命令外壳并键入

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

现在，您可以发送一个Conntact ID消息。对于Lupsec防盗警报系统，该消息以[和]开头和结尾。输入您的telnet会话：

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

  现在您可以在ioBroker对象中看到消息

## Changelog

### 1.0.2 (2020.12.13)
* (Stübi) Bugfixing, ACK-invalid Format - Issue #14 

### 1.0.1 (2019.10.14)
* (Stübi) Bugfixing, Issue #9

## License
MIT License

Copyright (c) 2020 Thorsten Stueben <thorsten@stueben.de>

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