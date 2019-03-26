---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zont/README.md
title: ioBroker.zont
hash: gal4k00yBlWw5UJ9RlEi/ZtSzgCw7ao2fSu9H1qcmfE=
---
![Logo](../../../en/adapterref/iobroker.zont/admin/zont.png)

![Anzahl der Installationen](http://iobroker.live/badges/zont-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.zont.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zont.svg)
![Tests](https://travis-ci.org/kirovilya/ioBroker.zont.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.zont.png?downloads=true)

# IoBroker.zont
ioBroker адаптер для сервисов https://zont-online.ru

Адаптер используем Zont-api описанное [здесь](https://zont-online.ru/api/docs/).
Он получает данные об устойствах и сохраняет их как Состояния ioBroker.

Некоторые Состояния могут изменяться пользователем или скриптами ioBroker. Затем они отправляются обратно в сервис Zont:

* thermostat_mode
* thermostat_ext_mode
* thermostat_temp
* Wache
* Sirene
* Motorblock
* webasto
* auto_ignition

## История изменений
#### 0.5.3 Обновлена работа H-1 термостата
#### 0.5.2 Первая публичная версия
-----------------

ioBroker-Adapter für den Dienst https://zont-online.ru

Adapter verwendet Zont-api, beschrieben unter [Hier](https://zont-online.ru/api/docs/).
Es holt Daten über Geräte und speichert sie in vielen ioBroker-Staaten.

Einige Staaten können sich durch Benutzer- oder IoBroker-Skript ändern. Dann senden Sie es an den Zont-Service zurück:

* thermostat_mode
* thermostat_ext_mode
* thermostat_temp
* Wache
* Sirene
* Motorblock
* webasto
* auto_ignition

## Changelog

#### 0.5.3 Update H-1 thermostat

#### 0.5.2 First public version

---------------

## License
The MIT License (MIT)

Copyright (c) 2017 Kirov Ilya <kirovilya@gmail.com>

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