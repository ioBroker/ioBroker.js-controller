---
BADGE-Build Status Travis: https://travis-ci.org/foxriver76/ioBroker.xbox.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/s1we3cpcbxm97upp/branch/master?svg=true
BADGE-Number of Installations: http://iobroker.live/badges/xbox-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xbox.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xbox.svg
BADGE-NPM: https://nodei.co/npm/iobroker.xbox.png?downloads=true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.xbox/README.md
title: Xbox adapter
hash: B+HOIdyHj0b3Mv2rWY8zlsmiUO0i+KPHylmETFM704c=
---
![logo](../../../de/adapterref/iobroker.xbox/media/xbox.png)

# Xbox adapter
The Xbox Adapter allows the integration of an Xbox One or Xbox One X game console into the ioBroker system.

## Overview
### Xbox One game console
The Xbox One is a game console developed by Microsoft that currently plays popular video games. In addition, the Xbox One is able to control various components of the home theater system and enables the use of Microsoft Apps. <br/> Further characteristics of the Xbox One are currently the Xbox One X and the Xbox One S, which offer the same functions as the origin console, but with improved performance.

### Xbox Adapter
The Xbox Adapter can be set up for one Xbox One console each, allowing control and reading of information. <br/> The adapter automatically creates all commands and states in the form of objects. A large part of the states can also be read out, such as: For example, the current title, the power-on state, etc. By designating or reading the created objects, their status can be changed and thus actions can be triggered or queried.

## Prerequisites before installation
1. Before the adapter can be added, at least Python 3.5 must be on the host system

be installed.

2. If the Xbox is to be switched on via the adapter, the

['Fast Startup' mode](https://support.xbox.com/de-DE/xbox-one/console/learn-about-power-modes) be configured in the console.

Thanksgiving
Many thanks to [Team Open Xbox](https://openxbox.org/) for the development and provision of [xbox-rest-server](https://github.com/OpenXbox/xbox-smartglass-rest-python) and the associated libraries.

## Installation
An instance of the adapter is installed via the ioBroker Admin interface. The detailed instructions for the necessary installation steps can be found here (TODO: LINK). <br/><br/> After completing the installation of an adapter instance, a configuration window opens automatically.

## Configuration
![Adapter Configuration](../../../de/adapterref/iobroker.xbox/media/adapter-configuration.png "configuration") <br/> <span style="color:grey">* Admin interface *</span>

| Field | Description |
|:-------------|:-------------|
| Xbox Live ID | Enter the Live ID of the Xbox, which can be found in the console settings. |
| IP | Enter the IP address of the console here. |
| Authentication with Xbox Live | If the checkbox has been ticked, the email address and password will log in to Xbox Live. |
| E-mail address | Enter the e-mail address of the Xbox Live account here. |
| Password | Enter the password for the Xbox Live account. |

After completing the configuration, the configuration dialog is quit with `SPEICHERN UND SCHLIEßEN`.
This will result in a subsequent restart of the adapter.

## Instances
The installation of the adapter has created an active instance of the Xbox Adapter in the section `Instanzen`. <br/><br/> ![instance](../../../de/adapterref/iobroker.xbox/media/instance.png "instance") <br/> <span style="color:grey">* First instance *</span>

On an ioBroker server several Xbox Adapter instances can be created. Also, one can be connected to multiple ioBroker servers at the same time. If several devices are to be controlled by an ioBroker server, an instance should be created for each Xbox. <br/><br/> Whether the adapter is enabled or connected to the Xbox is indicated by the color of the instance&#39;s Status field. If the mouse pointer points to the symbol, further detailed information is displayed.

## Objects of the adapter
In the section `Objekte` all information and activities supported by the Xbox are listed in a tree structure. In addition, it also informs you whether the communication with the Xbox is running smoothly.

![objects](../../../de/adapterref/iobroker.xbox/media/objects.png "Xbox objects") </br> <span style="color:grey">* Objects of the Xbox Adapter *</span>

Subsequently, the objects are subdivided by channel.
Each data point is associated with its associated data type and permissions. If it is a button, the description of the type and the rights is omitted.
Permissions can be read (R) as well as write (W). Each data point can at least be read (R) while others can also be described. To search for a specific data point, the search is recommended using the key combination "CTRL + F".

### Channel: Info
* info.connection

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

   * Read-only indicator that is true if the ioBroker is connected to the Xbox. *

* info.currentTitles

|     | Data type | authorization |
|     |:---:|:---:|
|     | String | R |

* Read only JSON string, which consists of key-value pairs. The key is the name of a running title, and the value of the ID of the title is converted to the hexadecimal system. This ID can be used to start the desired title with the settings.launchTitle State. *

* info.activeTitleName

|     | Data type | authorization |
|     |:---:|:---:|
|     | String | R |

    * Contains the name of the active title (title in the foreground), in the form of a string. *

* info.activeTitleId

|     | Data type | authorization |
|     |:---:|:---:|
|     | String | R |

    * Contains the ID of the title converted to hexadecimal in the foreground as a string. *

* info.activeTitleImage

|     | Data type | authorization |
|     |:---:|:---:|
|     | String | R |

* Contains the link to the cover image of the title in the foreground in the form of a string.
The state is only present as well as functional if the authentication in the adapter settings has been activated. *

* info.activeTitleType

|     | Data type | authorization |
|     |:---:|:---:|
|     | String | R |

    * Contains the type of title that is in the foreground, in the form of a read-only string. Eg 'Game'. *

* info.gamertag

|     | Data type | authorization |
|     |:---:|:---:|
|     | String | R |

* String value containing the gamertag of the currently authenticated account.
The state is only present as well as functional if the authentication in the adapter settings has been activated. *

* info.authenticated

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R |

* Boolean value, which is true if authentication with Xbox Live was successful, otherwise false.
The state is only present as well as functional if the authentication in the adapter settings has been activated. *

### Channel: Settings
* settings.power

|     | Data type | authorization |
|     |:---:|:---:|
|     | Boolean | R / W |

* Boolean value with which the Xbox can be switched on and off. Also serves as an indicator whether the Xbox is on or off. *

* settings.launchTitle

|     | Data type | authorization |
|     |:---:|:---:|
|     | String | R / W |

* By setting the string value to a hexadecimal title ID, a title can be started on the Xbox.
The title ID of an active game can be found out by the info.currentTitles State.
The state is acknowledged as soon as it is submitted to the Xbox, which does not mean that the command was executed. *

   * Example: *

```javascript
setState('settings.launchTitle', '2340236c', false); // Starte Red Dead Redemption 2
```

* settings.inputText

|     | Data type | authorization |
|     |:---:|:---:|
|     | String | R / W |

* By describing the String States, text can be inserted in an active input field, eg. B. to send a private message or enter a code.
The state is acknowledged as soon as it is submitted to the Xbox, which does not mean that the command was executed. *

   * Example: *

```javascript
setState('settings.inputText', 'H1 M8 h0w d0 u do?', false); // Versendet einen nerdigen Text
```

* settings.gameDvr

* Button, which records the last minute of a game when pressed. The button is available if the authentication has been made in the settings.
Also, the authenticated account must be logged on to the Xbox and a game must be in the foreground.

### Channel: Gamepad
* gamepad.a

   * Emulates the A button of the controller. *

* gamepad.b

   * Emulates the B button of the controller. *

* gamepad.x

   * Emulates the X button of the controller. *

* gamepad.y

   * Emulates the Y button of the controller. *

* gamepad.clear

   * Emulates the 'Clear' button of the controller. *

* gamepad.dPadDown

   * Emulates the DPAD down button of the controller. *

* gamepad.dPadUp

   * Emulates the DPAD high button of the controller. *

* gamepad.dPadRight

   * Emulates the DPAD right button of the controller. *

* gamepad.dPadLeft

   * Emulates the DPAD left button of the controller. *

* gamepad.enroll

   * Emulates the 'Enroll' button of the controller. *

* gamepad.leftShoulder

   * Emulates a press of the controller's left shoulder button. *

* gamepad.rightShoulder

   * Emulates a press of the controller's right shoulder button. *

* gamepad.leftThumbstick

   * Emulates a press of the left stick of the controller. *

* gamepad.rightThumbstick

   * Emulates a press of the controller's right stick. *

* gamepad.menu

   * Emulates the menu button of the controller. *

* gamepad.nexus

   * Emulates the controller's Nexus (Xbox) button. *

* gamepad.view

   * Emulate the 'View' button of the controller. *

### Channel: Media
* media.seek

|     | Data type | authorization |
|     |:---:|:---:|
|     | Number | R / W |

* Number value to jump to a specific location of media content. The state is confirmed as soon as it arrives at the server, which does not mean that it was executed. *

* media.play

   * Button to play media content. *

* media.pause

   * Button for pausing media content. *

* media.playPause

   * Combined play / pause button for media content. *

* media.back

   * Back button for media content. *

* media.channelDown

   * Button that shuts down the media content channel. *

* media.channelUp

   * Button that moves up the channel for media content. *

* media.fastForward

   * Button for fast forwarding media content. *

* media.menu

   * Menu button for media content. *

* media.nextTrack

   * Button that skips to the next track when playing media content. *

* media.previousTrack

   * Button that skips to the previous track when playing media content. *

* media.record

   * Recording button for media content. *

* media.rewind

   * Button for rewinding media content. *

* media.stop

   * Stop button for media content. *

* media.view

   * View button for media content. *

## Changelog

### 0.5.6
* (foxriver76) if still logged in dont log warning/set auth false anymore
* (foxriver76) on logout only set auth to false, but keep gamertag

### 0.5.5
* (foxriver76) minor optimizations

### 0.5.3
* (foxriver76) improve log message quality
* (foxriver76) more promisification
* (foxriver76) minor fix for compact mode

### 0.5.0
* (foxriver76) support of compact mode
* (foxriver76) fixes and optimizations

### 0.4.4
* (foxriver76) small fixes and optimizations

### 0.4.2
* (foxriver76) use adapter-core module

### 0.4.1
* (foxriver76) minor type fix

### 0.4.0
* (foxriver76) Seek converted to number, to jump to specific position
* (foxriver76) try reauthentication when auth gets lost

### 0.3.0
* (foxriver76) new state activeTitleType added
* (foxriver76) minor fixes
* (foxriver76) authentication for 2 factor auth added

### 0.2.2
* (foxriver76) minor fix when currentTitles empty, activeTitle states should be too
* (foxriver76) dont set info.connection on power off, because will be
self detected and prevents reconnection on shutdown

### 0.2.1
* (foxriver76) minor fix on state name

### 0.2.0
* (foxriver76) Authentication for Xbox Live added
* (foxriver76) When logged in current titles contains the correct title full name
* (foxriver76) Added decryption and encryption
* (foxriver76) minor fixes
* (foxriver76) Added new states

### 0.1.7
* (foxriver76) rest-server will now be stopped on windows unload too
* (foxriver76) enhanced windows debug logging

### 0.1.6
* (foxriver76) fix rest-server start on win when nopy not in own node_modules folder

### 0.1.5
* (foxriver76) starting rest-server on windows fixed
* (foxriver76) stopping rest-server on windows fixed

### 0.1.4
* (foxriver76) set info.connection and settings.power to false on unload
* (foxriver76) not only rely on ping to check if xbox is on, use available too

### 0.1.3
* (foxriver76) minor fix
* (foxriver76) bump smartglass-rest requirement to 0.9.7
* (foxriver76) enables pwoer on for not multicastable consoles
* (foxriver76) only use discovery when Xbox disconnected and online

### 0.1.2
* (foxriver76) fix when currentTitles is empty

### 0.1.1
* (foxriver76) minor fixes
* (foxriver76) explicit require versions of python deps
* (foxriver76) fix for power on, when Xbox not in broadcast network

### 0.1.0
* (foxriver76) brought back live id to settings
* (foxriver76) input text state to enter text in an open text field
* (foxriver76) ability to find consoles which are not available via broadcast
* (foxriver76) info state for active titles & launch title state

### 0.0.13
* (foxriver76) minor fix
* (foxriver76) restart adapter on rest server error
* (foxriver76) log when losing connection without ping

### 0.0.12
* (foxriver76) when console unavailable, also do not connect
* (foxriver76) debug logging for unavailable console
* (foxriver76) only set power states on change

### 0.0.11
* (foxriver76) minor connection fix

### 0.0.10
* (foxriver76) when status is connecting, don't connect again

### 0.0.9
* (foxriver76) LiveID is not necessary anymore

### 0.0.8
* (foxriver76) If reconnect attempts fail often in a row, only log it once
* (foxriver76) removed unneeded objects from io-package and adjusted title

### 0.0.6
* (foxriver76) Stop making connect requests when already connected
* (foxriver76) more user friendly logging
* (foxriver76) more robustness in nopys path

### 0.0.5
* (foxriver76) using relative paths for starting server
* (foxriver76) adding commands for windows
* (foxriver76) enhanced installation manual

### 0.0.4
* (foxriver76) automatically install required Debian packages
* (foxriver76) updated Readme
* (foxriver76) make installation for Windows possible
* (foxriver76) improved logging
* (foxriver76) detect OS

### 0.0.3
* (foxriver76) fixed state handling
* (foxriver76) using ping to check consoles power status instead of connection
* (foxriver76) stop powering on if it is unsuccessful for 15 seconds
* (foxriver76) restarting adapter when REST snpm erver is down

### 0.0.2
* (foxriver76) fixed endpoints
* (foxriver76) automated installation of dependencies
* (foxriver76) readme updated
* (foxriver76) code optimized

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