---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_RPi_2-3-4_piVCCU_20190723_buster.md
title: ioBroker Image for Raspberry Pi2 / 3/4 Buster with piVCCU 20190723
hash: fdPxXaqZLD7Fzo1Q+/gc3r+XxPVt6ondUpWQd9YjeBk=
---
# IoBroker Image for Raspberry Pi2 / 3/4 Buster with piVCCU 20190723
## Creating a μ-SD card
This is an all-in-one SD card image for Homematic with ioBroker on the Raspberry Pi2, Pi3, Pi3 B + or Pi4.

The image was created on a Raspberry Pi4 with 2GB of RAM, but should also run on all mentioned. It is suitable for 4 GB cards and larger. However, an 8 GB is the recommended minimum size. 16GB cards are recommended anyway so that not always the same cells are described.

The image is unpacked and then written to the SD card using the Balena Etcher program. Etcher is available for different operating systems.

## Components of the image
The image contains the Raspbian lite, based on Debian 10 "Buster" from 10.07.2019 after download from http://www.raspberrypi.org/downloads.

In addition, packages that are necessary for some adapters were installed.

Also included is piVCCU3 dated 19.07.2019 after download from https://www.pivccu.de/images/?dir=piVCCU3

The following user is created:

* User: pi,
* Password: raspberry

Node-js is installed in the version 10.16.0 and of course iobroker via the installer with the js-controller as of 23.07.2019.

It is a **minimal installation** which contains **only the admin and the discovery adapter** additional adapters and their instances still have to be created and configured.

Creating additional adapters and their instances is described in [here](/tutorial/adapter.md).

** Note! ** The following instructions have been made to the best of our knowledge with the information at the time of the creation of the image. Updates to packages or the kernel can change anything at any time.

The image is localized for Germany. If using in other environments please adjust accordingly. (`sudo raspi-config`; 4.) Localization Options)

## After the first start
After the first start of the Rapberry Pi, please make the following settings with `sudo raspi-config`:

Point 1: Change User password (Own password assigned to the User Pi) Point 2: Network Options - Host name (change the name of the Raspberry Pi if necessary, default is ioBroker-Pi) If the host name is changed, please then in the console in the installation directory Enter iobroker host this Item 7: Advanced Options - Expand filesystem (Extend the root-filesystem up to the maximum size of the used SD-card) if necessary still under point 4: Make Localization Options adjustments. The default settings apply to Germany

## System Update
As it may have been some time since the image was created at the time of the download, you should first update the system.

To bring Linux and nodejs up to date versions, you can do the following on the console:

```sudo apt-get update && sudo apt-get upgrade -y```

In addition, you should check whether there are already updates to the already installed adapters and the js controller (see tab Hosts).

In addition to the smallest possible size of an image, this is also the reason that only a few adapters are already pre-installed.

In such cases always first run the js-controller via the console according to the instructions in the tab Hosts, then if necessary the adapter Admin and then all other adapters.

## Installation of Redis
These images no longer contain the database Redis to save the states. With weak computers and low RAM, the use of Redis increases the performance in some cases considerably. With faster computers, it reduces the write access and thus prolongs the life of the SD card.

If you want to install Redis you have to proceed with the current images as follows.

### Installing the Redis server
After the command:

`sudo apt install redis-server`

Is the Redis server ready and available at port 6379?

### Switching States to Redis
The use of Redis to store the states in ioBroker must be configured in the console with:

`iobroker setup custom`

In the dialog that follows, enter the following (Attention in the 4th line):

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

Special features when installing in a multi-host system are described here:

[Click here](config/multihost.md)

Release of redis for the user iobroker the backitup adapter can also access redis, the user must be given the necessary rights with:

`sudo usermod -a -G redis iobroker`

## The installed piVCCU3
In this image also a virtualized CCU3 is installed, which makes it possible to control Homematic and HM-IP devices without further separate hardware.
Only the radio module HM-MOD-RPI-PCB or RPI-RF-MOD must be plugged onto the pin header of the Raspberry Pi.

The piVCCU receives from the DHCP server a different IP address than the RaspberryPi itself. This is obtained with the command `sudo pivccu-info`

If you call this IP address, you can log on to the interface of the CCU3.