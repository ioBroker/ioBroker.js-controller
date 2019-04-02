![Logo](admin/fakeroku.png)
# ioBroker.fakeroku

[![Build Status](https://travis-ci.org/Pmant/ioBroker.fakeroku.svg?branch=master)](https://travis-ci.org/Pmant/ioBroker.fakeroku)
![Number of Installations](http://iobroker.live/badges/fakeroku-installed.svg) 
![Number of Installations](http://iobroker.live/badges/fakeroku-stable.svg) 

This ioBroker Adapter emulates a Roku and it's only purpose is to connect ioBroker to Logitech Harmony Hubs. 
It may also work with other devices which can control a Roku.

## Installation
Intall Adapter in ioBroker Admin

## Usage

### Configuration in ioBroker Admin:
- ***LAN-IP*** needs to be the network IP of your ioBroker device
- ***Multicast IP*** only change this if you know what you are doing
- ***Roku devices*** add / change / delete devices to emulate

### Configuration in Harmony APP & Software
Add Roku 3 device following this Guide:
https://support.myharmony.com/en-us/harmony-experience-with-roku
You can rename the device on your Harmony.

### States
States are automatically created when fakeRoku receives a key for the first time.

## Changelog

### 0.2.1
  (Pmant) fix jQuery error in admin
  (ykuendig) add translations

### 0.2.0
  (Pmant) run multiple fakeroku's in one instance

### 0.1.1
  (Pmant) fix package.json

### 0.1.0
  (Pmant) initial release
  
## License
The MIT License (MIT)

Copyright (c) 2017 Pmant

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
