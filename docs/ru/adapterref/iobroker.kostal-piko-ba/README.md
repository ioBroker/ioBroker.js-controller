---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kostal-piko-ba/README.md
title: ioBroker.kostal-piko-ba
hash: n4Ot9pfMU0UfRGYsADnc9pRw0XapMD0jittPQnQcxrQ=
---
![Логотип](../../../en/adapterref/iobroker.kostal-piko-ba/admin/picoba.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.kostal-piko-ba.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kostal-piko-ba.svg)
![Статус зависимости](https://img.shields.io/david/hombach/ioBroker.kostal-piko-ba.svg)
![Известные уязвимости](https://snyk.io/test/github/hombach/ioBroker.kostal-piko-ba/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.kostal-piko-ba.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/hombach/ioBroker.kostal-piko-ba/master.svg)

# IoBroker.kostal-piko-ba
![Версия NPM (стабильная)](http://ioBroker.live/badges/kostal-piko-ba-stable.svg) ![Количество установок (последнее)](http://ioBroker.live/badges/kostal-piko-ba-installed.svg)

![Node.js CI](https://github.com/hombach/ioBroker.kostal-piko-ba/workflows/Node.js%20CI/badge.svg)

Этот адаптер использует службу Sentry.io для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств. Подробнее см. Ниже!

## Адаптер для чтения данных Kostal Piko BA для iOBroker
Адаптер для чтения данных Косталь Пико БА. Адаптер последовательно создает несколько состояний и обновляет.

### Настройки
Для подключения к инвертору Kostal Pico BA введите его IP-адрес в config.

### Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать обзор ошибок в своих приложениях. Именно это и реализовано в этом адаптере.
Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry.
Когда вы разрешили iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки.
Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой.
Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

## Changelog
### 1.0.3 (23.09.2020)
* (HombachC) bumbed got; added battery.temperature

### 1.0.2 (23.09.2020)
* (HombachC) optimized object roles

### 1.0.1 (22.09.2020)
* (HombachC) bumped dependencies; added some clearing of timeouts

### 1.0.0 (11.09.2020)
* (HombachC) first public release for stable repo

### 0.8.5 (26.08.2020)
* (HombachC) bumped dependencies

### 0.8.2 (18.08.2020)
* (HombachC) changed scheduling code

### 0.8.0 (18.08.2020)
* (HombachC) seperate editable poll timer for statistics data

### 0.7.4 (03.07.2020)
* (HombachC) added sentry.io support

### 0.6.1 (28.06.2020)
* (HombachC) poll of statistics data separated

### 0.5.1 (22.06.2020)
* (HombachC) introduced editable poll interval 

### 0.1.0 (15.05.2020)
* (HombachC) initial working release

## License
MIT License

Copyright (c) 2020 HombachC

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