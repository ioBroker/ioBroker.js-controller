![Logo](admin/volumio.png)
# ioBroker.volumio

[![NPM version](http://img.shields.io/npm/v/iobroker.volumio.svg)](https://www.npmjs.com/package/iobroker.volumio)
[![Downloads](https://img.shields.io/npm/dm/iobroker.volumio.svg)](https://www.npmjs.com/package/iobroker.volumio)
![Number of Installations (latest)](http://iobroker.live/badges/volumio-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/volumio-stable.svg)
[![Dependency Status](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)](https://david-dm.org/a-i-ks/iobroker.volumio)
[![Known Vulnerabilities](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)](https://snyk.io/test/github/a-i-ks/ioBroker.volumio)

[![NPM](https://nodei.co/npm/iobroker.volumio.png?downloads=true)](https://nodei.co/npm/iobroker.volumio/)

**Tests:** ![Test and Release](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

### Support me
If this adapter has helped you to realise cool automations in your SmartHome and helped you reduce time to develop, you can invite me for a cup of coffee :) 

[![Donate](https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## volumio adapter for ioBroker

Volumio Adapter for ioBroker
This is an adapter for remote controlling a volumio instance.

It uses the following REST api:
https://volumio.github.io/docs/API/REST_API.html

At the moment, the following functions are implemented:
* Player commands
    * Mute / Unmute
    * Next / Prev
    * Play
        * Play the n-th song from the playlist
    * Pause
    * Toggle between Play/Pause
    * Stop
    * Volume control
        * Set to specific value
        * Volume step up / down
* Queue
    * Clear queue
    * Repeat track
    * Shuffel mode
* Receive player state

Todo:
- [ ] Set seek position
- [ ] List playlists
- [ ] Browsing


## Changelog

### 0.1.2
* (André Iske) Minor bug fixes 

### 0.1.1
* (André Iske) Minor bug fixes 

### 0.1.0
* (André Iske) Complete reworked adapter
    * Switched codebase to typescript
    * Changed License to MIT

### 0.0.1
* (André Iske) initial release

## License
MIT License

Copyright (c) 2021 André Iske <andre.iske@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
