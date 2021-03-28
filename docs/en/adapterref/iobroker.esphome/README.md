![Logo](admin/esphome.png)
# ioBroker.esphome

[![NPM version](http://img.shields.io/npm/v/iobroker.esphome.svg)](https://www.npmjs.com/package/iobroker.esphome)
[![Downloads](https://img.shields.io/npm/dm/iobroker.esphome.svg)](https://www.npmjs.com/package/iobroker.esphome)
![Number of Installations (latest)](http://iobroker.live/badges/esphome-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/esphome-stable.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)](https://david-dm.org/DrozmotiX/iobroker.esphome)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome)

[![NPM](https://nodei.co/npm/iobroker.esphome.png?downloads=true)](https://nodei.co/npm/iobroker.esphome/)

**Tests:** ![Test and Release](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## ESPHome adapter for ioBroker

Control your ESP8266/ESP32 with simple yet powerful configuration files created and managed by ESPHome.
Native integration of ESPHome managed device (Including Dashboard) by its native API and ensure all data is synchronised (live-event handling, no data polling ! :)

![Logo](admin/img/dashboard.png)

This adapter uses the [esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) with all credits to @Nafaya to interact with [ESPHome API](https://esphome.io/components/api.html?highlight=api)!

## [Documentation](https://DrozmotiX.github.io/languages/en/ESPHome/)

All our adapter documentation can be found at [The DrozmotiX Docu Page](https://DrozmotiX.github.io/languages/en/ESPHome)

## Prerequisites

    * NodeJS >= 12.x
    * Python >=3.6, <4.0
    * API is activated in YAML
    * For admin tabs (optional)
        * ESPHome Dashboard IP is provided in instance settings

### Activate API in YAML

```
api:
  password: 'MyPassword'
```

### Example config
Example config, for more examples see [The DrozmotiX Docu Page](https://DrozmotiX.github.io) or [ESPHome Documentation](https://esphome.io/index.html)
```
esphome:
  name: sensor_badkamer
  platform: ESP32
  board: esp-wrover-kit

wifi:
  use_address: 192.168.10.122
  ssid: "xxxxx"
  password: "xxxxxx"
          
# Enable ESPHome API
api:
    password: 'MyPassword'
# Activate i2c bus  
i2c:
  sda: 21
  scl: 22
  scan: True
  id: bus_a
  
# Example configuration for bh1750
sensor:
  - platform: bh1750
    name: "Hal_Illuminance"
    address: 0x23
    measurement_time: 69
    update_interval: 10s
    
# Example configuration for an GPIO output    
output:
  - platform: gpio
    pin: 12
    inverted: true
    id: gpio_12
    
# Example configuration linking a switch to the previous defined output
switch:
  - platform: output
    name: "Generic Output"
    output: 'gpio_12'
    
```
## Support me
If you like my work, please consider a personal donation  
(this is an personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.2.0-0 (2021-03-27) Native Integration of ESPHome Dashboard
* (DutchmanNL) Translations updated
* (DutchmanNL) Configuration page updated
* (DutchmanNL) Added to sentry error reporting
* (DutchmanNL) Native integration of ESPHome Dashboard added

### 0.1.5 (2021-03-21)
* (DutchmanNL) Add Translations

### 0.1.4 (2021-03-19)
* (DutchmanNL) Implemented RGBW
* (DutchmanNL) Ensure correct encryption and storage of passwords
* (DutchmanNL) Proper value ranges for type light (255 instead 100)
* (DutchmanNL) Implemented hex color state for type light (if RGB is available)

### 0.1.2 (2021-03-02)
* (DutchmanNL) Type Fan added
* (DutchmanNL) Type Light added
* (DutchmanNL) Error messages optimized
* (DutchmanNL) Device reconnect handling improved
* (DutchmanNL) [Breaking!] Change state name to default "state" for type BinarySensor / Climate / Sensor / TextSensor & Switch  
* (DutchmanNL) Autodiscovery improved, non-ESPHome devices excluded

### 0.1.0 (2021-02-27)
* (DutchmanNL) Autodiscovery implemented
* (DutchmanNL) Type Climat added
* (DutchmanNL) Type TextSensor added
* (DutchmanNL) Solved reconnection issues
* (DutchmanNL) Optimized error messages for unknown types
* (DutchmanNL & @xXBJXx) Adapter configuration page optimized

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda86@gmail.com>

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