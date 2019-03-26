---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-map/README.md
title: 无题
hash: 9YHL7u/yclZHcz+CwIcipaC5BRtV+jdVagl34XqgvhQ=
---
![商标](../../../en/adapterref/iobroker.vis-map/admin/vis-map.png)ioBroker.vis-map ============

![安装数量](http://iobroker.live/badges/vis-map-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.vis-map.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-map.svg)
![NPM](https://nodei.co/npm/iobroker.vis-map.png?downloads=true)

![截图](../../../en/adapterref/iobroker.vis-map/img/widgets.png)

窗口小部件，可以在地图上显示坐标。
实际上只支持Open Stree Maps和Google。要使用Google地图，您应该获得Google地图的API密钥。
你可以得到它[这里](https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend&keyType=CLIENT_SIDE&reusekey=true)

##用法
你可以将经度和纬度分开，或者只是放入**经度**对象ID，其值如下：

 -  7.0001; 49.0000（经度;纬度）
 -  7,0001; 49,0000（经度;纬度）
 -  7.0001,49.0000（经度，纬度）
 -  49.0000,7.0001（纬度，经度+交换标志）
 -  49.0000; 7.0001（纬度;经度+交换标志）

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