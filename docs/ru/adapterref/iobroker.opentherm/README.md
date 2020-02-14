---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.opentherm/README.md
title: ioBroker.opentherm
hash: TT07Q6Qq2KXWMzdu39Uyobzc+G9cSxBhxbb0CaseEWc=
---
![логотип](../../../en/adapterref/iobroker.opentherm/admin/opentherm.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.opentherm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.opentherm.svg)
![Количество установок (последняя)](http://iobroker.live/badges/opentherm-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/opentherm-stable.svg)
![Состояние зависимости](https://img.shields.io/david/iobroker-community-adapters//iobroker.opentherm.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters//ioBroker.opentherm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.opentherm.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters//ioBroker.opentherm/master.svg)

# IoBroker.opentherm
Этот адаптер объединяет все функции шлюза opentherm в ioBroker.
Opentherm - это протокол шлюза, используемый несколькими современными системами отопления, такими как Remeha.

Для получения дополнительной информации http://otgw.tclcode.com/index.html#intro со всеми кредитами для разработчиков.

### Рекомендуемая функциональность в конечном состоянии:
* Предоставьте сервер ретрансляции TCP / IP, чтобы разрешить подключение другого программного обеспечения монитора OpenTherm к этому экземпляру (при использовании прямого подключения USB)
* Где возможно, отрегулируйте значения в ioBroker и отправьте команду в Opentherm
* Пожалуйста, не стесняйтесь добавлять запросы функций

### В настоящее время реализовано
* Подключение к OpenTherm Gateway по TCP / IP
* Подключение к OpenTherm Gateway напрямую через USB-соединение

## Сделать
* Подключение к OpenTherm Gateway напрямую через USB-соединение
* Предоставьте сервер ретрансляции TCP / IP, чтобы разрешить подключение другого программного обеспечения монитора OpenTherm к этому экземпляру (при использовании прямого подключения USB)
* Где

## Поддержите меня
Если вам нравится моя работа, пожалуйста, не стесняйтесь предоставить личное пожертвование (это личная ссылка на пожертвования для DutchmanNL, никакого отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.2.3
* Adapter fully rebuilded

### 0.2.2
* Fix read TCP/IP data (svenp)

### 0.2.1
* Fix translations

### 0.1.9
* Implemented direct connection by USB
* added configuration options to adapter settings
* Fixed issue for incorrect logging

### 0.1.8
* Fixed issue for incorrect object type (boolean/number/string)
* Implemented rounding states to 1 digit after comma

### 0.1.7
* implemented Developer mode (all states for all message types will be created in _Dev
* Implemented Developer Logging mode (if not activated no information is written to log !)
* Several small backend fixes

### 0.1.6
* Creation of logical channels
* creation of states
* reduced logging, all received messages still in log during beta for data gathering
* creation of definition file (please feel free to provide input)

### 0.1.0
* Data reading by TCP connection to logfile 

### 0.0.1
* (Dutchman) initial commit

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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