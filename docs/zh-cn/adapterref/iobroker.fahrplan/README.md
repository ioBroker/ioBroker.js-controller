---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fahrplan/README.md
title: ioBroker.fahrplan
hash: mKkOuWLEONeQnNK12CHQxy049d7Izp+sL132jYzPt5A=
---
![商标](../../../en/adapterref/iobroker.fahrplan/admin/fahrplan.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.fahrplan.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.fahrplan.svg)
![安装数量（最新）](http://iobroker.live/badges/fahrplan-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/fahrplan-stable.svg)
![依赖状态](https://img.shields.io/david/gaudes/iobroker.fahrplan.svg)
![NPM](https://nodei.co/npm/iobroker.fahrplan.png?downloads=true)

＃ioBroker.fahrplan
![测试与发布](https://github.com/gaudes/ioBroker.fahrplan/workflows/Test%20and%20Release/badge.svg)

## Fahrplan适配器适用于ioBroker
###德文
移动API或HAFAS verwendet的Dieser Adapter。 HAFAS负责HaCon Fahrplan-Auskunfts-System和von vieleneuropäischenVerkehrsunternehmen verwendet，以及德国铁路公司的合同。
DFA[HAFAS-客户](https://github.com/public-transport/hafas-client)。

Der Adapter bietet hierbei drei Funktionen：

#### FahrplanfürVerbindungen（路线）
适配器和密码转换中的RoutenMüssen。
有关适配器的间隔间的信息，请参见参考资料。
可以在ioBroker dargestellt中使用HTML以及可选的详细信息。
VIS eingebunden werden中的Das HTML-Objekt kann einfach。

#### Benenrichrichung beiVerspätungender Routen
路线图路线图路线图道路图。因此，通过Telegram oder Alexa erfolgen的kann beispielsweise eine Benachrichtigung，跌倒了Allbin oder eine bestimmte Verbindungverspätetist。

#### AbfahrtstafelnfürStationen
Zusätzlich适配器适配器作者Abfahrtstafelfürkonfigurierte Stationen。
Hierbei werden dienächstendrei Abfahrten einer Station Abgerufen und als Objekte和HTML dargestellt。

＃＃＃ 英语
ioBroker的此适配器使用HAFAS的移动API。 HAFAS是整个欧洲的公共交通提供商使用的公共交通管理系统，例如德意志铁路。
[HAFAS-客户](https://github.com/public-transport/hafas-client)用于访问HAFAS。

适配器提供三种功能：

####连接时间表（路由）
必须在适配器配置中配置并启用所需的路由。
适配器将按配置的时间间隔自动检索连接信息。
接下来的三个连接在ioBroker中另存为HTML，并可选地另存为详细对象。
HTML对象可以很容易地在VIS中使用。

####路线延迟通知
可以为配置的路由激活延迟通知。例如，当所有或一个特定的连接被延迟时，可以通过Telegram或Alexa发出通知。

####车站发车时刻表
另外，适配器为配置的工作站提供了出发时间表。
在这里，接下来的三个连接被公开并创建为对象和HTML。

## Konfiguration
###德文
Die Start- and Zielorte sowie Zwischenzielemüssenmit ihrer numerischen ID angegeben werden。
Eine Suchfunktion ist in Tab Einstellungen integriert。

#### Tab Einstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings.png)

| Einstellung | Beschreibung | ------------------------------ | --- | | Anbieter | Auswahl des zu verwendenden Anbieters，aktuell DB和ÖBB| Aktualisierungsintervall |在Minuten的Angabe路线aktualisiert werden中的间隔| Verspätetmarkieren ab | Minbinn ab der die Verbindung地区的Verspätung地区。 Standardmäßigwerden nurVerspätungenab zwei Minuten markiert | HTML-Ansicht erzeugen | Erineugt专业版路线einem Objekt中的Route Eine konfigurierbare HTML-Tabelle | Detailierte Objekte speichern |遵守法律| JSON-Elemente speichern | DieRückgabevon HAFAS erfolgt als JSON，死了zur Fehlerbehebung gespeichert werden

这样的集成是非常有用的。 Zuerst muss ein Anbieterausgewähltwerden。
Danach kannüberdas Suchfeld和Drückendes Knopfs“探索”纳赫艾纳站gesucht werden。
Die Suchergebnisse der aktuellen搜寻werden在der Tabelle angezeigt。

#### Tab Routen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_routes.png)

Mit dem + -ButtonkönnenneueEinträgezur Tabellehinzugefügtwerden。

| Einstellung | Beschreibung | ----------------------------- | --- | | Nr | Die Unmmer Entspricht dem Unterknoten in Objekten und wird automatisch vergeben。
| Aktiv | Wenn的路线图和werden的图框信息|冯| Numerische ID von Startbahnhof oder Starthaltestelle（Ermittlungüber追求）|冯（艾格纳名字）| Benutzerdefinierter名称von Startbahnhof oder Starthaltestelle，来自HTML-和语言版本|纳赫Numerische ID von Zielbahnhof oder Zielhaltestelle（Ermittlungüber追求）| Nach（艾格纳名称）| Benutzerdefinierter名称von Zielbahnhof oder Zielhaltestelle，来自HTML-和语言文本verwendet |通过1 | Fahrtüberbestimmten Ort angegeben als numerische ID（可选，父级）|通过2 | Fahrtüberbestimmten Ort angegeben als numerische ID（可选，父级）| Verkehrsmittel | Auswahl des Verkehrsmittels，z.B.巴士，S-Bahn，usw。奥地利标准法院|最高版权| Maximale Anzahl，一个Umstiegen。 0分钟前到Verbindungen。
| Abfahrten | Anzahl abzurufender Fahrten | Fahrradmitnahme | Nur Verbindungen mit Fahrradmitnahmeauswählen

#### TabVerspätungsalarm
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_delaynotification.png)

Mit dem + -ButtonkönnenneueEinträgezur Tabellehinzugefügtwerden。

| Einstellung | Beschreibung | ----------------------------- | --- | | Nr | Die Unmmer Entspricht dem Unterknoten in Objekten und wird automatisch vergeben。
| Aktiv | Wenn derVerspätungsalarmist Wird Diesergeprüft|路线|发出警报的路线| Geplante Abfahrt | Geplante Abfahrtszeit der zuprüfenden路线（Leer = Alle Verbindungen）| Wochentag | Wochentage an denen diePrüfungerfolgen soll |在Minuten的Benachrichtigung |阿萨尔·德·米诺滕·沃·阿布法尔特文字说明| Angabe eines vorhandenen Objekts

Hinweis zum Ausgabetext：来自VIS z.B.的kann neben einfachen Objekten “说”-Alexa适配器的对象，而“响应”-Telegram适配器对象的对象。

#### Tab Abfahrtstafeln
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_departuretimetables.png)

Mit dem + -ButtonkönnenneueEinträgezur Tabellehinzugefügtwerden。

| Einstellung | Beschreibung | ----------------------------- | --- | | Nr | Die Unmmer Entspricht dem Unterknoten in Objekten und wird automatisch vergeben。
| Aktiv | Wenn der Eintrag女演员Wird Dieser Abgerufen |冯| Numerische ID von Startbahnhof oder Starthaltestelle（Ermittlungüber追求）|冯（艾格纳名字）| Benutzerdefinierter名称von Startbahnhof oder Starthaltestelle，来自HTML-Ausgabe verwendet | Abfahrten |安扎尔·阿布祖鲁芬德·阿法尔滕

＃＃＃ 英语
起点，终点和中途停留必须用数字ID标识。
标签ID中集成了这些ID的搜索功能。

####选项卡设置
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings.png)

|设置|说明| ----------------------------- | --- | |供应商|选择公共交通提供商，目前为DB undÖBB|更新间隔|几分钟内更新路线的间隔|延迟后|定义延迟后的分钟数应标记为延迟，默认情况下，当延迟大于一分钟时，将标记延迟。创建HTML视图|为每个路由在对象中创建可配置的HTML表|保存详细对象|输出对象的配置|保存JSON元素|从HAFAS返回的是JSON，应保存以进行故障排除

####选项卡路线
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_routes.png)

使用+按钮，可以将新条目添加到表中。

|设置|说明| ----------------------------- | --- | | Nr |该数字与对象中的子节点匹配，并自动分配。激活|激活路由时更新连接信息|来自| Start Station oder start stop的数字ID |来自（自定义名称）|启动站或启动停止的自定义名称，用于HTML-和延迟通知输出|到|目的地站或目的地站的数字ID |来自（自定义名称）|目标站或目标站的自定义名称，用于HTML-和延迟通知输出|通过1 |跨过特殊电台作为数字ID（可选，默认情况下为空）通过2 |跨过特殊电台作为数字ID（可选，默认情况下为空）车辆|选择车辆，例如公共汽车，轻轨等。默认情况下，所有车辆都被选择。最高转移路由上的最大传输，仅直接连接为0 |出发收到的出发数量|自行车|仅选择允许使用自行车的连接

#### Tab延迟警报
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_delaynotification.png)

使用+按钮，可以将新条目添加到表中。

| Einstellung | Beschreibung | ----------------------------- | --- | | Nr |该数字与对象中的子节点匹配，并自动分配。激活|检查延迟警报是否已激活|路线|有关此延迟警报的路线计划出发检查计划的连接偏离（空=所有路线）|平日|工作日应检查连接|几分钟内通知|延迟警报启用时，出发前分钟|输出文本的对象|文本输出的ioBroker状态

“输出文本的对象”的提示：可以使用在VIS中使用的简单状态，但也可以使用Alexa适配器的“讲话”状态或电报适配器的“响应”状态。

####选项卡出发时间表
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_departuretimetables.png)

使用+按钮，可以将新条目添加到表中。

|设置|说明| ----------------------------- | --- | | Nr |该数字与对象中的子节点匹配，并自动分配。激活|项目激活后，连接信息将更新。来自| Start Station oder start stop的数字ID |来自（自定义名称）|启动站或启动停止的自定义名称，用于HTML-和延迟通知输出|出发收到的出发数量

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (Gaudes) Configurable number of journeys in routes
* (Gaudes) Configurable number of departures in departure timetable
* (Gaudes) Show product in departure timetable
* (Gaudes) Fix platform handling in departure timetable
* (Gaudes) Update Adapter template from 1.27.0 to 1.29.0
* (Gaudes) Include Dependabot updates

### 0.2.0 (2020-09-23)
* (Gaudes) Include Departure Timetable for configured stations
* (Gaudes) Security fix for serialize-javascript
* (Gaudes) Enhanced error handling and preparation for Sentry
* (Gaudes) setObject replaced with setObjectNotExists
* (Gaudes) Update Adapter template from 1.25.0 to 1.27.0
* (Gaudes) Include Dependabot with auto-merge
* (Gaudes) Include Dependabot updates
* (Gaudes) Fix ESLINT errors
* (Gaudes) Integrate Integration and Unit Tests
* (Gaudes) Remove Travis & Snyk

### 0.1.12 (29.08.2020)
* (Gaudes) Fix station search

### 0.1.11 (28.08.2020)
* (Gaudes) Fix error with timeout

### 0.1.10 (28.08.2020)
* (Gaudes) Fix structure of classes and files
* (Gaudes) Fix language in io-package.json
* (Gaudes) Futher cleanups in code

### 0.1.9 (07.08.2020)
* (Gaudes) Fix object type for datetime objects

### 0.1.8 (05.08.2020)
* (Gaudes) Fix creation of channels

### 0.1.7 (31.07.2020)
* (Gaudes) Translations for foreign languages
* (Gaudes) Fix adapter checker E502
* (Gaudes) Configurable delay time
* (Gaudes) HTML output for journeys with section information
* (Gaudes) Fix product selection

### 0.1.6 (28.07.2020)
* (Gaudes) Fix of delay output text with custom names of stations

### 0.1.5 (27.07.2020)
* (Gaudes) Custom names for departure and arrival stations, fix of delay output text

### 0.1.4 (25.07.2020)
* (Gaudes) fix deletion of unused states and channels

### 0.1.3 (24.07.2020)
* (Gaudes) correct object types, delay notification

### 0.1.2 (19.07.2020)
* (Gaudes) quickfix ontime

### 0.1.1 (19.07.2020)
* (Gaudes) code refactoring to classes, more config options for objects and HTML

### 0.1.0 (14.07.2020)
* (Gaudes) First public alpha release

### 0.0.2 (09.07.2020)
* (Gaudes) code enhancements (refactoring, correct names for variables)

### 0.0.1 (06.07.2020)
* (Gaudes) initial release

## License
MIT License

Copyright (c) 2020 Ralf Gaudes <ralf@gaudes.net>

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