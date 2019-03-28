---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pollenflug/README.md
title: 花粉风险指数
hash: RjP/kMcMjP8AFiLqq64h2tjH2yUsQbolm3pTtgV7UQs=
---
![商标](../../../en/adapterref/iobroker.pollenflug/admin/pollenflug.png)

![Travis CI构建状态](https://travis-ci.org/schmupu/ioBroker.pollenflug.svg?branch=master)
![AppVeyor构建状态](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.pollenflug?branch=master&svg=true)
![安装数量](http://iobroker.live/badges/pollenflug-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.pollenflug.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pollenflug.svg)
![NPM](https://nodei.co/npm/iobroker.pollenflug.png?downloads=true)

＃花粉风险指数
![DWDLogo](../../../en/adapterref/iobroker.pollenflug/docs/dwdlogo.png)

德国气象局DWD准备每日预测花粉风险指数。
花粉种类预测：今天和明天的榛子，桤木，灰烬，桦树，草，黑麦，艾蒿和野蛮，周五也是后天（周日）。
每天早上更新。
有关花粉县的信息，请访问：https：//www.dwd.de/pollenflug使用的花粉数据版权所有：©Deutscher Wetterdienst（Quelle：Deutscher Wetterdienst）

##安装和配置
需要node.js 8.0或更高版本以及Admin v3！在ioBroker适配器配置中选择县。您将获得该县的花粉风险指数。该指数将在每天11点左右更新一次。
在对象info.today，info.tomorrow和info.dayaftertomorrow中，将显示有效期。
例如，今天可能是星期五，但在对象信息中，今天是星期四。
这是正确的，因为DWD数据仍然是星期四，直到现在才更新。更新将在11点正常。

提供德国郡：

*石勒苏益格 - 荷尔斯泰因和汉堡（11区和12区）
    * Inseln und Marschen（地区11）
    * Geest，石勒苏益格 - 荷尔斯泰因和汉堡（12区）
*梅克伦堡 - 前波莫瑞州（20区）
* Niedersachsen und Bremen（31区和32区）
    * Westl。下萨克森/不来梅（31区）
    *Östl。下萨克森（地区32）
* Nordrhein-Westfalen（第41,42和43区）
    * Rhein.-Westfäl。蒂芬兰（地区41）
    * Ostwestfalen（地区42）
    * Mittelgebirge NRW（地区43）
*勃兰登堡和柏林（地区50）
*萨克森 - 安哈尔特（61区和62区）
    * Tiefland Sachsen-Anhalt（地区61）
    *哈茨（地区62）
*图林根（71区和72区）
    *TieflandThüringen（71区）
    *MittelgebirgeThüringen（地区72）
*萨克森（第81和82区）
    * Tiefland Sachsen（地区81）
    * Mittelgebirge Sachsen（地区82）
*黑森州（地区91和92）
    * Nordhessen和hess。 Mittelgebirge（地区91）
    * Rhein-Main（地区92）
* Rheinland-Pfalz und Saarland（101,102和103区）
    * Rhein，Pfalz，Nahe und Mosel（地区101）
    * Mittelgebirgsbereich Rheinland-Pfalz（地区102）
    *萨尔（地区103）
* Baden-Württemberg（111,112和113区）
    * Oberrhein und unteres Neckartal（地区111）
    * Hohenlohe / mittlerer Neckar / Oberschwaben（地区112）
    * Mittelgebirge Baden-Württemberg（113区）
*拜仁（区域121,122,123和124）
    *Allgäu/ Oberbayern / Bay。 Wald（地区121）
    * Donauniederungen（地区122）
    *拜仁诺德尔。 der Donau，o。 Bayr。沃尔德，o。 Mainfranken（地区123）
    * Mainfranken（地区124）

![ioBroker1](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug1.png)

原始DWD风险指数0,0-1,1,1-2,2,3-3和3变为0,1,2,3,4,5和6。
这种格式可以更简单地用于ioBroker。

|指数| DWD指数|描述|
|-----	|---------- |------------------------------------ |
| -1 | -1 |没有数据|
| 0 | 0 |没有花粉浓度|
| 1 | 0-1 |无花粉浓度低|
| 2 | 1 |低花粉浓度|
| 3 | 1-2 |低至中等花粉浓度|
| 4 | 2 |平均花粉浓度|
| 5 | 2-3 |中高花粉浓度|
| 6 | 3 |高花粉浓度|

**花粉飞行示例：**![ioBroker2](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug2.png)

![ioBroker3](../../../en/adapterref/iobroker.pollenflug/docs/iobroker-pollenflug3.png)

来自DWD的花粉图像的URL地址

![ioBroker4](https://www.dwd.de/DWD/warnungen/medizin/pollen/pollen_1_0.png)

##示例
如果来自DWD的新数据到达（今天的日期将改变），该脚本将显示Hasel和Erle的花粉风险指数。

```
on({id: "pollenflug.0.info.today"/*Today*/, change: "ne"}, (obj) => {
    let hasel = getState("pollenflug.0.region#12.Hasel.text_today"/*today*/).val;
    let erle  = getState("pollenflug.0.region#12.Erle.text_today"/*today*/).val;
    console.log("Haselnuss Belastung " + hasel);
    console.log("Erle Belastung " + erle);
});
```

## Changelog

### 1.0.2 (12.03.2019)
* (Stübi) Bugfixing, of changing sepaation of entries in riskindex_x from ',' to ', '
* (Stübi) unnecessary states will be deleted

### 1.0.1 (11.03.2019)
* (Stübi) Delete all states for day after tommorrow 
* (Stübi) Changed type of object riskindex_x from number to string
* (Stübi) Changed sepaation of entries in riskindex_x from ',' to ', '
* (Stübi) Deleted in summary (json) alle -1 entries

### 1.0.0 (10.03.2019)
* (Stübi) Changed the pollen index for better use in VIS. Now you you values -1, 0, 1, 2, 3, 4, 5 ,6
* (Stübi) Add summary for today, tomorrow and the day after tomorrow in json format for every region

### 0.1.9 (25.02.2019)
* (Stübi) Link to DWD Image of pollen flight added

### 0.1.8 (24.02.2019)
* (Stübi) Bugfixing deleting object

### 0.1.6 (20.02.2019)
* (Stübi) First Version of pollen index adapter

## License
The MIT License (MIT)

Copyright (c) 2019 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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