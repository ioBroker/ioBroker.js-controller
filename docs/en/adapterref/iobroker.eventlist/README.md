![Logo](admin/eventlist.png)
# ioBroker.eventlist

[![NPM version](http://img.shields.io/npm/v/iobroker.eventlist.svg)](https://www.npmjs.com/package/iobroker.eventlist)
[![Downloads](https://img.shields.io/npm/dm/iobroker.eventlist.svg)](https://www.npmjs.com/package/iobroker.eventlist)
![Number of Installations (latest)](http://iobroker.live/badges/eventlist-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/eventlist-stable.svg)
[![Dependency Status](https://img.shields.io/david/bluefox/iobroker.eventlist.svg)](https://david-dm.org/bluefox/iobroker.eventlist)
[![Known Vulnerabilities](https://snyk.io/test/github/bluefox/ioBroker.eventlist/badge.svg)](https://snyk.io/test/github/bluefox/ioBroker.eventlist)

[![NPM](https://nodei.co/npm/iobroker.eventlist.png?downloads=true)](https://nodei.co/npm/iobroker.eventlist/)

## Event-List adapter for ioBroker
Allows to define the states that must be logged in event list.

The list can be shown in admin, web, vis, saved as PDF, material (not yet implemented).

Additionally, you can send events via Telegram or WhatsApp.

![List](img/list.png)

![PDF](img/pdf.png)

## Alarm mode
The events could be generated only in alarm mode.
The alarm mode could be controlled by variable `eventlist.X.alarm`.
 
Additionally, the messages to messengers could be sent only if alarm mode is ON.

Use case:
- E.g. door sensor can send the messages only if nobody is home. Else the events about door opening will be only collected in the event list.  

## Possible presentations

### In Admin as tab
You can enable the event list as a tab in the admin.

### Web
Event list could be shown under `http://<IP>:8082/eventlist/index.html`. (for instances > 0: `http://<IP>:8082/eventlist/index.html?X`, where X is the instance number)

### Vis Widget
Event list can be displayed as vis widget. 

### PDF generation
There is a possibility to generate a PDF document with all events.

Document title can consist the generation date if you place the pattern into it: `Event list on {{YYYY MM DD}}`. 
The exactly description of time format could be found here: https://momentjs.com/docs/#/displaying/format/

The generation of PDF can be triggered by writing a `true` into `eventlist.0.triggerPDF`. 

The PDF file could be accesses via:
- web: `http://<IP>:8082/eventlist/eventlist/report.pdf` (for instances > 0: `http://<IP>:8082/eventlist/eventlist/report-X.pdf`, where X is the instance number)
- admin: `http://<IP>:8081/files/eventlist/report.pdf` (for instances > 0: `http://<IP>:8081/files/eventlist/report-X.pdf`, where X is the instance number)

**The icons could not be shown in PDF.**

## Message box
User can add custom events to the list via javascript:
```
// add custom event to event list
sendTo('eventlist.0', 'insert', {
    event: 'My custom text', 
    id: 'ID.that.linked.with.this.event',  // optional 
    ts: new Date('2020-09-25T16:11:00',    // optional. Default is Date.now()
    val: 5,                                // optional 
    duration: 5                            // in ms
});

// Or simple
sendTo('eventlist.0', 'insert', 'My custom text');
// or
setState('eventlist.0.insert', 'My custom text');
// or
setState('eventlist.0.insert', {event: 'My custom text %s', val: 5});
```

User can request formatted JSON list for specific ID. Of course the ID must be enabled in the `eventlist` before.
```
// add custom event to event list
sendTo('eventlist.0', 'list', {
    ids: ['my.0.state.id1', 'my.0.state.id2'],
    count: 10, // optional limit of maximal lines in table,
    allowRelative: false, // optional if relative times, e.g. "one minute ago", may be used (Default: true)
}, result => {
    console.log(JSON.stringify(result)); // array with events
    // result = [{id: 'my.0.state.id1', 
    //
});

// or 
sendTo('eventlist.0', 'list', 'my.0.state.id1', result => {
    console.log(JSON.stringify(result)); // array with events
});
```

User can delete some or all events from the event list.
```
// delete all events
sendTo('eventlist.0', 'delete', '*', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete all events for specific state ID
sendTo('eventlist.0', 'delete', 'hm-rpc.0.AEOI99389408.1.STATE', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete one event by timestamp
sendTo('eventlist.0', 'delete', '2020-10-20T21:00:12.000Z', result => {
    console.log(`Deleted ${result.deleted} events`);
});
```

## Patterns
In the event texts and in the state texts the following patterns could be used:
- %s - value (`State changed to %s` => `State changed to 5`), 
- %u - unit (`State changed to %s%u` => `State changed to 5%`), 
- %n - name (`%n changed state to %s` => `Device A changed state to 5`), 
- %t - time (`State changed state on %t` => `State changed state on Sep Fr, 16:32:00`), 
- %r - relative time (`State changed state %r` => `State changed state 5 seconds ago`),
- %d - duration (`State was in previous state for %d` => `State was in previous state for 5s`), 
- %g - value difference (`State was changed on %g%` => `State was changed on 1%`),
- %o - value difference (`State changed value from %o to %` => `State was changed on 1%`)

## Usage of multiple instances in web
E.g. you can show specific list for instance 2, like `http://IP:8082/eventlist/index.htmlindex.html?2`.

The generated report will be stored for instance 0 in `eventlist/report.pdf`, but for instance 1 in `eventlist/report-1.pdf`.

## Todo
- Change initial texts in PDF in according language
- Many predefined icons (minimum 100)
- Material widget
- Send messages to syslog (maybe splunk) https://www.npmjs.com/package/splunk-logging

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 0.4.3 (2021-04-19)
* (bluefox) Added the support of Admin5

### 0.4.2 (2020-12-05)
* (bluefox) Added possibility to add multiple states
* (bluefox) Moved the duration to previous state
* (bluefox) Support of multiple instances

### 0.4.0 (2020-11-10)
* (bluefox) Added setting of even/odd background for widget
* (bluefox) Added filter

### 0.2.9 (2020-10-20)
* (bluefox) Corrected error in GUI by disabling of state
* (bluefox) Implemented the deletion of events from the event list

### 0.2.8 (2020-10-14)
* (bluefox) Corrected error in pdf settings  
* (bluefox) Implemented the recalculation of the relative time every 10 seconds  

### 0.2.6 (2020-09-25)
* (bluefox) Corrected error in pdf creation  

### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector 
 
### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected 

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers 

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now 

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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