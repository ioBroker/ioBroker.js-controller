![Logo](admin/busware.jpg)
# ioBroker.cul

![Number of Installations](http://iobroker.live/badges/cul-installed.svg) ![Number of Installations](http://iobroker.live/badges/cul-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.cul.svg)](https://www.npmjs.com/package/iobroker.cul)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cul.svg)](https://www.npmjs.com/package/iobroker.cul)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.cul.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.cul)

[![NPM](https://nodei.co/npm/iobroker.cul.png?downloads=true)](https://nodei.co/npm/iobroker.cul/)

ioBroker adapter to control FS20, Max!, HMS and other devices via [CUL](http://busware.de/tiki-index.php?page=CUL) /
[culfw](http://culfw.de). Depends on https://github.com/hobbyquaker/cul

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Supported devices

- *EM* - EM1000WZ, EMWZ
- *FS20*, incl. ESA1000/2000
- *HMS* - HMS100-TF, HMS100-T, HMS100-WD, RM100-2, HMS100-TFK, HMS100-MG, HMS100-CO, HMS100-FIT
- *MORITZ* - MAX!
- *WS* - KS300TH, S300TH, WS2000/WS7000

## HowTo

### Send a command to a FS20 Device in e.g. JavaScript
```sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});```

This command uses the CUL Library of this adapter to send the command to a FS20 Device.
Javascript/Node.js based Busware CUL USB / culfw adapter

## Changelog

### 1.3.1 (2020-07-26)
* (Apollon77) make sure connection check do not crash adapter (Sentry IOBROKER-CUL-3)
* (Apollon77) crashes preventd (Sentry IOBROKER-CUL-5, IOBROKER-CUL-8)

### 1.3.0 (2020-07-20)
* (Apollon77) Really update dependencies and Serialport

### 1.2.2 (2020-04-30)
* (Apollon77) Update dependencies/Serialport 

### 1.2.1 (2020-03-18)
* (bluefox) Changed license from non SPDX conform 
    "GPL-2.0" to "GPL-2.0-or-later"

### 1.2.0 (2020-02-10)
* (MK-2001) Sending of FS20 cmdRAW possible or via sendTo as described in the readme
* (Bluefox) Refactoring

### 1.1.0 (2020-01-04)
* (foxriver76) removed usage of adapter.objects

### 1.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 0.4.0 (2018-03-07)
* (Apollon77/Michael Lorenz) Optimizations for nanoCul, Support for ESA devices

### 0.3.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 0.2.2 (2017-01-23)
* (bluefox) use new npm cul module

### 0.2.0 (2017-01-21)
* (bluefox) Add raw data state

### 0.1.1 (2017-01-14)
* (bluefox) Use newer version of cul module

### 0.1.0 (2016-11-01)
* (bluefox) Update cul package

### 0.0.4 (2015-04-16)
* (bluefox) update package.json

### 0.0.3 (2015-03-03)
* (bluefox) try to bring the adapter to state of the art

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2020 hobbyquaker
