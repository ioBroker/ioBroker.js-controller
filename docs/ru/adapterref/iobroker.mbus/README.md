---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mbus/README.md
title: ioBroker.mbus
hash: L2+Sd6JuHqmMmGofP6mrX99ZFTDO+b5dWyzWfWGPXCQ=
---
![логотип](../../../en/adapterref/iobroker.mbus/admin/mbus.png)

![Значок Greenkeeper](https://badges.greenkeeper.io/Apollon77/ioBroker.mbus.svg)
![Количество установок](http://iobroker.live/badges/mbus-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mbus.svg)
![Трэвис-CI](http://img.shields.io/travis/Apollon77/ioBroker.mbus/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.mbus?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.mbus.png?downloads=true)

# IoBroker.mbus
======================

[![Изменение климата] (https://codeclimate.com/github/Apollon77/ioBroker.mbus/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.mbus)

** Этот адаптер использует службу [Sentry.io](https://sentry.io), чтобы автоматически сообщать об исключениях и ошибках кода мне как разработчику. **

Этот адаптер для ioBroker подключается к M-Bus Master через TCP или последовательный порт для предоставления статуса и подробной информации о подключенных устройствах M-Bus.

## Описание параметров
### IP-шлюз / TCP-порт
IP-адрес и порт M-Bus Master / Gateway при использовании TCP.

### Последовательный порт / скорость передачи
Последовательный порт и скорость передачи данных M-Bus Master / Gateway.

### Обновить интервал
Интервал в секундах для обновления данных. По умолчанию (если пусто) 3600 с (1 час). Подумайте, как устройства на шине M-Bus питаются, чтобы предотвратить разрядку батарей. Если вы установите интервал на 0, то устройство будет считываться только один раз при запуске адаптера, но больше не автоматически.

### Идентификаторы устройств
Вы можете использовать основной (1-250) и дополнительный (16 символов) идентификаторы M-Bus

## Как прочитать устройство по запросу?
В созданных состояниях для каждого устройства существует одно состояние, называемое updateNow. Если для этого параметра установлено значение true (в качестве управляющего действия с ack = false), устройство немедленно обновляется. Если интервал настроен, интервал перезапускается после получения данных.

## Сделать
* зашифрованная обработка полезной нагрузки (если это необходимо кому-либо)

## Changelog

### 2.1.0 (2019-12-18)
* add compact mode
* move to more flexible serial port configuration
* add Sentry for error reporting

### 2.0.0 (2019-10-16)
* (lvogt) **BREAKING CHANGE** better handling for values with changing scaling based on the value - maybe incompatible with old values!
* (lvogt) add setting to force kWh values for energy

### 1.1.1 (2018-12-10)
* (Apollon77) make sure adapter is not communicating too fast at the beginning

### 1.1.0 (2018-05-06)
* (bluefox) Error tolerance
* (apollon77) Fix Admin

### 0.1.8 (2018-04-03)
* (apollon77) fix config dialog

### 0.1.7 (2018-04-02)
* (apollon77) allow to set "0" as update interval that will cause in no automatic updates, so only manually using updateNow is possible.

### 0.1.6 (2018-03-26)
* (apollon77) disconnect/reconnect for each query

### 0.1.5 (2018-03-26)
* (apollon77) update to node-mbus 0.5 with shorter timeouts

### 0.1.4 (2018-03-26)
* (apollon77) add "updateNow" states to all devices to trigger manual update
* (apollon77) update to node-mbus 0.4.1 with shorter timeouts

### 0.1.2
* (apollon77) official released version

### 0.0.1
* (apollon77) initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Apollon77 <ingo@fischer-ka.de>

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