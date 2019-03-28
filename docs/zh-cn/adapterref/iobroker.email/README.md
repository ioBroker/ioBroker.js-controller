---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.email/README.md
title: ioBroker电子邮件
hash: Up9QORNYs5evvk3H0uVAADU/hy0TdlwMx1YfRNKIug0=
---
![商标](../../../en/adapterref/iobroker.email/admin/email.png)

![安装数量](http://iobroker.live/badges/email-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.email.svg)
![下载](https://img.shields.io/npm/dm/iobroker.email.svg)
![NPM](https://nodei.co/npm/iobroker.email.png?downloads=true)

#ioBroker电子邮件
从ioBroker发送电子邮件。

整个工作使得[nodemailer](https://github.com/nodemailer/nodemailer)和ioBroker只使用它。

**此适配器需要nodejs 6.x或更高版本!! **

要使用Gmail，您可能需要在Gmail帐户中配置“允许安全性较低的应用”，除非您使用的是2FA，在这种情况下您必须创建应用专用密码。您还可能需要通过“允许访问您的Google帐户”来解锁您的帐户才能使用SMTP。

##用法
要从ScriptEngine发送电子邮件，只需写：

```
// send email to all instances of email adapter
sendTo("email", "Email body");

// send email to specific instance of email adapter
sendTo("email.1", "Email body");

// To specify subject or other options
sendTo("email", {
    from:    "iobroker@mydomain.com",
    to:      "aabbcc@gmail.com",
    subject: "Message from ioBroker",
    text:    "This is test email to you!"
});

// To send attachments
sendTo("email", {
    attachments: [
       // use file on disk as attachment
       {path: "/pathToImage/picture1.jpg"},
       {   // use URL as an attachment
            filename: 'license.txt',
            path: 'https://raw.github.com/andris9/Nodemailer/master/LICENSE'
       }
    ]
});

// To send in html format
sendTo("email", {
    html: "<p>Embedded image: <img src='cid:image1'/></p>",
    attachments:[
        {path: "path/to/file/image1.jpg", cid: "image1"}
    ]
});
```

要从其他适配器发送电子邮件，请使用** adapter.sendTo **函数。

##支持的服务
 -  1und1
 - 美国在线
 -  DebugMail.io
 -  DynectEmail
 -  FastMail
 -  GandiMail
 -  Gmail
- 去吧爸爸
 -  GodaddyAsia
 -  GodaddyEurope
 -  hot.ee
 -  Hotmail
 -  iCloud
 -  ith
 -  mail.ee
 -  Mail.ru
 -  Mailgun
 -  Mailjet
 -  Mandrill
 -  Naver
 -  Office365
 -  OpenMailBox
 - 邮戳
 -  QQ
 -  QQex
 -  SendCloud
 -  SendGrid
 -  SES
 -  SES-US-EAST-1
 -  SES-US-WEST-2
 -  SES-EU-WEST-1
 -  Sparkpost
 - 雅虎
 -  Yandex
 -  Zoho
 - 特定于用户（手动定义服务器，端口和安全性）

对于其他服务，请参阅** Nodemailer **的文档：`§§LLLLL_0§§`

## Changelog
### 1.0.4 (2018-03-26)
* (skraw.iobroker) Add ith

### 1.0.3 (2018-03-04)
* (bluefox) fix blockly
* (bluefox) Admin3 ready

### 1.0.2 (2017-01-31)
* (instalator) fix translations

### 1.0.1 (2016-12-20)
* (bluefox) add Office365

### 1.0.0 (2016-10-12)
* (bluefox) support of blockly

### 0.2.1 (2016-09-03)
* (bluefox) fix sending emails after first one

### 0.2.0 (2016-08-29)
* (bluefox) filter out double messages
* (bluefox) use new nodemailer packet

### 0.1.2 (2015-04-30)
* (bluefox) fix settings if "user defined" was selected

### 0.1.1 (2015-04-28)
* (bluefox) update configuration page and decode errors

### 0.1.0 (2015-01-02)
* (bluefox) prepare npm

### 0.0.4 (2014-11-2)
(bluefox) support of new naming concept

### 0.0.3 (2014-10-09)
* (bluefox) support of daemon mode
* (bluefox) add Gruntfile.js

## License

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox

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