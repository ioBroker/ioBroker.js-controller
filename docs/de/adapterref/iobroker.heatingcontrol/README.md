---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: CzrM2sVnQGvb4GqUv79oQsY4U9EUf8OID4uDnT/3EqU=
---
![Logo](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Anzahl der Installationen](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)

# IoBroker.HeatingControl
** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

** Wenn es Ihnen gefällt, ziehen Sie bitte eine Spende in Betracht: **

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

## Adapter zur Steuerung Ihres Heizungssystems.
Eigenschaften:

* Kontrollieren Sie die Solltemperaturen aller Thermostate nach Zeitplan
* Konfigurieren Sie mehrere Heizperioden für jeden Tag und jede Nacht
* Unterstützt alle Arten von Thermostaten (Voraussetzung: Es muss in ioBroker verfügbar sein)
* Homematic Device Autodetection
* unterstützt mehrere Profile
* Wenn keine direkte Verbindung zwischen dem Thermostat und dem Stellantrieb besteht, kann der Stellantrieb direkt aus dem Adapter herausgeschaltet werden
* Derzeit wird der Antrieb direkt ausgeschaltet, wenn die Solltemperatur erreicht ist. Sobald die Solltemperatur unter der Isttemperatur liegt, wird der Antrieb eingeschaltet. (Zu tun: verbesserte Kontrolle implementieren)
* Eine unbegrenzte Anzahl von Thermostaten, Aktuatoren und Söhnen pro Raum wird unterstützt
* Thermostat, Aktuator und Sensor werden automatisch pro Raum erkannt. Hierfür wird die Funktion (zB "Heizen") verwendet.
* Räume können innerhalb der Administrationsoberfläche ausgeschlossen werden, wenn ein Raum einen Thermostat enthält, aber nicht gesteuert werden sollte
* Sensor wird verwendet, um die Zieltemperatur zu reduzieren (z. B. wenn ein Fenster geöffnet ist); optional mit SensorDelay
* Schnittstelle zum Feiertag-Adapter oder anderen zur Erkennung von Feiertagen. Feiertag kann ein normaler Tag oder wie ein Sonntag sein. (Administratoreinstellung)
* Manuelle Temperaturüberschreitung für eine bestimmte Zeit
* vordefinierte Heizperiode
* Änderungen vom Thermostat übernehmen (optional)
* Die Visualisierung von [Pittini] (https://github.com/Pittini/iobroker-heatingcontrol-vis) wird unterstützt. Vielen Dank!

[FAQ](doc/FAQ.md)

## Installation
## Die Einstellungen
### Main
* Funktion = Funktion zur Erkennung von Thermostaten, Aktuatoren und Sensoren pro Raum. Es ist eines der Systemaufzählungen
* Zeitzone = Wird für Cron verwendet, um Cron-Jobs anzupassen
* Pfad zum Feiertag - Adapter = Wenn Sie den Feiertag-Adapter verwenden möchten, um den Feiertag für heute automatisch zu erkennen, legen Sie hier den Pfad fest (z. B. Ereignisseage.0).
* Alle Geräte löschen, wenn der Administrator geöffnet wird = sollte deaktiviert sein. Aktivieren Sie es nur, wenn Sie alle Raum-, Aktor- und Sensoreinstellungen löschen müssen. Eine Gerätesuche wird ausgeführt, wenn der Adapteradministrator geöffnet wird
* Sensor verwendet = Wenn Sie Fenstersensoren haben und die Zieltemperatur bei geöffnetem Fenster senken möchten, aktivieren Sie diese Option
* Aktuatoren verwendet = wenn Sie Aktuatoren direkt vom Adapter aus steuern möchten. Nur für den Fall, dass keine direkte Verbindung zwischen Thermostat und Stellantrieb besteht.
* Aktuatoren verwenden, wenn keine Heizperiode = nur gültig mit Aktuatoren. Definiert, wie Aktuatoren eingestellt werden, wenn keine Heizperiode aktiv ist
* Aktuatoren verwenden, wenn kein Thermostat verfügbar ist = nur gültig mit Aktuatoren. Wenn Sie Räume ohne Thermostat, aber mit Heizungsaktuator haben, können Sie diese dauerhaft ein- oder ausschalten

### Profil
* Profiltyp = Es werden drei verschiedene Profiltypen (Montag - Sonntag oder Montag - Freitag und Suturday / Sonntag oder jeden Tag) unterstützt
* Anzahl der Profile = Wenn Sie mehr als das Profil benötigen, erhöhen Sie diesen Wert. Sie können dann auswählen, welches Profil verwendet werden soll.
* Anzahl der Perioden = Definieren Sie, wie viele tägliche Abschnitte mit unterschiedlicher Temperatur Sie benötigen. Je mehr Sie festlegen, desto mehr Datenpunkte werden erstellt. Verwenden Sie besser einen niedrigen Wert (z. B. 5).
* "Feiertag wie Sonntag = Wenn Sie an Feiertagen wie Sonntag Zieltemperaturen festlegen möchten, aktivieren Sie diese Option. Ansonsten sind die Einstellungen für Feiertage dieselben wie an normalen Tagen
* Heizperiode = Start- und Enddatum der Heizperiode. Wird verwendet, um "HeatingPeriodActive" einzustellen

### Geräte
* eine Liste aller Räume. Hier können Sie ein Zimmer deaktivieren.
* Drücken Sie die Bearbeitungstaste auf der rechten Seite, um das Einstellungsfenster für Thermostate, Aktuatoren und Sensoren für diesen Raum zu öffnen

### Bearbeitungsraum
* Hier können Sie Objekt-IDs für Thermostate, Aktoren und Sensoren überprüfen und einstellen
* Sie können manuell neue Thermostate, Aktuatoren oder Sensoren hinzufügen. Drücken Sie einfach die + Taste. Dann erhalten Sie eine leere Zeile, die ausgefüllt werden muss. Die Schaltfläche Bearbeiten öffnet eine Liste der verfügbaren Geräte im System
* Thermostate:

** Name, Temperaturziel-OID und aktuelle Temperatur-OID sollten eingestellt werden.

* Aktuatoren

** Name und OID für Status sollten festgelegt werden

* Sensoren

** Name und OID für den aktuellen Status sollten festgelegt werden

## Datenpunkte
| DP-Name | Beschreibung |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | Wenn diese Option deaktiviert ist, werden die Profile nicht verwendet |
| AktuellesProfil | aktuelles Profil auswählen (1 basierend, bedeutet, dass Profil 1 Datenpunkte unter Heizungssteuerung.0.Profile.0 verwendet) |
| LastProgramRun | Zeigt das letzte Mal an, wenn der Adapter ausgeführt wird |

### Temperaturabnahme / -erhöhung
| DP-Name | Beschreibung | Zieltemperatur für relative Abnahme | Zieltemperatur für absolute Abnahme |
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| GästePräsentieren | Temperatur erhöhen, weil Gäste es wärmer wollen | Erhöhen Sie die aktuelle Profiltemperatur um Profile.0.room.GuestIncrease | Setzen Sie das Ziel auf Profiles.0.room.absolute.GuestIncrease |
| PartyNow | Temperatur senken, weil es heiß wird '| Verringern Sie die aktuelle Profiltemperatur um Profile.0.room.PartyDecrease | Setzen Sie das Ziel auf Profiles.0.room.absolute.PartyDecrease |
| Gegenwart | wir sind anwesend, wenn wir nicht anwesend sind, verringern wir die Temperatur Verringern Sie die aktuelle Profiltemperatur um Profile.0.room.AbsentDecrease | Setzen Sie das Ziel auf Profiles.0.room.absolute.AbsentDecrease |
| VacationAbsent | wir sind abwesend, also auch am wochenende abnehmen | Verringern Sie die aktuelle Profiltemperatur um Profile.0.room.VacationAbsentDecrease | Setzen Sie das Ziel auf Profiles.0.room.absolute.VacationAbsentDecrease |

* In beiden Fällen wird nur eine Absenkung verwendet (in der vorherigen Version des Adapters konnten mehr als eine Entfettung verwendet werden)
* Im absoluten Entfettungsszenario werden nur Zielwerte ungleich 0 °C verwendet. Wenn Sie für einen bestimmten Raum keine Absenkung benötigen, halten Sie die Abnahmewerte bei 0 ° C.

### Keine Heizperiode
Es gibt drei Möglichkeiten

* Temperatur pro Raum festlegen

Wenn diese Option ausgewählt ist, wird für jeden Raum ein neuer Datenpunkt im Objektbaum angezeigt. Hier können Sie eine feste Zieltemperatur einstellen, die eingestellt wird, wenn die Heizperiode nicht aktiv ist.

* Temperatur für alle Räume festlegen

Mit dieser Option können Sie eine Zieltemperatur für jeden Raum verwenden, wenn die Heizperiode nicht aktiv ist

* nichts

Mit dieser Option wird nichts an den Thermostat gesendet, wenn keine Heizperiode aktiv ist. Die Zieltemperatur bleibt vom letzten Taget erhalten, als die Heizperiode noch aktiv war.
In diesem Fall und wenn Sie Aktuatoren aus dem Adapter verwenden, haben Sie die Möglichkeit zu definieren, wie Aktuatoren eingestellt werden sollen (aus, ein oder lassen Sie es wie es ist).

## Andere
* HolidayPresent

Wenn HolidayPresent auf true gesetzt ist, wird in jedem Fall das Profil für Sonntag verwendet. Wir gehen davon aus, dass Sie wie am Sonntag zu Hause sind.

* PublicHolidyToday

Es besteht die Möglichkeit, PublicHoliday wie Sonntag zu behandeln. Diese Option kann in admin aktiviert werden.

### Fenster geöffnet
Wenn "Sensoren verwenden" aktiv ist und die Sensoren für einen Raum konfiguriert sind

a) Verringern Sie die aktuelle Profiltemperatur, wenn das Fenster geöffnet ist (true), um Profiles.0.room.WindowOpenDecrease, wenn die relative Verringerung konfiguriert ist. b) Setzen Sie das Ziel auf Profiles.0.room.absolute.WindowOpenDecrease, wenn das Fenster geöffnet ist (true), wenn das absolute Fenster abnimmt ist konfiguriert

optional kann eine Verzögerung verwendet werden. Wenn das Fenster nur für eine kurze Zeit geöffnet wird, kann eine Sensorverzögerung verhindern, dass sie in sehr kurzen Zeiten reduziert und wieder normal wird.

## Ical Unterstützung
Sie können Ihren Kalender verwenden, um Datenpunkte im Adapter zu ändern.
Konfigurieren Sie einfach Ereignisse von ical in admin. Unterstützt werden

* Heizungssteuerung.0.Present
* Heizungssteuerung.0.HolidayPresent
* Heizungssteuerung.0.VacationAbsent
* Heizungssteuerung.0.GästePräsent
* Heizungssteuerung.0.PartyNow

## Änderungen vom Thermostat verwenden
Viele Benutzer fragten nach einer Option, um Änderungen vom Thermostat in den Adapter zu übernehmen. Nun sind vier Optionen implementiert:

| Option | Beschreibung | -------------------------- | --------------------- -------------------------------------------------- ---------------- | nein | Änderungen vom Thermostat werden ignoriert als Überschreibung | Änderungen vom Thermostat werden als Außerkraftsetzung angesehen; Die Übersteuerungszeit muss im Voraus in der Heizungssteuerung.0.Rooms.RoomName.TemperaturOverrideTime | eingestellt werden | Wenn die Überschreibzeit nicht eingestellt ist, wird die Überschreibung nicht ausgeführt als neue Profileinstellung | Änderungen vom Thermostat werden als Zieltemperatur für die aktuelle Profilperiode verwendet bis zum nächsten Profilpunkt | Änderungen vom Thermostat werden als Zieltemperatur bis zum nächsten Profilpunkt verwendet. Dies ist ein manueller Modus, daher werden nur Fenstersensoren verwendet. Alle anderen | | Erhöhungen / Verringerungen werden ignoriert. In jedem Raum befindet sich ein Datenpunkt, um den manuellen Modus zu deaktivieren, bevor der nächste Profilpunkt erreicht wird.

## Thermostat behandelt "Fenster ist offen"
Einige Thermostate können "Fenster ist offen" von selbst handhaben. In diesen Fällen wird eine direkte Verbindung zwischen Fenstersensor und Thermostat konfiguriert und der Thermostat reduziert die Zieltemperatur beim Öffnen eines Fensters um das Selbst.
In Kombination mit der Option "Verwendung von Änderungen vom Thermostat" / "bis zum nächsten Profilpunkt" führt dies zu einem unerwarteten manuellen Zustand. In dieser Situation würde die reduzierte Temperatur bis zum nächsten Profilpunkt verwendet.
Aber der Adpater kann mit diesem Verhalten umgehen. Sie müssen die Option "Thermostat behandelt 'Fenster ist offen'" aktivieren und Sie können Fenstersensoren auch im Adapter konfigurieren.
Beim Öffnen des Fensters wartet der Adapter auf max. 3 Sekunden für neue Zieltemperatur vom Thermostat. Wenn es in dieser Zeit eine neue Zieltemperatur erhält, wird es als reduzierte absolute Temperatur verwendet. Der Status lautet dann "Automatisches Fenster öffnen". Sobald das Fenster geschlossen wird, kehrt der Status zu Auto zurück und der Thermostat setzt die ursprüngliche Zieltemperatur zurück. **Achtung** Verwenden Sie in diesem Fall keine Sensoröffnungsverzögerung. Wenn Sie es verwenden, wird das Ereignis "Fenster öffnen" nach der vom Thermostat empfangenen Zieltemperatur angezeigt. Dies endet im manuellen Zustand.

## Probleme und Funktionsanforderungen
* Wenn Sie auf Fehler stoßen oder Funktionsanforderungen für diesen Adapter haben, erstellen Sie bitte ein Problem im GitHub-Problemabschnitt des Adapters unter [github] (https://github.com/rg-engineering/ioBroker.heatingcontrol/issues) ). Jedes Feedback wird geschätzt und hilft, diesen Adapter zu verbessern.

## Bekannte Probleme
### Adapter mit homematischer IP Fußbodenheizungsaktor HmIP-FAL230-C10 - 10fach, 230 V.
Es scheint, dass HmIP-FAL230-C10 nicht direkt als Aktuator in Kombination mit diesem Adapter verwendet werden kann. Wenn Sie HmIP-FAL230-C10 zusammen mit homematischen Thermostaten verwenden, sollte dies funktionieren.
siehe auch [Forum](https://forum.iobroker.net/topic/22579/test-adapter-heatingcontrol-v1-0-x/1553)

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll angezeigt wird, an Sentry gesendet. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die im Grunde nie abstürzen.

## Changelog

### 2.0.0 (2021-01-xx)
* (René) internal refactoring

**ATTENTION: breaking changes !!!!**
* complete internal refactoring (new source files, internal data structures, code review, ...)
* **Periods and Profils count from 1 instead 0**
* ChangesFromThermostat adjustable per room is removed
* recalculation of room temperature is performed only for the room where necessary (in previous versions all rooms were recalculated and new value transmitted)
* SensorOpenDelay / SensorCloseDelay renamed
* ResetButton to disable manual mode (and go back to auto)
* status log per room
* complete profile can be saved and loaded in admin
* copy profile (complete or for a single room) and periods (for a certain profile and room) by button supported
* datapoint selector for external datapoints added in admin
* autodectection for thermostats, sensors and actuators completely overworked
* room detection overworked
* limits and step widh for profil temperatures adjustable in admin for Pittini vis
* simple window status view (in html) for Pittini vis added
* room state as simple html table for vis added
* (optionally) extend override when temperature is changed; in standard new temperature is set, but timer is not changed
* (optionally) Thermostat handles "window is open"
* issues in github: 
	* #161 Profil springt zur angegebenen Zeit nicht um
	* #153 cron Probleme beim ändern eines Profils mittels Javascript
	* #152 Fenstererkennung im manuellen Modus
	* #148 Bei Änderung vom Thermostat bis zum nächsten Profilpunkt müssen Sensoren berücksichtigt werden


### 1.1.2 (2020-11-11)
* (René) bug fix: activate actors after temperatur change

### 1.1.0 (2020-11-01)
* (René) see issue #149: bug fix: calculate current period in case we are still in last period from yesterday

### 1.1.0 (2020-10-20)
* (René) see issue #132: timer before on and off for actuators 
* (René) see issue #143: additional checks to avoid unneccessary override 
* (René) see issue #140: use guests present and party now DP's also as counter like present (as a option); add adjustable counter limit for present, party now and guest present
* (René) see issue #145: avoid reset of target temperatur by profile settings in option "until next profil point" when set by thermostat 

### 1.0.0 (2020-10-09)
* (matida538) added better Handling of strings in HandleThermostat (convert to Number, instead of warn) (e.g. fhem connector for fht80)
* (matida538) changed Check4ValidTemperature to convert strings to Number instead of Int (else we lose information e.g. 18.5 will be 18)
* (René) some smaller code optimisations

### 0.6.0 (2020-09-15)
* (René) see issue #123: use window open / close delay only when window state changed
* (René) see issue #122: better log for different type warning
* (René) see issue #120: override from thermostat only if it's different to current settings
* (René) see issue #126: TestThermostat should not be checked for correct configuration
* (René) see issue #124: vis from Pittini: Image for open / closed window adjustabel (as an option, if nothing is configured the original will be used)
* (René) see issue #127: use value from thermostat until next profile point 
* (René) see issue #128: try to convert string data to number

### 0.5.7 (2020-07-07)
* (René) see issue #116: get MinimumTemperature for vis only if enabled

### 0.5.6 (2020-06-14)
* (René) see issue #113: re-order of rooms added
* (René) see issue #112: bug fix "Fensterübersicht"

### 0.5.4 (2020-06-04)
* (René) bug fix: HeatingControlVis avoid exceptions like "Cannot read property 'val' of null"

### 0.5.3 (2020-06-03)
* (René) bug fix: new temperatures set when current profile is changed
* (René) refactoring HeatingControlVis to avoid exceptions like "Cannot read property 'val' of null"

### 0.5.2 (2020-05-25)
* (René) bug fix: log a warning if actors are configured but UseActors are off

### 0.5.1 (2020-05-22)
* (René) log a warning if actors are configured but UseActors are off
* (René) sentry added
* (René) some hints in admin

### 0.5.0 (2020-05-03)
* (René) see issue #101: sensor close delay added (similar to already existing sensor open delay)
* (René) see issue #103: date/time format string corrected for vis
* (René) see issue #104: bug fix to take over changes from vis
* (René) see issue #102: bug fix change current time period to be shown on vis

### 0.4.0 (2020-05-02)
* (René) see issue #70: use changes from thermostat
* (René) see issue #91 bug fix: if the same sensor is configured for more than one room thermostat target temperature will be set for all configured rooms
* (René) script from Pittini integrated to support his visualization [Pittini](https://github.com/Pittini/iobroker-heatingcontrol-vis) 
* (Dutchman) some refactoring 

### 0.3.19 (2020-03-15)
* (René) create correct cron job for sunday if profile type "every day" is used
* (René) see issue #87: change type of time data points to string
* (René) see issue #87: set correct roles for data points
* (René) see issue #84: set default value for minimum temperature
* (René) see issue #86: all "float" converted to "number""

### 0.3.18 (2020-03-08)
* (René) fix issues reported by adapter checker

### 0.3.17 (2020-03-01)
* (René) check datapoint configuration: if datapoint points to itself then error messages
* (René) support of new vis see issue  #76
* (Rene) thermostat mode if no heating period

### 0.3.16 (2020-02-09)
* (René) deccrease/increase-handling also when Override is active (see issue #72)
* (René) priority handling for temperature increase / decrease overworked (use only values not equal zero)

### 0.3.15 (2020-01-18)
* (René) bug fix: avoid exception when go to override if MinTemperature-check is active

### 0.3.14 (2020-01-12)
* (René) format conversion for temperatures in string to number
* (René) ack for MinTemperature

### 0.3.13 (2019-12-28)
* (René) bugfix create cron jobs for profile type 3 (daily)

### 0.3.12 (2019-12-27)
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: RoomState is not defined] 

### 0.3.11 (2019-12-27)
* (René) option: minimum temperature per room
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: PublicHolidyToday is not defined] 

### 0.3.10 (2019-12-26)
* (René) see issue #54: stop override with OverrideTemperature =0
* (René) new priority for lowering reasons
* (René) handling of actuators without thermostat
* (René) see issue #66: handle lowering in time between 0:00 and first period
* (René) see issue #64: import of configuration fixed

### 0.3.9 (2019-12-14)
* (René) see issue #60: sensor delay
* (René) see issue #57: support of the same sensor for different rooms
* (René) bug fix: "AbsentDecrease not defined" for relative lowering

### 0.3.8 (2019-12-12)
* (René) see issue #59: TemperaturOverride: acceppt hh:mm and hh:mm:ss
* (René) PartyNow support by iCal 
* (René) if useActuators: show how many actuators are active (as a datapoint)

### 0.3.7 (2019-11-29)
Attention: some changes in datapoints!!
* (René) see issue  #53: moved datapoints for relative lowering into "relative"
* (René) new datapoint to show lowering decrease mode (heatingcontrol.0.TemperatureDecreaseMode)
* (René) guest present as interface to ical
* (René) see issue #52: support radar adapter
* (René) all external states checked when adapter starts

### 0.3.6 (2019-11-23)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)
* (René) support of more then one instance

### 0.3.4 (2019-11-09)
* (René) bug fix in data point name

### 0.3.3 (2019-11-08)
Attention: some changes in datapoints!!
* (René) in admin: new buttons to add search new rooms
* (René) bug fix: in profil type Mo-Fr / Sa- So period order check failed  
* (René) see issue #38: new datapoint for WindowIsOpen
* (René) change datapoint "CurrentTimePeriod" to "CurrentTimePeriodFull", "CurrentTimePeriod" and "CurrentTimePeriodTime"
* (René) bugfix datapoint name "Sa-Su"
* (René) see issue #16: new datapoint "state" per room to show reason for temperatur change 
* (René) change format of LastProgramRun date / time

### 0.3.2 (2019-11-01)
* (René) try to convert temperature to number if NaN
* (René) see issue #33: check for heating period when adapter starts
* (René) fix a problem in subscription function when room can not be found 

### 0.3.1 (2019-10-31)
* (René) see issue #42 and #44: check all sensors per room and set state when adapter starts
* (René) show message in admin when adapter is not online
* (René) pre-define devicelist; add dummy thermostat, if list is empty

### 0.3.0 (2019-10-27)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) see issue #35: delete of devices
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

Copyright (C) <2019-2021>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.