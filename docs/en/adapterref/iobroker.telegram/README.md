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

To start a conversation with your bot you need to authenticate user with `/password phrase`, where **`phrase`** is your configured password. So open a new conversation with your generated Bot in Telegram and then you need to enter the passwort as first command.

**Note:** you can use short form `/p phrase`.

To add nice avatar picture enter `/setuserpic` in **BotFather** chat and upload him desired picture (512x512 pixels), like this one [logo](img/logo.png).

You can send the message to all authenticated users over messageBox `sendTo('telegram', 'Test message')`
or to specific user `sendTo('telegram', '@userName Test message')`.
User must be authenticated before.

You can specify user in that way too:

```
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

If you use the example above be aware of that you have to replace 'UserName' with either the first name or the Public-Telegram-Username of the User you want to send the message to. (Depends on if the 'Store username not firstname' setting in the adapter settings is enabled or not)
If the option is set and the user did not specify a public username in his telegram account, then the adapter will continue to use the firstname of the user. Keep in mind that if the user sets a public username later (after authenticating to your bot) the saved firstname will be replaced by the username the next time the user sends a message to the bot.

It is possible to specify more than one recipient (just separate the User names by comma).
For example: Recipient: "User1,User4,User5"

You can send message over state too, just set state *"telegram.INSTANCE.communicate.response"* with value *"@userName Test message"* or with a JSON object:

```
{
    text: "Test message"
}
```

The JSON syntax also allows to add options from the [telegram bots API](https://core.telegram.org/bots/api), as well as setting the user or chatId:

```
{
    text: "Test message, but with *bold*",
    parse_mode: "Markdown",
    chatId: "1234567890",
    user: "UserName"
}
```

In order to send messages to groups, you have to invite the bot to the group you want the bot to post in. 
By providing the `chat_id` to the JSON message payload you can actually send messages to those groups. 

In order to find out the `chat_id` you have to set the adapter's log level to `debug`. 
You can then just ping your bot in the groups you want the bot to send messages to. 
Make sure you put a `/` in front of the message in order for the bot to see the message ([if the bot privacy is turned on](#How-to-receive-messages-in-group-chats-using-telegram-adapter)).
The iobroker log will then show you the chat id in the logs.

## Usage
You can use telegram with [text2command](https://github.com/ioBroker/ioBroker.text2command) adapter. There are predefined communication schema and you can command to you home in text form.

To send a photo, just send a path to file instead of text or URL: `sendTo('telegram', 'absolute/path/file.png')` or `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Example how to send a screen shot from web-cam to telegram:

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
- *parse_mode*: Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message. Possible values: "Markdown", "MarkdownV2", "HTML" (message)
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

## Reacting to user replies / messages

Suppose you are using only JavaScript without *text2command*. You already sent a message/question to your user using *sendTo()* as described above. The user replies to that by pushing a button or writing a message. You can extract the command and give feedback to your user, execute commands or switch states in iobroker.

 - telegram.0 is your iobroker Telegram instance you want to use
 - user is the user registered with you TelegramBot which sent the message
 - command is the command your TelegramBot received

```
on({id: 'telegram.0.communicate.request', change: 'any'}, function (obj) {
    var stateval = getState('telegram.0.communicate.request').val;              // save Statevalue received from your Bot
    var user = stateval.substring(1,stateval.indexOf("]"));                 // extract user from the message
    var command = stateval.substring(stateval.indexOf("]")+1,stateval.length);   // extract command/text from the message

    switch (command) {
        case "1_2":
            //... see example above ...
            break;
        case "delete":
            //... see example above
            break;
        //.... and so on ...
    }
});

```

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

## Calls via telegram
Thanks to [callmebot](https://www.callmebot.com/) api, you can make a call to your telegram account and some text will be read via TTS engine.

To do that from javascript adapter just call:

```
sendTo('telegram.0', 'call', 'Some text');
```

or 

```
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    language: 'de-DE-Standard-A' // optional and the system language will be taken
    repeats: 0, // number of repeats 
});
```

or 

```
sendTo('telegram.0', 'call', {
    text: 'Some text',
    users: ['@Username1', '+49xxxx'] // Array of `users' or telephone numbers.
});
```

or 

```
sendTo('telegram.0', 'call', {
    file: 'url of mp3 file that is accessible from internet',
    users: ['@Username1', '@Username2'] // Array of `users' or telephone numbers.
});
```

Possible values for language:
- `ar-XA-Standard-A` - Arabic (Female voice)
- `ar-XA-Standard-B` - Arabic (Male voice)
- `ar-XA-Standard-C` - Arabic (Male 2 voice)
- `cs-CZ-Standard-A` - Czech (Czech Republic) (Female voice)
- `da-DK-Standard-A` - Danish (Denmark) (Female voice)
- `nl-NL-Standard-A` - Dutch (Netherlands) (Female voice - will be used if system language is NL and no language was provided)
- `nl-NL-Standard-B` - Dutch (Netherlands) (Male voice)
- `nl-NL-Standard-C` - Dutch (Netherlands) (Male 2 voice)
- `nl-NL-Standard-D` - Dutch (Netherlands) (Female 2 voice)
- `nl-NL-Standard-E` - Dutch (Netherlands) (Female 3 voice)
- `en-AU-Standard-A` - English (Australia) (Female voice)
- `en-AU-Standard-B` - English (Australia) (Male voice)
- `en-AU-Standard-C` - English (Australia) (Female 2 voice)
- `en-AU-Standard-D` - English (Australia) (Male 2 voice)
- `en-IN-Standard-A` - English (India) (Female voice)
- `en-IN-Standard-B` - English (India) (Male voice)
- `en-IN-Standard-C` - English (India) (Male 2 voice)
- `en-GB-Standard-A` - English (UK) (Female voice - will be used if system language is EN and no language was provided)
- `en-GB-Standard-B` - English (UK) (Male voice)
- `en-GB-Standard-C` - English (UK) (Female 2 voice)
- `en-GB-Standard-D` - English (UK) (Male 2 voice)
- `en-US-Standard-B` - English (US) (Male voice)
- `en-US-Standard-C` - English (US) (Female voice)
- `en-US-Standard-D` - English (US) (Male 2 voice)
- `en-US-Standard-E` - English (US) (Female 2 voice)
- `fil-PH-Standard-A` - Filipino (Philippines) (Female voice)
- `fi-FI-Standard-A` - Finnish (Finland) (Female voice)
- `fr-CA-Standard-A` - French (Canada) (Female voice)
- `fr-CA-Standard-B` - French (Canada) (Male voice)
- `fr-CA-Standard-C` - French (Canada) (Female 2 voice)
- `fr-CA-Standard-D` - French (Canada) (Male 2 voice)
- `fr-FR-Standard-A` - French (France) (Female voice - will be used if system language is FR and no language was provided)
- `fr-FR-Standard-B` - French (France) (Male voice)
- `fr-FR-Standard-C` - French (France) (Female 2 voice)
- `fr-FR-Standard-D` - French (France) (Male 2 voice)
- `de-DE-Standard-A` - German (Germany) (Female voice - will be used if system language is DE and no language was provided)
- `de-DE-Standard-B` - German (Germany) (Male voice)
- `el-GR-Standard-A` - Greek (Greece) (Female voice)
- `hi-IN-Standard-A` - Hindi (India) (Female voice)
- `hi-IN-Standard-B` - Hindi (India) (Male voice)
- `hi-IN-Standard-C` - Hindi (India) (Male 2 voice)
- `hu-HU-Standard-A` - Hungarian (Hungary) (Female voice)
- `id-ID-Standard-A` - Indonesian (Indonesia) (Female voice)
- `id-ID-Standard-B` - Indonesian (Indonesia) (Male voice)
- `id-ID-Standard-C` - Indonesian (Indonesia) (Male 2 voice)
- `it-IT-Standard-A` - Italian (Italy) (Female voice - will be used if system language is IT and no language was provided)
- `it-IT-Standard-B` - Italian (Italy) (Female 2 voice)
- `it-IT-Standard-C` - Italian (Italy) (Male voice)
- `it-IT-Standard-D` - Italian (Italy) (Male 2 voice)
- `ja-JP-Standard-A` - Japanese (Japan) (Female voice)
- `ja-JP-Standard-B` - Japanese (Japan) (Female 2 voice)
- `ja-JP-Standard-C` - Japanese (Japan) (Male voice)
- `ja-JP-Standard-D` - Japanese (Japan) (Male 2 voice)
- `ko-KR-Standard-A` - Korean (South Korea) (Female voice)
- `ko-KR-Standard-B` - Korean (South Korea) (Female 2 voice)
- `ko-KR-Standard-C` - Korean (South Korea) (Male voice)
- `ko-KR-Standard-D` - Korean (South Korea) (Male 2 voice)
- `cmn-CN-Standard-A` - Mandarin Chinese (Female voice)
- `cmn-CN-Standard-B` - Mandarin Chinese (Male voice)
- `cmn-CN-Standard-C` - Mandarin Chinese (Male 2 voice)
- `nb-NO-Standard-A` - Norwegian (Norway) (Female voice)
- `nb-NO-Standard-B` - Norwegian (Norway) (Male voice)
- `nb-NO-Standard-C` - Norwegian (Norway) (Female 2 voice)
- `nb-NO-Standard-D` - Norwegian (Norway) (Male 2 voice)
- `nb-no-Standard-E` - Norwegian (Norway) (Female 3 voice)
- `pl-PL-Standard-A` - Polish (Poland) (Female voice - will be used if system language is PL and no language was provided)
- `pl-PL-Standard-B` - Polish (Poland) (Male voice)
- `pl-PL-Standard-C` - Polish (Poland) (Male 2 voice)
- `pl-PL-Standard-D` - Polish (Poland) (Female 2 voice)
- `pl-PL-Standard-E` - Polish (Poland) (Female 3 voice)
- `pt-BR-Standard-A` - Portuguese (Brazil) (Female voice - will be used if system language is PT and no language was provided)
- `pt-PT-Standard-A` - Portuguese (Portugal) (Female voice)
- `pt-PT-Standard-B` - Portuguese (Portugal) (Male voice)
- `pt-PT-Standard-C` - Portuguese (Portugal) (Male 2 voice)
- `pt-PT-Standard-D` - Portuguese (Portugal) (Female 2 voice)
- `ru-RU-Standard-A` - Russian (Russia) (Female voice - will be used if system language is RU and no language was provided)
- `ru-RU-Standard-B` - Russian (Russia) (Male voice)
- `ru-RU-Standard-C` - Russian (Russia) (Female 2 voice)
- `ru-RU-Standard-D` - Russian (Russia) (Male 2 voice)
- `sk-SK-Standard-A` - Slovak (Slovakia) (Female voice)
- `es-ES-Standard-A` - Spanish (Spain) (Female voice - will be used if system language is ES and no language was provided)
- `sv-SE-Standard-A` - Swedish (Sweden) (Female voice)
- `tr-TR-Standard-A` - Turkish (Turkey) (Female voice)
- `tr-TR-Standard-B` - Turkish (Turkey) (Male voice)
- `tr-TR-Standard-C` - Turkish (Turkey) (Female 2 voice)
- `tr-TR-Standard-D` - Turkish (Turkey) (Female 3 voice)
- `tr-TR-Standard-E` - Turkish (Turkey) (Male voice)
- `uk-UA-Standard-A` - Ukrainian (Ukraine) (Female voice)
- `vi-VN-Standard-A` - Vietnamese (Vietnam) (Female voice)
- `vi-VN-Standard-B` - Vietnamese (Vietnam) (Male voice)
- `vi-VN-Standard-C` - Vietnamese (Vietnam) (Female 2 voice)
- `vi-VN-Standard-D` - Vietnamese (Vietnam) (Male 2 voice)

TODO:
- venue

## Auto-Inline keyboard based on settings in admin (Easy-Keyboard)
For every state the additional settings could be enabled:

![settings](img/stateSettings.png)

By entering "/cmds" the following keyboard will be displayed in telegram:

![settings](img/stateSettings1.png)

"/cmds" could be replaced by any text (e.g. "?") in the configuration dialog of telegram adapter.

If **Use rooms in keyboard command** option is enabled in the configuration dialog of telegram adapter, so in the first step the room list will be shown. ***Not yet implemented***

### Settings in the state
First of all the configuration must be enabled.

#### Alias  
Name of the device. If empty the name will be taken from object. 
By entering "Door lamp" following menu will be shown for boolean state.
![settings](img/stateSettings2.png)

You can switch the device ON, turn the device OFF or request the state. 
If you Click `Door lamp ?`, you will get `Door lamp  => switched off`.
 
### Read only
If activated, no ON/OFF buttons will be shown, just a `Door lamp ?`.

### Report changes
If the status of device changed (e.g. some one turned the lamp on physically), the new status will be delivered to telegram.
E.g. `Door lamp  => switched on`.

### Buttons in line
How many buttons must be shown in the line for one device. 
Because of the long name maybe it is better to show only 2 (or even just one) buttons in the line.
  
![settings](img/stateSettings3.png)

### Write only
If activated, no the status query (`Door lamp ?`) button will be shown.
 ![settings](img/stateSettings4.png)
 
### ON Command
Which text will be shown on `ON` button.
Like here: 
![settings](img/stateSettings5.png)

Will produce following keyboard:
![settings](img/stateSettings6.png)

### ON Text
Which text will be shown by state report. 
E.g. `Door lamp => activated` if the state of the device changed to true and the **ON Text** is `activated` 

The ON/OFF Texts will be shown only if **Report changes** is activated.

### OFF Command
Same as **ON Command**, but for OFF.

### OFF Text
Same as **ON Text**, but for OFF.
E.g. `Door lamp => deactivated` if the state of the device changed to false and the **OFF Text** is `deactivated` 

### Only true
E.g. for buttons, they have no OFF state. In this case no OFF button will be shown.

![settings](img/stateSettings7.png)

## How to receive messages in group chats using telegram adapter
If telegram bot receives messages sent by user to the bot in private chats, but not receives messages sent by users in group chats. 
In this case you must talk to @botfather and disable the privacy mode.

BotFather chat:

```
You: /setprivacy

BotFather: Choose a bot to change group messages settings.

You: @your_name_bot

BotFather: 'Enable' - your bot will only receive messages that either start with the '/' symbol or mention the bot by username.

'Disable' - your bot will receive all messages that people send to groups.

Current status is: ENABLED

You: Disable

BotFather: Success! The new status is: DISABLED. /help
```

## How to send messages via node-red
For simple text messages to all users, just put the text within the payload of the message and
send it to the ioBroker state *"telegram.INSTANCE.communicate.response"*.

If you want to set additional options, fill the payload with a JSON object, such as:
```
msg.payload = {
    /* text is the only mandatory field here */
    "text": "*bold _italic bold ~italic bold strikethrough~ __underline italic bold___ bold*",
    /* optional chatId or user, the receipient of the message */
    "chatId": "1234567890",
    /* optional settings from the telegram bots API */
    "parse_mode": "MarkdownV2"
}
```

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog

### __WORK IN PROGRESS__
* (Apollon77/Nahasapeemapetilon) catch several API error cases to hopefully get around  adapter crashes on network errors
* (Nahasapeemapetilon) add support for media groups and multiple image qualities

### 1.7.0 (2021-01-08)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 1.6.2 (2020-12-27)
* (fincha) Fixing error with keyboard

### 1.6.1 (2020-12-01)
* (ChristianB86) Added option to set the amount of repeats for telegram call.

### 1.6.0 (2020-11-09)
* (MarkRohrbacher) Allow overriding chatId / user when writing JSON objects to telegram.INSTANCE.communicate.response
* (blazeis) Fix Send message via Response field with Username
* (Garfonso) fill requestRaw also for callbackQuery

### 1.5.9 (2020-05-04)
* (Apollon77) potential error fixed when sending messages
* (Apollon77) webserver initialization optimized again to prevent errors with invalid certificates 

### 1.5.8 (2020-04-30)
* (Apollon77) errors on webserver initialization are handled properly

### 1.5.6 (2020-04-04)
* (bluefox) Fixed missing languages for blockly
* (bluefox) Added description of easy-keyboard

### 1.5.5 (2020-04-04)
* (alutov) Fixed bug for telegram users with an empty user name
* (Mark Rohrbacher) Allowed JSON objects in telegram.*.communicate.response 

### 1.5.4 (2020-03-11)
* (bluefox) Improvement of callmebot

### 1.5.3 (2020-02-23)
* (foxriver76) removed usage of adapter.objects
* (Haba) Fix of the response for the "callback_query" event

### 1.5.1 (2020-02-09)
* (bluefox) Invalid parameters were checked

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

Copyright (c) 2016-2021, bluefox <dogafox@gmail.com>

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
