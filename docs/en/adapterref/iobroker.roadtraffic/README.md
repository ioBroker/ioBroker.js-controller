![Logo](admin/roadtraffic.png)
# ioBroker.roadtraffic
![Number of Installations](http://iobroker.live/badges/roadtraffic-installed.svg) ![Number of Installations](http://iobroker.live/badges/roadtraffic-stable.svg) =================


[![NPM version](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)](https://www.npmjs.com/package/iobroker.roadtraffic)
[![Downloads](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)](https://www.npmjs.com/package/iobroker.roadtraffic)
[![Tests](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic)

[![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)](https://nodei.co/npm/iobroker.roadtraffic/)
## About this Adapter
This Adapter uses Google Maps API to check the traffic on your routes. You can configure multiple routes and the adapter will check the actual traffic situation and shows you how long your journey will take. (At the moment it saves the time in seconds).
Adapter is at a veeerryyy early state right now.. I am planning to implement an alarm clock - so you can tell the Adapter at which time you have to be at work - and what should happen when its time to leave/wake up (Start playing Radio and do an Announcement like "It seems like there is some trafficjam on your route. You need to get up now for not being late at work!" on Alexa etc.) ..
Feel free to create some feature-requests here on Github - just open an Issue for that! ;)

## Getting started
First of all: You may be worried about the step "Set up Billing account & Paymentmethod" that Google may ask you for when you create the Account to get the API Key.. Dont worry! Google gives you a credit of 200$ each month.. (Visit https://cloud.google.com/maps-platform/pricing/sheet/ for more information). You can do ~40.000 requests per Month for free..

So lets go:
1. Go to https://cloud.google.com/maps-platform/?apis=routes and login with your Google-Account (or create a new one if you dont already have one).

![Readme1](img/Readme1.png)

2. Choose a name for your project. You can enter whatever you want here. The name is only for identification in case you would have more than one Project running on your Google-Account.

![Readme2](img/Readme2.png)

3. Set up the Billing- and Paymentmethod for the Google Account (as mentioned above - dont worry about that - you are getting 200$ Credit per Month from Google for your Billing-Account).
If you still are worried - check this Page out: https://cloud.google.com/maps-platform/pricing/sheet/).

![Readme3](img/Readme3.png)

4. Finish your Google API Setup

![Readme4](img/Readme4.png)

5. And Copy your API Key to the Clipboard.

![Readme5](img/Readme5.png)

6. Open the Instancesettings of the roadtraffic Adapter in ioBroker and paste your Google API Key to the input-field.
After that, you can click the "Plus-Icon" to set up your first Route.

![Readme6](img/Readme6.png)


After you entered all informations to the config dialog click "Save & Close".
The Adapter should now restart and you are ready to go!


## Changelog

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
