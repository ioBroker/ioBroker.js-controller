---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sma-em/README.md
title: ioBroker.sma-EM
hash: hYAOnhOsemUQz9HSTF5sjJflyv6TVEBPYbiF2JcCYnY=
---
![商标](../../../en/adapterref/iobroker.sma-em/admin/sma-em.png)

![安装数量](http://iobroker.live/badges/sma-em-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sma-em.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sma-em.svg)
![测试](https://travis-ci.org/CTJaeger/ioBroker.sma-em.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)

＃ioBroker.sma-em =================
###信息
该适配器从SMA Energy Meter和SMA Home Manager 2读取信息。

＃＃＃ 状态
 - 有功功率，无功功率，视在功率的总和计数器
 -  cosphi，总谐波失真，电压
 - 详细介绍有功功率，无功功率，视在功率，cosphi，安培数，电压等三个阶段中的每一个阶段
 - 详细说明3个阶段中的每个阶段，有功功率，无功功率，视在功率，cosphi，电流，电压
 - 详细的三个阶段计数器中的每一个
 -  SMA能量计的序列号

###选项
 - 每个单独阶段L1 / L2 / L3的选择选项
 - 选择有效功率总计和计数器的非扩展模式
 - 选择扩展无功功率模式，视在功率，cosphi，安培数，电压（需要更多计算能力）

###文件夹结构
 -  L1  - 第1阶段
 -  L2  - 第2阶段
 -  L3  - 第3阶段

### States-Structure
例：

pre-p-active power / respect qregard Q-reactive power / respect sregard S-apparent power / respect

psurplus P-active power / surplus qsurplus Q-reaktive power / surplus ssurplus S-apparent power / surplus

## Changelog

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

Copyright (c) 2017 Marcolotti <info@ct-j.de>

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