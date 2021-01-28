<h1>
 <img src="admin/gruenbeck.png" width="64"/>
 ioBroker.gruenbeck
</h1>

[![NPM version](http://img.shields.io/npm/v/iobroker.gruenbeck.svg)](https://www.npmjs.com/package/iobroker.gruenbeck)
[![Downloads](https://img.shields.io/npm/dm/iobroker.gruenbeck.svg)](https://www.npmjs.com/package/iobroker.gruenbeck)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.gruenbeck.svg)](https://david-dm.org/TA2k/iobroker.gruenbeck)
[![Known Vulnerabilities](https://snyk.io/test/github/TA2k/ioBroker.gruenbeck/badge.svg)](https://snyk.io/test/github/TA2k/ioBroker.gruenbeck)

[![NPM](https://nodei.co/npm/iobroker.gruenbeck.png?downloads=true)](https://nodei.co/npm/iobroker.gruenbeck/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/TA2k/ioBroker.gruenbeck/master.svg)](https://travis-ci.org/TA2k/ioBroker.gruenbeck)

## gruenbeck adapter for ioBroker

An ioBroker adapter for Grünbeck Wasseraufbereitung SC18, SC23, SD18, SD21, SD23 devices.

## Changelog

### 0.0.28

- Fix reconnect for SD

### 0.0.27

- Add salt history, water history and parameters for SD devices

### 0.0.25

- Add description for SD states (Delete device under objects to get datapoints with descriptions)

### 0.0.24

- Fix for multiple devices

### 0.0.22

- Add additional SD Data

### 0.0.21

- Fix SD Refresh when App is open

### 0.0.20

- Fix SD Refresh

### 0.0.17 (2020-01-24)

- Increasing minimum interval to prevent blocking

### 0.0.15 (2019-10-28)

- Fix combact mode

### 0.0.14 (2019-09-13)

- Add Refresh for SDxx devices

### 0.0.13 (2019-09-13)

- Add Support for SDxx devices

### 0.0.11 (2019-05-12)

- Fix IP parsing

### 0.0.10 (2019-05-08)

- Prevent multiple acutal commands interval
- Unload all intervals at unload

### 0.0.9 (2019-04-29)

- Fix Power Mode Zeitplan
- Fix Uhrzeit Parsing

### 0.0.8 (2019-04-20)

- Fix Info Values nicht als Zahlen geschrieben
- Salzmenge als Option
- PowerMode Zeitplan in den Option

### 0.0.7 (2019-03-31)

- automatisch Uhrzeit
- Wasserverbrauchintervall in den Optionen
- Schleichwassermesszeitraum in den Optionen

### 0.0.6 (2019-03-30)

- add Wasserverbrauch l/min
- fix newError States

### 0.0.5 (2019-03-30)

- Fehlercode History hinzugefügt. Fehlerspeicher muss nicht mehr zurückgesetzt für neue Fehler State. Nur der muss manuell auf 0 gesetzt werden.
    Alle 4sek wird jetzt der aktuelle Durchfluss abgerufen.

### 0.0.4

- (tombox) Bugfixes,
    added Restkapazität Austauscher to refresh values
    added berechneter Salzstand and reset Salzstand
    added Fehlerspeicher reset

### 0.0.3

- (tombox) Add new Error state, add JSON History for Wasserverbrauch

### 0.0.2

- (tombox) Remove Warning, Fix Descriptions

### 0.0.1

- (tombox) initial release

## License

MIT License

Copyright (c) 2021 tombox

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
