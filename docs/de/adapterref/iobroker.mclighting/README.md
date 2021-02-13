---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mclighting/README.md
title: ioBroker McLighting Adapter
hash: dXdR0TFBVa8nzSi2OtTRjXFxpkRm6+/sy9Bi+JeHlWo=
---
![Logo](../../../en/adapterref/iobroker.mclighting/admin/mclighting.png)

![Anzahl der Installationen](http://iobroker.live/badges/mclighting-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mclighting.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mclighting.svg)
![NPM](https://nodei.co/npm/iobroker.mclighting.png?downloads=true)
![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker McLighting Adapter
=================

[![Tests] (https://github.com/instalator/iobroker.mclighting/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.mclighting/actions/)

## Описание
GBрайвер позволяет управлять RGB лентой на светодиодах WS2811 / WS2812 подключенной к ESP8266 с прошивкой §§LLL

Если вы хотите использовать RGBW-светодиоды (например, SK6812), подключенные к Esp8266, вам нужна вот эта доработанная прошивка: [McLightingRGBW](https://github.com/FabLab-Luenen/McLighting) и в настройках драйвера выбрать RGBW.

## Beschreibung
Mit dem Treiber können Sie den RGB-Streifen an den LEDs WS2811 / WS2812 steuern, die mit der Firmware [McLighting](https://github.com/toblum/McLighting) an den ESP8266 angeschlossen sind

Wenn Sie RGBW-LEDs (wie SK6812) verwenden möchten, die an den ESP8266 angeschlossen sind, sollten Sie nur diese Gabel verwenden: [McLightingRGBW](https://github.com/FabLab-Luenen/McLighting) und in der Adapterkonfiguration *RGBW* auswählen.

## Verwenden
### Helligkeit
Helligkeit einstellen.

Wobei <brightness> die Helligkeit als Wert 0-255 ist.

### Geschwindigkeit Geschwindigkeit einstellen.
 Wobei <Geschwindigkeit> die Geschwindigkeit von 0 bis 255 ist.

### Mode Modus einstellen.
 Wobei <Lichtmodus> einer der folgenden ist:

- aus (Alle LEDs ausschalten.)
- all (Schalten Sie alle LEDs in der angegebenen oder zuvor eingestellten Farbe ein.)
- wischen (Schalten Sie alle LEDs in der angegebenen oder zuvor eingestellten Farbe mit Wischeffekt ein.)
- Regenbogen (Startet den Regenbogeneffekt.)
- rainbowCycle (Startet den Regenbogenzyklus-Effekt.)
- Theaterchase (Startet den Theaterchase-Effekt in der angegebenen oder zuvor festgelegten Farbe.)
- theaterchaseRainbow (Startet den Theaterchase-Effekt mit wechselnden Farben.)
- tv (Startet den TV-Simulator.)

### Array_RGB (W)
 Beleuchten Sie mehrere LEDs in den angegebenen Farben.

```
+[numled][hexrgb(w)]+[numled][hexrgb(w)]+[numled][hexrgb(w)] [...] or
[numled][hexrgb(w)],[numled][hexrgb(w)],[numled][hexrgb(w)],[...]
```

 Wobei <numled> die Nummer der LED ist (beginnend mit 00), z. 01.

 Wobei <hexrgb> die Farbe als HEX ist, z. 04d2ff.

 Beispiel: + 09ffffff + 19ff0000 ODER 09ffffff, 19ff0000

### Farbe Legen Sie die Standardfarbe der Lampe fest.
 Wobei <r, g, b (, w)> die Farbe als Zahl (0 - 255) ist, z. 32,3,200 (, 255)

 Wenn aktiver Modus 0 (statisch) - Stellen Sie die Standardfarbe der Lampe ein und leuchten Sie alle LEDs in dieser Farbe.

### Color_R, color_G, color_B (, color_W) Legt die Standardfarbe der Lampe fest.
 Wobei <r (g) (b) (w)> die Farbe als Zahl (0 - 255) ist, z. 154

 Wenn aktiver Modus 0 (statisch) - Stellen Sie die Standardfarbe der Lampe ein und leuchten Sie alle LEDs in dieser Farbe.

### Color_RGB (W) Legt die Standardfarbe der Lampe fest.
 Wobei <hexrgb (w)> die Farbe als HEX ist, z. 04d2ff

 Wenn aktiver Modus 0 (statisch) - Stellen Sie die Standardfarbe der Lampe ein und leuchten Sie alle LEDs in dieser Farbe.

### list_modes Liste der verfügbaren Animationsmodi als Array.
Ergebnis:
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
 Beleuchten Sie mehrere LED-Bereiche in den angegebenen Farben.

```
R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)]R[rangestart_led][rangeend_led][hexrgb(w)] [...] or
[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[rangestart_led][rangeend_led][hexrgb(w)],[...]
```

 Wobei <rangestart_led> die Startnummer des Bereichs ist (Nummern, die mit 00 beginnen), z. 00.

 Wobei <rangeend_led> die Endnummer des Bereichs ist (Nummern beginnend mit 00), z. 09.

 Wobei <hexrgb (w)> die Farbe als HEX ist, z. 04d2ff.

 Kann mehrfach wiederholt werden.

 Beispiel: R0009ffffffR1019ff0000 ODER 0009ffffff, 1019ff0000 leuchtet die ersten 10 LEDs weiß und die nächsten 10 rot

### Set_all_RGB (W) Stellen Sie die Standardfarbe der Lampe ein und leuchten Sie alle LEDs in dieser Farbe.
 Wobei <hexrgb (w)> die Farbe als HEX ist, z. 04d2ff

### Single_RGB (W) Leuchtet einzelne LEDs in der angegebenen Farbe.
 Wobei <numled> die Nummer der LED ist (beginnend mit 00), z. 01.

 Wobei <hexrgb (w)> die Farbe als HEX ist, z. 04d2ff.

### Fx_mode Animationsmodus einstellen.
 Wobei <animation_mode_id> in den list_modes aktiviert ist

### Fx_mode_name Aktueller Name fx_mode

## Changelog

### 0.1.2
* (instalator) change role

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