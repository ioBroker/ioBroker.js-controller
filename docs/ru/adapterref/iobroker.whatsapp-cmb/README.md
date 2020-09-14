---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.whatsapp-cmb/README.md
title: ioBroker.whatsapp-cmb
hash: wMjP379z/22SVfPrzHO9w5DW5qO4gT0PAqtpv7kgXyA=
---
![Логотип](../../../en/adapterref/iobroker.whatsapp-cmb/admin/whatsapp-cmb.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.whatsapp-cmb.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.whatsapp-cmb/badge.svg)
![NPM](https://nodei.co/npm/iobroker.whatsapp-cmb.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/ioBroker/ioBroker.whatsapp-cmb/master.svg)

# IoBroker.whatsapp-cmb
## Адаптер whatsapp-cmb для ioBroker
Большое спасибо бесплатному сервису [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/), этот адаптер позволяет отправлять сообщения WhatsApp себе или на другой номер.

** Примечание **: *Бесплатный API предназначен только для личного использования!*

### Конфигурация
*Следующая документация была скопирована со страницы [callmebot](https://www.callmebot.com/blog/free-api-whatsapp-messages/).*

Перед использованием API необходимо получить ключ API от бота:

- Добавьте телефонный номер +34 698 28 89 73 в свои телефонные контакты. (Назовите его как хотите.)
- Отправьте это сообщение «Я разрешаю callmebot отправлять мне сообщения» (на английском языке) новому созданному контакту (конечно, с помощью WhatsApp).
- Подождите, пока не получите сообщение «API активирован для вашего номера телефона. Ваш APIKEY - 123123` от бота. Поскольку он все еще находится в стадии бета-тестирования, активация может занять до 2 минут.
- Сообщение WhatsApp от бота будет содержать ключ API, необходимый для отправки сообщений с помощью API.
- Теперь вы можете использовать API KEY в конфигурации ioBroker.

Пример: ![пример](../../../en/adapterref/iobroker.whatsapp-cmb/img/whatsapp.jpg)

### Использование
Есть две возможности отправить сообщение:

- через `whatsapp-cmb.0.sendMessage`. Просто введите текст в это состояние, и сообщение будет отправлено на номер по умолчанию, который был настроен в диалоге настроек.
- через сообщение от адаптера javascript:

```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message',
    phone: '+491234567890' // optional, if empty the message will be sent to the default configured number
});
```

![Блочно](../../../en/adapterref/iobroker.whatsapp-cmb/img/blockly.png)

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 0.1.6 (2020-08-31)
* (Apollon77) Fixed the error with the phone number

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