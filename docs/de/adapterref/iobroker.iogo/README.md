---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iogo/README.md
title: ioBroker.iogo
hash: bXtkq3tB/zDkbC3CUQsYHt1Ah4xu4hqiVn2KN7uMFOc=
---
![Logo](../../../en/adapterref/iobroker.iogo/admin/iogo.png)

![Anzahl der Installationen](http://iobroker.live/badges/iogo-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iogo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iogo.svg)
![Travis-CI](http://img.shields.io/travis/nisiode/ioBroker.iogo/master.svg)
![NPM](https://nodei.co/npm/iobroker.iogo.png?downloads=true)

# IoBroker.iogo
=================

Dieser Adapter erweitert die SmartHome-App ioGo um zusätzliche Funktionen (https://play.google.com/store/apps/details?id=de.nisnagel.iogo).
Bitte besuchen Sie iogo.nisnagel.de für weitere Informationen zum Einstieg.

## Aufbau
Sie sollten Ihre Kontoinformationen (E-Mail / Passwort) einstellen. Danach starten Sie den Adapter.

## Verwendungszweck
Sie können Nachrichten an alle authentifizierten Benutzer über die Nachrichtenbox ```sendTo('iogo', 'New message')``` oder an bestimmte Benutzer ```sendTo('iogo', {user: 'Username', text: 'Test message'})``` senden.
Der Benutzer muss zuvor angelegt worden sein (bitte lesen Sie die Anwendungsdokumentation für weitere Details).

Es ist möglich, mehr als einen Empfänger anzugeben (trennen Sie die Benutzernamen einfach durch Komma). Beispiel: Empfänger: "Benutzer1, Benutzer4, Benutzer5"

Beispiel für das Senden einer benutzerdefinierten Benachrichtigung mit Javascript:

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

Und ein Beispiel mit blockly:

![blockhaft](../../../en/adapterref/iobroker.iogo/img/blockly.png)

Callbacks werden ebenfalls unterstützt:

```
sendTo('iogo', {title: 'News', text: 'New message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Senden Sie einfach den Pfad zu Ihrem Bild anstelle von Text oder verwenden Sie das URL-Attribut ```sendTo('iogo.0', 'absolute/path/file.png')```

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

**Möglichkeiten**:

- *Benutzer* Einzelbenutzer oder Benutzerliste
- *Text* Die Nachricht selbst
- *title* Der Titel der Benachrichtigung
- *url* Absoluter Pfad zu einem Bild

## Changelog

### 0.4.0
* (nisio) Changes for ioGo app version 2.0.0+

### 0.3.x
* (nisio) added support of compact mode
* (nisio) added support node 12

### 0.2.x
* (nisio) added pro features

### 0.1.x
* (nisio) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 - 2019 Nis Nagel <support@nisnagel.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.