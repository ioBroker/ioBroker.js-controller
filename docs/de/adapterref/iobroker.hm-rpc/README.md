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
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (foxriver76) use async rpc calls for better error handling

### 1.14.33 (2021-01-30)
* (foxriver76) fix problems with CuxD and HMIP (fixes #307)
* (foxriver76) more palces where we now log message on real errors instead of error object

### 1.14.32 (2021-01-29)
* (foxriver76) revert received messages with invalid command
* (foxriver76) log message on real errors instead of error object
* (foxriver76) fix for crashes on decrypt

### 1.14.31 (2021-01-15)
* (foxriver76) fixed default values of HMIP value list states

### 1.14.30 (2021-01-10)
* (foriver76) in general reject events of unregistered devices, see #298

### 1.14.29 (2021-01-09)
* (foxriver76) do not set PONG state anymore

### 1.14.26 (2021-01-05)
* (foxriver76) match clientId with namespace to find correct units

### 1.14.25 (2021-01-04)
* (foxriver76) we now use a unique id to connect for each client taking the hostname into account

### 1.14.24 (2020-10-15)
* (foxriver76) fixed error with some blinds if no adapter restart has been performed

### 1.14.23 (2020-09-03)
* (foxriver76) `value.temperature` will have unit °C no matter of delivered unit by CCU

### 1.14.21 (2020-08-18)
* (foxriver76) fixed virtual-devices objects being recreated on instance startage (#271)

### 1.14.20 (2020-08-17)
* (foxriver76) fix for % scaling of float numbers

### 1.14.19 (2020-08-16)
* (foxriver76) now logging exact command on error

### 1.14.18 (2020-08-08)
* (foxriver76) fix issue when CuxD listDevices does not deliver valid array
* (foxriver76) fix error with % scaling in some edge cases

### 1.14.15 (2020-07-21)
* (foxriver76) fix bug on forced reinitialization run

### 1.14.14 (2020-07-10)
* (bluefox) Added roles for presence sensor

### 1.14.13 (2020-07-07)
* (foxriver76) fix edge case on EPAPER command (IOBROKER-HM-RPC-5Z)
* (foxriver76) Catch error on `createDevices` if CCU does not deliver valid ADDRESS (IOBROKER-HM-RPC-5X)

### 1.14.12 (2020-07-03)
* (foxriver76) Continue execution if error on retrieving a paramset from CCU

### 1.14.11 (2020-06-21)
* (bluefox) Change name of Instance according to the role (RF, Wired, HMIP)

### 1.14.10 (2020-06-14)
* (foxriver76) removed meta data caching completely because meta data can be dynamic due to FW update or CuxD

### 1.14.6 (2020-06-05)
* (foxriver76) added some hmip roles for channel 0

### 1.14.5 (2020-05-29)
* (foxriver76) fixed edge case problem IOBROKER-HM-RPC-5E

### 1.14.4 (2020-05-28)
* (jens-maus) updated all device images to latest ones include hmip-wired ones

### 1.14.3 (2020-05-18)
* (foxriver76) catch edge case error if row.value has no native 

### 1.14.2 (2020-04-24)
* (foxriver76) catch errors on rpc client creation

### 1.14.1 (2020-04-23)
* (foxriver76) catch potential errors on createServer
* (foxriver76) new meta data approach: we only store meta data gathered by the user,
otherwise cached meta data can be very old and outdated, we have to monitor performance
of this approach (more requests to CCU on first setup)
* (foxriver76) add name and icon to meta folder
* (foxriver76) minor code improvements

### 1.13.0 (2020-04-02)
* (foxriver76) sentry plugin support

### 1.12.10 (2020-03-05)
* (foxriver76) fixed no 'dpType for ..' error in all cases

### 1.12.9 (2020-02-29)
* (foxriver76) replace DISPLAY_DATA_STRING by DIN_66003 encodings

### 1.12.8 (2020-02-26)
* (foxriver76) improved error handling on undefined methods

### 1.12.7 (2020-02-16)
* (foxriver76) if role "value.window" is a boolean it is now correctly a "sensor.window"

### 1.12.6 (2020-01-08)
* (foxriver76) make all LEVEL dps of unit % if they are w.o. unit and have min/max

### 1.12.5 (2020-01-06)
* (foxriver76) handle some meta data more abstract
* (foxriver76) make DIMMER_REAL.LEVEL of unit '%' even it is not by definition

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

### Older entries
[here](OLD_CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>

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