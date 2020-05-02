---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ring/README.md
title: Ringadapter
hash: z+0EKjBKMvAf5n8/5NOA5xp0XAE/dieMYTTzHmqIORQ=
---
![Logo](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.ring.svg?branch=master)
![AppVeyor-Build-Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.ring?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/ring-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ring.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ring.svg)
![NPM](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# Ringadapter
Benötigt node.js 10.0 oder höher und Admin v3!

Der Ringadapter funktioniert mit Ringgeräten wie der Ring Video-Türklingel und der Ring Cam und zeigt an, ob jemand an der Tür klingelt oder ob eine Bewegung erkannt wird. Die Klingel-Video-Türklingel oder -Kamera sendet einen Videostream, wenn eine Bewegung oder Türklingel erkannt wird oder Sie die SIP-Informationen für eine SIP-Videokonferenz mit Ihrem SIP-Client verwenden.
Leider funktioniert die Snapshot- und Livestream-Funktion nicht richtig. Leider habe ich keinen Einfluss darauf. Bitte berücksichtigen Sie dies, bevor Sie ein Problem erstellen.
Der Adapter stellt nicht alle Ringgeräte bereit, da die verwendete API nicht alle Ringgeräte enthält.

Sie können beispielsweise den Blink SIP-Client auf [http://icanblink.com/](http://icanblink.com/) verwenden. Um Videos zum Laufen zu bringen, gehen Sie in die Einstellungen von Blink und wechseln Sie unter "Konten" zu "Medien" und deaktivieren Sie "Audio und Video verschlüsseln" unter "RTP-Optionen". Achten Sie darauf, dass die SIP-Informationen nach einigen Sekunden ablaufen! Hoffentlich kann ich bald einen Videostream unterstützen. Leider hat [ring.com](https://ring.com) keine offizielle API, die diese Funktion unterstützt.
Wenn Sie die Livestreamrequest-Taste drücken, erhalten Sie neue SIP-Informationen zum Aufbau einer SIP-Videoanrufsitzung. Wenn Sie die Wolke [ring.com](https://ring.com) verwenden, finden Sie im Verlauf einen http-Link zu Ihrem zuletzt aufgezeichneten Video mit Bewegung / Türklingel.

## Installation & Konfiguration
Nach der Installation des Adapters müssen Sie Ihre E-Mail-Adresse und Ihr Passwort für Ihr [ring.com](https://ring.com)-Konto und ein Token eingeben. Ring erfordert jetzt die Verwendung von Two-Factor Auth (2fa) für alle Konten. Um den Token zu erhalten, folgen Sie bitte Ihrer Shell.

```
npx -p ring-client-api ring-auth-cli
```

oder

```
# Unix
cd /opt/iobroker/node_modules/iobroker.ring/node_modules/ring-client-api
node ring-auth-cli
```

![Ring Admin 1](../../../en/adapterref/iobroker.ring/docs/ring_admin_tab1.png)

![Ring Admin 2](../../../en/adapterref/iobroker.ring/docs/ring_admin_tab2.png)

## Objekte
![Ring Admin 2](../../../en/adapterref/iobroker.ring/docs/ring_objects.png)

## Beispiel
Ein Beispiel, um Änderungen zu erhalten, wenn eine Bewegung oder ein Türring erkannt wird:

```
on({id: "ring.0.doorbell_4711.kind"/*Kind*/},  (obj) => {
  if(obj.state.val == 'ding')   console.log("Someone is at the door");
  if(obj.state.val == 'motion') console.log("Motion detected");
});
```

## Changelog

### 1.1.1 (02.05.2020)
* (Stübi) Bugfixing
* (Stübi) User can enable/disable external sentry logging

### 1.1.0 (01.05.2020)
* (Stübi) Node 10 is now required, Node 12 recommended. If you use Node 8 or less, the adapter will stop immediately.
* (Stübi) Tested with js-controller 3. I recommend using js-controller 3 or higher because of sentry logging and more features in the future 
* (Stübi) Snapshot link will be shown as https or http in state (Issue #18)
* (Stübi) Livestream link added and a request button added to get new livestream
* (Stübi) Old snapshots and livestreams can be deleted on the filesystem
* (Stübi) Sentry logging added
* (Stübi) Small improvements and bugfixing   
* (Stübi) Add a Two-Factor Auth (2fa) description (Issue #14, Issue #13, Issue #19)

### 1.0.7 (24.12.2019)
* (Stübi) Bugfixing

### 1.0.6 (20.12.2019)
* (Stübi) Bugfixing: Login with username and password changed
* (Stübi) New feature (BETA): Now you can make snapshots in jpg and a livestream in mp4 format. Unfortunately the snapshot / livestream does not work always! 

### 1.0.5 (18.04.2019)
* (Stübi) Bugfixing 
* (Stübi) Using new API. With this API livestreaming and snapshots are possible (work still in progress and not supported in this version)
* (Stübi) Fixed an error with js-controller 2.0. You need at least this version with js-controller 2.0
* (Stübi) two face authentication


### 1.0.4 (17.04.2019)
* (Stübi) Bugfixing for Ring Pro 

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

Copyright (c) 2020 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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