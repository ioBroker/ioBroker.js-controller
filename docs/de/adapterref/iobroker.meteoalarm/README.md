---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: dSIeHPUsGeGD6TJaFSBoVxbTLJFv/IL/lp8haqD9UHg=
---
![Logo](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![Greenkeeper-Abzeichen](https://snyk.io/test/github/jack-blackson/ioBroker.meteoalarm/badge.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![Anzahl der Installationen](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
meteoalarm Adapter für ioBroker ---------------------------------------------- -------------------------------- Dieser Adapter ruft Wetteralarme von meteoalarm.eu ab, einschließlich Wind, Schnee, Regen , hohe und niedrige Temperatur usw. Diese Informationen sind in der Landessprache und für detaillierte Regionen verfügbar.

## Wie man es benutzt
Es gibt zwei Möglichkeiten, wie Sie den Link zum Abrufen der Meteoalarm-Informationen erhalten können.

Option 1: Wählen Sie Ihr Land aus, drücken Sie "Region laden" und wählen Sie dann die Region aus. Die XML wird dann automatisch gefüllt. Drücken Sie einfach Speichern und Sie sind bereit.

Option 2: Gehen Sie zu http://meteoalarm.eu und wählen Sie Ihre Region aus. Gehen Sie dann zum RSS-Symbol oben rechts, klicken Sie mit der rechten Maustaste und kopieren Sie den Link. Dies ist der Link, den Sie bitte zum Setup des Adapters hinzufügen.

![Logo](../../../en/adapterref/iobroker.meteoalarm/screenshot.png)

## Verfügbare Felder
| Feldname | Beschreibung |
|:---:|:---:|
| Letzte Aktualisierung | Datum, an dem der Adapter das letzte Mal Daten empfangen hat |
| Link | Link zum RSS-Feed |
| Ort | Alarmort |
| Veröffentlichungsdatum | Veröffentlichungsdatum des Alarms gemäß der Website |
| HTMLToday | HTML-Widget, das Alarme für heute anzeigt |
| Wetterkartenland | HTML-Link zur Wetterkarte des Alarmlandes |
| Heute / Morgen | Diese Datenpunkte sind für heute und morgen verfügbar: |
| Text | Alarm Text in länderspezifischer Sprache |
| Ab | Alarmstartdatum |
| Bis | Alarmenddatum |
| Typ | Alarmtyp als Nummer |
| TypeText | Alarmtyp als Text |
| Alarmstufe | Alarmstufe als Nummer |
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
| 7 | Küstenereignis |
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
| Gelb | Das Wetter ist möglicherweise gefährlich. Die vorhergesagten Wetterphänomene sind nicht ungewöhnlich, aber Aktivitäten, die meteorologischen Risiken ausgesetzt sind, sollten verstärkt berücksichtigt werden. Halten Sie sich über die zu erwartenden meteorologischen Bedingungen auf dem Laufenden und gehen Sie keine vermeidbaren Risiken ein |
| Orange | Das Wetter ist gefährlich. Ungewöhnliche meteorologische Phänomene wurden vorhergesagt. Schäden und Unfälle sind wahrscheinlich. Seien Sie sehr aufmerksam und vorsichtig und halten Sie sich über die erwarteten meteorologischen Bedingungen auf dem Laufenden. |
| Rot | Das Wetter ist sehr gefährlich. Es wurden ungewöhnlich intensive meteorologische Phänomene vorhergesagt. Extreme Schäden und Unfälle, oft über große Gebiete, bedrohen Leben und Eigentum. |

## Unterstützte Länder
* Österreich
* Kroatien
* Tschechien
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
* Norwegen
* Polen
* Rumänien
* Serbien
* Slowakei
* Spanien
* Schweiz
* Schweden

Wenn Sie Ihr Land nicht finden, erstellen Sie bitte ein Problem auf github, und ich werde es gerne hinzufügen

## Nicht mögliche Länder
* Frankreich (kein RSS-Feed verfügbar)
* Portugal (keine Aufteilung möglich)
* Slowenien (kein RSS-Feed verfügbar)

## Zu implementierende Funktionen
* Behandeln Sie mehrere Alarme an einem Tag

## 1.1.1 (2020-10-28)
* (jack-blackson) Bugfix HTML-Daten

## 1.1.0 (2020-03-29)
* (Jack-Blackson) Bugfix Deutschland

## 1.0.9 (2020-02-06)
* (Jack-Blackson) Bugfix Deutschland

## 1.0.8 (15.11.2019)
* (jack-blackson) Hinzugefügt Polen, Moldawien, Griechenland, Rumänien
* (jack-blackson) Neuer Datenpunkt hinzugefügt, um einen Link zur Wetterkarte zu erhalten

## 1.0.7 (2019-11-13)
* (jack-blackson) Hinzugefügt Tschechische Republik, Irland, Israel, Litauen, Lettland, Montenegro, Malta, Serbien, Schweden

## 1.0.6 (2019-10-19)
* (jack-blackson) Schweiz & Slowakia hinzugefügt

## 1.0.5 (22.09.2019)
* (Jack-Blackson) Kleine Protokollierungsanpassungen

## 1.0.4 (2019-09-11)
* (Jack-Blackson) Travis-Fehler

## 1.0.3 (2019-09-09)
* (jack-blackson) Kleine Bugfixes, ändern Sie von Typ "deamon" zu "Zeitplan"

## 1.0.2 (2019-08-25)
* (jack-blackson) Neu geordnete Release-Infos

### 1.0.1 (2019-08-18)
* (Jack-Blackson) Bugfix kein Alarmsymbol

### 1.0.0 (2019-08-12)
* (Jack-Blackson) Release-Version

### 0.6.0 (05.08.2019)
* (Jack-Blackson) Speichern Sie die Wettersymbole lokal im Adapter

### 0.5.0 (2019-07-21)
* (Jack-Blackson) Handle Timeouts
* (jack-blackson) Übersetzungen für alle Sprachen
* (jack-blackson) URL-Überprüfungen

### 0.4.0 (20.07.2019)
* (jack-blackson) Daten für NL, NO, HR, FI, ES hinzugefügt
* (jack-blackson) Typ hinzugefügt Text, Typ ist jetzt leer, wenn Stufe 1 ist (keine Warnung)
* (Jack-Blackson) Angepasste Farben

### 0.3.0 (2019-07-13)
* (jack-blackson) HTML-Widget hinzugefügt
* (Jack-Blackson) Bugfix-Symbol

### 0.2.0 (2019-07-12)
* (jack-blackson) "Tomorrow" -Daten hinzugefügt

### 0.1.0 (2019-07-11)
* (Jack-Blackson) Erstversion

## Credits
Bell in Icon von Freepik von www.flaticon.com

## Changelog

## License
The MIT License (MIT)

Copyright (c) 2019-2020 jack-blackson <blacksonj7@gmail.com>

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