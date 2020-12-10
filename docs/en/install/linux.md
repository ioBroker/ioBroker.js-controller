---
title: Linux
lastChanged: 05.12.2020
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/linux.md
hash: 94FZ9JS8K/j3512/RP42QRy2cSacJu+1igJqfvWnKGc=
---
# IoBroker installation on Linux
!> These instructions do NOT apply to finished images of the website! However, manual installation is preferable to an image.

The installation is carried out using a script that carries out the required installation steps and reloads any software packages that may be required.
During the installation, a new user “iobroker” and an associated home directory (/ home / iobroker) are created in the system.
The ioBroker then runs under this user.

If reloading a script is too dangerous for you, you can check the script beforehand under [this link](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh).

These installation instructions for ioBroker show the installation on Linux using the example of Raspberry Pi with Raspberry OS 'Buster'.

Due to dependencies on other packages or additional installations, special features can occur again and again during the installation.

## Required hardware
### Raspberry Pi 2/3/4
or any other hardware with a common Linux. However, Debian, Ubuntu or one of the distributions based on them is recommended.

We do not recommend using a Pi 1 as a master. It's just not powerful enough (500MB RAM, etc.). Due to the different hardware, these instructions do not fit a Pi 1 anyway.

Even a Pi 2 or Pi 3 only has a max. 1 GB RAM. With 15 adapter instances this should be sufficient, but beyond that it can be tight. Each adapter instance requires around 40 MB (and sometimes 200MB and more) of RAM. Therefore you should always keep an eye on the RAM usage before activating further adapter instances - 1 GB RAM is finite.

Therefore the Raspberry4 with 4, better 8 GB RAM is recommended from the Raspberry series.

### Power adapter
it is important to have a good power supply. Stability problems are to be expected with a weak power supply

### Memory card
or SSD, USB stick, etc. (depending on the hardware used)

## Needed / important links
* Download Image: https://www.raspberrypi.org/downloads/raspbian/
* Win32DiskImager: https://sourceforge.net/projects/win32diskimager/ **or**
* Balena Etcher: https://www.balena.io/etcher/
* Putty: http://www.putty.org/

## Installation Guide
### Installation of the operating system
* Install the desired basic operating system (Raspian Stretch, Ubuntu, Debian, etc.) - depending on the hardware used.

Help and instructions for the respective versions are available on the corresponding support pages, YouTube, etc.

* ONLY if root access via SSH or sftp is absolutely necessary, **CAN** also

Root access for SSH can be activated.

For the well-known safety aspects, we advise against it. To install ioBroker, it is sufficient to use the sudo command and precede the respective command.

### Installation Node.js
!> with the current ioBroker installer (see below) **on a system without node.js** the currently recommended version of node.js is automatically installed!

The following instructions should also be used for a downgrade.

The currently recommended version is node 12.x; for other desired versions in step 4.1. replace the “12.x” with Y.x ”.

!> Debian Buster requires at least node.js v10.x !!

<span style="color:red">Odd nodejs versions are generally not recommended as they are developer versions.</span>

1. System update: `` sudo apt-get update && sudo apt-get upgrade ''

Depending on the OS used, the update can also be carried out using ``sudo apt update && sudo apt upgrade``.

2. Test for existing versions of nodejs and npm.

    ``node -v``

    ``nodejs -v``

    ``npm -v``

only if **ALL** these commands do not produce a result (i.e. no longer display the version number) continue with step 4 of this section, otherwise, or if the version does not correspond to the desired, do the following beforehand:

3. Uninstall the existing node & node.js versions

    ``sudo apt-get --purge remove node`` (It may be that an error message appears here. Please continue!)

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4. Reinstall Node.js for Linux and Raspberry 2/3

    ``curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -``

    ``sudo apt install -y nodejs``

    ``sudo reboot``

After the installation, the commands “node -v” and “nodejs -v” must return the same version number.

    If ``node -v`` generates an error message like" not found ", then please enter

    Execute ``sudo ln -s /usr/local/bin/nodejs /usr/bin/node`` on the console.

If the versions are different, please go through section [Installation Node.js](#installation-nodejs) again

    As a final check, please check the version of npm using ``npm -v``.

If this results in a version <6, please perform an npm update with ``sudo -H npm install -g npm@6``

---

### Installation of ioBroker
The installation can be done with the user pi but also with the user root.

Run on the console:

``curl -sLf https://iobroker.net/install.sh | bash -``

---

The installation takes place in 4 steps:

``Installing prerequisites (1/4)``

``Creating ioBroker user and directory (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

At the end there is the message

``ioBroker was installed successfully``

``Open http://localhost:8081 in a browser and start configuring!``

---

Now call ioBroker via the specified IP in the web browser: ``http://<IP-Adresse>:8081``

**Note:**

The commands worked with the installation routine from early to mid-January:

* iobroker stop
* iobroker start
* iobroker restart
* iobroker status

no more. This is a feature of Linux - not ioBroker!

instead must

* sudo systemctl stop iobroker

or the other equivalents can be used

In addition, there could be rights problems.

In this case, please use the installation fixer:

``curl -sL https://iobroker.net/fix.sh | bash -``

more information in the forum:

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-verf%C3%BCgbar