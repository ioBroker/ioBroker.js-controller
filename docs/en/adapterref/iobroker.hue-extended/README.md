![Logo](admin/hue-extended.png)
# ioBroker.hue-extended
Connect your Philips Hue Lights with ioBroker.

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=S45U45EHXGQHN&source=url)

![Number of Installations](http://iobroker.live/badges/hue-extended-installed.svg)
![Stable Version](http://iobroker.live/badges/hue-extended-stable.svg)
[![NPM Version](http://img.shields.io/npm/v/iobroker.hue-extended.svg)](https://www.npmjs.com/package/iobroker.hue-extended)
[![Commits since last release](https://img.shields.io/github/commits-since/Zefau/ioBroker.hue-extended/latest.svg)](https://github.com/Zefau/ioBroker.hue-extended/releases/latest)
[![Travis CI](https://travis-ci.org/Zefau/ioBroker.hue-extended.svg?branch=master)](https://travis-ci.org/Zefau/ioBroker.hue-extended)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hue-extended.svg)](https://www.npmjs.com/package/iobroker.hue-extended)

[![NPM](https://nodei.co/npm/iobroker.hue-extended.png?downloads=true)](https://nodei.co/npm/iobroker.hue-extended/) 


## Features
- Synchronize Lights
- Synchronize Groups
- Synchronize Scenes (including GroupScenes, LightScenes and Scenes from [HueLabs](https://labs.meethue.com/))
- Synchronize Sensors 
- Synchronize Schedules
- Synchronize Config
- Synchronize Resources
- Synchronize Rules
- Trigger changes on states `on/off`, `brightness` (`level`), `hue`, `saturation`, `xy`, `colorTemperature`, `alert`, `effect` and `transitiontime`
- Additional triggers based on color spaces for `rgb`, `hsv` and `hex`
- Apply own combination of commands using `_commands` trigger
- Control lights of all groups at once using `0-all` group
- Run scene or apply `_scene` on light or group


## Changelog / Release-Notes

Please see [release page](https://github.com/Zefau/ioBroker.hue-extended/releases) for changelog and detailed information.


## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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
