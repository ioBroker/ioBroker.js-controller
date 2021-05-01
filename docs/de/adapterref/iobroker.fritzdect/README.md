---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.fritzdect.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fritzdect.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/fritzdect-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/fritzdect-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/foxthefox/iobroker.fritzdect.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/foxthefox/ioBroker.fritzdect/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.fritzdect.png?downloads=true
---
![Logo](../../admin/fritzdect_logo.png)
# Installationshinweise

## FritzBox Einstellungen

es muß ein Benutzer angelegt sein, der Zugriff auf die DECT Objecte hat


![fritzbox](fritzdect_einstellung.PNG)


falls ein spezieller user angelegt wurde (also nicht admin für iobroker benutzt wird), dann sind die Berechtigungen zu setzen und die Voreinstellung das sich nur admin anmeldet, muß auf Benutzer umgestellt werden.

![fritzbox](fritz_iobroker_user.PNG)

![fritzbox](fritz_user.PNG)


## Adapter Einstellungen

* IP mit vorangestellten "http://" eingeben
* Polling Intervall kann beliebig gewählt werden (Voreinstellung 5min=300sec). Dies ist notwendig um Bedienung ausserhalb von ioBroker nachzuführen, da die FritzBox keine automatischen Updates liefert.
![admin](fritzdect_admin.PNG)


## Adapter Start

mit dem Start des Adapters wird folgendes getan:
* die FW der Fritzbox wird abgefragt und im log geschrieben (manche Fritzboxen antworten darauf nicht und dies erzeugt ein Fehler).
* die Datenpunkte (Objekte) werden für Devices angelegt
* die Datenpunkte (Objekte) für Gruppen werden angelegt
* die Objekte werden mit Daten versorgt

Die folgenden Objekte werden nur einmalig beim Start geschrieben:
* id
* fwversion
* manufacturer
* productname
* masterdviceid
* members

## Thermostatfunktion

Das Thermostat kann im Automatikmodus betrieben werden (Temperaturregelung) und hierbei wird auf die Solltemperatur geregelt.
Die Solltemperatur kann die Komfortemperatur, die Absenktemperatur oder eine selbst gewählte Temperatur sein.

Zusätzlich kann das Ventil komplett geschlossen werden und die entspricht dem Zustand OFF.
Die andere Richtung kann mit ON auch vorgewählt werden und würde einem BOOST oder Saunamodus entsprechen (nicht vergessen es wieder regeln zu lassen ;-) ).

Diese derzeitig 3 Betriebsarten sind mit 0, 1 oder 2 im Datenpunkt mode vorwählbar.
Bei der Vorwahl von 0-AUTO wird die letzte Solltemperatur angewählt.

### Temperatur mit Offset
Es besteht die Möglichkeit die gemessene Temperatur in der FritzBox zu korrigieren, dazu gibt man die gemessene Temperatur an und es ergibt sich ein Offset. Dieser Offset wird für den Datenpunkt .temp mit berücksichtigt. Hier erhält man also die interne Temperaturmessung.
Die intern im Heizkörperregler benutzte Ist-Temperatur (actualtemp), wird durch den Offset auch verändert. D.h. der HKR regelt intern auf den korrigierten Wert.
Vergleichbar für den Soll-/Istverlaufs ist demnach atualtemp und targettemp.

## Troubleshooting

Es ist ratsam das log anzuschauen, sofern nicht aussagekräftig oder zu wenig Information ist der debug modus über die Experteneinstellung der Instanz vorzuwählen.

## Changelog
### 2.1.14
* operationmode and hkrmode tracking also after commands
* extended datapoints for blinds from Rollotron
* presence=0 was detected but not written to the datapoint, now corrected (skipping the updated is not affected)

### 2.1.13
* correction at group of switches (switchtype not recognized -> simpleonoff)
* functionbitmask 32768 moved to role: switches

### 2.1.12 (npm)
* new values for DECT500
* back to full unit testing

### 2.1.11 (npm)
* template for fritzfon

### 2.1.10
* comfort/night is AUTO but reintroduced as operationmode

### 2.1.9
* info to user after start of adapter

### 2.1.8
* simpleonoff plug as device/group/template (telekom)

### 2.1.7 (npm)
* boostactivetime/windowactivetime only value

### 2.1.6
* pbkdf2 hash correction in calculation

### 2.1.5
* pbkdf2 hash correction in output to fritzbox

### 2.1.4
* removed the dependency to vis

### 2.1.3
* presence=0 continue

### 2.1.2
* withoit info.connection

### 2.1.1
* error handling in msgbox

### 2.1.0
* more refactoring => adapter based on class, gitCI instead of travisCI
* new thromastat buttons (setmodeauto, setmodeon,setmodeoff)

### 2.0.0 Breaking Changes in datapoints and structures (npm)
* refactoring of the code
* new fritzapi to either used md5 or pbkf2 decryption, needed for fritzbox FW >7.24
* **usage of AHA API returned values as datapoint identifier**
* **grouping of buttons under the DECT440**
* DECT500 groups
* accepting blocktime from fritzbox
* announcing new detected datapoints delivered by fritzbox
* option strictSSL (experimental)


### 1.1.4 (npm)
* blinds control
* update testing

### 1.1.3 (npm)
* setcolor cmd correction
* only valid color temperatures for white

### 1.1.2
* merge boost and boost active
* merge windowopen and windowopenactive
* DECT440 test

### 1.1.1 (npm)
* getColorDefaults in Admin, prepared but format of xml can no

### 1.1.0
* new features of AVM API 1.33
    * setblind
	* sethkrboost
	* setwindowopen
	* txbusy, windowopenactiveendtime,  boostactiveendtime, boostactive
* fade duration
* DECT440
* DECT500

### 1.0.1 (npm)
* bugfixes in fritz API calls
* error code 303 (but unknown what it means)
* (Black-Thunder) targetTemp=null
* (PascalBru) datapoint nextchange in hkr 

### 1.0.0 Breaking Change for non-native API objects
* merge of fritzapi into repo directly including added DECT500 commands
* **no longer support of non-native API calls (scraping of website)**
    * GuestWLAN
    * BatteryCharge
    * OS version
* correction of timestamp to date conversion for DECT400

### 0.3.2 (npm)
* new states in heater group, operationList and operationMode

### 0.3.1 (npm)
* (scrounger) new states in COMET, operationList and operationMode

### 0.3.0 (npm)
* new DECT500 supported (without commands)

### 0.2.5 (npm)
* fixed testing
* correction for indication of actualtemp in heater groups
* connection type and datasource added in io-package.json
* correction pf switch and alert state (boolean in update routine)

### 0.2.4 (npm)
* (Scrounger) correction of type mismatch (string boolean)

### 0.2.3 (npm)
* skip updating values, when device not present

### 0.2.2 (npm)
* added FritzDECT400 incl. testing
* removed offset in temp value
* new datapoint offset
* added template for switches
* added template testing

### 0.2.1 (npm)
* gulp added
* correction for DECT100 without temperature (caused a stop in creation of objects)
* template creation corrected
* my templates added in admin page

### 0.2.0
* compact mode

### 0.1.5 (npm)
* reading and activation of templates added
* correction of actual temperature in DECT200 and COMET (now offset recognized)
* password now hidden typed and encrypted
* new datapoint actualtemp for Comet
* fritzapi 0.10.5

### 0.1.4 (npm)
* button added, only send the timestamp of last click
* fritzapi 0.10.4

### 0.1.3 (npm)
* windowopenactiv added to thermostat

### 0.1.2  (npm)
* errorcode string->number
* batterylow -> boolean
* switch in admin for non native API call for battery charge in % (shall prevent 403 message logs)

### 0.1.1 (npm)
* switch for GuestWLAN when no access is granted and polling creates an error
* check for devices in admin page for better access to the xml/json stream from fritzbox
* admin v3 implemented

### 0.1.0 (npm)
* major code change to use the xml stream instead the dedicated API-commands for the dedicated values
* creation of objects according the feedback from fritzbox
* support of groups
* still usage of non-universal object names
* more objects

### 0.0.14 (npm)
* correction of temp offset influence

### 0.0.13 (npm)
* DECT200 voltage new object
* DECT200 mode/lock value polling
* Comet mode as number and not array
* ADMIN v3

### 0.0.12 (npm)
* changed state to  mode AUTO/OFF/ON for thermostat (including datapoint lasttarget when going back to AUTO)
* added name state for thermostat
* DECT100 temperature reading
* Contact reading

### 0.0.11 (npm)
* added state OFF/ON for thermostat

### 0.0.10 (npm)
* change to object oriented interface
* getOSversion when starting for log

### 0.0.9 (npm)
* values '1' accepted for ON
* values '0' accepted for OFF

### 0.0.8 (npm)
* messages info-> debug
* values 1/true/on/ON accepted for ON
* values 0/false/off/OFF accepted for OFF

### 0.0.7 (npm)
* current temp of Comet/DECT300
* cyclic polling GuestWLAN

### 0.0.6 (npm)
* correction targettemp in DECT200 section

### 0.0.5 (npm)
* setTemp on COMET
* GuestWlan corrected

### 0.0.4 (npm)
* cyclic status polling

### 0.0.3 (npm)
* user now configurable

### 0.0.2 (npm)
* metro widget for Dect200
* smartfritz-promise->fritzapi
* running version, tested with 1x DECT200 and Fritzbox FW=6.51 on Win10 with 4.5.0 and raspberry 4.7.0

### 0.0.1
* running version, tested with 1x DECT200 and Fritzbox FW=6.30

## License

The MIT License (MIT)

Copyright (c) 2018 - 2021 foxthefox <foxthefox@wysiwis.net>