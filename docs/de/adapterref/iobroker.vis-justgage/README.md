---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-justgage/README.md
title: kein Titel
hash: vTmk1SqhvY9JRffyzcvN9pkapEIjiN+2+bhClIwKJxs=
---
![Logo](../../../en/adapterref/iobroker.vis-justgage/admin/justgage.png) ioBroker.vis-justgage

============

[justGage](http://justgage.com/) Widget für ioBroker.

![Bildschirmfoto](../../../en/adapterref/iobroker.vis-justgage/img/widgets.png)

## Zeigeroptionen
Es besteht die Möglichkeit, die Zeigeroptionen zu definieren:

```
{
  "toplength": null,
  "bottomlength": null,
  "bottomwidth": null,
  "stroke": "none",
  "stroke_width": 0,
  "stroke_linecap": "square",
  "color": "#000000"
}
```

Es muss ein gültiges JSON-Objekt sein. Einzelquoten sind nicht erlaubt! Weitere Informationen zu den Zeigeroptionen finden Sie hier: https://github.com/toorshia/justgage#pointer-options

## Changelog
![Number of Installations](http://iobroker.live/badges/vis-justgage-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-justgage-stable.svg)
### 1.0.1 (2019-10-07)
- (bluefox) fixed min max

### 0.7.1 (2016-12-14)
- (Pmant) change max brightness to max brightness of initial color

### 0.7.0 (2016-12-14)
- (jens-maus) add value formatting
- (jens-maus) add value multiplier

### 0.6.1 (2016-11-25)
- (bluefox) Update justgage.js

### 0.6.0 (2016-07-31)
- (Pmant) add no-gradient-option to Justgage widget
- (Pmant) add full brightness option to Justgage widget
- (jens-maus) add missing unit fields

### 0.5.1 (2016-07-21)
- (jens-maus) fix auto fill max, min, unit

### 0.5.0 (2016-07-01)
- (Pmant) fix default indicator
- (Pmant) add option to change background-color instead of text-color
- (Pmant) add option to always set full brightness colors

### 0.4.2 (2016-06-05)
- (PArns) fix mid default vaule if max != 100 & min != 0

### 0.4.1 (2016-03-20)
- (bluefox) remove config

### 0.4.0 (2016-02-19)
- (Pmant) replace pow with sliders
- (bluefox) fix resize

### 0.3.0 (2016-02-16)
- (bluefox) fix error with two gauges at creation
- (bluefox) fix small errors
- (bluefox) add new widget: value & indication
- (bluefox) fill automatically max, min, unit


### 0.2.5 (2016-02-13)
- (Pmant) fix indicator
- (bluefox) add russian translations

### 0.2.2 (2016-02-12)
- (Pmant) possible donut fix

### 0.2.0 (2016-02-11)
- (Pmant) add indicator widget

### 0.1.1 (2016-02-10)
- (Pmant) initial checkin

## License
Copyright (c) 2015-2019 Pmant <patrickmo@gmx.de>
MIT