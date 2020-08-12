---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.deconz/README.md
title: без названия
hash: oGadD+2MVq27J/o275XeRBcmFlhNU672SqfrxrhWpsE=
---
![логотип](../../../en/adapterref/iobroker.deconz/admin/deconz.png)

![Количество установок](http://iobroker.live/badges/deconz-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.deconz.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.deconz.svg)
![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)

ioBroker deConz dresden-elektronik Адаптер

==============

## Уведомление
Нет поддержки бета / предварительных версий deConz.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

Требуемая версия js-контроллера> 2.x.x, Требуемая версия node.js> = 10.x.x

## Английский
Подключается к программному обеспечению deConz, разработанному dresden-elektronik. Это программное обеспечение призвано стать универсальным решением ZigBee Gateway с использованием оборудования от dresden-elektronik, USB-накопителя ConBee и модуля RaspBee для Raspberry Pi.

### Настроить
1. Прочтите документацию deConz / Phoscon, посмотрите раздел [ссылки] (https://github.com/iobroker-community-adapters/ioBroker.deconz#links).
2. Пусковой адаптер
3. * Введите IP-адрес для deConz
    * Введите номер порта, стандартный - 80.
    * IP и порт будут сохранены автоматически
  * **Альтернатива:** Закройте конфигурацию и откройте снова.

    Если deConz был найден IP и порт отображается сейчас.

4. Нажмите «Создать ключ API».
5. * Введите имя пользователя (Стандартное удовольствие)
    * Введите пароль (устанавливается при первом входе в приложение Phoscon)
  * **Альтернатива:** Откройте приложение Phoscon -> Меню -> Настройки -> Шлюз -> Дополнительно -> Разблокировать шлюз

#### Отправить более одной команды одновременно
Для этого есть объект под названием «действие».

Примеры:

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

## Немецкий
Verbindet mit der von dresden-elektronik entwickelten deConz-Software. Diese Software Soll eine universelle ZigBee Gateway-Lösung sein, die die Hardware von dresden-elektronik, ConBee USB-Stick и RaspBee, ein Modul für den Raspberry Pi, verwendet.

### Эйнрихтен
1. Dokumentation von deConz / Phoscon lesen, Quellen siehe [Ссылки] (https://github.com/iobroker-community-adapters/ioBroker.deconz#links).
2. Запуск адаптера
3. * IP-адрес от deConz und
    * Порт eingeben, Стандартный порт ist 80
    * IP и порт wird Automatisch gespeichert
  * **Alterantiv:** Adpterkonfiguration schließen und erneut öffnen.

    Wurde deConz gefunden steht jetzt IP und Port schon in der Maske.

4. Кликен "Erstelle API Key"
5. * Buntzername (Стандартное удовольствие) и
    * Passwort (wird beim ersten Anmelden in der Phoscon APP vergeben) eingeben
   * **Alterantiv:** Phoscon APP öffnen -> Menü -> Einstellungen -> Gateway -> Erweitert -> Auf "App verbinden" klicken

#### Mehr als einen Befehl senden
Dafür gibt es das Objekt "действие".

Beispiele:

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

## Ссылки
- [Приложение Phoscon] (https://phoscon.de/)
- [Поддерживаемые устройства] (https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices)
- [deConz] (https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/)
- [Плагин REST на Github] (https://github.com/dresden-elektronik/deconz-rest-plugin)
- [Шлюзы (аппаратные)] (https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/)

## [Спонсоры](https://github.com/iobroker-community-adapters/ioBroker.deconz/blob/master/SPONSORS.MD)

## Changelog

### 2.0.3
* fix incoming rename event for sensors
* fix release_press is set to true at start
* added websocket port info to configuration
* added event types handling for websocket messages
* added backup, deConz update & firmware update states under Gateway_info
* added touchlink functions
* fix sensor handling for virtual devices (fsm and vpir)

### 2.0.2
* Bugfix

### 2.0.1
* Bugfixes

### 2.0.0
* changed id naming from id to mac (uniqueid)
* possibility to rename devices

Full changelog history can be found in CHANGELOG.md

## License
Apache-2.0

Copyright (c) 2017-2020 Jey Cee jey-cee@live.com