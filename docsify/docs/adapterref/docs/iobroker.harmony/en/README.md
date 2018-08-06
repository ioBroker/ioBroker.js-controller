![Harmony](media/harmony.png ':size=100x100')

# Logitech Harmony adapter
The Logitech Harmony adapter allows easy integration of one or 
even multiple Logitech Harmony hubs into an ioBroker system.

With the help of the Logitech Harmony Hubs a variety of entertainment and
Smart Home devices can be controlled. Using the hub, ioBroker is able to
start and stop activities and query the status of activities as well.
Remote devices can be controled with virtual keys.


![Harmony Hub](media/harmony_850.jpg "Logitech Harmony Hub with
Harmony Elite Remote Control")<br/><span style ="color:gray">
*Logitech Harmony Hub with Harmony Elite remote control*</span>



## Characteristics
> Attention! The following table is only an example.

| | |
|-------------------------|:---------------------------------------:|
| Status of the documentary | 29.07.2018 |
| current version stable | ![stable][logo] |
| current version latest | ![latest][logo] |
| OS | Linux, Windows; OS X |
| node version | > = 4.x |
| Developer | Pmant |
| Github | LINK |
| License | MIT |
| Category | Multimedia |
| Keywords | `harmony`` hub` `logitech`` home automation` |
| Dependencies | `harmonyhubjs-client`` harmonyhubjs-discover` `semaphore` |     



## Overview

### Logitech Harmony
Logitech Harmony is compatible with more than 270,000 entertainment and smart
Home devices. These include TVs and cable boxes, disc players and game consoles
to AV receivers and streaming media players, as well as intelligent lighting,
Locks, thermostats and much more.

With Logitech Harmony you can change programs, adjust the volume,
Set favorites and control lighting and other smart devices. The highlight
of the system is the creation of actions to control multiple devices with only
a keystroke.

1. The Logitech Harmony Hub connects to the home network via Wi-Fi.
2. Harmony hubs do not have an Ethernet port.
3. The hub supports only the WLAN 2.4 GHz frequency band. The 5 GHz frequency band will be
   unsupported.
4. An 802.11 g / n router should be used. 802.11 a / b is not supported.
5. WEP 64/128, WPA Personal, and WEP are used as encryption for the WLAN
   WPA2-AES supported.
6. UPnP does not need to be enabled for Harmony for the Harmony app to run
   Recognize Hub and communicate with him. On the other hand it has to be activated
   to allow the hub to discover and work with other devices on the network.
   This applies, for example, to devices such as Philips hue, Sonos, Nest, Roku or Smart TVs.
7. The maximum number of devices per stroke is 8 devices. 15 devices are possible if as
   Remote at least one Harmony Touch or Ultimate one is registered at the hub.
8. The maximum number of preferred channels is 50 per mobile device.

### Logitech Harmony adapter
The Logitech Harmony adapter automatically finds all Logitech Harmony hubs 
via a Wi-Fi connection that are located in the same network subnet as the
ioBroker server 


Objects for triggering functions and activities (= command macros) are used by the
adapter automatically created in the ioBroker. Also, the current status of the hub is
to displayed. By writing or reading of objects values their status can be changed 
and thus actions can be triggered or queried.



## Prerequisites before installation
The ioBroker adapter for the Logitech Harmony system can not be used to connect devices or devices
Create or change activities. That is why it is necessary that before use
of the adapter the remote control system as described in the instructions of Logitech,
is set up and works together with the controlled devices.



## Installation
An instance of the adapter is installed via the ioBroker Admin interface. The
detailed instructions for the necessary installaton steps you will find ** here **.

After the installation of an adapter instance opens automatically
a configuration window.



## Configuration
The adapter automatically finds all Harmony hubs that are in the subnet of the
ioBroker servers.



### "Logitech Harmony adapter settings" window
![Admin](media/a_harmony_admin_settings.png "Admin Interface")<br/><span style = "color:gray">
*Admin interface*</span>

| Field | Description |
|: ------------- |: ------------- |
| ** Hub User ** | In case you provided access to the Harmony Hub configuration with a user and password, please enter the username here. Pay attention to uppercase and lowercase letters. |
| ** Hub Password ** | If you provide a user and password for access to the Harmony Hub configuration, enter the password here. Pay attention to uppercase and lowercase letters. |

The two fields need only be filled, if the hub is secured with a username
and a password.

After completing the configuration, the configuration dialog is displayed with `SAVE AND CLOSE`
leave. This will cause a restart of the adapter.


[logo]: https://badge.fury.io/js/svgo.svg "npm logo"
[blockly]: media/a_harmony_blockly.xml "Blockly"
