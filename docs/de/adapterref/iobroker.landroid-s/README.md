---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.landroid-s/README.md
title: ioBroker.landroid-s
hash: Y4UhyWAqdg68nJeG69xh7ZhW87+LyvffoUQfYv6y2w4=
---
![Logo](../../../en/adapterref/iobroker.landroid-s/admin/landroid-s2.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.landroid-s.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.landroid-s.svg)
![NPM](https://nodei.co/npm/iobroker.landroid-s.png?downloads=true)
![Travis-CI](https://api.travis-ci.org/MeisterTR/ioBroker.landroid-s.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.landroid-s?branch=master&svg=true)

# IoBroker.landroid-s
[Deutsche Beschreibung hier](README_de.md)

Dieser Adapter verbindet ioBroker mit Ihrem Landroid S-Modell oder Landroid M mit Firmware größer als 5.0.0 und Mqtt-Unterstützung. Temperaturen, Mähzeiten, Akkuladestand und verschiedene andere Daten werden vom Mäher ausgelesen. Der Adapter kann den Mäher steuern und die Konfiguration ändern Params wie Mähzeiten.

<h4> Version unter 2.5.5 wird nicht mehr unterstützt !!! </h4>

## Die Einstellungen
- Um eine Verbindung zum Mäher herzustellen, geben Sie E-Mail und Passwort von Ihrem worx-Konto in der Konfiguration ein.

## Zweiter Mäher
- Wenn zwei Mäher integriert werden sollen, muss eine zweite Instanz installiert werden, einer wird im Config-Mäher 0 und im zweiten Mäher 1 usw. ausgewählt.

## Changelog
### 2.5.5(08.04.2019)
* (MeisterTR) Api change from v1 to v2
### 2.5.4 (09.08.2018)
* (MeisterTR) support of Landroid M FW > 5.X.X add pause change connection 
### 2.1.2 (13.04.2018)
* (MeisterTR) add mower selection, clean up, remove CA
### 2.0.1 (31.01.2018)
* (MeisterTR) connection problem with new mower fixed 
### 2.0.0 (31.01.2018)
* (MeisterTR) admin3, del Polling
### 1.1.7 (09.10.2017)
* (MeisterTR) hard coded guest-token
* (MeisterTR) change cloud connection need no OpenSSL
* (MeisterTR) Serverselction automatic form Worx Server
* (MeisterTR) No Mac adress is needed
### 1.0.4 (18.09.2017)
* (MeisterTR) Update dependencies, no more error Messages on install
### 1.0.3 (08.09.2017)
* (MeisterTR) change Values from vis did not work (Fixed)
* (MeisterTR) changeing path from OpenSSL.exe on Windows now in config
* (MeisterTR) chatch errors on start if config is not set
* (MeisterTR) some other changes
### 0.3.1 (12.08.2017)
* (MeisterTR) bugfix cound not set bordercut to false
* (MeisterTR) add checkbox for m and min.
* (MeisterTR) add rawdata, chargecycle and actualArea
### 0.2.5
* (MeisterTR) now every parameter can be configure
### 0.2.3
* (MeisterTR) add areas, supporting change areas
### 0.2.2
* (MeisterTR) supported change of mowing times and error catching
### 0.1.2
* (MeisterTR) add mowing data
### 0.0.1
* (MeisterTR) initial release

## License
The MIT License (MIT)

Copyright (c) 2017-2019 MeisterTR <meistertr.smarthome@gmail.com>

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