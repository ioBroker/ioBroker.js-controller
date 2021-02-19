---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.omron-fins/README.md
title: ioBroker.omron-Flossen
hash: 2sC8Aky+it6FQTQefZSB4XF6rpGDRrL+ujz0ny27Uog=
---
![Logo](../../../en/adapterref/iobroker.omron-fins/admin/omron-fins.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.omron-fins.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.omron-fins.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/omron-fins-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/omron-fins-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/thebam1990/iobroker.omron-fins.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/thebam1990/ioBroker.omron-fins/badge.svg)
![NPM](https://nodei.co/npm/iobroker.omron-fins.png?downloads=true)

# IoBroker.omron-Flossen
** Tests: ** ![Testen und freigeben](https://github.com/thebam1990/ioBroker.omron-fins/workflows/Test%20and%20Release/badge.svg)

## Für Deutsch
https://github.com/TheBam1990/ioBroker.omron-fins/blob/master/Readmede.md

## Omron-Finnen-Adapter für ioBroker
Anschluss für Omron PLC über das FINS-Protokoll aller CJ2M- oder CJ1M-Modelle

## Benutzerhandbuch (Englisch)
Passen Sie die IP-Adresse der SPS auf der Registerkarte Haupteinstellungen an.
Der Port ist der Standardport und muss im Allgemeinen nicht angepasst werden.
Der Abfragewert wird in ms angegeben und gibt die zyklische Abfrage der Werte an.

Die zu erfassenden Variablen werden auf der Registerkarte Geräte eingegeben. Fügen Sie einfach eine neue mit dem + hinzu und weisen Sie dann einen frei wählbaren Namen zu. Bitte benennen Sie jede Variable einzeln und nicht sofort.
Geben Sie im Bereich Variable die Variable ein, die für die Eingabe- oder Ausgabevariablen CB0: 00, CB0: 01 CB100: 00 usw. abgerufen werden soll. Verwenden Sie immer Doppelpunkte, um sie zu trennen. W31: 00 usw. funktioniert auch für Flags. D1-Werte usw. kann auch abgerufen werden.
Wählen Sie auf der Registerkarte Typ den Variablentyp aus, der in der SPS gespeichert ist.

## Changelog
<!--
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ ( - falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben )
-->
### 0.0.1-7 (2021-02-08)
* (Thebam) NPM Aktualisiert

### 0.0.1-6 (2021-02-07)
* (Thebam) Änderungen für Repro eingetragen

### 0.0.1-5 (2021-01-01)
* (Thebam) io-package angepasst

### 0.0.1-4 (2021-01-01)
* (Thebam) package json angepasst

### 0.0.1-3 (2021-01-01)
* (Thebam) adater checker anpassung

### 0.0.1-2 (2021-01-01)
* (Thebam) native objekt ip geändert


### 0.0.1-1 (2021-01-01)
* (Thebam) add GitHub Action

### 0.0.1
* (Thebam) initial release
Erste version zum Abholen und schreiben der variablen

## License
MIT License

Copyright (c) 2021 thebam 

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