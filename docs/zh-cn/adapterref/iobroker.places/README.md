---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.places/README.md
title: ioBroker.places
hash: 699AW5/zj67nyWmkPFOvuPyuzBD73yQJbVkav9B3qHk=
---
![商标](../../../en/adapterref/iobroker.places/admin/places.png)

![安装数量](http://iobroker.live/badges/places-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.places.svg)
![依赖状态](https://img.shields.io/david/basgo/iobroker.places.svg)
![下载](https://img.shields.io/npm/dm/iobroker.places.svg)
![Github问题](http://githubbadges.herokuapp.com/BasGo/ioBroker.places/issues.svg)
![特拉维斯-CI](https://img.shields.io/travis/BasGo/ioBroker.places/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/eobyt279ncmd9qbi/branch/master?svg=true)

#ioBroker.places
##说明
这是一个ioBroker适配器，用于处理位置信息消息，其中应包含用户，地理位置和时间戳作为最小值。适配器分析位置信息是否在ioBroker的位置配置或其他可选位置周围的半径内。

##配置
只有一个强制配置值：半径（米），用于标识用户的当前位置。 ioBroker的位置用于识别“在家”的用户，其他地方可以作为配置的一部分添加。

* **半径**（_mandatory_）应该是用于检查用户是否在特定位置（家庭或自定义）的半径（以米为单位）。

* **家庭名称**可用于为家庭场所设置自定义名称。

* ** Google Maps API密钥**将用于启用地理编码。在打开配置页面时，将从配置的vis-map实例（如果可用）中获取缺少的API密钥。

* **可以激活Google地图地理编码**以获取所提供地理位置的真实地址和高程。

* **地方**是一个灵活的列表，其中包含自定义地点，其中每个地方应具有名称，纬度和经度的有效值。

* **用户**是一个包含用户映射的灵活列表。

##用法
要处理位置更新，只需使用以下语法发送消息：

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

##返回消息的结构
以下块显示了响应消息的外观。对于每个值，ioBroker对象树具有相应的状态。

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

##示例：OwnTracks + ioBroker.iot + ioBroker.places
### 1.配置iobroker.iot
在**白名单**下添加自定义服务** xyz **。

### 2.配置OwnTracks移动应用程序
将模式更改为** HTTP Private **并使用以下地址作为**主机**：https：//iobroker.pro/service/custom_xyz/ <user-app-key>

### 3.配置iobroker.places
在选项卡集成上，您必须选择云适配器的实例，并选择** xyz **作为服务。适配器将侦听传入的服务请求并开始处理。

##示例：Telegram + ioBroker.telegram + ioBroker.places
### 1.配置iobroker.telegram
启用**存储原始请求**的选项。

### 2.创建脚本（ioBroker.javascript）
创建一个包含原始请求订阅的短脚本，例如。来自** telegram.0.communicate.requestRaw **，并向iobroker.places（或其实例）发送一个新的请求对象：

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

##学分
该实现部分基于dschaedls[ioBroker.geofency]（https://github.com/ioBroker/ioBroker.geofency）适配器。该徽标取自[免费图标PNG](http://www.freeiconspng.com/images/maps-icon)，并已被修改为具有透明背景。

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

## License

This adapter is licensed under the [MIT License](../blob/master/LICENSE) which is part of this repository.

Copyright (c) 2018-2019 BasGo <basgo@gmx.de>