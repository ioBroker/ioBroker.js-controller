---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecovacs-deebot/README.md
title: Ecovacs Deebot Adapter für ioBroker
hash: YGN/6v/1qE6LMVi/Pdzxp5Nv9o/GdDoAospgIpeTuvU=
---
![Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

# Ecovacs Deebot Adapter für ioBroker
Dieser Adapter verwendet die Bibliothek [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Modelle
Bisher funktionieren nur Geräte, die mit dem **XMPP** -Protokoll kommunizieren, ordnungsgemäß.
Geräte, die mit dem **MQTT** -Protokoll kommunizieren, sind experimentell.

Sie können dies nach erfolgreichem Verbindungsaufbau mit dem Statuswert `info.communicationProtocol` überprüfen (Werte: `XMPP`, `MQTT`).

### Tasten und Steuerung
| Modell | Grund * | Pause | Stelle | spotArea | customArea ** | Kante | playSound | waterLevel |
|------ |------ |------ |------ |------ |------ |------ |------ |------ |
| Deebot Slim 2 | x | n / a | x | n / a | n / a | x | n / a | n / a |
| Deebot 710 | x | | | | | | | n / a |
| Deebot 900 | x | | n / a | | | n / a | | n / a |
| Deebot Ozmo 610 | x | | x | n / a | n / a | x | | |
| Deebot Ozmo 900 | | | n / a | | | n / a | | |
| Deebot Ozmo 930 | x | x | n / a | x | x | n / a | x | x |
| Deebot Ozmo 950 | x | x | n / a | x | x | n / a | x | x |

*) "grundlegende" Befehle sind `clean` (`auto`), `charge`, `stop`. Sie werden hier nicht separat aufgeführt.

**) inkl. Anzahl der `cleanings`

### Info und Status
| Modell | Batterie | chargestatus | cleanstatus | waterLevel | Verbrauchsmaterialien |

| ------ | ------ | ------ | ------ | ------ | ------ | Deebot Slim 2 | x | x | x | n / a | x

| Deebot 710 | | | | n / a | |
| Deebot 900 | | | | n / a | |
| Deebot Ozmo 610 | | | | | |
| Deebot Ozmo 900 | | | | | |
| Deebot Ozmo 930 | x | x | x | x | x |
| Deebot Ozmo 950 | x | | x | | |

### Funktioniert einwandfrei
* Deebot Slim 2
* Deebot Ozmo 610
* Deebot Ozmo 930

### Sollte arbeiten
* Deebot N79T
* Deebot 601
* Deebot Ozmo 960

### Sollte teilweise funktionieren
* Deebot 710
* Deebot Ozmo 900
* Deebot Ozmo 950

## Steuerung
### Tasten
| Name | Beschreibung |
| --- | --- |
| Gebühr | zurück zur Ladestation |
| sauber | Starten Sie die automatische Reinigung |
| Kante | Kantenreinigung starten |
| playSound | Spielen Sie einen Sound zum Auffinden des Bots |
| Stelle | Punktreinigung starten |
| stop | Reinigungsprozess stoppen |
| Pause | den Reinigungsvorgang unterbrechen |
| spotArea `0`-`9` | Bis zu 9 Schaltflächen * für die in der Ecovacs-App | definierten Bereiche |

*) Siehe Adapterkonfiguration

### Flächen- / Zonenreinigung
#### SpotArea
* durch Kommas getrennte Liste von Zahlen, die mit "0" (z. B. "1,3") für zu reinigende Bereiche beginnen.
* Schaltflächen für Punktbereiche "0" - "9" (siehe "Adapterkonfiguration")

#### CustomArea
* durch Kommas getrennte Liste von genau 4 Positionswerten für "x1, y1, x2, y2" (z. B. "-3975.000000,2280.000000, -1930.000000,4575.000000")
    * Position `0.000000,0.000000,0.000000,0.000000` die Position der Ladestation

#### Wasserstand
* Kontrollieren und Anzeigen des Wasserstandes ("niedrig", "mittel", "hoch" und "maximal")

## Verbrauchbar
| Name | Beschreibung |
| --- | --- |
| Filter | Filterlebensdauer |
| main_brush | Lebensdauer der Hauptbürste |
| side_brush | Lebensdauer der Seitenbürste |

## Die Info
| Name | Beschreibung |
| --- | --- |
| Batterie | Batterie |
| chargestatus | Status während des Ladevorgangs |
| cleanstatus | Status während der Reinigung |
| Kommunikationsprotokoll | XMPP oder MQTT |
| deviceClass | Deebot-Geräteklasse |
| Gerätename | Name des in der Ecovacs-App | definierten Geräts |
| deviceStatus | Status des Geräts |
| Fehler | Aktuelle Fehlermeldung |

## Adapterkonfiguration
| Name | Beschreibung |
| --- | --- |
| E-Mail | E-Mail-Adresse für Ihr Ecovacs-Konto |
| Passwort | Passwort für Ihr Ecovacs-Konto |
| Ländercode (Kontinent) | Auswahl vordefinierter Ländercodes (inkl. Kontinent) |
| Gerätenummer | Auswahl für die aktuelle Instanz, wenn Sie mehrere Geräte verwenden |
| Anzahl der Spotbereiche | Anzahl der in der Ecovacs-App definierten Sportbereiche (Standard `0`) |

## Danke und Credits
* @joostth ([saugt.js] (https://github.com/joostth/sucks.js))
* @wpietri ([saugt] (https://github.com/wpietri/sucks))
* @ bmartin5692 ([saugt] (https://github.com/bmartin5692/sucks), [bumber] (https://github.com/bmartin5692/bumper))
* @Ligio ([ozmo] (https://github.com/Ligio/ozmo))

## Changelog

### 0.3.9
   * (mrbungle64) Improved support for XML based MQTT devices

### 0.3.8
   * (boriswerner) Improved support for Ozmo 950 device
   * (mrbungle64) Implemented waterbox info (XMPP based devices)

### 0.3.7
   * (mrbungle64) Bugfix
   
### 0.3.6
   * (boriswerner) Basic clean & charge working (Ozmo 950)

### 0.3.5
   * (mrbungle64) Improved support for MQTT devices
   * (boriswerner) Improved support for Ozmo 950 device

### 0.3.4
* (mrbungle64) Feature Release
   * Implemented handling water level
   * Preparing for latest repo

### 0.3.3
* (mrbungle64) Feature release
   * Implemented lifespan values of components
   
### 0.3.2
* (mrbungle64) Feature release
   * Implemented spotArea buttons
   
### 0.3.1
* (mrbungle64) Feature release (alpha)
   * Implemented spotArea command
   * Implemented customArea command
   * Implemented playSound command
   
### 0.3.0
* (mrbungle64) alpha release

### 0.2.0
* (mrbungle64) Pre-release (alpha)

### 0.1.0
* (mrbungle64) Initial release (pre-alpha)

### 0.0.1
* (mrbungle64) Initial development release

## License
MIT License

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

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