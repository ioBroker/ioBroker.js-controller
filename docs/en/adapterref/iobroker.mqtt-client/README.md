![Logo](admin/mqtt-client.png)
# ioBroker.mqtt-client

![Number of Installations](http://iobroker.live/badges/mqtt-client-installed.svg) ![Number of Installations](http://iobroker.live/badges/mqtt-client-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.mqtt-client.svg)](https://www.npmjs.com/package/iobroker.mqtt-client)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mqtt-client.svg)](https://www.npmjs.com/package/iobroker.mqtt-client)

[![NPM](https://nodei.co/npm/iobroker.mqtt-client.png?downloads=true)](https://nodei.co/npm/iobroker.mqtt-client/)

## Adapter Settings
![Adapter](img/settings.png)

### on connect topic and message
The ```on connect message``` is published to the ```on connect topic``` every time the client connects or reconnects to the server.

### last will topic and message
The ```last will message``` is published to the ```last will topic``` every time the client connects or reconnects to the server.
The Server will store this message and send it to its subscribers when the client disconnects.

### subscriptions
Comma separated list of topics that are not covered by existing states.
Received messages are converted to states within the adapters namespace (e.g. mqtt.0) and subscribed.
You can remove topics after all states have been created.

### publish prefix
When publishing this will be prepended to all topics.
Default is empty (no prefix).

### subscribe prefix
When subscribing this will be prepended to all topics.
Default is empty (no prefix).

## State Settings
![State](img/dialog.png)

### enabled
Enables or disables the mqtt-client functionality for this state.
Disabling will delete any mqtt-client settings from this state.

### topic
The topic this state is published to and subscribed from.
default: state-ID converted to a mqtt topic.

### publish
* ```enable``` state will be published
* ```changes only``` state will only be published when its value changes
* ```as object``` whole state will be published as object
* ```qos``` see <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```retain``` see <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### subscribe
* ```enable``` topic will be subscribed and state will be updated accordingly
* ```changes only``` state will only be written when the value changed
* ```as object``` messages will be interpreted as objects
* ```qos``` see <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```ack``` on state updates the ack flag will be set accordingly

#### Note
* when ack is set to true it will overwrite objects ack, see ```as object```
* to prevent message loops, if both publish and subscribe are enabled ```changes only``` is always on for subscribe

## TODO
* test prefixes
* connect/reconnect without clean session

## Changelog
### 1.3.1 (2020-03-17)
* (bluefox) mqtt package moved back to 2.x

### 1.3.0 (2020-03-11)
* (bluefox) mqtt package was updated
* (bluefox) Fixed the error with "custom" view

### 1.2.1 (2019-10-17)
* (algar42) Fix adapter restarting
* (algar42) Fix mqtt issues

### 1.2.0 (2019-10-14)
* (bluefox) Support of js-controller 2.0 was added

### 1.1.1 (2018-01-30)
* (bluefox) small fixes

### 1.1.0 (2017-12-30)
* (bluefox) Translations
* (bluefox) Udpate of MQTT module

### 1.0.1 (2017-11-16)

### 1.0.0 (2017-11-16)
* (bluefox) Update io-package.json

### 0.3.2 (2016-11-18)
* (Pmant) fix initial object parsing
* (Pmant) fix objects view

### 0.3.1 (2016-11-16)
* (Pmant) fix crash

### 0.3.0 (2016-09-08)
* (Pmant) add optional publish and subscribe prefixes

### 0.2.5 (2016-09-08)
* (Pmant) reduce logging -> debug

### 0.2.0 (2016-09-08)
* (Pmant) use new custom settings

### 0.1.1 (2016-06-09)
* (Pmant) fix possible loop

### 0.1.0 (2016-06-08)
* (Pmant) initial commit

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Pmant

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
