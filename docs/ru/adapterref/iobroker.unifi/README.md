---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: kFyo7IFLR+tNno50/9qIzmvw1KifmmU9kDFnJPnmmhc=
---
![логотип](../../../en/adapterref/iobroker.unifi/admin/unifi.png)

![Статус сборки](https://travis-ci.org/iobroker-community-adapters/ioBroker.unifi.svg?branch=master)
![Количество установок](http://iobroker.live/badges/unifi-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.unifi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.unifi.svg)
![NPM](https://nodei.co/npm/iobroker.unifi.png?downloads=true)

# IoBroker.unifi
Этот адаптер ioBroker позволяет осуществлять мониторинг [Устройства UniFi](http://www.ubnt.com/), таких как точки доступа UniFi WiFi, с помощью общедоступного веб-API UniFi Controller.

## Важная информация
Адаптер находится в стадии разработки. На данный момент в ваш ioBroker можно получить информацию только с вашего контроллера UniFi.

## Конфигурация
### Минимально необходимая информация
Для запуска и запуска этого адаптера необходима следующая информация:

* IP-адрес и порт вашего контроллера UniFi
* Имя пользователя и пароль
* Интервал обновления

По умолчанию информация обновляется каждые 60 секунд. В зависимости от вашего оборудования ioBroker и размера вашей сети (количество клиентов, устройства UniFi и т. Д.) Дальнейшее уменьшение интервала не рекомендуется.

### Черные списки
Адаптер обновляет как можно больше информации с вашего контроллера UniFi, но предлагает возможность ограничить обновленную информацию.

Можно отключить обновление выбранной информации или внести в черный список определенные элементы этой информации.

| Информация | Элементы черного списка по |
|-------------|-----------------------------------------|
| Клиенты | Имя, Имя хоста, IP-адрес, MAC-адрес |
| Устройства | Имя, IP-адрес, MAC-адрес |
| WLAN | Имя |
| Сети | Имя |
| Здоровье | Подсистема |

## Контроль
### Включить / отключить WLAN
Изменяя состояние «включено» WLAN, можно включить / отключить его. Через несколько секунд изменение будет предоставлено точкам доступа.

## Ссылки
Этот адаптер использует функциональность следующих сторонних модулей nodejs:

* [node-unifi] (https://github.com/jens-maus/node-unifi)
* [json-logic-js] (https://github.com/jwadhams/json-logic-js)

## Changelog
### __WORK IN PROGRESS__
* (braindead1) Implemented possibility to enable/disable WLANs

### 0.5.0 (2020-05-09)
* (braindead1) Implemented configuration of updates
* (braindead1) Improved JsonLogic
* (braindead1) Removed legacy code
* (braindead1) Implemented Sentry

### 0.4.3 (2020-04-24)
* (braindead1) fixed configuration issue

### 0.4.2 (2020-04-23)
* (braindead1) subsystem issue fixed

### 0.4.1 (2020-04-16)
* (braindead1) Enhanced refactoring

### 0.4.0 (2020-04-16)
* (bluefox) Refactoring
  
### 0.3.1
* (jens-maus) added support for multi-site environments.

### 0.3.0
* (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
* (jens-maus) minor fixes

### 0.2.0
* (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
* (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
* (jens-maus) initial checkin of non-working development version

## License
The MIT License (MIT)

Copyright (c) 2020 braindead1 &lt;os.braindead1@gmail.com&gt;
Copyright (c) 2016-2020 Jens Maus &lt;mail@jens-maus.de&gt;

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