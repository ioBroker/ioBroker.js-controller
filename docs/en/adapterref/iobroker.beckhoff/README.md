---
BADGE-Build Status: https://travis-ci.org/dkleber89/ioBroker.beckhoff.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/laebb0pq4pd4d08x/branch/master?svg=true
BADGE-npm: https://img.shields.io/npm/v/iobroker.beckhoff.svg
BADGE-Number of Installations: http://iobroker.live/badges/beckhoff-installed.svg
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.beckhoff/README.md
title: ioBroker.beckhoff
hash: S29NCZ8nEb3vlwEpYsnmZdwhh1H2xueGjmH9n6pgfAc=
---
![logo](../../../de/adapterref/iobroker.beckhoff/img/beckhoff.png)

# IoBroker.beckhoff
This ioBroker adapter implements communication with a Beckhof controller (Twincat 2 or 3) via the ADS protocol.
The ADS Protocol is implemented in every Beckhoff controller and can be used without a license.

This project has no connection with the company Beckhoff

## Description
### Conditions
* Beckhoff with network connection which hangs in a network reachable by the ioBroker
    * The controller must be assigned a fixed IP address
    * The controller must be pingable by the ioBroker
  * TwinCat 2 **except BC** (Required symbol information is not stored in the BC runtime environment) or TwinCat 3

### Configuration of the controller
1. In the project ADS must be activated. To do this, go to the task configuration in the control project and activate the checkbox `Create symbols`. Then download the configuration to the controller and restart it. A restart is only necessary if TwinCat 2 is used.

    ![create symbols](../../../de/adapterref/iobroker.beckhoff/img/createSymbols.png)

2. A static route must be created in the controller. The route must match the ioBroker (IP address and AMS Net ID).

    Here's an example of what that might look like when the route is added directly to the controller. The route can also be added via the Engineer calculator.

    ![create symbols](../../../de/adapterref/iobroker.beckhoff/img/addRoute.png)

    Further information on the TwinCat Router and the controller in general can be found in [Beckhoff Information System](https://infosys.beckhoff.com/ "Beckhoff Information System").

3. For TwinCat 2, a structure must still be created in the controller. Then add the structure to a global variable table. All required variables can then be created here. The data exchange is then carried out independently by ADS and the adapter.

    ##### Currently supported data types: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL
    OPTIONAL: A variable can be created directly in the variable table without nesting with an exact name -> ioBrokerResync (case and data type does not matter) -> Each time this value changes, the variable table in the ioBroker is read in again.

3. For TwinCat 3, a global variable table must still be created in the controller. All required variables can then be created here. The data exchange is then carried out independently by ADS and the adapter.

    ##### Currently supported data types: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL
    OPTIONAL: A variable can be created directly in the variable table without nesting with an exact name -> ioBrokerResync (case and data type does not matter) -> Each time this value changes, the variable table in the ioBroker is read in again.

### Adapter Settings
1. Select runtime version
2. Enter the IP address and AMS Net ID destination.
3. For TwinCat 2, enter the instance name of the structure from the global variable table.
4. For TwinCat 3, enter the correct variable table name.
5. The remaining points usually do not need to be changed.

### Data exchange
* As soon as a variable in the control changes, this value is automatically transferred to the respective state in the ioBroker.
* If a value in the ioBroker is changed (Important: ACK must be FALSE !!) it is automatically transferred to the controller. If the value is accepted by the controller, ACK is set to TRUE.

### Important
1. The TwinCAT AMS router does not permit multiple TCP connections from the same host. If two instances are being set up by the same host to the same TwinCat router, the router automatically closes the first connection and only replies to the latest one.
2. The adapter automatically syncronizes all variables in ioBroker. There are several ways a resync can be triggered:
    * If the value of the Resyc variable changes (see [here] (# Configuration-of-Control))
    * If the controller is not in RUN mode longer than the Reconnect Interval -> then the variable table is resynchronized when the controller enters RUN mode.
    * When the project is loaded on the controller. Exception -> OnlineChange
    * When the adapter is restarted.
3. "Synchronization" or "reading in" does not mean the value exchange of the variables but rather the synchronization of the variables themselves and the creation or deletion of these in the ioBroker

## Changelog
### 1.0.0 (2019-03-23)
* (dkleber 89) Stable Release, Update Gulp, add new Translations

### 0.3.0 (2019-03-09)
* (Appollon77) Core Files/Testing Update and introduce adapter-core
* (dkleber89) Fix Problem 'write after End'

### 0.2.2 (2019-02-11)
* (dkleber89) DEBUG Version -> Still Problems with 'write after end'

### 0.2.1 (2018-12-30)
* (dkleber89) Add IE 11 and Mobile Support

### 0.2.0 (2018-11-24)
* (dkleber89) Code cleanup and second Beta Release

### 0.1.4 (2018-11-21)
* (dkleber89) Fixing Dataexchange on TwinCat 2 Runtime

### 0.1.3 (2018-11-11)
* (dkleber89) Bugfix on ending Processes

### 0.1.2 (2018-11-05)
* (dkleber89) Bugfix in Adapter Unload

### 0.1.1 (2018-11-04)
* (dkleber89) Bugfix in Connection handling

### 0.1.0 (2018-11-01)
* (dkleber89) First Beta Release

### 0.0.2 (2018-10-20)
* (dkleber89) Milestone Connection and Sync, no Release yet

### 0.0.1 (2018-08-17)
* (dkleber89) Development, no Release yet

## License
The MIT License (MIT)

Copyright (c) 2018-2019 dkleber89 <dkleber89@gmail.com>

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