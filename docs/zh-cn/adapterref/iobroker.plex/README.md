---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: R+xTNphUZT9QNNpz9rhtHbQNV5aoYGIj4V5w5jDgVfw=
---
![商标](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/plex-installed.svg)
![稳定版](http://iobroker.live/badges/plex-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.plex.svg)
![自上次发布以来提交](https://img.shields.io/github/commits-since/Zefau/ioBroker.plex/latest.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.plex.svg)
![NPM](https://nodei.co/npm/iobroker.plex.png?downloads=true)

＃ioBroker.plex在ioBroker中集成Plex媒体服务器（带有或不带有Plex Pass）。此外，Tautulli集成。
[![Travis CI]（https://travis-ci.com/Zefau/ioBroker.plex.svg?branch=master）](https://travis-ci.com/Zefau/ioBroker.plex)

**目录**

1. [功能]（＃1-功能）
2. [设置说明]（＃2-设置说明）
   1. [基本设置]（＃21-基本设置）
   2. [高级设置]（＃22-advanced-setup-plex-pass-or-tautulli）
3. [通道和状态]（＃3通道-状态）
   1. [使用基本设置]（＃31-with-basis-setup）
   2. [使用高级设置]（＃32-高级设置）
4. [变更日志]（＃changelog）
5. [许可证]（＃license）

## 1.功能
-从Plex接收“事件”（通过[Plex Webhook]（https://support.plex.tv/articles/115002267687-webhooks/#toc-0）和[Plex通知]（https://support.plex.tv / articles / push-notifications /＃toc-0）使用Plex Pass或通过Tautulli，[__请参阅设置！__]（＃22-advanced-setup-plex-pass-or-tautulli））
-播放器播放控制
-检索服务器
-检索“库”
-检索库中的所有项目
-检索“用户”（仅适用于Tautulli）
-检索“统计信息”（仅适用于Tautulli）
-检索“播放列表”
-检索“设置”
-Web界面，显示来自Plex的最近事件：

  ![Plex Web界面](../../../en/adapterref/iobroker.plex/img/screenshot_adapter-interface.png)

## 2.安装说明
### 2.1。基本设定
对于基本设置，需要提供Plex安装的IP地址（和端口）。此外，您必须为适配器检索专用令牌以从Plex检索数据。

一旦给出，ioBroker.plex将检索所有基本数据（包括服务器，库）。有关基本数据的完整列表，请参见[频道与州](#21-with-basis-setup)。

### 2.2。高级设置（Plex Pass或Tautulli）
#### 2.2.1。 Plex通行证
__Webhook__

如果您是Plex Pass用户，则可以在Plex设置中[设置一个webhook](https://support.plex.tv/articles/115002267687-webhooks/#toc-0)从您的Plex Media Server中检索当前事件/动作（播放，暂停，继续，停止，查看和评分）。

导航到Plex Media Server，然后转到```Settings```和```Webhook```§。通过单击§§JJJJJ_2_2§§创建一个新的Webhook，并使用ioBroker.plex设置中指定的自定义端口输入ioBroker IP地址，并在路径中尾随```/plex```路径，例如```http://192.168.178.29:41891/plex```：

![Plex Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

__事件__

有关Plex通知的信息，请[请参阅官方文档](https://support.plex.tv/articles/push-notifications/#toc-0)。要打开Plex Media Server上的通知，请转至`Settings`>`Server`>`General`，然后启用`Push Notifications`首选项。

#### 2.2.2.Tautulli
[Tautulli是第三方应用程序]（https://tautulli.com/#about），您可以与Plex Media Server一起运行以监视活动并跟踪各种统计信息。最重要的是，这些统计信息包括已观看的内容，观看者，观看时间和地点以及观看方式。所有统计信息均以漂亮美观的界面呈现，其中包含许多表格和图表，因此可以轻松地向其他人炫耀您的服务器。签出[Tautulli预览]（https://tautulli.com/#preview）并[将其安装在您的首选系统上](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation)（如果您有兴趣）。

此适配器连接到[Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md)，并且还从Tautulli接收webhook事件。

##### 2.2.2.1。 API
安装Tautulli后，从Tautulli仪表板打开_Settings_页面并导航到_Web Interface_。向下滚动到_API_部分，并确保已选中§§JJJJJ_0_0§§。复制```API key```并将其输入ioBroker.plex设置中。此外，添加Tautulli IP地址和端口以允许API通信。

##### 2.2.2.2。 Webhook
######概述
要使用Tautulli设置webook，请遵循以下指示并确保您已完成所有4个步骤：

1.添加通知代理
2.在Notification Agent中配置Webhook
3.在Notification Agent中配置触发器
4.在Notification Agent中配置数据
5.配置通知选项

######说明
安装后，从Tautulli仪表板打开设置页面，并导航到Notification Agents，如下所示：

![Tautulli设置](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1.单击_添加新的通知代理_和_Webhook_。
2.使用在ioBroker.plex设置中指定的自定义端口输入ioBroker IP地址，并在路径末尾加上“ / tautulli”路径，例如```http：//192.168.178.29：41891 / tautulli`''：

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png)此外，为_Webhook方法_选择§§JJJJJ_0_0§§，然后在_Description_中输入您喜欢的任何描述。

3.接下来，转到_Triggers_选项卡，选择所需的（或全部）通知代理。启用的通知代理将触发事件，然后将其发送到ioBroker。 __请确保__在下一步中为每个已启用的通知代理提供必要的数据！
4.现在，最重要的是__，根据__ [此处找到的通知配置]（README-tautulli.md＃notification-configuration）__填写_Data_选项卡中的相应数据有效负载。

   在每个文本框中复制上一步中的相关通知代理的通知配置（例如```Playback Start```，```Playback Stop```，§§JJJJ_2_2§§和```Playback Resume```），如下所示。 §JJJJJ_4§§：

   ![Tautulli通知](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

5.最后，选中选项“允许连续通知”以启用允许发送连续通知（例如，已观看和已停止的通知）：

   ![Tautulli通知设置](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification_settings.png)

## 3.频道和状态
配置了基本设置和高级设置后，将出现以下通道（库，服务器和用户仅是示例）。有关[频道和状态的完整列表](#21-with-basis-setup)的更多信息，请参见下文。

![频道与州范例](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 3.1。使用基础设置
基本设置成功后，将根据下表创建通道。有关将要创建的所有状态的列表，请[查看国家的专用清单](README-states.md#with-basis-setup)。

|频道/文件夹|描述 |
| ------- | ----------- |
| __图书馆__ | Plex库|
| __服务器__ | Plex服务器|
| __设置__ | Plex设置|

### 3.2。使用高级设置
成功进行高级设置后，将“创建”以下通道。有关将要创建的所有状态的列表，请[查看国家的专用清单](README-states.md#with-advanced-setup)。

|频道/文件夹|描述备注|
| ---------------- | ----------- | ------ |
| __ \ _ playing__ | Plex Media正在播放| Plex Pass或Tautulli的旅行|
| __统计__ | Plex手表统计信息|仅与Tautulli |
| __用户__ | Plex用户|仅与Tautulli |

## Changelog

### 0.8.11 (2019-02-26)
- (Zefau) fixed error with state retrieval on startup when no states are given
- (Zefau) updated dependencies

### 0.8.10 (2019-02-16)
- (Zefau) fixed error with state retrieval on startup when no states are given
- (Zfeau) fixed incorrect handling of certificates when using secure connection
- (Zefau) updated dependencies

### 0.8.9 (2019-12-14)
- (Zefau) updated dependencies
- (Zefau) fixed missing spaces in events (and thus Adapter Web View)
- (Zefau) fixed using username instead of email for statistics [#17](https://github.com/Zefau/ioBroker.plex/issues/17))

### 0.8.8 (2019-12-05)
- (Zefau) fixed player controls

### 0.8.7 (2019-12-02)
- (Zefau) fixed error with http / https settings

### 0.8.6 (2019-12-02)
- (Zefau) added further states to Tautulli Notification (see [README-tautulli.md](https://github.com/Zefau/ioBroker.plex/blob/master/README-tautulli.md))
- (Zefau) fixed design issue with select-box in the adapter settings
- (Zefau) fixed not showing thumbnails in adapter web view (when not using a secure connection)

### 0.8.5 (2019-12-01)
- (Zefau) fixed missing user / library statistics
- (Zefau) fixed using username instead of email for statistics [#17](https://github.com/Zefau/ioBroker.plex/issues/17))

### 0.8.4 (2019-11-07)
- (Zefau) added support for remote player control via cloud / iot adapter
- (Zefau) added thumbnail to notifications as well as web interface of adapter
- (Zefau) fixed icons within the web interface of adapter

### 0.8.3 (2019-11-06)
- (Zefau) fixed player controls (error when triggering `start`, `stop`, etc.)
- (Zefau) added additional states to `event` channel

### 0.8.1 (2019-11-02)
- (Zefau) fixed error `Cannot read property 'forEach' of undefined`

### 0.8.0 (2019-10-28)
- (Zefau) added support for Plex Notifications including customization in adapter settings
- (Zefau) added count of streams [#14](https://github.com/Zefau/ioBroker.plex/issues/14))
- (Zefau) reworked cleaning up states when new webhook is received [#11](https://github.com/Zefau/ioBroker.plex/issues/11))

### 0.7.0 (2019-10-17)
- (Zefau) reworked duty cycle (clean up of outdated / old states)
- (Zefau) fixed incorrect states [#15](https://github.com/Zefau/ioBroker.plex/issues/15))

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

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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