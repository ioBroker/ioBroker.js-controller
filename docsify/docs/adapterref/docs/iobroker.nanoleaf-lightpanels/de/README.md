![Logo](media/nanoleaf-lightpanels.png)
# ioBroker.nanoleaf-lightpanels Adapter
=================

[![NPM version](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)](https://www.npmjs.com/package/iobroker.nanoleaf-lightpanels)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)](https://www.npmjs.com/package/iobroker.nanoleaf-lightpanels)
[![Build Status Travis](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels.svg?branch=master)](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels)
[![Build status Appveyor](https://ci.appveyor.com/api/projects/status/29fjgn8ww5w96etq/branch/master?svg=true)](https://ci.appveyor.com/project/daniel-2k/iobroker-nanoleaf-lightpanels/branch/master)

[![NPM](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)](https://nodei.co/npm/iobroker.nanoleaf-lightpanels/)

This is an ioBroker Adapter to control the nanoleaf Light Panels (formerly nanoleaf Aurora) through the nanoleaf Light Panels OpenAPI.

## Connection to the nanoleaf Light Panels Controller:
1. In the adapter settings you have to set the IP address and port of the nanoleaf Light Panels Controller. The nanoleaf Light Panels OpenAPI needs an authorization token to grant access to the REST-API. If you have already one, you can enter the token here and skip the next step.
2. If you don't have an authorization token you need to request it from the nanoleaf Light Panels OpenAPI.
   To do this, set the nanoleaf Light Panel Controller into pairing mode by pressing and holding the power button at the device for 5-7 seconds until the LEDs flash alternately.
   Then click on the button 'Obtain authorization token' within 30 seconds (pairing mode stops after 30 seconds). The adapter must be running!
   If it was successfull the authorization token should be seen in the field 'Authentification token'. If an error occured you get a pop up with the error message (details you can see in the log).
3. Save the settings.
4. Have fun!

Because the nanoleaf Light Panels OpenAPI doesn't support long polling or websockets the only way to update the states is polling.
You can set the polling interval in the adapter settings.

## Alexa
You can control the nanoleaf Light Panels with Alexa via ioBroker (Cloud-Adapter).
Power on/off, brightness, color and color temperature is supported.
You have to set up the datapoints
* state (for power on/off)
* hue (for color)
* saturation (for color)
* brightness (for color)
* colorTemp (for color temperature)
in Cloud adapter under the same smartname.

## ioBroker Visualization
The nanoleaf Light Panels can be controlled in ioBroker Visualization by using basic widgets as "Radiobuttons on/off" or sliders for controlling the power sate, the brightness, hue, stuaration and color temperature states.
For effects you can use the "Select ValueList" widget to use it as a drop down list and then map the effectsList state to the value and text property of the widget (type: "{nanoleaf-lightpanels.0.LightPanels.effectsList}" -> the curly braces are important!)
To control and visualize the color you have to install the color picker style Widgets. You can map the RGB ID to the colorRGB state or use the three HSV states as well.
You can use the nanoleaf vis demo project found in the /vis subfolder on github.

## Changelog

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