![Logo](admin/web.png)
# ioBroker.web

![Number of Installations](http://iobroker.live/badges/web-installed.svg) ![Number of Installations](http://iobroker.live/badges/web-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.web.svg)](https://www.npmjs.com/package/iobroker.web)
[![Downloads](https://img.shields.io/npm/dm/iobroker.web.svg)](https://www.npmjs.com/package/iobroker.web)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.web.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.web)

[![NPM](https://nodei.co/npm/iobroker.web.png?downloads=true)](https://nodei.co/npm/iobroker.web/)


Web server on the base of Node.js and express to read the files from ioBroker DB

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Tuning Web-Sockets
On some web-sockets clients there is performance problem with communication. 
Sometimes this problem is due to fallback of socket.io communication on long polling mechanism.
You can set option *Force Web-Sockets* to force using only web-sockets transport.

## Let's Encrypt Certificates
Read [here](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Extensions
Web driver supports extensions. The extension is URL handler, that will be called if such URL request appears.
The extensions look like the normal adapter, but they have no running process and will be called by web server.

E.g. the user can activate special proxy adapter and reach other devices (like webcams) in the same web server.
It is required to let all services be available under one web server.

## Brute-force protection
If authentication is enabled and the user enters 5 times invalid password during one minute, he must wait at least one minute till next attempt.
After 15th wrong attempt the user must wait 1 hour.

## "Stay logged in" option
If this options is selected the user stays logged in for one month.
If not, the user will stay logged in for the configured "login timeout".

## Access state's values
You can access the normal and binary state values via the HTTP get request.

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

or

```
http://IP:8082/state/javascript.picture.png =>
[IMAGE]
```

The image must be written in the javascript adapter like:

```
createState('javascript.0.picture.png', {type: 'file', name: 'Picture'}, () => {
    setBinaryState('javascript.0.picture.png', fs.readFileSync('/tmp/picture.png'));
});
```

## "Basic Authentication" option
Allows Login via Basic Authentication by sending `401` Unauthorized with a `WWW-Authenticate` header.
This can be used for applications like *FullyBrowser*. When entering the wrong credentials once, you will be redirected 
to the Login Page. 

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 3.4.1 (2021-04-30)
* (bluefox) Added support of admin5

### 3.4.0 (2021-04-12)
* IMPORTANT: js-controller 3.1 is now needed at least
* (foxrive76) fix a special case for requesting ranges only (Sentry IOBROKER-WEB-3M)
* (Apollon77) automatically decrypt secrets for web-extensions

### 3.3.0 (2021-02-01)
* (bluefox) The admin GUI was rewritten with reactJS 

### 3.2.3 (2021-01-12)
* (Apollon77) If no port is provided use default 8082 (Sentry IOBROKER-WEB-2S)
* (Apollon77) update dependencies of socketio and simple-api

### 3.2.0 (2021-01-08)
* (raintonr) Support of new Let's Encrypt (only with js-controller 3.2.x)
* (raintonr) Allow disabling to serve files or states from DB

### 3.1.0 (2020-11-26)
* (foxriver76) Add option for Basic Auth

### 3.0.14 (2020-10-30)
* (Apollon77) Prevent crash case (Sentry IOBROKER-WEB-1D)
* (foxriver76) Support html \<video\> tag on Safari (iOS)

### 3.0.13 (2020-09-06)
* (bluefox) Added the support of multi-language names for the welcome screen.

### 3.0.12 (2020-08-22)
* (bluefox) Updated used npm libraries 

### 3.0.10 (2020-07-28)
* (Apollon77) socketio pingTimeout and pinInterval increased to prevent too fast re-connections and bigger visualizations

### 3.0.9 (2020-06-11)
* (Apollon77) Upgrade socket-io adapter version
* (Apollon77) Optimize error handling for web-server initialization again

### 3.0.8 (2020-05-04)
* (Apollon77) web-server initialization optimized again to prevent errors with invalid certificates 

### 3.0.7 (2020-04-30)
* (Apollon77) errors on web-server initialization are handled properly

### 3.0.5 (2020-04-23)
* (bluefox) fixed the sentry warnings

### 3.0.4 (2020-04-16)
* (Apollon77) fix js-controller 3.0 warnings
* (Apollon77) add Sentry error reporting with js-controller 3.0

### 3.0.2 (2020-03-12)
* (bluefox) Web extensions were fixed

### 3.0.1 (2020-02-23)
* (Apollon77) Workaround for socket.io bug #3555 added to make sure always the correct client files are delivered

### 3.0.0 (2020-01-15)
* (Apollon77) upgrade all dependencies, especially socket-io to current version! This might break iPad 1/2 devices

### 2.4.10 (2019-11-07)
* (bluefox) Workaround for material was added

### 2.4.9 (2019-11-04)
* (Apollon77) permission errors fixed when whitelist had at least one entry

### 2.4.8 (2019-10-16)
* (bluefox) Fixed login of non-admin user

### 2.4.6 (2019-10-12)
* (bluefox) Fixed issue with simple-api

### 2.4.4 (2019-06-27)
* (bluefox) Fixed issue with socket.io.js not found

### 2.4.3 (2019-01-14)
* (SchumyHao) Add Chinese support

### 2.4.2 (2018-08-04)
* (bluefox) Fixed error with the access by the version

### 2.4.1 (2018-07-21)
* (bluefox) The support of the versioned links to adapter was added
* (bluefox) WhiteList was corrected
* (bluefox) Custom login background is supported

### 2.4.0 (2018-07-15)
* (bluefox) Pre-settings for instances now supported

### 2.3.6 (2018-06-27)
* (bluefox) URLs were sanitized

### 2.3.5 (2018-06-09)
* (bluefox) Used ioBroker.socket.io version 2.1.1
* (bluefox) Authentication problem was fixed

### 2.3.4 (2018-04-27)
* (bluefox) Used socket.io version 2.1.0

### 2.3.3 (2018-04-27)
* (bluefox) Fixing the new version of socket.io

### 2.3.2 (2018-04-14)
* (bluefox) fixed select ID dialog for old style (vis)

### 2.3.1 (2018-04-14)
* (bluefox) Updated socket.io version to 2.1.0

### 2.3.0 (2018-01-24)
* (bluefox) The required for Admin3 libraries are added

### 2.2.0 (2018-01-14)
* (bluefox) Ready for Admin3

### 2.1.9 (2017-11-19)
* (bluefox) Fix link to local admin on welcome screen

### 2.1.7 (2017-10-06)
* (bluefox) Fix link to local admin on welcome screen

### 2.1.4 (2017-10-02)
* (bluefox) Support of ioBroker.pro

### 2.0.6 (2017-08-05)
* (bluefox) Fix welcome screen

### 2.0.5 (2017-05-24)
* (bluefox) Update socket-io lib

### 2.0.4 (2017-04-25)
* (bluefox) show logout button if connected over cloud

### 2.0.3 (2017-04-01)
 * (bluefox) catch errors for invalid objects

### 2.0.2 (2017-02-08)
* (bluefox) fix selectID dialog

### 2.0.1 (2017-01-28)
* (bluefox) implement new welcome screen

### 2.0.0 (2017-01-05)
* (bluefox) support of web extensions
* (bluefox) protect against brute force attacks

### 1.7.7 (2017-01-04)
* (bluefox) fix error with authentication

### 1.7.6 (2016-12-07)
* (bluefox) Downgrade the socket.io to support older devices

### 1.7.5 (2016-11-14)
* (bluefox) Fix selectID Dialog

### 1.7.4 (2016-11-06)
* (bluefox) Fix unsubscribe of states

### 1.7.3 (2016-10-11)
* (bluefox) use new socket-io
* (bluefox) fix config dialog

### 1.7.2 (2016-09-25)
* (bluefox) Fix redirect for login

### 1.7.1 (2016-09-15)
* (bluefox) update selectID dialog

### 1.7.0 (2016-08-30)
* (bluefox) Compatible only with new admin

### 1.6.2 (2016-08-30)
* (bluefox) updated SelectID Dialog

### 1.6.1 (2016-08-27)
* (bluefox) support of letsEncrypt

### 1.5.4 (2016-08-14)
* (bluefox) support of web-sockets force

### 1.5.3 (2016-07-27)
* (bluefox) show links if root directory called

### 1.5.2 (2016-07-18)
* (bluefox) fix error with early logout
* (bluefox) update passport.socketio

### 1.5.1 (2016-07-06)
* (bluefox) support of chained certificates

### 1.5.0 (2016-06-29)
* (bluefox) update version of socket.io

### 1.4.8 (2016-06-19)
* (bluefox) bind socket to specified IP

### 1.4.7 (2016-05-24)
* (bluefox) add version dependency

### 1.4.6 (2016-05-23)
* (bluefox) update selectID dialog

### 1.4.5 (2016-05-17)
* (bluefox) make possible to change language without restart

### 1.4.4 (2016-05-13)
* (bluefox) update socket-io version

### 1.4.3 (2016-04-24)
* (bluefox) use new socket.io version

### 1.4.1 (2016-04-09)
* (bluefox) add grey jquery theme

### 1.4.0 (2016-03-17)
* (bluefox) rename files

### 1.3.5 (2016-03-11)
* (bluefox) update selectId dialog
* (bluefox) enable get files from disk and not from the cache, just request http://ip:8082/vis/file.png?something
* (bluefox) update packages

### 1.3.4 (2015-12-25)
* (bluefox) update socket-io

### 1.3.3 (2015-12-14)
* (bluefox) add themes

### 1.3.3 (2015-12-14)
* (bluefox) add themes

### 1.3.2 (2015-12-14)
* (bluefox) fix selectID.js
* (bluefox) update socket-io

### 1.3.0 (2015-11-15)
* (bluefox) add version compatibility check

### 1.2.2 (2015-11-14)
* (bluefox) support of multi-history

### 1.2.1 (2015-11-10)
* (bluefox) fix default user

### 1.2.0 (2015-11-06)
* (bluefox) support of npm 3.x

### 1.1.1 (2015-11-01)
* (bluefox) some files were missed on npm
*
### 1.1.0 (2015-11-01)
* (bluefox) update jquery UI libs

### 1.0.2 (2015-10-09)
* (bluefox) update selectID dialog

### 1.0.1 (2015-10-06)
* (bluefox) update selectID dialog
* (bluefox) enable resizing of columns in select ID dialog

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.4.4 (2015-08-14)
* (bluefox) update select ID dialog

### 0.4.3 (2015-08-11)
* (bluefox) fix filter in selectId dialog
* (bluefox) update packages

### 0.4.2 (2015-07-01)
* (bluefox) fix small package.json errors

### 0.4.1 (2015-06-28)
* (bluefox) change login form
* (bluefox) update version of simple-api
* (bluefox) add default user
* (bluefox) temporary enable install over npm
* (bluefox) use xtend 4.0.0

### 0.4.0 (2015-06-13)
* (bluefox) add permissions support

### 0.3.2 (2015-05-20)
* (bluefox) support of subscribeObjects in socket-io

### 0.3.1 (2015-04-24)
* (bluefox) make "_socket/info.js" available from every directory

### 0.3.0 (2015-04-23)
* (bluefox) enable https connection and improve login dialog

### 0.2.6 (2015-03-07)
* (bluefox) update socket-io

### 0.2.5 (2015-03-04)
* (bluefox) add sysLang variable to info.js (e.g. for Rickshaw)

### 0.2.4 (2015-02-14)
* (bluefox) fix error with update states if used internal socket.io

### 0.2.3 (2015-02-12)
* (bluefox) add simple api
* (bluefox) update select ID dialog

### 0.2.2 (2015-01-20)
* (bluefox) update select ID dialog

### 0.2.1 (2015-01-18)
* (bluefox) update select ID dialog

### 0.2.0 (2015-01-16)
* (bluefox) support of integrated socket (from ioBroker.socketio)

### 0.1.12 (2015-01-08)
* (bluefox) update selectId dialog

### 0.1.11 (2015-01-07)
* (bluefox) monitor state of socket.io to give correct connection data

### 0.1.10 (2015-01-06)
* (bluefox) cache web files in memory

### 0.1.9 (2015-01-03)
* (bluefox) update selectId dialog

### 0.1.8 (2015-01-02)
* (bluefox) enable socketio.0 by default

### 0.1.7 (2015-01-02)
* (bluefox) enable npm install

### 0.1.6 (2014-12-28)
* (bluefox) support empty files

### 0.1.5 (2014-12-26)
* (bluefox) extend select ID dialog with jquery Theme-roller

### 0.1.4 (2014-12-25)
* (bluefox) update select ID dialog

### 0.1.3 (2014-12-14)
* (bluefox) include "lib" directory with common files like jquery and jqGrid

### 0.1.2 (2014-12-05)
* (bluefox) read certificates from DB

### 0.1.1 (2014-12-05)
* (bluefox) use readFile instead of request

### 0.1.0 (2014-11-24)
* (bluefox) support of socket.io information

### 0.0.2 (2014-11-02)
* (bluefox) support of read binary states under http://ip:port/state/stateName

#### 0.0.1
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2021 Bluefox <dogafox@gmail.com>

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
