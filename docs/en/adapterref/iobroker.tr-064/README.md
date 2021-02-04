---
local: true
---
![Logo](media/tr-064.png)
# ioBroker.tr-064

### Info
This adapter reads main information from AVM Fritz!Box, like call list or number of messages on answering machine.
Based on this [AVM documentations](https://avm.de/service/schnittstellen/)

### Simple states and functions
- turn on/off wifi for 2.4GHz and 5GHz,
- turn on/off guest wifi,
- reboot Fritz!Box,
- start WPS process,
- reconnect Internet
- external ip address

### ring (dial a number)
- When using an internel number (like **610) the ring state will let ring that internal phone.
e.g.: **610[,timeout]
- When using an external number, the ring state will connect you to the external number.
 The FritzBox will call the external number and your default phone will ring, when the called phone is picked up.
 The default phone can be configured in the FritsBox under:
 Telefonie/Anrufe/[Tab]Wahlhilfe/Wählhilfe verwenden

### toPauseState
- Values: ring, connect, end
- Can be used to pause a videoplayer on an incomming call (ring), or on pick up the phone (connect).
- Resume can be done on the end value.

### Presence
You can configure a list of devices to listen to.
Can be triggert by mDNS. When using MDNS, no polling ist needet and it is faster

### AB - Anrufbeantworter (answering machine)
Can be switch on/off.
The state cbIndex can be set, to address # of the answerig machine.

### Call monitor
The callmonitor will create realtime states for every inbound and outbound call.
If the phonebook is enabled (default), numbers will be resolved to Names
There ist also a state indicating a ringing phone.

### Phonebook
- The phone book, if enabled, will be used to get the name of callers phone number.
- Further there are three states to resolve a number or a name. If available you will also get the image URL of the contact.
  e.g.: if you set the state phonebook.number all 3 states, name, number and image will be set to the found contact. Note, searches by     name will first compare the complete name, if not found, part of is used.

### Call lists
Output formats:
- json
- html

Call lists are:
- all calls
- missed calls
- inbound calls
- outbound calls

Call count:
The call count can be set to 0. The next call will incement 1.

The html output can be configured by a template

### command & commandResult state
With the command state you can call every tr-064 command from this [documentation](https://avm.de/service/schnittstellen/).
e.g.

```
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

The command state shoud be set to a JSON of the above Lines. So { ... } (without command = and line breaks)
The callback of the call will set the commandResult state.

### Enable call monitor
To use the call monitor feature it must be first enabled in the AVM Fritz!Box.
To enable the call monitor dial ```#96*5*```  and the TCP/IP Port 1012 will be opened. To close the port dial ```#96*4*```.

### pre release versions
Prerelease versions are available at npm with the tag dev.
You cann install them from the ioBroker root directory with:

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog

### 4.2.4 (2021-02-02)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TR-064-1T)

### 4.2.3 (2021-01-16)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-1N)

### 4.2.2 (2020-12-25)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-1K)

### 4.2.1 (2020-11-13)
* (Apollon77) try to fix pot. not working disabling commands

### 4.2.0 (2020-11-09)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-15, IOBROKER-TR-064-16)
* (Apollon77) Try to solve error 500 problem with offline devices
* (SliX185) Add IPv6 states
* (foxriver76) optimizations
* (Apollon77) Fix initialization if ip/host

### 4.1.0 (2020-09-17)
* (Apollon77) Fix crash case (Sentry IOBROKER-TR-064-14)
* (bazidibavaria) added tablesort to device search
* (bazidibavaria) added Fritzbox link to admin

### 4.0.13 (2020-08-17)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-10)

### 4.0.12 (2020-08-06)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-Y)

### 4.0.11 (2020-07-26)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-W)

### 4.0.9 (2020-07-01)
* (Apollon77) handle cases correctly when no hosts are existing on device (Sentry IOBROKER-TR-064-R)

### 4.0.8 (2020-06-20)
* (Apollon77) Make sure states are only subscribed if initialization is done (Sentry IOBROKER-TR-064-J)

### 4.0.7 (2020-06-09)
* (Apollon77) Fix Admin UI to allow setting poll Interval correctly again

### 4.0.4 (2020-06-05)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-D)
* (Apollon77) Make sure adapter do not crash when invalid parameter are provided (Sentry IOBROKER-TR-064-B)
* (Apollon77) https is not supported right now (Sentry IOBROKER-TR-064-E)

### 4.0.3 (2020-05-11)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-7)
* (Apollon77) Make sure adapter do not crash when providing a non string to "ring" state (Sentry IOBROKER-TR-064-8) 

### 4.0.1 (2020-04-23)
* (Apollon77) handle case where no Phone deflections are available (Sentry IOBROKER-TR-064-1/2)

### 4.0.0 (2020-04-12)
* (Apollon77) update dependencies, use auto decrypt features with js-controller 3.0
* (foxriver76) make callmonitor compatible with js-controller 3.0

### 3.1.4 (2020-01-26)
* (Apollon77) fix error and check some other code check comments
* (Apollon77) Add proper meta data for buttons

### 3.1.1 (2020-01-25)
* (bluefox) Configuration dialog was improved
* (bluefox) Soef library was removed

### 3.0.0 (2020-01-24)
* (Apollon77) Switch Name back to tr064 because ewe got it from npmjs
* (maeb3) Enhance call handling and fix wrong data for currently active calls 
* (Apollon77) Remove unused state phonebook.ringing

### 2.0.3 (2019-12-17)
* (Jey Cee) fix delete last device from list

### 2.0.2 (2019-12-16)
* __requires js-controller v2__
* (foxriver76) no longer use adapter.objects
* (Apollon77) several fixes, Call lists working again, Phonebook fixed and many more

### 1.1.0 (2019-11-10)
* (jey cee) added Admin v3 support

### 1.0.0 (2019-04-01)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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