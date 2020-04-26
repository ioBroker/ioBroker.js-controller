![Logo](admin/simple-api.png)
# Simple-api

![Number of Installations](http://iobroker.live/badges/simple-api-installed.svg) ![Number of Installations](http://iobroker.live/badges/simple-api-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.simple-api.svg)](https://www.npmjs.com/package/iobroker.simple-api)
[![Downloads](https://img.shields.io/npm/dm/iobroker.simple-api.svg)](https://www.npmjs.com/package/iobroker.simple-api)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.simple-api.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.simple-api)

[![NPM](https://nodei.co/npm/iobroker.simple-api.png?downloads=true)](https://nodei.co/npm/iobroker.simple-api/)

This is RESTFul interface to read the objects and states from ioBroker and to write/control the states over HTTP Get/Post requests.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Usage
Call in browser ```http://ipaddress:8087/help``` to get the help about API. The result is:

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
  "search": "http://192.168.0.24:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://192.168.0.24:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://192.168.0.24:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://192.168.0.24:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://192.168.0.24:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&prettyPrint"
}
```

### getPlainValue
Call e.g.:
```
http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive
```
Result:
```
true
```

### get
Call e.g.:
```
http://ipaddress:8087/get/system.adapter.admin.0.alive
```
Result:
```
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```
or call e.g.:
```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```
Result:
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

### getBulk
    get many states with one request, returned as array of objects in order of list in request and id/val/ts as subobject

### set
Call e.g.:
```
http://ipaddress:8087/set/javascript.0.test?value=1
```
Result:
```
{"id":"javascript.0.test","value":1}
```
or call e.g.:
```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint
```
Result:
```
{
  "id": "javascript.0.test",
  "value": 1
}
```
Of course the data point *javascript.0.test* must exist.

Additionally the type of value could be defined:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string
```

and ack flag could be defined too:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true
```



### toggle
    toggles value:
- boolean: true => false, false => true
- number without limits: x => 100-x
- number with limits: x => max - (x - min)

### setBulk
    Set many states with one request. This request supports POST method too, for POST data should be in body and not URL.

### setValueFromBody
    Allows to set the value of a given State be set by the POST body content.

### objects

### states

### search
    Is a data source (History, SQL) in the configuration is set, then only the data points known to the data source are listed.
    If the option 'List all data points' has been activated or no data source has been specified, all data points will be listed.
    This command is needed for the Grafana JSON / SimpleJSON Plugin.

### query
    If a data source (History, SQL) has been specified, the data from the specified data points are read out for the specified period, otherwise only the current value is read out.
    This command is needed for the Grafana JSON / SimpleJSON Plugin.

### help
Gives [this](#usage) output back


## Install

```node iobroker.js add simple-api```

## Usage
Assume, we have no security and the server runs on default port 8087.

For all queries the name or id of the state can be specified.

For every requiest that returns JSON you can set parameter *prettyPrint* to get the output in human readable form.

If authentication is enabled, two other fields are mandatory: <pre>?user=admin&pass=iobroker</pre>

### getPlainValue
Read state value as text. You can specify more ids divided by semicolon

<pre>http://ip:8087/getPlainValue/admin.0.memHeapTotal</pre>

<pre>
  31.19
</pre>

<pre>http://ip:8087/getPlainValue/admin.0.memHeapTotal, admin.0.memHeapUsed</pre>
<pre>
  31.19
  17.52
</pre>

### get
Read state and object data of state as json. You can specify more ids divided by semicolon.
If more than one ID requested, the JSON array will be returned.

<pre>http://localhost:8087/get/admin.0.memHeapTotal/?prettyPrint</pre>

<pre>
  {
    "val": 31.19,
    "ack": true,
    "ts": 1423154619,
    "from": "system.adapter.admin.0",
    "lc": 1423153989,
    "_id": "system.adapter.admin.0.memHeapTotal",
    "type": "state",
    "common": {
      "name": "admin.0.memHeapTotal",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  }
</pre>

<pre>http://ip:8087/get/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint</pre>
<pre>
  [
    {
      "val": 31.19,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423153989,
      "_id": "system.adapter.admin.0.memHeapTotal",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapTotal",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    },
    {
      "val": 16.25,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423154544,
      "_id": "system.adapter.admin.0.memHeapUsed",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapUsed",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    }
  ]
</pre>

### getBulk
Read the states of more IDs with timestamp. You can specify more ids divided by semicolon.
Always the JSON array will be returned.

<pre>http://ip:8087/getBulk/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint</pre>

<pre>
  {
      "admin.0.memHeapTotal": {
          "val": 31.19,
          "ts": 1423154754
      },
      "admin.0.memHeapUsed": {
          "val": 15.6,
          "ts": 1423154754
      }
  }
</pre>

### set
Write the states with specified IDs. You can specifiy *wait* option in milliseconds to wait for answer from driver.

<pre>http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&prettyPrint</pre>
<pre>{
       "id": "hm-rpc.0.IEQ12345.LEVEL",
       "value": 1
     }
</pre>

<pre>http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&wait=5000&prettyPrint</pre>
<pre>{
       "val": 1,
       "ack": true,
       "ts": 1423155399,
       "from": "hm-rpc.0.IEQ12345.LEVEL",
       "lc": 1423155399
     }
</pre>

If no answer will be recieved in specified time, the *null* value will be returned.
In the first case the answer will be returned immediately and *ack* is false. In the second case *ack* is true. That means it was response from driver.

### setBulk
- write bulk of IDs in one request.

<pre>http://ip:8087/setBulk?hm-rpc.0.FEQ1234567:1.LEVEL=0.7&Anwesenheit=0&prettyPrint</pre>
<pre>
  [
    {
      "id": "hm-rpc.0.FEQ1234567:1.LEVEL",
      "val": "0.7"
    },
    {
      "error": "error: datapoint \"Anwesenheit\" not found"
    }
  ]
</pre>
You can send this request as POST too.

### objects
Get the list of all objects for pattern. If no pattern specified  all objects as JSON array will be returned.

<pre>http://ip:8087/objects?prettyPrint</pre>
<pre>
  {
  "system.adapter.admin.0.uptime": {
    "_id": "system.adapter.admin.0.uptime",
    "type": "state",
    "common": {
      "name": "admin.0.uptime",
      "type": "number",
      "role": "indicator.state",
      "unit": "seconds"
    },
    "native": {}
  },
  "system.adapter.admin.0.memRss": {
    "_id": "system.adapter.admin.0.memRss",
    "type": "state",
    "common": {
      "name": "admin.0.memRss",
      "desc": "Resident set size",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  },
  ...
</pre>

  Get all control objects of adapter system.adapter.admin.0:
<pre>http://ip:8087/objects?pattern=system.adapter.admin.0*&prettyPrint</pre>
<pre>
    {
    "system.adapter.admin.0.uptime": {
      "_id": "system.adapter.admin.0.uptime",
      "type": "state",
      "common": {
        "name": "admin.0.uptime",
        "type": "number",
        "role": "indicator.state",
        "unit": "seconds"
      },
      "native": {}
    },
    ...

</pre>

### states
Get the list of all states for pattern. If no pattern specified all states as JSON array will be returned.

<pre>http://ip:8087/states?prettyPrint</pre>
<pre>
  {
    "system.adapter.admin.0.uptime": {
      "val": 32176,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156164
    },
    "system.adapter.admin.0.memRss": {
      "val": 41.14,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156119
    },
    "system.adapter.admin.0.memHeapTotal": {
      "val": 31.19,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423155084
    },
  ...
</pre>

 Get all control objects of adapter system.adapter.admin.0:

 <pre>http://ip:8087/states?pattern=system.adapter.admin.0*&prettyPrint</pre>
<pre>
    {
      "system.adapter.admin.0.uptime": {
        "val": 32161,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.memRss": {
        "val": 41.14,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156119
      },
      "system.adapter.admin.0.memHeapTotal": {
        "val": 31.19,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423155084
      },
      "system.adapter.admin.0.memHeapUsed": {
        "val": 19.07,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.connected": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28100
      },
      "system.adapter.admin.0.alive": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28115
      }
    }
</pre>

### search
Is a data source (History, SQL) in the configuration is set, then only the data points known to the data source are listed.
If the option 'List all data points' has been activated or no data source has been specified, all data points will be listed.

<pre>http://ip:8087/search?pattern=system.adapter.admin.0*&prettyPrint</pre>
<pre>
  {
    "system.adapter.admin.0.outputCount",
    "system.adapter.admin.0.inputCount",
    "system.adapter.admin.0.uptime",
    "system.adapter.admin.0.memRss",
    "system.adapter.admin.0.memHeapTotal",
    "system.adapter.admin.0.memHeapUsed",
    "system.adapter.admin.0.cputime",
    "system.adapter.admin.0.cpu",
    "system.adapter.admin.0.connected",
    "system.adapter.admin.0.alive"
  }
</pre>

### query
If a data source (History, SQL) has been specified, the data from the specified data points are read out for the specified period.

<pre>http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&dateFrom=2019-06-08T01:00:00.000Z&dateTo=2019-06-08T01:00:10.000Z</pre>
<pre>
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.12,
          1559955600000
        ],
        [
          0.46,
          1559955601975
        ],
        [
          0.44,
          1559955610000
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          23.01,
          1559955600000
        ],
        [
          22.66,
          1559955601975
        ],
        [
          22.69,
          1559955610000
        ]
      ]
    }
  ]
</pre>

If no data source was specified or the noHistory parameter is passed, then only the current value of the data point is read out.

<pre>http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&noHistory=true</pre>
<pre>
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.58,
          1559970500342
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          21.53,
          1559970500342
        ]
      ]
    }
  ]
</pre>

## Changelog
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

Copyright (c) 2015-2020 bluefox <dogafox@gmail.com>

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

