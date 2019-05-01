---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.moma/README.md
title: 无题
hash: 1+r5JGoGDjiFF8V8ugMr56Y2eJP7SQxhYzdYAXdoZts=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.moma.svg)
![下载](https://img.shields.io/npm/dm/iobroker.moma.svg)
![依赖状态](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![已知的漏洞](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AWhiteKnight/ioBroker.moma?branch=master&svg=true)

<h1><img src="admin/moma.png" width="64"/> ioBroker.moma </h1>

适用于ioBroker的## moma适配器
** MoMa **适用于基于ioBroker的家庭自动化装置的** Mo** nitoring和** Ma **途的适配器。
** MoMa** 对家庭（自动化）安装，这些安装比在一个或少数机器中运行的单个机器更复杂，在一个网络中进行一些基本的负载平衡。

它不是作为** Puppet **** Chef** ** Salt **** Ansible** 管理工具的替代品。
这些适用于具有许多计算机的大型环境，并且能够远程安装包。 **MoMa** 能远程更新现有安装，无需远程安装，也无需远程配置。

我正在使用它来监控我在家的IT基础设施（包括家庭自动化）并使其保持最新状态。

MoMa使用平台独立库'systeminformation'（https://github.com/sebhildebrandt/systeminformation）来收集有关计算机的信息。许多呼叫都暴露在定时器间隔中使用 - 参见下面的参考。

MoMa至少需要nodejs版本8 / ES6。

##安装
使用“适配器 - 从URL安装”与https://github.com/AWhiteKnight/ioBroker.moma

替代

npm install iobroker.moma

也适用于多主机环境 - 确保在安装之前选择了正确的实例。

##核心概念
仍在建设中 - 欢迎提出想法，建议，提示......

基本思想是为每个实例（moma。\ <instance-id \>）添加一个树，其中包含运行实例的机器的所有信息。
+一个公共树（moma.meta），每个实例在其下创建一个device \ <hostname \>，其中包含对实例的引用和一些监视信息。

##参考
以下函数库系统信息在启动时调用一次：

*基板 - 有关计算机主板的信息
* chassis  - 有关计算机机箱的信息
* bios  - 有关计算机BIOS的信息
* system  - 有关计算机制造商的信息
* cpu  - 有关计算机CPU的信息
* cpuFlags  - 可用的CPU标志
* memLayout  - 有关计算机内存芯片的信息
* diskLayout  - 有关计算机硬盘的信息

以下函数的库系统信息在区间0中调用（默认为每秒）：

*时间 - 实际时间，时区和正常运行时间
* cpuCurrentSpeed  - 实际cpu和核心频率
* networkConnections  - 实际网络连接
* currentLoad  - 实际cpu负载
* processes  - 使用process.list作为HTML表来处理概述

在区间1中调用以下函数库系统信息（默认每10秒）：

* mem  - 有关内存使用情况的信息
* cpuTemperature  -  cpu和core的温度
* networkStats  - 网络统计
* fullLoad  - 自上次启动以来的平均负载

在区间2中调用以下函数库系统信息（默认为每分钟）：

*电池 - 充电状态和有关电池的信息
* users  - 当前用户会话
* fsSize  - 有关计算机文件系统的信息
* blockDevices  - 连接的块设备
* fsStats  - 文件访问统计信息
* disksIO  - 块设备的IO统计信息

在区间3中调用以下函数库系统信息（默认每小时）：

* networkInterfaceDefault  - 默认网络接口
* networkInterfaces  - 可用的网络接口
* graphics  - 有关计算机图形卡和连接的监视器的信息

在区间4（每天默认）中调用以下函数库系统信息：

* osInfo  - 有关计算机操作系统的信息
* uuid  -  UUID的安装
* shell  - 默认系统shell
*版本 - 已安装软件包的版本

以下函数** MoMa **在区间4中调用（默认每天）：

*更新 - 检查挂起的更新并显示moma.meta。\ <hostname \>。更新中的更新量（目前只有Ubuntu，Debian，openSUSE，RedHat）
* checkBatteries  - 检查电池状态变量（当前实现的状态名称：LOWBAT，LOW_BAT）

## Changelog

### 0.1.1 (2019-04-26)
* (AWhiteKnight) First implementation of moma admin-tab. Be careful, the table line buttons are always active!!

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list.

### 0.0.10 (2019-04-18)
* (AWhiteKnight) Reduction of footprint. Restructuring.

### 0.0.9 (2019-04-08)
* (AWhiteKnight) Systeminfolib upgraded to 4.1.1 and added some calls/variables. Testing (re)enabled. Merging to new adapter creation template part 2.

### 0.0.8 (2019-03-10)
* (AWhiteKnight) Started merging to new development method. Maintaining meta states.

### 0.0.7 (2018-10-29)
* (AWhiteKnight) Travis testing activated; Minor enhancements in meta data

### 0.0.6 (2018-10-27)
* (AWhiteKnight) UI text and translations; changed meta-path from moma.x to moma.meta

### 0.0.5 (2018-10-26)
* (AWhiteKnight) Checking for updates in interval 4

### 0.0.4 (2018-10-14)
* (AWhiteKnight) New intervals: 0 with high frequency, 4 daily. Extended configuration

### 0.0.3 (2018-10-02)
* (AWhiteKnight) Basic functions of 'systeminformation' implemented, some documentation

### 0.0.2 (2018-09-30)
* (AWhiteKnight) Library 'systeminformation' integrated. First set of calls implemented

### 0.0.1
* (AWhiteKnight) initial version

## License
MIT License

Copyright (c) 2019 AWhiteKnight

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