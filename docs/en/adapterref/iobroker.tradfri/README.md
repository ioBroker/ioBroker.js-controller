![Logo](admin/tradfri.png)
ioBroker.tradfri
=================

**Tests:** Linux/Mac: [![Build Status](https://travis-ci.org/AlCalzone/ioBroker.tradfri.svg?branch=master)](https://travis-ci.org/AlCalzone/ioBroker.tradfri) 
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AlCalzone/ioBroker.tradfri?branch=master&svg=true)](https://ci.appveyor.com/project/AlCalzone/ioBroker-tradfri/)

[![Total alerts](https://img.shields.io/lgtm/alerts/g/AlCalzone/ioBroker.tradfri.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/AlCalzone/ioBroker.tradfri/alerts/)

================


## Requirements
![Number of Installations](http://iobroker.live/badges/tradfri-installed.svg) ![Number of Installations](http://iobroker.live/badges/tradfri-stable.svg) * Linux (e.g. Raspberry Pi) / OSX / Windows
* NodeJS >= 6.x
* Trådfri gateway

## Installation
1. Install this adapter over the iobroker admin GUI or via `npm install iobroker.tradfri --production` 
1. In the ioBroker GUI, add an adapter instance. 
1. Configure the instance by entering the IP/hostname of your gateway and the security code that can be found on the label at the bottom.

### Troubleshooting installation issues:
#### Linux/OSX:
Make sure you install the most recent released version. If there are compilation errors, you might have to install build-essential:
```
apt-get -y install build-essential
```

#### Windows:
If you are running on older NodeJS versions (< 10), the installation may fail with the following error somewhere in the log:
```
Can't find Python executable "python", you can set the PYTHON env variable.
```

To solve it, open an administrative shell:
1. Press the <kbd>&#8862;&nbsp;Windows</kbd> key
2. Enter `cmd`, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd>
3. Confirm the UAC prompt
and run the following command:
```
npm install --add-python-to-path --global windows-build-tools
```
This may take a while... afterwards the installation should succeed.

## Sending custom CoAP packets
You can send custom CoAP packets from other adapters by using `sendTo`. Example from JavaScript:
```js
sendTo("tradfri.0", "request", options, (ret) => {
	// do something with the result
});
```
The `options` object looks as follows:
```js
{
	path: string,
	method?: "get" | "post" | "put" | "delete", // optional, default = "get"
	payload?: object                            // optional, should be a JSON object
}
```
The result object `ret` looks as follows:
```js
{
	error: string | null,
	result: {
		code: string,            // see https://tools.ietf.org/html/rfc7252#section-12.1.2
		payload: object | Buffer
	}
}
```

## Changelog

#### 2.1.0 (2019-01-08)
* (AlCalzone) When `node-aead-crypto` is not installed, display instructions on how to fix it
* (AlCalzone) Optimizations and fixes under the hood
* (AlCalzone) Support for compact mode

#### 2.0.0 (2018-05-14)
* (AlCalzone) Support for Admin v3 and material design
* (AlCalzone) **BREAKING:** Dropped support for Admin v2

#### 1.5.4 (2018-11-11)
* (AlCalzone) Fix handling of decimal digits in the adapter settings. This fixes rounding of group states.

#### 1.5.2 (2018-11-06)
* (AlCalzone) Reworked installation procedure to fix problems with `node-aead-crypto`

#### 1.5.1 (2018-10-29)
* (AlCalzone) Added experimental support for smart plugs

#### 1.4.0 (2018-05-14)
* (AlCalzone) The names of state objects no longer get overwritten

#### 1.3.0 (2018-05-06)
* (AlCalzone) Reduce logging of "updated scenes for group..."
* (AlCalzone) Made rounding of numeric values configurable
* (AlCalzone) Stability improvements

#### 1.2.1 (2018-05-01)
* (AlCalzone) Use the native encryption methods of NodeJS 10 instead of `node-aead-crypto`

#### 1.1.11 (2018-04-27)
* (AlCalzone) Add support for NodeJS 10

#### 1.1.10 (2018-03-18)
* (AlCalzone) Improved automatic reconnection

#### 1.1.9 (2018-03-15)
* (AlCalzone) Fixed group states not always updating the lightbulbs when changed

#### 1.1.8 (2018-03-09)
* (AlCalzone) Ignore minimum brightness reports when lights are turned off

#### 1.1.7 (2018-02-23)
* (AlCalzone) Fixed activation of scenes when the scene is already selected

#### 1.1.6 (2018-02-22)
* (AlCalzone) Fixes for RGB support
* (AlCalzone) Support for floating point values

#### 1.1.3 (2018-02-15)
* (AlCalzone) Update `node-tradfri-client` version for better RGB support and floating point values

#### 1.1.1 (2018-02-07)
* (AlCalzone) Attempt to fix `TypeError: generator already running`

#### 1.1.0 (2018-02-07)
* (AlCalzone) Added an option to preserve the transition duration for single lightbulbs

#### 1.0.7 (2018-02-05)
* (AlCalzone) Fixed an error loading virtual groups

#### 1.0.6 (2018-01-13)
* (AlCalzone) Update `node-tradfri-client` version

#### 1.0.5 (2018-01-13)
* (AlCalzone) Removed error in log on adapter startup
* (AlCalzone) Change brightness role for better compatibility with the cloud adapter

#### 1.0.4 (2018-01-10)
* (AlCalzone) Removed warning caused by Gateway v1.3.14

#### 1.0.3 (2018-01-07)
* (AlCalzone) Updated `node-tradfri-client` version
* (AlCalzone) Load objects on adapter start so they don't get overwritten (#35)

#### 1.0.2 (2017-12-28)
* (AlCalzone) New attempt at automatically restarting the adapter on connection loss

#### 1.0.1 (2017-12-25)
* (AlCalzone) Update `node-tradfri-client` dependency to support receiving blockwise messages

#### 1.0.0 (2017-11-19)
* (AlCalzone) This is stable enough for a 1.x version
* (AlCalzone) Improved browser compatiblity of the admin UI

#### 0.6.0 (2017-11-07)
* (AlCalzone) Moved tradfri-related code into its own library
* (AlCalzone) Changed authentication procedure to comply with IKEA's request

#### 0.5.5 (2017-10-31)
* (AlCalzone) Restored compatibility to Gateway version 1.2.42

#### 0.5.4 (2017-10-29)
* (AlCalzone) Brightness is now expressed in 0..100%
* (AlCalzone) Fixed parsing RGB colors

#### 0.5.3 (2017-10-28)
* (AlCalzone) Fixed transition duration for groups

#### 0.5.2 (2017-10-28)
* (AlCalzone) Added icons for devices

#### 0.5.1 (2017-10-28)
* (AlCalzone) Support virtual groups
* (AlCalzone) Validate hex colors on input

#### 0.4.5 (2017-10-20)
* (AlCalzone) RGB and connection fixes.

#### 0.4.3 (2017-10-17)
* (AlCalzone) Experimental support for RGB and lightbulbs with fixed color

#### 0.3.4 (2017-10-17)
* (AlCalzone) Disabled automatic restart on connection loss.

#### 0.3.3 (2017-10-07)
* (AlCalzone) Eliminated potential sources of infinite loops

#### 0.3.2 (2017-10-04)
* (AlCalzone) Fixed an error resulting from the upgrade to ES2015 output

#### 0.3.1 (2017-10-02)
* (AlCalzone) Update CoAP library to fix a bug

#### 0.3.0 (2017-09-25)
* (AlCalzone) official release of the previous changes
* (AlCalzone) added transition duration and brightness change for groups
* (AlCalzone) monitor connection state and update info.connection
* (AlCalzone) fix connection attempts to unavailable endpoints

#### 0.2.9 (2017-09-25)
* (AlCalzone) Support changing the transition duration

#### 0.2.8 (2017-09-24)
* (AlCalzone) Fixed group and scene deletion

#### 0.2.7 (2017-09-23)
* (AlCalzone) Update CoAP and DTLS library for the next features
* (AlCalzone) Offloaded concurrency handling to CoAP lib

#### 0.2.5 (2017-09-12)
* (AlCalzone) Selection of scenes from the admin UI is now possible

#### 0.2.4 (2017-09-11)
* (AlCalzone) Add support for groups (renaming, switching)
* (AlCalzone) Partial support for scenes (switching when id is known)

#### 0.2.3 (2017-09-11)
* (AlCalzone) Send custom CoAP packets by using sendTo

#### 0.2.2 (2017-09-10)
* (AlCalzone) Changed internal handling of objects to prepare the next updates

#### 0.2.1 (2017-08-26)
* (AlCalzone) Sync io-package and package version

#### 0.2.0 (2017-08-14)
* (AlCalzone) Remove git dependency, publish on npm

#### 0.1.5 (2017-08-14)
* (AlCalzone) Ensure only whole numbers are sent (fixes #6)
* (AlCalzone) Fix connection to the gateway using the hostname

#### 0.1.4 (2017-08-12)
* (AlCalzone) Switched to TypeScript

#### 0.1.3 (2017-07-21)
* (AlCalzone) Reboot of the adapter without 3rd party libraries.

#### 0.1.2 (2017-05-06)
* (AlCalzone) Color temperature of lightbulbs is now expressed in terms of 0 (cold) - 100% (warm).

#### 0.1.1 (2017-05-04)
* (AlCalzone) Added support for NodeJS 4.X and building the dependencies on Windows systems

#### 0.1.0 (2017-05-02)
* (AlCalzone) initial release. 
* Functionality limited to controlling lightbulbs.

#### 0.0.0
* (AlCalzone) not ready yet!

## License
The MIT License (MIT)

Copyright (c) 2017 AlCalzone <d.griesel@gmx.net>

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
