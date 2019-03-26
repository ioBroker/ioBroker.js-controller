---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/instalator/ioBroker.synology/edit/master//README.md
title: Synology NAS
hash: PK2eYNCL25EcHkB6W/f0u9arLX1+0iCe8IE0jXXXhCY=
adapter: true
license: MIT
authors: instalator
description: Get status and control your NAS Synology
keywords: synology NAS control
readme: https://github.com/instalator/ioBroker.synology/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-10-05T15:57:51.199Z
version: 0.0.4
BADGE-安装数量: http://iobroker.live/badges/synology-stable.svg
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.synology.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.synology.svg
BADGE-测试: http://img.shields.io/travis/instalator/ioBroker.synology/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.synology.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.synology/../../../en/adapterref/iobroker.synology/admin/synology.png)


#ioBroker Synology适配器=================
##说明
该驱动程序允许您接收数据并管理Synology NAS服务器。

您可以通过设置sendMethod对象来发送任何命令（方法），例如：获取SurveillanceStation信息是一个没有其他参数的getInfo方法。

```{"method": "getInfo", "params": {}}```

## Описание
ДрайверпозволяетполучатьданныеиуправлятьвашимNASсерверомфирмыSynology。

Можноотправитьлюбуюкоманду（метод）установивзначениеобьекта```sendMethod```，например：ПолучитьинфоSurveillanceStationэтометод的getInfoбездополнительныхпараметров。

```{"method":"getInfo", "params":{}}```

## Changelog

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial