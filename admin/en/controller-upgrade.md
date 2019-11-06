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

## Windows

For updating ioBroker on Windows, download the appropriate installer with the desired js-controller version from the download page https://www.iobroker.net/#en/download and make the update with it. With the Windows Installer, previously manually installed servers or installations from other operating systems can be migrated to Windows and updated.

## Windows (manually installed)
A manual installation is done with administrator rights. Please start a cmd.exe command line window as an administrator (right-click on cmd.exe and execute as administrator) and execute the following commands:

* `cd C:\iobroker` (or where ioBroker was installed)
* `iobroker stop` to stop the ioBroker service
* `iobroker status` to check if ioBroker has finished
* `iobroker update`
* `iobroker upgrade self`
* Start ioBroker service or reboot computer, then ioBroker should restart and you can be sure that all the old processes were finished.

## Emergency Linux / macOS / Windows (manual reinstallation, if somehow nothing works after the update)
On Windows first please call in the start menu under "ioBroker" the command line of the relevant ioBroker instance. The correct directory is then set automatically. On Linux or macOS please go to the ioBroker directory.

Run `npm install iobroker.js-controller` there. A specific version can be installed using npm install `iobroker.js-controller@x.y.z` (replace x.y.z with the desired version).

If there are problems with access rights when running on Linux the command has to be changed slightly:

* For systems created with the new Linux installer: `sudo -u iobroker -H npm install iobroker.js-controller`
* For systems installed manually under Linux, prefix `sudo` or run as root.

This way is only necessary in very few cases and please consult the forum beforehand!
