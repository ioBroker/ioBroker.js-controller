---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.trashschedule/README.md
title: ioBroker.trashschedule
hash: MuVfAYZ+uQZhX50dSEVv0vyWEguXYftm8gjT5evisuU=
---
![Logo](../../../en/adapterref/iobroker.trashschedule/admin/trashschedule.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.trashschedule.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.trashschedule.svg)
![Stabil](http://iobroker.live/badges/trashschedule-stable.svg)
![Eingerichtet](http://iobroker.live/badges/trashschedule-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/klein0r/iobroker.trashschedule.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/klein0r/ioBroker.trashschedule/badge.svg)
![Build-Status](http://img.shields.io/travis/klein0r/ioBroker.trashschedule.svg)
![NPM](https://nodei.co/npm/iobroker.trashschedule.png?downloads=true)

# IoBroker.trashschedule
Scannt einen Kalender, um die verbleibenden Tage bis zur nächsten Müllabfuhr zu berechnen

## Voraussetzungen
1. Erstellen Sie eine **ical Instanz**
2. Konfigurieren Sie die URL Ihres Kalenders (z. B. Google Kalender).
3. Stellen Sie "Tage in der Vorschau" auf einen Bereich ein, der jeden Papierkorbtyp einmal enthält
4. Wählen Sie die Option "Start-Ende von Ereignissen ausblenden".
5. Wenn Sie die Registerkarte "Ereignisse" verwenden, aktivieren Sie das Kontrollkästchen "Anzeige" für jeden Ereignistyp, der auch in Ihrem Papierkorbplan verwendet werden soll (andernfalls wird das Ereignis von der ical-Instanz ausgeblendet).

## Aufbau
1. Erstellen Sie eine Papierkorbinstanz und wählen Sie die ical-Instanz als Quelle aus
2. Wechseln Sie zur Registerkarte Papierkorbtypen und fügen Sie Typnamen und Ereignisübereinstimmungen hinzu
3. Starten Sie die Instanz

## Changelog

### 0.0.5

* (klein0r) added pickup dates after next date

### 0.0.4

* (klein0r) added VIS templates

### 0.0.3

* (klein0r) fixed issue with events after time change date

### 0.0.2

* (klein0r) added global offset in days
* (klein0r) added exact match for types

### 0.0.1

* (klein0r) initial release

## License

MIT License

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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