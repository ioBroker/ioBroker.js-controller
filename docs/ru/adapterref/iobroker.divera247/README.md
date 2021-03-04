---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.divera247/README.md
title: ioBroker.divera247
hash: JjgBOR1CmUpmMJgMG123gCGZca7XbSGcKClNlpMf7HQ=
---
![Логотип](../../../en/adapterref/iobroker.divera247/admin/divera247_long.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.divera247.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.divera247.svg)
![Количество установок (последнее)](http://iobroker.live/badges/divera247-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/divera247-stable.svg)
![Статус зависимости](https://img.shields.io/david/TKnpl/iobroker.divera247.svg)
![Известные уязвимости](https://snyk.io/test/github/TKnpl/ioBroker.divera247/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.divera247.png?downloads=true)

# IoBroker.divera247
** Тесты: ** ![Тестирование и выпуск](https://github.com/TKnpl/ioBroker.divera247/workflows/Test%20and%20Release/badge.svg)

## Divera247 адаптер для ioBroker
Адаптер для службы оповещения "Дивера 24/7"

## Требования
Для полноценного использования этого адаптера ваша организация должна подписаться на тарифный план «Тревога» услуг Divera 24/7.

## Конфигурация этого адаптера
Для этого адаптера необходимо ввести ключ API вашей организации «Divera 24/7».
Чтобы узнать ключ API, перейдите в официальный [Веб-сайт Divera 24/7](https://www.divera247.com/) и перейдите в раздел администрирование -> настройки -> интерфейсы -> API. Здесь вы можете найти токен в области «авторизация».

Кроме того, вы можете ограничить срабатывание сигналов тревоги для определенных пользователей.
Для этого вам необходимо ввести идентификаторы пользователей Divera на странице администратора этого адаптера. Несколько идентификаторов пользователей можно указать через запятую (,).
Чтобы узнать идентификатор пользователя, перейдите в официальный [Веб-сайт Divera 24/7](https://www.divera247.com/) и перейдите в профиль пользователя -> настройки -> отладка -> «Aktuelle ID».

Чтобы подписаться **на все будильники** просто оставьте соответствующее поле пустым.

Также выберите интервал обновления для вызова API-сервера. Рекомендуется 30 секунд. Минимум 10 секунд.

## Changelog

### 0.0.10
* (TKnpl) bug in info.connection fixed and handling of user ids expanded

### 0.0.9
* (TKnpl) added default values for admin page

### 0.0.8
* (TKnpl) Changed API call from intervall to timeout, added states 'group' and 'foreign_id'

### 0.0.7
* (TKnpl) added object 'priority' and 'alarm' object updates only in case of an new alarm or when an alarm was closed

### 0.0.6
* (TKnpl) state handling while active alarm and connection check improved, fixed object types

### 0.0.5
* (TKnpl) fixed io-package news issue

### 0.0.4
* (TKnpl) Connection check to api improved, added timestamp of latest alert

### 0.0.3
* (TKnpl) added title, text, address, latitude, longitude, general formatting

### 0.0.2
* (TKnpl) adjusted translation

### 0.0.1
* (TKnpl) initial commit

## License
MIT License

Copyright (c) 2021 TKnpl <dev@t-concepts.de>

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