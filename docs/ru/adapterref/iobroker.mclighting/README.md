---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mclighting/README.md
title: ioBroker McLighting адаптер
hash: +pUewii2TFoXNMHz/YwnT/oru4KU4iOxFCdIFwHsoXA=
---
![логотип](../../../en/adapterref/iobroker.mclighting/admin/mclighting.png)

![Количество установок](http://iobroker.live/badges/mclighting-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mclighting.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mclighting.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.mclighting/master.svg)
![NPM](https://nodei.co/npm/iobroker.mclighting.png?downloads=true)
![жертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker Адаптер McLighting
=================

## Описание
Драйвер позволяет управлять RGB-лентой на светодиодах WS2811 / WS2812, подключенной к ESP8266 с прошивкой [McLighting](https://github.com/toblum/McLighting)

Если вы хотите использовать RGBW-светодиоды (например, SK6812), подключенные к ESP8266, вам нужна вот эта доработанная прошивка: [McLightingRGBW](https://github.com/FabLab-Luenen/McLighting) и в настройках драйвера выберите RGBW.

## Описание
Драйвер позволяет управлять полосой RGB на светодиодах WS2811 / WS2812, подключенных к ESP8266 с прошивкой [McLighting](https://github.com/toblum/McLighting)

Если вы хотите использовать RGBW-светодиоды (например, SK6812), подключенные к ESP8266, вам нужно просто вот так: [McLightingRGBW](https://github.com/FabLab-Luenen/McLighting) и выбрать в конфигурации адаптера *RGBW*

## С помощью
### Яркость
Установите яркость.

Где <яркость> - это яркость как значение 0-255.

### Скорость Установите скорость.
 Где <скорость> - скорость от 0 до 255.

### Mode Установить режим.
 Где <lightmode> является одним из следующих:

- выключен (выключите все светодиоды.)
- все (Включите все светодиоды в заданном или ранее установленном цвете.)
- стирание (включите все светодиоды в заданном или ранее установленном цвете с эффектом стирания.)
- Радуга (Запускает эффект радуги.)
- rainbowCycle (Запускает эффект цикла радуги.)
- Theatrechase (Запускает эффект Theatrechase в заданном или ранее установленном цвете.)
- theaterchaseRainbow (Запускает эффект Theatrechase с изменением цвета.)
- телевизор (запускает ТВ симулятор.)

### Array_RGB (W)
 Зажгите несколько светодиодов заданными цветами.

```
+[numled][hexrgb(w)]+[numled][hexrgb(w)]+[numled][hexrgb(w)] [...] or
[numled][hexrgb(w)],[numled][hexrgb(w)],[numled][hexrgb(w)],[...]
```

 Где <numled> - номер светодиода (начиная с 00), например, 01.

 Где <hexrgb> - это цвет как HEX, например 04d2ff.

 Пример: + 09ffffff + 19ff0000 ИЛИ 09ffffff, 19ff0000

### Color Установить цвет лампы по умолчанию.
 Где <r, g, b (, w)> - это цвет в виде числа (0 - 255), например, 32,300 (, 255)

 Если активен режим 0 (статический) - установите цвет лампы по умолчанию и включите все светодиоды этого цвета.

### Color_R, color_G, color_B (, color_W) Установить цвет лампы по умолчанию.
 Где <r (g) (b) (w)> - это цвет в виде числа (0 - 255), например, 154

 Если активен режим 0 (статический) - установите цвет лампы по умолчанию и включите все светодиоды этого цвета.

### Color_RGB (W) Установить цвет лампы по умолчанию.
 Где <hexrgb (w)> - это цвет как HEX, например 04d2ff

 Если активен режим 0 (статический) - установите цвет лампы по умолчанию и включите все светодиоды этого цвета.

### list_modes Список доступных режимов анимации в виде массива.
Результат:
```

 {
   "mode": 0,
   "name": "Static"
 },
 {
   "mode": 1,
   "name": "Blink"
 },
 {
   "mode": 2,
   "name": "Breath"
 },
 ...

```

### Range_RGB (W)
 Подсветите несколько светодиодных диапазонов заданными цветами.

```
R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)] [...] or
[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[...]
```

 Где <rangestart_led> - начальный номер диапазона (числа, начинающиеся с 00), например, 00.

 Где <rangeend_led> - конечный номер диапазона (числа, начинающиеся с 00), например, 09.

 Где <hexrgb (w)> - это цвет как HEX, например 04d2ff.

 Можно повторить несколько раз.

 Пример: R0009ffffffR1019ff0000 ИЛИ 0009ffffff, 1019ff0000 загорает первые 10 светодиодов белым, а следующие 10 красным

### Set_all_RGB (W) Установить цвет лампы по умолчанию и зажечь все светодиоды этим цветом.
 Где <hexrgb (w)> - это цвет как HEX, например 04d2ff

### Single_RGB (W) Загораются одиночные светодиоды заданного цвета.
 Где <numled> - номер светодиода (начиная с 00), например, 01.

 Где <hexrgb (w)> - это цвет как HEX, например 04d2ff.

### Fx_mode Установить режим анимации.
 Где находится <animation_mode_id> из списка list_modes

### Fx_mode_name Текущее имя fx_mode

## Changelog

### 0.1.0
* (instalator) refactoring
* (instalator) added compact mode

### 0.0.12 (2018-12-09)
* (instalator) fix error

### 0.0.11 (2018-10-14)
* (Johannes Jaeger) Add support for RGBW Leds ([McLightingRGBW](https://github.com/FabLab-Luenen/McLighting))
* (Johannes Jaeger) Fix typo for state *rang_RGB* to *range_RGB* !

### 0.0.10 (2018-04-02)
* (instalator) fix error, added ping pong function for reconnect

### 0.0.4 (2018-03-27)
* (instalator) fix error

### 0.0.3 (2018-03-24)
* (instalator) fix error, change README

### 0.0.2 (2018-03-24)
* (instalator) Release version

### 0.0.1 (2018-03-24)
* (instalator) initial

## License

The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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