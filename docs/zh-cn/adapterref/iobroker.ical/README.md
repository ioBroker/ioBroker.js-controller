---
BADGE-Build Status: https://travis-ci.org/ioBroker/ioBroker.ical.svg?branch=master
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
BADGE-Github Issues: http://githubbadges.herokuapp.com/ioBroker/ioBroker.ical/issues.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ical.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ical/README.md
title: ioBroker iCal适配器
hash: ChebhMhoZ0yebwHjnqwSf3xjQowF2GWOm3TesxP/sy0=
---
![商标](../../../en/adapterref/iobroker.ical/ical.png)

＃ioBroker iCal适配器此适配器允许从特定URL读取.ics文件并进行解析（Google日历或iCal）。
或者，可以使用本地`.ics`文件（使用文件的绝对路径而不是URL）
##用法
基于适用于（CCU.IO）的iCal适配器[https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical]来自vader722

###适配器iCal
用于ioBroker的iCal适配器从指定的URL读取`.ics`格式的日历文件，并将事件（位于预定义的时间间隔内）写入ioBroker变量。另外，也可以使用本地.ics文件（使用文件的绝对路径代替URL）。
可以使用`basic html - String (unescaped)`小部件在VIS中显示它们。

创建两个变量：

-`iCalReadTrigger`
-`iCalEvents`

变量`iCalReadTrigger`用于触发读入过程。
在设置中，可以放置几个URL，从中读取日历。
然后依次读取日历并汇总结果。
可替代地，还可以给读取命令一个URL，例如URL。暂时阅读另一个日历。

要读取defaultURL，必须将字符串`read`写入变量`iCalReadTrigger`中。

要从任何URL读取，必须将字符串`read https: // ...`写入变量`iCalReadTrigger`中。

结果返回变量`iCalEvents`中的iCal适配器。

通过将`check`写入` iCalReadTrigger`，将在读取的数据上触发事件检查，而无需重新读取数据。

或者，适配器还可以按可定义的时间间隔自动查询日历（仅使用`defaultURL`）。
为此，请使用变量runEveryMinutes在设置中设置轮询间隔（以分钟为单位）。

配置文件中选项的含义：

-`preview`：7＃表示约会提前7天显示
-`runEveryMinutes`：30＃表示适配器每30分钟自动重新记录一次日历。如果没有自动读取0
-`colorize`：true＃今天的约会将被涂成红色，明天的约会将被涂成橙色，此选项将覆盖选项everyCalOneColor
-`debug`：false＃如果为true，则将扩展输出写入CCU.IO日志
-`defColor`：`white`＃设置日历项的默认颜色
-`fulltime`：``＃确定全天约会用哪个字符串替换00:00时间。对于空格（引号之间），全天约会将省略时间
-`replaceDates`：true＃如果为true，则将今天的日期替换为字符串TodayString（例如Today）。明天通过字符串明日约会
-`everyCalOneColor`：false＃如果为true，则多个日历将使每个日历以指定的颜色上色。如果设置了colorize选项，则将不起作用！
-`Calendar1`：
-“ calURL”：“ http：//11111.ics”，日历的URL
-“ calColor”：如果设置了“ everyCalOneColor”选项，则为日历的“白色”颜色。

可以输入任意数量的日历。标准配置文件包含2个日历。

-`事件`：
-`name`：“假期”：
-`enabled`：true＃确定事件是否将被编辑
-`display`：false＃确定该事件是否也显示在iCalEvents中，或仅评估

通过设置事件（在此示例中为“ vacation”），在日历中搜索字符串“ vacation”。
如果日历中包含关键字“假期”的约会，则会自动将“名称假日”设置为“真”。如果约会结束，则状态将重置为false。
在预览期间的每一天都会创建一个状态。危险！搜索一个子串，i。日历“假期”中的条目以及“假日父母”条目均被识别。设置事件时必须考虑到这一点。

通过在VIS中调整CSS，可以设置今天（标准红色）和明天（标准橙色）的样式：

-`iCalWarn`-今天的换行日历条目
-`iCalPreWarn`-明天开始行日历输入
-`iCalNormal`-今天的行尾
-`iCalNormal2`-行的明天结束

###日历
#### Apple iCloud日历
如果先前已共享，则可以查看Apple iCloud日历。最好为Homematic创建自己的日历，因为该日历将与所有人共享。
为此，请在“日历”应用中的日历上单击鼠标右键，然后选择“共享设置”。现在检查“公共日历”并复制显示的URL。重要提示：网址以webcal开头：// p0X-cale .....
`webcal`必须替换为` http`。然后在defaultURL的设置中输入此URL，或在`read URL`中指定它。 `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Google日历
要包括Google日历，您必须转到Google日历日历设置（鼠标单击日历旁边的“向下箭头”）。通过单击“专用地址”字段旁边的`ICAL`符号，可以找到日历的URL。然后在defaultURL的设置中输入此URL，或者在`read URL`中指定它。 `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`。

#### OwnCloud日历
要包括OwnCloud的硬日历，您必须在OwnCloud的日历视图中将该日历批准为硬地日历，并在其中链接。

####贝加尔湖轻量级CalDAV + CardDAV服务器
Baikal服务器提供了“ ics-export”插件，该插件可将日历导出为单个ICal文件。该导出插件是通过URL选择的，并允许与此ioBroker适配器进行无缝集成。请将导出过滤器添加到日历的URL（`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`）。如果遇到身份验证问题，请在贝加尔湖服务器的WebUI的管理设置中将`WebDAV authentication type`从`DIGEST`更改为`BASIC`。

### CSS
在生成的HTML中，包括两种CSS类，以允许设计自由。

####基于时间的CSS类
* _iCalNormal _ / _ iCalNormal2_：此事件在今天（仍在运行）之前或之后（三天内）开始，默认颜色（不带CSS且不带日历色）是配置的适配器颜色
* _iCalWarn _ / _ iCalWarn2_：事件从今天开始，没有CSS且没有calendercolor的默认颜色是“红色”。
* _iCalPreWarn _ / _ iCalPreWarn2_：活动将于明天开始，没有CSS和没有日历颜色的默认颜色是“橙色”。
* _iCalPrePreWarn _ / _ iCalPrePreWarn2_：事件从明天开始，不带CSS和不带日历颜色的默认颜色为“黄色”。

第一个CSS类（例如iCalNormal2）用于HTML的日期和时间部分，第二个CSS类（例如iCalNormal2）用于事件名称。

这些CSS类用于格式化输出的CSS示例（例如，日期/时间向左+粗体和事件名称向右...）：

```
.icalWarn{
    color:red;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPreWarn{
    color:yellow;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPrePreWarn{
    color:white;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPrePreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalNormal{
    color:green;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalNormal2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

####基于日历的CSS类
每个跨度还根据事件所在的日历的名称分配了一个CSS类。为此，将在适配器配置中定义的“日历名称”用于此（空格由下划线代替）。

* _iCal- <日历名称> _：此类用于HTML的日期和时间部分
* _iCal-> calendername2> _：此类用于事件名称

要设置这些CSS类，您还需要使用基于时间的CSS类，例如_.icalNormal2.iCal- <日历名称> 2_：

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

####生成的html示例
```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

##筛选
在实例选项中，可以为每个日历维护一个过滤器。它必须是用分号分隔的列表。如果启用选项`Filter as regular expression`，则过滤器将解释为正则表达式。在日历刷新期间，将排除通过描述，位置或摘要匹配的所有事件。

搜索模式为：

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

黑名单：如果要排除特定位置的所有事件，请使用`LOCATION:MyLocation`或简单的`MyLocation`或2个位置`LOCATION:MyLocation;LOCATION:SomewhereElse`。
白名单：如果您只想包含特定位置的事件，请使用正则表达式，例如`/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/`或2个位置`/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
### 1.7.2 (2019-12-02)
* (bluefox) Documentation was changed

### 1.7.1 (2019-01-08)
* (twonky4) Fixed issue with UTC of until in recurring appointments
* (twonky4) Fixed possible empty color

### 1.7.0 (2018-11-27)
* (twonky4) Add filter option
* (twonky4) Add support of events for configured date period; changed state names from `events.*` to `events.0.today.*`
* (twonky4) Add Count of events for tomorrow - state `data.countTomorrow`
* (twonky4) Events without time part and same start and end are interpreted as full day events
* (twonky4) Remove special chars from event states

### 1.6.6 (2018-10-22)
* (twonky4) Fixed html for disabled colorize
* (twonky4) Fixed timezone handling for events during change from daylight saving time back to standard time
* (twonky4) Fixed events without end date moved to different day

### 1.6.5 (2018-10-13)
* (twonky4) Simplify timezone solution
* (twonky4) Fix calendars without timezones

### 1.6.4 (2018-10-12)
* (twonky4) Support windows timezones
* (twonky4) Don't fail on invalid timezones

### 1.6.3 (2018-10-10)
* (twonky4) Fixes timezone issue in fullday recurring appointments

### 1.6.2 (2018-10-08)
* (twonky4) Fixes timezone issue in recurring appointments

### 1.6.1 (2018-06-04)
* (Apollon77) Several fixes and optimizations

### 1.6.0 (2018-04-13)
* (Apollon77) Several fixes and optimizations
* (Apollon77) Upgrade node-ical library to allow big files to work
* (Apollon77) Better handling of full day events
* (Apollon77) Allow "Replace 0:00" to have 30 characters

### 1.5.3 (2018-03-24)
* (Apollon77) Also make location available in data table

### 1.5.2 (2018-03-23)
* (Apollon77/BuZZy1337) Fix several display issues

### 1.5.0 (2018-03-07)
* (bluefox) ready for Admin3

### 1.4.2 (2018-02-21)
* (Apollon77) Also display events that started before today

### 1.4.1 (2018-02-05)
* (Apollon77) also allow events without end parameter and assume an 0minute event then and set end = start

### 1.4.0 (2018-01-01)
* (Apollon77) allow multiple Events to be contained in one calendar entry. Make sure the names are unique enough because the search only checks for existance of the event name in the text.
* (Apollon77) correctly detect events that started before 0:00
* (Apollon77) also show events with no duration (sometimes used as reminders)
* (Apollon77) correctly show end times for events that are longer then 1 day (including "+x" to show day duration)
* (Apollon77) many enhancements and optimizations in formatting the infos (especially when event has already started but not ended)
* (Apollon77) add option to hide year numbers
* (Apollon77) add own CSS classes to each entry with the names iCal-<calendername> and iCal-<calendername>2 to be able to really design it as needed
* (Apollon77) Known issue: For recurring events it works to delete single events, but it do not work to move them

### 1.3.3 (2017-10-30)
* (DutchmanNL) Translate to Netherlands

### 1.3.2 (2017-02-24)
* (jens-maus) added singular form for 'days'

### 1.3.1 (2017-02-20)
* (jens-maus) implemented support for date excludes for recurring events

### 1.3.0 (2017-02-17)
* (jens-maus) switched ical module to use 'node-ical' which should improve ics format compatibility

### 1.2.2 (2017-02-17)
* (jens-maus) added changes to show "Noch X Tage" for fullday events (e.g. school holidays)

### 1.2.1 (2017-02-11)
* (jens-maus) applied workaround of ics files with TZID before DATE in DTSTART/DTEND

### 1.2.0 (2016-07-23)
* (bluefox) allow read from files
* (bluefox) add tests
* (bluefox) fix all day indication

### 1.1.3 (2016-07-19)
* (bluefox) fix error if entry is invalid
* (bluefox) use newer ical packet version

### 1.1.2 (2015-06-30)
* (jens-maus) implemented some more text replacement terms
* (jens-maus) we only colorize the date+time for imminent appointments
* (jens-maus) added cloneextend dependency definition and fix for dayafter mods
* (jens-maus) ported the "dayafter" change of the ccu.io ical adapter to the iobroker

### 1.1.1 (2015-08-16)
* (bluefox) enable auth only if user set.

### 1.1.0 (2015-08-13)
* (elmars) Added ability to provide username/password to authenticate against protected ics files. Tested with owncloud.

### 1.0.2 (2015-07-21)
* (bluefox) fix error if ICS file has empty lines

### 1.0.1 (2015-07-21)
* (bluefox) change readme title

### 1.0.0 (2015-07-21)
* (bluefox) fix error with set event to false

### 0.1.1 (2015-06-14)
* (bluefox) add additional fields for ioBroker.occ

### 0.1.0 (2015-03-24)
* (bluefox) make it compatible with new concept

### 0.0.2 (2015-02-22)
* (bluefox) fix error with configuration
* (bluefox) fix error with event object creation

### 0.0.1 (2015-02-17)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2020, bluefox <dogafox@gmail.com>

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