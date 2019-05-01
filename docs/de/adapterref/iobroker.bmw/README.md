---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bmw/README.md
title: ! [Logo] (admin / bmw.png) Adapter für BMW ConnectedDrive-Daten
hash: bfM+hfzdvekiGB2u/C4RAqSTulexr6oKxlddYBP8tdQ=
---
# ![Logo](../../../en/adapterref/iobroker.bmw/admin/bmw.png) Adapter für BMW ConnectedDrive-Daten

![NPM-Version](http://img.shields.io/npm/v/iobroker.bmw.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![Eingerichtet](http://iobroker.live/badges/bmw-installed.svg)
![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.bmw/master.svg)
![NPM](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

==============

### Adapter zum Auslesen von BMW ConnectedDrive-Daten
Der Adapter versucht die ConnectedDrive-Daten für die auf den angegebenen Benutzer registrierten Fahrzeuge.
Man kann filtern, welche Daten angezeigt werden

* zu diesen Diensten (ich verwende nur: Effizienz, Dynamik, Navigation und Remote_Execution).
* Wenn man 'debug' einschaltet, wird der Log-in die Debug-Ausgaben einschalten und damit sieht man die Daten abfragt und geliefert. Adapter muss im Admin mindestens auf 'info' stehen!
* zu löschende Einträge (Bei mir Daten wie: * modelType, Serie, basicType, Marke, Lizenzplatte, hasNavi, bodyType, dcOnly, hasRoof, hasRex, Lenkung, driveTrain, doorCount, vehicleTracking, isoCountryCode, auxPowerRegular, auxPowerEcoPro, AuxAppartArcArrachArmArcArrachArcArcArcArrachArcArcArrachArcArcArrachArcArcArrachArcArrachArcArrachArcArrachArcArrachArcArrachArcArrachArcArrachArcArcArracho
* Einträge die von Arrays umgewandelt werden sollen (bei mir: *lastTripList | name | lastTrip, spezifikationen | key | value, service | name | services | cdpFeatures | name | status, cbsMessages | text | date, lifeTimeList | name | value, characterList | charakteristik | menge, entfernte_historie | eventId, storePortfolio | offerCode* . bestehen nur zwei einträge mit '|' der Name des Arrays ist der Name des Arrays und des zweiten Namens des Arrays.
* Einträge die in ihre Hirarchie nach oben wandern sollen
Der Standard ist für den Rest der Welt; .us> für USA und <https://b2vapi.bmwgroup.com> für Europa / Rest der Welt probieren. www.bmw-connecteddrive.com wird hoffentlich immer auf den richtigen weitergeleitet.
* Man kann States umbenennen, wenn man im umbenennen ** originalName | neuerName ** verwendet. weder original noch der neue Name dürfen mehrmals vorkommen. '.' werden durch '_' ersetzt. Mehrere Einträge von ** x | y ** werden durch '**, **' getrennt. Damit kann man den Vin des Autos auf einigen '325i' umbenennen.
* Der Adapter versteht jetzt auch 'sendTo' Kommandos. `sendTo ('bmw.0', 'send', '225xe.Versperren')` würde den Wagen auf 225xe umbenannt haben versperren, `sendTo ('bmw.0', 'send', '_ DatenNeuLaden')` würde ein Refresh ausführen und `sendTo ('bmw.0', 'debug', 'on')` (es geht auch 0,1, on, off, ein, aus, true, false) würde debug ein- oder ausschalten. Mit `sendTo ('bmw.0', 'get', '225xe.Versperren')` kann der Staat von Werten abgefragt werden `{val: 'Nicht gestartet', ack: true, ts: 1505839335870, q: 0, von: 'system.adapter.bmw.0', lc: 1505839335870}` zurück.
* Im config kann man jetzt 2 Flags setzten: Alle Daten bei Adapter-Neustart löschen (Standard: ein) und alle Daten bei einem wiederholten Download nicht mehr runtergeladen werden löschen (Standard: aus). Damit kann man bei anderen Einstellungen die alten Zustände vergessen, wenn ein Kommunikationsfehler auftritt.

Wenn der Adapter die Position vom Navigationssystem ablesen kann, wird diese mit Hilfe von Google auf eine Adresse und gibt diese unter navigation.formatted_address an.

Ein spezieller '_RefresData'-Zustand wird an denjenigen angelegt, der sich im Admin.object befindet.

Wenn das Fahrzeug aktive Remote-Services hat (** Service ** muss bei den Services eingeschaltet sein!) Sollten Button-States angelegt werden. Diese Aktion kann durchgeführt werden, wenn der Objectviewer nicht mit einem Wert und *ack = false* beschrieben wird. Der Status dieses Status wird überschrieben, z.B ** PENDING ** oder ** EXECUTED ** (oder deutsche übersetzungen).

Ab 1.2.0 werden im **debug** - Modus **_ originalData** - Zustände generiert. Wenn ihr Probleme mit einigen Datenpunkten habt.

<sub>ps: Ich möchte</sub> <https://github.com/Lyve1981/BMW-ConnectedDrive-JSON-Wrapper> <sub>und</sub> <https://github.com/edent/BMW-i-Remote> <sub>für die Beispiele danken mit dener Quellen</sub>

## Wichtig / Wichtig
* Adapter erfordert Knoten> = v4.3. *!

## Installieren
Installieren Sie über ioBroker.admin

## Aufbau
Der Benutzername, das Passwort und die Datenfilter müssen im Adapter eingegeben werden.

### Todo für spätere Überarbeitungen
## Installation
Mit admin, ioBroker oder von <https://github.com/frankjoke/ioBroker.bmw> oder mit npm install ioBroker.bmw

## Changelog

### 1.4.0
* Update for Admin 3,0 and compact mode as well as config page

### 1.3.3
* Just removed 'preserveSettings' and 'supportCustoms' not to show up in admin custom config

### 1.3.1
* Added flags in config to clear all data on adapter restart and to clear data not downloaded on every download

### 1.3.0
* Added renaming of states to the adapter control
* Added '***sendTo***' message capabilities
* Remote services cannot be executed as long as other services are still to be finished

### 1.2.4
* added states for last successful donload and error to see how old data is
* Improved error handling when services are not available
* added _originalData object (wenn in debug) for root request for available cars on this account

### 1.2.3
* Removed bug for remote-control
* Removed bug after token times out (~2h of operation) to renew token
* added check if service is not available (happens too often!)

### 1.2.1
* Removed RCT from possible services for remote control
* Crerate a **.google_maps_link** state for the navigation which can be used to open a web-page with google maps to show the location.
* set same level of debug if adapter is in debug mode and **debug** is set

### 1.2.0 Test
* Remoteservice implemented, basic functions like lock/unlock door or flash lights can be executed  
* New services **store** and **map_download** added, this adds also **update** and **storePortfolio** in flatten and **storePortfolio|offerCode** in arrays.
* If ConnectedDrive returns numbers as strings then they are converted to javascript numbers
* Added creation of states for the original values received from ConnectedDrive in 'debug'-mode. They will be shown as **._originalData** entries and have the original string from ConnectedDrive as a value.

### 1.1.0
* Added _RefreshData - State which can be used to start a refresh cycle manually (for example from admin.objects)
* Added 'debug'-mode when you start services config string with 'debug!'

### 1.0.1
* Changed name of email to username in config not to conflict with other data and services
* Removed the dependency on 'xml2js' module

### 1.0.0
* Changed remoteservises/chargingprofile to remote_chargingprofile
* Added services remote_history and remote_execution
* Changed to automatic deletion of states which are not anymore delivered
* Removed Flag to delete all car data at start

### 0.2.2
* Multiple cars did not work - resolved
* Flag to delete all car data on adapter start included

### 0.2.1
* Small changes to the text and description as well as for npm

### 0.2.0
* First public release, working fine for my car!

## License

The MIT License (MIT)

Copyright (c) 2014-2019, Frank Joke <frankjoke@hotmail.com>

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