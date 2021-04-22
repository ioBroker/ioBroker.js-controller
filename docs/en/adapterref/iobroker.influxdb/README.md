![Logo](admin/influxdb.png)
# ioBroker.influxdb

![Number of Installations](http://iobroker.live/badges/influxdb-installed.svg) ![Number of Installations](http://iobroker.live/badges/influxdb-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.influxdb.svg)](https://www.npmjs.com/package/iobroker.influxdb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.influxdb.svg)](https://www.npmjs.com/package/iobroker.influxdb)
[![Tests](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)](https://travis-ci.org/ioBroker/ioBroker.history)

[![NPM](https://nodei.co/npm/iobroker.influxdb.png?downloads=true)](https://nodei.co/npm/iobroker.influxdb/)

This adapter saves state history into InfluxDB.

**Only InfluxDB >= v0.9 supported, v1.0 recommended**

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Direct writes or buffered writes?
With the default configuration the adapter stores each single datapoint directly into the database and only use the internal buffer if the database is not available. If database was not available the buffer is flushed at the given interval, so it can take the defined interval till the missing points are written!

By changing the configuration it is possible to cache new datapoints up to a defined count or a defined maximum interval after which all points are stored into the database. This also gives better performance and less system load compared to writing the datapoints directly.
InfluxDB has a limitation of the maximum size for writes which is at around 2MB. It should be save to have up to 15.000 datapoints as buffer maximum, maybe also 20.000, but this highly depends on the length of your datapoint-IDs.

On exit of the adapter the buffer is stored and reinitialized with next start, so no datapoints should be lost and will be written after next start.

## InfluxDB and datatypes
InfluxDB is very strict on datatypes. The datatype for a measurement value is defined with it's first write.
The adapter tries to write with the correct value, but if the datatype changes for the same state then there may be write
errors into the InfluxDB. The adapter detects this and will write these potential conflicting datapoints always directly, but write errors mean that the value is not written into the DB at all. So make sure to check the logs for such cases.

Additionally InfluxDB do not support "null" values, so these are not written at all into the DB.

## Installation of InfluxDB

**Only influxDB >= v0.9 supported, v1.0 recommended**

The installation package for windows and other OS's can be downloaded [here](https://www.influxdata.com/downloads/).

Before you start influxd.exe under windows, you must edit influxdb.conf file to remove all linux paths. You can use ioBroker certificate as certificate:

```
https-certificate = "C:/ioBroker/node_modules/ioBroker.js-controller/conf.key"
```

Under debian you can install it with:
```
sudo apt-get update
sudo apt-get install influxdb
```

Best is to add the Influxdata repository before to get the most current version:

```
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
```

### Setup authentication for influxDB (can be omitted)
If you use DB localy you may leave authentication disabled and skip this part.

- Start service: ``` service influxdb start ```
- Go to admin page: http://<ip>:8083
- Create users:
```
CREATE USER "admin" WITH PASSWORD '<adminpassword>' WITH ALL PRIVILEGES
CREATE USER "user" WITH PASSWORD '<userpassword>'
CREATE DATABASE "iobroker"
GRANT ALL ON "iobroker" TO "user"
```
Enable authentication, by editing /etc/influxdb/influxdb.conf:
```
 [http]  
 enabled = true  
 bind-address = ":8086"  
 auth-enabled = true # ✨
 log-enabled = true  
 write-tracing = false  
 pprof-enabled = false  
 https-enabled = false  
 https-certificate = "/etc/ssl/influxdb.pem"  
```
- Restart service: ``` service influxdb restart ```

## Installation of Grafana
There is additional charting tool for InfluxDB - Grafana.
It must be installed additionally.

Try to install a current v3.x version of Grafana because InfluxDB support is enhanced there in comparism to v2.x

Under debian you can install it as described at http://docs.grafana.org/installation/debian/ .
For ARM platforms your can check vor v3.x at https://github.com/fg2it/grafana-on-raspberry.

Explanation for other OS can be found [here](http://docs.grafana.org/installation/).

After the Grafana is installed, follow [this](http://docs.grafana.org/datasources/influxdb/) to create connection.

## Custom queries
The user can execute custom queries on data from javascript adapter.

The multi-query feature is also supported. You can send multiple queries separated by a semicolon.

That's why the result is always an array with one numbered index for each query.

Example with one query:

```
sendTo('influxdb.0', 'query', 'SELECT * FROM iobroker.global."system.adapter.admin.0.memRss" LIMIT 100', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result[0]));
    }
});
```
Two queries:

```
sendTo('influxdb.0', 'query', 'SELECT * FROM iobroker.global."system.adapter.admin.0.memRss" LIMIT 100; SELECT * FROM iobroker.global."system.adapter.admin.0.memHeapUsed" LIMIT 100', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
        console.log('Rows First: ' + JSON.stringify(result.result[0]));
        console.log('Rows Second: ' + JSON.stringify(result.result[1]));
    }
});
```
**NOTE:** The values are coming back in the result array in filename "value" (instead of "val" as normal in ioBroker)

## Get history
Additional to custom queries, you can use build in system function **getHistory** to access the stored history for datapoints:
```
var end = new Date().getTime();
sendTo('influxdb.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'average' // or 'none' to get raw values
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].val + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```
Possible options:
- **start** - (optional) time in ms - *new Date().getTime()*'
- **end** - (optional) time in ms - *new Date().getTime()*', by default is (now + 5000 seconds)
- **step** - (required if aggregate is not "none") used for  aggregate functions (max, min, average, total, count) step in ms of intervals
- **count** - (optional) number of values if aggregate is 'onchange'/'none' or number of intervals if other aggregate method. Count will be ignored if step is set.
- **limit** - do not return more entries than limit (only used if aggregate is 'onchange'/'none')
- **addId** - if *id* field should be included in answer
- **aggregate** - aggregate method:
    - *max* - Splice the whole time range in small intervals and find for every interval max value and use it for this interval (nulls will be ignored).
    - *min* - Same as max, but take minimal value.
    - *average* - Same as max, but take average value.
    - *total* - Same as max, but calculate total value.
    - *count* - Same as max, but calculate number of values (nulls will be calculated).
    - *none*/*onchange* - No aggregation at all. Only raw values in given period.

When raw data are selected without using 'step' the returned fields are ts, val, ack, q and from.
As soon as step is used the returned fields are ts and val.

Please hold in mind that InfluxDB aggregates on "rounded time boundaries" (see https://docs.influxdata.com/influxdb/v0.11/troubleshooting/frequently_encountered_issues/#understanding-the-time-intervals-returned-from-group-by-time-queries)

InfluxDB is very strict when it comes to datatypes. This has effects for aggregator functions, e.g.:
* average (MEAN) can not be used for boolean values (true/false), only MIN or MAX works here
* average (MEAN) can not be used for string values (text), no aggregator makes sense here at all
* ...

## storeState
If you want to write other data into the InfluxDB you can use the build in system function **storeState**.
This function can also be used to convert data from other History adapters like History or SQL.

The given ids are not checked against the ioBroker database and do not need to be set up there, but can only be accessed directly.

The Message can have one of the following three formats:
* one ID and one state object
* one ID and array of state objects
* array of multiple IDs with state objects

## History Logging Management via Javascript
The adapter supports enabling and disabling of history logging via JavaScript and also retrieving the list of enabled datapoints with their settings.

### enable
The message requires to have the "id" of the datapoint.Additionally optional "options" to define the datapoint specific settings:

```
sendTo('influxdb.0', 'enableHistory', {
    id: 'system.adapter.influxdb.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ''
    }
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

### disable
The message requires to have the "id" of the datapoint.

```
sendTo('influxdb.0', 'disableHistory', {
    id: 'system.adapter.influxdb.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

### get List
The message has no parameters.

```
sendTo('influxdb.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.influxdb.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId":""
        }
        ...
    }
});
```

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
## Changelog
### 1.9.5 (2021-04-19)
* (bluefox) Added the support of Admin5

### 1.9.4 (2021-01-17)
* (Apollon77) Optimize stop handling

### 1.9.3 (2020-11-07)
* (Apollon77) Crash case prevented (Sentry IOBROKER-INFLUXDB-T, IOBROKER-INFLUXDB-Y)

### 1.9.2 (2020-08-06)
* (Apollon77) crash prevented (Sentry IOBROKER-INFLUXDB-G)

### 1.9.1 (2020-07-22)
* (Apollon77) crash prevented (Sentry IOBROKER-INFLUXDB-E)

### 1.9.0 (2020-07-21)
* (Apollon77) Optimize handling in case of write errors and host unavailabilities

### 1.8.8 (2020-07-18)
* (Apollon77) Some errors prevented
* (Apollon77) Set timeouts for influxdb connections to make sure connectioens do not run forever

### 1.8.7 (2020-05-14)
* (bluefox) added command to read supported features

### 1.8.6 (2020-05-11)
* (Apollon77) make sure disabling of datapoints while starting adapter do not crash adapter (Sentry IOBROKER-INFLUXDB-7)
* (Apollon77) Make sure all start values are processed correctly
* (Apollon77) More checks to make sure to not crash when states are disabled while data are processed (Sentry IOBROKER-INFLUXDB-8)

### 1.8.5 (2020-05-08)
* (bluefox) set default history if not yet set

### 1.8.4 (2020-05-02)
* (Apollon77) make sure disabling of datapoints do not crash adapter (Sentry IOBROKER-INFLUXDB-4)

### 1.8.3 (2020-04-29)
* (Apollon77) Fix pot crash case when deleting objects while saving values (Sentry) 

### 1.8.2 (2020-04-19)
* __Requires js-controller >= 2.0.0__
* (Apollon77) removed usage of adapter.objects
* (Apollon77) check if objects have changed and ignore unchanged
* (Apollon77) Add Sentry for Error Reporting with js-controller 3.0
* (Apollon77) Make sure value undefined is ignored

## 1.7.0 (2019-12-23)
* (bluefox) Support of compact mode

## 1.6.0 (2018-06-19)
* (Apollon77) Add option to log datapoints as other ID (alias) to easier migrate devices and such

## 1.5.2 (2018-01-31)
* (Bluefox) Admin3 Fixes

## 1.5.1 (2018-01-28)
* (Apollon77) Admin3 Fixes

## 1.5.0 (2018-01-14)
* (bluefox) Ready for Admin3

## 1.4.8 (2017-10-04)
* (Apollon77) fix relog value feature and enhance type conflict resolving

## 1.4.7 (2017-09-11)
* (Apollon77) fixes to save last value
* (Apollon77) add better support when no start date is set for getHistory (used by Admin)

## 1.4.6 (2017-08-12)
* (bluefox) add "save last value"

## 1.4.5 (2017-08-03)
* (Apollon77) fix behaviour of log interval to always log the current value

## 1.4.4 (2017-06-29)
* fix connected datapoint

## 1.4.3 (2017-04-07)
* fix in datatype conversions

### 1.4.2 (2017-03-02)
* (Apollon77) Add option to define storage datatype per datapoint inclusing converting the value if needed

### 1.3.4 (2017-02-22)
* (Apollon77) Small fix for older configurations

### 1.3.3 (2017-02-08)
* (Apollon77) Enhance handling of DB outages with mass writes afterwards
* (Apollon77) Small fix for older configurations

### 1.3.2
* (Apollon77) Enhance Min-Delta logic for datapoints from type mixed

### 1.3.1 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.3.0 (2016-12-02)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers

### 1.2.1 (2016-11)
* (Apollon77) small enhancements and fixes

### 1.2.0 (2016-11-05)
* (Apollon77) support re-logging also for states that are not updated often (timed relog using relog-Interval)
* (Apollon77) try to solve easy type conflicts and convert float <--> boolean if needed
* (Apollon77) enhance getHistory to retrieve also boundary values better by selecting also points outside of the given time boundaries

### 1.1.1 (2016-11-03)
* (Apollon77) small final change on custom dialog

### 1.1.0 (2016-10-29)
* (Apollon77) optimizations and enhancements for high traffic situations
* (Apollon77) Bugfix if InfluxDB is unavailable
* (Apollon77) add functions getConflictingPoints and resetConflictingPoints
* (Apollon77) add option to re-log unchanged values to make it easier for visualization

### 1.0.1 (2016-10-18)
* (Apollon77) changed storing values to asynchronous way
* (Apollon77) add support for „minmax“ aggregate type on getHistory

### 1.0.0 (2016-10-10)
* (Apollon77) bulk write into DB
* (Apollon77) buffer values if no connection to DB
* (bluefox) connection indication

### 0.5.3 (2016-09-30)
* (Apollon77) enhance and correct documentation
* (Apollon77) implement "step" calculation for aggregation if only "count" is set

### 0.5.2 (2016-09-25)
* (Apollon77) change custom queries. Fix delete DB

### 0.5.1 (2016-09-20)
* (Apollon77) Step is given as Milliseconds and not Seconds!

### 0.5.0 (2016-08-30)
* (bluefox) Compatible only with new admin

### 0.4.0 (2016-08-27)
* (bluefox) change name of object from "history" to "custom"

### 0.3.1 (2016-06-07)
* (bluefox) better error handling

### 0.3.1 (2016-06-05)
* (bluefox) no support of influxDB 0.8 (please update)

### 0.3.0 (2016-05-18)
* (bluefox) make name of DB configurable

### 0.2.0 (2016-04-30)
* (bluefox) support of milliseconds instead of seconds

### 0.1.2 (2015-12-19)
* (bluefox) make onchange work

### 0.1.1 (2015-12-19)
* (bluefox) retention policy for 0.9.x

### 0.1.0 (2015-12-19)
* (bluefox) supported InfluxDB version 0.9.x and 0.8.x

### 0.0.2 (2015-12-14)
* (bluefox) change supported InfluxDB version to 0.9.x

### 0.0.1 (2015-12-12)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2015-2021 bluefox, apollon77

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
