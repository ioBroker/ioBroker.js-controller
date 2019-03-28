---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.homee/README.md
title: ioBroker homee Adapter
hash: TTc69nv+1qEEwSCcsluUShKWKjdRud6tieAyi14pIQM=
---
![Logo](../../../en/adapterref/iobroker.homee/admin/homee.png)

![Anzahl der Installationen](http://iobroker.live/badges/homee-stable.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Apollon77/ioBroker.homee.svg)

# IoBroker homee Adapter
=================

## Beschreibung
Dieser Adapter verbindet den ioBroker mit dem homee und bietet die folgenden Funktionen:

* ermöglicht die Verbindung über IP oder Homee-ID und Benutzername / Passwort
* Lesen Sie alle Geräte (Knoten) und Zustände (Attribute) und zeigen Sie deren Werte einschließlich Aktualisierungen in ioBroker an
* Erlauben Sie das Ändern von Werten in ioBroker und senden Sie sie zur Steuerung an Geräte zurück
* fungiert als ioBroker-Verlaufsanbieter für alle Statusgeräte, auf denen der Verlauf in homee aktiviert ist. Das bedeutet, dass Sie die in homee gespeicherten Verlaufswerte verwenden können, um in ioBroker mit Flot, Admin oder auch JavaScript anzuzeigen, einschließlich aller Aggregationen auf Datenebene, wie sie z. Verlaufsadapter

Dieser Adapter basiert auf der hervorragenden Arbeit von [stfnhmplr] (http://twitter.com/stfnhmplr) und sein [homee-api](https://github.com/stfnhmplr/homee-api).

## Bekannte Probleme
* Bei js-controller <1.5.0 kann es merkwürdige Auswirkungen haben, wenn andere Verlaufsanbieter für einige Rollen aktiviert werden (z. B. "wechseln").
* nodejs 10 FUNKTIONIERT NICHT wegen zu alter Websocket-Bibliothek in Homee-API-Library

## Changelog

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018 Apollon77 <ingo@fischer-ka.de>

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