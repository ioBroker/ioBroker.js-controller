---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: hod32R3uebNevrTeoMM0luiWFXhD8B8qBXN+vXXSH5E=
---
![Logo](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/sainlogic-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/sainlogic-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Sainlogic Adapter für ioBroker
Lesen Sie Daten von einer sainlogischen Wetterstation

## Unterstützte Geräte
Grundsätzlich wird bei jedem Gerät, das mit der Sainlogic-Hardware arbeitet, die Firmware normalerweise als "EasyWeather Vx.x.x)" gemeldet.

Bekannte Arbeitsgeräte:

1. ELV WS980Wifi
1. Eurochron EFWS2900 (nur Listener-Modus)
1. Froggit WH400SE
1. Sainlogic WS3500 (nur Listener-Modus)

## Verwendung
Der Adapter unterstützt zwei Modi zum Anzeigen von Daten Ihrer Wetterstation.

Im Listener-Modus unterstützt der Adapter zusätzliche Sensoren, wenn diese von Ihrer Wetterstation geliefert werden. Derzeit werden Temperatur und Luftfeuchtigkeit unterstützt. Wenn Sie einen weiteren zusätzlichen Sensor haben, werfen Sie bitte ein Github-Problem auf und veröffentlichen Sie Ihre Datenzeichenfolge, da dies mir hilft, die Funktionalität zu erweitern.

### Listener-Modus:
Mit den neuesten Firmware-Versionen unterstützt die Wetterstation das Senden von Daten an einen benutzerdefinierten Server. Der Adapter fungiert als solcher Server. Das Setup benötigt zwei Schritte:

#### Wetterstation konfigurieren
Verwenden Sie die 'WS View'-App auf Ihrem Mobilgerät, um die Wetterstation zu konfigurieren. Konfigurieren Sie die folgenden Einstellungen für benutzerdefinierte Servereinstellungen:

- Server: IP / Hostname Ihres IOBroker-Servers
- Pfad: alles, merken Sie es sich einfach für die Adapterkonfiguration
- Port: Jede Zahl zwischen 1024 und 65000 (Standard ist 45000) muss auf Ihrem IOBroker-System eindeutig und frei sein
- Stations-ID: nicht verwendet
- Stationsschlüssel: nicht verwendet
- Protokolltyp: WeatherUnderground
- Upload-Intervall: Alles, was von Ihrer Wetterstation unterstützt wird

#### Konfigurieren Sie den Listener
Wählen Sie in der Instanzkonfiguration die Registerkarte 'Listener' und stellen Sie Folgendes ein:

- Aktiv: wahr
- IP: Wählen Sie die IP Ihres IOBrokers aus, mit der die Wetterstation eine Verbindung herstellen kann (Standard ist 0.0.0.0, um alle IPs zuzulassen). Dies ist hauptsächlich relevant, wenn Sie mehrere Netzwerke haben, andernfalls reicht die Standardeinstellung aus
- Port: Geben Sie denselben Port wie in der WS View-App ein
- Pfad: Geben Sie denselben Pfad wie in der WS View-App ein
- URL weiterleiten: Wenn Sie die empfangenen Daten an einen anderen Verbraucher weiterleiten möchten, können Sie eine zusätzliche Adresse angeben. Z.B. Möglicherweise erhalten Sie Daten im WU-Format und möchten diese dennoch an WeatherUnderground weiterleiten.

Speichern.
Der Listener startet und wartet auf eingehende Verbindungen. Basierend auf Ihrem Intervall sollte im Protokoll die Meldung "Listener hat Update erhalten: ..." mit den Daten angezeigt werden.

### Scheduler-Modus:
Wenn Ihre Wetterstation das Abrufen von Daten unterstützt, können Sie den Scheduler dafür konfigurieren. Das verwendete Protokoll basiert auf [WS980-Dokumentation](https://github.com/RrPt/WS980).

#### Konfigurieren Sie den Scheduler
Wählen Sie in der Instanzkonfiguration die Registerkarte 'Scheduler' und stellen Sie Folgendes ein:

- Aktiv: wahr
- IP: Wählen Sie die IP Ihrer Wetterstation. Stellen Sie sicher, dass die IP fest ist und sich nicht ändert
- Port: Geben Sie den Port ein, zu dem eine Verbindung hergestellt werden soll (Standard ist 45000).
- Intervall: Geben Sie ein Intervall in Sekunden ein (ich würde mindestens 10 Sekunden empfehlen, um das System oder das Netzwerk nicht zu überlasten).

Speichern.

Der Schheduler startet nach der ersten Intervallzeit und stellt eine Verbindung zur Wetterstation her. Im Protokoll sollte die Meldung "Scheduler zieht nach neuen Daten" angezeigt werden. Wenn Sie den Protokollmodus auf Debuggen einstellen, werden auch die empfangenen Datenzeichenfolgen angezeigt.

## Credits
Credits gehen an: Lemuba, StrathCole, Glasfaser, Latzi: für unermüdliches Testen meiner Bugs :) Lisa für ihre [Code zum Übersetzen von Windgraden in eine Überschrift](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

Latest version

#### 0.6.6 Adressed github issue #53 - warning on non existing object

#### 0.6.5 Removed unneeded events

#### 0.6.4 For WH2650: Adding model name and weather station communication frequency datapoint

#### 0.6.3 Fixed outdoor humidity

#### 0.6.2 Added additional sensor support


For detailed change log or previous versions check io-package.json

## License
MIT License

Copyright (c) 2020 Fogg <foggch@gmail.com>

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