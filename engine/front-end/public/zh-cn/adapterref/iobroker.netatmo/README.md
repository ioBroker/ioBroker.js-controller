---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/PArns/ioBroker.netatmo/edit/master//README.md
title: Netatmo Adapter
hash: wUStXr7TvXEX/ihhR6zd6MFzoTMsrCpKc3NoBP/7LQk=
adapter: true
license: MIT
authors: Patrick Arns <iobroker@patrick-arns.de>
description: ioBroker netatmo Adapter
keywords: netatmo
readme: https://github.com/PArns/ioBroker.netatmo/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-06-01T20:14:22.572Z
version: 1.3.1
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.netatmo.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.netatmo.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.netatmo/../../../en/adapterref/iobroker.netatmo/admin/netatmo.png)


＃ioBroker.netatmo
适用于ioBroker的Netatmo适配器

##安装
只需在适配器设置中输入您的Netatmo用户名和密码即可

您还可以使用sendTo命令将所有人员设置为离开（例如，如果用作报警系统）

```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: []});
```

要么

```
sendTo('netatmo.0', "setAway");
```

将所有人标记为所有摄像机

也可以将一个或多个特定人员标记为离开

```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: ['123123123123123']});
```

参数homeId是在Objects选项卡中列出的Camera名称后面的字符串（可选，如果安装了多个摄像头），personsId是“Known”people文件夹中的id

## Changelog

### 1.3.1
* (PArns) Fixed event cleanup crash

### 1.3.0
* (HMeyer) Added Netatmo Coach

### 1.2.2
* (PArns) Updated meta info

### 1.2.0
* (PArns) Fixed camera picture for events
* (PArns) Added camera vignette for events
* (PArns) Added camera video for events
* (PArns) Added new sub event type (human, vehicle, animal, unknown)
* (PArns) Added LastEventID within the LastEventData section

### 1.1.7
* (PArns) Added missing lib dependencies

### 1.1.6
* (PArns) Removed GIT requirement and included netatmo lib directly

### 1.1.5
* (PArns) Removed 502 error output if API has backend problems

### 1.1.4
* (PArns) Added support for unnamed modules

### 1.1.1
* (PArns) Simplified setAway

### 1.1.0
* (PArns) Added setAway function (Welcome only) to mark all or specific persons as away (requires your own API key!)

### 1.0.1
* (PArns) Fixed scope problems for presence & welcome (requires your own API key!)

### 1.0.0
* (PArns) Added live camera picture & stream for presence & welcome
* (PArns) Fixed known & unknown face image url for presence & welcome

### 0.6.2
* (PArns) Added name of last seen known face

### 0.6.1
* (PArns) Changed realtime server to use new general realtime server
* (PArns) Changed enums to channels to avoid enum creation
* (PArns) Simplified detection for movement-, known- & unknown- face events

### 0.6.0
* (PArns) Rewritten realtime updates to not need a local server any longer! Realtime updates are now turned on by default if a Welcome or Present cam is available

### 0.5.1
* (PArns) Optimized realtime updates to avoid updates if only movement was detected

### 0.5.0
* (PArns) Added realtime events for Netatmo Welcome

### 0.4.1
* (PArns) Removed log warnings for Wind sensor

### 0.4.0
* (PArns) Added absolute humidity
* (PArns) Added dewpoint

### 0.3.1
* (PArns) Reuse of preconfigured OAuth Client data
* (PArns) Added backward compatibility with existing installations

### 0.3.0
* (wep4you) Initial implementation of Netatmo welcome camera

### 0.2.2
* (PArns) Fixed SumRain24MaxDate & SumRain24Max which won't update in some rare cases

#### 0.2.1
* (PArns) Corrected DateTime values & object types

#### 0.2.0
* (PArns) Added SumRain1Max/SumRain1MaxDate & SumRain24Max/SumRain24MaxDate to get overall rain max since adapter installation

#### 0.1.1
* (PArns) Fixed TemperatureAbsoluteMin/TemperatureAbsoluteMax

#### 0.1.0
* (PArns) Fixed CO2 calibrating status
* (PArns) Added last update for devices
* (PArns) Added TemperatureAbsoluteMin/TemperatureAbsoluteMax to get overall temperature min/max since adapter installation

#### 0.0.4
* (PArns) Fixed typo/missing parameter in GustStrength

#### 0.0.3
* (PArns) Added error handling to prevent exceptions for missing parameters

#### 0.0.2
* (PArns) Fixed rain sensor

#### 0.0.1
* (PArns) Initial release

## License
MIT

Copyright (c) 2016-2017 Patrick Arns <iobroker@patrick-arns.de>