---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.synology/README.md
title: ioBroker Synology适配器
hash: tmY0K1EQ19t8kcb8dvdFpborvlzzMaoGF8O4LaDq7og=
---
![标识](../../../en/adapterref/iobroker.synology/admin/synology.png)

![安装数量](http://iobroker.live/badges/synology-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.synology.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.synology.svg)
![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

＃ioBroker Synology适配器
[![测试]（https://github.com/instalator/iobroker.synology/workflows/Test%20and%20Release/badge.svg）](https://github.com/instalator/ioBroker.synology/actions/)

＃＃ 描述
该驱动程序使您可以接收数据并管理Synology NAS服务器。

### 2FA设置
如果使用2FA，请参阅说明[这里](docs/en/template.md)

### SendMethod
您可以通过设置sendMethod对象来发送任何命令（方法），例如：获取SurveillanceStation信息是一个没有附加参数的getInfo方法。

```{"method": "getInfo", "params": {}}```

＃＃＃ 控制
** commands.reboot **-重新启动NAS

** commands.shutdown **-关闭NAS

*** SurveillanceStation.cameras。{NAMECAM} ***：

*启用-当前状态和启用/禁用摄像头
* linkSnapshot-快照的URL

*** SurveillanceStation.HomeMode.status_on ***-当前状态和启用/禁用Homemode

*** SurveillanceStation.getSnapshotCamera ***-通过摄像机编号获取快照，文件保存在目录“`...iobroker-data\synology_0\snapshotCam_2.jpg`”中

*** AudioStation.players。{PLAYERID} ***：

*播放，暂停，停止，下一个，上一个-控制播放（按钮，仅true）
*重复-重复控制（关闭，全部，一个）
*随机播放-随机播放控制（对/错）
*音量-音量远程播放器（0-100）
*搜索-控制播放搜索（0-100）
* play_folder-将文件夹中的曲目添加到播放列表（id文件夹，例如``dir_5816''）
* play_track-按其ID播放曲目（例如``music_120847''）
* current_play-根据当前曲目在播放列表中的编号来控制和状态（例如``14''）

*** DownloadStation ***：

* activeTask-不完整下载数
* listTasks-下载不完整的数组
* shedule_enabled，shedule_emule_enabled-计划或立即下载的状态和控制
* add_hash_download-添加到哈希下载（例如``8BD3CAD02FC9ECB661A12378414FA310D3F3FE03''）
* add_url_download-添加下载URL或磁铁链接
*文件夹-要下载的文件夹，在添加下载之前设置，否则将加载到默认文件夹中
* pause_task，resume_task-暂停下载并继续。 （例如``dbid_170''或``170''或``all''）

###消息框
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog

### 0.1.20
* (instalator) fixed error

### 0.1.18
* (instalator) change link for album cover

### 0.1.17
* (instalator) added Sentry plugin support

### 0.1.16
* (instalator) fixed error

### 0.1.15
* (instalator) fixed error in parse Info
* (instalator) fixed api undefined

### 0.1.14
* (instalator) fixed missing [datapoints](https://github.com/instalator/ioBroker.synology/issues/43)
* (instalator) refactoring
* (instalator) Changed the logging of some errors
* (instalator) Changed format session in syno package

### 0.1.11
* (instalator) added motionDetected state
* (SpectreKr*) Adding to FS Sharing

### 0.1.10
* (instalator) fixed copy cover file
* (instalator) fix get packages for DSM 5.x
* (instalator) Added option to select services for receiving data

### 0.1.8
* (instalator) fix error addDownload
* (instalator) fixed listRadios
* (instalator) fixed get cover

### 0.1.7
* (instalator) fixed 2FA
* (instalator) Added setup guide 2FA

### 0.1.6
* (instalator) fix for 2fa
* (instalator) fix error
* (instalator) change error log
* (instalator) fix io-package
* (instalator) fix error status player

### 0.1.4
* (instalator) change for DownloadStation
* (instalator) added playlist favorite radio
* (instalator) added clearPlaylist button
* (instalator) refactoring

### 0.1.3
* (instalator) change obj for ss info fix for cover song 
* (instalator) fix for info.connection 
* (instalator) add 6.2.3 fix for player browser files 
* (instalator) fix for 2FA
* (instalator) fixed error add download 
* (instalator) added DownloadStation task list

### 0.1.2
* (instalator) fixed error

### 0.1.1
* (instalator) added messagebox for snapshot
* (instalator) update readme
* (instalator) added ss link for different streams
* (instalator) fix error
* (instalator) refactoring

### 0.1.0
* (instalator) added HomeMode switch 
* (instalator) change for audiostation 
* (instalator) change for as and ss
* (instalator) added snapshot functional 
* (instalator) fixed systemConfig 
* (instalator) fixed many error 

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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