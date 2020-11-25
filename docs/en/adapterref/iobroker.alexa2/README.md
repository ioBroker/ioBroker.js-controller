![Logo](admin/alexa.png)
# ioBroker.alexa2
![Number of Installations](http://iobroker.live/badges/alexa2-installed.svg) ![Number of Installations](http://iobroker.live/badges/alexa2-stable.svg) 

[![NPM version](https://img.shields.io/npm/v/iobroker.alexa2.svg)](https://www.npmjs.com/package/iobroker.alexa2)
[![Build Status](https://travis-ci.org/Apollon77/ioBroker.alexa2.svg?branch=master)](https://travis-ci.org/Apollon77/ioBroker.alexa2)
[![Build status](https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true)](https://ci.appveyor.com/project/Apollon77/iobroker-alexa)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/Apollon77/iobroker.alexa2/blob/master/LICENSE) [![Greenkeeper badge](https://badges.greenkeeper.io/Apollon77/ioBroker.alexa2.svg)](https://greenkeeper.io/)

**This adapter uses the service [Sentry.io](https://sentry.io) to automatically report exceptions and code errors and new device schemas to me as the developer.** More details see below!

This adapter allows you to remote control your Alexa (Amazon Echo) devices.

Big thanks go to soef for the version 1 of the adapter and to Hauke and ruhr70 for ideas in their scripts from ioBroker-Forum (especially the media progress updates)!
Also big thanks to to meicker for support in documenting all of this and numerous users from ioBroker Forum for their testing support!

## States and their meanings:

In the adapter namespace (e.g. alexa2.0) some channels are created

### alexa2.0

| State name | meaning |
| - | - |
| bespoken.* | Send text commands to a virtual device as if you would speak to it |
| echo-devices.* | States per Echo device, see below |
| history.* | Infos for command history, see below |
| smart-home-devices.* | States per smart home device and in general, see below |
| info.*| General information about the adapter status |
| requestResult | Error info for TuneIn and smart-home device requests |

### alexa2.0.Bespoken.*
Bespoken is normally a service provider to help automatically testing skills. But in fact you can use it to send commands to "your" Alexa/Amazon account. With this you can trigger skill actions that normally are not accessible via the Alexa App. By nature of the way it works only commands are possible that do not interact directly with the "Device you speak to", like normal commands that do a certain action and provide an answer. Playing Audio or Video or such that normally will be done by the device you spoke the command to will not work!

A Request to Bespoken will take some seconds because the sent text is first converted into audio, which is then send to Alexa Voice Services and is then answered by Alexa and send back. So it easiely can take up to 10s.

| State name | meaning |
| - | - |
| #sendText | Text to be send to the virtual device |
| answer | Answer from the device as text |
| anwserJson | Answer from the adapter as JSON, may contain additional informations like card infos or such |
| status | Status of the communication with bespoken (OK=Done/Wait for next command, PROCESSING=wait for answer from bespoken, FAILURE=Error happend while processing) |

### alexa2.0.Contacts.ContactId.*
All Alexa-Contacts that can be used to send Text Messages to, including himself. The own contact gets a special "(Self)" after his name.

| State name | meaning |
| - | - |
| #clearOwnMessages | Only exists in own contact and a trigger deletes all messages that are send to himself (also includes messages to himself via App or devices!) |
| textMessage | Sends this text as message to the user. It is shown on all devices of this user with a "yellow ring" |

### alexa2.0.Echo-Devices.Serialnumber.*
Under "echo-devices" every amazon echo device is listed with it's serial number. Not every device shows all the states. Every device has it's own states as described below:

### alexa2.0.Echo-Devices.Serialnumber.Alarm.*
Alarm (Wecker) settings for each device, if available.

| State name | meaning | value |
| - | - | - |
| enabled | Shows status of alarm and allows to change it: Activate alarm with true - Deactivate alarm with false | true / false |
| time | Time for alarm. Overwrite the time for existing alarm to set a new time for this alarm. In case you have an existing alarm you can change the time here by simply overwrite the time in format hh:mm:ss, seconds are not needed to set | Time Input |
| triggered | true if alarm is reached and triggered. Clock must be in sync with Amazon and iobroker, Use this to trigger other action as soon as the alarm time is reached | true / false |
| new | time for new alarm for this device. If you put a value here a new alarm will be created | Time Input (hh:mm:ss, seconds are not needed) |

### alexa2.0.Echo-Devices.Serialnumber.Bluetooth.*
Here you find all connected or known bluetooth device(s) with MAC address(es). The states of each device:


| State name | meaning |
| - | - |
| connected | Shows current connection status and allow connection (set to true) or disconnection (set to false) |
| unpair | Button to unpair this device from the echo device |

### alexa2.0.Echo-Devices.Serialnumber.Commands.*
With Commands you can trigger some actions on your Alexa-Device. If you use these on a multiroom device then they are executed independently and *will not* run in sync on the single devices!

| State name | meaning | value |
| - | - | - |
| doNotDisturb | Switch on/off Do not Disturb for this device| true/false |
| flashbriefing | Briefing in 100 seconds - news etc.pp| Button |
| goodmorning | Good morning from Alexa ...| Button |
| funfact | Fun fact from Alexa ...| Button |
| joke | Joke from Alexa ...| Button |
| cleanup | Plays a "gong" tone like for start/end of listening mode ...| Button |
| curatedtts | Random sentence from the choosen area from Alexa ...| Text (allowed: "goodbye", "confirmations", "goodmorning", "compliments", "birthday", "goodnight", "iamhome") |
| singasong | Alexa sings a song ...| Button |
| speak | Alexa says what you type in here ...| Text Input |
| speakvolume | Adjust the speak volume of Alexa, this volume is set before the speak and reset afterwards| 0-100 |
| tellstory | Alexa tells a story | Button |
| traffic | Traffic news | Button |
| weather | Weather news | Button |
| deviceStop | Stop all actions on device | Button |
| notification | Send text notifcation to customer of the device | Text |
| announcement | Play announcement (like speak but with Bing before text) | Text |
| ssml | Speak SSML XML string | Text |

Detailed information Speak and Announcement: Type in here what you want Alexa to say. You can also adjust the volume of Alexa by giving a percentage before your text.
Example: 10;Alexa is saying Alexa with 10% volume, while 100;Alexa is 100% volume.
Normally you only can send 250 characters per speak command. By using the semicolon it is possible to write as much as you want, as long as you separate 250 characters with a semicolon.
Alexa will then speak the text after each other with a small break. You also can use the volume together with more 255 blocks by writing #Volume;#Block1;#Block2, a.s.o A volume set here will be used over a defined speak-volume.

### alexa2.0.Echo-Devices.Serialnumber.Info.*
Information about the Alexa device

| State name | meaning | value |
| - | - | - |
| capabilities | capabilities if the alexa device | Information |
| deviceType | device type from Amazon | Information  |
| deviceTypeString | Device Type as string | Information |
| isMultiroomDevice | Is multiroom device - Multiroom is a virtual device group | Information, true / false |
| isMultiroomMember | Is Multiroom member - If true the device is part of a multiroom device group  | Information, true / false |
| MultiroomParents | If this device is part of a multiroom device group this state shows the parent group device | Information |
| name | Name of Alexa Device | Information |
| SerialNumber | Serial number of Alexa device |

### alexa2.0.Echo-Devices.Serialnumber.Music-Provider.*
Directly tell Alexa to play Music or a playlist from supported music providers. Actually supported are: My Library, Amazon Music, Tune In. You can also include a multiroom device group name in the phrase to play it on this group (e.g. "SWR3 auf Erdgeschoss")

| State name | meaning | value |
| - | - | - |
| Amazon-Music | Phrase to play with Amazon Music | Text input |
| Amazon-Music-Playlist | Playlist to play with Amazon Music | Text input |
| My-Library | Phrase to play with My Library | Text input |
| My-Library-Playlist | Playlist to play with My Library | Text input |
| Tune-In | Phrase to play with Tune In | Text input |
| Tune-In-Playlist | Playlist to play with Tune In | Text input |

### alexa2.0.Echo-Devices.Serialnumber.Player.*
States to control the Playback of the device and to see the current status and media information

| State name | meaning | value |
| - | - | - |
| TuneIn-Station | text field to put in a Station name to play this station on this device. Also it is possible to type in the station number (s123456...), a show/podcast id (p1234567...) or a topic id (t123456789...) | Text input |
| ContentType | text field to put in desired content to play on this device | Information |
| controlForward | Button to trigger player "forward" command (30s) | Button |
| controlNext | Button to trigger player "next" command | Button |
| controlPause | Button to trigger player "pause" command | Button |
| controlPlay | Button to trigger player "play" command | Button |
| controlPrevious | Button to trigger player "previous" command | Button |
| controlRepeat | Button to trigger player "repeat" command | true / false |
| controlRewind | Button to trigger player "rewind" command (30s) | Button |
| controlShuffle | Switch to enable or disable Shuffle mode for player | true / false |
| currentAlbum | Current album actually playing | Information |
| currentArtist | Current artist actually playing | Information |
| currentState | If playing -> true , else false| true / false |
| currentTitle | Current title actually playing | Information |
| imageURL | URL to the image of the album | Information |
| mainArtURL | URL to current main art | Information |
| mediaLength | Length of the current title | Information |
| mediaLengthStr |  active media length as (HH:)MM:SS | Information |
| mainProgress | active media elapsed time | Information |
| mainProgressPercent | active media elapsed time in percent | Information |
| mediaProgressStr |  active media progress as (HH:)MM:SS | Information |
| miniArtUrl | URL to the art (mini) | Information |
| muted | state of 'MUTE' | Information, true / false, volume = 0 is considered as muted |
| providerID | ID of the current music provider | Information |
| providerName | Name of the current music provider | Information |
| radioStationId | ID of the TuneIn radio station | Information |
| service | name of the current music service | Information |
| volume | Volume of playback. You can enter a value between 0-100% | INPUT Volume |

### alexa2.0.Echo-Devices.Serialnumber.Reminder.*
Reminder (Erinnerungen) settings for each device, if available.

| State name | meaning | value |
| - | - | - |
| enabled | Shows status of reminder and allows to change it: Activate reminder with true - Deactivate reminder with false, will be deleted some time after it automatically when disabled | true / false |
| time| Time for reminder. Overwrite the time for existing reminder to set a new time | Time Input | In case you have an existing reminder you can change the time here by simply overwrite the time in format hh:mm:ss, seconds are not needed to set |
| triggered | true if reminder is reached and triggered. Clock must be in sync with Amazon and iobroker, Use this to trigger other action as soon as the reminder time is reached | true / false |
| new | Add a new reminder in the format <br> time(hh:mm),text<br> | Text Input <br>12:00,Remind me

### alexa2.0.Echo-Devices.Serialnumber.Routines.*
Overview of routines set up in Alexa App. Self created routines have a serial number, Amazon shows as 'preconfigured:...' Each routine can be triggered with a button to run once.

| State name | meaning | value |
| - | - | - |
| Serial or internal name of routine | name of routine | Button

### alexa2.0.Echo-Devices.Serialnumber.Timer.*
You can have one or more timer running on each Alexa device. Because of the very dynamic nature of timers there will be no further objects created like with Alarm or Reminders, but a way to get a triggered info exists.

| State name | meaning | value |
| - | - | - |
| triggered | A timer got triggered | Information


### alexa2.0.Echo-Devices.Serialnumber.online
Is this Alexa device online and connected to the Amazon cloud ?

| State name | meaning | value |
| - | - | - |
| online | Is the device online ? | True / False

### alexa2.0.History

| State name | meaning | value |
| - | - | - |
| #trigger | Button to get new History (more current then timestamp in creationTime), only needed when not using the push connection | Button |
| cardContent | Additional information as shown in Alexa-App/Echo Show | Information |
| cardJson | Additional information as shown in Alexa-App/Echo Show in JSON format | Information |
| creationTime | date of this history entry, new history entries are only considered when later as this timestamp | Information |
| domainApplicationId | Additional information like Skill-ID or such, optional | Information |
| domainApplicationName | Additional information like Skill name or such, optional | Information |
| json | Json of last command data to be able to process all infos e.g. in own JavaScripts| JSON |
| name | Name of the device that got the last request | Information |
| serialNumber | serialnumber of the device that got the last request | Information |
| status | Status of last command to Alexa | SUCCESS / FAULT / DISCARDED_NON_DEVICE_DIRECTED_INTENT; last one is generated when activating the device by saying the wake word, or when the device discarded input as "not for me" |
| summary | text/summary/action received by the device | Information |

### alexa.0.Smart-Home-Devices
Includes all smart home devices Alexa knows from your skills. States as follows, for all known devices:

| State name | meaning | value |
| - | - | - |
| deleteAll | deletes all smart home devices from Alexa, same as the button in the Alexa App | Button
| discoverDevices | finds new smart home devices, same as the button in the Alexa App | Button
| queryAll | queries all devices, only visible when at least one device is able to retrieve information | Button

### alexa.0.Smart-Home-Devices.SerialNumber.*
| State name | meaning | value |
| - | - | - |
| #delete | delete smart home device from Alexa | Button
| #enabled | Is the smart home device active ? | Information
| #query | query data for this device, only visible when the smart home device/skill supports to retrieve information | Button |
| active | shown for scenes when they can be activated/deactivated | true / false |
| powerState | Switch power on / off | changeable, true / false |
| ... | Many more possible states depending on the type the the smart home device | Information or changeable :-) |

**-> Special states for color/light devices**

| State name | meaning | value |
| - | - | - |
| brightness | brightness of the HUE light | changeable 0-100% |
| color-Brightness | brightness for color definition (together with hue and saturation, HSV) | Information, 0-1% |
| color-hue | hue value of the color (together with brightness and saturation, HSV) | Information, 0-360° |
| color-saturation | saturation of the color (together with brightness and hue, HSV) | Information, 0-1 |
| colorRGB | RGB code of actual color build out of color-* values | Information, #rrggbb |
| colorName | Name of the color as defined by Alexa - fixed values | changeable to set color, 0-144 |
| colorTemperarureInKelvin | Color temperature in Kelvin | Information, 1000-10000K |
| colorTemperatureName | Color temperature name as defined by Alexa - fixed values | changeable to set, 0-18 |

With #brightness you can adjust the brightness of your light, #colorName is to pick one predefined color (0-144). For HUE Ambient light you can choose between 19 Values fom 0-18 in #colorTemperatureName. All light can switched on and off with #powerState.

### alexa2.0.Info.*
| State name | meaning | value |
| - | - | - |
| connection | If connection to Alexa is OK | Information -> true / false |
| cookie | Alexa cookie, use with several external scripts that also want to access Alexa APIs | Information |
| csrf | Alexa CSRF, use with several external scripts that also want to access Alexa APIs | Information |


## Missing features
* how to update initial status for volume, shuffle or repeat and doNotDisturb?! Or unneeded?
* add fields to show playing-info like JS version
* self deactivation if cookie/csrf invalid

## Installation
As usual using stable repository, latest repository or use the ioBroker "Install" options from GitHub


## Troubleshooting

### Problems with Cookie determination via E-Mail/Password
Sometimes Amazon has weired checks in place when they detect unexpected traffic on Login.
This can result in the problem that a captcha needs to be answered in order to login.
Mostly this captcha needs to be answered once and after this the login works without Captcha.

When you need to answer such a captcha then try to do the following:
* Use a common Browser (e.g. Chrome)
* disable Javascript!
* clear all cookies that may exist for Amazon or use Proivate/Incognito mode of the browser
* call https://alexa.amazon.de
* you should get a login form (normally displayed for older mobile browsers)
* login there with your Amazon credentials where the Echo/Alexa is registered in
* you may need to login twice or solve a Captcha
* At the end you should see "https://alexa.amazon.de/spa/index.html" as URL but without any real content (because JS is still disabled), BUT THIS IS COMPLETELY OK!!!!
* now try to get cookie again
* if it still not works do it again and check the User-Agent and accept-Language from your browser and use those in adapter on next try

Additionally the Accept-Language-Header (defaults to "de-DE") needs to match with your language/the browser language/the language of the amazon page you login.

You can also try to play around with the User-Agent and use one which more matches to the system type you use.
As example using "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" as User-Agent was reported as working better when ioBroker runs on a linux system.

You can override all those parameters in the adapter configuration.

### How to determine Cookie by my own?
If the automatic Cookie determination don't work or you do not trust the Adapter to give the Email/Password then you can determine the cookie by your own. There are several infos on the web how to do it. Here some links:

* https://www.gehrig.info/alexa/Alexa.html
* or use the shellscript from https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html to get it on shell ...

But be aware: The Cookie will time out after several time and then the adapter will stop working and disable itself. You then need to manually get a new cookie!

## What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.  


## Changelog

### 3.3.2 (2020-11-23)
* (Apollon77) prevent crash cases and optimize reconnection handling

### 3.3.1 (2020-07-24)
* (Apollon77) Further optimize Cookie handling

### 3.3.0 (2020-07-19)
* (Apollon77) Hopefully allow easier upgrades if old deviceId is invalid now
* (Apollon77) Allow to have separate deviceIds per instance

### 3.2.8 (2020-07-16)
* (Apollon77) Work around Amazon Security changes and make proxy working again

### 3.2.7 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again
* (arteck) add echo studio

### 3.2.6 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again 

### 3.2.5 (2020-07-13)
* (Apollon77) Work around Amazon Security changes and make proxy working again 
* (Apollon77) fix Sentry crash case when Amazon do not respond correctly (IOBROKER-ALEXA2-1C)

### 3.2.4 (2020-06-18)
* (Apollon77) Update Alexa-Remote Library to optimize communication error/timeout cases

### 3.2.3 (2020-06-17)
* (Apollon77) Fix currentState handling

### 3.2.2 (2020-06-17)
* (Apollon77) remove goodnight because was not working
* (Apollon77) Fix Play/Pause states and some media optimizations

### 3.2.1 (2020-06-17)
* (Apollon77) update amazon-cookie library: another optimization for Node.js 14

### 3.2.0 (2020-06-17)
* (Apollon77/hive) add new commands, jokes/facts/goodnight/cleanup
* (Apollon77/hive) add new command curatedtts with allowed values ["goodbye", "confirmations", "goodmorning", "compliments", "birthday", "goodnight", "iamhome"] to play random curated sentences
* (Apollon77) Prevent some crashes
* (Apollon77) Make sure Timer are not triggering the state when deleted
* (Apollon77) make sure that Lists objects are deleted correctly when deleting
* (Apollon77) Make compatible with nodejs 14
* (Apollon77) Adjust to changes from Amazon so that initial Proxy process works again
* (OberstVonGatow) Make sure that for Spotify Media data requests do not have negative effects and stop the playback  

### 3.1.2 (2020-03-18)
* (Gieskanne/Apollon77) Add Next Timer Date as state
* (Apollon77) Fix missing history entries
* (Apollon77) Prevent List deletions from logging errors
* (Apollon77) optimiztions, dependency updates and fixes
* (Apollon77) Switch to ioBroker own sentry instance
* (Apollon77) add Info.softwareVersion

### 3.0.8 (2020-01-19)
* (Apollon77) fix some crash cases
* (Apollon77) Update Sentry DSN and add filtering
* (Apollon77) Update deps

### 3.0.7 (2019-12-28)
* (Apollon77) Prevent some errors

### 3.0.6 (2019-12-26)
* (Apollon77) Prevent some errors

### 3.0.5 (2019-12-25)
* (Apollon77) Prevent some errors

### 3.0.4 (2019-12-24)
* (Apollon77) Prevent some errors

### 3.0.3 (2019-12-24)
* Adapter needs nodejs 8+ and js-controller 2.0 now!
* (Zefau) add functionality for handling of lists
* (Apollon77) Add answerText when available from history
* (Apollon77) handle error for empty valueMaps for ColorTemperatures
* (Apollon77) also support names for new special routines (Alarm Notifications, Sensor Detections, ..)
* (Apollon77) GitHub Actions for Test& Build
* (Apollon77) Add Sentry for error reporting
* (Apollon77) prevent some crashed after changes by Amazon
* (Apollon77) fix Routine names after changes by Amazon
* (Apollon77) add some devices and new images
* (Apollon77) Add more situations to update player status because amazon send no info anymore on title changes 

### 2.6.4 (2019-07-25)
* (Apollon77) add some error handling for contacts

### 2.6.1 (2019-07-22)
* (Apollon77) add new device
* (Apollon77) fix volume logic for ssml
* (Apollon77) Allow reminders to bet set >+ 1day

### 2.6.0 (2019-07-21)
* (Apollon77) added possibility to send text messages to users including himself, allows deletion of all messages to himself
* (Apollon77) added option to reset Cookies. After sahev the adapter will restart and needs to get a new Login (see adapter config)
* (Apollon77) change announcement and ssml to send commands more synchronous

### 2.5.0/1 (2019-07-07/18)
* (INgoRah) Support compact mode
* (Apollon77) enhance error handling for broken authentications

### 2.4.6 (2019-07-05)
* (Apollon77) enhance error handling for broken authentications

### 2.4.5 (2019-07-01)
* (Apollon77) enhance error handling for broken authentications

### 2.4.4 (2019-06-26)
* (Apollon77) new devices added

### 2.4.3 (2019-06-25)
* (Apollon77) enhance error handling for Amazon Push Infos

### 2.4.1/2 (2019-06-23)
* (Apollon77) Allow to specify an external docker container IP to override Proxy-IP
* (Apollon77) Add more Devices from GitHub
* (Apollon77) try to work around an Image URL bug from Amazon
* (Apollon77) optimize Admin display of Status/Link
* (Apollon77) add Link to https://alexa.amazon.com to Admin instance overview
* (Apollon77) Remove Admin2 support
* (Apollon77) Optimize Handling from DNS errors (hopefully) to prevent stopped Adapters on Internet/DNS problems 

### 2.3.3 (2019-06-21/22)
* (Apollon77) adjust to current Amazon changes
* (Apollon77) fix volume handling
* (Apollon77) Add some more devices
* (Apollon77) Logging reduced
* (Apollon77) unknown devices get commands activated automatically
* (Apollon77) remove Email/Password fields and add info about login to Admin screen (still needs to be polished, only Admin v3)
* (Apollon77) detect App-Devices and remove them from the list because they are not usable in any way

### 2.2.0 (2019-01-xx) [unpublished]
* (Apollon77) add new sequenceCommands "calendarNext", "calendarToday", "calendarTomorrow"
* (Apollon77) fix wake word handling and history sanitizing

### 2.1.0 (2019-01-13) [unpublished]
* (Apollon77) cookie handling completely rewritten, no email/password anymore, only Proxy (still only from log)
* (Apollon77) fixes routine triggering that triggered on wrong device sometimes
* (Apollon77) added new commands "deviceStop", "announcement", "notification", and "ssml" (see documentation above) 

### 1.1.3 (2018-11-17)
* (Apollon77) optimize cookie handling again

### 1.1.2 (2018-11-17)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.1 (2018-11-09)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.0 (2018-09-18)
* (Apollon77) Further optimizations to lower number of requests
* (Apollon77) Experimental support for Playlist IDs (p1234567) in TuneIn-Station

### 1.0.1 (2018-09-16)
* (Apollon77) fixes and important changes to make sure not too many requests are sent

### 1.0.0 (2018-09-06)
* (Apollon77) polishng and finalization, make it 1.0.0

### 0.7.5 (2018-09-04)
* (Apollon77) speak can now contain separated text by semicolons. These Texts will then be spoken sequencially. So the old limit if 250 characters is only existing for one such text part. So, now longer texts are possible too. Separate it with a semicolon.
* (Apollon77) more color handling fixes

### 0.7.0 (2018-08-30)
* (Apollon77) Add Bespoken Virtual device support to be able to interact with Alexa infrastructure
* (Apollon77) add new Device Types for Smarthome-integration (Contact and Motion sensors)

### 0.6.4 (2018-08-30)
* (Apollon77) fixes to colorhandling
* (Apollon77) allow to deliver a volume together with aspeak command by using "80;text" and then volume is set before speak and reset afterwards. Experimental!

### 0.6.1 (2018-08-24)
* (Apollon77) sometimes new alarms were not triggered in adapter
* (Apollon77) add support to control smart devices and groups (and also add groups). Because I was only able to test a few types i added logging. please check log, try out and report back!
* (Apollon77) When routines are executed via voice command and push connection is enabled the routine state is also triggered by "true" with ack=true when routine trigger text is matching exactly to spoken text
* (Apollon77) corrected volume and mute handling in states, a volume of 0 is also seen as "muted" if muting flag is not supported by device
* (Apollon77) when speak text is coming from cloud adapter and contains SSML tags they will be filtered out, so you can use a speak endpoint directly to output response from Smart Home skill actions

### 0.5.2 (2018-08-16)
* (Apollon77) fix an error when getting new cookie
* (Apollon77) add new "Playlist" states for the Music providers to directly prepend "playlist" :-)
* (Apollon77) Volumes are not updated for multiroom devices when === 0
* (Apollon77) Add Reminder and Alarms support. Write time and pot. text separated by comma into the "New" stat to create a new one (e.g. "10:00:00, Test-Reminder")
* (Apollon77) Also with Push-Connection some times states are generally updated to make sure data are correct (e.g. player media info will disappear 2h after stopping the music)
* (Apollon77) Added some more deviceTypes

### 0.4.0 (2018-08-13)
* (Apollon77) internal Refactoring
* (Apollon77) states that are not needed anymore will be removed. This will be logged for now, so please check this and give feedback!
* (Apollon77) sanitized music provider state names (spaces are now dashes ... should be removed automatically)
* (Apollon77) Renamed TuneIn-Direct to TuneIn-Station (even if you still can enter text to search, this works with stations too) ... should be removed automatically)
* (Apollon77) Device and Bluetooth status is now also checked at states update
* (Apollon77) After enabling Push-Connection the configured polling is turned off and anything is done based on real time informations from Alexa. Test it
* (Apollon77) Enhanced History states to include the status of the action (SUCCESS, FAIL ...), infos from returned cards (if available) and info on accessed skill for this action.
* (Apollon77) When using Push-Connection History update is also updated automatically. An empty summary with status DISCARDED_NON_DEVICE_DIRECTED_INTENT means the activation of the echo by saying the wake word
* (Bluefox) Add icons for some of the devices for Admin

### 0.3.8 (2018-07-27)
* (Apollon77) Several Multiroom-fixes
* (Apollon77) fixed shuffle/repeat
* (Apollon77) fixed status for play, pause, shuffle and repeat

### 0.3.4 (2018-07-27)
* (Apollon77) Only 20 Routines were queried, now up to 2000
* (Apollon77) Also allow commands including speak for multiroom, BUT it is triggered per device, so NO synchronous audio output!!
* (Apollon77) Thanks to Matten-Matten also Music-provers can be started on multiroom devices

### 0.3.2 (2018-07-25)
* (Apollon77) Fix volume settings for multiroom devices (please report other devices where it is not working)
* (Apollon77) Add serial number and name to Info

### 0.3.0 (2018-07-24)
* (Bluefox) Admin3 fixes and slight changes to roles and code
* (Apollon77) Reworked state names (hopefully last time!)
* (Apollon77) Combine Player-Control and Player-Info into channel Player to support better detection and material support
* (Apollon77) Added further information in Infos states per echo device
* (Apollon77) Try to detect the type of the device different and decide if commands are available or not (till capabilities are known better)
* (Apollon77) New "Music-Provider" states depending on available music providers with possibility to enter a text to play something (same as you would speak it)
* (Apollon77) Volume is send different now, so that it also works when Device player get's inactive


### 0.2.4 (2018-07-22)
* (pix) materialize settings window
* (Apollon77) WOn IP is set automatically with IP from first network interface
* (Apollon77) fix comma replacements in speaks, do not speak empty text
* (Apollon77) if Device is Multiroom, the do not create Routines and Commands and not bluetooth
* (Apollon77) add information about multiroom device and master (later we can use this to sort out commands that are impossible with multiroom)
* (Apollon77) History is also stored as JSON, so it can be used to monitor one datapoint and have all infos on updateState
* (Apollon77) Several other fixes

### 0.2.3 (2018-07-20)
* (Apollon77) in Numbers with . are replaced by commas

### 0.2.2 (2018-07-20)
* (Apollon77) Finally fix device renaming

### 0.2.1 (2018-07-20)
* (Apollon77) Small fix of history channel type and setting states initially

### 0.2.0 (2018-07-20) (as iobroker.alexa2)
* (Apollon77) 0.2.0: added many Player-Info datapoints including "progress updates " when media is playing
* (Apollon77) 0.2.0: removed "Notifications" because the only benefit for now is to show them, no interaction or change possible
* (Apollon77) 0.2.0: adapter now allows to configure intervals for history updates and other data updates like player info
* (Apollon77) 0.2.0: if cookie could not be determined correctly a proxy is started to allow manual login and cookie is catched in the background on success
* (Apollon77) 0.2.0: add info datapoints for connection (connected to Alexa), cookie and csrf
* (Apollon77) 0.2.0: rework complete logic to not use soef library anymore
* (Apollon77) 0.2.0: Speaking free text at any timepoint is available under Commands.speak
* (Apollon77) 0.2.0: Sequence-Commands (weather, traffic, flashbriefing, goodmorning, singasong, tellstory) are available to be triggered under "Commands"
* (Apollon77) 0.2.0: Automation-Routines are now available to be triggered per device under "Routines"
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Also support entering TuneIn-Station IDs ("s" plus 4-6 digits) to play that station

### 0.1.x (Github only as iobroker.alexa)
* (Apollon77) 0.1.5: Adapter disables itself on error (no cookie/no csrf in cookie/captcha needed)
* (Apollon77) 0.1.5: Reorganized some states (delete object again please), add playerinfo section for later usage, hopefully fixed unplanned device renaming and other things
* (Apollon77) 0.1.5: Added adapter config options to overwrite used amazon-page, user-agent and accept-language for cookie determination and
* (Apollon77) 0.1.4: State changes are logged and only considered when ack=false!
* (Apollon77) 0.1.3: Corrected all roles, delete objects and start again!
* (Apollon77) 0.1.3: bluetooth connection status filled correctly initially
* (Apollon77) 0.1.2: Library fixes and updates
* (Apollon77) 0.1.1: Library fixes and updates

### 0.1.0 (2018-07-10)
* (Apollon77) get Adapter working again, especially getting cookie and optimize refresh

### 0.0.x
* soef versions

## License

The MIT License (MIT)

Copyright (c) 2017-2018 soef <soef@gmx.net>, 2018-2020 Ingo Fischer <iobroker@fischer-ka.de>

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
