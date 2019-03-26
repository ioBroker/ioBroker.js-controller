---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/MeisterTR/ioBroker.yeelight-2/edit/master//README.md
title: Yeelight控制器
hash: Kgokgx6YyMwsn8SeX8Yveg0962+Ac+mZW7EAWn2waCw=
adapter: true
license: MIT
authors: <MeisterTR <meistertr.smarthome@gmail.com>, cahek2202 <cahek2202@mail.ru>
description: 控制你的Yeelights
keywords: xiaomi, yeelight, mihome
readme: https://github.com/MeisterTR/ioBroker.yeelight-2/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2018-06-05T03:38:15.837Z
version: 1.0.1
BADGE-安装数量: http://iobroker.live/badges/yeelight-2-installed.svg
BADGE-版: http://iobroker.live/badges/yeelight-2-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.yeelight-2.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.yeelight-2.svg
BADGE-特拉维斯-CI: https://api.travis-ci.org/MeisterTR/ioBroker.yeelight-2.svg?branch=master
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.yeelight-2?branch=master&svg=true
BADGE-NPM: https://nodei.co/npm/iobroker.yeelight-2.png?downloads=true
---
<!-- -->

![商标](zh-cn/adapterref/iobroker.yeelight-2/../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

＃ioBroker.yeelight-2 =================
[Deutsche Beschreibung hier](README_de.md)

此适配器控制您的Yeelight设备。此适配器仅适用于admin3。不支持Admin2

##跳转版
从0.4.X更改为0.9.X或更高时，必须手动删除对象，以便可以重新创建它们。

##安装
对于RGB灯泡，您必须在yeelight应用程序的设置中启用LAN。

![](zh-cn/adapterref/iobroker.yeelight-2/../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

##配置
您可以手动添加设备或在网络中查找设备。基本端口是55443.如果需要，可以更改名称，IP，端口和smartname

### Smartname
如果你键入一个智能名称，该设备将添加到iobroker.cloud并可以通过alexa控制。

###查找设备
使用此按钮，您可以扫描网络中的设备，如果找到了某些内容，则会将div添加到表格中。扫描网络大约需要20秒。如果找不到设备，则不启用Lan模式或灯泡位于其他网络中。

## Set_scene
用法：此方法用于将智能LED直接设置为指定状态。如果智能LED熄灭，则它将首先打开智能LED，然后应用指定的命令。

参数：3~4。

 “class”可以是“color”，“hsv”，“ct”，“cf”，“auto_dealy_off”。

 - “颜色”表示将智能LED更改为指定的颜色和

亮度。

 - “hsv”表示将智能LED更改为指定的颜色和亮度。
 - “ct”表示将智能LED更改为指定的ct和亮度。
 - “cf”表示以指定方式启动颜色流。
 - “auto_delay_off”表示将智能LED指示灯打开

亮度并启动睡眠定时器以在指定的分钟后关闭灯光。

 “val1”，“val2”，“val3”是特定于类的。

请求示例：

 - ```['color“，65280,70]``
 - ``[`hsv“，300,70,100]``
 - ``[`ct“，5400,100]``
 - ````[“cf”，0,0，“500,1,255,100,1000,1,16776960,70”]``
 - ``[“auto_delay_off”，50,5]``

注意：在“开”和“关”状态下均可接受。

 以上示例：

  - 第一种是将颜色设置为“652280”和70％亮度。
  - 第二种是将颜色设置为Hue：300，饱和度：70和最大亮度。
  - 第三个是将CT设置为500K和100％亮度。
  - 第四个是在两个流元组上启动无限颜色流。
  - 第五个是将灯打开到50％亮度，然后关闭

5分钟后。

## Changelog
### 1.0.1 (2018-12-08)
* (MeisterTR) push version, added set_scene
### 0.9.6 (2018-12-08)
* (MeisterTR) yeelight-wifi added
* (MeisterTR) fixed  bugs
* (MeisterTR) add manuell light
* (MeisterTR) better error handling
* (MeisterTR) fixed reconnect at start
* (MeisterTR) delete object and smartname bug fixed
### 0.9.1 (2018-10-31)
* (MeisterTR) added offline detection, poll sates, cleanup
### 0.9.0 (2018-08-29)
* (MeisterTR) rebuild
### 0.4.1 (2018-08-29)
* (MeisterTR) fixed JSON error
### 0.4.0 (2018-08-29)
* (MeisterTR) fixed errors
* (MeisterTR) added scenen
### 0.3.6 (2018-07-07)
* (MeisterTR) catch spaces in config, small performance changes
### 0.3.5 (2018-06-18)
* (MeisterTR) added yeelight650, fixed some bugs, power on when ct change
### 0.2.9 (2018-06-07)
* (MeisterTR) change name for repo and npm
### 0.2.8 (2018-06-01)
* (MeisterTR) fixed bug wit port, fixed set ct by alexa
### 0.2.6 (2018-05-31)
* (MeisterTR) fixed manny bugs.
### 0.2.0 (2018-03-07)
* (MeisterTR) many changes add smartname Option, add manual devices, many fixes
* (MeisterTR) fix role for alexa
### 0.1.1 (2018-03-07)
* (MeisterTR)return to default value when turn on
* (MeisterTR)fix role for alexa
### 0.1.0 (2018-03-07)
* (MeisterTR) many changes, add hue and sat for alexa control
### 0.0.2 (2018-03-07)
* (MeisterTR) objects not overwirte after restart
### 0.0.2 (2018-03-07)
* (MeisterTR) testing added, log changed
### 0.0.1 (2018-01-29)
* (cahek2202) initinal version



base from: adb backup https://github.com/cahek2202/ioBroker.yeelight