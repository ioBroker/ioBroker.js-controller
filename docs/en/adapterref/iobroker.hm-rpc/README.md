---
lastChanged: 09.01.2019
translatedFrom: de
editLink: https://github.com/ioBroker/ioBroker.docs/edit/engine/docs/en/adapterref/iobroker.hm-rpc/README.md
title: HomeMatic RPC
hash: wV1fZqfAh9EFOGCer+o8MlBv4xZrmQCVgr3iaDdqH28=
---
! [] (Media / homematic.png)

# HomeMatic RPC

## Homematic

> Homematic is a smart home system from eQ-3 that provides comprehensive control
different functions using scenarios (from simple to complex)
in house or apartment allows.

&gt; The devices include products for light, roller shutter and heating control, hazard detectors, safety sensors and weather data measurement products. Radio communication simplifies retrofitting. In new buildings wire bus components can be used. <a href="https://www.eq-3.de/produkte/homematic.html" title="Homepage of the manufacturer eQ3">source</a>

## Administration and control of homematic components with ioBroker

To optimally manage and control homematic components with ioBroker
if two adapters are needed:

### 1. Homematic ReGaHss

This adapter connects to the homematic logic layer "ReGaHSS"
(** Re ** presidential ** gateway) ago.
It synchronizes clear names, system variables, rooms, trades and programs
between Homematic and ioBroker.

### 2. Homematic RPC

The ** R ** emote ** P ** rocedur ** C ** all, short RPC is a technique for the realization
of interprocess communication. This adapter provides the connection to the
Communication modules of a homematic center (CCU / CCU2 / CCU3 ...). It will be the
Modules rfd (wireless), HMIP-rfd, hs485d (wired), CuxD (additional software for connection
external components like EnOcean, FS20 etc.) and Homegear (CCU replacement)
supported.

This diagram illustrates the structure and communication interfaces:

! [] (Media / Homematic_Aufbau.png)

[Source] (http://www.wikimatic.de/wiki/Datei:Homematic_Aufbau.png)

## Adapter Homematic RPC

This adapter provides the connection to the communication modules of a
Homematic center (CCU / CCU2 / CCU3 ...). An instance of
Adapter is responsible for exactly one module (rfd, wired, etc.). Shall have multiple modules
supported in parallel, must have a separate instance for each module
be installed.

The communication of the adapter with the corresponding module takes place either
via BIN-RPC or XML-RPC. Because you work with an event interface,
the correct addressing is important. This is how events are automatically added to the
Adapter transmitted and a cyclic pollen is not necessary.

In addition, the adapter has the functionality to connect to the CCU
to monitor cyclically.

If new devices are taught in at the CCU, the adapter must be connected to the
Configuration "Initiate devices restart (once)". Thereby
The information from the new Homematic devices is transferred to the adapter.

## configuration

### Main Settings

### HomeMatic address

IP address of the CCU or host hosting the Homematic BidCos service
running.

### HomeMatic Port

The setting of the port depends on the required communication module
automatically entered when selecting the daemon and should only be changed
if the ports deviate from the standard.

By default, the following ports are provided:

| Communication module | Standard port | HTTPS port |
| --------------------- | -------------- | ------------ |
| Radios (RFD) | 2001 | 42001 |
| Wired | 2000 | 42000 |
| CUxD | 8701 | \ - |
| Homematic IP | 2010 | 42010 |

### daemon

CCU / Homematic supports different device types (wired, wireless, HMIP,
CUxD). For each type a separate instance must be created.

### Protocol

Two protocols are provided for communication: XML-RPC and
BIN-RPC.

`CUxD requires the BIN-RPC protocol; HMIP and RFD that
XML-RPC Protokoll.`

### Synchronize devices again (once)

When the adapter is started for the first time, all devices are read. Become later
Changes made within the CCU (renaming of devices, add
new devices, etc.), this selection must be activated and marked with "Save and
Close "to restart the adapter.

### Adapter Address

In the pull-down menu, the IP of the host is selected, on which the adapter
is installed. The selection of "0.0.0.0. listen to all IPs "and" 127.0.0.1 "
is reserved for special cases.

### Adapter Port

By default, this port is "0" for automatic selection of the
ioBroker ports and should only be changed in exceptional cases.

## Additional settings

### Adapter Callback Address

If ioBroker is running behind a router (for example, in a Docker container)
the input and output addresses differ. Here is the IP of the router
Registered, the problem can be avoided, because then the forwarding to
ioBroker is taken over by the router.

### connection check interval (sec)

At the specified interval, a ping request is sent to the CCU.

### reconnect interval (sec)

Time after which a new connection attempt is started.

### Do not delete devices

By default, devices are also removed from the object list when they are
within the CCU. To add these devices in the object list
For example, because they were only temporarily removed, this option may be retained
to be activated.

### Use HTTPS

If this option is activated, a secure connection is established.
Works only with XML-RPC protocol.

### username and password

When using HTTPS or if for the API of the CCU an authentication
is required, the data must be entered here.

## instance

! [Instance] (media / 10d34a2bc1518fa34233bdb04219e444.png)

Under * Instances * of the ioBrokers you will find the installed instance of the
Adapter. On the left is visualized in the traffic light system, if the adapter is activated and
connected to the CCU.

If you place the mouse pointer on a symbol, you will get detailed information.

## Objects of the adapter

In the Objects area, in a tree structure, all of the CCU's become the adapter
transmitted values and information shown.

What objects and values are displayed by the devices (function and
Channels) and the structure within the CCU.

The control center is marked with the ID BidCoS-RF (under which all virtual buttons are listed),
Devices are created under their serial number and groups with
INT000000 * x * denotes.

### channel 0 (all devices)

This channel is created for each device and contains function data, following a brief overview:

| * Data point * | * Meaning * |
| -------------------------------- | ---------------- ---------------------------------------- |
| AES_Key | Encrypted activation active / inactive |
| Config (Pending / Pending Alarm) | Pending configuration |
| Dutycycle / Dutycycle Alarm | Airtime Homematic Devices |
| RSSI (Device / Peer) | Radio strength (device \ <-> Central) |
| Low Bat / Low Bat Alarm | low battery charge |
| Sticky unreach / unreach alarm | System message communication error (fault occurred) |
| Unreach / unreach alarm | System message communication error (current state) |

### Channels 1-6

Here, measured values, control and status data are listed; depending on the function
The device displays different data. Below a short
Abstract:

| * Function * | * Channel * | * Possible values * |
| ------------------------- | --------- | ------------- ---------------------------------------------- |
| Sensors | 1 | Temperature, humidity, level, opening condition, etc. |
| Heating thermostats | 4 | Operating modes, setpoint / actual temperature, valve position, etc. |
| Actuators | 1 | Level (roller shutter, dimmer), running direction (roller blind), etc. |
| Devices with measuring function | 3 | Status |
| | 6 | Consumption meter, voltage, power, etc. |

## FAQ