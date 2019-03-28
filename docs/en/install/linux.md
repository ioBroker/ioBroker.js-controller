---
title: Linux
lastChanged: 28.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/linux.md
hash: rToAGckz5g8DJcVj8aOpJNCl6cMnwuRP6khgB4EIOa0=
---
# IoBroker installation under Linux
!> This manual is NOT valid for finished images of the website !!!

The installation routine for ioBroker has been completely overhauled and some installation issues (which installer, startup, etc.) have been fixed.

The installation is now done via a script, which at runtime the required installation steps and software packages. recharges. During the installation, a new user "iobroker" is created, as well as an associated home directory (/ home / iobroker). From now on ioBroker runs under the user iobroker and no longer as root.

If the reloading of a script is too dangerous, the script can check beforehand under [this link](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh).

This installation guide for ioBroker shows the installation on Linux using the example of the Raspberry PI with the System Stretch. The actual instructions for installing nodejs and ioBroker can be used for almost all other Linux systems.

Due to dependencies on other packages or additional installations during installation, special features can occur again and again.

If there are any questions, please post them in the forum.

With the instructions published here with each Kernel update if available also automatically the node.js versions are updated.

## Required hardware
### Raspberry Pi 2/3,
or any other hardware with a common Linux (Debian, Ubuntu, etc.), or even a Mac.

We advise against using a Pi 1 as master. This is just not powerful enough (500 MB RAM, etc.). Due to the different hardware this manual does not fit for a Pi 1 anyway.

Even a Pi 2 or Pi 3 has only max. 1 GB RAM. It should be enough for 15 adapter instances, but beyond that it can be scarce. Each adapter instance needs about 40 MB (and sometimes 200 MB or more) of RAM. Therefore, one should always keep an eye on RAM usage before enabling more adapter instances - 1 GB of RAM is finally available.

### Power adapter
It is important to have a good power supply. With a weak power supply stability problems are to be expected

### Memory card
or SSD, USB stick, etc. (depending on the hardware used)

## Needed / important links
* Download Image: https://www.raspberrypi.org/downloads/raspbian/
* Win32DiskImager: https://sourceforge.net/projects/win32diskimager/ **or**
* Balena Etcher: https://www.balena.io/etcher/
* Putty: http://www.putty.org/

## Installation Guide
### Installation operating system
* Install the desired base operating system (Raspian Stretch, Ubuntu, Debian, etc.) depending on the hardware you are using.

Help and instructions for the respective versions are available on the corresponding support pages, Youtube, etc.

* ONLY if root access via SSH or sftp is absolutely necessary, **CAN** also the

Root access for SSH will be unlocked.

We advise against the well-known security aspects of it. For the installation of ioBroker it is sufficient to use the sudo command and to preface the respective command.

### Installation Node.js
The following instructions are also to be used during a downgrade.

The currently recommended version is node 8.x; with js-controller 1.5.7 also node 10.x, then in step 4.1. replace the "8.x" against 10.x ".

<span style="color:red">odd nodejs versions are not recommended as they are development versions.</span>

1. System Update: `` sudo apt-get update && sudo apt-get upgrade``

Depending on the OS used, the update can also be performed using ``sudo apt update && sudo apt upgrade``.

2. Test for existing versions of nodejs and npm.

    ``node -v``

    ``nodejs -v``

    ``npm -v``

only if **ALL** these commands do not produce a result (ie no longer display a version number) go to step 4 of this section, otherwise, or if the version does not match what you want it to:

3. Uninstall the existing node & node.js versions

    ``sudo apt-get --purge remove node``

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4. Reinstall Node.js for Linux and Raspberry 2/3

    ``curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -``

`` sudo apt-get install -y build-essential libavahi-compat-libdnssd-dev libudev-dev libpam0g-dev nodejs``

    ``sudo reboot``

After installation, the commands "node -v" and "nodejs -v" must return the same version number.

    If ``node -v`` generates an error message like" not found ", then please enter

    Do ``sudo ln -s /usr/local/bin/nodejs /usr/bin/node`` on the console.

If the versions are different, please re-execute section [Installation Node.js](install/linux.md#installation-nodejs)

    As a last check please check the version of npm with ``npm -v``.

If this results in a version <6, please do a npm update with ``sudo -H npm install -g npm@6``

### Installation ioBroker
The installation can be done with the user pi but also with the user root.

Run at the console:

``curl -sL https://iobroker.net/install.sh | bash -``

---

The installation is done in 4 steps:

``Creating ioBroker directory (1/4)``

``Downloading installation files (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

Finally, there is the message

``ioBroker was installed successfully``

``Open http://localhost:8081 in a browser and start configuring!``

---

Now call ioBroker via the specified IP in the web browser: ``http://<IP-Adresse>:8081``

**Note:**

with the installation routine, the commands worked from early to mid-January:

* iobroker stop
* iobroker start
* iobroker restart
* iobroker status

no more. This is a feature of Linux - not ioBroker!

instead of that

* sudo systemctl stop iobroker

or the other equivalents are used

In addition it could come to rights problems.

In this case please use the installer fixer:

``curl -sL https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/fix_installation.sh | bash -``

more information in the forum:

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-verf%C3%BCgbar