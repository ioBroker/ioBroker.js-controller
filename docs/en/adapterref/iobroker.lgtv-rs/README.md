![Logo](admin/lg_admin.png)
# ioBroker LG TV RS232 adapter

![Number of Installations](http://iobroker.live/badges/lgtv-rs-installed.svg) ![Number of Installations](http://iobroker.live/badges/lgtv-rs-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.lgtv-rs.svg)](https://www.npmjs.com/package/iobroker.lgtv-rs)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lgtv-rs.svg)](https://www.npmjs.com/package/iobroker.lgtv-rs)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.lgtv-rs/master.svg)](https://travis-ci.org/instalator/ioBroker.lgtv-rs)

[![NPM](https://nodei.co/npm/iobroker.lgtv-rs.png?downloads=true)](https://nodei.co/npm/iobroker.lgtv-rs/)

IoBroker LG TV RS232 adapter is used to control your LG TV via RS232 in conjunction with the Etnernet Gateway.
The list of models and commands is contained in the `admin/commands.json` file.

## Hardware
The driver allows you to connect to the LG TV through the [adapter](http://blog.instalator.ru/archives/744) RS232 to Ethernet.

As an RS232 gateway to Ethernet, any Arduino compatible card in which you need to download [this code](https://github.com/stepansnigirev/ArduinoSerialToEthernet) is used.
You will also need an Ethernet Shield W5100 or W5500 and an RS232 to TTL converter.

## Support
Supported models: LD750 to be...

## Changelog
### 0.0.4
  (instalator) fix error

### 0.0.3
  (instalator) alfa

### 0.0.1
  (instalator) initial
