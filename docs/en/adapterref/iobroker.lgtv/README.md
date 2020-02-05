![Logo](admin/lgtv.png)
# ioBroker.lgtv
=================

![Number of Installations](http://iobroker.live/badges/lgtv-installed.svg) ![Number of Installations](http://iobroker.live/badges/lgtv-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.lgtv.svg)](https://www.npmjs.com/package/iobroker.lgtv)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lgtv.svg)](https://www.npmjs.com/package/iobroker.lgtv)

[![NPM](https://nodei.co/npm/iobroker.lgtv.png?downloads=true)](https://nodei.co/npm/iobroker.lgtv/)

**Tests:** Linux/Mac: [![Travis-CI](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv.svg?branch=master)](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/xx55hgsuff4fas47/branch/master?svg=true)](https://ci.appveyor.com/project/SebastianSchultz/iobroker-lgtv/branch/master)





LG WebOS SmartTV adapter for ioBroker

Remote controlling an LG WebOS SmartTV (2013 models and higher) from [ioBroker](https://www.iobroker.net).


---


## Usage:

Install the adapter through ioBroker admin interface.
In the adapter config input the ip adress of your LG WebOS TV.
At first connection you will receive a pairing prompt on your TV screen where you should allow the connection.



## Some examples:
```setState('lgtv.0.states.popup', 'Some text!');```

This will show a popup with the text "Some text!" on the TV.
You can use HTML linebreaks (br) in the text.


```setState('lgtv.0.states.turnOff', true);```

Switching off the TV.


```setState('lgtv.0.states.mute', true);```

Mute the TV.


```setState('lgtv.0.states.mute', false);```

Unmute the TV.


```setState('lgtv.0.states.volumeUp', true);```

This will increase the volume of the TV.


```setState('lgtv.0.states.volumeDown', true);```

Decreasing the volume of the TV.


```setState('lgtv.0.states.channelUp', true);```

Increasing the current TV channel.


```setState('lgtv.0.states.channelDown', true);```

Decreasing the current TV channel.


```setState('lgtv.0.states.3Dmode', true);```

Activates the 3D mode on the TV


```setState('lgtv.0.states.3Dmode', false);```

Deactivates the 3D mode on the TV.


```setState('lgtv.0.states.channel', 7);```

Switching the live TV to channel number 7.


```setState('lgtv.0.states.launch', 'livetv');```

Switching to Live TV mode.


```setState('lgtv.0.states.launch', 'smartshare');```

Opening the SmartShare App on the TV.


```setState('lgtv.0.states.launch', 'tvuserguide');```

Runs the TV User Guide App on the TV.


```setState('lgtv.0.states.launch', 'netflix');```

Opening the Netflix App on the TV.


```setState('lgtv.0.states.launch', 'youtube');```

Opens the Youtube App on the TV.


```setState('lgtv.0.states.launch', 'prime');```

Opens the Amazon Prime App on the TV.


```setState('lgtv.0.states.launch', 'amazon');```

On some TVs this command opens the Amazon Prime App.


```setState('lgtv.0.states.openURL', 'http://www.iobroker.net');```

Opens the Webbrowser on the TV and navigates to www.iobroker.net.
Can also be used to open images or videos (in the browser).


```setState('lgtv.0.states.input', 'av1');```

Switches the iput oh the TV to AV1.


```setState('lgtv.0.states.input', 'scart');```

Switches the iput oh the TV to Scart.


```setState('lgtv.0.states.input', 'component');```

Switches the iput oh the TV to Component.


```setState('lgtv.0.states.input', 'hdmi1');```

Switches the iput oh the TV to HDMI 1.


```setState('lgtv.0.states.input', 'hdmi2');```

Switches the iput oh the TV to HDMI 2.


```setState('lgtv.0.states.input', 'hdmi3');```

Switches the iput oh the TV to HDMI 3.

```setState('lgtv.0.states.youtube', 'https://www.youtube.com/watch?v=AjSpMQfRmEo'); OR setState('lgtv.0.states.youtube', 'AjSpMQfRmEo');```

Play YouTube video.

```setState('lgtv.0.states.raw', '{"url": "ssap://system.launcher/launch", "cmd": "{id: 'netflix'}" }');```
```setState('lgtv.0.states.raw', '{"url": "ssap://api/getServiceList", "cmd": ""}');```

Sending and response RAW command API.

```setState('lgtv.0.remote.*KEY*', true);```

Send remote KEY to TV.

```setState('lgtv.0.states.power', true/false);```

Turn Off TV and Turn On TV (TurnOn, works only LAN, using WOL).

```setState('lgtv.0.states.soundOutput', 'external_arc');```

Switch audio output through ARC (HDMI).


---

## States

channel

holds the current channel


volume

holds the current volume level and can change the volume


on

is true when TV is on and false if TV is off

---


## Changelog

### 1.1.3 (2019-12-16)
* (merdok) fixed connect() [Pull requests #62](https://github.com/SebastianSchultz/ioBroker.lgtv/pull/62) 
* (instalator) fixed [issues #64](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/64) 
* (instalator) change error log to debug [issues #59](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/59) 

### 1.1.1 (2019-10-26)
* (instalator) Safe keyfile to /opt/iobroker [issues #52](https://github.com/SebastianSchultz/ioBroker.lgtv/issues/52) 
* (instalator) fix error reconect
* (instalator) fix raw object
* (instalator) add mac address to admin settings

### 1.1.0 (2019-10-10)
* (instalator) adding object remote.KEY
* (instalator) fix connect to TV
* (instalator) add subscribe volume and mute state
* (instalator) translate admin to RUS
* (instalator) add Turn On, using WOL
* (instalator) adding new different objects
* (SebastianSchultz) changed roles "button" to "switch" for compatibility for iot- & cloud-adapter

### 1.0.8 (2019-03-15)
* (SebastianSchultz) general NPM update

### 1.0.7 (2019-01-28)
* (SebastianSchultz) grouping of all states/objects under a device

### 1.0.6 (2019-01-21)
* (SebastianSchultz) added compact mode

### 1.0.5 (2018-04-15)
* (SebastianSchultz) added Travis-CI and AppVeyor tests

### 1.0.4 (2018-04-07)
* (SebastianSchultz) added support for increasing (channelUp) or decreasing (channelDown) the current TV channelDown
* (SebastianSchultz) added the state "volume" which holds the current volume level

### 1.0.3 (2018-01-11)
* (SebastianSchultz) added support for launching Amazon Prime app via "amazon" (used on some TV's instead of "prime")
* (SebastianSchultz) fixed issue that state "on" was not set when in an app on TV

### 1.0.2 (2017-05-23)
* (SebastianSchultz) added support for launching Amazon Prime app

### 1.0.0 (2016-09-26)
* (SebastianSchultz) added channel polling
* (SebastianSchultz) added switching input

### 0.0.4 (2016-09-12)
* (SebastianSchultz) solved saving IP address within adapter configuration

### 0.0.3 (2016-09-05)
* (SebastianSchultz) added volumeUp true|false
* (SebastianSchultz) added volumeDown true|false
* (SebastianSchultz) added 3Dmode true|false
* (SebastianSchultz) added launch livetv|smartshare|tvuserguide|netflix|youtube|<URL>
* (SebastianSchultz) added channel <channelNumber>
* (SebastianSchultz) some code cleaned

### 0.0.2 (2016-09-02)
* (SebastianSchultz) removed reconnect function, not used
* (SebastianSchultz) improved error handling and logging

### 0.0.1 (2016-08-31)
* (SebastianSchultz) initial commit


---


## License

The MIT License (MIT)

Copyright (c) 2020 Sebastian Schultz.

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
