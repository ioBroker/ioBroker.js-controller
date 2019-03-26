---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ble/README.md
title: без названия
hash: 4vQHd3G4dwAlUJciwxQ+mp2OoH9lKg2AqKIfOU4E+zY=
---
![Статус сборки](https://travis-ci.org/AlCalzone/ioBroker.ble.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AlCalzone/ioBroker.ble?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/ble-stable.svg)

<img src="admin/ble.png" height="48" /> ioBroker.ble =================

================

Мониторинг маяков Bluetooth с низким энергопотреблением (BLE) и запись их информации.
В настоящее время поддерживается только запись *рекламируемых* данных сервиса. Вы можете отслеживать, какие услуги рекламируются с помощью приложения nRF Connect (UUID данных службы).
Подключение и чтение / запись сервисных характеристик будут поддерживаться в следующей версии.

## Монтаж
На Raspberry Pi и аналогичных программах это должно быть сделано: `sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev libcap2-bin`

Если адаптер запускается, но не подключается к вашему оборудованию Bluetooth, проверьте состояние `info.driverState` в ioBroker. Если это `unauthorized`, вам необходимо предоставить `node` дополнительные разрешения. Для Linux это так же просто, как

```bash
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
```

который требует установки `libcap2-bin`.

## Конфигурация
Если в вашей системе есть несколько устройств Bluetooth, выберите одно из них в раскрывающемся списке.
В текстовом поле ниже введите все идентификаторы UUID рекламируемых сервисов, которые вы хотите записать (как указано в приложении nRF Connect).

## Система плагинов
Адаптер поддерживает расширение через плагины. Они определяют, какие рекламируемые услуги следует слушать и как переводить данные. Структура плагина определена в https://github.com/AlCalzone/ioBroker.ble/blob/master/src/plugins/plugin.ts, а пример рабочего плагина определен здесь https://github.com/AlCalzone /ioBroker.ble/blob/master/src/plugins/_default.ts

Если у вас есть какое-либо устройство, передающее специально закодированную информацию с помощью рекламы, не стесняйтесь создать PR с новым плагином для этого.

### Поддерживаемые плагины
* `" xiaomi "`: все датчики bluetooth xiaomi, включая
  * [Датчик для ухода за цветами] (https://xiaomi-mi.com/sockets-and-sensors/xiaomi-huahuacaocao-flower-care-smart-monitor/)
  * [Датчик температуры и влажности Mijia] (https://www.banggood.com/Xiaomi-Mijia-Bluetooth-Thermometer-Hygrometer-with-LCD-Screen-Magnetic-Suction-Wall-Stickers-p-1232396.html?cur_warehouse = США)
* `" mi-flora "`: оригинальный плагин для датчика по уходу за цветами, теперь псевдоним "xiaomi" `
* `" ruuvi-tag "`: [мультисенсор Ruuvi] (https://tag.ruuvi.com/) с версиями прошивки v1 и v2. **Не проверено, пожалуйста, оставьте отзыв!**

## Changelog

### 0.7.0 (2019-02-05)
* (AlCalzone) Support MaterializeCSS (Admin v3)
* (AlCalzone) Support compact mode
* (AlCalzone) Use @iobroker/testing for tests

### 0.6.0 (2018-12-23)
* (AlCalzone) Add NodeJS 10 support
* (AlCalzone) Add an option to disallow new devices

### 0.5.5 (2018-11-29)
* (AlCalzone) Bugfix: Preserving object properties works again

### 0.5.3 (2018-11-23)
* (AlCalzone) Cache objects for a short while instead of retrieving them from ioBroker all the time
* (AlCalzone) Support negative temperatures from Xiaomi devices

### 0.5.2 (2018-03-28)
* (AlCalzone) Fixed `isHandling` for the `ruuvi-tag` plugin

### 0.5.1 (2018-03-28)
* (AlCalzone) Restored accidentally deleted `mi-flora` plugin.

### 0.5.0 (2018-03-27)
* (JonasR & AlCalzone) Added support for the Ruuvi Tag with the `ruuvi-tag` plugin

### 0.4.2 (2018-03-27)
* (AlCalzone) Fixed the parsing of temperature+humidity packets from the Xiaomi temperature sensor

### 0.4.1 (2018-03-24)
* (AlCalzone) Forgot to load legacy `mi-flora` plugin
* (AlCalzone) Fixed an error when a plugin defines no objects

### 0.4.0 (2018-03-24)
* (zuvielx9 & AlCalzone) Support for all Xiaomi bluetooth sensors using the `xiaomi` plugin
* (AlCalzone) reworked plugin system slightly

### 0.3.5 (2018-03-18)
* (AlCalzone) Bugfix: Next attempt at preserving object properties like history and name

### 0.3.4 (2018-01-01)
* (AlCalzone) Bugfix: Keep `history` settings by not overriding existing objects
* (AlCalzone) Bugfix: When plugins return `undefined`, ignore the packet

### 0.3.3 (2017-11-24)
* (AlCalzone) Enable logging of RSSI

### 0.3.2 (2017-09-27)
* (AlCalzone) Add * wildcard for "all services"

### 0.3.1 (2017-09-27)
* (AlCalzone) Bugfix: don't throw error when RSSI state doens't exist

### 0.3.0 (2017-09-27)
* (AlCalzone) Support throttling of RSSI updates

### 0.2.2 (2017-09-27)
* (AlCalzone) Bugfix: Only monitor services from _enabled_ plugins

### 0.2.1 (2017-09-27)
* (AlCalzone) Bugfix: last patch broke the service filtering

### 0.2.0 (2017-09-26)
* (AlCalzone) Modularized the adapter code into a plugin system
* (AlCalzone) Added Mi-Flora plugin

### 0.1.0 (2017-09-06)
* (AlCalzone) Support selection of bluetooth devices

### 0.0.2 (2017-09-06)
* (AlCalzone) Store more information, improved object structure.

### 0.0.1
* (AlCalzone) initial release

## License
The MIT License (MIT)

Copyright (c) 2017 AlCalzone <d.griesel@gmx.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.