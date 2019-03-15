![Logo](media/vis-map.png)
ioBroker.vis-map
============
[![NPM version](http://img.shields.io/npm/v/iobroker.vis-map.svg)](https://www.npmjs.com/package/iobroker.vis-map)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-map.svg)](https://www.npmjs.com/package/iobroker.vis-map)

[![NPM](https://nodei.co/npm/iobroker.vis-map.png?downloads=true)](https://nodei.co/npm/iobroker.vis-map/)


![Screenshot](img/widgets.png)

Widgets, that can show coordinates on a map. 
Actually supported only Open Stree Maps and Google. To use Google Maps you should get the API Key for google maps.
You can get it [here](https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend&keyType=CLIENT_SIDE&reusekey=true)

## Usage
You can bind longitude and latitude apart or just place into **longitude** the Object ID with the value like following:
- 7.0001;49.0000 (longitude ; latitude)
- 7,0001;49,0000 (longitude ; latitude)
- 7.0001,49.0000 (longitude , latitude)
- 49.0000,7.0001 (latitude , longitude + swap flag)
- 49.0000;7.0001 (latitude ; longitude + swap flag)

## Changelog
### 1.0.2 (2018-07-06)
- (bluefox) Event click on pins added

### 1.0.1 (2018-01-08)
- (bluefox) Fix error if coordinates are empty

### 1.0.0 (2017-09-26)
- (bluefox) allow to swap longitude and latitude

### 0.1.4 (2017-04-28)
- (bluefox) add traffic layer for google maps

### 0.1.3 (2016-09-04)
- (bluefox) fix google map max zoom

### 0.1.1 (2016-07-17)
- (bluefox) remove unused files

### 0.1.0 (2016-07-08)
- (bluefox) initial checkin

## License
 Copyright (c) 2016-2018 bluefox
 MIT
