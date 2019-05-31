---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech Squeezebox适配器通过JSON / RPC协议
hash: 0+k6sw+oV2Ep1ZCTnomHN4tH6cjNb5PtjbqjoLiKKdY=
---
![商标](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![安装数量](http://iobroker.live/badges/squeezeboxrpc-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![下载](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![特拉维斯](https://img.shields.io/travis/oweitman/ioBroker.squeezeboxrpc.svg)
![AppVeyor构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-squeezeboxrpc.svg)
![GitHub问题](https://img.shields.io/github/issues/oweitman/ioBroker.squeezeboxrpc.svg)

＃ioBroker Logitech Squeezebox适配器通过JSON / RPC协议
这是一个替代适配器，它使用JSON / RPC-Protokoll获取数据并将命令发送到Logitech媒体服务器（[LMS](https://de.wikipedia.org/wiki/Logitech_Media_Server)），以控制连接的设备，如

* native [squeezebox]（https://de.wikipedia.org/wiki/Squeezebox），
* raspberry pi具有额外的音频模块和基于小型Linux的固件，如[picoreplayer]（https://picoreplayer.org/）或[max2play]（https://www.max2play.com）。
*使用插件chromecast，airplay或UPnP / DLNA-Devices

LMS-Server可以在硬盘或NAS上管理/提供非常大的音乐收藏，连接到Spotify，Deezer，Soundcloud，shoutcast，tunein，napster，pandora，tidal等不同的流媒体提供商

为什么另一个squeezebox适配器？

现有适配器使用telnet访问LMS。 telnet有一些缺点。
LMS的实际主Web界面还使用rpc / json-protocol获取所有需要的信息或向服务器/播放器发送命令。

＃＃ 特征
 -  LMS-Service提供的大多数数据都可在适配器中使用
 - 有关播放器状态，歌曲标题，艺术家，专辑，艺术作品，播放列表的详细信息
 - 许多控制功能，播放，暂停，停止，前进，后退，重复，随机播放，播放收藏，跳转到时间（绝对和相对），跳转到播放列表索引（绝对和相对），电源开/关和预设按钮
 - 所有收藏夹和服务器的所有子级别

##安装
 - 安装包
 - 创建一个实例
 - 使用Logitech介质服务器的IP和端口配置实例（normaly 9000）
 - 启动/重启实例

##提供状态
###服务器
|州|说明|
| ----------------- | ------------------------------ |
| LastScan |最后一次音乐扫描的时间戳|
| PlayerCount |众所周知的球员数量 |
| PlayerCountOther |已知其他玩家的数量|
| PlayerCountSN |已知SN播放器的数量|
| TotalAlbums |所有已知专辑的数量|
|艺术家总数|所有已知艺术家的数量|
| TotalDuration |所有歌曲的总和播放时间|
| TotalGenres |所有已知类型的数量|
| TotalSongs |所有已知歌曲的数量|
|版本| LMS的版本|
| mac |服务器的MAC-ID |
| uuid | LMS-instance的uuid |

附加一个用于刷新收藏夹的已定义按钮

按钮|说明----------------- | --------------------------------------------- getFavorites |请求服务器的所有收藏夹

###收藏夹
对于每个收藏夹所有属性都是只读的

州|说明----------------- | ------------------------------姓名|最喜欢的有问题的名字|指示这是否是dir id |最喜欢的图像的ID |最喜欢的图像/图标isaudio | isaudio类型|示例类型：链接，文本，音频，播放列表网址|赛道的网址

 可以使用所有喜欢的子级别（子目录）。

###玩家
对于每个玩家模式显示您是否可以更改该值。在属性中描述了采取的操作

州|模式|说明-------------------- | ---- | -------------------------------------------------- ---专辑| R /  -  |当前专辑Artist | R /  -  |的名称艺术家名称ArtworkUrl | R /  -  | url to artwork Bitrate | R /  -  |轨道的比特率连接| R /  -  |播放器的连接状态（0/1）持续时间| R /  -  |赛道的持续时间类型| R /  -  |轨道的类型IP | R /  -  |播放器模式的IP | R /  -  |播放/暂停/停止播放器名称| R /  -  |玩家ID的名称| R /  -  |玩家ID播放列表| R /  -  |实际的播放列表为JSON PlaylistCurrentIndex | R / W |通过指定trackindex或者在开头使用+或 - 来相对于绝对位置。例10，-3，+ 2 PlaylistRepeat | R / W |重复歌曲（1）/播放列表（2）/不重复（0）PlaylistShuffle | R / W | shuffle playlist（1）/ shuffle album（2）/ dont shuffle（0）Power | R / W | get / set Powerstate of player off（0）/ on（1）RadioName | R /  -  |放射率名称| R /  -  |歌曲遥控器的等级| R /  -  |如果是远程流（1）SyncMaster | R /  -  | Syncmaster SyncSlaves的ID / MAC | R /  -  |同步组时间中玩家的ID / Mac | R /  -  |已逝的歌曲时间标题| R /  -  |歌名类型| R /  -  |媒体类型（例如MP3收音机）Url | R /  -  |曲目/流的音量卷| R / W |获取/设置播放器的音量（0-100）状态| R / W |获取/设置播放状态：暂停（0），播放（1），停止（2）

如果在LMS中可用，则播放列表提供实际的以下属性。
Somme属性取决于歌曲的类型（流/文件/ ...）所有属性都是只读的

属性|说明----------------- | -------------------------------------------------- ---专辑|当前专辑Artist |的名称艺术家的名字ArtworkUrl | url to the Artwork Bitrate |轨道的比特率持续时间|轨道的持续时间RadioName |辐射率名称|评分歌曲标题|歌名类型|媒体类型（例如MP3收音机）网址|曲目/流索引的URL |播放列表id |中歌曲的索引这首歌的id

其他定义的按钮：

按钮|说明----------------- | --------------------------------------------- btnForward |下一首歌btnRewind |上一首歌btnPreset_ * | 1-6个按钮，用于在播放器或服务器中定义cmdPlayFavorite |播放收藏夹设置收藏的cmdGoTime |的ID通过指定秒数或在秒的开头用+或 - 相对跳跃来跳转到绝对位置。实施例100，-50，+ 50

有关更多信息，请访问CLI文档：

https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md

＃＃ 去做
*更多测试/修复
*添加telnet通信以从服务器获取推送事件以优化轮询
*为splayer状态添加id
*减少依赖关系到其他包（squeezenode）
*实现一个命令状态，为服务器和播放器放置用户个人命令（通过json）
*更多配置可选择打开/关闭功能以改善内存和性能
* ~~实现更多控制功能（选择播放列表播放，ffwd，frew，跳转到歌曲中的时间位置，重复播放歌曲，随机播放歌曲）~~
* ~~将播放列表添加到playerdata作为json数组~~
* ~~为收藏夹添加艺术品（station-logo / playlist-cover）~~
* ~~实现更多级别（子目录）的收藏~~
* ~~自动发现罗技媒体服务器~~

## Changelog
### 0.8.10 (2019-05-15)
* another try to fix the EADDRINUSE error of the server discovery
### 0.8.9 (2019-05-15)
* try to fix the EADDRINUSE error of the server discovery
### 0.8.8 (2019-05-14)
* make discover configurable
### 0.8.7 (2019-05-11)
* more control features (select playlist pos to play,ffwd,frew,jump to a time position in song,repeat song,random song)
### 0.8.6 (2019-05-10)
* move some configuration options into seperate tabs
### 0.8.5 (2019-05-08)
* change serverdiscovery interval method, remove some double cmd lines, additional minor changes advised from eslint
### 0.8.4
* move some files to lib directory
### 0.8.3
* close port for discovery on unload
### 0.8.2
* sync version with npm
### 0.8.1
* set compact mode flag
### 0.8.0
* implementation of compact mode, change version to represent a realistic feature completness
### 0.0.9
* debug options are now configurable
### 0.0.8
* More playlist attributes + remove trailing and leading spaces from source
### 0.0.7
* Add the playlist to each player as json
### 0.0.6
* More config options
### 0.0.5
* All levels/subdirectories of favorites are now available in iobroker
### 0.0.4
* added the cmdPlayFavorite for each player
### 0.0.3
* repair the no-data symbols for buttons in vis
### 0.0.2
* added autodiscovery
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2019 oweitman

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