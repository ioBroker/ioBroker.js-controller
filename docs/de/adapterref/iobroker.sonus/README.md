---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sonus/README.md
title: ioBroker.sonus
hash: f/UNNn9ThmG+ZNMzYnqolr5P5GUUFagnCxNbFzENobU=
---
![Logo](../../../en/adapterref/iobroker.sonus/admin/sonus.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.sonus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sonus.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/GermanBluefox/iobroker.sonus.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/GermanBluefox/ioBroker.sonus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sonus.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/GermanBluefox/ioBroker.sonus/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/GermanBluefox/ioBroker.sonus?branch=master&svg=true)

# IoBroker.sonus
## Sonus Adapter für ioBroker
Mit diesem Adapter können Sie ioBroker mit Sprache in vielen verschiedenen Sprachen steuern.

Es verwendet das Open-Source-Paket snowboy, um das Hotword zu erkennen, und google speech service, um die aufgezeichnete Stimme in Text umzuwandeln.
Nur 5 Sekunden nach dem heißen Wort wird aufgezeichnet.

## Installation unter Linux
Um den Snowboy (vor der Installation dieses Adapters) zu kompilieren, benötigen Sie einige Linux-Pakete, die wie folgt installiert werden können:

```
sudo apt-get install libmagic-dev
sudo apt-get install libatlas-base-dev
sudo apt-get install build-essential
sudo apt-get install sox libsox-fmt-all
```

### Mikrofon prüfen
Für eine gute Erkennungsqualität benötigen Sie ein gutes Mikrofon.
Ich habe es mit [UMA-8 USB Mic Array](https://www.minidsp.com/products/usb-audio-interface/uma-8-microphone-array) getestet.

Alle Aufnahmegeräte auflisten:

``` arecord -l```

Wenn Sie ein zusätzliches Mikrofon haben, müssen Sie das Standardmikrofon einstellen:

```
**** List of CAPTURE Hardware Devices ****
card 1: SpkUAC20 [miniDSP VocalFusion Spk (UAC2.0], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

Bearbeiten Sie `/usr/share/alsa/alsa.conf` und ersetzen Sie `defaults.pcm.card 0` durch `defaults.pcm.card 1`, da sich in Beispiel ein Mikrofon auf Karte 1 befindet.

Sie können das Mikrofon mit `rec test.wav` testen.

### Google-Anmeldeinformationen
Für die Texterkennung nach dem Erkennen des Hot Words verwendet dieser Adapter die Google Speech API. Um es zu aktivieren, müssen Sie Ihre eigenen Anmeldeinformationen abrufen und als JSON in die Konfiguration einfügen.

Die Anleitung finden Sie hier: [https://www.npmjs.com/package/@google-cloud/speech#using-the-client-library)(https://www.npmjs.com/package/@google-cloud/speech#using-the -client-library) oder [hier](https://github.com/googleapis/nodejs-speech#using-the-client-library)

Die Google JSON-Datei sieht folgendermaßen aus:

```
{
  "type": "service_account",
  "project_id": "ыаыаыаыва",
  "private_key_id": "ун457567565",
  "private_key": "-----BEGIN PRIVATE KEY-----\шукгншугкнеушеуке\n-----END PRIVATE KEY-----\n",
  "client_email": "рапрарапрапр.iam.gserviceaccount.com",
  "client_id": "апрапрарапрапр",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/аапрарарапрапра.iam.gserviceaccount.com"
}
```

Und nur der gesamte kopierte Text wird in die iobroker-Konfiguration eingefügt.

### Eigenes heißes Wort
Das Standard-Hotword ist `snowboy` oder `sonus`, aber Sie können hier ein eigenes "Hotword" -Modell erstellen [https://snowboy.kitt.ai/hotword/](https://snowboy.kitt.ai/hotword/) und in den Adapter hochladen.

## So analysieren Sie den Text
 Sie haben im Allgemeinen zwei Möglichkeiten, den Text zu analysieren und einen Befehl auszulösen:

 - text2command
 - Javascript

### Text2command
In text2command können Sie Triggerwörter setzen, dazu müssen Sie in der Konfiguration die Instanz text2command auswählen.

### Javascript
Schreiben Sie ein Skript, das den in sonus.X.data.detected angezeigten Text analysiert, wobei X die Instanz des Sonus-Adapters ist.

Das Skript sollte wie folgt aussehen:

```
on({id: 'sonus.0.data.detected', change: 'any'), obj => {
    console.log('Detected words: ' + obj.state.val);
    let command = '';
    if (obj.state.val.match(/on|ein/)) {
        command = true;
    } else if (obj.state.val.match(/off|aus/)) {
        command = false;
    }

    if (command === '') {
        console.log('Cannot detect command');
    } else {
        if (obj.state.val.match(/light|backlight/) && obj.state.val.match(/living/)) {
            setState('hm-rpc.0.Q92837293.1.STATE'/* Living room light */, command);
        } else {
            console.log('Cannot detect room or function');
        }
    }
});
```

## Changelog


### 0.1.1 (2019-05-24)
* (bluefox) added sensitivity parameter

### 0.1.0 (2019-05-20)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019 bluefox

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