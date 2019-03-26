---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.milight/README.md
title: ioBroker.milight
hash: Ecq04r4TXFjADX8OGk+fwmG2HESTZdjmC1XwtyMIxwg=
---
![Logo](../../../en/adapterref/iobroker.milight/admin/easybulb_logo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.milight.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.milight.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.milight.png?downloads=true)

# IoBroker.milight
ioBroker-Adapter für LED-Lampen wie milight, easybulb, grenzenlos

## Installation:
von npm

```javascript
npm install iobroker.milight
```

Aktuelle Version von Github

```javascript
npm install https://github.com/foxthefox/ioBroker.milight/tarball/master --production
```

## Allgemeine Einstellungen:
in der Admin-Seite

* IP-Adresse-> IP der Brücke
* Port -> Port der Brücke
* delaybetweenPackages -> ms delay zwischen UDP-Paketen (100 ms für v5)
* repeatPackage -> Anzahl der Wiederholungen (1 für v5)
* version des milight Protokolls v5 oder v6 -> setzt automatisch den entsprechenden Port
* Einstellung der vollen Helligkeit beim Wechsel in den Weißmodus

## Art der Birnen in den Zonen:
in der Admin-Seite

* basic = bridge NUR für Zone 1 und v6
* RGBWW = Vollfarbbirne mit weißer LED und Farbtemperatureinstellung (Erhöhung der Farbtemperatur bedeutet kühlere Farbgebung), NUR in v6
* RGB = reine Farbbirne ohne Weiß NUR für Zone 1
* RGBW = Farbbirne mit weißer LED
* Weiß = weiße Birne mit weißer Farbtemperatur (Farbtemperatureinstellung) (kühlere Farbgebung)

Zone0 oder ZoneAll können verwendet werden, um Befehle an alle 4 Zonen zu übergeben. Der Adapter ist in Version 6 mit Base / Bridge-Befehlen und in Version 5 mit Rgbw-Befehlen konfiguriert.

## Staaten in Version 6
| verfügbarer Zustand | basic / bridge | Weiß | RGB | RGBW | RGBWW |
|:-------------------------------------------:|:--------------------------------:|:------------------------------:|:------------------------------:|:-------------------------------------:|:--------------------------------------:|
| EIN / AUS als Schalter | Zustand (Zone1), Funktion | Zustand (Zone), Funktion | Zustand (Zone1), Funktion | Zustand (Zone), Funktion | Zustand (Zone), Funktion |
| EIN als Taste | am (zone1), nativ | auf (Zone), nativ | am (zone1), nativ | auf (Zone), nativ | auf (Zone), nativ |
| AUS als Taste | aus (Zone1), nativ | aus (Zone), nativ | aus (Zone1), nativ | aus (Zone), nativ | aus (Zone), nativ |
| colorMode als boolescher Zustand | | | | colorMode (0 = Nachtmodus, 1 = Weißmodus) | colorMode (0 = Nachtmodus, 1 = Weißmodus) |
| maxWhite as button | | maxBright (Zone), native | | | |
| whiteMode als Schaltfläche | whiteMode (zone1), native | | | whiteMode (Zone), native | whiteMode (Zone), native |
| Nachtmodus als Schaltfläche | | Nachtmodus (Zone), native | | Nachtmodus (Zone), native | Nachtmodus (Zone), native |
| Helligkeit als Wert (0-100%) | Helligkeit (Zone), nativ | | | Helligkeit (Zone), nativ | Helligkeit (Zone), nativ |
| Farbe als 3-Hex-Werte | Farbe (Zone), native | | Farbe (Zone), native | Farbe (Zone), native | Farbe (Zone), native |
| rgb als kombinierter Wert (# 000000 - #FFFFFF) | rgb (Zone), native | | rgb (Zone), native | rgb (Zone), native | rgb (Zone), native |
| Modus als Wert | Modus (Zone), nativ | | | Modus (Zone), nativ | Modus (Zone), nativ |
| modeSpeedUp als Schaltfläche | | modeSpeedUp (Zone), nativ | | modeSpeedUp (Zone), nativ | modeSpeedUp (Zone), nativ |
| modeSpeedDown as button | | modeSpeedDown (Zone), nativ | | modeSpeedDown (Zone), nativ | modeSpeedDown (Zone), nativ |
| Verknüpfung als Schaltfläche | | | | Link (Zone), native | Link (Zone), native |
| Verknüpfung als Schaltfläche aufheben | | | unlink (zone), native | unlink (zone), native |
| Sättigung als Wert (0-100%) | | | | | Sättigung (Zone), nativ |
| colorTemp als Wert (0-100 entspricht 2700K bis 6500K) | | | | | colorTemp (Zone), native |
| Helligkeit als Schaltfläche | Helligkeit (Zone), Funktion | Helligkeit (Zone), native | Helligkeit (Zone), native | Helligkeit (Zone), Funktion | Helligkeit (Zone), Funktion |
| HelligkeitDown as button | HelligkeitDown (Zone), Funktion | HelligkeitDown (Zone), native | HelligkeitDown (Zone), native | HelligkeitDown (Zone), Funktion | HelligkeitDown (Zone), Funktion |
| ColorUp als Schaltfläche | colorUp (Zone), Funktion | | | colorUp (Zone), Funktion | colorUp (Zone), Funktion |
| Farbe nach unten als Taste | Farbe nach unten (Zone), Funktion | | Farbe nach unten (Zone), Funktion | Farbe nach unten (Zone), Funktion | |
| saturationUp als Schaltfläche | | | | | saturationUp (Zone), Funktion |
| saturationDown as button | | | | | saturationDown (Zone), Funktion |
| colorTempUp als Schaltfläche | | colorTempUp (zone), native | | | colorTempUp (zone), Funktion |
| colorTempDown as button | | colorTempDown (Zone), native | | | colorTempDown (Zone), Funktion |
| Farbton als Wert (0-360) | | | | Farbton (Zone), Funktion | Farbton (Zone), Funktion |

## Staaten in Version 5 / Version 4
| verfügbarer Zustand | RGB | Weiß | RGBW |
|:---------------------------------------------:|:-----------------------:|:-----------------------:|:----------------------------------------:|
| EIN / AUS als Schalter | Zustand (Zone), Funktion | Zustand (Zone), Funktion | Zustand (Zone), Funktion |
| EIN als Taste | auf (Zone), nativ | auf (Zone), nativ | auf (Zone), nativ |
| AUS als Taste | aus (Zone), nativ | aus (Zone), nativ | aus (Zone), nativ |
| colorMode als boolescher Zustand | | | colorMode (0 / hs = Weißmodus, 1 / ct = Farbe (Farbton = 55)) |
| maxWhite as button | | maxBright (Zone), native | |
| whiteMode als Schaltfläche | | | whiteMode (Zone), native |
| Nachtmodus als Schaltfläche | | | Nachtmodus (Zone), native |
| Farbe als Farbtonwert (0-255) | | | Farbton, gebürtig |
| rgb als kombinierter Wert (# 000000 - #FFFFFF) | | | rgb, native |
| colorTempUp als Schaltfläche | | wärmer, gebürtig | |
| colorTempDown as button | | Kühler, gebürtig | |
| Helligkeit als Wert (0-100%) | | | Helligkeit, nativ |
| Helligkeit als Wert (0-100%), erweiterter Bereich | | | |
| effectModeNext als Schaltfläche | | | effectModeNext, native |
| speedUp als Schaltfläche | speedUp, native | | effectSpeedUp, native |
| speedDown als Schaltfläche | speedDown, nativ | | effectSpeedDown, native |
| brightUp als Schaltfläche | brightUp, native | brightUp, native | |
| brightDown als Schaltfläche | brightDown, gebürtig | brightDown, gebürtig | |
| effectModeNext als Schaltfläche | effectSpeedUp, native | | |
| effectModePrev as button | effectSpeedDown, native | | |

effectSpeedUp / Down hat eine andere Bedeutung (für rgb wechselt der Modus, für rgbw die Geschwindigkeit)!

## Aufbau:
In der Admin-Seite der Adapterversion 5 auch für V4-Lampen

## MACHEN:
* ??

## Bekannte Probleme:
* ??

## Changelog
### 0.4.0
* compact mode
### 0.3.6
* (foxthefox) node-milight-promise 0.3.1 (former version 0.2.32)

### 0.3.5
* (mrinc)     fix for the v5 color setting (was always blue)
* (foxthefox) nightModeSwitch added on white bulbs for command from Alexa

### 0.3.4
* (foxthefox) adminv3 added

### 0.3.3
* (foxthefox) setting of state after usage of command OFF/ON
* (foxthefox) v6 widget for RGBW; RGBWW mode switch night/weiß instead weiß/farbe
* (foxthefox) v6 widget for RGBW, RGBWW speedup/down correction, no hide of color temp vs. color when switching night/weiß
* (foxthefox) v5 widget for RGBW with color changing to matching the selected color
* (foxthefox) v6 widget for RGBWW with colortemperature changing to matching the selected colortemperature

### 0.3.2
* (foxthefox) V5 uses brightUp/brightDown instead brightnessUp/brightnessDown
* (foxthefox) corrections in V5 for white Commands (cooler/warmer/maxBright)
* (foxthefox) new RGBWW V6 widget
* (foxthefox) update for effects and correctios in RGBW V6 widget
* (foxthefox) added CW/WW widget V4 and V6
* (foxthefox) added disco button in RGBW V4

### 0.3.1
* (bluefox) added checking of methods before calling them

### 0.3.0
* (foxthefox) cleanup of states
* (foxthefox) added white/rgb lamp
* (foxthefox) correction of mismatch RGBW/RGBWW in v6
* (foxthefox) v6 brightness only 0-0x64(100)

### 0.2.2/0.2.1
* (foxthefox) debug messages with v5/v6 prefix; v6 colorset->colormode

### 0.2.0 
* (bluefox) discovery for v6

### 0.1.1
* (foxthefox) switch lamp on with full brightness -> checkbox in admin for v5

### 0.1.0
* (foxthefox) tested with bridge version 4 and protocol version v5
* (bluefox)v6 implementation
* (foxthefox) node-milight-promise 0.0.9
* (foxthefox) jqui widget RGBW lamp

### 0.0.1
* (foxthefox) initial setup

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>