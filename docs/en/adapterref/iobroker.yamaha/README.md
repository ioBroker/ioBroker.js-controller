![Logo](admin/yamaha.png)
## ioBroker.yamaha

![Number of Installations](http://iobroker.live/badges/yamaha-installed.svg) ![Number of Installations](http://iobroker.live/badges/yamaha-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.yamaha.svg)](https://www.npmjs.com/package/iobroker.yamaha)
[![Tests](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.yamaha/master.svg)](https://travis-ci.org/iobroker-community-adapters/ioBroker.yamaha)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/iobroker-community-adapters/iobroker.yamaha/blob/master/LICENSE)

#### Description

Adapter for Yamaha AV receivers

### Initial Creation
This adapter was initialy created by @soef at https://github.com/soef/ioBroker.yamaha but not maintained any more, so we moved it to iobroker-community so that bugs could be fixed. thanks @soef for his work.

#### Configuration
Currently without autodiscover, you have to enter the IP of your receiver

#### Installation
via ioBroker Admin.

Otherweise execute the following command in the iobroker root directory (e.g. in /opt/iobroker)
``
npm install iobroker.yamaha 
iobroker upload yamaha
``

#### Realtime
The states will be created, when they accur. I.e. use your ir-remote and change something and you will see the new states. 
Only one connection is accepted by yamaha devices.

#### Requirements
Yamaha Reciver

You have to enable "network standby" function in the configuration of your receiver


## Changelog
### 0.3.21
* (Garfonso) added admin 3 compatibility and more meta-data stuff.
* (Garfonso) added compact mode support.
### 0.3.20
* (Garfonso) adjusted local copy of soef.js to js-controller 3.0
* (Garfonso) updated meta information (links etc) to iobroker-community-adapters
### 0.3.19
* (soef) Changelog added to readme
### 0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps
### 0.3.17
* (Apollon77) update basic package-file testing
### 0.3.16
* (soef) node 0.12 removed from testing
### 0.3.15
* (soef) Enhance CI testing
### 0.3.14
* (soef) Possible exception in reconnect fixed
### 0.3.12
* (soef) Version incr. for npm
### 0.3.11
* (soef) reconnect overworked
### 0.3.10
* (soef) realtime Ping now configurable
### 0.3.8
* (soef) realtime states optimized
### 0.3.7
* (soef) fix typo in creating realtime states
### 0.3.6
* (soef) timeout to connect reduced

<!--
### License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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
-->
