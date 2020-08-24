***
**IMPORTANT UPDATE**

Development of this adapter will restart in **August 2020**. Stay tuned!

I will start by resolving the most pressing issues followed by a new major release that brings the adapter up to the latest development standards.
***

![I2C Logo](admin/i2c.png)

# ioBroker adapter for I2C

![Number of Installations](http://iobroker.live/badges/i2c-installed.svg) ![Number of Installations](http://iobroker.live/badges/i2c-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.i2c.svg)](https://www.npmjs.com/package/iobroker.i2c) [![Downloads](https://img.shields.io/npm/dm/iobroker.i2c.svg)](https://www.npmjs.com/package/iobroker.i2c) [![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.i2c.svg)](https://travis-ci.org/UncleSamSwiss/ioBroker.i2c/) [![GitHub issues](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.i2c.svg)](https://github.com/UncleSamSwiss/ioBroker.i2c/issues)

Communicates with devices connected to the local system using the I2C bus.

This adapter should work on Linux boards like the Raspberry Pi, C.H.I.P., BeagleBone or Intel Edison.

## Install

Before installing, please read the [installation guide of the i2c-bus module](https://www.npmjs.com/package/i2c-bus#installation).

Especially make sure, that you have properly configured and enabled I2C on your system (if needed):
* [Configuring I2C on the Raspberry Pi](https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md)
* [Configuring I2C on the Intel Edison Arduino Base Board](https://github.com/fivdi/i2c-bus/blob/master/doc/edison-adruino-base-board-i2c.md)

After you have enabled and configured I2C, you can install this adapter via ioBroker Admin:
1. Start the adapter (it must run for the discovery to work)
2. Open instance config dialog
3. Press the "Search Devices" button to discover all connected I2C devices - this will take some time, be patient!
4. Configure all found devices in their respective tabs.
5. Save the configuration (this will restart the adapter)

### Access Right Issue

Depending on the age of your ioBroker installation, the `iobroker` user (or under whatever user ioBroker is running) might not have the proper rights to access I2C.

If you have connected a device and it is not showing up in the configuration screen, please make sure the user is added to the `i2c` group:

```sh
sudo usermod -G i2c iobroker
```

Note: if don't have a standard installation, replace `iobroker` in the above command with the user running your ioBroker installation (check with `ps`).

## Configuration

### Bus Number

This is the number of the I2C bus/adapter to open, 0 for /dev/i2c-0, 1 for /dev/i2c-1, ...

On Raspberry Pi 3 and 4B, this is "1".

## Supported Devices

The following devices are currently supported. The numbers in parenthesis are the known addresses of the device in hexadecimal format (without the read bit).

### ADS1015 (48-4B)

Texas Instruments 4x 3.3-kSPS, 12-Bit ADCs with Internal Reference.

### ADS1115 (48-4B)

Texas Instruments 4x 860-SPS, 16-Bit ADCs with Internal Reference.

### BME280 (76, 77)

Bosch Digital Humidity, Pressure and Temperature Sensor.

### MCP23008 8-Bit I/O Expander (20-27)

Microchip 8-Bit I/O Expander with Serial Interface.

### MCP23017 16-Bit I/O Expander (20-27)

Microchip 16-Bit I/O Expander with Serial Interface.

### PCF8574 8-Bit I/O Expander (20-27)

Texas Instruments Remote 8-Bit I/O Expander for I2C Bus.

### PCF8574A 8-Bit I/O Expander (38-3F)

Texas Instruments Remote 8-Bit I/O Expander for I2C Bus.

### PCA9685 16-channel 12 bit PWM Servo/LED driver (40-7F)

Adafruit PCA9685 breakout board for 16-channel 12 bit PWM. Adapter focused on using the 16 channels from 0..4095 as LED dimmer.
Can drive many LEDs when PWM (and GND) is attached to a N-channel Mosfet module e.g. based on D4184. Connect LED GND to the MOSFET and +12/24/n V to PSU.

### Generic device (03-77)

Generic I2C device. Registers can be configured depending on the hardware.

## Usage in scripts

Supported commands for `sendTo` in scripts are `search`, `read` and `write`.

`search` takes as message the bus number and returns a JSON string of an array of found addresses on the bus.

`read` takes as message an object containing the address and optional the register and number of bytes to read. It returns a buffer with the read data.

`write` takes as message an object containing the address, the data as buffer and optional the register to write. It returns the written buffer on success.

### Examples for script usage

```js
sendTo('i2c.0', 'search', 1, (ret) => {
    log('Ret: ' + ret, 'info');
});

sendTo('i2c.0', 'read', {
    address: 0x40,
    register: 0x02,
    bytes: 2
}, (ret) => {
    log('Ret: ' + ret.inspect(), 'info');
});

sendTo('i2c.0', 'write', {
    address: 0x40,
    register: 0x00,
    data: Buffer.from([0x44, 0x27])
}, (ret) => {
    log('Ret: ' + ret.inspect(), 'info');
});
```

## Compatibility

Compatibility has been tested with Raspberry Pi 3 and 4B.

## Bug Reports and Feature Requests

Please use the GitHub repository to report any bugs or request new features.

If you require a missing devcies, please provide the type of IC (brand, model, ...) and its address(es) as reported in the adapter configuration.

## Changelog

### 0.0.8 (2020-05-26)
* (Peter Müller) Added support for Generic device.
* (Peter Müller) Added support for `read` and `write` commands in scripts using `sendTo`.
* (Peter Müller) Added support for interrupts on PCF8574, MCP23008, MCP23017 devices.

### 0.0.7 (2020-01-19)
* (CC1337) Added support for PCA9685.

### 0.0.6 (2019-03-17)
* (UncleSamSwiss) Added support for BME280.
* (UncleSamSwiss) Added support for ADS1015 / ADS1115.

### 0.0.5 (2019-01-12)
* (UncleSamSwiss) Added support for MCP23008.

### 0.0.4 (2018-07-23)
* (UncleSamSwiss) Improved stability of MCP23017.
* (Apollon77) Latest ioBroker utils and testing including node 10.

### 0.0.3 (2017-11-12)
* (UncleSamSwiss) Added support for MCP23017.

### 0.0.2 (2017-07-30)
* (UncleSamSwiss) Added support for inverting PCF8574 inputs and outputs.

### 0.0.1 (2017-07-27)
* (UncleSamSwiss) Initial version

## Thanks

This project is based on the [i2c-bus](https://www.npmjs.com/package/i2c-bus) NPM module. Thanks to fivdi for his great module!

## Third Party Licenses

### BME280
The BME280 code is based on https://github.com/skylarstein/bme280-sensor:

MIT License

Copyright (c) 2016 Skylar Stein

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

### ADS1x15
The ADS1x15 code is based on https://github.com/alphacharlie/node-ads1x15/blob/master/index.js

node-ads1x15 itself is based on https://github.com/adafruit/Adafruit_Python_ADS1x15

The MIT License (MIT)

Copyright (c) 2016 Adafruit Industries

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

### PCA9685

The PCA9685 code is based on https://github.com/adafruit/Adafruit_Python_PCA9685/blob/master/Adafruit_PCA968/PCA9685.py

The MIT License (MIT)

Copyright (c) 2016 Adafruit Industries
Author: Tony DiCola

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

Also based on: https://github.com/tessel/servo-pca9685/blob/master/index.js

Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
file at the top-level directory of this distribution.

Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
<LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
option. This file may not be copied, modified, or distributed
except according to those terms.
