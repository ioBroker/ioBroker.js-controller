![Logo](admin/owntracks.png)
# ioBroker.owntracks

![Number of Installations](http://iobroker.live/badges/owntracks-installed.svg) ![Number of Installations](http://iobroker.live/badges/owntracks-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.owntracks.svg)](https://www.npmjs.com/package/iobroker.owntracks)
[![Downloads](https://img.shields.io/npm/dm/iobroker.owntracks.svg)](https://www.npmjs.com/package/iobroker.owntracks)

[![NPM](https://nodei.co/npm/iobroker.owntracks.png?downloads=true)](https://nodei.co/npm/iobroker.owntracks/)

[OwnTracks](http://owntracks.org/) is an app for android and iOS.

App sends  your position (position of device) continuously to a specific server. In our case it will be ioBroker server. Either the MQTT protocol will be used for communication or the ioBroker.cloud / ioBroker.iot adapter.

Link for:
- Android: [https://play.google.com/store/apps/details?id=org.owntracks.android](https://play.google.com/store/apps/details?id=org.owntracks.android)
- iOS: [https://itunes.apple.com/de/app/owntracks/id692424691?mt=8](https://itunes.apple.com/de/app/owntracks/id692424691?mt=8)


## Setup instructions
### Connection configuration (using MQTT server)
OwnTracks Adapter starts on port 1883 (configurable) a MQTT server to receive the messages from devices with coordinates.
The problem is that this server must be reachable from internet. 
Normally there is a router or firewall, that must be configured to forward traffic. 

### App & adapter configuration
The following preferences have to be set in the Android / iOS app respectively in the ioBroker adapter:
- Connection/Mode                       - MQTT private
- Connection/Host/Host                  - IP address of your system or DynDNS domain. E.g. http://www.noip.com/ lets use domain name instead of IP address.
- Connection/Host/Port                  - 1883 or your port on your router
- Connection/Host/WebSockets            - false
- Connection/Identification/Username    - iobroker
- Connection/Identification/Password    - from adapter settings
- Connection/Identification/DeviceID    - Name of device or person. For this device the states will be created. E.g. if deviceID is "Mark", following states will be created after first contact: 

    - owntracks.0.users.Mark.longitude
    - owntracks.0.users.Mark.latitude   
    
- Connection/Identification/TrackerID   - Short name of user (up to 2 letters) to write it on map.
- Connection/Security/TLS               - off
- Advanced/Encryption Key               - optional, but recommended: Add passphrase for encryption

Please verify owntracks is connected to iobroker instance via the "Status" entry in the drawer:

![Settings](img/connection.jpg)


### IMPORTANT NOTE!
**The states within ioBroker will be generated when the specific payload is received!! This means the locations in ioBroker will be generated the first time the user leaves or enters the location.**
Below you will see the target structure

![Settings](img/structure.png)



### Regions configuration
To setup locations within the owntracks adapter, you have to create regions in the owntracks Android / iOS app.
To do so, go to "Regions" in the drawer

![Settings](img/regions1.jpg)

Create a new region by clicking the plus (+) in the top right corner

![Settings](img/regions2.jpg)

Use the location button in the top right corner to retrieve current location or type them in Latitude and Longitude yourself. Furthermore, specify a radius for the location. If you share the location, your Friends (see in the drawer of the Android / iOS app) get a notification when you enter / leave a location. 

![Settings](img/regions3.jpg)


### Icon settings (within the ioBroker.owntracks adapter)
You can define for every user an icon. Just upload per drag&drop or with mouse click you image. It will be automatically scaled to 64x64.

The name must be equal to DeviceID in OwnTracks app.

![Settings](img/settings1.png)

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) respect "bind" configuration

### 0.6.3 (2020-05-12)
* (Apollon77) updated dependencies
* (bluefox) fixes some issues

### 0.6.2 (2019-02-14)
* (zefau) Added support for [ioBroker compact mode](https://forum.iobroker.net/viewtopic.php?f=24&t=20387#p213466)
* (zefau) Added support for Gulp translations

### 0.6.0 (2019-01-27)
* (zefau) Added Admin v3 / materialized support
* (zefau) Added option for websockets in the adapter settings

### 0.5.1 (2019-01-25)
* (zefau) fixed an error when connection got closed

### 0.5.0 (2018-10-14)
* (zefau) Added support for locations

### 0.4.0 (2018-10-14)
* (zefau) Added support for encryption key

### 0.3.0 (2018-06-05)
* (matspi) Fix handling of publish messages

### 0.2.0 (2017-01-03)
* (jp112sdl) added two properties timestamp and datetime

### 0.1.1 (2016-09-05)
* (bluefox) add pictures

### 0.1.0 (2016-09-04)
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2020 bluefox<dogafox@gmail.com>

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
