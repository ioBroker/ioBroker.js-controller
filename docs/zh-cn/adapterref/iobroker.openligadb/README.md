---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.openligadb/README.md
title: ioBroker Adapter从OpenLigaDB获得足球运动比赛结果
hash: BK6yP9lYos7fGLNP++Ve8uKU+YWmT9kV39k/5QKuwak=
---
![商标](../../../en/adapterref/iobroker.openligadb/admin/openligadb_b.png)

![安装数量](http://iobroker.live/badges/openligadb-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.openligadb.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![特拉维斯](https://img.shields.io/travis/oweitman/ioBroker.openligadb.svg)
![AppVeyor构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-openligadb.svg)
![GitHub问题](https://img.shields.io/github/issues/oweitman/ioBroker.openligadb.svg)

＃ioBroker适配器从OpenLigaDB获取足球运动比赛结果
##概述
适配器，用于从openligadb.de请求用于足球或其他游戏的游戏数据

##配置
添加适配器的实例，然后单击扳手符号。在表格中，您可以添加联赛和赛季的快捷方式。
请访问openligadb.de了解可用的联赛，赛季和捷径如果一个赛季分布在两年内，请仅输入开始年份。

1.德国人的示例数据Bundliga是捷径= bl1季节= 2019

如果保存并关闭了配置，则此后不久，您的联赛和赛季必须有新的数据点。

## Vis和小部件
实际上，有3个小部件可用。请在小部件过滤器中输入openligadb

###表
此小部件显示您联赛的排名

＃＃＃ 比赛日
实际或选定游戏日的所有游戏。有许多小部件属性可配置显示的数据量

### FavGame
显示您喜欢的俱乐部的所有，实际或将来的比赛

vis小部件的文档可在vis或[小部件文档/德语](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html)中找到

＃＃ 去做
*如果用户未选择正确的数据点，则在小部件中进行验证
*翻译
*有关新的小部件数据透视表和目标获取者的文档
* ~~以第一轮，第二轮扩展表模式~~
* ~~新玩过的小部件枢纽表~~
* ~~具有排序功能的新小部件目标获取器排名~~
* ~~扩展带有趋势符号的表（向上/向下箭头，指向不变）~~
* ~~扩展表以计算x个最近的游戏~~
* ~~扩展表格以计算指定游戏日的排名~~
* ~~文档适配器/小部件~~
* ~~修正了俱乐部专栏的动态搭配问题~~
* ~~新小部件：俱乐部的下x场游戏~~
* ~~ widget游戏日设置为开始游戏日的长度（-1,3 =显示前一个游戏日和之后的3个游戏日）~~
* ~~如果showgameday设置为binding ~~编辑模式的替换值~~
* ~~重点关注俱乐部~~
* ~~游戏日小部件中可控制的游戏日~~

## Changelog
### 0.11.1
* change some template settings, goalgetter table get headers, add object change sensing
* widget goalgetters: add parameter highlight and showonlyhighlight
* widget pivottable: add sort option and choice to place favorite teams on top
* remove year from date for several widgets
### 0.11.0
* extend table to calculate with x last games and extend table to calculate ranking for a defined gameday, to ensure backward compatibility i have to create a new table v3 widget
* extend table with trend sign (arrow up/down, point for no change)
* new widget goal getter ranking with sort function
* new widget pivot table of played games
* extend table modes with 1st round,2nd round
### 0.10.3
* change computing and output logic of gameday widget to mark gameday header with favorite class
* improve documentation with css-klasses for  table widget
* bugfix for calculate gameday.
### 0.10.2
* Add data column goaldiff to table widget, improve more documentation (systax highlighting,copy code function), add example to control gameday with buttons,
### 0.10.1
* Improve documentation with more recipes and syntax highlighting, improve code to get and subscribe states
### 0.10.0
* New widget Table 2 that  includes the calculation of the total, home and away results. the previous widget is now deprecated, due to the different datapoint (allmatches) to be selected.
### 0.9.3
* Remove ES6 features due to compatibility with older browsers 
### 0.9.2
* next try to fix the experimental javascript binding function 
### 0.9.1
* fix bugs in calculation matchresults and highlight clubs in favgames 
### 0.9.0
* new Function for vis Binding to search for games at the actual day for favorite clubs, css-classes für games at actual day, fix bug to show the right match results, 
### 0.8.0
* push version for latest repository. fix some typos. fix a problem with date handling on different OS
### 0.0.11
* widget gameday: fix issue with not working gamedaycount
### 0.0.10
* widget gameday: optional you can show informations about the goalgetters
### 0.0.9
* optional weekday for widgets: gameday and gamesoffavclub,highlight the clubname in gamesoffavclub
### 0.0.8
* new widget games of favorite clubs with multi league support as replacement for the old one
### 0.0.7
* close connections and remove observers (timeouts/intervals)
### 0.0.6
* NPM deployment and preperation for the latest repository
### 0.0.5
* highlight favorite club, 
* Replacement value for edit mode if showgameday is set with binding, 
* widget gameday setting for start gameday an length (-1,3 = show previous gameday and 3 gamedays after that) 
* some documentation 
* remove unused code
* new widget: next x games of club
* fix issue for dynamic with of club column
### 0.0.4
* fixed more oids in vis runtime
### 0.0.3
* fixed getting oids in vis runtime
### 0.0.2
* add controlable gameday logic to gameday widget and adapter
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2020 oweitman

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