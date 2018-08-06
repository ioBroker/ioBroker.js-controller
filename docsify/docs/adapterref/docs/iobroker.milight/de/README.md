![Logo](media/easybulb_logo.png)
# ioBroker.milight
[![NPM version](http://img.shields.io/npm/v/iobroker.milight.svg)](https://www.npmjs.com/package/iobroker.milight)
[![Downloads](https://img.shields.io/npm/dm/iobroker.milight.svg)](https://www.npmjs.com/package/iobroker.milight)
[![Build Status](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)](https://travis-ci.org/foxthefox/ioBroker.milight)


[![NPM](https://nodei.co/npm/iobroker.milight.png?downloads=true)](https://nodei.co/npm/iobroker.milight/)

adapter for ioBroker for LED-lamps like milight, easybulb, limitless

## Installation:
from npm
```javascript
npm install iobroker.milight
```
actual version from github
```javascript
npm install https://github.com/foxthefox/ioBroker.milight/tarball/master --production
```
## common Settings:
in admin page
* IP-Adress-> IP of bridge
* Port -> port of bridge
* delaybetweenPackages -> ms delay between UDP packages (100ms for v5)
* repeatPackage -> number of repetitions (1 for v5)
* version of the milight protocol v5 or v6 -> sets automatically the corresponding port
* setting full brightness when changed to white mode 

## type of bulbs in the zones:
in admin page
* basic = bridge ONLY for zone 1 and v6
* RGBWW = full color bulb with white LED and color temperature adjustment (increase color temp means cooler coloring), ONLY in v6
* RGB = pure color bulb without white ONLY for zone 1
* RGBW = color bulb with white LED
* White = WW/CW white bulb with color temperature adjustment (increase color temp means cooler coloring)

The Zone0 or ZoneAll can be used to give commands to all 4 zones, the adapter is configured in v6 with base/bridge commands and in v5 with rgbw commands. 


## States in Version 6

|               available state               |           basic/bridge           |              White             |               RGB              |                  RGBW                 |                  RGBWW                 |
|:-------------------------------------------:|:--------------------------------:|:------------------------------:|:------------------------------:|:-------------------------------------:|:--------------------------------------:|
|               ON/OFF as switch              |      state(zone1),  function     |      state(zone),  function    |     state(zone1),  function    |         state(zone),  function        |          state(zone),  function        |
|                 ON as button                |         on(zone1),  native       |        on(zone),  native       |        on(zone1),  native      |            on(zone),  native          |            on(zone),  native           |
|                OFF as button                |        off(zone1),  native       |        off(zone),  native      |       off(zone1),  native      |           off(zone),  native          |            off(zone),  native          |
|          colorMode as boolean state         |                                  |                                |                                |  colorMode (0=nightMode, 1=whiteMode) |  colorMode  (0=nightMode, 1=whiteMode) |
|              maxWhite as button             |                                  |     maxBright(zone), native    |                                |                                       |                                        |
|             whiteMode as button             |     whiteMode(zone1), native     |                                |                                |        whiteMode(zone), native        |         whiteMode(zone), native        |
|             nightMode as button             |                                  |     nightMode(zone), native    |                                |        nightMode(zone), native        |         nightMode(zone), native        |
|         brightness as value (0-100%)         |     brightness(zone), native     |                                |                                |        brightness(zone),  native      |        brightness(zone),  native       |
|            color as 3 hex values            |        color(zone),  native      |                                |       color(zone),  native     |          color(zone),  native         |           color(zone),  native         |
| rgb as combined value (#000000 -   #FFFFFF) |         rgb(zone),  native       |                                |        rgb(zone),  native      |           rgb(zone),  native          |            rgb(zone),  native          |
|                mode as value                |        mode(zone),  native       |                                |                                |           mode(zone),  native         |           mode(zone),  native          |
|            modeSpeedUp as button            |                                  |    modeSpeedUp(zone), native   |                                |       modeSpeedUp (zone), native      |        modeSpeedUp (zone), native      |
|           modeSpeedDown as button           |                                  |  modeSpeedDown (zone),  native |                                |      modeSpeedDown(zone),  native     |       modeSpeedDown(zone),  native     |
|                link as button               |                                  |                                |                                |           link(zone),  native         |           link(zone),  native          |
|               unlink as button              |                                  |                                |                                |          unlink(zone),  native        |          unlink(zone),  native         |
|         saturation as value (0-100%)         |                                  |                                |                                |                                       |        Saturation (zone),  native      |
|          colorTemp as value (0-100 equals to 2700K to 6500K)         |                                  |                                |                                |                                       |         colorTemp (zone), native       |
|            brightnessUp as button           |   brightnessUp (zone), function  |   brightnessUp (zone), native  |   brightnessUp (zone), native  |      brightnessUp (zone), function    |      brightnessUp (zone), function     |
|           brightnessDown as button          |  brightnessDown (zone), function |  brightnessDown (zone), native |  brightnessDown (zone), native |     brightnessDown (zone), function   |     brightnessDown (zone), function    |
|              colorUp as button              |      colorUp(zone), function     |                                |                                |        colorUp(zone),  function       |         colorUp(zone),  function       |
|             color Down as button            |    color Down(zone), function    |                                |   color Down(zone), function   |       color Down(zone), function      |                                        |
|            saturationUp as button           |                                  |                                |                                |                                       |      saturationUp (zone), function     |
|           saturationDown as button          |                                  |                                |                                |                                       |     saturationDown (zone), function    |
|            colorTempUp as button            |                                  |    colorTempUp (zone), native  |                                |                                       |       colorTempUp (zone), function     |
|           colorTempDown as button           |                                  |  colorTempDown (zone),  native |                                |                                       |      colorTempDown (zone), function    |
|           hue as value (0-360)        |                                        |                                |                                |           hue (zone),  function        |      hue (zone), function    |

## States in Version 5/ Version 4

|                available state                |           RGB           |          White          |                   RGBW                   |
|:---------------------------------------------:|:-----------------------:|:-----------------------:|:----------------------------------------:|
|                ON/OFF as switch               |  state(zone), function  |  state(zone), function  |           state(zone), function          |
|                  ON as button                 |     on(zone), native    |     on(zone), native    |             on(zone), native             |
|                 OFF as button                 |    off(zone), native    |    off(zone), native    |             off(zone), native            |
|           colorMode as boolean state          |                         |                         | colorMode (0/hs=whiteMode, 1/ct=color(hue=55)) |
|               maxWhite as button              |                         | maxBright(zone), native |                                          |
|              whiteMode as button              |                         |                         |          whiteMode(zone), native         |
|              nightMode as button              |                         |                         |          nightMode(zone), native         |
|           color as hue value (0-255)          |                         |                         |                hue, native               |
|  rgb as combined value (#000000 -   #FFFFFF)  |                         |                         |                rgb, native               |
|             colorTempUp as button             |                         |      warmer, native     |                                          |
|            colorTempDown as button            |                         |      cooler, native     |                                          |
|          brightness as value (0-100%)          |                         |                         |            brightness, native            |
| brightness   as value (0-100%), extended range |                         |                        |                                          |
|            effectModeNext as button           |                         |                         |          effectModeNext, native          |
|               speedUp as button               |     speedUp, native     |                         |           effectSpeedUp, native          |
|              speedDown as button              |    speedDown, native    |                         |          effectSpeedDown, native         |
|             brightUp as button            |   brightUp, native  |   brightUp, native  |                                          |
|            brightDown as button           |  brightDown, native |  brightDown, native |                                          |
|            effectModeNext as button           |  effectSpeedUp, native  |                         |                                          |
|            effectModePrev as button           | effectSpeedDown, native |                         |                                          |


effectSpeedUp/Down has different meaning (for rgb changes the mode, for rgbw it changes the speed)! 

## Configuration:
in admin page of adapter
version 5 also to be used for v4 lamps

## TODO:
* ??

## known issues:
* v5 rgb color accepted, but always blue


## Changelog:
### 0.3.5
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
