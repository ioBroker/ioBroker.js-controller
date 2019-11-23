---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: 6gepr/U5aI7aF0Lgl6lXxB+Fqs7459a8Xzg3v+pWfNg=
---
![Logo](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/jack-blackson/ioBroker.meteoalarm.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![Anzahl der Installationen](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
=================

meteoalarm Adapter für ioBroker ------------------------------------------ -------------------------------- Dieser Adapter sendet Wetteralarme von meteoalarm.eu, einschließlich Wind, Schnee und Regen , hohe und niedrige Temperaturen usw. Diese Informationen sind in der Landessprache und für detaillierte Regionen verfügbar.

## Wie man es benutzt
Bitte gehen Sie zu http://meteoalarm.eu und wählen Sie Ihre Region aus. Gehen Sie dann zum RSS-Symbol oben rechts, machen Sie einen Rechtsklick und kopieren Sie den Link. Dies ist der Link, den Sie bitte zum Setup des Adapters hinzufügen.

![Logo](../../../en/adapterref/iobroker.meteoalarm/screenshot.png)

## Verfügbare Felder
| Feldname | Beschreibung |
|:---:|:---:|
| Letzte Aktualisierung | Datum, an dem der Adapter das letzte Mal Daten empfangen hat |
| Link | Link zum RSS Feed |
| Standort | Alarmstandort |
| Veröffentlichungsdatum Veröffentlichungsdatum des Alarms gemäß der Website |
| HTMLToday | HTML-Widget, das Alarme für heute anzeigt |
| Wetterkarte Land | HTML Link zur Wetterkarte des Alarmlandes |
| Heute / Morgen | Diese Datenpunkte sind für heute und morgen verfügbar: |
| Text | Alarmtext in länderspezifischer Sprache |
| Von | Alarmstartdatum |
| Bis | Enddatum des Alarms |
| Art des Alarms als Zahl |
| TypeText | Alarmtyp als Text |
| Alarmstufe als Zahl |
| LevelText | Alarmstufe als Text |
| Farbe | Alarmfarbe für Widgets |
| Symbol | Alarmtyp-Symbol |

## Alarmtypen
| Alarmtyp | Beschreibung |
|:---:|:---:|
| 1 | Wind |
| 2 | Schnee / Eis |
| 3 | Donner & Blitz |
| 4 | Nebel |
| 5 | Hohe Temperatur |
| 6 | Niedrige Temperatur |
| 7 | Coast Event |
| 8 | Waldbrand |
| 9 | Lawine |
| 10 | Regen |
| 11 | Unbekannt |
| 12 | Flut |
| 13 | Regenflut |

## Alarmstufen
| Alarmstufe | Beschreibung |
|:---:|:---:|
| Grün | Derzeit ist keine Warnung verfügbar. |
| Gelb | Das Wetter ist möglicherweise gefährlich. Die vorhergesagten Wetterphänomene sind nicht ungewöhnlich, aber Aktivitäten, die meteorologischen Risiken ausgesetzt sind, sollten verstärkt berücksichtigt werden. Informieren Sie sich über die zu erwartenden meteorologischen Bedingungen und gehen Sie keine vermeidbaren Risiken ein |
| Orange | Das Wetter ist gefährlich. Ungewöhnliche meteorologische Phänomene wurden vorhergesagt. Schäden und Unfälle sind wahrscheinlich. Seien Sie sehr aufmerksam und vorsichtig und halten Sie sich mit den erwarteten meteorologischen Bedingungen auf dem Laufenden. |
| Rot | Das Wetter ist sehr gefährlich. Es wurden ungewöhnlich intensive meteorologische Phänomene vorhergesagt. Extreme Schäden und Unfälle, oft über große Gebiete, bedrohen Leben und Eigentum. |

## Unterstützte Länder
* Österreich
* Kroatien
* Tschechische Republik
* Finnland
* Deutschland
* Griechenland
* Ungarn
* Irland
* Israel
* Italien
* Lettland
* Litauen
* Malta
* Moldawien
* Montenegro
* Niederlande
* Norwege
* Polen
* Rumänien
* Serbien
* Slowakei
* Spanien
* Schweiz
* Schweden

Wenn Sie Ihr Land nicht finden, erstellen Sie bitte ein Problem bei Github. Gerne füge ich es hinzu

## Nicht mögliche Länder
* Frankreich (kein RSS-Feed verfügbar)
* Portugal (keine Aufteilung möglich)
* Slowenien (kein RSS Feed verfügbar)

## Zu implementierende Funktionen
* Behandeln Sie mehrere Alarme an einem Tag

## 1.0.8 (15.11.2019)
* (jack-blackson) Hinzugefügt Polen, Moldawien, Griechenland, Rumänien
* (jack-blackson) Neuer Datenpunkt hinzugefügt, um den Link zur Wetterkarte zu erhalten

## 1.0.7 (2013-11-13)
* (jack-blackson) Hinzugefügt: Tschechische Republik, Irland, Israel, Litauen, Lettland, Montenegro, Malta, Serbien, Schweden

## 1.0.6 (2019-10-19)
* (jack-blackson) Schweiz & Slowakei hinzugefügt

## 1.0.5 (2019-09-22)
* (Jack-Blackson) Kleine Protokollierungsanpassungen

## 1.0.4 (2019-09-11)
* (Jack-Blackson) Travis-Fehler

## 1.0.3 (2019-09-09)
* (jack-blackson) Kleine Bugfixes, wechsle vom Typ "deamon" zu "schedule"

## 1.0.2 (2019-08-25)
* (jack-blackson) Nachbestellte Release-Infos

### 1.0.1 (2019-08-18)
* (jack-blackson) Bugfix kein Alarmsymbol

### 1.0.0 (2019-08-12)
* (Jack-Blackson) Release-Version

### 0.6.0 (2019-08-05)
* (jack-blackson) Speichern Sie Wettersymbole lokal im Adapter

### 0.5.0 (2019-07-21)
* (Jack-Blackson) Timeouts behandeln
* (jack-blackson) Übersetzungen für alle Sprachen
* (Jack-Blackson) URL-Prüfungen

### 0.4.0 (2019-07-20)
* (jack-blackson) Daten für NL, NO, HR, FI, ES hinzugefügt
* (jack-blackson) Typ Text hinzugefügt, Typ ist jetzt leer, wenn Level 1 ist (keine Warnung)
* (jack-blackson) Angepasste Farben

### 0.3.0 (13.07.2019)
* (jack-blackson) HTML Widget hinzugefügt
* (Jack-Blackson) Bugfix-Symbol

### 0.2.0 (2019-07-12)
* (jack-blackson) "Tomorrow" -Daten hinzugefügt

### 0.1.0 (11.07.2019)
* (Jack-Blackson) ursprüngliche Version

## Credits
Glocke in der Ikone entworfen von Freepik von www.flaticon.com

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019 jack-blackson <blacksonj7@gmail.com>

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