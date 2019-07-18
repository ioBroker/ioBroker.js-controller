---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.linkeddevices/README.md
title: Objekt（Datenpunkt）verlinken
hash: sJ8Vym9Cn0EmgbYJG+B0IgjEQKfhM9SkZlVFUvWfLE8=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.linkeddevices.svg)
![下载](https://img.shields.io/npm/dm/iobroker.linkeddevices.svg)
![安装数量](http://iobroker.live/badges/linkeddevices-installed.svg)
![依赖状态](https://img.shields.io/david/Scrounger/iobroker.linkeddevices.svg)
![已知的漏洞](https://snyk.io/test/github/Scrounger/ioBroker.linkeddevices/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linkeddevices.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/Scrounger/ioBroker.linkeddevices/master.svg)

<h1><img src="admin/linkeddevices.png" width="32"/> ioBroker.linkeddevices </h1>

适用于ioBroker的## linkeddevices适配器
[![贝宝（https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YHPPW474N5CKQ&source=url)

使用自定义结构创建设备的链接对象（数据点）。这使得在ioBroker中创建一个结构成为可能，其中所有对象都是集中的，例如用于vis或脚本。例如，这提供了以下优点：在硬件交换中，仅必须重新创建链接对象并且所有vis和脚本再次起作用。

使用适配器，您可以转换对象或将其转换为其他类型（尚未完全实现）。

<img src="screenshots/structure.png?sanitize=true&raw=true" title="Beispielf�rselbstdefinierte Struktur"/>

此适配器的灵感来自[Pman的虚拟设备脚本](https://forum.iobroker.net/topic/7751/virtual-devices)。

＃Objekt（Datenpunkt）verlinken
Ein Objekt（Datenpunkt）kannst du�berdenButton'Einstellungen'imMen�'Objekt'erstellen。

<img src="screenshots/object_tree_custom_button.png?sanitize=true&raw=true" title="Men�&#39;Objekt&#39;"/>

## Objekt（Datenpunkt）Einstellungen
<img src="screenshots/custom_dialog.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

Die folgendenGrundeinstellungenm�ssenf�rdasverlinkte Objekt vorgenommen werden：

| Eingabefeld | Beschreibung |
|---|---|
| Aktiviert | einVerlinkungf�rdasObjekt aktivieren |
| Pr�fixf�rIDdes verlinkten Objektes | Bezeichung die der Id des verlinkten Objektes vorangestellt werden soll |
| ID des verlinkten Objekts | Id des verlinkten Objektes |
| Zusammengesetze Id des verlinkten Objektes | Zeigt a wie die Id des verlinkten Objektes aussehen wird  -  Zusammensetzung von *'Pr�fixf�rIDdes verlinkten Objektes'＆'ID des verlinkten Objekts'* |

Weiterk�nntyrNoch folgende Einstellungen vornehmen：

| Eingabefeld | Beschreibung |
|---|---|
|名称des verlinkten Objekts | Hierk�nntihreinen Namenf�rdasverlinkte Objekte festlegen |
| Experteneinstellungenf�rverlinktesObjekt vom Typ'X'| weitere Einstellungen dieabh�ngigvomTyp des Objektes sind。 （[Zus�tzlicheInformationenhierzu findest du weiter unten]（https://github.com/Scrounger/ioBroker.linkeddevices/blob/master/README.md#experteneinstellungen-f%C3%BCr-verlinktes-objekt-vom-typ-x ）） <ul><li> [Zahl（readonly）]（https://github.com/Scrounger/ioBroker.linkeddevices/blob/master/README.md#experteneinstellungen-f%C3%BCr-verlinktes-objekt-vom-typ-zahl-readonly） </li><li> [Zahl](https://github.com/Scrounger/ioBroker.linkeddevices/blob/master/README.md#experteneinstellungen-f%C3%BCr-verlinktes-objekt-vom-typ-zahl)</ li> </ ul> |

** Beispiel：** Die oben im Screenshot dargestellten Eingaben erzeugen das folgende verlinkte Objekt： <img src="screenshots/example_create_linkedObject.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

##Experteneinstellungenf�rverlinktesObjekt vom Typ'X'
Abh�ngigvomTyp（Zahl，Logigwert，Zeichenkette等）des zu verlinkenden Objektes，k�nntIhrweitere Einstellungen，wie z.B. Umrechnungen oder Umwandlungen in einen anderenTypf�rdasverlinkte Objekt einstellen。

###Experteneinstellungenf�rverlinktesObjekt vom Typ'Zahl（readonly）'
<img src="screenshots/expert_settings_number_readonly.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

####'Zahl（只读）'：Konvertiere in Typ'nicht umwandeln'
<img src="screenshots/expert_settings_number_readonly_no_conversion.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | erlaubte Eingabe | Beispiel（siehe Bild）|
|---|---|---|---|
| �ndereEinheit'X'in | Einheitf�rdasverlinkte Objekt festlegen | keineBeschr�nkung| Objekt hat Einheit'kowh'，verlinktes Objekt hat Einheit'Wh'|
|最大。 Anzahl der Nachkommastellen |最大。 Anzahl derNachkommastellenf�rdasverlinkte Objekt festlegen | Zahlen | Wert des Objekts'100.561'ergibtf�rdasverlinkte Objekt den Wert'101'|
| �nderemin'X'in | minimaler Wert der das verlinkte Objekt annehmen darf | Zahlen | -  |
| �nderemax'X'auf| maximaler Wert der das verlinkte Objekt annehmen darf | Zahlen | -  |
| Umrechnungf�rverlinktes'read'Objekt|数学与技术学院_ + - / *。 （）_＆* Zahlen* | Wert des Objektes'279688.9'mit Umrechnung'/ 1000'zeigt beim verlinkten Objekt den Wert'280.6889'an |

####'Zahl（readonly）'：Typ'Logikwert'中的Konvertiere
<img src="screenshots/expert_settings_number_readonly_convert_to_boolean.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | erlaubte Eingabe | Beispiel（siehe Bild）|
|---|---|---|---|
| Bedingung'true'f�rverlinktesObjekt | Wert des Objektes，f�rden das verlinkte Objekt auf'true'gesetzt werden soll | *=！=> <> = <=* + *Zahlen* | F�rWerte'> 100'des Objekt ist das verlinkte Objekt'true'|

###Experteneinstellungenf�rverlinktesObjekt vom Typ'Zahl'
####'Zahl'：Typ'nicht umwandeln'中的Konvertiere
<img src="screenshots/expert_settings_number_no_conversion.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | erlaubte Eingabe | Beispiel（siehe Bild）|
|---|---|---|---|
| �ndereEinheit'X'in | Einheitf�rdasverlinkte Objekt festlegen | keineBeschr�nkung| Objekt hat keine Einheit，verlinktes Objekt hat Einheit'％'|
|最大。 Anzahl der Nachkommastellen |最大。 Anzahl derNachkommastellenf�rdasverlinkte Objekt festlegen | Zahlen | Wert des Objekts'100.561'ergibtf�rdasverlinkte Objekt den Wert'101'|
| �nderemin'X'in | minimaler Wert der das verlinkte Objekt annehmen darf | Zahlen | -  |
| �nderemax'X'auf| maximaler Wert der das verlinkte Objekt annehmen darf | Zahlen | -  |
| Umrechnungf�rverlinktesObjekt |数学与技术学院_ / *._＆* Zahlen* | Wert des Objektes'180'mit Umrechnung'* 100 / 255'zeigt beim verlinkten Objekt den Wert'71'an。 Umgekehrt wird der Kehrwert bei der Berechnung gebildet，d.h。 wenn das verlinte Objekt den Wert'71'hat，hat das Objekt den Wert'180'。 Das kann z.B. f�rHueLampen verwendet werden，um den Wertebereich von'0-255'in'0％-100％'umzuwandeln |

####'Zahl'：Typ'Logikwert'中的Konvertiere
<img src="screenshots/expert_settings_number_convert_to_boolean.png?sanitize=true&raw=true" title="Objekt Einstellungen"/>

| Eingabefeld | Beschreibung | erlaubte Eingabe | Beispiel（siehe Bild）|
|---|---|---|---|
| Bedingung'true'f�rverlinktesObjekt | Wert des Objektes，f�rden das verlinkte Objekt auf'true'gesetzt werden soll | *=！=> <> = <=* + *Zahlen* | F�rWerte'> 30'des Objekt ist das verlinkte Objekt'true'|
| Wert wenn verlinktes Objekt'true'ist | Wert des Objektes wenn das verlinkte Objekt'true'ist | Zahlen | Wird das verlinkte Objekt auf'true'gesetzt，wird der Wert des Objektes'30'|
| Wert wenn verlinktes Objekt'false'ist | Wert des Objektes wenn das verlinkte Objekt'false'ist | Zahlen | Wird das verlinkte Objekt auf'false'gesetzt，wird der Wert des Objektes'10'|

## Changelog

### 0.2.1
* (Scrounger) boolean to string converter added
* (Scrounger) bug fixes

### 0.2.0
* (Scrounger) number to boolean converter added
* (Scrounger) number expert settings for min, max added
* (Scrounger) bug fixes

### 0.1.5
* (Scrounger) expert settings properties renamed -> you must recreate your expert settings for all parent objects !!!
* (Scrounger) custom dialog prepared for convert to other type
* (Scrounger) bug fixes

### 0.1.0
* (Scrounger) custom dialog layout changed
* (Scrounger) conversion bug fixes
* (Scrounger) change unit bug fixes

### 0.0.4
* (Scrounger) main function added
* (Scrounger) change unit for linked objects
* (Scrounger) set number of decimal places for linked objects
* (Scrounger) set conversion for read only linked objects

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2019 Scrounger

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