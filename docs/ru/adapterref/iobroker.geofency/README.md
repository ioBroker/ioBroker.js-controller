---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.geofency/README.md
title: ioBroker.geofency
hash: /Hr5Dz3mNY4oC17SdjVrA3/ev+RnM3cakDuPwTgkyFk=
---
![логотип](../../../en/adapterref/iobroker.geofency/admin/geofency.png)

![Количество установок](http://iobroker.live/badges/geofency-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.geofency.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.geofency.svg)
![NPM](https://nodei.co/npm/iobroker.geofency.png?downloads=true)

# IoBroker.geofency ====================
Этот адаптер может принимать события [geofency](http://www.geofency.com/) при входе или выходе из определенной области с помощью мобильного устройства.
Все значения geofency-webhook запроса хранятся под именем местоположения в ioBroker.

## Конфигурация на мобильном устройстве:
* для любого места -> свойства -> настройки webhook:
 * URL для входа и выхода: & lt; ваш домен ioBroker & gt;: & lt; настроенный порт & gt; / & lt; любое имя местоположения & gt;
 * Формат записи: JSON-кодированный: включен
 * аутентификация: установите имя пользователя / пароль из конфигурации iobroker.geofency

## На форуме ioBroker (немецкий)
http://forum.iobroker.net/viewtopic.php?f=20&t=2076

## Примечание по безопасности:
Не рекомендуется выставлять этот адаптер в общедоступный интернет.
Какой-то WAF / proxy / entry Server следует поставить перед ioBroker. (например, nginx хорош и прост в настройке).

## Changelog
### 0.3.2 (2018-03-07)
* (Apollon77) Fix Authentication

### 0.3.0 (2017-10-04)
* (Apollon77) BREAKING!!! Make sure 'entry' is really a boolean as defined in object

### 0.2.0 (2017-06-09)
* (Apollon77) Add missing authentication check
* (Apollon77) Add option to send in data as Message when received over other ways
* (Apollon77) Add option not to start a webserver for cases where data are received using messages

### 0.1.5 (2016-09-19)
* (soef) support of certificates

### 0.1.4 (2016-03-29)
* (dschaedl) replaced geofency Icon (on request of bluefox)

### 0.1.3 (2016-03-29)
* (soef) fixed atHome and atHomeCount state creation

### 0.1.2 (2016-02-13)
* (soef) Dots in location name will be replaced by an underscore

### 0.1.1 (2016-02-01)
* (Pmant) Fix config page

### 0.1.0 (2016-01-26)
* (soef) Fix error with "at home" settings

### 0.0.4 (2016-01-24)
* (soef) Added some new states

### 0.0.3 (2016-01-21)
* (soef) Some modifications
* (bluefox) change type

### 0.0.2
* (dschaedl) moved to iobroker/iobroker.geofency

### 0.0.1
* (dschaedl) initial release

## License

The MIT License (MIT)

Copyright (c) 2015 dschaedl <daniel.schaedler@gmail.com>

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