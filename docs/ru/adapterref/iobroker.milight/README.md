---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.milight/README.md
title: ioBroker.milight
hash: Ecq04r4TXFjADX8OGk+fwmG2HESTZdjmC1XwtyMIxwg=
---
![логотип](../../../en/adapterref/iobroker.milight/admin/easybulb_logo.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.milight.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.milight.svg)
![Статус сборки](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.milight.png?downloads=true)

# IoBroker.milight
адаптер для ioBroker для LED-ламп типа milight, easybulb, без ограничений

## Монтаж:
с нпм

```javascript
npm install iobroker.milight
```

актуальная версия от github

```javascript
npm install https://github.com/foxthefox/ioBroker.milight/tarball/master --production
```

## Общие настройки:
на странице администратора

* IP-адрес-> IP моста
* Порт -> порт моста
* delaybetweenPackages -> задержка мс между пакетами UDP (100 мс для v5)
* repeatPackage -> количество повторений (1 для v5)
* версия протокола milight v5 или v6 -> автоматически устанавливает соответствующий порт
* установка полной яркости при переходе в белый режим

## Тип лампочек в зонах:
на странице администратора

* basic = мост ТОЛЬКО для зоны 1 и v6
* RGBWW = полноцветная лампа с белым светодиодом и регулировкой цветовой температуры (увеличение цветовой температуры означает более холодную окраску), ТОЛЬКО в версии 6
* RGB = чистый цвет лампы без белого ТОЛЬКО для зоны 1
* RGBW = цветная лампа с белым светодиодом
* Белый = белый / белый свет лампы с регулировкой цветовой температуры (увеличение цветовой температуры означает более холодную окраску)

Zone0 или ZoneAll могут использоваться для подачи команд во все 4 зоны, адаптер настроен в v6 с командами base / bridge и в v5 с командами rgbw.

## Состояния в версии 6
| доступное состояние | базовый / мост | Белый | RGB | RGBW | RGBWW |
|:-------------------------------------------:|:--------------------------------:|:------------------------------:|:------------------------------:|:-------------------------------------:|:--------------------------------------:|
| ВКЛ / ВЫКЛ как переключатель | состояние (zone1), функция | состояние (зона), функция | состояние (zone1), функция | состояние (зона), функция | состояние (зона), функция |
| ВКЛ как кнопка | на (zone1), родной | на (зона), родной | на (zone1), родной | на (зона), родной | на (зона), родной |
| ВЫКЛ как кнопка | выкл (zone1), родной | выкл (зона), родной | выкл (zone1), родной | выкл (зона), родной | выкл (зона), родной |
| colorMode как логическое состояние | | | | colorMode (0 = nightMode, 1 = whiteMode) | colorMode (0 = nightMode, 1 = whiteMode) |
| maxWhite as button | | maxBright (зона), родной | | | |
| whiteMode as button | whiteMode (zone1), родной | | | whiteMode (зона), родной | whiteMode (зона), родной |
| NightMode as button | | NightMode (зона), родной | | NightMode (зона), родной | NightMode (зона), родной |
| яркость как значение (0-100%) | яркость (зона), родная | | | яркость (зона), родная | яркость (зона), родная |
| цвет как 3 шестнадцатеричных значения | цвет (зона), родной | | цвет (зона), родной | цвет (зона), родной | цвет (зона), родной |
| rgb как объединенное значение (# 000000 - #FFFFFF) | RGB (зона), родной | | RGB (зона), родной | RGB (зона), родной | RGB (зона), родной |
| режим как значение | режим (зона), родной | | | режим (зона), родной | режим (зона), родной |
| modeSpeedUp as button | | modeSpeedUp (зона), родной | | modeSpeedUp (зона), родной | modeSpeedUp (зона), родной |
| modeSpeedDown as button | | modeSpeedDown (зона), родной | | modeSpeedDown (зона), родной | modeSpeedDown (зона), родной |
| ссылка как кнопка | | | | ссылка (зона), родная | ссылка (зона), родная |
| отсоединить как кнопку | | | | unlink (зона), родной | unlink (зона), родной |
| насыщенность как значение (0-100%) | | | | | Насыщенность (зона), родная |
| colorTemp как значение (0-100 равняется 2700K к 6500K) | | | | | colorTemp (зона), родной |
| яркость как кнопка | яркость (зона), функция | BrightUp (зона), родной | BrightUp (зона), родной | яркость (зона), функция | яркость (зона), функция |
| яркость, как кнопка | яркостьВниз (зона), функция | яркость вниз (зона), родная | яркость вниз (зона), родная | яркостьВниз (зона), функция | яркостьВниз (зона), функция |
| Раскрась как кнопку | ColorUp (зона), функция | | | ColorUp (зона), функция | ColorUp (зона), функция |
| цвет вниз как кнопка | Цвет Вниз (зона), функция | | Цвет Вниз (зона), функция | Цвет Вниз (зона), функция | |
| saturationUp as button | | | | | saturationUp (зона), функция |
| НасыщенностьВниз как кнопка | | | | | saturationDown (зона), функция |
| colorTempUp as button | | colorTempUp (зона), родной | | | colorTempUp (зона), функция |
| colorTempDown as button | | colorTempDown (зона), родной | | | colorTempDown (зона), функция |
| оттенок как значение (0-360) | | | | оттенок (зона), функция | оттенок (зона), функция |

## Состояния в версии 5 / версии 4
| доступное состояние | RGB | Белый | RGBW |
|:---------------------------------------------:|:-----------------------:|:-----------------------:|:----------------------------------------:|
| ВКЛ / ВЫКЛ как переключатель | состояние (зона), функция | состояние (зона), функция | состояние (зона), функция |
| ВКЛ как кнопка | на (зона), родной | на (зона), родной | на (зона), родной |
| ВЫКЛ как кнопка | выкл (зона), родной | выкл (зона), родной | выкл (зона), родной |
| colorMode как логическое состояние | | | colorMode (0 / hs = whiteMode, 1 / ct = color (hue = 55)) |
| maxWhite as button | | maxBright (зона), родной | |
| whiteMode as button | | | whiteMode (зона), родной |
| NightMode as button | | | NightMode (зона), родной |
| цвет как значение оттенка (0-255) | | | оттенок, родной |
| rgb как объединенное значение (# 000000 - #FFFFFF) | | | RGB, родной |
| colorTempUp as button | | теплее, родной | |
| colorTempDown as button | | кулер, родной | |
| яркость как значение (0-100%) | | | яркость, родная |
| яркость как значение (0-100%), расширенный диапазон | | | |
| effectModeNext as button | | | effectModeNext, native |
| ускорить как кнопку | SpeedUp, родной | | effectSpeedUp, native |
| SpeedDown как кнопка | SpeedDown, родной | | effectSpeedDown, родной |
| Яркая как кнопка | BrightUp, родной | BrightUp, родной | |
| brightDown как кнопка | brightDown, родной | brightDown, родной | |
| effectModeNext as button | effectSpeedUp, native | | |
| effectModePrev as button | effectSpeedDown, родной | | |

effectSpeedUp / Down имеет различное значение (для rgb меняется режим, для rgbw - скорость)!

## Конфигурация:
на странице администратора версии 5 адаптера также будет использоваться для ламп v4

## СДЕЛАТЬ:
* ??

## Известные вопросы:
* ??

## Changelog
### 0.4.0
* compact mode
### 0.3.6
* (foxthefox) node-milight-promise 0.3.1 (former version 0.2.32)

### 0.3.5
* (mrinc)     fix for the v5 color setting (was always blue)
* (foxthefox) nightModeSwitch added on white bulbs for command from Alexa

### 0.3.4
* (foxthefox) adminv3 added

### 0.3.3
* (foxthefox) setting of state after usage of command OFF/ON
* (foxthefox) v6 widget for RGBW; RGBWW mode switch night/weiß instead weiß/farbe
* (foxthefox) v6 widget for RGBW, RGBWW speedup/down correction, no hide of color temp vs. color when switching night/weiß
* (foxthefox) v5 widget for RGBW with color changing to matching the selected color
* (foxthefox) v6 widget for RGBWW with colortemperature changing to matching the selected colortemperature

### 0.3.2
* (foxthefox) V5 uses brightUp/brightDown instead brightnessUp/brightnessDown
* (foxthefox) corrections in V5 for white Commands (cooler/warmer/maxBright)
* (foxthefox) new RGBWW V6 widget
* (foxthefox) update for effects and correctios in RGBW V6 widget
* (foxthefox) added CW/WW widget V4 and V6
* (foxthefox) added disco button in RGBW V4

### 0.3.1
* (bluefox) added checking of methods before calling them

### 0.3.0
* (foxthefox) cleanup of states
* (foxthefox) added white/rgb lamp
* (foxthefox) correction of mismatch RGBW/RGBWW in v6
* (foxthefox) v6 brightness only 0-0x64(100)

### 0.2.2/0.2.1
* (foxthefox) debug messages with v5/v6 prefix; v6 colorset->colormode

### 0.2.0 
* (bluefox) discovery for v6

### 0.1.1
* (foxthefox) switch lamp on with full brightness -> checkbox in admin for v5

### 0.1.0
* (foxthefox) tested with bridge version 4 and protocol version v5
* (bluefox)v6 implementation
* (foxthefox) node-milight-promise 0.0.9
* (foxthefox) jqui widget RGBW lamp

### 0.0.1
* (foxthefox) initial setup

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>