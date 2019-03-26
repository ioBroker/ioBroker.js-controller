---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.telegram/README.md
title: 已移至https://github.com/iobroker-community-adapters/ioBroker.telegram
hash: tbkO4QFjGv4W24/10mg5Q6clQWYyClDrwgTOJXOcMpA=
---
![安装数量](http://iobroker.live/badges/telegram-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.telegram.svg)
![下载](https://img.shields.io/npm/dm/iobroker.telegram.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.telegram.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.telegram.png?downloads=true)

＃已移至https://github.com/iobroker-community-adapters/ioBroker.telegram
![商标](../../../en/adapterref/iobroker.telegram/admin/telegram.png)

#ioBroker telegram Adapter ==============
##配置
请[@BotFather](https://telegram.me/botfather)创建新的bot```/newbot```。

系统将要求您输入机器人的名称，然后输入用户名。
之后你会得到令牌。

![截图](../../../en/adapterref/iobroker.telegram/img/chat.png)

您应该在配置对话框中设置通信密码。在此之后启动适配器。

要开始与机器人对话，您需要使用“/ password phrase”对用户进行身份验证，其中**短语**是您配置的密码。因此，使用您在Telegram中生成的Bot打开一个新对话，然后您需要输入passwort作为第一个命令。

**注意：**您可以使用简短形式的“/ p短语”。

要添加漂亮的头像图片，请输入```/setuserpic```并上传他想要的图片（512x512像素），如此[商标](img/logo.png)。

您可以通过messageBox```sendTo('telegram', 'Test message')```或特定用户```sendTo('telegram', '@userName Test message')```向所有经过身份验证的用户发送消息。
用户必须先进行身份验证。

您也可以这样指定用户：

```
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

如果您使用上面的示例，请注意您必须将“UserName”替换为要将消息发送到的用户的firstname或Public-Telegram-Username。 （取决于是否启用了Adaptersettings中的“Store username not firstname”设置）如果设置了该选项且用户未在其电报帐户中指定公共用户名，则适配器将继续使用用户。请记住，如果用户稍后设置了公共用户名（在对机器人进行身份验证之后），则下次用户向僵尸程序发送消息时，保存的名字将被用户名替换。

可以指定多个收件人（只需用逗号分隔用户名）。
例如：收件人：“User1，User4，User5”

您也可以通过状态发送消息，只需设置状态*“telegram.INSTANCE.communicate.response”*，其值为*“@ userName Test message”*。

##用法
您可以使用带有[text2command](https://github.com/ioBroker/ioBroker.text2command)适配器的电报。有预定义的通信模式，您可以以文本形式命令回家。

要发送照片，只需发送文件路径而不是文本或URL：```sendTo('telegram', 'absolute/path/file.png')```或```sendTo('telegram', 'https://telegram.org/img/t_logo.png')```。

示例如何将网络摄像头的屏幕截图发送到电报：

```
var request = require('request');
var fs      = require('fs');

function sendImage() {
    request.get({url: 'http://login:pass@ipaddress/web/tmpfs/snap.jpg', encoding: 'binary'}, function (err, response, body) {
        fs.writeFile("/tmp/snap.jpg", body, 'binary', function(err) {

        if (err) {
            console.error(err);
        } else {
            console.log('Snapshot sent');
            sendTo('telegram.0', '/tmp/snap.jpg');
            //sendTo('telegram.0', {text: '/tmp/snap.jpg', caption: 'Snapshot'});
        }
      });
    });
}
on("someState", function (obj) {
    if (obj.state.val) {
        // send 4 images: immediately, in 5, 15 and 30 seconds
        sendImage();
        setTimeout(sendImage, 5000);
        setTimeout(sendImage, 15000);
        setTimeout(sendImage, 30000);
    }
});

```

以下消息保留用于操作：

 -  *输入*  - 用于短信，
 - *upload_photo* - 用于照片，
 - *upload_video* - 用于视频，
 - *record_video* - 用于视频，
 - *record_audio* - 用于音频，
 - *upload_audio* - 用于音频，
 - *upload_document* - 用于文档，
 - *find_location* - 用于位置数据

在这种情况下，将发送动作命令。

电报API的描述可以在[这里](https://core.telegram.org/bots/api)中找到，您可以使用此api中定义的所有选项，只需将其包含在发送对象中即可。例如。：

```
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**可能的选择**：

 - *disable_notification* 以静默方式发送消息。 iOS用户不会收到通知，Android用户会收到没有声音的通知。 （所有类型）
 - *parse_mode* 发送Markdown或HTML，如果您希望Telegram应用程序在机器人的消息中显示粗体，斜体，固定宽度的文本或内嵌URL。可能的值：“Markdown”，“HTML”（消息）
 - *disable_web_page_preview* 禁用此消息中链接的链接预览（消息）
 -  *标题*：文档，照片或视频的标题，0-200个字符（视频，音频，照片，文档）
 -  *持续时间*：以秒为单位发送的视频或音频的持续时间（音频，视频）
 -  *执行者*：音频文件的执行者（音频）
 - *title* 音频文件的音轨名称（音频）
 -  *宽*：视频宽度（视频）
 -  *身高*：视频高度（视频）

适配器尝试检测消息的类型（照片，视频，音频，文档，标签，动作，位置）取决于消息中的文本，如果文本是现有文件的路径，它将按照类型发送。

将在属性纬度上检测位置：

```
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

###明确的消息类型
如果要将数据作为缓冲区发送，则可以定义额外的消息类型。

以下类型可能：*贴纸*，*视频*，*文档*，*音频*，*照片*。

```
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

###键盘
您可以在客户端显示键盘** ReplyKeyboardMarkup **：

```
sendTo('telegram.0', {
    text:   'Press button',
    reply_markup: {
        keyboard: [
            ['Line 1, Button 1', 'Line 1, Button 2'],
            ['Line 2, Button 3', 'Line 2, Button 4']
        ],
        resize_keyboard:   true,
        one_time_keyboard: true
    }
});
```

您可以阅读更多[这里]（https://core.telegram.org/bots/api#replykeyboardmarkup）和[这里]](https://core.telegram.org/bots#keyboards)。

您可以在客户端中显示键盘** InlineKeyboardMarkup **：

```
sendTo('telegram', {
    user: user,
    text: 'Click the button',
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Button 1_1', callback_data: '1_1' }],
            [{ text: 'Button 1_2', callback_data: '1_2' }]
        ]
    }
});
```

您可以阅读更多[这里]（https://core.telegram.org/bots/api#inlinekeyboardmarkup）和[这里](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)。

**注意：** *用户按下回叫按钮后，Telegram客户端将显示进度条，直到您调用answerCallbackQuery。因此，即使不需要通知用户（例如，没有指定任何可选参数），也必须通过调用answerCallbackQuery来做出反应。*

### AnswerCallbackQuery
使用此方法发送从内联键盘发送的回调查询的答案。答案将作为聊天屏幕顶部的通知或警报显示给用户。成功时，返回* True *。

```
if (command ==="1_2") {
    sendTo('telegram', {
        user: user,
        answerCallbackQuery: {
            text: "Pressed!",
            showAlert: false // Optional parameter
        }
   });
}
```

您可以阅读更多[这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise)。

##聊天ID
从版本0.4.0开始，您可以使用聊天ID将消息发送到聊天室。

```sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');```

##更新消息
以下方法允许您更改消息历史记录中的现有消息，而不是发送带有操作结果的新消息。这对于使用回调查询的*内联键盘*的消息最有用，但也可以帮助减少与常规聊天机器人的对话中的混乱。

### EditMessageText
使用此方法编辑机器人或机器人发送的文本（对于内联机器人）。成功时，如果机器人发送编辑的消息，则返回编辑的消息，否则返回* True *。

```
if (command ==="1_2") {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageText: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Button 1', callback_data: '2_1' }],
                        [{ text: 'Button 2', callback_data: '2_2' }]
                    ],
                }
            }
        }
    });
}
```

*或最后留言的新文字：*

```
if (command ==="1_2") {
    sendTo('telegram', {
        user: user,
        text: 'New text message',
        editMessageText: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val,
            }
        }
    });
}
```

您可以阅读更多[这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise)。

### EditMessageReplyMarkup
使用此方法仅编辑机器人或机器人发送的消息的回复标记（对于内联机器人）。成功时，如果机器人发送编辑的消息，则返回编辑的消息，否则返回* True *。

```
if (command ==="1_2") {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageReplyMarkup: {
            options: {
                chat_id: getState("telegram.0.communicate.botSendChatId").val,
                message_id: getState("telegram.0.communicate.botSendMessageId").val,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Button 1', callback_data: '2_1' }],
                        [{ text: 'Button 2', callback_data: '2_2' }]
                    ],
                }
            }
        }
    });
}
```

您可以阅读更多[这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise)。

### DeleteMessage
使用此方法删除包含服务消息的消息，但具有以下限制：

 - 只有在48小时前发送的消息才能删除。

成功时返回* True *。

```
if (command ==="delete") {
    sendTo('telegram', {
        user: user,
        deleteMessage: {
            options: {
                chat_id: getState("telegram.0.communicate.requestChatId").val,
                message_id: getState("telegram.0.communicate.requestMessageId").val
            }
        }
    });
}
```

您可以阅读更多[这里](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage)。

##特殊命令
### / state stateName  - 读取状态值
如果你现在是ID，你可以请求state的值：

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### / state stateName value  - 设置状态值
如果你现在是ID，你可以设置state的值：

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

##轮询或服务器模式
如果使用轮询模式，则适配器默认每300毫秒轮询一次电报服务器以进行更新。它使用流量和消息可以延迟到轮询间隔。轮询间隔可以在适配器配置中定义。

要使用服务器模式，您必须可以从Internet访问ioBroker实例（例如，使用noip.com动态DNS服务）。

电报只能用于HTTPS服务器，但您可以使用** let的加密**证书。

必须为服务器模式提供以下设置：

 - 网址 - 格式为https://yourdomain.com:8443。
 -  IP  -  IP地址，服务器将被绑定。默认值0.0.0.0。如果您不确定，请不要更改它。
 - 端口 - 实际上只有443,80,88,8443个端口由电报支持，但您可以通过路由器将端口转发到任何端口。
 - 公共证书 - 必要时，如果**禁止加密**被禁用。
 - 私钥 - 必需，如果**允许加密**被禁用。
 - 连锁证书（可选）
 - 让我们加密选项 - 很容易设置**让我们加密**证书。请阅读[here]（https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates）。

去做：

 - 场地
 - 对话框

## Changelog
### 1.4.3 (2019-02-21)
* (BuZZy1337) Bugfix for not yet completely implemented feature

### 1.4.2 (2019-02-18)
* (BuZZy1337) fix for recipients containing withespaces
* (BuZZy1337) change loglevel of "getMe" info-messages to debug
* (bluefox) fix scroll in firefox

### 1.4.1 (2019-01-12)
* (simatec) Support for Compact mode

### 1.4.0 (2019-01-06)
* (bluefox) Custom settings for states were added

### 1.3.6 (2018-12-01)
* (Apollon77) fix #78

### 1.3.5 (2018-11-04)
* (BuZZy1337) Fix a small error caused by previous commit

### 1.3.4 (2018-11-04)
* (BuZZy1337) Ask if saved users should be wiped when password is changed.

### 1.3.3 (2018-11-03)
* (BuZZy1337) Show warning if no password is set.

### 1.3.2 (2018-10-28)
* (BuZZy1337) Just minor cosmetic fixes/changes

### 1.3.1 (2018-10-08)
* (bluefox) The ability of enable/disable of states controlling was added

### 1.3.0 (2018-09-19)
* (BuZZy1337) Added possibility to delete authenticated users in the Adapter-Config screen (via Messages tab)
* (BuZZy1337) fixed a problem "building" the Blockly sendto block when no adapter instance exists.

### 1.2.7 (2018-08-29)
* (BuZZy1337) Added "disable notification" checkbox to blockly block.
* (BuZZy1337) Added "parse_mode" selector to blockly block.

### 1.2.6 (2018-07-30)
* (BuZZy1337) Added support for sending Messages to Group-Chats via Blockly.

### 1.2.5 (2018-07-11)
* (BuZZy1337) Added possibility to specify more than one recipient. (separated by comma)

### 1.2.4 (2018-06-02)
* (BuZZy1337) remove HTML Tags from Logerror-Messages
* (Apollon77) fix misleading error when setting a value for a state

### 1.2.3 (2018-04-26)
* (Osrx) Added Socks5 settings to config dialog on machines running admin 2.

### 1.2.2 (2018-04-25)
* (kirovilya) Changed library for Proxy Socks5

### 1.2.1 (2018-04-17)
* (Haba) Added support for Proxy Socks5.

### 1.2.0 (2018-03-21)
* (AlGu) Possibility to define polling interval in configuration wizard. Default is 300ms.

### 1.1.4 (2018-03-20)
* (BasGo) Added checks before accessing non-existing options

### 1.1.3 (2018-03-19)
* (BasGo) Fixed issue preventing adapter to terminate correctly
* (BasGo) Fixed issue with wrong callback query id

### 1.1.2 (2018-03-16)
* (BasGo) Reworked configuration and translation

### 1.1.1 (2018-01-26)
* (Haba) New objects: botSendChatId, botSendMessageId

### 1.1.0 (2018-01-24)
* (bluefox) Possibility to send photo, video, document, audio as buffer.

### 1.0.11 (2018-01-23)
* (Haba) Sending an image without intermediate caching

### 1.0.10 (2018-01-18)
* (Haba) Updating for Admin3

### 1.0.9 (2017-11-27)
* (kirovilya) Allow send gif via sendDocument

### 1.0.8 (2017-10-03)
* (Haba1234) initPolling() this is deprecated. -> startPolling()
* (Haba1234) Add log polling_error and webhook_error.

### 1.0.7 (2017-09-27)
* (Haba) New function: deleteMessage. Update version lib node-telegram-bot-api

### 1.0.6 (2017-07-19)
* (Haba) Fix an incorrect order of writing variables

### 1.0.5 (2017-07-18)
* (Haba) inline keyboard and new functions: answerCallbackQuery, editMessageText, editMessageReplyMarkup

### 1.0.4 (2017-06-22)
* (dwm) Fix longitude and latitude

### 1.0.3 (2017-05-24)
* (bluefox) Fix position message

### 1.0.2 (2017-01-13)
* (bluefox) show only installed instances in blockly

### 1.0.1 (2016-11-04)
* (bluefox) Show user name in error message

### 1.0.0 (2016-10-31)
* (bluefox) server mode with web hooks

### 0.4.4 (2016-10-12)
* (bluefox) support of blockly

### 0.4.3 (2016-08-28)
* (bluefox) filter out double messages

### 0.4.2 (2016-08-22)
* (bluefox) translations
* (bluefox) configurable restarting/started texts

### 0.4.1 (2016-07-29)
* (bluefox) response to chatId and not to userId
* (bluefox) cut messages with @
* (bluefox) add new states: requestChatId and requestUserId

### 0.4.0 (2016-07-21)
* (bluefox) allow send messages to chats via chat-ID
* (bluefox) support of video(mp4), audio, document, location, sticker, action

### 0.3.0 (2016-05-31)
* (bluefox) restart connection every hour

### 0.2.4 (2016-05-08)
* (bluefox) replace "_" with " " when sending to text2command

### 0.2.3 (2016-05-04)
* (bluefox) replace "/" with "#" when sending to text2command

### 0.2.2 (2016-04-14)
* (Jonas) fix unload

### 0.2.1 (2016-04-13)
* (Jonas) fix configuration and send to more than one user

### 0.2.0 (2016-04-12)
* (bluefox) add send photo possibility

### 0.1.0 (2016-02-20)
* (bluefox) fix double responses.
* (bluefox) inform about new start

### 0.0.2 (2016-02-15)
* (bluefox) fix error with sendTo

### 0.0.1 (2016-02-13)
* (bluefox) intial commit

## License

The MIT License (MIT)

Copyright (c) 2016-2019, bluefox <dogafox@gmail.com>

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