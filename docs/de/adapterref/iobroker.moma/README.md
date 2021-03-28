---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.moma/README.md
title: kein Titel
hash: kib0AXGWoomKdqx4mLxIEgJU6gVuZDaqYBslywZ/meE=
---
![NPM-Version](http://img.shields.io/npm/v/iobroker.moma.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.moma.svg)
![Anzahl der Installationen](http://iobroker.live/badges/moma-installed.svg)
![stabile Version](http://iobroker.live/badges/moma-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)

<h1><img src="admin/moma.png" width="64"/>ioBroker.moma</h1>

## Moma Adapter für ioBroker
** MoMa ** ist ein Adapter für ** Überwachung ** und ** Wartung einer ioBroker-basierten Hausautomationsinstallation.
** MoMa ** zielt auf Installationen zu Hause (Automatisierung) ab, die etwas komplexer sind als eine einzelne Maschine, die alle auf einer oder einer kleinen Anzahl von Maschinen ausgeführt wird und einen grundlegenden Lastausgleich innerhalb eines Netzwerks ausführt.

Es ist nicht als Ersatz für Verwaltungstools wie **Puppet** **Chef** **Salt** oder **Ansible** gedacht.
Diese sind für große Umgebungen mit vielen Computern vorgesehen und können Pakete per Fernzugriff installieren. **MoMa** kann nur vorhandene Installationen remote aktualisieren, keine Remote-Installation und keine Remote-Konfiguration.

**Beachtung:**

Wenn Sie den JavaScript-Adapter verwenden, setzen Sie das Flag &quot;Nicht alle Zustände beim Start registrieren&quot; auf &quot;true&quot;, wenn der Fehler &quot;RangeError: Maximale Aufrufstapelgröße überschritten&quot; angezeigt wird.<br> Wenn Sie beim Start alle Status registrieren, generiert jedes Statusänderungsereignis auch ein Ereignis für den JavaScript-Adapter. Insbesondere für Windows kann diese größere Anzahl von Ereignissen zu einem Problem werden.<br> Eine andere Lösung besteht darin, den Zeitwert für Intervall 0 zu erhöhen.

MoMa verwendet die plattformunabhängige Bibliothek 'systeminformation' (https://github.com/sebhildebrandt/systeminformation), um Informationen über den Computer zu sammeln. Viele der Anrufe können in Timer-Intervallen verwendet werden - siehe Referenz unten.

MoMa benötigt mindestens nodejs Version 10.

## Installation
Verfügbar im ioBroker-Repository 'neueste'

Alternative:

npm installiere iobroker.moma

Funktioniert auch in Multihost-Umgebungen. Stellen Sie vor der Installation sicher, dass die richtige Instanz ausgewählt ist.

** Achtung: ** Derzeit müssen Sie auf jedem Slave eine Instanz von Admin-Adapter installieren, um dieses Problem zu umgehen.
Der Admin-Adapter muss nicht aktiv sein!

## Kernkonzept
noch im Aufbau - Ideen, Vorschläge, Hinweise, ... sind willkommen!

Forum: https://forum.iobroker.net/topic/22026/neuer-adapter-iobroker-moma

GitHub: https://github.com/AWhiteKnight/ioBroker.moma

Die Grundidee besteht darin, für jede Instanz + einen Baum (moma. \ <Instanz-id \>) zu haben, der alle Informationen des Computers enthält, auf dem die Instanz ausgeführt wird.
+ ein gemeinsamer Baum (moma.meta), unter dem jede Instanz ein Gerät \ <Hostname> erstellt, das einen Verweis auf die Instanz und einige Überwachungsinformationen enthält.
+ eine Admin-Registerkarte für die Wartung (Updates des Betriebssystems, des JS-Controllers, der Adapter)

## Referenz
Ein Administrator-TabMoMa ist verfügbar, um Updates zu starten oder bei Bedarf einen Neustart zu starten.

Folgende Funktionen der Bibliothekssysteminformationen werden beim Start einmal aufgerufen:

* Baseboard - Informationen zum Motherboard des Computers
* Gehäuse - Informationen zum Computergehäuse
* BIOS - Informationen zum Computer-BIOS
* System - Informationen zum Computerhersteller
* cpu - Informationen zur CPU des Computers
* cpuFlags - CPU-Flags verfügbar
* memLayout - Informationen zu Speicherchips von Computern
* diskLayout - Informationen zu Computerfestplatten

Folgende Funktionen der Bibliothekssysteminformationen werden im Intervall 0 aufgerufen (Standard jede Sekunde):

* Zeit - Tatsächliche Zeit, Zeitzone und Betriebszeit
* cpuCurrentSpeed - Tatsächliche CPU- und Kernfrequenzen
* networkConnections - Tatsächliche Netzwerkverbindungen
* currentLoad - Tatsächliche CPU-Last
* Prozesse - Prozessübersicht mit process.list als HTML-Tabelle

Die folgenden Funktionen der Bibliothekssysteminformationen werden in Intervall 1 aufgerufen (Standard alle 10 Sekunden):

* mem - Informationen zur Speichernutzung
* CPU-Temperatur - Temperaturen von CPU und Kernen
* networkStats - Netzwerkstatistik
* fullLoad - Durchschnittliche Last seit dem letzten Start

Die folgenden Funktionen der Bibliothekssysteminformationen werden in Intervall 2 aufgerufen (Standard jede Minute):

* Batterie - Ladezustand und Informationen zur Batterie
* Benutzer - Aktuelle Benutzersitzungen
* fsSize - Informationen zum Dateisystem des Computers
* blockDevices - Verbundene Blockgeräte
* fsStats - Dateizugriffsstatistiken - werden von Windows nicht unterstützt
* disksIO - E / A-Statistiken von Blockgeräten - werden von Windows nicht unterstützt

Die folgenden Funktionen der Bibliothekssysteminformationen werden in Intervall 3 aufgerufen (Standard jede Stunde):

* networkInterfaceDefault - Standardnetzwerkschnittstelle
* networkInterfaces - Verfügbare Netzwerkschnittstellen
* Grafik - Informationen zu Computergrafikkarten und angeschlossenen Monitoren
* inetLatency - Überprüfen Sie die Internet-Latenz anhand von 8.8.8.8
* dockerInfo - Allgemeine Informationen zu Docker - benötigt einen "Adduser Iobroker Docker" auf dem Computer, bevor er ordnungsgemäß funktioniert
* dockerContainers - Liste aller Docker-Container - benötigt einen "Adduser Iobroker Docker" auf dem Computer, bevor er ordnungsgemäß funktioniert

Die folgenden Funktionen der Bibliothekssysteminformationen werden in Intervall 4 aufgerufen (Standard jeden Tag):

* osInfo - Informationen zum Betriebssystem des Computers
* uuid - UUIDs der Installation
* shell - Standardsystem-Shell - wird von Windows nicht unterstützt
* Versionen - Versionen installierter Softwarepakete

Folgende Funktionen von **MoMa** werden in Intervall 4 aufgerufen (Standard jeden Tag):

* Updates - sucht nach ausstehenden Updates und zeigt die Anzahl der Updates in moma.meta. \ <Hostname \>. Updates (derzeit nur Ubuntu, Debian, openSUSE, RedHat)
* checkIob - Überprüft alle Adapter und den js-Controller auf verfügbare Updates
* checkBatteries - prüft Batteriezustandsvariablen (aktuell implementierte Zustandsnamen: LOWBAT, LOW_BAT)

## Changelog

### 1.2.8 (2021-03-26)
* (AWhiteKnight) eliminate warning messages (issue #52), upgrade to systeminformation lib 5.6.8
	- in systeminformation many states of currentLoad have been renamed. The old ones will be deleted and the new ones created. Have a look into the logs.

### 1.2.7 (2020-10-18)
* (AWhiteKnight) remove leading i in names that are not a number, systeminformation lib 4.27.0 

### 1.2.6 (2020-04-27)
* (AWhiteKnight) fix typo, precise error location, systeminformation lib 4.23.6 

### 1.2.5 (2020-04-12)
* (AWhiteKnight) minor bugfixing, prepare stable release 

### 1.2.4 (2020-03-20)
* (AWhiteKnight) bugfixing: issues #45 #42 #24, controller update working again 

### 1.2.3 (2019-11-06)
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

Copyright (c) 2020 AWhiteKnight