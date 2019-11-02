# js-controller upgrade instructions

Due to the different hardware and platforms under which ioBroker runs, the js-controller has to be updated manually. Further details can be found in the appropriate section.

## General information for all platforms

**For an update from js-controller 1.x to 2.x please always read the information at https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im -Latest-repo read and note!**

Otherwise please update the slaves first with an update of master-slave systems and the master last!

## Linux/macOS (new installer)
This is the recommended option !!

Please execute the following commands in an SSH shell (console):
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` or reboot server, then ioBroker should restart and you can be sure that all old processes were finished.

If the upgrade command displays Access Rights / Permission errors, then please use the install fixer (`curl -sL https://iobroker.net/fix.sh | bash-`) to fix these issues and upgrade command run again.

## Linux/macOS (manually installed)

A manual installation usually takes place under root as user and therefore a "sudo" is necessary before the commands.

Please execute the following commands in an SSH shell (console):
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` or server reboot, then ioBroker should restart and you can be sure that all old processes were finished.

If the upgrade command displays permissions / permissions errors, fix them. Sometimes "sudo" is not enough and you have to run the installation as a real root (previously simply `sudo su -`).

## Windows (new Windows Installer)

In this case please download an updated installer from the download page and do the update with it.

## Windows (manually installed)
A manual installation usually takes place with administrator rights

Please execute the following commands in an administrator SSH shell (console):
* `cd C:\iobroker` (or where ioBroker was installed)
* ?? Stop ioBroker service
* `iobroker update`
* `iobroker upgrade self`
* Start ioBroker service or reboot computer, then ioBroker should restart and you can be sure that all the old processes were finished.

## Emergency (manual reinstallation) (if somehow nothing works after the update)
Please go to the ioBroker directory and run `npm install iobroker.js-controller`. A specific version can be installed using `npm install iobroker.js-controller @ x.y.z` (replace x.y.z with the desired version).

If access problems occur during execution, the command must be changed slightly:
* For systems created with the new Linux installer: `sudo -u iobroker -H npm install iobroker.js-controller`
* For systems installed manually under Linux, prefix `sudo` or run as root.
* For Windows systems, an administrator shell should suffice

This way is only necessary in very few cases and please consult the forum beforehand!