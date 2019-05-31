---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: YzUZPhFRNPLV/ihYasl3YnhG5wbHqo2qD3QJEfKyJMM=
---
![商标](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![安装数量](http://iobroker.live/badges/plex-installed.svg)
![稳定的版本](http://iobroker.live/badges/plex-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.plex.svg)
![特拉维斯CI](https://travis-ci.org/Zefau/ioBroker.plex.svg?branch=master)
![下载](https://img.shields.io/npm/dm/iobroker.plex.svg)
![Greenkeeper徽章](https://badges.greenkeeper.io/Zefau/ioBroker.plex.svg)
![NPM](https://nodei.co/npm/iobroker.plex.png?downloads=true)

#ioBroker.plex在ioBroker中集成Plex媒体服务器（带或不带Plex Pass）。此外，Tautulli整合。
**目录**

1. [特点]（＃1-features）
2. [设置说明]（＃2-setup-instructions）
   1. [基本设置]（＃21-基本设置）
   2. [高级设置]（＃22-advanced-setup-plex-pass-or-tautulli）
3. [频道和状态]（＃3频道 - 州）
   1. [使用基本设置]（＃31-with-basis-setup）
   2. [使用高级设置]（＃32-advanced-advanced-setup）
4. [更改日志]（#changelog）
5. [许可证]（#licence）

## 1.特点
TBD

## 2.安装说明
### 2.1。基本设置
对于基本设置，只需要提供Plex安装的IP地址（和端口）。此外，您必须提供适配器的用户和密码才能从Plex检索数据。

如果您想要在适配器中存储用户和密码，则可以在Plex设置中将ioBroker IP列入白名单。为此，请转到Plex Media Server的`Settings`和`Network`。在`LAN Networks`和`List of IP addresses and networks that are allowed without auth`字段中键入ioBroker IP地址：

![Plex网络设置](../../../en/adapterref/iobroker.plex/img/screenshot_plex-networksettings.jpg)

一旦给出，ioBroker.plex将检索所有基本数据（包括服务器，库）。有关基本数据的完整列表，请参见[频道和国家](#21-with-basis-setup)。

### 2.2。高级设置（Plex Pass或Tautulli）
#### 2.2.1。 Plex Pass
如果您是Plex Pass用户，您可以在Plex设置中[设置webhook](https://support.plex.tv/articles/115002267687-webhooks/#toc-0)从Plex媒体服务器检索当前事件/操作（播放，暂停，恢复，停止，查看和评级）。

导航到Plex Media Server并转到```Settings```和```Webhook```。单击```Add Webhook```创建一个新的webhook，并使用ioBroker.plex设置和尾随```/plex```路径中指定的自定义端口输入您的ioBroker IP地址，例如： ```http://192.168.178.29:41891/plex```：

![Plex Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

#### 2.2.2.Tautulli
[Tautulli是第三方应用程序]（https://tautulli.com/#about），您可以与Plex Media Server一起运行以监控活动并跟踪各种统计信息。最重要的是，这些统计数据包括观看内容，观看内容，观看时间和地点以及观看方式。所有统计信息都显示在一个漂亮而干净的界面中，其中包含许多表格和图形，这使得您可以轻松地向其他人吹嘘您的服务器。查看[Tautulli预览]（https://tautulli.com/#preview）并[在您首选的系统上安装它]](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation)如果您有兴趣。

此适配器连接到[Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md)，并且还接收来自Tautulli的webhook事件。

##### 2.2.2.1。 API
安装Tautulli后，从Tautulli仪表板打开_Settings_页面并导航到_Web Interface_。向下滚动到_API_部分，确保选中```Enable API```。复制```API key```并在ioBroker.plex设置中输入它。此外，添加Tautulli IP地址和端口以允许API通信。

##### 2.2.2.2。网络挂接
######概述
要使用Tautulli设置webook，请遵循以下说明并确保您已完成所有4个步骤：

1.添加通知代理
2.在Notification Agent中配置Webhook
3.在通知代理中配置触发器
4.在通知代理中配置数据
5.配置通知选项

######说明
安装完成后，从Tautulli仪表板打开设置页面并导航到Notification Agents，如下所示：

![Tautulli设置](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1.单击_添加新通知代理_和_Webhook_。
2.使用ioBroker.plex设置中指定的自定义端口输入您的ioBroker IP地址，并在其后面添加“`/ / tautulli```路径，例如： ```HTTP：//192.168.178.29：41891 / tautulli```：

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png)此外，为_Webhook Method_选择```POST```并在_Description_中输入您喜欢的任何描述。

3.接下来，转到_Triggers_选项卡，选择所需的（或简称所有）选项
4.现在，__最重要的是，根据[此处的通知配置]（README-tautulli.md＃notification-configuration）填写_Data_选项卡中的相应数据有效负载。将整个内容复制到前四个通知代理（```Playback Start```，```Playback Stop```，```Playback Pause```和```Playback Resume```，如下图所示对于```Playback Start```：

   ![Tautulli通知](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

5.最后，选中“允许连续通知”选项以允许发送连续通知（例如，已观看和已停止的通知）：

   ![Tautulli通知设置](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification_settings.png)

## 3.频道和国家
配置了基本和高级设置后，将显示以下通道（当然，库，服务器和用户仅是示例）。有关[完整的渠道和州名单](#21-with-basis-setup)，请参见下文。

![频道和州示例](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 3.1。使用基础设置
在成功进行基本设置后，将创建根据下表的通道。有关将要创建的所有状态的列表，请[看专用的州名单](README-states.md#with-basis-setup)。

|频道/文件夹|说明|
| ------- | ----------- |
| __libraries__ | Plex库|
| __servers__ | Plex服务器|
| __settings__ | Plex设置|

### 3.2。使用高级设置
在成功进行高级设置后，将另外创建以下通道。有关将要创建的所有状态的列表，请[看专用的州名单](README-states.md#with-advanced-setup)。

|频道/文件夹|说明|备注|
| ---------------- | ----------- | ------ |
| __ \ _ playing__ | Plex Media正在播放|与Plex Pass或Tautulli |
| __statistics__ | Plex Watch统计|只有Tautulli |
| __users__ | Plex用户|只有Tautulli |

## Changelog

### 1.0.0 (2019-xx-xx) [MILESTONES / PLANNED FEATURES FOR v1.0.0 RELEASE]
- add support for all Tautulli triggers
- add playback control for players

### 0.3.0 (2019-05-16)
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#6](https://github.com/Zefau/ioBroker.plex/pull/6))
- added support / discovery in [iobroker.discovery](https://github.com/ioBroker/ioBroker.discovery) ([#62](https://github.com/ioBroker/ioBroker.discovery/pull/62))
- added playlists to states
- added state description for object tree ```_playing```
- updated German translation (instead of generating it from English)

### 0.2.0 (2019-05-14)
- added authentication method (using Plex user and Plex password)
- fixed @iobroker/adapter-core dependency

### 0.1.0 (2019-04-26)
- get initial data from Plex API
- receive events from Plex Webhook (Plex Pass only)
- receive events from Tatulli (if used)

## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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