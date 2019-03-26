---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: 5ikYMO9N6xRwzYabxcpGt0/3qRMjI8H71DF8VB/w2CQ=
---
![Logo](../../../en/adapterref/iobroker.knx/admin/knx.png)

![Anzahl der Installationen](http://iobroker.live/badges/knx-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.knx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx ===================
## Beschreibung
de: Dieser Adapter ermöglicht den Import von knxproj-Dateien aus der ETS. Es generiert die Übersetzung zwischen KNX-Gruppenadressen und ioBroker und legt die Geräte in Räumen ab (insbesondere für MobileUI).

Es kann an Standard-KNX / LAN-Gateways angeschlossen werden.

Bevor Sie beginnen: Jedes DPT von com.Objects sollte in Ihrem ETS-Projekt festgelegt werden. Jedes Gerät sollte in Ihre Anlagenstruktur sortiert werden.

## In 1.0.19 für den Moment veraltet
### ACHTUNG für Version 1.0.18: Für zukünftige Versionen habe ich die Werte für "boolean" von 1 und 0 in true false geändert, wie es sein sollte. Überprüfen Sie Ihre Skripte, um "true" und "false" anstelle von 0 und 1 zu verwenden
ACHTUNG für Version 1.0.18: Für zukünfige Versionen wurden die Werte für den DPT1.xxx von 1 bzw. 0 auf true bzw. false gesetzt. Deshalb sind alle Scripte auf diese Auswertung hin.
## Eigenschaften:
* Import der knxproj-Datei
* Generierung einer ETS-ähnlichen Objektstruktur
* Act-Channel und State-Channel finden und kombinieren (Heuristik)
* Aktualisierung aller Zustände beim Start
* beim Lesen eines Zustandsobjekts ein READ auf den KNX-Bus schreiben
* Sortierkanäle zu Räumen

## Adapterkonfiguration
Öffnen Sie nach der Installation dieses Adapters die Adapterkonfiguration. Ergänze:

### KNX Gateway IP
<IP Ihres KNX / Lan GW> im IPv4-Format

### Hafen
Dies ist normalerweise Port 3671

### Phys. EIB-Adresse
Geben Sie den freien Körper ein. Adresse entsprechend Ihrer KNX-Architektur, !!! ABER NICHT das gleiche wie Ihr KNX Gateway !!!

### Debug-Ebene
erweitert den Ausgangspegel des Adapters für Debugging-Zwecke

### Upload knxproj
Hier können Sie Ihren ETS-Export im "knxproj" -Format hochladen.

Nach dem erfolgreichen Import zeigt ein Dialog die Anzahl der importierten Objekte. Nun drücken Sie "Speichern & Schließen" und der Adapter sollte starten.
Beim Start liest der Adapter alle Gruppenadressen mit Lese-Flag. Dies kann eine Weile dauern und kann zu einer hohen Belastung Ihres KNX-Busses führen. Die Werte in Ihrem vis werden jedoch nach dem Start aktualisiert.

### Objekte
Hier ist unter knx.0 der Gruppenadressenbaum wie in Ihrem ETS-Projekt.

### Aufzählungen
Wenn Sie in Ihrer ETS eine Gebäudestruktur mit den entsprechenden Geräten haben, wird diese hier angezeigt. Unter "Mitglieder" werden die Namen der Gruppenadressen der Geräte mit Send-Flag in dieser Gruppe aufgeführt.

### Verwendungszweck
Wenn der Adapter erfolgreich gestartet wird, sind Ihre Datenpunkte für alles verfügbar, was Sie möchten.

### Datenpunkttypen
Alle DPTs gemäß "Systemspezifikationen, Interworking, Datenpunkttypen" der KNX Association sind verfügbar. Das heißt, es gibt zwei Arten von Informationen, die Sie erhalten können: 1) einen Wert oder eine Zeichenfolge 2) durch Kommas getrennte Werte oder ein Array von Werten (im Moment weiß ich nicht, was der bessere Weg ist)

Zum Beispiel wird ein DPT5.001 als vorzeichenlose Ganzzahl mit 8 Bit codiert. Dies ergibt einen einzelnen Wert. Der DPT3.007 (Control Dimming) wird als 1Bit (Boolean) + 3Bit (unsigned Int) codiert.
Dies führt zu f.e. im Wert wie "0,5", wobei "0" "Abnahme" und "5" die Anzahl der Intervalle bedeutet.

## Wie werden die Datenpunkte generiert
### 1) Auslesen aller Kommunikationsobjektreferenzen (im folgenden KOR)
Dabei werden die Gruppenaddressreferenz (im folgenden GAR) der jeweiligen DPT der KOR zugeordnet, wenn er vorhanden ist. Ausserdem bekommt der erste Eintrag die Attribute write = yes und read = no. Alle darauf folgende GAR ID's bekommen nur den DPT zugeordnet

### 2) verstehen der Gruppenadressstruktur (im folgenden GAS)
Hier wird die GAS erzeugt und ebenfalls die DPTs zugeordnet wird;

### 3) Herausfinden der Schalt- und Statusadressen
Im ETS Export sind die Schalt- und Statusadressen nicht hinterlegt. Also führe ich eine Ähnlichkeitsprüfung aller Gruppenadressnamen durch die Auswertung auf status und state.
Wird ein Pärchen gefunden, dessen Ähnlichkeit mehr als 70% beträgt, wird die GA1 die Schaltadresse und GA2 die Statusadresse ist. Dabei erhält GA1 das write = true und read = false und GA2 das write = false und read = true.
Ausserdem werden die DPT abgeglichen aus der jeweiligen korrespondierenden GA. Aus diesem Grund ist es schwierig, wenn die Gruppenadressbeschriftungen nicht konsistent sind.

### 4) den Datenpunktpärchen (im folgenden DPP)
Ein DPP wird erzeugt, wenn die GA, GAR und der DPT gültig sind. Mit diesen DPP arbeitet der Adapter. Fehlen auch die DPT's in einer GA, weil sie auf keiner der o. A. Wege gefunden, so wird für diese GA kein DPP erzeugt und ist im weiteren nicht nutzbar.

Im Idealfall werden somit für einen Schaltkanal 2 DPP erzeugt. Das erste ist das Schalten. In diesem ist die GAR ID des Status DPP hinterlegt. Das zweite ist dann das Status DPP ohne weitere Refenrenz.

## Beim Start des Adapters
DPP werden beim Start abgefragt. Dies verursacht u.U. eine höhere Buslast und dauert einen Moment. Im Anschluss sind aber alle aktuellen Werte verfügbar.

## (versteckte) Funktionen:
Durch einen Wertes auf eine Statusadresse werden die Kommunikationsobjekte innerhalb dieser Gruppenadresse per GroupValueRead abgefragt.

### Verme von Problemen
1) saubere ETS Programmierung und saubere ETS Programmierung und saubere ETS Programmierung

* die DPTs zuweisen !!
* einheitliche Beschriftung der GA-Namen (z.B "EG Wohnen Decke" und "EG Wohnen Decke")
* * * * * * * * * * * * * * * * * *% Von § [] "(kann zu Problemen bei der Erzeugung der GAS führen)

2) Prüfen ob das KNX / LAN GW erreichbar ist. Wenn es das nicht ist, versucht der Adapter sich kontinuierlich zu verbinden.

3) Physikalische Adresse richtig wählen. !!! ACHTUNG: die hier eingetragene physikalische Adresse ist NICHT die Adresse des LAN Gateways und darf nicht auf 0 enden !!!

4) Der Port der LAN Schnittstelle ist i.d.R. 3671

5) Durch die Möglichkeit der Statusabfrage ist es zu beachten: Wenn Sie den Status ändern möchten, müssen Sie den nächsten Schritt ändern.

## Geplante Merkmale
* Hinzufügen von Adressen zur Objektbeschreibung (ID)
* selektiver import von knx-projekt
* benötigt Knoten Version> 8.9.4!

## Changelog
### 1.0.19
* reverted to true/false handling for DPT1.x

### 1.0.18
* fixed upload issue with ETS5.6.x project files
* switched values for "boolean" from 1 and 0 to true false 
* fixed recognition of role set for DPT1.x to switch
* fixed DPT16.xxx writing to KNX-Bus with values < 14Byte

### 1.0.17 (2018-08-16)
* Better state processing
* Add configurable package rate
* corrected Bug in "import only new objects"

### 1.0.15 (2018-07-18)
* change ChID on reconnect
* on Startup read wait for response of Statechannel or timeout

### 1.0.13 (2018-07-04)
* elemination of special signs while importing
* small bugfixes

### 1.0.12 (2018-06-19)
* reduced and sorted log output
* small bugfixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)
* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)
* closing local port in case of undefinded connection state
* added advanced debug-level via adapter-config
* many fixes

### 1.0.9 (2018-04-29)
* changed to state-wise processing
* fixed "disconnect-request"
* changed connection handling with knxd
* many small fixes

### 1.0.8 (2018-04-04)
* modified package queue
* fixed ACK if sending to KNX-Bus
* many small fixes

### 1.0.7 (2018-03-16)
* fixed Adapter-lock while uploading projects

### 1.0.6 (2018-03-11)
* fixed connection problem
* corrected package counter

### 1.0.5 (2018-03-01)
* fixed empty objects, related to DPT1 (error message [object Object] unkown Inputvalue)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise propery update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)
* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)
* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)
* fixed certifate error

### 1.0.0 (2018-02-25)
* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapterconfiguration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed postcomma values to scale-value of DPT
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)
* some small bugfixes
* insert slider to set a sendDelay for slow KNX/LAN Gateways to prevent connection loss

### 0.8.5 (2017-06-05)
* project loader rebuild, dpt13-fix

### 0.8.3 (2017-04-24)
* added act channel update of corresponding state
* fix bug in state-vis update
* optimized knxproj upload

### 0.8.2 (2017-02-26)
* implemented device-config parsing from knxproj
* better choice of state/val of DP objects

### 0.8.1 (2017-02-06)
* fixed DPT1 switch problem

### 0.8.0 (2017-02-xx) comming soon

### 0.7.3 (2016-12-22)
* (chefkoch009) more DPT's are supported
* faster Startup
* implemented generation of room list with device dependicies

### 0.7.2 (2016-11-20)
* (chefkoch009) added necessary dependicies

### 0.7.1 (2016-11-19)
* (chefkoch009) Support standard KNX/LAN Gateways.

### 0.7.0 (2016-10-13)
* (chefkoch009) Support of project export

### 0.6.0 (2016-07-20)
* (chefkoch009) redesign

### 0.5.0
  (vegetto) include vis widget

#### 0.4.0
* (bluefox) fix errors with grunt

#### 0.2.0
* (bluefox) initial release

## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2018 K.Ringmann <info@punktnetzwerk.net>

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)