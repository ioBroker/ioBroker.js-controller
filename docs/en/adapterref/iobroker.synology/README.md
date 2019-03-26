![Logo](admin/synology.png)
# ioBroker Synology adapter
=================

![Number of Installations](http://iobroker.live/badges/synology-installed.svg) ![Number of Installations](http://iobroker.live/badges/synology-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.synology.svg)](https://www.npmjs.com/package/iobroker.synology)
[![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)](https://www.npmjs.com/package/iobroker.synology)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.synology/master.svg)](https://travis-ci.org/instalator/ioBroker.synology)

[![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)](https://nodei.co/npm/iobroker.synology/)

## Description
The driver allows you to receive data and manage your Synology NAS server.

You can send any command (method) by setting the sendMethod object, for example:
Get the SurveillanceStation info is a getInfo method with no additional parameters.

```{"method": "getInfo", "params": {}}```

## Описание
Драйвер позволяет получать данные и управлять вашим NAS сервером фирмы Synology.

Можно отправить любую команду(метод) установив значение обьекта ```sendMethod```, например:
Получить инфо SurveillanceStation это метод getInfo без дополнительных параметров.

```{"method":"getInfo", "params":{}}```

## Changelog

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial
