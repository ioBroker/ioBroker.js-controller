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
```javascript
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
### 0.4.18
* (soef) IP and MAC-address added to device object
### 0.4.17
* (soef) readme updated
### 0.4.16
* (soef) terminating adapter, if init fails, so that the adapter will be restarted",
### 0.4.15
* (soef) callmonitor: new toPauseState with extension
### 0.4.14
* (soef) Errorhandling of connecting to FritzBox extended
### 0.4.12
* (soef) Errorhandling of deflections fixed
### 0.4.11
* (Apollon77) Update utils.js and usage, CI Testing and deps
### 0.4.10 (2017-11-23)
* (soef) readme changelog extended
### 0.4.9
* (soef) fix tag error in io-package.json
### 0.4.8
* (soef) fix posible timeout on getting WLAN-Infos
### 0.4.6
* (soef) fix posible exception in deflections
### 0.4.5
* (apollon77) update basic package-file testing
### 0.4.4
* (soef) states of call forwarding will now be updated in the configured interval
### 0.4.3
* (soef) Call forwarding now configurable
### 0.4.2
* (soef) fixed exception in deflections
### 0.4.1
* (soef) fix changing forwarding state
### 0.4.0
* (soef) enable/disable call forwarding added
### 0.3.24
* (soef) States from the callmonitor are renewed, even if no change
### 0.3.23
* (soef) node 0.12 removed from testing
### 0.3.22
* (soef) Enhance CI testing
### 0.3.21
* (soef) using soef 0.4.6 to fix adapter load
### 0.3.20
* (soef) adapter type changed to media
### 0.3.19
* (soef) error message removed
### 0.3.18
* (soef) clear caller/callee before next call
### 0.3.17
* (soef) Only active will be shone in configuration
### 0.3.16
* (soef) Some extensions in onMessage discovery
### 0.3.15
* (soef) toPauseState added. Values: ring, connect, end
### 0.3.14
* (soef) callee name added
### 0.3.12 (2017-03-15)
* (bluefox) phone book for repeater excluded
* (bluefox) readme extended
### 0.3.11 (2017-03-07)
* (soef) external property adde to call list
### 0.3.10 (2017-03-07)
* (soef) Error message in configuration, if an older admin adapter is installed
### 0.3.7 (2017-03-06)
* (soef) Fixed imageurl for external phone book again. E.g. google
### 0.3.6 (2017-03-06)
* (soef) Fixed imageurl for external phone book. e.g. google
### 0.3.5 (2017-03-06)
* (soef) Json device list added
### 0.3.3 (2017-03-01)
* (soef) phonebook functions/states added
### 0.3.1 (2017-02-28)
* (soef) some bug fixes
* (soef) releasing call lists
### 0.3.0 (2017-02-25)
* (bluefox) use new table for configuration dialog

### 0.2.0 (2016)
* (soef) initial commit