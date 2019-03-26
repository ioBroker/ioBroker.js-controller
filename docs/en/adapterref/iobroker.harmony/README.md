---
lastChanged: 20.07.2018
local: true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.harmony/README.md
title: Logitech Harmony
hash: aGutf+nqKKk59Zci67BUBICmxdGGXNhuY0ktt6U10HI=
---
![Harmony](../../../de/adapterref/iobroker.harmony/media/harmony.png)

# Logitech Harmony
The Logitech Harmony Adapter allows you to easily integrate one or more Logitech Harmony Hubs into an ioBroker system.

The Logitech Harmony Hub can control a variety of entertainment and smart home devices. With the ioBroker, activities can be started and stopped via the hub, the status of activities can be queried, and devices can be remotely controlled by virtual keystrokes.

![Harmony Hub](../../../de/adapterref/iobroker.harmony/media/harmony_850.jpg "Logitech Harmony Hub with Harmony Elite remote control")

## Overview
### Logitech Harmony
Logitech Harmony is compatible with more than 270,000 entertainment and smart home devices. These include TVs and cable boxes, disc players and game consoles, AV receivers and streaming media players, as well as smart lighting, locks, thermostats and more.

With Logitech Harmony you can switch programs, adjust the volume, set favorites, and control lighting and other smart devices. The highlight of the system is the creation of actions to control multiple devices with the push of a button.

1. The Logitech Harmony Hub connects to the home network via Wi-Fi.
2. Harmony hubs do not have an Ethernet port.
3. The hub supports only the WLAN 2.4 GHz frequency band. The 5 GHz frequency band will be

   unsupported.

4. An 802.11 g / n router should be used. 802.11 a / b is not supported.
5. WEP 64/128, WPA Personal and WEP are used as encryption for the WLAN

   WPA2-AES supported.

6. UPnP does not need to be enabled for Harmony for the Harmony app to do

Recognize Hub and communicate with him. On the other hand, it must be enabled for the hub to discover and work with other devices on the network.
This applies, for example, to devices such as Philips hue, Sonos, Nest, Roku or Smart TVs.

7. The maximum number of devices per stroke is 8 devices. 15 devices are possible if as

   Remote at least one Harmony Touch or Ultimate one is registered at the hub.

8. The maximum number of preferred channels is 50 per mobile device.

### Logitech Harmony adapter
The Logitech Harmony adapter automatically finds all Logitech Harmony hubs that are on the same network subnet over a Wi-Fi connection to the ioBroker server.

Objects for triggering functions and activities (= command macros) are automatically created by the adapter in the ioBroker. The current status of the hub is also available. By specifying or reading the objects created, their status can be changed and thus actions can be triggered or queried.

## Prerequisites before installation
The ioBroker adapter for the Logitech Harmony system does not allow you to create or modify devices or activities. Therefore, before using the adapter, it is necessary to set up the remote control system as described in the Logitech manual and to work with the controlled devices.

## Installation
An instance of the adapter is installed via the ioBroker Admin interface. The detailed instructions for the necessary installation steps can be found **here**

After completing the installation of an adapter instance, a configuration window opens automatically.

## Configuration
The adapter automatically finds all Harmony hubs that are in the subnet of the ioBroker server.

### "Logitech Harmony adapter settings" window
![Admin](../../../de/adapterref/iobroker.harmony/media/a_harmony_admin_settings.png "Admin interface")

| Field | Description |
|:-------------|:-------------|
| **Hub User** | In case the access to the Harmony Hub configuration is provided with a user and a password, the user name must be entered here. It is case-sensitive. |
| **Hub Password** | In case the access to the Harmony Hub configuration is provided with a user and password, the password must be entered here. It is case-sensitive. |

The two fields need only be completed if the hub is secured with a username and password.

After completing the configuration, the configuration dialog is quit with `SPEICHERN UND SCHLIEßEN`. This will result in a subsequent restart of the adapter.

## Instances
The installation of the adapter has created an active instance of the Logitech Harmony Hub Adapter in the section `Objekte`.

![instance](../../../de/adapterref/iobroker.harmony/media/a_harmony_instanz.png "First instance")

On an ioBroker server, only one instance of the Logitech Harmony adapter can be installed.

Whether the adapter is enabled or connected to the Logitech Harmony Hub is indicated by the color of the instance's Status field. If the mouse pointer points to the symbol, further detailed information is displayed.

## Objects of the adapter
In the section `Objekte`, all devices and activities recognized by the adapter in the hub are listed in a tree structure. In addition, information is also provided as to whether the communication with the hub takes place smoothly.

![objects](../../../de/adapterref/iobroker.harmony/media/a_harmony_objekte.png "Objects of the Harmony adapter")

Each data point is associated with its associated data type and permissions.
Permissions can be read (R) as well as write (W). Each data point can at least be read (R) while others can also be described. To find a specific data point, the search is recommended using the key combination "CTRL + F".

| Object | Access | Bescheibung |
|------|-------|-----------|
| **harmony.0** | R | Name of the first *instance* of the Logitech Harmony adapter |
| & #; **Harmony Hub** | R | Name of *Hub* |
| & mp; **Apple TV Generation 3** | R | Name of *device* contains device functions |
| &emsp; **** Denon AV Receiver** | R | Name of *device* contains device functions |
| &emsp; &emsp; **** | R | Other *devices* |
| &emsp; &emsp; **activities** | R | List of all *activities* | programmed in the Harmony Hub
| &emsp; &emsp; ***hubBlocked*** | R | Indicates if the hub is busy |
| &emsp; &emsp; ***hubConnected*** | R | Status of the connection between adapter and hub |

### Device functions
If you open a device, you will get a list with all the functions belonging to the device. These device functions are device-specific and therefore differ in devices of different types.

![device](../../../de/adapterref/iobroker.harmony/media/a_harmony_geraet.png "device functions")

#### Triggering a device function
Each device function `{Instanz}.{Hub Name}.{Gerät}.{Gerätefunktion}` triggers a corresponding reaction of the addressed device. The values of device functions can be read and written. The triggering can be tested by using the mouse pointer to activate the bell on the right of the function. Alternatively, you can also enter a value there with the pencil symbol.
Values have the unit `Millisekunden`. If you enter a value between 1 and 250ms, the Harmony Hub usually outputs a single key press of the specified length. Values greater than 250ms may cause the device to operate multiple times.
After triggering the device function, the value changes back to 0.

### Activities
Below `activities` all activities programmed on the Harmony Hub are listed.

![activities](../../../de/adapterref/iobroker.harmony/media/a_harmony_activities.png "activities")

#### Starting an activity
Activities are started if you enter a number greater than 0 for an activity `{Instanz}.{Hub Name}.activities.{Aktivität}`.
During the execution of the activity, this value first changes to 1 (= starting) and then to 2 (= active).

#### Ending an activity
Running activities can be stopped by setting their value to 0.
Alternatively, you can enter any number to terminate an activity in the object `{Instanz}.{Hub Name}.activities.currentStatus`.
During the termination of the activity `{Instanz}.{Hub Name}.activities.currentStatus` changes from 3 (= terminating) to 0 (= inactive).

#### Other status values
`{Instanz}.{Hub Name}.activities.currentActivity` returns the currently running activity as a string.

`{Instanz}.{Hub Name}.activities.currentStatus` indicates the status of the Harmony Hub. The values mean

- 0 = inactive
- 1 = starting
- 2 = active
- 3 = finishing

`{Instanz}.{Hub Name}.activities.{Aktivität}` indicates the status of an activity.
The meaning of the values is analogous to `{Instanz}.{Hub Name}.activities.currentStatus`.

## Deinstallation
> T: I think a standard installation of an adapter in a central article is documented in detail. The adapter will (always) refer to this central article. Only deviations from the standard procedure are documented here.

If the instance is to be removed again, it will be removed via the assigned trashcan icon in the Instances column

![Delete](../../../de/adapterref/iobroker.harmony/media/adapter_harmony_delete_01.png)

A confirmation prompt appears, which must be confirmed with ***OK***

![delete2](../../../de/adapterref/iobroker.harmony/media/adapter_harmony_delete_02.png)

Then, a window will appear again showing the processing of the uninstall commands

![Delete3](../../../de/adapterref/iobroker.harmony/media/adapter_harmony_delete_03.png)

This uninstall removes all objects belonging to the instance completely.

If the installation files are completely deleted from the host, this must be done via the trash can icon in the tile of the Harmony adapter in the section Adapters.

## Particularities
backup

multihost

History

performance

## FAQ
!> Search the forum for frequently asked questions and give a reference answer here

1. **The connection to the hub is interrupted again and again.**

The Harmony Hub requires excellent wireless communication to communicate with the adapter. Using a wireless LAN access point in close proximity to the hub is recommended.

2. **How to implement the button "alles aus" via ioBroker?**

   Set `{Instanz}.{Hub Name}.activities.currentStatus` to 0.

3. ** Under Windows, the message appears when installing the adapter

   `ERR! code ENOGIT` and the adapter does not work. **

Before installing the Harmony adapter, download and install GIT from the website https://git-scm.com/download/win.

4. ** Under Linux, the message appears when installing the adapter

   `ERR! code ENOGIT` and the adapter does not work. **

Install GIT using the command line and `sudo apt install git` before installing the Harmony adapter.

6. **Scripts no longer work with newer versions of the adapter.**

Starting with version 0.9.1 of the adapter, objects are named differently. From old `harmony.0.Harmony_Hub` was e.g. new `harmony.0.Harmony Hub`. Please check the objects and add components to them, e.g. Customize scripts.

7. ** Wi-Fi is automatically disabled at night. The adapter adjusts to the

   Restarting the WLAN does not automatically connect to the HUB. **

Insert an automatic restart of the harmony instance (expert mode) about 5-10 minutes after the WiFi router startup.

8. **The HUB is not found.**

Check if the hub is really the same network subnet and VLAN as the ioBroker server. Are multicasts allowed or are they filtered by the router? Is the status LED on the hub lit green? Is the hub accessible via the Logitech app? Follow Logitech's instructions to resolve connectivity issues.

9. **Only one instance of the adapter can be installed.**

On an ioBroker server, only one instance of the Logitech Harmony adapter can be installed.

## Examples
### JavaScript
Trigger device functions. Here, the Denon AV receiver is turned on or off when the value of another data point changes.

```
if (getState("hm-rpc.0.MEQ01234567.2.STATE").val == true) {
  setState("harmony.0.Harmony Hub.Denon AV-Empfänger.PowerOn"/*Denon AV-Empfänger:PowerOn*/, '1', true);
  // Bei Kontrolle Schalter == AN keine Verzögerung Schalter
} else if (getState("hm-rpc.0.MEQ01234567.2.STATE").val == false) {
  // Bei Kontrolle Schalter == AUS schalte mit Verzögerung
  var timeout = setTimeout(function () {
    setState("harmony.0.Harmony Hub.Denon AV-Empfänger.PowerOn"/*Denon AV-Empfängerr:PowerOn*/, '1', true);
  }, 1000);
}
```

### Blockly
Trigger device functions. Here, the Denon AV receiver is turned on or off when the value of another data point changes.

![Blockly](../../../de/adapterref/iobroker.harmony/media/a_hamony_simple_blockly.jpg "Blockly")

[source](media/a_harmony_blockly.xml)

### Node-Red
> associated node-red elements

> Examples

> Exports for reuse

### Vis
> associated vis elements

> Examples

> Exports for reuse

> Code Fragments

## Left
> References to other documents in the ioBroker portal

> Web links, e.g. to the manufacturer

> GitHub links

* Manufacturer side [https://www.logitech.com/de-de/product/harmony-hub](https://www.logitech.com/de-de/product/harmony-hub)

## Changelog
### 1.2.2 (2019-03-11)
* (foxriver76) reduce discover interval and only log newly discovered hubs

### 1.2.1 (2019-02-21)
* (foxriver76) use at least 1.0.5 of harmonyhubws 

### 1.2.0 (2019-01-06)
* (foxriver76) compact mode compatibility added

### 1.1.5 (2018-12-28)
* (Pmant) fix hold key (for values > 250ms)

### 1.1.4 (2018-12-25)
* (Pmant) fix single key presses 

### 1.1.2
* (Pmant) reduce log spam
* (Pmant) fix multiple instances of one hub

### 1.1.1
* (Pmant) switch to api module

### 1.1.0
* (Pmant) switch to websocket client

### 1.0.0
* (foxriver76) replace blanks by underscores
* (foxriver76) minor readme adjustments
* (foxriver76) discover interval 1000 ms by default again

### 0.10.2
* (foxriver76) added discover interval and port to code
* (foxriver76) discover interval is now 300 ms instead of 1000 ms

### 0.10.0
* (foxriver76) added possibility to specify subnet for discovery
* (foxriver76) fix translations
* (foxriver76) Logging improved
* (foxriver76) materialized index.html for admin v3
* (foxriver76) make sure callback in unload is called

### 0.9.6
* (foxriver76) updating code to es6
* (foxriver76) using maintained harmony libs for discover and client
* (foxriver76) possibility to only add whitelisted hubs
* (foxriver76) MAX_CLIENTS = 6 error fixed
* (foxriver76) enhanced logging
* (foxriver76) changes for new libs

### 0.9.3
* (justr1) fix error with hubname

### 0.9.1
please delete all harmony.x objects once
* (Pmant) fix problematic chars

### 0.7.0
* (Pmant) support multiple hubs
* (Pmant) removed hub config from admin
* (Pmant) find free Port for Hub-Discovery

### 0.6.2
* (Pmant) fix wrong port

### 0.6.1
* (Pmant) reduce logging

### 0.6.0
* (Pmant) fix admin in firefox
* (Pmant) improve connection stability (needs testing)

### 0.5.6
* (PArns) update harmony lib
* (PArns) removed unneeded functions due to lib update
* (Pmant) fix bug with blocked state

### 0.5.5
* (Pmant) fix hub lifecycle

### 0.5.4
* (Pmant) fix node 5.0.0

### 0.5.3
* (Pmant) fix node-xmpp-client version

### 0.5.2
* (Pmant) change: add instance after installation
* (Pmant) fix: deletes history settings

### 0.5.1
* (Pmant) fix: bug with wrong states

### 0.5.0
* (Pmant) change: object structure (delete instance once if had 0.2.1 or lower installed!)
* (Pmant) add: send commands for x milliseconds
* (Pmant) add: delete unused activities and devices
* (Pmant) add: delay commands when hub is busy

### 0.2.1
* (bluefox) change logo

### 0.2.0
* (Pmant) switch activity on state change
* (Pmant) stop current activity on hub status change
* (Pmant) move activities to activity channel
* (Pmant) add devices channel
* (Pmant) add device control

### 0.1.2
* (Pmant) hub discovery

### 0.1.1
* (Pmant) fixes

### 0.1.0
* (Pmant) keep alive connection to hub
* (Pmant) create/update objects and states
* (Pmant) update current activity status

### 0.0.1
* (Pmant) connect to hub
* (Pmant) listen for activies


### TODO
* translations

## License
MIT

Copyright (c) 20xx-2019 Pmant <patrickmo@gmx.de>