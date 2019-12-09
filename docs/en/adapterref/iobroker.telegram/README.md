![Logo](admin/telegram.png)
# ioBroker telegram Adapter

![Number of Installations](http://iobroker.live/badges/telegram-installed.svg) ![Number of Installations](http://iobroker.live/badges/telegram-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.telegram.svg)](https://www.npmjs.com/package/iobroker.telegram)
[![Downloads](https://img.shields.io/npm/dm/iobroker.telegram.svg)](https://www.npmjs.com/package/iobroker.telegram)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.telegram.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.telegram)

[![NPM](https://nodei.co/npm/iobroker.telegram.png?downloads=true)](https://nodei.co/npm/iobroker.telegram/)

## Configuration
Ask [@BotFather](https://telegram.me/botfather) to create new bot ```/newbot```.

You will be asked to enter name of the bot and then the username.
After that you will get the Token.

![Screenshot](img/chat.png)

You should set password for communication in configuration dialog. After this start the adapter.

To start a conversation with your bot you need to authenticate user with "/password phrase", where **phrase** is your configured password. So open a new conversation with your generated Bot in Telegram and then you need to enter the passwort as first command.

**Note:** you can use short form "/p phrase".

To add nice avatar picture enter `/setuserpic` and upload him desired picture (512x512 pixels), like this one [logo](img/logo.png).

You can send message to all authenticated users over messageBox `sendTo('telegram', 'Test message')`
or to specific user `sendTo('telegram', '@userName Test message')`.
User must be authenticated before.

You can specify user in that way too:

```
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

If you use the example above be aware of that you have to replace 'UserName' with either the firstname or the Public-Telegram-Username of the User you want to send the message to. (Depends on if the 'Store username not firstname' setting in the Adaptersettings is enabled or not)
If the option is set and the user did not specify a public username in his telegram account, then the adapter will continue to use the firstname of the user. Keep in mind that if the user sets a public username later (after authenticating to your bot) the saved firstname will be replaced by the username the next time the user sends a message to the bot.

It is possible to specify more than one recipient (just separate the Usernames by comma).
For example: Recipient: "User1,User4,User5"

You can send message over state too, just set state *"telegram.INSTANCE.communicate.response"* with value *"@userName Test message"*.

## Usage
You can use telegram with [text2command](https://github.com/ioBroker/ioBroker.text2command) adapter. There are predefined communication schema and you can command to you home in text form.

To send photo, just send a path to file instead of text or URL: `sendTo('telegram', 'absolute/path/file.png')` or `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Example how to send screenshot from webcam to telegram:

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

Following messages are reserved for actions:

- *typing* - for text messages,
- *upload_photo* - for photos,
- *upload_video* - for videos,
- *record_video* - for videos,
- *record_audio* - for audio,
- *upload_audio* - for audio,
- *upload_document* - for documents,
- *find_location* - for location data

In this case the action command will be sent.

The description for telegram API can be found [here](https://core.telegram.org/bots/api) and you can use all options defined in this api, just by including that into send object. E.g.:

```
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Possible options**:
- *disable_notification*: Sends the message silently. iOS users will not receive a notification, Android users will receive a notification with no sound. (all types)
- *parse_mode*: Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message. Possible values: "Markdown", "HTML" (message)
- *disable_web_page_preview*: Disables link previews for links in this message (message)
- *caption*: Caption for the document, photo or video, 0-200 characters (video, audio, photo, document)
- *duration*: Duration of sent video or audio in seconds (audio, video)
- *performer*: Performer of the audio file (audio)
- *title*: Track name of the audio file (audio)
- *width*: Video width (video)
- *height*: Video height (video)

Adapter tries to detect the type of message (photo, video, audio, document, sticker, action, location) depends on text in the message if the text is path to existing file, it will be sent as according type.

Location will be detected on attribute latitude:

```
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

### Explicit types of messages
You have the possibility to define extra the type of the message in case you want to send the data as buffer.

Following types are possible: *sticker*, *video*, *document*, *audio*, *photo*.

```
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### Keyboard
You can show keyboard **ReplyKeyboardMarkup** in the client:

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

You can read more [here](https://core.telegram.org/bots/api#replykeyboardmarkup) and [here](https://core.telegram.org/bots#keyboards).

You can show keyboard **InlineKeyboardMarkup** in the client:

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

You can read more [here](https://core.telegram.org/bots/api#inlinekeyboardmarkup) and [here](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).

**NOTE:** *After the user presses a callback button, Telegram clients will display a progress bar until you call answerCallbackQuery. It is, therefore, necessary to react by calling answerCallbackQuery even if no notification to the user is needed (e.g., without specifying any of the optional parameters).*

### answerCallbackQuery
Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, *True* is returned.

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

You can read more [here](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Question
You can send to telegram the message and the next answer will be returned in callback. 
Timeout can be set in configuration and by default is 60 seconds.

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

## Chat ID
From version 0.4.0 you can use chat ID to send messages to chat.

`sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');`

## Updating messages
The following methods allow you to change an existing message in the message history instead of sending a new one with a result of an action. This is most useful for messages with *inline keyboards* using callback queries, but can also help reduce clutter in conversations with regular chat bots.

### editMessageText
Use this method to edit text sent by the bot or via the bot (for inline bots). On success, if edited message is sent by the bot, the edited Message is returned, otherwise *True* is returned.

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

*or new text for last message:*

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

You can read more [here](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).     

### editMessageReplyMarkup
Use this method to edit only the reply markup of messages sent by the bot or via the bot (for inline bots). On success, if edited message is sent by the bot, the edited Message is returned, otherwise *True* is returned.

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

You can read more [here](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### deleteMessage
Use this method to delete a message, including service messages, with the following limitations:
- A message can only be deleted if it was sent less than 48 hours ago.
Returns *True* on success.

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

You can read more [here](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Special commands

### /state stateName - read state value
You can request the value of state if you now the ID:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /state stateName value - set state value
You can set the value of state if you now the ID:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Polling or Server mode
If polling mode is used, the adapter polls by default every 300ms the telegram server for updates. It uses traffic and messages can be delayed for up to the polling interval. The polling interval can be defined in adapter configuration.

To use server mode you ioBroker instance must be reachable from internet (e.g. with noip.com dynamic DNS service).

Telegram can work only with HTTPS servers, but you can use **let's encrypt** certificates.

Following settings must be provided for server mode:

- URL - in form https://yourdomain.com:8443.
- IP - Ip address, where the server will be bound. Default 0.0.0.0. Do not change it if you are not sure.
- Port - actually only 443, 80, 88, 8443 ports are supported by telegram, but you can forward ports to any one through your router.
- Public certificate - required, if **let's encrypt** is disabled.
- Private key - required, if **let's encrypt** is disabled.
- Chain certificate (optional)
- Let's encrypt options - It is very easy to setup **let's encrypt** certificates. Please read [here](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) about it.

TODO:
- venue
- dialogs

## Changelog
### 1.4.5 (2019-12-08)
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
