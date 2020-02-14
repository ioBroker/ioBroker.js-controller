---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.MieleCloudService
hash: +uTOxc+wS8rtAmvlfaENNjq2W5GH7DHUabNP+g3RTrs=
---
![Logo](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.png)

![Anzahl der Installationen](http://iobroker.live/badges/mielecloudservice-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Abhängigkeitsstatus](https://img.shields.io/david/Grizzelbee/iobroker.mielecloudservice.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg)
![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Grizzelbee/ioBroker.mielecloudservice/master.svg)

# IoBroker.MieleCloudService
=================

## Beschreibung
Mit diesem Adapter können Sie Informationen zu allen Ihren Miele @ Home-Geräten von der offiziellen Miele-API eines Drittanbieters abrufen.

## Installation
Führen Sie zur Installation die folgenden Schritte aus:

1. Installieren Sie über Admin: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git
2. Erstellen Sie in der Miele Smartphone App ein App-Konto für Miele @ Home
3. Erstellen Sie ein Entwicklerkonto unter https://www.miele.com/f/com/en/register_api.aspx
4. Fügen Sie Ihre Miele-Geräte zur App hinzu (falls nicht automatisch hinzugefügt)
6. Geben Sie die vom Miele-Entwicklerteam erhaltenen client_secret und client_id sowie die Konto-ID und das Kennwort von der App ein.

## Bedarf
* Miele @ Home-Benutzer (Smartphone-App)
* Miele @ Home-Passwort (Smartphone-App)
* Miele Client_id (von https://www.miele.com/developer/)
* Miele Client_secret (von https://www.miele.com/developer/)

## Nächste Schritte
* Neu: (längeres) Abfrageintervall, wenn kein Gerät aktiv ist
* Neu: Schlafzeit für vollständige Inaktivität (z. B. nachts)

## Dokumentation
Es gibt einige Datenpunkte, die auf zwei Arten verfügbar sind. Als vom Menschen lesbarer Text und als Zahl.
Diese numerischen Datenfelder, die zu einem Textfeld gehören, haben denselben Namen, aber ein "_raw" wird angehängt.
Die Felder, die eine allgemeine Bedeutung haben, sind unten aufgeführt.
Die Felder, die nicht aufgelistet sind, variieren in ihrer Bedeutung von Gerät zu Gerät und werden von Miele nicht dokumentiert.
Wenn Sie in Skripten auf diese Felder verweisen müssen, verwenden Sie immer die _raw-Werte.
Die Textwerte können sich in Zukunft ändern und hängen auch von der Sprache ab.
Hier ist eine Liste, wofür diese Rohwerte stehen:

### Zustand / Status
 | Rohwert | Staat |
 |----------|-------|
| 1 | AUS |
 | 2 | STAND_BY |
 | 3 | PROGRAMMIERT |
 | 4 | PROGRAMMED_WAITING_TO_START |
 | 5 | LAUFEN |
 | 6 | PAUSE |
 | 7 | END_PROGRAMMED |
 | 8 | FEHLER |
 | 9 | PROGRAMME_INTERRUPTED |
 | 10 | LEERLAUF |
 | 11 | RINSE_HOLD |
 | 12 | SERVICE |
 | 13 | SUPERFREEZING |
 | 14 | SUPERCOOLING |
 | 15 | ÜBERHITZUNG |
 | 144 | STANDARD |
 | 145 | GESPERRT |
 | 146 | SUPERCOOLING_SUPERFREEZING |

### ProgramType / Programmart
| Rohwert | Staat |
|----------|-------|
| 0 | Normaler Betriebsmodus |
| 1 | Eigenes Programm |
| 2 | Automatisches Programm |
| 3 | Reinigungs- / Pflegeprogramm |

### TrocknenSchritt / Trockenstufe
 | Rohwert | Staat |
 |----------|-------|
 | 0 | Extra trocken |
 | 1 | Normal Plus |
 | 2 | Normal |
 | 3 | Leicht trocken |
 | 4 | Handeisen Stufe 1 |
 | 5 | Handbügeleisen Stufe 2 |
 | 6 | Maschineneisen |

## Changelog

### 1.0.4 (2020-02-12)
* (grizzelbee) removed unneeded setTimeout from main
* (grizzelbee) Clearing scheduler on unload of adapter
* (grizzelbee) Minor updates and fixed typos in Readme

### 1.0.3 (2020-02-06)
* (grizzelbee) removed an overseen logging of Passwords
* (grizzelbee) Fixed createTemperatureDatapoint to work with less than 3 values delivered from API
* (grizzelbee) Added some documentation
* (grizzelbee) Started implementation of DeviceActions 


### 1.0.2 (2020-02-05)
* (grizzelbee) removed any logging of Passwords
* (grizzelbee) Fixed bug in config interface introduced during password encryption that config values aren't loaded properly

### 1.0.1 (2020-02-04)
* (grizzelbee) Fixes in environment for getting Adapater into the Repo
* (grizzelbee) Passwords are stored encyrpted now

### 1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefor it's incompatible with prior versions and needs to be installed freshly. 
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug 
* (grizzelbee) Chg: removed Push-API checkbox (may be introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for Non german Miele-Accounts (ALL should be included)
* (grizzelbee) Completely new layout of datapoints
* (grizzelbee) Devicetypes are grouped now 

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values 
* (grizzelbee) New: Parent-Datapoint of timevalues will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.  

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
                    - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

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

##Copyright
Copyright (c) 2019, 2020 grizzelbee <captain.tzk@gmail.com>