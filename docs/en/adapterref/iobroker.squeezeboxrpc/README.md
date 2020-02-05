![Logo](admin/squeezeboxrpc.png)

# ioBroker Logitech Squeezebox Adapter over JSON/RPC-Protocol

[![Number of Installations](http://iobroker.live/badges/squeezeboxrpc-installed.svg)](https://github.com/oweitman/ioBroker.squeezeboxrpc)
[![NPM version](http://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)](https://www.npmjs.com/package/iobroker.squeezeboxrpc)
[![Downloads](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)](https://www.npmjs.com/package/iobroker.squeezeboxrpc)
[![Travis](https://img.shields.io/travis/oweitman/ioBroker.squeezeboxrpc.svg)](https://travis-ci.org/oweitman/ioBroker.squeezeboxrpc/)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/oweitman/iobroker-squeezeboxrpc.svg)](https://ci.appveyor.com/project/oweitman/iobroker-squeezeboxrpc)
[![GitHub issues](https://img.shields.io/github/issues/oweitman/ioBroker.squeezeboxrpc.svg)](https://github.com/oweitman/ioBroker.squeezeboxrpc/issues)


This is an alternative Adapter that uses the JSON/RPC-Protokoll to get data and send commands to the Logitech Media Server ([LMS](https://de.wikipedia.org/wiki/Logitech_Media_Server))
for controlling connected devices like 
* native [squeezebox](https://de.wikipedia.org/wiki/Squeezebox), 
* raspberry pi with additional audio module and small linux based firmwares like [picoreplayer](https://picoreplayer.org/) or [max2play](https://www.max2play.com).
* with plugins chromecast, airplay or UPnP/DLNA-Devices

The LMS-Server can manage/provide very big music collections on harddrives or NAS, connect to different streaming providers like Spotify, Deezer, Soundcloud, shoutcast, tunein, napster, pandora, tidal and more

Why another squeezebox adapter?

The existing adapter use telnet to access the LMS. The telnet has some disadvantages.
The actual main web interface of the LMS also uses the rpc/json-protocol to get all needed informations or send commands to the server/players.

## Features

- most of data that the LMS-Service provides is available in the adapter
- detailed information about the player status, song title, artist, album, artwork, playlist
- many control features to play, pause, stop, forward, rewind, repeat, shuffle, play favorite, jump to time (absolute and relative) , jump to playlist index (absolute and relative), power on/off and preset buttons
- all favorites and all sub levels from server
- many widgets for the iobroker-vis component are included to create own control user interfaces (select player,select favorites, manage syncgroups, buttons for play/pause,fwd,rew, repeat mode and shuffle mode selection)

Documentation for the vis-widgets are available inside vis or [Widget-Documentation/german](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.squeezeboxrpc/blob/master/widgets/squeezeboxrpc/doc.html)


## Installation

- Install the package
- Create an instance
- Configure the Instance with the IP of the logitech media server and the port (normaly 9000)
- start/restart the instance

## Provided states

### Server

| state             | Description                    |
| ----------------- | ------------------------------ |
| LastScan          | timestamp of last music scan   |
| PlayerCount       | Number of known players        |
| PlayerCountOther  | Number of known other Players  |
| PlayerCountSN     | Number of known SN Players     |
| TotalAlbums       | Number of all known Albums     |
| TotalArtists      | Number of all known Artists    |
| TotalDuration     | Sum  playtime of all songs     |
| TotalGenres       | Number of all known Genres     |
| TotalSongs        | Number of all known songs      |
| SyncGroups        | Existing Syncgroups            |
| Version           | Version of LMS                 |
| mac               | MAC-ID of the server           |
| uuid              | uuid of the LMS-instance       |

additional a defined button to refresh the favorites

button            | Description
----------------- | ---------------------------------------------
getFavorites      | request all favorites from server


### Favorites

For each favorite
All attributes are read only

state             | Description
----------------- | ------------------------------
Name              | Name of the favorite
hasitems          | indicates if this is a dir
id                | id of the favorite
image             | image/icon for favorite if available
isaudio           | isaudio
type              | Example types: link, text, audio, playlist
url               | url of the track

 All sub levels (subdirectories) of favorite are available.

### Players

for each player
The mode shows if you can change the value. the taken action is described at the attribute

state                |mode | Description
-------------------- |---- | -----------------------------------------------------
Album                |R/-  | Name of the current album
Artist               |R/-  | Name of Artist
ArtworkUrl           |R/-  | url to the Artwork
Bitrate              |R/-  | Bitrate of the track
Connected            |R/-  | connectionstate of player (0/1)
Duration             |R/-  | Duration of the track
Genre                |R/-  | genre of the track
IP                   |R/-  | IP of the player
Mode                 |R/-  | play / pause / stop
Playername           |R/-  | Name of the Player
PlayerID             |R/-  | Player ID
Playlist             |R/-  | The actual Playlist as JSON
PlaylistCurrentIndex |R/W  | go to a absolut position by specifying the trackindex or go relative with a + or - at the beginning. Example 10,-3,+2
PlaylistRepeat       |R/W  | Repeat song(1)/playlist(2)/dont repeat(0)
PlaylistShuffle      |R/W  | shuffle playlist(1)/shuffle album(2)/dont shuffle(0)
Power                |R/W  | get/set Powerstate of player off(0)/on(1)
RadioName            |R/-  | Name of Radiostation
Rate                 |R/-  | Rating of the song
Remote               |R/-  | If remote stream (1)
SyncMaster           |R/-  | ID/MAC of Syncmaster
SyncSlaves           |R/-  | ID/Mac of Players in Syncgroup
Time                 |R/-  | elapsed song time
Title                |R/-  | song title
Type                 |R/-  | type of media (eg MP3 Radio)
Url                  |R/-  | Url of track / stream
Volume               |R/W  | get/set Volume of the player (0-100)
state                |R/W  | get/set play state: pause(0),play(1),stop(2)

The playlist provide actual the following attributes if available in LMS.
Somme attributes depends of the type of songs (stream/file/...)
All attributes are read only

attribute         | Description
----------------- | -----------------------------------------------------
Album             | Name of the current album
Artist            | Name of Artist
ArtworkUrl        | url to the Artwork
Bitrate           | Bitrate of the track
Duration          | Duration of the track
RadioName         | Name of Radiostation
Rate              | Rating of the song
title             | song title
Type              | type of media (eg MP3 Radio)
url               | Url of track / stream
index             | index of the song in the playlist
id                | id of the song

additional defined buttons:

button            | Description
----------------- | ---------------------------------------------
btnForward        | Next song
btnRewind         | Previous song
btnPreset_*       | 1-6 buttons to define in player or server
cmdGeneral        | a general command field to send commands to the player. every field must enclosed by quotation marks. parameters musst be seperated by comma. Example: "play","1"
cmdPlayFavorite   | to play a favorite set the id of the favorite
cmdPlayUrl        | to play a url´example "http://50.7.77.114:8101/;"
cmdGoTime         | jump to a absolut position by specifying a number of seconds or jump relative with a + or - at the beginning of the seconds. Example 100,-50,+50

For more information visit the CLI-documentation:

https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md

## Todo

* more testing/fixing
* reduce dependencys to other packages (squeezenode)
* more configuration to optionaly turn features on/off to improve memory and performance
* add playlist widget
* add player controlled circle knob widget
* ~~add telnet communication to get push events from the server to optimize the polling~~
* ~~implement a command state to place user individual commands (via json) for server and player~~
* ~~implement more control features (select playlist pos to play,ffwd,frew,jump to a time position in song,repeat song,random song)~~
* ~~add the playlist to playerdata as json array~~
* ~~add artwork (station-logo/playlist-cover) for favorites~~
* ~~implement more levels (subdirectories) of favorites~~
* ~~autodiscover logitech media server~~

## Changelog
### 0.8.30
 * change from the issue of the adapter checker
### 0.8.29
 * optimize handling of player state power and connected
### 0.8.28
 * add advanced signaling function with telnet and fix some more authorization issues with LMS
### 0.8.27
 * initialization for the new calctype property if empty in volumebar
### 0.8.26
 * more improvement and fixing at volumebar / remove playlist widget from master. not ready yet
### 0.8.25
 * fixing css-settings on volumebar
### 0.8.24
 * volumebar didnt get events between the segments, change clickevent and calculation
### 0.8.23
 * adjust dependencies to remove vulnerabilities in dependend packages. alos remove travis due of unresolvable build-failures for win+node10/12
### 0.8.22
 * due to iobroker.controller 2.0 a command in the api changed (socket to vis.conn._socket)
### 0.8.21
 * add command für playing urls
### 0.8.20
 * remove node v6 test setting
### 0.8.19
 * shorten news history
### 0.8.18 (2019-06-27)
* last minute changes.
### 0.8.17 (2019-06-26)
* add more widges: playtime bar, string, number, datetime, image. add button margin to player and favorite widget, improve editing of viewindex. do some refactoring.
### 0.8.16 (2019-06-24)
* resolve a cross browser issue for firefox. the style.font attribute is empty and you have to construct the font string by yourself
### 0.8.15 (2019-06-19)
* minor issue with not ready states
### 0.8.14 (2019-06-19)
* add syncgroups as new server-datapoint,add syncgroup widget, change some jquery event logic
### 0.8.13 (2019-06-16)
* rename widgetset from squeezeboxrpcwidgets to squeezeboxrpc
### 0.8.12 (2019-06-16)
* sync version with npm
### 0.8.11 (2019-06-15)
* try to integrate the widgets into the main adapter
### 0.8.10 (2019-05-15)
* another try to fix the EADDRINUSE error of the server discovery
### 0.8.9 (2019-05-15)
* try to fix the EADDRINUSE error of the server discovery
### 0.8.8 (2019-05-14)
* make discover configurable
### 0.8.7 (2019-05-11)
* more control features (select playlist pos to play,ffwd,frew,jump to a time position in song,repeat song,random song)
### 0.8.6 (2019-05-10)
* move some configuration options into seperate tabs
### 0.8.5 (2019-05-08)
* change serverdiscovery interval method, remove some double cmd lines, additional minor changes advised from eslint
### 0.8.4
* move some files to lib directory
### 0.8.3
* close port for discovery on unload
### 0.8.2
* sync version with npm
### 0.8.1
* set compact mode flag
### 0.8.0
* implementation of compact mode, change version to represent a realistic feature completness
### 0.0.9
* debug options are now configurable
### 0.0.8
* More playlist attributes + remove trailing and leading spaces from source
### 0.0.7
* Add the playlist to each player as json
### 0.0.6
* More config options
### 0.0.5
* All levels/subdirectories of favorites are now available in iobroker
### 0.0.4
* added the cmdPlayFavorite for each player
### 0.0.3
* repair the no-data symbols for buttons in vis
### 0.0.2
* added autodiscovery
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2019-2020 oweitman

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
