---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iogo/README.md
title: ioBroker.iogo
hash: yk5U6cZpi1vr4MAnRb+S96DdU2ZGKTH4Xe3ih//Tk/g=
---
![Logo](../../../en/adapterref/iobroker.iogo/admin/iogo.png)

![Anzahl der Installationen](http://iobroker.live/badges/iogo-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.iogo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iogo.svg)
![Travis-CI](http://img.shields.io/travis/nisiode/ioBroker.iogo/master.svg)
![NPM](https://nodei.co/npm/iobroker.iogo.png?downloads=true)

# IoBroker.iogo
=================

Dieser Adapter fügt der smarthome-App ioGo https://play.google.com/store/apps/details?id=de.nisnagel.iogo zusätzliche Funktionen hinzu.
Bitte besuchen Sie www.iogo.app für weitere Informationen zu den ersten Schritten.

## Aufbau
Sie benötigen einen gültigen Lizenzschlüssel, um diesen Adapter verwenden zu können.
Eine Lizenz kann nach dem Erstellen eines Kontos unter https://www.iogo.app erworben werden.

Bitte geben Sie Ihre Kontoinformationen (E-Mail / Passwort) in die Instanzkonfiguration ein.

## Verwendung
Sie können eine Nachricht an alle authentifizierten Benutzer über messageBox ```sendTo('iogo', 'New message')``` oder an einen bestimmten Benutzer ```sendTo('iogo', {user: 'Username', text: 'Test message'})``` senden.
Der Benutzer muss zuvor erstellt worden sein (weitere Informationen finden Sie in der Anwendungsdokumentation).

Es ist möglich, mehr als einen Empfänger anzugeben (trennen Sie einfach die Benutzernamen durch Komma). Zum Beispiel: Empfänger: "Benutzer1, Benutzer4, Benutzer5"

Beispiel für das Senden einer benutzerdefinierten Benachrichtigungsnachricht mit Javascript:

```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

Und ein Beispiel mit blockly:

![blockartig](../../../en/adapterref/iobroker.iogo/img/blockly.png)

Rückrufe werden ebenfalls unterstützt:

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
- *text* Die Nachricht selbst
- *title* Der Titel der Benachrichtigung
- *url* Absoluter Pfad zu einem Bild
- *Ablauf* Ablaufzeit in Sekunden

## Changelog

### 0.5.x
* (nisio) Changes for ioGo app version 2.1.0+ (older versions no longer supported)
* (nisio) Split main.js into several files

### 0.4.x
* (nisio) Changes for ioGo app version 2.0.0+ (older versions no longer supported)

### 0.3.x
* (nisio) added support of compact mode
* (nisio) added support node 12

### 0.2.x
* (nisio) added pro features

### 0.1.x
* (nisio) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 - 2020 Nis Nagel <info@iogo.app>

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