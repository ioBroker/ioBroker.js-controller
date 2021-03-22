---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: i0jIzhp5OlhVc4b6frxgJYvg1A4EbqdBspOSUAQwCHI=
---
![Логотип](../../../en/adapterref/iobroker.esphome/admin/esphome.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.esphome.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![Количество установок (последнее)](http://iobroker.live/badges/esphome-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/esphome-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

# IoBroker.esphome
** Тесты: ** ![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

## Адаптер ESPHome для ioBroker
Управляйте своим ESP8266 / ESP32 с помощью простых, но мощных файлов конфигурации, созданных и управляемых ESPHome.
Адаптер подключится к управляемому устройству ESPHome с помощью собственного API и обеспечит синхронизацию всех данных (обработка событий в реальном времени, без опроса данных! :)

Этот адаптер использует [esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) со всеми кредитами @Nafaya, спасибо!

## [Документация](https://DrozmotiX.github.io/languages/en/ESPHome/)
Всю нашу документацию по адаптерам можно найти в [Страница документации DrozmotiX](https://DrozmotiX.github.io).

## Предварительные требования
Вы должны знать, как использовать ESPHome и добавлять устройства / датчики в файл YAML.
Убедитесь, что API активирован, так как адаптер будет взаимодействовать с собственным API ESPHome. При необходимости вы можете указать пароль. [См. Ссылку на ESPHome API.](https://esphome.io/components/api.html?highlight=api)

```
api:
  password: 'MyPassword'
```

Пример конфигурации, дополнительные примеры см. В [Страница документации DrozmotiX] (https://DrozmotiX.github.io) или [ESPHome Documentation](https://esphome.io/index.html)

```
esphome:
  name: sensor_badkamer
  platform: ESP32
  board: esp-wrover-kit

wifi:
  use_address: 192.168.10.122
  ssid: "xxxxx"
  password: "xxxxxx"

# Enable ESPHome API
api:
    password: 'MyPassword'
# Activate i2c bus
i2c:
  sda: 21
  scl: 22
  scan: True
  id: bus_a

# Example configuration for bh1750
sensor:
  - platform: bh1750
    name: "Hal_Illuminance"
    address: 0x23
    measurement_time: 69
    update_interval: 10s

# Example configuration for an GPIO output
output:
  - platform: gpio
    pin: 12
    inverted: true
    id: gpio_12

# Example configuration linking a switch to the previous defined output
switch:
  - platform: output
    name: "Generic Output"
    output: 'gpio_12'

```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.1.5 (2021-03-21)
* (DutchmanNL) Add Translations

### 0.1.4 (2021-03-19)
* (DutchmanNL) Implemented RGBW
* (DutchmanNL) Ensure correct encryption and storage of passwords
* (DutchmanNL) Proper value ranges for type light (255 instead 100)
* (DutchmanNL) Implemented hex color state for type light (if RGB is available)

### 0.1.2 (2021-03-02)
* (DutchmanNL) Type Fan added
* (DutchmanNL) Type Light added
* (DutchmanNL) Error messages optimized
* (DutchmanNL) Device reconnect handling improved
* (DutchmanNL) [Breaking!] Change state name to default "state" for type BinarySensor / Climate / Sensor / TextSensor & Switch  
* (DutchmanNL) Autodiscovery improved, non-ESPHome devices excluded

### 0.1.0 (2021-02-27)
* (DutchmanNL) Autodiscovery implemented
* (DutchmanNL) Type Climat added
* (DutchmanNL) Type TextSensor added
* (DutchmanNL) Solved reconnection issues
* (DutchmanNL) Optimized error messages for unknown types
* (DutchmanNL & @xXBJXx) Adapter configuration page optimized

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda86@gmail.com>

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