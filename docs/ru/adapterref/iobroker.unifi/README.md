---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: eGEZTGV31ZdJeK46sDXmDuTgZnm5pFhilnFcOXs19GE=
---
![логотип](../../../en/adapterref/iobroker.unifi/admin/unifi.png)

![Статус сборки](https://travis-ci.org/iobroker-community-adapters/ioBroker.unifi.svg?branch=master)
![Количество установок](http://iobroker.live/badges/unifi-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.unifi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unifi.svg)
![Github Issues](http://githubbadges.herokuapp.com/iobroker-community-adapters/ioBroker.unifi/issues.svg)
![жертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)
![NPM](https://nodei.co/npm/iobroker.unifi.png?downloads=true)

# IoBroker.unifi
[![Изменение климата] (https://codeclimate.com/github/iobroker-community-adapters/ioBroker.unifi/badges/gpa.svg)](https://codeclimate.com/github/iobroker-community-adapters/ioBroker.unifi) [![bitHound Score] (https://www.bithound.io/github/iobroker-community-adapters/ioBroker.unifi/badges/score.svg)](https://www.bithound.io/github/iobroker-community-adapters/ioBroker.unifi)

Этот адаптер ioBroker позволяет управлять и контролировать [Устройства UniFi](http://www.ubnt.com/), такие как точки доступа UniFi WiFi, с помощью общедоступного веб-API UniFi Controller.

## Ссылки
Этот адаптер использует функциональность следующих сторонних модулей nodejs:

* [узел-унифи] (https://github.com/jens-maus/node-unifi)

## Changelog

### 0.3.1
  (jens-maus) added support for multi-site environments.

### 0.3.0
  (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
  (jens-maus) minor fixes

### 0.2.0
  (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
  (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
  (jens-maus) initial checkin of non-working development version

## License
The MIT License (MIT)

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