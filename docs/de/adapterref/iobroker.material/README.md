---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.material/README.md
title: ioBroker.material
hash: Ulc3YoyyaWuA8XUEizcZKqEy12ZjA1yR1rUM1uQSmtc=
---
![Logo](../../../en/adapterref/iobroker.material/admin/material.png)

![Anzahl der Installationen](http://iobroker.live/badges/material-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.material.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.material.svg)
![NPM](https://nodei.co/npm/iobroker.material.png?downloads=true)

# IoBroker.material
Schnittstelle "React" und "Material UI".

![Screenshots](../../../en/adapterref/iobroker.material/img/screenshot1.png)

## Installation
** Wichtig! ** Dieser Adapter kann nicht direkt von github installiert werden. Nur ab npm.

## Verwendungszweck
Es ist sehr wichtig zu wissen, dass der Adapter nur Geräte anzeigt, die zu bestimmten Kategorien hinzugefügt wurden, wie z. B. *Räume* oder *Funktion* Besser, wenn jedes Gerät zu beiden Kategorien gehört. Weil jedes Gerät den Typ und den Ort hat.

## Unterstützte Typen
### Schalter
### Dimmer
### Media Player
### Volume
### Gruppenvolumen
## Machen
* Cams (über extra Adapter)
* Ereignisse (über extra Adapter)
* Hauptbildschirm
* Diagramme
* Schmales Menü
* Staubsauger
* Leiste für Schieberegler, um die Position anzuzeigen
* Unterstützung von Qualitätscodes
* Karten (OpensStreetMap)
* Nach X Sekunden zum Standardbildschirm wechseln
* Bestellstatus in Info
* Verwenden Sie Symbole in Wetter und nicht in Text

## Credits
- Verwendete Icons von Flaticon
- Lautstärkeregler von [hier] (https://codepen.io/blucube/pen/cudAz) Von [Ed Hicks] (https://twitter.com/blucube) - Inspiriert von einem [Dribbble Shot] (https: / /dribbble.com/shots/753124-Volume-Knob) von [Ricardo Salazar] (https://twitter.com/rickss)

## Changelog
### 0.10.6 (2019.01.29)
*  Added Chinese support

### 0.10.5 (2018.10.15)
* (bluefox) fix error with settings

### 0.10.3 (2018.09.02)
* (bluefox) implement color temperature
* (bluefox) implement cache of objects

### 0.10.1 (2018.09.02)
* (bluefox) GUI corrections
### 0.10.0 (2018.08.30)
* (bluefox) RGB was corrected

### 0.9.12 (2018.08.19)
* (bluefox) RGB was implemented

### 0.9.11 (2018.08.14)
* (bluefox) Fixed error with empty page

### 0.9.10 (2018.08.08)
* (bluefox) Crop of images was implemented
* (bluefox) Background of tiles is possible
* (bluefox) Double width of every tile is possible
* (bluefox) Group light control
* (bluefox) Custom URLs implemented

### 0.9.9 (2018.08.03)
* (bluefox) Order of tiles is implemented
* (bluefox) Support of dwd data

### 0.9.7 (2018.07.30)
* (bluefox) Implemented the weather widget

### 0.9.4 (2018.07.26)
* (bluefox) Bug-fixes

### 0.9.3 (2018.07.25)
* (bluefox) Many changes

### 0.9.2 (2018.07.21)
* (bluefox) Update logic was implemented (only with web 2.4.1)

### 0.9.1 (2018.07.20)
* (bluefox) Volume control was implemented

### 0.8.9 (2018.07.17)
* (bluefox) React app

### 0.5.7 (2018.01.24)
* (bluefox) Ready for cloud services

### 0.5.6 (2017.10.11)
* (bluefox) fix undefined names
* (bluefox) fix detection of switches

### 0.5.3 (2017.08.11)
* (bluefox) fix dimmer

### 0.5.2 (2017.07.30)
* (bluefox) fix action icons

### 0.5.1
* (bluefox) edit of visibility

## License
CC-BY-NC

Copyright (c) 2017-2018 bluefox <dogafox@gmail.com>

Commercial use is not allowed without permission.