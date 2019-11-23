---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zoneminder/README.md
title: ioBroker.zoneminder
hash: ToV8enlU5mDfF2NTtGaQ9cJGLap+ep6FQoAQPFVRZjo=
---
![Logo](../../../en/adapterref/iobroker.zoneminder/admin/zoneminder.png)

![Anzahl der Installationen](http://iobroker.live/badges/zoneminder-installed.svg)
![stabile Version](http://iobroker.live/badges/zoneminder-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.zoneminder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zoneminder.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.zoneminder.svg)
![NPM](https://nodei.co/npm/iobroker.zoneminder.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.zoneminder/master.svg)

# IoBroker.zoneminder
## Zoneminder Adapter für ioBroker
Verbindung zu Ihrem Zoneminder.

## Beginnen
Geben Sie Ihren Host ein, z. 'http:// zoneminder / zm' Unveränderter Benutzer und Passwort ist 'admin'. Wenn Sie keine Authentifizierung haben, ändern Sie weder Benutzer noch Passwort.

Das Geräteintervall dient zur Überprüfung neuer Kameras und einiger grundlegender Informationen. Der Wert ist in Sekunden.
Das Monitorintervall dient zur Überprüfung von Alarmen und ist ebenfalls in Sekunden.

Wenn Sie Warnungsinformationen erhalten möchten, installieren Sie zmEventNotification auf Ihrem zoneminder und aktivieren Sie es in den iobroker-Einstellungen.

### Zoneminder-Einstellungen
Um die Kamera-URL-Verknüpfung mit Benutzer und pw zu aktivieren, müssen Sie AUTH_HASH_IPS in den Einstellungen deaktivieren

![Logo](../../../en/adapterref/iobroker.zoneminder/admin/auth_hash_ips.png)

## Changelog
### 0.3.3 (12.11.2019)
* (MeisterTR) error fixes, fix login error, fixes for latest
* (MeisterTR) add ZmEvents
* (MeisterTR) Select moniorfunction and disable/enable monitor
### 0.2.1
* (MeisterTR) add info states
* (MeisterTR) add camera-link with auth-key
* (MeisterTR) cange video link
### 0.1.0
* (MeisterTR) First running version
### 0.0.1
* (MeisterTR) initial release

## License
MIT License

Copyright (c) 2019 MeisterTR <meistertr.smarthome@gmail.com>

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