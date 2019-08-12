

<h1>

<img  src="https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.multicast/master/admin/multicast.png"  width="64"/>
    ioBroker.multicast

</h1>

[![NPM version](http://img.shields.io/npm/v/iobroker.multicast.svg)](https://www.npmjs.com/package/iobroker.multicast)
[![Downloads](https://img.shields.io/npm/dm/iobroker.multicast.svg)](https://www.npmjs.com/package/iobroker.multicast)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.multicast.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.multicast)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.multicast/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.multicast)  
[![NPM](https://nodei.co/npm/iobroker.multicast.png?downloads=true)](https://nodei.co/npm/iobroker.multicast/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.multicast/master.svg)](https://travis-ci.org/iobroker-community-adapters/ioBroker.multicast)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.multicast?branch=master&svg=true)](https://ci.appveyor.com/project/iobroker-community-adapters/ioBroker-multicast/)

# Multicast-APi adapter for ioBroker
  
This adapter provides an API based on multicast communication protocol to send and receive states to devices with custom firmware.

Purpose of this adapter was :

* provide an alternative to http post and MQTT protokoll
* Have a uniform API available based on multicast communication and JSON formatted data transmission
* Have an zero-touch adapter in place to integrate any ethernet device (example : ESP based board eq Wemos D1 mini), like Vansware/Gosound smadmin/multicast.pngart plugs or other custom build automation.

### Zero touch ?

The APi is build in a way that requires no additional configuration of end-user using in the adapter itself or the device to be used.
I case wifi transmittion is used, only the wifi credential must be provided (lan based devices will be  handled fully automatically).
This requires effort by the developer of binary file to be flashed on the related chipset (like ESP based chipsets).

When the firmware follows all rules of the APi (see further below) the communication is handled as following :

* Device sends state values by UDP multicast
* Adapter recognizes this message and checks if states for this device are present in ioBroker

#### New Device
From previous message the adapter indicated no device found, following routine will be handled :

* ioBroker sends broadcast message to initialize device
* Device sends alle states and related structure to ioBroker
* ioBroker create the new device and all required states
* When all states are created, ioBroker sends an handshake to the device "ready to receive data"
* Device start sending his states in intervals or by changes ( as programmed by developer of device)

#### Existing Devices reconnection
From previous message the adapter indicated device already exist, following routine will be handled :

* ioBroker checks if configuration is set to "restore"
* When restore is activated, ioBroker sends all states (exept info states) to the device
* When all states are received, the de device sends an handshake to ioBroker "ready to receive data"
* ioBroker confirms
* Device start sending his states in intervals or by changes ( as programmed by developer of device)

#### State changes
The adapter is build to send up to 5-times a retry to ensure all state changes are received by the device. This procedure is handled as following :

* State is changed in ioBroker
* Adapter recognizes the value change and will send the new value to the device
* The device must confirm the message within 500ms
* If message is not confirmed, the adapter will resend the value again
* This will be handle up to an maximum of 5 retry's, after that a error message will indicate communication lost

### APi structure and documentation

{ to be done / in progress }

## Changelog

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2019 Dutchman & Andiling

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
