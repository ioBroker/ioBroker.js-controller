![Logo](admin/asuswrt.png)
# ioBroker.asuswrt
=================

![Number of Installations](http://iobroker.live/badges/asuswrt-installed.svg) ![Number of Installations](http://iobroker.live/badges/asuswrt-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.asuswrt.svg)](https://www.npmjs.com/package/iobroker.asuswrt)
[![Downloads](https://img.shields.io/npm/dm/iobroker.asuswrt.svg)](https://www.npmjs.com/package/iobroker.asuswrt)
[![Tests](https://api.travis-ci.org/mcdhrts/ioBroker.asuswrt.svg)](https://travis-ci.org/mcdhrts/ioBroker.asuswrt)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/mcdhrts/ioBroker.asuswrt/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/iobroker.asuswrt.png?downloads=true)](https://nodei.co/npm/iobroker.asuswrt/)

## ASUSWRT adapter for ioBroker

Find Active Devices in ASUS Routers running ASUSWRT. 
You can use this for Example as Presence Detection of Phones to track if someone is at home.

Tested with Asus GT-AC5300 running ASUSWRT 3.0.0.4.384_32799

You can find a list from Asus which Router DO NOT use ASUSWRT here: https://event.asus.com/2013/nw/ASUSWRT/

## Requirements

You must activate and allow SSH Connections in your Router Settings

You need at least NodeJS V6 and Admin V3

If you need Admin V2 install last supported Version 0.3.1

## Setup
* Asus Router IP-Address (Mandatory)
    * The IP-Address of the Asus Router
* Login User (Mandatory)
    * The Username for the Asus Router to login
* Login Password (Optional if Private Key File used)
    * The Passwort for the User to login
    * When you use Private Key File leave this field empty
* Private Key File (Optional if Password is used)
    * When you don´t want to use Passwort-Login you can set the Path to the Private Key File for the SSH-Login 
    * Leave empty if not wanted
* Private Key File Passphrase (Optional if Private Key File is Encrypted)
    * When your Key File is encrypted with a Passphrase then enter it here 
    * Leave empty if not necessary
* SSH-Port (Mandatory)
    * The Port for the SSH Connection to the Asus Router
* Polling Time
    * The Time in ms to check for active Devices (Mininum time is 5000ms = 5s)
* Time Not Active
    * The Time in ms when a Device is not active anymore. 
    * In my case 180000ms = 180s = 3 Minutes works perfectly. Minimum is 60000ms
* Addresses to monitoring
    * Add the Devices to watch if active or not with the MAC-Address from the Device.
    * Don´t forget to set the Checkbox to activate the monitoring

## Changelog

### 1.0.1 (2019-03-22)
* (mcdhrts) Add Support for Compact Mode

### 1.0.0 (2019-01-13)
* (mcdhrts) 
    * Add possibility to use SSH Private Key File instead of Password.
    * Minimum Polling Time down to 5 Seconds.
    * Removed Simple-SSH Support.
    * Removed Admin V2 Support.

### 0.3.1 (2019-01-03)
* (mcdhrts) Changed Test Files, no features added

### 0.3.0 (2018-12-31)
* (mcdhrts) Code Review Changes, when using SSH2 Polling Intervall is lower to now minimum 10s

### 0.2.1 (2018-12-29)
* (mcdhrts) Update Readme and add missing translations

### 0.2.0 (2018-12-17)
* (mcdhrts) Possibilty to use SSH2 which keeps the SSH Session to the Router alive

### 0.1.2 (2018-12-10)
* (mcdhrts) Update wrong dependencies

### 0.1.1 (2018-12-10)
* (mcdhrts) Update README

### 0.1.0 (2018-12-10)
* (mcdhrts) first complete checked and running beta Version

### 0.0.1 (2018-12-09)
* (mcdhrts) first official beta version

## License
The MIT License (MIT)

Copyright (c) 2019 mcdhrts <mcdhrts@outlook.com>

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