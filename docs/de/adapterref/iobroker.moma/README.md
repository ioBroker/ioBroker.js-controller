---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.moma/README.md
title: kein Titel
hash: 1+r5JGoGDjiFF8V8ugMr56Y2eJP7SQxhYzdYAXdoZts=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.moma.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.moma.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AWhiteKnight/ioBroker.moma?branch=master&svg=true)

<h1><img src="admin/moma.png" width="64"/> ioBroker.moma </h1>

## Moma adapter für ioBroker
** MoMa **ist ein Adapter für** Mo **Monitoring und** Ma **Wartung einer ioBroker-basierten Heimautomationsinstallation.
** MoMa** zielt auf Heiminstallationen (Automatisierungsinstallationen) ab, die etwas komplexer sind als eine einzelne Maschine, die alle auf einer oder einer kleinen Anzahl von Maschinen ausgeführt wird, die eine grundlegende Lastverteilung innerhalb eines Netzwerks durchführen.

Es ist nicht als Ersatz für Verwaltungswerkzeuge wie **Puppet** **Chef** **Salz** oder **Ansible** gedacht.
Dies gilt für große Umgebungen mit vielen Computern und kann Pakete von einem entfernten Standort installieren. **MoMa** kann nur vorhandene Installationen remote aktualisieren, keine Remote-Installation und keine Remote-Konfiguration.

Ich verwende es, um meine IT-Infrastruktur zu Hause (einschließlich der Hausautomation) zu überwachen und auf dem neuesten Stand zu halten.

MoMa verwendet die plattformunabhängige Bibliothek 'systeminformation' (https://github.com/sebhildebrandt/systeminformation), um Informationen über den Computer zu sammeln. Viele der Anrufe können für Zeitintervalle verwendet werden - siehe Referenz unten.

MoMa benötigt mindestens nodejs Version 8 / ES6.

## Installation
Verwenden Sie "Adapter - Von URL installieren" mit https://github.com/AWhiteKnight/ioBroker.moma

Alternative

npm install iobroker.moma

Funktioniert auch in Multihost-Umgebungen - Stellen Sie sicher, dass vor der Installation die richtige Instanz ausgewählt ist.

## Kernkonzept
noch in Bearbeitung - Ideen, Vorschläge, Hinweise, ... sind willkommen!

Grundidee ist, für jede Instanz (moma. \ <Instanz-ID \>) einen Baum mit allen Informationen der Maschine zu haben, auf der die Instanz läuft.
+ ein gemeinsamer Baum (moma.meta), unter dem jede Instanz ein Gerät \ <Hostname \> erstellt, das eine Referenz auf die Instanz und einige Überwachungsinformationen enthält

## Referenz
Folgende Funktionen der Bibliothekssysteminformation werden beim Start einmal aufgerufen:

* baseboard - Informationen zum Motherboard des Computers
* chassis - Informationen zum Computerchassis
* bios - Informationen zum Computer-BIOS
* system - Informationen zum Computerhersteller
* cpu - Informationen zur CPU des Computers
* cpuFlags - CPU-Flags verfügbar
* memLayout - Informationen zu Speicherchips von Computern
* diskLayout - Informationen zu Festplatten des Computers

Folgende Funktionen der Bibliothekssysteminformationen werden im Intervall 0 (Standard jede Sekunde) aufgerufen:

* time - Aktuelle Zeit, Zeitzone und Betriebszeit
* cpuCurrentSpeed - Aktuelle CPU- und Kernfrequenzen
* networkConnections - Aktuelle Netzwerkverbindungen
* currentLoad - Aktuelle CPU-Auslastung
* Prozesse - Prozessübersicht mit process.list als HTML-Tabelle

Folgende Funktionen der Bibliothekssysteminformationen werden im Intervall 1 aufgerufen (Standardeinstellung alle 10 Sekunden):

* mem - Informationen zur Speichernutzung
* cpuTemperatur - Temperaturen von CPU und Kernen
* networkStats - Netzwerkstatistik
* fullLoad - Mittlere Last seit dem letzten Start

Folgende Funktionen der Bibliothekssysteminformationen werden im Intervall 2 (Standard jede Minute) aufgerufen:

* battery - Ladezustand und Informationen zum Akku
* Benutzer - Aktuelle Benutzersitzungen
* fsSize - Informationen zum Dateisystem des Computers
* blockDevices - Angeschlossene Blockgeräte
* fsStats - Dateizugriffsstatistik
* disksIO - E / A-Statistiken von Blockgeräten

Folgende Funktionen der Bibliothekssysteminformationen werden im Intervall 3 (Standard jede Stunde) aufgerufen:

* networkInterfaceDefault - Standard-Netzwerkschnittstelle
* Netzwerkschnittstellen - Verfügbare Netzwerkschnittstellen
* graphics - Informationen zu Computergrafikkarten und angeschlossenen Monitoren

Folgende Funktionen der Bibliothekssysteminformationen werden in Intervall 4 (Standardeinstellung täglich) aufgerufen:

* osInfo - Informationen zum Betriebssystem des Computers
* uuid - UUID der Installation
* shell - Standard-Systemshell
* versions - Versionen installierter Softwarepakete

Folgende Funktionen von **MoMa** werden im Intervall 4 (Standardeinstellung jeden Tag) aufgerufen:

* updates - prüft auf ausstehende Updates und zeigt die Anzahl der Updates in moma.meta. \ <Hostname \>. Updates (derzeit nur Ubuntu, Debian, openSUSE, RedHat)
* checkBatteries - prüft die Statusvariablen der Batterie (aktuell implementierte Zustandsnamen: LOWBAT, LOW_BAT)

## Changelog

### 0.1.1 (2019-04-26)
* (AWhiteKnight) First implementation of moma admin-tab. Be careful, the table line buttons are always active!!

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list.

### 0.0.10 (2019-04-18)
* (AWhiteKnight) Reduction of footprint. Restructuring.

### 0.0.9 (2019-04-08)
* (AWhiteKnight) Systeminfolib upgraded to 4.1.1 and added some calls/variables. Testing (re)enabled. Merging to new adapter creation template part 2.

### 0.0.8 (2019-03-10)
* (AWhiteKnight) Started merging to new development method. Maintaining meta states.

### 0.0.7 (2018-10-29)
* (AWhiteKnight) Travis testing activated; Minor enhancements in meta data

### 0.0.6 (2018-10-27)
* (AWhiteKnight) UI text and translations; changed meta-path from moma.x to moma.meta

### 0.0.5 (2018-10-26)
* (AWhiteKnight) Checking for updates in interval 4

### 0.0.4 (2018-10-14)
* (AWhiteKnight) New intervals: 0 with high frequency, 4 daily. Extended configuration

### 0.0.3 (2018-10-02)
* (AWhiteKnight) Basic functions of 'systeminformation' implemented, some documentation

### 0.0.2 (2018-09-30)
* (AWhiteKnight) Library 'systeminformation' integrated. First set of calls implemented

### 0.0.1
* (AWhiteKnight) initial version

## License
MIT License

Copyright (c) 2019 AWhiteKnight

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