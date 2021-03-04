---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.mydlink.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.mydlink.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/mydlink-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/mydlink-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/iobroker-community-adapters/ioBroker.mydlink/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.mydlink.png?downloads=true
---
![Logo](../../admin/mydlink.png)
# ioBroker.mydlink

MyDlink Adapter for ioBroker. 
------------------------------------------------------------------------------

Allows to control power sockets or motion detectors from [D-Link](https://eu.dlink.com/uk/en/for-home/smart-home) from within ioBroker. 

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
This also helps with supporting new devices.

Currently tested devices:

| Model | Type  | Image |
| :---: | :---: | :---: |
| DSP-W215 | Smart Plug (socket, temperature, current) **Needs polling** | ![Image](media/DSP_W215.png) |
| DSP-W115 | Smart Plug (socket) | ![Image](media/DSP_W115.png) | 
| DCH-S150 | Motion Detector (last motion detected) **Needs polling** | ![Image](media/DCH_S150.png) |

The adapter needs to poll some devices. Newer ones do send push messages, which is now supported. Sensor readings and motion detection will be 
delayed by polling interval, if they need to be polled (can be set in config).

#### Configuration:
* List of devices, each device with following settings:

<table>
<tr><td>Name</td><td>set a name here, must be unique (for mydlink devices)</td></tr>
<tr><td>IP</td><td>fill in IP address here, hostname should also work</td></tr>
<tr><td>PIN</td><td>PIN is printed on a sticker on the device, probably at the bottom. Can be TELNET for DSP-W115, see below.</td></tr>
<tr><td>Poll interval</td><td>per device poll interval<br /> Set 0 to disable polling. <br /><b>Recommendation:</b> Set a fast poll interval for sensors and a longer one for plugs.</td></tr>
<tr><td>enable</td><td>if not enabled, will not be polled or controlled. <br />Devices that are not plugged in can be disabled to avoid network traffic and error messages in the log.</td></tr>
</table>

The adapter does not interfere with the use of the app.

## Setup of DSP-W115

DSP-W115 and other *newer* devices use a completely different protocol and a different setup. There are two ways to use them.

1. Use App and Adapter at the same time:
  If you want to keep using the app, you have to put the device into factory mode, following this procedure:
  1. Reset device into recovery mode by holding the wps/reset button during boot until it starts blinking **red** instead of orange.
  2. Now a telnet deamon is running, connect to the device wifi
  3. Run `telnet 192.168.0.20` and login with `admin:123456` (or use putty, don't forget to select `telnet` instead of `ssh`).
  4. Run `nvram_set FactoryMode 1`
  5. Run `reboot; exit;` to reboot the device.
  6. Now you should enter `TELNET` as Pin, and the adapter will retrieve the required data from the device itself.
2. Don't want to use the App
  1. Remove the device from the app, this will reset the device
  2. Start setup in the app again and configure your Wifi on the device.
  3. Now the device will reoobt and connect to your Wifi. During that time **close** the app, make sure it is really closed.
  4. Now the device should be connected to your Wifi and not connected to the app, so that the PIN from the sticker will work in the adapter.
  (If the device does not connect to your wifi or the device does not accept login via the PIN please try again. Press the button on the device until it lights up red in order to reset.

## Changelog
<!-- 
	Placeholder for next versions (this needs to be indented):
	### __WORK IN PROGRESS__
	npm install @alcalzone/release-script
-->
### __WORK IN PROGRESS__
* added: `telnet` token is now case insensitive

### 1.1.7 (2020-10-09)
* fixed: prevent error message with new mydlink plugs on switch

### 1.1.6 (2020-10-09)
* fixed: prevent error message with new mydlink plugs on switch (broken)

### 1.1.5 (2020-09-03)
* Add: support for DCH-S160 water detector added (needs polling, linke motion detector).

### 1.1.4 (2020-06-23)
* fixed: sometimes state was always reported as true.

### 1.1.3 (2020-06-18)
* fixed: if error during login, polling would stop.
* fixed: can now update device name from config again
* change: read devices from config in UI again
* change: in UI do not create +-Button if detected device is already in devices table.

### 1.1.2 (2020-06-01)
* fixed two possible crashes with offline / wrong devices.

### 1.1.1 (2020-06-01)
* Improved auto detection of DSP-W115 (but mdns seems very unreliable whit that device)
* UI should never delete user devices

### 1.1.0 (2020-05-31)
* Added Support for w115 (and maybe other never myDlink devices, might even do *something* with cameras)
* Fix relogin to device (i.e. when device was restarted during adapter runtime) 
* Fix error when switching a socket.

### 1.0.11 (2020-05-10)
* Tried to add even more information in case device seems incompatible

### 1.0.10 (2020-05-10)
* Returned to login with user "Admin"
* Tried to add more debug for incompatible devices.

### 1.0.9 (2020-05-07)
* Fixed: changes in configuration were not respected once devices were created
* Fixed: re-login to device on switching if polling is disabled
* Fixed: Error output on switching now more informative

### 1.0.8 (2020-05-05)
* Fixed switching, was broken in some circumstances by id changes.

### 1.0.7 (2020-05-02)
* Made saving config more robust and direct again.
* Made identify by IP more robust and allows saving right away. 
* Prevent saving if devices without PIN are configured.

### 1.0.6 (2020-05-02)
* Prevent creation of empty devices (MYDLINK-6)

### 1.0.5 (2020-05-02)
* Fixed possible issue with device ids.
* Improved device creation
* Adjusted for discovery adapter that not yet stores passwords encrypted.

### 1.0.4 (2020-05-01)
* Improved connection keepAlive
* Improved logging of network errors

### 1.0.3 (2020-05-01)
* Fixed login/identification loop on (possibly) duplicate devices

### 1.0.2 (2020-04-30)
* Fixed potential crashes on network errors.

### 1.0.1 (2020-04-30)
* Re-added device config to adapter config (in case objects get deleted).

### 1.0.0 (2020-04-30)
* BREAKING CHANGE: device id is now mac instead of name -> all devices need to be recreated. Sorry for that. But should never happen again, now. New devices *should* be created automatically.
* added encryption of PIN
* settings stored in native part of device (please do not delete them or you have to reconfigure them)
* modified device creation / identification / start to allow devices to be (re-)started during runtime (you do not need to press save on config page anymore)
* added auto detection
* added missing translations
* added sentry plugin (including sending information about unknown devices)
* a lot of internal restructuring and cleanup for better maintenance in future.

### 0.0.7
* (Garfonso) added info.connection state
* (Garfonso) suppressed repeated error messages during polling.

### 0.0.6
* (Garfonso) prevent removement of custom details in objects.

### 0.0.5
* (Garfonso) fixed config files for release in latest repository.

### 0.0.4
* (Garfonso) polling interval can now be configured on per device basis (if not configured for a device global poll intervall will be used.) Recommendation: Use high global poll interval and a smaller one for motion detectors.
* (Garfonso) added no_motion state for motion detectors, contains number of seconds since last motion.

### 0.0.3
* (Garfonso) use setStateChanged instead of polling state before writing.
* (Garfonso) minor clean ups.

### 0.0.2
* (Garfonso) move to ioborker-community-adapters

### 0.0.1
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2020 Garfonso <garfonso@mobo.info>

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