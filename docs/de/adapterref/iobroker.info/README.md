---
BADGE-Number of Installations: http://iobroker.live/badges/info-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.info.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.info.svg
BADGE-NPM: https://nodei.co/npm/iobroker.info.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/iobroker-community-adapters/ioBroker.info/master.svg
BADGE-Dependency Status: https://img.shields.io/david/iobroker-community-adapters/iobroker.info.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/iobroker-community-adapters/ioBroker.info/badge.svg
---
# Admin

Der Info Adapter wurde entwickelt um verschiedene Informationen zum System, über ioBroker und relevante Themen dem User zur Verfügung zu stellen. Der Anwender soll eine Übersicht aller Interessanten und wichtigen Daten erhalten und das ioBroker-Team wird die Möglichkeit gegeben, dem User noch schneller zu kontaktieren, falls wichtige Infos vorhanden sind.

# Installation

Um das Info Fenster im Tab-Reiter zu sehen, müssen Sie nach der Installation es zuerst im Admin als Sichtbar anhaken. Dazu klicken Sie in der Admin-Fenster oben Links auf dem nach unten zeigenden Dreieck und wählen im Menü "Info" aus.

# Konfiguration

* Uhr nicht anzeigen - Um die Uhr oben Links auszublenden.
* Adapteranfragen anzeigen - Zeigt den Panel mit den Adapteranfragen an.
    * Adapteranfragen beim Start geschlossen - Das Panel mit der Adapteranfragen, ist beim Start des Info Fensters geschlossen.
* Bekannte Fehler anzeigen - Zeigt den Panel mit bekannten Fehler und Wünsche für installierte Adaptern an.
    * Bekannte Fehler beim Start geschlossen - Das Panel mit der bekannten Fehlern, ist beim Start des Info Fensters geschlossen.

* Zeige News vom iobroker.net - Zeigt den Panel mit den offiziellen ioBroker Nachrichten an. 
* Zeige die neusten Forumeinträge - Zeigt den Panel mit den letzten Forumeinträge an.
* Feednami API-Key - Wenn Sie ioBroker über einen Hostnamen aufrufen, wie z.B. iobroker:8081 oder so ähnliches, müssen Sie sich kostenlos bei Feednami anmelden, um eine entsprechende API Key zu bekommen. Für den Zugriff über eine IP-Adresse ist das nicht nötig.

* Dokumentationen anzeigen - Zeigt den Button für die Dokumentationen an.
    * Wählen Sie die gewünschten Sprachen für die Dokumentationen aus - Auswahl der Sprachen die bei den Dokumentationen berücksichtigt werden sollen.

* Durchsuche Github nach unbekannten Adapter (Experten) - Zeigt den Panel mit der Suche nach nicht offiziell freigegebenen Adaptern im Github.
    * Adapter sortieren nach - Sortiert das Ergebnis der Suche nach Name, Erstellungsdatum oder letztes Update.
    * umgekehrter Reihenfolge - Kehrt die Reihenfolge der Ergebnisse um.
    * Neue Adapter beim Start geschlossen - Das Panel mit den unbekannten Adapter, ist beim Start des Info Fensters geschlossen.

* Aktuelle Systemdaten nicht laden - Die aktuellen Daten zum System werden nicht zyklisch geladen.
    * CPU-Daten alle x Sekunden laden - Die CPU Daten werden zyklisch alle 2 bis 10 Sekunden geladen. 0 ist aus.
    * Speicherdaten alle x Sekunden laden - Die Speicherdaten werden zyklisch alle 2 bis 10 Sekunden geladen. 0 ist aus.
    * Festplattendaten alle x Sekunden laden - Die Speicherdaten werden zyklisch alle 2 bis 10 Sekunden geladen. 0 ist aus.

# Info Tab

## Uhr

Die Uhr hat keine besondere Funktion und kann jederzeit in der Konfiguration ausgeschaltete werden.
<img height="200" src="img/clock.png">

## Meldungen

<img height="200" src="img/messages.png">

### Meldungen (VIS-Widget)

## Dokumentation

<img height="200" src="img/documentation.png">

## Aktualisierungen

<img height="200" src="img/updates.png">

## Neue Adapter

<img height="200" src="img/new_adapters.png">

## Systeminformationen

<img height="200" src="img/systeminfo.png">

### Systeminformationen (Detailansicht)

## Adapteranfragen

<img height="200" src="img/adapter_requests.png">

## Probleme und Fehler

<img height="200" src="img/issues_bugs.png">

## ioBroker-Adapter auf Github

<img height="200" src="img/adapter_search.png">

## News

<img height="200" src="img/news.png">

## Forum

<img height="200" src="img/forum.png">

## Changelog

### 1.3.x (2019-04-01)
* (ldittmar) better system information

### 1.2.7 (2019-03-17)
* (ldittmar) little fixes
* (ldittmar) unknow adapters search new design
* (ldittmar) better design for PC monitor
* (ldittmar) unknow adapters show more informations
* (ldittmar) stable version

### 1.2.5 (2019-03-14)
* (ldittmar) show adapter requests
* (ldittmar) show bugs and issues
* (ldittmar) diyplay important links
* (ldittmar) show important popup news
* (ldittmar) vis widget for popup news

### 1.1.3 (2019-01-03)
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support
* (ldittmar) add new forum support
* (ldittmar) add chinese forum support
* (ldittmar) move to iobroker-community-adapters

### 1.0.2 (2018-11-30)
* (ldittmar) fixed problems with Node version info in multihost system

### 1.0.1 (2018-11-27)
* (ldittmar) search for new adapters on Github
* (ldittmar) check for Node.js update
* (ldittmar) https problems with news and forum data solved
* (ldittmar) polish added as language

### 1.0.0 (2018-11-25)
* (ldittmar) full compatibility to Admin 3.x
* (ldittmar) clock can be disabled

### 0.1.0 (2018-01-02)
* (ldittmar) compatibility to Admin 3.x / beta release

### 0.0.6 (2017-12-11)
* (ldittmar) some fixes / install and update implemented

### 0.0.4 (2017-12-08)
* (ldittmar) some fixes and design correction
* (ldittmar) show informations about adapters (update/new)
* (ldittmar) show system informations

### 0.0.1 (2017-11-23)
* (ldittmar) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017 - 2019 ldittmar <iobroker@lmdsoft.de>

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