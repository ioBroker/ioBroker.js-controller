---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.egigeozone/README.md
title: ioBroker.egigeozone
hash: RA1yeaAyhKiG1Wa1zx6oqvF/MTg5TbZcvvOx0RM6Dco=
---
![安装数量](http://iobroker.live/badges/egigeozone-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.egigeozone.svg)
![下载](https://img.shields.io/npm/dm/iobroker.egigeozone.svg)
![依赖状态](https://img.shields.io/david/basgo/iobroker.egigeozone.svg)
![NPM](https://nodei.co/npm/iobroker.egigeozone.png?downloads=true)
![特拉维斯-CI](https://img.shields.io/travis/BasGo/ioBroker.egigeozone/master.svg)
![建立状态](https://ci.appveyor.com/api/projects/status/eobyt279ncmd9qbi/branch/master?svg=true)

＃ioBroker.egigeozone
＃说明
这是适用于Android地理围栏应用程序“EgiGeoZone”的ioBroker适配器（[网站](https://egigeozone.de/)）。当您使用移动设备进入或离开指定区域时，它可以将HTTP地址信息作为HTTP请求接收。

＃安全建议
建议不要将此适配器暴露给公共Internet（例如，通过打开路由器中配置的端口）。这意味着对此端口的任何请求都将转发到运行适配器的ioBroker实例。有多种选项可以获得访问此适配器的更多安全性：

*始终使用VPN连接进行请求或
*集成代理服务器（例如nginx）以过滤传入的请求。

＃配置
在EgiGeoZone内部，应使用以下语法定义URL：

协议：//地址：端口/人

* **协议**可以是** http **或** https **。
* **地址**应该是可以访问适配器实例的地址。
* **port** 该是适配器正在侦听的端口。
* **person** 用于在atHome数组中列出的人。

＃＃＃ 例子
* https：// my-domain：7654 / John或
* http：// my-domain：7654 / Paul

#Credits
该实现主要基于dschaedls[ioBroker.geofency]（https://github.com/ioBroker/ioBroker.geofency）适配器。该徽标取自[免费图标PNG](http://www.freeiconspng.com/images/maps-icon)，并已修改为具有透明背景。

## Changelog

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

## License
This adapter is licensed under the [MIT license](../blob/master/LICENSE) which is part of this repository.