---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.deconz/README.md
title: без названия
hash: Lpc1lMo8cEXyj/BIE9Etwj8yvOpKApVD2rVcdx5k0VI=
---
![логотип](../../../en/adapterref/iobroker.deconz/admin/deconz.png)

![Количество установок](http://iobroker.live/badges/deconz-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.deconz.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.deconz.svg)
![NPM](https://nodei.co/npm/iobroker.deconz.png?downloads=true)

ioBroker deConz Дрезден-Электроник Адаптер

==============

## Уведомление
Нет поддержки бета-версий deConz

Требуемая версия js-контроллера> 2.x.x, Требуемый node.js> = 10.x.x

## Английский
Подключается к программному обеспечению deConz, разработанному dresden-elektronik. Это программное обеспечение призвано стать универсальным решением ZigBee Gateway с использованием аппаратного обеспечения от dresden-elektronik, USB-накопителя ConBee и RaspBee, модуля для Raspberry Pi.

### Настроить
1. Прочтите документацию deConz / Phoscon, посмотрите раздел [links] (https://github.com/iobroker-community-adapters/ioBroker.deconz#links).
2. Запустите адаптер
3. * Введите IP-адрес для deConz
    * Введите номер порта, стандарт 80.
    * IP и порт будут сохранены автоматически
  * **Альтернатива:** Закройте конфигурацию и откройте снова.

    Если deConz был найден IP и порт отображается сейчас.

4. Нажмите «Создать ключ API»
5. * Введите имя пользователя (Standard is delight)
    * Введите пароль (устанавливается при первом входе в Phoscon APP)
  * **Альтернатива:** Откройте приложение Phoscon -> Меню -> Настройки -> Шлюз -> Дополнительно -> Разблокировать шлюз

## Немецкий
Verbinde Mit der Von Dresden-Elektronik Entwickelten DeConz-Software. Программное обеспечение Diese от компании ZigBee Gateway-Lösung Sein, Die Die Hardware Аппаратное обеспечение от USB-флешки ConBee и RaspBee, Ein Modul fur den Raspberry Pi, verwendet.

### Айнрихтен
1. Документация от deConz / Phoscon lesen, Quellen siehe [Links] (https://github.com/iobroker-community-adapters/ioBroker.deconz#links).
2. Адаптер запускается
3. * IP адрес от deConz und
    * Порт eingeben, стандартный порт 80
    * IP и Port Wird Automatisch Gespeichert
  * **Alterantiv:** Adpterkonfiguration schließen und erneut öffnen.

    Wurde deConz Gefunden Steht Jetzt IP и Port Schon в дер Маске.

4. "Erstelle API Key" Klicken
5. * Buntzername (стандартный восторг) и
    * Passwort (вирд бейм эрстен Anmelden в дер Фоскон APP Vergeben) Eingeben
   * **Alterantiv:** Phoscon APP öffnen -> Меню -> Einstellungen -> Ворота -> Erweitert -> Auf "App verbinden" klicken

#### Отправлять более одной команды одновременно
Для этого есть объект под названием «действие».

Примеры:

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 65500`

## Ссылки
- [Фоскон APP] (https://phoscon.de/)
- [Поддерживаемые устройства] (https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices)
- [deConz] (https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/)
- [Плагин REST на Github] (https://github.com/dresden-elektronik/deconz-rest-plugin)
- [Шлюзы (оборудование)] (https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/)

## [Спонсоры](https://github.com/iobroker-community-adapters/ioBroker.deconz/blob/master/SPONSORS.MD)

## Changelog

### 2.0.1
* Bugfixes

### 2.0.0
* changed id naming from id to mac (uniqueid)
* possibility to rename devices

Full changelog history can be found in CHANGELOG.md

## License
Apache-2.0

Copyright (c) 2017-2020 Jey Cee jey-cee@live.com