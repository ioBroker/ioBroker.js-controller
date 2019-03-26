---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.oppoplayer/README.md
title: ioBroker.oppoplayer
hash: x8lY04A9YnzZIj59uw49UCSdW5ClWQvn639eZEkF+KE=
---
![Logo](../../../en/adapterref/iobroker.oppoplayer/admin/oppoplayer.png)

# IoBroker.oppoplayer ===================
Dieser Adapter erweitert den ioBroker um Unterstützung für den oppo digitalen UHD-Player (UDP-20x).
Sie können den Wiedergabe- und Abfragestatus steuern.

## Tipps
* Der Player startet die Netzwerkschnittstelle nicht, wenn er erneut an die Stromversorgung angeschlossen wird (durch Oppo bestätigt).

  Wenn Sie ihn vom Strom trennen, müssen Sie den Auslöser verwenden, um ihn zu starten.

## Mitwirkende
* volkerrichert

## Changelog

### 0.2.0 ("Compact mode" release)
* (volkerrichert) add support for compact mode 

### 0.1.0 (first public release)
* (volkerrichert) handle changes on writeable states

### 0.0.2 (not released)
* (volkerrichert) providing most of the objects and remote key

### 0.0.1 (not released)
* (volkerrichert) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018 Volker Richert <volker@richert.nrw>

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