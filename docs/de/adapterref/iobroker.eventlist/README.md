---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: hQOkMxbQz5BkSiNLUi4kTJIMgwYjUKKcRXzYX29yPtc=
---
![Logo](../../../en/adapterref/iobroker.eventlist/admin/eventlist.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.eventlist.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.eventlist.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/eventlist-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/eventlist-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bluefox/iobroker.eventlist.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/bluefox/ioBroker.eventlist/badge.svg)
![NPM](https://nodei.co/npm/iobroker.eventlist.png?downloads=true)

# IoBroker.eventlist
## Ereignislistenadapter für ioBroker
Ermöglicht das Definieren der Zustände, die in der Ereignisliste protokolliert werden müssen.

Die Liste kann in admin, web, vis angezeigt, als PDF gespeichert, Material (noch nicht implementiert).

Zusätzlich können Sie Ereignisse per Telegramm oder WhatsApp senden.

![Aufführen](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

## Alarmmodus
Die Ereignisse konnten nur im Alarmmodus generiert werden.
Der Alarmmodus kann durch die Variable `eventlist.X.alarm` gesteuert werden.

Außerdem können die Nachrichten an Messenger nur gesendet werden, wenn der Alarmmodus aktiviert ist.

Anwendungsfall:

- Z.B. Der Türsensor kann die Nachrichten nur senden, wenn niemand zu Hause ist. Andernfalls werden die Ereignisse zum Öffnen der Tür nur in der Ereignisliste erfasst.

## Mögliche Präsentationen
### In Admin als Registerkarte
Sie können die Ereignisliste als Registerkarte im Administrator aktivieren.

### Netz
Die Ereignisliste kann unter `http://<IP>:8082/eventlist/index.html` angezeigt werden. (für Instanzen> 0: `http://<IP>:8082/eventlist/index.html?X`, wobei X die Instanznummer ist)

### Vis Widget
Die Ereignisliste kann als vis-Widget angezeigt werden.

### PDF-Generierung
Es besteht die Möglichkeit, mit allen Ereignissen ein PDF-Dokument zu erstellen.

Der Dokumenttitel kann aus dem Generierungsdatum bestehen, wenn Sie das Muster darin platzieren: `Event list on {{YYYY MM DD}}`.
Die genaue Beschreibung des Zeitformats finden Sie hier: https://momentjs.com/docs/#/displaying/format/

Die Erzeugung von PDF kann durch Schreiben eines `true` in `eventlist.0.triggerPDF` ausgelöst werden.

Auf die PDF-Datei kann zugegriffen werden über:

- web: `http:// <IP>: 8082 / eventlist / eventlist / report.pdf` (für Instanzen> 0:` http: // <IP>: 8082 / eventlist / eventlist / report-X.pdf`, wobei X die Instanznummer ist)
- admin: `http:// <IP>: 8081 / files / eventlist / report.pdf` (für Instanzen> 0:` http: // <IP>: 8081 / files / eventlist / report-X.pdf`, wobei X die Instanznummer ist)

** Die Symbole konnten nicht als PDF angezeigt werden. **

## Nachrichtenbox
Der Benutzer kann der Liste benutzerdefinierte Ereignisse über Javascript hinzufügen:

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

Der Benutzer kann eine formatierte JSON-Liste für eine bestimmte ID anfordern. Natürlich muss die ID vorher in den `eventlist` aktiviert sein.

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

Der Benutzer kann einige oder alle Ereignisse aus der Ereignisliste löschen.

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

## Muster
In den Veranstaltungstexten und in den Staatstexten könnten folgende Muster verwendet werden:

- %s  - Wert (`Status geändert in% s` =>` Status geändert in 5`),
-% u - unit (`Status geändert in %s % u` =>` Status geändert in 5% `),
-% n - Name (`% n hat den Status in %s ` geändert =>` Gerät A hat den Status in 5` geändert),
-% t - Zeit (`Status geändert Status auf% t` =>` Status geändert Status am Sep Fr, 16: 32: 00`),
-% r - relative Zeit (`Zustand geändert Zustand% r` =>` Zustand geändert Zustand vor 5 Sekunden`),
-% d - Dauer (`Zustand war für% d im vorherigen Zustand = =` `Zustand war für 5s im vorherigen Zustand`),
-% g - Wertdifferenz (`Status wurde auf% g% geändert` => `Status wurde auf 1% geändert`),
-% o - Wertdifferenz (`Status geändert Wert von% o auf%` => `Status wurde auf 1% geändert`)

## Verwendung mehrerer Instanzen im Web
Z.B. Sie können eine bestimmte Liste zum Beispiel 2 anzeigen, z. B. `http://IP:8082/eventlist/index.htmlindex.html?2`.

Der generierte Bericht wird zum Beispiel 0 in `eventlist/report.pdf` gespeichert, zum Beispiel 1 in `eventlist/report-1.pdf`.

## Machen
- Ändern Sie die ersten Texte in PDF in der entsprechenden Sprache
- Viele vordefinierte Symbole (mindestens 100)
- Material Widget
- Senden Sie Nachrichten an syslog (möglicherweise Splunk) https://www.npmjs.com/package/splunk-logging

<! - Platzhalter für die nächste Version (am Zeilenanfang):

### __WORK IN PROGRESS__ ->

## Changelog
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