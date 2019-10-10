---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: 1ToEgJe7doDulYCX0KfF2YpHGeMzxNdZcpovXFyKcI8=
---
![Logo](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Anzahl der Installationen](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/rg-engineering/ioBroker.heatingcontrol/master.svg)

# IoBroker.HeatingControl
Adapter zur Steuerung Ihrer Heizungsanlage.

Eigenschaften:

* Kontrollieren Sie die Solltemperatur aller Thermostate nach Zeitplan
* Konfigurieren Sie mehrere Heizperioden für jeden Tag und jede Nacht
* Unterstützt verschiedene homematic und max! Thermostate
* unterstützt mehrere Profile
* Wenn keine direkte Verbindung zwischen Thermostat und Stellantrieb besteht, kann der Stellantrieb direkt aus dem Adapter geschaltet werden
* Derzeit wird der Antrieb bei Erreichen der Solltemperatur direkt abgeschaltet. Sobald die Solltemperatur unter der Isttemperatur liegt, wird der Antrieb eingeschaltet. (Aufgabe: Verbesserte Steuerung implementieren)
* Es werden unbegrenzt Thermostat, Stellantrieb und Sonde pro Raum unterstützt
* Thermostat, Stellantrieb und Sensor werden automatisch pro Raum erkannt. Hierzu wird die Funktion (zB "Heizen") verwendet.
* Räume können in der Admin-Oberfläche ausgeschlossen werden, wenn ein Raum einen Thermostat enthält, aber nicht gesteuert werden soll
* Sensor wird verwendet, um die Zieltemperatur zu senken (z. B. wenn ein Fenster geöffnet ist)
* Schnittstelle zum Feiertag-Adapter oder anderen zur Erkennung von Feiertagen. Der gesetzliche Feiertag kann ein normaler Tag oder ein ähnlicher Sonntag sein. (Administratoreinstellung)
* manuelle Übersteuerung der Temperatur für eine bestimmte Zeit
* vordefinierte Heizperiode
* Ein Visualisierungsbeispiel wird später bereitgestellt

## Die Einstellungen
### Main
* Funktion = Funktion zur Erkennung von Thermostaten, Antrieben und Sensoren pro Raum. Es ist eine der Systemaufzählungen
* timezone = Wird für Cron verwendet, um Cron-Jobs anzupassen
* Pfad zum Feiertag - Adapter = Wenn Sie den Feiertag-Adapter verwenden möchten, um automatisch einen Feiertag für heute zu erkennen, geben Sie hier den Pfad ein (z. B. feiertage.0).
* Alle Geräte löschen, wenn der Administrator öffnet = sollte deaktiviert sein. Aktivieren Sie diese Option nur, wenn Sie alle Raum-, Aktor- und Sensoreinstellungen löschen müssen. Eine Gerätesuche wird ausgeführt, wenn der Adapteradministrator geöffnet wird
* Verwendeter Sensor = Wenn Sie Fenstersensoren haben und die Zieltemperatur bei geöffnetem Fenster senken möchten, aktivieren Sie diese Option
* Verwendete Akteure = Wenn Sie Aktoren direkt vom Adapter aus steuern möchten. Nur für den Fall, dass keine direkte Verbindung zwischen Thermostat und Stellantrieb besteht.
* Antriebe verwenden, wenn keine Heizperiode = nur bei Antrieben gültig. Legt fest, wie Aktoren eingestellt werden, wenn keine Heizperiode aktiv ist
* Antriebe verwenden, wenn kein Thermostat vorhanden ist = nur gültig mit Antrieben. Wenn Sie Räume ohne Thermostat, aber mit Heizungsaktor haben, können Sie diese dauerhaft ein- oder ausschalten

### Profil
* Profiltyp = drei verschiedene Profiltypen (Montag - Sonntag oder Montag - Freitag und Suturday / Sonntag oder jeden Tag) werden unterstützt
* Anzahl der Profile = Wenn Sie mehr als ein Profil benötigen, erhöhen Sie diesen Wert. Sie können dann auswählen, welches Profil verwendet werden soll.
* Anzahl der Perioden = Definieren Sie, wie viele tägliche Abschnitte mit unterschiedlicher Temperatur Sie benötigen. Je mehr Sie einstellen, desto mehr Datenpunkte werden erstellt. Verwenden Sie besser einen niedrigen Wert (z. B. 5).
* "Feiertag wie Sonntag = Wenn Sie die Solltemperaturen an Feiertagen wie Sonntag einstellen möchten, aktivieren Sie diese Option. Anderenfalls sind die Feiertagseinstellungen dieselben wie an normalen Tagen
* HeatingPeriod = Start- und Enddatum der Heizperiode. Dient zum Einstellen von "HeatingPeriodActive".

### Geräte
* eine Liste aller Räume. Hier können Sie einen Raum deaktivieren.
* Klicken Sie auf die Schaltfläche Bearbeiten auf der rechten Seite, um das Einstellungsfenster für Thermostate, Aktoren und Sensoren für diesen Raum zu öffnen

### Bearbeitungsraum
* Hier können Sie Objekt-IDs für Thermostate, Aktoren und Sensoren überprüfen und einstellen
* Sie können manuell neue Thermostate, Aktoren oder Sensoren hinzufügen. Drücken Sie einfach die + Taste. Dann erhalten Sie eine leere Zeile, die gefüllt werden muss. Der Edit-Button öffnet eine Liste der verfügbaren Geräte im System
* Thermostate:

** Name, Temperaturziel-OID und aktuelle Temperatur-OID sollten eingestellt werden.

* Aktoren

** Name und OID für Status sollten festgelegt werden

* Sensoren

** Name und OID für den aktuellen Status sollten festgelegt werden

## Bedarf
* Node Version 8 oder höher ist erforderlich

## Probleme und Funktionswünsche
* Wenn Sie mit Fehlern konfrontiert sind oder Funktionsanfragen für diesen Adapter haben, erstellen Sie bitte ein Problem im Abschnitt "GitHub-Problem" des Adapters unter [github] (https://github.com/rg-engineering/ioBroker.heatingcontrol/issues) ). Jedes Feedback wird geschätzt und hilft, diesen Adapter zu verbessern.

## Changelog

### 0.3.0 (2019-10-xx)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) reset DeleteAll at next admin start 


### 0.2.3 (2019-09-20)
* (René) see issue #19: handling of enums created in iobroker admin fixed
* (René) see issue #13: check order of periods; if order is wrong (next time is smaller than previous) then time si not used for cron and a warning appears in log
* (René) see issue #21: check temperatures after changing of period settings (e.g. time)
* (René) see issue #25: select OID for target and current of thermostat in admin overworked
* (René) change datapoint type from bool to boolean


### 0.2.2 (2019-09-13)
* (René) see issue #14: description of datapoint time changed ('from' instead 'until')
* (René) see issue #12: unnecessary warnings removed
* (René) see issue #17: seconds removed from time list
* (René) datepoint change handling reworked
* (René) see issue #18: take over values from external PublicHoliday-datapoint

### 0.2.1 (2019-09-08)
* (René) bug fixes in actuator handling

### 0.2.0 (2019-09-05)
* (René) path to Feiertag-Adapter can also include a complete datapoint path 

### 0.1.0 (2019-08-25)
* (René) redesign of data structure
	- more then one actuator, sensor and thermostat per room
	- three different profile types
	- manual configuration of devices (if device is not detected automatically)
	- interface to Feiertag-Adapter
	- public holiday as normal day or like sunday (setting in admin)
	- window sensor support. Reduce target temperature when window is open
	- !!ATTENTION!! data structure/objects has been changed. You need to update your visualisation settings

### 0.0.5 (2019-07-08)
* (René) support for max! thermostats

### 0.0.4 (2019-06-23)
* (René) debugging

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License

Copyright (C) <2019>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.