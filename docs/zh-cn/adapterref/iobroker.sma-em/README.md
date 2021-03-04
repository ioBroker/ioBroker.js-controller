---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sma-em/README.md
title: ioBroker.sma-em
hash: 0kx2TWqDDrWP53gDP2D8sqUzn0hmdrhh/f+b3dTPgUk=
---
![标识](../../../en/adapterref/iobroker.sma-em/admin/sma-em.png)

![安装数量](http://iobroker.live/badges/sma-em-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sma-em.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sma-em.svg)
![测验](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)

＃ioBroker.sma-em
###信息
该适配器从SMA电能表和SMA家庭管理器2读取信息。

＃＃＃ 状态
-有功功率，无功功率，视在功率的总和计数器
-cosphi，总谐波失真，电压，频率
-关于有功功率，无功功率，视在功率，cosphi，安培数，电压的三个阶段的详细信息
-详细的3相中的每相都有剩余的有功功率，无功功率，视在功率，cosphi，安培数，电压
-详细的3个阶段的每个计数器
-SMA电表的序列号，软件版本，SUSyID

＃＃＃ 选项
-每个单独的相L1 / L2 / L3的选择选项
-选择总功率和计数器有功功率的非扩展模式
-针对无功功率，视在功率，cosphi，安培数，电压选择扩展模式（需要更多计算能力）

###文件夹结构
-L1-第一阶段
-L2-第二阶段
-L3-第三阶段

###状态结构
例子：

pregard P有功功率/关于qregard Q无功功率/关于regard S表观功率/关于

p剩余p有功功率/剩余q剩余q求功功率/剩余s剩余视在功率/剩余

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog
### 0.6.3 (2021-03-04)
* (TGuybrush) The adapter binds now to all external IPv4 addresses.

### 0.6.1-beta.0 (2021-01-18)
* (TGuybrush) Bug fixes
  * Software Version string, last part is the revision as character (e.g. R = release)
  * Potential Warning during the first start
  * Revised units to follow the SI standardization (DIN 1301)
* (TGuybrush) Top level hierarchy object description indicates if the device is a SMA Energy Meter or a SMA Home Manager 2.
* (DutchmanNL) Released to the latest repo, fixed some typo's + news and translations

### 0.6.0
* (TGuybrush) Fixed wrong status information 
  * Complete adapter core rewritten to extract the status values by their OBIS value instead of the absolute position in the received UDP message according to the SMA documentation.
  *  Improved compatibility to future new OBIS values
* (TGuybrush) Add additional status information
  * Power grid frequency
  * Time tick counter
  * SMA SUSy ID
  * Software Version
* Add a timestamp for each received status information

### 0.5.7
* (DutchmanNL) Solved incorrect stated ID type for JS-controller 3.x

### 0.5.4
* (Andiling) Adapter compatibility extended for Node 10 and higher

### 0.5.3
* (Marcolotti) Fix units 

### 0.5.2
* (Marcolotti) support of more than one energy meter 

### 0.5.1
* (Marcolotti) Add Option for extended Mode
* (Marcolotti) Remove Option for Poll
* (Marcolotti) several fixes

### 0.5.0
* (Bluefox) Optimize Performance

### 0.0.2
* (Marcolotti) Add options for detailed View of L1, L2, L3
* (Marcolotti) Bugfixes
* (Bluefox) Optimize Performance
* (Apollon77) Clean Template

### 0.0.1
* (Marcolotti) initial release

## License
The MIT License (MIT)

Copyright (c) 2021 IoBroker-Community

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