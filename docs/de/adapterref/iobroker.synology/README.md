---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.synology/README.md
title: ioBroker-Synology-Adapter
hash: PK2eYNCL25EcHkB6W/f0u9arLX1+0iCe8IE0jXXXhCY=
---
![Logo](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Anzahl der Installationen](http://iobroker.live/badges/synology-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.synology.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.synology.svg)
![Tests](http://img.shields.io/travis/instalator/ioBroker.synology/master.svg)
![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)

# IoBroker Synology-Adapter ===================
## Beschreibung
Mit dem Treiber können Sie Daten empfangen und Ihren Synology NAS-Server verwalten.

Sie können einen beliebigen Befehl (eine Methode) senden, indem Sie beispielsweise das sendMethod -Objekt festlegen: Abrufen der SurveillanceStation-Informationen ist eine getInfo-Methode ohne zusätzliche Parameter.

```{"method": "getInfo", "params": {}}```

## Описание
Weitere Informationen finden Sie unter Synology.

Зассонный метоновив значение обьекта

```{"method":"getInfo", "params":{}}```

## Changelog

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial