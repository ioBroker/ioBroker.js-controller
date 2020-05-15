![Logo](admin/lametric.png)

# ioBroker.lametric

[![NPM version](http://img.shields.io/npm/v/iobroker.lametric.svg)](https://www.npmjs.com/package/iobroker.lametric)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lametric.svg)](https://www.npmjs.com/package/iobroker.lametric)
[![Stable](http://iobroker.live/badges/lametric-stable.svg)](http://iobroker.live/badges/lametric-stable.svg)
[![installed](http://iobroker.live/badges/lametric-installed.svg)](http://iobroker.live/badges/lametric-installed.svg)
[![Dependency Status](https://img.shields.io/david/klein0r/iobroker.lametric.svg)](https://david-dm.org/klein0r/iobroker.lametric)
[![Known Vulnerabilities](https://snyk.io/test/github/klein0r/ioBroker.lametric/badge.svg)](https://snyk.io/test/github/klein0r/ioBroker.lametric)
[![Build Status](http://img.shields.io/travis/klein0r/ioBroker.lametric.svg)](https://travis-ci.org/klein0r/ioBroker.lametric)

[![NPM](https://nodei.co/npm/iobroker.lametric.png?downloads=true)](https://nodei.co/npm/iobroker.lametric/)

This adapter allows you to get status information about your LaMetric Time and to send notifications to it.
All you need is the IP address of your device and the api developer key.

## Configuration

You can get your personal key [here](https://developer.lametric.com/).

![api-key](docs/apiKey.png)

## Usage

You can read more about notifications here: https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-notifications.html

## Features

- Set display brightness (percent, auto-mode/manual-mode)
- Set audio volume (percent)
- Configure screensaver (enable/disable, time based, when dark)
- Activate/Deactivate bluetooth and change bluetooth name
- Switch between apps (next, previous, go to specific app)
- Send blockly notifications (with configurable priority, sound, icons, text, ...)
- Control special apps like radio, stopwatch and weather

## Blockly

You can use a simple string as message, which will be shown as a single frame

![simple](docs/blockly1.png)

To show multiple frames, you can also provide an array as message

![simple](docs/blockly2.png)

## Scripts
To show the message on your la metric just send a message to this instance with script adapter:
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

Example to show some information cyclic:
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
