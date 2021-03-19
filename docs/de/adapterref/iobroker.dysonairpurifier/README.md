---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: px4zk/3wJAeS3V3CIdF2pOm2GTLOP3JGncSlp+uWIX4=
---
# IoBroker.dysonAirPurifier
![Logo] (admin / dyson_logo.svg)! [Logo](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Grizzelbee/iobroker.dysonairpurifier.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![Travis-CI](https://travis-ci.org/Grizzelbee/iobroker.dysonairpurifier.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

## IoBroker Adapter für Dyson Luftreiniger und Lüfter
Dieser Adapter verbindet ioBroker mit verschiedenen Dyson-Luftreinigern.

Fan-Icon im Logo erstellt von [Freepik] (https://www.flaticon.com/de/autoren/freepik) von [www.flaticon.com](https://www.flaticon.com/de/).

### Unterstützte Geräte
* Dyson Pure Cool Link Tower (TP02, Produkttyp 475)
* Dyson Pure Cool Tower, Modell 2018 (TP04, Produkttyp 438)
* Dyson Pure Cool Link Desk (DP01, Produkttyp 469)
* Dyson Pure Cool Desk, Modell 2018 (DP04, Produkttyp 520)
* Dyson Pure Hot + Cool Link (HP02, Produkttyp 455)
* 2018 Dyson Pure Hot + Cool (HP04, Produkttyp 527)
* Dyson Pure Humidify + Cool (PH01, Produkttyp 358)

## Eigenschaften
Verbindet Ihre Dyson-Lüfter, Heizlüfter, Luftreiniger und Luftbefeuchter mit ioBroker.

* Liest Werte von Geräten und Sensoren
* Kann Geräte steuern, indem Sie einige Werte ändern können (Hauptleistung, Schwingung, Heizung, Lüftergeschwindigkeit, ...)
* Liest die Geräteliste von Dyson-Servern

## Installation
### Voraussetzungen
* Dieser Adapter benötigt Node.js> = Version 10
* Mindestens js-Controller 3.0.0 ist erforderlich
* Mindestens Admin 4.0.9 ist erforderlich
* Um diesen Adapter zum Laufen zu bringen, benötigen Sie ein Dyson-Konto.
* Stellen Sie sicher, dass Sie Ihren Fan zu Ihrem Konto hinzufügen. Entweder per App oder online.

### Adapterinstallation
#### Verwenden von npm
Führen Sie ```npm install ioBroker.dysonairpurifier``` in Ihrer ioBroker-Installation aus, um die neueste Version dieses Adapters aus dem npm-Repository abzurufen.

#### Alternative: Verwenden der GitHub-URL
Installieren Sie die Installation über die ioBroker Admin-Benutzeroberfläche, indem Sie auf die neueste stabile Version auf GitHub verweisen: <https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

Sie können auch ältere Release-Versionen mit diesen Methoden installieren (indem Sie auf ein Versions-Tag verweisen, z. B. ```v0.6.0``` anstelle von ```master``` in der URL). Die neueste Version wird jedoch im Allgemeinen bevorzugt.

### Konfigurationsdaten benötigt
* Benutzername des Dyson-Kontos
* Passwort für das Dyson-Konto (dieser Adapter kann Passwörter mit bis zu 32 Zeichen verarbeiten)
* IP-Adresse Ihrer Lüfter / Luftreiniger in Ihrem LAN.

* Bitte beachten Sie *: Aufgrund des frühen Entwicklungsstatus und einer nicht konformen mDNS-Implementierung von Dyson müssen Sie die lokale IP des Geräts * nach dem ersten Lauf * angeben.

* Zusätzlicher Hinweis *: Seit Version 0.7.1 versucht der Adapter, über seinen Hostnamen (Seriennummer) eine Verbindung zum Gerät herzustellen, wenn keine Hostadresse / IP angegeben ist. Dies funktioniert unter zwei Voraussetzungen:

1. In Ihrem LAN wird ein DNS-Server ausgeführt. Entweder in Ihrem Router (z. B. in FritzBoxen wird ein DNS ausgeführt) oder in einem dedizierten Router.
2. Sie haben den Standard-Gerätenamen nicht geändert.

> Beim ersten Start dieses Adapters wird die Dyson-API für alle Ihre Geräte abgefragt und alle unterstützten Geräte werden im Gerätebaum erstellt - mit ihren grundlegenden Informationen, die von der API bereitgestellt werden, und einem zusätzlichen Feld "Hostadresse".
>> Führen Sie den Adapter also einmal aus, und Ihre Dyson-Geräte werden in der Gerätestruktur mit ihren Grundeinstellungen erstellt.
>> Stoppen Sie dann den Adapter, geben Sie die IP (s) in das Feld (die Hostadresse) ein und starten Sie den Adapter neu. Danach sollten Ihre Dyson-Geräte in der Gerätestruktur mit Daten gefüllt werden.

## Steuern Ihrer Geräte
Dieser Adapter kann derzeit die folgenden Zustände Ihrer Geräte steuern:

* Lüftergeschwindigkeit, aktuelle Lüftergeschwindigkeit
* Nachtmodus, Nachtmodus
* Schwingung, Schwingung des Lüfters.
* ContinuousMonitoring, Continuous Monitoring von Umgebungssensoren, auch wenn das Gerät ausgeschaltet ist.
* MainPower, Hauptleistung des Lüfters.
* AutomaticMode, Lüfter befindet sich im automatischen Modus.
* Durchflussrichtung, Richtung, in die der Lüfter bläst. EIN = vorne; AUS = Zurück (auch bekannt als Jet-Fokus)
* Jetfocus, Richtung, in die der Lüfter bläst. EIN = vorne; AUS = Zurück (auch bekannt als Jet-Fokus)
* Heizmodus, Heizmodus [EIN / AUS]
* HeatingTargetTemp, Zieltemperatur für das Heizen
* AirQualityTarget, Zielluftqualität für den automatischen Modus.
* Befeuchtungsmodus, Ein / Aus
* HumidifyAutoMode, Auto / Off
* AutoHumidificationTarget, Auto HumidificationTarget
* Befeuchtungsziel, manuelles Befeuchtungsziel
* Wasserhärte, weich, mittel, hart

Mögliche Werte für diese Zustände sind nachstehend bekannt, soweit bekannt.
Die Lüftergeschwindigkeit erlaubt nur Werte von 1 bis 10 und Auto. Wenn Sie die Lüftergeschwindigkeit auf 0 einstellen möchten, müssen Sie die Hauptstromversorgung ausschalten.
Welches ist, was die Dyson-App auch tut.

### Bekannte Probleme
* Keine automatische IP-Erkennung von Geräten

## Erläuterung der Dyson-API-Daten (Nachrichtennutzlast)
Informationen kopiert und erweitert von <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md>

### AKTUELLEN ZUSTAND
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| Modus-Grund | Der aktuelle Modus wurde von RemoteControl, App, Scheduler | eingestellt PRC, LAPP, LSCH, PUI | |
| Staatsgrund | | MODUS | |
| rssi | WIFI-Stärke | -100 - 0 | dBm |
| Kanal | WIFI-Kanal | 52 | |
| fqhp | | 96704 | |
| fghp | | 70480 | |

#### Produktstatus
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| ercd | Letzter Fehlercode | NONE oder einige Hexa-Werte | |
| filf | verbleibende Filterlebensdauer | 0000 - 4300 | Stunden |
| fmod | Modus | LÜFTER, AUTO | |
| fpwr | Hauptstrom | EIN, AUS | |
| fnst | Lüfterstatus | EIN, AUS, LÜFTER | |
| fnsp | Lüftergeschwindigkeit | 0001 - 0010, AUTO | |
| fdir | Fandirection aka. Jet Focus / ON = Front, OFF = Back | EIN, AUS | |
| ffoc | JetFocus | EIN, AUS |
| nmod | Nachtmodus | EIN, AUS | |
| oson | Schwingung | EIN, AUS | |
| osal | OscillationAngle Lower Boundary | 0005 - 355 | ° (Grad) |
| osau | OscillationAngle Upper Boundary | 0005 - 355 | ° (Grad) |
| oscs | OscillationActive | EIN, AUS, LEERLAUF | |
| ancp | Oszillationswinkel | CUST, 0180 | ° (Grad) |
| qtar | Luftqualitätsziel | 0001 = gut, 0002 = normal, 0003 = schlecht, 0004 = sehr schlecht | |
| rhtm | Kontinuierliche Überwachung EIN, AUS | |
| auto | AutomaticMode | EIN, AUS | |
| nmdv | NightMode Max Fanspeed? | 0004 | |
| cflr | Status Kohlefilter | 0000 - 0100 | Prozent |
| cflt | Kohlefilter | CARF | |
| hflr | Status HEPA-Filter | 0000 - 0100 | Prozent |
| hflt | HEPA-Filter | GHEP | |
| sltm | Sleeptimer | EIN, AUS ||
| hmod | Heizmodus [EIN / AUS] | WÄRME | |
| hmax | Zieltemperatur zum Heizen | 0 .. 5000 | K |
| hume | Befeuchtungsmodus | EIN, AUS, |
| haut | Befeuchten Sie den Auto-Modus | |
| humt | Befeuchtungsziel | |
| cdrr | CleanDurationRemaining | |
| rect | AutoHumidificationTarget | |
| cltr | TimeRemainingToNextClean | |
| wath | Wasserhärte | |
| wacd | WarningCode? | KEINE... |
| rstf | Filterlebenszyklus zurücksetzen |
| bril | | 0002 |
| corf | | EIN, AUS |
| psta | [HP0x] Unbekannt | |
| hsta | [HP0x] Unbekannt | |
| kippen | [HP0x] Unbekannt | |
| Wählen Sie | [DP0x] Unbekannt | |
| fqhp | fqhp ||
| msta | msta ||

| Fehlercodes | Bedeutung |
| ----- | ----- |
| KEINE | Es ist kein Fehler aktiv |
| 57C2 | unbekannt |
| 11E1 | Die Oszillation wurde deaktiviert. Bitte drücken Sie die Taste "Oszillation" auf Ihrer Fernbedienung, um fortzufahren. |

#### Planer
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| dstv | daylightSavingTime | 0001 ... | |
| srsc | ? | 7c68 ... | |
| tzid | Zeitzone? | 0001 ... | |

### UMWELTSTROM-SENSOR-DATEN
#### Daten
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| hact | Luftfeuchtigkeit (%) | 0000 - 0100 | Prozent |
| Pakt | Staub | 0000 - 0009 | |
| sltm | Sleeptimer | AUS ... 9999 | Minuten |
| Takt | Temperatur in Kelvin | 0000 - 5000 | K |
| vact | flüchtige organische Verbindungen 0001 - 0009 | |
| pm25 | PM2.5 | 0018 ||
| pm10 | PM10 | 0011 ||
| va10 | flüchtige organische Verbindungen | 0004 ||
| noxl | NO2 | 0000 - 0014 ||
| p25r | | 0019 ||
| p10r | | 0018 ||

### UMWELT- UND NUTZUNGSDATEN
Redundante Werte?

#### Daten
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| pal0 - pal9 | Anzahl der zweiten Ausgaben in diesem Staubniveau seit Beginn der Stunde 0000 - 3600 | |
| Handfläche | scheint ein Medianwert von palX | zu sein | |
| vol0 - vol9 | Anzahl der zweiten Ausgaben in diesem Vokalniveau seit Beginn der Stunde | 0000 - 3600 | |
| volm | scheint ein Medianwert von volX | zu sein | |
| aql0 - aql9 | Anzahl der zweiten Ausgaben in diesem Bereich der Luftqualität max (pal, vol)) seit Beginn der Stunde | 0000 - 3600 | |
| aqlm | scheint ein Medianwert von aqlX | zu sein | |
| fafs | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden 0000 - 3600 | |
| faos | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden 0000 - 3600 | |
| fofs | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden 0000 - 3600 | |
| fons | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden 0000 - 3600 | |
| humm | Feuchtigkeit ? (%) | 0000 - 0100 | |
| tmpm | Temperatur in Kelvin? | 0000 - 5000 | |

## Rechtliche Hinweise
Dyson, pure cool, pure hot & cool und andere sind Marken oder eingetragene Marken von [Dyson Ltd.](https://www.dyson.com) Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

## Changelog

### 0.8.1 (2021-02-19) (Fall into the flames)
* (grizzelbee) New: added icons to each fan type in device tree
* (grizzelbee) New: Showing Filter type correctly - not as code anymore
* (grizzelbee) Upd: updated dependencies

### 0.8.0 (2021-02-18) (Beyond the mirror)
* (grizzelbee) New: Log as info if account is active on login; else log as warning. 
* (grizzelbee) New: [#21](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/21) Improvement for humidifier support
* (grizzelbee) Fix: [#67](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/67) Adapter sometimes wrote objects instead of values.

### 0.7.5 (2021-02-12) (I won't surrender)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/65) Adapter get online again after changes to dyson cloud API login procedure.
* (grizzelbee) New: Adapter reconnects with new host address when it gets changed manually

### 0.7.4 (2021-02-10) (Human)
* (grizzelbee) Fix: fixed adapter traffic light for info.connection
* (grizzelbee) Fix: Minor fixes

### 0.7.3 (2021-02-10) (When angels fall)
* (theimo1221) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) added default country
* (theimo1221) New: added function to mask password to dyson-utils.js
* (grizzelbee) New: extended config test and error logging
* (grizzelbee) New: added password to protectedNative in io-package.json
* (grizzelbee) Fix: fixed showing password in config (leftover from testing/fixing)
* (grizzelbee) Fix: fixed detection of needed js-controller features
* (grizzelbee) Fix: fixed detection if IP is given or not
* (grizzelbee) Upd: creating all data points with await 


### 0.7.2 (2021-02-10) (Songs of love and death)
* (grizzelbee) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) Fixed bug while loading/saving config which led to wrong values displayed for country and temperature unit
* (grizzelbee) Upd: switched "Skipping unknown ..." message from info to debug 

### 0.7.1 (2021-02-06) (Horizons)
* (grizzelbee) New: When no host address is given - adapter tries to connect via default hostname of the device
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) Filterlifetime is now correctly displayed in hours and percent for devices supporting this
* (grizzelbee) Fix: [#48](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/48) Fixed countrycodes for UK and USA
* (grizzelbee) Fix: [#52](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/52) Fixed VOCIndex
* (grizzelbee) Fix: Removed option to control Fan state since it corresponds to the state of the fan in auto-mode. Controlling it is senseless.
* (grizzelbee) Fix: Fixed await...then antipattern.
* (grizzelbee) Fix: Fixed undefined roles
* (grizzelbee) Fix: Fixed some bad promises and moved code to dysonUtils
* (grizzelbee) Fix: Fixed encrypting password using js-controller 3.0 build-in routine
* (grizzelbee) Upd: Added topic "Controlling your device(s)" to readme
* (grizzelbee) Upd: Removed unnecessary saving of MQTT password
* (grizzelbee) Upd: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) Added some more dyson codes for heaters and humidifiers


### 0.7.0 (2021-01-08) (Afraid of the dark)
* (jpwenzel)   New: Removing crypto from package dependency list (using Node.js provided version)
* (jpwenzel)   New: Introducing unit tests
* (jpwenzel)   New: At least NodeJs 10.0.0 is required
* (grizzelbee) New: [#23](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/23) - Introduced new data field AirQuality which represents the worst value of all present indexes.
* (grizzelbee) New: BREAKING CHANGE! - switched over to the adapter-prototype build-in password encryption. Therefore you'll need to enter your password again in config.
* (grizzelbee) New: At least js-controller 3.0.0 is required
* (grizzelbee) New: At least admin 4.0.9 is required
* (jpwenzel)   Fix: General overhaul of readme
* (jpwenzel)   Fix: Code refactoring
* (grizzelbee) Fix: fixed some datafield names - please delete the whole device folder and get them newly created.
* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/18) - Fixed creating the indexes when there is no according sensor
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Displaying Filter life value in hours again
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Creating additional Filter life value in percent
* (grizzelbee) Fix: removed materializeTab from ioPackage
* (grizzelbee) Fix: calling setState now as callback in createOrExtendObject
* (grizzelbee) Fix: Removed non compliant values for ROLE
* (grizzelbee) Fix: calling setState in callback of set/createObject now
* (grizzelbee) Fix: ensuring to clear all timeouts in onUnload-function

### 0.6.0 (2020-10-29) (Rage before the storm)
* (grizzelbee) New: [#17](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/17) - Added online-indicator for each device
* (grizzelbee) New: [#19](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/19) - Extended Password length from 15 characters to 32
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/20) - Improved errorhandling on http communication with Dyson API
* (grizzelbee) Fix: Fixed typo within data field anchorpoint - please delete the old ancorpoint manually.
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours

### 0.5.1 (2020-10-27) (Heart of the hurricance)
* (grizzelbee) Fix: Added missing clearTimeout

### 0.5.0 (2020-10-27) (Heart of the hurricance)
* (grizzelbee) New: Editable data fields have now appropiate value lists
* (grizzelbee) New: Added more country codes
* (grizzelbee) New: Target temperature of heater can now be set - **in the configured unit!**
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours
* (grizzelbee) Fix: [#6](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/6) - Changing the fanspeed does now fully work.  

### 0.4.1 (2020-10-16) (unbroken)
* (grizzelbee) New: [#8](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/8) - Documented ProductTypes for better overview and user experience in ReadMe
* (grizzelbee) New: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) - Added some Hot&Cool specific datafields
* (grizzelbee) New: Logging of from devices, when shutting down the adapter
* (grizzelbee) New: [#10](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/10) - Pollig device data every X (configurable) seconds for new data, hence sensors don't send updates on changing values
* (grizzelbee) New: [#11](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/11) - Added Austria and France to Country-List
* (grizzelbee) Fix: Fixed bug in error handling when login to Dyson API fails
* (grizzelbee) Fix: [#12](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/12) - Fixed Dyson API login by completely securing via HTTPS.
* (grizzelbee) Fix: Updated some descriptions in config
  
### 0.4.0 (2020-09-29)

* (grizzelbee) New: devices are now **controllable**
* (grizzelbee) New: state-change-messages are processed correctly now
* (grizzelbee) Fix: Added missing °-Sign to temperature unit
* (grizzelbee) Fix: Terminating adapter when starting with missing Dyson credentials
* (grizzelbee) Fix: NO2 and VOC Indices should work now
* (grizzelbee) Fix: Fixed build errors

### 0.3.0 (2020-09-27) - first version worth giving it a try

* (grizzelbee) New: Messages received via Web-API and MQTT getting processed
* (grizzelbee) New: datapoints getting created and populated
* (grizzelbee) New: Added config item for desired temperature unit (Kelvin, Fahrenheit, Celsius)
* (grizzelbee) New: Added missing product names to product numbers
* (grizzelbee) New: Hostaddress/IP is editable / configurable
* (grizzelbee) New: calculate quality indexes for PM2.5, PM10, VOC and NO2 according to Dyson App

### 0.2.0 (2020-09-22) - not working! Do not install/use

* (grizzelbee) New: Login to Dyson API works
* (grizzelbee) New: Login to Dyson AirPurifier (2018 Dyson Pure Cool Tower [TP04]) works
* (grizzelbee) New: mqtt-Login to [TP04] works
* (grizzelbee) New: mqtt-request from [TP04] works
* (grizzelbee) New: mqtt-request to [TP04] is responding

### 0.1.0 (2020-09-04) - not working! Do not install/use

* (grizzelbee) first development body (non functional)

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

Copyright (c) 2020 Hanjo Hingsen <hanjo@hingsen.de>