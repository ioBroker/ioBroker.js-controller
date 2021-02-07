![Logo](admin/nut.png)
# ioBroker.nut

![Number of Installations](http://iobroker.live/badges/nut-installed.svg) ![Number of Installations](http://iobroker.live/badges/nut-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.nut.svg)](https://www.npmjs.com/package/iobroker.nut)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nut.svg)](https://www.npmjs.com/package/iobroker.nut)
[![Code Climate](https://codeclimate.com/github/Apollon77/ioBroker.nut/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.nut)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/Apollon77/ioBroker.nut/master.svg)](https://travis-ci.org/Apollon77/ioBroker.nut)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.nut?branch=master&svg=true)](https://ci.appveyor.com/project/Apollon77/ioBroker-nut/)

[![NPM](https://nodei.co/npm/iobroker.nut.png?downloads=true)](https://nodei.co/npm/iobroker.nut/)

This adapter for ioBroker connects to a defined NUT server to provide the status and details of a connected UPS/USV as ioBroker states, so that it can be used there.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Description of parameters
### host_ip
IP address of the NUT server. NUT needs to run in server mode and needs to be accessible by the computer the
iobroker NUT adapter runs on. So check firewall settings if you have problems and allow the access. If the UPS
is connected locally you can also use 127.0.0.1 or localhost.

### host_port
Port of NUT. The default port is <b>3493</b>

### ups_name
Name of the UPS as defined in the NUT configuration of the NUT server.</p>
Hints:
- If you want to connect to an UPS connected to a Synology diskstation the name is simply "ups".
- If you want to connect to an UPS connected to a QNAP NAS the name is simply "qnapups".

### update_interval
Interval in Seconds to update the data. Default is 300s

## UPS-Monitor Notifies
Included is a small linux shell-script at scripts/nut-notify.sh which can be configured in upsmon.

The script needs execute rights (chmod +x nut-notify.sh).

It should be added to /etc/nut/upsmon.conf like:

```
NOTIFYCMD "cd /opt/iobroker/;./nut-notify.sh"
```

Additionally configure all relevant notify messages like:

```
NOTIFYFLAG ONLINE       SYSLOG+WALL+EXEC
NOTIFYFLAG ONBATT       SYSLOG+WALL+EXEC
NOTIFYFLAG LOWBATT      SYSLOG+WALL+EXEC
NOTIFYFLAG FSD          SYSLOG+WALL+EXEC
NOTIFYFLAG COMMOK       SYSLOG+WALL+EXEC
NOTIFYFLAG COMMBAD      SYSLOG+WALL+EXEC
NOTIFYFLAG SHUTDOWN     SYSLOG+WALL+EXEC
NOTIFYFLAG REPLBATT     SYSLOG+WALL+EXEC
NOTIFYFLAG NOCOMM       SYSLOG+WALL+EXEC
NOTIFYFLAG NOPARENT     SYSLOG+WALL+EXEC
```
Important is the added "EXEC" flag.

One simple example for a nut-notify.sh script is:
```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```


## Troubleshooting
If you have problems and the adapter do not deliver the data you can use the two scripts in directory "test"
of the adapter installation (so normally in node_modules/iobroker.nut/test relative to your iobroker installation
directory) to try it out on the commandline. Call the scripts using "node filename.js" to see the awaited parameters.</p>
* **test_upslist.js**: Connects to the NUT server and returns a list of available UPS names
* **test_upsvars.js**: Connects to the NUT server for a defined UPS and returns a list of available UPS variables

## Todo
* docs for webpage

## Changelog

### 1.4.3 (2021-02-04)
* (Apollon77) Enhance the port check

### 1.4.2 (2021-01-23)
* (Apollon77) Check configured port before using it (Sentry IOBROKER-NUT-3)

### 1.4.1 (2021-01-21)
* (Apollon77) Optimize stop handling (Sentry IOBROKER-NUT-1)

### 1.4.0 (2021-01-14)
* (Apollon77) Prevent warnings in js-controller 3.2
* (Apollon77) Require at least js-controller 2.0

### 1.3.0 (2020-12-27)
* (Apollon77) adjust connection close handling
* (Apollon77) add compact mode

### 1.2.0 (2020-12-26)
* (Apollon77) update dependencies
* (Apollon77) Add Sentry error reporting

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (2018-03-28)
* Fix status parsing

### 1.1.1
* Enhance error handling

### 1.1.0
* Add possibility to call commands on the UPS

### 1.0.0
* change mode from schedule to deamon
* implement message support to receive messages from upsmon
* add status.severity to get one status about the USV with values idle, operating, operating_critical, action_needed, unknown

### 0.3.0
* add better usable status states under "status" channel

### 0.2.1
* finalizied initial version

### 0.1.0
* initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2016-2020 Apollon77 <ingo@fischer-ka.de>

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
