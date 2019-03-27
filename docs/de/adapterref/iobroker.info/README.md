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

<img height="80" align="left" src="img/install.png">
Um das Info Fenster im Tab-Reiter zu sehen, müssen Sie nach der Installation es zuerst im Admin als Sichtbar anhaken. Dazu klicken Sie in der Admin-Fenster oben Links auf dem nach unten zeigenden Dreieck und wählen im Menü "Info" aus.

# Konfiguration

<p align="center">
    <img height="300" align="right" src="img/config.png">
</p>

* **Uhr nicht anzeigen** - Um die Uhr oben Links auszublenden.
* **Adapteranfragen anzeigen** - Zeigt den Panel mit den Adapteranfragen an.
    * **Adapteranfragen beim Start geschlossen** - Das Panel mit der Adapteranfragen, ist beim Start des Info Fensters geschlossen.
* **Bekannte Fehler anzeigen** - Zeigt den Panel mit bekannten Fehler und Wünsche für installierte Adaptern an.
    * **Bekannte Fehler beim Start geschlossen** - Das Panel mit der bekannten Fehlern, ist beim Start des Info Fensters geschlossen.

* **Zeige News vom iobroker.net** - Zeigt den Panel mit den offiziellen ioBroker Nachrichten an. 
* **Zeige die neusten Forumeinträge** - Zeigt den Panel mit den letzten Forumeinträge an.
* **Feednami API-Key** - Wenn Sie ioBroker über einen Hostnamen aufrufen, wie z.B. iobroker:8081 oder so ähnliches, müssen Sie sich kostenlos bei Feednami anmelden, um eine entsprechende API Key zu bekommen. Für den Zugriff über eine IP-Adresse ist das nicht nötig.

* **Dokumentationen anzeigen** - Zeigt den Button für die Dokumentationen an.
    * **Wählen Sie die gewünschten Sprachen für die Dokumentationen aus** - Auswahl der Sprachen die bei den Dokumentationen berücksichtigt werden sollen. (Möglicherweise muss man rechts der Bezeichnung klicken, damit was ausgewählt wird - Standard -> eingestellte Sprache + englisch)

* **Durchsuche Github nach unbekannten Adapter (Experten)** - Zeigt den Panel mit der Suche nach nicht offiziell freigegebenen Adaptern im Github.
    * **Adapter sortieren nach** - Sortiert das Ergebnis der Suche nach Name, Erstellungsdatum oder letztes Update.
    * **umgekehrter Reihenfolge** - Kehrt die Reihenfolge der Ergebnisse um.
    * **Neue Adapter beim Start geschlossen** - Das Panel mit den unbekannten Adapter, ist beim Start des Info Fensters geschlossen.

* **Aktuelle Systemdaten nicht laden** - Die aktuellen Daten zum System werden nicht zyklisch geladen.
    * **CPU-Daten alle x Sekunden laden** - Die CPU Daten werden zyklisch alle 1 bis 10 Sekunden geladen. (0 ist aus - Standard 3)
    * **Speicherdaten alle x Sekunden laden** - Die Speicherdaten werden zyklisch alle 1 bis 10 Sekunden geladen. (0 ist aus - Standard 3)
    * **Festplattendaten alle x Sekunden laden** - Die Festplattendaten werden zyklisch alle 1 bis 10 Sekunden geladen. (0 ist aus - Standard 8)
    * **Batteriedaten alle x Sekunden laden** - Die Batteriedaten werden zyklisch alle 1 bis 10 Sekunden geladen. (0 ist aus - Standard 8)
    * **Netzwerkdaten alle x Sekunden laden** - Die Netzwerkdaten werden zyklisch alle 1 bis 10 Sekunden geladen. (0 ist aus - Standard 3)
    * **Laden von Prozess- und Nutzerdaten alle x Sekunden** - Die Prozess- und Nutzerdaten werden zyklisch alle 1 bis 10 Sekunden geladen. (0 ist aus - Standard 8)
    
Bei Windows System sollten die zyklische Ladevorgänge der Systemdaten nicht zu schnell passieren, denn dies Verursacht eine beachtliche Belastung des Systems. Die Standardwerten wurden so ausgewählt, dass es bei den meisten Systeme ohne Probleme laufen sollte.

# Info Tab

Fast alle Blöcke können mit einem Klick auf ![Blöcke zu/aufklappen](img/expand.png) zu bzw. aufgeklappt werden.

## Uhr

<img height="50" align="left" src="img/clock.png">
Die Uhr hat keine besondere Funktion (ich habe mir aber Mühe gegeben) und kann jederzeit in der Konfiguration ausgeschaltete werden.

<br><br>

## Meldungen

<img height="200" align="left" src="img/messages.png">
Um wichtige Meldungen bezüglich ioBroker, schnell an den User zu senden, wurde die Möglichkeit erschaffen Meldungen zu erstellen. Diese Meldungen erscheinen NUR, wenn bestimmte Voraussetzungen zutreffen. Es werden also keine Meldungen über einem Adapter angezeigt, wenn dieser nicht installiert ist. So wird sichergestellt, dass NUR die User gewarnt werden, die auch vom Problem betroffen sind.

Die Meldungen können mit einem Klick, rechts oben auf ![Meldung schließen](img/close_message.png) geschlossen werden, erscheienen aber wieder sobald der Info-Tab wieder neu geladen wird, solange das Problem noch besteht.

### Meldungen (VIS-Widget)

<img height="100" align="left" src="img/vis.png">
Für die Meldungen wurde extra ein VIS Widget erstellt, der ebenfalls nur erscheint, wenn die Meldungen den User betreffen. Wenn keine Meldungen existieren, wird auch nichts angezeigt, so dass man für die Meldungen kein extra Platz auf der VIS Oberfläche einberechnen muss, sondern es einfach z.B. in der Mitte des Bildschirms plazieren.

## Dokumentation

<img height="150" align="left" src="img/documentation.png">
Wir haben eine Liste mit wichtigen Links zusammengestellt. Diese findet ihr als aufklappbare Liste, indem ihr auf dem Button oben rechts "Dokumentation" klickt. Sollte der Button nicht sichtbar sein, stellen Sie sicher, dass der entsprechende Punkt in der Konfiguration angehakt ist.

Die einzelnen Links werden in verschiedene Kategorien gespeichert: Community, Dokumentation, News, Blog, Video-Wiedergabeliste, Entwicklung und Andere

Für die Richtigkeit und Vollständigkeit externer Links kann keine Garantie übernommen werden. Wenn Links fehlen oder falsch sind, senden Sie uns bitte eine E-Mail an uns.

## Aktualisierungen

<img height="200" align="left" src="img/updates.png">
Wenn es neue Versionen eines Adapters veröffentlicht wird und Sie diesen auch installiert haben, wird es in dieser Liste erscheinen.

Von hier aus kann mit einem Klick auf ![Update Button](img/update_button.png) direkt aktualisiert werden. 
Wenn Sie mit der Maus über ![Changelog Icon](img/changelog.png) fahren, sehen Sie die wichtigsten Neuerungen seit Ihrer Version. 
Mit einem Klick auf ![Dokumentation](img/readme.png), wird die komplette Beschreibung des Adapters angezeigt.

<br>

## Neue Adapter

<img height="200" align="right" src="img/new_adapters.png">
Hier werden alle neue und offiziell freigegebene Adapter der letzten 60 Tage angezeigt.

Von hier aus kann mit einem Klick auf ![Install Button](img/install_button.png) den neuen Adapter direkt installiert werden.
Mit einem Klick auf ![Dokumentation](img/readme.png), wird die komplette Beschreibung des Adapters angezeigt.

<br>

## Systeminformationen

<img height="200" align="left" src="img/systeminfo.png">
Hier werden die Systeminformationen des ioBroker-Systems angezeigt. Bei Multihost-Systeme werden natürlich auch die Informationen der anderen Hosts angezeigt. Diese Daten kommen aus dem js-controller. 

Als Info werden folgenden Daten (pro Host) bereitgestellt:

- Betriebssystem (linux, win32, darwin, android, aix, freebsd, openbsd oder sunos)
- Architektur (arm, arm64, ia32, mips, mipsel, ppc, ppc64, s390, s90x, x32 und x64)
- CPUs (Anzahl der Kerne)
- Geschwindigkeit (Prozessorgeschwindigkeit)
- Modell (Prozessor Modell)
- RAM (ungefähren Gesamtspeicher)
- System Betriebszeit (Wie lange läuft das System schon)
- Node.js (Die Node.js Version - sollte es eine neuere Geben oder Ihre Version veraltet sein, steht diese Information auch hier)
- NPM (NPM Version)
- Festplatte Größe (Größe der Festplatte wo sich ioBroker befindet)
- Festplatte frei (Wieviel Platz davon ist noch frei)
- Anzahl der Adapter (Wie viele Adaptern gibt wurden bis jetzt für ioBroker freigegeben)
- Betriebszeit (Wie lange läuft der ioBroker, ohne Neustart)
- Aktive Instanzen (Wie viele Adapter-Instanzen laufen gerade auf diesen Host)
- Hostname (Name des Hosts)

```
Sollten Informationen fehlen, dann sollte eine aktuelle Version des JS-Controllers installiert werden.
Das ist der Datenbestand des JS-Controllers v1.5.7.
```

Mit einem Klick auf ![Systeminfo Detailansicht](img/sysinfo_detail_button.png), werden detaillierte Informationen zum Hauptsystem angezeigt.

### Systeminformationen (Detailansicht)

Hier werden sehr viele Informationen über das Hausptsystems angezeigt und als Objekt gespeichert. Diese können dann auch ganz bequem von Ihnen verwendet werden. Die meisten Daten werden nur beim ersten Laden des Adapters gelesen und gespeichert, denn diese ändern sich nicht so ohne weiteres.

Einige Daten werden aber auch zyklisch aktualisiert. Wie oft das passiert, kann in der Konfiguration eingestellt werden.

Bedenke, dass nicht alle Information in jeden Betriebssystem zur Verfügung steht, was dazu führen kann, dass manche Informationen nicht angezeigt werden können.

#### System

Hier werden die Hardwaredaten angezeigt - Motherboard, Bios, Gehäuse usw...

#### Software

Unter Software findet man Daten zum Betriebssystem, installierte Software, laufende Prozesse und eingeloggte Nutzer.

#### Zentralprozessor

Hier findet man Daten alle zum CPU wie Geschwindigkeit, Auslastung und Temperatur.

Probleme mit Windows: Um die Temperatur eines Windows Systems zu erkennen, wird wmic verwendet. In manchen fälle muss wmic mit Administratorrechten ausgeführt werden. Wenn Sie also keine Werte erhalten, versuchen Sie es erneut mit den entsprechenden Berechtigungen auszuführen. Wenn Sie immer noch keine Werte erhalten, unterstützt Ihr System diese Funktion möglicherweise nicht.

Probleme mit Linux: In einigen Fällen müssen Sie das Linux-Sensor-Paket installieren, um die Temperatur messen zu können, z.B. auf DEBIAN-basierten Systemen durch Ausführen von:

```
$ sudo apt-get install lm-sensors
```

#### Hauptspeicher

Hier sind alle Daten zum Hauptspeicher wie freie Speicher oder Daten zum RAM Riegel.

#### Festplatten

Alle Daten zu Festplatten, Partitionen, Raids und Roms.

Probleme mit Linux: UM in der Lage sein den S.M.A.R.T. Status unter Linux sehen zu können, müssen Sie die smartmontools installieren. Auf DEBIAN-basierten Linux-Distributionen können Sie es installieren, indem Sie Folgendes ausführen:

```
$ sudo apt-get install smartmontools
```

#### Grafik

Hier werden Daten zum Controller oder Monitor angezeigt, wenn vorhanden/unterstützt.

#### Netzwerk

Alle Daten zu den Netzwerkverbindungen.

#### Batterie

Alle Daten zu der Batterie, falls eine vorhanden ist.

Probleme mit Windows: Um den Batteriezustand eines Windows Systems zu erkennen, wird wmic verwendet. In manchen fälle muss wmic mit Administratorrechten ausgeführt werden. Wenn Sie also keine Werte erhalten, versuchen Sie es erneut mit den entsprechenden Berechtigungen auszuführen. Wenn Sie immer noch keine Werte erhalten, unterstützt Ihr System diese Funktion möglicherweise nicht.

## Adapteranfragen

<img height="200" src="img/adapter_requests.png">

Das Panel "Adapteranfragen" kann in der Konfiguration ausgeblendet werden oder beim Laden im zugeklappten Zustand angezeigt werden.

## Probleme und Fehler

<img height="200" src="img/issues_bugs.png">

Das Panel "Probleme und Fehler" kann in der Konfiguration ausgeblendet werden oder beim Laden im zugeklappten Zustand angezeigt werden.

## ioBroker-Adapter auf Github

<img height="200" src="img/adapter_search.png">

Das Panel "ioBroker-Adapter auf Github" kann in der Konfiguration ausgeblendet werden oder beim Laden im zugeklappten Zustand angezeigt werden.

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