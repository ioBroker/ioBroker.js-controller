![Logo](admin/places.png)
# ioBroker.places
![Number of Installations](http://iobroker.live/badges/places-installed.svg) ![Number of Installations](http://iobroker.live/badges/places-stable.svg) 
[![NPM version](https://img.shields.io/npm/v/iobroker.places.svg)](https://www.npmjs.com/package/iobroker.places)
[![Dependency Status](https://img.shields.io/david/basgo/iobroker.places.svg)](https://david-dm.org/basgo/iobroker.places)
[![Downloads](https://img.shields.io/npm/dm/iobroker.places.svg)](https://www.npmjs.com/package/iobroker.places)
[![Github Issues](http://githubbadges.herokuapp.com/BasGo/ioBroker.places/issues.svg)](https://github.com/BasGo/ioBroker.places/issues)
[![Travis-CI](https://img.shields.io/travis/BasGo/ioBroker.places/master.svg)](https://travis-ci.org/BasGo/ioBroker.places)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/eobyt279ncmd9qbi/branch/master?svg=true)](https://ci.appveyor.com/project/BasGo/iobroker-places/branch/master)

## Description
This is an ioBroker adapter for processing location information messages which should contain a user, a geoposition and a timestamp as minimum. The adapters analyzes whether the location information is within a radius around the location configuration of ioBroker or optional other places.

## Configuration

There is just one mandatory configuration value: the radius (meters) which will be used to identify the current location of a user. The location of ioBroker is used to identify users being "at home", other places can be added as part of the configuration.

* **Radius** (_mandatory_) should be the radius in meters used to check whether the user is at a specific place (home or custom).

* **Name for home** can be used to set a custom name for the home place.

* **Google Maps API key** will be used for enabling geocoding. A missing API key will be fetched from a configured vis-map instance (if available) when configuration page has been opened.

* **Google Maps Geocoding** can be activated to get a real address and an elevation for a provided geoposition.

* **Places** is a flexible list containing custom places where each place should have valid values for name, latitude and longitude.

* **Users** is a flexible list containing user mappings.

## Usage

To process location update just send a message using the following syntax:

```javascript
// send a message to all instances of places adapter
sendTo('locations', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
});

// send a message to a specific instance of places adapter adapter
sendTo('locations.0', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
});

// send a message to a specific instance and define a callback
sendTo('locations.0', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
}, function (res) { log(JSON.stringify(res)); });
```

## Structure for returned messages

The following block shows how response messages look like. For each value the ioBroker object tree has an according state.

```javascript
{
    "user":         "Name of person",       // name of person (may have been replaced by user mapping)
    "latitude":     50.9576191,
    "longitude":    6.8272409,
    "timestamp":    1520932471000,
    "date":         "2018-03-13 10:14:31",  // date extracted from timestamp
    "atHome":       false,                  // true if inside the configured radius around ioBroker
    "homeDistance": 104898,                 // distance in meters between position and ioBroker
    "name":         "",                     // name of place found within the configuration
    "address":      "",                     // readable address (if geocoding is active)
    "elevation":    "",                     // elevation in meters (if geocoding is active)
}
```

## Sample: OwnTracks + ioBroker.iot + ioBroker.places
### 1. Configure iobroker.iot
Add a custom services **xyz** under **White list for Services**.

### 2. Configure OwnTracks mobile apps
Change the mode to **HTTP Private** and use the following address as **Host** : https://iobroker.pro/service/custom_xyz/<user-app-key>

### 3. Configure iobroker.places
On the tab Integration you have to select the instance of the cloud adapter and **xyz** as service. The adapter will listen to incoming requests for the service and start the processing.


## Sample: Telegram + ioBroker.telegram + ioBroker.places
### 1. Configure iobroker.telegram
Enable the option to **store raw requests**.

### 2. Create script (ioBroker.javascript)
Create a short script with a subscription to the raw request, f.e. from **telegram.0.communicate.requestRaw**, and send a new request object to iobroker.places (or an instance of it):

```javascript
on({id: "telegram.0.communicate.requestRaw", change: "ne"}, function (obj) {
    var data = JSON.parse(obj.newState.val);
    if (data.from && data.location) {
        sendTo('places.0', {
            user: data.from.first_name, 
            latitude: data.location.latitude, 
            longitude: data.location.longitude, 
            timestamp: data.date
        }, function (res) { log('places analyzed telegram position as: ' + JSON.stringify(res)); });
    }
});
```

## Changelog

### 0.7.0 (2019-01-12)
* (BasGo) Added compact mode, replaced integration of iobroker.cloud with iobroker.iot

### 0.6.2 (2018-12-06)
* (bluefox) Error with blockly was fixed

### 0.6.1
* (BasGo) Added handling for invalid route details

### 0.6.0
* (BasGo) Changed implementation to use promises
* (BasGo) Added route details for driving home

### 0.5.1
* (BasGo) Extended help texts

### 0.5.0
* (BasGo) Added optional subscription for cloud adapter

### 0.4.2
* (BasGo) UI fixes

### 0.4.1
* (BasGo) Configuration dialog extended

### 0.4.0
* (BasGo) Google Maps can be used for configuration
* (BasGo) Geocoding can be activated

### 0.3.0
* (BasGo) Added user mappings

### 0.2.3
* (BasGo) Optimized state handling
* (BasGo) Added option to clear array

### 0.2.2
* (BasGo) Added check for newer entries

### 0.2.1
* (BasGo) Extended configuration

### 0.2.0
* (BasGo) Materialized admin page

### 0.1.1
* (BasGo) Fixed some smaller issues

### 0.1.0
* (BasGo) Initial release

## Credits
The implementation is partly based on dschaedls [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) adapter. The logo has been taken from [Free Icons PNG](http://www.freeiconspng.com/images/maps-icon) and has been modified to have a transparent background.

## License

This adapter is licensed under the [MIT License](../blob/master/LICENSE) which is part of this repository.

Copyright (c) 2018-2019 BasGo <basgo@gmx.de>