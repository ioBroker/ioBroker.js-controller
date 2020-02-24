---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_RPi_2-3-4_20191127_buster.md
title: ioBroker Image for Raspberry Pi2 / 3/4 Buster 20191127
hash: VMimg5s0Ar5yl1CUlqb84IAS0AMoMcD8TCLv8whhtHw=
---
# IoBroker Image for Raspberry Pi2 / 3/4 Buster 20191127
## Generate a µ-SD card
This is an SD card image for the Raspberry Pi2, Pi3, Pi3 B + or Pi4.

The image was created on a Raspberry Pi4 with 4GB RAM, but should also run on all of the above. It is suitable for 8 GB cards and larger. However, a 16 GB is the recommended minimum size.
16GB cards are recommended anyway so that the same cells are not always written to.

The image is extracted and then written to the SD card using the Balena Etcher program. Etcher is available for various operating systems.

## Components of the image
The image contains the Raspbian lite, based on Debian 10 “Buster” from 09/26/2019 after download from http://www.raspberrypi.org/downloads.

In addition, packages that are necessary for some adapters were installed.

The following user has been created:

* User: `pi`,
* Password: `raspberry`

Node-js is installed in version 10.17.0 and of course iobroker via the installer with the js controller **v2.1.1** as of November 27, 2019.

It is a ** minimal installation **, which only contains the admin, the info and the discovery adapter **.
Additional adapters and their instances still need to be created and configured.

The creation of additional adapters and their instances is described in [here](/tutorial/adapter.md).

** Note! ** The following instructions were created to the best of our knowledge with the information at the time the image was created. Updates to packages or the kernel can change something at any time.

The image is localized for Germany. If used in other environments, please adjust accordingly. (`sudo raspi-config`; 4.) Localization Options)

## After the first start
After starting the Rapberry Pi for the first time, please make the following settings with `sudo raspi-config`:

* Point 1: `Change user password` (assign your own password for the user` Pi`)

* Point 2: `Network Options - Hostname` (change the name of the Raspberry Pi if necessary. The default is` raspberrypi`)

if the host name is changed, please enter `iobroker host this` in the console in the installation directory

* Point 7: `Advanced Options - Expand filesystem` (expanding the root filesystem up to the maximum size of the SD card used)

* If necessary, make adjustments under point 4: `Localization Options`. The default settings apply to Germany

## System update
As it may have been some time since the image was created, the first thing to do is to update the system.

To update Linux and nodejs to current versions, do the following on the console:

```sudo apt-get update && sudo apt-get upgrade -y```

You should also check whether there are already updates for the already installed adapters and the js controller (see tab Hosts).

In addition to the smallest possible size of an image, this is also the reason that only a few adapters are preinstalled.

In such cases, always first run the js-controller via the console according to the instructions in the Hosts tab, then if necessary the Adapter Admin and then all other adapters.

## Installation of Redis
These images no longer contain the Redis database to save the states. With weak computers and low RAM, the use of Redis increases the performance considerably in some cases. With faster computers, it reduces write access and extends the life of the SD card.

If Redis is to be installed, the current images must be operated as follows.

### Installation of the Redis server
After the command:

`sudo apt install redis-server`

Is the Redis server ready and is available at port 6379

### Switching the states to Redis
The use of Redis to save the states in ioBroker must be configured in the console with:

`iobroker setup custom`

In the following dialog, enter as follows (note on the 4th line):

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

Special features when installing in a multihost system are described here:

[Click here](config/multihost.md)

Approval of redis for the iobroker user the backitup adapter can also access redis, the user must be given the necessary rights to do so with:

`sudo usermod -a -G redis iobroker`