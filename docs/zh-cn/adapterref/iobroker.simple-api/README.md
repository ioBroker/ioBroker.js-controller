---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.simple-api/README.md
title: 简单API
hash: CmFb3bicG5lruCvSom8AvKW7IIT9XQ2XllE+tsP92ys=
---
![商标](../../../en/adapterref/iobroker.simple-api/admin/simple-api.png)

![安装数量](http://iobroker.live/badges/simple-api-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.simple-api.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.simple-api.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.simple-api.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.simple-api.png?downloads=true)

＃简单API
这是RESTFul接口，用于从ioBroker读取对象和状态，并通过HTTP Get / Post请求写入/控制状态。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

##用法
在浏览器```http://ipaddress:8087/help```中调用以获得有关API的帮助。结果是：

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
  "search": "http://ipaddress:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&prettyPrint"
}
```

### GetPlainValue
致电例如：

```
http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive
```

结果：

```
true
```

###得到
致电例如：

```
http://ipaddress:8087/get/system.adapter.admin.0.alive
```

结果：

```
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

或致电：

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
    通过一个请求获得许多状态，以对象列表的形式按请求中的列表顺序返回，并以id / val / ts作为子对象

###设置
致电例如：

```
http://ipaddress:8087/set/javascript.0.test?value=1
```

结果：

```
{"id":"javascript.0.test","value":1}
```

或致电：

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

当然，数据点* javascript.0.test *必须存在。

另外，可以定义值的类型：

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string
```

ack标志也可以定义：

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true
```

###切换
    切换值：

-布尔值：true => false，false => true
-无限制的数字：x => 100-x
-有限制的数字：x =>最大值-（x-最小值）

### SetBulk
    通过一个请求设置多个状态。该请求也支持POST方法，因为POST数据应该在正文中，而不是URL。

### SetValueFromBody
    允许通过POST正文内容设置给定State的值。

###对象
＃＃＃ 状态
###搜索
如果在配置中设置了数据源（History，SQL），则仅列出该数据源已知的数据点。
如果激活了“列出所有数据点”选项或未指定任何数据源，则将列出所有数据点。
Grafana JSON / SimpleJSON插件需要此命令。

###查询
如果已指定数据源（History，SQL），则在指定的时间段内从指定的数据点中读取数据，否则仅读取当前值。
Grafana JSON / SimpleJSON插件需要此命令。

＃＃＃ 救命
返回[这个](#usage)输出

##安装
```node iobroker.js add simple-api```

##用法
假设我们没有安全性，并且服务器在默认端口8087上运行。

对于所有查询，可以指定状态的名称或ID。

对于每个返回JSON的要求，您都可以设置参数* prettyPrint *，以人类可读的形式获取输出。

如果启用身份验证，则必须填写其他两个字段：<pre> ？user = admin＆pass = iobroker</pre>

### GetPlainValue
读取状态值作为文本。您可以指定更多ID除以分号

<pre>http：// ip：8087 / getPlainValue / admin.0.memHeapTotal</pre>

<pre>31.19</pre>

<pre>http：// ip：8087 / getPlainValue / admin.0.memHeapTotal，admin.0.memHeapUsed</pre><pre> 31.19 17.52</pre>

###得到
将状态和状态的对象数据读取为json。您可以指定更多的ID，以分号分隔。
如果请求了多个ID，则将返回JSON数组。

<pre>http：// localhost：8087 / get / admin.0.memHeapTotal /？prettyPrint</pre>

<pre>{“ val”：31.19，“ ack”：true，“ ts”：1423154619，“ from”：“ system.adapter.admin.0”，“ lc”：1423153989，“ _ id”：“ system.adapter.admin。 0.memHeapTotal”，“ type”：“ state”，“ common”：{“ name”：“ admin.0.memHeapTotal”，“ type”：“ number”，“ role”：“ indicator.state”，“ unit” “：” MB“，”历史记录“：{” enabled“：true，” changesOnly“：true，” minLength“：480，” maxLength“：960，” retention“：604800，” debounce“：10000}}，”本机”：{}}</pre>

<pre>http：// ip：8087 / get / admin.0.memHeapTotal，admin.0.memHeapUsed /？prettyPrint</pre><pre> [{“ val”：31.19，“ ack”：true，“ ts”：1423154544，“ from”：“ system.adapter.admin.0”，“ lc”：1423153989，“ _id”：“ system.adapter.admin .0.memHeapTotal”，“类型”：“状态”，“公用”：{“名称”：“ admin.0.memHeapTotal”，“类型”：“数字”，“角色”：“ indicator.state”，“ unit“：” MB“，” history“：{” enabled“：true，” changesOnly“：true，” minLength“：480，” maxLength“：960，” retention“：604800，” debounce“：10000}}， “ native”：{}}，{“ val”：16.25，“ ack”：true，“ ts”：1423154544，“ from”：“ system.adapter.admin.0”，“ lc”：1423154544，“ _id” ：“” system.adapter.admin.0.memHeapUsed“，” type“：” state“，” common“：{” name“：” admin.0.memHeapUsed“，” type“：” number“，” role“： “ indicator.state”，“ unit”：“ MB”，“ history”：{“ enabled”：true，“ changesOnly”：true，“ minLength”：480，“ maxLength”：960，“ retention”：604800，“ debounce”：10000}}，“ native”：{}}]</pre>

### GetBulk
使用时间戳读取更多ID的状态。您可以指定更多的ID，以分号分隔。
始终会返回JSON数组。

<pre>http：// ip：8087 / getBulk / admin.0.memHeapTotal，admin.0.memHeapUsed /？prettyPrint</pre>

<pre>{“ admin.0.memHeapTotal”：{“ val”：31.19，“ ts”：1423154754}，“ admin.0.memHeapUsed”：{“ val”：15.6，“ ts”：1423154754}}</pre>

###设置
用指定的ID写入状态。您可以指定* wait *选项（以毫秒为单位）以等待驱动程序的答复。

<pre>http：// ip：8087 / set / hm-rpc.0.IEQ12345.LEVEL？value = 1＆prettyPrint</pre><pre> {“ id”：“ hm-rpc.0.IEQ12345.LEVEL”，“ value”：1}</pre>

<pre>http：// ip：8087 / set / hm-rpc.0.IEQ12345.LEVEL？value = 1＆wait = 5000＆prettyPrint</pre><pre> {“ val”：1，“ ack”：是的，“ ts”：1423155399，“ from”：“ hm-rpc.0.IEQ12345.LEVEL”，“ lc”：1423155399}</pre>

如果在指定的时间内没有收到答案，则将返回* null *值。
在第一种情况下，答案将立即返回，并且* ack *为假。在第二种情况下，* ack *为true。这意味着那是驾驶员的回应。

### SetBulk
-在一个请求中写入大量ID。

<pre>http：// ip：8087 / setBulk？hm-rpc.0.FEQ1234567：1.LEVEL = 0.7＆Anwesenheit = 0＆prettyPrint</pre><pre> [{“ id”：“ hm-rpc.0.FEQ1234567：1.LEVEL”，“ val”：“ 0.7”}，{“ error”：“错误：未找到数据点\” Anwesenheit \“”}]</pre>您也可以通过POST发送此请求。

###对象
获取模式的所有对象的列表。如果未指定任何模式，则将返回所有对象作为JSON数组。

<pre>http：// ip：8087 / objects？prettyPrint</pre><pre> {“” system.adapter.admin.0.uptime“：{” _id“：” system.adapter.admin.0.uptime“，” type“：” state“，” common“：{” name“：” admin。 0.uptime”，“ type”：“ number”，“ role”：“ indicator.state”，“ unit”：“ seconds”，“}”，“ native”：{}}，“ system.adapter.admin.0.memRss” “：{” _id“：” system.adapter.admin.0.memRss“，” type“：”状态“，” common“：{” name“：” admin.0.memRss“，” desc“：”常驻设置大小”，“类型”：“数字”，“角色”：“ indicator.state”，“单位”：“ MB”，“历史记录”：{“启用”：true，“ changesOnly”：true，“ minLength” ：480，“ maxLength”：960，“ retention”：604800，“ debounce”：10000}}，“ native”：{}}，...
</pre>

获取适配器system.adapter.admin.0的所有控制对象：<pre> http：// ip：8087 / objects？pattern = system.adapter.admin.0 *＆prettyPrint</pre><pre> {“” system.adapter.admin.0.uptime“：{” _id“：” system.adapter.admin.0.uptime“，” type“：” state“，” common“：{” name“：” admin。 0.uptime”，“ type”：“ number”，“ role”：“ indicator.state”，“ unit”：“ seconds”}，“ native”：{}}，...

</ pre>

＃＃＃ 状态
获取模式的所有状态的列表。如果未指定任何模式，则将返回所有状态为JSON数组。

<pre>http：// ip：8087 / states？prettyPrint</pre><pre> {“” system.adapter.admin.0.uptime“：{” val“：32176，” ack“：true，” ts“：1423156164，” from“：” system.adapter.admin.0“，” lc“： 1423156164}，“ system.adapter.admin.0.memRss”：{“ val”：41.14，“ ack”：true，“ ts”：1423156164，“ from”：“ system.adapter.admin.0”，“ lc “：1423156119}，” system.adapter.admin.0.memHeapTotal“：{” val“：31.19，” ack“：true，” ts“：1423156164，” from“：” system.adapter.admin.0“， “ lc”：1423155084}，...
</pre>

 获取适配器system.adapter.admin.0的所有控制对象：

<pre>http：// ip：8087 / states？pattern = system.adapter.admin.0 *＆prettyPrint</pre><pre> {“” system.adapter.admin.0.uptime“：{” val“：32161，” ack“：true，” ts“：1423156149，” from“：” system.adapter.admin.0“，” lc“： 1423156149}，“ system.adapter.admin.0.memRss”：{“ val”：41.14，“ ack”：true，“ ts”：1423156149，“ from”：“ system.adapter.admin.0”，“ lc “：1423156119}，” system.adapter.admin.0.memHeapTotal“：{” val“：31.19，” ack“：true，” ts“：1423156149，” from“：” system.adapter.admin.0“， “ lc”：1423155084}，“ system.adapter.admin.0.memHeapUsed”：{“ val”：19.07，“ ack”：true，“ ts”：1423156149，“ from”：“ system.adapter.admin.0 “，” lc“：1423156149}，” system.adapter.admin.0.connected“：{” val“：true，” ack“：true，” ts“：1423156149，” from“：” system.adapter.admin .0“，” lc“：1423128324，” expire“：28100}，” system.adapter.admin.0.alive“：{” val“：true，” ack“：true，” ts“：1423156149，”来自“：” system.adapter.admin.0“，” lc“：1423128324，” expire“：28115}}</pre>

###搜索
如果在配置中设置了数据源（History，SQL），则仅列出该数据源已知的数据点。
如果激活了“列出所有数据点”选项或未指定任何数据源，则将列出所有数据点。

<pre>http：// ip：8087 / search？pattern = system.adapter.admin.0 *＆prettyPrint</pre><pre> {“ system.adapter.admin.0.outputCount”，“ system.adapter.admin.0.inputCount”，“ system.adapter.admin.0.uptime”，“ system.adapter.admin.0.memRss”，“ system.adapter.admin.0.memHeapTotal”，“ system.adapter.admin.0.memHeapUsed”，“ system.adapter.admin.0.cputime”，“ system.adapter.admin.0.cpu”，“系统。 adapter.admin.0.connected“，” system.adapter.admin.0.alive“}</pre>

###查询
如果指定了数据源（History，SQL），则在指定期间内将读取来自指定数据点的数据。

<pre>http：// ip：8087 / query / system.host.iobroker-dev.load，system.host.iobroker-dev.memHeapUsed /？prettyPrint＆dateFrom = 2019-06-08T01：00：00.000Z＆dateTo = 2019-06-08T01： 00：10.000Z</pre><pre> [{“ target”：“ system.host.iobroker-dev.load”，“ datapoints”：[[0.12，1559955600000]，[0.46，1559955601975]，[0.44，1559955610000]]}，{“ target”：“系统.host.iobroker-dev.memHeapUsed“，”数据点“：[[23.01，1559955600000]，[22.66，1559955601975]，[22.69，1559955610000]]}]</pre>

如果未指定数据源或传递了noHistory参数，则仅读取数据点的当前值。

<pre>http：// ip：8087 / query / system.host.iobroker-dev.load，system.host.iobroker-dev.memHeapUsed /？prettyPrint＆noHistory = true</pre><pre> [{“ target”：“ system.host.iobroker-dev.load”，“数据点”：[[0.58，1559970500342]]}，{“ target”：“ system.host.iobroker-dev.memHeapUsed”，“数据点“：[[21.53，1559970500342]]}] </pre><!-- Placeholder for the next version (at the beginning of the line):

### __正在进行的工程__->

## Changelog
### 2.5.2 (2021-01-09)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 2.4.8 (2020-09-17)
* (Apollon77) Make sure missing favico file locally is not throwing exceptions (Sentry IOBROKER-SIMPLE-API-G)

### 2.4.7 (2020-08-17)
* (Apollon77) check that targets are an array for "query" requests (Sentry IOBROKER-SIMPLE-API-F)

### 2.4.6 (2020-06-11)
* (Apollon77) Make sure adapter is showing correct error when webserver can not be initialized (Sentry IOBROKER-SIMPLE-API-7)

### 2.4.5 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with imvalid certificates 

### 2.4.4 (2020-05-02)
* (Apollon77) Make sure Permission errors do not crash adapter (Sentry IOBROKER-SIMPLE-API-3)

### 2.4.3 (2020-04-30)
* (Apollon77) Optimize web server error handling

### 2.4.1 (2020-04-23)
* (bluefox) Caught the web server errors

### 2.4.0 (2020-04-12)
* (Apollon77) Add Sentry support with js-controller 3.0
* (Apollon77) fix potential crash

### 2.3.3 (2019-11-16)
* (bluefox) Added response code for unknown commands

### 2.3.2 (2019-10-18)
* (Apollon77) Fix Admin 3 support

### 2.3.1 (2019-10-12)
* (bluefox) Admin 3 is now supported
* (bluefox) NPM packages were updated

### 2.2.0 (2019-09-10)
* (bluefox) New flags are supported: ack and type
* (bluefox) Return error codes as JSON if no pretty print defined

### 2.1.2 (2019-09-05)
* (Apollon77) fix compact mode

### 2.1.0 (2019-07-05)
* (Marco.K) Added command set for the Grafana plugins JSON / SimpleJSON. Usage see https://forum.iobroker.net/topic/23033/aufruf-modifikation-simpleapi-adapter-iobroker-als-datenquelle-f%C3%BCr-grafana

### 2.0.5 (2019-06-26)
* (Apollon77) remove logging

### 2.0.4 (2019-06-23)
* (Apollon77) fix usage as web extension

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

## License
The MIT License (MIT)

Copyright (c) 2015-2021 bluefox <dogafox@gmail.com>

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