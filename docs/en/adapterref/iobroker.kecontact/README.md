![Adapter Logo](admin/charger.png)

# ioBroker adapter for KEBA KeContact wallbox

![Number of Installations](http://iobroker.live/badges/kecontact-installed.svg) ![Number of Installations](http://iobroker.live/badges/kecontact-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.kecontact.svg)](https://www.npmjs.com/package/iobroker.kecontact) [![Downloads](https://img.shields.io/npm/dm/iobroker.kecontact.svg)](https://www.npmjs.com/package/iobroker.kecontact) [![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.kecontact.svg)](https://travis-ci.org/UncleSamSwiss/ioBroker.kecontact/) [![AppVeyor Build Status](https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-kecontact-fxdvr.svg)](https://ci.appveyor.com/project/UncleSamSwiss/iobroker-kecontact-fxdvr) [![GitHub issues](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.kecontact.svg)](https://github.com/UncleSamSwiss/ioBroker.kecontact/issues)

Provides information about the current state of a KEBA KeContact wallbox using its UDP protocol.

## Install

Install this adapter via ioBroker Admin:
1. Open instance config dialog
2. Enter the IP address of your KEBA KeContact wallbox
3. Adjust the refresh interval if needed
4. Save the configuration
5. Start the adapter

## Configuration

### KeContact IP Address

This is the IP address of your KEBA KeContact wallbox.

### Refresh Interval

This is the interval in seconds how often the wallbox should be queried for new values.

The default value is 30 seconds which is a good balance between the load for the KeConnect and having up-to-date information in ioBroker.

## Changelog
### 0.2.0 (2019-02-05)
* (Sneak-L8) added automatic regulation by output photovoltaics unit
* (Sneak-L8) added possibility to limit wallbox to keep total power below a limit
* (Sneak-L8) added state to display text on wallbox

### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version

## Legal

This project is not affiliated directly or indirectly with the company KEBA AG.

KeConnect is a registered trademark of KEBA AG.
