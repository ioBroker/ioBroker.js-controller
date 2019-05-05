![Logo](img/icon_small.png)
# ioBroker.vis.cordova





WEB visualisation for ioBroker platform as android App.

This app is designed to run on mobile phones and tables. it stores the vis project and all images on the mobile phone to save the mobile traffic.

## Usage
This app required the installed and running web adapter or socket-io adapter and installed vis adapter. If web server is activated, so internal socket-io interface must be activated.
In vis some project should exists, e.g. "main".

The ports and the ioBroker server must be reachable from mobile phone.

Install app via [App Store](https://play.google.com/store/apps/details?id=net.iobroker.vis&hl=en). After starting the app for the first time the settings dialog should be opened automatically. To start work with an app see settings.

To show settings press semi-transparent button with "..." in the top left corner.
![Settings](img/menu.png)

## Settings
Almost all settings are optional except "WIFI Socket" and "Project".

### Buttons
- *Reload* - Just restart the web engine, like you press the "Refresh" button in your browser.
- *Re-sync* - If some changes were made on the vis project, it will be **not** automatically loaded into app. To do that the "Re-sync" button must be pressed. All project files and images will be loaded anew on the phone. It is done to save the mobile traffic and to speed up the start of application. Because read from internal SD-Card is much faster than from ioBroker server.
If the option * Sleep in background * is activated, the phone must be active during the whole synchronization phase, otherwise the socket.io connection will be interrupted and the synchronization is aborted.
- *Ok* - save all changes and restart the engine. No synchronisation will be done if the project was yet defined. To load changes from ioBroker vis project use "Re-sync" button.
- *Cancel* - discard all changes and close dialog.

### Connectivity
App can detect via SSID name if the mobile phone in the home (trusted) network or outside of home network and use for home and outside connection the different socket URLs and login data.

Normally in the home network there is no authentication and connection is via HTTP (insecure) but from outside network the connection goes via https (secure) and with login/password.

- *Connected* - shows if the app is connected with ioBroker server.
- *WIFI SSID* - name or names (divided by comma) of home SSID to use home credentials for authentication and home URL for connection.
- *WIFI Socket* - URL like ```http://192.168.0.5:8082```. It is important to have http or https at the start, so app can distinguish between secure and insecure connections. Port is important too. Normally 8082 for *web* or *8084* for separated socketio.
- *WIFI User* - if for the socket communication the authentication is enabled, write here user name from iobroker. User must be first created via "admin" interface. The user "admin" exists always and cannot be deleted.
- *WIFI Password* - user password as set in the ioBroker
- *WIFI Password repeat* - repeat user password here

Following settings are active only if some SSID specified and the device is currently outside of this SSID WiFi network.
- *Cell Socket* - same as *WIFI Socket*, but will be used outside of home network.
- *Cell User* - same as *WIFI User*, but will be used outside of home network.
- *Cell Password* - same as *WIFI Password*, but will be used outside of home network.
- *Cell Password repeat* - same as *WIFI Password repeat*, but will be used outside of home network.

*Note*: the global CSS file will not be processed by application. To use these styles in specific project they should be copied into project CSS file.

### Project name and settings language
- *Language* - language of the settings dialog. English, German and Russian languages are supported. To activate changes press *OK* button.
- *Project* - project name from ioBroker. If no project name shown, so there is no connection with iobroker or no one project is exist.

### Visualisation and behaviour
- *Orientation* - Orientation of view: **auto**, **landscape** or **portrait**. If **auto* selected the orientation will be detected automatically.
- *Prevent from sleep* - if activated, the device will never go into sleep mode and display will be always on. (Does not work an all devices)
- *Allow window move* - if pan and zoom via touch is allowed on the views.
- *Full screen* - use full screen mode on devices with software buttons (home, settings, back).
- *Zoom Level Portrait* - Zoom level in percent of views in portrait mode. Do not set too small level, because you will not be able call the settings dialog. Default settings is 100% and you cannot set values below 20%.
- *Zoom Level Landscape* - same as *Zoom Level Portrait*, but for landscape view.

### Other settings
- *Substitution URL* - if your vis project uses the links for images from some local network URL, that differs from ioBroker URL, you can specify here this URL and all images from this server, that used in the vis project, will be loaded on the mobile phone too.
- *Instance* - Unique instance ID of this VIS. It is required to send targeted commands to only this vis instance. (See [Control interface](#control-interface) for details)
- *Sleep in background* - If vis app is not shown (but runs in background) you can stop any communication from the vis app to the ioBroker server. In this case the state updates and commands from ioBroker will not be delivered to app if the app runs in background.
- *Read always config from server* - Do not cache any files on the phone

### Speech recognition
You can activate speech recognition from the application. If this option is activated, the app will constantly try to recognise some commands. To determine if you are speaking with app or with someone else the key word or key phrase can be specified.
Please select some word that can be good recognised and not used in everyday use.

To detect commands in recognised text the text2command adapter will be used. Please read description of this adapter on [github](https://github.com/ioBroker/ioBroker.text2command) or on (iobroker.net)[http://iobroker.net].
Of course one instance of text2command adapter must be installed.

*Note*: in this case all voices will be sent to Google servers if no offline recognition activated. Activation instruction can be found [here](http://stackandroid.com/tutorial/how-to-enable-offline-speech-to-text-in-android/).

*Note*: in recognition mode the android engine makes "BEEP" every 10-15 seconds. To suppress this the volume will be set to 0. You still can use "text2speech" engine and "playSound" command to play some audio or say tome phrases.

- *Speech recognition active* - if speech recognition is active or not.
- *Keyword* - If in the recognised sentence this word (or phrase) will be found, this text will be sent to "text2command" instance for analyse. It is not required to have keyword on the start of the sentence. You can omit key word in this case all phrases will be sent to text2command for analyse.
- *Text2command instance* - number of text2command instance. Normally 0.
- *Volume* - volume for answers and for text-to-speech commands. All other time the volume will be set 0.
- *Default room* - if your mobile device is fixed in some specific room, e.g. in sleeping room. There is no need to sy every time "Switch the light on in sleeping room", it is should be enough to say ""Switch the light on". To enable that the default room name can be specified. If text2command does not find any room name in the phrase it will take default room name for command execution.
- *Response over TTS* - if activated the answers from text2command will be synthesised via text-to-speech engine. Of course some TTS Engine must be installed and activated on android device.

### Battery and location
There is a possibility to report position and battery status to server. 

- *Device name* - device name is used to create states on server (see below).
- *Report battery status* - if battery status must be reported to server or not. Only changes of battery level or plugged state will be reported. No cyclic update.
- *Position poll interval (sec)* - If position should be reported to server. Position is reported on change and cyclic. To disable report of position set interval to zero. (E.g. to save the battery)
- *High accuracy position* - If position must be high accuracy or not. In high accuracy mode more battery drain.

Following states will be created if battery status reporting is activated:
- vis.0.<deviceName>.battery.level - the battery charge percentage.
- vis.0.<deviceName>.battery.isPlugged - a boolean that indicates whether the device is plugged in.

Battery status will be updated when the battery charge percentage changes by at least 1 percent, or when the device is plugged in or unplugged. 

Following states will be created if position poll interval is not zero:
- vis.0.<deviceName>.coords.latitude - latitude in decimal degrees.
- vis.0.<deviceName>.coords.longitude - longitude in decimal degrees.
- vis.0.<deviceName>.coords.accuracy - accuracy level of the latitude and longitude coordinates in meters.

Following states are not available on all devices:
- vis.0.<deviceName>.coords.altitude - height of the position in meters above the ellipsoid.
- vis.0.<deviceName>.coords.altitudeAccuracy - accuracy level of the altitude coordinate in meters..
- vis.0.<deviceName>.coords.heading - direction of travel, specified in degrees counting clockwise relative to the true north.
- vis.0.<deviceName>.coords.speed - current ground speed of the device, specified in meters per second.
- vis.0.<deviceName>.coords.speedKm - current ground speed of the device, specified in km per hours.

### Access to images and other resources
The App copies the view file of the selected project and all referenced images during the synchronization to the phone (internal memory). There is no automatic update so you have to restart the re-synchronization manually.
The following content will be copied to the phone:
- The view files and all other files in the directory of the chosen vis project with one of the following file extensions: ```.png .jpg .jpeg .gif```
- All image files with file extension ```.png .jpg .jpeg .gif``` and files with file extension ```.wav .mp3 .bmp .svg```, which are in a adapter directory below [iobroker data directory]/files/ and which are referenced inside the view definition file of the chosen vis project. The fist sub directory below [iobroker data directory]/files/ must contain the char "." in his name otherwise the files inside will not be copied.

To allow the app to replace the paths correctly, the files must be specified with an absolute local path (for example, /vis.0/main/img/test.png). Relative paths are not supported. If paths to resources are embedded in HTML inside widgets, the syntax must be exactly match the following pattern  ```... src='/vis.0/main...'``` or ```... src ="/vis.0/main..."```. Other notations are not recognized.
Additionally you can configure an *Substitution URL* in the settings dialog. This URL points to the external URL of the Web server of VIS or another local web server. All found references to URL found in the view definition which starts with the configured Test are downloaded to the device and the URL will be changed to the local path during the synchronization. Please note that this substitution is not implemented for embedded links in html code(e.g. ```https://[your domain]/visweb```).

The replacement of paths at runtime is currently limited to the following widgets:
- basic string (unescaped)
- basic string src
- basic json table

Since the values are transmitted at runtime, the files are only transferred to the device if they are located in the project directory or have been referenced by another statically configured widget. There is no load mechanism of missing pictures.
The icon collections offered as separate ioBroker adapter are not part of the app, but will also be copied during the synchronization phase if the images are referenced in the views.

Your can access other resources within the app if you use full paths starting with http:// or https://. These files are not loaded locally during the synchronization but loaded directly from the respective server via http:// or https:// if the view is shown in the app.
If you use a reverse proxy with http authentication, the credentials can be embedded in the URLin the following form:
```https://[username]:[password]@[my domain]/vis.0/main/...```


### Using Web modules of other adapters as VIS
Other adapters as VIS can also deliver web content. This content can be displayed within the vis views in iframes. This is particularly true for the adapters Flot and Rickshaw charts.

Currently, only the client components of the following adapters are integrated in the app:
- Flot
- Rickshaw

To use the local version of Flot, the source of the iframe must start with ```/flot/index.html?```.

Other content and also the content of other servers such as Webcams can also be shown inside the app, if this is a full URL is used to the server.

### Exit of the App
The app can be closed with the home button. However, in this case, the app runs in the background and continues to consume data volume and battery. The option *Sleep in background* can reduce the consumption. In this case, the socket.io connection is interrupted when the app is inactive.
If you close the app by pressing the back button trice within one second, the app will be stopped completely.
In addition, the app provides a way to terminate completely. For this purpose, you can insert a basic static link widget in your views containing the following link: ```javascript:logout ()```
You find here such a Widget to import in VIS:

```
[{"tpl":"tplIconLink","data":{"href":"javascript:logout ();","target":"_self","text":"","views":null,"src":"/icons-material-png/action/ic_exit_to_app_black_48dp.png","name":"","class":""},"style":{"left":"10px","top":"10px","z-index":"106","background":"none","border-style":"none","color":"#000000","font-family":"Arial, Helvetica, sans-serif","font-size":"large","letter-spacing":"","font-weight":"bold","width":"34px","height":"32px"},"widgetSet":"jqui"}]
```

or in vis versions newer as 0.10.6

```
[{"tpl":"tplHtmlLogout","data":{"html":"<button>Exit</button>","in_app_close":true},"style":{"left":"10px","top":"10px"},"widgetSet":"basic"}]
```

### Using App with ioBroker.pro cloud
You can connect to your home via iobroker.pro cloud. To do that:
1. Configure WiFi connection.

![WiFi connection](img/iobroker.pro1.png)

Enter your home SSID name to detect if your at home or not. 
You can just click on "<=" button and the current SSID will be automatically inserted into the corresponding field.

Depends on the SSID name the app will determine if it must use local address (Socket URL on the last picture) or iobroker.pro as connect way.

2. You must enter your ioBroker.pro credentials in "Cell connection" part:

![Cell connection](img/iobroker.pro2.png)

Activate checkbox "Use iobroker.pro" and enter below your login (email) and password for ioBroker.pro cloud.

After that, when you connects via iobroker.pro you will see small icon on the top right corner for first 10 seconds if connection is via iobroker.pro cloud.

![iobroker.pro icon](img/iobroker.pro3.png)

## Control interface
Vis creates 3 variables:

- control.instance - Here the browser instance should be written or FFFFFFFF if every browser must be controlled.
- control.data     - Parameter for command. See specific command description.
- control.command  - Command name. Write this variable triggers the command. That means before command will be written the "instance" and "data" must be prepared with data.

Commands:

* alert - show alert window in vis. "control.data" has following format "message;title;jquery-icon". Title and jquery-icon are optional. Icon names can be found [here](http://jqueryui.com/themeroller/). To show icon "ui-icon-info" write ```Message;;info```.
* changeView - switch to desired view. "control.data" must have name of view. You can specify project name too as "project/view". Default project is "main".
* refresh - reload vis, for instance after project is changed to reload on all browsers.
* reload - same as refresh.
* dialog - Show dialog window. Dialog must exist on view. One of:

    - "static    - HTML    - Dialog",
    - "static    - Icon    - Dialog",
    - "container - HTML    - view in jqui Dialog",
    - "container - ext cmd - view in jqui Dialog",
    - "container - Icon    - view in jqui Dialog",
    - "container - Button  - view in jqui Dialog".

    "control.data" must have id of dialog widget, e.g. "w00056".
* popup - opens a new browser window. Link must be specified in "control.data", e.g. http://google.com
* playSound - play sound file. The link to file is specified in "control.data", e.g. http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3 .
  You can upload your own file in vis and let it play as for instance "/vis.0/main/img/myFile.mp3".
* tts - text 2 speech. *data* - consist phrase, that must be spoken.

If user changes the view or at start the variables will be filled by vis with

- "control.instance": browser instance and ack=true
- "control.data": project and view name in form "project/view", e.g. "main/view" (and ack=true)
- "control.command": "changedView" and ack=true

You can write the JSON-string or Object into control.command as ```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}```. In this case the instance and data will be taken from JSON object.

With command in javascript adapter you can activate text to speech engine of Android:

```setState('vis.0.control.command', '{"instance": "*", "data":"say something", "command": "tts"}');```



## TODO
- enable automatically load of project files from ioBroker server (e.g. for home use)

## Changelog
### 1.2.0 (2019-05-04)
* versions of adapters were updated

### 1.0.5 (2017-09-26)
* (nobody) fix scale factor
* (bluefox) update weather widgets

### 1.0.4 (2017-08-07)
* (bluefox) add weather widgets

### 1.0.1 (2017-07-21)
* (bluefox) remove opacity from the settings dialog for performance
* (bluefox) fix settings for zoom
* (bluefox) add "no-cache" mode
* (bluefox) patch proxy.0 links
* (bluefox) update all packets (e.g. swipe)

### 0.8.3 (2017-02-07)
* (bluefox) add private policy

### 0.8.2 (2016-12-25)
* (bluefox) add hue widgets

### 0.7.0 (2016-09-09)
* (bluefox) add geolocation
* (bluefox) add report of battery status

### 0.6.0 (2016-09-01)
* (bluefox) new cordova module version 6.3.1
* (bluefox) add dwd, kodi widgets
* (bluefox) update vis, justgauge, bars

### 0.5.2 (2016-07-29)
* (nobody) exit app by back button
* (nobody) very much documentation
* (bluefox) update license file
* (bluefox) translate description to Russian

### 0.5.1 (2016-07-23)
- (nobody) add flot to local files
- (nobody) fix error with settings
- (bluefox) add rickshaw to local files

### 0.5.0 (2016-07-23)
- (bluefox) replace fonts links too
- (bluefox) create description
- (bluefox) allow multiple SSIDs
- (bluefox) reset zoom if settings opened
- (bluefox) limit minimal zoom to 20%
- (bluefox) replace paths in vis-user.css too
- (bluefox) resize settings button according to scale

### 0.4.5 (2016-07-21)
- (bluefox) support of multiple SSIDs divided by comma

### 0.4.4 (2016-07-18)
- (bluefox) fix string escaped

### 0.4.3 (2016-07-17)
- (nobody) fix progressbar, regEx, img path sub in oid

### 0.4.2 (2016-07-16)
- (bluefox) add text input to zoom values in settings

### 0.4.1 (2016-07-12)
- (nobody) add crosswalk browser

### 0.3.2 (2016-06-21)
- (bluefox) replace src="/vis/..." too

### 0.3.1 (2016-06-21)
- (bluefox) fix common.css
- (bluefox) try up to 10 times to store the file if got error

### 0.3.0 (2016-06-13)
- (bluefox) update cordova lib
- (bluefox) add vis-history
- (bluefox) use latest vis

### 0.2.1 (2016-05-17)
- (bluefox) add justgauge

### 0.2.0 (2016-05-10)
- (bluefox) make it run on 4.0.x and 4.1.x

### 0.1.2 (2016-05-03)
- (bluefox) fix error with SVG files
- (bluefox) try to fix error with start

### 0.1.1 (2015-04-24)
- (bluefox) try to fix file saving

### 0.1.0 (2015-04-20)
- (bluefox) fix TTS
- (bluefox) allow pictures from other projects
- (blufeox) change storage to external
- (bluefox) change settings dialog
- (bluefox) allow set system volume for speech

### 0.0.8 (2015-02-23)
- (bluefox) fix "hide on condition"
- (bluefox) implement sleep in background (if app is not active, do not communicate and do not recognize speech)

### 0.0.7 (2015-01-18)
- (bluefox) text2speech

## License
 Copyright (c) 2016-2019 bluefox https://github.com/GermanBluefox
 Creative Common Attribution-NonCommercial (CC BY-NC)

 http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

It is **prohibited** to publish this app or modifications of this app in any kind of mobile application stores (Google App Store, Amazon App Store, ...) or make possible to download the app from some online resources (forums, web sites, ...).
Even if the name of the app is modified and it is free of charge you **may not** publish it or let others to use it.

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for personal purposes.
(Free for personal use).