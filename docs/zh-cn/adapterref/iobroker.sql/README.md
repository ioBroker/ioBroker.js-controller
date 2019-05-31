---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: sDjWoPBWbFNcjfaereDv7PV96w2+vmUMczc8BokyRRY=
---
![商标](../../../en/adapterref/iobroker.sql/admin/sql.png)

![安装数量](http://iobroker.live/badges/sql-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sql.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sql.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)
![Greenkeeper徽章](https://badges.greenkeeper.io/ioBroker/ioBroker.sql.svg)

#ioBroker.sql
==================================

此适配器将状态历史记录保存到SQL DB中。

支持PostgreSQL，mysql，Microsoft SQL Server和sqlite。
如果需要默认端口，可以保留端口0。

### MS-SQL：
对主机使用```localhost\instance```并检查是否启用了TCP / IP连接。
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite：
是“文件”-DB并且无法管理太多事件。如果你有大量的数据使用真正的数据库，比如PostgreSQL和co。

不得额外安装SQLite DB。它只是磁盘上的文件，但要安装它，您需要在系统上使用构建工具。对于linux，只需写：

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
你可以在linux系统上安装mysql：

```
apt-get install mysql-server mysql-client

mysql -uroot -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

如果需要编辑* / etc / mysql / my.cnf *来设置绑定到IP地址进行远程连接。

**警告**：iobroker用户是“admin”。如果需要，为iobroker用户提供有限的权利。

## DB的结构
默认数据库名称为“iobroker”，但可以在配置中更改。

### Sources此表是编写条目的适配器实例列表。 （state.from）
| DB |查询中的名称|
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL |来源|
| SQLite |来源|

结构体：

|领域|输入|说明|
|-------|--------------------------------------------|-------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY（1,1）|唯一ID |
|名字| varchar（255）/ TEXT |适配器的实例，写入条目|

*注意：* MS-SQL使用varchar（255），其他人使用TEXT

＃＃＃ 数据点
此表是数据点的列表。 （ID）的

| DB |查询中的名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL |数据点|
| SQLite |数据点|

结构体：

|领域|输入|说明|
|-------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY（1,1）|唯一ID |
|名字| varchar（255）/ TEXT |变量的ID，例如hm-rpc.0.JEQ283747.1.STATE |
|类型| INTEGER | 0  - 数字，1  - 字符串，2  - 布尔值|

*注意：* MS-SQL使用varchar（255），其他人使用TEXT

###数字
类型为“number”的状态的值。 **ts** 示“时间序列”。

| DB |查询中的名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

结构体：

|领域|输入|说明|
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | “Datapoints”表中的状态ID |
| ts | BIGINT / INTEGER |时间以毫秒为单位。可以使用“new Date（ts）”|转换为时间 |
| val |真实|价值|
|确认| BIT / BOOLEAN |被承认：0  - 不是ack，1  -  ack |
| _from | INTEGER |来自“来源”表格的来源ID |
| q | INTEGER |质量如数。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states)|

*注意：* MS-SQL使用BIT，其他人使用BOOLEAN。 SQLite用于ts INTEGER和所有其他BIGINT。

###字符串
类型为“string”的状态的值。

| DB |查询中的名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

结构体：

|领域|输入|说明|
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | “Datapoints”表中的状态ID |
| ts | BIGINT |时间以毫秒为单位。可以使用“new Date（ts）”|转换为时间 |
| val | TEXT |价值|
|确认| BIT / BOOLEAN |被承认：0  - 不是ack，1  -  ack |
| _from | INTEGER |来自“来源”表格的来源ID |
| q | INTEGER |质量如数。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states)|

*注意：* MS-SQL使用BIT，其他人使用BOOLEAN。 SQLite用于ts INTEGER和所有其他BIGINT。

###布尔人
类型为“boolean”的状态的值。

| DB |查询中的名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

结构体：

|领域|输入|说明|
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | “Datapoints”表中的状态ID |
| ts | BIGINT |时间以毫秒为单位。可以使用“new Date（ts）”|转换为时间 |
| val | BIT / BOOLEAN |价值|
|确认| BIT / BOOLEAN |被承认：0  - 不是ack，1  -  ack |
| _from | INTEGER |来自“来源”表格的来源ID |
| q | INTEGER |质量如数。您可以找到描述[这里](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states)|

*注意：* MS-SQL使用BIT，其他人使用BOOLEAN。 SQLite用于ts INTEGER和所有其他BIGINT。

##自定义查询
用户可以从javascript适配器对表执行自定义查询：

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

或者获取ID = system.adapter.admin.0.memRss的最后一小时的条目

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

## StoreState
如果要将其他数据写入InfluxDB，可以使用内置系统函数** storeState **。
此函数还可用于转换其他历史记录适配器（如History或SQL）中的数据。

不会针对ioBroker数据库检查给定的ID，也不需要在那里设置，但只能直接访问。

消息可以具有以下三种格式之一：

*一个ID和一个状态对象
*一个ID和状态对象数组
*具有状态对象的多个ID的数组

##获取历史记录
除自定义查询外，您还可以使用内置系统函数** getHistory **：

```
var end = new Date().getTime();
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

##通过Javascript进行历史记录管理
适配器支持通过JavaScript启用和禁用历史记录日志记录，还可以使用其设置检索已启用的数据点列表。

### Enable
该消息需要具有datapoint的“id”。另外可选的“options”来定义数据点特定设置：

```
sendTo('sql.0', 'enableHistory', {
    id: 'system.adapter.sql.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ""
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
该消息需要具有数据点的“id”。

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

###获取清单
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
 - **DB Type** SQL DB的类型：MySQL，PostgreSQL，MS-SQL或SQLite3
 -  **主机**：SQL Server的IP地址或主机名
 -  **端口**：SQL Server的端口（如果不确定则留空）
 -  **数据库名称**：数据库名称。默认的iobroker
 -  **用户**：SQL的用户名。必须存在于DB中。
 -  **密码**：SQL的密码。
 -  **密码确认**：请在此处重复密码。
 -  **加密**：某些数据库支持加密。
 - **Round real to** 逗号后的位数。
 -  **允许并行请求**：允许同时向DB发出SQL请求。

＃＃ 默认设置
 -  **反弹间隔**：不要经常存储超过此间隔的值。
 -  **记录未更改的值**：每隔X秒额外写入值。
 -  **与上一个值相对于log的最小差异**：两个值之间的最小间隔。
 -  **存储保留**：值存储在DB中的时间。

## 1.9.5（2019-05-15）
*（Apollon77）添加对nodejs 12的支持

## 1.9.4（2019-02-24）
*（Apollon77）修复了几个较小的问题和主题
*（Apollon77）优化文本（适用于Admin v3 UI）

## 1.9.0（2018-06-19）
*（Apollon77）添加选项以将数据点记录为其他ID（别名），以便更轻松地迁移设备等

## 1.8.0（2018-04-29）
*（Apollon77）更新sqlite3，nodejs 10兼容
*（BuZZy1337）管理员修复

## 1.7.4（2018-04-15）
*（Apollon77）修复getHistory

## 1.7.3（2018-03-28）
*（Apollon77）尊重“永远保持”设置以保留数据点配置

## 1.7.2（2018-03-24）
*（Apollon77）禁用为SQLite写入NULL

## 1.7.1（2018-02-10）
*（Apollon77）可选择在可配置的开始/停止边界上写入NULL值

## 1.6.9（2018-02-07）
*（bondrogeen）Admin3修复
*（Apollon77）优化relog功能和其他东西

## 1.6.7（2018-01-31）
*（Bluefox）Admin3修复
*（Apollon77）Relog和null日志修复

## 1.6.2（2018-01-30）
*（Apollon77）Admin3修复

## 1.6.0（2018-01-14）
*（bluefox）为Admin3做好准备

## 1.5.8（2017-10-05）
*（Apollon77）修复relog值功能

## 1.5.7（2017-08-10）
*（bluefox）添加“保存最后一个值”选项

## 1.5.6（2017-08-02）
*（Apollon77）修复日志间隔的行为以始终记录当前值

## 1.5.4（2017-06-12）
*（Apollon77）修复与其他库的依赖关系

## 1.5.3（2017-04-07）
*（Apollon77）修复了数据类型转换

### 1.5.0（2017-03-02）
*（Apollon77）添加选项以定义每个数据点的存储数据类型，包括在需要时转换值

### 1.4.6（2017-02-25）
*（Apollon77）使用PostgrSQL修复拼写错误

### 1.4.5（2017-02-18）
*（Apollon77）对旧配置再次进行小修复
*（Apollon77）修复了DBConverter Analyze功能

### 1.4.3（2017-02-11）
*（Apollon77）针对旧配置的小修复

### 1.4.2（2017-01-16）
*（bluefox）修复Adapter config和Datapoint config中float值的处理。

### 1.4.1
*（Apollon77）回滚到sql-client 0.7以摆脱在旧系统上带来问题的mmagic dependecy

### 1.4.0（2016-12-02）
*（Apollon77）添加消息enableHistory / disableHistory
*（Apollon77）仅在值与数字的最小值不同时才添加对日志更改的支持

### 1.3.4（2016-11）
*（Apollon77）允许MySQL的数据库名称为“ - ”

### 1.3.3（2016-11）
*（Apollon77）更新家属

### 1.3.2（2016-11-21）
*（bluefox）修复字符串插入'

### 1.3.0（2016-10-29）
*（Apollon77）添加选项以重新记录未更改的值，以便于可视化

### 1.2.1（2016-08-30）
*（bluefox）修复SQL对象的选择器

### 1.2.0（2016-08-30）
*（bluefox）仅与新管理员兼容

### 1.0.10（2016-08-27）
*（bluefox）将对象名称从“历史”更改为“自定义”

### 1.0.10（2016-07-31）
*（bluefox）修复多个请求，如果sqlite

### 1.0.9（2016-06-14）
*（bluefox）允许并行请求的设置

### 1.0.7（2016-05-31）
*（bluefox）如果忽略null则绘制到最后的行

### 1.0.6（2016-05-30）
*（bluefox）允许设置mysql和mssql的DB名称

### 1.0.5（2016-05-29）
*（bluefox）互相切换max和min

### 1.0.4（2016-05-29）
*（bluefox）如果设置为“never”，则检查数据保留

### 1.0.3（2016-05-28）
*（bluefox）尝试计算旧时间戳

### 1.0.2（2016-05-24）
*（bluefox）使用io-package修复错误

### 1.0.1（2016-05-24）
*（bluefox）修复了SQLite的错误

### 1.0.0（2016-05-20）
*（bluefox）更改默认聚合名称

### 0.3.3（2016-05-18）
*（bluefox）修复postgres

### 0.3.2（2016-05-13）
*（bluefox）队列选择是否ID和FROMs查询sqlite

### 0.3.1（2016-05-12）
*（bluefox）队列删除查询也适用于sqlite

### 0.3.0（2016-05-08）
*（bluefox）支持自定义查询
*（bluefox）只有一个请求同时为sqlite
*（bluefox）添加测试（原始和只有sql）

### 0.2.0（2016-04-30）
*（bluefox）支持毫秒
*（bluefox）修复sqlite

### 0.1.4（2016-04-25）
*（bluefox）修复旧条目的删除

### 0.1.3（2016-03-08）
*（bluefox）不要两次打印错误

### 0.1.2（2015-12-22）
*（bluefox）修复MS-SQL端口设置

### 0.1.1（2015-12-19）
*（bluefox）用双条目修复错误

### 0.1.0（2015-12-14）
*（bluefox）支持字符串

### 0.0.3（2015-12-06）
*（smiling_Jack）添加演示数据（todo：更快插入到db）
*（smiling_Jack）更改聚合（现在与历史适配器相同）
*（bluefox）bug修复

### 0.0.2（2015-12-06）
*（bluefox）只允许1个SQLite客户端

### 0.0.1（2015-11-19）
*（bluefox）初始提交

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2015-2018 bluefox <dogafox@gmail.com>, Apollon77

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