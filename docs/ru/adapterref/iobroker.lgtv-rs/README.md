---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lgtv-rs/README.md
title: без названия
hash: aU2EFF00up1mJbFDbOSomkMGg90c+SxURGk6KC5dX3o=
---
![логотип](../../../en/adapterref/iobroker.lgtv-rs/admin/lg_admin.png) ioBroker LG TV RS232 адаптер =================

![Количество установок](http://iobroker.live/badges/lgtv-rs-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.lgtv-rs.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lgtv-rs.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.lgtv-rs/master.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv-rs.png?downloads=true)

IoBroker LG TV Адаптер RS232 используется для управления телевизором LG через RS232 в сочетании с шлюзом Etnernet.
Список моделей и команд содержится в файле `admin/commands.json`.

## Аппаратное обеспечение
Драйвер позволяет вам подключаться к телевизору LG через [адаптер](http://blog.instalator.ru/archives/744) RS232 к Ethernet.

В качестве шлюза RS232 для Ethernet используется любая карта, совместимая с Arduino, в которую необходимо загрузить [этот код](https://github.com/stepansnigirev/ArduinoSerialToEthernet).
Вам также понадобится Ethernet Shield W5100 или W5500 и преобразователь RS232 в TTL.

## Служба поддержки
Поддерживаемые модели: LD750 будет ...

### 0.0.4
  (установщик) исправить ошибку

### 0.0.3
  (установщик) альфа

### 0.0.1
  (установщик) начальный