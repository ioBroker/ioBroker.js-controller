---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lametric/README.md
title: ioBroker.lametric
hash: uXHMTTKiiRLqyA7Y/Zwqw5IlOhiqYnVLHtmPHwoI2Fs=
---
![Logo](../../../en/adapterref/iobroker.lametric/admin/lametric.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lametric.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lametric.svg)
![Stabil](http://iobroker.live/badges/lametric-stable.svg)
![Eingerichtet](http://iobroker.live/badges/lametric-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/klein0r/iobroker.lametric.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/klein0r/ioBroker.lametric/badge.svg)
![Build-Status](http://img.shields.io/travis/klein0r/ioBroker.lametric.svg)
![NPM](https://nodei.co/npm/iobroker.lametric.png?downloads=true)

# IoBroker.lametric
Mit diesem Adapter können Sie Statusinformationen zu Ihrer LaMetric-Zeit abrufen und Benachrichtigungen an diese senden.
Sie benötigen lediglich die IP-Adresse Ihres Geräts und den API-Entwicklerschlüssel.

## Aufbau
Getestet mit LaMetric Firmware *2.0.28* und *2.1.2* (empfohlen)

Sie können Ihren persönlichen Schlüssel [Hier](https://developer.lametric.com/) erhalten.

![API-Schlüssel](../../../en/adapterref/iobroker.lametric/docs/apiKey.png)

## Verwendung
Weitere Informationen zu Benachrichtigungen finden Sie hier: https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html

## Eigenschaften
- Displayhelligkeit einstellen (Prozent, Auto-Modus / Manueller-Modus)
- Stellen Sie die Lautstärke ein (Prozent)
- Bildschirmschoner konfigurieren (aktivieren / deaktivieren, zeitbasiert, wenn es dunkel ist)
- Aktivieren / Deaktivieren Sie Bluetooth und ändern Sie den Bluetooth-Namen
- Zwischen Apps wechseln (weiter, vorher, zu einer bestimmten App gehen)
- Blockierte Benachrichtigungen senden (mit konfigurierbarer Priorität, Sound, Symbolen, Text, ...)
- Steuern Sie spezielle Apps wie Radio, Stoppuhr und Wetter

Funktionen sind durch die [offizielle API-Funktionen](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html) begrenzt.

## Blockly
Sie können eine einfache Zeichenfolge als Nachricht verwenden, die als einzelner Frame angezeigt wird

![einfach](../../../en/adapterref/iobroker.lametric/docs/blockly1.png)

Um mehrere Frames anzuzeigen, können Sie auch ein Array als Nachricht bereitstellen

![einfach](../../../en/adapterref/iobroker.lametric/docs/blockly2.png)

## Skripte
Um die Nachricht in Ihrer la-Metrik anzuzeigen, senden Sie einfach eine Nachricht mit dem Skriptadapter an diese Instanz:

```
sendTo('lametric.0', 'send', {
    "priority": "[info|warning|critical]",
    "icon_type": "[none|info|alert]",
    "lifeTime": <milliseconds>,
    "model": {
    "frames": [
         {
            "icon":"<icon id or base64 encoded binary>",
            "text":"<text>"
         },
         {
           "icon": 298,
           "text":"text"
         },
         {
             "icon": 120,
             "goalData":{
                 "start": 0,
                 "current": 50,
                 "end": 100,
                 "unit": "%"
             }
         },
         {
             "chartData": [ <comma separated integer values> ] // [ 1, 2, 3, 4, 5, 6, 7 ]
         }
         ],
         "sound": {
           "category":"[alarms|notifications]",
             "id":"<sound_id>",
             "repeat":<repeat count>
         },
         "cycles":<cycle count>
    }
});
```

Beispiel, um einige Informationen zyklisch anzuzeigen:

```
let i = 0;
function show() {
    console.log('Show ' + i);
    sendTo('lametric.0', 'send', {
        "priority": "info",
        "icon_type": "info",
        "lifeTime": 10000,
        "model": {
        "frames": [
                {
                    "icon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAAySURBVBhXY4AAYdcKk1lngCSUDwHIfAQbzgLqgDCgIqRLwFkQCYQoBAD5EATl4wQMDADhuxQzaDgX0gAAAABJRU5ErkJggg==",
                    "text":"Hi " + i
                }
            ],
            "cycles": 0
        }
    });
    i++;
}
setInterval(show, 10000);
show();
```

## Changelog

### 1.0.0

* (klein0r) First stable release
* (klein0r) Added iobroker sentry
* (klein0r) Added brightness and volume limit information (min, max)

### 0.0.10

* (klein0r) Switched to axios lib

### 0.0.9

* (klein0r) Added missing translations
* (GermanBluefox) Improved Blockly and main.js

### 0.0.8

* (klein0r) Updated dependencies

### 0.0.7

* (klein0r) fixed blockly

### 0.0.6

* (klein0r) switched to setTimeout instead of setInterval, improved logging and fixes eslint complaints

### 0.0.5

* (klein0r) Fixed notification, html, updated github template, enable and disable screensaver

### 0.0.4

* (klein0r) Refactored blockly sendTo / notifications

### 0.0.3

* (klein0r) Added app switching support, refactored everything
* (bluefox) The deletion of the actual shown information was added

### 0.0.2

* (Sigi74) Change message_value for variables message
* (Sigi74) Leave sound none

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2020 Matthias Kleine <info@haus-automatisierung.com>

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