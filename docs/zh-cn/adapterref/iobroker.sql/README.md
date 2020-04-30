---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: oH6/B1e2WUVKqSdwl85gT18ugSQxUpkvi9mR7iujG8k=
---
![商标](../../../en/adapterref/iobroker.sql/admin/sql.png)

![安装数量](http://iobroker.live/badges/sql-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sql.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sql.svg)
![测验](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)
![环保管理员徽章](https://badges.greenkeeper.io/ioBroker/ioBroker.sql.svg)

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

注意身份验证方法。 `node.js`尚不支持MySQL 8.0中的新加密算法，您必须选择旧式身份验证方法。

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

|领域|类型描述 |
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

|领域|类型描述 |
|-------|--------------------------------------------|-------------------------------------------------|
| id |整数非空主键标识（1,1）|唯一ID |
|名称| varchar（255）/文字|变量的ID，例如hm-rpc.0.JEQ283747.1.STATE |
|类型整数| 0-数字，1-字符串，2-布尔值|

*注意：* MS-SQL使用varchar（255），其他使用TEXT

###数字
类型为“数字”的状态的值。 ts表示“时间序列”。

| DB |查询名称|
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

结构体：

|领域|类型描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id |整数| “数据点”表中的状态ID |
| ts | BIGINT /整数|直到纪元为止的时间（以毫秒为单位）。可以使用“新日期（ts）”转换为时间|
| val |真实|价值|
| ack |比特/布尔|确认：0-不确认，1-确认|
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

|领域|类型描述 |
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

|领域|类型描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id |整数| “数据点”表中的状态ID |
| ts | BIGINT |直到纪元为止的时间（以毫秒为单位）。可以使用“新日期（ts）”转换为时间|
| val |文字|价值|
| ack |比特/布尔|确认：0-不确认，1-确认|
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

|领域|类型描述 |
|--------|--------------------------------------------|-------------------------------------------------|
| id |整数| “数据点”表中的状态ID |
| ts | BIGINT |直到纪元为止的时间（以毫秒为单位）。可以使用“新日期（ts）”转换为时间|
| val |比特/布尔|价值|
| ack |比特/布尔|确认：0-不确认，1-确认|
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

或者获取最近一小时的ID = system.adapter.admin.0.memRss条目

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
如果要将其他数据写入InfluxDB / SQL，则可以使用内置系统功能** storeState **。
此功能还可用于转换其他历史记录适配器（如历史记录或SQL）中的数据。

不会根据ioBroker数据库检查给定的ID，也不需要在其中进行设置，而只能直接访问。

消息可以具有以下三种格式之一：

*一个ID和一个状态对象：{{id：'adapter.0.device.counter'，state：{val：1，ts：10239499}}`
*一个ID和状态对象的数组：`{id：'adapter.0.device.counter'，state：[{val：1，ts：10239499}，{val：2，ts：10239599}，{val：3 ，ts：10239699}]}`
*具有状态对象`[{{id：'adapter.0.device.counter1'，state：{val：1，ts：10239499}，{id：'adapter.0.device.counter2'，state： {val：2，ts：10239599}]`

此外，您可以添加属性`rules: true`来激活所有规则，例如`counter`，`changesOnly`，`de-bounce`等：`{id: 'adapter.0.device.counter', rules: true, state: [{val: 1, ts: 10239499}, {val: 2, ts: 10239599}, {val: 3, ts: 10239699}]}`

##获取历史
除了自定义查询外，您还可以使用内置系统功能** getHistory **：

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
用户可以询问特定时段内某个计数器的值（类型=数字，计数器=真）。

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

如果计数器将被替换，它也会被计算。

##通过Javascript进行历史记录记录管理
适配器支持通过JavaScript启用和禁用历史记录日志，还支持使用其设置检索启用的数据点列表。

###启用
该消息需要具有数据点的“ id”。其他可选的“选项”用于定义特定于数据点的设置：

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
-**允许并行请求**：允许同时向DB发送SQL请求。

＃＃ 默认设置
-**反跳间隔**：请勿存储比该间隔更频繁的值。
-**记录任何不变的值**：每X秒额外写入一次值。
-**从最后一个值到对数的最小差**：两个值之间的最小间隔。
-**存储保留**：值将在数据库中存储多长时间。

## 1.12.3（2020-04-30）
*（Apollon77）尝试在MSSQL上创建Indize，以加快处理速度。如果无法让用户自行执行，则会显示信息。超时是15秒

## 1.12.2（2020-04-30）
*（Apollon77）MSSQL再次起作用

## 1.12.1（2020-04-26）
*（Apollon77）修复了潜在的崩溃（Sentry）

## 1.12.0（2020-04-23）
*（Apollon77）实施max Connections设置并遵守该设置，现在可以控制使用了多少个数据库并发连接（默认为100），而其他连接最多等待10s的空闲连接才失败）
*（Apollon77）将依赖项从admin更改为全局依赖项
*（Apollon77）还在之间更新连接状态
*（Apollon77）修复了一些潜在的崩溃案例（Sentry报告）
*（Omega236）将ID添加到查询的错误消息中
*（Apollon77）更新pg以与Node.js 14保持兼容
*（Apollon77）开始清楚地结束卸载超时...仍然有些情况！

## 1.11.1（2020-04-19）
* __需要js-controller> = 2.0.0__
*（Apollon77）删除了adapter.objects的用法
*（Apollon77）检查对象是否已更改并忽略不变
*（Apollon77）使用js-controller 3.0添加Sentry进行错误报告
*（Apollon77）确保忽略未定义的值

## 1.10.1（2020-04-12）
*（bluefox）转换为ES6
*（bluefox）计数器功能已实现。

## 1.9.5（2019-05-15）
*（Apollon77）添加对nodejs 12的支持

## 1.9.4（2019-02-24）
*（Apollon77）修复了一些较小的问题和主题
*（Apollon77）优化文本（对于Admin v3 UI）

## 1.9.0（2018-06-19）
*（Apollon77）添加选项以其他ID（别名）的形式记录数据点，从而更轻松地迁移设备等

## 1.8.0（2018-04-29）
*（Apollon77）更新sqlite3，与nodejs 10兼容
*（BuZZy1337）管理员修复

## 1.7.4（2018-04-15）
*（Apollon77）修复了getHistory

## 1.7.3（2018-03-28）
*（Apollon77）尊重“永久保留”设置，以保留数据点配置

## 1.7.2（2018-03-24）
*（Apollon77）禁止为SQLite写入NULL

## 1.7.1（2018-02-10）
*（Apollon77）使在开始/停止边界上写入NULL值的选项可配置

## 1.6.9（2018-02-07）
*（bondrogeen）Admin3修复
*（Apollon77）优化重新记录功能和其他功能

## 1.6.7（2018-01-31）
*（Bluefox）Admin3修复
*（Apollon77）重新记录和空日志修复

## 1.6.2（2018-01-30）
*（Apollon77）Admin3修复

## 1.6.0（2018-01-14）
*（bluefox）准备使用Admin3

## 1.5.8（2017-10-05）
*（Apollon77）修复了重新记录值功能

## 1.5.7（2017-08-10）
*（bluefox）添加“保存最后一个值”选项

## 1.5.6（2017-08-02）
*（Apollon77）修复了日志间隔的行为，以始终记录当前值

## 1.5.4（2017-06-12）
*（Apollon77）修复了对其他库的依赖

## 1.5.3（2017-04-07）
*（Apollon77）修复了数据类型转换

### 1.5.0（2017-03-02）
*（Apollon77）添加选项以定义每个数据点的存储数据类型，包括在需要时转换值

### 1.4.6（2017-02-25）
*（Apollon77）使用PostgrSQL修复拼写错误

### 1.4.5（2017-02-18）
*（Apollon77）针对较旧的配置再次进行小修正
*（Apollon77）修复了DBConverter Analyze功能

### 1.4.3（2017-02-11）
*（Apollon77）针对较早配置的小修复

### 1.4.2（2017-01-16）
*（bluefox）修复了适配器配置和数据点配置中浮点值的处理。

### 1.4.1
*（Apollon77）回滚到sql-client 0.7以摆脱在较旧系统上带来问题的不可思议的依赖

### 1.4.0（2016-12-02）
*（Apollon77）添加消息enableHistory / disableHistory
*（Apollon77）仅在值与数字的最小值不同时才添加对日志更改的支持

### 1.3.4（2016-11）
*（Apollon77）对于MySQL，允许数据库名称带有“-”

### 1.3.3（2016-11）
*（Apollon77）更新依赖

### 1.3.2（2016-11-21）
*（bluefox）用'固定字符串插入

### 1.3.0（2016-10-29）
*（Apollon77）添加选项以重新记录未更改的值，使其更易于可视化

### 1.2.1（2016-08-30）
*（bluefox）修复SQL对象的选择器

### 1.2.0（2016-08-30）
*（bluefox）仅与新管理员兼容

### 1.0.10（2016-08-27）
*（bluefox）将对象名称从“历史记录”更改为“自定义”

### 1.0.10（2016-07-31）
*（bluefox）如果sqlite修复了多个请求

### 1.0.9（2016-06-14）
*（bluefox）允许设置并行请求

### 1.0.7（2016-05-31）
*（bluefox）如果忽略null，则在最后画线

### 1.0.6（2016-05-30）
*（bluefox）允许为mysql和mssql设置数据库名称

### 1.0.5（2016-05-29）
*（bluefox）彼此切换最大值和最小值

### 1.0.4（2016-05-29）
*（bluefox）如果设置为“从不”，则检查数据保留

### 1.0.3（2016-05-28）
*（bluefox）尝试计算旧时间戳

### 1.0.2（2016-05-24）
*（bluefox）修复了io-package的错误

### 1.0.1（2016-05-24）
*（bluefox）修复SQLite错误

### 1.0.0（2016-05-20）
*（bluefox）更改默认聚合名称

### 0.3.3（2016-05-18）
*（bluefox）修复postgres

### 0.3.2（2016-05-13）
*（bluefox）队列选择是否查询sqlite的ID和FROMs

### 0.3.1（2016-05-12）
*（bluefox）队列删除查询也为sqlite

### 0.3.0（2016-05-08）
*（bluefox）支持自定义查询
*（bluefox）仅同时请求一个sqlite
*（bluefox）添加测试（原始和仅sql）

### 0.2.0（2016-04-30）
*（bluefox）支持毫秒
*（bluefox）修复sqlite

### 0.1.4（2016-04-25）
*（bluefox）修复了删除旧条目的问题

### 0.1.3（2016-03-08）
*（bluefox）不会两次打印错误

### 0.1.2（2015-12-22）
*（bluefox）修复了MS-SQL端口设置

### 0.1.1（2015-12-19）
*（bluefox）修复了两次输入错误

### 0.1.0（2015-12-14）
*（bluefox）支持字符串

### 0.0.3（2015-12-06）
*（smiling_Jack）添加演示数据（待办事项：更快地插入db）
*（smiling_Jack）更改聚合（现在与历史记录适配器相同）
*（bluefox）错误修复

### 0.0.2（2015-12-06）
*（bluefox）仅允许1个客户端使用SQLite

### 0.0.1（2015-11-19）
*（bluefox）初始提交

## Changelog

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