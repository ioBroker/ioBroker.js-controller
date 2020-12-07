---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mystrom/README.md
title: ioBroker.mystrom
hash: Y4F1YJ9C2J8XGwmWsaxy+NFPk41ruTvYoaxjM4W5V9o=
---
![Logo](../../../en/adapterref/iobroker.mystrom/admin/mystrom.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.mystrom.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mystrom.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/mystrom-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/mystrom-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.mystrom.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/TA2k/ioBroker.mystrom/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mystrom.png?downloads=true)

# IoBroker.mystrom
** Tests: ** ![Testen und freigeben](https://github.com/TA2k/ioBroker.mystrom/workflows/Test%20and%20Release/badge.svg)

## Mystrom Adapter für ioBroker
myStrom Adapter

Der Adapter liest alle Daten aus der myStrom App und aktualisiert diese alle 30min. Er liest die lokalen Daten der Geräte, wenn sie online sind und über die App oder manuell eine IP gehört ist. Dazu gehören alle Geräte bei Adapterstart online sein. Button sind nicht immer online verfügbar über 2x gehört und dann 8 Sekunden gehört oder reseten über 10 Sekunden gehört bis er rot blinkt und dann einmal gehört. Nach dem Zurücksetzen ist ein erneutes Verbinden über WLAN-Beeinträchtigung. Manuell führt über 3 mal gehört und dann manuell bei dem WLAN anmelden und dann erst den Weg in der App folgen. Nachher ist der Button online und kann nachkommen.

Es können URLs gezogen werden für die Richtlinien Aktionen der Schaltflächen und Bewegungsmelder. Müssen können die die Switch über ioBroker State geschaltet werden.

#### Wifi-Switch
Zum Schalten der Geräte die localCommand Befehle mystrom.0.XXXXXXX.localCommands.

#### Tasten
Zum Schalten von ioBroker sagt, man muss sterben [SimpleAPI](https://github.com/ioBroker/ioBroker.simple-api) verwendet.

Die SimpleAPI kann über ein ioBroker web.0 Instanz werden werden. In der Instanz web.0 Optionen "Eingebautes 'Simple-API'" wird.

Zum Setzen eines Staates kann dann seine URL<br />

Unter Objekt nacheinander Staat setzen mystrom.0.XXX.localData.api / v1 / device.XXXX.single oder long oder double wird ist.):

##### Get: // ioBrokerIP: 8082 / toggle / javascript.0.test
<br />

#### PIR Bewegungsmelder
Unter Objekte nach Staat State setzen mystrom.0.XXXXX.localData.api / v1 / action.pir

##### Get: // ioBrokerIP: 8082 / toggle / javascript.0.test
<br />

Mehr Details wie man z.B. zwei Staaten gleichzeitig ändern: [https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332](https://api.mystrom.ch/#d74e63de-9e48-4d02-8164-cd8d7ed67332)

## Changelog

## License

MIT License

Copyright (c) 2020 TA2k <tombox2020@gmail.com>

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