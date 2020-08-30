![Logo](admin/iqontrol.png)
# ioBroker.iqontrol

![Number of Installations](http://iobroker.live/badges/iqontrol-installed.svg) 
![Stable version](http://iobroker.live/badges/iqontrol-stable.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.iqontrol.svg)](https://www.npmjs.com/package/iobroker.iqontrol)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)](https://www.npmjs.com/package/iobroker.iqontrol)
[![Dependency Status](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)](https://david-dm.org/sbormann/iobroker.iqontrol)
[![Known Vulnerabilities](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)](https://snyk.io/test/github/sbormann/ioBroker.iqontrol)

[![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)](https://nodei.co/npm/iobroker.iqontrol/)

**Tests:**

| Linux/Mac/Windows: | Cross-Browser-Checking: |
| --- | --- |
| [![Travis-CI](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)](https://travis-ci.org/sbormann/ioBroker.iqontrol) | [![Browserstack](img/browserstack.png)](https://www.browserstack.com) |

<!-- Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)](https://ci.appveyor.com/project/sbormann/ioBroker-iqontrol/) -->

\
**If you like it, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LDHZMNPXKRX2N&source=url)


****

## iqontrol adapter for ioBroker

Fast Web-App for Visualization.

![Screenshot](img/screenshot_kueche.png)

\
![Screenshot](img/screenshot_licht.png)

\
![Screenshot](img/screenshot_heizung.png)

\
![Screenshot](img/screenshot_rauchmelder.png)

\
![Screenshot](img/screenshot_flot.png)

Runs in any Browser. 
It's fully customizable and responsive.

> **This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


## Add to Homescreen
You can save it as Web-App on Homescreen and it looks and feels like a native app:
![Add to Homescreeen](img/add_to_homescreen.png)


## You need...
* Nodejs 10 or higher
* Web-Adapter with one instance running the same protocol (http or https) as the admin-adapter, socket.IO set to 'integrated' and 'Force Web-Sockets' disabled
    * If this stands in conflict to other adapters, simply add another instance with the above settings - iQontrol will search the besst fitting web-adapter-instance and use it for communication
	* For connecting over *iobroker.pro-Cloud* both, admin- and web-adapter should be set to http (not https)

* If you experience any problems, please have a look at the [troubleshooting](#troubleshooting) section at the end of this readme


## Forum
Visit [iobroker forum](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol). 


## How to use
**Don't be scared from the many options you have.**
Most things work right out of the box. You *can*, but you don't have to use all the configuration-possibilities iQontrol offers! Just start this way:
* Start creating views.
	You can consider views as something like a page.
* Then create devices on these views.
	Devices have a role, that determines the function of the device, which icons are used and so on.
	Depending on that role you can link several states to the device. These will give the device its functionality.
	If you select 'Link to other view' as role you can create links to other views. I suggest skinning Links to other views with the same Background, the linked view has.
	You can also try to use the Autocreate-Function to choose an existing device from the iobroker-object-tree. Autocreate tries to find out the role and to match as many states as possible.
* Afterwards you can create a toolbar, which is displayed as footer.
	Toolbar-Entrys are links to views.
	The first Toolbar-Entry will be your 'Home-View' with will be loaded at start.
* To give everything a fancy style, you can upload your own images.
	You can use your images as background-images for views, or for devices.
	Images in the folder '/usericons' can be used as icons for devices.
	The free builtin demo-wallpapers are from www.pexels.com.


## URL-Parameters
* The frontend is called via ``http[s]://<url or ip of iobroker>:<port of web adapter>/iqontrol/index.html``
    * ``<port of web adapter>`` is usually 8082
* To open a specified instance you can add ``namespace=iqontrol.<instance-number>`` as URL-parameter
* To open a specified view as homepage you can add ``home=<viewID>`` as URL-parameter
    * ``<viewID>`` needs to be formated like ``iqontrol.<insctance-number>.Views.<view-name>``
	* Note: this is case-sensitive!
* To set or override return after time settings, use the following parameters:
    * ``returnAfterTimeTreshold=<time in seconds>`` to set the time, after wich the destination view is called. Use ``0`` to disable return after time feature.
	* ``returnAfterTimeDestiationView=<viewID>`` to set the view, wich is called after the treshold. If not specified, the home view will be used.
	* These options are helpful, if you call iQontrol from an wall mounted tablet, wich should automatically return to home-view after beeing used 

**Example:**
* ``https://192.168.1.1:8082/iqontrol/index.html?namespace=iqontrol.1&home=iqontrol.1.Views.Living-Room``
    * Note upper and lower case



## Icons and Background-Images
* You can use the inbuilt images or the images uploaded under the images tab or any free url you like
* You can also use a variable inside the image-url. This may be useful for example for weather-forecasts. Use this pattern:
    * ``path/to/firstloaded.png|anotherpath/to/{iobrokerstate|fallback}.png``
    * Example: ``./../iqontrol.meta/userimages/demo/bottle.jpg|./../iqontrol.meta/userimages/demo/{javascript.0.myimage|whitestone}.jpg`` 
	* This loads ``./../iqontrol.meta/userimages/demo/bottle.jpg`` when you open the view
	* As soon as the state of ``javascript.0.myimage`` is fetched from the server, the image will be replaced with ``./../iqontrol.meta/userimages/demo/XXX.jpg`` where ``XXX`` is the value of ``javascript.0.myimage``
	* If ``javascript.0.myimage`` has no value the fallback ``whitestone`` will be used (using the fallback is optional)

### Progress Bars
* It is possible, to use SVG-Definitions in combination with variables instead of imagefiles to display progress-bars
* There are a vew templates integrated to chose from, but you can also create your own SVGs

![Progressbar square](img/progressbar_square.png)
![Progressbar circle](img/progressbar_circle.png)

* See [Wiki](https://github.com/sbormann/ioBroker.iqontrol/wiki/Progress-Bars) for further informations


## Device-Names
* Just like variables in image-urls you can use variables in device-names. The syntax is almost the same:
    * ``Text while loading|Text after loading {iobrokerstate|fallback}``
	* Additionally can put the iobrokerstate into square brackets, then the plain value without its unit will be used: ``Text while loading|Text after loading {[iobrokerstate]|fallback}``
    * Example: ``Weather is loading|Weather: {javascript.0.weather|No weather data found}`` 
	* This shows ``Weather is loading`` when you open the view
	* As soon as the state of ``javascript.0.weather`` is fetched from the server, the text will be replaced by ``Weather: XXX`` where ``XXX`` is the value of ``javascript.0.weather``
	* If ``javascript.0.weather`` has no value the fallback ``No weather data found`` will be used (using the fallback is optional)


## Popup-Messages
* Every instance creates the state ``iqontrol.x.Popup.Message``
* When passing values to these state, a popup-message (or toast) is displayed
* You can use html-tags to format the message text
* There are some additional states for further customization of the displayed popup (these must be set, before the message datapoint is set):
    * ``Duration``: This is the time in ms the message is displayed; if set to 0 the message has to be confirmed
    * ``ClickedValue`` and ``ClickedDestinationState``: If the popup is clicked by user, the value from ``ClickedValue`` will be sent to ``iqontrol.x.Popup.POPUP_CLICKED`` and, if specified, additional to the datapoint in ``ClickedDestinationState`` 
        * If no value is specified, ``true`` will be used
    * ``ButtonNames``: Here you can specify a comma separated list of buttons, that will be displayed at the bottom of the popup (for example "OK,Abort")
        * ``ButtonValues`` and ``ButtonDestinationStates``: These are comma separated lists of values that will be sent to ``iqontrol.x.Popup.BUTTON_CLICKED`` and, if specified, additional to the datapoint in ``ButtonDestinationStates``, if the user clickes the corresponding button
		* If you only use one value (instead of a comma separated list), this value will be used for all buttons
		* If you leave ``ButtonValues`` empty, the name of the button will be used
		* If you only use one destination state (instead of a comma separated list), this state will be used for all buttons
        * ``ButtonCloses``: This is a comma separated list of booleans (``true``/``false``) that specify, if the popup should be closed, when the corresponding button is pressed
* Alternatively you can set these values via sendTo-command with the parameters ``PopupMessage``, ``PopupDuration``, ``PopupClickedValue`` and so on
    * Example: ``sendTo("iqontrol", "send", {PopupMessage: 'This is my message', PopupDuration: 2500, PopupClickedValue: 'messageConfirmed'});``
* You can also use blockly to send messages to iQontrol

![Popup Screenshot](img/popup_screenshot.png)
![Popup Blockly](img/popup_blockly.png)


## Description of roles and associated states
Every device has a role, which defines the function of the device. Every role generates a set of states, which can be linked to a corresponding io-broker state.
If you use the auto-create-function, you can choose an existing device from the io-broker-object tree.  Autocreate tries to find out the role and to match as many states as possible.
This will only work for known devices. For unknown devices, and to give devices advanced features, you can add them manually via the (+)-Button or edit the devices that were created by autocreate.
To edit the role and the states of a device, click on the pencil behind the device. You will find a short description of the roles and the used states below:

### Modifying Datapoint Configuration
You can modify the configuration of datapoints via the wrench-icon behind a datapoint in the device-configuration dialog or in objects-tab of iobroker. Here you can:
* Set Readonly-Flag
* Set Invert-Flag
* Set Confirm-Flag (forces the user to confirm before a change is written to a datapoint)
* Set PIN-Code (forces the user to enter this PIN-Code before a change is written to a datapoint - but take care: this is only of low security, because the pin is checked in frontend! Use a number to display a fullscreen-pin-pad if asked for code)
* Modify unit of datapoint, seperate for zero, singular and plural values
* Modify min and max of datapoint
* Set the steps that a level-slider takes when it is increased/decreased
* Modify type of datapoint
* Modify role of datapoint
* Set a target-value-id, wich is a datapoint id, where target values are written to (if you have different data points for the actual and the target value)
* Set or modify a Value-List
    * Add optinally an option to value list to enter free text
* Set a target-value-list:
    * In addition to the target-value-id, you can define different datapoint-ids and target-values for different keys (keys are possible values of the orgiginal datapoint)
    * You can also use the wildcard ``*`` in the keys and in the target-values
	* Example: 
	    * Key: ``TuneIn-Playlist: *``, Target-Datapoint ID: ``alexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist``, Target-Value: ``*``
	    * If the user enters ``TuneIn-Playlist: Ambient`` the value ``Ambient`` will be written to ``alexa2.0.Echo-Devices.XYZ.Music-Provider.TuneIn-Playlist``

![CustomDialog Call](img/custom_call.png)
![CustomDialog Example](img/custom_dialog.png)
![Concept of Target-Value-List](img/target-value-list_concept.png)
  
### General states:
#### STATE and LEVEL
Almost all roles have a **STATE**- and/or a **LEVEL**-state. In most cases this represents the main function of the device. You can assign io-broker-states of the following types to it:
* *boolean* - if possible, it will be translated to a senseful text like 'on/off', 'opened/closed' or similar. If you click on the icon of a tile it tries to toggle the boolean (for example to turn a light on or off). If it is not read-only it will generate a flip-switch in the dialog
* *number* - will be displayed with its corresponding unit and generate a slider in the dialog
* *string* - a text to be displayed
* *value-list* - the selected value will be displayed. If it is not write-protected it will generate a drop-down-menu in dialog 
    * Technically a *value-list* is a value with a corresponding translation-list, defined in the 'common.custom.iqontrol.<instance>.states', 'native.states' or 'common.states' object of the datapoint:
        ````
        "native": {
            "states": {"true": "Text for true", "false": "Text for false"},
            ...
        }
        ````
    * You can create your own value list by modifying the datapoint (wrench-icon behind the datapoint in the objects-tab of iobroker, see above)
	* If the device-tile will be displayed as active or inactive is also determined from the STATE or LEVEL-Datapoint. However, you can freely customize the behavior in the options section 'Conditions for an Active Tile'. You can even set another external datapoint that determines the state of the tile

However, not every type makes sense to every role. So the STATE of a switch for example will be a boolean in most cases, to be able to be toggled between on and off. A string may be displayed, but the switch will not be functional.

### Further general states:
* **ADDITIONAL_INFO**: *array* - an array of datapoints, that will be displayed at the bottom of the info-dialog
* **URL**: CONSTANT *string* - this url will be opened as iframe inside the dialog
* **HTML**: CONSTANT *string* - this markup will be displayed inside the iframe, if no URL-Datapoint is specified
* **BACKGROUND_URL**: CONSTANT *string* - this url will be shown as background of the device-tile. It is placed above the background-images, but you can configure it to be hidden, if the tile is active or inactive.
* **BACKGROUND_HTML**: CONSTANT *string* - this markup will be displayed as background of the device-tile, if no BACKGROUND_URL is specified
* **BATTERY**: *boolean* - when true or *number* - when less than 10%, a little battery-empty-icon will be displayed
    * You can further customize the behavior of the battery-icon in the options section 'BATTERY Empty Icon'
* **ERROR**: *boolean* - when true, a little exclamation-mark-icon will be displayed
* **UNREACH**: *boolean* - when true, a little wireless-icon will be displayed
    * Behaviour can be inverted in the 'General' section of options (use connected instead of unreach)

### Link to other view:
* Has no further states
* The **linked-view-property** is opened directly

### <img src="img/icons/switch_on.png" width="32"> Switch:
* **STATE**: *boolean* - display and set on/off-state
* **POWER**: *number* - power-consumption that will be displayed in small in the upper right corner

### <img src="img/icons/button.png" width="32"> Button:
* **STATE**: *any* - any desired type of state
* **SET_VALUE**: CONSTANT *string* - this is a constant (not a linked io-broker-state!) that will be assigned to the STATE if the button is pressed
* **OFF_SET_VALUE**: CONSTANT *string* - this is a constant (not a linked io-broker-state!). If defined, STATE will be resetted to this value after the in options defined time or 100ms

### <img src="img/icons/light_on.png" width="32"> Light:
Every light may have one or both of the following states:
* **STATE**: *boolean* - show and set on/off-state
* **LEVEL**: *number* - show and set the level of the light

Optional you can define the following states:
* For coloured LEDs (HSB-color-space):
    * **HUE**: *number* - color of the light from 0-360° (hue format)
    * **SATURATION**: *number* - saturation of the light (from white to pure color)
    * **COLOR_BRIGHTNESS**: *number* - the brightness of the colored LEDs (if you have a LEVEL-State and no white LEDs, this is ignored, because brightness is controled completely by LEVEL)
* For white LEDs:
    * **CT**: *number* - color-temperature of the light, if it has two shades of white
    * **WHITE_BRIGHTNESS**: *number* - the brightness of the white LEDs (if you have a LEVEL-State and no coloured LEDs, this is ignored, because brightness is controled completely by LEVEL)
* Alternative color-spaces:
    * **ALTERNATIVE_COLORSPACE_VALUE**: *string* or *number* (depending on the chosed colorspace) - the value of the alternative colorspace
    If your device does not support using HUE, SATURATION and COLOR_BRIGHTNESS (HSB/HSV-color-space) you can use a variety of alternative colorspaces. In the device-options you can chose one of the following colorspaces:	
        * **RGB** / **#RGB**: instead of using HUE, SATURATION and COLOR_BRIGHTNESS you can use the RGB-Format (hex), optional with leading '#'
        * **RGBW** / **#RGBW**: instead of using HUE, SATURATION, COLOR_BRIGHTNESS and WHITE_BRIGHTNESS you can use the RGBW-Format (hex), optional with leading '#'
        * **RGBWWCW** / **#RGBWWCW** / **RGBCWWW** / **#RGBCWWW**: instead of HUE, SATURATION, COLOR_BRIGHTNESS, CT and WHITE_BRIGHTNESS you can use the RGBWWCW- or RGBCWWW-Format (hex, WW = warm white, CW = cold white), optional with leading '#'
        * **RGB (Hue only)** / **#RGB (Hue only)**: instead of using HUE you can use the RGB (Hue only)-Format (hex), optional with leading '#'. In this special case the RGB-Format will only accept pure saturated colors of the hue-color-circle. Mixed white is not allowed
        * **Hue for Milight**: This is the Hue-Value for Milight-Devices, with use another starting-point in the hue color-cirlce: 
            ````
    		MilightHue = modulo(66 - (hue / 3.60), 100) * 2.55; 
    		hue = modulo(-3.60 * (MilightHue/2.55 - 66), 360);
    		function modulo(n, m){ return ((n % m) + m) %m; }
            ````
	Keep in Mind: Conversion to alternative colorspace is done by frontend, so it is only active, if iQontrol is opened somewhere. Therefore you can't use it as a converter for colorspaces. To avoid conversation-loops it is recommendet to either use the original colorspace-datapoints (HUE, SATURATION, COLOR_BRIGHTNESS, CT, WHITE_BRIGHTNESS) *or* the alternative colorspace-datapoint to *replace* these datapoints. 
* Effect-Mode:
    * **EFFECT**: *value-list* - the effect to play
	* **EFFECT_NEXT**: *boolean* - if set to true, the next effect will play (as an alternative for devices that dont support EFFECT-value list)
	* **EFFECT_SPEED_UP** / **EFFECT_SPEED_DOWN**: *boolean* - if set to true, the effect will speed up/down
* Miscellaneous:
    * **POWER**: *number* - power-consumption that will be displayed in small in the upper right corner

### <img src="img/icons/fan_on.png" width="32"> Fan:
* **STATE**: *boolean* - display and set on/off-state
* **LEVEL**: *number* or *value-list* - the fan-speed
* **POWER**: *number* - power-consumption that will be displayed in small in the upper right corner

### <img src="img/icons/radiator.png" width="32"> Thermostat:
* **SET_TEMPERATURE**: *number* - goal-temperature
* **TEMPERATURE**: *number* - actual temperature to be displayed in small in the upper right corner
* **HUMIDITY**: *number* - actual humidity to be displayed in small in the upper right corner
* **CONTROL_MODE**: *value-list* - display and set the mode of the thermostat
* **WINDOW_OPENING_REPORTING**: *boolean* - if true, a little opened window is displayed
* **VALVE_STATES**: array of names and numbers - displays the opening of the valves that are associated with the thermostat

### <img src="img/icons/radiator.png" width="32"> Homematic-Thermostat:
In addition to normal thermostat you can define:
* **PARTY_TEMPERATURE**: *string* - special-formatted string to define the party- or holiday-mode of homematic-thermostats
* **BOOST_STATE**: *number* - displays the remaining boost-time of homematic-thermostats

### <img src="img/icons/temperature.png" width="32"> Temperature-Sensor, <img src="img/icons/humidity.png" width="32"> Humidity-Sensor:
* **STATE**: *number* - temperature or humidity that will be displayed in the lower part of the device
* **TEMPERATURE**: *number* - temperature that will be displayed in small in the upper right corner
* **HUMIDITY**: *number* - humidity that will be displayed in small in the upper right corner
* The **linked-view-property** is opened directly

### <img src="img/icons/brightness_light.png" width="32"> Brightness-Sensor:
* **STATE**: *number* - brightness that will be displayed in the lower part of the device
* **BRIGHTNESS**: *number* - brightness that will be displayed in small in the upper right corner
* The **linked-view-property** is opened directly

### <img src="img/icons/motion_on.png" width="32"> Motion-Sensor:
* **STATE**: *boolean* - display if motion is detected or not
* The **linked-view-property** is opened directly

### <img src="img/icons/door_closed.png" width="32"> Door, <img src="img/icons/window_closed.png" width="32"> Window:
* **STATE**: *boolean* - display if the door or window is opened or closed
    * Alternatively you can assign a *value-list*, to display additional states like 'tilted' (in options of windows you can define wich text stands for opened, closed an tilted to display the correct icon)
    * You can also assign a *string* to display any text like "3 windows open" or "all closed" or a *number*
* The **linked-view-property** is opened directly

### <img src="img/icons/garagedoor_closed.png" width="32"> Garage Door:
* **STATE**: *boolean* - display if the door is opened or closed
    * Alternatively you can assign a *value-list*, to display additional states like 'tilted'
    * You can also assign a *string* to display any text like "3 doors open" or "all closed"
* **TOGGLE**: *boolean* - displays a 'Toggle'-Button and is set to true, if pressed

### <img src="img/icons/door_locked.png" width="32"> Door with lock:
* **STATE**: *boolean* - display if the door is opened or closed (door/window-contact)
* **LOCK_STATE**: *boolean* - display and control if the door is locked or unlocked (control is disabled, if STATE is true - because you can't lock a door, that is opened)
* **LOCK_STATE_UNCERTAIN**: *boolean* - if true, the STATE will be displayed in italic-font to represent that the exact position of the lock is unknown
* **LOCK_OPEN**: *boolean* - if set to true, the door will open completely

### <img src="img/icons/blind_middle.png" width="32"> Blind:
* **LEVEL**: *number* - height of the blind in percentage
* **DIRECTION**: *value-list* - can be Stop, Up and Down. The values that represent Stop, Up, Down and Unknown can be configured
* **STOP**: *boolean* - is set to true, if the stop button is pressed
* **UP** / **DOWN**: *boolean* - is set to true, if the up / down button is pressed (for devices, that use UP and DOWN datapoints instead of or in addition to LEVEL). Additional you can define a value via the **UP_SET_VALUE** / **DOWN_SET_VALUE** Datapoints. If defined, this value will be sent instead of true, when the Up / Down button is pressed
* **FAVORITE_POSITION**: *boolean* - can be used to recall a favorite position. If the Favorite button (button caption can be configured in the device settings) is pressed, true will be sent to this datapoint. Additional you can define a value via the **FAVORITE_POSITION_SET_VALUE** Datapoint. If defined, this value will be sent instead of true, when the favorite button is pressed 
* **SLATS_LEVEL**: *number* - position of slats in percentage

### <img src="img/icons/fire_on.png" width="32"> Fire-Sensor:
* **STATE**: *boolean* - if true the sensor will be displayed as triggered
    * Alternatively you can assign a *value-list*, to display additional states like 'tampered'
    * You can also assign a *string* to display any text like "fire in upper floor"
* The **linked-view-property** is opened directly

### <img src="img/icons/flood_on.png" width="32"> Flood-Sensor:
* **STATE**: *boolean* - if true the sensor will be displayed as triggered
    * Alternatively you can assign a *value-list*, to display additional states like 'tampered'
    * You can also assign a *string* to display any text like "flood in upper floor"
* The **linked-view-property** is opened directly

### <img src="img/icons/alarm_on.png" width="32"> Alarm:
* **STATE**: *boolean* - if true the sensor will be displayed as triggered
    * Alternatively you can assign a *value-list*, to display additional states like 'tampered'
    * You can also assign a *string* to display any text like "fire in upper floor"
* **CONTROL_MODE**: *value-list* - select operation mode like "Armed" and "Disarmed"
    * In device options you can define the value that represents disarmed, so the representing icon can be shown

### <img src="img/icons/battery_full.png" width="32"> Battery:
* **STATE**: *number* - battery level in percentage
* **CHARGING**: *boolean* - if true, a charging-icon is displayed
* **POWER**: *number* - power-consumption that will be displayed in small in the upper right corner
* **VOLTAGE**: *number* - voltage that will be displayed in small in the upper right corner

### <img src="img/icons/value_on.png" width="32"> Value:
* **STATE**: *any* - any valid state to be displayed (have a look at general states-section)
* **LEVEL**: *number* - will produce a slider in dialog

### <img src="img/icons/play_on.png" width="32"> Program:
* **STATE**: *boolean* - if set to true, the program will be started

### <img src="img/icons/play.png" width="32"> Scene:
* **STATE**: *boolean* - displays, if the scene is active. Depending on the configuration of the scene (virtual group, set values for false enabled or disabled), the toggle-command will send true, false, min, 0, max or 100. There is an option to always send true (disable toggleing).

### <img src="img/icons/media_on.png" width="32"> Media-Player / Remote Control:
* **STATE**: *string* - "play", "pause" or "stop" or *boolean* - true for play, false for stop
    * In device options you can define the value that represents play, pause and stop
* **COVER_URL**: *string* - url to cover-image
* **ARTIST, ALBUM, TITLE**: *string* - self explaining
* **TRACK_NUMBER**: *number* - self explaining
* **PREV, REWIND, PLAY, PAUSE, STOP, FORWARD, NEXT**: *boolean* - will be set to true, if the corresponding button is pressed
* **SHUFFLE, MUTE, PLAY_EVERYWHERE, EJECT, POWER_SWITCH**: *boolean* - state for corresponding function
* **REPEAT**: *boolean* - state for repeat function or *string* - 3 states can be definded via the coressponding options: value for off, repeat-all and repeat-one
* **DURATION, ELAPSED**: *number* - duration and elapsed time of actual title - used to show a seek-bar
* **VOLUME**: *number* - for volume-slider
* **SOURCE, PLAYLIST**: *value-list* - show select-menu to chose a source or a title from playlist

##### To display a *universal remote control* you can define the following states:
* **REMOTE_NUMBER**: *string* - shows a num-pad an returnes the corresponding number, if a number is clicked
* **REMOTE_VOLUME_UP, REMOTE_VOLUME_UP, REMOTE_CH_UP, REMOTE_CH_DOWN**: *string* - shows buttons vor volume up/down and channel up/down and returns 'volumeUp', 'volumeDown', 'chUp' or 'chDown', if the corresponding button is pressed
* **REMOTE_PAD_DIRECTION, REMOTE_PAD_BACK, REMOTE_PAD_HOME, REMOTE_PAD_MENU**: *string* - shows a trackpad for navigation and returns 
    * 'ok' if the middle of the pad is clicked, 
	* 'left', 'right', 'up' or 'down', if the edges of the pad are clicked or the pad is swiped in the corresponding direction or
	* 'back', 'home' or 'menu*, if the corresponding buttons are clicked
	* Keep in mind: You can use the Target-Value-List (accessible via the wrench-icon of each datapoint) to link from one datapoint to multiple datapoints, depending on the returned value (see Modifying Datapoints section above)
* **REMOTE_COLOR**: *string* - shows colored buttons an returnes the corresponding color ('red', 'green', 'yellow' or 'blue'), if a color is clicked
* **REMOTE_ADDITIONAL_BUTTONS**: *array* - an array of buttons. The name of the button is sent to the corresponding state-id, if the button is clicked
* **REMOTE_HIDE_REMOTE**: *booelan* - if true, the complete remote control section will be hidden (for example to show it only, if a valid source is selected)

### <img src="img/icons/popup.png" width="32"> Popup:
* **STATE**: *any* - can be used to display further information

### <img src="img/icons/link.png" width="32"> External Link:
* **STATE**: *any* - can be used to display further informations
* **URL**: CONSTANT *string* - this url will be opened


****

## Troubleshooting
* Make shure you fulfilled the 'You need...' section at top of this page
* If something doesn't work like expected after update please try the following steps:
    * Start upload of adapter:
    \
        ![Upload](img/adapter_upload.png)
	* Clear browser cache
	* Restart ioBroker

### If you have further problems, please provide the log from the debugging-console of your browser and screenshots of the faulty line:
* Start iQonrol with opened debugging-console of your browser (mostly you need to press <kbd>F12</kbd> to open it) 
* Switch to the console-window and reproduce the bug
* Look for messages in the console-window
* When errors appear, the number of the line, wich caused the error, is listed
* Please click on this line-number and make a screenshot of the faulty line:

![Troubleshooting console window](img/troubleshooting_consolewindow.png)
![Troubleshooting faulty line](img/troubleshooting_faultyline.png)


****

## Changelog

### 1.2.0 (2020-28-29)
* (sbormann) Introducing different tile sizes, they can be configured in options for active and inactive state.
* (sbormann) Added BACKGROUND_URL and BACKGROUND_HTML as universal states to all devices, to display webpages as background of tiles (for FLOT, weather, security-cameras,...).
* (sbormann) Again better animations for shuffle.js.
* (sbormann) Reordered remote control sections.

### 1.1.15 (2020-08-27)
* (sbormann) Bugfixed shuffle.js (better animations, fixed hideIfInactive-Option).

### 1.1.14 (2020-08-24)
* (sbormann) Made HTML/URL-iFrame resizable (can be turned off by option).
* (sbormann) Bugfixing remote control.
* (sbormann) Added option to configure conditions for active battery-empty-icon.
* (sbormann) Dialog is now repositioned and bigger when phone is rotated to horizontal view.
* (sbormann) Breaking Change: Using now shuffle.js to reposition the tiles after resizig or orientation change. For now its only a nice effect, but this opens possibilities for future development with different tile-sizes.

### 1.1.13 (2020-08-23)
* (sbormann) Added option to remote to show vol and ch +/- inside pad.
* (sbormann) Fixed calculation of blind level.
* (sbormann) Fixed opening of external links.

### 1.1.12 (2020-08-21)
* (sbormann) Prevented selection of elements on long click for actual iOS version.
* (sbormann) Bugfixed tile active conditions for media.
* (sbormann) Renamed Media-Player to Media-Player / Remote-Control.
* (bluefox) The compatibility to socket.io 3.0.13 provided
* (sbormann) Prevented accidentally sorting of tables when clicking buttons.

### 1.1.11 (2020-08-21)
* (sbormann) Added option to define explicit conditions for a tile to be active.
* (sbormann) Added wrench icon to edit array dialog.

### 1.1.10 (2020-08-20)
* (sbormann) Added universal remote control including a track-pad to media-device.
* (sbormann) Device-Options are now sorted in categories.
* (sbormann) Collapsibles like additional informations are animated now.
* (sbormann) Added option for the device button to change the caption of the button in the dialog.
* (sbormann) Added option to open URL in new window instead of box inside dialog.
* (sbormann) Made toggeling of a state more fault tolerant if the type is not set correctly (iQontrol presumes now, it is a switch).

### 1.1.9 (2020-08-14)
* (sbormann) Enhanced popup with the ability to add buttons and confirmation messages.
* (sbormann) Fixed crash on some toolbar specifications.

### 1.1.8 (2020-08-02)
* (sbormann) Enhanced rendering of colour-lights with alternative colorspace.
* (sbormann) Added rounded corners to iframe.
* (sbormann) Added sans-serif as standard font-family to iframe (may overwrite your settings - you can overwrite this by marking your own font-family css with '!important').
* (sbormann) Added sentry plugin.

### 1.1.7 (2020-07-28)
* (sbormann) Improved long press and forced touch handling.
* (sbormann) Added URL-Parameters returnAfterTimeDestiationView and returnAfterTimeTreshold.

### 1.1.6 (2020-07-24)
* (sbormann) Added some roles to recognize water and fire sensors more reliable.
* (sbormann) Added a block to blockly to send popup messages to iQontrol.
* (sbormann) Set option "Always use time instead of pressure" as standard - if you want to use ForcedTouch, disable this option.
* (sbormann) Updated some dependencies.

### 1.1.5 (2020-07-05)
* (sbormann) Made dialog movable by dragging title.
* (sbormann) Added LEVEL to fan.
* (sbormann) Fixed flickering of SVG-Background change on some devices.

### 1.1.4 (2020-07-03)
* (sbormann) Changed the way popup-iframes are created to allow execution of code inside them.
* (sbormann) Added the possibility to chose progressbars as icons and background-images for devices.
* (sbormann) Added progress-circle of remaining display-time to popup.

### 1.1.3 (2020-06-28)
* (sbormann) Added popup messagen (toast-messagen).
* (sbormann) Enhanced scenes to be able to toggle (added option to always send true, if you need the old behaviour).

### 1.1.2 (2020-06-21)
* (sbormann) Compatibility enhancements for repeat function of Media-Player.
* (sbormann) Made value-list and target-value-list sortable.
* (sbormann) Made sortable lists only draggable in y-axis.
* (sbormann) Added option to enter own value for value-lists.
* (sbormann) Added PLAY_EVERYWHERE to Media-Player.

### 1.1.1 (2020-06-16)
* (sbormann) Some fixes, styling and enhancements for Media-Player.
* (sbormann) Added option to hide play, pause and stop icon for Media-Player.
* (sbormann) Added function repeat one to Media-Player.
* (sbormann) Maquee is only restarting, if the value of a state has really changed.
* (sbormann) Fixed crash when some ids of linked views were missing.
* (sbormann) Added targetValues to custom configuration, wich allows to send changes of a state to different target-datapoints.

### 1.1.0 (2020-06-13)
* (sbormann) Added Media-Player.

### 1.0.1 (2020-06-10)
* (sbormann) Fixed month for timestamps.
* (sbormann) You can now chose if values are linked states or constants.
* (sbormann) Added the ability to use variables in device-names.

### 1.0.0 (2020-06-01)
* (sbormann) Added a few captions to admin.
* (sbormann) Prevent pressure menu when scrolling and after opening menu.
* (sbormann) Corrected a few translations.

<details>
<summary>Older Changelog:</summary>

### 0.4.1 (2020-05-15)
* (sbormann) Added icons for toplight and tilted to window and enhanced window to recognize tilted position.
* (sbormann) Fixed crash when using some thermostats.
* (sbormann) New gulpfile and fixed translations.
* (sbormann) Further improvement of connection speed.
* (sbormann) Disabled context-menu on long/right-click.
* (sbormann) Revised pressure/forced touch and added option to always use time instead of pressure.

### 0.4.0 (2020-05-13)
* (sbormann) Major change using socket.io without conn.js wich leads to a much faster initial connection.
* (sbormann) Improved loading and scrolling for popups.

### 0.3.7 (2020-05-06)
* (sbormann) Added more options to timestamp.

### 0.3.6 (2020-05-05)
* (sbormann) Added failback to variables
* (sbormann) Added option to add timestamp to state

### 0.3.5 (2020-04-26)
* (sbormann) Added variables to icons and backgroundimages (see readme)
* (sbormann) It is now possible to remove toolbar (the first view is then the home view)

### 0.3.3 (2020-04-19)
* (sbormann) Fixed device readonly for toggle state.
* (Sebastian Boramnn) Fixed devices with same name.
* (sbormann) Removed some old code from version <0.3.0.

### 0.3.2 (2020-04-19)
* (sbormann) Fixed loading toolbar with no entries on linked view.
* (sbormann) Fixed views with quotes in name.
* (sbormann) Fixed Flood-Sensor.

### 0.3.1 (2020-04-16)
* (sbormann) Breaking change: The complete configuration is no longer stored in ioBroker channels and states, but is fetched as one complete object, thus saving the configuration is much much faster than before.
* (sbormann) Views, devices and toolbar entries are now sortable via drag- and drop in the configuration dialog.
* (sbormann) After saving the configuration the instance ist now yellow until the configuration is completely written.
* (sbormann) Added invert UNREACH to device options.
* (sbormann) Added Flood-Sensor.
* (sbormann) Enhanced autocreation-feature by using ioBroker-Type-Detector by bluefox.
* (sbormann) Enhanced hue-lights when using alternative colorspace without white-values and changing ct.
* (sbormann) Enhanced hue-lights when using alternative colorspace to keep uppercase if needed.

### 0.2.20 (2020-04-08)
* (sbormann) If value for POWER is greater than 100, it is rounded without decimal places.
* (sbormann) Bugfixed invert-function with custom min and max.
* (sbormann) Added reload-link to loading page.
* (sbormann) Updated dependencies.

### 0.2.19 (2020-02-29)
* (sbormann) Updated dependencies.

### 0.2.18 (2020-02-29)
* (sbormann) Updated dependencies.

### 0.2.17 (2020-02-29)
* (sbormann) Added option to open dialog by clicking on tile for View, Window, Door, Fire, Temperatur, Humidity, Brightness and Motion.
* (sbormann) Added option to hide device, if it is inactive (handle with care, as you may not be able to switch it on again).

### 0.2.16 (2020-01-14)
* (sbormann) Fixed custom step for heating control.
* (sbormann) Fixed universal popup wich was displayed, even when empty.

### 0.2.15 (2020-01-07)
* (sbormann) Added svg as possible image to upload.
* (sbormann) Made URL and HTML universal for nearly all devices, to display custom html code or content of an url inside the dialog (this could be used e.g. to display FLOT-graphs related to the device inside the dialog).
* (sbormann) Fixed disabled custom values with admin 3.7.6+ and js-controller <2.2.

### 0.2.14 (2019-11-12)
* (sbormann) Fixed icon-switching for thermostats.

### 0.2.13 (2019-10-23)
* (sbormann) Improved the return after time method.
* (Bluefox) Fixed translations in custom-dialog.

### 0.2.12 (2019-10-12)
* (sbormann) Improvement of homematic-thermostat for controler 2.0 compatiility.

### 0.2.11 (2019-10-07)
* (sbormann) Rewritten pincode-section to work with older browsers.
* (sbormann) Pincode now works for buttons as well.
* (sbormann) Modified the return after time function to work with older browsers.
* (sbormann) Fixed missing entrys in long pressure menus in iOS 13.

### 0.2.10 (2019-10-05)
* (Sebatian Bormann) Enhanced PIN-Code to view a num-pad when using an alphanumeric PIN.

### 0.2.9 (2019-10-02)
* (sbormann) Added optional PIN-Code to custom datapoint-configuration dialog (wrench icon).
* (sbormann) Added option to return to a view after a settable time of inactivity to settings.

### 0.2.8 (2019-09-27)
* (sbormann) Further improvement of index.js for controller 2.0 compatibility.

### 0.2.7 (2019-09-27)
* (sbormann) Fixed popup_width and popup_height.
* (sbormann) Further improvement of main.js and index.js for controller 2.0 compatibility.
* (sbormann) Added option showState for Button and Program.

### 0.2.6 (2019-09-24)
* (sbormann) Processing the plain text of values is now done after rounding a number value.
* (sbormann) Removed Icon_on for Button.
* (sbormann) Modified main.js for controler 2.0 compatibility.

### 0.2.5 (2019-09-22)
* (sbormann) Adjusted handling of pressure menu for iOS 13.
* (sbormann) Added Buffer for rendering a view while pressureMenue is beeing created.
* (sbormann) Added POWER and VOLTAGE to battery.

### 0.2.4 (2019-09-15)
* (sbormann) Further enhancement of control-mode handling for homematic-thermostat.
* (sbormann) Minor bugfixes.

### 0.2.3 (2019-09-15)
* (sbormann) Further enhancement of control-mode handling for homematic-thermostat.
* (sbormann) Added handling of alternative states-property-syntax.

### 0.2.2 (2019-09-14)
* (sbormann) Enhanced handling of control-mode for homematic-thermostat for more compatibility.
* (sbormann) Reduced rate of sending when moving slider for blinds and thermostats. 

### 0.2.1 (2019-09-07)
* (sbormann) Fixed crash of Backend (interchanged index_m.html and custom_m.html).

### 0.2.0 (2019-09-06)
* (sbormann) Added slats level to blind.

### 0.1.15 (2019-09-05)
* (sbormann) Added step to custom dialog, wich allowes to define the resolution of value-sliders.
* (sbormann) Values with unit % and a range from min to max of 0-1 are now scaled to 0-100.
* (sbormann) Fixed conversion to alternative colorspace for hue lights.

### 0.1.14 (2019-09-01)
* (sbormann) Fixed missing dropdown-menus for images after sorting or adding items to tables.
* (sbormann) Level-Sliders will have a higher resolution for datapoints with small value ranges.

### 0.1.13 (2019-08-28)
* (sbormann) Fixed crash of frontend.
* (sbormann) Security updates.

### 0.1.12 (2019-08-28)
* (sbormann) Added width and height to options for popup.
* (sbormann) Added option to define free CSS-code to modify frontend.
* (sbormann) Infotext-values are now displayed as plain text or rounded if numbers.
* (sbormann) Added 'Close dialog after execution' to device options for scenes, programs and buttons.

### 0.1.11 (2019-08-26)
* (sbormann) Bugfix for chrome opacity transition bug.
* (sbormann) Added placeholder for default values for text inputs on options page.
* (sbormann) Added placeholder for default icon and blank icon to device options.
* (sbormann) Extended thermostat CONTROL_MODE by type switch.
* (sbormann) Fixed crash when using thermostat with setpoint an non homematic-devices.
* (sbormann) Added min and max to custom dialog.
* (sbormann) Now you can set none as a devices background image for active devices (formerly this was copied from inactive devices for backward-compatibility-reasons).
 
### 0.1.10 (2019-08-20)
* (sbormann) You can now define different units if value is zero or if value is one in custom dialog.
* (sbormann) When changing an image via the new drop-down, save button will be activated now.
* (Sebastian Boramnn) Added option, to remove overlay of tile, if device is active or inactive.
* (sbormann) Enhanced conversion function when converting booelan to number.
* (sbormann) Fixed renaming of image files (links to used images are now also correctly renamed).
* (sbormann) Fixed handling of spaces in image filenames.

### 0.1.9 (2019-08-18)
* (sbormann) Modified cache manifest to remove EISDIR-errors from log.
* (sbormann) Fixed toggle-entry in pressure menu.
* (sbormann) Added multiple file upload to images tab.
* (sbormann) Added check for dead links to other views when saving settings.
* (sbormann) You can now assign external urls to background images and icons (for example to add a weather-live-map).
* (sbormann) Removed options clickOnIconOpensDialog and clickOnTileToggles for Values and Programs as they are not switchable.
* (sbormann) Added OFF_SET_VALUE and the option 'Return to OFF_SET_VALUE after [ms]' to button.

### 0.1.8 (2019-08-11)
* (sbormann) Further improvements on connecting over iobroker.pro.
* (sbormann) COLOR_BRIGHTNESS and WHITE_BRIGHTNESS are now displayed, if LEVEL is not defined on hue lights.
* (sbormann) Added thumbnail-previews of fonts.
* (sbormann) Added clickOnIconOpensDialog and clickOnTileToggles to device options.

### 0.1.7 (2019-08-11)
* (sbormann) Added font-family, -size, -weight and -style to options for toolbar, headers, device-name, device-state and device-info-text.
* (sbormann) Added icon-size, icon-background-size and icon-background-corner-size to options for toolbar.

### 0.1.6 (2019-08-08)
* (sbormann) Next try to connect via iobroker.pro

### 0.1.5 (2019-08-06)
* (sbormann) Added validation to options.
* (sbormann) Extended alarm with CONTROL_MODE-datapoint and icons for disarmed, armed and triggered. 
* (sbormann) To save memory, only used states are saved in local memory (before all used AND all updated states were saved).
* (sbormann) Optimized socket-connectionLink to try to connect via iobroker.pro.

### 0.1.4 (2019-08-04)
* (sbormann) Optimized fading of tiles.
* (sbormann) Added toggle-button to blind, if no up/down button is defined.
* (sbormann) Added detection of protocol for socket in admin.
* (sbormann) Added confirm-flag inside custom datapoint configuration dialog to enable asking user to confirm before changing values.
* (sbormann) Added toggle-button to garage door.

### 0.1.3 (2019-08-01)
* (sbormann) Added seperate background image for active devices.
* (sbormann) Fixed background-options (color and opacity) for active and inactive device tiles.
* (sbormann) Added more space to views bottom.
* (sbormann) Fixed invert level for blinds.
* (sbormann) Organized options in collapsible layout.

### 0.1.2 (2019-07-29)
* (sbormann) Added FAVORITE_POSITION (with configurable button caption) and SET_VALUE for UP, DOWN and FAVORITE_POSITION to Blinds.
* (sbormann) Added 'No Icon' as option to icon configuration.
* (sbormann) Addes icon to 'Link to other view'.
* (sbormann) Added a bunch of new standard-icons.

### 0.1.1 (2019-07-28)
* (sbormann) Added usericons.

### 0.1.0 **stable** (2019-07-27)
* (sbormann) First stable release.
* (sbormann) Added show timestamp to device options to chose default behaviour and a small timestamp-icon in the dialog to show and hide timestamps.
* (sbormann) Fixed readonly handling of control mode for Homematic Thermostats.

### 0.0.49 (2019-07-27)
* (sbormann) Added common type and common role to custom dialog.
* (sbormann) Added pressure menu for toolbar.

### 0.0.48 (2019-07-25)
* (sbormann) Datapoint BATTERY can now be a level - the battery-empty-icon will be shown if value is less than 10%.
* (sbormann) Added additional colorspaces for hue lights (RGB, RGBW, RGBWWCW, RGBCWWW, Milight-Hue, RGB Hue Only).
* (sbormann) Added Garage Door.

### 0.0.47 (2019-07-22)
* (sbormann) Added targetValueId inside custom datapoint configuration dialog wich allowes to have different datapoints vor actual value and for target value.
* (sbormann) Added invert-flag inside custom datapoint configuration dialog.

### 0.0.46 (2019-07-20)
* (sbormann) Added options to device configuration dialog.
* (sbormann) Added readonly-flag to device options.
* (sbormann) Added invert color temperature flag to device options for lights.
* (sbormann) Added invert flag to device options for blinds.

### 0.0.45 (2019-07-15)
* (sbormann) Devices are now zoomed to fit screen (configurable under options).

### 0.0.44
* (sbormann) Fixed incomplete loading of admin page with some settings.
* (sbormann) Added datapoint-configuration via custom-dialog.

### 0.0.43
* (sbormann) Changed initialization of socket.io to an asynchronous process to wait for connection before trying to use file-operations.
* (sbormann) Added general datapoint ADDITIONAL_INFO to display additional datapoints at the bottom of the info-dialog.
* (sbormann) Fixed value list type conflict.

### 0.0.42
* (sbormann) Adjusted pathes of demo-files.

### 0.0.41
* (sbormann) Major Change: The location of the uploaded userimages has changed, so the images can be accessed by backup-function of iobroker - the images will be moved to the new location automatically - please open admin-page for ALL instances and save the settings to adjust the filenames of used images automatically.
* (sbormann) Inverted colortemperature-scale for hue-lights (now it uses the mired-scale = micro reciprocal degree-scale instead of kelvin).
* (Ansgar Schulte) Added Up and Down Buttons to Blinds.
* (sbormann) When creating a directory it will be entered.
* (sbormann) Added Effect-Section to Light
* (sbormann) If a state is not set yet, a standard value will be used

### 0.0.40
* (sbormann) Appended missing conn.js in admin-folder.

### 0.0.39
* (sbormann) Now file-operations in admin should work (file and directory renaming and deleting).
* (sbormann) Added Image-Popup in admin.
* (sbormann) Renamed demo-images.

### 0.0.38
* (sbormann) Again changes to forced touch for gained compatibility.

### 0.0.37
* (sbormann) Some more little changes to forced touch.
* (sbormann) Added option to open a view via url by adding 'home=<viewId>' to url-parameters.

### 0.0.36
* (sbormann) Added compatibility for some android devices to forced touch.
* (sbormann) Changed the way hue and ct is displayed for better compatibility to some devices.

### 0.0.35
* (sbormann) Fixed crash of frontend, if a device has no role and added info to admin to chose a role.
* (sbormann) Removed filtering of states in select-id-dialog for autocreate.
* (sbormann) Further improvments of forced touch with force-indicator and hopefully a better compatibility with more devices.

### 0.0.34
* (sbormann) Added forced touch menu (press hard or press long on unsupported devices), wich will give more room for extended features in future.
* (sbormann) Linked Views can now be set for all roles and are available in the dialog and by a forced touch.
* (sbormann) Added timestamp for Window, Door, Fire, Temperature, Humidity, Brightness and Motion.
* (sbormann) Fixed issure 49 (state for role switch if type is number).

### 0.0.33
* (sbormann) Added WINDOW_OPENING_REPORTING to thermostat and homematic-thermostat.
* (sbormann) Fixed marquee not always starting correctly.

### 0.0.32
* (sbormann) Added Battery.
* (sbormann) Heaters are displayed as inactive, if set-value is at its minimum.
* (sbormann) Added meta.user object to allow backup of user uploaded files via iobroker backup.
* (sbormann) Added check for existance of common.role before rendering view.

### 0.0.31
* (sbormann) Fixed some typos.
* (sbormann) Enhanced colour-mixing of light with seperate brightness-datapoints for color and white.
* (sbormann) Rewritten rendering of view as praparation for further enhancements.
* (sbormann) Rewritten rendering of dialog as praparation for further enhancements.
* (sbormann) Added option to colorize Device-Texts.

### 0.0.30
* (sbormann) Fixed io-package.json

### 0.0.29
* (sbormann) changed parts of the code to be backward-compatible to older browsers like ie 11.
* (sbormann) Now its possible to define a value list for a data point under .native.states wich will have a greater priority than a value list under .common.states. 
* (sbormann) Updated dependency for axios to 0.0.19 to fix a scurity issue.

### 0.0.28
* (sbormann) Added datapoint POWER to switch, fan and light.
* (sbormann) Fixed marquee for small info texts in the upper right corner at big screen sizes.
* (sbormann) Added more options for configuring header-colors and device-colors (experimental state). Text-color ist not configurable yet.

### 0.0.27
* (sbormann) Added marquee (scrolling text) for long states and device names (can be configured  in options). 
* (sbormann) Added more toolbar-options. 
* (sbormann) Enhanced handling of value lists. 
* (sbormann) Disabled swiping when dialog is opened.

### 0.0.26
* (sbormann) Added brightness to motion-sensor.
* (sbormann) Added options tab. You can now configure colors of toolbar.
* (sbormann) Fixed rendering of constants.
* (sbormann) Resized the demo-wallpapers for faster loading.

### 0.0.25
* (sbormann) Added motion-sensor.
* (sbormann) Added description, how the frontend works: [Operating Principle of Frontend](Operating%20Principle%20of%20Frontend.md).
* (sbormann) Added dialog for editing constants like SET_VALUE, URL or HTML.
* (sbormann) Changed the way arrays are stored.
* (sbormann) Added submit-button for values of type string.
* (sbormann) Added saturation to hue-lights.
* (sbormann) Better icons for color-temperature and brightness-sensor.

### 0.0.24
* (sbormann) Fixed jittering on Safari while scrolling (was related to Pull2Refresh).
* (sbormann) System language of iobroker will be loaded and used.

### 0.0.23
* (sbormann) Rewrote how constant values (instead of linkedStates) are handeled - this is a requirement for further development.
* (sbormann) Fixed Pull2Refresh on android devices / chrome.
* (sbormann) Added external links
* (sbormann) Added popups with iframes

### 0.0.22
* (watcherkb) Improved german translation.
* (BramTown) Improved german translation.
* (sbormann) Short after another coming reconnect-events (<5s) are ignored now.

### 0.0.21
* (sbormann) Added Pull2Refresh on mobile devices - reloads whole page when pulling down on homepage, otherwise only the acual view is reloaded.
* (sbormann) Improved reloading on reconnect (hoepefully to get it finally good working on iOS 12.2).

### 0.0.20
* (sbormann) New trial to get it working in iOS 12.2.

### 0.0.19
* (sbormann) Improved reloading of page in new PWA-Mode of iOS 12.2.

### 0.0.18
* (sbormann) Improved fetching of VALVE_STATES.
* (sbormann) Changed Button Icon.
* (sbormann) Added Loading-Spinner if disconnected.
* (sbormann) Due to new iOS 12.2 PWA-Mode added visibility-check and connectivity-check.
* (sbormann) Added role-icons to role-selectbox in edit device dialog.
* (sbormann) Fixed missing value-list for states of the type string.

### 0.0.17
* (sbormann) Changed description of slider (level/dimmer/value/height).

### 0.0.16
* (sbormann) Role of device is displayed in devices-table.
* (sbormann) VALVE_STATES is now editable via GUI (show opening of valves associated with a thermostat in percentage).
* (sbormann) Added Role 'Button': You can define a constant SET_VALUE wich will be written to the ID that is linked with STATE if the button is pressed.
* (sbormann) Rewritten parts of front-end to guarentee better compatibility. Boost-Mode for Homematic-Thermostat should work now.
* (sbormann) Added state BOOST_STATE for Homematic-Thermostat - ability to display remaining boost-time if in boost-mode.
* (sbormann) Added dessription of roles and corresponding states.
* (sbormann) Temperature und Humidity-Sensors can now display a STATE at bottom of device, and both, TEMPERATURE and HUMIDITY, in small in the upper right corner.
* (sbormann) Better handling of Auto-Create of Temperature- und Humidity-Sensors.
* (sbormann) German translation: 'geöffnet' lower case.
* (sbormann) Zigbee humidity and temperature added to auto-creation.
* (sbormann) Fixed not scrollable selectbox at devices tab.

### 0.0.15
* (sbormann) Improved check for value type of states.
* (sbormann) Improved slider-tooltip to lower font-size at large numbers.

### 0.0 14
* (sbormann) If role of state is not further specified, then check for role of parent object.

### 0.0.13
* (sbormann) Doors and Windows now force true/false to be translated to opened/closed.
* (sbormann) Double Entrys on WelcomeScreen/Overview removed.
* (sbormann) States are now set with the correct value type.
* (sbormann) Changed recognition of state types. I hope there are no new bugs now!

### 0.0.12
* (sbormann) Check for unallowed chars in object names.
* (sbormann) Check for duplicates in view names.
* (sbormann) Level fires a slider in dialog - even when it has a state list (HUE again :)).
* (sbormann) Added Blinds (Homematic) - please test it, i don't have one to test.

### 0.0.11
* (sbormann) Added compatibility for edge and firefox. 
* (sbormann) Again Hue bugfixes.
* (sbormann) Removed Tooltip from Toolbar.

### 0.0.10
* (sbormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (sbormann) Philips HUE added to autocreate (colortemp is not working yet!).  
* (sbormann) LinkedView now also works on windows, doors and fire-sensor.
* (sbormann) Added translation (thanks ldittmar!).

### 0.0.8
* (sbormann) Added icons to image selectboxes.

### 0.0.7
* (sbormann) Changed order of tabs
* (sbormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (sbormann) Improved speed of select id and autocreate
* (sbormann) Set filter to channel on autocreate

### 0.0.5
* (sbormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (sbormann) Bugfix: copy device created just a reference to old object
* (sbormann) Addes Toolbar-Icons

### 0.0.3
* (sbormann) various bugfixes

### 0.0.2
* (sbormann) first partly running version

### 0.0.1
* (sbormann) initial release

</details>

## License
MIT License

Copyright (c) 2020 Sebastian Bormann

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
