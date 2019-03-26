---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.telegram/README.md
title: Verschoben nach https://github.com/iobroker-community-adapters/ioBroker.telegram
hash: tbkO4QFjGv4W24/10mg5Q6clQWYyClDrwgTOJXOcMpA=
---
# Zu https://github.com/iobroker-community-adapters/ioBroker.telegram verschoben
![Logo](../../../en/adapterref/iobroker.telegram/admin/telegram.png)

![Anzahl der Installationen](http://iobroker.live/badges/telegram-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.telegram.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.telegram.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.telegram.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.telegram.png?downloads=true)

# IoBroker Telegrammadapter ===============
## Aufbau
Fragen Sie nach [@BotFather](https://telegram.me/botfather), um einen neuen Bot anzulegen. §JJJJJ_0§§.

Sie werden aufgefordert, den Namen des Bots und dann den Benutzernamen einzugeben.
Danach erhalten Sie das Token.

![Bildschirmfoto](../../../en/adapterref/iobroker.telegram/img/chat.png)

Sie sollten das Passwort für die Kommunikation im Konfigurationsdialog festlegen. Danach den Adapter starten.

Um ein Gespräch mit Ihrem Bot zu beginnen, müssen Sie den Benutzer mit "/ Kennwortsatz" authentifizieren, wobei **Satz** Ihr konfiguriertes Kennwort ist. Öffnen Sie also eine neue Konversation mit Ihrem generierten Bot in Telegram. Anschließend müssen Sie das Passwort als ersten Befehl eingeben.

** Hinweis: ** Sie können die Kurzform "/ p Phrase" verwenden.

Um ein schönes Avatar-Bild hinzuzufügen, geben Sie ```/setuserpic``` ein und laden Sie das gewünschte Bild (512x512 Pixel) hoch, wie dieses [Logo](img/logo.png).

Sie können eine Nachricht an alle authentifizierten Benutzer über messageBox ```sendTo('telegram', 'Test message')``` oder an einen bestimmten Benutzer ```sendTo('telegram', '@userName Test message')``` senden.
Der Benutzer muss zuvor authentifiziert werden.

Sie können den Benutzer auch so angeben:

```
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Wenn Sie das obige Beispiel verwenden, müssen Sie wissen, dass Sie 'UserName' entweder durch den Vornamen oder den Public-Telegram-Benutzernamen des Benutzers ersetzen müssen, an den Sie die Nachricht senden möchten. (Hängt davon ab, ob die Einstellung "Benutzername nicht Vornamen speichern" in den Adaptersettings aktiviert ist oder nicht.) Wenn die Option aktiviert ist und der Benutzer keinen öffentlichen Benutzernamen in seinem Telegrammkonto angegeben hat, verwendet der Adapter weiterhin den Vornamen der Nutzer. Wenn der Benutzer später einen öffentlichen Benutzernamen festlegt (nachdem er sich bei Ihrem Bot authentifiziert hat), wird der gespeicherte Vorname durch den Benutzernamen ersetzt, wenn der Benutzer das nächste Mal eine Nachricht an den Bot sendet.

Es ist möglich, mehrere Empfänger anzugeben (trennen Sie die Benutzernamen einfach durch Komma).
Zum Beispiel: Empfänger: "Benutzer1, Benutzer4, Benutzer5"

Sie können auch eine Nachricht über den Status senden, setzen Sie einfach den Status *"telegram.INSTANCE.communicate.response"* mit dem Wert *"@ userName Testnachricht"*

## Verwendungszweck
Sie können das Telegramm mit dem Adapter [text2Befehl](https://github.com/ioBroker/ioBroker.text2command) verwenden. Es gibt vordefinierte Kommunikationsschemas, die Sie in Textform an Sie nach Hause senden können.

Um ein Foto zu senden, senden Sie einfach einen Pfad zu einer Datei anstelle von Text oder URL: ```sendTo('telegram', 'absolute/path/file.png')``` oder ```sendTo('telegram', 'https://telegram.org/img/t_logo.png')```.

Beispiel zum Senden eines Screenshots von der Webcam an das Telegramm:

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

Die Beschreibung für die Telegramm-API finden Sie unter [Hier](https://core.telegram.org/bots/api). Sie können alle in dieser API definierten Optionen verwenden, indem Sie diese einfach in das Sendeobjekt einfügen. Z.B.:

```
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**Möglichkeiten**:

- *disable_notification* Sendet die Nachricht unbemerkt. iOS-Benutzer erhalten keine Benachrichtigung, Android-Benutzer erhalten eine Benachrichtigung ohne Ton. (alle Arten)
- *parse_mode* Markdown oder HTML senden, wenn Telegramm-Apps in der Nachricht des Bots fetten, kursiven, feststehenden Text oder Inline-URLs anzeigen sollen. Mögliche Werte: "Markdown", "HTML" (Nachricht)
- *disable_web_page_preview* Deaktiviert die Link-Vorschau für Links in dieser Nachricht (Nachricht).
- *caption* Beschriftung für das Dokument, Foto oder Video, 0-200 Zeichen (Video, Audio, Foto, Dokument)
- *duration* Dauer des gesendeten Videos oder Audios in Sekunden (Audio, Video)
- *Performer* Performer der Audiodatei (Audio)
- *title* Spurname der Audiodatei (Audio)
- *width* Videobreite (Video)
- *height* Videohöhe (Video)

Der Adapter versucht, den Nachrichtentyp (Foto, Video, Audio, Dokument, Aufkleber, Aktion, Ort) zu ermitteln. Er hängt vom Text in der Nachricht ab. Wenn es sich bei dem Text um den Pfad zu einer vorhandenen Datei handelt, wird er entsprechend dem Typ gesendet.

Der Ort wird auf der Attributbreite erkannt:

```
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

### Explizite Arten von Nachrichten
Sie haben die Möglichkeit, zusätzlich den Typ der Nachricht zu definieren, falls Sie die Daten als Puffer senden möchten.

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

** HINWEIS: ** *Nachdem der Benutzer eine Rückruftaste gedrückt hat, zeigen Telegramm-Clients eine Fortschrittsleiste an, bis Sie answerCallbackQuery aufrufen. Es ist daher notwendig, mit dem Aufruf von answerCallbackQuery zu reagieren, auch wenn keine Benachrichtigung des Benutzers erforderlich ist (z. B. ohne Angabe optionaler Parameter).*

### AnswerCallbackQuery
Verwenden Sie diese Methode, um Antworten an Rückrufabfragen zu senden, die von Inline-Tastaturen gesendet werden. Die Antwort wird dem Benutzer als Benachrichtigung oben auf dem Chat-Bildschirm oder als Benachrichtigung angezeigt. Bei Erfolg wird *True* zurückgegeben.

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

## Chat-ID
Ab Version 0.4.0 können Sie die Chat-ID verwenden, um Nachrichten an den Chat zu senden.

```sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');```

## Aktualisiere Nachrichten
Mit den folgenden Methoden können Sie eine vorhandene Nachricht im Nachrichtenverlauf ändern, anstatt eine neue mit einem Ergebnis einer Aktion zu senden. Dies ist am nützlichsten für Nachrichten mit *Inline-Tastaturen* die Rückrufabfragen verwenden, kann jedoch auch dazu beitragen, das Durcheinander in Gesprächen mit normalen Chat-Bots zu reduzieren.

### EditMessageText
Verwenden Sie diese Methode, um Text zu bearbeiten, der vom Bot oder über den Bot (für Inline-Bots) gesendet wird. Wenn die bearbeitete Nachricht vom Bot gesendet wird, wird die bearbeitete Nachricht zurückgegeben, andernfalls wird *True* zurückgegeben.

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

* oder neuer Text für letzte Nachricht: *

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
Verwenden Sie diese Methode, um nur das Antwort-Markup von Nachrichten zu bearbeiten, die vom Bot oder über den Bot (für Inline-Bots) gesendet werden. Wenn die bearbeitete Nachricht vom Bot gesendet wird, wird die bearbeitete Nachricht zurückgegeben, andernfalls wird *True* zurückgegeben.

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

Sie können mehr lesen [Hier](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise).

### Nachricht löschen
Verwenden Sie diese Methode, um eine Nachricht einschließlich Servicemeldungen mit den folgenden Einschränkungen zu löschen:

- Eine Nachricht kann nur gelöscht werden, wenn sie vor weniger als 48 Stunden gesendet wurde.

Gibt bei Erfolg *True* zurück.

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

Sie können mehr lesen [Hier](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage).

## Spezielle Befehle
### / state stateName - Zustandswert lesen
Sie können den Statuswert abfragen, wenn Sie jetzt die ID:

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### / state stateName value - Setzt den Statuswert
Sie können den Statuswert festlegen, wenn Sie jetzt die ID:

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## Abruf- oder Servermodus
Wenn der Abfragemodus verwendet wird, fragt der Adapter den Telegrammserver standardmäßig alle 300ms nach Updates ab. Es verwendet Datenverkehr und Nachrichten können bis zum Abrufintervall verzögert werden. Das Abfrageintervall kann in der Adapterkonfiguration definiert werden.

Um den Servermodus zu verwenden, muss Ihre ioBroker-Instanz über das Internet erreichbar sein (z. B. mit dem dynamischen DNS-Dienst noip.com).

Telegramm kann nur mit HTTPS-Servern arbeiten. Sie können jedoch **let's-Verschlüsselung** -Zertifikate verwenden.

Folgende Einstellungen müssen für den Servermodus vorgenommen werden:

- URL - in der Form https://ihredomain.com:8443.
- IP - IP-Adresse, an die der Server gebunden wird. Standardeinstellung 0.0.0.0. Ändern Sie es nicht, wenn Sie sich nicht sicher sind.
- Port - Tatsächlich werden nur 443, 80, 88, 8443 Ports von Telegramm unterstützt, Sie können jedoch Ports über Ihren Router an jeden weiterleiten.
- Öffentliches Zertifikat - erforderlich, wenn ** Verschlüsselung deaktiviert ist.
- Privater Schlüssel - erforderlich, wenn ** Verschlüsselung deaktiviert ist.
- Kettenzertifikat (optional)
- Lassen Sie uns Optionen verschlüsseln - Es ist sehr einfach einzurichten **lassen wir** Zertifikate verschlüsseln. Bitte lesen Sie [hier] (https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates) darüber.

MACHEN:

- Veranstaltungsort
- Dialoge

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