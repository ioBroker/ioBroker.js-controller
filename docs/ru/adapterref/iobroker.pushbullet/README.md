---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pushbullet/README.md
title: без названия
hash: kJ0zgTEjLANl9bgHFl4Jz+xj3LlmAK61u53V7xo7Sjo=
---
![логотип](../../../en/adapterref/iobroker.pushbullet/admin/pushbullet.png) ioBroker pushbullet Adapter ==============

Отправка pushbullet уведомлений от ioBroker.
Этот адаптер в основном основан на Pushover Adapter для ioBroker.

### 0.0.11 (2015-10-11)
* (Jens1809) Человек канн монахиня Пушнахричен в лучшем виде.
* sendTo ("pushbullet", {

message: "body message", // Сообщение, которое вы хотите отправить title: "title", // Заголовок вашего типа сообщения: "note", // Тип Получатель заметки: "ID hier einsetzen" // GeräteID}) ;

### 0.0.8 (2015-09-26)
* (Jens1809) Адаптер empfängt nun Push Nachrichten и schreibt die Daten der Nachricht в объекте:
* - pushbullet.0.push.type
  - pushbullet.0.push.title
  - pushbullet.0.push.message
  - pushbullet.0.push.payload

### 0.0.7 (2015-09-24)
* (Jens1809) Möglichkeit ausgewählte Geräte zu senden ohne and den kompletten Account zu senden.

### 0.0.6 (2015-07-25)
* (Jens1809) Опубликовать на NPM

## Установить
```npm install https://github.com/Jens1809/iobroker.pushbullet/tarball/master/```

## Конфигурация
## Использование
Чтобы отправить уведомление от ScriptEngine, просто напишите:

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