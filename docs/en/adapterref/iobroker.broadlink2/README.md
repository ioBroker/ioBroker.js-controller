# ![Logo](./admin/broadlink.png) Steuert BroadLink IR/RF-Remotes und Schaltsteckdosen

[![NPM version](http://img.shields.io/npm/v/iobroker.broadlink2.svg)](https://www.npmjs.com/package/iobroker.broadlink2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)](https://www.npmjs.com/package/iobroker.broadlink2)
**Tests:** Linux/Mac: [![Travis-CI Build Status](https://travis-ci.org/frankjoke/ioBroker.broadlink2.svg?branch=master)](https://travis-ci.org/frankjoke/ioBroker.broadlink2)
Windows: [![AppVeyor Build status](https://ci.appveyor.com/api/projects/status/d2wwp0f02t512wp8?svg=true)](https://ci.appveyor.com/project/frankjoke/iobroker-broadlink2)

[![NPM](https://nodei.co/npm/iobroker.broadlink2.png?downloads=true)](https://nodei.co/npm/iobroker.broadlink2/)

## Adapter für verschiedene Broadlink WLan-Geräte (RM++,SP++,A1)

This is an ioBroker adapter for multiple  Broadlink switch like RM2, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus and some OEM products from them.
ALso remote controllers are supported like RM2, RM Mini, RM Pro Phicomm, RM2 Home Plus, RM2 Home Plus GDT, RM2 Pro Plus, RM2 Pro Plus2 and RM2 Pro Plus BL. Multiple controllers will generate their own entries and need to be trained separately.
It scans the network to find compatible devices and installs them (currently only switches type SP?).

If you learned states for RM* and then rename their name the state-ID will change to the new name as well!

You can create also your own new commands in LearnedStates if you use 'code'+ your code as the value (with 'CODE_' preceeding the code or even better (because of it will remain if you rename the state) add a field 'code' to native with the admin.object pencil and put there the hex code (without 'CODE_'!).

The adapter has fixed states to send codes from RM-devices or to learn them It can also send individual scenes (actions on multiple devices).

If devices which are configured on a certain IP are not found again they will be flagged 'notReachable'! If they are connected again they will be useable normally.

If a device is not answering 2 times in a row it's set to unreachable. ***notReachable*** devices will give a log warning message every 50 scans. After 10 scans the adapter will try to find them again on the same IP like before. If you changed IP please do a rescan.

Please delete devices from admin.objects in case you remove them permanentely or renamed them in your router!

### Note

SP1 devices cannot be polled.

* This adapter is based on original Broadlink adapter v0.1.1 found here: <https://github.com/hieblmedia/ioBroker.broadlink>

## Configuration

* Enter prefix of network address in configuration which should be removed when generating device names
* Enter the number of seconds between polls. On each poll all SP* devices expluding SP1 are asked what the switch status is. This feature can be disabled by setting the poll delay to 0. On some RM devices with temperature readout the temperature will be updated as well.

## How-To learn codes

* In Objects of ioBroker you can find "broadlink2.[devicename].Learn or LearnRF for '+' type of devices".
* For RM(x)+ (Plus) devices you get also a special RS-sweep-lear button which can learn more devices than on normal 433MHz.
* Set this object to true. (you can click on the button in object view)
* Now press some button on your remote control within 30 seconds.
* An new Object should now appear within the Object "broadlink.[n].[devicename].LearnedState" with the name ">>> Rename learned @ YYYYMMDDTHHmmSS"
* You can click on the button in object view to send the code.
* To rename the item click on the name (starting with `>>>`) and change the name. It should not include `,`, `.` or `;`

It is also possible to use the codes from [RM-Bridge](http://rm-bridge.fun2code.de/).
Just create an object (state, type button) with value where you prepend "CODE_" or with native entry `code` without any 'CODE_'.

## Use scenes

* Szenen bestehen aus ID's oder Zahlen mit `,` aneinandergereiht. Normal werden sie einfach im Abstand von 100ms hintereinander ausgelöst. Wird eine Zahl gefunden wird dort so viele ms gewartet bis zum nächsten Auslösen. Also `,SP:dose1, RM:your.L.StereoEin, 1000, RM:your.L.TVEin` würde die Steckdose einschalten, dann den Fernseher  1100ms nachher die Stereoanlage. Man kann auch Werte bei anderen (auch fremde) States durch Angabe des kompletten id's schalten: `hm-rpc.0.MEQ1435726.1.STATE` würde diesen einschalten! Übrigens, Bei boolschen Stateskann kann beim Einschalten das '=1/=on/=true/=ein' weggelassen werden da true der default-Wert ist. Beim Ausschalten wäre ein '=0/=false/=aus/=off' undbedingt notwendig!

## Use states

* Sie können states anlegen welche mittels gelernten Signale ein- oder ausgeschaltet werden.
* Damit geben sie den State-Namen an und die Signale (listem mit ',' getrennt) die das Gerät einschalten und auch solche die es ausschalten.
* Bei boolschen States wird nur der erste Wert gesendet aber beim Senden von allen Werten wird der State gesetzt. Das ist von Vorteil wenn mehrere Tasten ein Gerät einschalten (oder Ausschalten)
* Es kännen zum Ausschalten auch keine Signale gelistet werden dann werden die zum Einschalten verwendeten Werte in einer Liste
* wird als Aus-Signal nur '+' angegeben werden die Werte im Ein-Bereich (hoffentlich 10 Signale) als Zehnertastatur verwendet die Wete bis zu 9999 senden kann. Wenn dann der State mit Wert 123 beschrieben wird wird dann '1' , '2' und dann '3' mit jeweils nach 1/3 Sekunde Verzögerung gesendet!

Die Liste muss mit dem 0-Befehl beginnen und mit dem 9-Befehl enden!

## Use send messages to adapter

Der Adapter versteht jetzt auch 'sendTo' Kommandos.

* `debug`: `sendTo('broadlink2.0','debug','on')` (es geht auch 0,1,on,off,ein,aus,true,false) würde debug ein- oder ausschalten.
* `get`:  `sendTo('broadlink2.0','get', 'RM2:RMPROPLUS.Temperature'` kann der state von Werten abgefragt werden, man bekommt z.B. `{ val: 29.9, ack: true, ts: 1505839335870, q: 0, from: 'system.adapter.broadlink2.0', lc: 1505839335870 }` zurück
* `switch`: schaltet Steckdose ein/aus je nach Text: `sendTo('broadlink2.0','switch','SP:your device id=on')`
* `switch_on`/`switch_off`:  sendTo('broadlink2.0','switch_on','SP:your device id')`
* `send`: `sendTo('broadlink2.0','send','RM:yourdev.Learn')` würde lernen starten und `sendTo('broadlink2.0','send','RM:yourdev.L.yourid')` würde den code (oder eine Scene) senden.
* `send_scene`: `sendTo('broadlink2.0','send_scene','scene xxx ')` würde den als message angegebenen Text als Szene ausführen
* `send_code`: `sendTo('broadlink2.0','send_code','RM:your remote.CODE_xxxxx')` würde den CODE_xxxx vom R:your name senden.

## Known-Issues

* If you learn the same signal multiple times the code can be different everytime. This can not be changed.
* Sometimes it does not find devices if they do not respond to the search. Do a rescan or restart adapter to restart a new instance.

## Important/Wichtig

* Requires node >=v4.2

## Changelog

### 1.9.1
* added anothe RM Mini code

### 1.8.1
* Changed util.js and tests and added new devices

### 1.7.0

* Changed and corrected states which are created by A1-devices

### 1.6.0

* Added RF learning for RM-Plus devices
* Changed Learn states to LearnRF and LearnIR to differentiate
* a lot of code change to improve error handling and renaming

### 1.5.3

* Added ***notReachable*** states to devices which can return values (SP,RM,A1)
* Added info when SP's are switched manually
* devices which are disconnected will be stated as such and reconeccted automatically

### 1.5.0

* Added ***Scenes*** um mehrere Befehle hintereinander auszuführen. Diese können aud Adapter.config angelegtr werden.
* Adapter verwendet kürzere Namen
* Adapter kann codes oder Szenen direkt als Befehl senden
* Adapter verwendet keine 'strings' mehr als button type

### 1.1.1

* Added ***NewDeviceScan***-Button um einen neuen scan zu veranlassen ohne den Adapter zu starten.
* Adapter lest sofort die Werte der Devices ein
* Problem solved which occured when multiple IP names were resolved by reverse-dns.

### 1.1.0

* Support for A1 devices added (thanks a lot to **blackrozes**)
* bug fix for SP?
* Receive and execute message from sendTo to broadlink2 implemented

### 1.0.3

* Renamed to ioBroker.broadlink2 on Git
* Bug fix on 1.0.1

### 1.0.0

* Added learned state renaming, just rename the name and the ID will be renamed as well.
* Added debugging with 'debug!' at beginning of IP suffix and you will see debug messages without setting Adapter to debug.

### 0.2.0

* Implemented SP2 switches and they are working to set them!
* Currently ONLY SP1 && SP2 (SP3?) are working, please test!
* Disabled RM? devices, no test available, ordered one for later re-implementation

### Todo for later revisions

## Installation

Mit ioBroker admin, npm install iobroker.broadlink2 oder von <https://github.com/frankjoke/ioBroker.broadlink2>

## License

The MIT License (MIT)

Copyright (c) 2014-2019, frankjoke <frankjoke@hotmail.com>

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
