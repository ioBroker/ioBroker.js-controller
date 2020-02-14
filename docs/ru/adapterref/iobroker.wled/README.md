---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: JlfMTIl0oYXy1Blq5/3T6Uz/DHavUfRYnn7wB2ZZ4/A=
---
![логотип](../../../en/adapterref/iobroker.wled/admin/wled_large.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.wled.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wled.svg)
![Количество установок (последняя)](http://iobroker.live/badges/wled-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/wled-stable.svg)
![Состояние зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.wled.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wled/badge.svg)
![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
## Wled адаптер для ioBroker
Быстрая и многофункциональная реализация веб-сервера ESP8266 / ESP32 для управления светодиодами NeoPixel (WS2812B, WS2811, SK6812, APA102)!

[WLED - Github Project](https://github.com/Aircoookie/WLED) @Aircoookie

## Инструкции
Адаптер автоматически пытается найти устройства WLED в вашей сети, используя службы Bonjour.
Известные проблемы: сети с разделением VLAN в основном не маршрутизируют широковещательный трафик, что означает сбой автоопределения. (см. To-Do)

1) Убедитесь, что ваше WLED-устройство работает и доступно по сети. 2) Установите адаптер. 3) Настройте время интервала для опроса данных и автоматического определения cyclus. 4) Запустите адаптер, устройства должны быть обнаружены автоматически. 5) Адаптер немедленно отправит изменения и опросы. данные каждые х секунд (настраивается)

## Сделать
* [] настраиваемые устройства (только автоматическое обнаружение с помощью Bonjour)
* [] Изучите лучший способ объявления об изменении пребывания, поддерживается текущая политика
* [x] специальные команды, не включенные в rest-api (например, сохранение настроек)
* [x] контрольные сегменты
* [x] изменения цвета

## Поддержите меня
Если вам нравится моя работа, пожалуйста, не стесняйтесь предоставить личное пожертвование (это личная ссылка на пожертвования для DutchmanNL, никакого отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog
### 0.1.4
- (DutchmanNL) Implement drop down menu for color pallets
- (DutchmanNL) New configuration page

### 0.1.2
- (DutchmanNL) Implement drop down menu for effects

### 0.1.1
* (DutchmanNL) Implemented states hidden from JSON-API : tt / psave / nn / time
* (DutchmanNL) Improve logging issue

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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