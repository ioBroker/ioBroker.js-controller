---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.myvbus/README.md
title: ioBroker.myvbus
hash: 2TFJDIah+2/TCuImfk5d2OXZ35YZOL4+i+UkQdt7LGw=
---
# IoBroker.myvbus
![логотип](../../../en/adapterref/iobroker.myvbus/admin/myvbus.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.myvbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.myvbus.svg)
![Количество установок (последняя)](http://iobroker.live/badges/myvbus-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/myvbus-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.myvbus.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.myvbus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.myvbus.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.myvbus/master.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.myvbus.svg)

## Адаптер ioBroker для Resol VBus
Этот адаптер соединяет ioBroker с различными устройствами на базе VBus с использованием resol-vbus, библиотеки JavaScript для сбора данных RESOL VBus, предоставленной Дэниелом Випперманом.

<Https://github.com/danielwippermann/resol-vbus>

<Https://www.npmjs.com/package/resol-vbus>

## Особенности
* Позволяет считывать данные измерений с различных устройств RESOL (R) VBus (R) - предпочтительно солнечных и системных контроллеров серии DeltaSol (R), включая встроенные счетчики тепла (HQM) - с использованием регистраторов данных DL3 или DL2, KM2 коммуникационные модули, адаптеры интерфейса VBus / LAN или последовательные / локальные шлюзы локально через TCP / IP.
* Доступ к устройству с использованием адаптера последовательного интерфейса VBus / USB или через VBus.net (R) с использованием DLx / KMx также поддерживается.
* Обрабатывает живые потоки данных VBus и делает их доступными как состояния ioBroker.
* Значения обновляются с настраиваемым временем цикла.
* Чтение или настройка параметров конфигурации устройства VBus не поддерживается. Для этого следует использовать инструменты, предоставляемые Resol, например, через VBus.net или инструмент параметризации RPT.
* Считывание канала 0 DL3 (датчики, напрямую подключенные к устройству DL3) не поддерживается из-за ограничений интерфейса DL3.

## Советы по настройке
* Значением по умолчанию для типа подключения является VBus / LAN, но оно должно быть явно выбрано даже для VBus / LAN, в противном случае соединение не будет установлено.
* Правильные настройки прямого доступа к локальной сети для VBus / LAN, DL3, DL2, KM2:
  * Тип подключения: VBus / LAN или KM2 или DL2 или DL3
  * Идентификатор соединения: IP-адрес или FullyQualifiedHostName (например, host1.example.com)
  * Пароль VBus: YourVBusPassword (по умолчанию: vbus)
  * Порт подключения: настройка по умолчанию 7053 не должна изменяться
  * Канал DL3: относится только к DL3 (значения 1-6, канал 0 не может быть считан)
  * Интервал обновления: время между обновлениями записанных значений (по умолчанию 30 с)
* Правильные настройки для доступа DL3, DL2, KM2 через VBus.net:
  * Тип подключения: DL3 или DL2 или KM2
  * Идентификатор соединения: vbus.net (или vbus.io) - оба без http:// и через идентификатор!
  * Порт подключения: настройка по умолчанию 7053 не должна изменяться
  * Пароль VBus: YourVBusPassword (по умолчанию: vbus)
  * Канал DL3: относится только к DL3 (значения: 1-6, канал 0 не может быть считан)
  * Через идентификатор: d1234567890 - без http:// before или .vbus.io позади
  * Интервал обновления: время между обновлением записанных значений (по умолчанию 30 с)

## Юридические уведомления
RESOL, VBus, VBus.net, DeltaSol и другие являются товарными знаками или зарегистрированными товарными знаками RESOL - Elektronische Regelungen GmbH <https://www.resol.de/en>

Все остальные торговые марки являются собственностью их соответствующих владельцев.

## Changelog

### 0.0.5

* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### 0.0.4

* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### 0.0.3

* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### 0.0.2

* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### 0.0.1

* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## License

MIT License

Copyright (c) 2020 Jens-Peter Jensen <jjensen@t-online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.