---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.todoist2/README.md
title: ioBroker.todoist2
hash: ZhJ4iln2JUDTkAR1nwwrBfVX2UQ8q7kYR+XhP4YVrE4=
---
![商标](../../../en/adapterref/iobroker.todoist2/admin/todoist.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.template.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.template.svg)
![安装数量（最新）](http://iobroker.live/badges/todoist2-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/todoist2-stable.svg)
![依赖状态](https://img.shields.io/david/rde-master/iobroker.todoist2.svg)
![已知漏洞](https://snyk.io/test/github/rde-master/ioBroker.todoist2/badge.svg)
![NPM](https://nodei.co/npm/iobroker.todoist2.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/rde-master/ioBroker.todoist2/master.svg)

＃ioBroker.todoist2
## IoBroker.Todoist
该Adapater用于整合todoist。
他使用REST API https://developer.todoist.com/rest/v1/#overview

Dieser Adaber dient zur zur Integration von todoist。
错误的Rest API https://developer.todoist.com/rest/v1/#overview

## Beschreibung
*适配器位于Todolisten aus和legt diese als状态，而sosass diese在VIS angezeigt werdenkönnen中
* Anlage als Text，JSON或HTML格式
* Anlage von Projekten，标签和版块
* Anlage ist frei Konfigurierbar
* ein“发送至” Blocked wurdeeingefügtum neue Aufgaben anzulegen
* eine黑名单指令zurVerfügung
* Eine Syncronisierung von Projekten istmöglich
* Todoskönnen（每块），sendto，oder（每对象）Objektte im Objektbaum angelegt werden
* Alle Funktionen der akutellen Rest API声明

*自动机Löschenalter Objekte（测试版）

＃ 发送至
Dieser AdapterverfügtüberdieMöglichtkeitmit sendTo zu arbeiten：Hier ist der dernötigeAusbau：

``` 
sendTo("todoist2", "send", {
    funktion: {name/string - see below!},
    task: {name/string},
    task_id: {number},
    project: {name/string},
    project_id: {number},
    section: {name/string},
    section_id: {number},
    parent: {number},
    order: {number},
    label: {name/string},
    label_id: {number},
    priority: {number},
    date: JJJJ-MM-TT,
    });

``

列表功能：

``` 

dd_task --> new Task
el_task --> delete Task
dd_project --> new Project
el_project --> delete Project
lose_task --> close Task
eopen_task --> reopen Task
dd_section --> new Section
el_section --> delete Section

``

＃块状
Dieser Adapterfürgtein den bereich中的todoist sendTo hinzu：![商标](../../../en/adapterref/iobroker.todoist2/blockly.png)

＃过滤
Siekönnenüberdie Filter Funktion von Todoist ganz einfach eigene听别人说。
B筛选器：“ today” gibt alle heutefälligenTodos aus us ...

Wichtig：Todoistnötig的Funktion ist ein Premium帐户！帐户保费帐户已失效。

＃配置der Listen
## HTML
CSS HTML表示例

``` 
task_table {
 font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
 border-collapse: collapse;
 width: 100%;


task_table td, #task_table th {
 border: 1px solid #ddd;
 padding: 16px;


task_table tr:nth-child(even){background-color: #f2f2f2;}

task_table tr:hover {background-color: #ddd;}

task_table th {
 padding-top: 6px;
 padding-bottom: 6px;
 text-align: left;
 background-color: #4CAF50;
 color: white;



``

CSS HTML按钮示例

``` 
button {
background-color: #4CAF50;
border: none;
color: white;
padding: 8px 16px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
transition-duration: 0.4s;


button__icon{
idth: 1.2em;
eight: 1.2em;
ill: black;
argin-right: 0.5em;


button:hover {
 background-color: red;
 color: black;


button:hover {
 box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);


``

按钮中的SVG图标示例

``` 
svg class="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true" focusable="false"> <path class="cls-2" d="M18,3H6A3,3,0,0,0,3,6V18a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V6A3,3,0,0,0,18,3Zm1,15a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V6A1,1,0,0,1,6,5H18a1,1,0,0,1,1,1Z"/><path class="cls-2" d="M14.7,8.39l-3.78,5L9.29,11.28a1,1,0,0,0-1.58,1.23l2.43,3.11a1,1,0,0,0,.79.38h0a1,1,0,0,0,.79-.39l4.57-6a1,1,0,1,0-1.6-1.22Z"/></g></g></g></svg>

``

您喜欢的任何图像的示例：

``` 
img src="/todoist2.admin/todoist.png" width="24" height="24">
``

## Changelog
### 0.8.4
* (rde-master) add option to add images in HTML Button

### 0.8.3
* (rde-master) add new collaps menu in the Admin Page

### 0.8.2
* (rde-master) add Option to set the Name when there is no todo.


### 0.8.1
* (rde-master) add Option for SVG ICON
* (rde-master) add Option disable Table when no Todo is there
* (rde-master) add Option to hide Table Headlines when there is no Name for it
* (rde-master) experimental: add Option, when you close a Task in Vis or per Objekt then the Main function is called to Refresh the Objekts and VIS

### 0.8.0
* (rde-master) delete Request and add Axios

### 0.7.3
* (rde-master) Bugfix

### 0.7.2
* (rde-master) Bugfix

### 0.7.1
* (rde-master) Bugfix JSON + added Option Naming the HTML Button

### 0.7.0
* (rde-master) added Option to Name all Fields in HTML table and JSON table

### 0.6.7
* (rde-master) Bugfix Prio 

### 0.6.6
* (rde-master) Bugfix

### 0.6.5
* (rde-master) HTML Button added
* (rde-master) closeTask now shows the result immediately

### 0.6.1
* (rde-master) Bugfix

### 0.6.0
* (rde-master) New List Options added

### 0.5.0
* (rde-master) Filter Option added (Premium Todoist needed!!)

### 0.4.0
* (rde-master) Code Cleanup

### 0.3.5
* (rde-master) Translation added

### 0.3.0
* (rde-master) new Backend Structur

### 0.2.0
* (rde-master) added new Sync Projekt option


### 0.1.5
* (rde-master) added new Tasks option
* (rde-master) added beta of remove olt Objects

### 0.1.0
* (rde-master) added Blackist

### 0.0.7
* (rde-master) Update new functions

### 0.0.5
* (rde-master) Update new functions

### 0.0.1
* (rde-master) initial release

## License
The MIT License (MIT)
Copyright (c) 2020 rde-master <info@rde-master.de>


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