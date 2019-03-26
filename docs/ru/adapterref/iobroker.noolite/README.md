---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.noolite/README.md
title: без названия
hash: WMJzPgkdiDOENacR++TowYAl7sHLSQRUbdQrzi03X/k=
---
![логотип](../../../en/adapterref/iobroker.noolite/admin/noolite.png) ioBroker Адаптер Noolite =================

![Количество установок](http://iobroker.live/badges/noolite-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.noolite.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.noolite.svg)
![NPM](https://nodei.co/npm/iobroker.noolite.png?downloads=true)

Позволяет управлять устройствами Noolite от ioBroker.

*** Адаптер требует как минимум nodejs 4.x ***

На самом деле поддерживается только Ethernet-шлюз PR1132.

## Английский
[по русски](#Русский)

## Установить
```node iobroker.js add noolite```

### Информация
### Конфигурация
### Порты
-------------------

## Русский Этот драйвер позволяет управлять noolite через USB-адаптер (RS1ххх) или через Ethernet-шлюз PR1132.
Для управления с помощью USB-адаптера под Windows необходимо установить программу "Панель управления nooLite" и прописать путь к файлу в настройках. Например:

```Windows exe: C:\Program Files (x86)\nooLite\noolite.exe```.

Под windows не нужно указывать TX USB Type т.к. коммуникация происходит через noolite.exe.

При использовании шлюза можно подключить до 4х различных датчиков температуры или влажности.

Приём команд на данный момент неработает, за неимением приёмного адаптера.

### Настройки


### Порты

## Changelog
### 0.2.0 (2016-04-30)
* (bluefox) USB adapter under windows
* (bluefox) RGB channel finished

### 0.0.1 (2016-03-11)
* (bluefox) initial commit