---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/UncleSamSwiss/ioBroker.squeezebox/edit/master//README.md
title: Logitech Squeezebox Adapter
hash: ekS2ohwzWNTJBxDf+mja5LYVVNoiC5NOygUYuD9GSyk=
adapter: true
license: Apache 2.0
authors: UncleSamSwiss <samuel.weibel@gmail.com>
description: Controls a Squeezebox Server a.k.a. Logitech Media Server and its players.
keywords: squeezebox, logitech, media server, audio, playback
readme: https://github.com/UncleSamSwiss/ioBroker.squeezebox/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-01-16T12:56:24.243Z
version: 1.0.0
BADGE-安装数量: http://iobroker.live/badges/squeezebox-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.squeezebox.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.squeezebox.svg
BADGE-特拉维斯: https://img.shields.io/travis/UncleSamSwiss/ioBroker.squeezebox.svg
BADGE-AppVeyor构建状态: https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-squeezebox.svg
BADGE-GitHub问题: https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.squeezebox.svg
---
![商标](zh-cn/adapterref/iobroker.squeezebox/../../../en/adapterref/iobroker.squeezebox/admin/squeezebox.png)


＃ioBroker Logitech Squeezebox适配器
控制Squeezebox服务器a.k.a. Logitech媒体服务器及其播放器。

##安装
通过ioBroker Admin安装此适配器。

1.打开实例配置对话框
2.输入Squeezebox服务器的IP地址或主机名
3.如果系统中有足够的性能，请降低更新间隔时间值。
4.保存配置
5.启动适配器

##配置
### Logitech媒体服务器地址
这是Squeezebox服务器的IP地址或主机名。

### Logitech媒体服务器端口
这是Squeezebox Server的TCP端口。
可选，默认值为9090。
服务器必须在此端口上侦听telnet命令（不要将其与Web（HTTP）端口混淆，后者始终是不同的端口）。

###用户名（可选）
这是您的Squeezebox服务器的用户名。
默认情况下，这可以保留为空。只有在您的服务器启用了密码保护时才需要它。

###密码（可选）
这是您的Squeezebox服务器的密码。
默认情况下，这可以保留为空。只有在您的服务器启用了密码保护时才需要它。

###跟踪时间更新间隔（秒）
每N秒更新播放曲目的经过时间。
如果您不使用它进行可视化，请将此值保留为5秒。
如果需要更高精度，请将其设置为2或1秒。

＃＃ 状态
适配器自动连接到配置的Squeezebox服务器，并为连接到Squeezebox服务器的每个播放器创建以下状态。

状态名称的格式如下：squeezebox。＆lt; instance＆gt;。＆lt; player＆gt;。＆lt; state＆gt;

 - ＆lt; instance＆gt;是ioBroker适配器实例索引（通常为“0”）
 - ＆lt; player＆gt;是您在配置时为播放器指定的名称（空格由下划线“_”替换）
 - ＆lt; state＆gt;在以下部分中描述

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .power
布尔值，读写

 -  true：播放器已启动
 - 假：plyer处于待命状态

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .state
枚举，读写

 -  0：暂停
 -  1：玩
 -  2：停止

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .volume
整数（0 ... 100），读写

从无（0）到最大（100）的播放音量设置高值（> 50）时要小心，因为这可能会伤害您的耳朵（或您所爱的人）！

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .muting
布尔值，读写

 -  true：播放器静音（播放继续，但扬声器关闭）
 -  false：播放器处于常规播放模式

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .pathUrl
字符串，读写

当前正在播放（或暂停）的歌曲或流的URL。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .currentTitle
字符串，只读

当前正在播放（或暂停）的歌曲或流的名称。可以是空的。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .currentAlbum
字符串，只读

当前正在播放（或暂停）的歌曲或流的专辑名称。可以是空的。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .currentArtist
字符串，只读

当前正在播放（或暂停）的歌曲或流的艺术家姓名。可以是空的。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .currentArtwork
字符串（URL），只读

当前正在播放（或暂停）的歌曲或流的艺术作品的URL。永远不应该是空的。
如果播放流，则使用其图稿URL（请参阅CLI“songinfo”标记“K”）。
如果没有可用的艺术品URL（例如，对于来自LMS的常规MP3），则使用通用的“当前播放器艺术作品”链接。
对于通用图稿链接，适配器添加“随机”数字，以确保每当歌曲更改时URL都会更改。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .currentDuration
整数，只读

当前歌曲或流的总长度（以秒为单位）。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .currentDurationText
字符串，只读

格式化当前歌曲或流的总长度。 （格式：“[hh：] mm：ss”）

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .elapsedTime
整数，只读

已播放当前歌曲或流的秒数。每个“跟踪时间更新间隔”更新此值（请参阅上面的配置）

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .elapsedTimeText
字符串，只读

已经播放当前歌曲或流的格式化时间。每个“跟踪时间更新间隔”更新此值（请参阅上面的配置）

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .sleep
整数，读写

玩家进入睡眠状态的秒数。
将此状态设置为淡出并以给定的秒数关闭播放器作为持续时间。
如果此值为零，则播放器关闭或不睡觉;否则这名球员将要入睡。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .buttons.forward
按钮，只写

跳转到播放列表中的下一首曲目。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .buttons.rewind
按钮，只写

跳转到播放列表中的上一首曲目。

### Squeezebox。＆lt; instance＆gt;。＆lt; player＆gt; .buttons.preset_＆lt; 1-6＆gt;
按钮，只写

切换到存储在播放器中的给定预设编号。

##路线图/ Todo
 - 播放列表的状态[Arminhh]
 - 玩家同步[Arminhh]
 - 从ioBroker控制LMS（例如从收藏中选择一个电台）[ak1]

## Changelog
### 1.0.0 (2018-12-23)
* (mrMuppet) Fixed title error in streams and artwork.
* (mafof) Added buttons for forward/rewind and presets.
* (mafof) Added playlist path URL and sleep states.

### 0.2.1 (2017-10-08)
* (UncleSamSwiss) Fixed issue with more than 9 players (fix in logitechmediaserver package)

### 0.2.0 (2017-07-24)
* (UncleSamSwiss) Added support for optional TCP port number (default is still 9090)
* (UncleSamSwiss) Added support for optional login using username and password (by default still no authentication is used)

### 0.1.0 (2016-01-16)
* (UncleSamSwiss) Ready to be published to NPM (no further changes)

### 0.0.2 (2016-01-10)
* (UncleSamSwiss) Support for artwork (will use stream artwork if available, otherwise server artwork)

### 0.0.1 (2015-12-07)
* (UncleSamSwiss) Initial version

## License

Apache 2.0

Copyright (c) 2015 UncleSamSwiss