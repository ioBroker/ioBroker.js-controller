![Logo](admin/squeezebox.png)
# ioBroker Logitech Squeezebox Adapter

![Number of Installations](http://iobroker.live/badges/squeezebox-installed.svg) ![Number of Installations](http://iobroker.live/badges/squeezebox-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.squeezebox.svg)](https://www.npmjs.com/package/iobroker.squeezebox) [![Downloads](https://img.shields.io/npm/dm/iobroker.squeezebox.svg)](https://www.npmjs.com/package/iobroker.squeezebox) [![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.squeezebox.svg)](https://travis-ci.org/UncleSamSwiss/ioBroker.squeezebox/) [![AppVeyor Build Status](https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-squeezebox.svg)](https://ci.appveyor.com/project/UncleSamSwiss/iobroker-squeezebox) [![GitHub issues](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.squeezebox.svg)](https://github.com/UncleSamSwiss/ioBroker.squeezebox/issues)

Controls a Squeezebox Server a.k.a. Logitech Media Server and its players.

## Install

Install this adapter via ioBroker Admin.

1. Open instance config dialog
2. Enter the IP address or host name of your Squeezebox Server
3. Lower the time update interval value if you have enough performance in your system.
4. Save the configuration
5. Start the adapter

## Configuration
### Logitech Media Server Address
This is the IP address or host name of your Squeezebox Server.

### Logitech Media Server Port
This is the TCP port of your Squeezebox Server.
Optional, default value is 9090.
The server must listen to telnet commands on this port (don't confuse this with the web (HTTP) port which will always be a different one).

### Username (optional)
This is the username of your Squeezebox Server.
By default this can be left empty. It is only needed if your server has password protection turned on.

### Password (optional)
This is the password of your Squeezebox Server.
By default this can be left empty. It is only needed if your server has password protection turned on.

### Track time update interval (sec)
Every N seconds the elapsed time of playing tracks is updated.
Leave this at 5 seconds if you are not using this for visualization.
If you need more precision, set it to 2 or 1 seconds.

## States

The adapter automatically connects to the configured Squeezebox Server and creates the following states for each player connected to the Squeezebox Server.

The names of the states are formatted like this: squeezebox.&lt;instance&gt;.&lt;player&gt;.&lt;state&gt;
- &lt;instance&gt; is the ioBroker adapter instance index (usually "0")
- &lt;player&gt; is the name you gave to the player when configuring it (spaces are replaced by underscores "_")
- &lt;state&gt; is described in the following sections

### squeezebox.&lt;instance&gt;.&lt;player&gt;.power
Boolean, read-write

- true: player is powered on
- false: plyer is on stand-by

### squeezebox.&lt;instance&gt;.&lt;player&gt;.state
Enumeration, read-write

- 0: Pause
- 1: Play
- 2: Stop

### squeezebox.&lt;instance&gt;.&lt;player&gt;.volume
Integer (0...100), read-write

Playback volume from nothing (0) to maximum (100)
Be careful when setting high values (&gt;50) as this might hurt your ears (or your loved ones')!

### squeezebox.&lt;instance&gt;.&lt;player&gt;.muting
Boolean, read-write

- true: player is muted (playback continues, but loudspeaker is off)
- false: player is in regular playback mode

### squeezebox.&lt;instance&gt;.&lt;player&gt;.pathUrl
String, read-write

The URL of the currently playing (or paused) song or stream.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.currentTitle
String, read-only

The name of the currently playing (or paused) song or stream. Can be empty.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.currentAlbum
String, read-only

The name of the album of the currently playing (or paused) song or stream. Can be empty.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.currentArtist
String, read-only

The name of the artist of the currently playing (or paused) song or stream. Can be empty.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.currentArtwork
String (URL), read-only

The URL to an artwork for the currently playing (or paused) song or stream. Should never be empty.
If a stream is played, its artwork URL is used (see CLI "songinfo" tag "K").
If there is no artwork URL available (e.g. for a regular MP3 from LMS), the generic "current player artwork" link is used.
To the generic artwork link, the adapter adds a "random" number to make sure the URL changes whenever the song changes.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.currentDuration
Integer, read-only

The total length in seconds of the current song or stream.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.currentDurationText
String, read-only

The formatted total length of the current song or stream. (Format: "[hh:]mm:ss")

### squeezebox.&lt;instance&gt;.&lt;player&gt;.elapsedTime
Integer, read-only

The number of seconds the current song or stream has been played already. This value is updated every "Track time update interval" (see Configuration above)

### squeezebox.&lt;instance&gt;.&lt;player&gt;.elapsedTimeText
String, read-only

The formatted time the current song or stream has been played already. This value is updated every "Track time update interval" (see Configuration above)

### squeezebox.&lt;instance&gt;.&lt;player&gt;.sleep
Integer, read-write

The number of seconds until the player goes to sleep.
Set this state to fade out and turn off the player with the given number of seconds as a duration.
If this value is zero, the player is either off or not going to sleep; otherwise this player is going to sleep.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.buttons.forward
Button, write-only

Jumps to the next track in the playlist.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.buttons.rewind
Button, write-only

Jumps to the previous track in the playlist.

### squeezebox.&lt;instance&gt;.&lt;player&gt;.buttons.preset_&lt;1-6&gt;
Button, write-only

Switches to given preset number stored in the player.

## Changelog
### 1.0.0 (2018-12-23)
* (mrMuppet) Fixed title error in streams and artwork.
* (mafof) Added buttons for forward/rewind and presets.
* (mafof) Added playlist path URL and sleep states.

### 0.2.1 (2017-10-08)
* (UncleSamSwiss) Fixed issue with more than 9 players (fix in logitechmediaserver package)

### 0.2.0 (2017-07-24)
* (UncleSamSwiss) Added support for optional TCP port number (default is still 9090)
* (UncleSamSwiss) Added support for optional login using username and password (by default still no authentication is used)

### 0.1.0 (2016-01-16)
* (UncleSamSwiss) Ready to be published to NPM (no further changes)

### 0.0.2 (2016-01-10)
* (UncleSamSwiss) Support for artwork (will use stream artwork if available, otherwise server artwork)

### 0.0.1 (2015-12-07)
* (UncleSamSwiss) Initial version

## Roadmap/Todo

- State for playlist [Arminhh]
- Synchronization of players [Arminhh]
- Control LMS from ioBroker (e.g. choose a radio station from the favorites) [ak1]


## License

Apache 2.0

Copyright (c) 2015 UncleSamSwiss
