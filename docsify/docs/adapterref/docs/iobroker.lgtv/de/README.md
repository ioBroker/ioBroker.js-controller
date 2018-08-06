![Logo](media/lgtv.png)
# ioBroker.lgtv
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.lgtv.svg)](https://www.npmjs.com/package/iobroker.lgtv)
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
```setState('lgtv.0.popup', 'Some text!');```

This will show a popup with the text "Some text!" on the TV.
You can use HTML linebreaks (br) in the text.


```setState('lgtv.0.turnOff', true);```

Switching off the TV.


```setState('lgtv.0.mute', true);```

Mute the TV.


```setState('lgtv.0.mute', false);```

Unmute the TV.


```setState('lgtv.0.volumeUp', true);```

This will increase the volume of the TV.


```setState('lgtv.0.volumeDown', true);```

Decreasing the volume of the TV.


```setState('lgtv.0.channelUp', true);```

Increasing the current TV channel.


```setState('lgtv.0.channelDown', true);```

Decreasing the current TV channel.


```setState('lgtv.0.3Dmode', true);```

Activates the 3D mode on the TV


```setState('lgtv.0.3Dmode', false);```

Deactivates the 3D mode on the TV.


```setState('lgtv.0.channel', 7);```

Switching the live TV to channel number 7.


```setState('lgtv.0.launch', 'livetv');```

Switching to Live TV mode.


```setState('lgtv.0.launch', 'smartshare');```

Opening the SmartShare App on the TV.


```setState('lgtv.0.launch', 'tvuserguide');```

Runs the TV User Guide App on the TV.


```setState('lgtv.0.launch', 'netflix');```

Opening the Netflix App on the TV.


```setState('lgtv.0.launch', 'youtube');```

Opens the Youtube App on the TV.


```setState('lgtv.0.launch', 'prime');```

Opens the Amazon Prime App on the TV.


```setState('lgtv.0.launch', 'amazon');```

On some TVs this command opens the Amazon Prime App.


```setState('lgtv.0.launch', 'http://www.iobroker.net');```

Opens the Webbrowser on the TV and navigates to www.iobroker.net.


```setState('lgtv.0.input', 'AV_1');```

Switches the iput oh the TV to AV1.


```setState('lgtv.0.input', 'SCART_1');```

Switches the iput oh the TV to Scart.


```setState('lgtv.0.input', 'COMP_1');```

Switches the iput oh the TV to Component.


```setState('lgtv.0.input', 'HDMI_1');```

Switches the iput oh the TV to HDMI 1.


```setState('lgtv.0.input', 'HDMI_2');```

Switches the iput oh the TV to HDMI 2.


```setState('lgtv.0.input', 'HDMI_3');```

Switches the iput oh the TV to HDMI 3.


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

Copyright (c) 2016 Sebastian Schultz.

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
