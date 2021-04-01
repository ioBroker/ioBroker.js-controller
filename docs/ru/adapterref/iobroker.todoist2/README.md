---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.todoist2/README.md
title: ioBroker.todoist2
hash: JnrbCuCmIG7I5yZGnlAqVr5gSd2WM/nLYMTYksyjZrw=
---
![Логотип](../../../en/adapterref/iobroker.todoist2/admin/todoist.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.template.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.template.svg)
![Количество установок (последнее)](http://iobroker.live/badges/todoist2-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/todoist2-stable.svg)
![Статус зависимости](https://img.shields.io/david/rde-master/iobroker.todoist2.svg)
![Известные уязвимости](https://snyk.io/test/github/rde-master/ioBroker.todoist2/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.todoist2.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/rde-master/ioBroker.todoist2/master.svg)

# IoBroker.todoist2
## IoBroker.Todoist
Этот Adapater предназначен для интеграции todoist.
Он использует REST API https://developer.todoist.com/rest/v1/#overview.

Dieser Adaber dient zur zur Integration von todoist.
Er verwendet die Rest API https://developer.todoist.com/rest/v1/#overview

## Beschreibung
* Адаптер предназначен для использования в системе VIS angezeigt werden können.
* Использование текста, JSON или HTML möglich
* Anlage von Projekten, Labels und Sections möglich
* Anlage ist frei Konfigurierbar
* ein "отправить" Blockly wurde eingefügt um neue Aufgaben anzulegen
* eine Blacklist steht zur Verfügung
* eine Syncronisierung von Projekten ist möglich
* Todos können per Blockly, sendto, oder per Objekte im Objektbaum angelegt werden
* Все функции по использованию Rest API werden unterstützt

* Automatisches Löschen alter Objekte (бета)

# Отправить
Dieser Adapter verfügt über die Möglichtkeit mit sendTo zu arbeiten: Hier ist der nötige Ausbau:

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

```

Hier die Liste der Funktion:

``` 

add_task --> new Task
del_task --> delete Task
add_project --> new Project
del_project --> delete Project
close_task --> close Task
reopen_task --> reopen Task
add_section --> new Section
del_section --> delete Section

```

# Blockly
Dieser Adapter fürgt ein Blockly todoist in den Bereich sendTo hinzu: ![Логотип](../../../en/adapterref/iobroker.todoist2/blockly.png)

# Фильтр
Sie können über die Filter Funktion von Todoist ganz einfach eigene Listen erstellen.
z.B. Фильтр: "сегодня" gibt alle heute fälligen Todos aus usw ...

Wichtig: für diese Funktion ist ein Premium Account bei Todoist nötig! Aktiviere diese Funktion nur wenn du einen Premium Account hast.

# Configuration der Listen
## HTML
Пример таблицы CSS HTML

``` 
#task_table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#task_table td, #task_table th {
  border: 1px solid #ddd;
  padding: 16px;
}

#task_table tr:nth-child(even){background-color: #f2f2f2;}

#task_table tr:hover {background-color: #ddd;}

#task_table th {
  padding-top: 6px;
  padding-bottom: 6px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}


```

Пример кнопки CSS HTML

``` 
.button {
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
}

.button__icon{
width: 1.2em;
height: 1.2em;
fill: black;
margin-right: 0.5em;
}

.button:hover {
  background-color: red;
  color: black;
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

```

Пример значка SVG в кнопке

``` 
<svg class="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true" focusable="false"> <path class="cls-2" d="M18,3H6A3,3,0,0,0,3,6V18a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V6A3,3,0,0,0,18,3Zm1,15a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V6A1,1,0,0,1,6,5H18a1,1,0,0,1,1,1Z"/><path class="cls-2" d="M14.7,8.39l-3.78,5L9.29,11.28a1,1,0,0,0-1.58,1.23l2.43,3.11a1,1,0,0,0,.79.38h0a1,1,0,0,0,.79-.39l4.57-6a1,1,0,1,0-1.6-1.22Z"/></g></g></g></svg>

```

Пример для любого понравившегося изображения:

``` 
<img src="/todoist2.admin/todoist.png" width="24" height="24">
```

## Changelog
### 0.8.6
* (rde-master) Bugfix and bump axios to 0.21.1

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