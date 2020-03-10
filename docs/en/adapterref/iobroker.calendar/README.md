
![Logo](admin/calendar.png)
# ioBroker.calendar

[![NPM version](http://img.shields.io/npm/v/iobroker.calendar.svg?logo=npm)](https://www.npmjs.com/package/iobroker.calendar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.calendar?logo=npm)](https://www.npmjs.com/package/iobroker.calendar)
![Installations](http://iobroker.live/badges/calendar-installed.svg)
![Stable](http://iobroker.live/badges/calendar-stable.svg)
[![Dependency Status](https://img.shields.io/david/WLAN-Kabel/ioBroker.calendar.svg)](https://david-dm.org/WLAN-Kabel/iobroker.calendar)
[![Known Vulnerabilities](https://snyk.io/test/github/WLAN-Kabel/ioBroker.calendar/badge.svg)](https://snyk.io/test/github/WLAN-Kabel/ioBroker.calendar)

[![NPM](https://nodei.co/npm/iobroker.calendar.png?downloads=true)](https://nodei.co/npm/iobroker.calendar/)

**Tests:** [![Travis-CI](http://img.shields.io/travis/WLAN-Kabel/ioBroker.calendar/master.svg?logo=travis)](https://travis-ci.org/WLAN-Kabel/ioBroker.calendar) [![AppVeyor](https://img.shields.io/appveyor/build/WLANKabel/ioBroker-calendar/master?logo=appveyor)](https://ci.appveyor.com/project/WLANKabel/ioBroker-calendar/)

## Calendar adapter for ioBroker

Read your google, caldav or ical calendar.

## Todo
* Add Outlook calendar
* Add function to add events to calendar
* Extend vis widget

## Google Authentication
The following step is only needed if your ioBroker is installed on another computer/server and you cannot acces the webinterface via localhost.

### Windows:

Run ```nodepad.exe``` with admin right and open the ```C:\Windows\System32\drivers\etc\hosts``` file.
Add a entry like ```192.168.0.10    example.com``` (\<IP-Adress ioBroker\>     \<FQDN\>)
Save the file and open the webinterface via the <FQDN> you have written in the hosts file. Example: http://example.com:8081

### Linux:

    Comming soon ...

### Mac

    Comming soon ...

### Google API Key
You need an api key. Visit https://console.cloud.google.com/apis/dashboard and login with your google account.

Open the list in the header and create a new project. Enter a project name like "ioBroker Calendar" and click create.

Make sure you have selected the right project from the list. Open the library tab. Search for "Calendar" and click on "Google Calendar API".

Click "activate" and then click on "APIs & Services". Open the tab "OAuth consent screen" and type a application name like "ioBroker Calendar". You can also upload a logo, but this is not necessary.

Open the "Credentials" tab, click the "Create credentials" dropdown and select "OAuth client ID". In the next step choose "Web application". Type a name like "ioBroker" or "Webclient". Add ```http://<FQDN>:<Port from adapter config>``` to authorised JavaScript origins. Add ```http://<FQDN>:<Port from adapter config>/google``` and ```http://<FQDN>:<Port from adapter config>/google/``` to Authorised redirect URIs.

Create the client id and copy the displayed client ID and the client secret.

Go to the adapter config an add the client ID and the client secret.

## Caldav Calendar (Tested with Nextcloud, Web.de and Mail.de)

You can add your caldav calendar in the adapter config.

Enter your access data and the host name in the config.

### Baseurl list
* Nextcloud: https://\<Hostname\>/remote.php/dav/principals
* Web.de: https://caldav.web.de
* mail.de: https://kalender.mail.de
* Posteo: https://posteo.de:8443

If you know more, please let me know so that I can include them.

## iCal File Calendar

You can add your iCal calendar in the adapter config.

Enter the file path on the CalDav tab in the hostname field.

## Changelog

### 1.1.2 (2020-03-03)
* (WLAN-Kabel) #15 - Fixed a serious bug that caused incorrect credentials for CalDav accounts
* (WLAN-Kabel) #15 - Fixed a bug that caused a 'TypeError' message

### 1.1.1 (2020-02-26)
* (WLAN-Kabel) Password encryption added
* (WLAN-Kabel) Error messages for caldav lib extended
* (WLAN-Kabel) Fixed an issue that caused errors when reading null events

### 1.1.0 (2020-02-05)
* (WLAN-Kabel) Caldav support expanded
* (WLAN-Kabel) iCal file support added

### 1.0.1 (2020-01-11)
* (WLAN-Kabel) Missing dependency added

### 1.0.0 (2020-01-11)
* (WLAN-Kabel) Added caldav support
* (WLAN-Kabel) Multiple calendars can be displayed in one widget
* (WLAN-Kabel) Added more widget settings
* (WLAN-Kabel) State structure changed
* (WLAN-Kabel) Appointments are now shown in the popup
* (WLAN-Kabel) Some internal functions revised
* (WLAN-Kabel) Fixed an error when saving the authentication data

### 0.2.0 (2020-01-08)
* (WLAN-Kabel) Multiple calendar support for one account
* (WLAN-Kabel) Calendar color is now supported
* (WLAN-Kabel) Calender states color, name, account added
* (WLAN-Kabel) Calendar name is set as the state name
* (WLAN-Kabel) Fixed an issue where the credentials were not properly controlled
* (WLAN-Kabel) The google calendar name and color will be adopted

### 0.1.0 (2020-01-07)
* (WLAN-Kabel) Added calendar widget
* (WLAN-Kabel) Cron job and server will stopped on unload
* (WLAN-Kabel) Fixed an issue where not all states were deleted
* (WLAN-Kabel) Added some debug messages
* (WLAN-Kabel) Removed adapter from state settings
* (WLAN-Kabel) Fixed problem where series appointments were not loaded

### 0.0.1
* (WLAN-Kabel) Initial release

## License
MIT License

Copyright (c) 2019-2020 WLAN-Kabel <wlan-kabel@outlook.de>

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
