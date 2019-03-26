![Logo](admin/contactid.png)

# ioBroker.contactid
==================

[![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.contactid.svg?branch=master)](https://travis-ci.org/schmupu/ioBroker.contactid)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.contactid?branch=master&svg=true)](https://ci.appveyor.com/project/schmupu/ioBroker-contactid/)
![Number of Installations](http://iobroker.live/badges/contactid-installed.svg) ![Number of Installations](http://iobroker.live/badges/contactid-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.contactid.svg)](https://www.npmjs.com/package/iobroker.contactid)
[![Downloads](https://img.shields.io/npm/dm/iobroker.contactid.svg)](https://www.npmjs.com/package/iobroker.contactid)

[![NPM](https://nodei.co/npm/iobroker.contactid.png?downloads=true)](https://nodei.co/npm/iobroker.contactid/)


The protocol Contact ID used by alarm systems to communicate with central stations.

This adapter is a Contact ID Server. When an alarm event is triggered, the alarm system sends over IP the Contact ID message to the central station.
You can use ioBroker with this adapter as central station. For example. you can send for a alarm by Conntact ID  a telegram message.  

The Contact-ID message

  SSSS 18QEEEGGZZZC

  * SSSS – Subscriber. These four digits identify the specific alarm system or customer to the central station. ioBroker allows longer subscriber names.

  * 18 - Message Type. Basically this field should always be “18”.
  * Q – Event Qualifier.
  * EEE – Event Code.
  * GG – Group/Partition Number.
  * ZZZ – Zone Number (001 - 999). This is the number of the zone that triggered the alarm.
  * C – Checksum.

[Contact ID protocol](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)


## Install & Configuration

1. Install the adapter
2. Configuration of the adapter:

  Choose the IP-address and port for listening for Conctact-ID requests.
  Register you subcriber name to identify you burglar alarm messages and
  select your burglar alarm type.

3. Configure your burglar system to send Contact ID messages

    Lupusec XT1:

      Einstellungen -> Contact ID : rptn://subcriber@ip-address-iobroker:port
      Example: rptn://test@192.168.20.1:50000

    Lupusec XT1+/XT2/XT2+/XT3:

      Einstellungen -> Contact ID : ip://subcriber@ip-address-iobroker:port/CID
      Example: ip://test@192.168.20.1:50000/CID


4. Testing the Adpater

  Open command shell and type  

  ```
  telnet ip-address-iobroker port
  Example: telnet 192.168.20.1 50000

  ```

  Now you can sen a Conntact ID Message. For Lupsec burglar alarm systems the
  message begins and ends with [ and ]. Type in your telnet session:

  ```
  [SSSS 18QEEEGGZZZC]
  Example: [test 18160201010B]
  ```

  Now you can see the message in the ioBroker objects


## Changelog

### 1.0.0 (2019.01.05)
* (Stübi) Support js-controller compact mode 

### 0.1.6 (2018.12.27)
* (Stübi) Update Core Adapter

### 0.1.5 (2018.06.07)
* (Stübi) Translations

### 0.1.3 (2018.06.07)
* (Stübi) Cleanup

### 0.1.2 (2018.06.07)
* (Stübi) Improvements

### 0.1.1 (2018.06.03)
* (Stübi) Lupusec XT1 Plus, XT2 Plus and XT3 added

### 0.1.0 (18.05.2018)
* (Stübi) First Beta Release

### 0.0.6 (2018.05.18)
* (Stübi) fixed error i
* (Stübi) correction of README.md

### 0.0.5 (2018.05.17)
* (Stübi) fixed error in drop down menu

### 0.0.4 (15.05.2018)
* (Stübi) code improvements


## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten <thorsten@stueben.de>

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
