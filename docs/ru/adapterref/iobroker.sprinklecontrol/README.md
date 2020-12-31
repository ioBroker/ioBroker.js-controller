---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sprinklecontrol/README.md
title: ioBroker.sprinklecontrol
hash: xuVb7eUwMnid8KrZjz+5VFj4rUzUMRx1t3sCUsEak1I=
---
![Логотип](../../../en/adapterref/iobroker.sprinklecontrol/admin/sprinklecontrol.png)

![Количество установок](http://iobroker.live/badges/sprinklecontrol-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sprinklecontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sprinklecontrol.svg)
![Статус зависимости](https://img.shields.io/david/Dirk-Peter-md/iobroker.sprinklecontrol.svg)
![Известные уязвимости](https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol/badge.svg)
![Трэвис-Си](http://img.shields.io/travis/Dirk-Peter-md/ioBroker.sprinklecontrol/master.svg)
![НПМ](https://nodei.co/npm/iobroker.sprinklecontrol.png?downloads=true)

# IoBroker.sprinklecontrol
## Адаптер sprinklecontrol для ioBroker
Этот адаптер управляет отдельными контурами полива в саду. В зависимости от погодных и почвенных условий они начинают работать в определенное время или с восходом солнца, как указано в конфигурации.

Wetterabhängige automatische Steuerung der Gartenbewässerung

[Deutsche Beschreibung hier](docs/de/sprinklecontrol.md)

[Deutsche Beschreibung на GitHub](https://github.com/Dirk-Peter-md/ioBroker.sprinklecontrol/blob/master/docs/de/sprinklecontrol.md)

*************************************************************************************************************************************

## Changelog

### 0.1.2 (30.12.2020)
* (Dirk-Peter-md) Beschreibung von SprinkleControl überarbeitet

### 0.1.1 (08.11.2020)
* (Dirk-Peter-md) Integration von Nachrichten per Telegramm, E-Mail, Pushover und WhatsApp

### 0.0.12 (10.10.2020)
* (Dirk-Peter-md) Bewässerung über eine 2. Pumpe (Zisterne mit Vorrangschaltung) in abhängigkeit vom Füllstand hinzugefügt.

### 0.0.11 (30.08.2020)
* (Dirk-Peter-md) Bug in der Verarbeitung der Regenvorhersage vom Adapter "Das Wetter"
* (Dirk-Peter-md) Bug auf Travis CI

### 0.0.10 (29.08.2020)
* (Dirk-Peter-md) Bug in der Verarbeitung der Regenvorhersage vom Adapter "Das Wetter"

### 0.0.9 (28.08.2020)
* (Dirk-Peter-md) integration des Adapters "Das Wetter" <Pfad 2: XML-Datei mit 5-Tage-Wettervorhersage> zur Regenvorhersage (siehe Doku)

### 0.0.8 (17.08.2020)
* (Dirk-Peter-md) adapter.unload: (setTimeout > 1s) >>> delete

### 0.0.7 (23.07.2020)
* (Dirk-Peter-md) history zu festen Zeit 0:05 (nicht über dayNum)
* (Dirk-Peter-md) main.js aufgeräumt

### 0.0.6 (16.07.2020)
* (Dirk-Peter-md) calcPosTimer angepasst
* (Dirk-Peter-md) Beschreibung vervollständigt

### 0.0.5 (12.07.2020)
* (Dirk-Peter-md) .travis.yml für Node.js 10, 12 und 14 laut ioBroker.template angepasst

### 0.0.4 (04.07.2020)
* (Dirk-Peter-md) readme.md hinzugefügt
* (Dirk-Peter-md) sprinklecontrol.md hinzugefügt
* (Dirk-Peter-md) words.js hinzugefügt

### 0.0.1 (01.06.2020)
* (Dirk-Peter-md) initial release


*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2019 - 2020 Dirk-Peter-md

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
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.