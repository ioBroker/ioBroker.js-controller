![Logo](admin/lgtv2011.png)
# ioBroker.lgtv11
=================

![Number of Installations](http://iobroker.live/badges/lgtv11-installed.svg) ![Number of Installations](http://iobroker.live/badges/lgtv11-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.lgtv11.svg)](https://www.npmjs.com/package/iobroker.lgtv11)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lgtv11.svg)](https://www.npmjs.com/package/iobroker.lgtv11)

[![NPM](https://nodei.co/npm/iobroker.lgtv11.png?downloads=true)](https://nodei.co/npm/iobroker.lgtv11/)

**Tests:** Linux/Mac: [![Travis-CI](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv11.svg?branch=master)](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv11)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/fwlpfd33mafbivcm/branch/master?svg=true)](https://ci.appveyor.com/project/SebastianSchultz/iobroker-lgtv11/branch/master)






LG WebOS SmartTV adapter for ioBroker

Remote controlling an LG WebOS SmartTV (2011 models up to WebOS) from [ioBroker](https://www.iobroker.net).


---


## Usage:


1.) Install the adapter through ioBroker admin interface.

2.) In the adapter config input the ip adress of your LG WebOS TV.

3.) Start the adapter

4.) Open the adapter config an click on "request pairing key"

5.) Insert the pairing key shown on your TV screen in the adapter config

6.) Restart the adapter.





## Some examples:
```setState('lgtv.0.turnOff', true);```

Switching off the TV.


```setState('lgtv.0.back', true);```

Goes back.


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


```setState('lgtv.0.input', true);```

Open the input list to switch to.



---


## Changelog

### 1.0.5 (2019-01-21)
* (SebastianSchultz) Added compact mode

### 1.0.4 (2018-05-08)
* (SebastianSchultz) Added "back" command/state

### 1.0.3 (2018-04-27)
* (SebastianSchultz) Fixed a bug in Admin interface that no pairing key could be requested

### 1.0.2 (2018-04-18)
* (SebastianSchultz) Renamed from ioBroker.lgtv2011 to ioBroker.lgtv11

### 1.0.1 (2018-04-17)
* (SebastianSchultz) Code clean up

### 1.0.0 (2018-04-15)
* (SebastianSchultz) Initial Release


---


## License

The MIT License (MIT)

Copyright (c) 2019 Sebastian Schultz.

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
