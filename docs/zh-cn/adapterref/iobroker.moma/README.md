---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.moma/README.md
title: 无题
hash: f0yaX2SAB2/xWX3pkB0mun9LVzit2kAWJMlB/IWkXLs=
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
在ioBroker存储库'最新'中可用

替代方案：

npm install iobroker.moma

也适用于多主机环境 - 确保在安装之前选择了正确的实例。

**注意：**目前，您需要在每个从站上安装Admin-Adapter实例作为解决方法。
Admin-Adapter不需要处于活动状态！

##核心概念
仍在建设中 - 欢迎提出想法，建议，提示......

论坛：https：//forum.iobroker.net/topic/22026/neuer-adapter-iobroker-moma

GitHub：https：//github.com/AWhiteKnight/ioBroker.moma

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
* fsStats  - 文件访问统计信息 -  Windows不支持
* disksIO  - 块设备的IO统计信息 -  Windows不支持

在区间3中调用以下函数库系统信息（默认每小时）：

* networkInterfaceDefault  - 默认网络接口
* networkInterfaces  - 可用的网络接口
* graphics  - 有关计算机图形卡和连接的监视器的信息
* inetLatency  - 检查互联网延迟8.8.8.8
* dockerContainers  - 所有docker容器的列表 - 在机器正常工作之前需要一台“adduser iobroker docker”

在区间4（每天默认）中调用以下函数库系统信息：

* osInfo  - 有关计算机操作系统的信息
* uuid  -  UUID的安装
* shell  - 默认系统shell  -  Windows不支持
*版本 - 已安装软件包的版本

以下函数** MoMa **在区间4中调用（默认每天）：

*更新 - 检查挂起的更新并显示moma.meta。\ <hostname \>。更新中的更新量（目前只有Ubuntu，Debian，openSUSE，RedHat）
* checkBatteries  - 检查电池状态变量（当前实现的状态名称：LOWBAT，LOW_BAT）

## Changelog

### 1.1.1 (2019-05-23)
* (AWhiteKnight) dockerContainers in Interval 3. Library 'systeminformation' version 4.5.1

### 1.1.0 (2019-05-20)
* (AWhiteKnight) Performance optimization. Fix of issue #24. Check internet latency.

### 1.0.0 (2019-05-11)
* (AWhiteKnight) First release for adapter list 'stable'.

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list 'latest'.

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