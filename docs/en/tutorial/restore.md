---
title: Execute ioBroker restore
lastChanged: 03.12.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/restore.md
hash: 9SyQw5gWCDpvFS0ksEa7NULgmuancyWYV7tkASkVhpg=
---
# Basics
How do I correctly restore the ioBroker installation on a Linux system?

### Foreword:
Since some users find it very difficult to restore, a step-by-step guide for the restore after a crash or after a hardware change, system change or anything else should help here.

Basically, one thing can be said in advance: a restore can be done in a few minutes if done correctly and nobody needs to be afraid of it.

In the end, all data is available again and a new system has been set up.

### Preparation:
An executable ioBroker installation is essential for preparation.

There are two ways to do this.
Either take a finished image from [Download area](https://www.iobroker.net/#de/download), set up your own Linux OS and install ioBroker according to this [manual](https://www.iobroker.net/#de/documentation/install/linux.md).

### Next Step
If the old system had saved the states and / or objects in Redis, the new system must first be equipped with the Redis server.

If it is not certain whether Redis was used and access to the old system still exists, then use the `iobroker status` command to get the required information. “When using Redis, the output looks as follows:

```
iobroker is running on this host.

At least one iobroker host is running.

Objects type: redis
States  type: redis
```

If Objects type and / or States type says "redis", you must install the Redis server on the new system.
If there is "file" for both types, the Redis server is not required.

If you no longer have access to the old system and you don't know what exactly was configured there, then install the Redis server in advance.

#### Redis installed:
To do this, go to the terminal by putty and execute the following commands:

```
sudo apt-get update
sudo apt-get install redis-server
sudo usermod -a -G redis iobroker
sudo reboot now
```

The next step is to run the installer fix if all rights on the system should not fit somewhere.
This step is only a recommendation and is not absolutely necessary.

```
curl -sL https://iobroker.net/fix.sh | bash –
```

With the small tool "htop" you can see all running processes very well, which can not only be interesting for the restore but also very useful in general.
this is installed as follows:

Run the following command in the console:

```
sudo apt-get install htop
```

After this has been done, the actual restore can occur.

### Restore:
There are also two options here:

#### **1. Automatic restore with back-up **
Since no Linux knowledge is required here, and the whole thing via the Iobroker web interface, the variant of automatic restore is first carried out using [Backitup](https://github.com/simatec/ioBroker.backitup/blob/master/README.md).

For this, the adapter Backitup must be installed.
This is done via the "Adapter" tab. Search for backup there and install an instance using the (+).

Once the installation is complete, you can save your "ioBroker Backup" created by the old system on your new system using an sftp program such as FileZilla or WinSCP in the path / opt / iobroker / backups.

Backitup can also restore from NAS, Dropbox or Google Drive, but the local variant has the least chance of problems.

If you already have experience with mounting the NAS, this can also be used, especially since you can then directly access the existing directory of the old installation.
However, this tutorial relates to a locally saved backup.

If ioBroker Backup has been successfully saved, Backitup is now opened and the "Restore" tab is opened.
Set the "backup source" to local there and then save.

![Restore tab](../../de/tutorial/media/restore/1575301096581-restoretab.jpg)

If ALL instances are to start automatically after the restore, the "Start all adapters after restore" option must be activated and then saved.
If the backup is to be restored on another host, this option should not be used because the IP addresses may have to be adjusted before starting the individual instances.

After saving, the existing backups can be called up on the local path using the "Get backups" button.

The backup just copied via FTP should appear in the list under "iobroker".
Now select this.

![Selection of backups](../../de/tutorial/media/restore/1575301146928-restoreliste.jpg)

After selection, there is a message that iobroker is stopped for the restore and then started again.

![Start restore](../../de/tutorial/media/restore/1575301175231-restorestart.jpg)

Here you have started the actual recovery process.

![Restore is in progress](../../de/tutorial/media/restore/1575301208033-restore.jpg)

Another tab now opens in your browser, in which you can follow the recovery process as on the console in the WebUI of Backitup.

![restoreWebUI.JPG](../../de/tutorial/media/restore/restoreWebUI.JPG)

After the restore has been successfully completed, you will also receive the message in the WebUi of the restore.

![restoreWebUI_finish.JPG](../../de/tutorial/media/restore/restoreWebUI_finish.JPG)

The recovery may take some time depending on the performance of the system and the size of the old ioBroker installation.
Normally, the restore should be completed after approx. 10-15 minutes and ioBroker should be started again automatically.

![Restore done](../../de/tutorial/media/restore/1575301228008-restorefinish.jpg)

In very rare cases it happens that ioBroker does not start automatically after restore.
If this is the case, you can start the iobroker manually using the following command via the console.

```
iobroker start
```

Now ioBroker should start again and in the "Log" tab you can see that all adapters that were installed on the old system are being newly installed by npm.

Now a little patience has to be applied and iobroker can be done easily.
In the instances you can see which adapters are gradually installed.
All adapters that are still being installed or are on hold do not yet have an icon in the instances.
Please do not restart ioBroker, at most refresh the view with F5 every now and then until all instances have an icon.

Depending on the size of the installation and the speed of your computer and the internet connection, this can easily take 2-3 hours.

Congratulations, the newly installed system is now complete with all settings, scripts, visualizations, etc.

With Backitup there is now the possibility to restore further data if it was backed up in advance on the old system.
You can restore the Redis database, the Zigbee database, the mySql database and your history data using the same steps as described above.

The list of the retrieved backups would then look like this in the example.

![complete list](../../de/tutorial/media/restore/1575362131512-fullliste.jpg)

*****************************************************************************************************************************************

#### **2. manual restore with the terminal commands**
First of all, a few commands must be issued via putty or similar.

First a backup folder has to be created:

```
sudo mkdir /opt/iobroker/backups
```

Here too, an sftp program such as FileZilla or WinSCP the backup created on the old system and possibly also Redis backup, zigbee backup etc.
stored in the / opt / iobroker / backups folder.

If states and objects were stored in the Redis DB, the backed up Redis database should be restored here first.
If only the states ran under Redis, this does not necessarily have to be in advance.

Once this is done, stop your ioBroker as follows:

```
iobroker stop
```

Afterwards please check whether everything is stopped with the following commands:

```
iobroker status
```

If all outputs are correct and iobroker has been stopped, the restore can now be carried out via the console with the following commands:

```
cd /opt/iobroker
iobroker restore <Dateiname eures Backups>
```

!> **Here it is very important that only an ioBroker backup can be restored with this method.
A Redis backup, Zigbee backup, mySql backup, or the history data cannot be created with this command**

Backitup is required for this, as these were created especially with Backitup.

Depending on the system, this can now take a few minutes. The progress is displayed in the terminal.
When the restore is complete, restart ioBroker with the following command:

```
iobroker start
```

Here too, all adapters are reinstalled individually by ioBroker via npm.
This may take a while depending on the size of your installation, internet speed and system performance.
The current status can be tracked in the "Log" tab.

This is now done and the system is newly installed and all settings, scripts, visualizations, etc. restored.

### Conclusion:
Basically, both variants lead to the same result.
If you have little experience with terminal commands and feel unsafe there, Backitup is on the safe side.

However, if you want to see exactly what is happening on your system, you should choose the manual variant via the console. Here you can see every single process in detail in the terminal.