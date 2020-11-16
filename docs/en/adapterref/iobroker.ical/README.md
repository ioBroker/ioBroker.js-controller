---
BADGE-Build Status: https://travis-ci.org/ioBroker/ioBroker.ical.svg?branch=master
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
BADGE-Github Issues: http://githubbadges.herokuapp.com/ioBroker/ioBroker.ical/issues.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ical.png?downloads=true
---
![Logo](ical.png)
# ioBroker iCal adapter
This adapter allows to read .ics files from specific URL and parse it (Google Calendar or iCal). 
Alternatively it is possible to use a local `.ics` file (use absolute path to the file instead of URL)


## Usage
Based on iCal Adapter for (CCU.IO)[https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] from vader722

### Adapter iCal
iCal adapter for ioBroker reads calendar files in `.ics` format from specified URL and writes events, that situated in the predefined time interval into ioBroker variable. Alternatively it is possible to use a local .ics file (use absolute path to the file instead of URL).
They can shown in VIS using `basic html - String (unescaped)` widget.

Two variables are created:
- `iCalReadTrigger`
- `iCalEvents`

The variable `iCalReadTrigger` is used to trigger the read-in process.
In the settings several URLs can be deposited, from which the calendar is read.
The calendars are then read in succession and the result is summarized.
Alternatively, the read command may also be given a URL, e.g. temporarily read another calendar.

To read in the defaultURLs, the string `read` must be written to the variable `iCalReadTrigger`.

To read from any URL, the string `read https: // ...` must be written to the variable `iCalReadTrigger`.

The result returns the iCal adapter in the variable `iCalEvents`.

By writing `check` to` iCalReadTrigger`, the check on events is triggered on the read data without re-reading the data.

Alternatively, the adapter can also automatically query the calendars in a definable interval (only with the `defaultURL`).
To do this, set the polling interval (in minutes) in the settings with the variable runEveryMinutes.

Meaning of the options in the config file:

- `preview`: 7 # means that appointments are displayed 7 days in advance
- `runEveryMinutes`: 30 # means that the adapter automatically rewists the calendar every 30 minutes. If 0 is not read automatically
- `colorize`: true # Today's appointments will be colored red, tomorrow's appointments will be orange, this option overrides the option everyCalOneColor
- `debug`: false # if true, extended output is written to the CCU.IO log
- `defColor`:` white` # sets the default color of the calendar entries
- `fulltime`: ` ` # determines by which string the time 00:00 is replaced for all day appointments. For spaces (between the quotes), the time is omitted for all-day appointments
- `replaceDates`: true # If true, today's date is replaced by the string todayString (for example, Today). Tomorrow's appointments through the string tomorrowString
- `everyCalOneColor`: false # If true, multiple calendars will have each calendar colored in a color to be specified. If the colorize option is set, this will not work!
- `Calendar1`:
    - "calURL": "http: //11111.ics", URL of the calendar
    - "calColor": "white" color of the calendar, if the option "everyCalOneColor" is set.
     
  Any number of calendars can be entered. The standard config file contains 2 calendars.
- `Events`:
  - `name`:" vacation ":
  - `enabled`: true # determines if the event will be edited
  - `display`: false # determines whether the event is also displayed in the iCalEvents, or only evaluated
  
  By setting an event (in this example "vacation"), the calendars are searched for the string "vacation".
  If an appointment with the keyword "vacation" is in a calendar, then automatically a state with the
  Name holiday set to True. If the appointment is over, the state is reset to false.
  A status is created for each day of the preview period. Danger!
  It is searched for a substring, i. an entry in the calendar "vacation" is recognized as well as a
  Entry "holiday parents". This must be taken into account when setting the events.
  
By adjusting the CSS in the VIS, the styles of today's (standard red) and tomorrow's dates (standard orange) can be set:
- `iCalWarn` - Newline calendar entry today
- `iCalPreWarn` - beginning of line calendar entry tomorrow
- `iCalNormal` - end of line from today
- `iCalNormal2` - tomorrow's end of line

### calendar
#### Apple iCloud Calendar
Apple iCloud calendars can be viewed if previously shared. It's best to create your own calendar for Homematic, as the calendar will be shared with everyone.
To do this, right-click on the calendar in the Calendar app and select Share Settings. Now check "Public Calendar" and copy the displayed URL. IMPORTANT: the url starts with webcal: // p0X-cale .....
`webcal` has to be replaced by` http`. Then enter this URL either in the settings at defaultURL, or specify it in `read URL`, eg. `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Google Calendar
To include a Google Calendar, you must go to the Google Calendar calendar setting (mouse click on the "down arrow" next to the calendar). The URL of the calendar can be found by clicking on the `ICAL` symbol next to the field" Private address ". Then enter this URL either in the settings at defaultURL, or specify it in `read URL`, eg. `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`.

#### OwnCloud Calendar
To include a hardcooked calendar of an OwnCloud, you have to approve this calendar in the calendar view in OwnCloud as a hardcourt calendar and there the link.

#### Baikal lightweight CalDAV+CardDAV Server
The Baikal server offers the "ics-export" plugin that allows to export a calendar as a single ICal file. This export plugin is selected with the URL and allows seamless integration with this ioBroker adaptor. Please add the export filter to the URL of your calendar (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`). If you encounter authentication issues, please change the `WebDAV authentication type` from `DIGEST` to `BASIC` in the admin settings of the WebUI of the Baikal server.

### CSS
In the generated HTML two kind of css classes are included to allow design freedom.

#### Timebased CSS classes
* _iCalNormal_/_iCalNormal2_: The Event started before today (and is still running) or later as in 3 days, default color without CSS and without a calendercolor is the configured adapter color
* _iCalWarn_/_iCalWarn2_: The Event starts today, default color without CSS and without a calendercolor is `red`
* _iCalPreWarn_/_iCalPreWarn2_: The Event starts tomorrow, default color without CSS and without a calendercolor is `orange`
* _iCalPrePreWarn_/_iCalPrePreWarn2_: The Event starts day after tomorrow, default color without CSS and without a calendercolor is `yellow`
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

## Filter
In instance options it is possible to maintain a filter per calendar. It have to be a semicolon separated list. If you enable the option `Filter as regular expression` the filter is interpreted as a regular expression. During calendar refresh all events that matches by description, location or summary are excluded.

The search pattern is:
```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

Blacklist: If you want to exclude all events of a specific location use `LOCATION:MyLocation` or simple `MyLocation` or 2 locations `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Whitelist: If you only want to include events of a specific location use regular expression like `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` or for 2 locations `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog

### 1.8.0 (2020-11-14)
* (klein0r) Moved html options to separate tab
* (klein0r) Added option to hide "arrow" on for running events
* (klein0r) Added feature to include past events (in days)

### 1.7.5 (2020-11-08)
* (Apollon77) Only handle events with a start date (Sentry IOBROKER-ICAL-1, IOBROKER-ICAL-2, IOBROKER-ICAL-4)
* (JensMaus) Update dependencies, fix some more issues

### 1.7.4 (2020-08-26)
* (Apollon77) Fix multiple parsing

### 1.7.3 (2020-08-26)
* (foxriver76) we pin a specific dependency version, because "rrule" package broken
* (foxriver76) added eslint

### 1.7.2 (2019-12-02)
* (bluefox) Documentation was changed

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

Copyright (c) 2014-2020, bluefox <dogafox@gmail.com>

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