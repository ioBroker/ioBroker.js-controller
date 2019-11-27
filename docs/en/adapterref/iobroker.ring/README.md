![Logo](admin/ring.png)

# Ring Adapter

[![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.ring.svg?branch=master)](https://travis-ci.org/schmupu/ioBroker.ring)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.ring?branch=master&svg=true)](https://ci.appveyor.com/project/schmupu/ioBroker-ring/)
![Number of Installations](http://iobroker.live/badges/ring-installed.svg) ![Number of Installations](http://iobroker.live/badges/ring-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.ring.svg)](https://www.npmjs.com/package/iobroker.ring)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ring.svg)](https://www.npmjs.com/package/iobroker.ring)

[![NPM](https://nodei.co/npm/iobroker.ring.png?downloads=true)](https://nodei.co/npm/iobroker.ring/)

Requires node.js 8.0 or higher and Admin v3!

The Ring adapter works with Ring devices like the Ring Video Doorbell and Ring Cam and shows if somenone rings the doorbell or if motion is detected. The Ring Video Doorbell or Cam does not send a videostream if a motion or door bell ist detected. Instead SIP Information for a SIP Video Conference will be provided. 
You can use for example the Blink SIP client on [http://icanblink.com/](http://icanblink.com/). To get video working go into Blink's Preferences and under "Accounts", switch the tab to "Media" and deselect "Encrypt audio and video" under "RTP Options". Be careful the SIP information expire after a few seconds!
Hopefully I will able to support a video stream soon. Unfortunatly [ring.com](https://ring.com) does not have an official API that support this feature. 
If you press livestreamrequest button you get new SIP Information for building up a SIP Video Call session. If you are using the [ring.com](https://ring.com) cloud you find under history a http link to your last motion / door bell recorded video. 


## Install & Configuration

After installing the Adapter you have to enter your Email and Password of your [ring.com](https://ring.com) Account. 

An example to get changes if a motion or door ring is detected: 
```
on({id: "ring.0.doorbell_4711.kind"/*Kind*/},  (obj) => {
  if(obj.state.val == 'ding')   console.log("Someone is at the door");
  if(obj.state.val == 'motion') console.log("Motion detected");
});
```

## Changelog

### 1.0.5 (18.04.2019)
* (Stübi) Bugfixing 
* (Stübi) Using new API. With this API livestreaming and snapshots are possible (work still in progress and not supported in this version)
* (Stübi) Fixed an error with js-controller 2.0. You need at least this version with js-controller 2.0

### 1.0.4 (17.04.2019)
* (Stübi) Bugfixing for Ring Pro 

### 1.0.3 (09.03.2019)
* (Stübi) Major change! I had to change the used ring.com API to an other API. The old one did not work anymore. For this reason, a lot has to be redesigned.  

### 1.0.2 (01.02.2019)
* (Stübi) More debug information 

### 1.0.1 (05.01.2019)
* (Stübi) Support js-controller compact mode 

### 1.0.0 (04.01.2018)
* (Stübi) Add camera device. For this reason, the device name changed from doorbot to doorbell.

### 0.1.3 (20.12.2018)
* (Stübi) Update error handling

### 0.1.2 (17.12.2018)
* (Stübi) Update error handling

### 0.1.1 (15.12.2018)
* (Stübi) Improvements

### 0.1.0 (14.12.2018)
* (Stübi) First Version


## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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
