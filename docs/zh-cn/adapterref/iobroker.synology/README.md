---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.synology/README.md
title: ioBroker Synology适配器
hash: fpMC7xZ01wUDM2to414TR0dG2akm8/ww+O+CTOb1oH0=
---
![商标](../../../en/adapterref/iobroker.synology/admin/synology.png)

![安装数量](http://iobroker.live/badges/synology-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.synology.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.synology.svg)
![测验](http://img.shields.io/travis/instalator/ioBroker.synology/master.svg)
![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)
![捐](https://img.shields.io/badge/Donate-PayPal-green.svg)

＃ioBroker Synology适配器
=================

##说明
该驱动程序使您可以接收数据并管理Synology NAS服务器。

您可以通过设置sendMethod对象来发送任何命令（方法），例如：获取SurveillanceStation信息是一个没有附加参数的getInfo方法。

```{"method": "getInfo", "params": {}}```

## Описание
Synology上的ДрайверпозволяетполучатьданныеиуправлятьвашимNAS。

Можноотправитьлюбуюкоманду（метод）установивзначениеобьекта```sendMethod```，

```{"method":"getInfo", "params":{}}```

## Changelog

### 0.1.0
* (instalator) 

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial