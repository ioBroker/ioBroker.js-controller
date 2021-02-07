---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lg-ess-home/README.md
title: ioBroker.lg-ess-home
hash: 2eL0UVFcmdRSjNgOgVhDCAy9KFCsDkov29qCT4hXbg0=
---
![Logo](../../../en/adapterref/iobroker.lg-ess-home/admin/lg-ess-home.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lg-ess-home.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lg-ess-home.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/lg-ess-home-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/lg-ess-home-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Morluktom/iobroker.lg-ess-home.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Morluktom/ioBroker.lg-ess-home/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lg-ess-home.png?downloads=true)

# IoBroker.lg-ess-home
** Tests: ** ![Testen und freigeben](https://github.com/Morluktom/ioBroker.lg-ess-home/workflows/Test%20and%20Release/badge.svg)

## LG ESS Home Adapter für ioBroker
Ein iobroker Adapter für einen LG ESS Hybrid Wechselrichter. Mit diesem Adapter kann der Status des Wechselrichters abgelesen werden. Es ist auch möglich, den Wechselrichter zu betreiben.

## Aufbau
### Passwort erhalten
1. Laden Sie die Datei [LG_Ess_Password.exe] herunter (https://github.com/Morluktom/ioBroker.lg-ess-home/tree/master/tools).
1. Schließen Sie den Computer an das WLAN des LG_ESS-Systems an. (WLAN-Passwort steht auf dem Typenschild)
1. Starten Sie LG_Ess_Password.exe (mindestens .Net Framework 4.5 erforderlich)
1. Notieren Sie sich Ihr Passwort

Für diejenigen, die exe nicht mögen: (Danke grex1975) \ Sie können jeden REST-Client verwenden, um das Passwort zu erhalten:

1. Stellen Sie eine Verbindung zum WLAN des LG_ESS her
1. Führen Sie eine GET-Anforderung aus

URL: https://192.168.23.1/v1/user/setting/read/password \ Header: "Zeichensatz": "UTF-8", "Inhaltstyp": "application / json" \ Body: "key": "lgepmsuser! @ #"

Dies sollte Ihnen das Passwort und einen Status als Gegenleistung geben.

## Changelog

### 0.0.8 (2021-02-06)
* (Morluktom) Code cleanup

### 0.0.7 (2021-02-01)
* (Morluktom) Code cleanup

### 0.0.6 (2020-12-23)
* (Morluktom) Data type recognition fixed

### 0.0.5 (2020-12-15)
* (Morluktom) ScalingFactor moved to nativ
* password encryption => auto encryption (Maybe you have to set the password new)

### 0.0.4
* (Morluktom) W => kW, values confirmed

### 0.0.3
* (Morluktom) Structure of the channel and states changed

### 0.0.2
* (Morluktom) Separate Intervall for Common and Home

### 0.0.1
* (Morluktom) initial release

## License
MIT License

Copyright (c) 2020 - 2021 Morluktom <strassertom@gmx.de>

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