![Logo](admin/synology.png)
# ioBroker Synology adapter
=================

![Number of Installations](http://iobroker.live/badges/synology-installed.svg) ![Number of Installations](http://iobroker.live/badges/synology-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.synology.svg)](https://www.npmjs.com/package/iobroker.synology)
[![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)](https://www.npmjs.com/package/iobroker.synology)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.synology/master.svg)](https://travis-ci.org/instalator/ioBroker.synology)

[![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)](https://nodei.co/npm/iobroker.synology/)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PFUALWTR2CTPY)

## Description
The driver allows you to receive data and manage your Synology NAS server.

You can send any command (method) by setting the sendMethod object, for example:
Get the SurveillanceStation info is a getInfo method with no additional parameters.

```{"method": "getInfo", "params": {}}```

## Описание
Драйвер позволяет получать данные и управлять вашим NAS сервером фирмы Synology.

Можно отправить любую команду(метод) установив значение обьекта ```sendMethod```, например:
Получить инфо SurveillanceStation это метод getInfo без дополнительных параметров.

```{"method":"getInfo", "params":{}}```

## Changelog

### 0.1.0
* (instalator) 

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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