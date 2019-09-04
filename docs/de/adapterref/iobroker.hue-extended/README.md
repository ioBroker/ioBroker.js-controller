---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hue-extended/README.md
title: ioBroker.hue-extended
hash: y5kbOH0iJ5KCE3tYre3C2OhHSAN96aFMsxO7Pycpv7s=
---
![Logo](../../../en/adapterref/iobroker.hue-extended/admin/hue-extended.png)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Anzahl der Installationen](http://iobroker.live/badges/hue-extended-installed.svg)
![stabile Version](http://iobroker.live/badges/hue-extended-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hue-extended.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.hue-extended.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.hue-extended.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Zefau/ioBroker.hue-extended.svg)
![NPM](https://nodei.co/npm/iobroker.hue-extended.png?downloads=true)

# IoBroker.hue-extended Verbinden Sie Ihre Philips Hue Lights mit ioBroker.
## Eigenschaften
- Config synchronisieren
- Gruppen synchronisieren
- Lichter synchronisieren
- Ressourcen synchronisieren
- Regeln synchronisieren
- Szenen synchronisieren
- Zeitpläne synchronisieren
- Sensoren synchronisieren
- Triggern Sie Änderungen der Zustände "Ein / Aus", "Bri" ("Pegel"), "Farbton", "Gesessen", "XY", "CT", "Alarm", "Effekt" und "Übergangszeit"
- Zusätzliche Trigger basierend auf Farbräumen für `rgb`,` hsv`, `xyz`,` cmyk` und `hex`
- Wenden Sie eine eigene Befehlskombination mit dem Befehlstrigger an
- Kontrollieren Sie die Lichter aller Gruppen gleichzeitig mit der Gruppe "0-all"
- Führen Sie eine Szene aus oder wenden Sie "Szene" auf Licht oder Gruppe an

## Changelog

### 0.7.0 (2019-08-27)
- (Zefau) added `0-all`-group to apply action on all groups at once
- (Zefau) added `commands` action to apply own commands combination at once
- (Zefau) lowered minimum refresh time

### 0.6.2 (2019-08-18)
- (Zefau) fixed error when triggering scene (`Error setting /lights/undefined/state: resource, /lights/undefined/state, not available`)
- (Zefau) fixed display error in adapter configuration interface

### 0.6.1 (2019-08-16)
- (Zefau) Corrected German translations
- (Zefau) Completed README

### 0.6.0 (2019-08-15)
- (Zefau) implemented queue for any applied actions
- (Zefau) implemented user creation in interface configuration (admin panel)
- (Zefau) added additional actions for color spaces `rgb`, `hsv`, `cmyk`, `xyz` and `hex`

### 0.5.0 (2019-08-11)
- (Zefau) added support for scenes (reorganized states and added trigger)
- (Zefau) fixed action `xy`
- (Zefau) reorganized states within tree `state` into `action` in case they are executable

### 0.4.0 (2019-08-10)
- (Zefau) fixed applying action on group

### 0.4.0 (2019-08-09)
- (Zefau) renamed adapter to hue-extended (formerly hue-lights)
- (Zefau) changed roles of some states

### 0.3.2 (2019-08-07)
- (Zefau) refactored data retrieval and state creation

### 0.3.1 (2019-08-03)
- (Zefau) when turning on a device, set level / bri to 100 if it was set to 0

### 0.3.0 (2019-08-03)

__REMARK: If you are coming from an earlier version, please delete all your hue-extended states before running this release!__

- (Zefau) added error message when incorrect bridge credentials are provided ([see issue description](https://forum.iobroker.net/post/287505))
- (Zefau) when turning off a device, set level / bri to 0 ([see issue description](https://forum.iobroker.net/post/287566))
- (Zefau) fixed error that prevented `groups` being set / changed
- (Zefau) added specific role information to states under `lights`, `groups` and `sensors` ([see issue description](https://forum.iobroker.net/post/287566))
- (Zefau) fixed wrong value for temperature sensors ([see issue description](https://forum.iobroker.net/post/287564))

### 0.2.0 (2019-07-24)
- (Zefau) added support to change states _level_, _xy_, _effect_, _alert_, and _transitiontime_

### 0.1.0 (2019-07-21)
- (Zefau) retrieve lights, groups, resourcelinks, rules, scenes, schedules, sensors and config from Hue Bridge
- (Zefau) change states (e.g. on/off, brightness, saturation)

## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.