---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.proxy/README.md
title: ioBroker.proxy
hash: //IRKnZisUrRTj8PhVbFCytT++DK67nIbOBiUfK1sBs=
---
![Logo](../../../en/adapterref/iobroker.proxy/admin/proxy.png)

![Anzahl der Installationen](http://iobroker.live/badges/proxy-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.proxy.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.proxy.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.proxy.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.proxy.png?downloads=true)

# IoBroker.proxy
## Verwendungszweck
Ermöglicht den Zugriff auf definierte URLs oder lokale Dateien über einen Webserver.

Die angegebenen Routen sind unter `http://ip:8082/proxy.0/context/...` verfügbar. Natürlich können Port, Protokoll, `proxy.0` je nach Einstellungen variieren.

## Aufbau
- WEB-Adapter erweitern: Für welche Web-Instanz wird dieser Proxy aktiviert.
- Routenpfad: Pfad für den Proxy. Wenn "/proxy.0", sind die Routen unter "http:// webIP: 8082 / proxy.0 / ..." verfügbar
- Fehlerzeitlimit (ms): Minimales Intervall zwischen Wiederholungsversuchen, wenn die angeforderte Ressource nicht verfügbar war oder ein Fehler zurückgegeben wurde.
- Verwenden Sie einen einfachen Proxy: In diesem Fall wird die sehr einfache, aber robuste Methode verwendet. Es ist nicht für Web-Sockets oder POST-Anforderungen geeignet. Verwenden Sie diese Methode, wenn Sie Probleme mit der Kommunikation über WEB Instance oder socket.io haben.

## Beispieleinstellungen
| Kontext | URL | Beschreibung |
|----------------|:---------------------------------------------------|:---------------------------------------------------|
| admin / | http:// localhost: 8081 | Zugriff auf die Admin-Seite |
| Router / | http://192.168.1.1 | Zugriff auf lokalen Router |
| cam / | http:// user: pass@192.168.1.123 | Zugriff auf die Webcam (z. B. unter http: // ip: 8082 / proxy.0 / cam / web / snapshot.jpg) |
| dir / | / tmp / | Zugriff auf lokales Verzeichnis "/ tmp /" |
| dir / | tmp / | Zugriff auf lokales Verzeichnis "/ opt / iobroker / tmp" |
| file.jpg | /tmp/picture.jpg | Zugriff auf lokale Datei "/tmp/picture.jpg" |

** Nicht auf alle Geräte kann über einen Proxy zugegriffen werden. **

Einige Geräte möchten sich im Stammverzeichnis befinden `http://ip/` und können nicht unter `http://ip/proxy.0/context/` ausgeführt werden.

Sie können mehr über den Kontext lesen [Hier](https://www.npmjs.com/package/http-proxy-middleware#context-matching)

Zusätzlich kann der Benutzer den Routenpfad für Proxy-Anfragen definieren.

## Changelog
### 1.1.0 (2019-06-27)
* (bluefox) Implemented simple proxy to eliminate socket.io problem

### 1.0.3 (2018-07-14)
* (bluefox) Newer mime version used

### 1.0.2 (2018-06-30)
* (bluefox) URI was decoded for usage of special chars in password and login

### 1.0.1 (2018-03-01)
* (bluefox) Fixed error: after 10 timeouts the web cam was never reachable
* (bluefox) Ready for Admin3

### 1.0.0 (2017-10-09)
* (bluefox) do not allow the error generation to fast

### 0.2.0 (2017-03-13)
* (bluefox) fix run-mode

### 0.0.1 (2017-01-09)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2019 bluefox <dogafox@gmail.com>

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