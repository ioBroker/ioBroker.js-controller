![Logo](admin/mclighting.png)
# ioBroker McLighting adapter
=================

![Number of Installations](http://iobroker.live/badges/mclighting-installed.svg) ![Number of Installations](http://iobroker.live/badges/mclighting-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.mclighting.svg)](https://www.npmjs.com/package/iobroker.mclighting)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mclighting.svg)](https://www.npmjs.com/package/iobroker.mclighting)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.mclighting/master.svg)](https://travis-ci.org/instalator/ioBroker.mclighting)

[![NPM](https://nodei.co/npm/iobroker.mclighting.png?downloads=true)](https://nodei.co/npm/iobroker.mclighting/)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PFUALWTR2CTPY)

## Описание
Драйвер позволяет управлять RGB лентой на светодиодах WS2811/WS2812 подключенной к ESP8266 с прошивкой [McLighting](https://github.com/toblum/McLighting)

Если вы хотите использовать RGBW-светодиоды (например, SK6812), подключенные к ESP8266, вам нужна вот эта доработанная прошивка: [McLightingRGBW](https://github.com/FabLab-Luenen/McLighting) и в настройках драйвера выбрать RGBW.

## Description
The driver allows you to control the RGB strip on the LEDs WS2811/WS2812 connected to the ESP8266 with firmware [McLighting](https://github.com/toblum/McLighting)

If you want to use RGBW Leds (like SK6812) connected to the ESP8266, you should just this fork: [McLightingRGBW](https://github.com/FabLab-Luenen/McLighting) and select in the adapter config *RGBW*.

## Using

### brightness
Set brightness.

Where <brightness> is the brightness as value 0-255.
### speed
 Set speed.
 
 Where <speed> is the speed from 0 to 255.
### mode
 Set mode.
 
 Where <lightmode> is one of the following:
 
- off (Turn all LEDs off.)
- all (Turn all LEDs on in the given or previously set color.)
- wipe (Turn all LEDs on in the given or previously set color, with wipe effect.)
- rainbow (Starts rainbow effect.)
- rainbowCycle (Starts rainbow cycle effect.)
- theaterchase (Starts theaterchase effect in the given or previously set color.)
- theaterchaseRainbow (Starts theaterchase effect with changing colors.)
- tv (Starts TV simulator.)
### array_RGB(W)
 Light multiple LEDs in the given colors.
 ```
 +[numled][hexrgb(w)]+[numled][hexrgb(w)]+[numled][hexrgb(w)] [...] or 
 [numled][hexrgb(w)],[numled][hexrgb(w)],[numled][hexrgb(w)],[...] 
 ```
 Where <numled> is the number of the led (starting with 00), e.g. 01.
 
 Where <hexrgb> is the color as HEX, e.g. 04d2ff.
 
 Example: +09ffffff+19ff0000 OR 09ffffff,19ff0000
### color
 Set default color of the lamp.
 
 Where <r,g,b(,w)> is the color as number (0 - 255), e.g. 32,3,200(, 255)
 
 If active mode 0 (Static) - Set default color of the lamp and light all LEDs in that color.
### color_R, color_G, color_B(, color_W)
 Set default color of the lamp.
 
 Where <r(g)(b)(w)> is the color as number (0 - 255), e.g. 154
 
 If active mode 0 (Static) - Set default color of the lamp and light all LEDs in that color.
### color_RGB(W)
 Set default color of the lamp.
 
 Where <hexrgb(w)> is the color as HEX, e.g. 04d2ff
 
 If active mode 0 (Static) - Set default color of the lamp and light all LEDs in that color.
### list_modes
 List of avilable animation modes as array.
 Result:
 ```
[
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
]
 ```
### range_RGB(W)
 Light multiple LED ranges in the given colors.
 ```
 R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)] [...] or
 [rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[...] 
 ```
 Where <rangestart_led> is the start number of the range (numbers starting with 00), e.g. 00. 
 
 Where <rangeend_led> is the end number of the range (numbers starting with 00), e.g. 09.
 
 Where <hexrgb(w)> is the color as HEX, e.g. 04d2ff.
 
 Can be repeated multiple times. 
 
 Example: R0009ffffffR1019ff0000 OR 0009ffffff,1019ff0000 lights the first 10 LEDs white and the next 10 red
### set_all_RGB(W)
 Set default color of the lamp and light all LEDs in that color.
 
 Where <hexrgb(w)> is the color as HEX, e.g. 04d2ff
### single_RGB(W)
 Light single LEDs in the given color.
 
 Where <numled> is the number of the led (starting with 00), e.g. 01.
 
 Where <hexrgb(w)> is the color as HEX, e.g. 04d2ff.
### fx_mode
 Set animation mode.
 
 Where <animation_mode_id> is on from the list_modes
### fx_mode_name
 Current name fx_mode
  
## Changelog

### 0.1.1
* (Bluefox) Fix clear timeouts

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
