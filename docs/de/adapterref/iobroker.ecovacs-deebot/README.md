---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ecovacs-deebot/README.md
title: Ecovacs Deebot Adapter für ioBroker
hash: fGU3XZWbDJ3WUMjci6Cz3amIKEhpbk5T9s+kF6SQOnE=
---
![Logo](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![Travis-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

# Ecovacs Deebot Adapter für ioBroker
Dieser Adapter verwendet die Bibliothek [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Models
Bisher funktionieren nur Geräte, die mit dem Protokoll **XMPP** kommunizieren.

Sie können dies mit dem Zustandswert `info.communicationProtocol` nach erfolgreichem Verbindungsaufbau überprüfen (Werte: `XMPP`, `MQTT`).

### Funktioniert einwandfrei
Grundbefehle wie `clean` (`auto`), `charge`, `stop` sowie `battery`, `charge`, `clean` und § §SSSSS_7§§ Status sind hierfür erforderlich und werden hier nicht gesondert aufgeführt.

| Modell | Pause | spot | spotArea | customArea * | Rand | playSound |
|------ |------ |------ |------ |------ |------ |------ |
| Deebot Ozmo 930 | x | | x | x | | x |
| Deebot Slim 2 | | x | | | x | |

*) inkl. gesetzl. Anzahl der `cleanings`

### Sollte arbeiten
* Deebot N79T
* Deebot 601
* Deebot Ozmo 610

#### Es ist unwahrscheinlich, dass diese Modelle funktionieren
* Deebot 900
* Deebot Ozmo 900
* Deebot Ozmo 950

## Steuerung
### Tasten
| name | beschreibung |
| --- | --- |
| aufladen zurück zur ladestation |
| sauber | automatische reinigung starten |
| Rand | Kantenreinigung starten |
| playSound | einen Sound abspielen, um den Bot zu lokalisieren |
| spot | Spotreinigung starten |
| aufhören | stoppe den Reinigungsprozess |
| Pause | pause den reinigungsvorgang |
| spotArea `0`-`9` | Bis zu 9 Schaltflächen * für die in der Ecovacs-App definierten Bereiche |

*) Siehe Adapterkonfiguration

### Flächen- / Zonenreinigung
#### SpotArea
* Durch Kommas getrennte Liste von Zahlen, die mit "0" (z. B. "1,3") für zu reinigende Bereiche beginnen.
* Tasten für "0" - "9" -Spotbereiche (siehe "Adapterkonfiguration")

#### CustomArea
* durch Kommas getrennte Liste von genau 4 Positionswerten für "x1, y1, x2, y2" (z. B. "-3975.000000,2280.000000, -1930.000000,4575.000000")
    * Position "0.000000,0.000000,0.000000,0.000000" die Position der Ladestation

#### Wasserstand
* Kontrolle und Anzeige des Wasserstandes (`low`,` medium`, `high` und` max`)

## Verbrauchbar
| name | beschreibung |
| --- | --- |
| Filter | Filterlebensdauer |
| main_brush | Lebensdauer der Hauptbürste |
| side_brush | Lebensdauer der Seitenbürste |

## Die Info
| name | beschreibung |
| --- | --- |
| Batterie | Batterie |
| chargestatus | Status während des Ladevorgangs |
| cleanstatus | Status während der Reinigung |
| kommunikationProtokoll | XMPP oder MQTT |
| Geräteklasse | Deebot-Geräteklasse |
| Gerätename | Name des in der Ecovacs-App definierten Geräts |
| deviceStatus | Status des Geräts |
| Fehler | Aktuelle Fehlermeldung |

## Adapterkonfiguration
| name | beschreibung |
| --- | --- |
| E-Mail | E-Mail-Adresse, die für Ihr Ecovacs-Konto verwendet wird |
| Passwort | Für Ihr Ecovacs-Konto verwendetes Passwort |
| Ländercode (Kontinent) | Auswahl vordefinierter Ländercodes (inkl. Kontinent) |
| Gerätenummer | Auswahl für die aktuelle Instanz, wenn Sie mehrere Geräte verwenden |
| Anzahl der Spotflächen | Anzahl der in der Ecovacs-App definierten Sportgebiete (Standard `0`) |

*) Die Ecovacs-Server geben sehr oft einen seltsamen Fehler aus, daher möchten wir es automatisch erneut versuchen.

## Danke und Credits
* @joostth ([sucks.js] (https://github.com/joostth/sucks.js))
* @wpietri ([sucks] (https://github.com/wpietri/sucks))
* @ bmartin5692 ([sucks] (https://github.com/bmartin5692/sucks), [bumber] (https://github.com/bmartin5692/bumper))
* @Ligio ([ozmo] (https://github.com/Ligio/ozmo))

## Changelog

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