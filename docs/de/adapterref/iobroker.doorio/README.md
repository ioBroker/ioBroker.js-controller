---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.doorio/README.md
title: ioBroker.doorio
hash: OXB7nvAFt6ITxkgbxen7gzRW89pXdtH3Gv4lsHTU1DE=
---
![Logo](../../../en/adapterref/iobroker.doorio/admin/doorio.png)

![Build-Status](https://travis-ci.org/Bettman66/ioBroker.doorio.svg?branch=master)
![NPM-Version](http://img.shields.io/npm/v/iobroker.doorio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.doorio.svg)
![NPM](https://nodei.co/npm/iobroker.doorio.png?downloads=true)

# IoBroker.doorio
## Die Info
Selbst gemachter DoorStation Adapter für ioBroker

Dieser Adapter stellt über tcp.socket eine Verbindung zum Baresip Sip-Client her, um mit einem Türsprechgerät zu kommunizieren. Als Glockentrigger kann jeder Eingang von ioBroker verwendet werden.
Der Adapter erkennt auch DTMF-Töne, um die Ausgänge zu wechseln. Für die selbstgemachte Türstation kann jede Hardware verwendet werden, auf der Baresip installiert werden kann.

Dieser Adapter gehört sich über tcp.socket mit dem Baresip Sip-Client, um mit einer Türsprechstelle zu gehört. Als Klingelauslöser kann jeder Eingang von ioBroker Verträgen werden. Der Adapter erkennt auch DTMF-Töne um Ausgänge zu schalten. Für die Selbstgemachte Türsprechstelle, kann jede Hardware auf die Baresip verlassen werden.

## Links
* https://forum.iobroker.net/topic/23413/ich-baue-eine-t%C3%BCrsprechstelle-ohne-cloud
* https://forum.iobroker.net/topic/22746/test-adapter-doorio-v0-0-x

## Changelog
### 1.0.10
* (bettman66) add detour

### 1.0.9
* (bettman66) fix userconfigerror

### 1.0.8
* (bettman66) fix dtmf-timeout

### 1.0.7
* (bettman66) check states

### 1.0.6
* (bettman66) clearTimeouts

### 1.0.5
* (bettman66) update stable

### 1.0.4
* (bettman66) new config

### 1.0.3
* (bettman66) update adapter-core

### 1.0.2
* (bettman66) add selectID.js

## License
The MIT License (MIT)

Copyright (c) 2020 Walter Zengel <w.zengel@gmx.de>

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