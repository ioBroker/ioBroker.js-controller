# ioBroker.nibeuplink
![Number of Installations](http://iobroker.live/badges/nibeuplink-installed.svg) ![Stable Version](http://iobroker.live/badges/nibeuplink-stable.svg) ![NPM Version](https://img.shields.io/npm/v/iobroker.nibeuplink.svg) ![NPM Downloads](https://img.shields.io/npm/dm/iobroker.nibeuplink.svg) ![Travis CI State](https://travis-ci.org/sebilm/ioBroker.nibeuplink.svg?branch=master)

This ioBroker adapter receives data from a Nibe heat pump from Nibe Uplink.

## Using this adapter

1. You need a Nibe heat pump - bye one if you don't have ;-)
2. You need an account at Nibe Uplink: https://www.nibeuplink.com/
3. After logging in you have an URL in this form: https://www.nibeuplink.com/System/XXXXX/Status/Overview
4. Instead of XXXXX there is a number. This is your System ID. We need this ID.
5. Go to Nibe Uplink Api: https://api.nibeuplink.com/Account/LogIn and log in
6. Click "MY APPLICATIONS" and then "Create application"
7. Fill in: Name and Description can be everything e.g. ioBroker
8. The Callback URL is important. You can use https://z0mt3c.github.io/nibe.html
9. Accept the NIBE Uplink API Services Agreement and click "Create application"
10. Then you get an Identifier and a Secret - we need them
11. Install this adapter in ioBroker
12. At adapter setting page fill in the Identifier and the Secret.
13. Click the link "Click here to generate the Auth Code on NIBE Uplink."
14. Follow the instructions. At the end you get your nibe-fetcher code
15. Copy this code and paste it in the adapter settings at "Auth Code".
16. Fill in your System ID from Nibe Uplink URL.
17. Choose your language.
18. Click Save and Close

If you (later) get a "400 bad request" error in the log, you must get a new Auth Code - so do numbers 13 until 15 and 18.

## Changelog

### 0.4.0
* set required js-controller to >=2.0.0
* test for node 8 removed
* devide by 10 added to external flow temperature
* fallback names for unknown parameters changed (id added)

### 0.3.0
* Compact mode disabled
* Support for Node 6 removed
* Trim whitespaces from setting parameters
* Bugfix: Customs disabled

### 0.2.2
* Internal clean-up

### 0.2.1
* Dependencies updated
* Fix problem with nodejs 6 and the spread operator and async

### 0.2.0
* Code change to new template
* Support for Compact mode (js-Controller 2.0 Feature) added (#1)
* Translations in settings page
* Type moved from general to climate control

### 0.1.1
* Do not create deprecated sub path objects - only update them if present (if you have them and don't use them, you can delete them)
* info.connection added

### 0.1.0
* Objects tree changed: New, more readable objects added

### 0.0.2
* Language support for objects tree

### 0.0.1
* Initial release

## License
MIT License

Copyright (c) 2019 Sebastian Häßelbarth <seb@sebmail.de>

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