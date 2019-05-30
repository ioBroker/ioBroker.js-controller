![Logo](admin/snips.png)
# ioBroker.snips
=================

[![Build Status](https://travis-ci.org/unltdnetworx/ioBroker.snips.svg?branch=master)](https://travis-ci.org/unltdnetworx/ioBroker.snips)
![Number of Installations](http://iobroker.live/badges/snips-installed.svg) ![Number of Installations](http://iobroker.live/badges/snips-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.snips.svg)](https://www.npmjs.com/package/iobroker.snips)
[![Downloads](https://img.shields.io/npm/dm/iobroker.snips.svg)](https://www.npmjs.com/package/iobroker.snips)

[![NPM](https://nodei.co/npm/iobroker.snips.png?downloads=true)](https://nodei.co/npm/iobroker.snips/)

Requires node.js 6.0 or higher and Admin v3!

The adapter communicates with Snips hardware by MQTT.The text2command adapter is required to execute
the commands.

Snips Url: https://makers.snips.ai/

## Installation Snips

For Snips under Debian Stretch (x86), Raspbian / Armbian Stretch (RPI3, Odroid) please install the following packages:

lsb-release 
apt-transport-https 
ca-certificates 
systemd 
systemd-sysv 
libttspico-utils 
alsa-utils
dirmngr
mosquitto
snips-asr
snips-audio-server
snips-dialogue
snips-hotword
snips-nlu
snips-tts
snips-injection

Depending on your hardware and Linux distribution, you may already have packages installed.

Installation instructions and configuration for Raspian / Armbian:
https://snips.gitbook.io/documentation/installing-snips/on-a-raspberry-pi

Installation instructions and configuration for Debian:
sudo nano /etc/apt/sources.list
Attach "non-free" in each line, otherwise you can not install the package "libttspico-utils".
https://snips.gitbook.io/documentation/advanced-configuration/advanced-solutions

Log in to https://console.snips.ai and add a new wizard.
Add an app, above the check mark "only show apps with actions" and search for iobroker ![ioBroker snips-app logo](https://console.snips.ai/images/bundles/bundle-home.svg) and select.
When you're done, press Deploy Assistant to download the ZIP file.
The zipfile is unpacked on the snips machine under "/ usr / share / snips", then reboot.

Snips should work before we continue here:

### Configure Snips Adapter
Url      : Address of the Snips-MQTT-Servers
Port     : Port of the Snips-MQTT-Servers
Instanz  : Text2Command-Instanz (for example 0)
Filter   : for example understand
ClientID : ID (for example 0)

### Configure Text2Command adapter
Insert in the config of the Text2Command adapter under Answer in ID snips.X.devices.all.send.say.text.

### Injection (learn new words)
Unknown words can be learned under snips.0.send.inject.room or device.
ATTENTION: inject service has to be installed on the device/server
sudo apt-get install -y snips-injection

## Changelog
### 1.1.7
* (unltdnetworx) security update because of vulnerability in pulled by mqtt-dependency mqtt-package

### 1.1.6
* (unltdnetworx) activation/deactivation of hotword recognition for each satellite (mute)

### 1.1.5
* (unltdnetworx) bugfixes for adapter-testing

### 1.1.4
* (unltdnetworx) control soundfeedback for every satellite

### 1.1.3
* (unltdnetworx) delete states after session ended

### 1.1.2
* (unltdnetworx) create satellites manually

### 1.1.1
* (apollon77) Update CI testing

### 1.1.0
* (unltdnetworx) support for satellites

### 1.0.1
* (wal) bugfix memoryleak

### 1.0.0
* (wal) stable version

### 0.3.1
* (unltdnetworx) bugfix for not recognized slots

### 0.3.0
* (unltdnetworx) slots reduced to two

### 0.2.2
* (unltdnetworx) slot setBoolean changed to setDevice

### 0.2.1
* (unltdnetworx) slot-type names converted to singular

### 0.2.0
* (unltdnetworx) support for compact-mode added

### 0.1.1
* (unltdnetworx) 2 new slots added incl. injection

### 0.1.0
* (wal) add soundfeedback

### 0.0.9
* (unltdnetworx) testadapter and slots added

### 0.0.8
* (wal) adaptation for new snips version

### 0.0.7
* (wal) file corrupt

### 0.0.6
* (wal) add receive.text

### 0.0.5
* (wal) bugfix injection

### 0.0.4
* (wal) add hotword recognize

### 0.0.3
* (wal) add filter and text2command_Instanz

### 0.0.2
* (wal) first working adapter

### 0.0.1
* (wal) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 Michael Schuster <development@unltd-networx.de> & Walter Zengel <w.zengel@gmx.de>

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
