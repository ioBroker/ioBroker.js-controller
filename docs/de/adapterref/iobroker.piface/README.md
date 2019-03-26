---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.piface/README.md
title: ioBroker.piface
hash: Jem0qrM+xiBBoAyyrGiFXroWjtJRbc2Xbj1MfzL0XXs=
---
![Logo](../../../en/adapterref/iobroker.piface/admin/piface.png)

![Anzahl der Installationen](http://iobroker.live/badges/piface-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.piface.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.piface.svg)
![Travis-CI](https://travis-ci.org/Eisbaeeer/ioBroker.piface.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.piface.png?downloads=true)

# IoBroker.piface
Dieser Adapter ermöglicht die Steuerung eines Piface auf dem Raspberry Pi.

Es verwendet node-pifacedigial: https://github.com/tualo/node-pifacedigital

Der Adapter erstellt 8 Eingabe- und Ausgabeobjekte in Iobroker.
Die Ausgänge können über Tasten von VIS oder durch Setzen des Objekts auf "true" oder "false" oder "1" oder "0" gesteuert werden.

###! Beachtung !
Bitte lesen Sie die Voraussetzungen des Adapters.
Der Adapter benötigt die Knotenversion> = v4.0.0. Sie müssen die folgenden Bibliotheken über die Konsole installieren und die SPI-Unterstützung für Raspberry aktivieren, indem Sie sie in "raspi-config" einrichten.

```
git clone https://github.com/piface/libmcp23s17.git
cd libmcp23s17/
make
sudo make install
```

```
git clone https://github.com/piface/libpifacedigital.git
cd libpifacedigital/
make
sudo make install
```

Wenn Sie fehlerhaft laufen, weil Ihre Knotenversion zu niedrig ist, aktualisieren Sie bitte die Knotenversion.

* Ich habe erfolgreich mit Knotenversion installiert: v4.2.1

### Einstellungen in Iobroker
![Alt-Text](../../../en/adapterref/iobroker.piface/admin/settings.png?raw=true "die Einstellungen")

## PiFace Board-Nummer
Sie können bis zu 4 Boards auf einem Raspberry Pi stapeln. Sie müssen die Platine mit dem Jumper ansprechen.
Um die Karten anzusprechen, verwenden Sie die folgenden Jumper-Einstellungen:

| Bordnummer | JP1 | JP2 |
| ------------- |:---:|:---:|
| Bord 0 | 0 | 0 |
| Tafel 1 | 1 | 0 |
| Tafel 2 | 0 | 1 |
| Tafel 3 | 1 | 1 |

Wenn Sie mehr als eine Karte verwenden, erstellen Sie bitte zusätzliche Instanzen für jede Karte und ändern Sie die Kartennummer im Setup der korrespondierenden Instanz.

## PiFace Leseeingang in ms
Dieser Wert definiert das Intervall für die Überprüfung der Eingaben. Wert ist in ms.

## Inverse Eingänge
Sie können die Eingaben invertieren

## Ausgänge initialisieren
Wenn dies aktiviert ist, werden die Ausgänge durch Neustart des Adapters auf 0 gesetzt.

## Machen:

## Changelog

### 1.0.0.(2017-09-19)
* (Eisbaeeer)
* Solving issue #6 (RAM)

### 0.0.9 (2017-03-05)
* (Eisbaeeer)
* Activating Travis - no changes
* (Apollon77)
* Added basic testing

### 0.0.50 (2016-05-07)
* (Eisbeeer)
* Optimized loggin because of RPI´s flash

### 0.0.40
* (Eisbaeeer) RC
added:
* addressing boards

### 0.0.30
* (Eisbaeeer) first aplpha
added:
* Read interval in setup (ms)
* Selectable invers input (pullup)

### 0.0.20
* (Eisbaeeer) first beta

### 0.0.10
* (Eisbaeeer) initial version

## License
MIT