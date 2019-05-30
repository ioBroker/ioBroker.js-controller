![Logo](admin/owntracks.png)
# ioBroker.owntracks
[OwnTracks](https://owntracks.org/) allows you to keep track of your own location. You can build your private location diary or share it with your family and friends. OwnTracks is open-source and uses open protocols for communication so you can be sure your data stays secure and private. You may find the respective smartphone apps in the [Apple App Store (iOS)](https://itunes.apple.com/us/app/mqttitude/id692424691?mt=8) or in the [Google Play Store (Android)](https://play.google.com/store/apps/details?id=org.owntracks.android).

![Number of Installations](http://iobroker.live/badges/owntracks-installed.svg)
![Stable version](http://iobroker.live/badges/owntracks-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.owntracks.svg)](https://www.npmjs.com/package/iobroker.owntracks)
[![Travis CI](https://travis-ci.org/iobroker-community-adapters/ioBroker.owntracks.svg?branch=master)](https://travis-ci.org/iobroker-community-adapters/ioBroker.owntracks)
[![Downloads](https://img.shields.io/npm/dm/iobroker.owntracks.svg)](https://www.npmjs.com/package/iobroker.owntracks)

[![NPM](https://nodei.co/npm/iobroker.owntracks.png?downloads=true)](https://nodei.co/npm/iobroker.owntracks/)


**Table of contents**
1. [Features](#1-features)
2. [Setup instructions](#2-setup-instructions)
   1. [using MQTT server](#21-connection-configuration-using-mqtt-server)
   2. [using MQTT client](#22-connection-configuration-using-mqtt-client)
   3. [additional configuration](#23-Additional-configuration-using-either-mqtt-server-or-client)
3. [Channels & States](#3-channels--states)
   1. [Locations](#31-locations)
   2. [Users](#32-users)
4. [Changelog](#changelog)
5. [Licence](#license)


## 1. Features
tbd

## 2. Setup instructions
You have to setup ioBroker.owntracks in connection with the [MQTT adapter](https://github.com/ioBroker/ioBroker.mqtt), which will be installed as a dependency. The MQTT adapters may be setup as either a MQTT server or as a MQTT client.

The following tables shows a comparision:

| Method | Advantages / Disadvantages |
| ------ | ------------- |
| MQTT server | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) fully encrypted payload possible<br>![#f03c15](https://placehold.it/15/f03c15/000000?text=+) setup of an [dynamics DNS (DynDNS)](https://en.wikipedia.org/wiki/Dynamic_DNS) required<br>![#f03c15](https://placehold.it/15/f03c15/000000?text=+) open Port in your router configuration necessary for communication ([read more here](https://owntracks.org/booklet/guide/broker/#firewall)) |
| MQTT client | ![#c5f015](https://placehold.it/15/c5f015/000000?text=+) fully encrypted payload possible<br>![#f03c15](https://placehold.it/15/f03c15/000000?text=+) usage of an Internet MQTT means all traffic is routed through an unknown provider ([read more here](https://owntracks.org/booklet/guide/scenarios/#mqtt-mode))<br>![#f03c15](https://placehold.it/15/f03c15/000000?text=+) support for TLS only possible if available at the respective provider |

**IMPORTANT NOTE:** The states within ioBroker.owntracks will be generated when the specific payload is received! This means the locations in ioBroker will be generated **the first time the user leaves or enters the location**.
Below you will see the target structure ([see Channels & States for detailed list](#channels--states)):

[![Structure](img/structure.png)](img/structure.png)

### 2.1. Connection configuration (using MQTT server)
You have to complete the following steps in order to setup ioBroker.owntracks via MQTT server:
1. Setup a DynDNS pointing to your IP address as well as open a port in your router
2. Configure MQTT adapter as server with the respective port
3. Configure all clients with the server settings

#### 2.1.1. Setup DynDNS and port
When setting up a local MQTT server within ioBroker, it is necessary to setup a dynamic DNS (DynDNS) which always points to your current IP address as well as open a port in your router for communication purposes.

Thus, setup a DynDNS of your choice, which points to your IP address, for example https://www.noip.com/.
Sign up to create an account and choose a hostname of your choice, e.g. `example.ddns.net`. Please keep in mind that these hostnames will expire on the free account after 30 days, which means you have to regulary login to keep them activated.

Once the DynDNS is setup, configure your router to update the DynDNS respectively.
If you own a FRITZ!Box, navigate to `Internet` - `Freigaben` - `DynDNS` and configure it according to your credentials:

[![MQTT Server - Router DynDNS configuration](img/mqtt_server_router_dyndns.png)](img/mqtt_server_router_dyndns.png)

Furthermore,  open a port on your router, which points to the local IP address of your ioBroker.
Do this by navigating to `Internet` - `Freigaben` - `Portfreigaben` and choose `Gerät für Freigaben hinzufügen`. Choose your ioBroker instance in the field `Gerät` and click `Neue Freigabe`:

[![MQTT Server - Router Port configuration](img/mqtt_server_router_adddevice.png)](img/mqtt_server_router_adddevice.png)

In the popup, choose `Portfreigabe` and then
- select `Andere Anwendung`,
- type in any name in the field `Bezeichnung`,
- select `TCP` as protocol,
- type in your desired port in all `port` fields (e.g. 1987).

[![MQTT Server - Router Port configuration](img/mqtt_server_router_port.png)](img/mqtt_server_router_port.png)

Save everything and you're done with this step.

#### 2.1.2. Configure MQTT and Owntracks adapter
Now, go to ioBroker and create a new instance of the MQTT adapter.
As type select `Server/Broker` and type in the port choosen above, which has been opened in your router configuration (e.g. 1987). 

[![MQTT Server Connection configuration](img/mqtt_server_connection.png)](img/mqtt_server_connection.png)

Choose any `User` and `Password` of your choice in the `Authentication settings` section. These are required for the next step.

Change to _MQTT SETTINGS_ tab within ioBroker.mqtt and change the following settings:

| Setting | Configuration | Note |
| ------- | ------------- | ---- |
| Prefix for all topics | _leave empty_ | |
| Mask to publish own states | mqtt.0.* | Replace 0 with your ioBroker.mqtt instance |
| Publish only on change | `yes` | |
| Publish own states on connect | `yes` | |
| Publish states on subscribe | `yes` | |
| Trace output for every message | `no` | |
| Send states (ack=true) too | `no` | |
| Use different topic names for set and get | `no` | |

Finally, choose the configured MQTT instance within the ioBroker.owntracks adapter and optionally (but __highly recommended__) set an encryption key of your choice:

[![Owntracks Adapter settings](img/owntracks_server_settings.png)](img/owntracks_server_settings.png)

#### 2.1.3. Configure all clients
The following preferences have to be set in the Android / iOS app:

| Android Setting | Configuration |
| ------- | ------------- |
| Connection/Mode | `MQTT private` |
| Connection/Host/Host | DynDNS address setup in first step |
| Connection/Host/Port | Port you have chosen (e.g. `1987`) |
| Connection/Host/WebSockets | `false` (unless you know what you're doing) |
| Connection/Identification/Username | The `User` you have chosen in the previous step |
| Connection/Identification/Password | The `Password` you have chosen in the previous step |
| Connection/Identification/DeviceID | Name of device or person (can be anything) |
| Connection/Identification/TrackerID | Initials of device or person to write it on map (can be anything) |
| Connection/Security/TLS | `off` |
| Advanced/Encryption Key | __highly recommended__: Passphrase for encryption (chosen in the previous step) |

Finally, verify if Owntracks is connected to the ioBroker instance via the "Status" entry in the drawer:

![Connection](img/connection.jpg)

If everything has been setup successfully, ioBroker.owntracks will create the channels and states found below.

### 2.2. Connection configuration (using MQTT client)
You have to complete the following steps in order to setup ioBroker.owntracks via MQTT client:
1. Setup an external MQTT server hosted online, e.g. [CloudMQTT](https://www.cloudmqtt.com/)
2. Configure MQTT Cloud Broker and setup / authenticate clients
3. Configure MQTT adapter as client with the respective settings (URL, Port and Authentication of ioBroker)
4. Configure all clients with the server settings

#### 2.2.1. Setup external MQTT server
Go to [https://www.cloudmqtt.com/](https://www.cloudmqtt.com/) and sign up with a new account.
Create a new instance, select a plan (Free plan called _Cute Cat_ works fine) and name it _ioBroker_:

![CloudMQTT Account](img/cloudmqtt_account.png)

Go to the next step by clicking _Select Region_ and select the data center near you, e.g. _EU-West-1 (Ireland)_:

![CloudMQTT Region](img/cloudmqtt_region.png)

Verify your settings by clicking _Review_ and finally _Create Instance_.

#### 2.2.2. Configure MQTT Cloud Broker
After creating the instance, go to _SETTINGS_ and set `Use username as clientid` to `Yes`:

![CloudMQTT Settings](img/cloudmqtt_settings.png)

__Most importantly__, go to _USERS & ACL_ and add your desired users for the clients you are using (e.g. smartphones) and furthermore, add a specific user for your ioBroker:

![CloudMQTT Users](img/cloudmqtt_users.png)

Finally, add the necessary _ACL_ for the respective users further below on the same page. Do this by
1. select `topic`
2. select the user
3. type in the pattern `owntracks/#`
4. select both `read` and `write`

Your result should look like:

![CloudMQTT ACL](img/cloudmqtt_acl.png)

You have successfully setup CloudMQTT, you will receive messages which can be viewed via _WEBSOCKET UI_.

#### 2.2.3. Configure MQTT adapter
For this step, you will find the necessary information in the _DETAILS_ section of CloudMQTT:

![CloudMQTT Details](img/cloudmqtt_details.png)

After setting up your MQTT Cloud Broker, go to ioBroker and setup a MQTT instance.
The following tables shows the mapping from the CloudMQTT details page to your ioBroker.mqtt configuration:

| CloudMQTT setting | ioBroker.MQTT configuration | Example |
| ----------------- | --------------------------- | ------- |
| Server | URL | `m24.cloudmqtt.com` |
| SSL Port | Port | `24247` |
| - | Secure | `yes` |

For _Authentication settings_ you may use any user which has been authorized on CloudMQTT via _ACL_ (see above).
Change to _MQTT SETTINGS_ tab within ioBroker.mqtt and change the following settings:

| Setting | Configuration | Note |
| ------- | ------------- | ---- |
| Subscribe patterns | `#` | |
| Prefix for all topics | _leave empty_ | |
| Mask to publish own states | mqtt.0.* | Replace 0 with your ioBroker.mqtt instance |
| Publish only on change | `yes` | |
| Publish own states on connect | `yes` | |
| Trace output for every message | `no` | |
| Send states (ack=true) too | `no` | |
| Use different topic names for set and get | `no` | |
| Client ID | `iobroker` | __This user has to be authorized via _ACL_ on CloudMQTT__ |
| Publish only on change | `yes` |

Finally, go to your ioBroker.owntracks instance and select the configured MQTT instance as well 

Finally, choose the configured MQTT instance within the ioBroker.owntracks adapter and optionally (but __highly recommended__) set an encryption key of your choice:

[![Owntracks Adapter settings](img/owntracks_client_settings.png)](img/owntracks_client_settings.png)

#### 2.2.4. Configure all clients
The following preferences have to be set in the Android / iOS app:

| Android Setting | Configuration |
| ------- | ------------- |
| Connection/Mode | `MQTT private` |
| Connection/Host/Host | CloudMQTT Server addres (e.g. `m24.cloudmqtt.com`) |
| Connection/Host/Port | CloudMQTT Sevrer port (e.g. `24247`) |
| Connection/Host/WebSockets | `false` |
| Connection/Identification/Username | A `User` that has been setup via _ACL_ in step 2 (see above) |
| Connection/Identification/Password | Respective `Password` of that user |
| Connection/Identification/DeviceID | Name of device or person (can be anything) |
| Connection/Identification/TrackerID | Initials of device or person to write it on map (can be anything) |
| Connection/Security/TLS | `off` (unless you have a paid plan) |
| Advanced/Encryption Key | __highly recommended__: Passphrase for encryption (chosen in the previous step) |

Finally, verify if Owntracks is connected to the ioBroker instance via the "Status" entry in the drawer:

![Connection](img/connection.jpg)

If everything has been setup successfully, ioBroker.owntracks will create the channels and states found below.


### 2.3. Additional configuration (using either MQTT server or client)

#### 2.3.1 Avatar configuration (within the ioBroker.owntracks adapter)
You can define for every user an icon. Just upload per drag&drop or with mouse click you image. It will be automatically scaled to 64x64.
__The name must be equal to DeviceID in OwnTracks app.__

#### 2.3.2 Regions configuration
To setup locations within the owntracks adapter, you have to create regions in the owntracks Android / iOS app.
To do so, go to "Regions" in the drawer

![Regions](img/regions1.jpg)

Create a new region by clicking the plus (+) in the top right corner

![Regions](img/regions2.jpg)

Use the location button in the top right corner to retrieve current location or type them in Latitude and Longitude yourself. Furthermore, specify a radius for the location. If you share the location, your Friends (see in the drawer of the Android / iOS app) get a notification when you enter / leave a location. 

![Regions](img/regions3.jpg)


## 3. Channels & States
If you successfully setup ioBroker.owntracks, the following channels and states will be created **when the respective payload has been received**:

### 3.1. Locations
For each location within `locations.<locationId>`

| State | Description (possbile Values) |
|:----- |:----------------------------- |
| ```accuracy``` | Accuracy of the geographical coordinates of location |
| ```creation``` | Timestamp of creation time of location |
| ```creationDatetime``` | Date-Time of creation time of location |
| ```history``` | History of users entering / leaving location |
| ```locationId``` | Location ID of location |
| ```locationName``` | Location name of location |
| ```presence``` | Indicator whether any user is present in location [```true``` or ```false```] |
| ```refreshed``` | Timestamp of last change within the location |
| ```refreshedDatetime``` | Date-Time of last change within the location |
| ```users``` | Present users in location |

### 3.2. Users
For each user within `locations.<userId>`

| Channel | State | Description (possbile Values) |
|:------- |:----- |:----------------------------- |
| ```location``` | ```current``` | Current location of the user |
| ```location``` | ```entered``` | Timestamp the user has entered the current location |
| ```location``` | ```enteredDatetime``` | Date-Time the user has entered the current location |
| ```location``` | ```history``` | History of the user entering / leaving locations |
| ```location``` | ```last``` | Last location of the user |
| ```location``` | ```left``` | Timestamp the user has left the last location |
| ```location``` | ```leftDatetime``` | Date-Time the user has left the last location |
| - | ```accuracy``` | Accuracy of Latitude / Longitude |
| - | ```alt_accuracy``` | Accuracy of Altitude |
| - | ```altitude``` | Altitude |
| - | ```battery``` | Device battery level for the user |
| - | ```connection``` | Connection type of the user<br>- ```w```: phone is connected to a WiFi connection<br>- ```o```: phone is offline<br>- ```m```: mobile data |
| - | ```encryption``` | Encryption status for the user [```true``` or ```false```] |
| - | ```latitude``` | Latitude |
| - | ```longitude``` | Longitude |
| - | ```refreshed``` | Timestamp of last refresh |
| - | ```refreshedDatetime``` | Date-Time of last refresh |
| - | ```userConnected``` | Connection status of the user [```true``` or ```false```] |
| - | ```userId``` | User ID of the user |
| - | ```userName``` | User name of the user |
| - | ```userTid``` | Tracker ID of the user |
| - | ```velocity``` | Velocity for the user |


## Changelog

### 1.0.0-beta.3 (2019-05-XX) [IN DEVELOPMENT]
- (zefau) FEATURE: Regions can now be maintained through ioBroker and published / received from all connected clients
   - (zefau) FEATURE: added possibilty to publish all regions / waypoints from Android / iOS to ioBroker
   - (zefau) FEATURE: added possibilty to publish regions / waypoints from ioBroker to all conneced clients

### 1.0.0-beta.2 (2019-05-14)
- (zefau) BUG: fixed issue with deeply nested history on both locations and users
- (zefau) BUG: fixed issue with transition event being reported multiple times

### 1.0.0-beta.1 (2019-05-01)
Refactored entire code and removed all MQTT package dependencies (to avoid / fix security issues and reduce complexity). Thus, added [MQTT adapter as dependency](https://github.com/ioBroker/ioBroker.mqtt) to manage all MQTT communication.
This major change comes with the following advantages:
- use both MQTT server as well as MQTT client (to use Internet MQTT server, such as [CloudMQTT](https://www.cloudmqtt.com/)) functionality (this adapter subscribes to foreign states of MQTT adapter)
- user avatars available in both server and client variant
- support TLS and websockets


## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

Copyright (c) 2016-2019 bluefox <dogafox@gmail.com>

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
