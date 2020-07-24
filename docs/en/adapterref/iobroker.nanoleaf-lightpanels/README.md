![Logo](admin/nanoleaf-lightpanels.png)
# ioBroker.nanoleaf-lightpanels Adapter
=================

[![NPM version](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)](https://www.npmjs.com/package/iobroker.nanoleaf-lightpanels)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)](https://www.npmjs.com/package/iobroker.nanoleaf-lightpanels)
[![Build Status Travis](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels.svg?branch=master)](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels)
[![Build status Appveyor](https://ci.appveyor.com/api/projects/status/29fjgn8ww5w96etq/branch/master?svg=true)](https://ci.appveyor.com/project/daniel-2k/iobroker-nanoleaf-lightpanels/branch/master)

[![NPM](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)](https://nodei.co/npm/iobroker.nanoleaf-lightpanels/)

This is an ioBroker Adapter to control the nanoleaf Light Panels (formerly nanoleaf Aurora) or nanoleaf Canvas through the nanoleaf OpenAPI.

## Connection to the nanoleaf Light Panels/Canvas Controller:
1. In the adapter settings you have to set the IP address and port of the nanoleaf Controller. The nanoleaf OpenAPI needs an authorization token to grant access to    the REST-API. If you have already one, you can enter the token here and skip the next step.
   You can use the search devices function on the admin page to detect your nanoleaf devices.
2. If you don't have an authorization token you need to request it from the nanoleaf OpenAPI.
   To do this, set the nanoleaf Controller into pairing mode by pressing and holding the power button at the device for 5-7 seconds until the LEDs flash alternately.
   Then click on the button 'Obtain authorization token' within 30 seconds (pairing mode stops after 30 seconds). The adapter must be running!
   If it was successful the authorization token should be seen in the field 'Authentication token'. If an error occurred you get a pop up with the error message (details you can see in the log).
3. Save the settings.
4. Have fun!

Since Light Panels firmware version > 3.1.0 and Canvas firmware version > 1.1.0 Server Sent Events (SSE) can be used for direct status updates. For Canvas devices touch events are supported.
The setting for the status update polling interval only affects devices with lower firmware versions where polling is used for status updates.

## Alexa
You can control the nanoleaf Light Panels/Canvas with Alexa via ioBroker (Cloud-Adapter).
Power on/off, brightness, color and color temperature is supported.
You have to set up the datapoints
* state (for power on/off)
* hue (for color)
* saturation (for color)
* brightness (for color)
* colorTemp (for color temperature)

in Cloud adapter under the same smartname.

## ioBroker Visualization
The nanoleaf Light Panels/Canvas can be controlled in ioBroker Visualization by using basic widgets as "Radiobuttons on/off" or sliders for controlling the power sate, the brightness, hue, saturation and color temperature states.

For effects you can use the "Select ValueList" widget to use it as a drop down list and then map the effectsList state to the value and text property of the widget (type: "{nanoleaf-lightpanels.0.LightPanels.effectsList}" -> the curly braces are important!)

To control and visualize the color you have to install the color picker style Widgets. You can map the RGB ID to the colorRGB state or use the three HSV states as well.

You can use the nanoleaf vis demo project found in the /vis subfolder on github.

## Changelog

### 1.0.2 (2020-07-06)
* (daniel_2k) fixed: detection of ssdp:alive notify message for Canvas (fix disconnect/connect issue)
* (daniel_2k) fixed: sending correct service type for discovery of Canvas devices (fixes no devices found for Canvas devices)
* (daniel_2k) changed: if unknown nanoleaf device is detected Canvas will be used as fallback and warning will be logged
* (daniel_2k) fixed: setting rhythmMode was not working

### 1.0.1 (2020-07-05)
* (daniel_2k) fixed: detection of firmware version for Canvas for enabling SSE (Canvas firmware > 1.1.0 required)

### 1.0.0 (2020-06-18)
* (daniel_2k) new: using server sent events (SSE) for getting updates instead of polling (firmware > 3.1.0 required)
* (daniel_2k) new: support touch events for Canvas
* (daniel_2k) new: searching devices in Admin is now possible
* (daniel_2k) changed: moved duration for brightness state to separate state (please note: duration of in native part of brightness state will no longer work)
* (daniel_2k) changed: some minor internal adjustments
* (daniel_2k) changed: removed Admin2 configuration page

### 0.8.2 (2019-08-02)
* (daniel_2k) fixed: effects with special characters (german umlauts) can now be set (fixes HTTP error code 422)
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for all devices (works also no longer with Light Panels since firmware update)

### 0.8.1 (2019-01-31)
* (daniel_2k) new: rhythm module mode (microphone/AUX input) can be changed
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for Canvas because not supported
* (daniel_2k) fixed: Rhythm module information depending of connect state

### 0.8.0 (2019-01-27)
* (daniel_2k) changed: adapter has own nanoleaf-api lib (no dependency), because the nanoleaf-aurora-client module does not implement the nanoleaf API correctly (will be changed until this is fixed in the module)
* (daniel_2k) fixed: should now work properly with Canvas
* (daniel_2k) new: duration for brightness changes added (can be set in native part of brightness state)
* (daniel_2k) new: added compact mode
* (daniel_2k) changed: handling of device states
* (daniel_2k) fixed: command queue will not process when states are written which cannot be processed
* (daniel_2k) changed: some small code adjustments

### 0.7.0 (2019-01-20)
* (daniel_2k) new: compatible with nanoleaf Canvas
* (daniel_2k) changed: Rhythm module information is now obtained depended if it is connected or not (only Light Panels)
* (daniel_2k) changed: some small adjustments

### 0.6.1 (2018-10-13)
* (daniel_2k) fixed: command processing stopping when invalid RGB value is written to 'colorRGB'
* (daniel_2k) changed: more error logging of invalid values send to controller
* (daniel_2k) changed: adjusted types and roles

### 0.6.0 (2018-09-02)
* (daniel_2k) changed: processing commands in sequence (FIFO) ensuring that all commands are executed and avoiding hanging of the nanoleaf-controller sometimes

### 0.5.0 (2018-08-10)
* (daniel_2k) changed: automatically reconnect attemps will be done in any case of connection failures (fixes no reconnect when device hung and was restarted)
* (daniel_2k) new: default minimum values for polling intervals in adapter
* (daniel_2k) new: static effects 'Solid' and 'Dynamic' added to effect states
* (daniel_2k) changed: save settings in admin is only possible when all fields filled
* (daniel_2k) changed: optimized debug logging

### 0.4.1 (2018-07-13)
* (daniel_2k) added automatic testing via Travis and Appveyor
* (daniel_2k) preparations for official repository

### 0.4.0 (2018-06-11)
* (daniel_2k) changed: Authorization token will be obtained now in the adapter settings (not on adapter start)
* (daniel_2k) fixed: some texts in the old adapter settings (Admin2)
* (daniel_2k) new: State 'effect' now contains all possible states (auto updated)
* (daniel_2k) changed: updated AuroraAPI version to 1.2.2

### 0.3.0 (2018-05-12)
* (daniel_2k) new: state "ColorRGB" for controlling color with hex RGB values
* (daniel_2k) changed: updating states from API only when value changed
* (daniel_2k) changed: state effectsList will now be written as a semicolon seperated list to use it with "Select ValueList" widget in ioBroker visualization
* (daniel_2k) new: debug logging
* (daniel_2k) changed: set units for states "saturation" and "hue"

### 0.2.0 (2018-05-03)
* (daniel_2k) adjusted types and roles of states according API JSON response data types
* (daniel_2k) compatible with node.js 4.x

### 0.1.0 (2018-04-23)
* (daniel_2k) initial release

## License
The MIT License (MIT)
Copyright (c) 2019 daniel_2k <daniel_2k@outlook.com>
