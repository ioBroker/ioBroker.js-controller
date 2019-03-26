---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iogo/README.md
title: ioBroker.iogo
hash: zs7UW0HgpBA0XC5DMs3tWSub1JZijsFLm/oEkvK+vhw=
---
![логотип](../../../en/adapterref/iobroker.iogo/admin/iogo.png)

![Количество установок](http://iobroker.live/badges/iogo-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.iogo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iogo.svg)
![Трэвис-CI](http://img.shields.io/travis/nisiode/ioBroker.iogo/master.svg)
![NPM](https://nodei.co/npm/iobroker.iogo.png?downloads=true)

# IoBroker.iogo
=================

Этот адаптер добавляет дополнительные функции в приложение smarthome ioGo (https://play.google.com/store/apps/details?id=de.nisnagel.iogo).
Пожалуйста, перейдите в настройки / учетную запись, чтобы зарегистрироваться по электронной почте и паролю.
После создания учетной записи в приложении вы можете использовать этот адаптер для push-уведомлений.
Кроме того, этот адаптер хранит текущее состояние ваших устройств SmartHome.

## Конфигурация
Вы должны установить данные своей учетной записи (адрес электронной почты / пароль). После этого запустите адаптер.

## Использование
Вы можете отправить сообщение всем аутентифицированным пользователям через блок сообщения ```sendTo('iogo', 'New message')``` или конкретному пользователю ```sendTo('iogo', {user: 'Username', text: 'Test message'})```.
Пользователь должен быть создан до (пожалуйста, прочитайте документацию приложения для более подробной информации).

Можно указать более одного получателя (просто разделите имена пользователей запятыми). Например: Получатель: «Пользователь1, Пользователь4, Пользователь5»

Пример, как отправить уведомление настроенное сообщение с JavaScript:

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

И один пример с блочной:

![блок](../../../en/adapterref/iobroker.iogo/img/blockly.png)

Обратные вызовы также поддерживаются:

```
sendTo('iogo', {title: 'News', text: 'New message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

** Возможные варианты **:

- *пользователь* один пользователь или список пользователей
- *текст* основной текст уведомления
- *title* заголовок уведомления

## PRO Особенности
Профессиональные функции доступны сразу после покупки ежемесячной / годовой подписки в приложении ioGo.

### Изображений ###
Просто отправьте путь к изображению вместо текста ```sendTo('iogo.0', 'absolute/path/file.png')```

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

## Changelog
### 0.3.0
* (nisio) added support of compact mode

### 0.2.x
* (nisio) added pro features

### 0.1.x
* (nisio) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 Nis Nagel <support@nisnagel.de>

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