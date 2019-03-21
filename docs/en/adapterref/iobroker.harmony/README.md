---
translatedFrom: de
editLink: https://github.com/ioBroker/ioBroker.docs/edit/engine/docs/en/adapterref/iobroker.harmony/README.md
title: Logitech Harmony
hash: wtXKBDr9IlxWqevhz7QGJu4BiY5S9OkeTwo3E0WfKyU=
---
! [Harmony] (media / harmony.png)

# Logitech Harmony

The Logitech Harmony adapter allows easy integration of one or more
even multiple Logitech Harmony hubs into an ioBroker system.

With the help of the Logitech Harmony Hub can be a variety of entertainment and
Smart home devices are controlled. With the ioBroker can be about the hub
Start and stop activities, query the status of activities as well
Remotely control devices with virtual keystrokes.

! [Harmony Hub] (media / harmony_850.jpg "Logitech Harmony Hub with Harmony Elite Remote Control")

## Overview

### Logitech Harmony

Logitech Harmony is compatible with more than 270,000 entertainment and smart
Home devices. These include TVs and cable boxes, disc players and game consoles
to AV receivers and streaming media players as well as intelligent lighting,
Locks, thermostats and much more.

With Logitech Harmony you can change programs, adjust the volume,
Set favorites and control lighting and other smart devices. The highlight
The system is creating actions to control multiple devices with only
a keystroke.

1. The Logitech Harmony Hub connects to the home network via Wi-Fi.
2. Harmony hubs do not have an Ethernet port.
3. The hub supports only the WLAN 2.4 GHz frequency band. The 5 GHz frequency band will be
   unsupported.
4. An 802.11 g / n router should be used. 802.11 a / b is not supported.
5. WEP 64/128, WPA Personal and WEP are used as encryption for the WLAN
   WPA2-AES supported.
6. UPnP does not need to be enabled for Harmony for the Harmony app to do
   Recognize Hub and communicate with him. On the other hand it has to be activated
   to allow the hub to discover and work with other devices on the network.
   This applies, for example, to devices such as Philips hue, Sonos, Nest, Roku or Smart TVs.
7. The maximum number of devices per stroke is 8 devices. 15 devices are possible if as
   Remote at least one Harmony Touch or Ultimate one is registered at the hub.
8. The maximum number of preferred channels is 50 per mobile device.

### Logitech Harmony adapter

The Logitech Harmony adapter automatically finds all Logitech Harmony hubs that are
via a Wi-Fi connection to the ioBroker server in the same network subnet
are located.

Objects for triggering functions and activities (= command macros) are used by the
Adapter automatically created in the ioBroker. Also, the current status of the hub is
to disposal. By specific description or reading of the created objects
their status can be changed and thus actions can be triggered or queried.

## Prerequisites before installation

The ioBroker adapter for the Logitech Harmony system can not be used to connect devices or devices
Create or change activities. That is why it is necessary that before use
the adapter the remote control system as described in the instructions of Logitech,
is set up and works together with the controlled devices.

## installation

An instance of the adapter is installed via the ioBroker Admin interface. The
detailed instructions for the necessary installation steps can be found ** here **.

After the installation of an adapter instance opens automatically
a configuration window.

## configuration

The adapter automatically finds all Harmony hubs that are in the subnet of the
ioBroker servers.

### "Logitech Harmony adapter settings" window

! [Admin] (media / a_harmony_admin_settings.png &quot;Admin interface&quot;) <span style="color:grey">* Admin interface *</span>

| Field | Description |
|: ------------- |: ------------- |
| ** Hub User ** | In case the access to the Harmony Hub configuration is provided with a user and a password, the user name must be entered here. It is case-sensitive. |
| ** Hub Password ** | In case the access to the Harmony Hub configuration is provided with a user and password, the password must be entered here. It is case-sensitive. |

The two fields need only be filled out if the hub has a username
and a password is secured.

After completing the configuration, the configuration dialog is displayed with `SAVE AND CLOSE`
leave. This will result in a subsequent restart of the adapter.

## instances

The installation of the adapter has an active instance of the
Logitech Harmony hub adapters created.

! [Instance] (media / a_harmony_instance.png &quot;instance&quot;) <span style="color:grey">* first instance *</span>

On an ioBroker server you can only ever use one instance of the Logitech
Install Harmony adapters.

Whether the adapter is enabled or connected to the Logitech Harmony Hub becomes
with the color of the status field of the instance. Shows the mouse pointer
on the icon, more detailed information is displayed.

## Objects of the adapter

In the `Objects` area, all of the adapters in the hub are in a tree structure
detected devices and activities listed. In addition, will also
informed that the communication with the hub is running smoothly.

! [Objects] (media / a_harmony_objects.png &quot;Harmony Objects&quot;) <span style="color:grey">* Objects of the Harmony Adapter *</span>

Each data point is associated with its associated data type and permissions.
Permissions can be read (R) as well as write (W). Each data point can be read at least (R) while
others can also be described. To find a specific data point, the search is recommended using
the key combination "CTRL + F".

Object | Access | Bescheibung
------ |: -------: |: -----------
** harmony.0 ** | R | Name of the first * instance * of the Logitech Harmony adapter
** Harmony Hub ** | R | Name of * Hubs *
** Apple TV Generation 3 ** | R | Name of * device *, contains device functions
& emsp; ** ** Denon AV Receiver ** | R | Name of * device *, contains device functions
& EMSP; & EMSP; **: ** | R | Other * devices *
& EMSP; & EMSP; ** activities ** | R | List of all * activities * programmed in the Harmony Hub
& EMSP; & EMSP; *** hubBlocked *** | R | Indicates if the hub is currently busy
& EMSP; & EMSP; *** hubConnected *** | R | Status of the connection between adapter and hub

### device functions

If you open a device, you will get a list of all devices belonging to the device
Functionalities. These device functions are device-specific and differ
therefore for devices of different types.

! [Device] (media / a_harmony_geraet.png &quot;Harmony device&quot;) <span style="color:grey">*</span> Device features <span style="color:grey">*</span>

#### Triggering a device function

Each device function `{instance}. {Hub name}. {Device}. {Device function}` releases one
corresponding reaction of the addressed device. The values of device functions
can be read and described. The trigger can be tested in the
Use the mouse pointer to move the bell to the right of the function. Alternatively you can
also enter a value there with the pencil symbol.
Values have the unit `milliseconds`. Will be a value between 1 and 250ms
typed in, the Harmony Hub usually just presses a button in the
given length output. Larger values than 250ms can be used for
Perform multiple operation of the device function.
After triggering the device function, the value changes back to 0.

### Activities

Below `activities`, all activities programmed at the Harmony Hub will become active
listed.

! [Activities] (media / a_harmony_activities.png &quot;Activities&quot;) <span style="color:grey">* Activities *</span>

#### Starting an activity

Activities are started when you join an activity
`{Instance}. {Hub Name} .activities. {Activity}` Enter a number greater than 0.
During the execution of the activity, this value changes first
after 1 (= starting) and then to 2 (= active).

#### Ending an activity

Running activities can be stopped by setting their value to 0.
Alternatively, one can terminate an activity in the object
`{Instance}. {Hub Name} .activities.currentStatus` enter any number.
While quitting the activity changes
`{Instance}. {Hub Name} .activities.currentStatus` from 3 (= terminating) to 0 (= inactive).

#### Other status values

`{Instance}. {Hub Name} .activities.currentActivity` returns the currently running one
Activity as a string.

`{Instance}. {Hub Name} .activities.currentStatus` shows the status of the Harmony Hub
on. The values mean
- 0 = inactive
- 1 = starting
- 2 = active
- 3 = finishing

`{Instance}. {Hub Name} .activities. {Activity}` indicates the status of an activity.
The meaning of the values is analogous to
`{Instance}. {Hub Name} .activities.currentStatus`.

<a name="deinstallation"/>

## Deinstallation

> T: I think a standard uninstall of an adapter in one
  central article is documented in detail. The adapter will (always)
  referred to this central article. Only deviations from the standard procedure
  are documented here.

If the instance should be removed again, it will be assigned via the assigned trashcan icon
removed in the section Instances

[Delete] (media / adapter_harmony_delete_01.png)!

A confirmation prompt appears, which must be confirmed with *** OK ***

[Delete2] (media / adapter_harmony_delete_02.png)!

Then a window will appear again, showing the processing of the uninstall commands

[Delete3] (media / adapter_harmony_delete_03.png)!

This uninstall removes all objects belonging to the instance completely.

If the installation files are completely deleted from the host, this must be done via the trashcan icon
done in the tile of the Harmony adapter in the section Adapters.

## Particularities

backup
multihost
History
performance

## FAQ

!> Search the forum for frequently asked questions and give a reference answer here

1. ** The connection to the hub is interrupted again and again. **

   The Harmony hub needs excellent communication with the adapter
   Radio link. The use of a wireless access point in the immediate spatial
   Near the hub is recommended.

2. ** How to implement the button "alles aus" via ioBroker? **

   Set `{Instance}. {Hub Name} .activities.currentStatus` to 0.

3. ** Under Windows, the message appears when installing the adapter
   `ERR! code ENOGIT` and the adapter does not work. **

   Before installing the Harmony adapter GIT from the website
   Download and install https://git-scm.com/download/win.

4. ** Under Linux, the message appears when installing the adapter
   `ERR! code ENOGIT` and the adapter does not work. **

   Before installing the Harmony adapter GIT via command line and
   Install `sudo apt install git`.

6. ** Scripts no longer work with newer versions of the adapter. **

   Starting with version 0.9.1 of the adapter, objects are named differently. From old
   `harmony.0.Harmony_Hub` was e.g. new `harmony.0.Harmony Hub`. You're welcome
   inspect the objects and add components to them, e.g. scripts
   to adjust.

7. ** Wi-Fi is automatically disabled at night. The adapter adjusts to the
   Restarting the WLAN does not automatically connect to the HUB. **

   Insert an automatic restart of the harmony instance (expert mode)
   5-10 minutes after the wireless router start.

8. ** The HUB is not found. **

   Check if the hub is really around the same network subnet and VLAN
   how the ioBroker server is located. Are multicasts allowed or will they be
   filtered by the router? Is the status LED on the hub lit green?
   Is the hub accessible via the Logitech app? Go to the instructions
   from Logitech to solve connectivity issues.

9. ** Only one instance of the adapter can be installed. **

   On an ioBroker server you can only ever use one instance of the Logitech
   Install Harmony adapters.

## examples

### JavaScript

Trigger device functions. This is where the Denon AV receiver is turned on or off,
if the value of another data point changes.

```

if (getState ("hm-rpc.0.MEQ01234567.2.STATE"). val == true) {
  setState ("harmony.0.Harmony Hub.Denon AV Receiver.PowerOn" / * Denon AV Receiver: PowerOn * /, '1', true);
  // on control switch == on no delay switch
} else if (getState ("hm-rpc.0.MEQ01234567.2.STATE"). val == false) {
  // At control switch == OFF switch with delay
  var timeout = setTimeout (function () {
    setState ("harmony.0.Harmony Hub.Denon AV Receiver.PowerOn" / * Denon AV Receiver: PowerOn * /, '1', true);
  }, 1000);
}

```

### Blockly

Trigger device functions. This is where the Denon AV receiver is turned on or off,
if the value of another data point changes.

! [Blockly] (media / a_hamony_simple_blockly.jpg)
** ** Blockly

[Source] [Blockly]

### Node-Red

> associated node-red elements
> Examples
> Exports for reuse

### vis

> associated vis elements
> Examples
> Exports for reuse
> Code Fragments

## Left

> References to other documents in the ioBroker portal
> Web links, e.g. to the manufacturer
> GitHub links
* Manufacturer Page https://www.logitech.com/en-us/product/harmony-hub (20.07.2018)

## History

> The following text is only a placeholder. The history is
  generated dynamically by the document generator and inserted here. Data Source
  is io-package.json -> common.news in the respective Doku language

| Version | Change |
|: -------: |: -------------------------------------- ---- |
| 0.9.1 | Fix for problematic characters |
| 0.7.1 | Bug fixes |
| 0.7.0 | Added support for multiple hubs |
| 0.6.2 | wrong port corrected |
| 0.1.0 | Initial commit |

[logo]: https://badge.fury.io/js/svgo.svg "npm logo"
[blockly]: media / a_harmony_blockly.xml "Blockly"