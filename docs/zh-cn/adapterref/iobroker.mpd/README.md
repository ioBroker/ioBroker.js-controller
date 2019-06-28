---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mpd/README.md
title: ioBroker.mpd适配器
hash: nICyiM828I14uglLlFHsHPTR/nhrqxON2tzU08H/1Yw=
---
![商标](../../../en/adapterref/iobroker.mpd/admin/mpd.png)

![安装数量](http://iobroker.live/badges/mpd-stable.svg)
![NPM版本](https://img.shields.io/npm/v/iobroker.mpd.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mpd.svg)
![测试](http://img.shields.io/travis/instalator/ioBroker.mpd/master.svg)
![NPM](https://nodei.co/npm/iobroker.mpd.png?downloads=true)

#ioBroker.mpd适配器
连接到[音乐播放器守护进程](http://musicpd.org)服务器，发送命令，发出事件。

##文档
另见[MPD协议文档](http://www.musicpd.org/doc/protocol/)。

## Changelog

#### 1.0.2
* (twonky) support admin3

#### 1.0.0
* (instalator) Up to stable

#### 0.2.4
* (instalator)  change  for sayit

#### 0.2.3
* (instalator)  change  log level for send command
                change  replay
                fix replay online radio
                fix error

#### 0.2.2
* (instalator)  fix replay in sayit

#### 0.2.1
* (instalator)  fix different error
                fix time
                fix messagebox
                added smooth volume for sayit if is play music

#### 0.2.0
* (instalator) Big change for SayIt

#### 0.1.7
* (instalator) change role media.pos to media.track

#### 0.1.6
* 05.01.2017 (instalator)  fix error for sayit

#### 0.1.4
* 05.01.2017 (instalator)  fix error

#### 0.1.3
* 02.01.2017 (instalator)  fix clear playlist\nadded file manager

#### 0.1.2
* 02.01.2017 (instalator)  change for playlist widgets

#### 0.1.1
* 02.01.2017 (instalator)   fix error sendTo text2speech
                            change error level (NOT connected)
                            change progressbar to seek
                            fix mute
                            refactor default object

#### 0.1.0
* 22.12.2016 (instalator) change structure

#### 0.0.13
* 21.12.2016 (instalator) clearTag(), adding states - progressbar and mute

#### 0.0.12
* 19.12.2016 (instalator) add support sayit. add state addplay

#### 0.0.11
* 18.12.2016 (instalator) add tests

#### 0.0.10
* 15.12.2016 (instalator) add update status if play, to check whether the value has changed, fix error, fix different cmd

#### 0.0.3
* 14.12.2016 (instalator) fix send command
                          change functions parse
                          add function status mpd

#### 0.0.2
* 13.12.2016 (instalator) Add send command

#### 0.0.1
* 11.12.2016 (instalator) initial adapter