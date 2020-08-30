---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: tl1F5FmMp2oEUTrvyhB8/IbpMO4qqvYxZvBnT6pGcjk=
---
![商标](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.whatsapp-cmb.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.whatsapp-cmb/badge.svg)
![NPM](https://nodei.co/npm/iobroker.whatsapp-cmb.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/ioBroker/ioBroker.whatsapp-cmb/master.svg)

＃ioBroker.whatsapp-cmb
## Whatsapp-cmb适配器适用于ioBroker
非常感谢免费的[CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/)服务，此适配器允许您向自己或其他号码发送WhatsApp消息。

**注意**：*免费API仅供个人使用！*

###配置
*以下文档是从[Callmebot](https://www.callmebot.com/blog/free-api-whatsapp-messages/)页面复制的。*

使用API之前，您需要从机器人获取API密钥：

-将电话号码+34 644 10 55 84添加到您的电话联系人中。 （根据需要命名。）
-发送此消息“我允许callmebot向我发送消息”（英语）给创建的新联系人（当然使用WhatsApp）。
-等待直到收到您的电话号码消息“ API已激活”。您的APIKEY是机器人的123123`。由于这仍处于beta测试中，因此激活最多可能需要2分钟。
-来自漫游器的WhatsApp消息将包含使用API发送消息所需的API密钥。
-现在，您可以在ioBroker配置中使用API KEY。

示例：![例](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

###用法
有两种发送消息的可能性：

-通过`whatsapp-cmb.0.sendMessage`。只需在此状态下写入一些文本，消息便会发送到在设置对话框中配置的默认号码。
-通过来自javascript适配器的消息：

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![块状](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

<！-下一个版本的占位符（在该行的开头）：

### __进展中__->

## Changelog
### 0.1.3 (2020-08-29)
* (bluefox) The documentation and translations were added.

### 0.0.1 (2020-08-27)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 Bluefox <dogafox@gmail.com>

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