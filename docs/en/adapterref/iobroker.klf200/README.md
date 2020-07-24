![Logo](admin/klf200.png)

# ioBroker.klf200

![Number of Installations](http://iobroker.live/badges/klf200-installed.svg) ![Stable version](http://iobroker.live/badges/klf200-stable.svg)
[![Travis CI](https://travis-ci.org/MiSchroe/ioBroker.klf200.svg?branch=master)](https://travis-ci.org/MiSchroe/ioBroker.klf200)
[![Build status](https://ci.appveyor.com/api/projects/status/t28nlps5c99jy5v7/branch/master?svg=true)](https://ci.appveyor.com/project/MiSchroe/iobroker-klf200/branch/master)
[![GitHub issues](https://img.shields.io/github/issues/MiSchroe/ioBroker.klf200.svg)](https://github.com/MiSchroe/ioBroker.klf200/issues)
[![GitHub license](https://img.shields.io/github/license/MiSchroe/ioBroker.klf200.svg)](https://github.com/MiSchroe/ioBroker.klf200/blob/master/LICENSE)

[![NPM version](https://img.shields.io/npm/v/iobroker.klf200.svg)](https://www.npmjs.com/package/iobroker.klf200)
[![Downloads](https://img.shields.io/npm/dm/iobroker.klf200.svg)](https://www.npmjs.com/package/iobroker.klf200)

[![gitlocalized ](https://gitlocalize.com/repo/1127/whole_project/badge.svg)](https://gitlocalize.com/repo/1127/whole_project?utm_source=badge)
[![gitlocalized ](https://gitlocalize.com/repo/1127/de/badge.svg)](https://gitlocalize.com/repo/1127/de?utm_source=badge)
[![gitlocalized ](https://gitlocalize.com/repo/1127/fr/badge.svg)](https://gitlocalize.com/repo/1127/fr?utm_source=badge)
[![gitlocalized ](https://gitlocalize.com/repo/1127/nl/badge.svg)](https://gitlocalize.com/repo/1127/nl?utm_source=badge)
[![gitlocalized ](https://gitlocalize.com/repo/1127/it/badge.svg)](https://gitlocalize.com/repo/1127/it?utm_source=badge)
[![gitlocalized ](https://gitlocalize.com/repo/1127/pl/badge.svg)](https://gitlocalize.com/repo/1127/pl?utm_source=badge)
[![gitlocalized ](https://gitlocalize.com/repo/1127/pt/badge.svg)](https://gitlocalize.com/repo/1127/pt?utm_source=badge)
[![gitlocalized ](https://gitlocalize.com/repo/1127/ru/badge.svg)](https://gitlocalize.com/repo/1127/ru?utm_source=badge)
[![gitlocalized ](https://gitlocalize.com/repo/1127/es/badge.svg)](https://gitlocalize.com/repo/1127/es?utm_source=badge)

[![NPM](https://nodei.co/npm/iobroker.klf200.png?downloads=true)](https://nodei.co/npm/iobroker.klf200/)

[![Donation Button](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WTZ5WAZ9EYMUC&source=url)

This adapter is for controlling a VELUX® KLF-200 interface. This adapter is neither an official VELUX product nor is it supported by the company that owns the VELUX products.

The main intention of this adapter is to control electric roof windows and/or electric blinds or roller shutters. Though the KLF-200 interface is able to connect to further devices like lights, switches, canvas blinds etc. I haven't tested the adapter for use with these kind of devices. Nonetheless it should be possible, that these devices could be controlled by this adapter, too.

The adapter works with the official TCP/IP interface of the KLF-200 that was documented with the release of firmware version 2.0.0.71. You don't need to wire the inputs and outputs of the box, but you have to
connect the KLF-200 to a LAN using an ethernet cable.

> ## **ATTENTION: BREAKING CHANGES!**
>
> **In case you have an older version of the KLF-200 you have to install the new firmware
> (at least version 2.0.0.71) to have this adapter work with your
> KLF-200 interface. Newer versions of the KLF-200 have installed the current firmware, already.**
>
> **This version of the adapter doesn't work with older firmware versions.**
>
> **Updating your KLF-200 is strictly at your own risk. In case of a power outage
> during the update you may loose the functionality of the KLF-200.**

## User documentation

You can find the user documentation in several languages:

![English flag](img/united-kingdom-flag-round-icon-16.png) [English documentation](docs/en/ReadMe.md)

![German flag](img/germany-flag-round-icon-16.png) [Deutsche Dokumentation](docs/de/ReadMe.md)

![France flag](img/france-flag-round-icon-16.png) [Documentation française](docs/fr/ReadMe.md)

![Italien flag](img/italy-flag-round-icon-16.png) [Documentazione italiana](docs/it/ReadMe.md)

![Netherlands flag](img/netherlands-flag-round-icon-16.png) [Nederlandse documentatie](docs/nl/ReadMe.md)

![Poland flag](img/poland-flag-round-icon-16.png) [Polska dokumentacja](docs/pl/ReadMe.md)

![Portuguese flag](img/portugal-flag-round-icon-16.png) [Documentação portuguesa](docs/pt/ReadMe.md)

![Russian flag](img/russia-flag-round-icon-16.png) [Российская документация](docs/ru/ReadMe.md)

![Spanish flag](img/spain-flag-round-icon-16.png) [Documentación española](docs/es/ReadMe.md)

## Known restrictions

### Technical limitations of the KLF-200 itself:

-   The interface is restricted by storing a maximum of 32 scenes in total
    with a maximum total number of 192 node positions, whichever is reached first.
-   There is a maximum number of 200 nodes and up to three beacons that can
    be stored in the interface.
-   A maximum of two concurrent connections are supported.

### Limitations of the adatper:

-   If you define a new scene, you have to restart the adapter to recognize the new scene.
-   The adapter doesn't read the room list at the moment, only user groups are read.
-   The adapter enables the house status monitor at the KLF-200. It will stay enabled
    after a reboot of the KLF-200. The house status monitor queries the current status of
    the products at regular intervals. In a factory new KLF-200 the house status monitor
    is disabled. Usually, this shouldn't be anything to bother about, but you should be
    informed about it.

## Documentation of the data points

### Devices

The following devices are defined:

-   gateway: Shows global data from the KLF-200 interface itself, like version numbers and current status.
-   groups: Has a corresponding channel for each user group defined.
-   info: Connection state between the adapter and the KLF-200.
-   products: Has a corresponding channel for each product that is registered in the KLF-200.
-   scenes: Has a corresponding channel for each scene that is defined in the KLF-200.

### Channels

#### Gateway

-   GatewayState - Configuration state of the KLF-200. The KLF-200 can operate
    as a gateway to control registered products or as a repeater to extend the
    range of physical remote controls. This adapter is supposed to work with
    the KLF-200 in gateway mode. It wasn't tested with a KLF-200 in repeater mode.
    After you have setup your KLF-200 and you have
    registered you products this state should be GatewayMode_WithActuatorNodes.
-   GatewaySubState - This state shows if the gateway is currently idle or if
    it's running a command, a scene of if it's currently in a configuration mode.
-   HardwareVersion - Version number of the hardware release of the KLF-200
-   ProductGroup - Product Group of the KLF-200 itself. It's a remote control
    device and therefore its product group value is always 14.
-   ProductType - Product type of the KLF-200 itself. It's always 3.
-   ProtocolVersion - Version number of the protocol with which the adapter communicates with the device.
-   SoftwareVersion - Version number of the firmware.

#### Groups

-   groupsFound - Number of groups defined.
-   0...n - Channel for each group
    -   groupType - Type of the group. A UserGroup is a user defined group
        and can contain different products of the same category.
    -   nodeVariation - Defines the special kind of window like top hung, kip, flat roof, sky light
    -   order - Custom sort order, can be used to sort the products in visualisations. This state is writable.
    -   placement - Room or house group number. Change this to put the product
        in another room. This state is writable.
    -   productsCount - Number of products that are contained in the group.
    -   targetPosition - Set this state to a value between 0% and 100% to move a
        complete group. This state is writable.
    -   targetPositionRaw - Set this state to a value between 0 and 65535 (0x000 - 0xFFFF) to move a
        complete group. This state reflects the raw value of the target position. This state is writable.
    -   velocity - Velocity at which the whole group operates. This state is
        writable.

#### Info

-   connection - Indicates if the adapter has an active connection to the
    KLF-200. If the connection is lost or can not be established for
    whatever reason this state will change to false.
    During the initialization phase of the adapter this state stays at
    false until all event handlers are in place. If this state is true
    it's safe to run commands and query states. If this state is false
    you don't have a connection to the KLF-200 and your commands can't be
    received and states that you query may not reflect the real value for
    the product. If the connection to the KLF-200 is lost physically it still
    takes a few seconds until the adapter gets the information, thus even if
    the connection state is true there might be a slight chance that your
    connection is lost, already.

#### Products

-   productsFound - Number of products registered in the interface
-   0...n - Channel for each registered product
    -   FP1CurrentPositionRaw - Raw position value of the functional parameter 1; the raw values is in the range of 0-65535
    -   FP2CurrentPositionRaw - Raw position value of the functional parameter 2; the raw values is in the range of 0-65535
    -   FP3CurrentPositionRaw - Raw position value of the functional parameter 3; the raw values is in the range of 0-65535
    -   FP4CurrentPositionRaw - Raw position value of the functional parameter 4; the raw values is in the range of 0-65535
    -   category - Name of the category, e.g. Window Opener, Roller Shutter
    -   currentPosition - current position of the product in percent;
        usually, 0% means window closed, roller shutter up, lights out etc.
        Based on the raw value and the product category the value is calculated
        accordingly.
    -   currentPositionRaw - Current position of the product as raw value
    -   nodeVariation - Defines the special kind of window like top hung, kip, flat roof, sky light
    -   order - Custom sort order, can be used to sort the products in visualisations. This state is writable.
    -   placement - Room or house group number. Change this to put the product
        in another room. This state is writable.
    -   powerSaveMode - Kind of power save mode of the product.
    -   productType - Type of the product. The numbers are not documented, thus
        the adapter shows the raw numbers.
    -   remainingTime - Remaining time of the current operation of the product in
        seconds. Currently, this is only updated at the beginning and at the end
        of a products movement.
    -   runStatus - Execution status, possible values are ExecutionCompleted, ExecutionFailed or ExecutionActive.
    -   serialNumber - Serial number of the product.
    -   state - The operating state of the product. Can have the following values: NonExecuting, Error, WaitingForPower, Executing, Done, Unknown
    -   statusReply - If the runStatus of an execution command has failed this
        state contains the reason.
    -   stop - Set this state to true to stop a running operation. This state is
        writable, only.
    -   subType - Depending on the category the sub type defines special kinds or
        capabilities, e.g. for a window a '1' means that the window has a rain sensor.
    -   targetPosition - Set this state to a value between 0% and 100% to move a
        window or to dim a light. This state is writable.
    -   targetPositionRaw - This state reflects the target position converted to a
        raw value.
    -   timestamp - Timestamp of the last known position in local time.
    -   typeID - Type of the product, e.g. window, light, roller shutter.
    -   velocity - Velocity at which the product operates. The velocity depends on
        the physical capabilites of the product, e.g. a window can move in silend mode or in fast mode, lights may dim at different velocities, but there may
        be other products which change their position only with a fixed speed.
    -   wink - Set this state to true to let the product wink. This is used to
        identify a device, e.g. a window will move its handle, a roller shutter
        will move up and down a little bit. This state is writable, only.

#### Scenes

-   scenesFound - Number of scenes found in the interface
-   0..n - Channel for each scene
    -   productsCount - Number of products that are controlled through this scene
    -   run - Set this state to true to run the scene. If a scene is running this state is set to true.
    -   stop - Set this state to stop a running scene. This state is writable, only.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
<!-- prettier-ignore -->
### 1.0.1 (2020-07-20)

-   (Michael Schroeder) Fix [#49](https://github.com/MiSchroe/ioBroker.klf200/issues/49) Set multiple states at once, e.g. in Blockly

### 1.0.0

-   (Michael Schroeder) Support of firmware 2.0.0.71

### 0.9.5

-   (Michael Schroeder) Bug fixes

### 0.9.4

-   (Michael Schroeder) Compatible to Admin 3, add documentation

### 0.9.0

-   (Michael Schroeder) Initial public beta release

### 0.0.1

-   (Michael Schroeder) Initial developer release

## License

The MIT License (MIT)

Copyright (c) 2018-2020 Michael Schroeder <klf200@gmx.de>

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

---

VELUX and the VELUX logo are registered trademarks of VKR Holding A/S.
