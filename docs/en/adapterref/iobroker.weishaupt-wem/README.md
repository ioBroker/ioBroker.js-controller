![Logo](admin/weishaupt-wem.png)
# ioBroker.weishaupt-wem

[![NPM version](http://img.shields.io/npm/v/iobroker.weishaupt-wem.svg)](https://www.npmjs.com/package/iobroker.weishaupt-wem)
[![Downloads](https://img.shields.io/npm/dm/iobroker.weishaupt-wem.svg)](https://www.npmjs.com/package/iobroker.weishaupt-wem)
[![Dependency Status](https://img.shields.io/david/ta2k/iobroker.weishaupt-wem.svg)](https://david-dm.org/ta2k/iobroker.weishaupt-wem)
[![Known Vulnerabilities](https://snyk.io/test/github/ta2k/ioBroker.weishaupt-wem/badge.svg)](https://snyk.io/test/github/ta2k/ioBroker.weishaupt-wem)

[![NPM](https://nodei.co/npm/iobroker.weishaupt-wem.png?downloads=true)](https://nodei.co/npm/iobroker.weishaupt-wem/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/ta2k/ioBroker.weishaupt-wem/master.svg)](https://travis-ci.org/ta2k/ioBroker.weishaupt-wem)

## weishaupt-wem adapter for ioBroker

Adapter for weishaupt WEM Portal

## Custom Befehl

Für ein Custom Befehl benötigst du die URL und den gewünschten Wert.
Für die URL einfach die Option im WEM Portal mit Chrome aufrufen und dann rechte Maustate Untersuchen dann unter Elements/Elemente mit STRG+F nach iframe suchen mit dem name="RDWWriteParameter" die URL nach src mit rechts Klick Link kopieren raus kopieren.
Für den Werte nach <option suchen und den gewünschten Wert unter value kopieren und als state Wert eintragen.
z.B.: https://www.wemportal.com/Web/UControls..., 208557

## Changelog

### 0.0.5

* (ta2k) fix remote for WWP

### 0.0.4

* (ta2k) remove spaces in ids

### 0.0.3

* (ta2k) Fix remote control

### 0.0.2

* (ta2k) Möglichkeit Parameter zu ändern
* Nummerische Werte als Zahlen in ioBroker geschrieben

### 0.0.1

* (ta2k) initial release

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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