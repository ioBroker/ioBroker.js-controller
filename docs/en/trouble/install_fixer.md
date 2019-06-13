---
title: ioBroker installation fixer
lastChanged: 13.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/install_fixer.md
hash: tHDEojwxIw6xJmU1S4wqOljPM1nQ4+ZV1CNRLe9Mxqc=
---
# Fix problems with ioBroker installation user rights
The installation fixer solves problems with the user rights of the ioBroker installation.
At the end of 2018, and especially in January 2019, @AlCalzone completely overhauled the ioBroker installer, which means that in the meantime current version of February, 2019, all rights issues are a thing of the past. ioBroker is no longer running as "root" but under its own user who can do whatever he needs for the current ioBroker adapters.
Everything is fine for all new installations.

But what if someone has installed ioBroker earlier? He still runs as root? Or in the first days of the new installation routine? **Again we have a solution thanks to @AlCalzone: the installation fixer**

By means of a command, an existing installation in / opt / iobroker is brought up to the same level as a current new installation. The script can be used again and again in the future to update the installation in this regard.
Important: This script does not update nodejs, npm, nor js-controller or any adapter. Only the system rights u.a. are being edited.
Try and give feedback in [discussion thread](https://forum.iobroker.net/topic/20212/diskussion-zum-neuen-installation-fixer)

!> [Please note]: Application under Docker should not be necessary because everything runs as root anyway, and we currently advise against lack of clear experience and feedback from an application. If someone wants to try and give feedback: application completely at your own risk. Be sure to back up and know what you are doing!

Please note the FAQ post in this thread!

The script to be executed is loaded by GitHub, as with the installer, so it is always up-to-date. The command is:

```
curl -sL https://iobroker.net/fix.sh | bash -
```

## FAQ
** Do I have to use the fixer? ** We recommend to update the installation and therefore to use the fixer. So you have an installation that we can also support if there are problems. With npm 5 and higher, there were more and more problems when working with root or sudo and the new installer, and so on the fixer for Linux-based systems are taking this into account and trying to prevent these problems. And the safety aspects are not negligible.

** Where can I see what the fixer does? ** We try to keep the installer and fixer up to date.
Both have a changelog.
[Installer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md) [fixer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md) Otherwise, see the script directly if you understand something about shell programming :-)

** Which user executes the fixer best? ** It does not matter in fact. It's best to do it as a normal user, then you can work with it afterwards.

** In which directory is the fixer executed best? ** It does not matter. The current fixer (2019-02-21) expects installation in / opt / iobroker

** For which operating systems does the fixer apply? ** For all Linux-based systems. Windows is not covered here.

** What exactly does the fixer do? ** The fixer creates an ioBroker user, sets file and directory permissions correctly for this user, as well as some sudo rights and everything needed to work without root with ioBroker and npm.

** Can the fixer be executed multiple times when there are updates? ** Yes and that is explicitly meant to be up to date with the further development of the installer.

** Are there special situations where the fixer should be executed additionally? ** The fixer also handles special permissions when using redis and backitup. If Redis is already installed in the application everything will be automatically set correctly. If Redis will be installed later, Fixer will do it correctly too.

** Can the installation fixer also be used under Docker? ** There is still little experience and the results are very mixed. Therefore, we currently advise against a use, also because everything in the container usually runs as root and therefore is not relevant anyway. If you still like and want to give feedback: Use in Docker at your own risk and NEVER without backup and knowledge of what you do!

** What can I do if I'm not sure what's wrong? ** You can simply copy the ioBroker directory beforehand, with nothing except permissions.