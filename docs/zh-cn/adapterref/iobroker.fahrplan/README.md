---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fahrplan/README.md
title: ioBroker.fahrplan
hash: GWsU7BbGjTvlvQnERDAQlzFxtmNflVVqO1gilez5GBI=
---
![标识](../../../en/adapterref/iobroker.fahrplan/admin/fahrplan.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.fahrplan.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.fahrplan.svg)
![安装数量（最新）](https://iobroker.live/badges/fahrplan-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/fahrplan-stable.svg)
![依赖状态](https://img.shields.io/david/gaudes/iobroker.fahrplan.svg)
![NPM](https://nodei.co/npm/iobroker.fahrplan.png?downloads=true)

＃ioBroker.fahrplan
![测试与发布](https://github.com/gaudes/ioBroker.fahrplan/workflows/Test%20and%20Release/badge.svg)[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/fahrplan/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Fahrplan适配器适用于ioBroker
###德文
移动API或HAFAS verwendet的Dieser Adapter。 HAFAS负责HaCon Fahrplan-Auskunfts-System和von vieleneuropäischenVerkehrsunternehmen verwendet，以及德国铁路公司的合同。
[HAFAS-客户](https://github.com/public-transport/hafas-client)。

Der Adapter bietet hierbei drei Funktionen：

#### FahrplanfürVerbindungen（路线）
适配器和密码转换中的RoutenMüssen死了。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
适配器间的间隔时间和信息信息从头到尾。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
可以在ioBroker dargestellt中使用HTML以及可选的详细信息。
VIS eingebunden werden中的Das HTML-Objekt kann einfach。

#### Benenrichrichung beiVerspätungender Routen
路线图路线图路线图道路图。因此，通过Telegram oder Alexa erfolgen的kann beispielsweise eine Benachrichtigung，跌倒了Allbin oder eine bestimmte Verbindungverspätetist。

#### AbfahrtstafelnfürStationen
Zusätzlichbietet der Adapter eine Abfahrtstafelfürkonfigurierte Stationen。
Hierbei werden dienächstendrei Abfahrten einer Station Abgerufen und als Objekte和HTML dargestellt。

** Dieser Adapter可以自动访问Sentry Bibliotheken UM，并且可以自动生成和编辑Entwickler zuübermitteln。** Weitere详细信息和信息，请访问[哨兵插件](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry Reporting with ab JS-Controller 3.0 verwendet。

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
可以为配置的路由激活延迟通知。例如，当所有或一个特定的连接被延迟时，Telegram或Alexa可能会发出通知。

####车站发车时刻表
另外，适配器为配置的工作站提供了出发时间表。
在这里，接下来的三个连接被公开并创建为对象和HTML。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

## Konfiguration
###德文
Die Start- and Zielorte sowie Zwischenzielemüssenmit ihrer numerischen ID Angegeben werden。
Eine Suchfunktion ist in Tab Einstellungen integriert。

#### Tab Einstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings.png)

| Einstellung | Beschreibung | ------------------------------ | --- | | Anbieter | Auswahl des zu verwendenden Anbieters，aktuell DB，ÖBB和SBB | Aktualisierungsintervall |在Minuten的Angabe路线aktualisiert werden中的间隔| Verspätetmarkieren ab |位于Minuten ab der der Verbindung地区的Verspätung地区。 Standardmäßigwerden nurVerspätungenab zwei Minuten markiert | HTML-Ansicht erzeugen | Erineugt专业版路线Einem Objekt中的Route Eine konfigurierbare HTML-Tabelle | Detailierte Objekte speichern |遵守法律| JSON-Elemente speichern | DieRückgabevon HAFAS erfolgt als JSON，zure Fehlerbehebung gespeichert werden死了

这样的集成是非常重要的。 Zuerst muss ein Anbieterausgewähltwerden。
Danach kannüberdas Suchfeld和Drückendes Knopfs“探索”纳赫艾纳站gesucht werden。
Die Suchergebnisse der aktuellen搜寻werden在der Tabelle angezeigt。

#### Tab Routen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_routes.png)

Mit dem + -ButtonkönnenneueEinträgezur Tabellehinzugefügtwerden。

| Einstellung | Beschreibung | ----------------------------- | --- | | Nr | Die Unmmer和wird automatisch vergeben的Entspricht dem Unterknoten。
| Aktiv | Wenn的路线图和werden的路线图|信息| | | | | | | | | | | | | | | |冯| Numerische ID von Startbahnhof oder Starthaltestelle（Ermittlungüber追求）|冯（艾格纳名字）| Benutzerdefinierter名称von Startbahnhof oder Starthaltestelle，来自HTML-和语言文本verwendet |纳赫Numerische ID von Zielbahnhof oder Zielhaltestelle（Ermittlungüber追求）| Nach（艾格纳名称）| Benutzerdefinierter名称von Zielbahnhof oder Zielhaltestelle，来自HTML-和语言文本verwendet |通过1 | Fahrtüberbestimmten Ort angegeben als numerische ID（可选，首字母缩写）|通过2 | Fahrtüberbestimmten Ort angegeben als numerische ID（可选，首字母缩写）| Verkehrsmittel | Auswahl des Verkehrsmittels，z.B.公交车，S-Bahn，usw。奥地利标准商业协会|最大限度。版权|马克西姆·安扎尔（Maximale Anzahl）和乌姆斯蒂根（Umstiegen）。 0分钟前。
| Abfahrten |安扎尔（Anzahl）abzurufender Fahrten | Fahrradmitnahme | Nur Verbindungen mit Fahrradmitnahmeauswählen

#### TabVerspätungsalarm
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_delaynotification.png)

Mit dem + -ButtonkönnenneueEinträgezur Tabellehinzugefügtwerden。

| Einstellung | Beschreibung | ----------------------------- | --- | | Nr | Die Unmmer和wird automatisch vergeben的Entspricht dem Unterknoten。
| Aktiv | Wenn derVerspätungsalarmist Wird Diesergeprüft|路线|发出警报的路线| beziehen soll | Geplante Abfahrt | Geplante Abfahrtszeit der zuprüfenden路线（Leer = Alle Verbindungen）| Wochentag | Wochentage an denen diePrüfungerfolgen soll |在Minuten的Benachrichtigung |阿萨尔·德·分钟·沃特·阿布法尔特，在denen benachrichtigt werden soll |奥地利文字| Angabe eines vorhandenen Objekts

Hinweis zum Ausgabetext：来自VIS z.B.的kann neben einfachen Objekten “说”-Alexa适配器-或“响应”-电报适配器。

#### Tab Abfahrtstafeln
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_departuretimetables.png)

Mit dem + -ButtonkönnenneueEinträgezur Tabellehinzugefügtwerden。

| Einstellung | Beschreibung | ----------------------------- | --- | | Nr | Die Unmmer和wird automatisch vergeben的Entspricht dem Unterknoten。
| Aktiv | Wenn der Eintrag女演员Wird Dieser Abgerufen |冯| Numerische ID von Startbahnhof oder Starthaltestelle（Ermittlungüber追求）|冯（艾格纳名字）| Benutzerdefinierter名称von Startbahnhof oder Starthaltestelle，来自HTML-Ausgabe verwendet | Abfahrten | Anzahl abzurufender Abfahrten | Verkehrsmittel | Auswahl des Verkehrsmittels，z.B.公交车，S-Bahn，usw。 Standardmäßigwerden alle Verkehrsmittel奥地利

＃＃＃ 英语
起点，终点和中途停留必须使用数字ID进行标识。
这些ID的搜索功能集成在“选项卡设置”中。

####选项卡设置
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings.png)

|设置|说明| ----------------------------- | --- | |供应商|选择公共交通提供商，目前是DB，ÖBB和SBB |更新间隔|几分钟内更新路线的间隔|延迟后|标记延迟定义延迟后的分钟数应标记为延迟，默认情况下，当延迟大于一分钟时，将标记延迟。创建HTML视图|为每个路由在对象中创建可配置的HTML表|保存详细对象|输出对象的配置|保存JSON元素|从HAFAS返回的是JSON，应保存以进行故障排除

####选项卡路线
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_routes.png)

使用+按钮，可以将新条目添加到表中。

|设置|说明| ----------------------------- | --- | | Nr |该数字与对象中的子节点匹配，并自动分配。激活|激活路由后，连接信息将更新。来自| Start Station oder start stop的数字ID |来自（自定义名称）| Start Station oder start stop的自定义名称，用于HTML-和延迟通知输出|到|目的地站或目的地站的数字ID |来自（自定义名称）|目标站或目标站的自定义名称，用于HTML-和延迟通知输出|通过1 |跨过特殊电台作为数字ID（可选，默认情况下为空）通过2 |跨过特殊电台作为数字ID（可选，默认情况下为空）车辆|选择车辆，例如公共汽车，轻轨等。默认情况下，所有车辆都被选择。最大限度。转移|路径上的最大传输，仅直接连接为0 |出发收到的出发次数|自行车|仅选择允许使用自行车的连接

#### Tab延迟警报
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_delaynotification.png)

使用+按钮，可以将新条目添加到表中。

| Einstellung | Beschreibung | ----------------------------- | --- | | Nr |该数字与对象中的子节点匹配，并自动分配。激活|检查延迟警报是否已激活|路线|有关此延迟警报的路线计划出发|检查计划的连接偏离（空=所有路线）|平日|工作日应检查连接|几分钟内通知|延迟警报启用后，出发前分钟|输出文本的对象|文本输出的ioBroker状态

“用于输出文本的对象”的提示：可以使用在VIS中使用的简单状态，但也可以使用Alexa适配器的“讲话”状态或电报适配器的“响应”状态。

####选项卡出发时间表
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_departuretimetables.png)

使用+按钮，可以将新条目添加到表中。

|设置|说明| ----------------------------- | --- | | Nr |该数字与对象中的子节点匹配，并自动分配。激活|激活项目后，连接信息将更新。来自| Start Station oder start stop的数字ID |来自（自定义名称）| Start Station oder start stop的自定义名称，用于HTML-和延迟通知输出|出发收到的出发次数|车辆|选择车辆，例如公共汽车，轻轨等。默认情况下，所有车辆都被选中

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (Gaudes) Configurable colors for delays and on time
* (Gaudes) Prepare for WebLate translations

### 1.0.6 (2021-03-16)
* (Gaudes) Fix route selection in delay config
* (Gaudes) Fix SBB product suburban-train (Sentry #21)
* (Gaudes) Include Dependabot updates

### 1.0.5 (2021-02-22)
* (Gaudes) Quality fixing (lgtm.com)
* (Gaudes) Include Dependabot updates

### 1.0.4 (2021-02-13)
* (Gaudes) Add product selection to departure timetable
* (Gaudes) Update HAFAS client to 5.15.1 (Fix error Clientversion with OEBB profile)
* (Gaudes) Enhanced information reporting on error (Sentry Breadcrumbs)
* (Gaudes) Include Dependabot updates

### 1.0.3 (2021-01-27)
* (Gaudes) Station search returns only stations (Sentry Multiple results found for station)
* (Gaudes) Integrate SBB profile
* (Gaudes) Leave out superflous journey per route than configured
* (Gaudes) Fix call of helper for correct counters
* (Gaudes) Include Dependabot updates

### 1.0.2 (2021-01-12)
* (Gaudes) Configurable Headline for HTML tables
* (Gaudes) Fix correct deletion of unneeded objects (Sentry)
* (Gaudes) Include Dependabot updates

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