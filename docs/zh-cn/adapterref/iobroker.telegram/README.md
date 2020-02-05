---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.telegram/README.md
title: ioBroker电报适配器
hash: mWTsYb+tyqOBzPZDlS/FBuCmBw3qVJJKXqMOl/SMoRI=
---
![商标](../../../en/adapterref/iobroker.telegram/admin/telegram.png)

![安装数量](http://iobroker.live/badges/telegram-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.telegram.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.telegram.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.telegram.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.telegram.png?downloads=true)

＃ioBroker电报适配器
##配置
询问[@BotFather](https://telegram.me/botfather)创建新的漫游器```/newbot```。

系统将要求您输入漫游器的名称，然后输入用户名。
之后，您将获得令牌。

![屏幕截图](../../../en/adapterref/iobroker.telegram/img/chat.png)

您应该在配置对话框中设置通信密码。此后，启动适配器。

要与您的机器人进行对话，您需要使用“ /密码短语”对用户进行身份验证，其中“短语”是您配置的密码。因此，与您在Telegram中生成的Bot进行新的对话，然后需要输入密码作为第一个命令。

**注意：**您可以使用缩写形式“ / p短语”。

要添加精美的头像图片，请输入`/setuserpic`并上传所需的图片（512x512像素），例如[商标](img/logo.png)。

您可以通过messageBox`sendTo('telegram', 'Test message')`向所有经过身份验证的用户或特定用户`sendTo('telegram', '@userName Test message')`发送消息。
用户必须先经过身份验证。

您也可以通过这种方式指定用户：

```
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

如果使用上面的示例，请注意，必须将“ UserName”替换为您要向其发送消息的用户的名字或Public-Telegram-Username。 （取决于是否启用了Adaptersettings中的'Store username not firstname'设置）如果设置了该选项，并且用户未在电报帐户中指定公用用户名，则适配器将继续使用该用户名。用户。请记住，如果用户稍后（在对您的机器人进行身份验证之后）设置了公共用户名，则下次用户向机器人发送消息时，保存的名字将被用户名替换。

可以指定多个收件人（只需用逗号分隔用户名）。
例如：收件人：“ User1，User4，User5”

您也可以通过状态发送消息，只需将状态*“ telegram.INSTANCE.communicate.response” *设置为值*“ @ userName测试消息” *。

##用法
您可以将电报与[text2command](https://github.com/ioBroker/ioBroker.text2command)适配器一起使用。有预定义的通信模式，您可以以文本形式命令您回家。

要发送照片，只需发送文件而不是文本或URL的路径即可：`sendTo('telegram', 'absolute/path/file.png')`或`sendTo('telegram', 'https://telegram.org/img/t_logo.png')`§。

示例如何从网络摄像头向电报发送屏幕截图：

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

-*键入*-对于短信，
-* upload_photo *-用于照片，
-* upload_video *-对于视频，
-* record_video *-对于视频，
-* record_audio *-用于音频，
-* upload_audio *-用于音频，
-* upload_document *-对于文档，
-* find_location *-用于位置数据

在这种情况下，将发送动作命令。

可以在[这里](https://core.telegram.org/bots/api)中找到电报API的描述，您可以使用此api中定义的所有选项，只需将其包含在send对象中即可。例如。：

```
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**可能的选项**：

-* disable_notification *：静默发送消息。 iOS用户将不会收到通知，Android用户将不会收到通知。 （所有类型）
-* parse_mode *：如果希望Telegram应用在机器人消息中显示粗体，斜体，固定宽度的文本或内联URL，则发送Markdown或HTML。可能的值：“ Markdown”，“ HTML”（消息）
-* disable_web_page_preview *：禁用此消息中链接的链接预览（消息）
-*说明*：用于文档，图片或视频的标题，0-200个字符（视频，音频，图片，文档）
-*持续时间*：以秒为单位发送视频或音频的持续时间（音频，视频）
-*表演者*：音频文件的表演者（音频）
-* title *：音频文件的轨道名称（音频）
-*宽度*：视频宽度（视频）
-*高度*：视频高度（视频）

适配器尝试检测消息的类型（照片，视频，音频，文档，标签，动作，位置）取决于消息中的文本（如果文本是现有文件的路径），它将根据类型发送。

将在属性纬度上检测位置：

```
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

###显式消息
如果您想将数据发送为缓冲区，则可以定义消息的其他类型。

可以使用以下类型：*贴纸*，*视频*，*文档*，*音频*，*照片*。

```
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

###键盘
您可以在客户端中显示键盘** ReplyKeyboardMarkup **：

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

您可以阅读更多的[此处]（https://core.telegram.org/bots/api#replykeyboardmarkup）和[此处](https://core.telegram.org/bots#keyboards)。

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

您可以阅读更多的[此处]（https://core.telegram.org/bots/api#inlinekeyboardmarkup）和[此处](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)。

**注意：** *用户按下回叫按钮后，Telegram客户端将显示进度条，直到您调用answerCallbackQuery。因此，即使不需要向用户发送通知，也有必要通过调用answerCallbackQuery做出反应（例如，不指定任何可选参数）。*

### AnswerCallbackQuery
使用此方法可以将答案发送给从嵌入式键盘发送的回调查询。答案将作为通知显示在用户的聊天屏幕顶部或作为警报。成功后，将返回* True *。

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

您可以阅读更多的[这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise)。

＃＃＃ 题
您可以发送电文消息，下一个答案将在回调中返回。
可以在配置中设置超时，默认情况下为60秒。

```
sendTo('telegram.0', 'ask', {
    user: user, // optional
    text: 'Aure you sure?',
    reply_markup: {
        inline_keyboard: [
            // two buttons could be on one line too, but here they are on different
            [{ text: 'Yes!',  callback_data: '1' }], // first line
            [{ text: 'No...', callback_data: '0' }]  // second line
        ]
    }
}, msg => {
    console.log('user says ' + msg.data);
});
```

##聊天ID
从0.4.0版开始，您可以使用聊天ID将消息发送到聊天。

`sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');`

##更新消息
通过以下方法，您可以更改消息历史记录中的现有消息，而不是通过操作结果发送新消息。这对于使用*内置键盘*的带有回调查询的消息最有用，但也可以帮助减少与常规聊天机器人进行对话时的混乱情况。

### EditMessageText
使用此方法来编辑由机器人或通过机器人（对于嵌入式机器人）发送的文本。成功后，如果漫游器发送了已编辑的消息，则返回已编辑的消息，否则返回* True *。

```
if (command === "1_2") {
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

*或最后一条消息的新文本：*

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

您可以阅读更多的[这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise)。

### EditMessageReplyMarkup
使用此方法仅编辑由漫游器或通过漫游器（对于内向漫游器）发送的邮件的答复标记。成功后，如果漫游器发送了已编辑的消息，则返回已编辑的消息，否则返回* True *。

```
if (command === "1_2") {
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

您可以阅读更多的[这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise)。

### DeleteMessage
使用此方法可以删除一条消息，包括服务消息，但有以下限制：

-仅在48小时前发送过的邮件才能删除。

成功返回* True *。

```
if (command === "delete") {
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

您可以阅读更多的[这里](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage)。

##特殊命令
### / state stateName-读取状态值
如果现在使用ID，则可以请求state的值：

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### / state stateName值-设置状态值
如果现在使用ID，则可以设置状态值：

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

##轮询或服务器模式
如果使用轮询模式，则默认情况下，适配器每300毫秒对电报服务器进行一次轮询以进行更新。它使用流量，并且消息可能会延迟最长轮询间隔。轮询间隔可以在适配器配置中定义。

要使用服务器模式，您的ioBroker实例必须可以通过互联网访问（例如，使用noip.com动态DNS服务）。

电报只能与HTTPS服务器一起使用，但是您可以使用“让我们加密”证书。

必须为服务器模式提供以下设置：

-URL-格式为https://yourdomain.com:8443。
-IP-IP地址，将绑定服务器。默认值为0.0.0.0。如果不确定，请不要更改它。
-端口-电报实际上仅支持443、80、88、8443端口，但是您可以通过路由器将端口转发给任何一个端口。
-公共证书-如果禁用“允许加密”，则为必需。
-私钥-如果禁用“允许加密”，则为必填项。
-连锁证书（可选）
-让我们加密选项-设置“让我们加密”证书非常容易。请阅读[here]（https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates）。

##通过电报电话
借助[Callmebot](https://www.callmebot.com/)api，您可以拨打电报帐户，并且一些文本将通过TTS引擎读取。

要从javascript适配器执行此操作，只需调用：

```
sendTo('telegram.0', 'call', 'Some text');
```

要么

```
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    language: 'de-DE-Standard-A' // optional and the system language will be taken
});
```

要么

```
sendTo('telegram.0', 'call', {
    text: 'Some text',
    users: ['@Username1', '@Username2'] // Array of `users'.
});
```

要么

```
sendTo('telegram.0', 'call', {
    file: 'url of mp3 file that is accessible from internet',
    users: ['@Username1', '@Username2'] // Array of `users'.
});
```

语言的可能值：

-`ar-XA-Standard-A`-阿拉伯语（女声）
-`ar-XA-Standard-B`-阿拉伯语（男声）
-`ar-XA-Standard-C`-阿拉伯语（男性2种声音）
-`cs-CZ-Standard-A`-捷克（捷克共和国）（女声）
-`da-DK-Standard-A`-丹麦文（丹麦）（女声）
-`nl-NL-Standard-A`-荷兰语（荷兰）（如果系统语言为NL且未提供任何语言，则将使用女性声音）
-`nl-NL-Standard-B`-荷兰语（荷兰）（男声）
-`nl-NL-Standard-C`-荷兰语（荷兰）（男2种声音）
-`nl-NL-Standard-D`-荷兰语（荷兰）（女2种声音）
-`nl-NL-Standard-E`-荷兰语（荷兰）（女性3种声音）
-`en-AU-Standard-A`-英语（澳大利亚）（女声）
-`en-AU-Standard-B`-英语（澳大利亚）（男声）
-`en-AU-Standard-C`-英语（澳大利亚）（女性2种声音）
-`en-AU-Standard-D`-英语（澳大利亚）（男性2种声音）
-`en-IN-Standard-A`-英语（印度）（女声）
-`en-IN-Standard-B`-英语（印度）（男声）
-`en-IN-Standard-C`-英语（印度）（男性2种声音）
-`en-GB-Standard-A`-英语（英国）（如果系统语言为EN并且未提供任何语言，则将使用女性语音）
-`en-GB-Standard-B`-英语（英国）（男声）
-`en-GB-Standard-C`-英语（英国）（女性2种声音）
-`en-GB-Standard-D`-英语（英国）（男性2种声音）
-`en-US-Standard-B`-英语（美国）（男声）
-`en-US-Standard-C`-英语（美国）（女声）
-`en-US-Standard-D`-英语（美国）（男性2种声音）
-`en-US-Standard-E`-英语（美国）（女性2种声音）
-`fil-PH-Standard-A`-菲律宾语（菲律宾）（女声）
-`fi-FI-Standard-A`-芬兰语（芬兰）（女声）
-`fr-CA-Standard-A`-法语（加拿大）（女声）
-`fr-CA-Standard-B`-法语（加拿大）（男声）
-`fr-CA-Standard-C`-法语（加拿大）（女性2种声音）
-`fr-CA-Standard-D`-法语（加拿大）（男性2种声音）
-`fr-FR-Standard-A`-法语（法国）（如果系统语言为FR并且未提供任何语言，则将使用女性声音）
-`fr-FR-Standard-B`-法语（法国）（男声）
-`fr-FR-Standard-C`-法语（法国）（女性2种声音）
-`fr-FR-Standard-D`-法语（法国）（男性2种声音）
-`de-DE-Standard-A`-德语（德国）（如果系统语言为DE并且未提供任何语言，则将使用女性声音）
-`de-DE-Standard-B`-德语（德国）（男声）
-`el-GR-Standard-A`-希腊语（希腊）（女声）
-`hi-IN-Standard-A`-印地语（印度）（女声）
-`hi-IN-Standard-B`-印地语（印度）（男声）
-`hi-IN-Standard-C`-印地语（印度）（男性2种声音）
-`hu-HU-Standard-A`-匈牙利语（匈牙利）（女声）
-`id-ID-Standard-A`-印度尼西亚语（印度尼西亚）（女声）
-`id-ID-Standard-B`-印度尼西亚语（印度尼西亚）（男声）
-`id-ID-Standard-C`-印度尼西亚语（印度尼西亚）（男性2种声音）
-`it-IT-Standard-A`-意大利语（意大利）（如果系统语言为IT，且未提供任何语言，则使用女性声音）
-`it-IT-Standard-B`-意大利语（意大利）（女性2种声音）
-`it-IT-Standard-C`-意大利语（意大利）（男声）
-`it-IT-Standard-D`-意大利语（意大利）（男性2种声音）
-`ja-JP-Standard-A`-日语（日本）（女声）
-`ja-JP-Standard-B`-日语（日本）（女性2种声音）
-`ja-JP-Standard-C`-日语（日本）（男声）
-`ja-JP-Standard-D`-日语（日本）（男2种声音）
-`ko-KR-Standard-A`-韩国（韩国）（女声）
-`ko-KR-Standard-B`-韩语（韩国）（女2声音）
-`ko-KR-Standard-C`-韩文（韩国）（男声）
-`ko-KR-Standard-D`-韩文（韩国）（男2种声音）
-`cmn-CN-Standard-A`-普通话（女声）
-`cmn-CN-Standard-B`-普通话（男声）
-`cmn-CN-Standard-C`-普通话（男2语音）
-`nb-NO-Standard-A`-挪威语（挪威语）（女声）
-`nb-NO-Standard-B`-挪威语（挪威语）（男声）
-`nb-NO-Standard-C`-挪威语（挪威）（女2声音）
-`nb-NO-Standard-D`-挪威文（挪威）（男2种声音）
-`nb-no-Standard-E`-挪威语（挪威语）（女3声音）
-`pl-PL-Standard-A`-波兰语（波兰）（如果系统语言为PL而未提供任何语言，则将使用女性声音）
-`pl-PL-Standard-B`-波兰语（波兰）（男声）
-`pl-PL-Standard-C`-波兰语（波兰）（男2种声音）
-`pl-PL-Standard-D`-波兰语（波兰）（女性2种声音）
-`pl-PL-Standard-E`-波兰语（波兰）（女性3种声音）
-`pt-BR-Standard-A`-葡萄牙语（巴西）（如果系统语言为PT且未提供任何语言，则将使用女性声音）
-`pt-PT-Standard-A`-葡萄牙语（葡萄牙）（女声）
-`pt-PT-Standard-B`-葡萄牙语（葡萄牙）（男声）
-`pt-PT-Standard-C`-葡萄牙语（葡萄牙）（男性2种声音）
-`pt-PT-Standard-D`-葡萄牙语（葡萄牙）（女性2种声音）
-`ru-RU-Standard-A`-俄语（俄罗斯）（如果系统语言为RU并且未提供任何语言，则将使用女性声音）
-`ru-RU-Standard-B`-俄语（俄罗斯）（男声）
-`ru-RU-Standard-C`-俄语（俄罗斯）（女性2种声音）
-`ru-RU-Standard-D`-俄语（俄罗斯）（男性2种声音）
-`sk-SK-Standard-A`-斯洛伐克（斯洛伐克）（女声）
-`es-ES-Standard-A`-西班牙语（西班牙）（如果系统语言为ES，但未提供语言，则将使用女性语音）
-`sv-SE-Standard-A`-瑞典语（瑞典）（女声）
-`tr-TR-Standard-A`-土耳其语（土耳其）（女声）
-`tr-TR-Standard-B`-土耳其文（土耳其）（男性配音）
-`tr-TR-Standard-C`-土耳其语（土耳其）（女性2种声音）
-`tr-TR-Standard-D`-土耳其语（土耳其）（女性3种声音）
-`tr-TR-Standard-E`-土耳其文（土耳其）（男性配音）
-`uk-UA-Standard-A`-乌克兰语（乌克兰）（女声）
-`vi-VN-Standard-A`-越南语（越南）（女声）
-`vi-VN-Standard-B`-越南文（越南）（男声）
-`vi-VN-Standard-C`-越南语（越南）（女2声音）
-`vi-VN-Standard-D`-越南文（越南）（男性2种声音）

去做：

-场地

## Changelog
### 1.5.0 (2020-02-03)
* (bluefox) Added voice calls 

### 1.4.7 (2019-12-27)
* (Apollon77) Make compatible with js-controller 2.3

### 1.4.6 (2019-12-09)
* (bluefox) Allowed writeOnly states in telegram

### 1.4.4 (2019-11-27)
* (bluefox) New sendTo message "ask" was added (see [Question](#question) )

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

Copyright (c) 2016-2020, bluefox <dogafox@gmail.com>

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