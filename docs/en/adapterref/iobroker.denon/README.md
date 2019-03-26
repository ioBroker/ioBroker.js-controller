![Logo](/admin/denon.png)
# ioBroker.denon
===========================

[![Build Status Travis](https://travis-ci.org/foxriver76/ioBroker.denon.svg?branch=master)](https://travis-ci.org/foxriver76/ioBroker.denon)[![Build status](https://ci.appveyor.com/api/projects/status/mwkeddgjpgnpef5n/branch/master?svg=true)](https://ci.appveyor.com/project/foxriver76/iobroker-denon/branch/master)
![Number of Installations](http://iobroker.live/badges/denon-installed.svg) ![Number of Installations](http://iobroker.live/badges/denon-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.denon.svg)](https://www.npmjs.com/package/iobroker.denon)
[![Downloads](https://img.shields.io/npm/dm/iobroker.denon.svg)](https://www.npmjs.com/package/iobroker.denon)
[![Greenkeeper badge](https://badges.greenkeeper.io/foxriver76/ioBroker.denon.svg)](https://greenkeeper.io/)

[![NPM](https://nodei.co/npm/iobroker.denon.png?downloads=true)](https://nodei.co/npm/iobroker.denon/)

## Installation
You can either install the adapter via the ioBroker web interface or on your local machine via npm.

### Browser-based
1. Open your ioBroker web interface in a browser (eg: 192.168.30.70:8081)
2. Click on Tab "Adapters"
3. Type "Denon" in the Filter
4. Click on the three points and then on the "+" symbol of the DENON AVR adapter
![Add Adapter](/docs/en/media/plusAddAdapter.png)

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
![Add Adapter](/docs/en/media/plusAddAdapter.png)
4. Now you can see the adapter configuration page --> type in the ip-address of your DENON AVR or click on the search 
icon to find AVRs in your network (via UPnP)
![Adapter Configuration](/docs/en/media/fillInIp.png)
5. If you also want to adjust the request/poll interval, make sure to click on the "Advanced Settings" Tab. 
By decreasing the Poll Interval the adapter will decrease the time between updating the display contents. 
By decreasing the request interval the time between sending commands will be decreased. 
The default settings should fit well for the most users.
![Advanced Settings](/docs/en/media/advancedSettings.png) 
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

#### Channel: zoneMain / zone2 / zone3

* zoneMain.playPause

   *Play and pause music from Bluetooth, Online, USB/iPod sources.*
   
* zoneMain.play

   *Play music from Bluetooth, Online, USB/iPod sources.*
   
* zoneMain.pause

   *Pause music from Bluetooth, Online, USB/iPod sources.*

* zoneMain.skipMinus

   *Skip to previous title.*
   
   *NOT FULLY SUPPORTED FOR HEOS AVR'S*

* zoneMain.skipPlus

   *Skip to next title.*
   
   *NOT FULLY SUPPORTED FOR HEOS AVR'S*

* zoneMain.volumeDown / zone2.volumeDown / zone3.volumeDown

   *Decrease volume of Main Zone / Zone2 / Zone3.*
   
* zoneMain.volumeUp / zone2.volumeUp / zone3.volumeUp

   *Increase volume of Main Zone / Zone2 / Zone3.*
   
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
   
#### Channel: settings
   
* settings.subwooferLevelDown / settings.subwooferTwoLevelDown

   *Reduce subwoofer level by pressing the button.*
   
* settings.subwooferLevelUp / settings.subwooferTwoLevelUp

   *Increase subwoofer level by pressing the button.*
   
* settings.containmentAmountDown

   *Decrease Audyssey LFC amount. The button will only be created, if it is supported by your AVR.*

* settings.containmentAmountUp

   *Increase Audyssey LFC amount. The button will only be created, if it is supported by your AVR.*
   
* settings.cursorUp / settings.cursorDown / settings.cursorLeft / settings.cursorRight

   *Simulates the cursor buttons of your remote control*
   
* settings.enter

   *Simulates the enter button of your remote control*
	
* settings.return

   *Simulates the return/back button of your remote control*
   
* settings.option

   *Simulates the option button of your remote control*
   
* settings.info

   *Simulates the info button of your remote control*

### States
Following states will be created by the adapter:

#### Channel: info

* info.connection

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only boolean indicator. If your broker is connected to your DENON AVR, the state is true otherwise false.*
   
* info.friendlyName

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Read only string. Contains the friendly name of the connected AVR.*

* info.onlinePresets

    |Data type|Permission|
    |:---:|:---:|
    |string|R|

    *String in JSON array format, which represents the current saved
    favorites by its id and channel.
    The names of each channel are limited by 20 digits. You can save the
    current channel to an id by setting settings.savePreset and load one
    by setting settings.loadPreset to the related id.*

#### Channel: zoneMain / zone2 / zone3
   
* zoneMain.volume / zone2.volume / zone3.volume

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number value which represents the current Main Zone / Zone2 / Zone 3 volume of your AVR. You can also set the volume here. 
   The volume is represented in dB too in separate states, e. g. mainVolumeDB*
   
   *Range is from 0 to 98 (maybe lower due to maximumVolume), where 80 = 0 dB*
   
   *Example:*
   
    ```javascript
    setState('denon.0.zoneMain.volume', 45.5); // Sets volume of Main Zone to 45.5
    ```
   
* zoneMain.maximumVolume

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-only number which represents the maximum possible volume, where 80 = 0 dB. The volume is also set in dB in the maximumVolumeDB state.*
   
* zoneMain.muteIndicator / zone2.muteIndicator / zone3.muteIndicator

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|

   *Boolean value, which is true if the Main Zone / Zone2 / Zone3 is muted, otherwise false. You can mute your AVR with this state.*
   
   *Example:*
   
    ```javascript
    setState('denon.0.zoneMain.muteIndicator', true); // Mutes the Main Zone of your AVR
    ```
   
* zoneMain.powerZone / zone2.powerZone / zone3.powerZone

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|

   *Boolean value, which is true if the Zone is turned on, otherwise false. You can turn your AVR / Zone on and off with this state.*
   
* zoneMain.selectInput / zone2.selectInput / zone3.selectInput

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

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
   
   *14:	FAVORITES*
   
   *15:	AUX1*
   
   *16:	AUX2*
   
   *17:	AUX3*
   
   *18:	AUX4*
   
   *19:	AUX5*
   
   *20:	AUX6*
   
   *21:	AUX7*

   *22: BT*
   
   *Please note, that not every input source is available on every AVR model.*
   
   *Example:*
   
   ```javascript
    setState('denon.0.zoneMain.selectInput', '5'); // Selects TV as input for Main Zone
   ```
   
* zoneMain.quickSelect / zone2.quickSelect / zone3.quickSelect

   |Data type|Permission|                                                                       
   |:---:|:---:|
   |number|R/W|
   
   *Emulates the quick select buttons of your remote, with numbers from 1 to 5 for Main Zone / Zone2 / Zone3.*
   
* zoneMain.sleepTimer / zone2.sleepTimer / zone3.sleepTimer

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number-value to read and set the sleep timer for the selected zone. The value will be updated in less than 10 seconds.*
   
* zoneMain.iconURL

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Contains a link where you can find the cover of the channel/song which is currently played.*
   
   *NOT SUPPORTED FOR HEOS AVR'S*
   
* zoneMain.equalizerBass / zone2.equalizerBass / zone3.equalizerBass
    
    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number value which represents the bass level of the Zone. Value range is from -6 to +6 dB.*
   
   *Bass and treble settings can be adjusted when Dyn EQ is set to OFF and Tone Control is on*
   
* zoneMain.equalizerTreble / zone2.equalizerTreble / zone3.equalizerTreble

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number value which represents the treble level of the Zone. Value range is from -6 to +6 dB.*
   
   *Bass and treble settings can be adjusted when Dyn EQ is set to OFF and Tone Control is on*
   
* zoneMain.channelVolumeFrontLeft / zone2.channelVolumeFrontLeft / zone3.channelVolumeFrontLeft / ...

   |Data type|Permission|                                                                       
   |:---:|:---:|
   |number|R/W|
   
   *Number value which represents the current channel volume for each speaker. Each speaker has a separate state. The 
   settings affect the current Select Input Mode. The state can be adjusted from -12 dB to +12 dB.*
   
#### Channel: display

* display.displayContent

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|
   
   *Read-only string which contains the content of your AVR display. It has nine states 0 - 9.*
   
   *DISPLAY CONTENT IS NOT SUPPORTED FOR HEOS AVR'S*
   
* display.brightness

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

   *String value which represents the display brightness. The value can also set the display brightness by the following encoding:*
   
   *0: Off --> turns display off*
   
   *1: Dark --> turns display dark*
   
   *2: Dimmed --> turns display dimmed*
   
   *3: Bright --> turns display bright*
   
   *Example:*
   
   ```javascript
   setState('denon.0.display.brightness', '3'); // Sets display brightness to "Bright"
   ```
#### Channel: settings

* settings.powerSystem

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|
   
   *Boolean value which is true, if the AVR is turned on, otherwise false. You can also turn your AVR on and off with this state.*
   
* settings.surroundMode

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

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
   setState('denon.0.settings.surroundMode', '3'); // Sets Multi Channel Stereo as surround mode
   ```
   
* settings.expertCommand

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

   *You can send your own custom commands with this state. You can find an overview about the existing commands in the [AVR-Control-Protocol.pdf](docs/AVR-Control-Protocol.pdf)*
   
   *Example:*
   
    ```javascript
    setState('denon.0.settings.expertCommand', 'ECOON'); // Turns Main Zone ECO mode on
    ```

* settings.outputMonitor

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

   *Select the output monitor of your AVR. This state will only be created if your AVR supports two HDMI outputs. You can switch the state between:*
   
   *0: AUTO --> Auto detection of monitor*
   
   *1: 1 --> Outputs signal to monitor 1*
   
   *2: 2 --> Outputs signal to monitor 2*
   
   *Example:*
     
   ```javascript
   setState('denon.0.settings.outputMonitor', '2'); // Sets monitor 2 as active monitor
   ```
   
* settings.videoProcessingMode

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

   *Select the video processing mode of your AVR. This state will only be created if your AVR supports it. You can switch the state between:*
   
   *0: AUTO*
   
   *1: GAME*
   
   *2: MOVIE*
       
   *Example:*
 
    ```javascript
    setState('denon.0.settings.videoProcessingMode', '2'); // Sets Video Processing Mode to "MOVIE"
    ```
   
* settings.centerSpread

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|

   *Boolean-value which is true if center spread is truned on, else false. You can also turn on/off center spread with this state.*
   
* settings.dynamicEq

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|

   *Boolean value which represents the state of Dynamic EQ. You can also set Dynamic EQ on and off with this state.*

* settings.subwooferLevelState

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|

   *Boolean value, if it's true, you are able to make changes on the subwoofer level.*

* settings.subwooferLevel / settings.subwooferTwoLevel

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number value which indicates the current subwoofer level. The value has a range from -12 to 12 (-12 dB to +12 dB).
   The SubwooferTwoLevel state will only be created if it is supported by your AVR.*
   
* settings.audysseyLfc

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|

   *Boolean value, which contains and is able to control Audyssey Low Frequency Containment status (on/off).
   The state will only be created, if it is supported by your AVR.*
   
* settings.containmentAmount

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R/W|
	
   *Number value to set the Low Frequency Containment Amount. The value can be between 1 and 7. The state will only be
   created, if it is supported by your AVR.*
   
* settings.multEq

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

   *String value, to set the MultEQ function of your AVR with the following encoding:*
   
   *0: OFF*
              
   *1: AUDYSSEY*
                	
   *2: BYP.LR*
   
   *3: FLAT*
      
   *4: MANUAL*
   
* settings.dynamicVolume

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

   *String value to select the Dynamic Volume by following encoding:*
   
   *0: OFF --> turns Dynamic Volume off*
   
   *1: LIT --> turns Dynamic Volume to light*
   
   *2: MED --> turns Dynamic Volume to medium*
   
   *3: HEV --> turns Dynamic Volume to heavy*
   
* settings.referenceLevelOffset

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

   *String value to select the Reference Level Offset by the following encoding:*
   
   *0: 	0 dB*
   
   *5:	5 dB*
   
   *10:	10 dB*
   
   *15: 15 dB*
   
   *Example:*
   
    ```javascript
    setState('denon.0.settings.referenceLevelOffset', '5'); // Sets Reference Level Offset to 5 dB
    ```
    
* settings.pictureMode

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R/W|

   *String value to set the Picture Mode Direct Change. This state will only be created when your AVR supports it*
   
   *You can set the following values as string:*
   
   *'Off'* 
   
   *'Standard'*
   
   *'Movie'*
   
   *'Vivid'*
   
   *'Stream'*
    
   *'Custom'*
   
   *'ISF Day'*
   
   *'ISF Night'*
   
   *Example:*
   
   ```javascript
   setState('denon.0.settings.pictureMode', 'Standard'); // Set Picture Mode Direct Change to Standard
   ```
   
* settings.toneControl

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|
    
   *Boolean value, which indicates Tone Control status. You can turn it off/on with this state.*
   
   *Tone Control can only be turned on when Dyn EQ is set to OFF*
   
* settings.setupMenu

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R/W|

   *Boolean indicator, which indicates if setup menu is currently open or closed. You can open and close it with this state.*

* settings.savePreset

    |Data type|Permission|
    |:---:|:---:|
    |number|R/W|

   *Number value, which can be set to a value of info.onlinePresets. Then the current channel will be saved as a preset to the given number.
   Only numbers which are contained in info.onlinePresets can be used. The state will not get an acknowledge, no matter the command was successful
   or not. You can check info.onlinePresets to check if the command has worked as aspected.*

* settings.loadPreset

    |Data type|Permission|
    |:---:|:---:|
    |number|R/W|

   *Number value, which can be set to a value of info.onlinePresets. This will load the related channel.
   This state will not get an acknowledge, no matter the command has been successful or not.*
   
### Other States
Due to the fact that some AVRs like the DENON POA-3012CI use another logic there are some differences in the states.
The states which are equal to the ones listed above are: settings.powerSystem, settings.expertCommand, display.brightness
and info.connection. Additional the following states are created for each zone 2-12 (even):

* zoneX.speakerOneVolume / zoneX.speakerTwoVolume

    |Data type|Permission|
    |:---:|:---:|
    |number|R/W|
    
    *Number value, which represents the volume of the AVR's speaker. If operationMode is set to 'BRIDGED' 
    the speakers cannot independently controlled and the control of one also controls the other ones volume.*
    
* zoneX.selectInputOne / zoneX.selectInputTwo

    |Data type|Permission|
    |:---:|:---:|
    |string|R/W|
    
    *Key value pair, which represents the selected input of the AVR's speaker. If operationMode is set to 'BRIDGED' 
    the speakers cannot independently controlled and the control of one also controls the other ones input.*
    
    *The following values are possible:*
    
    *'0': 'BUS L'*
    
    *'1': 'BUS R'*
    
    *'2': 'BUS M'*
    
    *'3': 'AUX'*
    
* zoneX.operationMode

    |Data type|Permission|
    |:---:|:---:|
    |string|R/W|
    
    *Key value pair, which represents the operationMode of the AVR. If operationMode is set to 'BRIDGED' 
    the speakers cannot independently controlled and controlling speaker one also controls speaker two.*
    
    *The following values are possible:*
        
    *'0': 'NORMAL'*
        
    *'1': 'BRIDGED'*
    
* zoneX.lowCutFilterSpeakerOne / zoneX.lowCutFilterSpeakerTwo

    |Data type|Permission|
    |:---:|:---:|
    |boolean|R/W|
    
    *Boolean value, which indicates if the low cut filter for the speaker is enabled or disabled. In bridged mode
    both speakers will depend on each other.*
    
* zoneX.zoneTurnOnModeChange

    |Data type|Permission|
    |:---:|:---:|
    |string|R/W|
    
    *Key value pair, which represents the zone turn on mode change of the zone. You can also control your 
    AVR with this state.*
    
    *The following values are possible:*
    
    *'0': 'Constant'*
    
    *'1': 'Trigger in'*
    
    *'2': 'Audio signal'*
    
    *'3': 'Off'*
    
* zoneX.triggerInput
    
    |Data type|Permission|
    |:---:|:---:|
    |boolean|R/W|
    
    *Turn trigger input on or off with this boolean value.*
    
* zoneX.audioSignalInput

    |Data type|Permission|
    |:---:|:---:|
    |boolean|R/W|
    
    *Boolean value which indicates and controls the audio signal input of your AVR.*  
   
## Missing functions & bugs
If you are missing any functions or detected a bug, please open an [issue](https://github.com/foxriver76/ioBroker.denon/issues).

The adapter is tested with an DENON AVR-X1200W and a Marantz SR5009.
   
## Changelog

### 1.5.1
* (foxriver76) fix to detect DENON Ceol

### 1.5.0
* (foxriver76) added channel volumes for zone2 + 3
* (foxriver76) other optimizations
* (foxriver76) support of DENON POA-3012CI and similar AVRs
* (foxriver76) create db volumes everytime

### 1.3.2
* (foxriver76) compact mode compatibility added

### 1.2.7
* (foxriver76) make sure states are never set before creation
* (foxriver76) minor fixes and improvements

### 1.2.6
* (foxriver76) only updating sleep timer and quick select on change
* (foxriver76) using promises wherever possible
* (foxriver76) minor improvements

### 1.2.4
* (foxriver76) fix verbose logging on network issues
* (foxriver76) as long as connection error stays the same, logging happens on debug

### 1.2.3
* (foxriver76) add missing usb to selectInput for all zones

### 1.2.2
* (foxriver76) use adapter core

### 1.2.1
* (foxriver76) info.onlinePresets converted to JSON array to work properly with widgets

### 1.2.0
* (foxriver76) added info.onlinePresets which is a JSON string containing all presets
* (foxriver76) settings.savePreset and loadPreset to save and load presets according to the info.onlinePresets

### 1.1.0
* (foxriver76) added Bluetooth as select input (BT)

### 1.0.0
* (foxriver76) formal version increment

### 0.6.0
* (foxriver76) fix that enables Marantz receiver to use the quickSelect functionality
* (foxriver76) quick select is now acknoledged
* (foxriver76) remove old quick select buttons

### 0.5.0
* (foxriver76) added possibility to control channelVolume per speaker for Main Zone
* (foxriver76) new states added to readme and documentation

### 0.4.4
* (foxriver76) fix bug where picture mode command was sent as undefined

### 0.4.3
* (foxriver76) fallback for advanced settings
* (foxriver76) fix double reconnection when AVR closes the socket
* (foxriver76) fix a problem where callback for pictureMode is called to early

### 0.4.2
* (foxriver76) pictureMode role fixed

### 0.4.1
* (foxriver76) added picture mode direct change

### 0.3.9
* (foxriver76) only create containment amount, audyssey lfc, subwoofer two level if supproted
* (foxriver76) readme updated

### 0.3.8
* (foxriver76) add state to control center spread
* (foxriver76) readme updated
* (foxriver76) addded video processing mode control
* (foxriver76) optimizations and minor fixes

### 0.3.7
* (foxriver76) minor code optimization
* (foxriver76) fixes on readme
* (foxriver76) logging undhandled commands on debug

### 0.3.6
* (foxriver76) fixed displayState non-readable chars for old AVRs
* (foxriver76) fixes on readme
* (foxriver76) capital chars in mainZone volumeUp/down names, are now lowercase

### 0.3.5
* (foxriver76) removed isPlaying state, because not working properly
* (foxriver76) update readme

### 0.3.4
* (foxriver76) fix that HEOS does not create http and display content related states

### 0.3.3
* (foxriver76) added state for setup button
* (foxriver76) added cursors and remote control buttons
* (foxriver76) readme update

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

Copyright (c) 2018-2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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
