---
BADGE-Number of Installations: http://iobroker.live/badges/klf200-stable.svg
BADGE-Travis CI: https://travis-ci.org/MiSchroe/ioBroker.klf200.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/t28nlps5c99jy5v7/branch/master?svg=true
BADGE-GitHub issues: https://img.shields.io/github/issues/MiSchroe/ioBroker.klf200.svg
BADGE-GitHub license: https://img.shields.io/github/license/MiSchroe/ioBroker.klf200.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.klf200.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.klf200.svg
BADGE-NPM: https://nodei.co/npm/iobroker.klf200.png?downloads=true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.klf200/README.md
title: KLF-200 adapter documentation
hash: Ju0Pch23b2A9SxISJePGcq8iK7w8OF/BBWi9nSZbzys=
---
# KLF-200 adapter documentation
This adapter is used to control a VELUX® KLF-200 interface. This adapter is neither an official VELUX product nor is it supported by the company that owns the VELUX products.

The main purpose of this adapter is the control of electric skylights and / or electric blinds or shutters.
However, the KLF-200 interface is able to connect other devices such as lamps, switches, blinds, etc.
I did not design the adapter for use with these devices. So it could be possible that these devices can also be controlled by this adapter.

The adapter uses the internal REST API of the KLF-200 interface and you do not need to connect the inputs and outputs, although it is still possible to use them in parallel.

---

## Prepare your KLF-200 interface
To use this adapter, you must set up your KLF-200 box in **interface mode** It does not work if you use your box as a repeater.

> For a detailed explanation of the following tasks, please read the manuals provided with the box.
>> It is assumed that you have successfully logged into your box in a web browser.

### Products
Any product you want to control with this adapter must be registered on the My Products page.
You can register new products either by

- Copy from another remote
- Search for products

When all your products are registered, you should see a list like the following:

![Screenshot of "My products" of the KLF-200 interface](../../../de/adapterref/iobroker.klf200/img/ProductList.PNG)

### Set up scenes
To record a scene, click the button

![Record program button](../../../de/adapterref/iobroker.klf200/img/RecordProgramButton.PNG)

This will open the *program preparation in progress* window. Now use the remote control provided with your product to change something, e.g. open the window to 40%. Then enter a name for the program and click *Save Program*

![Screenshot of Recording in progress](../../../de/adapterref/iobroker.klf200/img/RecordingInProgress.PNG)

> TIP:> - Name your program by product and opening level, for example window bathroom 40%. However, the adapter does not use naming conventions.
> - If your window is closed, start with 100% opening and continue down with each additional program until you reach 0%.
> - You have a maximum of 32 programs that you can store in the box. Therefore, plan your number of steps as there is no real difference between a 30% or 40% open window.

When you're done recording programs, you'll get a list like this:

![Screenshot of the program list](../../../de/adapterref/iobroker.klf200/img/ProgramList.PNG)

### Establish connections
This last step is optional. If you are not using the input and output lines, you may have noticed that the small LED on the box is constantly flashing. To get rid of the annoying flashing, you need to set up at least one connection.

You just have to set it up in the box, you do not have to wire anything! Just pick something.

---

## Configure the adapter
![Screenshot of the adapter configuration](../../../de/adapterref/iobroker.klf200/img/AdapterConfiguration.PNG)

### Host
Host name of your KLF-200 interface. This is the same address you enter in the address bar of your web browser to connect to your box.

### Password
The password you need to connect to your KLF-200 interface. It's the same thing you use when connecting in your web browser.

> The default password of the KLF-200 is `velux123`, but you should have changed it anyway!

### Query frequency in minutes
<span style="color: #ff0000"><strong><em>This option is planned for a future release. If you want to reload the configuration, you must restart the adapter.</em></strong></span>

The number of minutes after which the adapter reloads the configuration from the KLF-200 interface.

---

## Using the adapter
After the adapter has read the metadata from the KLF-200 interface, you will find the following states in the object tree:

Device | Channel | State | Data type | Description --- | --- | --- | --- | --- products | | | | Has a subentry for each product in the product list of the KLF-200.
products | | productsFound | value | The number of products in the list. Read-only.
products | 0..n | category | text | Product category. Read-only.
products | 0..n | level | level | Current state of the product Set this value for the corresponding scene to be executed. Read Write.
products | 0..n | scenesCount | value | Number of scenes in which the product is used. Read-only.
scenes | | | | Has a subentry for each product in the product list of the KLF-200.
scenes | | scenesFound | value | The number of scenes in the list. Read-only.
scenes | 0..n | productsCount | value | Number of products in this scene. Read-only.
scenes | 0..n | run | button.play | Indicates if the scene is running. Set this value to run the scene. Read Write.
scenes | 0..n | silent | indicator.silent | Indicates whether the scene is running in quiet mode (if supported by the products in the scene). Read-only.

> **IMPORTANT:** > The IDs used in the channels are the IDs coming from the KLF-200 interface. If you make changes to the product list or program list in your KLF-200, the IDs may change.

To execute a scene, you can set the status `run` of the scene to `true` or set the status `level` of the product to a value that corresponds to a scene that sets the product to this level ,

### Example
Suppose your bathroom window is on channel `0`. You have a scene on channel `10` that opens the bathroom window to 40%.

```javascript
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

```

---

## Known restrictions
The adapter controls the KLF-200 using the internal REST API, which is used by the Web interface of the box.
Although we use only a subset of the API, there are some limitations:

- The adapter can not read the current opening degree of a window. If you control it with your remote control or it closes due to rain, the adapter will not know about it and will still display the last known value.
- The KLF-200 interface is limited to a maximum of 32 scenes.
- The adapter does not know when an action ended. The state stays true for at least 30 seconds.
- Do not perform scenes too fast in a row. The KLF-200 can then report errors. (You can find the errors in the log.)

---

VELUX and the VELUX logo are registered trademarks of VKR Holding A / S.

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