---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asterisk/README.md
title: ioBroker Asterisk VoIP Адаптер
hash: H+/GtnFRdWUaR0uoJ4mzoeBUIoXKSQKmphpnfeqpC/0=
---
![логотип](../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

![Travis CI Статус сборки](https://travis-ci.org/schmupu/ioBroker.asterisk.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.asterisk?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/asterisk-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.asterisk.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.asterisk.svg)
![NPM](https://nodei.co/npm/iobroker.asterisk.png?downloads=true)

# IoBroker Asterisk VoIP-адаптер
[Немецкое руководство / Deutsche Anleitung](README_DE.md)

Адаптер Asterisk преобразует текстовые сообщения в аудиофайлы и звонки, а затем через Asterisk VoIP на любой телефонный номер и воспроизводит аудиосообщение.

## Установка / Конфигурации
Asterisk должен подключаться к исходящим звонкам с вашим VoIP-провайдером, таким как Telekom, Vodfone или FritzBox! Пожалуйста, следуйте одному из этих руководств по установке.

- Конфигурация [Asterisk через SIP с FritzBox] (docs / SIP_FRITZBOX.md) (самый простой способ)
- Конфигурация [Asterisk через PJSIP с FriztBox] (docs / PJSIP_FRITZBOX.md) (pjsip более современен как sip)
- Конфигурация [Asterisk через PJSIP с Telekom в качестве провайдера] (docs / PJSIP_TELEKOM.md)
- Конфигурация [Asterisk через PJSIP с Sipgate в качестве провайдера] (docs / PJSIP_SIPGATE.md)
- Конфигурация [ssh / scp] (docs / SSH.md) (ioBroker и asterisk работают на разных серверах)

## Использование Asterisk
### Использование Asterisk с объектами / состояниями для набора номера
Самый простой способ использовать звездочку - через страницу объектов ioBroker. Там заполните следующие значения в параметре dialout:

* звонок: кнопка, чтобы начать звонок
* callerid: телефонный номер, который будет показан вызываемому абоненту.
* dtmf: вызываемый абонент нажимает цифры на клавиатуре
* telnr: набираемый номер
* текст: текст, который будет воспроизведен для вызываемого

![iobroker_dialout](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialout.png)

### Использование Asterisk с объектами / состояниями для набора номера
Если вы настроили свой SIP-провайдер (например, Fritzbox, Sipgate, ...) и конфигурацию Asterisk для разрешения входящих звонков, вы можете установить следующий параметр

* callerid: телефонный номер, который называется астерикс
* dtmf: звонящие нажали цифры на клавиатуре
* текст: текст, который будет воспроизведен для абонента

![iobroker_dialin](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialin.png)

### Использование Asterisk с javascript или blocky для набора номера
Теперь вы можете использовать адаптер в вашем javascript или блочных программах.

```sh
var number   = "040 666-7766";
var callerid = '040 123 999'; // optional, if not set anonymous call
var msg      = "Hello, this textmessage will be converted to audio";

// call telephone nummber 040 666-7766 and play text message as audio
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, text:  msg},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// call telephone nummber 040 666-7766 and play mp3 audio file
// mp3 file has to exist on asterix server
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, aufiofile: '/tmp/audio.mp3'},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// call telephone nummber 040 666-7766 and play gsm audio file
// gsm file has to exist on asterix server
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, aufiofile: '/tmp/audio.gsm'},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// Show entered DTMF code
on({ id: "asterisk.0.dialin.dtmf"/*DTMF Code*/ },  (obj) => {
    let dtmf = obj.state.val;
    console.log("DTMF: " + dtmf);
});

// Show entered DTMF code
on({ id: "asterisk.0.dialout.dtmf"/*DTMF Code*/ },  (obj) => {
    let dtmf = obj.state.val;
    console.log("DTMF: " + dtmf);
});

```

> В операторе набора номера sendTo можно использовать следующий параметр:> - **language:** язык, используемый для функции преобразования текста в речь (tts). (допустимые значения: 'DE', 'EN', ... По умолчанию используется системный язык ioBroker)> - **repeat:** сколько раз должно повторяться звуковое сообщение (допустимые значения от 1 до n, по умолчанию 5)> - **приоритет:** если вы отправляете параллельно много операторов набора номера sendTo, сообщения с наименьшим приоритетом будут отправляться первыми (допустимые значения от 1 до n, по умолчанию 1)> - **текст:** текстовое сообщение, которое будет отправлено как аудио> - **время ожидания:** Время ожидания в миллисекундах, в течение которого будет происходить соединение (по умолчанию 60000 мс)> - **Асинхронизация:** Позволяет генерировать несколько вызовов без ожидания ответа (допустимые значения: false / true по умолчанию false)> - **аудиофайл:** если вы используете текстовый параметр. Преобразованный текст в аудио будет сохранен в аудиофайл. Если аудиофайл существует, он будет перезаписан. Если вы не используете текст параметра, аудиофайл будет воспроизведен.
> - **callerid:** Определяет идентификатор (номер телефона вашего отправителя). Если вызывающий абонент отсутствует, переданный номер телефона будет анонимным

## Решение проблем
Если у вас есть проблемы со звездочкой, вы можете попробовать найти что-то в лог-файлах в / var / log / asterisk. После того, как вы запустили звездочку, вы можете вызвать звездочку с помощью звездочки -rvvvvvv в командной оболочке для отладки. После того, как вы запустили звездочку -rvvvvvv, вы можете инициализировать вызов iobroker и посмотреть, что произойдет.

## Changelog

[Changelog](CHANGELOG.md)

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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