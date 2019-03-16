![I2C Logo](media/i2c.png)

# ioBroker adapter for I2C

[![NPM version](http://img.shields.io/npm/v/iobroker.i2c.svg)](https://www.npmjs.com/package/iobroker.i2c) [![Downloads](https://img.shields.io/npm/dm/iobroker.i2c.svg)](https://www.npmjs.com/package/iobroker.i2c) [![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.i2c.svg)](https://travis-ci.org/UncleSamSwiss/ioBroker.i2c/) [![GitHub issues](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.i2c.svg)](https://github.com/UncleSamSwiss/ioBroker.i2c/issues)

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

## Configuration

### Bus Number

This is the number of the I2C bus/adapter to open, 0 for /dev/i2c-0, 1 for /dev/i2c-1, ...

On Raspberry Pi 3, this is "1".

## Supported Devices

The following devices are currently supported. The numbers in parenthesis are the known addresses of the device in hexadecimal format (without the read bit).

### MCP23017 16-Bit I/O Expander (20-27)

Not yet implemented.

### PCF8574 8-Bit I/O Expander (20-27)

Not yet implemented.

### PCF8574A 8-Bit I/O Expander (38-3F)

Not yet implemented.

## Compatibility

Compatibility has been tested with Raspberry Pi 3.

## Bug Reports and Feature Requests

Please use the GitHub repository to report any bugs or request new features.

If you require a missing devcies, please provide the type of IC (brand, model, ...) and its address(es) as reported in the adapter configuration.

## TODO
* Support interrupts instead of only polling for MCP23017 and PCF8574

## Changelog

### 0.0.4
* (UncleSamSwiss) Improved stability of MCP23017.
* (Apollon77) Latest ioBroker utils and testing including node 10.

### 0.0.3
* (UncleSamSwiss) Added support for MCP23017.

### 0.0.2
* (UncleSamSwiss) Added support for inverting PCF8574 inputs and outputs.

### 0.0.1
* (UncleSamSwiss) Initial version

## Thanks

This project is based on the [i2c-bus](https://www.npmjs.com/package/i2c-bus) NPM module. Thanks to fivdi for his great modules!