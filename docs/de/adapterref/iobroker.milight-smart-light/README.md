---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: cWv7WlDzwUw8WHGt7KPNdnmutK4CenySEwXQgJItWjc=
---
![milight-smart-light Logo](../../../en/adapterref/iobroker.milight-smart-light/admin/milight-smart-light.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)
![stabil](http://iobroker.live/badges/milight-smart-light-stable.svg)
![Eingerichtet](http://iobroker.live/badges/milight-smart-light-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/steiger04/iobroker.milight-smart-light.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light/badge.svg)
![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)

# IoBroker.milight-smart-light
![Testen und freigeben](https://github.com/steiger04/ioBroker.milight-smart-light/workflows/Test%20and%20Release/badge.svg)

Dieser Adapter für ioBroker steuert Milight-LED-Lampen und LED-Streifen und basiert auf dem Knotenmodul von mwittig.

mwittig / [Node-Milight-Versprechen](https://github.com/mwittig/node-milight-promise)

Mit dem Adapter können Sie beide verwenden: **v6 Bridge** und **Legacy Bridge**

** v6 Brücke: **

- Brücke (nur iBox1)
- Weiß
- rgb (w)
- volle Farbe
- fullColor8Zone

** Legacy Bridge: **

- Weiß
- rgb (w)

**Beschreibung**

Eine ausführliche Beschreibung finden Sie in [hier](https://steiger04.github.io/milight-smart-light-doku/).

### Versionen
- **Node.js** Verwenden Sie Version 10.18.1 oder höher
- **iobroker.admin** Verwenden Sie Version 3.5.10 oder höher

## Changelog
### 1.1.1 (2020-01-13)
- (steiger04) compact mode added
### 1.0.5 (2020-01-10)
- (steiger04) Small bug fix
### 1.0.1 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2

### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License

The MIT License (MIT)

Copyright (c) 2017-2021 Steiger04 <steiger04@posteo.de>