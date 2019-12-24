![Logo](admin/roadtraffic.png)
# ioBroker.roadtraffic
![Number of Installations](http://iobroker.live/badges/roadtraffic-installed.svg) ![Number of Installations](http://iobroker.live/badges/roadtraffic-stable.svg) =================


[![NPM version](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)](https://www.npmjs.com/package/iobroker.roadtraffic)
[![Downloads](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)](https://www.npmjs.com/package/iobroker.roadtraffic)
[![Tests](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic)

[![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)](https://nodei.co/npm/iobroker.roadtraffic/)
## About this Adapter
This Adapter uses HERE.com API to check the traffic on your routes. You can configure multiple routes and the adapter will check the actual traffic situation and shows you how long your journey will take.
Adapter is at a early state right now.. I am planning to implement an alarm clock - so you can tell the Adapter at which time you have to be at work - and what should happen when its time to leave/wake up (Start playing Radio and do an Announcement like "It seems like there is some trafficjam on your route. You need to get up now for not being late at work!" on Alexa etc.) ..
Feel free to create some feature-requests here on Github - just open an Issue for that! ;)

## Getting started
So lets go:
1. Go to https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account and create a HERE.com Free Developer-Account (Freemium).

![Here1](img/Here1.png)

2. Make sure that Freemium is selected and complete the form on the left side.. (First name, Last name, email,..)

![Here2](img/Here2.png)

3. Click on Register for HERE Account ... and dont forget to tick the Checkbox (Aggree to the Service Terms etc..).

![Here3](img/Here3.png)

4. One more time - agree to the Terms and Conditions and click the "Start Coding" Button.

![Here4](img/Here4.png)

5. At the next page you are already on your HERE.com Dashboard. Look for the REST Section and click on "Generate App".

![Here5](img/Here5.png)

6. Click on "Create API Key" - you will get an API Key .. Open the Instancesettings of the roadtraffic Adapter in ioBroker and paste the API Key into the config field.

![Here6](img/Here6.png)

7. Click the Plus icon in the Instance-Settings and create your first Route..

After you entered all informations to the config dialog click "Save & Close".
The Adapter should now restart and you are ready to go!

## Alarm-Clock
In the Instancesettings you can enable the Alarm-Clock by checking the "Enable Alarm-Clock feature".
You should have the Alexa2 Adapter installed & set to use push connection in the Alexa2 Instancesettings.
Select the Alexa-Device you want to be controlled by the Adapter and enter the TuneIn StationID you want to get played when the alarm is triggered.
The Alarm-Volume has a range from 0-100.
With the Speak string you can control the announcement of Alexa.
Default is:
Guten Morgen %name. Bei aktueller Verkehrslage benötigst du %dur zur Arbeit.

15 Seconds after Alexa started playing the specified TuneIn Station the String will be announced.
If you for example have a Route named 'Daniel' and the Alarm triggers Alexa will say:
Guten Morgen Daniel. Bei aktueller Verkehrslage benötigst du 29 Minuten zur Arbeit.

Leave the Speak string empty if you only want the Adapter to start playing the TuneIn Station and dont get any announcement.

Every Route has 7 Alarm-Channels (Monday-Sunday).
In each Channel you have following states:
* arrivaltime: Enter the Time you want to be at your destination (Example: 07:30 is half past seven in the morning).
* bathtime: Enter the Time you want to be added to the travelduration. (Example: 45 is 45 Minutes. Lets say you have set Arrivaltime to 10:00, Bathtime to 30 Minutes and the current travelduration is 1 hour. Then the Adapter will trigger at 08:30 (Arrivaltime - Bathtime - Travelduration).
* enabled: set to true if you want to enable the Alarm for that day
* triggered: the Adapter will set this state to true when the Alarm is triggered. (You can use it with own scripts for example..) The triggered state will be reset to false at 00:00 on the corresponding day. (Saturday trigger will be set to false at Saturday 00:00).


## Changelog
### 0.2.0 (2019-12-21)
* (BuZZy1337) Alarm-Clock implemented. (See Readme "Alarm-Clock" section for details)

### 0.1.1 (2019-12-13)
* (BuZZy1337) HERE.com changed the Authentication.
* (BuZZy1337) Prepare for Alarm.. (NOT WORKING YET!!! - But needed to push this version because of authentication changes)

### 0.1.0 (2019-12-08)
* (BuZZy1337) Using HERE.com instead of Google API (READ THE UPDATED README!!)

### 0.0.2 (2019-02-27)
* (BuZZy1337) Release to latest repository

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 BuZZy1337 <buzzy1337@outlook.de>

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
