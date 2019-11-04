---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.youtube/README.md
title: ioBroker.youtube
hash: odZi6WpqavriGlgD83pHDdtlCzP/e2UxBCr1NMmBGpo=
---
![Logo](../../../en/adapterref/iobroker.youtube/admin/youtube.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.youtube.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.youtube.svg)
![Stabil](http://iobroker.live/badges/youtube-stable.svg)
![Eingerichtet](http://iobroker.live/badges/youtube-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/klein0r/iobroker.youtube.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/klein0r/ioBroker.youtube/badge.svg)
![Build Status](http://img.shields.io/travis/klein0r/ioBroker.youtube.svg)
![NPM](https://nodei.co/npm/iobroker.youtube.png?downloads=true)

# IoBroker.youtube
Fügt ioBroker Kanalstatistiken wie Aufrufe, Abonnenten und neueste Videos hinzu. Mit dieser Lösung können Sie Ihr Kanalwachstum verfolgen oder Ihre Werte mit anderen YouTubern vergleichen.

Da all diese Informationen öffentlich verfügbar sind, können Sie diesen Adapter auch verwenden, um Ihren bevorzugten YouTubern zu folgen und Sie zu informieren (z. B. wenn ein neues Video verfügbar ist). Sie benötigen lediglich einen API-Schlüssel, um auf diese Informationen zuzugreifen. Weitere Informationen finden Sie im Abschnitt Konfiguration.

## Aufbau
Um einen API-Key zu erhalten, müssen Sie zu [console.developers.google.com](https://console.developers.google.com/apis/dashboard) gehen.

1. Erstellen Sie ein neues Projekt
2. Erstellen Sie einen neuen API-Schlüssel
3. Fügen Sie der Bibliothek "YouTube Data API v3" hinzu
4. Verwenden Sie diesen API-Schlüssel im Optionsfeld

## Changelog

### 0.0.2

* (klein0r) improved error handling

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2019 Matthias Kleine <info@haus-automatisierung.com>

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