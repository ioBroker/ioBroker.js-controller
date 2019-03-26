---
BADGE-Number of Installations: http://iobroker.live/badges/influxdb-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.influxdb.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.influxdb.svg
BADGE-Tests: http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.influxdb.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.influxdb/README.md
title: 没有标题
hash: 3NwDgz/ioa8U77f97f49AfeoC0uK8sBFk9+oqMjp09Y=
---
* * *

## <span id="Konfiguration">配置</span>
### <span id="Storage-Einstellungen">数据库设置</span>
此处输入在创建流入数据库时进行的设置，以允许ioBroker服务器访问此数据库。 [![]（图/ influxdb_ioBroker_Adapter_influxDB_Konfig.jpg）](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

####主持人
数据库服务器的主机名或IP。

#### Port
在此输入端口，通过该端口可以在主机上访问数据库。

####协议
这里指出是否应该通过简单的http或安全的https来访问数据库

####登录
应在其ID下记录数据的数据库（用户）的所有者

####密码
这是SQL数据库中指定用户的密码。出于安全原因，必须在以下字段中重复输入此密码。

####四舍五入
指示应存储数字的小数位数。

####收集写行动
此处输入的值确定在将数据写回数据库之前应该有多少新数据可用。值越高，写入DB的频率越低，适配器发生故障时数据丢失的越多。 0确保立即进入DB。因此，条目“0”表示：立即写入数据库。这会增加数据库和适配器的负载。

####写入间隔
如果在此处输入值，则数据将在指定的时间（以秒为单位）后写入数据库，即使尚未达到最后一项中设置的数据数。

### <span id="Default_Einstellungen_fuer_Zustaende">状态的默认设置</span>
这些设置指定在配置各个数据点的日志记录时要用作默认值的值。 [![]（图/ influxdb_ioBroker_Adapter_influxDB_objects.jpg）](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

####仅记录更改
如果选中此复选框，则连续数据必须具有不同的值，以便可以记录它们。发送传感器，例如几次相同的温度，这是不记录的，只有当一次改变再创造一个记录。

####记录相同的值
如果在相同的值下仍然不时地存储这些（未改变的）值，则可以在此定义以秒为单位的时间跨度，这应该多久发生一次。因此，输入0意味着不应存储重复值。

####与最后一个值的最小偏差
但是，如果不应使用不断变化的值保存这些（更改的）值，则可以在此处指定最小值，该值必须更改，以便再次保存新值。例如，这对于当前的测量插座很有用，其中不应记录每个微小的变化。因此，条目0表示应存储每个值。

####另存为
如有必要，可以在此处定义用于存储数据的数据类型。这应该只在第一次激活之前完成。

[![]（图/ influxdb_ioBroker_Adapter_SQL_objects_type.jpg）](../../../de/adapterref/iobroker.influxdb/img/iinfluxdb_oBroker_Adapter_SQL_objects_type.jpg)在InfluxDB中，数据类型使用第一个数据记录定义，之后必须保持相同。

####存储保留时间
定义值应存储多长时间（无限，2年，1年，......，1天）。 [![]（图/ influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg）](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

####去抖时间（ms）
防止过于频繁地更改值。这是再次写入值之前的最小距离（以毫秒为单位）。

* * *

## <span id="Einstellungen_fuer_Datenpunkte">数据点的设置</span>
要记录的数据点的设置在相应数据点的“对象”（Objects）选项卡中执行。 [![ioBroker_adapter_History_devices]（img / influxdb_ioBroker_adapter_History_devices.jpg）]（img / influxdb_ioBroker_adapter_History_devices.jpg）为此，请在最右侧列中选择所需数据点的齿轮图标。配置菜单打开：[！[]（Img / Influxdb_ioBroker_Adapter_influxDB_objects.jpg）](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

###已<span id="Aktiviert">激活</span>
激活数据点的记录仅记录更改：如果数据点的值更改，则仅保存值。这节省了存储空间。通过以下方式预先通过表头中的过滤器字段过滤数据点来获得有用的结果。只筛选出“状态”数据点，然后记录它们[![Filtern_loggen]（IMG / influxdb_Filtern_loggen.jpg）](../../../de/adapterref/iobroker.influxdb/img/Filtern_loggen.jpg)

1.将视图显示为列表而不进行分组
2.输入过滤条件
3.选择要记录的所有过滤数据点
    1.打开日志参数设置的配置菜单
4.一次启用所有筛选数据点的日志记录
    1.统一选择其他参数，例如“仅更改”和所有过滤数据点的提前期
5.保存更改

* * *

## <span id="Bedienung">**操作**</span>
如果在“历史记录”下的标题栏中选择“with”或“Influxdb.0”，则只会显示带日志记录的数据点。 [![]（img / Influxdb_ioBroker_Adapter_SQL_objects_filter.jpg）]（img / influxdb_ioBroker_Adapter_SQL_objects_filter.jpg）点击齿轮图标会打开记录的数据：[！[]（img / influxdb_ioBroker_Adapter_SQL_objects_Data.jpg）]（img / influxdb_ioBroker_Adapter_SQL_objects_Data.jpg）在表格标签中，数据以表格形式显示。 [！[IoBroker_Adapter_rickshaw03]（IMG / influxdb_ioBroker_Adapter_rickshaw03.jpg）](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_rickshaw03.jpg)在图表选项卡中，安装人力车适配器时可以显示历史图形。

* * *

##安装InfluxDB数据库
下面是安装InfluxDB数据库的说明。

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2015-2018 bluefox

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