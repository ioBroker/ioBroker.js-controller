---
BADGE-Number of Installations: http://iobroker.live/badges/klf200-stable.svg
BADGE-Travis CI: https://travis-ci.org/MiSchroe/ioBroker.klf200.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/t28nlps5c99jy5v7/branch/master?svg=true
BADGE-GitHub issues: https://img.shields.io/github/issues/MiSchroe/ioBroker.klf200.svg
BADGE-GitHub license: https://img.shields.io/github/license/MiSchroe/ioBroker.klf200.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.klf200.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.klf200.svg
BADGE-NPM: https://nodei.co/npm/iobroker.klf200.png?downloads=true
---
# KLF-200 adapter documentation

This adapter is for controlling a VELUX® KLF-200 interface. This adapter is neither an official VELUX product nor is it supported by the company that owns the VELUX products.

The main intention of this adapter is to control electric roof windows and/or electric blinds or roller shutters. Though the KLF-200 interface is able to connect to further devices like lights, switches, canvas blinds etc. I haven't developed the adapter for use with these kind of devices. Thus, it could be possible, that these devices could be controlled by this adapter, too.

The adapter works with the internal REST API of the KLF-200 interface and you don't need to wire the inputs and outputs of the box, though it's still possible to use them in parallel.

----------------------------------------------------------------------------------------------------------------

## Prepare your KLF-200 interface

To use this adapter you have to setup your KLF-200 box in the **interface mode**. It doesn't work if you use your box as a repeater.

> For a detailed explanation of how to accomplish the following tasks please read the manuals that came with your box.
>
> It is assumed that you have successfully logged into your box in a web browser.


### Setup products

Each product that you want to control by this adapter has to be registered on the "My products" page. You can register new products either by
- Copy from another remote control
- Search for products

If all of your products are registered you should see a list like the following:

![Screenshot of "My products" of the KLF-200 interface](img/ProductList.PNG)


### Setup scenes

To record a scene you have to click on the button

![Record program button](img/RecordProgramButton.PNG)

This will open the *Recording in progress* window. Now, use your remote control that comes with your product to change something, e.g. open the window to 40%. Then type in a name for the program and click on *Save program*.

![Screenshot of Recording in progress](img/RecordingInProgress.PNG)

> HINT:
> * Name your program after product and opening level, e.g. Window bathroom 40%, though the adapter doesn't use any naming conventions.
> * If your window is closed start with an opening level of 100% and go down with each subsequent program until you reach 0%.
> * You have a maximum of 32 programs you can save in the box. Therefore, plan your number of steps as there is no real difference in a window opened 30% or 40%.

If you have finished recording programs you will end with a list like the following:

![Screenshot of the program list](img/ProgramList.PNG)


### Setup connections

This last step is optional. If you don't use the input and output wires you may have noticed that the tiny LED on the box is flashing all the time. To get rid of the annoying flashing you have to setup at least one connection.

You only have to set it up in the box you don't need to wire anything! Just choose anything you like.

----------------------------------------------------------------------------------------------------------------

## Configure the adapter

![Screenshot of the adapter configuration](img/AdapterConfiguration.PNG)

### Host

Host name of your KLF-200 interface. This is the same you type into the address bar of your web browser to connect to your box.

### Password

The password you need to connect to your KLF-200 interface. It's the same you use when connecting to your box in your web browser.

> The default password of the KLF-200 is `velux123`, but you should have changed it, anyway!

### Polling interval in minutes

<span style="color: #ff0000">**_This option is planned for a future release. If you want to reload the configuratio you have to restart the adapter._**</span>

The number of minutes after which the adapter reloads the configuration from the KLF-200 interface again.

----------------------------------------------------------------------------------------------------------------

## Use the adapter

After the adapter has read the meta data from the KLF-200 interface you will find the following states in the object tree:

Device   | Channel | State         | Data type        | Description
---------|---------|---------------|------------------|------------------------------------------------------
products |         |               |                  | Has a sub-entry for each product found in the product list of the KLF-200.
products |         | productsFound | value            | The number of products in the list. Read-only.
products | 0..n    | category      | text             | Category of the product. Read-only.
products | 0..n    | level         | level            | Current level of the product. Set to run the corresponding scene. Read/write.
products | 0..n    | scenesCount   | value            | Number of scenes in which the product is used. Read-only.
scenes   |         |               |                  | Has a sub-entry for each scene found in the program list of the KLF-200.
scenes   |         | scenesFound   | value            | The number of scenes in the list. Read-only.
scenes   | 0..n    | productsCount | value            | Number of products in this scene. Read-only.
scenes   | 0..n    | run           | button.play      | Indicates if the scene is running. Set to run the scene. Read/write.
scenes   | 0..n    | silent        | indicator.silent | Indicates if the scene is run in silent mode (if supported by the products of the scene). Read-only.

> **IMPORTANT:**
>
> The IDs that are used in the channels are the IDs coming from the KLF-200 interface. If you make changes at the products list or at the program list in your KLF-200 the IDs may change.

To run a scene you can either set the `run` state of the scene to `true` or you can set the `level` state of the product to a value that corresponds to a scene that sets the product to that level.

### Example

Assuming your bathroom window is channel `0`. You have a scene on Channel `10` that opens the bathroom window at 40%.

````javascript
// Variant 1: Open the bathroom window at 40% using the scenes run state:
setState('klf200.0.scenes.10.run', true);
/* 
    The following will happen:
    1. Your window will start to move to 40% opening level.
    2. After your window has stopped, klf200.0.scenes.10.run will be set to 'false' again.
    3. klf200.0.products.0.level will be set to 40%.
*/

// Variant 2: Open the bathroom window at 40% using the products level state:
setState('klf200.0.products.0.level', 40);
/*
    The following will happen:
    1. Your window will start to move to 40% opening level.
    2. klf200.0.scenes.10.run will be set to true.
    3. After your window has stopped, klf200.0.scenes.10.run will be set to 'false' again.
*/

// What happens, if we don't have a scene for that level?
setState('klf200.0.products.0.level', 41);
/*
    The following will happen:
    1. Your window won't move at all!
    2. klf200.0.products.0.level will be reset to the previous value, e.g. 40
*/

````


----------------------------------------------------------------------------------------------------------------

## Known limitations

The adapter controls the KLF-200 using the internal REST API that is used by the web interface of the box. Though we use only a subset of the API there are some restrictions:

* The adapter can't read the current opening level of a window. If you control it with your remote control or it will be closed due to rain the adapter doesn't know about it and it will still show the last known value.
* The KLF-200 interface is limited to a maximum of 32 scenes.
* The adapter doesn't know, when an action has finished. The running state will stay `true` for at least 30 seconds.
* Don't run scenes to fast after each other. The KLF-200 may throw errors. (You will find the errors in the log.)

----------------------------------------------------------------------------------------------------------------

VELUX and the VELUX logo are registered trademarks of VKR Holding A/S.

## Changelog

#### 0.9.5
* (Michael Schroeder) Bug fixes

#### 0.9.4
* (Michael Schroeder) Compatible to Admin 3, add documentation

#### 0.9.0
* (Michael Schroeder) Initial public beta release

#### 0.0.1
* (Michael Schroeder) Initial developer release

## License
The MIT License (MIT)

Copyright (c) 2018 Michael Schroeder <klf200@gmx.de>

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

------------------------------------------------------------------------------

VELUX and the VELUX logo are registered trademarks of VKR Holding A/S.