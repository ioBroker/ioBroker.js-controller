---
title: Linux
lastChanged: 28.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/linux.md
hash: +9KkGvDJvUveJ02nsS48om8AmoOjywSgZJz/9MM+TGA=
---
# IoBroker installation on Linux
!> These instructions do NOT apply to finished images of the website !!!

The installation routine for ioBroker has been completely revised and some installation problems (which installation user, autostart, etc.) have been fixed.

The installation is now carried out via a script, which at runtime contains the required installation steps and software packages. recharges. During the installation, a new user “iobroker” is created, as well as an associated home directory (/ home / iobroker). From now on ioBroker runs under the user iobroker and no longer as root.

If the reloading of a script is too dangerous for you, you can check the script beforehand under [this link](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh).

This installation guide for ioBroker shows the installation on Linux using the example of the Raspberry PI with the System Stretch. The actual instructions for installing nodejs and ioBroker can be used for almost all other Linux systems.

Due to dependencies on other packages or additional installations, there may always be special features during the installation.

If you still have any questions, please post them in the forum.

In the instructions published here, the node.js versions are automatically updated with every kernel update, if available.

## Required hardware
### Raspberry Pi 2/3,
or any other hardware with a common Linux (Debian, Ubuntu, etc.), or even a Mac.

We do not recommend using a Pi 1 as a master. It is simply not powerful enough (500 MB RAM, etc.). Due to the different hardware, these instructions are not suitable for a Pi 1 anyway.

A Pi 2 or Pi 3 also has only max. 1 GB RAM. With 15 adapter instances, this should still be sufficient, but beyond that it can become scarce. Each adapter instance needs about 40 MB (and sometimes 200MB and more) of RAM. Therefore, you should always keep an eye on the RAM utilization before activating additional adapter instances - 1 GB RAM are finite.

### Power adapter
it is important to have a good power supply. With a weak power supply, stability problems can be expected

### Memory card
or SSD, USB stick, etc. (depending on the hardware used)

## Required / important links
* Download Image: https://www.raspberrypi.org/downloads/raspbian/
* Win32DiskImager: https://sourceforge.net/projects/win32diskimager/ **or**
* Balena Etcher: https://www.balena.io/etcher/
* Putty: http://www.putty.org/

## Installation Guide
### Operating system installation
* Install the desired basic operating system (Raspian Stretch, Ubuntu, Debian, etc.) - depending on the hardware used.

Help and instructions for the respective versions are available on the corresponding support pages, YouTube, etc.

* ONLY if root access via SSH or sftp is absolutely required, **CAN** also

Root access for SSH can be activated.

We advise against this, based on the known security aspects. For the installation of ioBroker it is sufficient to use the sudo command and to put it in front of the respective command.

### Installation Node.js
The following instructions should also be used when downgrading.

The currently recommended version is node 10.x; with js-controller 1.5.7 also node 8.x, then in step 4.1. exchange the “10.x” for 8.x ”.

!> Debian Buster requires node.js v10.x !!

<span style="color:red">Odd versions of nodejs are generally not recommended as they are developer versions.</span>

1.System update: `` sudo apt-get update && sudo apt-get upgrade ''

Depending on the OS used, the update can also be carried out using ``sudo apt update && sudo apt upgrade``.

2. Test for existing versions of nodejs and npm.

    ``node -v``

    ``nodejs -v``

    ``npm -v``

only if **ALL** these commands have no result (i.e. no longer display the version number) continue with step 4 of this section, otherwise, or if the version does not correspond to the desired one, do the following beforehand:

3. Uninstall the existing node & node.js versions

    ``sudo apt-get --purge remove node``

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4. Reinstall Node.js for Linux and Raspberry 2/3

    ``curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -``

    ``sudo apt install -y nodejs``

    ``sudo reboot``

After installation, the commands “node -v” and “nodejs -v” must return the same version number.

    If ``node -v`` generates an error message like“ not found ”, then please

    Execute ``sudo ln -s /usr/local/bin/nodejs /usr/bin/node`` on the console.

If the versions are different, please work through the section [Installation of Node.js](#installation-nodejs) again

    As a final check, please check the version of npm using ``npm -v``.

If this results in a version <6, please carry out an npm update with ``sudo -H npm install -g npm@6``

### IoBroker installation
The installation can be done with the user pi or with the user root.

Run on the console:

``curl -sL https://iobroker.net/install.sh | bash -``

---

Installation takes place in 4 steps:

``Installing prerequisites (1/4)``

``Creating ioBroker user and directory (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

Finally, there is the message

``ioBroker was installed successfully``

``Open http://localhost:8081 in a browser and start configuring!``

---

Now call up ioBroker via the specified IP in the web browser: ``http://<IP-Adresse>:8081``

**Note:**

With the installation routine, the commands worked from early to mid-January:

* iobroker stop
* iobroker start
* iobroker restart
* iobroker status

no more. This is a feature of Linux - not ioBroker!

instead must

* sudo systemctl stop iobroker

or the other equivalents are used

Rights issues could also arise.

In this case, please use the installation fixer:

``curl -sL https://iobroker.net/fix.sh | bash -``

more information in the forum:

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-verf%C3%BCgbar