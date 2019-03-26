---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fhem/README.md
title: ioBroker.fhem
hash: N5iJnz+zMACr/jOpD4kKZSjgK6n51TAKFE52hRcrxjE=
---
![Logo](../../../en/adapterref/iobroker.fhem/admin/fhem.png)

![Anzahl der Installationen](http://iobroker.live/badges/fhem-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.fhem.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fhem.svg)
![NPM](https://nodei.co/npm/iobroker.fhem.png?downloads=true)

# IoBroker.fhem ===================
Dieser Adapter ermöglicht die Verbindung von FHEM mit ioBroker.

Um die Verbindung zu aktivieren, muss das Telnet in FHEM aktiviert sein. Um es zu aktivieren (standardmäßig aktiviert), überprüfen Sie die folgenden Einstellungen in fhen.cfg:

```
define telnetPort telnet 7072 global
```

Der gleiche Port und die IP-Adresse des FHEM-Hosts (oder localhost, wenn FHEM und ioBroker auf demselben PC ausgeführt werden) sollten für die Einstellungen des Adapters verwendet werden.

ioBroker sendet beim Start den Befehl "jsonlist2", um alle "Messwerte" aus der Liste abzurufen.

## Unterstützte Geräte
Normalerweise werden alle Geräte unterstützt. Aber einige von ihnen sind besser integriert.

Die Probleme treten insbesondere bei der Kontrolle der Zustände auf.
Da es keine eindeutige Attributstruktur gibt, versucht ioBroker zu erraten, welche "PossibleSets" -Felder verwendet werden können.
Eigentlich werden nur folgende Attribute unterstützt:

- RGB: Wenn RGB in *PossibleSets* und in *Readings* vorhanden ist, wird es in einem Zustand zusammengefasst, der gelesen und geschrieben werden kann. Werte wie `` `# 234567``` werden automatisch in` `234567``` konvertiert.
- ein aus-Zustand: Wenn **ein** und **aus** in *PossibleSets* und **state** in *Readings* vorhanden sind, wird er unter dem Namen **state** in den ein-Zustand zusammengefasst. Es kann mit true und false gesteuert werden, und die Befehle werden in `` set DEVICE on``` und `` set DEVICE off``` geändert.

## Funktionen und Verwendung
* Wenn in FHEM Raum "ioBroker" vorhanden ist, werden nur diese Objekte synchronisiert
* Nach der Synchronisation werden nicht benutzte FHEM-Objekte automatisch gelöscht.
* Interne wie TYPE, NAME, PORT, Herstellername, Modell-ID, Swversion werden synchronisiert (Rolle = Wert.xxx)
* Attribute wie Raum, Alias, Deaktivieren, Kommentar werden synchronisiert und Attribute können in ioBroker bearbeitet werden. (Rolle = Zustand.xxx)
* Rolle und andere während der Synchronisation einstellen
  * Ablesungen xxx mit irgendwelchen PossibleSets werden Rolle = state.xxx gesetzt
  * Lesungen xxx ohne PossibleSets werden Rolle = Wert.xxx gesetzt
  * Lesungen xxx mit PossibleSets "noArg" wird role = button.xxx gesetzt
  * Messwerte xxx mit "Slider" von PossibleSets werden auf Rolle = Ebene gesetzt. Xxx, min = Slider (min), max = Slider (max)
  * Ablesungen "gewünschte Temperatur" werden eingestellt rolle = Füllstand.Temperatur, min = 5, max = 35, Einheit = °C.
  * Ablesungen "pct, Helligkeit, Dimmen" werden eingestellt rolle = level.dimmer, min = 0, max = 100, Einheit =%
  * Ablesungen "Volumen, Volumen, Gruppenvolumen" wird gesetzt rolle = level.volume, min = 0, max = 100, Einheit =%
  * Ablesungen "GroupVolume" wird Rolle = Level.Volumen.Gruppe, min = 0, max = 100, Einheit =% gesetzt.
* SmartName for Cloud Adapter wird automatisch mit Alias oder Name gesetzt (nur fhem.0 und Objekte mit der Rolle = level.temperature, level.dim, level.volume)

## Changelog
### 1.1.0 (2018-10-22)
* (LausiD) Big changes

### 1.0.0 (2018-10-15)
* (LausiD) Min/max were defined as number

### 0.5.6 (2018-09-09)
* (LausiD) Some roles were updated

### 0.5.5 (2018-08-22)
* (LausiD) Several fixes and changes
* (bluefox) Admin3

### 0.5.0 (2018-04-29)
* (LausiD) Several fixes and changes

### 0.4.2 (2018-04-15)
* (TonyBostonTB) Fix wordings

### 0.4.1 (2017-04-14)
* (bluefox) add link to FHEM im admin

### 0.4.0 (2017-03-12)
* (LausiD) fix some types
* (bluefox) define custom prompt

### 0.3.0 (2017-02-25)
 * (LausiD) fix some types
 * (bluefox) add password for telnet

### 0.2.2 (2016-06-17)
* (bluefox) implement On/Off state and fix RGB
* (bluefox) add debug output by control

### 0.2.1 (2016-06-12)
* (bluefox) support of RGB values for control

### 0.2.0
* (bluefox) implemented write
* (bluefox) try to read meta information if unknown event received

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2018 bluefox <dogafox@gmail.com>

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