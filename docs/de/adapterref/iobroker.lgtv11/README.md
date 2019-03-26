---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lgtv11/README.md
title: ioBroker.lgtv11
hash: fUNqRBv5qACrw27zBNd33tLdtC19BbCGNUAOTk6m4MA=
---
![Logo](../../../en/adapterref/iobroker.lgtv11/admin/lgtv2011.png)

![Anzahl der Installationen](http://iobroker.live/badges/lgtv11-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lgtv11.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lgtv11.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv11.png?downloads=true)
![Travis-CI](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv11.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/fwlpfd33mafbivcm/branch/master?svg=true)

# IoBroker.lgtv11 ==================
LG WebOS SmartTV-Adapter für ioBroker

Fernsteuerung eines LG WebOS SmartTV (2011 Modelle bis WebOS) ab [ioBroker](https://www.iobroker.net).

---

## Verwendungszweck:
1.) Installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.

2.) Geben Sie in der Adapterkonfiguration die IP-Adresse Ihres LG WebOS TV ein.

3.) Starten Sie den Adapter

4.) Öffnen Sie die Adapterkonfiguration und klicken Sie auf "Request Pairing Key".

5.) Stecken Sie den auf Ihrem Fernsehbildschirm angezeigten Verbindungsschlüssel in die Adapterkonfiguration

6.) Starten Sie den Adapter neu.

## Einige Beispiele:
```setState('lgtv.0.turnOff', true);```

Fernseher ausschalten.

```setState('lgtv.0.back', true);```

Geht zurück.

```setState('lgtv.0.mute', true);```

Schalten Sie den Fernseher aus.

```setState('lgtv.0.mute', false);```

Stummschalten des Fernsehers

```setState('lgtv.0.volumeUp', true);```

Dadurch wird die Lautstärke des Fernsehgeräts erhöht.

```setState('lgtv.0.volumeDown', true);```

Verringern der Lautstärke des Fernsehgeräts.

```setState('lgtv.0.channelUp', true);```

Erhöhen des aktuellen Fernsehkanals.

```setState('lgtv.0.channelDown', true);```

Verringern des aktuellen Fernsehkanals.

```setState('lgtv.0.3Dmode', true);```

Aktiviert den 3D-Modus am Fernsehgerät

```setState('lgtv.0.3Dmode', false);```

Deaktiviert den 3D-Modus am Fernsehgerät.

```setState('lgtv.0.input', true);```

Öffnen Sie die Eingabeliste, zu der Sie wechseln möchten.

---

## Changelog

### 1.0.5 (2019-01-21)
* (SebastianSchultz) Added compact mode

### 1.0.4 (2018-05-08)
* (SebastianSchultz) Added "back" command/state

### 1.0.3 (2018-04-27)
* (SebastianSchultz) Fixed a bug in Admin interface that no pairing key could be requested

### 1.0.2 (2018-04-18)
* (SebastianSchultz) Renamed from ioBroker.lgtv2011 to ioBroker.lgtv11

### 1.0.1 (2018-04-17)
* (SebastianSchultz) Code clean up

### 1.0.0 (2018-04-15)
* (SebastianSchultz) Initial Release


---

## License

The MIT License (MIT)

Copyright (c) 2019 Sebastian Schultz.

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