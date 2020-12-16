![Logo](admin/contactid.png)
# ioBroker.contactid

[![NPM version](http://img.shields.io/npm/v/iobroker.contactid.svg)](https://www.npmjs.com/package/iobroker.contactid)
[![Downloads](https://img.shields.io/npm/dm/iobroker.contactid.svg)](https://www.npmjs.com/package/iobroker.contactid)
![Number of Installations (latest)](http://iobroker.live/badges/contactid-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/contactid-stable.svg)
[![Dependency Status](https://img.shields.io/david/schmupu/iobroker.contactid.svg)](https://david-dm.org/schmupu/iobroker.contactid)
[![Known Vulnerabilities](https://snyk.io/test/github/schmupu/ioBroker.contactid/badge.svg)](https://snyk.io/test/github/schmupu/ioBroker.contactid)

[![NPM](https://nodei.co/npm/iobroker.contactid.png?downloads=true)](https://nodei.co/npm/iobroker.contactid/)

**Tests:** ![Test and Release](https://github.com/schmupu/ioBroker.contactid/workflows/Test%20and%20Release/badge.svg)


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

### 1.0.2 (2020.12.13)
* (Stübi) Bugfixing, ACK-invalid Format - Issue #14 

### 1.0.1 (2019.10.14)
* (Stübi) Bugfixing, Issue #9 


## License
MIT License

Copyright (c) 2020 Thorsten Stueben <thorsten@stueben.de>

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