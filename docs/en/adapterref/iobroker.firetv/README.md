![Logo](admin/firetv.png)

### ioBroker.firetv 

[![NPM version](https://img.shields.io/npm/v/iobroker.firetv.svg)](https://www.npmjs.com/package/iobroker.firetv)
[![Tests](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)](https://travis-ci.org/soef/iobroker.firetv)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/soef/iobroker.firetv/blob/master/LICENSE)

<!--
[![NPM version](https://badge.fury.io/js/iobroker.firetv.svg)](https://www.npmjs.com/package/iobroker.firetv)
[![Build Status](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)](https://travis-ci.org/soef/iobroker.firetv)
-->

With this adapter you can control some funtions of your Fire TV or Fire TV Stick.
E.g.: 
- On /Off
- Send key events
- Send text strings to input fields
- Start / Stop apps
- reboot
- excute shell commands

#### Some Infos
This adapter uses functions of the "Android Debug Bridge", known as "adb". Adb is part of the Android Developer SDK. Because Fire TV has an Android operating system, it can be controlled by adb.

#### Requirements

To use this adapter you have to install at least the adb packet of the Anroid SDK. In order not to install the complete Android SDK, you should install the 
- *Minimal ADB and Fastboot*

Search on google (Minimal ADB and Fastboot) for the latest download link.

Alternatively, you can use *adbLink* 

#### Installation
Execute the following command in the iobroker root directory (e.g. in /opt/iobroker)
```
npm install iobroker.firetv 
```



