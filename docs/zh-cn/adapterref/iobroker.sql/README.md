---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: POmf7zWTwhMwMfgOvU1PxjKyLCJHQO/HZ6fkGLc6pIE=
---
![商标](../../../en/adapterref/iobroker.sql/admin/sql.png)

![安装数量](http://iobroker.live/badges/sql-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sql.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sql.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)
![保镖徽章](https://badges.greenkeeper.io/ioBroker/ioBroker.sql.svg)

＃ioBroker.sql
该适配器将状态历史记录保存到SQL DB中。

支持PostgreSQL，mysql，Microsoft SQL Server和sqlite。
如果需要默认端口，则可以保留端口0。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

### MS-SQL：
对主机使用§§JJJJJ_0_0§§并检查已启用的TCP / IP连接。
https://msdn.microsoft.com/zh-CN/library/bb909712(v=vs.90).aspx

### SQLite：
是“文件” -DB，不能管理太多事件。如果您有大量数据，请使用真实的数据库，例如PostgreSQL和co。

不能额外安装SQLite DB。它只是磁盘上的一个文件，但是要安装它，您需要在系统上构建工具。对于linux，只需编写：

```
sudo apt-get install build-essential
```

对于Windows：

```
c:\>npm install --global --production windows-build-tools
```

然后重新安装适配器，例如：

```
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL：
您可以按照以下步骤在linux系统上安装mysql：

```
apt-get install mysql-server mysql-client

mysql -uroot -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

如果需要，请编辑* / etc / mysql / my.cnf *以设置绑定到IP地址以进行远程连接。

**警告**：iobroker用户是“ admin”。如果需要，请为iobroker用户授予有限的权利。

在“ Windows”上，可以通过安装程序轻松安装它：https://dev.mysql.com/downloads/installer/。

注意身份验证方法。 `node.js`尚不支持MySQL 8.0中的新加密算法，您必须选择传统身份验证方法。

![视窗](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

##数据库的结构
默认数据库名称为“ iobroker”，但可以在配置中更改。

###来源此表是适配器实例的列表，这些实例已写入条目。 （state.from）
| DB |查询名称|
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL |资料|
| SQLite |资料|

结构体：

|领域类型描述 |
|-------|--------------------------------------------|-------------------------------------------|
| id |整数非空主键标识（1,1）|唯一ID |
|名称| varchar（255）/文字|实例的适配器实例， |

*注意：* MS-SQL使用varchar（255），其他使用TEXT

＃＃＃ 数据点
该表是数据点的列表。 （编号）

| DB |查询名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL |数据点|
| SQLite |数据点|

结构体：

|领域类型描述 |
|-------|--------------------------------------------|-------------------------------------------------|
| id |整数非空主键标识（1,1）|唯一ID |
|名称| varchar（255）/文字|变量的ID，例如hm-rpc.0.JEQ283747.1.STATE |
|类型整数| 0-数字，1-字符串，2-布尔值|

*注意：* MS-SQL使用varchar（255），其他使用TEXT

###数字
类型为“数字”的状态的值。 **ts** 示“时间序列”。

| DB |查询名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

结构体：

|领域类型描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id |整数| “数据点”表中的状态ID |
| ts | BIGINT /整数|直到纪元为止的时间（以毫秒为单位）。可以使用“新日期（ts）”转换为时间|
| val |真实|价值|
| ack | BIT /布尔|确认：0-不确认，1-确认|
| _from |整数|来自“来源”表的来源ID |
| q |整数|质量如数。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states)|

*注意：* MS-SQL使用BIT，其他使用BOOLEAN。 SQLite用于ts INTEGER和所有其他BIGINT。

用户可以定义类型`number`的“计数器”功能。为此，创建了下表：

| DB |查询中的名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

结构体：

|领域类型描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id |整数| “数据点”表中的状态ID |
| ts | BIGINT /整数|直到纪元为止的时间（以毫秒为单位）。可以使用“新日期（ts）”转换为时间|
| val |真实|价值|

该表存储了交换计数器时的值，并且该值没有增加，但是失败到零或更低的值。

###字符串
类型为“字符串”的状态的值。

| DB |查询名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

结构体：

|领域类型描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id |整数| “数据点”表中的状态ID |
| ts | BIGINT |直到纪元为止的时间（以毫秒为单位）。可以使用“新日期（ts）”转换为时间|
| val |文字|价值|
| ack | BIT /布尔|确认：0-不确认，1-确认|
| _from |整数|来自“来源”表的来源ID |
| q |整数|质量如数。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states)|

*注意：* MS-SQL使用BIT，其他使用BOOLEAN。 SQLite用于ts INTEGER和所有其他BIGINT。

###布尔值
类型为“布尔”的状态的值。

| DB |查询名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

结构体：

|领域类型描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id |整数| “数据点”表中的状态ID |
| ts | BIGINT |直到纪元为止的时间（以毫秒为单位）。可以使用“新日期（ts）”转换为时间|
| val | BIT /布尔|价值|
| ack | BIT /布尔|确认：0-不确认，1-确认|
| _from |整数|来自“来源”表的来源ID |
| q |整数|质量如数。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states)|

*注意：* MS-SQL使用BIT，其他使用BOOLEAN。 SQLite用于ts INTEGER和所有其他BIGINT。

##自定义查询
用户可以通过javascript适配器对表执行自定义查询：

```
sendTo('sql.0', 'query', 'SELECT * FROM datapoints', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result));
    }
});
```

或获取最近一小时的ID = system.adapter.admin.0.memRss的条目

```
sendTo('sql.0', 'query', 'SELECT id FROM datapoints WHERE name="system.adapter.admin.0.memRss"', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
        console.log('Rows: ' + JSON.stringify(result.result));
        var now = new Date();
        now.setHours(-1);
        sendTo('sql.0', 'query', 'SELECT * FROM ts_number WHERE ts >= ' + now.getTime() + ' AND id=' + result.result[0].id, function (result) {
            console.log('Rows: ' + JSON.stringify(result.result));
        });
    }
});
```

*注意：*

根据数据库的不同，必须在表名称之前插入数据库名称或数据库名称+架构-请参见上方“数据库结构”下的框。

如果您的数据库名为“ iobroker”，则示例：

| DB |查询名称|
|------------|------------------------------------------|
| MS-SQL |选择* FROM iobroker.dbo.datapoints ... |
| MySQL |选择*从iobroker.datapoints ... |

## StoreState
如果要将其他数据写入InfluxDB / SQL，则可以使用内置系统功能** storeState **。
此功能还可用于转换来自其他历史记录适配器（如历史记录或SQL）的数据。

给定的ID不会根据ioBroker数据库进行检查，因此不需要在那里进行设置，而只能直接访问。

消息可以具有以下三种格式之一：

*一个ID和一个状态对象：`{id：'adapter.0.device.counter'，状态：{val：1，ts：10239499}}`
*一个ID和状态对象的数组：`{id：'adapter.0.device.counter'，state：[{val：1，ts：10239499}，{val：2，ts：10239599}，{val：3 ，ts：10239699}]}`
*具有状态对象`[{{id：'adapter.0.device.counter1'，state：{val：1，ts：10239499}，{id：'adapter.0.device.counter2'，state： {val：2，ts：10239599}]`

此外，您可以添加属性`rules: true`来激活所有规则，例如`counter`，`changesOnly`，`de-bounce`等：`{id: 'adapter.0.device.counter', rules: true, state: [{val: 1, ts: 10239499}, {val: 2, ts: 10239599}, {val: 3, ts: 10239699}]}`

##删除状态
如果要从数据库中删除条目，则可以使用内置系统功能**删除**：

```
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx, state: {ts: 1589458809352},
    {id: 'mbus.0.counter.yyy, state: {ts: 1589458809353}
], result => console.log('deleted'));
```

要删除某个数据点的所有历史记录数据，请执行：

```
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx}
    {id: 'mbus.0.counter.yyy}
], result => console.log('deleted'));
```

要删除某个数据点和某个范围的历史数据，请执行以下操作：

```
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx, start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy, start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

时间可能是自纪元或ans字符串以来的ms，可以由javascript Date对象转换。

值将被删除，包括已定义的限制。 `ts >= start AND ts <= end`

##更改状态
如果要更改数据库中条目的值，质量或确认标志，则可以使用内置系统功能** update **：

```
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx, state: {ts: 1589458809352, val: 15, ack: true, q: 0},
    {id: 'mbus.0.counter.xxx, state: {ts: 1589458809353, val: 16, ack: true, q: 0}
], result => console.log('deleted'));
```

`ts`是强制性的。状态对象中必须至少包含一个其他标志。

注意`counters`。数据库中的`counters`§不会重置，您必须自己处理。

##获取历史
除自定义查询外，您还可以使用内置系统功能** getHistory **：

```
var end = Date.now();
sendTo('sql.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'minmax' // or 'none' to get raw values
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

##获取计数器
用户可以询问特定时间段内某个计数器的值（类型=数字，计数器=真）。

```
var now = Date.now();
// get consumption value for last 30 days
sendTo('sql.0', 'getCounter', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      now - 3600000 * 24 * 30,
        end:        now,
    }
}, result => {
    console.log(`In last 30 days the consumption was ${result.result} kWh`);
});
```

如果将更换计数器设备，则也会对其进行计算。

##通过Javascript进行历史记录记录管理
适配器支持通过JavaScript启用和禁用历史记录日志，还支持使用其设置检索启用的数据点列表。

###启用
该消息需要具有数据点的“ id”。此外，用于定义数据点特定设置的可选“选项”：

```
sendTo('sql.0', 'enableHistory', {
    id: 'system.adapter.sql.0.memRss',
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

###禁用
该消息需要具有数据点的“ id”。

```
sendTo('sql.0', 'disableHistory', {
    id: 'system.adapter.sql.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

###获取列表
该消息没有参数。

```
sendTo('sql.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.sql.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        }
        ...
    }
});
```

##连接设置
-** DB类型**：SQL DB的类型：MySQL，PostgreSQL，MS-SQL或SQLite3
-**主机**：SQL Server的IP地址或主机名
-**端口**：SQL Server的端口（如果不确定，请留空）
-**数据库名称**：数据库名称。默认iobroker
-**用户**：SQL的用户名。必须存在于数据库中。
-**密码**：SQL的密码。
-**密码确认**：只需在此处重复密码。
-**加密**：某些数据库支持加密。
-**实数为**：逗号后的位数。
-**允许并行请求**：允许同时向数据库发送SQL请求。
-**不创建数据库**：如果已经创建数据库（例如，由管理员创建）并且ioBroker用户没有足够的权限来创建数据库，则激活此选项。

＃＃ 默认设置
-**反跳间隔**：请勿存储比该间隔更频繁的值。
-**记录任何不变的值**：每X秒额外写入一次值。
-**从上一个值到对数值的最小差值**：两个值之间的最小间隔。
-**存储保留**：值将在数据库中存储多长时间。

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog

### 1.15.5 (2021-01-22)
* (Apollon77) make sure message query is a string (Sentry)

### 1.15.4 (2021-01-17)
* (Apollon77) Optimize stop handling

### 1.15.3 (2020-08-29)
* (bluefox) Added the option "Do not create database". E.g. if DB was created and it does not required to do that, because the user does not have enough rights.
 
### 1.15.2 (2020-07-26)
* (Apollon77) prevent wrong errors that realId is missing

### 1.15.1 (2020-07-20)
* (Apollon77) implement a workaround for postgres problem

### 1.15.0 (2020-07-19)
*BREAKING* This version only accepts Node.js 10.x+ (because sqlite3 was upgraded)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SQL-16, IOBROKER-SQL-15, IOBROKER-SQL-1K)

### 1.14.2 (2020-06-23)
* (bluefox) Fixed error for data storage

### 1.14.1 (2020-06-17)
* (bluefox) Corrected error for objects with mixed type

### 1.14.0 (2020-05-20)
* (bluefox) added the range deletion and the delete all operations
 
### 1.13.1 (2020-05-20)
* (bluefox) added changed and delete operations
 
### 1.12.6 (2020-05-08)
* (bluefox) set default history if not yet set
 
### 1.12.5 (2020-05-05)
* (Apollon77) Crash prevented for invalid objects (Sentry IOBROKER-SQL-X) 

### 1.12.4 (2020-05-04)
* (Apollon77) Potential crash fixed when disabling data points too fast (Sentry IOBROKER-SQL-W) 
* (Apollon77) Always set "encrypt" flag, even if false because else might en in default true (see https://github.com/tediousjs/tedious/issues/931)

### 1.12.3 (2020-04-30)
* (Apollon77) Try to create indexes on MSSQL to speed up things. Infos are shown if not possible to be able for the user to do it themself. Timeout is 15s

### 1.12.2 (2020-04-30)
* (Apollon77) MSSQL works again

### 1.12.1 (2020-04-26)
* (Apollon77) Fix potential crash (Sentry) 

### 1.12.0 (2020-04-23)
* (Apollon77) Implement max Connections setting and respect it, now allows to control how many concurrent connections to database are used (default 100) and others wait up to 10s for a free connection before failing)
* (Apollon77) Change dependencies to admin to a global dependency
* (Apollon77) Update connection status also in between
* (Apollon77) fix some potential crash cases (Sentry reported)
* (Omega236) Add id to error message for queries
* (Apollon77) update pg to stay compatible with nodejs 14
* (Apollon77) Start clearly ending timeouts on unload ... still some cases left!

### 1.11.1 (2020-04-19)
* __Requires js-controller >= 2.0.0__
* (Apollon77) removed usage of adapter.objects
* (Apollon77) check if objects have changed and ignore unchanged
* (Apollon77) Add Sentry for Error Reporting with js-controller 3.0
* (Apollon77) Make sure value undefined is ignored

### 1.10.1 (2020-04-12)
* (bluefox) Converted to ES6
* (bluefox) The counter functionality was implemented.

### 1.9.5 (2019-05-15)
* (Apollon77) Add support for nodejs 12

### 1.9.4 (2019-02-24)
* (Apollon77) Fix several smaller issues and topics
* (Apollon77) Optimize Texts (for Admin v3 UI)

### 1.9.0 (2018-06-19)
* (Apollon77) Add option to log datapoints as other ID (alias) to easier migrate devices and such

### 1.8.0 (2018-04-29)
* (Apollon77) Update sqlite3, nodejs 10 compatible
* (BuZZy1337) Admin fix

### 1.7.4 (2018-04-15)
* (Apollon77) Fix getHistory

### 1.7.3 (2018-03-28)
* (Apollon77) Respect 'keep forever' setting for retention from data point configuration

### 1.7.2 (2018-03-24)
* (Apollon77) Disable to write NULLs for SQLite

### 1.7.1 (2018-02-10)
* (Apollon77) Make option to write NULL values on start/stop boundaries configurable

### 1.6.9 (2018-02-07)
* (bondrogeen) Admin3 Fixes
* (Apollon77) optimize relog feature and other things

### 1.6.7 (2018-01-31)
* (Bluefox) Admin3 Fixes
* (Apollon77) Relog and null log fixes

### 1.6.2 (2018-01-30)
* (Apollon77) Admin3 Fixes

### 1.6.0 (2018-01-14)
* (bluefox) Ready for Admin3

### 1.5.8 (2017-10-05)
* (Apollon77) fix relog value feature

### 1.5.7 (2017-08-10)
* (bluefox) add "save last value" option

### 1.5.6 (2017-08-02)
* (Apollon77) fix behaviour of log interval to always log the current value

### 1.5.4 (2017-06-12)
* (Apollon77) fix dependency to other library

### 1.5.3 (2017-04-07)
* (Apollon77) fix in datatype conversions

### 1.5.0 (2017-03-02)
* (Apollon77) Add option to define storage datatype per datapoint inclusing converting the value if needed

### 1.4.6 (2017-02-25)
* (Apollon77) Fix typo with PostgrSQL

### 1.4.5 (2017-02-18)
* (Apollon77) Small fix again for older configurations
* (Apollon77) fix for DBConverter Analyze function

### 1.4.3 (2017-02-11)
* (Apollon77) Small fix for older configurations

### 1.4.2 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.4.1
* (Apollon77) Rollback to sql-client 0.7 to get rid of the mmagic dependecy that brings problems on older systems

### 1.4.0 (2016-12-02)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers

### 1.3.4 (2016-11)
* (Apollon77) Allow database names with '-' for MySQL

### 1.3.3 (2016-11)
* (Apollon77) Update dependecies

### 1.3.2 (2016-11-21)
* (bluefox) Fix insert of string with '

### 1.3.0 (2016-10-29)
* (Apollon77) add option to re-log unchanged values to make it easier for visualization

### 1.2.1 (2016-08-30)
* (bluefox) Fix selector for SQL objects

### 1.2.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.0.10 (2016-08-27)
* (bluefox) change name of object from "history" to "custom"

### 1.0.10 (2016-07-31)
* (bluefox) fix multi requests if sqlite

### 1.0.9 (2016-06-14)
* (bluefox) allow settings for parallel requests

### 1.0.7 (2016-05-31)
* (bluefox) draw line to the end if ignore null

### 1.0.6 (2016-05-30)
* (bluefox) allow setup DB name for mysql and mssql

### 1.0.5 (2016-05-29)
* (bluefox) switch max and min with each other

### 1.0.4 (2016-05-29)
* (bluefox) check retention of data if set "never"

### 1.0.3 (2016-05-28)
* (bluefox) try to calculate old timestamps

### 1.0.2 (2016-05-24)
* (bluefox) fix error with io-package

### 1.0.1 (2016-05-24)
* (bluefox) fix error with SQLite

### 1.0.0 (2016-05-20)
* (bluefox) change default aggregation name

### 0.3.3 (2016-05-18)
* (bluefox) fix postgres

### 0.3.2 (2016-05-13)
* (bluefox) queue select if IDs and FROMs queries for sqlite

### 0.3.1 (2016-05-12)
* (bluefox) queue delete queries too for sqlite

### 0.3.0 (2016-05-08)
* (bluefox) support of custom queries
* (bluefox) only one request simultaneously for sqlite
* (bluefox) add tests (primitive and only sql)

### 0.2.0 (2016-04-30)
* (bluefox) support of milliseconds
* (bluefox) fix sqlite

### 0.1.4 (2016-04-25)
* (bluefox) fix deletion of old entries

### 0.1.3 (2016-03-08)
* (bluefox) do not print errors twice

### 0.1.2 (2015-12-22)
* (bluefox) fix MS-SQL port settings

### 0.1.1 (2015-12-19)
* (bluefox) fix error with double entries

### 0.1.0 (2015-12-14)
* (bluefox) support of strings

### 0.0.3 (2015-12-06)
* (smiling_Jack) Add demo Data ( todo: faster insert to db )
* (smiling_Jack) change aggregation (now same as history Adapter)
* (bluefox) bug fixing

### 0.0.2 (2015-12-06)
* (bluefox) allow only 1 client for SQLite

### 0.0.1 (2015-11-19)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2015-2020 bluefox <dogafox@gmail.com>, Apollon77

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