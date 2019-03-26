---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ical/README.md
title: 已移至https://github.com/iobroker-community-adapters/ioBroker.ical
hash: /dEGEh2OLhnN7Vq4SjzGTuFNCsZByXWpYSt6YkdfhlQ=
---
![建立状态](https://travis-ci.org/ioBroker/ioBroker.ical.svg?branch=master)
![安装数量](http://iobroker.live/badges/ical-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.ical.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ical.svg)
![Github问题](http://githubbadges.herokuapp.com/ioBroker/ioBroker.ical/issues.svg)
![NPM](https://nodei.co/npm/iobroker.ical.png?downloads=true)

＃已移至https://github.com/iobroker-community-adapters/ioBroker.ical
![商标](../../../en/adapterref/iobroker.ical/admin/ical.png)ioBrokeriCal适配器=================

此适配器允许从特定URL读取.ics文件并解析它（Google Calendar或iCal）。或者，也可以使用本地.ics文件（使用文件的绝对路径而不是URL）

Siehedeustche[版本hier](README-de.md)（过时!!）。

##安装
```
node iobroker.js add ical
```

##用法
来自vader722的iCal适配器（CCU.IO）[https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical]

###适配器iCal
ioBroker的iCal适配器从指定的URL读取“.ics”格式的日历文件，并将位于预定义时间间隔内的事件写入ioBroker变量。或者，可以使用本地.ics文件（使用文件的绝对路径而不是URL）。
他们可以使用“基本的html  -  String（非转义）”小部件在VIS中显示。

Es werden 2 Variablen angelegt

iCalReadTrigger iCalEvents模具变量iCalReadTrigger dum Zum Triggern des Einlesevorgangs。在设置könnenmehrereURL hinterlegt werden，von welchen der Kalender eingelesen wird。 Die Kalender werden dann nacheinander eingelesen und das Ergebnis zusammengefasst。 Alternativ kann dem Lesebefehl auch eine URL mitgegeben werden，um z.B. zeitweilig einen anderen Kalender einzulesen。

zum Einlesen von den defaultURLs muss der String“read”in die Variable iCalReadTrigger geschrieben werden。
zum Einlesen von einer beliebigen URL muss der String“read https：// ...”in die Variable iCalReadTrigger geschrieben werden。
Das Ergebnis liefert der iCal Adapter in die Variable iCalEvents。

Durch schreiben von“check”in iCalReadTrigger wird der Check-Vorgang auf Events auf die gelesenen Daten ohne erneutes einlesen derDatenusgelöst。

Alternativ kann der Adapter auch automatisch in einem definierbaren Intervall die Kalender abfragen（nur mit der defaultURL）。 Dazu in den Settings mit der Variablen runEveryMinutes das Abfrageintervall（in Minuten）einstellen。

Bedeutung der Optionen im Konfigfile：

 - “预览”：7 heisst，dass Termine 7 Tage im voraus angezeigt werden
 - “runEveryMinutes”：30 bedeutet dass der Adapter automatisch alle 30min den Kalender neu einliesst。 Bei 0 wird nicht automatisch eingelesen
 - “colorize”：真正的Termine am heutigen Tag werdenrotgeefärbt，Termine am morgigen Tag orange，dieseOptionüberstimmtdieoption everyCalOneColor
 - “debug”：false bei true werden erweiterte Ausgaben ins CCU.IO Log geschrieben
 - “defColor”：“white”legt die StandardfarbederKalendereinträgefest
 - “fulltime”：“”legt fest durch welchen StringbeiganztägigenTerminendie Uhrzeit 00:00 ersetzt wird。 Bei Leerzeichen（zwischen den Hochkommas）wird dir UhrzeitbeiganztägigenTerminenweggelassen
 - “replaceDates”：true Bei true wird bei heutigen Terminen das heutige Datum durch den String todayString ersetzt（z.B。“Heute”）。 Bei morgigen Terminen durch den String tomorrowString
 - “everyCalOneColor”：“false Bei true wird bei mehreren Kalendern jeder Kalender in einer festzulegendenFarbeeingefärbt.Istdie Option colorize gesetzt，funktioniert die nicht！
 - “Calendar1”：{“calURL”：“http：//11111.ics”，URL des Kalenders“calColor”：“white”Farbe des Kalenders，wenn die选项“everyCalOneColor”gesetzt ist}eskönnennigbigviele Kalender eingetragen werden 。 Im Standard Konfigfile sind 2 Kalender eingetragen。
 - “事件”：{“Urlaub”：{“启用”：true，＃legt fest，ob das Event bearbeitet wird“display”：false＃legt fest，ob das event auch in dem iCalEvents angezeigt wird，oder nur ausgewertet wird} } Durch setzen eines Events（在diesem Beispiel“Urlaub”中），werden die Kalender nach dem String“Urlaub”durchsucht。 Sollte ein Termin mit dem Stichwort“Urlaub”in einem Kalender stehen，so yemat automatisch eine State mit dem Namen Urlaub auf True gesetzt。 Ist der Termin vorbei，wird der state wieder auf false gesetzt。 EswirdfürjedenTag des preview Zeitraums ein Status angelegt。 ACHTUNG！ Es wird nach einem Substring gesucht，d.h。 ein Eintrag im Kalender“Urlaub”wird genauso erkannt wie ein Eintrag“Urlaub Eltern”。 Dies ist beim festlegen der Ereignissezuberücksichtigen。

Durch Anpassen der css imVISkönnendieStyles von heutigen（Standard rot）und morgigen Terminen（Standard Orange）festegelegt werden：iCalWarn（Zeilenanfang Kalendereintrag heute）iCalPreWarn（Zeilenanfang Kalendereintrag morgen）iCalNormal（Zeilenende von heute）iCalNormal2（Zeilenende von morgen）

### Kalender
#### Apple iCloud Kalender
Apple iCloudKalenderkönnenangezeigtwerden，wenn sie vorher freigegeben werden。 Am besten einen eigenenKalenderfürdieHomematic anlegen，da der Kalender fuer alle freigegeben wird。
Dazu mit der rechten Maustaste auf dem Kalender in der Kalender App klicken undFreigabeeinstellungenauswählen。 Jetzt einen Haken bei“ÖffentlicherKalender”setzen und die angezeigte URL kopieren。 WICHTIG：die url beginnt mit webcal：// p0X-cale .....
“webcal”muss durch“http”ersetzt werden。 Diese URL dann entweder in den Settings bei defaultURL eintragen，oder sie bei“read URL”angeben，also z.B. “readURL http://p-03-calendarws.icloud.com/xxxxxxxxx”

#### Google Kalender
Zum Einbinden eines Google Kalenders muss die Kalendereinstellung des Google Kalenders aufgerufen werden（mit der Maus auf“runter Pfeil”neben dem Kalender klicken）。 Die URL des Kalenders bekommt man durch klicken auf das“ICAL”Symbol neben dem Feld“Privatadresse”。 Diese URL dann entweder in den Settings bei defaultURL eintragen，oder sie bei“read URL”angeben，also z.B. “readURL https://www.google.com/calendar/ical/xxxxxxxx/basic.ics”。

#### OwnCloud Kalender
Zum Einbinden von gesharten Kalendern einer OwnCloud muss man dort in der Kalenderansicht in OwnCloud diesen Kalender als gesharten Kalender freigeben und dort den Link zum Kalender anzeigen lassen und diese URL（https://owncloud.xxxxxx.de/remote.php/dav/calendars / USER / xxxxxxx_shared_by_xxxxxx？export）entsprechend in den ioBroker.ical Adapter mit Nutzername und Passwort angeben。

### CSS
在生成的HTML中，包含两种css类以允许设计自由。

####基于时间的CSS类
* _iCalNormal _ / _ iCalNormal2_：事件在今天之前开始（并且仍在运行）或之后在3天内开始，没有CSS且没有日历颜色的默认颜色是配置的适配器颜色
* _iCalWarn _ / _ iCalWarn2_：事件今天开始，没有CSS且没有日历颜色的默认颜色是“红色”
* _iCalPreWarn _ / _ iCalPreWarn2_：明天开始活动，没有CSS且没有日历颜色的默认颜色是“橙色”
* _iCalPrePreWarn _ / _ iCalPrePreWarn2_：事件开始后天，没有CSS且没有日历颜色的默认颜色是“黄色”

第一个CSS类（例如iCalNormal）用于HTML的日期和时间部分，第二个CSS类（例如iCalNormal2）用于事件名称。

那些用于格式化输出的CSS类的CSS示例有点不同（例如，日期/时间左+粗体和事件名右...）：

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
每个span还具有基于事件所在日历名称分配的CSS类。适配器配置中定义的“日历名称”用于此（空格由下划线替换）。

* _iCal- <calendername> _：此类用于HTML的日期和时间部分
* _iCal-> calendername2> _：此类用于事件名称

要设置这些CSS类，您还需要使用基于时间的CSS类，例如_.icalNormal2.iCal- <calendername> 2_：

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

##过滤器
在实例选项中，可以按日历维护过滤器。它必须是以分号分隔的列表。如果启用选项`Filter as regular expression`，则过滤器将被解释为正则表达式。在日历刷新期间，将排除按描述，位置或摘要匹配的所有事件。

搜索模式是：

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

黑名单：如果要排除特定位置的所有事件，请使用`LOCATION:MyLocation`或简单`MyLocation`或2个位置`LOCATION:MyLocation;LOCATION:SomewhereElse`。
白名单：如果您只想包含特定位置的事件，请使用正则表达式，如`/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/`或2个位置`/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

＃＃ 去做
*自述文件应该是英文的
*`data.trigger`不支持`check`选项

## Changelog

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

Copyright (c) 2014-2018, bluefox <dogafox@gmail.com>

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