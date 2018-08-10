![Logo](media/mclighting.png)
# ioBroker McLighting adapter
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.mclighting.svg)](https://www.npmjs.com/package/iobroker.mclighting)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mclighting.svg)](https://www.npmjs.com/package/iobroker.mclighting)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.mclighting/master.svg)](https://travis-ci.org/instalator/ioBroker.mclighting)

[![NPM](https://nodei.co/npm/iobroker.mclighting.png?downloads=true)](https://nodei.co/npm/iobroker.mclighting/)

## Описание
Драйвер позволяет управлять RGB лентой на светодиодах WS2811/WS2812 подключенной к ESP8266 с прошивкой [McLighting](https://github.com/toblum/McLighting)

## Description
The driver allows you to control the RGB strip on the LEDs WS2811/WS2812 connected to the ESP8266 with firmware [McLighting](https://github.com/toblum/McLighting)

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
### array_RGB
 Light multiple LEDs in the given colors.
 ```
 +[numled][hexrgb]+[numled][hexrgb]+[numled][hexrgb] [...] or 
 [numled][hexrgb],[numled][hexrgb],[numled][hexrgb],[...] 
 ```
 Where <numled> is the number of the led (starting with 00), e.g. 01.
 
 Where <hexrgb> is the color as HEX, e.g. 04d2ff.
 
 Example: +09ffffff+19ff0000 OR 09ffffff,19ff0000
### color
 Set default color of the lamp.
 
 Where <r,g,b> is the color as number (0 - 255), e.g. 32,3,200
 
 If active mode 0 (Static) - Set default color of the lamp and light all LEDs in that color.
### color_R, color_G, color_B
 Set default color of the lamp.
 
 Where <r(g)(b)> is the color as number (0 - 255), e.g. 154
 
 If active mode 0 (Static) - Set default color of the lamp and light all LEDs in that color.
### color_RGB
 Set default color of the lamp.
 
 Where <hexrgb> is the color as HEX, e.g. 04d2ff
 
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
### rang_RGB
 Light multiple LED ranges in the given colors.
 ```
 R[rangstart_led][rangend_led][hexrgb]R[rangstart_led][rangend_led][hexrgb]R[rangstart_led][rangend_led][hexrgb] [...] or
 [rangstart_led][rangend_led][hexrgb],[rangstart_led][rangend_led][hexrgb],[rangstart_led][rangend_led][hexrgb],[...] 
 ```
 Where <rangstart_led> is the start number of the range (numbers starting with 00), e.g. 00. 
 
 Where <rangend_led> is the end number of the range (numbers starting with 00), e.g. 09.
 
 Where <hexrgb> is the color as HEX, e.g. 04d2ff.
 
 Can be repeated multiple times. 
 
 Example: R0009ffffffR1019ff0000 OR 0009ffffff,1019ff0000 lights the first 10 LEDs white and the next 10 red
### set_all_RGB
 Set default color of the lamp and light all LEDs in that color.
 
 Where <hexrgb> is the color as HEX, e.g. 04d2ff
### single_RGB
 Light single LEDs in the given color.
 
 Where <numled> is the number of the led (starting with 00), e.g. 01.
 
 Where <hexrgb> is the color as HEX, e.g. 04d2ff.
### fx_mode
 Set animation mode.
 
 Where <animation_mode_id> is on from the list_modes
### fx_mode_name
 Current name fx_mode
  
## Changelog

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
