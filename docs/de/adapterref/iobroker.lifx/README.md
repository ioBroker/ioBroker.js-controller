---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lifx/README.md
title: ioBroker.lifx
hash: 5ovwws54rtb+OjggZIjqQ+5wEyYNXqj5q4DHwjM09yM=
---
![Logo](../../../en/adapterref/iobroker.lifx/admin/lifx_logo.png)

![Anzahl der Installationen](http://iobroker.live/badges/lifx-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lifx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lifx.svg)
![Build-Status](https://travis-ci.org/foxthefox/ioBroker.lifx.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.lifx.png?downloads=true)

# IoBroker.lifx
Lifx-Adapter für ioBroker

## Installation:
die offiziell veröffentlichte Version

```javascript
npm install iobroker.lifx
```

die aktuelle Version von Github:

```javascript
npm install https://github.com/foxthefox/ioBroker.lifx/tarball/master --production
```

## Einstellungen / Konfiguration:
- Keine Einstellungen oder Konfiguration erforderlich, Adapter erkennt die Lampen automatisch

### Status des Metro-Widgets nicht erreichbar
- Ein kleines Symbol für den nicht erreichbaren Status im Metro-Widget ist das erste Benachrichtigungsobjekt
- object_id [0] ist der Indikator.unreachable
- Anstatt "wahr" voreinzustellen, soll "falsch" geschrieben werden
- Das Symbol sollte wifiColorRed.png sein
- Der horizontale Versatz von 6 sollte gut funktionieren

## Visualisierung:
- Verwenden Sie Lifx-Widgets

## Objekte
| Objekt | Wert | einstellbar | Beschreibung |
|--------|-------|:-:|--------|
| Bulb.state | boolean | x | true / false -> ON / OFF |
| Bulb.colormode | boolean | x | color, white |
| Bulb.temp | value | x | Farbtemperatur 2500 ... 9000 K |
| Bulb.hue | value | x | color 0 ... 360 |
| Bulb.sat | Wert | x | Sättigung 0 ... 100% |
| Bulb.bright | value | x | Helligkeit 0 ... 100% |
| Bulb.online | boolean | - | true / false |
| Bulb.vendor | string | - | vendor |
| Bulb.product | string | - | product |
| Bulb.version | string | - | version |
| Bulb.label | string | - | label |
| Bulb.colorLamp | boolean | - | true / false |
| Bulb.infraredLamp | boolean | - | true / false |
| Bulb.multizoneLamp | boolean | - | true / false |

## MACHEN:
- zyklischer getState von Lampe, falls außerhalb von ioBroker eingestellt
- Anpassung der Farbwerte mit allen vorhandenen Einstellungen (Helligkeitsanpassung hat eine feste Sättigung von 80% und behält die vorherige Farbtoneinstellung bei; Sättigungsanpassung und Farbtonanpassung haben feste 80% Helligkeit)
- Übergangszeiten
- Wellenformen
- Gegenstände für weiße Lampe

## Bekannte Probleme
??

## Changelog
### 0.2.0
- lifx-lan-client library instead node-lifx
- states for vendor, product, version, product features

### 0.1.1
- logo quadratic
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

Copyright (c) 2016-2020 foxthefox <foxthefox@wysiwis.net>