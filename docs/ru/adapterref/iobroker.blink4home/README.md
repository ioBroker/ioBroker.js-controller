---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.blink4home/README.md
title: ioBroker.blink4home
hash: nf+u7efakk/V7wc9aS0bpufLq6b22PRSfytvROuqj9c=
---
![логотип](../../../en/adapterref/iobroker.blink4home/admin/blinkbanner.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.blink4home.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.blink4home.svg)
![Статус зависимости](https://img.shields.io/david/Flashy-GER/iobroker.blink4home.svg)
![Известные уязвимости](https://snyk.io/test/github/Flashy-GER/ioBroker.blink4home/badge.svg)
![Количество установок (последняя)](http://iobroker.live/badges/blink4home-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/blink4home-stable.svg)
![NPM](https://nodei.co/npm/iobroker.blink4home.png?downloads=true)

# IoBroker.blink4home
[![Статус сборки] (https://travis-ci.com/Flashy-GER/ioBroker.blink4home.svg?branch=master)](https://travis-ci.com/Flashy-GER/ioBroker.blink4home)

## Blink4home адаптер для ioBroker
Адаптер для системы безопасности Amazon Blink Kamera.
der Adapter stellt alle Werte в Datenpunkte dar.
Постановка / снятие с охраны kann über Blockly oder JS gesetzt werden.

## Руководство
Имя пользователя и учетные записи Passwort des Blink-Cloud на странице конфигурации адаптера eintragen.
Den Polling Intervall Sollte Nicht Unter 5 Sek Gesetzt Werden.
Wenn arm / disarm über ebenfalls manuell über Datenpunkt gesetzt werden soll, einfach selbständig Schreibrechte vergeben.
für Scriptbasierte Steuerung ist das nicht nötig.

## ToDos
* Панель управления überarbeiten (Anzeige von letzen Foto, Abrufen der Videos, Arm / Disarm, Kamerabezogene Motion Detection u.a.)

## Changelog

### 0.1.1
* (Alex.0) add Control Site (under Construction)
* (Alex.0) some fixes
### 0.1.0
* (Alex.0) Beta Release 1
### 0.0.1 Inital Release
* (Alex.0) initial release

## License
MIT License

Copyright (c) 2020 Alex.0 <flashy@openuav.de>

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