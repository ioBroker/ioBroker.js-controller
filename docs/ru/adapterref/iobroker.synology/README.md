---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synology/README.md
title: ioBroker Synology адаптер
hash: PK2eYNCL25EcHkB6W/f0u9arLX1+0iCe8IE0jXXXhCY=
---
![логотип](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Количество установок](http://iobroker.live/badges/synology-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.synology.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synology.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.synology/master.svg)
![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)

# IoBroker Synology адаптер =================
## Описание
Драйвер позволяет получать данные и управлять сервером Synology NAS.

Вы можете отправить любую команду (метод), установив объект sendMethod, например: Получить информацию SurveillanceStation - метод getInfo без дополнительных параметров.

```{"method": "getInfo", "params": {}}```

## Описание
Драйвер позволяет получать данные и управлять вашим NAS-сервером фирмы Synology.

Можно отправить любую команду (метод) установить значение обьекта

```{"method":"getInfo", "params":{}}```

## Changelog

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial