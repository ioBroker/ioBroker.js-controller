---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.benq/README.md
title: без названия
hash: 2039cqFb9k988C4gt5gK+GzckJciWBfUOICU+P1JwsM=
---
![логотип](../../../en/adapterref/iobroker.benq/admin/benq-logo.png) ioBroker BenQ Адаптер проектора =================

![Количество установок](http://iobroker.live/badges/benq-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.benq.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.benq.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.benq/master.svg)
![NPM](https://nodei.co/npm/iobroker.benq.png?downloads=true)

Адаптер IoBroker BenQ Projector используется для управления проектором BenQ через RS232 в сочетании с шлюзом Etnernet.
Список моделей и команд содержится в файле `admin/commands.json`.

## Аппаратное обеспечение
Драйвер позволяет подключаться к проекторам BenQ через [адаптер](http://blog.instalator.ru/archives/744) RS232 для Ethernet.

В качестве шлюза RS232 для Ethernet используется любая карта, совместимая с Arduino, в которую необходимо загрузить [этот код](https://github.com/stepansnigirev/ArduinoSerialToEthernet).
Вам также понадобится Ethernet Shield W5100 или W5500 и преобразователь RS232 в TTL.

## Служба поддержки
Поддерживаемые модели: W1200, W1070, W1080, чтобы быть ...