---
translatedFrom: de
editLink: https://github.com/ioBroker/ioBroker.docs/edit/engine/docs/en/adapterref/iobroker.hm-rega/README.md
title: no title
hash: 343/MWkd4rVMjw6n3a8I0X0tdyV2WhOu8De3zmZDkZA=
---
! [] (Media / homematic.png)
HomeMatic ReGaHSS
=================

| Status of the documentary | 08.01.2019 | | ------------------------- | ----------------------- ------------------------------- | | Developer | Pmant | | License | MIT | | Category | ioT Systems | | Keywords | Homematic, home automation, home automation, | | Dependencies | Adapter <a href="https://github.com/ioBroker/ioBroker.docs/tree/master/docs/adapterref/docs/iobroker.hm-rpc/de" title="Documentation adapter hm-rpc">hm-rpc</a> |

HomeMatic
---------

> Homematic is eQ-3's Smart Home System, which provides comprehensive control
different functions using scenarios (from simple to complex)
in house or apartment allows.

> The devices include products for lighting, roller shutter and heating control,
Hazard detectors, safety sensors and weather data measurement products. The
Radio communication simplifies retrofitting. In new buildings can
Wire bus components are used.

<a href="https://www.eq-3.de/produkte/homematic.html" title="Homepage of the manufacturer eQ3">Source:</a>

Adapter Homematic ReGaHss
-------------------------

This adapter connects to the homematic logic layer "ReGaHSS" (** Re ** sidential ** Gateway).
It synchronizes clear names, system variables, rooms, trades and programs
between Homematic and ioBroker.

If several control panels are to be integrated in ioBroker, then for each
Central to install and configure its own instance.

Installing ReGaHSS also installs an instance of the <a href="https://github.com/ioBroker/ioBroker.docs/tree/master/docs/adapterref/docs/iobroker.hm-rpc/de" title="Documentation adapter hm-rpc">hm-rpc</a> adapter, which should be pre-configured and enabled.

An instance of this adapter can hold up to 5 different instances of the
Manage Homematic RPC adapters that provide various services
(each service requires its own RPC instance):

- rfd (CCU service for standard components)

- hs485d (Wired) (for wire bus components)

- CuxD (additional software for providing a universal interface)

- Homematic IP (IP-based components)

- Virtual Devices

### Requirements before installation

- Homematic Gateway (CCU / CCU2 / CCU3 ...) * or *

- Radio module with suitable software (piVCCU (* x) *, RaspberryMatic or similar)

installation
------------

An instance of the adapter is installed via the ioBroker Admin interface.

When the installation is complete, it automatically opens
Configuration window.

Before the actual configuration should be the (along with this adapter
created instance of the HM-RPC adapter or, if required, further HM-RPC instances
created and configured.

configuration
-------------

! [] (media / 01c7dbc4da0240421b0711b331971d2d.png) <span style="color:grey">* Selection menu above *</span>

In the upper selection menu, three different areas can be selected:

### area main settings

! [] (media / 3e0325b2bf61e508e131f8792e2c004d.png) <span style="color:grey">* Main</span> Settings <span style="color:grey">*</span>

The basic settings are made in this area.

In the pull-down menu, the IP address of the CCU can be selected; also the
Reconnection interval (default 30 sec) can be adjusted by the user.

! [] (media / ce181cdbb3b8979e1233b57a4588cf1d.png) <span style="color:grey">* Assignment of RPC instances *</span>

Then the required services are activated and with the appropriate
HM-RPC instance linked.

polling

When activated, the RegaHSS data is polled periodically by the CCU,
which depends on the seconds set in the field Intervals. The
Interval should not be set too low as too frequent
Queries can cause the CCU to crash.

trigger

To minimize the active queries from ioBroker to the RegaHSS, the
CCU within a program also pushes the data on change.
For this a virtual key of the CCU can be used, which in one
CCU program is triggered. By default, this is the key
BidCosRF.50.PRESS_SHORT (see sample program).

### area Synchronize

Here the user can specify what information from the CCU in ioBroker
be taken over. There will then be the corresponding objects and data points in
ioBroker created.

- DutyCycle: Activates the specification of the duty cycle (in%)

- Variables: Activates the transfer of system variables from the CCU

- Programs: Activates the transfer of program names from the CCU

- Names: Activates the transfer of the plaintext names of the data points from the CCU

- Favorites: Activates the acquisition and listing of favorites

- Rooms: Activates the takeover of the rooms and a listing of them

- Trades: Activates the acquisition of the trades and a listing of the same

### Additional Settings area

Here the user can decide whether https (encrypted and secure
Connection) should be used. When activated, the input of the
Username and password required

Once all settings have been made, the configuration page is displayed with the command
Completed "save and close" (button below the
Adjustment range). The adapter is closed and the instance with the
new values started.

### instance

! [] (media / 44785b82964bcdc198565b1681787dc0.png) <span style="color:grey">* instance and signal *</span>

In the area * Instances * of the ioBroker you can now find the created (s)
Instance (s). On the left is visualized in the traffic light system, if the adapter is activated
or connected to the CCU.

If you place the mouse pointer on a symbol, you will get detailed information.

### Objects of the adapter

In the Objects area, all of the adapter from the CCU is in a tree structure
transmitted values and information shown.

Since the objects are user-specific, only the general and for
all users have the same objects displayed.

! [] (media / c24d8382beda4c970093097959080524.png) <span style="color:grey">* folder structure *</span>

The first folders are the programs contained in the CCU.

CCU and info folders contain the basic information of the gateway incl.
percentage of the duty cycle (if activated).

Finally, the variables created in the CCU are listed

### FAQ