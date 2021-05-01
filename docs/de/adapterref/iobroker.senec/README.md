---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.senec.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.senec.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/senec-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/senec-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/nobl/iobroker.senec.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.senec/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.senec.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/nobl/ioBroker.senec/master.svg
---
![Logo](/admin/senec.png)
# ioBroker.senec

## SENEC Adapter für ioBroker
Der Adapter wurde für Senec Home V2.1 Systeme entwickelt.
Im Senec.Home System können keine Werte verändert werden. Auf die Einbindung der Sicherheitsladung wurde bewusst verzichtet.
Senec stellt derzeit über die Webschnittstelle auch keine zuverlässige Möglichkeit mehr zur Verfügung, das Peak Shaving zu beeinflussen. Hierzu muss mein-senec.de bemüht werden.
Ob andere Systeme (z.B. V3) ebenfalls damit funktionieren, ist davon abhängig, ob diese ebenfalls auf lala.cgi basieren und die gleichen JSON Informationen zur Verfügung stellen.
Auch bei Einbindung in die Senec.Clound ist nicht gewährleistet, dass die Daten weiterhin über die Webschnittstelle abgerufen werden können (hierzu bitte Erfahrungsberichte).

Systeme, die funktionieren dürften, da sie die gleiche Schnittstelle nutzen sind nachfolgend gelistet. Allerdings können die Datenpunkte unterschiedlich sein (fehlen, zusätzlich, geändert).
* Senec Home 4.0 / Blei
* Senec Home 6.0 Pb
* Senec Home 8.0 / Blei
* Senec Home 10.0 Pb
* Senec Home 5.0/7.5/10.0 / Lithium
* Senec Home 15.0 / Lithium
* Senec Home V2 5.0/7.5/10.0
* Senec Home V2 10.0 / Blei
* Senec Home V2.1 1ph / Lithium
* Senec.Home V3 Hybrid
* Senec.Home V3 Hybrid duo
* Senec Business 30.0 / Blei
* Senec Business V2 30.0 / Blei
* Senec Business 25.0 / Lithium
* Senec Business V2_2ph / Lithium
* Senec Business V2 3ph / Lithium
* ADS Tec
* OEM LG
* Solarinvert Storage 10.0 / Blei,

### SENEC.Home
Es handelt sich um ein System, dessen Herzstück ein Lithium-Ionen-Akku ist, der Strom speichert und wieder abgibt, der von der Solaranlage auf dem Dach erzeugt wird. Das funktioniert genau wie beim Akku im Smartphone, Notebook oder dem Akkuschrauber. Es steckt im Prinzip auch die gleiche bewährte Technologie drin. Wenn du mehr Strom auf dem Dach erzeugst, als du selbst im Haus verbrauchen kannst, fließt der Strom nicht ins Netz, sondern in deinen Speicher. Du kannst ihn dann nutzen, wenn es dunkel wird oder Wolken aufziehen und du weniger oder keinen Strom mehr erzeugst. Dann kannst du auch abends mit deinem eigenen Solarstrom den Fernseher betreiben oder das Essen kochen. 

## Voraussetzungen vor der Installation
Voraussetzungen für den Betrieb eines Senec.Home Speichersystems mit ioBroker, ist die erfolgreiche Einrichtung des Systems durch einen Elektriker. Ebenfalls muss sich das System im gleichen Netzwerk wie der ioBroker befinden.

### Installation
Eine Instanz des Adapters wird über die ioBroker Admin-Oberfläche installiert. 
Nach Abschluss der Installation einer Adapterinstanz öffnet sich automatisch ein Konfigurationsfenster.

## Konfiguration

### Fenster "Haupteinstellungen"
![Main Settings](media/mainSettings.png "Haupteinstellungen")

| Feld         | Beschreibung |                                                                       
|:-------------|:-------------|
|SENEC System    |Hier wird die IP-Adresse des gewünschten Senec.Home Systems angegeben werden. Falls im Netzwerk ein funktionierender DNS existiert, kann auch der FQDN angegeben werden.|
|Abfrageintervall hohe Priorität|Hier wird eingegeben, in welchen Zeitintervallen (Millisekunden) die Werde hoher Priorität vom Senec.Home Systems abgerufen werden. (Default: 10 Sekunden)|
|Abfrageintervall niedrige Priorität|Hier wird eingegeben, in welchen Zeitintervallen (Millisekunden) die Werde niedriger Priorität vom Senec.Home Systems abgerufen werden. (Default: 60 Minuten)<br>
Achtung! Wird das SENEC System mit zu hoher Frequenz abgefragt, kann dies dazu führen, dass keine Daten mehr an die SENEC Server übermittelt werden können! (z.B. keine aktuellen Werte in der App oder auf mein-senec.de)|
|Request-Timeout|Hier wird eingegeben, nach wievielen Millisekunden eine Anfrage spätestens vom Senec.Home System beantwortet sein muss, bevor die Anfrage abgebrochen wird. (Default: 5000)|
|Wiederholungsversuche|Hier wird angegeben, wie oft versucht werden soll, das Senec System anzufragen, falls es zu einem Fehler kommt. Dies gilt nicht beim Start des Adapters - sollte das System dabei nicht erreichbar sein, beendet der Adapter seine Arbeit. (Default: 10)|
|Polling-Wiederholungsfaktor|Mit diesem Wert kann der Abstand zwischen den Wiederholungsversuchen beeinflusst werden. Es gilt: der n'te Wiederholungsversuch erfolgt nach Intervall * Multiplikator * n Sekunden nach Versuch n-1. Beispiel: Mit Standardwerten erfolgt der 1. Wiederholungsversuch 20 Sekunden nach dem initialen Versuch und der 2. Wiederholungsversuch erfolgt 40 Sekunden nach dem 1. Ein erfolgreicher Datenabruf setzt den Zähler für Wiederholungen zurück.|

Nach Abschluss der Konfiguration wird der Konfigurationsdialog mit `SPEICHERN UND SCHLIEßEN` verlassen. 
Dadurch erfolgt im Anschluß ein Neustart des Adapters.

## Instanzen
Die Installation des Adapters hat im Bereich `Objekte` eine aktive Instanz des sonnen Adapters angelegt.

Auf einem ioBroker Server können mehrere Senec Adapter Instanzen angelegt werden. Umgekehrt kann ein Senec.Home System auch mit mehreren ioBroker Servern betrieben werden. Sollen mehrere Geräte von einem ioBroker Server gesteuert werden, sollte je System eine Instanz angelegt werden.
<br/><br/>
Ob der Adapter aktiviert und mit dem System verbunden ist, wird mit der Farbe des Status-Feldes der Instanz verdeutlicht. Zeigt der Mauszeiger auf das Symbol, werden weitere Detailinformationen dargestellt. 

## Objekte des Adapters
Im Bereich `Objekte` werden in einer Baumstruktur alle vom Adapter im Hub erkannten Geräte und Aktivitäten aufgelistet.

Nachfolgend werden die Objekte in States unterteilt.
Jeder Datenpunkt ist mit seinem zugehörigen Datentyp sowie seinen Berechtigungen aufgeführt. 
Berechtigungen können dezeit nur lesend (R) sein. Jeder Datenpunkt kann mindestens gelesen (R) werden.
Zur Suche nach einem bestimmten Datenpunkt empfiehlt sich die Suche mittels der Tastenkombination "STRG + F".
Abhängig vom individuellen System können States nicht existieren oder aber auch nicht dokumentierte States auftreten.
Falls zu einem State keine Dokumentation vorhanden ist, jemand aber weiß, was der State darstellt, bitte ich um einen entspr. Pull-Request (oder Ticket mit der entspr. Information eröffnen).

### Beispiel States (verfügbare States sind abhängig von System und Softwarestand)

#### Channel: info

* info.connection

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, wenn die Verbindung zwischen ioBroker und Senec.Home hergestellt ist.*
   
#### Channel: BMS

* BL[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt: ? für jeden Battery Pack.*
   
* CHARGED_ENERGY[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Energie je Battery Pack geladen wurde. Einheit: ?*
   
* CHARGE_CURRENT_LIMIT[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die Ladeleistung je Battery Pack in Ampere ist.*
   
* CURRENT[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Ampere jeder Battery Pack aktuell hat.*
   
* CYCLES[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele Ladezyklen jeder Battery Pack hat.*
   
* DISCHARGED_ENERGY[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Energie aus einem Battery Pack ausgespeist wurde. Einheit: ?*
   
* DISCHARGE_CURRENT_LIMIT[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welche Entladeleistung jeder Battery Pack aktuell hat.*
   
* FW[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welche Firmwareversion ein Battery Pack aktuell hat.*
   
* HW_EXTENSION[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welche Hardware Erweiterung der jeweilige Battery Pack hat.*
   
* HW_MAINBOARD[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welche Hardwareversion das Mainboard des jeweiligen Battery Pack hat.*
   
* MAX_CELL_VOTAGE[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die maximale Voltzahl des einzelnen Battery Pack ist.*
   
* MIN_CELL_VOTAGE[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die minimale Voltzahl des einzelnen Battery Pack ist.*
   
* SN[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie die Seriennummer des einzelnen Battery Pack lautet.*
   
* SOC[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie der Ladezustand des einzelnen Battery Pack ist.*
   
* SOH[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie der Gesundheitszustand des einzelnen Battery Pack ist.*
   
* STATUS[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie der Status des einzelnen Battery Pack ist.*
   
* TEMP_MAX[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die maximale Temperatur des einzelnen Battery Pack ist.*
   
* TEMP_MIN[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die minimale Temperatur des einzelnen Battery Pack ist.*
   
* VOLTAGE[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die Volt des einzelnen Battery Pack sind.*
   
* BMS_READY_FLAG

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, falls das BMS bereit ist.*
   
* MODULES_CONFIGURED

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele Module im System konfiguriert sind.*
   
* MODULE_COUNT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele Module im System angeschlossen sind (inkl. nicht konfigurierter).*
   
* START_UPDATE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, falls ein Update zu starten ist.*
   
* WIZARD_ABORT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, der Einrichtungsprozess unterbrochen wurde.*
   
* WIZARD_CONFIRM

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, der Einrichtungsprozess bestätigt wurde.*
   
* WIZARD_DCCONNECT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, der Einrichtungsprozess ?.*
   
* WIZARD_START

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, der Einrichtungsprozess gestartet wurde.*
   
* WIZARD_STATE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welchen Status der Einrichtungsprozess hat.*

#### Channel: ENERGY

* GUI_BAT_DATA_CURRENT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die den aktuellen Batteriestrom in Ampere angibt.*
   
* GUI_BAT_DATA_FUEL_CHARGE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die den Füllstand in % des Systems angibt.*
   
* GUI_BAT_DATA_VOLTAGE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die die derzeitige Batteriespannung in Volt angibt*
   
* GUI_BAT_DATA_POWER

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Watt gerade in die Batterie eingespeist werden oder aus ihr entnommen (negativer Wert) werden.*
   
* GUI_BOOSTING_INFO

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, dessen Sinn bisher nicht eindeutig klar ist.*
   
* GUI_CHARGING_INFO

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, der angibt, ob die Batterie gerade geladen wird.*
   
* GUI_GRID_POW

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Watt gerade aus dem Netz gezogen oder ins Netz eingespeist (negativer Wert) werden.*
   
* GUI_HOUSE_POW

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Watt gerade vom Haus verbraucht werden.*
   
* GUI_INVERTER_POWER

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Watt vom PV System gerade erzeugt werden.*
   
* STAT_HOURS_OF_OPERATION

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die die Betriebsstunden des Systems angibt.*
   
* STAT_MAINT_REQUIRED

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, der angibt, ob das System gewartet werden muss.*
   
* STAT_STATE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die den Zustand des Systems repräsentiert.*
   
* STAT_STATE_Text

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbare Zeichenkette, die den Zustand des Systems in Klartext angibt. Leider liegen uns nur die original Senec-Texte in Deutsch vor.*
   
#### Channel: STATISTIC

* STAT_DAY_BAT_CHARGE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele kWh heute in der Batterie gespeichert wurden.*
   
* STAT_DAY_BAT_DISCHARGE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele kWh heute aus der Batterie entnommen wurden.*
   
* STAT_DAY_E_GRID_EXPORT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele kWh heute ins Netz eingespeist wurden.*
   
* STAT_DAY_E_GRID_IMPORT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele kWh heute aus dem Netz bezogen wurden.*
   
* STAT_DAY_E_HOUSE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die den heutigen Hausverbrauch in kWh angibt.*
   
* STAT_DAY_E_PV

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele kWh heute von der PV Anlage produziert wurden.*
   
   
#### Channel: SYS_UPDATE

* NPU_IMAGE_VERSION

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, mit dem Wert für Revision NPU-IMAGE (*

* NPU_VER

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die mit dem Wert für Revision NPU-REGS*

* UPDATE_AVAILABLE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, der angibt, ob ein Update vorhanden ist (diese werden allerdings von Senec zur Verfügung gestellt und auch automatisiert eingespielt).*
   
   
#### Channel: WIZARD

* APPLICATION_VERSION

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbarer Text, mit dem Wert für Revision MCU.*

* CONFIG_LOADED

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, der angibt, ob die Konfiguration geladen wurde (dieser Wert sollte nicht dauerhaft auf falsch stehen).*
   
* INTERFACE_VERSION

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbarer Text, mit dem Wert für Revision GUI.*
   
* SETUP_NUMBER_WALLBOXES

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele Wallboxen im System konfiguriert sind.*
   
* SETUP_WALLBOX_SERIAL[0..3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbarer Text, die die Seriennummern der evtl. vorhandenen Wallboxen 0-3 angibt.*

## Changelog
### 1.1.1 (NoBl)
* Object attributes are updated to what they are expected to be: unit, description, datatype (this will break anything that still relies on datapoints being STRING that aren't meant to be string)

### 1.1.0 (NoBl)
* Updated to current adapter template
* Integrated GitHub Testing and auto npm publishing
* Some other administrative updates

### 1.0.13 (NoBl)
* Added System Description 19 for Senec.Home V3 Hybrid (Credits to noffycws)
* Added Mode Descriptions for 86-91. (Credits to noffycws)

### 1.0.12 (NoBl)
* Just set 'supportCustoms' to false so it won't show up in admin custom config.

### 1.0.11 (NoBl)
* Update to current adapter template
* Added Datapoints: PV1.MPP_CUR, MPP_VOL, MPP_POWER (former: MPP_INT which is unused at this moment but does still exist)
* Added Datapoints (please feedback any improvements for their descriptions, ...): FEATURES.SGREADY, WIZARD.SETUP_WALLBOX_MAX_TOTAL_CURRENT_BY_GRID, WIZARD.SG_READY_CURR_MODE, BMS.ERROR, BMS.RECOVERLOCKED, BMS.SERIAL, BMS.START_SELFTEST, BAT1.RESET, BAT1.SELFTEST_ACT, BAT1.SELFTEST_LIMIT, BAT1.SELFTEST_OFF, BAT1.SELFTEST_OVERALL_STATE, BAT1.SELFTEST_STATE, BAT1.SELFTEST_STEP, BAT1.SELFTEST_TIME, BAT1.SERIAL, BAT1.TRIG_ITALY_SELF, BAT1OBJ1.COMM, GRIDCONFIG.AU_SOFT_RAMP_EN, GRIDCONFIG.AU_VRR_MAX, GRIDCONFIG.AU_VRR_MIN, GRIDCONFIG.AU_VVAR_PERCENTAGE, GRIDCONFIG.AU_VVAR_P_MAX, GRIDCONFIG.AU_VVAR_P_MIN, GRIDCONFIG.AU_VVAR_VOLTAGE, GRIDCONFIG.AU_VWC_VOLTAGE, GRIDCONFIG.AU_VWD_VOLTAGE, GRIDCONFIG.CEI_SEGNALE_ESTERNO, GRIDCONFIG.VDELVFRTDISABLE, GRIDCONFIG.VDEURMSMAX10

### 1.0.10 (NoBl, smartpran)
* DateType objects are stored as date again
* changed WIZARD.SETUP_POWER_RULE unit to '%'
* changed name of STATISTIC.STAT_SUM_E_PU to "STAT_SUM Energy PowerUnit"
* changed name of STATISTIC.STAT_SUM_E_WB to "STAT_SUM Energy Wallbox"
* changed name of STATISTIC.LIVE_WB_ENERGY to "Live Wallbox Energy"
* changed name of STATISTIC.LIVE_PU_ENERGY to "Live PowerUnit Energy"
* changed name of WIZARD.PWRCFG_PEAK_PV_POWER to "Configured Peak PV Power"
* enforcing conversion of number values to Number(). Otherwise they are created as String in ioBroker (manually delete existing datapoints in ioBroker to change them!)
* fixed representation for temp values (off by *10)
* json delivers a non-value (apparently an error message produced by senec itself). Ignoring that.
* Added variable mpp_int to high priority and changed unit it. (smartpran)

### 1.0.9 (NoBl)
* IP types are shown as IP again.
* added datapoints for FACTORY along with more state descriptions for Battery Type, Country and System Type.
* added datapoints for GRIDCONFIG

### 1.0.8 (NoBl)
* Added more states to known states (please feedback if they need special handling (unit, special description, value modification, ...))
* Bugfix in creating debug data
* Unknown states are now reported in debug instead of info.
* Code cleanup

### 1.0.7 (NoBl)
* Reading all known states from SENEC.
* Split states into high/low priority (heavy requesting the SENEC system renders it unable to sync with the SENEC datacenter!).
* Updated adapter-core and testing versions along with current dev dependencies. Removed node 8 support.
* Added more state descriptions to manual. But need input on these and those that are still not documented.

### 1.0.6 (NoBl)
* Moved senec states and state attributes to libs
* Added missing state descriptions

### 1.0.5 (2020-03-07) (NoBl)
* Added States for: Energy: GUI_BAT_DATA_VOLTAGE, GUI_BAT_DATA_CURRENT, STAT_HOURS_OF_OPERATION; Sys_update: NPU_VER, NPU_IMAGE_VERSION, Wizard: APPLICATION_VERSION, INTERFACE_VERSION
* Readme and Documentation (EN exists, now) updated
* Changed behavior for unknown values completely. They will now be stored as string plus prefixed with "REPORT TO DEV:" so users can easily report back what needs updating.
* added handling for "st_" values in json
* added additional configuration options
* changed retry-behaviour in case of connection issues, ...

### 1.0.4 (2020-03-06)
* (NoBl) Repo URL updated
### 1.0.3 (2020-03-06)
* (NoBl) added link to documentation in german
### 1.0.2 (2020-03-04)
* (NoBl) added missing status codes (85 in total now)
* (NoBl) added status code to status message for easier reference
* (NoBl) added states for wallboxes and battery modules
### 1.0.1
* (NoBl) updated readme
### 1.0.0
* (NoBl) initial release

## License
MIT License

Copyright (c) 2021 Norbert Bluemle <github@bluemle.org>

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