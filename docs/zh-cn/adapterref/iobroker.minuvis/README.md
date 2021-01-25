---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.minuvis/README.md
title: ioBroker.minuvis
hash: tNrxYMcgsm7/fTwesDag94NQmL/cOWyFdQoRgiIDbB0=
---
![商标](../../../en/adapterref/iobroker.minuvis/admin/minuvis.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.minuvis.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.minuvis.svg)
![安装数量（最新）](http://iobroker.live/badges/minuvis-installed.svg)
![依赖状态](https://img.shields.io/david/minukodu/iobroker.minuvis.svg)
![已知漏洞](https://snyk.io/test/github/minukodu/ioBroker.minuvis/badge.svg)
![建立状态](https://travis-ci.org/minukodu/ioBroker.minuvis.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.minuvis.png?downloads=true)

＃ioBroker.minuvis
##用于ioBroker的minuvis适配器
可视化所有设备

########################################################################
＃重要！
如果要从版本1.3.0升级，请注意：

*配置文件的存储位置已更改
*您不能在旧位置保存配置文件
*使用红色下拉按钮读取配置文件
*文件将获得前缀“ OF_”
*现在保存配置文件
*前缀将消失，并且配置文件将保存在新位置

########################################################################
##说明
-照常安装适配器
-创建Minuvis实例（仅1种可能）
-在网络实例上启用socket.io-Instance

![socket.io@web](https://minukodu.de/githubimg/web_instance_socket_io.jpg)

-打开Minuvis实例

![Minuvis实例](https://minukodu.de/githubimg/minuvis_instance.jpg)

-连接到socket.io-web的端口或您自己的socket.io-instance

![连接](https://minukodu.de/githubimg/minuvis_connect.jpg)

-添加新页面

![添加页面](https://minukodu.de/githubimg/minuvis_addpage.jpg)

-添加小部件

![添加小部件](https://minukodu.de/githubimg/minuvis_addwidget.jpg)

-编辑状态

![选择状态](https://minukodu.de/githubimg/minuvis_selectstate.jpg)

-预浏览您的新应用

![预习](https://minukodu.de/githubimg/minuvis_preview.jpg)

有关更多信息，请访问https://minukodu.de/en或在youtube上观看https://youtu.be/dtHUBOEc4js

## Changelog
### 1.3.0 (2021-01-24)
* updated builder and app to V1.12.0
* new meta-datapoint "0_userdata.0" for storing config-files
### 1.2.0 (2020-12-06)
* updated builder and app to V1.11.0
### 1.1.0 (2020-12-01)
* updated builder and app to V1.10.0
### 1.0.0 (2020-11-22)
* create version V1.0.0 
### 0.0.12 (2020-11-19)
* updated builder and app to V1.9.0
### 0.0.11 (2020-11-15)
* updated builder and app to V1.8.0
### 0.0.10 (2020-10-04)
* updated builder and app to V1.6.0
### 0.0.9 (2020-09-27)
* updated builder and app to V1.5.0
### 0.0.8 (2020-09-16)
* bugfix number of buttons for valueswitcher
### 0.0.7 (2020-09-14)
* updated builder and app to V1.4.0
### 0.0.6 (2020-09-14)
* updated builder and app to V1.3.0
### 0.0.6 (2020-06-23)
* updated builder and app to V1.2.1
### 0.0.5 (2020-05-14)
* adaptions for iobroker.repositories
### 0.0.4 (2020-05-13)
* updated README.md
### 0.0.3 (2020-05-11)
* updated builder and app to V1.0.4
### 0.0.2 (2020-05-10)
* updated builder and app to V1.0.2
### 0.0.1 (2020-05-02)
* (svallant) initial release

## License
MIT License

Copyright (c) 2020 svallant <svallant@gmx.eu>

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