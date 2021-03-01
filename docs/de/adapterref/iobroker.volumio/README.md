---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.volumio/README.md
title: ioBroker.volumio
hash: DbvHbyB6CJysKT2u0D/hKX3zeydtPRIkex7ZxOvChCk=
---
![Logo](../../../en/adapterref/iobroker.volumio/admin/volumio.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.volumio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.volumio.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/volumio-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/volumio-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)
![NPM](https://nodei.co/npm/iobroker.volumio.png?downloads=true)

# IoBroker.volumio
** Tests: ** ![Testen und freigeben](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

### Unterstütze mich
Wenn dieser Adapter Ihnen geholfen hat, coole Automatisierungen in Ihrem SmartHome zu realisieren und die Entwicklungszeit zu verkürzen, können Sie mich zu einer Tasse Kaffee einladen :)

[![Spenden] (https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## Volumio adapter für ioBroker
Volumio Adapter für ioBroker Dies ist ein Adapter zur Fernsteuerung einer Volumio-Instanz.

Es wird die folgende REST-API verwendet: https://volumio.github.io/docs/API/REST_API.html

Derzeit sind folgende Funktionen implementiert:

* Spielerbefehle
    * Stumm / Stummschaltung aufheben
    * Weiter / Zurück
    * Abspielen
        * Spielen Sie das n-te Lied aus der Wiedergabeliste ab
    * Pause
    * Zwischen Wiedergabe / Pause umschalten
    * Halt
    * Lautstärkeregelung
        * Auf einen bestimmten Wert einstellen
        * Lautstärke erhöhen / verringern
* Warteschlange
    * Warteschlange löschen
    * Titel wiederholen
    * Shuffel-Modus
* Spielerstatus erhalten

Machen:

- [] Suchposition einstellen
- [] Wiedergabelisten auflisten
- [] Durchsuchen

## Changelog

### 0.1.2
* (André Iske) Minor bug fixes 

### 0.1.1
* (André Iske) Minor bug fixes 

### 0.1.0
* (André Iske) Complete reworked adapter
    * Switched codebase to typescript
    * Changed License to MIT

### 0.0.1
* (André Iske) initial release

## License
MIT License

Copyright (c) 2021 André Iske <andre.iske@mailbox.org>

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