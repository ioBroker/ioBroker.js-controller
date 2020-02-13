---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wiffi-wz/README.md
title: без заголовка
hash: NGgm7DK6E9ncrgi/aCWgVT5ULGjWqESD0iJ9uLBcDEw=
---
![логотип](../../../en/adapterref/iobroker.wiffi-wz/admin/wiffi-wz.png) адаптер ioBroker для Wiffi-wz, Weatherman, Wiffi-pump, Pulsecounter, Rainyman и, возможно, других

![Количество установок](http://iobroker.live/badges/wiffi-wz-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.wiffi-wz.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wiffi-wz.svg)
![NPM](https://nodei.co/npm/iobroker.wiffi-wz.png?downloads=true)
![Статус сборки](https://travis-ci.org/t4qjXH8N/ioBroker.wiffi-wz.svg?branch=master)

=================

Это [ioBroker] (https://github.com/ioBroker/ioBroker) Адаптер для извлечения данных датчиков с устройств Wiffi см. [Stall.biz](http://www.stall.biz) для получения дополнительной информации.

Типичными примерами устройств от Stall.biz являются [Wiffi-wz] (http://www.stall.biz/project/der-wiffi-wz-2-0-der-wohnzimmersensor), [Метеоролог] (https://www.stall.biz/project/weatherman -die-perfekte-wetterstation-fuer-die-hausautomation) и [Rainyman](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr). Несколько Wiffis поддерживаются одновременно.

Из-за очень низкой задержки адаптера (обычно <3 с) можно использовать ИК-датчики движения для запуска действия, такого как включение или выключение света.

Далее некоторые устройства от Stall.biz описаны более подробно: Wiffi-wz - это устройство, которое объединяет восемь датчиков в одном устройстве. В настоящее время доступны следующие датчики:

- два ортогонально выровненных ИК-датчика движения
- датчик температуры (может быть [DHT22] (https://www.sparkfun.com/datasheets/Sensors/Tempera/DHT22.pdf) или [BME280] (https://ae-bst.resource.bosch.com/ медиа / _tech / медиа / радиокомпоненты / БСТ-BME280_DS001-11.pdf))
- датчик влажности воздуха (может быть [DHT22] (https://www.sparkfun.com/datasheets/Sensors/Tempera/DHT22.pdf) или [BME280] (https://ae-bst.resource.bosch.com /media/_tech/media/datasheets/BST-BME280_DS001-11.pdf))
- атмосферное давление (может быть [BMP180] (https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf), [BMP280] (https://ae-bst.resource.bosch .com / media / _tech / media / datasheets / BST-BMP280-DS001-12.pdf) или [BME280] (https://ae-bst.resource.bosch.com/media/_tech/media/datasheets/BST- BME280_DS001-11.pdf))
- датчик шума с регулируемой чувствительностью
- люксметр ([BH1750] (http://rohmfs.rohm.com/en/products/databook/datasheet/ic/sensor/light/bh1750fvi-e.pdf))
- датчик качества воздуха ([MQ135] (https://www.olimex.com/Products/Components/Sensors/SNS-MQ135/resources/SNS-MQ135.pdf))
- бипер

Метеоролог может быть оснащен множеством датчиков, подробнее см. [домашняя страница](https://www.stall.biz/project/weatherman-die-perfekte-wetterstation-fuer-die-hausautomation).

Rainyman - это несколько упрощенная версия Weatherman, подробнее см. [домашняя страница](https://www.stall.biz/project/rainyman-der-perfekte-sensor-fuer-regen-sonne-klima-bodenfeuchte-und-mehr).

## Как это устроено
Обычно Wiffi-wz отправляет данные датчиков в Homematic CCU. Homematic CCU получает homematic script (или лучше JSON) через порт 8181. Страница администратора этого адаптера реконфигурирует Wiffi-wz для отправки данных датчика непосредственно в ioBroker. Данные датчика кодируются в формате [JSON](https://en.wikipedia.org/wiki/JSON). Поэтому на компьютере ioBroker открыт локальный сокет на порту 8181. Обратите внимание, что сокет **не должен** быть доступным для Интернета из соображений безопасности.

## Настроить
1. Установите ioBroker в качестве получателя для данных датчика, получая URL

    http:// [IP-адрес wiffi] /? ccu: [IP-адрес io-брокера]:

2. и установите порт на 8181 с помощью

    http:// [wiffi ip] /? param: 12: 8181

3. Скажите wiffi-wz, что он должен отправлять данные в формате JSON без заголовка HTML (обратите внимание, что метеоролог может использовать другой номер параметра)

http:// [wifi ip] /? param: 27: 1

Если возникает какая-либо ошибка, установите уровень логики адаптера для отладки и отправьте мне телеграмму с данными по электронной почте.

## Пожертвование
Если этот проект помог вам сократить время разработки, вы можете дать мне чашку кофе или бутылку пива через PayPal (chvorholt@gmail.com) :-)

## Changelog
#### 2.2.0 (08-Feb-2020)
- compact mode successfully tested

#### 2.1.5 (08-Feb-2020)
- fixed an error with numeric state names

#### 2.1.4 (29-Aug-2019)
- fixed "could not create a state null" error

#### 2.1.3 (27-Jun-2019)
- compatibility for boolean values and old Wiffi versions

#### 2.1.2 (21-Jun-2019)
- changed behaviour: if states are missing in the datagram, but present in the database, they are not removed from the database
- boolean and numeric values are correctly stored

#### 2.1.0 (14-Apr-2019)
- support for compact mode

#### 2.0.1 (08-Jan-2019)
- fixed "could not find ip" bug

#### 2.0.0 (03-Oct-2018)
- wiffi type does not need to be specified in the config anymore
- states are created and deleted by examining the received datagram
- some minor changes concerning the logging
- the buzzer of the wiffi can be activated (it may work for other actors as well, but it is untested at the moment)

#### 1.3.1 (01-Sep-2018)
- fixed npm installation problems

#### 1.3.0 (31-Aug-2018)
- support for Wiffi-pump

#### 1.2.6 (31-Aug-2018)
- fixed "adapter already running error"

#### 1.2.5 (31-Aug-2018)
- solved error when the adapter shuts down

#### 1.2.4 (16-Aug-2018)
- hotfix for wiffi-wz

#### 1.2.3 (15-Aug-2018)
- necessary modifications for publishing the adapter (fixing package.json, etc ...)

#### 1.2.2 (14-Aug-2018)
- necessary modifications for publishing the adapter (fixing roles, etc ...)

#### 1.2.1 (14-Aug-2018)
- fixed datagram evaluation

#### 1.2.0 (10-Aug-2018)
- added support for Rainyman (many thanks to Strobelix from [ioBroker forum](https://forum.iobroker.net) for testing)

#### 1.1.0 (26-Jul-2018)
- added support for Weatherman (many thanks to smartboart from [ioBroker forum](https://forum.iobroker.net) for testing)

#### 1.0.0 (17-Jul-2018)
- added support for Admin3

#### 0.3.3 (13-Dec-2017)
- corrected typos
- cleaner code

#### 0.3.2 (13-Dec-2017)
- added license file

#### 0.3.1 (10-Dec-2017)
- support for wiffi-wz, WEATHERMAN, and Rainymans, firmware should be greater or equal to _83
- some bugfixes

#### 0.2.1 (5-Dec-2017)
Bugfixes:
- JSON format sent by the Wiffi had been changed since Wiffi firmware wiffi_software_53. JSON data interpretation fixed.

#### 0.2.0 (10-Feb-2017)
Features:
- Added support for multiple Wiffis.

Changes:
- Removed expert functions from the admin interface.

#### 0.1.0 (12-Jan-2017)
Features:
- Mandatory settings can be done on the admin page.
- The wiffi-wz can be configured from the admin page (there are some problems, see known issues of this release).

#### 0.0.1 (12-Jan-2017)
Features:
- The sensor data is send to the ioBroker and saved as corresponding states.

## License
The MIT License (MIT)

Copyright (c) 2014-2019 Christian Vorholt <chvorholt@gmail.com>

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