![Logo](media/mihome.png)
# ioBroker mihome Adapter
==============

[![NPM version](http://img.shields.io/npm/v/iobroker.mihome.svg)](https://www.npmjs.com/package/iobroker.mihome)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mihome.svg)](https://www.npmjs.com/package/iobroker.mihome)

[![NPM](https://nodei.co/npm/iobroker.mihome.png?downloads=true)](https://nodei.co/npm/iobroker.mihome/)

## Requirements 
### Android (copied from [here](http://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)) )
You first need to enable local network functions by using the Android Mi Home 
App https://play.google.com/store/apps/details?id=com.xiaomi.smarthome :

- Install the App on a Android device
- Make sure you set your region to: Mainland China under settings -> Locale - at time of writing this seems to be required.
- Mainland China and language can set on English
- Select your Gateway in Mi Home
- Then the 3 dots at the top right of the screen
- Then click on about
- Tap the version (2.27 is the current Android version as of 2 June 2017) number at the bottom of the screen repeatedly
- You should see now 2 extra options listed in English (was Chinese in earlier versions)until you did now enable the developer mode. \[ if not try all steps again! \]
- Choose the first new option
- Then tap the first toggle switch to enable LAN functions. Note down the password (29p9i40jeypwck38 in the screenshot). Make sure you hit the OK button (to the right of the cancel button) to save your changes.
- If you change here something, you lose your password!

![android](img/mihome-settings.png)

### iOS
You first need to enable local network functions by using the [iOS Mi Home App iosApp Mi](https://itunes.apple.com/fr/app/%E7%B1%B3%E5%AE%B6-%E7%B2%BE%E5%93%81%E5%95%86%E5%9F%8E-%E6%99%BA%E8%83%BD%E7%94%9F%E6%B4%BB/id957323480?mt=8)
Install the App on a iOS device: 
- Make sure you set your region to: Mainland China under settings -> Locale - required for the moment.
- Mainland China and language can set on English
- Select your Gateway in Mi Home
- Then the 3 dots at the top right of the screen
- Then click on about
- Tap under Tutorial menu(on the blank part) repeatedly
- You should see now 3 extra options listed in Chinese until you did now enable the developer mode. \[ if not try all steps again! \]
- Choose the second new option
- Then tap the first toggle switch to enable LAN functions. Note down the password (29p9i40jeypwck38 in the screenshot). Make sure you hit the OK button (to the right of the cancel button) to save your changes.
- If you change here something, you lose your password!

## Usage
You can use small button on temperature sensor to trigger "double Press" event. Just press twice within 5 seconds. You can set this interval in settings, but do not set it over 10 seconds.

### Supported devices

- gateway -           Xiaomi RGB Gateway
- sensor_ht -         Xiaomi Temperature/Humidity
- weather.v1 -        Xiaomi Temperature/Humidity/Pressure
- switch -            Xiaomi Wireless Switch
- sensor_switch.aq2 - Xiaomi Aqara Wireless Switch Sensor
- plug -              Xiaomi Smart Plug
- 86plug -            Xiaomi Smart Wall Plug
- 86sw2 -             Xiaomi Wireless Dual Wall Switch
- 86sw1 -             Xiaomi Wireless Single Wall Switch
- natgas -            Xiaomi Mijia Honeywell Gas Alarm Detector
- smoke -             Xiaomi Mijia Honeywell Fire Alarm Detector
- ctrl_ln1 -          Xiaomi Aqara 86 Fire Wall Switch One Button
- ctrl_ln2 -          Xiaomi 86 zero fire wall switch double key
- ctrl_neutral2 -     Xiaomi Wired Dual Wall Switch
- ctrl_neutral1 -     Xiaomi Wired Single Wall Switch
- cube -              Xiaomi Cube
- magnet -            Xiaomi Door Sensor
- sensor_magnet.aq2 - Xiaomi Aqara Door Sensor
- curtain -           Xiaomi Aqara Smart Curtain
- motion -            Xiaomi Motion Sensor
- sensor_motion.aq2   Xiaomi Aqara Motion Sensor
- sensor_wleak.aq1    Xiaomi Aqara water sensor
- ctrl_ln2.aq1        Xiaomi Aqara Wall Switch LN (Double)

## Changelog
### 1.0.7 (2018-06-25)
- (bluefox) The heartbeat timeout and the re-connection interval settings were added

### 1.0.6 (2018-05-26)
- (bluefox) Added new Aqara cube sensor

### 1.0.5 (2018-03-05)
- (bluefox) Xiaomi Aqara Wall Switch LN Double was added

### 1.0.4 (2018-01-21)
- (bluefox) The alarm state was fixed.

### 1.0.3 (2018-01-21)
- (bluefox) Invalid temperature values will be ignored

### 1.0.2 (2018-01-14)
- (bluefox) Ignore unknown state of sensors

### 1.0.0 (2018-01-05)
- (bluefox) Do not overwrite the names
- (bluefox) Ready for Admin3

### 0.3.3 (2017-11-26)
- (bluefox) Allow multiple mihome gateways

### 0.2.4 (2017-11-04)
- (bluefox) Add aqara water sensor

### 0.2.3 (2017-09-22)
- (bluefox) Remove "." from id of the device

### 0.2.2 (2017-08-01)
- (bluefox) Set after 300ms doublePress to false by Temperature Sensor\nAllow control of Plug

### 0.2.1 (2017-07-29)
- (bluefox) Implement double click on temperature sensor

### 0.2.0 (2017-07-18)
- (bluefox) fix battery level

### 0.1.4 (2017-06-09)
- (bluefox) add cube
- (bluefox) remove voltage by gateway

### 0.1.1 (2017-06-06)
- (bluefox) Initial commit

## License

MIT

Copyright (c) 2017-2018 bluefox <dogafox@gmail.com>
