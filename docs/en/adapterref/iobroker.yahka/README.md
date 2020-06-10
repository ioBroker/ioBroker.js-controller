![Logo](admin/yahka.png)
# iobroker.yahka

![Number of Installations](http://iobroker.live/badges/yahka-installed.svg) ![Number of Installations](http://iobroker.live/badges/yahka-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.yahka.svg)](https://www.npmjs.com/package/iobroker.yahka)
[![Downloads](https://img.shields.io/npm/dm/iobroker.yahka.svg)](https://www.npmjs.com/package/iobroker.yahka)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.yahka)

## Installation and Usage

For details on how to install and configure this adapter, please see the [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki)

## Prerequisites
Before you can install the Adapter, you have to some packages (for Linux):
```sudo apt-get install libavahi-compat-libdnssd-dev```

## Install the latest **Release**
Just hit the "+" button behind "Homekit yahka adapter" in the ioBroker Admin Panel on the "Adapter" page

## Install the latest **Beta**
If you want to be on the edge and test the latest beta, you could install the adapter via a github url.<br>
(Sometimes an additional upload [f.e. iobroker upload yahka] and adapter restart is needed)
<br>

## Backup & Restore
Attention: To be able to restore ioBroker.yahka on another system, in addition to the usual `iobroker backup` and `iobroker restore`, the `yahka.X.hapdata` folder under `/opt/iobroker/iobroker-data` must also be backuped and, if necessary, restored. [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/ioBroker.yahka-auf-ein-anderes-System-umziehen) / [Issue](https://github.com/jensweigele/ioBroker.yahka/issues/176)

## Troubleshooting

### Not all new features are available:
If not all new feature are available after a yahka update, try a upload (f.e. iobrober yahka upload) and restart the adapter. 


### Missing Avahi daemon (linux)
If you are having the following error in the log:<br>
```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

You have to do some additional steps:
* install avahi daemon:
```sudo apt-get install avahi-daemon -y```
* Edit avahi-daemon.conf
```sudo nano avahi-daemon.conf ```<br>
change the following variables:
```host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### Missing pam-devel Package (linux)
If you are having the following error in the log:<br>
```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```
You have to install the pam-devel package:
* install avahi daemon:
```sudo apt-get install pam-devel -y```

### Missing bonjour (windows) 
- Download: ```https://www.samuelattard.com/files/bonjourcore2.msi```
- Execute: ```msiexec /i bonjourcore2.msi /qn```
- remove: ```del bonjourcore2.msi```
- Download: ```https://www.samuelattard.com/files/bonjoursdksetup.exe```
- Execute: ```bonjoursdksetup.exe /quiet```
- Remove: ```del bonjoursdksetup.exe```
- Set: ```set BONJOUR_SDK_HOME=C:\Program Files\Bonjour SDK```

And after that install yahka adapter.

## Some words about HomeKit
The architecture of HomeKit is as follows:<br>
There are **devices** as logical entities. Each device can have multiple **services** and each service has multiple **characteristics**.<br>
At the end, a characteristic is an endpoint where values could be read from or write to.<br>
Which characteristics a service could have, is defined by Apple/HomeKit and determined by the service type. The service types are also defined by Apple/HomeKit.

Example:<br>
A Garage Door opener is a device which could have two services: <br>
1. Garage Door Opener 
2. Light

The Garage Door Opener Service itself could have different characteristic like: CurrentDoorState, TargetDoorState and many more. <br>
Also the Light Service could have different characteristics, like: On (and many others for chaning the light color etc.)

## What Yahka does
With Yahka it is possible to map an ioBroker Datapoint to an HomeKit Characteristic. <br>
Since sometimes mappings are necessary (e.g. the "State" values of a garage door is different between HomeKit and other systems), there is also the possibility to specify Functions to convert the values. This is described below.<br>
To avoid too much administration work, all Devices you create in Yahka are behind a so called "Bridge". With this bridge, you only need to pair the Bridge with your iOS device to get access to all devices. Otherwise you would need to pair every Yahka device with Homekit.

## Setup the Bridge and create devices and services 
Each device which needs to be paired with Homekit needs a "username" which has the form of a mac-address. Yahka automatically generates a random username for each yahka instance. <br>
**Important: if you change the username after pairing Yahka with HomeKit, you need to reconfigure all devices in iOS (room assignment, position etc.). Changing the username means to iOS, that it is a complety new device!**<br>
Beside the username, you need to specify a PIN code which needs to be entered on the iOS device.
This could all be specified by clicking on ":yahka.0" in the admin panel of Yahka. (Expand the Panel on the right side after clicking on the list entry). The name of the bridge could also be changed there.

After setting up the bridge, you could add the devices you like with the "Add Device" Button on the top.
Once a device is added/selected, you could add services to this device.<br>
It is necessary to specify a service name and a service type.<br>
Depending on the service type, the list of available characteristic changes<br>

## Setting up Characteristics
If you want to support a characteristic, you have to tick the "enabled" checkbox on the left side of the characteristic.
For each characteristic you could specify the following properties:
- InOutFunction: you could specify a predefined function which is responsible for passing the values from HomeKit to ioBroker and vice versa
- InOutParameter: here you could specify parameters for the selected InOutFunction. The available/expected Parameters depends on the selected Function. A brief overview of the Functions and Parameters are stated below.
- ConversionFunction: additionally to the InOutFunction, you could also specify a function which converts a value coming from HomeKit to ioBroker (and vice versa)
- ConversionParameter: same as InOutParameter - the available/expected params depend on the selected function.

## Overview of InOut-Functions

|Function|Expected Parameter|Description|
|---|---|---|
|const|Value|The const function always passes the value specified in "InOutParameter" to Conversion Function if HomeKit reads the value. If HomeKit wants to write the value, this action is denied
|ioBroker.State|name of a ioBroker datapoint|With this function, the adapter uses the specified ioBroker datapoint for read and write operations. All operations are done immediatelly without buffering or filtering (values are passed to the specified Conversion functions)|
|ioBroker.State.Defered|name of a ioBroker datapoint|With this function, the adapter uses the specified ioBroker datapoint for read and write operations. Write operations from HomeKit are directly passed to the conversion function. Changes from ioBroker are debounced for 150ms - which means that the value is only transmitted to HomeKit if no other change occured within 150ms.|
|ioBroker.State.OnlyACK|name of a ioBroker datapoint|With this function, the adapter uses the specified ioBroker datapoint for read and write operations. Write operations from HomeKit are directly passed to the conversion function. Changes from ioBroker are only forwarded to HomeKit if the "Acknowledged"-Flag of the value is set. Otherwise, the last acknowledged value is getting transmitted to HomeKit|
|ioBroker.homematic.<br>WindowCovering.TargetPosition|Id of the HomeMatic Level Datapoint <br> or <br> String-Array with the Id of the Level Datapoint and the Id of the Working Datapoint|This function is especially for controlling the HomeMatic Window Covering. This function defferes the transmission of values to HomeKit while the Window Covering is moving. This is necessary to avoid flickering of the window covering slider in iOS|

## Overview of Conversion-Functions

|Function|Expected Parameter|Description|
|---|---|---|
|passthrough|\<none\>|The value from ioBroker is passed to HomeKit without conversion (and vice versa)
|HomematicDirectionTo<br>HomekitPositionState|\<none\>|This function maps the direction enum of Homematic window covering to the PositionState enum of HomeKit (and back)|
|HomematicControlModeTo<br>HomekitHeathingCoolingState|\<none\>|This function maps the ControlMode enum of Homematic to the HeathingCoolingState enum of HomeKit (and back) |
|level255|\<none\>|This function scales an ioBroker value with a value range from 0 to 255 to a HomeKit value with a value range from 0 to 100 (and back). <br>**Example:** 255 in ioBroker is transformed to 100 for HomeKit.|
|scaleInt<br>scaleFloat|```{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }```|This function is similiar to "level255" but it's more generic. It transforms an ioBroker value with an range from "iobroker.min" (0 if omitted) to "iobroker.max" to a HomeKit value with a value range from "homekit.min" (0 if omitted) to "homekit.max" (and back).<br> **Example:** If the parameter field is: ```{ "homekit.max": 500, "iobroker.max": 250}``` <br> the value of ioBroker is in fact multiplied by 2 before sending it to HomeKit.<br>**The min-Parameters are only available in version 0.8.0 and higher**|
|inverse|number|This function is used to "inverse" a value from ioBroker. The parameter specified the maximum of the value in ioBroker. The formula is: ```Parameter - value```<br>**Example:** If the parameter field is ```100```, the value 100 from ioBroker is send as 0 to HomeKit, the value 80 is send as 20 to HomeKit etc.|
|hue|\<none\>|This function is specialized version of scaleInt with the parameters ```iobroker.max=65535``` and ```homekit.max=360```.|

## Homematic Blind Actuator \ Window Covering
To integrate the Homematic Blind Actuators (like HM-LC-Bl1PBU-FM), the following settings are needed:

* Add a service to a device
* Set Service Name to some name and service type to "WindowCovering". Service subtype could be left blank
* Enable and fill in the following characteristics:

|Characteristic Name|1: InOut Function <br> 2: Conversion Function|1: InOut Parameters <br> 2: Conversion Parameters|
|---|---|---|
|CurrentPosition| 1: ioBroker.State.OnlyACK<br>2: passthrough| 1: _\<path to homematic object\>_.1.LEVEL<br> 2: \<empty\>|
|PositionState  | 1: ioBroker.State.OnlyACK<br>2: HomematicDirectionToHomekitPositionState| 1: _\<path to homematic object\>_.1.DIRECTION<br> 2: \<empty\>|
|TargetPosition | 1: ioBroker.homematic.WindowCovering.TargetPosition<br>2: passthrough| 1: _\<path to homematic object\>_.1.LEVEL<br> 2: \<empty\>|

The value _\<path to homematic object\>_ needs to be replaced with the actual path to the device (e.g. hm-rpc.0.NEQ0012345)

For general Information about the Configuration Mask, see: TODO<br>
For more information about the Configuration, the InOut Functions and Conversion Functions, see: [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

## Changelog
### 0.10.0 (2020-02-19)
  (apollon77) updated dependencies, nodejs 12 support<br>

### 0.10.0
  (jw) updated dependencies<br>
  (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)<br>

### 0.9.2
  (jw) fixed a bug where the adapter didn't start anymore<br>
  (jw) removed the reference to the git repository of the hap community types<br>

### 0.9.1
  (jw) fixed a bug where the adapter crashes if a state does not exist<br>
  (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))<br>
  (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
  (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))<br>

### 0.9.0
  (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)<br>
  (jw) improved admin interface to support individual editors for IO/Conversion functions<br>
  (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions<br>
  (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) <br>
  (jw) added ioFunction "MultiState" to get multiple states and/or seperate between read and write states <br>
  (jw) added conversion function "map" to customize mappings betwen ioBroker and HomeKit <br>
  (jw) added possibility to specifiy IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86))<br> 
  (jw) switched to webpack and refactored admin interface and io/conversion functions <br>
  (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))<br>
  (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))<br>
  (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))<br>
  (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))<br>
  (jw) added support for specifiyng device information via datapoints ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))<br>
  (SchumyHao) added Chinese support
  
### 0.8.2
  (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption<br>

### 0.8.1
  (jw) updated dependencies<br>
  (jw) change default name of new instances<br>
  (foxriver76) remove excessive logging<br>
  (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)<br>
  (arichter83) added "Duplicate Device" functionality<br>

### 0.7.1
  (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore<br>
  (jw) restructured repository to support install via url<br>

### 0.7.0 
  (bluefox) Fixed the ID select dialog in Admin3<br>
  (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve<br>
  (jw) added ip-package to dependencies to avoid errors on some installations<br>

### 0.6.1 
  (jw) fixed startup crash<br>

### 0.6.0
  (jw) add support for IP-Cameras<br>
  (jw) included iOS 11 device definitions<br>
  (jw) allowed negative temperatures for temperature sensors<br>
  (jw) fixed crashes due to duplicate device names<br>
  (oliverschulze) added conversion functions "hue" and "level255"<br>
  (jw) added conversion functions scaleInt, scaleFloat and inverse<br>
  (jw) devices are now sorted by name in the admin panel<br>

### 0.5.5
  (bluefox) allow select ID in configuration dialog<br>

### 0.5.4
  (jw) improve logoutput<br>
  (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping<br>

### 0.5.3
  (jw) internal release<br>

### 0.5.2
  (jw) fixed issues with empty characteristic values<br>
  (jw) fixed issue with empty adapter.systemConfig.system object<br>

### 0.5.1
  (jw) fixed issue with wrongly displayed logo<br>

### 0.5.0
  (jw) initial release<br>

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Jens Weigele (iobroker.yahka@gmail.com)

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
