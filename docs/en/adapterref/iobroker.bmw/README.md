# ![Logo](admin/bmw.png) Adapter für BMW ConnectedDrive-Daten

[![NPM version](http://img.shields.io/npm/v/iobroker.bmw.svg)](https://www.npmjs.com/package/iobroker.bmw)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bmw.svg)](https://www.npmjs.com/package/iobroker.bmw)
**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.bmw/master.svg)](https://travis-ci.org/frankjoke/ioBroker.bmw)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/frankjoke/ioBroker.bmw?branch=master&svg=true)](https://ci.appveyor.com/project/frankjoke/ioBroker-bmw/)
[![NPM](https://nodei.co/npm/iobroker.bmw.png?downloads=true)](https://nodei.co/npm/iobroker.bmw/)
==============
### Adapter zum Auslesen von BMW ConnectedDrive-Daten
Der Adapter versucht die ConnectedDrive-Daten für die auf die angegebenen Benutzer registrierten Fahrzeuge.
Man kann filtern welche Daten angezeigt werden indem man im Admin die Einstellungen für

* zu verwendete services (ich verwende nur: efficiency, dynamic, navigation und remote_execution). Wenn man 'debug!' am anfang schreibt wird der Adapter im Log die debug-Ausgaben einschalten und damit sieht man welche Daten er abfragt und geliefert bekommt. Adapter muss im admin auf 'info' stehen!
* zu löschende Einträge (Bei mir Daten wie: *modelType, series, basicType, brand, licensePlate, hasNavi, bodyType, dcOnly, hasSunRoof, hasRex, steering, driveTrain, doorCount, vehicleTracking, isoCountryCode, auxPowerRegular, auxPowerEcoPro, auxPowerEcoProPlus, ccmMessages*)
* Einträge die von Arrays umgewandelt werden sollen (bei mir: *lastTripList|name|lastTrip, specs|key|value, service|name|services, cdpFeatures|name|status, cbsMessages|text|date, lifeTimeList|name|value, characteristicList|characteristic|quantity, remote_history|eventId, storePortfolio|offerCode*). bestehen nur zwei einträge mit '|' getrennt dann ist der erste der name des arrays das umgewandelt wird und der zweite der Name des eintrags und es werden alle Sub-Elemente übernommen, wenn ein dritter wert vorhanden ist wird nur dieser als Wert übernommen.
* Einträge die in ihrer Hirarchie nach oben wandern sollen (bei mir *attributesMap, vehicleMessages, cbsMessages, twoTimeTimer, characteristicList, lifeTimeList, lastTripList, update, storePortfolio*)
* der zu verwendete Datenserver kann auch angegeben werden, der Default ist für den Rest der Welt, wer in anderen Regionen wohnt kann auch <https://b2vapi.bmwgroup.cn:8592> für China, <https://b2vapi.bmwgroup.us> für USA und <https://b2vapi.bmwgroup.com> für Europe / Rest of World probieren. www.bmw-connecteddrive.com wird hoffentlich immer auf den richtigen weitergeleitet.
* Man kann States umbenennen wenn man im rename **originalName|neuerName** verwendet. weder Original noch der neue Name dürfen mehrmals vorkommen. '.' werden durch '_' ersetzt. Mehrere Einträge von **x|y** werden durch '**,**' getrennt. Damit kann man den Vin des Autos auf z.B. '325i' umbenennen.
* Der Adapter versteht jetzt auch 'sendTo' Kommandos. `sendTo('bmw.0','send','225xe.Versperren')` würde den Wagen den sie auf 225xe umbenannt haben versperren, `sendTo('bmw.0','send','_DatenNeuLaden')` würde einen Refresh ausführen und `sendTo('bmw.0','debug','on')` (es geht auch 0,1,on,off,ein,aus,true,false) würde debug ein- oder ausschalten. Mit `sendTo('bmw.0','get', '225xe.Versperren')` kann der state von Werten abgefragt werden, man bekommt z.B. `{ val: 'Nicht gestartet', ack: true, ts: 1505839335870, q: 0, from: 'system.adapter.bmw.0', lc: 1505839335870 }` zurück.
* Im config kann man jetzt 2 flags setzten: Alle Daten bei Adapter-Neustart löschen (default:ein) und alle Daten die bei einem wiederholten download nicht mehr runtergeladen werden löschen (default:aus). Damit kann man bei Adapter-Restart mit anderen settings die alten states vergessen aber wenn ein Kommunikationsfehler wärend eines refresh's entsteht die Daten vom letzten refresh sehen wenn der 2. Haken nicht gesetzt wird.

Wenn der Adapter die Position vom Navigationssystem auslesen kann übersetz er diese mit Hilfe von Google auf eine Adresse und gibt diese unter navigation.formatted_address an.

Ein spezieller '_RefresData'-State wird angelegt auf welchen man im admin.object klicken kann oder welchen man über Vis/oder andere Programme ansteuern kann.

Wenn das Fahrzeug aktive remote-services hat (**service** muss bei den Services eingeschaltet sein!) sollten Button-States angelegt werden. Diese können die Aktion durchführen wenn im Objectviewer drauf geclickt wird oder wenn sie mit einem wert und *ack=false* beschrieben werden. Der Wert dieses States wird mit dem Service-Status überschrieben, z.B **PENDING** oder **EXECUTED** (oder deutsche übersetzungen).

Ab 1.2.0 werden im **debug!**-Mode **_originalData**-States generiert. Wenn ihr Probleme mit einigen Datenpunkten hab köönt ihr das verwenden um mir die Daten zu senden (ich habe nicht alle BMW's zum Testen!).

<sub>p.s.: Ich möchte <https://github.com/Lyve1981/BMW-ConnectedDrive-JSON-Wrapper> und <https://github.com/edent/BMW-i-Remote> für die Beispiele danken mittels derer sources ich den Zugriff geschafft habe!</aub>

## Important/Wichtig
* Adapter requires node >= v4.3.*!

## Changelog
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
* added _originalData object (wen in debug!) for root request for available cars on this account

### 1.2.3
* Removed bug for remote-control
* Removed bug after token times out (~2h of operation) to renew token
* added check if service is not available (happens too often!)

### 1.2.1
* Removed RCT from possible services for remote control
* Crerate a **.google_maps_link** state for the navigation which can be used to open a web-page with google maps to show the location.
* set same level of debug if adapter is in debug mode and **debug!** is set

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

## Install

Installieren über ioBroker.admin

## Configuration

Der Benutzername, das Passwort und die Datenfilter müssen im Adapter config eingegeben werden.

### Todo for later revisions

## Installation

Mit admin, ioBroker oder von <https://github.com/frankjoke/ioBroker.bmw> oder mit npm install ioBroker.bmw

## License

The MIT License (MIT)

Copyright (c) 2014-2016, bluefox <dogafox@gmail.com>

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
