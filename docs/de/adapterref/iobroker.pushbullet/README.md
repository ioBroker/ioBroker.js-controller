---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pushbullet/README.md
title: kein Titel
hash: kJ0zgTEjLANl9bgHFl4Jz+xj3LlmAK61u53V7xo7Sjo=
---
![Logo](../../../en/adapterref/iobroker.pushbullet/admin/pushbullet.png) ioBroker Pushbullet Adapter ===============

Senden Sie Pushbullet-Benachrichtigungen von ioBroker.
Dieser Adapter basiert hauptsächlich auf dem Pushover-Adapter für Bluebox für ioBroker.

### 0.0.11 (2015-10-11)
* (Jens1809) Man kann nun Pushnachrichten an bestimmte Geräte schicken, die die GeräteID mit angibt.
* sendTo ("Pushbullet"), {

message: "message body", // Die Nachricht, die Sie senden möchten Titel: "title", // Der Titel Ihres Nachrichtentyps: "note", // Type Hinweis Empfänger: "ID hier einsetzen" // GeräteID}) ;

0,08 (2015-09-26)
* (Jens1809) Adapter empfangen nun Push Nachrichten und schreibt die Daten in den Objekten:
* - pushbullet.0.push.type
  - Pushbullet.0.push.title
  - Pushbullet.0.push.message
  - Pushbullet.0.push.payload

0,07 (24.09.2015)
* (Jens1809) Möglichkeit an ausgewählten Geräten ohne Zugriff auf den kompletten Account zu senden.

### 0.0.6 (2015-07-25)
* (Jens1809) Auf NPM veröffentlichen

## Installieren
```npm install https://github.com/Jens1809/iobroker.pushbullet/tarball/master/```

## Aufbau
## Verwendungszweck
Um eine Benachrichtigung von ScriptEngine zu senden, schreiben Sie einfach:

```javascript
// send note
sendTo("pushbullet", "message body");

//OR

sendTo("pushbullet", {
    message: "message body",    //The Message you want to send
    title: "title",             //The Title of your message
    type: "note"                //Type Note
});

// send link
sendTo("pushbullet", {
    link: "http://www.example.com", //The Link you want to send
    title: "Title",             //The Title of your link
    type: "link"                //Type link
});

// send file

sendTo("pushbullet", {
    file: "/path/to/file",  //The file you want to send
    title: "Title",         //The Title of your file
    type: "file"            //Type file
});

```

## License

The MIT License (MIT)

Copyright (c) 2015 Jens1809

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