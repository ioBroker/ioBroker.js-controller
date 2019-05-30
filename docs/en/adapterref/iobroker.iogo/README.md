![Logo](admin/iogo.png)

# ioBroker.iogo
=================

![Number of Installations](http://iobroker.live/badges/iogo-installed.svg) ![Number of Installations](http://iobroker.live/badges/iogo-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.iogo.svg)](https://www.npmjs.com/package/iobroker.iogo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iogo.svg)](https://www.npmjs.com/package/iobroker.iogo)
[![Travis-CI](http://img.shields.io/travis/nisiode/ioBroker.iogo/master.svg)](https://travis-ci.org/nisiode/ioBroker.iogo)

[![NPM](https://nodei.co/npm/iobroker.iogo.png?downloads=true)](https://nodei.co/npm/iobroker.iogo/)

This adapter is adding extra featrures to the smarthome app ioGo (https://play.google.com/store/apps/details?id=de.nisnagel.iogo).
Please navigate to settings/account in order to signup with email and password.
After creating an account in the app, you can use this adapter for push notification.
Additionally this adapter is storing the current states of your smarthome devices.

## Configuration
You should set your account information (email/password). After this start the adapter.

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

**Possible options**:
- *user*: Single user or list of users
- *text*: The notification's body text
- *title*: The notification's title

## PRO Features

Pro features are immediatly availabe after buying monthly/yearly subscription in ioGo App.

### Images ###
Just send the path to your image instead of text ```sendTo('iogo.0', 'absolute/path/file.png')```
```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

## Changelog

### 0.3.x
* (nisio) added support of compact mode
* (nisio) added support node 12

### 0.2.x
* (nisio) added pro features

### 0.1.x
* (nisio) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 - 2019 Nis Nagel <support@nisnagel.de>

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
