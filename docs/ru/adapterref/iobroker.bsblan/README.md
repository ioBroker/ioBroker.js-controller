---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bsblan/README.md
title: ioBroker.bsblan
hash: xUD8t6FT0RVhgnVBFyFDHVTD1appxS4rdHEINifPNdY=
---
![логотип](../../../en/adapterref/iobroker.bsblan/admin/bsblan.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.bsblan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bsblan.svg)
![Статус зависимости](https://img.shields.io/david/hacki11/iobroker.bsblan.svg)
![Известные уязвимости](https://snyk.io/test/github/hacki11/ioBroker.bsblan/badge.svg)
![NPM](https://nodei.co/npm/iobroker.bsblan.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/hacki11/ioBroker.bsblan/master.svg)

# IoBroker.bsblan
## Bsb_lan адаптер для ioBroker
Этот адаптер соединяет [BSB_LAN интерфейс](https://github.com/fredlcore/bsb_lan) с ioBroker.
Интерфейс BSB_LAN переносит BSB (системную шину котла) в локальную сеть. Этот адаптер подключает его к ioBroker.

[BSB_LAN Interface Руководство пользователя](https://github.com/1coderookie/BSB-LPB-LAN)

## Поддерживаемые устройства
- BSB / LPB-совместимые устройства (например, Brötje, Elco, MHG, Fujitsu)
- подробности см .: [Поддерживаемые устройства] (https://github.com/1coderookie/BSB-LPB-LAN)

## Использование
- Интерфейс BSB_LAN запущен и работает
- Установите адаптер
- настроить
    - IP
    - Пользователь и пароль (если активирована базовая аутентификация)
    - Интервал опроса в секундах (минимум 10)
    - идентификаторы, которые должны быть опрошены или изменены (разделенные запятыми или символом новой строки, доступные идентификаторы см. В веб-интерфейсе BSB_LAN)

## Запись значений
- Активируйте все или конкретные идентификаторы как доступные для записи в
  * ru: [Только чтение или доступ для чтения / записи] (https://1coderookie.github.io/BSB-LPB-LAN_EN/chap05.html)
  * de: [Zugriff des Adapters auf den Regler] (https://1coderookie.github.io/BSB-LPB-LAN/kap05.html)
  * для всех: `bsb_lan_config.h: #define DEFAULT_FLAG 0`
  * скомпилировать и загрузить
- Добавьте идентификаторы, которые должны быть записаны в конфигурацию экземпляра адаптера (см. Раздел «Использование»).
- Типы Numbers, Enums и hr: min теперь доступны для записи (конечно, могут быть записаны только идентификаторы, доступные для записи)

## Кредиты
- Иконка сделана [Freepik] (https://www.freepik.com/home) с сайта www.flaticon.com

## Changelog
### 0.1.0
* Support write access

### 0.0.3
* dynamically create states
* IDs without whitespaces
* add textarea for configuration

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2020 hacki11 <jur.schmid@gmail.com>

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