---
lastChanged: 09.01.2019
local: true
---
![logo](media/homematic.png)
# HomeMatic RPC

## Homematic
>Homematic ist ein Smart Home System von eQ-3, das die umfassende Steuerung
unterschiedlichster Funktionen mithilfe von Szenarien (von einfach bis komplex)
in Haus oder Wohnung ermöglicht.

>Die Geräte beinhaltet Produkte zur Licht-, Rollladen- und Heizungssteuerung,
Gefahrenmelder, Sicherheitssensoren und Produkte zur Wetterdatenmessung. Die
Funkkommunikation vereinfacht dabei das Nachrüsten. In Neubauten können
Drahtbus-Komponenten eingesetzt werden.
<a href="https://www.eq-3.de/produkte/homematic.html" title="Homepage des Herstellers eQ3">
Quelle</a>

## Verwaltung und Steuerung von Homematic-Komponenten mit ioBroker
Um Homematic-Komponenten mit ioBroker optimal zu verwalten und zu steuern
werden zwei Adapter benötigt:

### 1. Homematic ReGaHss

Dieser Adapter stellt eine Verbindung zur Homematic Logikschicht „ReGaHSS“ 
(**Re**sidential **Ga**teway) her.
Er synchronisiert Klarnamen, Systemvariablen, Räume, Gewerke und Programme
zwischen Homematic und ioBroker.

### 2. Homematic RPC

Der **R**emote **P**rocedur **C**all, kurz RPC ist eine Technik zur Realisierung
von Interprozesskommunikation. Dieser Adapter bietet die Anbindung an die
Kommunikationsmodule einer Homematic-Zentrale (CCU/CCU2/CCU3 ...). Es werden die
Module rfd (Funk), HMIP-rfd, hs485d (wired), CuxD (Zusatzsoftware zur Anbindung
externer Komponenten wie EnOcean, FS20 usw.) und Homegear (CCU Ersatz)
unterstützt.

Dieses Diagramm veranschaulicht den Aufbau und die Kommunikationsschnittstellen:

![](media/Homematic_Aufbau.png)

[Quelle](http://www.wikimatic.de/wiki/Datei:Homematic_Aufbau.png)

## Adapter Homematic RPC

Dieser Adapter bietet die Anbindung an die Kommunikationsmodule einer
Homematic-Zentrale (CCU/CCU2/CCU3 ...). Eine Instanz des
Adapters ist für genau EIN Module (rfd, wired usw.) zuständig. Sollen mehrere Module
parallel unterstützt werden, muss für jedes Modul eine eigene Instanz
installiert werden.

Die Kommunikation des Adapters mit dem entsprechenden Modul erfolgt entweder
über BIN-RPC oder XML-RPC. Da über eine Ereignisschnittstelle gearbeitet wird,
ist die korrekte Adressierung wichtig. So werden Ereignisse automatisch dem
Adapter übermittelt und ein zyklisches Pollen ist nicht notwendig.

Zusätzlich verfügt der Adapter über die Funktionalität, die Verbindung zur CCU
zyklisch zu überwachen.

Werden neue Geräte an der CCU angelernt, so muss der Adapter mit der
Konfiguration “Initiiere Geräte neu (einmalig)” neu gestartet werden. Dadurch
werden die Informationen der neuen Homematic-Geräte an den Adapter übertragen.

## Konfiguration

### Haupteinstellungen

### HomeMatic Adresse

IP-Adresse der CCU bzw. des Hosts, auf dem der BidCos-Service der Homematic
läuft.

### HomeMatic Port

Die Einstellung des Ports hängt von dem benötigtem Kommunikationsmodul ab, wird
bei der Auswahl des Daemons automatisch eingetragen und sollte nur geändert
werden, wenn die Ports vom Standard abweichen.

Standardmäßig sind folgende Ports vorgesehen:

| Kommunikationsmodul | Standardport | HTTPS-Port |
|---------------------|--------------|------------|
| Funkgeräte (RFD)    | 2001         | 42001      |
| Wired               | 2000         | 42000      |
| CUxD                | 8701         | \--        |
| Homematic IP        | 2010         | 42010      |

### Daemon

CCU/Homematic unterstützt unterschiedliche Gerätetypen (wired, Funk, HMIP,
CUxD). Für jeden Typ muss eine eigene Instanz angelegt warden.

### Protokoll

Zur Kommunikation werden zwei Protokolle zur Verfügung gestellt: XML-RPC und
BIN-RPC.

*CUxD benötigt zwingend das BIN-RPC-Protokoll; HMIP und RFD das XML-RPC-Protokoll.*

### Synchronisiere Geräte neu (einmalig)
Beim erstmaligen Start des Adapters werden alle Geräte eingelesen. Werden später
Änderungen innerhalb der CCU durchgeführt (Umbennung von Geräten, hinzufügen
neuer Geräte usw.) ist diese Auswahl zu aktivieren und mit „Speichern und
Schließen“ der Neustart des Adapters zu veranlassen.

### Adapter Addresse
Im Pulldown-Menü wird die IP des Hosts ausgewählt, auf dem der Adapter
installiert ist. Die Auswahl von "0.0.0.0. auf alle IPs hören" und "127.0.0.1"
ist Spezialfällen vorbehalten.

### Adapter Port
Standardmäßig ist hier Port "0" für die automatische Selektion des
ioBroker-Ports eingestellt und sollte nur in Ausnahmefällen verändert werden.

## Zusätzliche Einstellungen
### Adapter Callback Addresse
Wenn ioBroker hinter einem Router (z.B. in einem Docker-Container) läuft, können
sich Ein- und Ausgangsadresse unterscheiden. Wird hier die IP des Routers
eingetragen, lässt sich das Problem umgehen, da dann das Weiterleiten zu
ioBroker vom Router übernommen wird.

### Verbindungs-Check Intervall (sec)
Im festgelegten Intervall wird eine Ping-Anfrage an die CCU gesendet.

### Wiederverbindungs-Intervall (sec)
Zeitspanne, nach der ein erneuter Verbindungsversuch gestartet wird.

### Geräte nicht löschen
Geräte werden standardmäßig auch aus der Objektliste entfernt, wenn sie
innerhalb der CCU abgelernt wurden. Um diese Geräte in der Objektliste zu
behalten, beispielweise weil sie nur temporär entfernt wurden, kann diese Option
aktiviert werden.

### Nutze HTTPS
Ist diese Option aktiviert, wird eine sichere Verbindung hergestellt.
Funktioniert nur mit XML-RPC Protokoll.

### Nutzername und Passwort
Bei Nutzung von HTTPS oder falls für die API der CCU eine Authentifikation
erforderlich ist, sind die Daten hier einzutragen.

## Instanz

![Ìnstanz](media/10d34a2bc1518fa34233bdb04219e444.png)

Unter *Instanzen* des ioBrokers finden sich die installierte Instanze des
Adapters. Links ist im Ampelsystem visualisiert, ob der Adapter aktiviert und
mit der CCU verbunden ist.

Platziert man den Mauszeiger auf ein Symbol, erhält man Detailinformationen.

## Objekte des Adapters
Im Bereich Objekte werden in einer Baumstruktur alle von der CCU dem Adapter
übermittelten Werte und Informationen dargestellt.

Welche Objekte und Werte angezeigt werden, ist von den Geräten (Funktion und
Kanäle) und der Struktur innerhalb der CCU abhängig. 

Die Zentrale wird mit der ID BidCoS-RF gekennzeichnet (hierunter sind alle virtuellen Tasten aufgeführt),
Geräte werden unter ihrer Seriennummer angelegt und Gruppen mit
INT000000*x* bezeichnet.

### Kanal 0 (alle Geräte)
Dieser Kanal wird für jedes Gerät angelegt und enthält Funktionsdaten, nachfolgend eine kurze Übersicht:

| *Datenpunkt*                   | *Bedeutung*                                            |
|--------------------------------|--------------------------------------------------------|
| AES_Key                        | Verschlüsselte Aktivierung aktiv/deaktiv               |
| Config (Pending/Pending Alarm) | Ausstehende Konfiguration                              |
| Dutycycle / Dutycycle Alarm    | Sendezeit Homematic Geräte                             |
| RSSI (Device/Peer)             | Funkstärke (Gerät \<-\> Zentrale)                      |
| Low Bat/Low Bat Alarm          | niedrige Batterieladung                                |
| Sticky unreach / unreach alarm | Systemmeldung Kommunikationsfehler (Störung lag vor)   |
| Unreach/unreach alarm          | Systemmeldung Kommunikationsfehler (aktueller Zustand) |

### Kanal 1-6
Hier sind Messwerte, Steuerungs- und Zustandsdaten aufgelistet; je nach Funktion
des Gerätes werden unterschiedliche Daten angezeigt. Nachfolgend ein kurzer
Auszug:

| *Funktion*              | *Kanal* | *Mögliche Werte*                                          |
|-------------------------|---------|-----------------------------------------------------------|
| Sensoren                | 1       | Temperatur, Feuchtigkeit, Füllstand, Öffnungszustand usw. |
| Heizungsthermostate     | 4       | Betriebsmodi, Soll-/Ist-Temperatur, Ventilstellung usw.   |
| Aktoren                 | 1       | Level (Rollladen, Dimmer), Laufrichtung (Rolllladen) usw. |
| Geräte mit Messfunktion | 3       | Status                                                    |
|                         | 6       | Verbrauchszähler, Spannung, Leistung usw.                 |

## FAQ

## Changelog
### 1.12.3 (2020-01-05)
* (foxriver76) handle some meta data more abstract

### 1.12.2 (2019-12-19)
* (foxriver76) fix issue on https with less robust ccu emulations

### 1.12.1 (2019-12-06)
* (foxriver76) fixed problem with max values of value lists

### 1.12.0 (2019-12-05)
* (foxriver76) no longer use adapter.objects
* (foxriver76) js-controller v > 2 required

### 1.11.1 (2019-11-20)
* (foxriver76) LOCK.OPEN is now of type button to prevent misunderstandings

### 1.11.0 (2019-11-10)
* (foxriver76) make OFFSET and REPEATS of epaper configurable
* (foxriver76) EPAPER_SIGNAL is now type string

### 1.10.3 (2019-10-27)
* (foxriver76) fixed info channel

### 1.10.2 (2019-10-24)
* (foxriver76) replace min max values of hmip with correct numbers 

### 1.10.0 (2019-08-12)
* (foxriver76) new meta data handling procedure
* __js-controller >= 1.4.2 required__

### 1.9.17 (2019-08-04)
* (foxriver76) handle meta values with max 1.01 as 1

### 1.9.16 (2019-07-18)
* (foxriver76) no longer use adapter.objects if not necessary
* (foxriver76) added meta data

### 1.9.15 (2019-07-01)
* (foxriver76) added meta and icon for HB-UNI-Sen-CAP-MOIST
* (foxriver76) fix type of EPAPER_TONE to string

### 1.9.14 (2019-06-29)
* (foxriver76) small bug fix for HM-Dis-EP-WM55
* (foxriver76) catch async errors on bin-rpc connection

### 1.9.13 (2019-06-03)
* (foxriver76) fixed bug where some meta values where stored in the wrong index

### 1.9.12 (2019-05-27)
* (foxriver76) fix maintenance channel of HM-Dis-EP-WM55
* (foxriver76) meta data added

### 1.9.11 (2019-04-21)
* (foxriver76) create OPERATING_VOLTAGE with unit V
* (foxriver76) create RSSI_* with unit dBm

### 1.9.10 (2019-04-12)
* (foxriver76) fix meta
* (foxriver76) added new meta data

### 1.9.9 (2019-03-17)
* (foxriver76) window states are now role `value.window`

### 1.9.8 (2019-02-27)
* (foxriver76) fixes for epaper line and icon type
* (foxriver76) metas added

### 1.9.7 (2019-02-13)
* (foxriver76) added metas
* (foxriver76) when max is 1.005 then set max to 1

### 1.9.6 (2019-02-02)
* (foxriver76) fix meta for virtual devices

### 1.9.5 (2019-01-29)
* (foxriver76) ignore alarm states because handled by rega

### 1.9.4 (2019-01-26)
* (foxriver76) added image
* (foxriver76) removed homematic path from ui

### 1.9.3 (2019-01-25)
* (foxriver76) added meta data

### 1.9.2 (2019-01-14)
* (foxriver76) added chinese
* (foxriver76) minor optimizations

### 1.9.1 (2019-01-08)
* (foxriver76) fix compact mode

### 1.9.0 (2019-01-07)
* (foxriver76) adding custom commands to documentation and logging
* (Holuba & foxriver76) fixes for virtual devices API
* (bluefox) enabling compact mode
* (marvingrieger) adjusting HmIP shutters to a max value of 1

### 1.8.3 (2019-01-04)
* (foxriver76) fixing dependency

### 1.8.2 (2018-12-30)
* (foxriver76) Added meta information
* (foxriver76) Added new icons
* (foxriver76) Minor improvements

### 1.8.1 (2018-12-22)
* (foxriver76) Added a lot of meta information

### 1.8.0 (2018-11-27)
* (foxriver76) Https checkbox added
* (foxriver76) Https can be used instead of http
* (foxriver76) Added possibility to authenticate on API
* (foxriver76) de- and encryption added

### 1.7.7 (2018-10-25)
* (foxriver76) Meta information for HmIP-WTH-2 and HMIP-eTRV added (to fix issues with unit and other properties)
* (foxriver76) General role mapping for SET_POINT_TEMPERATURE added

### 1.7.6 (2018-07-29)
* (bluefox) Configuration dialog was corrected

### 1.7.5 (2018-07-20)
* (bluefox) The roles of states were tuned

### 1.7.4 (2018-06-28)
* (BuZZy1337) Added Metas for HM-Sen-MDIR-O-3

### 1.7.3 (2018-06-25)
* (bluefox) E-Paper was corrected

### 1.7.2 (2018-06-11)
* (apollon77) changed reconnection handling

### 1.7.1 (2018-06-11)
* (angelu) changed reconnection handling

### 1.7.0 (2018-06-03)
* (bluefox) Breaking changes: following chars *,;'"`<>\s?" in ADDRESS will be replaces by "_"
* (bluefox) Some roles were changed

### 1.6.2 (2018-04-27)
* (BuZZy1337) Added some missing metas for HM-IP Devices

### 1.6.1 (2018-03-15)
* (bluefox) The binrpc packet 2was updated
* (bluefox) The ping for CUxD was disabled

### 1.6.0 (2018-02-19)
* (Apollon77) Upgrade binrpc library

### 1.5.1 (2018-01-26)
* (bluefox) Ready for Admin3

### 1.5.0 (2017-10-27)
* (bluefox) Add new devices in the meta information
* (bluefox) Force stop of adapter

### 1.4.15 (2017-09-27)
* (bluefox) Added option to not delete the devices

### 1.4.14 (2017-06-19)
* (bluefox) Fix images

### Older entries
[here](doc/OLD_CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>

Copyright (c) 2014 hobbyquaker

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