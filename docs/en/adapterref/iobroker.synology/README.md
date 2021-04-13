![Logo](admin/synology.png)
# ioBroker Synology adapter

![Number of Installations](http://iobroker.live/badges/synology-installed.svg) ![Number of Installations](http://iobroker.live/badges/synology-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.synology.svg)](https://www.npmjs.com/package/iobroker.synology)
[![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)](https://www.npmjs.com/package/iobroker.synology)
[![Tests](https://github.com/instalator/iobroker.synology/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.synology/actions/)

[![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)](https://nodei.co/npm/iobroker.synology/)

[![Donate](https://img.shields.io/badge/Donate-YooMoney-green)](https://sobe.ru/na/instalator)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PFUALWTR2CTPY)

## Description
The driver allows you to receive data and manage your Synology NAS server.

### 2FA Settings

If you use 2FA see instructions [here](docs/en/template.md)

### sendMethod

You can send any command (method) by setting the sendMethod object, for example:
Get the SurveillanceStation info is a getInfo method with no additional parameters.

```{"method": "getInfo", "params": {}}```

### Control
**commands.reboot** - reboot NAS

**commands.shutdown** - shutdown NAS

***SurveillanceStation.cameras.{NAMECAM}***:
* enabled - Current status and enable/disable camera
* linkSnapshot - URL for snapshot

***SurveillanceStation.HomeMode.status_on*** - Current status and enable/disable homemode

***SurveillanceStation.getSnapshotCamera*** - Get snapshot by camera number, the file is saved in a directory ``...iobroker-data\synology_0\snapshotCam_2.jpg``

***AudioStation.players.{PLAYERID}***:
* play, pause, stop, next, prev - Controlling playback (button, only true)
* repeat - Repeat control (Off, All, One)
* shuffle - Shuffle control (true/false)
* volume - Volume remote player (0-100) 
* seek - Controlling playback seek (0-100)
* play_folder - Add tracks from the folder to the playlist (id folder e.g. ``dir_5816``)
* play_track - Play track by its id (e.g. ``music_120847``)
* current_play - Control and status of the current track by its number in the playlist (e.g. ``14``)

***DownloadStation***:
* activeTask - number of incomplete downloads
* listTasks - an array with incomplete downloads
* shedule_enabled, shedule_emule_enabled - Status and control of scheduled or immediate downloads
* add_hash_download - add to Hash Downloads (e.g. ``8BD3CAD02FC9ECB661A12378414FA310D3F3FE03``)
* add_url_download - add download URL or magnet link
* folder - The folder to download, set before adding the download, otherwise it is loaded into the default folder
* pause_task, resume_task - Pause the download and resume. (e.g. ``dbid_170`` or ``170`` or ``all``)

### Messagebox
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog

### 1.0.0
* (instalator) changed name objects in hdd_info [issues 51](https://github.com/instalator/ioBroker.synology/issues/51)
* (Apollon77) BREAKING CHANGE: Please set password new in admin!
* (Apollon77) js-controller 3.0 is now needed minimum!
* (Apollon77 store password now encrypted)

### 0.1.20
* (instalator) fixed error

### 0.1.18
* (instalator) change link for album cover

### 0.1.17
* (instalator) added Sentry plugin support

### 0.1.16
* (instalator) fixed error

### 0.1.15
* (instalator) fixed error in parse Info
* (instalator) fixed api undefined

### 0.1.14
* (instalator) fixed missing [datapoints](https://github.com/instalator/ioBroker.synology/issues/43)
* (instalator) refactoring
* (instalator) Changed the logging of some errors
* (instalator) Changed format session in syno package

### 0.1.11
* (instalator) added motionDetected state
* (SpectreKr*) Adding to FS Sharing

### 0.1.10
* (instalator) fixed copy cover file
* (instalator) fix get packages for DSM 5.x
* (instalator) Added option to select services for receiving data

### 0.1.8
* (instalator) fix error addDownload
* (instalator) fixed listRadios
* (instalator) fixed get cover

### 0.1.7
* (instalator) fixed 2FA
* (instalator) Added setup guide 2FA

### 0.1.6
* (instalator) fix for 2fa
* (instalator) fix error
* (instalator) change error log
* (instalator) fix io-package
* (instalator) fix error status player

### 0.1.4
* (instalator) change for DownloadStation
* (instalator) added playlist favorite radio
* (instalator) added clearPlaylist button
* (instalator) refactoring

### 0.1.3
* (instalator) change obj for ss info fix for cover song 
* (instalator) fix for info.connection 
* (instalator) add 6.2.3 fix for player browser files 
* (instalator) fix for 2FA
* (instalator) fixed error add download 
* (instalator) added DownloadStation task list

### 0.1.2
* (instalator) fixed error

### 0.1.1
* (instalator) added messagebox for snapshot
* (instalator) update readme
* (instalator) added ss link for different streams
* (instalator) fix error
* (instalator) refactoring

### 0.1.0
* (instalator) added HomeMode switch 
* (instalator) change for audiostation 
* (instalator) change for as and ss
* (instalator) added snapshot functional 
* (instalator) fixed systemConfig 
* (instalator) fixed many error 

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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
