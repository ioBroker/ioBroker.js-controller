![Logo](media/denon.png)
# ioBroker.denon
===========================

[![Build Status Travis](https://travis-ci.org/foxriver76/ioBroker.denon.svg?branch=master)](https://travis-ci.org/foxriver76/ioBroker.denon)[![Build status](https://ci.appveyor.com/api/projects/status/mwkeddgjpgnpef5n/branch/master?svg=true)](https://ci.appveyor.com/project/foxriver76/iobroker-denon/branch/master)
[![NPM version](http://img.shields.io/npm/v/iobroker.denon.svg)](https://www.npmjs.com/package/iobroker.denon)
[![Downloads](https://img.shields.io/npm/dm/iobroker.denon.svg)](https://www.npmjs.com/package/iobroker.denon)

[![NPM](https://nodei.co/npm/iobroker.denon.png?downloads=true)](https://nodei.co/npm/iobroker.denon/)

## Installation
You can either install the adapter via the ioBroker web interface or on your local machine via npm.

### Browser-based
1. Open your ioBroker web interface in a browser (eg: 192.168.30.70:8081)
2. Click on Tab "Adapters"
3. Type "Denon" in the Filter
4. Click on the three points and then on the "+" symbol of the DENON AVR adapter
![Add Adapter](/documentation/plusAddAdapter.png)

### Local machine
Navigate into your iobroker folder and execute the following command: 
```bash
npm i iobroker.denon
```

## Setup
Additional to the adapter installation you have to make sure that your AVR is correctly configured.

### ioBroker 
1. Open your ioBroker interface in a browser (eg: 192.168.1.33:8081)
2. Navigate to Tab "Adapters"
3. Click on the three points and then on the "+" symbol of the DENON AVR adapter
![Add Adapter](/documentation/plusAddAdapter.png)
4. Now you can see the adapter configuration page --> type in the ip-address of your DENON AVR or click on the search icon to find AVRs in your network (via UPnP)
![Adapter Configuration](/documentation/fillInIp.png)
5. If you also want to handle the volume states in dB or adjust the request/poll interval, make sure to click on the "Advanced Settings" Tab. By decreasing the Poll Interval the adapter will decrease the time between updating the display contents. By decreasing the request interval the time between sending commands will be decreased. The default settings should fit well for the most users.
![Advanced Settings](/documentation/advancedSettings.png) 
6. Click on Save & Close

### Network Setup of AV Receiver

1. Press SETUP button, then Menu appears on FL-display(and GUI)
2. Select "Network" --> "Settings"
3. Set parameters described below

   *DHCP: "ON" (Use this setting when DHCP server is on the local network.)*
  
   *IP Address: When <DHCP> sets "Off”, please set IP address.*
  
   *Subnet Mask: When <DHCP> sets "Off", please set Subnet Mask.*
  
   *Gateway: Set the address of Gateway when Gateway is on the local network.*
  
   *Primary DNS: Do not set this parameter.*
  
   *Second DNS: Do not set this parameter.*
  
   *Proxy: Set this parameter "Off".*
  
4. Press SETUP button, then Menu appears on FL-display (and GUI)
5. Select “Network" --> Network Control/IP Control"
6. Set this parameter to "Always On".

## Usage
Take note, that the AVRs can only manage a single telnet connection. If you are having an active telnet connection e. g. with the javascript adapter, the AVR will refuse the connection of this adapter.
Here you can find a description of the states and how to use them.

### Buttons
The adapter creates the following buttons:

* zoneMain.playPause

   *Play and pause music from Bluetooth, Online, USB/iPod sources.*
   
* zoneMain.play

   *Play music from Bluetooth, Online, USB/iPod sources.*
   
* zoneMain.pause

   *Pause music from Bluetooth, Online, USB/iPod sources.*

* zoneMain.skipMinus

   *Skip to previous title.*

* zoneMain.skipPlus

   *Skip to next title.*

* zoneMain.volumeDown / zone2.volumeDown / zone3.volumeDown

   *Decrease volume of Main Zone / Zone2 / Zone3.*
   
* zoneMain.volumeUp / zone2.volumeUp / zone3.volumeUp

   *Increase volume of Main Zone / Zone2 / Zone3.*
   
* zoneMain.quickSelectX / zone2.quickSelectX / zone3.quickSelectX
   
   *Emulates the quick select buttons of your remote, with numbers from 1 to 5 for Main Zone / Zone2 / Zone3.*
   
* settings.subwooferLevelDown / settings.subwooferTwoLevelDown

   *Reduce subwoofer level by pressing the button.*
   
* settings.subwooferLevelUp / settings.subwooferTwoLevelUp

   *Increase subwoofer level by pressing the button.*
   
* settings.containmentAmountDown

   *Decrease Audyssey LFC amount.*

* settings.containmentAmountUp

   *Increase Audyssey LFC amount.*
   
* zoneMain.equalizerBassUp / zone2.equalizerBassUp / zone3.equalizerBassUp

   *Button which increases bass level of the Zone.*
   
   *Bass and treble settings can be adjusted when Dyn EQ is set to OFF and Tone Control is on*
   
* zoneMain.equalizerBassDown / zone2.equalizerBassDown / zone3.equalizerBassDown

   *Button which decreases bass level of the Zone.*
   
   *Bass and treble settings can be adjusted when Dyn EQ is set to OFF and Tone Control is on*
   
* zoneMain.equalizerTrebleUp / zone2.equalizerTrebleUp / zone3.equalizerTrebleUp

   *Button which increases treble level of the Zone.*
   
   *Bass and treble settings can be adjusted when Dyn EQ is set to OFF and Tone Control is on*
   
* zoneMain.equalizerTrebleDown / zone2.equalizerTrebleDown / zone3.equalizerTrebleDown

   *Button which decreases treble level of the Zone.*
   
   *Bass and treble settings can be adjusted when Dyn EQ is set to OFF and Tone Control is on*

### States
Following states will be created by the adapter:

* info.connection

   *Read-only boolean indicator. If your broker is connected to your DENON AVR, the state is true otherwise false.*
   
* info.friendlyName

   *Read only string. Contains the friendly name of the connected AVR.*
   
* zoneMain.volume / zone2.volume / zone3.volume

   *Number value which represents the current Main Zone / Zone2 / Zone 3 volume of your AVR. You can also set the volume here. When Volume in dB is set to true, the state is represented in dB too in separate states, e. g. mainVolumeDB*
   
   *Range is from 0 to 98 (maybe lower due to maximumVolume), where 80 = 0 dB*
   
   *Example:*
    ```javascript
    setState('denon.0.zoneMain.volume', 45.5); // Sets volume of Main Zone to 45.5
    ```
   
* maximumVolume

   *Read-only number which represents the maximum possible volume, where 80 = 0 dB. When Volume in dB is set to true, the state is represented in dB in the maximumVolumeDB state too.*
   
* zoneMain.muteIndicator / zone2.muteIndicator / zone3.muteIndicator

   *Boolean value, which is true if the Main Zone / Zone2 / Zone3 is muted, otherwise false. You can mute your AVR with this state.*
   
   *Example:*
   
    ```javascript
    setState('denon.0.muteIndicator', true); // Mutes the Main Zone of your AVR
    ```
   
* powerSystem
   
   *Boolean value which is true, if the AVR is turned on, otherwise false. You can also turn your AVR on and off with this state.*
   
* zoneMain.powerZone / zone2.powerZone / zone3.powerZone

   *Boolean value, which is true if the Zone is turned on, otherwise false. You can turn your AVR / Zone on and off with this state.*
   
* zoneMain.selectInput / zone2.selectInput / zone3.selectInput

   *The string value contains the current input source. You can also set the input source with the following encoding:*
   
   *0: 	PHONO*
   
   *1: 	CD*
   
   *2: 	TUNER*
   
   *3: 	DVD*
   
   *4: 	BD*
   
   *5: 	TV*
   
   *6: 	SAT/CBL*
   
   *7: 	MPLAY*
   
   *8: 	GAME*
   
   *9: 	NET*
   
   *10:	SPOTIFY*
   
   *11:	LASTFM*
   
   *12:	IRADIO*
   
   *13:	SERVER*
   
   *14:	FAVOTITES*
   
   *15:	AUX1*
   
   *16:	AUX2*
   
   *17:	AUX3*
   
   *18:	AUX4*
   
   *19:	AUX5*
   
   *20:	AUX6*
   
   *21:	AUX7*
   
   *Please note, that not every input source is available on every AVR model.*
   
   *Example:*
   
   ```javascript
    setState('denon.0.selectInput', '5'); // Selects TV as input for Main Zone
    ```
* settings.surroundMode

   *The string value contains the current Surround mode. You can also change the source with the following encoding:*
   
   *0:	STEREO*
   
   *1:	VIRTUAL*
   
   *2:	VIDEO GAME*
   
   *3:	MCH STEREO*
   
   *4:	DTS SURROUND*
   
   *5:	DOLBY DIGITAL*
   
   *6:	MOVIE*
   
   *7:	MUSIC*
   
   *8:	DIRECT*
   
   *9:	PURE DIRECT*
   
   *10:	AUTO*
   
   *11:	GAME*
   
   *12:	AURO3D*
   
   *13:	AURO2DSURR*
   
   *14:	WIDE SCREEN*
   
   *15:	SUPER STADIUM*
   
   *16:	ROCK ARENA*
   
   *17:	JAZZ CLUB*
   
   *18:	CLASSIC CONCERT*
   
   *19:	MONO MOVIE*
   
   *20:	MATRIX*
   
   *Please note, that not every Surround mode is available on every AVR model.*
   
   *Example:*
   
   ```javascript
   setState('denon.0.surroundMode', '3'); // Sets Multi Channel Stereo as surround mode
   ```
* display.displayContent
   
   *Read-only string which contains the content of your AVR display. It has nine states 0 - 9.*
   
   *DISPLAY CONTENT IS NOT SUPPORTED FOR HEOS AVR'S*
   
* display.brightness

   *String value which represents the display brightness. The value can also set the display brightness by the following encoding:*
   
   *0: Off --> turns display off*
   
   *1: Dark --> turns display dark*
   
   *2: Dimmed --> turns display dimmed*
   
   *3: Bright --> turns display bright*
   
   *Example:*
   
   ```javascript
   setState('denon.0.display.brightness', '3'); // Sets display brightness to "Bright"
   ```
   
* settings.expertCommand
   *You can send your own custom commands with this state. You can find an overview about the existing commands in the [AVR-Control-Protocol.pdf](documentation/AVR-Control-Protocol.pdf)*
   
   *Example:*
   
    ```javascript
    setState('denon.0.expertCommand', 'ECOON'); // Turns Main Zone ECO mode on
    ```

* zoneMain.sleepTimer / zone2.sleepTimer / zone3.sleepTimer

   *Number-value to read and set the sleep timer for the selected zone. The value will be updated in less than 10 seconds.*
   
* zoneMain.isPlaying

   *Read-only indicator, which is true if music is played on your AVR otherwise false.*
   
   *NOT SUPPORTED FOR HEOS AVR'S*
   
* zoneMain.iconURL

   *Contains a link where you can find the cover of the channel/song which is currently played.*
   
   *NOT SUPPORTED FOR HEOS AVR'S*
   
* settings.dynamicEq

   *Boolean value which represents the state of Dynamic EQ. You can also set Dynamic EQ on and off with this state.*

* settings.subwooferLevelState

   *Boolean value, if it's true, you are able to make changes on the subwoofer level.*

* settings.subwooferLevel / settings.subwooferTwoLevel

   *Number value which indicates the current subwoofer level. The value has a range from -12 to 12 (-12 dB to +12 dB).*
   
* settings.audysseyLfc

   *Boolean value, which contains and is able to control Audyssey Low Frequency Containment status (on/off).*
   
* settings.containmentAmount
	
   *Number value to set the Low Frequency Containment Amount. The value can be between 1 and 7.*
   
* settings.multEq

   *String value, to set the MultEQ function of your AVR with the following encoding:*
   
   *0: OFF*
              
   *1: AUDYSSEY*
                	
   *2: BYP.LR*
   
   *3: FLAT*
      
   *4: MANUAL*
   
* settings.dynamicVolume

   *String value to select the Dynamic Volume by following encoding:*
   
   *0: OFF --> turns Dynamic Volume off*
   
   *1: LIT --> turns Dynamic Volume to light*
   
   *2: MED --> turns Dynamic Volume to medium*
   
   *3: HEV --> turns Dynamic Volume to heavy*
   
* settings.referenceLevelOffset

   *String value to select the Reference Level Offset by the following encoding:*
   
   *0: 	0 dB*
   
   *5:	5 dB*
   
   *10:	10 dB*
   
   *15: 15 dB*
   
   *Example:*
    ```javascript
    setState('denon.0.settings.referenceLevelOffset', '5'); // Sets Reference Level Offset to 5 dB
    ```
    
* zoneMain.equalizerBass / zone2.equalizerBass / zone3.equalizerBass

   *Number value which represents the bass level of the Zone. Value range is from -6 to +6 dB.*
   
   *Bass and treble settings can be adjusted when Dyn EQ is set to OFF and Tone Control is on*
   
* zoneMain.equalizerTreble / zone2.equalizerTreble / zone3.equalizerTreble

   *Number value which represents the treble level of the Zone. Value range is from -6 to +6 dB.*
   
   *Bass and treble settings can be adjusted when Dyn EQ is set to OFF and Tone Control is on*
   
* settings.toneControl

   *Boolean value, which indicates Tone Control status. You can turn it off/on with this state.*
   
   *Tone Control can only be turned on when Dyn EQ is set to OFF and Tone Control is on*
   
## Missing functions & bugs
If you are missing any functions or detected a bug, please open an [issue](https://github.com/foxriver76/ioBroker.denon/issues).

The adapter is tested with an DENON AVR-X1200W and a Marantz SR5009.
   
## Changelog

### 0.3.2
* (foxriver76) Added isPlaying state for non-HEOS AVR's, thanks to bluefox
* (foxriver76) Added link to cover for non-HEOS AVR's
* (foxriver76) displayContent, isPlaying, coverURL will only be generated for non-HEOS
* (foxriver76) Updated readme

### 0.3.1
* (foxriver76) Added placeholder ip in config gui
* (foxriver76) fixed volume in db for main zone

### 0.3.0
* (bluefox & foxriver76) Names and roles were refactored
* (bluefox) Discovery added
* (foxriver76) Update Readme
* (foxriver76) Implemented separate Play & Pause button
* (bluefox & foxriver76) Internal improvements

### 0.2.4
* (foxriver76) prevent adapter from doing more than one reconnect attempt at the same time
* (foxriver76) improved stability
* (foxriver76) update readme

### 0.2.3
* (foxriver76) added possibility to handle states in dB additional
* (foxriver76) minor changes

### 0.2.2
* (foxriver76) removed unneeded files
* (foxriver76) state lists are now of type string due to better compatibility
* (foxriver76) optimized matching for state lists
* (foxriver76) some state lists can be set by the value additionaly to the key

### 0.2.1
* (foxriver76) small bug fixes on connection error handling
* (foxriver76) improvements on module size

### 0.2.0
* (foxriver76) preparations for offical repository

### 0.1.9
* (foxriver76) improved stability
* (foxriver76) improved fault tolerance on volume (e. g. for use as smart device)

### 0.1.8
* (foxriver76) adapter sepcific connection error handling
* (foxriver76) minor reconnect fix

### 0.1.7
* (foxriver76) subwoofer level is now in dB
* (foxriver76) added control of treble, bass and tone control state
* (foxriver76) readme updated

### 0.1.6
* (foxriver76) connection stability improvements
* (foxriver76) some parameter settings added
* (foxriver76) readme updated

### 0.1.5
* (foxriver76) sleep timer for every zone
* (foxriver76) admin2 compatibility
* (foxriver76) minor fixes

### 0.1.4
* (foxriver76) HEOS bug fix (timeout)
* (foxriver76) new state for custom commands (expertCommand)
* (foxriver76) enhanced readme

### 0.1.3
* (foxriver76) bug fixes for Zone3
* (foxriver76) new state for main zone power
* (foxriver76) minor other improvements

### 0.1.2
* (foxriver76) Performance optimization
* (foxriver76) Faster display update
* (foxriver76) More appropriate reconnect intervall

### 0.1.1
* (foxriver76) new readme for npm

### 0.1.0
* (foxriver76) handling up to three zones
* (foxriver76) handling display content
* (foxriver76) setting display brightness

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018 Moritz Heusinger <moritz.heusinger@gmail.com>

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
