---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.noolite/README.md
title: kein Titel
hash: WMJzPgkdiDOENacR++TowYAl7sHLSQRUbdQrzi03X/k=
---
![Logo](../../../en/adapterref/iobroker.noolite/admin/noolite.png) ioBroker Noolite-Adapter ===================

![Anzahl der Installationen](http://iobroker.live/badges/noolite-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.noolite.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.noolite.svg)
![NPM](https://nodei.co/npm/iobroker.noolite.png?downloads=true)

Lässt die Noolite-Geräte vom ioBroker aus steuern.

*** Der Adapter benötigt mindestens nodejs 4.x ***

Eigentlich wird nur das Ethernet-Gateway PR1132 unterstützt.

## Englisch
[по русски](#Русский)

## Installieren
```node iobroker.js add noolite```

### Information
### Aufbau
### Häfen
-------------------

## Русский дтот драйвер позволяет управлять noolite устройствами через USB адаптер (РС1ххх) или через Ethernet-Drucker PR1132.
USB-Stick USB-Stick USB-Sticks für Windows Server-Geräte "nooLite control panel" "nooLite control panel" " Например:

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