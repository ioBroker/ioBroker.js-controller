![Logo](admin/tileboard.png)
# ioBroker.tileboard

![Number of Installations](http://iobroker.live/badges/tileboard-installed.svg) ![Number of Installations](http://iobroker.live/badges/tileboard-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.tileboard.svg)](https://www.npmjs.com/package/iobroker.tileboard)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tileboard.svg)](https://www.npmjs.com/package/iobroker.tileboard)

[![NPM](https://nodei.co/npm/iobroker.tileboard.png?downloads=true)](https://nodei.co/npm/iobroker.tileboard/)

WEB visualisation for ioBroker platform based on [TileBoard for Home Assistant](https://github.com/resoai/TileBoard).
Big thanks to [Alexey Ivanov](https://github.com/resoai).

## Installation & Documentation

<!-- ![Demo interface](images/user0.png) -->
<!-- ![Demo interface](images/user7.png) -->

## Control interface
TileBoard creates 3 variables:

- control.instance - Here the browser instance should be written or "*" if every browser must be controlled.
- control.data     - Parameter for command. See specific command description.
- control.command  - Command name. Write this variable triggers the command. That means before command will be written the "instance" and "data" must be prepared with data.

Commands:

* alert - show alert window in TileBoard. "control.data" has following format "message;title;jquery-icon". Title and jquery-icon are optional. Icon names can be found [here](http://jqueryui.com/themeroller/). To show icon "ui-icon-info" write ```Message;;info```.
* changeView - switch to desired view. "control.data" must have the index or title of view, like defined in config.
* refresh - reload TileBoard, for instance after project is changed to reload on all browsers.
* reload - same as refresh.
* popup - opens a new browser window. Link must be specified in "control.data", e.g. http://google.com
* playSound - play sound file. The link to file is specified in "control.data", e.g. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3.
  You can upload your own file in TileBoard and let it play as for instance "/tileboard.0/main/img/myFile.mp3".

If user changes the view or at start the variables will be filled by TileBoard with

- "control.instance": browser instance and ack=true
- "control.data": the page title as defined in config
- "control.command": "changedView" and ack=true

You can write the JSON-string or Object into control.command as ```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}```. In this case the instance and data will be taken from JSON object.

### Alert
To get more settings for alert you can send following structure to adjust every parameter of the notification popup from script adapter.
```
setState('tileboard.0.control.command', JSON.stringify({
    command: "alert",
    instance: "*",
    data: {
        "icon": "mdi-car",        // Material icon
        "type": "info",           // Type: info, warning, error, success
        "title": "Information",   // Header of the message
        "message": "Hello world", // Text of the message
        "lifetime": 5,            // Seconds
    }
}));
```

## Changelog
### 0.2.0 (2019-07-15)
* (bluefox) Changes of the original tileboard were merged

### 0.1.1 (2019-02-12)
* (bluefox) Changes of the original tileboard were merged

### 0.1.0 (2019-01-16)
* (bluefox) initial commit

## License
Copyright (c) 2019 bluefox <dogafox@gmail.com>
 
MIT License