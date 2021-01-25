![Logo](admin/knx.png)
# ioBroker.knx

[![NPM version](http://img.shields.io/npm/v/iobroker.knx.svg)](https://www.npmjs.com/package/iobroker.knx)
[![Downloads](https://img.shields.io/npm/dm/iobroker.knx.svg)](https://www.npmjs.com/package/iobroker.knx)

[![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)](https://nodei.co/npm/iobroker.knx/)

## Description
en: This adapter allows importing of knxproj Files from ETS. It generates the translation between KNX- group addresses and ioBroker and puts the devices into rooms (esp. for MobileUI).

It connects to standard KNX/LAN Gateways.

Before beginning: Every DPT of com.Objects should be set in your ETS project. Every device should be sorted into your facility structure.

## Features:
* importing `knxproj` file
* generating ETS-like object structure
* finding and combining act-channel and state-channel (heuristic)
* updating all states on start
* emitting a READ to the KNX-Bus, while writing on state-object
* sorting channels to rooms

## Adapter configuration
After installing this adapter, open the adapter configuration. Fill in:

### KNX Gateway IP
<IP of your KNX/Lan GW> with IPv4 format

### Port
This is normally port 3671.

### phys. EIB Address
Fill in free phys. address corresponding to your KNX-architecture, **BUT NOT the address of your KNX Gateway!** May not end in 0 !!!

### debug-Level
Extends the output level of the adapter for debugging purposes.

### Upload knxproj
here you can upload your ETS Export in `knxproj` format.

After successful import a dialog shows the number of imported objects. Now press "save & close" and the adapter should start.
While starting the adapter reads all group addresses with read-Flag. This might take a while and can produce a high load on your KNX-bus. But the values in your vis are updated after start.

### Objects
Here is under knx.0 the group address tree like in your ETS project.

### Enumerations
If you have a building structure in your ETS with the corresponding devices, it will be shown here. Under "members" are the names of group addresses listed from the devices with send-Flag in this Group.

### Usage
If the adapter starts successfully, your data points will be available for everything you like to do.

### Data point Types
All DPTs according to "System Specifications, Interworking, Datapointtypes" from KNX Association are available. That means there are 2 types of information you can get:
1) a Value or a String
2) comma-separated values or an array of values (for the moment I don't know what's the better way to handle)

For example a DPT5.001 is encoded as unsigned Integer with 8-Bit. This gives a single Value. The DPT3.007 (Control Dimming) is encoded as 1Bit(Boolean)+3Bit(unsigned Int).
This results e.g. in a value like "0,5", where "0" means "decrease" and "5" means number of intervals.


## Wie werden die Datenpunkte generiert (Deutsch)
### 1) Auslesen aller Kommunikationsobjektreferenzen (im folgenden KOR)
Dabei werden den Gruppenaddressreferenz (im folgenden GAR) IDs der jeweilige DPT der KOR zugeordnet, wenn er vorhanden ist. Ausserdem bekommt der erste Eintrag die Attribute write=yes und read=no. Alle darauf folgenden GAR ID's bekommen nur den DPT zugeordnet

### 2) Erzeugen der Gruppenadressstruktur (im folgenden GAS)
Hier wird die GAS anhand der GAR IDs erzeugt und ebenfalls die DPTs zugeordnet, falls dies unter 1) noch nicht geschehen ist.

### 3) Herausfinden der Schalt- und Statusaddressen
In dem ETS-Export sind die Schalt- und Statusadressen nicht hinterlegt. Somit führe ich eine Ähnlichkeitsprüfung aller Gruppenadressnamen durch mit der Auswertung auf status und state.
 Wird ein Pärchen gefunden, dessen Ähnlichkeit mehr als 90% beträgt, dann wird angenommen, dass die GA1 die Schaltadresse und GA2 die Statusadresse ist. Dabei erhält GA1 das write=true und read=false und GA2 das write=false und read=true.
 Außerdem werden die DPT abgeglichen aus der jeweilig korrespondierenden GA. Aus diesem Grund ist es schwierig, Pärchen zu finden, wenn die Gruppenadressbeschriftungen nicht konsistent sind.

Weiterhin werden die Flags in den Gerätekonfigurationen betrachtet. Dabei werden die Flags wie folgt umgesetzt:

| KNX   |  |  | iobroker |  |  |
|-------|-----------|------------|----------|----------|-------------------------------------------------|
| Lesen | Schreiben | Übertragen | Lesen    | Schreiben| Erklärung                                       |
|   -   |    -      |    -      |   -     |    -    | der wert wird über GroupValueResponse aktualiesiert |
|   x   |    -      |    -      |   x     |    x    | ein Trigger darauf löst GroupValueRead aus|
|   -   |    x      |    -      |   -     |    x    | Schreibt den angegeben Wert mit GroupValueWrite auf den KNX-Bus|
|   -   |    -      |    x      |   x     |    -    | der Wert wird über GroupValueResponse aktualisiert |
|   x   |    -      |    x      |   x     |    x    | ein Trigger darauf löst GroupValueRead aus|

###  4)Erzeugen der Datenpunktpaare (im folgenden DPP)
Ein DPP wird erzeugt, wenn die GA, GAR und der DPT valid sind. Mit diesen DPP arbeitet der Adapter. Fehlen also der DPT in einer GA, weil er auf keiner der o. A. Wege gefunden werden konnte, so wird für diese GA kein DPP erzeugt und sie ist im Weiteren nicht nutzbar.

Im Idealfall werden somit für einen Schaltkanal 2 DPP erzeugt. Das erste ist das Schalten. In diesem ist die GAR ID des Status DPP hinterlegt. Das zweite ist dann das Status DPP ohne weitere Referenz.


## Beim Start des Adapters
Alle mit dem Lesen-Flag markierten DPP werden beim Start abgefragt. Dies verursacht u.U. eine höhere Buslast und dauert einen Moment. Im Anschluss sind aber alle aktuellen Werte verfügbar.

## (hidden) Features:
Durch senden eines Wertes auf eine Statusadresse werden die Kommunikationsobjekte innerhalb dieser Gruppenadresse per GroupValueRead abgefragt.

### Vermeidung von Problemen
1) saubere ETS Programmierung und saubere ETS Programmierung und saubere ETS Programmierung

*   zuweisen der DPTs!!
*   einheitliche Beschriftung der GA-Namen (z.B "EG Wohnen Decke Licht schalten" und "EG Wohnen Decke Licht schalten status" )
*   Vermeidung von Sonderzeichen ",./;\&%$§[]" (kann zu Problemen bei der Erzeugung der GAS führen)

2) Prüfen ob das KNX/LAN GW erreichbar ist. Wenn es das nicht ist, versucht der Adapter sich kontinuierlich zu verbinden.

3) Physikalische Adresse richtig wählen ( wichtig beim Einsatz von Linienkopplern ). !!! ACHTUNG: die hier eingetragene physikalische Adresse ist NICHT die Adresse des LAN Gateways und darf nicht auf 0 enden !!!

4) Der Port der LAN Schnittstelle ist i.d.R. 3671

5) Durch die Möglichkeit der Statusabfrage ist eines zu beachten: Es ist sicherzustellen, dass nicht mehr als 40 Anfragen pro Sekunde vom ioBroker generiert werden, denn diese können dann physikalisch
   bedingt nicht mehr durch den Adapter an das Gateway weitergereicht werden.

## Planned features
=======
## planned features
* adding addresses to object-description (id)
* selective import of knx-project
* require node Version >8.9.4!

## Changelog
### 1.0.44 (2021_01_22)
* fixed act and state handling 
* added some new datapoint types
* fix facility and room recognition and device allocation

### 1.0.42 (2020_09_03)
* Fixed problem with missing index_m.html

### 1.0.41
* fixed bug on GroupValue_Response event
* corrected connection to Gira GW

### 1.0.40
* fixed some import errors for ETS 5.7.x
* fixed bug on GroupValue_Response event

### 1.0.39
* fixed import error

### 1.0.38
* fixed some bugs on import
* show warning if import-file ist password protected

### 1.0.37 (2010-01-31)
* update for ETS 5.7.3 import

### 1.0.36 (2019-10-16)
* some bugs fixed 

### 1.0.35 (2019-09-15)
* fixed permanent reconnects, if no traffic on knx-bus

### 1.0.34 (2019-09-15)
* changes on importer for detecting project-id

### 1.0.33 (2019-09-12)
* fixed bug while writing to bus
* added units to states
* fixed "read/write of undefined" error

### 1.0.32 (2019-09-03)
* updated importer for ETS V5.7.2, some changes in KNX-stack state-machine

### 1.0.31
* some fixes on ETS5.7.2 importer
* small changes in knx-stack statemachine
* added (again) phys address to admin config dialog

### 1.0.31
* fixed bug in deviceTree generation

### 1.0.30
* new Importer for ETS5.7.2 knxproj files
* extended accepted Data point types
* new adapter configuration menu
* implemented a switch for the user to decide to use "true" and "false" or "0" or "1" for binary values
* fixed bug in GroupValue_Read
* implemented a selector for local network interface for KNX to Gateway communication
* extended State Object for later features
* fixed some small other bugs

### 1.0.20
* fixed bug in handling KNX-data packages, which occurs periodical reconnects
* fixed bug in KNX-project file upload procedure

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
* on Startup read wait for response of State channel or timeout

### 1.0.13 (2018-07-04)
* elimination of special signs while importing
* small bug-fixes

### 1.0.12 (2018-06-19)
* reduced and sorted log output
* small bug-fixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)
* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)
* closing local port in case of undefined connection state
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
* fixed empty objects, related to DPT1 (error message [object Object] unknown Input value)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise property update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)
* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)
* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)
* fixed certificate error

### 1.0.0 (2018-02-25)
* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapter-configuration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed post-comma values to scale-value of DPT
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)
* some small bug-fixes
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
* implemented generation of room list with device dependencies

### 0.7.2 (2016-11-20)
* (chefkoch009) added necessary dependencies

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

Copyright (c) 2016-2021 K.Ringmann <info@punktnetzwerk.net>

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
