WEB visualisation for ioBroker platform as android App. This app is designed to run on mobile phones and tables. it stores the vis project and all images on the mobile phone to save the mobile traffic.

## Usage

This app required the installed and running web adapter or socket-io adapter and installed vis adapter. If web server is activated, so internal socket-io interface must be activated. In vis some project should exists, e.g. "main". The ports and the ioBroker server must be reachable from mobile phone. Install app via [App Store](https://play.google.com/store/apps/details?id=net.iobroker.vis&amp;hl=en). After starting the app for the first time the settings dialog should be opened automatically. To start work with an app see settings. To show settings press semi-transparent button with "..." in the top left corner. ![Settings](img/menu.png)

## Settings

Almost all settings are optional except "WIFI Socket" and "Project".

## Buttons

- _Reload_ - Just restart the web engine, like you press the "Refresh" button in your browser. - _Re-sync_ - If some changes were made on the vis project, it will be **not** automatically loaded into app. To do that the "Re-sync" button must be pressed. All project files and images will be loaded anew on the phone. It is done to save the mobile traffic and to speed up the start of application. Because read from internal SD-Card is much faster than from ioBroker server. - _Ok_ - save all changes and restart the engine. No synchronisation will be done if the project was yet defined. To load changes from ioBroker vis project use "Re-sync" button. - _Cancel_ - discard all changes and close dialog.

## Connectivity

App can detect via SSID name if the mobile phone in the home (trusted) network or outside of home network and use for home and outside connection the different socket URLs and login data. Normally in the home network there is no authentication and connection is via HTTP (unsecure) but from outside network the connection goes via https (secure) and with login/password. - _Connected_ - shows if the app is connected with ioBroker server. - _WIFI SSID_ - name or names (divided by comma) of home SSID to use home credentials for authentication and home URL for connection. - _WIFI Socket_ - URL like ```http://192.168.0.5:8082```. It is important to have http or https at the start, so app can distinguish between secure and insecure connections. Port is important too. Normally 8082 for *web* or *8084* for separated socketio. - _WIFI User_ - if for the socket communication the authentication is enabled, write here user name from iobroker. User must be first created via "admin" interface. The user "admin" exists always and cannot be deleted. - _WIFI Password_ - user password as set in the ioBroker - _WIFI Password repeat_ - repeat user password here Following settings are active only if some SSID specified and the device is currently outside of this SSID WiFi network. - _Cell Socket_ - same as *WIFI Socket*, but will be used outside of home network. - _Cell User_ - same as *WIFI User*, but will be used outside of home network. - _Cell Password_ - same as *WIFI Password*, but will be used outside of home network. - _Cell Password repeat_ - same as *WIFI Password repeat*, but will be used outside of home network. **Note**: the global CSS file will not be processed by application. To use these styles in specific project they should be copied into project CSS file.

## Project name and settings language

- _Language_ - language of the settings dialog. English, german and russian languages are supported. To activate changes press *OK* button. - _Project_ - project name from ioBroker. If no project name shown, so there is no connection with iobroker or no one project is exist.

## Visualisation and behavior

- _Orientation_ - Orientation of view: **auto**, **landscape** or **portrait**. if **auto* selected the orientation will be detected automatically. - _Prevent from sleep_ - if activated, the device will never go into sleep mode and display will be always on. (Does not work an all devices) - _Allow window move_ - if pan and zoom via touch is allowed on the views. - _Full screen_ - use full screen mode on devices with software buttons (home, settings, back). - _Zoom Level Portrait* - Zoom level in percent of views in portrait mode. Do not set too small level, because you will not be able call the settings dialog. Default settings is 100% and you cannot set values below 20%. - _Zoom Level Landscape_ - same as *Zoom Level Portrait*, but for landscape view._

## Other settings

- _Substitution URL_ - if your vis project uses the links for images from some local network URL, that differs from ioBroker URL, you can specify here this URL and all images from this server, that used in the vis project, will be loaded on the mobile phone too. - _Instance_ - Unique instance ID of this VIS. It is required to send targeted commands to only this vis instance. (See [Control interface](#control-interface) for details) - _Sleep in background_ - If vis app is not shown (but runs in background) you can stop any communication from the vis app to the ioBroker server. In this case the state updates and commands from ioBroker will not be delivered to app if the app runs in background.

## Speech recognition

You can activate speech recognition from the application. If this option is activated, the app will constantly tries to recognize some commands. To determine if you are speaking with app or with someone else the key word or key phrase can be specified. Please select some word that can be good recognised and not used in everyday use. To detect commands in recognised text the text2command adapter will be used. Please read description of this adapter on [github](https://github.com/ioBroker/ioBroker.text2command) or on (iobroker.net)[http://iobroker.net]. Of course one instance of text2command adapter must be installed. **Note**: in this case all voices will be sent to Google servers if no offline recognition activated. Activation instruction can be found [here](http://stackandroid.com/tutorial/how-to-enable-offline-speech-to-text-in-android/). **Note**: in recognition mode the andorid engine makes "BEEP" every 10-15 seconds. To suppress this the volume will be set to 0\. You still can use "text2speech" engine and "playSound" command to play some audio or say tome phrases. - _Speech recognition active_ - if speech recognition is active or not. - _Keyword_ - If in the recognised sentence this word (or phrase) will be found, this text will be sent to "text2command" instance for analyse. It is not required to have keyword on the start of the sentance. You can omit key word in this case all phrases will be sent to text2command for analyse. - _Text2command instance_ - number of text2command instance. Normally 0. - _Volume_ - volume for answers and for text-to-speech commands. All other time the volume will be set 0. - _Default room_ - if your mobile device is fixed in some specific room, e.g. in sleeping room. There is no need to sy every time "Switch the light on in sleeping room", it is should be enough to say "Switch the light on". To enable that the default room name can be specified. If text2command does not find any room name in the phrase it will take default room name for command execution. - _Response over TTS_ - if activated the answers from text2command will be synthesized via text-to-speech engine. Of course some TTS Engine must be installed and activated on android device.

## Battery and location

There is a possibility to report position and battery status to server. - _Device name_ - device name is used to create states on server (see below). - _Report battery status_ - if battery status must be reported to server or not. Only changes of battery level or plugged state will be reported. No cyclic update. - _Position poll interval (sec)_ - If position should be reported to server. Position is reported on change and cyclic. To disable report of position set interval to zero. (E.g. to save the battery) - _High accuracy position_ - If position must be high accuracy or not. In high accuracy mode more battery drain. Following states will be created if battery status reporting is activated: - _vis.0.<deviceName>.battery.**level**_ - the battery charge percentage. - _vis.0.<deviceName>.battery.**isPlugged**_ - a boolean that indicates whether the device is plugged in. Battery status will be updated when the battery charge percentage changes by at least 1 percent, or when the device is plugged in or unplugged. Following states will be created if position poll interval is not zero: - _vis.0.<deviceName>.coords.**latitude**_ - latitude in decimal degrees. - _vis.0.<deviceName>.coords.**longitude**_ - longitude in decimal degrees. - _vis.0.<deviceName>.coords.**accuracy**_ - accuracy level of the latitude and longitude coordinates in meters. Following states are not available on all devices: - _vis.0.<deviceName>.coords.**altitude**_ - height of the position in meters above the ellipsoid. - _vis.0.<deviceName>.coords.**altitudeAccuracy**_ - accuracy level of the altitude coordinate in meters.. - _vis.0.<deviceName>.coords.**heading**_ - direction of travel, specified in degrees counting clockwise relative to the true north. - _vis.0.<deviceName>.coords.**speed**_ - current ground speed of the device, specified in meters per second. - _vis.0.<deviceName>.coords.**speedKm**_ - current ground speed of the device, specified in km per hours.

## Control interface

Vis creates 3 variables: - _control.instance_ - Here the browser instance should be written or FFFFFFFF if every browser must be controlled. - _control.data_ - Parameter for command. See specific command description. - _control.command_ - Command name. Write this variable triggers the command. That means before command will be written the "instance" and "data" must be prepared with data.

### Commands:

*   _alert_ - show alert window in vis. "control.data" has following format "message;title;jquery-icon". Title and jquery-icon are optional. Icon names can be found [here](http://jqueryui.com/themeroller/). To show icon "ui-icon-info" write `Message;;info`.``
*   _changeView_ - switch to desired view. "control.data" must have name of view. You can specify project name too as "project/view". Default project is "main".
*   _refresh_ - reload vis, for instance after project is changed to reload on all browsers.
*   _reload_ - same as refresh.
*   _dialog_ - Show dialog window. Dialog must exist on view. One of:
*   "static - HTML - Dialog",
*   "static - Icon - Dialog",
*   "container - HTML - view in jqui Dialog",
*   "container - ext cmd - view in jqui Dialog",
*   "container - Icon - view in jqui Dialog",
*   "container - Button - view in jqui Dialog"."control.data" must have id of dialog widget, e.g. "w00056".
*   _popup_ - opens a new browser window. Link must be specified in "control.data", e.g. http://google.com
*   _playSound_ - play sound file. The link to file is specified in "control.data", e.g. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3. You can upload your own file in vis and let it play as for instance "/vis.0/main/img/myFile.mp3".

*   _tts_ - text 2 speech. *data* - consist phrase, that must be spoken.

If user changes the view or at start the variables will be filled by vis with

*   "control.instance": browser instance and ack=true
*   "control.data": project and view name in form "project/view", e.g. "main/view" (and ack=true)
*   "control.command": "changedView" and ack=true

You can write the JSON-string or Object into control.command as `{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}`. In this case the instance and data will be taken from JSON object. With command in javascript adapter you can activate text to speech engine of Android: `setState('vis.0.control.command', '{"instance": "*", "data":"say something", "command": "tts"}');`