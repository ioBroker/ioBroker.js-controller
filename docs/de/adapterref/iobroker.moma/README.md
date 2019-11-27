---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.moma/README.md
title: kein Titel
hash: /18eY0rfu6ZFjyRax1iWpVkbXlO+pvLYm5mjCn/7nQc=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.moma.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.moma.svg)
![Anzahl der Installationen](http://iobroker.live/badges/moma-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AWhiteKnight/ioBroker.moma?branch=master&svg=true)

<h1><img src="admin/moma.png" width="64"/> ioBroker.moma </h1>

## Moma Adapter für ioBroker
** MoMa **ist ein Adapter für die Überwachung und Wartung einer ioBroker-basierten Hausautomationsinstallation.
** MoMa** zielt auf Heiminstallationen (Automatisierungsinstallationen) ab, die etwas komplexer sind als eine einzelne Maschine, die auf einer oder einer kleinen Anzahl von Maschinen läuft und einen grundlegenden Lastenausgleich innerhalb eines Netzwerks durchführt.

Es ist nicht als Ersatz für Administrations-Tools wie **Puppet** **Chef** **Salt** oder **Ansible** gedacht.
Diese sind für große Umgebungen mit vielen Computern gedacht und können Pakete remote installieren. **MoMa** kann nur vorhandene Installationen remote aktualisieren, keine Remote-Installation und keine Remote-Konfiguration.

Ich verwende es, um meine IT-Infrastruktur zu Hause (einschließlich der Heimautomation) zu überwachen und auf dem neuesten Stand zu halten.

MoMa verwendet die plattformunabhängige Bibliothek "Systeminformationen" (https://github.com/sebhildebrandt/systeminformation), um Informationen über den Computer zu sammeln. Viele der Anrufe können in Zeitintervallen verwendet werden - siehe Referenz weiter unten.

MoMa benötigt mindestens nodejs Version 8 / ES9 / ECMAScript2018.

## Installation
Verfügbar im ioBroker-Repository 'latest'

Alternative:

npm installiere iobroker.moma

Funktioniert auch in Multihost-Umgebungen - stellen Sie sicher, dass vor der Installation die richtige Instanz ausgewählt wurde.

** Achtung: ** Zur Umgehung des Problems müssen Sie derzeit auf jedem Slave eine Instanz des Admin-Adapters installieren.
Der Admin-Adapter muss nicht aktiv sein!

## Kernkonzept
noch im bau - ideen, vorschläge, hinweise, ... sind willkommen!

Forum: https://forum.iobroker.net/topic/22026/neuer-adapter-iobroker-moma

GitHub: https://github.com/AWhiteKnight/ioBroker.moma

Grundlegende Idee ist, für jede Instanz (moma. \ <Instanz-ID \>) einen Baum zu haben, der alle Informationen der Maschine enthält, auf der die Instanz ausgeführt wird.
+ ein allgemeiner Baum (moma.meta), unter dem jede Instanz ein Gerät \ <Hostname \> erstellt, das einen Verweis auf die Instanz und einige Überwachungsinformationen enthält.
+ ein Admin-Tab für die Wartung (Updates des Betriebssystems, des js-Controllers, der Adapter)

## Referenz
Ein Admin-TabMoMa ist verfügbar, um Updates zu starten oder bei Bedarf einen Neustart zu starten.

Folgende Funktionen der Bibliothekssysteminformation werden beim Start einmalig aufgerufen:

* Baseboard - Informationen zur Hauptplatine des Computers
* chassis - Informationen zum Computergehäuse
* BIOS - Informationen zum BIOS des Computers
* system - Informationen zum Computerhersteller
* cpu - Informationen zur CPU des Computers
* cpuFlags - CPU-Flags verfügbar
* memLayout - Informationen zu Computer-Speicherchips
* diskLayout - Informationen zu Computerfestplatten

Folgende Funktionen der Bibliothekssysteminformation werden im Intervall 0 aufgerufen (Standard jede Sekunde):

* time - Aktuelle Zeit, Zeitzone und Betriebszeit
* cpuCurrentSpeed - Tatsächliche CPU- und Kernfrequenzen
* networkConnections - Aktuelle Netzwerkverbindungen
* currentLoad - Aktuelle CPU-Auslastung
* Prozesse - Prozessübersicht mit process.list als HTML-Tabelle

Folgende Funktionen der Bibliothekssysteminformation werden in Intervall 1 aufgerufen (Standard alle 10 Sekunden):

* mem - Informationen zur Speichernutzung
* cpuTemperature - Temperaturen von CPU und Kernen
* networkStats - Netzwerkstatistik
* fullLoad - Durchschnittliche Last seit dem letzten Start

Folgende Funktionen der Bibliothekssysteminformation werden in Intervall 2 aufgerufen (Standard jede Minute):

* Batterie - Ladezustand und Informationen zur Batterie
* users - Aktuelle Benutzersitzungen
* fsSize - Informationen zum Dateisystem des Computers
* blockDevices - Verbundene Blockgeräte
* fsStats - Dateizugriffsstatistik - wird von Windows nicht unterstützt
* disksIO - E / A-Statistiken von Blockgeräten - werden von Windows nicht unterstützt

Folgende Funktionen der Bibliothekssysteminformation werden in Intervall 3 aufgerufen (Standard jede Stunde):

* networkInterfaceDefault - Standardnetzwerkschnittstelle
* networkInterfaces - Verfügbare Netzwerkschnittstellen
* graphics - Informationen zu Computer-Grafikkarten und angeschlossenen Monitoren
* inetLatency - Überprüfen Sie die Internet-Latenz gegenüber 8.8.8.8
* dockerInfo - Allgemeine Informationen zu docker - benötigt einen "adduser iobroker docker" auf dem Computer, damit es ordnungsgemäß funktioniert
* dockerContainers - Liste aller Docker-Container - benötigt einen "adduser iobroker docker" auf dem Computer, damit er ordnungsgemäß funktioniert

Folgende Funktionen der Bibliothekssysteminformation werden in Intervall 4 aufgerufen (Standard jeden Tag):

* osInfo - Informationen zum Betriebssystem des Computers
* uuid - UUIDs der Installation
* shell - Standard-System-Shell - wird von Windows nicht unterstützt
* versions - Versionen der installierten Softwarepakete

Folgende Funktionen von **MoMa** werden in Intervall 4 aufgerufen (Standard jeden Tag):

* updates - prüft auf ausstehende Updates und zeigt die Anzahl der Updates in moma.meta. \ <Hostname \>. updates an (derzeit nur Ubuntu, Debian, openSUSE, RedHat)
* checkIob - Überprüft alle Adapter und den js-Controller auf verfügbare Updates
* checkBatteries - Überprüft Batteriezustandsvariablen (aktuell implementierte Zustandsnamen: LOWBAT, LOW_BAT)

## Changelog

### 1.2.3 (20??-??-??)
* (AWhiteKnight) bugfixing, code cleanup 

### 1.2.2 (2019-09-12)
* (AWhiteKnight) ioBroker adapter/controller updates for windows, issue #24 

### 1.2.1 (2019-08-12)
* (AWhiteKnight) Bugfixing on 1.2.0 

### 1.2.0 (2019-07-26)
* (AWhiteKnight) Library 'systeminformation' version 4.14.4, 
                 check for update of Adapters and JS-Controller in Interval 4,
				 dockerInfo, dockerContainers in Interval 3,
				 moma admin-tab with update buttons for os, js-controller, adapters.

### 1.1.0 (2019-05-20)
* (AWhiteKnight) Performance optimization,
				 partial fix of Issu #24,
				 Check internet latency.

### 1.0.0 (2019-05-11)
* (AWhiteKnight) First release for adapter list 'stable'.

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list 'latest'.

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