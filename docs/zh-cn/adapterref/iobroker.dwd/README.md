---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dwd/README.md
title: ioBroker.dwd
hash: iV0I50r+WvpQoN+q0KEZ2btBsIOluRVvdpqbG9cIhNI=
---
![商标](../../../en/adapterref/iobroker.dwd/admin/dwd.png)

![安装数量](http://iobroker.live/badges/dwd-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.dwd.svg)
![下载](https://img.shields.io/npm/dm/iobroker.dwd.svg)
![测试](https://travis-ci.org/ioBroker/ioBroker.dwd.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.dwd.png?downloads=true)

#ioBroker.dwd
版权所有Deutscher Wetterdienst

DieserAdapterlädtdieWetterwarnungen vom deutschenWetterdienstüberJSONlink。

此适配器通过JSON链接从德国气象服务加载天气警告。

＃＃ 去做
*处理FTP超时

## Changelog
### 2.4.3 (2018-08-05)
* (bluefox) Invalid certificate are accepted too

### 2.4.2 (2018-08-05)
* (bluefox) Update cities

### 2.4.0 (2018-07-30)
* (bluefox) Update package versions
* (bluefox) Update cities
* (bluefox) Map was added

### 2.3.0 (2018-02-05)
* (Apollon77) Added tests

### 2.2.2 (2018-02-05)
* (cernst1980) Changed sort order

### 2.2.1 (2017-08-16)
* (BuZZy1337) Updated regionNames and deleted Duplicates
* (BuZZy1337) Update Names

### 2.2.0 (2017-07-12)
* (Werner Dondl) fixes for widget display of warnings
* (DeepCoreSystem) fixed missing warning type and level from DWD JSON data

### 2.1.1 (2016-07-01)
* (jens-maus) fixed bug where cb() needs to be called with a null parameter

### 2.1.0 (2016-06-24)
* (bluefox) add widgets to adapter

### 2.0.3 (2016-03-24)
* (bluefox) full url if empty (compatibility)

### 2.0.2 (2016-03-20)
* (bluefox) autocomplete cities
* (bluefox) clear begin and end if no warnings

### 2.0.1 (2016-03-15)
* (bluefox) add tests
* (bluefox) change colors

### 2.0.0 (2016-03-03)
* (bluefox) use json file as source

### 1.0.1 (2015-11-04)
* (bluefox) check files yyyC too

### 1.0.0 (2015-11-04)
* (bluefox) adapt to new structure of DWD FTP Server

### 0.1.10 (2015-08-12)
* (bluefox) update packages
* (bluefox) change for Hessen and Rheinland-Pfalz: EM_H => OF_H

### 0.1.9 (2015-04-28)
* (bluefox) fix error with date

### 0.1.7 (2015-03-04)
* (bluefox) change the codes of regions

### 0.1.6 (2015-02-14)
* (bluefox) fix "forecast" object

### 0.1.5 (2015-01-02)
* (bluefox) fix timeout problem under windows

### 0.1.3 (2015-01-02)
* (bluefox) start adapter one time on config change or restart

### 0.1.2 (2015-01-02)
* (bluefox) enable npm install

### 0.1.1 (2014-11-22)
* (bluefox) change variables to no-"io.*"

### 0.1.0 (2014-10-25)
* (bluefox) change variables to io.*

### 0.0.4 (2014-10-23)
* (bluefox) support of timeouts

### 0.0.3 (2014-10-22)
* (bluefox) fix error if ftp problem

## License

The MIT License (MIT)

Copyright (c) 2016-2019 bluefox <dogafox@gmail.com>, hobbyquaker

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