---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weishaupt-wem/README.md
title: ioBroker.weishaupt-ОРЭ
hash: IqsQ4zF7LaGFo0WfA5V2IAz+kcKBdv+18rWMpdTAdKk=
---
![логотип](../../../en/adapterref/iobroker.weishaupt-wem/admin/weishaupt-wem.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.weishaupt-wem.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weishaupt-wem.svg)
![Статус зависимости](https://img.shields.io/david/ta2k/iobroker.weishaupt-wem.svg)
![Известные уязвимости](https://snyk.io/test/github/ta2k/ioBroker.weishaupt-wem/badge.svg)
![NPM](https://nodei.co/npm/iobroker.weishaupt-wem.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ta2k/ioBroker.weishaupt-wem/master.svg)

# IoBroker.weishaupt-wem
## Weishaupt-wem адаптер для ioBroker
Адаптер для Weishaupt WEM Portal

## Custom Befehl
Für ein Custom Befehl benötigst du die URL and den gewünschten Wert.
Полный URL-адрес einfach die Option im WEM Portal с Chrome aufrufen und dann rechte Maustate Untersuchen dann unter Elements / Elemente mit STRG + Fach iframe suchen mit dem name = "RDWWriteParameter" URL URL nach src mit rechts Klick Link kopieren raus k.
Für den Werte nach <опция suchen und den gewünschten Wer unter value kopieren und als state Wert eintragen.
z.B .: https://www.wemportal.com/Web/UControls ..., 208557

## Changelog

### 0.0.5

* (ta2k) fix remote for WWP

### 0.0.4

* (ta2k) remove spaces in ids

### 0.0.3

* (ta2k) Fix remote control

### 0.0.2

* (ta2k) Möglichkeit Parameter zu ändern
* Nummerische Werte als Zahlen in ioBroker geschrieben

### 0.0.1

* (ta2k) initial release

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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