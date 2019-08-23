---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_Tinker_piVCCU3_20190813_stretch.md
title: ioBroker Image for Tinkerboard (S) with piVCCU 20190813
hash: 1SCL2XASshAYgQH+eZvQbYb/unN6Uo3fEWCpN2W2/zw=
---
# IoBroker Image for Tinkerboard (S) with piVCCU 20190813
## Creating a μ-SD card
This is an all-in-one SD card image for Homematic with ioBroker on the Asus Tinkerboard or Tinkerboard S.

The image was created on a Tinkerboard, but should also run on all mentioned. It is suitable for 4 GB cards and larger. However, an 8 GB is the recommended minimum size. 16GB cards are recommended anyway so that not always the same cells are described, which would lead to a faster wear of the SD card.

The image is unpacked and then written to the SD card using the Balena Etcher program. Etcher is available for different operating systems.

## Components of the image
The image contains the Raspbian lite, based on Debian 9 "Stretch" from 03.04.2019 after download from https://dl.armbian.com/tinkerboard/Debian_stretch_default.7z.

In addition, packages that are necessary for some adapters were installed.

Also included is piVCCU3 dated 19.07.2019 after download from https://www.pivccu.de/images/?dir=piVCCU3

The following user is created:

* User: `pi`,
* Password: `raspberry`

Node-js is installed in version 10.16.2 and of course iobroker via the installer with the js-controller according to the stable repository of 13.08.2019.

It is a **minimal installation** which contains **only the admin and the discovery adapter** additional adapters and their instances still have to be created and configured.

Creating additional adapters and their instances is described in [here](/tutorial/adapter.md).

** Note! ** The following instructions have been made to the best of our knowledge with the information at the time of the creation of the image. Updates to packages or the kernel can change anything at any time.

The image is localized for Germany. If using in other environments please adjust accordingly. (`sudo raspi-config`; 4.) `Localisation Options`)

## After the first start
If you are not prompted to create a new password for the root and a new user after the first start of the Tinkerboard, please proceed as follows for security reasons:

- To use the full size of the memory card you have to start the file system with `sudo / usr / lib / armbian / armbian-resize-filesystem`

  to the size of the SD card.

- There may already be updates to the underlying Linux and to nodejs. To bring this up to date

on the console, proceed as follows: `sudo apt-get update && sudo apt-get upgrade -y`

- Be sure to change the root password with `sudo passwd root` Then enter the default password` 1234` and then

enter a new password and confirm in the next step.

- This also applies to the user `pi`. This is changed with `sudo passwd pi` followed by the default password` raspberry`

and then enter a new password and confirm in the next step.

Further settings can be made with the configuration utility that calls:

`sudo armbian-config`

More information about this utility under [https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)

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