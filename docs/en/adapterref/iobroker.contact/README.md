![Logo](admin/contact.png)
# ioBroker.contact

[![NPM version](http://img.shields.io/npm/v/iobroker.contact.svg)](https://www.npmjs.com/package/iobroker.contact)
[![Downloads](https://img.shields.io/npm/dm/iobroker.contact.svg)](https://www.npmjs.com/package/iobroker.contact)
![Number of Installations (latest)](http://iobroker.live/badges/contact-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/contact-stable.svg)
[![Dependency Status](https://img.shields.io/david/WLAN-Kabel/ioBroker.contact.svg)](https://david-dm.org/WLAN-Kabel/iobroker.contact)
[![Known Vulnerabilities](https://snyk.io/test/github/WLAN-Kabel/ioBroker.contact/badge.svg)](https://snyk.io/test/github/WLAN-Kabel/ioBroker.contact)

[![NPM](https://nodei.co/npm/iobroker.contact.png?downloads=true)](https://nodei.co/npm/iobroker.contact/)

**Tests:** [![Travis-CI](http://img.shields.io/travis/WLAN-Kabel/ioBroker.contact/master.svg)](https://travis-ci.org/WLAN-Kabel/ioBroker.contact) [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/WLAN-Kabel/ioBroker.contact?branch=master&svg=true)](https://ci.appveyor.com/project/WLANKabel/ioBroker-contact/)

## Contact adapter for ioBroker

Read your google and nextcloud contacts.

## Todo
* 

## Google Authentication (only for google accounts, not for nextcloud accounts)
The following step is only needed if your ioBroker is installed on another computer/server and you cannot acces the webinterface via localhost.

### Windows:

Run ```nodepad.exe``` with admin right and open the ```C:\Windows\System32\drivers\etc\hosts``` file.
Add a entry like ```192.168.0.10    example.com //<IP-Adress ioBroker>     <FQDN>```
Save the file and open the webinterface via the <FQDN> you have written in the hosts file. Example: http://example.com:8081

### Linux:

    Comming soon ...

### Mac

    Comming soon ...

### Google API Key

#### !!! Note: If you have already installed and set up the iobroker.contact adapter you only need to add the API to your project (3.).

1. You need an api key. Visit https://console.cloud.google.com/apis/dashboard and login with your google account.

2. Open the list in the header and create a new project. Enter a project name like "ioBroker" and click create.

3. Make sure you have selected the right project from the list. Open the library tab. Search for "contact" and click on "Google People API".

4. Click "activate" and then click on "APIs & Services". Open the tab "OAuth consent screen" and type a application name like "ioBroker". You can also upload a logo, but this is not necessary.

5. Open the "Credentials" tab, click the "Create credentials" dropdown and select "OAuth client ID". In the next step choose "Web application". Type a name like "ioBroker" or "Webclient". Add ```http://<FQDN>:<Port from adapter config>``` to authorised JavaScript origins. Add ```http://<FQDN>:<Port from adapter config>/google``` and ```http://<FQDN>:<Port from adapter config>/google/``` to Authorised redirect URIs.

6. Create the client id and copy the displayed client ID and the client secret.

Go to the adapter config an add the client ID and the client secret.

### contact.0

| State name | meaning |
| - | - |
| query | Query a contact for a phone number |
| familyName | Family name of the requested contact |
| givenName | Given name of the requested contact |
| fullName | Full name of the requested contact |
| photo | Photo of the requested contact |
| id | ID of the requested contact |

### contact.0.*.

| State name | meaning |
| - | - |
| familyName | Family name of the contact |
| givenName | Given name of the contact |
| fullName | Full name of the contact |
| photo | Photo of the contact |
| addresses.* | Adresses of the contact |
| emailAddresses.* | Email adresses of the contact |
| phoneNumbers.* | Phone numbers of the contact |

## Javascript

A request can be sent to the adapter via ```sendTo()```, as does the query data point, but you get back a JSON object that can be processed in a script (was already used: https://forum.iobroker.net/topic/28294/asynchron-callback-promise-await-hilfe.

```js
sendTo('contact.0', 'query', {phonenumberr: '+49 1234 567890'}, (obj) => {

    if(obj.error) {

        log(obj.error);

    } else {

        log(JSON.stringify(obj.contact));

    }

});
```

## Changelog

### 1.1.3 (2020-01-23)
* (WLAN-Kabel) The roles have been changed to official once
* (WLAN-Kabel) Fixed deprecation of Buffer
* (WLAN-Kabel) Added error handler for http server

### 1.1.2 (2020-01-07)
* (WLAN-Kabel) Server will stopped on unload
* (WLAN-Kabel) Removed adapter from state settings

### 1.1.1 (2020-01-06)
* (WLAN-Kabel) Cron job will stopped on unload
* (WLAN-Kabel) Fixed an issue where not all states were deleted
* (WLAN-Kabel) Added some debug messages

### 1.1.0 (2020-01-05)
* (WLAN-Kabel) sendTo() is now supported
* (WLAN-Kabel) Fixed issue where roads are being written into the roll
* (WLAN-Kabel) Fixed issue where contacts are deleted when refreshed

### 1.0.1 (2019-12-29)
* (WLAN-Kabel) Fixed problem with companies in google contacts
* (WLAN-Kabel) Removed 'undefined' from fullName if one name is missing
* (WLAN-Kabel) Adapter no longer hangs on the schedule
* (WLAN-Kabel) Nextcloud default password changed because the old password caused messages

### 1.0.0 (2019-12-23)
* (WLAN-Kabel) Added Nextcloud contacts
* (WLAN-Kabel) Added state fullName to query and each contact
* (WLAN-Kabel) FQDN and interval moved to main tab
* (WLAN-Kabel) Changed channel name for addresses, emailAddresses and phoneNumbers
* (WLAN-Kabel) Added type state for emailAddresses and phoneNumbers

### 0.0.3 (2019-12-21)
* (WLAN-Kabel) Standard country code can now be selected yourself

### 0.0.2 (2019-12-21)
* (WLAN-Kabel) Fixed an issue that restricted the search
* (WLAN-Kabel) Limit of 100 contacts has been removed

### 0.0.1 (2019-12-17)
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
