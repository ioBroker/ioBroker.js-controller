---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: tq/r3S9OFXNtKGix4J0p/oLPOqHRXYBNGN6tSjVtauI=
---
![商标](../../../en/adapterref/iobroker.history/admin/history.png)

![安装数量](http://iobroker.live/badges/history-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.history.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.history.svg)
![测验](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)
![环保管理员徽章](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

＃ioBroker.history
此适配器将状态历史记录保存在两个阶段的过程中。
首先，数据点存储在RAM中，一旦达到maxLength，它们就会存储在磁盘上。

要设置一些要存储的数据点，必须在管理员“对象”选项卡（最后一个按钮）中对其进行配置。

要启用图表，您必须安装** flot **适配器。

##设置
-**存储目录**-将文件存储到的目录路径。可以相对于“ iobroker-data”或绝对值（例如“ / mnt / history”或“ D：/ History”）完成操作
-** RAM值中存储的最大数量**-在RAM中达到此数量的值后，它们将保存在磁盘上。
-**存储值的原点**-如果也会存储“发件人”字段。可以节省磁盘空间。
-**反跳间隔**-防止某些值经常更改以及定义的以毫秒为单位的时间，其中在一个值更改之后不会记录其他更改
-**存储保留**-过去将在磁盘上存储多少值。
-**记录未更改的任何值**-使用“仅日志更改”时，您可以在此处设置一个以秒为单位的时间间隔，此后还将未更改的值重新记录到数据库中

这些值中的大多数将预先填充在数据点的详细信息设置上，并可以在此处进行更改。另外，您可以在数据点页面上使用“别名ID”。有了这个，你可以切换设备并更改数据点名称后，只需在此处输入此ID，仍将数据记录到以前的ID，所有数据将以此记录。

##从Javascript适配器访问值
可以从Javascript适配器访问排序后的值。例如。使用以下代码，您可以阅读最近一小时的事件列表：

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

-**开始**-（可选）以毫秒为单位的时间-* new Date（）。getTime（）*'
-**结束**-（可选）以毫秒为单位的时间-* new Date（）。getTime（）*'，默认为（现在+ 5000秒）
-** step **-（可选）以毫秒为间隔，以总计（m4，最大，最小，平均，总计）步进使用
-** count **-如果聚合为“ onchange”，则为值的数量；如果为其他聚合方法，则为间隔的数量。如果设置了步，计数将被忽略。
-** from **-如果答案中应包含* from *字段
-** ack **-如果答案中应包含* ack *字段
-** q **-如果答案中应包含* q *字段
-** addId **-如果答案中应包含* id *字段
-**限制**-返回的条目数不超过限制
-** ignoreNull **-如果应包含null值（false），由最后一个非null值（true）替换或由0（0）替换
-**汇总**-汇总方法：
    -* maxmax *-使用特殊算法。以较小的时间间隔拼接整个时间范围，并为每个时间间隔找到最大值，最小值，开始和结束值。
    -* max *-以较小的时间间隔拼接整个时间范围，并找到每个时间间隔的最大值，并将其用于此时间间隔（将忽略空值）。
    -* min *-与max相同，但取最小值。
    -*平均值*-与最大值相同，但取平均值。
    -*总计*-与最大值相同，但计算总值。
    -* count *-与max相同，但是计算值的数量（将计算空值）。
    -*无*-完全没有聚合。在给定期间内仅原始值。

除聚合“无”外，将为聚合计算第一个和最后一个点。
如果您手动请求某些汇总，则应忽略第一个和最后一个值，因为它们是根据期间以外的值计算得出的。

## StoreState
如果要将其他数据写入InfluxDB，则可以使用内置系统功能** storeState **。
此功能还可以用于转换其他历史记录适配器（如历史记录或SQL）中的数据。

不会根据ioBroker数据库检查给定的ID，也不需要在其中进行设置，而只能直接访问。

消息可以具有以下三种格式之一：

*一个ID和一个状态对象
*一个ID和状态对象数组
*具有状态对象的多个ID的数组

##通过Javascript进行历史记录记录管理
该适配器支持通过JavaScript启用和禁用历史记录日志，还支持使用其设置检索启用的数据点列表。

###启用
该消息要求具有数据点的“ id”。其他可选的“选项”用于定义特定于数据点的设置：

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
该消息需要具有数据点的“ id”。

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

###获取列表
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
当您随着时间的推移拥有更多数据时，历史记录适配器可能不是最佳选择，而实际数据库则更好。为此，还有两个用于SQL数据库的历史记录适配器（PostgreSQL，MS-SQL，MySQL，SQLite）和InfluxDB。
通过此更改，提出了一个问题，即如何将过去收集的数据转换为这些新适配器。

为此，准备了一些转换器脚本，可以帮助您完成任务。这些脚本是从命令行调用的。

###准备并分析传输目标中的现有数据
转换数据时，仅应传输尚未存在的那些数据。因此，存在第一组脚本，称为** analyze <db> .js **。此脚本应在开始时调用一次，以收集现有数据的某些数据并将其存储在本地.json文件中，以供实际的转换器脚本使用。
收集两种数据：

-**数据点ID的最早值**：存储每个现有数据点的第一个条目的时间戳，默认情况下，导入将其用于忽略所有新值。假设是从第一个条目开始完全填充数据，否则所有其他较早的值将被复制。此假设可以在导入时由参数覆盖。
-**每个数据点ID每天的现有值**：每天对现有数据进行分析，并将每天存储在已有数据的地方。这可以用作第一个数据的替代方法，以便也可以填充数据中的“漏洞”。

#### Analyticsinflux.js
可以在目录“转换器”中找到analyzerinflux.js。
该脚本将为InfluxDB实例收集上述数据。

**用法**：nodejs analyticsinflux.js [<InfluxDB-Instance>] [<Loglevel>] [--deepAnalyze] **示例**：nodejs analyticsinflux.js influxdb.0 info --deepAnalyze

参数：

-** <InfluxDB-Instance> **：应使用哪个influxdb-Adapter实例？ （默认：influxdb.0）如果需要将set设为脚本名之后的第一个参数。
-** <Loglevel> **：输出的日志级别（默认：info）。如果设置，则必须是脚本名之后的第二个参数。
-**-deepAnalyze **：每天也收集现有值，默认情况下仅查询最早的值。

然后，脚本将使用收集的数据生成一个或三个.json文件。这些文件然后由实际的转换器脚本使用。

#### Analyticssql.js
可以在目录“转换器”中找到analyticssql.js。
该脚本将为SQL实例收集上述数据的一部分。

**用法**：nodejs analyticssql.js [<SQL-Instance>] [<Loglevel>] **示例**：nodejs analyticssql.js sql.0 info

参数：

-** <SQL实例> **：应该使用哪个SQL-Adapter实例？ （默认值：sql.0）如果需要将set设置为脚本名之后的第一个参数。
-** <Loglevel> **：输出的日志级别（默认：info）。如果设置，则必须是脚本名之后的第二个参数。

然后，脚本将使用收集的数据生成两个.json文件。这些文件然后由实际的转换器脚本使用。
当前，因为未收集数据，所以无法使用--processNonExistingValuesOnly转换脚本。

###将历史数据转换为数据库
您可以在目录“转换器”中找到history2db.js。

该脚本将直接使用磁盘上的历史记录适配器生成的JSON文件将其传输到数据库中。
此外，它使用目标数据库中已有值的预生成数据文件来仅转换不存在的数据。

该脚本可以在没有任何分析步骤的情况下运行，然后您需要将startdata设置为参数，它将简单地从该时间点向后转换任何内容。
如果您之前运行过分析并且存在最早的DBValues.json文件，则只有这些数据点会被转换，除非您使用参数进行更改。
之前运行分析并使用数据文件时，它们也会使用所有转换后的数据进行更新，因此第二次运行通常不会生成重复项。
要重置数据，请删除文件“ earliestDBValues.json”，“ existingDBValues.json”和/或“ existingDBTypes.json”。

然后，Converter将在所有可用的日期中在时间上倒退，并将确定要传输到InfluxDB的数据。

如果要中止该过程，可以按“ x”或“ <CTRL-C>”，转换器将在当前数据文件之后中止。

转换器脚本本身应与所有支持“ storeState”方法的历史记录适配器一起使用。

注意：迁移许多数据将在系统上产生一定的负载，尤其是当转换器和目标数据库实例在同一台计算机上运行时。在操作期间监视系统的负载和性能，并可能使用“ delayMultiplicator”参数来增加转换器中的延迟。

**用法：** nodejs history2influx.js数据库实例[日志级别] [日期至开始| 0] [数据路径] [delayMultiplicator] [--logChangesOnly [日志间隔（m）]] [- -ignoreExistingDBValues] [--processNonExistingValuesOnly] [--processAllDPs] [--simulate] **示例**：nodejs history2influx.js influxdb.0 info 20161001 / path / to / data 2 –logChangesOnly 30 --processNonExistingValuesOnly

可能的选项和参数：

-** DB-Instance **：将数据发送到的DB-Instance。Required参数。必须是脚本名之后的第一个参数。
-** Loglevel **：输出的日志级别（默认：info）。如果设置，则必须是脚本名之后的第二个参数。
-**开始日期**：以yyyymmdd格式开始的日期（例如20161028）。使用“ 0”使用检测到的最早值。如果设置，则必须是脚本名之后的第三个参数。
-**数据路径：数据文件的路径。取消安装iobroker-install-directory / iobroker-data / history-data。如果设置，则必须是脚本名之后的第四个参数。
-** <delayMultiplicator> **：通过乘法器修改脚本中几个动作之间的延迟。 “ 2”将意味着转换后自己计算的延迟加倍。如果设置，则必须是脚本名之后的第五个参数。
-**-logChangesOnly [relog-Interval（m）] **：设置--logChangesOnly时，将解析并减少数据，以便仅将更改的值存储在InfluxDB中。另外，可以在几分钟内设置“ relog-Interval（s）”，以在此间隔后重新记录未更改的值。
-**-ignoreExistingDBValues **：使用此参数，将忽略所有现有数据，并将所有数据插入到DB中。请确保没有重复生成。此选项可用于修复丢失某些数据的数据中的“漏洞”。默认情况下，它仅用数据库中的至少一个条目填充所有数据点。可以用--processAllDPs覆盖
-**-processNonExistingValuesOnly **：通过此参数，可以使用analyst脚本中的“按日存在的现有数据点”文件，并针对每天和每个数据点进行检查。在这种模式下，现有的DB值总是被忽略，也不会被更新，因此请在使用该模式后再进行一次分析！！！
-**-processAllDPs **：使用此参数，可以确保将历史文件中的所有现有数据点都传输到数据库中，即使这些数据点在该数据库中目前尚不存在。
-**-simulate **：使用此参数可以启用仿真模式，这意味着不会发生真正的写操作，并且分析数据文件也不会在退出时更新。

## 1.9.0（2020-01-16）
*（foxriver76）删除了adapter.objects的用法
* __需要js-controller> = 2.0.0__

### 1.8.7（2019-09-02）
*（paul53）旧文件应自动删除

### 1.8.6
*修复了一些较小的问题并优化了一些文本

### 1.8.5（2018-07-02）
*（Apollon77）在storeState中修复的错误

### 1.8.4（2018-06-24）
*（Apollon77）修复/允许禁用开始和结束值的写入

### 1.8.0（2018-06-19 / 24）
*（Apollon77）添加选项以将数据写入不同的ID，从而使设备更改更加容易。检索数据适用于两个ID

### 1.7.4（2018-04-03）
*（AlCalzone）修复了特殊字符状态的文件名处理

### 1.7.3（2018-03-28）
*（Apollon77）尊重“永久保留”设置以保留数据点配置

### 1.7.2（2018-02-05）
*（bondrogeen）Admin3修复

### 1.7.1（2018-01-31）
*（Bluefox）Admin3修复

### 1.7.0（2018-01-17）
*（bluefox）准备使用Admin3

### 1.6.6（2017-12-20）
*（bluefox）翻译

### 1.6.5（2017-10-05）
*（Apollon77）修复了重新记录值功能

### 1.6.4（2017-08-12）
*（bluefox）添加“保存最后一个值”选项

### 1.6.3（2017-08-03）
*（Apollon77）修复了日志间隔的行为，以始终记录当前值

### 1.6.2（2017-04-07）
*修复数据类型转换

### 1.6.0（2017-02-28）
*（Apollon77）替换历史文件名中的某些字符

### 1.5.3（2017-02-22）
*（Apollon77）针对较早配置的小修复

### 1.5.2
*（Apollon77）增强了混合类型数据点的最小增量逻辑

### 1.5.1（2017-01-16）
*（bluefox）修复了适配器配置和数据点配置中浮点值的处理。

### 1.5.0（2016-12-01）
*（Apollon77）添加消息enableHistory / disableHistory
*（Apollon77）仅当值与数字的最小值不同时才添加对日志更改的支持
*（Apollon77）固定汇总计算

### 1.4.0（2016-10-29）
*（Apollon77）添加选项以重新记录未更改的值，使其更易于可视化
*（Apollon77）添加了转换器脚本以将历史数据移动到db

### 1.3.1（2016-09-25）
*（Apollon77）固定：ts被指定为val
*（bluefox）修复历史对象的选择器

### 1.3.0（2016-08-30）
*（bluefox）仅与新管理员兼容

### 1.2.0（2016-08-27）
*（bluefox）将对象名称从历史记录更改为自定义

### 1.1.0（2016-08-27）
*（bluefox）修复了最后一点的聚合
*（bluefox）聚合没有传递任何原始数据而没有任何聚合

### 1.0.5（2016-07-24）
*（bluefox）大间隔修复了聚合

### 1.0.4（2016-07-05）
*（bluefox）在几秒钟内修复了聚合

### 1.0.3（2016-05-31）
*（bluefox）如果忽略null，则在最后画线

### 1.0.2（2016-05-29）
*（bluefox）彼此切换最大值和最小值

### 1.0.1（2016-05-28）
*（bluefox）也计算“更改时”的结束/起始值

### 1.0.0（2016-05-20）
*（bluefox）更改默认聚合名称

### 0.4.1（2016-05-14）
*（bluefox）支持sessionId

### 0.4.0（2016-05-05）
*（bluefox）使用来自SQL适配器的聚合文件
*（bluefox）修复退出时的值存储
*（bluefox）每5分钟存储一次所有缓存的数据
*（bluefox）支持ms

### 0.2.1（2015-12-14）
*（bluefox）添加设置说明
*（bluefox）将聚合函数放置在单独的文件中，以实现与其他适配器的共享
*（微笑杰克）添加生成演示数据
*（微笑杰克）用自己的叉子获得历史
*（bluefox）添加storeAck标志
*（bluefox）用于onchange的模型

### 0.2.0（2015-11-15）
*（Smiling_Jack）保存并加载到适配器中，而不是js-controller中
*（Smiling_Jack）聚合数据点
*（Smiling_Jack）支持存储路径

### 0.1.3（2015-02-19）
*（bluefox）修复了历史记录中的小错误（感谢Dschaedl）
*（bluefox）更新管理页面

### 0.1.2（2015-01-20）
*（bluefox）通过配置启用保存和关闭按钮

### 0.1.1（2015-01-10）
*（bluefox）检查状态是否未删除

### 0.1.0（2015-01-02）
*（bluefox）启用npm安装

### 0.0.8（2014-12-25）
*（bluefox）支持反跳间隔

### 0.0.7（2014-11-01）
*（bluefox）存储所有更改，而不仅仅是lc！= ts

### 0.0.6（2014-10-19）
*（bluefox）添加配置页面

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2020 Bluefox <dogafox@gmail.com>, Apollon77

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