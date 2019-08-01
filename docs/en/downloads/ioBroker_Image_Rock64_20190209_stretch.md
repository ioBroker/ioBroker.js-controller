---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_Rock64_20190209_stretch.md
title: ioBroker Image for Rock64 with Stretch 20190730
hash: 6ASvKW7zGlCioocgoT0Wgo+ChyeXdit13HY/U3JI+sg=
---
# IoBroker Image for Rock64 with Stretch 20190730
This is a minimal SD card image for the Rock64. It is suitable for 4 GB cards and larger. Since it only fits on a 2 GB card, a 4 GB is the recommended minimum size. 16GB cards or larger are recommended anyway so that not always the same cells are described.

The image is unpacked and then written to the SD card using the Balena Etcher program.
This is available for different operating systems.

The image contains Armbian 5.90, based on Debian "Stretch" from 28.06.2019 after downloading [https://dl.armbian.com/rock64/Debian_stretch_default.7z](https://dl.armbian.com/rock64/Debian_stretch_default.7z).

The following users are created:

- **User:** root, **Password:** 1234
- **User:** pi, **Password:** raspberry

Furthermore, node-js v 10.16..0 is installed and of course iobroker with the js-controller as of 30.07.2019.

** Only the admin and the discovery adapter ** are preinstalled and instances created.
Creating additional adapters and their instances is described in [here](/tutorial/adapter.md)

-----------------

*This documentation reflects the state of the image creation. Updates can lead to changes.*

The image is localized for Germany. If using in other environments please adjust accordingly. (armbian-config; staff)

## After the first start
If you are not asked to create a new password for the root and a new user after the first start of the Rock, please proceed as follows for security reasons:

- To use the full size of the memory card you have to use the file system with sudo `/ usr / lib / armbian / armbian-resize-filesystem`

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

Since it may have been some time since the image was created at the time of the download, you should first check whether there are already updates to the adapters already installed and the js controller (see tab Hosts).

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