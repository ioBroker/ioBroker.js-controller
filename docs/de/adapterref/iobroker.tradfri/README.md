---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tradfri/README.md
title: ioBroker.tradfri
hash: wCRFsvNTOwcQ7dNNzURGLTQpKapsCsi2SxdETCGwcDM=
---
![Logo](../../../en/adapterref/iobroker.tradfri/admin/tradfri.png)

![Total Warnungen](https://img.shields.io/lgtm/alerts/g/AlCalzone/ioBroker.tradfri.svg?logo=lgtm&logoWidth=18)
![Anzahl der Installationen](http://iobroker.live/badges/tradfri-stable.svg)

# IoBroker.tradfri
![Build Status](https://action-badges.now.sh/AlCalzone/ioBroker.tradfri)

## Bedarf
* Linux (z. B. Raspberry Pi) / OSX / Windows
* NodeJS> = 6.x
* Trådfri Gateway

## Installation
1. Installieren Sie diesen Adapter über die iobroker Admin-GUI oder über `npm install iobroker.tradfri --production`
1. Fügen Sie in der ioBroker-GUI eine Adapterinstanz hinzu.
1. Konfigurieren Sie die Instanz, indem Sie die IP-Adresse / den Hostnamen Ihres Gateways und den Sicherheitscode eingeben, der sich auf dem Etikett unten befindet.

### Fehlerbehebung bei Installationsproblemen:
#### Linux / OSX:
Stellen Sie sicher, dass Sie die neueste veröffentlichte Version installieren. Wenn Kompilierungsfehler auftreten, müssen Sie möglicherweise build-essential installieren:

```
apt-get -y install build-essential
```

#### Windows:
Wenn Sie mit älteren NodeJS-Versionen (<10) arbeiten, schlägt die Installation möglicherweise mit dem folgenden Fehler im Protokoll fehl:

```
Can't find Python executable "python", you can set the PYTHON env variable.
```

Öffnen Sie eine Verwaltungsshell, um das Problem zu lösen:

1. <kbd>Drücken Sie die Windows-</kbd> Taste
2. Geben Sie &quot;cmd&quot; ein und drücken Sie <kbd>Strg</kbd> + <kbd>Umschalt</kbd> + <kbd>Eingabetaste</kbd>
3. Bestätigen Sie die UAC-Eingabeaufforderung

und führen Sie den folgenden Befehl aus:

```
npm install --add-python-to-path --global windows-build-tools
```

Dies kann eine Weile dauern ... danach sollte die Installation erfolgreich sein.

## Senden von benutzerdefinierten CoAP-Paketen
Mit `sendTo` können Sie benutzerdefinierte CoAP-Pakete von anderen Adaptern senden. Beispiel aus JavaScript:

```js
sendTo("tradfri.0", "request", options, (ret) => {
	// do something with the result
});
```

Das Objekt `options` sieht folgendermaßen aus:

```js
{
	path: string,
	method?: "get" | "post" | "put" | "delete", // optional, default = "get"
	payload?: object                            // optional, should be a JSON object
}
```

Das Ergebnisobjekt `ret` sieht folgendermaßen aus:

```js
{
	error: string | null,
	result: {
		code: string,            // see https://tools.ietf.org/html/rfc7252#section-12.1.2
		payload: object | Buffer
	}
}
```

## Changelog

### 2.5.1 (2019-12-23)
* Made it possible to operate plugs using virtual groups

### 2.5.0 (2019-12-22)
* Allow more device types in virtual groups

### 2.4.7 (2019-11-18)
* Fixed small display issues with 3rd party bulbs

### 2.4.6 (2019-11-15)
* Group states for blinds are now synchronized correctly

### 2.4.5 (2019-11-07)
* Fix: Suppress log warnings for motion sensors

### 2.4.4 (2019-10-11)
* Fix: Suppress log warnings for slave remotes and signal repeaters

### 2.4.3 (2019-09-22)
* Fix: Operate blinds when states are changed

### 2.4.2 (2019-09-22)
* Fix: Also create objects for blinds

### 2.4.0 (2019-08-18)
* Add support for blinds

### 2.3.0 (2019-04-05)
* The gateway can now be discovered automatically

### 2.2.0 (2019-02-25)
* Expose the battery percentage for devices with a battery

### 2.1.0 (2019-01-08)
* When `node-aead-crypto` is not installed, display instructions on how to fix it
* Optimizations and fixes under the hood
* Support for compact mode

### 2.0.0 (2018-05-14)
* Support for Admin v3 and material design
* **BREAKING:** Dropped support for Admin v2

### 1.5.4 (2018-11-11)
* Fix handling of decimal digits in the adapter settings. This fixes rounding of group states.

### 1.5.2 (2018-11-06)
* Reworked installation procedure to fix problems with `node-aead-crypto`

### 1.5.1 (2018-10-29)
* Added experimental support for smart plugs

### 1.4.0 (2018-05-14)
* The names of state objects no longer get overwritten

### 1.3.0 (2018-05-06)
* Reduce logging of "updated scenes for group..."
* Made rounding of numeric values configurable
* Stability improvements

### 1.2.1 (2018-05-01)
* Use the native encryption methods of NodeJS 10 instead of `node-aead-crypto`

### 1.1.11 (2018-04-27)
* Add support for NodeJS 10

### 1.1.10 (2018-03-18)
* Improved automatic reconnection

### 1.1.9 (2018-03-15)
* Fixed group states not always updating the lightbulbs when changed

### 1.1.8 (2018-03-09)
* Ignore minimum brightness reports when lights are turned off

### 1.1.7 (2018-02-23)
* Fixed activation of scenes when the scene is already selected

### 1.1.6 (2018-02-22)
* Fixes for RGB support
* Support for floating point values

### 1.1.3 (2018-02-15)
* Update `node-tradfri-client` version for better RGB support and floating point values

### 1.1.1 (2018-02-07)
* Attempt to fix `TypeError: generator already running`

### 1.1.0 (2018-02-07)
* Added an option to preserve the transition duration for single lightbulbs

### 1.0.7 (2018-02-05)
* Fixed an error loading virtual groups

### 1.0.6 (2018-01-13)
* Update `node-tradfri-client` version

### 1.0.5 (2018-01-13)
* Removed error in log on adapter startup
* Change brightness role for better compatibility with the cloud adapter

### 1.0.4 (2018-01-10)
* Removed warning caused by Gateway v1.3.14

### 1.0.3 (2018-01-07)
* Updated `node-tradfri-client` version
* Load objects on adapter start so they don't get overwritten (#35)

### 1.0.2 (2017-12-28)
* New attempt at automatically restarting the adapter on connection loss

### 1.0.1 (2017-12-25)
* Update `node-tradfri-client` dependency to support receiving blockwise messages

### 1.0.0 (2017-11-19)
* This is stable enough for a 1.x version
* Improved browser compatiblity of the admin UI

### 0.6.0 (2017-11-07)
* Moved tradfri-related code into its own library
* Changed authentication procedure to comply with IKEA's request

### 0.5.5 (2017-10-31)
* Restored compatibility to Gateway version 1.2.42

### 0.5.4 (2017-10-29)
* Brightness is now expressed in 0..100%
* Fixed parsing RGB colors

### 0.5.3 (2017-10-28)
* Fixed transition duration for groups

### 0.5.2 (2017-10-28)
* Added icons for devices

### 0.5.1 (2017-10-28)
* Support virtual groups
* Validate hex colors on input

### 0.4.5 (2017-10-20)
* RGB and connection fixes.

### 0.4.3 (2017-10-17)
* Experimental support for RGB and lightbulbs with fixed color

### 0.3.4 (2017-10-17)
* Disabled automatic restart on connection loss.

### 0.3.3 (2017-10-07)
* Eliminated potential sources of infinite loops

### 0.3.2 (2017-10-04)
* Fixed an error resulting from the upgrade to ES2015 output

### 0.3.1 (2017-10-02)
* Update CoAP library to fix a bug

### 0.3.0 (2017-09-25)
* official release of the previous changes
* added transition duration and brightness change for groups
* monitor connection state and update info.connection
* fix connection attempts to unavailable endpoints

### 0.2.9 (2017-09-25)
* Support changing the transition duration

### 0.2.8 (2017-09-24)
* Fixed group and scene deletion

### 0.2.7 (2017-09-23)
* Update CoAP and DTLS library for the next features
* Offloaded concurrency handling to CoAP lib

### 0.2.5 (2017-09-12)
* Selection of scenes from the admin UI is now possible

### 0.2.4 (2017-09-11)
* Add support for groups (renaming, switching)
* Partial support for scenes (switching when id is known)

### 0.2.3 (2017-09-11)
* Send custom CoAP packets by using sendTo

### 0.2.2 (2017-09-10)
* Changed internal handling of objects to prepare the next updates

### 0.2.1 (2017-08-26)
* Sync io-package and package version

### 0.2.0 (2017-08-14)
* Remove git dependency, publish on npm

### 0.1.5 (2017-08-14)
* Ensure only whole numbers are sent (fixes #6)
* Fix connection to the gateway using the hostname

### 0.1.4 (2017-08-12)
* Switched to TypeScript

### 0.1.3 (2017-07-21)
* Reboot of the adapter without 3rd party libraries.

### 0.1.2 (2017-05-06)
* Color temperature of lightbulbs is now expressed in terms of 0 (cold) - 100% (warm).

### 0.1.1 (2017-05-04)
* Added support for NodeJS 4.X and building the dependencies on Windows systems

### 0.1.0 (2017-05-02)
* initial release. 
* Functionality limited to controlling lightbulbs.

### 0.0.0
* not ready yet!

## License
The MIT License (MIT)

Copyright (c) 2017-2019 AlCalzone <d.griesel@gmx.net>

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