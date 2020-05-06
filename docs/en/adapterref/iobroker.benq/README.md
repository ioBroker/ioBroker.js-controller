![Logo](admin/benq-logo.png)
# ioBroker BenQ Projector adapter

![Number of Installations](http://iobroker.live/badges/benq-installed.svg) ![Number of Installations](http://iobroker.live/badges/benq-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.benq.svg)](https://www.npmjs.com/package/iobroker.benq)
[![Downloads](https://img.shields.io/npm/dm/iobroker.benq.svg)](https://www.npmjs.com/package/iobroker.benq)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.benq/master.svg)](https://travis-ci.org/instalator/ioBroker.benq)

[![NPM](https://nodei.co/npm/iobroker.benq.png?downloads=true)](https://nodei.co/npm/iobroker.benq/)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PFUALWTR2CTPY)

IoBroker BenQ Projector adapter is used to control your BenQ projector via RS232 in conjunction with the Etnernet Gateway.
The list of models and commands is contained in the `admin/commands.json` file.

## Hardware
The driver allows you to connect to the projectors BenQ through the [adapter](http://blog.instalator.ru/archives/744) RS232 to Ethernet.

As an RS232 gateway to Ethernet, any Arduino compatible card in which you need to download [this code](https://github.com/stepansnigirev/ArduinoSerialToEthernet) is used.
You will also need an Ethernet Shield W5100 or W5500 and an RS232 to TTL converter.

## Support
Supported models: W1200, W1070, W1080 to be...

## Changelog

### 0.2.1
 * (instalator) support compact mode
 * (instalator) support admin3
 * (instalator) refactoring

### 0.0.6
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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
