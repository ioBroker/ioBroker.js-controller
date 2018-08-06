![Logo](media/ical.png)
ioBroker iCal adapter
=================
[![Build Status](https://travis-ci.org/ioBroker/ioBroker.ical.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.ical)
[![NPM version](http://img.shields.io/npm/v/iobroker.ical.svg)](https://www.npmjs.com/package/iobroker.ical)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ical.svg)](https://www.npmjs.com/package/iobroker.ical)
[![Github Issues](http://githubbadges.herokuapp.com/ioBroker/ioBroker.ical/issues.svg)](https://github.com/ioBroker/ioBroker.ical/issues)

[![NPM](https://nodei.co/npm/iobroker.ical.png?downloads=true)](https://nodei.co/npm/iobroker.ical/)

This adapter allows to read .ics files from specific URL and parse it (Google Calendar or iCal). Alternatively it is possible to use a local .ics file (use absolute path to the file instead of URL)

Siehe deustche [Version hier](README-de.md) (outdated!!).

## Install
```
node iobroker.js add ical
```

## Usage
Based on iCal Adapter for (CCU.IO)[https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] from vader722

### Adapter iCal
iCal adapter for ioBroker reads calendar files in ".ics" format from specified URL and writes events, that situated in the predefined time interval into ioBroker variable. Alternatively it is possible to use a local .ics file (use absolute path to the file instead of URL).
They can shown in VIS using "basic html - String (unescaped)" widget.


Es werden 2 Variablen angelegt

iCalReadTrigger
iCalEvents
Die Variable iCalReadTrigger dient zum Triggern des Einlesevorgangs. In den Settings können mehrere URLs hinterlegt werden, von welchen der Kalender eingelesen wird. Die Kalender werden dann nacheinander eingelesen und das Ergebnis zusammengefasst. Alternativ kann dem Lesebefehl auch eine URL mitgegeben werden, um z.B. zeitweilig einen anderen Kalender einzulesen.

zum Einlesen von den defaultURLs muss der String "read" in die Variable iCalReadTrigger geschrieben werden.
zum Einlesen von einer beliebigen URL muss der String "read https://..." in die Variable iCalReadTrigger geschrieben werden.
Das Ergebnis liefert der iCal Adapter in die Variable iCalEvents.

Durch schreiben von "check" in iCalReadTrigger wird der Check-Vorgang auf Events auf die gelesenen Daten ohne erneutes einlesen der Daten ausgelöst.

Alternativ kann der Adapter auch automatisch in einem definierbaren Intervall die Kalender abfragen (nur mit der defaultURL). Dazu in den Settings mit der Variablen runEveryMinutes das Abfrageintervall (in Minuten) einstellen.

Bedeutung der Optionen im Konfigfile:

- "preview" : 7 heisst, dass Termine 7 Tage im voraus angezeigt werden
- "runEveryMinutes": 30 bedeutet dass der Adapter automatisch alle 30min den Kalender neu einliesst. Bei 0 wird nicht automatisch eingelesen
- "colorize": true Termine am heutigen Tag werden rot gefärbt, Termine am morgigen Tag orange, diese Option überstimmt die Option everyCalOneColor
- "debug": false bei true werden erweiterte Ausgaben ins CCU.IO Log geschrieben
- "defColor": "white" legt die Standardfarbe der Kalendereinträge fest
- "fulltime": " " legt fest durch welchen String bei ganztägigen Terminen die Uhrzeit 00:00 ersetzt wird. Bei Leerzeichen (zwischen den Hochkommas) wird dir Uhrzeit bei ganztägigen Terminen weggelassen
- "replaceDates": true Bei true wird bei heutigen Terminen das heutige Datum durch den String todayString ersetzt (z.B. "Heute"). Bei morgigen Terminen durch den String tomorrowString
- "everyCalOneColor": " false Bei true wird bei mehreren Kalendern jeder Kalender in einer festzulegenden Farbe eingefärbt. Ist die Option colorize gesetzt, funktioniert dies nicht!
- "Calendar1": { "calURL": "http://11111.ics", URL des Kalenders "calColor": "white" Farbe des Kalenders, wenn die Option "everyCalOneColor" gesetzt ist } es können beliebig viele Kalender eingetragen werden. Im Standard Konfigfile sind 2 Kalender eingetragen.
- "Events": { "Urlaub": { "enabled": true, # legt fest, ob das Event bearbeitet wird "display": false # legt fest, ob das Event auch in dem iCalEvents angezeigt wird, oder nur ausgewertet wird } } Durch setzen eines Events (in diesem Beispiel „Urlaub“), werden die Kalender nach dem String „Urlaub“ durchsucht. Sollte ein Termin am heutigen Tage (ganztägige Termine) oder zur aktuellen Uhrzeit mit dem Stichwort „Urlaub“ in einem Kalender stehen, so wird automatisch eine Variable mit dem Namen Urlaub auf True gesetzt. Ist der Termin vorbei, wird die Variable wieder auf false gesetzt. Die Variablen werden automatisch ab der Adresse 80110 angelegt. Achtung ! Es wird nach einem Substring gesucht, d.h. ein Eintrag im Kalender „Urlaub“ wird genauso erkannt wie ein Eintrag „Urlaub Eltern“. Dies ist beim festlegen der Ereignisse zu berücksichtigen.
Durch Anpassen der dashui-user.css können die Styles von heutigen (Standard rot) und morgigen Terminen (Standard Orange) festegelegt werden: iCalWarn (Zeilenanfang Kalendereintrag heute) iCalPreWarn (Zeilenanfang Kalendereintrag morgen) iCalNormal (Zeilenende von heute) iCalNormal2 (Zeilenende von morgen)

### Kalender
#### Apple iCloud Kalender
Apple iCloud Kalender können angezeigt werden, wenn sie vorher freigegeben werden. Am besten einen eigenen Kalender für die Homematic anlegen, da der Kalender fuer alle freigegeben wird.
Dazu mit der rechten Maustaste auf dem Kalender in der Kalender App klicken und Freigabeeinstellungen auswählen. Jetzt einen Haken bei "Öffentlicher Kalender" setzen und die angezeigte URL kopieren. WICHTIG: die Url beginnt mit webcal://p0X-cale.....
"webcal" muss durch "http" ersetzt werden. Diese URL dann entweder in den Settings bei defaultURL eintragen, oder sie bei "read URL" angeben, also z.B. "readURL http://p-03-calendarws.icloud.com/xxxxxxxxx"

#### Google Kalender
Zum Einbinden eines Google Kalenders muss die Kalendereinstellung des Google Kalenders aufgerufen werden (mit der Maus auf "runter Pfeil" neben dem Kalender klicken). Die URL des Kalenders bekommt man durch klicken auf das "ICAL" Symbol neben dem Feld "Privatadresse". Diese URL dann entweder in den Settings bei defaultURL eintragen, oder sie bei "read URL" angeben, also z.B. "readURL https://www.google.com/calendar/ical/xxxxxxxx/basic.ics".

#### OwnCloud Kalender
Zum Einbinden von gesharten Kalendern einer OwnCloud muss man dort in der Kalenderansicht in OwnCloud diesen Kalender als gesharten Kalender freigeben und dort den Link zum Kalender anzeigen lassen und diese URL (https://owncloud.xxxxxx.de/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) entsprechend in den ioBroker.ical Adapter mit Nutzername und Passwort angeben.

### CSS
In the generated HTML two kind of css classes are included to allow design freedom.

#### Timebased CSS classes
* _iCalNormal_/_iCalNormal2_: The Event started before today (and is still running) or later as in 3 days, default color without CSS and without a calendercolor is the configured adapter color
* _iCalWarn_/_iCalWarn2_: The Event starts today, default color without CSS and without a calendercolor is "red"
* _iCalPreWarn_/_iCalPreWarn2_: The Event starts tomorrow, default color without CSS and without a calendercolor is "orange"
* _iCalPrePreWarn_/_iCalPrePreWarn2_: The Event starts day after tomorrow, default color without CSS and without a calendercolor is "yellow"
The first CSS class (e.g. iCalNormal) is used for the date and time part of the HTML and the second CSS class (e.g. iCalNormal2) is used for the Event name.

CSS example for those CSS classes to format the output a bit different (e.g. date/time left+bold and Eventname right ...):

```
.icalWarn{
    color:red;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPreWarn{
    color:yellow;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPrePreWarn{
    color:white;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPrePreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalNormal{
    color:green;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalNormal2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Calender-based CSS classes
Each span also has a CSS class assigned based on the name of the calendar the event is in The "calendar name" defined in the adapter configuration is used for this (spaces are replaced by underscores).

* _iCal-<calendername>_: This class is used for the date and time part of the HTML
* _iCal->calendername2>_: This class is used for the Event name

To set these CSS classes you need to use the timebased CSS class too, e.g. _.icalNormal2.iCal-<calendername>2_:

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Example of generated html

```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

## Todo
* Known issue: For recurring events it works to delete single events, but it do not work to move them
* README should be english

## ChangeLog

### 1.6.0 (2018-04-13)
* (Apollon77) Several fixes and optimizations
* (Apollon77) Upgrade node-ical library to allow big files to work
* (Apollon77) Better handling of full day events
* (Apollon77) Allow "Replace 0:00" to have 30 characters

### 1.5.3 (2018-03-24)
* (Apollon77) Also make location available in data table

### 1.5.2 (2018-03-23)
* (Apollon77/BuZZy1337) Fix several display issues

### 1.5.0 (2018-03-07)
* (bluefox) ready for Admin3

### 1.4.2 (2018-02-21)
* (Apollon77) Also display events that started before today

### 1.4.1 (2018-02-05)
* (Apollon77) also allow events without end parameter and assume an 0minute event then and set end = start

### 1.4.0 (2018-01-01)
* (Apollon77) allow multiple Events to be contained in one calendar entry. Make sure the names are unique enough because the search only checks for existance of the event name in the text.
* (Apollon77) correctly detect events that started before 0:00
* (Apollon77) also show events with no duration (sometimes used as reminders)
* (Apollon77) correctly show end times for events that are longer then 1 day (including "+x" to show day duration)
* (Apollon77) many enhancements and optimizations in formatting the infos (especially when event has already started but not ended)
* (Apollon77) add option to hide year numbers
* (Apollon77) add own CSS classes to each entry with the names iCal-<calendername> and iCal-<calendername>2 to be able to really design it as needed
* (Apollon77) Known issue: For recurring events it works to delete single events, but it do not work to move them

### 1.3.3 (2017-10-30)
* (DutchmanNL) Translate to Netherlands

### 1.3.2 (2017-02-24)
* (jens-maus) added singular form for 'days'

### 1.3.1 (2017-02-20)
* (jens-maus) implemented support for date excludes for recurring events

### 1.3.0 (2017-02-17)
* (jens-maus) switched ical module to use 'node-ical' which should improve ics format compatibility

### 1.2.2 (2017-02-17)
* (jens-maus) added changes to show "Noch X Tage" for fullday events (e.g. school holidays)

### 1.2.1 (2017-02-11)
* (jens-maus) applied workaround of ics files with TZID before DATE in DTSTART/DTEND

### 1.2.0 (2016-07-23)
* (bluefox) allow read from files
* (bluefox) add tests
* (bluefox) fix all day indication

### 1.1.3 (2016-07-19)
* (bluefox) fix error if entry is invalid
* (bluefox) use newer ical packet version

### 1.1.2 (2015-06-30)
* (jens-maus) implemented some more text replacement terms
* (jens-maus) we only colorize the date+time for imminent appointments
* (jens-maus) added cloneextend dependency definition and fix for dayafter mods
* (jens-maus) ported the "dayafter" change of the ccu.io ical adapter to the iobroker

### 1.1.1 (2015-08-16)
* (bluefox) enable auth only if user set.

### 1.1.0 (2015-08-13)
* (elmars) Added ability to provide username/password to authenticate against protected ics files. Tested with owncloud.

### 1.0.2 (2015-07-21)
* (bluefox) fix error if ICS file has empty lines

### 1.0.1 (2015-07-21)
* (bluefox) change readme title

### 1.0.0 (2015-07-21)
* (bluefox) fix error with set event to false

### 0.1.1 (2015-06-14)
* (bluefox) add additional fields for ioBroker.occ

### 0.1.0 (2015-03-24)
* (bluefox) make it compatible with new concept

### 0.0.2 (2015-02-22)
* (bluefox) fix error with configuration
* (bluefox) fix error with event object creation

### 0.0.1 (2015-02-17)
* (bluefox) initial commit
