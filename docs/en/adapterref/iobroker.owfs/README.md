![Logo](admin/owfs.png)
# ioBroker OWFS Adapter
==============

![Number of Installations](http://iobroker.live/badges/owfs-installed.svg) ![Number of Installations](http://iobroker.live/badges/owfs-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.owfs.svg)](https://www.npmjs.com/package/iobroker.owfs)
[![Downloads](https://img.shields.io/npm/dm/iobroker.owfs.svg)](https://www.npmjs.com/package/iobroker.owfs)

[![NPM](https://nodei.co/npm/iobroker.owfs.png?downloads=true)](https://nodei.co/npm/iobroker.owfs/)


## *One wire file system* adapter for ioBroker.

Supported

This adapter uses the owfs library from https://www.npmjs.com/package/owjs and accordingly requires owfs server.

## Install OWFS Linux

```sudo apt-get install owfs```

Sometimes you need write following steps:
- To start the the server to communicate over serial interface with 1wire sensors 

```
owserver -d "/dev/ttyUSB0" --nozero
```

*/dev/ttyUSB0* is the name of your serial device. Here was USB stick used for that.

This command starts the 1wire server on local port 4304.

- To show the data from the local 1wire server in the file system call follwing command: 

```
owfs -C -m /mnt/1wire --allow_other
```
Before you must create the directroy */mnt/1wire* with command `mkdir /mnt/1wire`

## Install OWFS windows
http://sourceforge.net/projects/owfs/

## Changelog
### 0.5.0 (2018-03-16)
* (bluefox) Ready for Admin3

### 0.4.1 (2017-05-29)
* (ausHaus) fix translations

### 0.4.0 (2017-02-26)
* (bluefox) support iButtons

### 0.3.4 (2016-08-28)
* (bluefox) filter out service entries by list

### 0.3.3 (2016-08-25)
* (bluefox) custom poll interval for every sensor

### 0.3.2 (2016-08-24)
* (bluefox) support of local OWFS via file system

### 0.2.2 (2016-07-29)
* (bluefox) add new datapoints: pressure, volts, ...

### 0.2.1 (2016-07-28)
* (bluefox) fixes of write

### 0.2.0 (2016-07-27)
* (bluefox) discover sensors
* (bluefox) use other npm library to fix write

### 0.1.1 (2016-07-25)
* (bluefox) check configuration

### 0.1.0 (2016-07-08)
* (bluefox) remove rooms
* (bluefox) fix creation of states
* (bluefox) convert states to numbers
* (bluefox) support of quality codes

### 0.0.1 (2014-11-02)
* (bluefox) support of server (actual no authentication)

## Install

```node iobroker.js add owfs```

## Configuration

## License

The MIT License (MIT)

Copyright (c) 2015-2018, bluefox

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
