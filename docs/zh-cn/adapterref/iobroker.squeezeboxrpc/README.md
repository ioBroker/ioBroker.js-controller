---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.squeezeboxrpc/README.md
title: 通过JSON / RPC协议的ioBroker Logitech Squeezebox适配器
hash: xnD8N0Iy6xNIN45LSO3mTEj+W0qT0gB4cRrQcNsnEYk=
---
![商标](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![安装数量](http://iobroker.live/badges/squeezeboxrpc-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![特拉维斯](https://img.shields.io/travis/oweitman/ioBroker.squeezeboxrpc.svg)
![AppVeyor构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-squeezeboxrpc.svg)
![GitHub问题](https://img.shields.io/github/issues/oweitman/ioBroker.squeezeboxrpc.svg)

＃通过JSON / RPC协议的ioBroker Logitech Squeezebox适配器
这是一个备用适配器，它使用JSON / RPC-Protokoll获取数据并将命令发送到Logitech媒体服务器（[LMS](https://de.wikipedia.org/wiki/Logitech_Media_Server)），以控制已连接的设备，例如

*原生[squeezebox]（https://de.wikipedia.org/wiki/Squeezebox），
*树莓派，带有附加的音频模块和基于小型Linux的固件，例如[picoreplayer]（https://picoreplayer.org/）或[max2play]（https://www.max2play.com）。
*带有chromecast，airplay或UPnP / DLNA设备插件

LMS服务器可以管理/提供硬盘或NAS上的超大音乐收藏，并连接到不同的流媒体提供商，例如Spotify，Deezer，Soundcloud，shoutcast，tunein，napster，pandora，潮汐等

为什么要使用另一个squeezebox适配器？

现有适配器使用telnet访问LMS。 telnet有一些缺点。
LMS的实际主Web界面还使用rpc / json-protocol获取所有需要的信息或将命令发送到服务器/播放器。

＃＃ 特征
-LMS服务提供的大多数数据在适配器中可用
-有关播放器状态，歌曲标题，艺术家，专辑，插图，播放列表的详细信息
-许多控制功能可播放，暂停，停止，前进，快退，重复，随机播放，播放收藏夹，跳至时间（绝对和相对），跳至播放列表索引（绝对和相对），电源开/关和预设按钮
-服务器中的所有收藏夹和所有子级别
-包含许多用于iobroker-vis组件的小部件，以创建自己的控制用户界面（选择播放器，选择收藏夹，管理同步组，用于播放/暂停，正转，滚动，重复模式和随机播放模式选择的按钮）

##安装
-安装套件
-创建一个实例
-使用Logitech媒体服务器的IP和端口（通常为9000）配置实例
-启动/重启实例

##提供的状态
###服务器
|州|描述 |
| ----------------- | ------------------------------ |
| LastScan |上次音乐扫描的时间戳|
| PlayerCount |已知球员数|
| PlayerCountOther |已知其他玩家数量|
| PlayerCountSN |已知SN播放器数量|
|总专辑|所有已知专辑的数量|
| TotalArtists |所有已知艺术家的数目 |
|总持续时间|所有歌曲的总播放时间|
| TotalGenres |所有已知类型的数量 |
| TotalSongs |所有已知歌曲的数量|
|同步组|现有的同步组|
|版本| LMS版本|
| mac |服务器的MAC-ID |
| uuid | LMS实例的uuid |

另外一个定义的按钮来刷新收藏夹

按钮|说明----------------- | --------------------------------------------- getFavorites |从服务器请求所有收藏夹

###收藏
对于每个收藏夹，所有属性都是只读的

州|说明----------------- | ------------------------------名称|最喜欢的hasitems的名称|指示这是否是目录ID |最喜欢的图像的ID |可用的图像/图标（如果可用）isaudio | isaudio类型|示例类型：链接，文本，音频，播放列表网址|曲目的网址

 收藏夹的所有子级别（子目录）均可用。

###玩家
对于每个玩家该模式显示是否可以更改值。在属性中描述了所采取的操作

状态|模式|说明-------------------- | ---- | -------------------------------------------------- ---专辑| R /-|当前专辑的名称艺术家| R /-|艺术家作品名称的名称| R /-|网址至图稿比特率| R /-|轨道的比特率已连接| R /-|玩家的连接状态（0/1）持续时间| R /-|曲目时长| R /-| IP | R /-|的流派播放器的IP模式| R /-|播放/暂停/停止玩家名称| R /-|播放器的名称PlayerID | R /-|玩家ID播放列表| R /-|实际播放列表为JSON PlaylistCurrentIndex | R / W |通过指定trackindex到达绝对位置，或者在开头添加+或-相对。示例10，-3，+ 2播放列表重复| R / W |重复播放歌曲（1）/播放列表（2）/不要重复播放（0）播放列表随机播放| R / W |随机播放列表（1）/随机专辑（2）/不随机播放（0）Power | R / W |获取/设置播放器电源状态off（0）/ on（1）RadioName | R /-|电台名称名称费率| R /-|歌曲的评级| R /-|如果是远程流（1）SyncMaster | R /-| Syncmaster SyncSlaves的ID / MAC | R /-|同步组时间中的播放器ID / Mac | R /-|歌曲的播放时间标题| R /-|歌曲名称类型| R /-|媒体类型（例如MP3广播）Url | R /-|轨道/流的网址音量| R / W | get / set播放器的音量（0-100）状态| R / W |获取/设置播放状态：暂停（0），播放（1），停止（2）

播放列表实际提供以下属性（如果在LMS中可用）。
Somme属性取决于歌曲的类型（流/文件/ ...）。所有属性均为只读

属性|说明----------------- | -------------------------------------------------- -专辑当前专辑的名称艺术家|艺术家ArtworkUrl的名称|网址至图稿比特率|曲目的比特率时长|曲目持续时间RadioName |电台名称名称费率|歌曲标题的分级|歌曲名称类型|媒体类型（例如MP3广播）url |轨道/流索引的网址|播放列表ID中歌曲的索引|歌曲的编号

其他定义的按钮：

按钮|说明----------------- | --------------------------------------------- btnForward |下一首歌btnRewind |上一首歌曲btnPreset_ * |在播放器或服务器cmd中定义的1-6个按钮将命令发送到播放器的常规命令字段。每个字段都必须用引号引起来。参数必须用逗号分隔。示例：“ play”，“ 1” cmdPlayFavorite |播放收藏夹设置收藏夹cmdPlayUrl的ID |播放网址示例“ http://50.7.77.114:8101/;” cmdGoTime |通过指定秒数来跳到绝对位置，或者在秒开始时以+或-相对跳。例子100，-50，+ 50

有关更多信息，请访问CLI文档：

https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md

＃＃ 去做
*更多测试/修复
*添加telnet通信以从服务器获取推送事件以优化轮询
*添加ID到玩家状态
*减少对其他软件包的依赖（squeezenode）
*实现命令状态以放置服务器和播放器的用户个人命令（通过json）
*更多配置可选打开/关闭功能以改善内存和性能
* ~~实现更多控制功能（选择播放列表pos以播放，ffwd，frew，跳到歌曲，重复歌曲，随机歌曲中的时间位置）~~
* ~~将播放列表作为json数组添加到playerdata ~~
* ~~添加艺术品（station-logo / playlist-cover）作为收藏夹~~
* ~~实现收藏夹的更多级别（子目录）~~
* ~~自动发现罗技媒体服务器~~

## Changelog
### 0.8.18 (2019-06-27)
* last minute changes.
### 0.8.17 (2019-06-26)
* add more widges: playtime bar, string, number, datetime, image. add button margin to player and favorite widget, improve editing of viewindex. do some refactoring.
### 0.8.16 (2019-06-24)
* resolve a cross browser issue for firefox. the style.font attribute is empty and you have to construct the font string by yourself
### 0.8.15 (2019-06-19)
* minor issue with not ready states
### 0.8.14 (2019-06-19)
* add syncgroups as new server-datapoint,add syncgroup widget, change some jquery event logic
### 0.8.13 (2019-06-16)
* rename widgetset from squeezeboxrpcwidgets to squeezeboxrpc
### 0.8.12 (2019-06-16)
* sync version with npm
### 0.8.11 (2019-06-15)
* try to integrate the widgets into the main adapter
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