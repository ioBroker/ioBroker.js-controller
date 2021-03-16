---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.unifi-protect/README.md
title: ioBroker.unifi保护
hash: kVU+S8IfYy33mD9ct9mVjQT4+bMS8mhxVBWtV2Yy4TI=
---
![标识](../../../en/adapterref/iobroker.unifi-protect/admin/unifi-protect.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.unifi-protect.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.unifi-protect.svg)
![安装数量（最新）](http://iobroker.live/badges/unifi-protect-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/unifi-protect-stable.svg)
![依赖状态](https://img.shields.io/david/peterbaumert/iobroker.unifi-protect.svg)
![已知漏洞](https://snyk.io/test/github/peterbaumert/ioBroker.unifi-protect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.unifi-protect.png?downloads=true)

＃ioBroker.unifi-protect
**此适配器使用服务[哨兵](https://sentry.io)向开发人员自动向我报告异常和代码错误以及新设备架构。**更多详细信息，请参见下文！

## IoBroker的unifi-protect适配器
连接到Unifi Protect Controller并从添加的摄像机中提取所有数据。

标准端口（如果未自行更改）：

 -Cloud Key Plus Gen2：7443
 -UDM Pro：443

## GetThumbnail和getSnapshot的示例
```
// Settings
const path = '/opt/iobroker/tmp/temp.jpg';
const threshold = 50;

// Send to Telegram ( or what you prefer )
function sendImage(path) {
    sendTo('telegram.0', path);
}

//Trigger Script
on({ id: 'unifi-protect.0.motions.lastMotion.thumbnail', change: "ne" }, function () {
    const thumb = getState('unifi-protect.0.motions.lastMotion.thumbnail'/*thumbnail*/).val;
    const end = getState('unifi-protect.0.motions.lastMotion.end'/*thumbnail*/).val;
    const cameraid = getState('unifi-protect.0.motions.lastMotion.camera'/*thumbnail*/).val;
    const score = getState('unifi-protect.0.motions.lastMotion.score'/*thumbnail*/).val;
    if (score < threshold) { return; }
    // if Event has ended send the Thumbnail otherwise get current Snapshot
    if (end != null) {
        sendTo('unifi-protect.0', 'getThumbnail', { "thumbnail": thumb, "path": path }, function (res) {
            sendImage(path);
        });
    } else {
        sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": cameraid, "path": path }, function (res) {
            sendImage(path);
        });
    }
});
```

```
sendTo('unifi-protect.0', 'getSnapshot', { "cameraid": "5e4a861c01d12503870003f9", "path": path }, function (res) {
    sendImage(path);
});
```

##什么是Sentry.io，什么报告给该公司的服务器？
Sentry.io是一项服务，供开发人员从其应用程序中获取有关错误的概述。确切地说，这是在此适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一的ID，**没有**有关您的任何其他信息，电子邮件，姓名等）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本上不会崩溃的无错误适配器。

## Changelog

### 0.0.12 (2021-03-14)
* added smart detections
* fixed some lastMotion stuff
* added UnifiOs Support for CloudKey

### 0.0.11 (2020-02-27)
* changed Admin interface a little
* added description for port
* fixed UDM Pro writeable states

### 0.0.10 (2020-02-26)
* travis ci for integration tests fixed
* actually use last x motion setting

### 0.0.9 (2020-02-21)
* lastMotion of camera only updating if neccessary
* first UDM integrations, changing settings NOT working yet

### 0.0.8 (2020-02-17)
* made motion Events optional (Last Motion is always stored)
* made interval and "last x seconds of motions" adjustable
* properly delete old motions

### 0.0.7 (2020-02-09)
* continuosly refresh motion events
* changed data structur
* added lastMotion Datapoint to each camera

### 0.0.6 (2020-02-08)
* make some settings changeable (name, osdSettings.*, recordingSettings.mode, ledSettings.isEnabled)

### 0.0.5 (2020-02-07)
* new logo
* added motion event data points

### 0.0.4 (2020-02-05)
* release-script test and some Readme changes

### 0.0.3 (03.02.2020)
* (Peter Baumert) first working rls on npm

### 0.0.1
* (Peter Baumert) initial release

## License
MIT License

Copyright (c) 2020 Peter Baumert <ioBroker.unifi-protect@outlook.com>

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