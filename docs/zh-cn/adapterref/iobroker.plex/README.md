---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: 9m/tRvAGi2VZifTmIIULKck7p+PJMWQ9bsY5J7SZvFo=
---
![商标](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![Paypal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
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
 - 从Plex接收`events`（通过[Plex Webhook]（https://support.plex.tv/articles/115002267687-webhooks/#toc-0）和[Plex Notifications]（https://support.plex.tv） / articles / push-notifications /＃toc-0）使用Plex Pass或通过Tautulli，[__ see setup！__]（＃22-advanced-setup-plex-pass-or-tautulli））
 - 玩家的播放控制
 - 检索`服务器`
 - 检索`libraries`
 - 检索库中的所有项目
 - 检索`用户'（仅限Tautulli）
 - 检索`统计数据'（仅限Tautulli）
 - 检索“播放列表”
 - 检索`settings`
 - 显示Plex最近事件的Web界面：

  ![Plex Web界面](../../../en/adapterref/iobroker.plex/img/screenshot_adapter-interface.png)

## 2.安装说明
### 2.1。基本设置
对于基本设置，需要提供Plex安装的IP地址（和端口）。此外，您必须为适配器检索专用令牌以从Plex检索数据。

一旦给出，ioBroker.plex将检索所有基本数据（包括服务器，库）。有关基本数据的完整列表，请参见[频道和国家](#21-with-basis-setup)。

### 2.2。高级设置（Plex Pass或Tautulli）
#### 2.2.1。 Plex Pass
__Webhook__

如果您是Plex Pass用户，您可以在Plex设置中[设置webhook](https://support.plex.tv/articles/115002267687-webhooks/#toc-0)从Plex媒体服务器检索当前事件/操作（播放，暂停，恢复，停止，查看和评级）。

导航到Plex Media Server并转到```Settings```和```Webhook```。单击```Add Webhook```创建一个新的webhook，并使用ioBroker.plex设置和尾随```/plex```路径中指定的自定义端口输入您的ioBroker IP地址，例如： ```http://192.168.178.29:41891/plex```：

![Plex Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

__Events__

有关Plex通知的信息，请参见[看官方文档](https://support.plex.tv/articles/push-notifications/#toc-0)。要打开Plex Media Server上的通知，请转至`Settings`>`Server`>`General`，然后启用`Push Notifications`首选项。

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
2.使用ioBroker.plex设置中指定的自定义端口输入您的ioBroker IP地址，并在其后面添加“`/ / tautulli```路径，例如```HTTP：//192.168.178.29：41891 / tautulli```：

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png)此外，为_Webhook Method_选择```POST```并在_Description_中输入您喜欢的任何描述。

3.接下来，转到_Triggers_选项卡，选择所需的（或简称所有）通知代理。启用的通知代理将触发一个事件，然后将该事件发送到ioBroker。 __确保在下一步中为每个启用的通知代理提供必要的数据！
4.现在，__最重要的是，根据__ [此处的通知配置]（README-tautulli.md＃notification-configuration）__填写_Data_选项卡中的相应数据有效负载。

   复制上一步中相关通知代理的通知配置（例如```Playback Start```，```Playback Stop```，```Playback Pause```和```Playback Resume```），如下所示为§ §JJJJJ_4§§：

   ![Tautulli通知](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

5.最后，选中“允许连续通知”选项以允许发送连续通知（例如，已观看和已停止的通知）：

   ![Tautulli通知设置](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification_settings.png)

## 3.频道和国家
配置了基本和高级设置后，将显示以下通道（库，服务器和用户当然只是示例）。有关[完整的渠道和州名单](#21-with-basis-setup)，请参见下文。

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
- Remote Player Control

### 0.6.0 (2019-08-19)
- (Zefau) replaced password with token authentication

### 0.5.0 (2019-08-18)
- (Zefau) added support for Plex Notifications ([#9](https://github.com/Zefau/ioBroker.plex/issues/9))
- (Zefau) added support for all Tautulli triggers
- (Zefau) added Adapter Web Interface that shows the recent events

### 0.4.3 (2019-08-11)
- (Zefau) Performance improvements (dutyCycleRun and state comparison)
- (Zefau) added refresh button (to scan library files) to libraries

### 0.4.1 / 0.4.2 (2019-08-03)
- (Zefau) fixed newly introduced playback control not working for certain players
- (Zefau) removed unnecessary dependencies

### 0.4.0 (2019-08-01)
- (Zefau) added playback control for players
- (Zefau) added configuration options to only retrieve specific objects from Plex

### 0.3.2 / 0.3.3 (2019-07-25)
- (Zefau) added file, streaming and transcoding information to Tautulli event
- (Zefau) fixed bug when no playlists exist
- (Zefau) fixed missing `EVENTS.json`

### 0.3.1 (2019-07-20)
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 0.3.0 (2019-05-16)
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#6](https://github.com/Zefau/ioBroker.plex/pull/6))
- (Zefau) added support / discovery in [iobroker.discovery](https://github.com/ioBroker/ioBroker.discovery) ([#62](https://github.com/ioBroker/ioBroker.discovery/pull/62))
- (Zefau) added playlists to states
- (Zefau) added state description for object tree ```_playing```
- (Zefau) updated German translation (instead of generating it from English)

### 0.2.0 (2019-05-14)
- (Zefau) added authentication method (using Plex user and Plex password)
- (Zefau) fixed @iobroker/adapter-core dependency

### 0.1.0 (2019-04-26)
- (Zefau) get initial data from Plex API
- (Zefau) receive events from Plex Webhook (Plex Pass only)
- (Zefau) receive events from Tatulli (if used)

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