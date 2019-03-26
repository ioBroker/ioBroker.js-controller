---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: ojQGzLlL+5fNwArqwcLHZkA4o+ceZjJj1Q3RMIjIJ94=
---
![логотип](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![Статус сборки](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)
![Количество установок](http://iobroker.live/badges/lupusec-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

# IoBroker.lupusec =================
Требуется node.js 6.0 или выше и Admin v3!

Этот адаптер соединяет систему сигнализации Lupusec XT1 Plus, XT2, XT2 Plus и XT3 с ioBroker.
XT1 (без плюса) не будет поддерживаться. Вы можете прочитать состояние датчиков Lupusec, таких как датчики дверей, окон, воды, дыма и состояние системы охранной сигнализации.
Вы можете включить выключатели и поставить / снять охранную сигнализацию.

Вы можете найти подробную информацию здесь: [волчанка](https://www.lupus-electronics.de/en)

## Монтаж
1. Установите адаптер

Самый простой способ - настроить адаптер lupusec.iobroker через адаптер обнаружения в ioBroker. Адаптер обнаружения ищет правильный IP-адрес охранной системы Lupusec. Другой способ это настроить вручную

2. Ручная настройка адаптера

Выберите IP-адрес или имя хоста из системы сигнализации Lupusec. Выберите https (рекомендуется), если это возможно.
Только для чтения статуса выберите пользователя без прав записи. Если вы хотите изменить статус (например, включить / выключить свет или включить / выключить будильник), выберите пользователя с правом записи.

По умолчанию все устройства Lupusec будут отображаться на вкладке объекта ioBroker.
Полностью поддерживаемые и индивидуально адаптированные следующие устройства:

  - Дверной контакт / оконный контакт (Тип 4)
  - Датчик воды (Тип 5)
  - Детектор движения / детектор движения 360 градусов (Тип 9)
  - детектор дыма / детектор тепла (тип 14)
  - Индикатор состояния / мини крытая сирена (тип 22)
  - Выключатель питания (тип 24)
  - клавиатура (тип 37)
  - Метр выключателя питания (тип 49)
  - комнатный датчик V1 (тип 54)
  - диммер (тип 66)
  - Оттенок (Тип 74)
  - Рольставни, реле V1 (тип 76)
  - Датчик света (Тип 78)
  - Радиаторный термостат (Тип 79)

Поддерживаются два состояния apple_home_a1 и lupusec.0.status.apple_home_a2 для адаптера Apple Homekit. В дополнение к состояниям lupusec вы можете включить и выключить систему сигнализации для зон 1 и 2.

Если у вас есть устройство, которого нет в списке выше, свяжитесь со мной по адресу Thorsten Stueben <thorsten@stueben.de>.

## Changelog

### 1.0.0 (22.12.2018)
* (Stübi) Support js-controller compact mode   

### 0.4.1 (22.12.2018)
* (Stübi) Changed core adapter   

### 0.4.0 (07.12.2018)
* (Stübi) Add Light sensor (type 78)  

### 0.3.9 (26.11.2018)
* (Stübi) Add Apple home alarm status  

### 0.3.8 (13.11.2018)
* (Stübi) Add dimmer / relais (type 66)  

### 0.3.7 (12.11.2018)
* (Stübi) Bugfixing

### 0.3.6 (31.10.2018)
* (Stübi) Bugfixing and new status alarm_ex

### 0.3.5 (21.10.2018)
* (Stübi) Bugfixing and changing of the polling mechanism

### 0.3.4 (30.09.2018)
* (Stübi) password will be encrypted. Translation of configuration

### 0.3.2 (15.09.2018)
* (Stübi) add debug messages

### 0.3.1 (12.09.2018)
* (Stübi) Hue, room sensor, power switch added

### 0.2.7 (19.08.2018)
* (Stübi) Fixing error update function

### 0.2.6 (17.08.2018)
* (Stübi) Improvements and new add/del/update Object function

### 0.2.5 (10.08.2018)
* (Stübi) Changes of roles and icons added to devices

### 0.2.4 (16.07.2018)
* (Stübi) Wrong device description removed

### 0.2.3 (16.07.2018)
* (Stübi) RSSI Status an Device shutter (type 76) supported

### 0.2.2 (13.07.2018)
* (Stübi) Devices thermostat (type 79) and switch (type 48) supported

### 0.2.1 (08.06.2018)
* (Stübi) Directory widged deleted

### 0.2.0 (03.06.2018)
* (Stübi) Port can be added

## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten Stueben <thorsten@stueben.de>

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