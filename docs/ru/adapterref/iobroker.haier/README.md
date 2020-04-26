---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.haier/README.md
title: ioBroker Haier адаптер для кондиционирования воздуха
hash: M8iBGPREQPppA0fQYd/nqXn6x5eOFKirnS4aUYnUO9E=
---
![логотип](../../../en/adapterref/iobroker.haier/admin/haier_admin.png)

![Количество установок](http://iobroker.live/badges/haier-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.haier.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.haier.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.haier/master.svg)
![NPM](https://nodei.co/npm/iobroker.haier.png?downloads=true)
![жертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker Адаптер кондиционера Haier
=================

Адаптер ioBroker Haier используется для управления кондиционером Haier через UART в сочетании с шлюзом TCP-Serial.
Работа проверена на кондиционере серии «Lightera».

## Аппаратное обеспечение
В качестве шлюза TCP-Serial я использую этот [код] (https://github.com/instalator/ESP8266.TelnetToSerial) и это [устройство](https://blog.instalator.ru/archives/433).

## С помощью
### Сила
Включение и выключение кондиционера. (Истина / ложь)

### Темп
Текущие показания комнатной температуры. (°C)

### Заданная температура
Установка температуры. (16-30 ° С)

### Режим
* **Авто** или **0** - Один ключ может дать вам уютную комнату! Блок кондиционирования воздуха может оценивать температуру и влажность в помещении и соответствующим образом производить регулировку.
* **прохладно** или **1** - холодильная комната.
* **обогрев** или **2** - обогрев помещения.
* **вентилятор** или **3** - только вентилятор.
* **сухой** или **4** - осушение воздуха.
* **off** или **5** - Выключите питание переменного тока.

### Скорость вентилятора
* **мин** или **2** - скорость вентилятора
* **середина** или **1** - скорость вентилятора
* **max** или **0** - скорость вентилятора
* **авто** или **3** - скорость вентилятора

### Свинг
* **ud** или **1** - Авто вверх / вниз.
* **lr** или **2** - Авто влево / вправо.
* **оба** или **3** - в обоих направлениях.
* **false** или **0** или **off** - Off.

### Здоровье
(истина / ложь) Генератор ионов воды в кондиционере может генерировать большое количество анионов, эффективно балансируя количество позиции и аниона в воздухе, а также убивать бактерии и ускорять образование пыли в комнате и, наконец, очищать воздух в комната.

### Lockremote
Блокировка ИК пульта (true / false)

### Компрессор
Если компрессор включен

### Свежий
(истина / ложь) Извлеките искаженный воздух из комнаты и вдохните свежий воздух.
(Эта функция недоступна на некоторых моделях.)

### Raw
Отправьте код RAW HEX без начальных байтов и пример контрольной суммы: питание включено - **0A000000000001014D02**

## Changelog

### 1.0.3
   (instalator) support admin3
   (instalator) support compact mode
   (instalator) change smart to auto
   (instalator) added role for state

### 1.0.2
   (instalator) fix error

### 1.0.1
   (instalator) fix error parse packets

### 1.0.0
   (instalator) Up to stable

### 0.1.1
   (instalator) fix reconnect error

### 0.1.0
   (instalator) beta version

### 0.0.4
  (instalator) change level log
  (instalator) fix send command
  (instalator) change for test file setup.js
  (instalator) fix error
  (instalator) added object for send raw code
  
### 0.0.3
  (instalator) alfa version adapter

### 0.0.1
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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