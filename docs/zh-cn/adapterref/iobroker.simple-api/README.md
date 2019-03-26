---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.simple-api/README.md
title: 无题
hash: 4U8lJIIGxhn3k259eO/5z8wWg2VNx2dMx9JD1xBOJr0=
---
![商标](../../../en/adapterref/iobroker.simple-api/admin/simple-api.png)ioBrokersimple-api适配器=================

![安装数量](http://iobroker.live/badges/simple-api-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.simple-api.svg)
![下载](https://img.shields.io/npm/dm/iobroker.simple-api.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.simple-api.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.simple-api.png?downloads=true)

这是RESTFul接口，用于从ioBroker读取对象和状态，以及通过HTTP Get / Post请求写入/控制状态。

##用法
在浏览器中调用```http://ipaddress:8087/help```以获取有关API的帮助。结果是：

```
{
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID",
  "get": "http://ipaddress:8087/get/stateID/?prettyPrint",
  "getBulk": "http://ipaddress:8087/getBulk/stateID1,stateID2/?prettyPrint",
  "set": "http://ipaddress:8087/set/stateID?value=1&prettyPrint",
  "toggle": "http://ipaddress:8087/toggle/stateID&prettyPrint",
  "setBulk": "http://ipaddress:8087/setBulk?stateID1=0.7&stateID2=0&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&type=adapter&prettyPrint",
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint"
}
```

### GetPlainValue
打电话：

```
http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive
```

结果：

```
true
```

### Get
打电话：

```
http://ipaddress:8087/get/system.adapter.admin.0.alive
```

结果：

```
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

或致电例如：

```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```

结果：

```
{
  "val": true,
  "ack": true,
  "ts": 1442432238,
  "from": "system.adapter.admin.0",
  "lc": 1442431190,
  "expire": 28494,
  "_id": "system.adapter.admin.0.alive",
  "type": "state",
  "common": {
    "name": "admin.0.alive",
    "type": "boolean",
    "role": "indicator.state"
  },
  "native": {}
}
```

### GetBulk
    获取具有一个请求的许多状态，作为具有ID作为键的对象返回，并且将val / ts作为子对象返回

### Set
打电话：

```
http://ipaddress:8087/set/javascript.0.test?value=1
```

结果：

```
{"id":"javascript.0.test","value":1}
```

或致电例如：

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint
```

结果：

```
{
  "id": "javascript.0.test",
  "value": 1
}
```

当然数据点* javascript.0.test *必须存在。

###切换
    切换价值：

 - 布尔值：true => false，false => true
 - 无限制的数字：x => 100-x
 - 带限制的数字：x => max  - （x  -  min）

### SetBulk
    用一个请求设置许多状态。此请求也支持POST方法，因为POST数据应该在正文而不是URL。

### SetValueFromBody
    允许设置由POST正文内容设置的给定状态的值。

###对象
＃＃＃ 状态
＃＃＃ 救命
给出[这个](#usage)输出

##安装
```node iobroker.js add simple-api```

##用法
假设，我们没有安全性，服务器在默认端口8087上运行。

对于所有查询，可以指定状态的名称或ID。

对于返回JSON的每个requiest，您可以设置参数* prettyPrint *以获得人类可读形式的输出。

如果启用了身份验证，则必须使用其他两个字段： <pre> ？用户=管理员＆传= iobroker </pre>

### GetPlainValue
将状态值读为文本。您可以指定更多的ID除以分号

<pre> HTTP：// IP：8087 / getPlainValue / admin.0.memHeapTotal </pre>

<pre> 31.19 </pre>

<pre> http：// ip：8087 / getPlainValue / admin.0.memHeapTotal,admin.0.memHeapUsed </pre><pre> 31.19 17.52 </pre>

### Get
将状态和对象数据作为json读取。您可以指定更多的ID除以分号。
如果请求了多个ID，则将返回JSON数组。

<pre> HTTP：//本地主机：8087 / GET / admin.0.memHeapTotal / prettyPrint </pre>

<pre> {“val”：31.19，“ack”：true，“ts”：1423154619，“from”：“system.adapter.admin.0”，“lc”：1423153989，“_ id”：“system.adapter.admin。 0.memHeapTotal“，”type“：”state“，”common“：{”name“：”admin.0.memHeapTotal“，”type“：”number“，”role“：”indicator.state“，”unit“ “：”MB“，”history“：{”enabled“：true，”changesOnly“：true，”minLength“：480，”maxLength“：960，”retention“：604800，”debounce“：10000}}，”原生“：{}} </pre>

<pre> HTTP：// IP：8087 / GET / admin.0.memHeapTotal，admin.0.memHeapUsed / prettyPrint </pre><pre> [{“val”：31.19，“ack”：true，“ts”：1423154544，“from”：“system.adapter.admin.0”，“lc”：1423153989，“_ id”：“system.adapter.admin .0.memHeapTotal“，”type“：”state“，”common“：{”name“：”admin.0.memHeapTotal“，”type“：”number“，”role“：”indicator.state“，” unit“：”MB“，”history“：{”enabled“：true，”changesOnly“：true，”minLength“：480，”maxLength“：960，”retention“：604800，”debounce“：10000}}， “native”：{}}，{“val”：16.25，“ack”：true，“ts”：1423154544，“from”：“system.adapter.admin.0”，“lc”：1423154544，“_ id” ：“system.adapter.admin.0.memHeapUsed”，“type”：“state”，“common”：{“name”：“admin.0.memHeapUsed”，“type”：“number”，“role”： “indicator.state”，“unit”：“MB”，“history”：{“enabled”：true，“changesOnly”：true，“minLength”：480，“maxLength”：960，“retention”：604800，“ debounce“：10000}}，”native“：{}}] </pre>

### GetBulk
使用时间戳读取更多ID的状态。您可以指定更多的ID除以分号。
始终返回JSON数组。

<pre> HTTP：// IP：8087 / GETBULK / admin.0.memHeapTotal，admin.0.memHeapUsed / prettyPrint </pre>

<pre> {“admin.0.memHeapTotal”：{“val”：31.19，“ts”：1423154754}，“admin.0.memHeapUsed”：{“val”：15.6，“ts”：1423154754}} </pre>

### Set
写入具有指定ID的状态。你可以用毫秒来指定* wait *选项来等待驱动程序的回答。

<pre> HTTP：// IP：8087 /组/ HM-rpc.0.IEQ12345.LEVEL值= 1＆prettyPrint </pre><pre> {“id”：“hm-rpc.0.IEQ12345.LEVEL”，“value”：1} </pre>

<pre> HTTP：// IP：8087 /组/ HM-rpc.0.IEQ12345.LEVEL值= 1＆等待= 5000＆prettyPrint </pre><pre> {“val”：1，“ack”：true，“ts”：1423155399，“from”：“hm-rpc.0.IEQ12345.LEVEL”，“lc”：1423155399} </pre>

如果在指定时间内没有收到答案，则返回* null *值。
在第一种情况下，答案将立即返回，* ack *为false。在第二种情况下* ack *为真。这意味着它是来自司机的回应。

### SetBulk
 - 在一个请求中写入大量ID。

<pre> HTTP：// IP：8087 / setBulk HM-rpc.0.FEQ1234567：1.LEVEL = 0.7＆Anwesenheit = 0＆prettyPrint </pre><pre> [{“id”：“hm-rpc.0.FEQ1234567：1.LEVEL”，“val”：“0.7”}，{“error”：“error：datapoint \”Anwesenheit \“not found”}] </pre>您也可以将此请求作为POST发送。

###对象
获取模式的所有对象的列表。如果没有指定模式，则将返回所有对象作为JSON数组。

<pre> HTTP：// IP：8087 /对象prettyPrint？ </pre><pre> {“system.adapter.admin.0.uptime”：{“_ id”：“system.adapter.admin.0.uptime”，“type”：“state”，“common”：{“name”：“admin。 0.uptime“，”键入“：”数字“，”角色“：”indicator.state“，”unit“：”秒“}，”native“：{}}，”system.adapter.admin.0.memRss “：{”_ id“：”system.adapter.admin.0.memRss“，”type“：”state“，”common“：{”name“：”admin.0.memRss“，”desc“：”Resident set size“，”type“：”number“，”role“：”indicator.state“，”unit“：”MB“，”history“：{”enabled“：true，”changesOnly“：true，”minLength“ ：480，“maxLength”：960，“保留”：604800，“debounce”：10000}}，“native”：{}}，...
</pre>

获取适配器system.adapter.admin.0的所有控件对象： <pre> HTTP：// IP：8087 /对象图案= system.adapter.admin.0 * prettyPrint </pre><pre> {“system.adapter.admin.0.uptime”：{“_ id”：“system.adapter.admin.0.uptime”，“type”：“state”，“common”：{“name”：“admin。 0.uptime“，”键入“：”数字“，”角色“：”indicator.state“，”unit“：”秒“}，”原生“：{}}，...

</ PRE>

＃＃＃ 状态
获取模式的所有状态列表。如果没有指定模式，则将返回所有状态为JSON数组。

<pre> HTTP：// IP：8087 /状态prettyPrint </pre><pre> {“system.adapter.admin.0.uptime”：{“val”：32176，“ack”：true，“ts”：1423156164，“from”：“system.adapter.admin.0”，“lc”： 1423156164}，“system.adapter.admin.0.memRss”：{“val”：41.14，“ack”：true，“ts”：1423156164，“from”：“system.adapter.admin.0”，“lc “：1423156119}，”system.adapter.admin.0.memHeapTotal“：{”val“：31.19，”ack“：true，”ts“：1423156164，”from“：”system.adapter.admin.0“， “lc”：1423155084}，...
</pre>

 获取适配器system.adapter.admin.0的所有控件对象：

<pre> HTTP：// IP：8087 /状态模式= system.adapter.admin.0 * prettyPrint </pre><pre> {“system.adapter.admin.0.uptime”：{“val”：32161，“ack”：true，“ts”：1423156149，“from”：“system.adapter.admin.0”，“lc”： 1423156149}，“system.adapter.admin.0.memRss”：{“val”：41.14，“ack”：true，“ts”：1423156149，“from”：“system.adapter.admin.0”，“lc “：1423156119}，”system.adapter.admin.0.memHeapTotal“：{”val“：31.19，”ack“：true，”ts“：1423156149，”from“：”system.adapter.admin.0“， “lc”：1423155084}，“system.adapter.admin.0.memHeapUsed”：{“val”：19.07，“ack”：true，“ts”：1423156149，“from”：“system.adapter.admin.0 “，”lc“：1423156149}，”system.adapter.admin.0.connected“：{”val“：true，”ack“：true，”ts“：1423156149，”from“：”system.adapter.admin .0“，”lc“：1423128324，”expire“：28100}，”system.adapter.admin.0.alive“：{”val“：true，”ack“：true，”ts“：1423156149，”来自“：”system.adapter.admin.0“，”lc“：1423128324，”expire“：28115}} </pre>

## Changelog

### 2.0.2 (2018-12-17)
* (Apollon77) fix decoding for state Ids with # in it

### 2.0.0 (2018-06-29)
* (Giermann) BREAKING CHANGE: getBulk is returning data in a different structure

### 1.6.3 (2018-04-15)
* (Apollon77) Return used character encoding (UTF-8)

### 1.6.2 (2017-11-27)
* (Apollon77) Fix decoding problems

### 1.6.1 (2017-09-25)
* (Apollon77) Fix statuscode for setBulk and optimize permission errors

### 1.6.0 (2017-07-10)
* (Apollon77) Fix handling of URL-encoded values, they are now decoded properly
* (Apollon77) Optimize Permission handling
* (Apollon77) add possibility to only allow access to states where user is also owner, finally works correct with js-controller 1.1.1!

### 1.5.0 (2017-03-10)
* (greyhound) Add new POST method setValueFromBody

### 1.4.0 (2017-01-05)
* (bluefox) new web server plugin support

### 1.3.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.1.1 (2016-07-06)
* (bluefox) support of chained certificates

### 1.1.0 (2016-02-09)
* (bluefox) fix toggle, objects, states, setBulk, POST
* (bluefox) add tests

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.1.2 (2015-06-28)
* (bluefox) add description in readme.md
* (bluefox) change "toggle" for boolean and numbers

### 0.1.1 (2015-06-28)
* (bluefox) change setForeignState api
* (bluefox) add type to io-package.json
* (bluefox) enable run from "web"
* (bluefox) add default user

### 0.1.0 (2015-06-10)
* (bluefox) change setForeignState api
* (bluefox) support of user permissions

### 0.0.4 (2015-03-11)
* (bluefox) remove socket.io from file

### 0.0.3 (2015-02-13)
* (bluefox) remove socket.io from dependencies

### 0.0.2 (2015-02-12)
* (bluefox) enable be a part of "web"

### 0.0.1 (2015-02-06)
* (bluefox) initial commit