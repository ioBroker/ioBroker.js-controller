<h1>
    <img src="admin/fb-checkpresence.png" width="64"/>
    ioBroker.fb-checkpresence
</h1>

![Number of Installations](http://iobroker.live/badges/fb-checkpresence-installed.svg) ![Number of Installations](http://iobroker.live/badges/fb-checkpresence-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)](https://www.npmjs.com/package/iobroker.fb-checkpresence)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)](https://www.npmjs.com/package/iobroker.fb-checkpresence)
[![Dependency Status](https://img.shields.io/david/afuerhoff/iobroker.fb-checkpresence.svg)](https://david-dm.org/afuerhoff/iobroker.fb-checkpresence)
[![Known Vulnerabilities](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence)

[![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)](https://nodei.co/npm/iobroker.fb-checkpresence/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/afuerhoff/ioBroker.fb-checkpresence/master.svg)](https://travis-ci.org/afuerhoff/ioBroker.fb-checkpresence)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/afuerhoff/ioBroker.fb-checkpresence?branch=master&svg=true)](https://ci.appveyor.com/project/afuerhoff/ioBroker-fb-checkpresence/)

## fb-checkpresence adapter for ioBroker

The adapter checks the presence of family members over the fritzbox. 
You must fill in the name of the family member and the mac-address (or ip-address) of the used device. 
The comment is optional and you can enable or disable the family member. 
The datapoint is based on the member name.

### Adapter pre conditions
For the correct function you have to install a history adapter. You can choose
one of the following adapters:
* History
* SQL
* InfluxDB

## Used device
For this adapter the AVM Fritzbox is used. Here you can find informations about
the Fritzbox https://avm.de/produkte/fritzbox/.
The fritzbox services are used over the TR-064 protocol.

### Fritzbox conditions

The used TR-064 interface from the fritzbox is described here: https://avm.de/service/schnittstellen/.
Following TR-064 services and actions are used:
* Hosts:1 - X_AVM-DE_GetHostListPath (supported since 2017-01-09)
* Hosts:1 - X_AVM-DE_GetMeshListPath
* Hosts:1 - GetSpecificHostEntry
* Hosts:1 - X_AVM-DE_GetSpecificHostEntryByIP (supported since 2016-05-18)
* DeviceInfo:1 - GetSecurityPort
* DeviceInfo:1 - GetInfo
* WANPPPConnection:1 - GetInfo
* WANIPConnection:1 - GetInfo
* WLANConfiguration3 - SetEnable
* WLANConfiguration3 - GetInfo
* WLANConfiguration3 - GetSecurityKeys
* X_AVM-DE_HostFilter - DisallowWANAccessByIP
* X_AVM-DE_HostFilter - GetWANAccessByIP
* DeviceConfig:1 - Reboot
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

By default, the TR-064 interface is not activated. However, this can easily be changed via the 
FritzBox web interface. To do this log in into your FritzBox and ensure that the expert view is activated. 
Then you will find below "Home Network »Home Network Overview» Network Settings" the point 
"Allow access for applications". There you have to activate the checkbox and then restart the FritzBox once.

Hint: After changing the options, don't forget the restart of the Fritzbox !
<img src="doc/access_settings_network.JPG"/>

## Configuration dialog

### General
The configuration values are validated and only correct values can be saved. Otherwise the save button is disabled.

### Fritzbox IP-address, user and password
The configuration of ip-address, user and password is necessary to get the device data from the fritzbox.
Therefore a user has to be created in the fritzbox. This is required with newer 
firmware version (>= 7.25)of the fritzbox. See here fore information: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf 
The password is encrypted and wasn't saved in clear text. The user name and password may have a maximum of 
32 characters. See for information: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf%20nicht%20leer%20sein.

### Ssl option
In some cases the adapter could not connect to the fritzbox. It could help to disable this option.
In this case the adapter tries to connect without https. 

### Interval
You have separate intervals for family members and Fritzbox devices.
The interval for Fritzbox devices can be configured from 1 to 59 minutes. Normally a value between 1 and 5 minutes is an optimal interval to read the fritzbox data. Family members could be configured from 10s to 600s. Every new cycle starts if the previous cycle 
is finished.

### Filter time
If the filter time is greater than 0s the state of a family member is checked twice (after the filter time) if the state is changing to false. If the state is true the state is immediate set.  

### History adapter
Over the history adapter some values are calculated. You can choose, if the history, the sql or the influxdb adapter is used for this calculations. The history adapter must be installed preliminary and can then selected in the configuration dialog. 
If the history configuration is disabled then the calculation of some values could not be realized. 

### Dateformat
The date format mask options are described on this web page: https://www.npmjs.com/package/dateformat.
The format mask is used for formatting the html and json table objects. 

### Creation of FB devices
If this option is checked, the objects for every device in the Fritzbox device list are created.
If this option is disabled, then also the mesh informations are disabled.

### Resynchronisation of FB device objects
If this option is checked, then the FB device object are re-synchronized with the device list fom Fritzbox.

### Creation of mesh information
This option can be checked if the creation of FB devices is allowed. If this option is checked, 
the mesh objects for every device in the Fritzbox device list are created.

### guest information
If this option is checked the states for guests are created. 

### qr-code generation
If this option is checked the qr-code from guest wlan is generated. 

### Family member settings
For a configured family member you should enter the member name, the hostname, the mac- and ip-address, a comment and if the member is enabled. A group is optional. If you leave it empty and set the compatibility flag to true the behaviour is like an older version of the adaper. In a future version you have to use the presence state from a family member. 
For every member the adapter creates a presence state and checks if the member is present or absent. The state was changed if the presence state changed. You can also enable the filtering for a member. If the state is true the state changes immediately to true. If it is false then the value will checked after the filter time again.
If the state is in both cases false then the state changes to false. Otherwise it does not change.
To get the speed information in the objects you have to select fb-devices option.

### Whitelist settings
In the white list you can insert every known device. Any unknown devices are listed in the blacklist object. 
If you check the checkbox in the headline of the table all devices are selected. 

## Features

### AVM support check
The function checks the availability of used fritzbox features. The availability is logged as info. If you have problems look if the features are all set to true. Also the access rights are checked for the user and
the feature is set to false if the acces right is not correct.

### Switch on / off the guest wlan
Under the folder guest you can set the state wlan to true or false and then the guest wlan switches on or off.

### QR code of guest wlan
The QR code of the guest wlan is saved in the state wlanQR in the guest folder. The QR code can show in vis in the basic - Bool SVG widget.   

### Switch on / off the internet access of Fritzbox devices
Under the folder FB-devices you could set the disabled state to true or false and the the internet access of this device
is blocked in the Fritzbox.

### Get guests, blacklist
In this function it is checked if any user is logged in as guest. Also is checked if any device is not in the white list listed.
This devices are added to the blacklist.

### Get Active
For every family member the presence, the comming and going dates and several other infos are calculated and saved in the member object if a history adapter is selected. 

### Host number, active devices
The amount of devices and how many are active are get from the fritzbox.

## Objects

### Object presenceAll
If all family members are present then the object is true.

### Object presence
If one family member ist present then the object is true.

### Object devices
These are all listed devices in the fritzbox

### Object activeDevices
These are the amount of all active devices in the fritzbox

### Object html, json
These objects are tables (json and html) with the comming and going information of all family members in it.

### Object info
Here are informations listed about the last update and the connection status from the adapter.

### Object guest
Here are informations listed about the amount of active guests and table objects with the device information in it.

### Object blacklist
Here are informations listed about the amount of unknown devices and table objects with the unknown device information in it.

### Object member.present
Here you will find information about the presence of a member on the current day and how long the member has been the status true since the last change. 
 
### Object member.absent
Here you will find information about the absence of a member on the current day and how long the member has been the status false since the last change.

### Object member.comming, member.going
Here you will find information when the family member arrives or leaving home.

### Object member.history, member.historyHtml
Here you will find information about the history of the current day. 

## Changelog 
<!--
    Placeholder for the next version (at the beginning of the line):
    ## __WORK IN PROGRESS__
    * Did some changes
    * Did some more changes
-->
### 1.1.3 (2021-03-31)
* (afuerhoff) family groups implemented
* (afuerhoff) compatability mode implemented
* (afuerhoff) dependencies updated
* (afuerhoff) configuration options added
* (afuerhoff) dialogboxes optimized
* (afuerhoff) translations updated
* (afuerhoff) general program structure optimized
* (afuerhoff) filter for family members implemeted
* (afuerhoff) password handling updated
* (afuerhoff) documentation updated

### 1.1.2 (2021-01-13)
* (afuerhoff) QR-Code implemented
* (afuerhoff) setState presence only if changed
* (afuerhoff) access rights implemented
* (afuerhoff) use name for presence
* (afuerhoff) active / inactive devices
* (afuerhoff) interval 10s bug fixed
* (afuerhoff) documentation edited 

### 1.1.1 (2020-12-27)
* (afuerhoff) Configuration optimized
* (afuerhoff) Bugfix dateformat pattern
* (afuerhoff) SSL (https) workaround implemented
* (afuerhoff) Connection check optimized
* (afuerhoff) Documentation added
* (afuerhoff) Mesh handling optimized 

### 1.1.0 (2020-10-24)
* (afuerhoff) second interval for family members implemented
* (afuerhoff) mesh info added
* (afuerhoff) configuration validation added
* (afuerhoff) switch on, off guest wlan
* (afuerhoff) switch on, off internet access of devices 
* (afuerhoff) structural changes
* (afuerhoff) code optimization

### 1.0.4 (2020-06-28)
* (afuerhoff) bugfix json list and guest handling, new object guest.presence

## License
MIT License

Copyright (c) 2019-2021 Achim Fürhoff <achim.fuerhoff@outlook.de>

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