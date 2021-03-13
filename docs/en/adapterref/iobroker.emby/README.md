![Logo](admin/emby.png)
# ioBroker.emby

[![Build Status](https://travis-ci.org/thewhobox/ioBroker.emby.svg?branch=master)](https://travis-ci.org/thewhobox/ioBroker.emby)
![Number of Installations](http://iobroker.live/badges/emby-installed.svg) ![Number of Installations](http://iobroker.live/badges/emby-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.emby.svg)](https://www.npmjs.com/package/iobroker.emby)
[![Downloads](https://img.shields.io/npm/dm/iobroker.emby.svg)](https://www.npmjs.com/package/iobroker.emby)

[![NPM](https://nodei.co/npm/iobroker.emby.png?downloads=true)](https://nodei.co/npm/iobroker.emby/)

This adapter will allow you to connect to your Emby Server and controle it.

Please follow the Steps to ensure the Adapter will work correctly and you can see all Devices.

## Steps 
1. Install the Adapter from Github

2. Edit the Settings and enter the IP, ApiKey and maybe some DeviceIds you want to ignore.

  ```IP **with** Port => 192.168.0.100:8096```
  
3. Save and restart the Adapter.

4. To see the first Items you will have to open a Emby Client to recieve some Data.
  
  ```The Adapter will not get Data if **no** client is open.```


## Objects

### Infos

| Command | Description | Info |
| ------------- | ------------- | ------------- |
| x.info.deviceName | Shows the Name of the Device |  |
| x.info.userName | Shows the Name of User logged in on the device |  |
| x.info.supportedCommands | List of supported commands |  |


### Media

| Command | Description | Info |
| ------------- | ------------- | ------------- |
| x.media.description | Description of the shown File. |  |
| x.media.isMuted | If Media is Muted. | Not all devices support this and will be False. |
| x.media.state | State of Media. | playing, paused, idle |
| x.media.title | The Title of the shown File. |  |
| x.media.type | The Type of the shown File. | Episode, Movie, Audio, None, etc. |
| x.media.seasonName | The Name of the Season  | Only if .media.type is Episode otherwise it will be empty. |
| x.media.seriesName | The Name of the Serie | Only if .media.type is Episode otherwise it will be empty. |


### Commands

| Command | Description | Info |
| ------------- | ------------- | ------------- |
| x.command.dialog | Show a dialog on the selected Device. | For example: Header\|Some text (if no header given, ioBroker will be Header) |
| x.command.goHome | Sends a command to the selected Device which will return to the Homescreen |  |
| x.command.message | Show a message on the selected Device for 5 sec. |  |
| x.command.play | Plays Media | Only if media is paused |
| x.command.pause | Pauses Media | Only if media is playing |
| x.command.toggleplay | Toggles Playstate | play/pause |
| x.command.mute | Mutes the device |  |
| x.command.unmute | Unmutes the device |  |
| x.command.togglemute | Toggles mute of device |  |
| x.command.volume | Sets the Volume of the selected Device. | Doesn't work on the most of devices since it doenst controle the TV Volume. |


## Changelog

### 1.0.3
* Added more info for playing item

### 1.0.0
* First stable public release
* Added support for Https and Http
* Added Url to Posters
* Added Datapoint for Endtime (hh:mm)

### 0.1.2
* Added more commands

### 0.1.1
* Added delay if you watch mor episodes

### 0.1.0
* Added automatic try reconnect after one minute

### 0.0.4
* added compact mode

### 0.0.3
* added new states, connection state and more improvment


### 0.0.2
* added more states
* added DisplayMessage

### 0.0.1
* Initial version




## License

MIT License

Copyright (c) 2020 thewhobox

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
