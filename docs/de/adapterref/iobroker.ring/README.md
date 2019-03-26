---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ring/README.md
title: Ringadapter
hash: o3ElFNuF53MNsHtyLEEpzVj1oCXP6yO9LfjM4Ri29+I=
---
![Logo](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.ring.svg?branch=master)
![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.ring?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/ring-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ring.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ring.svg)
![NPM](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# Ringadapter
Benötigt node.js 8.0 oder höher und Admin v3!

Der Ringadapter funktioniert mit Ringgeräten wie der Ring-Video-Türklingel und der Ring-Cam und zeigt an, ob Somenone an der Türklingel klingelt oder ob eine Bewegung erkannt wird. Die Ring-Video-Türklingel oder -Nocken-Kamera sendet keinen Videostream, wenn eine Bewegung oder Türklingel erkannt wird. Stattdessen werden SIP-Informationen für eine SIP-Videokonferenz bereitgestellt.
Sie können beispielsweise den Blink-SIP-Client unter [http://icanblink.com/](http://icanblink.com/) verwenden. Um das Video zum Laufen zu bringen, gehen Sie in die Voreinstellungen von Blink. Klicken Sie unter "Konten" auf "Medien" und deaktivieren Sie "Audio und Video verschlüsseln" unter "RTP-Optionen". Seien Sie vorsichtig, dass die SIP-Informationen nach einigen Sekunden ablaufen! Hoffentlich kann ich bald einen Videostream unterstützen. Leider hat [ring.com](https://ring.com) keine offizielle API, die diese Funktion unterstützt.
Wenn Sie die Livestream-Anforderungstaste drücken, erhalten Sie neue SIP-Informationen zum Aufbau einer SIP-Videoanrufsitzung. Wenn Sie die Cloud [ring.com](https://ring.com) verwenden, finden Sie unter Verlauf einen http-Link zu Ihrem zuletzt aufgezeichneten Video.

## Install & Konfiguration
Nach der Installation des Adapters müssen Sie Ihre E-Mail-Adresse und das Kennwort Ihres [ring.com](https://ring.com)-Kontos eingeben.

Ein Beispiel für Änderungen, wenn eine Bewegung oder ein Türring erkannt wird:

```
on({id: "ring.0.doorbell_4711.kind"/*Kind*/},  (obj) => {
  if(obj.state.val == 'ding')   console.log("Someone is at the door");
  if(obj.state.val == 'motion') console.log("Motion detected");
});
```

## Changelog

### 1.0.3 (09.03.2019)
* (Stübi) Major change! I had to change the used ring.com API to an other API. The old one did not work anymore. For this reason, a lot has to be redesigned.  

### 1.0.2 (01.02.2019)
* (Stübi) More debug information 

### 1.0.1 (05.01.2019)
* (Stübi) Support js-controller compact mode 

### 1.0.0 (04.01.2018)
* (Stübi) Add camera device. For this reason, the device name changed from doorbot to doorbell.

### 0.1.3 (20.12.2018)
* (Stübi) Update error handling

### 0.1.2 (17.12.2018)
* (Stübi) Update error handling

### 0.1.1 (15.12.2018)
* (Stübi) Improvements

### 0.1.0 (14.12.2018)
* (Stübi) First Version

## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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