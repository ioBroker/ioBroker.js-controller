---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: HHagzctIvHavIW8wnVoIGdlFc2AftK2MNJnAWE6NtNA=
---
![milight-smart-light-Logo](../../../en/adapterref/iobroker.milight-smart-light/admin/lib/images/milight-smart-light-md.png)

![Travis-CI](http://img.shields.io/travis/Steiger04/ioBroker.milight-smart-light/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Steiger04/ioBroker.milight-smart-light?branch=master&svg=true)

# IoBroker.milight-smart-light
** Tests: ** Linux / Mac: Windows:

Dieser Adapter für ioBroker steuert Milight LED-Lampen und LED-Streifen und basiert auf dem Knotenmodul von mwittig.

mwittig / [Knoten-Milight-Versprechen](https://github.com/mwittig/node-milight-promise)

Mit dem Adapter können Sie beide verwenden: **v6 Bridge** und **Legacy Bridge**

** v6-Brücke: **

- Brücke (nur iBox1)
- Weiß
- rgb (w)
- volle Farbe
- fullColor8Zone

** Legacy Bridge: **

- Weiß
- rgb (w)

### Versionen
- **Node.js** Verwenden Sie Version 8.0.0 oder höher
- **iobroker.admin** Verwenden Sie Version 3.5.10 oder höher

## Changelog
### 0.2.5 (2019-03-07)
- (steiger04): Core Files/Testing Update and introduce adapter-core

### 0.2.4 (2019-03-03)
- (steiger04): Bug for addDeviceButton fixed in Admin

### 0.2.3 (2019-03-02)
- (steiger04): Fixed a bug in configuration load and save

### 0.2.2 (2019-02-28)
- (steiger04): Optimization of the App

### 0.2.1 (2019-02-13)
- (steiger04): Integration of  node-milight-promise v0.3.2

### 0.2.0 (2019-01-16)
- (steiger04): Adaptation to Admin3, materialzeCSS, general revision, new app

### 0.1.9 (2018-03-13)
- (steiger04): Adaption for js-controller > v.1.2.5

### 0.1.8 (2018-01-21)
- (steiger04): some optimizations for Alexa

### 0.1.7 (2018-01-12)
- (steiger04): optimized: create states

### 0.1.6 (2018-01-08)
- (steiger04): Bug fix: rgbToHsv(...)

### 0.1.5 (2018-01-05)
- (steiger04): Info about required fields in tab Zones inserted

### 0.1.4 (2017-11-05)
- (steiger04): Set configuration option fullSync to false in milight instance

### 0.1.3 (2017-11-04)
- (steiger04): Added start image

### 0.1.2 (2017-11-04)
- (steiger04): Bug fix: socketio

### 0.1.1 (2017-11-02)
- (steiger04): Bug fix: Fixed EffectMode for Legacy

### 0.1.0 (2017-11-01)
- (steiger04): Added Small FE for milight-smart-light

### 0.0.6 (2017-10-18)
- (steiger04): Bug fix: All four zones can be created for the instance (via iobroker.admin) and remain after a reload. There are no more problems with umlauts.
- (steiger04): The types "RGB + White" and "RGB" were combined in the type "RGB (W)"

### 0.0.5 (2017-08-02)
- (bluefox): Added russian translation

### 0.0.4 (2017-07-28)
- (steiger04): Added basis-testing


### 0.0.3 (2017-07-24)
- (steiger04): on- /off- /onoff-states optimized for vis widgets

### 0.0.2 (2017-07-23)
- (steiger04): Bug fix: added parameter in effectMode(...)

### 0.0.1 (2017-07-16)
- (steiger04): Initial Version

## License

The MIT License (MIT)

Copyright (c) 2017-2019 Steiger04 <steiger04@posteo.de>