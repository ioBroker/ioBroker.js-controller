---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.telegram/README.md
title: ioBroker-Telegrammadapter
hash: 3gUX37ZjaRU+kloaRUSblN655foTMhHsBRYtYr6RC54=
---
![Logo](../../../en/adapterref/iobroker.telegram/admin/telegram.png)

![Anzahl der Installationen](http://iobroker.live/badges/telegram-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.telegram.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.telegram.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.telegram.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.telegram.png?downloads=true)

# IoBroker-Telegrammadapter
## Aufbau
Bitten Sie [@BotFather](https://telegram.me/botfather), einen neuen Bot ```/newbot``` zu erstellen.

Sie werden aufgefordert, den Namen des Bots und dann den Benutzernamen einzugeben.
Danach bekommst du das Token.

![Bildschirmfoto](../../../en/adapterref/iobroker.telegram/img/chat.png)

Sie sollten das Passwort für die Kommunikation im Konfigurationsdialog festlegen. Danach starten Sie den Adapter.

Um eine Unterhaltung mit Ihrem Bot zu beginnen, müssen Sie den Benutzer mit "/ password phrase" authentifizieren, wobei **phrase** Ihr konfiguriertes Passwort ist. Öffnen Sie also eine neue Konversation mit Ihrem generierten Bot im Telegramm und geben Sie als ersten Befehl das Passwort ein.

** Hinweis: ** Sie können die Kurzform "/ p phrase" verwenden.

Um ein nettes Avatar-Bild hinzuzufügen, geben Sie `/setuserpic` ein und laden Sie das gewünschte Bild (512x512 Pixel) hoch, wie dieses [Logo](img/logo.png).

Sie können Nachrichten an alle authentifizierten Benutzer über die Nachrichtenbox `sendTo('telegram', 'Test message')` oder an bestimmte Benutzer `sendTo('telegram', '@userName Test message')` senden.
Der Benutzer muss zuvor authentifiziert worden sein.

Sie können den Benutzer auch so angeben:

```
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Wenn Sie das obige Beispiel verwenden, müssen Sie "Benutzername" entweder durch den Vornamen oder den öffentlichen Telegramm-Benutzernamen des Benutzers ersetzen, an den Sie die Nachricht senden möchten. (Hängt davon ab, ob die Einstellung "Benutzername nicht Vorname speichern" in den Adaptereinstellungen aktiviert ist oder nicht.) Wenn die Option aktiviert ist und der Benutzer keinen öffentlichen Benutzernamen in seinem Telegrammkonto angegeben hat, verwendet der Adapter weiterhin den Vornamen der Benutzer. Denken Sie daran, dass, wenn der Benutzer später (nach der Authentifizierung bei Ihrem Bot) einen öffentlichen Benutzernamen festlegt, der gespeicherte Vorname durch den Benutzernamen ersetzt wird, wenn der Benutzer das nächste Mal eine Nachricht an den Bot sendet.

Es ist möglich, mehr als einen Empfänger anzugeben (trennen Sie die Benutzernamen einfach durch Komma).
Beispiel: Empfänger: "Benutzer1, Benutzer4, Benutzer5"

Sie können die Nachricht auch über den Status senden, setzen Sie einfach den Status *"telegram.INSTANCE.communicate.response"* mit dem Wert *"@ userName Test message"*

## Verwendung
Sie können das Telegramm mit dem Adapter [text2command](https://github.com/ioBroker/ioBroker.text2command) verwenden. Es gibt vordefinierte Kommunikationsschemata und Sie können in Textform zu Ihnen nach Hause befehlen.

Um ein Foto zu senden, senden Sie einfach einen Pfad zur Datei anstelle von Text oder URL: `sendTo('telegram', 'absolute/path/file.png')` oder `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`.

Beispiel für das Senden eines Screenshots von einer Webcam an ein Telegramm:

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

Folgende Meldungen sind für Aktionen reserviert:

- *Eingabe* - für Kurzmitteilungen,
- *upload_photo* - für Fotos,
- *upload_video* - für Videos,
- *record_video* - für Videos,
- *record_audio* - für Audio,
- *upload_audio* - für Audio,
- *upload_document* - für Dokumente,
- *find_location* - für Standortdaten

In diesem Fall wird der Aktionsbefehl gesendet.

Die Beschreibung für die Telegramm-API finden Sie in [Hier](https://core.telegram.org/bots/api), und Sie können alle in dieser API definierten Optionen verwenden, indem Sie diese einfach in das Sendeobjekt einschließen. Z.B.:

```
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Möglichkeiten**:

- *disable_notification* Sendet die Nachricht unbemerkt. iOS-Benutzer erhalten keine Benachrichtigung, Android-Benutzer erhalten eine Benachrichtigung ohne Ton. (alle Arten)
- *parse_mode* Senden Sie Markdown oder HTML, wenn in Telegramm-Apps fetter, kursiver Text mit fester Breite oder Inline-URLs in der Nachricht Ihres Bots angezeigt werden sollen. Mögliche Werte: "Markdown", "HTML" (Nachricht)
- *disable_web_page_preview* Deaktiviert die Linkvorschau für Links in dieser Nachricht (Nachricht)
- *caption* Beschriftung für das Dokument, Foto oder Video, 0-200 Zeichen (Video, Audio, Foto, Dokument)
- *duration* Dauer des gesendeten Videos oder Audios in Sekunden (Audio, Video)
- *Darsteller* Darsteller der Audiodatei (Audio)
- *title* Spurname der Audiodatei (Audio)
- *width* Videobreite (Video)
- *height* Videohöhe (Video)

Der Adapter versucht, den Nachrichtentyp (Foto, Video, Audio, Dokument, Aufkleber, Aktion, Speicherort) zu erkennen. Dies hängt vom Text in der Nachricht ab. Wenn der Text der Pfad zu einer vorhandenen Datei ist, wird er entsprechend dem Typ gesendet.

Der Standort wird anhand der Attributbreite ermittelt:

```
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

### Explizite Nachrichtentypen
Sie haben die Möglichkeit, zusätzlich den Typ der Nachricht zu definieren, falls Sie die Daten als Puffer versenden möchten.

Folgende Typen sind möglich: *Aufkleber* *Video* *Dokument* *Audio* *Foto*

```
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### Tastatur
Sie können Tastatur **ReplyKeyboardMarkup** im Client anzeigen:

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

Sie können mehr lesen [hier] (https://core.telegram.org/bots/api#replykeyboardmarkup) und [hier](https://core.telegram.org/bots#keyboards).

Sie können die Tastatur **InlineKeyboardMarkup** im Client anzeigen:

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

Sie können mehr lesen [hier] (https://core.telegram.org/bots/api#inlinekeyboardmarkup) und [hier](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).

** HINWEIS: ** *Nachdem der Benutzer eine Rückruftaste gedrückt hat, zeigen Telegrammclients einen Fortschrittsbalken an, bis Sie answerCallbackQuery aufrufen. Es ist daher notwendig, durch Aufrufen von answerCallbackQuery zu reagieren, auch wenn keine Benachrichtigung an den Benutzer erforderlich ist (z. B. ohne Angabe eines der optionalen Parameter).*

### AnswerCallbackQuery
Verwenden Sie diese Methode, um Antworten auf Rückrufanfragen zu senden, die von Inline-Tastaturen gesendet wurden. Die Antwort wird dem Benutzer als Benachrichtigung am oberen Rand des Chat-Bildschirms oder als Warnung angezeigt. Bei Erfolg wird *True* zurückgegeben.

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

Sie können mehr lesen [Hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise).

### Frage
Sie können die Nachricht als Telegramm senden und die nächste Antwort wird als Rückruf zurückgesendet.
Das Zeitlimit kann in der Konfiguration festgelegt werden und beträgt standardmäßig 60 Sekunden.

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
Ab Version 0.4.0 können Sie die Chat-ID verwenden, um Nachrichten an den Chat zu senden.

`sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');`

## Aktualisiere Nachrichten
Mit den folgenden Methoden können Sie eine vorhandene Nachricht im Nachrichtenverlauf ändern, anstatt eine neue Nachricht mit dem Ergebnis einer Aktion zu senden. Dies ist am nützlichsten für Nachrichten mit *Inline-Tastaturen* die Rückrufanfragen verwenden, kann aber auch dazu beitragen, die Unordnung in Gesprächen mit regulären Chat-Bots zu verringern.

### EditMessageText
Verwenden Sie diese Methode, um vom Bot oder über den Bot gesendeten Text (für Inline-Bots) zu bearbeiten. Bei Erfolg wird die bearbeitete Nachricht zurückgegeben, wenn sie vom Bot gesendet wird. Andernfalls wird *True* zurückgegeben.

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

*oder neuer Text für die letzte Nachricht:*

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

Sie können mehr lesen [Hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise).

### EditMessageReplyMarkup
Verwenden Sie diese Methode, um nur die Antwortmarkierung von Nachrichten zu bearbeiten, die vom Bot oder über den Bot gesendet wurden (für Inline-Bots). Bei Erfolg wird die bearbeitete Nachricht zurückgegeben, wenn sie vom Bot gesendet wird. Andernfalls wird *True* zurückgegeben.

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

Sie können mehr lesen [Hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### Nachricht löschen
Verwenden Sie diese Methode, um eine Nachricht, einschließlich Dienstnachrichten, mit den folgenden Einschränkungen zu löschen:

- Eine Nachricht kann nur gelöscht werden, wenn sie vor weniger als 48 Stunden gesendet wurde.

Gibt bei Erfolg *True* zurück.

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

Sie können mehr lesen [Hier](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Spezielle Befehle
### / state stateName - Statuswert lesen
Sie können den Wert von state abfragen, wenn Sie jetzt die ID:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### / state stateName value - Setzt den Statuswert
Sie können den Wert von state setzen, wenn Sie jetzt die ID eingeben:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Polling- oder Servermodus
Wenn der Abfragemodus verwendet wird, fragt der Adapter standardmäßig alle 300 ms den Telegrammserver nach Updates ab. Es wird Datenverkehr verwendet und Nachrichten können bis zum Abrufintervall verzögert werden. Das Abfrageintervall kann in der Adapterkonfiguration definiert werden.

Um den Servermodus zu verwenden, muss Ihre ioBroker-Instanz über das Internet erreichbar sein (z. B. mit dem dynamischen DNS-Dienst von noip.com).

Telegramm kann nur mit HTTPS-Servern verwendet werden, Sie können jedoch Zertifikate verschlüsseln.

Folgende Einstellungen müssen für den Servermodus vorgenommen werden:

- URL - in der Form https://IhreDomain.com:8443.
- IP - IP-Adresse, an die der Server gebunden wird. Standardeinstellung 0.0.0.0. Ändern Sie es nicht, wenn Sie sich nicht sicher sind.
- Port - tatsächlich werden nur 443, 80, 88, 8443 Ports per Telegramm unterstützt, aber Sie können Ports über Ihren Router an jeden beliebigen Port weiterleiten.
- Öffentliches Zertifikat - Erforderlich, wenn **let's encrypt** deaktiviert ist.
- Privater Schlüssel - Erforderlich, wenn die Verschlüsselung deaktiviert ist.
- Kettenzertifikat (optional)
- Lassen Sie uns Optionen verschlüsseln - Es ist sehr einfach, Zertifikate einzurichten. Bitte lesen Sie [hier] (https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) darüber.

MACHEN:

- Veranstaltungsort
- Dialoge

## Changelog
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