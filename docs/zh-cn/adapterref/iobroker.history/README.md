---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: 37RT07TH8KkLYoZuy4j2vBmQfHza2r/Egjxr7hI4Ygk=
---
![商标](../../../en/adapterref/iobroker.history/admin/history.png)

![安装数量](http://iobroker.live/badges/history-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.history.svg)
![下载](https://img.shields.io/npm/dm/iobroker.history.svg)
![测试](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)

＃ioBroker.history ===============================
此适配器将状态历史保存在两个阶段的过程中。
首先，数据点存储在RAM中，一旦达到maxLength，它们就会存储在磁盘上。

要设置要存储的数据点，必须在管理员“对象”选项卡（最后一个按钮）中配置它们。

要启用图表，您必须安装** flot ** adapter。

##设置
 -  **存储目录**  - 目录的路径，文件将存储在该目录中。它可以相对于“iobroker-data”或绝对值来完成，例如“/ mnt / history”或“D：/ History”
 -  **存储在RAM值中的最大数量**  - 在RAM中达到此数量的值后，它们将保存在磁盘上。
 -  **存储值的来源**  - 如果也存储“from”字段。可以保存在磁盘上的位置。
 -  **反弹间隔**  - 过于频繁地保护某些值的变化并定义以毫秒为单位的时间，其中一个值更改后其他更改未记录
 -  **存储保留**  - 过去将有多少值存储在磁盘上。
 -  **记录未更改的值任何（）**  - 当使用“仅更改日志”时，您可以在此设置一个时间间隔（以秒为单位），之后还会将未更改的值重新记录到数据库中

这些值中的大多数将预填充数据点的详细设置，并可在此处进行更改。此外，您可以在数据点页面上使用“别名ID”。有了这个，你可以，例如切换设备并更改数据点名称后，仍然只需在此处输入此ID即可将数据记录到以前的ID，并且所有数据都将记录为此ID。

##从Javascript适配器访问值
可以从Javascript适配器访问已排序的值。例如。使用以下代码，您可以阅读最近一小时的事件列表：

```
// Get 50 last stored events for all IDs
sendTo('history.0', 'getHistory', {
    id: '*',
    options: {
        end:       new Date().getTime(),
        count:     50,
        aggregate: 'onchange'
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});

// Get stored values for "system.adapter.admin.0.memRss" in last hour
var end = new Date().getTime();
sendTo('history.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'onchange'
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

可能的选择：

 - **start** - （可选）以ms为单位的时间 - * new Date（）。getTime（）*'
 -  **结束**  - （可选）以ms为单位的时间 -  * new Date（）。getTime（）*'，默认为（现在+ 5000秒）
 -  **步**  - （可选）用于汇总（m4，max，min，average，total）步长，单位为ms
 - **count** - 如果聚合是'onchange'的值的数量或者如果是其他聚合方法的间隔数。如果设置了步骤，则将忽略计数。
 - **来自** - if *from* field应包含在答案中
 - **ack** - 如果* ack *字段应包含在答案中
 - **q** - 如果* q *字段应包含在答案中
 - **addId** - 如果* id *字段应该包含在答案中
 -  **限制**  - 不要返回超过限制的条目
 - **ignoreNull** - 如果null值应该包含（false），则替换为last not null值（true）或替换为0（0）
 -  **聚合**  - 聚合方法：
   - *minmax* - 使用特殊算法。以小间隔拼接整个时间范围，并找到每个间隔的最大值，最小值，开始值和结束值。
   - *max* - 以小间隔拼接整个时间范围并找到每个间隔最大值并将其用于此间隔（将忽略空值）。
   - *min* - 与max相同，但取最小值。
     -  *平均值*  - 与最大值相同，但取平均值。
   - *total* - 与最大值相同，但计算总值。
   - *count* - 与max相同，但计算值的数量（将计算空值）。
   - *none* - 根本没有聚合。只有给定时期内的原始值。

除聚合“无”外，将计算聚合的第一个和最后一个点。
如果您手动请求某些聚合，则应忽略第一个和最后一个值，因为它们是根据句点之外的值计算的。

## StoreState
如果要将其他数据写入InfluxDB，可以使用内置系统函数** storeState **。
此函数还可用于转换其他历史记录适配器（如History或SQL）中的数据。

不会针对ioBroker数据库检查给定的ID，也不需要在那里设置，但只能直接访问。

消息可以具有以下三种格式之一：

*一个ID和一个状态对象
*一个ID和状态对象数组
*具有状态对象的多个ID的数组

##通过Javascript进行历史记录管理
适配器支持通过JavaScript启用和禁用历史记录日志记录，还可以使用其设置检索已启用的数据点列表。

### Enable
该消息需要具有datapoint的“id”。另外可选的“options”来定义数据点特定设置：

```
sendTo('history.0', 'enableHistory', {
    id: 'system.adapter.history.0.memRss',
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
该消息需要具有数据点的“id”。

```
sendTo('history.0', 'disableHistory', {
    id: 'system.adapter.history.0.memRss',
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
sendTo('history.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.history.0.memRss": {
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

##数据转换器
＃＃＃ 大概的概念
如果随着时间的推移有更多的数据，那么历史适配器可能不是最佳选择，而真正的数据库则更好。为此，还有两个SQL数据库的历史适配器（PostgreSQL，MS-SQL，MySQL，SQLite）和InfluxDB。
通过此更改，问题出现了如何将收集的数据从过去转换为这些新适配器。

为此，我们准备了一些可以帮助并完成工作的转换器脚本。从命令行调用这些脚本。

###准备和分析转移目标中的现有数据
转换数据时，只应转移那些尚未存在的数据。因此存在第一组脚本，称为** analyze <db> .js **。应该在开始时调用此脚本一次以收集现有数据的一些数据，并将它们存储在本地.json文件中以供真实转换器脚本使用。
收集了两种数据：

 -  **数据点ID最早的值**：存储每个现有数据点的第一个条目的时间戳，默认情况下导入使用该时间戳忽略所有较新的值。假设从第一个条目开始完全填充数据，并且所有较早的值都将被复制。可以通过参数导入时覆盖此假设。
 -  **每个数据点ID每天的现有值**：现有数据每天进行分析，每天存储数据。这可以用作第一个数据的替代，以便能够填充数据中的“漏洞”。

#### Analyzeinflux.js
analyzeinflux.js可以在目录“converter”中找到。
该脚本将收集InfluxDB实例的上述数据。

**用法**：nodejs analyzeinflux.js [<InfluxDB-Instance>] [<Loglevel>] [--depAnalyze] **示例**：nodejs analyzeinflux.js Influxdb.0 info --deepAnalyze

参数：

 - **<InfluxDB-Instance>** 应该使用哪个Influxdb-Adapter实例？ （默认值：Influxdb.0）如果set需要是scriptname之后的第一个参数。
 - **<Loglevel>** Loglevel输出（默认值：info）。如果set需要是scriptname之后的第二个参数。
 - **- deepAnalyze** 每天收集现有值，默认情况下只查询最早的值。

然后，该脚本将使用收集的数据生成一个或三个.json文件。然后，实际转换器脚本使用这些文件。

#### Analyzeql.js
analyzeql.js可以在目录“converter”中找到。
此脚本将收集SQL实例的部分上述数据。

**用法**：nodejs analyzeql.js [<SQL-Instance>] [<Loglevel>] **示例**：nodejs analyzeql.js sql.0 info

参数：

 - **<SQL-Instance>** 应该使用哪个SQL-Adapter实例？ （默认值：sql.0）如果set需要是scriptname之后的第一个参数。
 - **<Loglevel>** Loglevel输出（默认值：info）。如果set需要是scriptname之后的第二个参数。

然后，该脚本将生成两个带有收集数据的.json文件。然后，实际转换器脚本使用这些文件。
目前 - 无法使用转换器脚本的processNonExistingValuesOnly，因为未收集数据。

###将历史数据转换为数据库
history2db.js可以在目录“converter”中找到。

该脚本将直接使用磁盘上历史记录适配器生成的JSON文件将它们传输到数据库中。
此外，它将预生成的数据文件用于目标数据库中已存在的值，以仅转换不存在的数据。

该脚本可以在没有任何分析步骤的情况下运行，然后您需要将startdata设置为参数，它将简单地从该时间点向后转换任何内容。
如果您之前运行过分析并且存在最早的DBValues.json文件，那么只会转换这些数据点，除非您使用参数来更改它。
当之前运行分析并使用数据文件时，它们也会使用所有转换后的数据进行更新，因此第二次运行通常不会生成重复项。
要重置数据，请删除文件“earliestDBValues.json”，“existingDBValues.json”和/或“existingDBTypes.json”。

转换器然后在作为数据的所有可用日期中及时向后移动，并将确定将哪些数据传输到InfluxDB。

如果要中止该过程，可以按“x”或“<CTRL-C>”，转换器将在当前数据文件后中止。

转换器脚本本身应该与支持“storeState”方法的所有历史记录适配器一起使用。

注意：迁移许多数据将在系统上产生一定的负载，尤其是当转换器和目标数据库实例在同一台机器上运行时。在操作期间监视系统负载和性能，并可能使用“delayMultiplicator”参数来增加转换器的延迟。

**用法：** nodejs history2influx.js DB-Instance [Loglevel] [Date-to-start | 0] [path-to-Data] [delayMultiplicator] [--logChangesOnly [relog-Interval（m）]] [ - -ignoreExistingDBValues] [--processNonExistingValuesOnly] [--processAllDPs] [--simulate] **示例**：nodejs history2influx.js Influxdb.0 info 20161001 / path / to / data 2 --logChangesOnly 30 --processNonExistingValuesOnly

可能的选项和参数：

 - **DB-Instance** DB-Instance将数据发送到.Required参数。需要成为scriptname后的第一个参数。
 - **Loglevel** 输出Loglevel（默认值：info）。如果set需要是scriptname之后的第二个参数。
 -  **开始日期**：以yyyymmdd格式开始的日期（例如20161028）。使用“0”来使用检测到的最早值。如果set需要是scriptname之后的第三个参数。
 - **path-to-Data** 数据文件的路径。默认为iobroker-install-directory / iobroker-data / history-data。如果set需要是scriptname之后的第四个参数。
 - **<delayMultiplicator>** 通过乘数器修改脚本中多个操作之间的延迟。 “2”意味着转换后自己计算的延迟加倍。如果set需要是scriptname之后的第五个参数。
 - **- logChangesOnly [relog-Interval（m）]** 当设置了--logChangesOnly时，数据被解析和减少，因此只有更改的值存储在InfluxDB中。此外，可以在几分钟内设置“relog-Interval（s）”“以在此间隔之后重新记录未更改的值。
 - **- ignoreExistingDBValues** 使用此参数，将忽略所有现有数据，并将所有数据插入到DB中。请确保不会生成重复项。此选项可用于修复数据中缺少某些数据的“漏洞”。默认情况下，它仅填充数据库中至少有一个条目的所有数据点。这可以被--processAllDPs覆盖
 - **- processNonExistingValuesOnly** 使用此参数，将使用分析脚本中的“按日显示数据点”文件，并检查每天和数据点。在此模式下，现有DB值始终被忽略，也不会更新，因此请在使用该模式后再进行一次分析运行！
 - **- processAllDPs** 使用此参数，您可以确保历史文件中的所有现有数据点都传输到数据库中，如果这些数据库到目前为止还没有存在。
 - ** - 模拟**：使用此参数启用模拟模式，意味着没有真正的写入事件，并且在退出时也不会更新analyze-datafiles。

## 1.8.5（2018-07-02）
*（Apollon77）在storeState中修复了错误

## 1.8.4（2018-06-24）
*（Apollon77）修复/允许禁用开始和结束值的写入

## 1.8.0（2018-06-19 / 24）
*（Apollon77）添加将数据写入其他ID的选项，以便更轻松地更改设备。检索数据适用于两个ID

## 1.7.4（2018-04-03）
*（AlCalzone）修复具有特殊字符的状态的文件名处理

## 1.7.3（2018-03-28）
*（Apollon77）尊重“永远保持”设置以保留数据点配置

## 1.7.2（2018-02-05）
*（bondrogeen）Admin3修复

## 1.7.1（2018-01-31）
*（Bluefox）Admin3修复

## 1.7.0（2018-01-17）
*（bluefox）为Admin3做好准备

## 1.6.6（2017-12-20）
*（bluefox）翻译

## 1.6.5（2017-10-05）
*（Apollon77）修复relog值功能

## 1.6.4（2017-08-12）
*（bluefox）添加“保存最后一个值”选项

## 1.6.3（2017-08-03）
*（Apollon77）修复日志间隔的行为以始终记录当前值

## 1.6.2（2017-04-07）
*修复数据类型转换

### 1.6.0（2017-02-28）
*（Apollon77）替换历史文件名中的一些字符

### 1.5.3（2017-02-22）
*（Apollon77）针对旧配置的小修复

### 1.5.2
*（Apollon77）增强混合类型数据点的Min-Delta逻辑

### 1.5.1（2017-01-16）
*（bluefox）修复Adapter config和Datapoint config中float值的处理。

### 1.5.0（2016-12-01）
*（Apollon77）添加消息enableHistory / disableHistory
*（Apollon77）仅在值与数字的最小值不同时才添加对日志更改的支持
*（Apollon77）修正聚合计算

### 1.4.0（2016-10-29）
*（Apollon77）添加选项以重新记录未更改的值，以便于可视化
*（Apollon77）添加了转换器脚本以将历史数据移动到db

### 1.3.1（2016-09-25）
*（Apollon77）修正：ts被指定为val
*（bluefox）修复历史对象的选择器

### 1.3.0（2016-08-30）
*（bluefox）仅与新管理员兼容

### 1.2.0（2016-08-27）
*（bluefox）将对象的名称从历史记录更改为自定义

### 1.1.0（2016-08-27）
*（bluefox）修复最后一点的聚合
*（bluefox）聚合none只传递原始数据而不进行任何聚合

### 1.0.5（2016-07-24）
*（bluefox）修复大间隔的聚合

### 1.0.4（2016-07-05）
*（bluefox）在几秒钟内修复聚合

### 1.0.3（2016-05-31）
*（bluefox）如果忽略null则绘制到最后的行

### 1.0.2（2016-05-29）
*（bluefox）互相切换max和min

### 1.0.1（2016-05-28）
*（bluefox）也计算“on change”的结束/开始值

### 1.0.0（2016-05-20）
*（bluefox）更改默认聚合名称

### 0.4.1（2016-05-14）
*（bluefox）支持sessionId

### 0.4.0（2016-05-05）
*（bluefox）使用sql适配器的聚合文件
*（bluefox）修复退出时的值存储
*（bluefox）每5分钟存储所有缓存数据
*（bluefox）支持ms

### 0.2.1（2015-12-14）
*（bluefox）添加设置说明
*（bluefox）将聚合函数放入单独的文件中以启用与其他适配器的共享
*（smile-Jack）添加生成演示数据
*（微笑杰克）在自己的分叉中获得历史
*（bluefox）添加storeAck标志
*（bluefox）onchange的模型

### 0.2.0（2015-11-15）
*（Smiling_Jack）保存并加载适配器而不是js-controller
*（Smiling_Jack）数据点的聚合
*（Smiling_Jack）支持存储路径

### 0.1.3（2015-02-19）
*（bluefox）修复历史记录中的小错误（感谢Dschaedl）
*（bluefox）更新管理页面

### 0.1.2（2015-01-20）
*（bluefox）按配置启用保存和关闭按钮

### 0.1.1（2015-01-10）
*（bluefox）检查状态是否未被删除

### 0.1.0（2015-01-02）
*（bluefox）启用npm install

### 0.0.8（2014-12-25）
*（bluefox）支持去抖动间隔

### 0.0.7（2014-11-01）
*（bluefox）存储每一个变化而不仅仅是lc！= ts

### 0.0.6（2014-10-19）
*（bluefox）添加配置页面

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2018 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

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