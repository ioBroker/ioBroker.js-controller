---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bshb/README.md
title: ioBroker.bshb
hash: Utg7/uDA/cK1Wc29XecalUq6bn8n6olNOfmw9sqEm0A=
---
![Логотип](../../../en/adapterref/iobroker.bshb/admin/bshb-logo.jpg)

![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.bshb.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bshb.svg)
![Количество установок (последнее)](http://iobroker.live/badges/bshb-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/bshb-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/holomekc/ioBroker.bshb/badge.svg)
![NPM](https://nodei.co/npm/iobroker.bshb.png)
![Трэвис-Си](http://img.shields.io/travis/holomekc/ioBroker.bshb/master.svg)

# IoBroker.bshb
[![Статус зависимости] (https://david-dm.org/holomekc/iobroker.bshb.svg)](https://david-dm.org/holomekc/iobroker.bshb)

## Адаптер bosch-smart-home-bridge для ioBroker
Этот адаптер позволяет обмениваться данными с устройствами Bosch Smart Home.

[Контроллер умного дома Bosch](https://www.bosch-smarthome.com/de/de/produkte/smart-system-solutions/smart-home-controller)

Для этого он использует библиотеку [мост для умного дома bosch](https://github.com/holomekc/bosch-smart-home-bridge), которая использует информацию из официального [Локальный интерфейс REST API контроллера умного дома Bosch](https://github.com/BoschSmartHome/bosch-shc-api-docs).

Обсуждение на форуме ioBroker адаптера BSHB: https://forum.iobroker.net/topic/25370/test-adapter-bshb-bosch-smart-home-v0-0-x/

Примеры: https://github.com/holomekc/ioBroker.bshb/wiki/Examples

Работа в процессе. Обратная связь приветствуется.

Если вы хотите поддержать работу, я буду признателен за небольшое пожертвование. Это на 100% добровольно и не обязательно для использования адаптера. Вы найдете ссылку вверху.

## Changelog

### 0.1.13
* (holomekc) update to api-version 2.1
* (holomekc) add intrusionDetectionControl folder which contains trigger for alarm system

### 0.1.12
* (holomekc) states and units
* (holomekc) update license and copyright
* (holomekc) fix typo in connectionType

### 0.1.11
* (holomekc) update dependencies
* (holomekc) changes due to new ioBroker lib
* (holomekc) add connection indicator
* (holomekc) increase delay for timeout for longpolling to 2s
* (holomekc) low not set as lowbat role in ioBroker anymore

### 0.1.10
* (holomekc) Add .npmignore to cleanup installation files

### 0.1.9
* (holomekc) Error in scenario handling fixed

### 0.1.8
* (holomekc) Minor improvements

### 0.1.7
* (holomekc) Improved error handling

### 0.1.6
* (holomekc) Added open doors and windows feature

### 0.1.5
* (holomekc) functions and rooms are only added for new channels 
* (holomekc) increase timeout for requests which expect to contain more data

### 0.1.4
* (holomekc) issue fixed in loading configuration
* (holomekc) minor restructuring

### 0.1.3
* (holomekc) restructure of handling device detection and updates iobroker <-> bshc via BshbHandler
* (holomekc) added handler for devices, scenarios and messages
* (holomekc) messages and scenarios are updated when adapter is running

### 0.1.2
* (holomekc) Adapter core library updated

### 0.1.1
* (holomekc) update to new bridge version
* (holomekc) allows adapter to reconnect in case bshc is restarting
* (holomekc) remove not needed configuration
* (holomekc) faults added to all service (channels)
* (holomekc) faults are always a list: [] = no faults, \[{source: {rootDeviceId: string, deviceServiceId: string, deviceId: string}, type: string, category: INFO | WARNING | ERROR}, ...\] = faults

### 0.1.0
* (holomekc) certificate and private key are handled in ioBroker and can be content or file reference
* (holomekc) update to newer bridge version

### 0.0.14
* (holomekc) optimizations and cleanup

### 0.0.13
* (holomekc) added more definitions
* (holomekc) optimizations and cleanup

### 0.0.12
* (holomekc) scenario support. Scenarios are listed as group 'scenarios' and can only be triggered
* (holomekc) added definitions for Twinguard

### 0.0.11
* (holomekc) rooms and functions added for known channels
* (holomekc) trim whitespaces from configuration values

### 0.0.10
* (holomekc) try to improve configuration description in application itself
* (holomekc) change id so that it is valid regarding Bosch T&C
* (holomekc) update to newest bosch-smart-home-bridge version for same reason

### 0.0.9
* (holomekc) update travis.yml due to jscontroller requires node dependency >=8.0

### 0.0.8
* (holomekc) fix client name is: ioBroker.bshb

### 0.0.7
* (holomekc) make sure that bosch-smart-home-bridge version >= 0.0.4

### 0.0.6
* (holomekc) Just io-package.json changes
* (holomekc) cleanup

### 0.0.5
* (holomekc) Just do the steps adapter-check is telling me
* (holomekc) Therefore, build files are part of git repo. So install via Github should be possible now

### 0.0.4
* (holomekc) Long polling added to reduce load
* (holomekc) Set of state values is possible now
* (holomekc) Code cleanup

### < 0.0.4
* (holomekc) certificate generation added
* (holomekc) first attempts to creat ioBroker objects, states, etc.

## License

MIT License

Copyright (c) 2021 Christopher Holomek <holomekc.github@gmail.com>

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