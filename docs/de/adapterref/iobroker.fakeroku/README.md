---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fakeroku/README.md
title: ioBroker.fakeroku
hash: 0yNByMYzHfhlxji1IQCqHQARTI6yzOmsNGsP7+oxPao=
---
![Logo](../../../en/adapterref/iobroker.fakeroku/admin/fakeroku.png)

![Build-Status](https://travis-ci.org/Pmant/ioBroker.fakeroku.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/fakeroku-stable.svg)

# IoBroker.fakeroku
Dieser ioBroker-Adapter emuliert ein Roku und dient nur dazu, den ioBroker mit den Logitech Harmony Hubs zu verbinden.
Es kann auch mit anderen Geräten arbeiten, die ein Roku steuern können.

## Installation
Intall Adapter in ioBroker Admin

## Verwendungszweck
### Konfiguration in ioBroker Admin:
- ***LAN-IP*** muss die Netzwerk-IP Ihres ioBroker-Geräts sein
- ***Multicast-IP*** Ändern Sie dies nur, wenn Sie wissen, was Sie tun
- ***Roku-Geräte*** Hinzufügen / Ändern / Löschen von zu emulierenden Geräten

### Konfiguration in Harmony APP & Software
Fügen Sie nach diesem Handbuch ein Roku 3-Gerät hinzu: https://support.myharmony.com/en-us/harmony-experience-with-roku Sie können das Gerät auf Ihrer Harmony umbenennen.

### Zustände
Zustände werden automatisch erstellt, wenn fakeRoku zum ersten Mal einen Schlüssel erhält.

## Changelog

### 0.2.1
  (Pmant) fix jQuery error in admin
  (ykuendig) add translations

### 0.2.0
  (Pmant) run multiple fakeroku's in one instance

### 0.1.1
  (Pmant) fix package.json

### 0.1.0
  (Pmant) initial release

## License
The MIT License (MIT)

Copyright (c) 2017 Pmant

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