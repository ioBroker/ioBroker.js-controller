---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ical/README.md
title: Verschoben nach https://github.com/iobroker-community-adapters/ioBroker.ical
hash: /dEGEh2OLhnN7Vq4SjzGTuFNCsZByXWpYSt6YkdfhlQ=
---
# Verschoben nach https://github.com/iobroker-community-adapters/ioBroker.ical
![Logo](../../../en/adapterref/iobroker.ical/admin/ical.png) ioBroker iCal-Adapter ===================

![Build-Status](https://travis-ci.org/ioBroker/ioBroker.ical.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/ical-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ical.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ical.svg)
![Github-Probleme](http://githubbadges.herokuapp.com/ioBroker/ioBroker.ical/issues.svg)
![NPM](https://nodei.co/npm/iobroker.ical.png?downloads=true)

Mit diesem Adapter können .ics-Dateien von einer bestimmten URL gelesen und analysiert werden (Google Calendar oder iCal). Alternativ ist es möglich, eine lokale .ics-Datei zu verwenden (absoluten Pfad zur Datei statt URL)

Siehe deustche [Version hier](README-de.md) (veraltet !!).

## Installieren
```
node iobroker.js add ical
```

## Verwendungszweck
Basierend auf dem iCal Adapter für (CCU.IO) [https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] von vader722

### Adapter iCal
Der iCal-Adapter für ioBroker liest Kalenderdateien im Format ".ics" von der angegebenen URL und schreibt Ereignisse, die sich im vordefinierten Zeitintervall befinden, in die ioBroker-Variable. Alternativ können Sie eine lokale .ics-Datei verwenden (verwenden Sie statt der URL den absoluten Pfad zur Datei).
Sie können in VIS mit dem Widget "basic html - String (unescaped)" angezeigt werden.

Es werden 2 Variablen angelegt

iCalReadTrigger iCalEvents Die Variable iCalReadTrigger dient zum Triggern des Einlesevorgangs. In den Einstellungen können mehrere URLs hinterlegt werden. Die Kalender werden dann nacheinander eingelesen und das Ergebnis zusammengefasst. Alternativ kann dem Lesebefehl auch eine URL mitgegeben werden, zeitweilig einen anderen Kalender einzulesen.

zum einlesen von den defaultURLs muss der String "read" in die Variable iCalReadTrigger geschrieben werden.
zum einlesen von einer beliebigen URL muss der String "read https:// ..." in der Variable iCalReadTrigger geschrieben werden.
Das Ergebnis liefert der iCal Adapter in der Variable iCalEvents.

Durch das Schreiben von "check" in iCalReadTrigger wird der Check-Vorgang auf den gelesenen Daten ohne erneutes Lesen der Daten ausgelöst.

Alternativ kann der Adapter auch in einem definierbaren Intervall die Kalender abfragen (nur mit der defaultURL). RunEveryMinutes das Abfrageintervall (in Minuten) einstellen.

Bedeutung der Optionen im Konfigfile:

- "preview": 7 heisst, dass Termine 7 Tage im voraus angezeigt werden
- "runEveryMinutes": 30 bedeutet für den Adapter automatisch alle 30min den Kalender neu einliesst. Bei 0 wird nicht automatisch eingelesen
- "colorize": true Termine am heutigen Tag werden rot gefärbt, Termine am morgigen Tag orange
- "debug": false bei true werden erweiterte Ausgaben in CCU.IO Log geschrieben
- "defColor": "Weiß" legt die Standardfarbe der Kalendereinträge fest
- "fulltime": "" legt fest durch den String bei ganztägigen Terminen die Uhrzeit 00:00 ersetzt wird. Bei Leerzeichen (zwischen den Hochkommas) wird dir die Uhrzeit bei ganztägigen Terminen weggelassen
- "replaceDates": true wird bei heutigen Terminen das heutige Datum durch den String todayString ersetzt (statt "Heute"). Bei morgigen Terminen durch den String tomorrowString
- "everyCalOneColor": "false" Wenn die Option colorize gesetzt, funktioniert dies nicht!
- "Calendar1": {"calURL": "http://11111.ics", URL des Kalenders "calColor": "weiße" Farbe des Kalenders, wenn die Option "anyCalOneColor" gesetzt ist . Im Standard Konfigfile sind 2 Kalender eingetragen.
- "Ereignisse": {"Urlaub": {"aktiviert": wahr, # legt fest, ob das Ereignis bearbeitet wird "anzeigen": falsch # legt fest, ob das Ereignis auch in dem iCalEvents angezeigt wird, oder nur ausgewertet wird} } Durch setzen eines Events (in diesem Beispiel „Urlaub“). Sollte ein Termin mit dem Stichwort „Urlaub“ in einem Kalender stehen, so wird automatisch ein Status mit dem Namen Urlaub auf True gesetzt. Ist der Termin vorbei, wird der Zustand wieder auf false gesetzt. Es wird für jeden Tag des Preview Zeitraums ein Status angelegt. Achtung! Es wird nach einem Substring gesucht, d.h. ein Eintrag im Kalender „Urlaub“ wird genauso erkannt wie ein Eintrag „Urlaub Eltern“. Dies ist beim Festlegen der Ereignisse zu berücksichtigen.

ICalWarn (Zeilenanfang Kalendereintrag heute) iCalPreWarn (Zeilenende von heute) iCalNormal2 (Zeilenende von heute) die Styles von heutigen (Standard rot) und morgigen Terminen (Standard Orange)

### Kalender
#### Apple iCloud Kalender
Apple iCloud Kalender werden angezeigt, wenn sie vorher freigegeben werden. Am besten einen eigenen Kalender für die Homematic anlegen.
Dazu mit der rechten Maustaste auf den Kalender in der Kalender App klicken und Freigabeeinstellungen auswählen. Jetzt einen Haken bei "Öffentlicher Kalender" setzen und die angezeigte URL kopieren. WICHTIG: die Url beginnt mit webcal: // p0X-cale .....
"webcal" muss durch "http" ersetzt werden. Diese URL dann entweder in den Einstellungen bei defaultURL eintragen, oder sie bei "URL lesen" angeben "readURL http://p-03-calendarws.icloud.com/xxxxxxxxx"

#### Google Kalender
Zum Einbinden eines Google Kalenders muss die Kalendereinstellung des Google Kalenders aufgerufen werden. Die URL des Kalenders erhält man durch das Symbol "ICAL" neben dem Feld "Privatadresse". Diese URL dann entweder in den Einstellungen bei defaultURL eintragen, oder sie bei "URL lesen" angeben "readURL https://www.google.com/calendar/ical/xxxxxxxx/basic.ics".

#### OwnCloud Kalender
Zum Kalender von gesharten Kalendern muss ein OwnCloud in der Kalenderansicht in OwnCloud angezeigt werden / USER / xxxxxxx_shared_by_xxxxxx? Export) entsprechend in den ioBroker.ical Adapter mit Nutzername und Passwort angeben.

### CSS
Im generierten HTML-Code sind zwei Arten von CSS-Klassen enthalten, um Gestaltungsfreiheit zu ermöglichen.

#### Zeitbasierte CSS-Klassen
* _iCalNormal _ / _ iCalNormal2_: Das Ereignis wurde vor dem heutigen Tag gestartet (und wird noch ausgeführt) oder später wie in 3 Tagen. Die Standardfarbe ohne CSS und ohne Kalenderfarbe ist die konfigurierte Adapterfarbe
* _iCalWarn _ / _ iCalWarn2_: Das Ereignis beginnt heute, Standardfarbe ohne CSS und ohne Kalenderfarbe ist "rot".
* _iCalPreWarn _ / _ iCalPreWarn2_: Das Event beginnt morgen, Standardfarbe ohne CSS und ohne Kalenderfarbe ist "orange".
* _iCalPrePreWarn _ / _ iCalPrePreWarn2_: Das Ereignis beginnt übermorgen, Standardfarbe ohne CSS und ohne Kalenderfarbe ist "gelb".

Die erste CSS-Klasse (z. B. iCalNormal) wird für den Datums- und Zeitabschnitt des HTML-Codes verwendet, und die zweite CSS-Klasse (z. B. iCalNormal2) wird für den Ereignisnamen verwendet.

CSS-Beispiel für diese CSS-Klassen, um die Ausgabe etwas anders zu formatieren (z. B. Datum / Uhrzeit links + Fett und Ereignisname rechts ...):

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

#### Kalenderbasierte CSS-Klassen
Jedem Bereich ist außerdem eine CSS-Klasse zugewiesen, die auf dem Namen des Kalenders basiert, in dem sich das Ereignis befindet. Der in der Adapterkonfiguration definierte "Kalendername" wird dafür verwendet (Leerzeichen werden durch Unterstriche ersetzt).

* _iCal- <Kalendername> _: Diese Klasse wird für Datum und Uhrzeit des HTML-Teils verwendet
* _iCal-> calendername2> _: Diese Klasse wird für den Ereignisnamen verwendet

Um diese CSS-Klassen festzulegen, müssen Sie auch die zeitbasierte CSS-Klasse verwenden, z. _.icalNormal2.iCal- <Kalendername> 2_:

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Beispiel für eine generierte HTML-Datei
```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

## Filter
In Instanzoptionen ist es möglich, einen Filter pro Kalender zu pflegen. Es muss eine durch Semikolons getrennte Liste sein. Wenn Sie die Option `Filter as regular expression` aktivieren, wird der Filter als regulärer Ausdruck interpretiert. Während der Kalenderaktualisierung werden alle Ereignisse, die nach Beschreibung, Ort oder Zusammenfassung übereinstimmen, ausgeschlossen.

Das Suchmuster ist:

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

Blacklist: Wenn Sie alle Ereignisse eines bestimmten Ortes ausschließen möchten, verwenden Sie `LOCATION:MyLocation` oder einfache `MyLocation` oder 2 Orte `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Whitelist: Wenn Sie nur Ereignisse eines bestimmten Ortes einschließen möchten, verwenden Sie reguläre Ausdrücke wie `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` oder für 2 Orte. `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Machen
* README sollte englisch sein
* `data.trigger` unterstützt die` check`-Option nicht

## Changelog

### 1.7.1 (2019-01-08)
* (twonky4) Fixed issue with UTC of until in recurring appointments
* (twonky4) Fixed possible empty color

### 1.7.0 (2018-11-27)
* (twonky4) Add filter option
* (twonky4) Add support of events for configured date period; changed state names from `events.*` to `events.0.today.*`
* (twonky4) Add Count of events for tomorrow - state `data.countTomorrow`
* (twonky4) Events without time part and same start and end are interpreted as full day events
* (twonky4) Remove special chars from event states

### 1.6.6 (2018-10-22)
* (twonky4) Fixed html for disabled colorize
* (twonky4) Fixed timezone handling for events during change from daylight saving time back to standard time
* (twonky4) Fixed events without end date moved to different day

### 1.6.5 (2018-10-13)
* (twonky4) Simplify timezone solution
* (twonky4) Fix calendars without timezones

### 1.6.4 (2018-10-12)
* (twonky4) Support windows timezones
* (twonky4) Don't fail on invalid timezones

### 1.6.3 (2018-10-10)
* (twonky4) Fixes timezone issue in fullday recurring appointments

### 1.6.2 (2018-10-08)
* (twonky4) Fixes timezone issue in recurring appointments

### 1.6.1 (2018-06-04)
* (Apollon77) Several fixes and optimizations

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

## License

The MIT License (MIT)

Copyright (c) 2014-2018, bluefox <dogafox@gmail.com>

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