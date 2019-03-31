![logo](admin/egigeozone.png)
# ioBroker.egigeozone

![Number of Installations](http://iobroker.live/badges/egigeozone-installed.svg) ![Number of Installations](http://iobroker.live/badges/egigeozone-stable.svg) 
[![NPM version](https://img.shields.io/npm/v/iobroker.egigeozone.svg)](https://www.npmjs.com/package/iobroker.egigeozone)
[![Downloads](https://img.shields.io/npm/dm/iobroker.egigeozone.svg)](https://www.npmjs.com/package/iobroker.egigeozone)
[![Dependency Status](https://img.shields.io/david/basgo/iobroker.egigeozone.svg)](https://david-dm.org/basgo/iobroker.egigeozone)


[![NPM](https://nodei.co/npm/iobroker.egigeozone.png?downloads=true)](https://nodei.co/npm/iobroker.egigeozone/)

**Tests:** Linux/Mac: [![Travis-CI](https://img.shields.io/travis/BasGo/ioBroker.egigeozone/master.svg)](https://travis-ci.org/BasGo/ioBroker.egigeozone)
Windows: [![Build status](https://ci.appveyor.com/api/projects/status/eobyt279ncmd9qbi/branch/master?svg=true)](https://ci.appveyor.com/project/BasGo/iobroker-egigeozone/branch/master)

# Description
This is an ioBroker adapter for Android geofencing app "EgiGeoZone" ([website](https://egigeozone.de/)). It is able to receive geofence events as HTTP requests when entering or leaving a defined area with your mobile device.

# Security advice
It is not recommended to expose this adapter to the public internet (e.g. by opening the configured port in your router). This means that any request to this port will be forwarded to the ioBroker instance the adapter is running on. There are multiple options for gaining more security for accessing this adapter:
* Always use a VPN connection for requests or
* integrate a proxy server (e.g. nginx) for filtering incoming requests.

# Configuration

Inside EgiGeoZone the URL should be defined using the following syntax:

protocol://address:port/person

* **protocol** could be **http** or **https**.
* **address** should be the address where the adapter instance is accessible.
* **port** should be the port the adapter is listening on.
* **person** is the person which will be used to list inside the atHome array.

### Examples
* https://my-domain:7654/John or
* http://my-domain:7654/Paul

# Changelog

### 0.1.2
* (BasGo) Changed icon
* (BasGo) Updated NPM reference

### 0.1.1
* (BasGo) Added whitespace handling for home location

### 0.1.0
* (BasGo) Fixed issue with authorization
* (BasGo) Added description for URL configuration

### 0.0.2
* (BasGo) Updated NPM reference

### 0.0.1
* (BasGo) Initial release

# License
This adapter is licensed under the [MIT license](../blob/master/LICENSE) which is part of this repository.

# Credits
The implementation is mostly based on dschaedls [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) adapter. The logo has been taken from [Free Icons PNG](http://www.freeiconspng.com/images/maps-icon) and has been modified to have a transparent background.
