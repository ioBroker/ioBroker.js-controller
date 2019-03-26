---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: S4fCQvdzkHOrq0MfE/tpd1WumFgBGsQZX2ufYygiWAM=
---
![Logo](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lifx.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.lifx.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.lifx.png?downloads=true)

# IoBroker.lifx
Lifx-Adapter für ioBroker

## Installation:
die offiziell freigegebene Version

```javascript
npm install iobroker.lifx
```

die aktuelle version von github:

```javascript
npm install https://github.com/foxthefox/ioBroker.lifx/tarball/master --production
```

## Einstellungen / Konfiguration:
- Keine Einstellungen oder Konfiguration erforderlich, der Adapter erkennt die Lampen automatisch

### Metro Widget nicht erreichbar
- Ein kleines Symbol für den nicht erreichbaren Status im Metro-Widget ist das erste Benachrichtigungsobjekt
- object_id [0] ist der Indikator.unreachable
- Anstelle von "true" wird "false" geschrieben
- Das Symbol sollte wifiColorRed.png sein
- Der horizontale Versatz von 6 sollte gut funktionieren

## Visualisierung:
- Verwenden Sie lifx-Widgets

## Objekte
Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| Bulb.State | Boolean | x | true / false -> ON / OFF |
| Bulb.Colormode | Boolean | x | Farbe, Weiß |
| Temperatur Temperatur | Wert | x | Farbtemperatur 2500 ... 9000 K |
| Bulb.hue | value | x | color 0 ... 360 |
| Bulb.sat | Wert | x | Sättigung 0 ... 100% |
| Leuchtstärke | Wert | x | Helligkeit 0 ... 100% |
| Bulb.online | boolean | - | true / false |

## MACHEN:
- zyklischer getState from lamp, wenn außerhalb von ioBroker eingestellt
- Anpassung der Farbwerte bei allen vorhandenen Einstellungen (Helligkeitseinstellung hat eine feste Sättigung von 80% und behält die vorherige Farbtoneinstellung bei; Sättigungseinstellung und Farbtoneinstellung haben eine feste Helligkeit von 80%)
- Übergangszeiten
- Wellenformen
- Verwendung von meta.roles
- Objekte für weiße Lampe

## Bekannte Probleme
??

## Changelog
### 0.1.0
- compact mode
### 0.0.5
- adminv3
- noConfig -> no admin page anymore

### 0.0.4
- jqui widget with interactive colored slider

### 0.0.3
- metro widget
- jqui widget

### 0.0.2 
- change to node-lifx
- successful tested with 2 lamps and firmware 2.1

### 0.0.1 
- initial setup with lifx

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>