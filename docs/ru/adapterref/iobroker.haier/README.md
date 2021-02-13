---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.haier/README.md
title: ioBroker Haier адаптер для кондиционирования воздуха
hash: ROuNUa5/rOhtGEF6rozSiVNfEYVPA01f94d2z8ozq4U=
---
![Логотип](../../../en/adapterref/iobroker.haier/admin/haier_admin.png)

![Количество установок](http://iobroker.live/badges/haier-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.haier.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.haier.svg)
![NPM](https://nodei.co/npm/iobroker.haier.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker Адаптер для кондиционера Haier
=================

[![Тесты] (https://github.com/instalator/iobroker.haier/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.haier/actions/)

Адаптер ioBroker Haier используется для управления вашим кондиционером Haier через UART в сочетании с TCP to Serial Gateway.
Проверена работа на кондиционере серии «Лайттера».

## Аппаратное обеспечение
В качестве шлюза TCP-последовательный я использую этот [код] (https://github.com/instalator/ESP8266.TelnetToSerial) и это [устройство](https://blog.instalator.ru/archives/433).

## С помощью
### Мощность
Включение и выключение кондиционера. (правда / ложь)

### Темп
Текущие показания комнатной температуры (°C)

### Заданная температура
Установка температуры. (16-30 ° С)

### Режим
* **авто** или **0** - Один ключ может дать вам уютную комнату! Блок кондиционирования воздуха может определять температуру и влажность в помещении и вносить соответствующие корректировки.
* **круто** или **1** - Холодильная камера.
* **тепло** или **2** - Отопление помещения.
* **fan** или **3** - Только вентилятор.
* **сухой** или **4** - осушение воздуха.
* **выкл.** или **5** - отключение переменного тока.

### Скорость вентилятора
* **мин** или **2** - скорость вентилятора
* **mid** или **1** - скорость вентилятора
* **max** или **0** - скорость вентилятора
* **авто** или **3** - скорость вентилятора

### Качать
* **ud** или **1** - Авто вверх / вниз.
* **lr** или **2** - Авто влево / вправо.
* **both** или **3** - в обоих направлениях.
* **false** или **0** или **off** - выключено.

### Здоровье
(верно / неверно) Генератор водно-ионов в кондиционере может генерировать много анионов, эффективно балансируя количество положения и анионов в воздухе, а также убивая бактерии и ускоряя осаждение пыли в комнате и, наконец, очищая воздух в помещении. комната.

### Lockremote
Заблокировать ИК-пульт (правда / ложь)

### Компрессор
Если компрессор включен

### Свежий
(истина / ложь) Вытяните испорченный воздух из комнаты и вдохните свежий воздух.
(Эта функция недоступна на некоторых моделях.)

### Сырой
Отправить RAW HEX-код без начальных байтов и пример контрольной суммы: включение - **0A000000000001014D02**

## Changelog

### 1.0.4
   (instalator) change test

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

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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