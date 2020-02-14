![Logo](admin/iogo.png)

# ioBroker.iogo
=================

![Number of Installations](http://iobroker.live/badges/iogo-installed.svg) ![Number of Installations](http://iobroker.live/badges/iogo-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.iogo.svg)](https://www.npmjs.com/package/iobroker.iogo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iogo.svg)](https://www.npmjs.com/package/iobroker.iogo)
[![Travis-CI](http://img.shields.io/travis/nisiode/ioBroker.iogo/master.svg)](https://travis-ci.org/nisiode/ioBroker.iogo)

[![NPM](https://nodei.co/npm/iobroker.iogo.png?downloads=true)](https://nodei.co/npm/iobroker.iogo/)

This adapter is adding extra featrures to the smarthome app ioGo https://play.google.com/store/apps/details?id=de.nisnagel.iogo.
Please visit www.iogo.app for more information on how to getting started.


## Configuration
You need an valid licence key to use this adapter.
A licence can be bought after creating an acoount at https://www.iogo.app.

Please enter your account information (email/password) in the instance configuration.

## Usage
You can send message to all authenticated users over messageBox ```sendTo('iogo', 'New message')```
or to specific user ```sendTo('iogo', {user: 'Username', text: 'Test message'})```.
User must be created before (please read the application documentation for further details).

It is possible to specify more than one recipient (just separate the Usernames by comma). For example: Recipient: "User1,User4,User5"

Example how to send notification customized message with javascript:
```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

And one example with blockly:

![blockly](img/blockly.png)

Callbacks are supported aswell:
```
sendTo('iogo', {title: 'News', text: 'New message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Just send the path to your image instead of text or use url attribute ```sendTo('iogo.0', 'absolute/path/file.png')```
```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

**Possible options**:
- *user*: Single user or list of users
- *text*: The message itself
- *title*: The notification's title
- *url*: Absolute path to an image

## Changelog

### 0.5.x
* (nisio) Changes for ioGo app version 2.1.0+ (older versions no longer supported)
* (nisio) Split main.js into several files

### 0.4.x
* (nisio) Changes for ioGo app version 2.0.0+ (older versions no longer supported)

### 0.3.x
* (nisio) added support of compact mode
* (nisio) added support node 12

### 0.2.x
* (nisio) added pro features

### 0.1.x
* (nisio) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 - 2020 Nis Nagel <info@iogo.app>

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
