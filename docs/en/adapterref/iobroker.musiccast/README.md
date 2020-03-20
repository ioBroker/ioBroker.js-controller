![Logo](admin/musiccast.png)
# ioBroker.musiccast

![Number of Installations](http://iobroker.live/badges/musiccast-installed.svg) ![Number of Installations](http://iobroker.live/badges/musiccast-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.musiccast.svg)](https://www.npmjs.com/package/iobroker.musiccast)
[![Downloads](https://img.shields.io/npm/dm/iobroker.musiccast.svg)](https://www.npmjs.com/package/iobroker.musiccast)
[![Build Status](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)](https://travis-ci.org/foxthefox/ioBroker.musiccast)


[![NPM](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)](https://nodei.co/npm/iobroker.musiccast/)

adapter for Yamaha MusicCast devices like WX-010/030, YSP-1600

## Installation:
Installation requires nodejs v4 at minimum

from npm
```javascript
npm install iobroker.musiccast
```
actual version from github (this might not every time work, when development is in progress)
```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Settings
The admin page the "+" can be used for adding manually the IP address, DeviceID, Type and Name.
Press the search button for discovery. If you have multiple devices, you have to hit the button multiple times until all devices are discovered. Unfortunately the discovery returns only one object at the time and this could be any of your MusicCast devices. If the return is the same as already part of the table, you have to hit the button again. Sometimes it helps to save and open the damin page again. 

In the unlikely case that 2 or more devices are delivering the same ID, then change one ID slightly. Otherwise the adapter can not distinguish between the 2 devices.

If you want to see the playtime updated for the tracks you listen, please enable/check the respective checkbox. Be aware that increases the message count (every second for every device the pingpong of updates).

## available Objects
The following objects are currently implemented:

### basic (zone)
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|{zone}.power|boolean|x|true/false -> ON/Standby|
|{zone}.zone_b|boolean|?|true/false -> target Zone is Zone B|
|{zone}.mute|boolean|x|true/false -> muted/ not muted|
|{zone}.volume|value|x|0...max (max depending on device)|
|{zone}.act_vol_mode|text|?|actual volume in dB mode|
|{zone}.act_vol_val|value|?|actual volume in dB value|
|{zone}.act_vol_unit|text|-|actual volume unit (should be dB)|
|{zone}.act_vol_mode_list|text|-|actual volume in dB modes|
|{zone}.input|text|x|inputs depending on device|
|{zone}.input_list|text|-|possible inputs|
|{zone}.sound_program|text|x|set sound program|
|{zone}.sound_program_list|text|-|possible sound programs|
|{zone}.surr_decoder_type|text|?|set surround type|
|{zone}.surr_decoder_type_list|text|-|possible surround decoder|
|{zone}.link_control|text|x|set link control|
|{zone}.link_control_list|text|-|possible link control settings|
|{zone}.link_audio_delay|text|x|set link audio delay|
|{zone}.link_audio_delay_list|text|-|possible link link audio delay settings|
|{zone}.clearVoice|boolean|x|clear Voice control|
|{zone}.low|value|x|level EQ low|
|{zone}.mid|value|x|level EQ mid|
|{zone}.high|value|x|level EQ high|
|{zone}.subwoofer_volume|value|x|level subwoofer volume|
|{zone}.bass|value|x|level bass|
|{zone}.treble|value|x|level treble|
|{zone}.tone_control_mode_list|text|-|possible tone control mode|
|{zone}.tone_mode|boolean|?|tone control mode|
|{zone}.balance|value|x|level balance|
|{zone}.direct|boolean|x|set direct|
|{zone}.pure_direct|boolean|x|set pure direct|
|{zone}.enhancer|boolean|x|set enhancer|
|{zone}.bass_extension|boolean|x|set bass extension|
|{zone}.sleep|value|x|sleep timer|

### netusb
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|netusb.input|value|x|set/actual input|
|netusb.playPause|boolean|x|set Play/Pause|
|netusb.playback|text|-|status net player|
|netusb.stop|boolean|x|set Stop|
|netusb.auto_stop|boolean|-|automatically stopped|
|netusb.next|boolean|x|set Forward|
|netusb.prev|boolean|x|set Rewind|
|netusb.shuffle|boolean|x|toggle shuffle|
|netusb.shuffle_stat|text|-|shuffle status|
|netusb.repeat|boolean|x|toggle repeat|
|netusb.repeat_stat|text|-|repeat status|
|netusb.artist|text|-|artist name|
|netusb.album|text|-|album name|
|netusb.track|text|-|track name|
|netusb.albumart_url|text|-|http address for album art|
|netusb.albumart_id|value|-|album art id|
|netusb.play_time|value|-|played time in s|
|netusb.play_queue_type|text|-|netusb queue type|
|netusb.total_time|value|-|total time played in s|
|netusb.recent_info|json|-|history of played items|
|netusb.preset_info|json|-|saved presets/favourites|
|netusb.presetrecallnumber|value|x|recall the # in the favourite list|
|netusb.usb_devicetype|text|-|type of connected USB device|
|netusb.attribute|value|-|which possibiolites has the service, to be decoded|

### system
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|system.api_version|value|-|API Version|
|system.system_version|value|-|System Version|
|system.inputs.{service}|value|-|available input service|
|system.inputs.{service}.account_enable|value|-|available input service enabled|
|system.inputs.{service}.distribution_enable|value|-|available input service distributable|
|system.inputs.{service}.play_info_type|value|-|available input service type|

### CD player
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|cd.playPause|boolean|x|set Play/Pause|
|cd.playback|text|-|status CD player|
|cd.stop|boolean|x|set Stop|
|cd.next|boolean|x|set Forward|
|cd.prev|boolean|x|set Rewind|
|cd.shuffle|boolean|x|toggle shuffle|
|cd.shuffle_stat|text|-|shuffle status|
|cd.repeat|boolean|x|toggle repeat|
|cd.repeat_stat|text|-|repeat status|
|cd.device_stat|text|-|device status|
|cd.playtime|value|-|current playback time|
|cd.totaltime|value|-|current track total time|
|cd.disctime|value|-|CD total time|
|cd.tracknumber|value|-|track current in playback|
|cd.totaltracks|value|-|total CD tracks|
|cd.artist|text|-|artist name|
|cd.album|text|-|album name|
|cd.track|text|-|track name|

### tuner
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|tuner.common_preset_info|array|-|Preset Information|
|tuner.am.preset_info|array|-|Preset AM Information|
|tuner.fm.preset_info|array|-|Preset FM Information|
|tuner.dab.preset_info|array|-|Preset DAB Information|
|tuner.am.preset|number|x|AM preset number|                 
|tuner.am.freq|number|x|AM frequency in kHz|
|tuner.am.tuned|boolean|-|AM tuned|
|tuner.fm.preset|number|x|FM preset number|               
|tuner.fm.freq|number|x|FM frequency in kHz|
|tuner.fm.tuned|boolean|-|FM tuned|
|tuner.fm.audio_mode|string|-|FM mono/stereo|
|tuner.dab.preset|number|x|DAB preset number|                 
|tuner.dab.id|number|-|DAB Station ID|
|tuner.dab.status|string|-|DAB status|
|tuner.dab.freq|number|-|DAB frequency|
|tuner.dab.category|string|-|primary/secondary|
|tuner.dab.audio_mode|string|-|DAB mono/stereo|
|tuner.dab.bit_rate|number|-|DAB bit rate in kpbs|
|tuner.dab.quality|number|-|DAB quality 0-100|
|tuner.dab.tune_aid|number|-|DAB signal strenth 0-100|
|tuner.dab.off_air|boolean|-|DAB off air|
|tuner.dab.dab_plus|boolean|-|DAB+|
|tuner.dab.program_type|string|-|DAB program type|
|tuner.dab.ch_label|string|-|DAB CH label|
|tuner.dab.service_label|string|-|DAB service label|
|tuner.dab.dls|string|-|DAB DLS|
|tuner.dab.ensemble_label|string|-|DAB ensmble label|
|tuner.dab.initial_scan_progress|number|-|DAB intitial scan progress 0-100|
|tuner.dab.total_station_num|number|-|DAB total stations 0-255|
|tuner.rds.program_type|string|-|RDS program type|                 
|tuner.rds.program_service|string|-|RDS program service|
|tuner.rds.radio_text_a|string|-|RDS text A|
|tuner.rds.radio_text_b|string|-|RDS text B|

### clock
|Object|Value|settable|Description|
|--------|-------|:-:|--------|
|clock.auto_sync|boolean|x|Clock auto sync|
|clock.format|string|x|Clock format 12h/24h|
|clock.alarm_on|boolean|x|Clock alarm status on/off|
|clock.volume|number|x|Clock alarm volume|
|clock.fade_interval|number|x|Clock alarm fade interval|
|clock.fade_type|number|x|Clock alarm fade type| 
|clock.mode|string|x|Clock alarm mode oneday/weekly| 
|clock.repeat|boolean|x|Clock alarm repeat if oneday is specified|   
|clock.{day}.enable|boolean|x|Clock Setup validity| 
|clock.{day}.time|string|-|Clock alarm start up time hhmm 00-23,00-59| 
|clock.{day}.beep|boolean|x|Clock Beep validity|
|clock.{day}.playback_type|string|-|Clock alarm playback type resume/preset|
|clock.{day}.resume_input|string|-|Clock alarm resume input ID|
|clock.{day}.preset_type|string|-|Clock alarm preset type|
|clock.{day}.preset_num|number|-|Clock alarm preset input ID| 
|clock.{day}.preset_netusb_input|string|-|Clock alarm netusb input ID| 
|clock.{day}.preset_netusb_text|string|-|Clock alarm netusb text| 
|clock.{day}.preset_tuner_band|string|-|Clock alarm tuner band|
|clock.{day}.preset_tuner_number|number|-|Clock alarm tuner frequency or station ID|


## ToDo
* support of lists
* change of interaction values to nice naming
* fastforward/fastrewind for NETUSB/CD
* bluetooth
* dialog level

## Changelog
#### 0.1.4
* (Scrounger) correction of type mismatch (array object)

#### 0.1.3
* (foxthefox) added writing for linkControl/linkAudioDelay/linkAudioQuality

#### 0.1.2
* (Scrounger) correction of type mismatch (string boolean)

#### 0.1.1
* correction for clock "oneday"

#### 0.1.0
* compact mode
* yamaha-yxc-nodejs 0.0.8
* widget update

#### 0.0.9
* adminV3 uses values2table and add button back again
* zone2/3/4 now working
* extended automatic testing
* button in admin for collection of JSON responses

#### 0.0.8
* automatic testing update
* given name in admin page to appear in object (device)

#### 0.0.7
* tuner support
* clock support (information mainly)
* support of more zones
* support of mc-link
* setting of min and max values according features
* admin v3

#### 0.0.6
* widget set matching the objects and control
* cd.shuffle_stat boolean -> text
* new netusb.shuffle_stat (text)
* status update via subscribing UDP messages
* switch for update on playtime info (disabling reduces traffic)

#### 0.0.5
* cleanup in admin page
* improvement for object creation
* more objects on netusb
* more objects in system
* added support of CD

#### 0.0.4
* new objects and functions (input, sound_prog, EQ, clearVoice)
* search/discovery in admin page

#### 0.0.3
* more objects implemented

#### 0.0.2
* minor corrections

#### 0.0.1
* initial release with setting of IP in config-page, 
* available commands power, mute, volume

## License

The MIT License (MIT)

Copyright (c) 2017 - 2020 foxthefox <foxthefox@wysiwis.net>
