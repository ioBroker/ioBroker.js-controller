---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.pushsafer/edit/master//README.md
title: pushsafer Adapter
hash: O4eLpad/kEJhALGXL2ez6WtAOW5JLcyyTlSeK9WNIf8=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>
description: This adapter allows to send pushsafer notifications from ioBroker
keywords: notification, pushsafer, message
readme: https://github.com/ioBroker/ioBroker.pushsafer/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-09-19T21:09:18.382Z
version: 0.1.8
BADGE-安装数量: http://iobroker.live/badges/pushsafer-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.pushsafer.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.pushsafer.svg
BADGE-NPM: https://nodei.co/npm/iobroker.pushsafer.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.pushsafer/../../../en/adapterref/iobroker.pushsafer/admin/pushsafer.png)


ioBroker pushsafer适配器==============

从ioBroker发送pushsafer通知。
Pushsafer.com支持iOS，Android，Windows 10（手机和桌面）设备和Webpush（Chrome和Firefox）

##配置
首先，需要一个带有[私钥](https://www.pushsafer.com/)的pushsafer帐户，而不是私钥，您还可以使用带有预定义参数的别名密钥。
![Pushsafer配置](zh-cn/adapterref/iobroker.pushsafer/../../../en/adapterref/iobroker.pushsafer/img/Screen0.png)

##用法
要从ScriptEngine发送通知，只需写：

```javascript
// send notification to all instances of pushsafer adapter
sendTo("pushsafer", "message body");

// send notification to specific instance of pushsafer adapter
sendTo("pushsafer.1", "message body");

// To specify subject or other options
sendTo("pushsafer", {
   message:   'Test text',             // mandatory - your text message
   title:     'SweetHome',             // optional  - your message's title, otherwise your app's name is used
   device:    '12',                    // optional  - a device id or device group id (empty or a = all devices)
   sound:     '2',                     // optional  - a number betwenn 0-28 (see pushsafers API description)
   icon:      '2',                     // optional  - a number betwenn 1-98 (see pushsafers API description)
   vibration: '0',                     // optional  - a number betwenn 0-3 (see pushsafers API description)
   picture:   'absolutePathToPicture'  // optional  - absolute path to picture or base64 coded image URL
   picture2:  'absolutePathToPicture2' // optional  - absolute path to picture or base64 coded image URL
   picture3:  'absolutePathToPicture3' // optional  - absolute path to picture or base64 coded image URL
   url:       'http://blabla',         // optional  - URL or URL scheme, https://www.pushsafer.com/en/url_schemes
   urlTitle:  'Link to BLA',           // optional  - title of URL
   time2live  '60',                    // optional  - Integer number 0-43200: Time in minutes, after which message automatically gets purged.
});
```

你可以找到API描述[这里](https://www.pushsafer.com/en/pushapi)

## Changelog
### 0.1.8 (2017-09-12)
* (bluefox) use new pushsafer package

### 0.1.7 (2016-10-19)
* (appzer) implement time2live parameter

### 0.1.6 (2016-10-17)
* (bluefox) implement picture send
* (bluefox) add blockly

### 0.1.3 (2016-09-21)
* (bluefox) fix config dialog

### 0.1.2 (2016-09-21)
* fixed error with private key

### 0.1.0 (2016-08-28)
* filter out double messages

## License

The MIT License (MIT)

Copyright (c) 2014-2017 bluefox <dogafox@gmail.com>

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