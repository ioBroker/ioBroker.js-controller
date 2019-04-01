# Console commands for ioBroker
There is a possibility to do some operations like start, stop or update over console (windows and linux). Here is the description of them.

Note: all commands that start with ```iobroker``` can be called from any directory where iobroker command is available. ```npm install``` command must be called from ioBroker root directory.

Following commands are possible:

- [npm install iobroker.adapterName](#npm-install-iobrokeradaptername)
- [iobroker start](#iobroker-start)
- [iobroker stop](#iobroker-stop)
- [iobroker restart](#iobroker-restart)
- [iobroker isrun](#iobroker-isrun)
- [iobroker start adapterName.instance](#iobroker-start-adapternameinstance)
- [iobroker stop adapterName.instance](#iobroker-stop-adapternameinstance)
- [iobroker restart adapterName.instance](#iobroker-restart-adapternameinstance)
- [iobroker add adapterName \[--enabled\] \[--host \<host\>\] \[--port \<port\>\]](#iobroker-add-adaptername)
- [iobroker install adapterName](#iobroker-install-adaptername)
- [iobroker upload adapterName](#iobroker-upload-adaptername)
- [iobroker setup](#iobroker-setup)
- [iobroker del adapterName](#iobroker-del-adaptername)
- [iobroker del adapterName.instance](#iobroker-del-adapternameinstance)
- [iobroker update \[repository url\] \[--updatable\]](#iobroker-update-repository-url)
- [iobroker upgrade \[repository url\]](#iobroker-upgrade)
- [iobroker upgrade self \[repository url\]](#iobroker-upgrade-self)
- [iobroker upgrade adapterName \[repository url\]](#iobroker-upgrade-adaptername)
- [iobroker object get objectId](#iobroker-object-get)
- [iobroker object chmod \<object-mode\> \[state-mode\] \<id\>](#iobroker-object-chmod)
- [iobroker object chown \<user\> \<group\> \<id\>](#iobroker-object-chown)
- [iobroker object list \<id\>](#iobroker-object-list)
- [iobroker set \<instance\> \[settings\]](#iobroker-set)
- [iobroker state get objectId](#iobroker-state-get)
- [iobroker state getplain objectId](#iobroker-state-getplain)
- [iobroker state getvalue objectId](#iobroker-state-getvalue)
- [iobroker state set objectId newValue](#iobroker-state-set)
- [iobroker state del objectId](#iobroker-state-del)
- [iobroker message \<adapter\>\[.instanceid\] \<command\> \[\message\]](#iobroker-message)
- [iobroker setup](#iobroker-state-setplain)
- [iobroker clean](#iobroker-clean)
- [iobroker backup](#iobroker-backup)
- [iobroker host](#iobroker-host)
- [iobroker host set](#iobroker-host-set)
- [iobroker host remove](#iobroker-host-remove)
- [iobroker restore \<backup name or path\>](#iobroker-restore)
- [iobroker list \<type\> \[pattern\]](#iobroker-list)
- [iobroker chmod \<mode\> \[pattern\]](#iobroker-chmod)
- [iobroker chown \<user\> \[group\] \[pattern\] ](#iobroker-chown)
- [iobroker adduser \<user\> \[--ingroup group\] \[--password pass\]](#iobroker-adduser)
- [iobroker deluser \<user\>](#iobroker-deluser)
- [iobroker passwd \<user\> \[--password pass\]](#iobroker-passwd)
- [iobroker file read \<toRead\> \[toWrite\]](#iobroker-file-read)
- [iobroker file write \<toRead\> \<toWrite\>](#iobroker-file-write)
- [iobroker version \[adapterName\]](#iobroker-version)
- [iobroker uuid](#iobroker-uuid)
- [iobroker status](#iobroker-status)
- [iobroker repo \[repoName\]](#iobroker-repo)
- [iobroker info](#iobroker-info)

**Note:** there is a parameter ```--timeout 5000```, that can be used with every command. It specifies the timeout in ms for connection to DB.

## npm install iobroker.adapterName
This command must be called from root directory of ioBroker (Normally ```/opt/iobroker``` or ```C:\Program Files\ioBroker```). It uses the npm manager to install or update given adapter or js-controller. It works always, even if the "admin" or "js-controller" have the problems.

Usage examples:

- ```npm install iobroker.admin``` - update or install "admin" adapter
- ```npm install iobroker.js-controller``` - update or install js-controller itself
- ```npm install https://github.com/husky-koglhof/ioBroker.hmm/tarball/master/``` - install adapter direct from github or from some other place. It must be a ZIP or GZ package and must content package.json.

If the adapter was installed, after call of ```npm install ..``` the restart of specified adapter or whole js-controller should be done so the changes will be active.

This can be done with ```iobroker restart adapterName``` or just ```iobroker restart```. See [here](#restart) for details.

***Note:*** only packages with name **ioBroker.zzz** can be so installed.

##iobroker start
Starts the iobroker as a daemon. If the ioBroker yet started you will get the warning:

```ioBroker controller daemon already running. PID: xx```

***Note for Windows:*** normally the ioBroker under Windows is started as service. This command will start second instance of ioBroker and this will lead to conflict. Use ```serviceIoBroker.bat start``` from ioBroker directory instead of ```iobroker start``` command. You should have administrator rights to startthe service.

##iobroker stop
Stops the iobroker if it runs as a daemon. If the ioBroker not started you will get the warning:

```ioBroker controller daemon is not running```

***Note for Windows:*** normally the ioBroker under Windows is started as service. This command will have no effect. Use ```serviceIoBroker.bat stop``` from ioBroker directory instead of ```iobroker stop``` command. You should have administrator rights to stop the service.

## iobroker restart
Just the stop and start commands together. See above.

## iobroker isrun
Returns the actual status of ioBroker. Is it started or not. If ioBroker is not started the return code is 100.

Same as ```iobroker status```.

## iobroker start adapterName.instance
You can start the specified adapter from console. It will automatically enabled and started.

If adapter was started it will be restarted.

You can control in "admin" that adapter instance is now enabled.

Usage:

- ```iobroker start email.0``` - enables and starts adapter instance ioBroker.email.0

Note: you can call ```iobroker start all``` to start all disabled instances, e.g. after restore.


##iobroker stop adapterName.instance
You can stop the specified adapter from console. It will disabled and stopped. It will not be restarted automatically later.

You can control in "admin" that adapter instance is now disabled.

Usage:

- ```iobroker stop email.0``` - enables and starts adapter instance ioBroker.email.0

## iobroker restart adapterName.instance
Just restarts the specified adapter. If it was disabled it will be enabled.

## iobroker add adapterName
Full syntax is ```iobroker add adapterName [desiredInstanceNumber] [--enabled] [--host \<host\>] [--port \<port\>]```

Installs if not installed and creates the instance of specified adapter. If instance of adapter yet exists the next instance number will be used.

There are some additional parameters:

- enabled: Adapter instance will be automatically enabled after creation, elsewise the adapter predefined value will be use for that.
- host: Host name where the adapter instance must be created. You can get the list of host with ```iobroker list hosts``` command.(Not yet implemented)
- port: if adapter has settings native.port it will be set to desired value after installation.
- desiredInstanceNumber: you can specify the desired instance number.

Usage:
- ```iobroker add dwd``` - Install and create instance of dwd adapter.
- ```iobroker add admin --enabled --port 80``` - Create second (normally) instance of admin adapter on port 80 and enable it.

If this command does not work, you can always use ```npm install iobroker.adapterName``` command to force the update or install. No instance will be created, you should call ```iobroker add iobroker.adapterName``` command after that one more time.

## iobroker install adapterName
Only installs the adapter in ioBroker and creates no instance. If adapter yet installed you will get following warning:

```adapter "admin" yet installed. Use "upgrade" to install newer version.```

## iobroker upload adapterName
Upload web pages from "www" and "admin" folders in adapter into ioBroker file storage. Used normally by developers to see the changes done in the configuration pages or on "www" pages.
You cannot change the files directly in "iobroker/iobroker-data/adapter/file". There is a flag for developers in config file (*iobroker-data/iobroker.json*) objects.noFileCache to disable cache of the file. With this flag set to true (of course new start required after configuration file changed) the changes in iobroker-data directory will be seen on the web without ```iobroker upload adapterName``` command.

Note: you can call ```iobroker upload all``` to upload all adapters, e.g. after restore.

## iobroker setup
This command must be called if ioBroker was installed not with npm or windows installer (e.g. just copied from github and unpacked). It creates the default configuration file and prepares the data directories.

You can call this command with parameter "first" to be sure that nothing will be overwritten if the config yet exists.

Usage:
```iobroker setup first``` - create configuration files if not yet created.

## iobroker setup custom
To enable multi-host configuration (experimental) this command must be called. Following questions must be answered:
<pre><code>
Type of objects DB [file, couch, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]: enter IP address of the main system
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]:
Host of states DB (file), default[ip]:
Port of states DB (file), default[9000]:
</code></pre>
You can just press ENTER to take the default value shown in \[\].

**Note:** at the moment only *file* DB type is supported. If you change the ports you must be an expert.

**Note:** Check the firewall settings on the main host for the defined ports (9000/9001).

## iobroker del adapterName
Completely removes all instances and states of this adapter from ioBroker and deletes it on the disk.

You cannot restore settings of the adapter instances after deletion.

Usage:
```iobroker del dwd``` - deletes all instances and code of adapter dwd from ioBroker.

## iobroker del adapterName.instance
Removes only specified instance of this adapter from ioBroker and **not** deletes it form the disk.

You cannot restore settings of the adapter instance after deletion.

Usage:
```iobroker del dwd.0``` - deletes instance 0 of adapter dwd from ioBroker.

## iobroker update \[repository url\]
Full syntax: ```iobroker update \[repository url\]```

Read the information from configured ioBroker repository. If ```\repository url\``` is set the information will be read from this repository.

Usage:
- ```iobroker update``` - List available version from configured (normally local) repository.
- ```iobroker update https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json``` - List available version from on-line repository.

```
>./iobroker.js update
Cannot get version of "virtual".
Cannot get version of "geofency".
update done
Adapter    "zwave"         : 0.1.0
Adapter    "yr"            : 0.1.2    , installed 0.1.2
Adapter    "web"           : 0.2.6    , installed 0.2.6
Adapter    "vis"           : 0.2.9    , installed 0.2.9
Adapter    "virtual"
Adapter    "sonos"         : 0.1.5    , installed 0.1.4 [Updateable]
Adapter    "rickshaw"      : 0.2.1    , installed 0.2.1
Adapter    "pushover"      : 0.1.0
Adapter    "onkyo"         : 0.0.4
Adapter    "telnet"        : 0.0.0
Adapter    "socketio"      : 0.2.3    , installed 0.2.3
Adapter    "simple-api"    : 0.0.3    , installed 0.0.3
Adapter    "sayit"         : 0.3.0    , installed 0.3.0
Adapter    "ping"          : 0.1.3    , installed 0.1.3
Adapter    "node-red"      : 0.1.5    , installed 0.1.5
Adapter    "mqtt"          : 0.1.6    , installed 0.1.5 [Updateable]
Adapter    "mobile"        : 0.0.2
Adapter    "legacy"        : 0.1.12
Adapter    "knx"           : 0.0.1
Controller "js-controller" : 0.5.14   , installed 0.5.14
Adapter    "javascript"    : 0.2.3    , installed 0.2.3
Adapter    "ical"          : 0.0.2    , installed 0.0.1 [Updateable]
Adapter    "hmm"           : 0.0.15   , installed 0.0.16
Adapter    "hue"           : 0.2.0    , installed 0.2.0
Adapter    "hm-rpc"        : 0.3.5    , installed 0.3.4 [Updateable]
Adapter    "hm-rega"       : 0.1.17   , installed 0.1.17
Adapter    "history"       : 0.1.3    , installed 0.1.3
Adapter    "highcharts"    : 0.0.0
Adapter    "graphite"      : 0.1.0
Adapter    "geofency"
Adapter    "example"       : 0.1.1    , installed 0.1.1
Adapter    "email"         : 0.1.0
Adapter    "dwd"           : 0.1.7    , installed 0.1.7
Adapter    "cul"           : 0.0.2    , installed 0.0.3
Adapter    "b-control-em"  : 0.1.1
Adapter    "artnet"        : 0.0.3
Adapter    "admin"         : 0.3.21   , installed 0.3.20 [Updateable]
```

This command changes nothing, just updates internal information about available adapter version and shows it.

To show only updatable adapters use filter "--updatable".

## iobroker upgrade
Full syntax: ```iobroker upgrade \[repository url\]```

Upgrades all adapters (not js-controller) if they are available with newer version in specified repository. If no repository link specified, so configured repository will be used.

Usage:

- ```iobroker upgrade``` - upgrade all adapters.
- ```iobroker upgrade https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json``` - upgrade all adapters from on-line repository

## iobroker upgrade self
Full syntax: ```iobroker upgrade self \[repository url\]```

This command upgrades ioBroker.js-controller to version, that will be found in repository.

**Note:** If specified or configured repository has lower version it will be downgraded to this version.

- ```iobroker upgrade self``` - upgrade js-controller to version in the configured repository.
- ```iobroker upgrade self https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json``` - upgrade js-controller to version from on-line repository.

## iobroker upgrade adapterName
Full syntax: ```iobroker upgrade adapterName \[repository url\]```

This command upgrades specified adapter to version, that will be found in repository.

**Note:** If specified or configured repository has lower version it will be downgraded to this version.

- ```iobroker upgrade email``` - upgrade ioBroker.email adapter to version in the configured repository.
- ```iobroker upgrade email https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json``` - upgrade ioBroker.email adapter to version from on-line repository.

## iobroker object get
Full syntax: ```iobroker get objectId```

Reads from command line the description of the object:
C:\pWork>iobroker object get system.adapter.admin.0.uptime

```
>./iobroker object get system.adapter.admin.0.uptime
{
  "_id":"system.adapter.admin.0.uptime",
  "type":"state",
  "common":{"name":"admin.0.uptime","type":"number","role":"indicator.state","unit":"seconds"},
  "native":{}
}
```
**Note:** Normally output is not formatted, but you can use flag "--pretty" to format them.

## iobroker object chmod
Format: ```iobroker object chmod <object-mode> [state-mode] <id>```

ID can be a pattern with '\*'. '\*' can be only at the end of pattern.

## iobroker object chown
Format: ```iobroker object chown <user> <group> <id>```

ID can be a pattern with '\*'. '\*' can be only at the end of pattern.

## iobroker object list
Format: ```iobroker object list <id>```

List permissions of objects, like:

```
>iobroker object list system.adapter.admin.*

ObjectAC | StateAC |     User     |     Group    | ID
---------+---------+--------------+--------------+--------------
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.uptime
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memRss
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapTotal
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapUsed
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.connected
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.alive
rw-r--r--                    admin  administrator system.adapter.admin.0
```

ID can be a pattern with '\*'. '\*' can be only at the end of pattern.

## iobroker set
Full syntax: ```iobroker set <instance> [--port value] [--enabled true|false] [--ip address] [--auth true|false] [--ssl true|false] [—-ttl value]```
Used to modify instance settings from console. Following settings can be modified:
- port - change port, where the instance is bound
- enabled - enable/disable the instance (Can be done with ```iobroker start|stop <instance>``` too)
- ip - change binded ip address
- auth - enable or disable authentication
- ssl - switch SSL protocol on or off
- ttl - login timeout in seconds

## iobroker state get
Full syntax: ```iobroker state get stateId```
Read JSON value of the state:
```
>./iobroker state get system.adapter.admin.0.uptime
{"val":496,"ack":true,"ts":1425925626,"from":"system.adapter.admin.0","lc":1425925626}
```

You can use "--pretty" flag to format the output:

```
>./iobroker state get system.adapter.admin.0.uptime --pretty
{
  "val": 496,
  "ack": true,
  "ts": 1425925626,
  "from": "system.adapter.admin.0",
  "lc": 1425925626
}
```

## iobroker state getplain
Full syntax: ```iobroker state getplain stateId```

Read plain value of the state as a list attributes:
```
>./iobroker state getplain system.adapter.admin.0.uptime
571
true
system.adapter.admin.0
1425925701
1425925701
```
## iobroker state getvalue
Full syntax: ```iobroker state getvalue stateId```

Read plain value of the state as a list attributes:
```
>./iobroker state getvalue system.adapter.admin.0.uptime
571
```
## iobroker state set
Full syntax: ```iobroker state set stateId newValue ack```

Set value of the state. "ack is by default = false.

```>iobroker state set sayit.0.tts.text "Текст сказать"```

```>iobroker state set adapter.0.states.temperature 28.5 true```

There is no error message if ID is wrong.

## iobroker state del
Full syntax: ```iobroker state del stateId```

Remove the state.

## iobroker message
Full syntax: ```iobroker message adapter.instance command message```

Send a message to the given adapter-instance or all instances of the adapter when instance is not set.

## iobroker clean
Cleans all settings of ioBroker. **You cannot restore settings if you call this command.**

```
>iobroker clean yes
Deleted 205 objects.
Restarting ioBroker...
```

## iobroker backup
Backup settings of ioBroker in zip file. Backup files will be created in _backups_ directory and have names:
```2015_02_10-17_49_45_backupIoBroker.tar.gz``` with current date and time.

**Note:** not yet finished

## iobroker restore
Full syntax: ```iobroker restore <backup name or path>```
If some backups were created with command ```iobroker backup```, so they can be restored. If you call restore without parameters, you will get the list of available backups.

```
/>iobroker restore
Please specify one of the backup names:
   2015_07_18-12_20_28_backupIoBroker.tar.gz or 2015_07_18-12_20_28 or 0
   2015_07_17-21_54_01_backupIoBroker.tar.gz or 2015_07_17-21_54_01 or 1
```
You can call ```iobroker restore 0``` to use latest backup file or some other index.
Following commands are the same for given example:
- iobroker restore 0
- iobroker 2015_07_18-12_20_28
- iobroker 2015_07_17-21_54_01_backupIoBroker.tar.gz
- iobroker /opt/iobroker/backups/2015_07_17-21_54_01_backupIoBroker.tar.gz

All adapters will be restored as disabled, except "admin". To enable all adapters at once you can call "iobroker start all". If some adapters are not uploaded you can call "iobroker upload all" to upload all adapter's files at once.

## iobroker host
Change host name in the objects.

Sometimes by moving the iobroker data from one system to other it is required to change the host name. With this command it can be executed.

You must stop ioBroker before this.

To change some specific host name in the DB to the current host name write ```iobroker host oldHostName```.

To change any host name (must be only single host system, not for multihosts) write ```iobroker host this```.

## iobroker host set
You can change host name to some specific (not the computer name). For that you must write: ```iobroker host set newHostName``` to rename from actual computer name or previously specified host name.

## iobroker host remove
To delete host just write  ```iobroker host remove hostNameToRemove```. Please be careful with it.

## iobroker list
With this command it is possible to show different types of object and states in ioBroker. Examples:
- ```iobroker list objects hm-rega.0``` - show all objects of instance hm-rega.0
- ```iobroker list states hm-rega.0```  - show all states of instance hm-rega.0
- ```iobroker list files vis.0```       - show all files of instance vis.0
- ```iobroker list instances```         - show all instances
- ```iobroker list adapters```          - show all adapters
- ```iobroker list users```             - show all users
- ```iobroker list groups```            - show all groups
- ```iobroker list enums```             - show all enums
- ```iobroker list hosts```             - show all hosts

It is possible to use short names of types:
- o - objects
- s - states
- u - users
- e - enums
- g - groups
- i - instances
- f - files
- h - hosts

E.g. ```iobroker l u``` - list all users.

With the "list instances" you can use additional filters:
- enabled   - list all enabled instances
- disabled  - list all disabled instances
- port      - list all instances with port
- ip        - list all instacnes, that can be binded to some IP
- ssl       - list all instances, where SSL can be enabled

Using: ```iobroker list instacnes --enabled``` to list all enabled instances

or ```iobroker l i --port``` to list used ports.

## iobroker adduser
This command allows to create a new user (by default in "administrator" group). The group can be defined in the command with parameter "--ingroup". If the password is not specified, it must be entered from console.
E.g. create user "martin" in group "user":

```iobroker adduser martin --group user```

Create user with password:

```iobroker adduser martin --group user --password 12345```

## iobroker deluser
To delete existing user, call:

```iobroker deluser username```

User will be automatically deleted from all groups too. "admin" user cannot be deleted.

## iobroker passwd
To change password of existing user call:

```iobroker passwd username```

You will be prompted to enter password and repeat the password.
If no console interaction is desired, call:

```iobroker passwd username --password newPassword```

## iobroker chmod
Change file mode.

## iobroker chown
Change file owner.

## iobroker file read
Read file from DB and store it on the local file system.
Usage:
```iobroker file read <fileToRead> [storeFile]```
storeFile is optional, but can be path to directory or to the new file.

Example:
```iobroker file read /vis.0/main/img/picture.png /opt/myfile.png```

„file“ and „read“ can be shortened to „f r“.

## iobroker file write
Write file from local file system to the DB.
Usage:
```iobroker file write <fileToRead> <storeFile>```
storeFile can be a path to direcotry in DB or can be a full name

Example:
iobroker file write /opt/myfile.png /vis.0/main/img/picture.png

„file“ and „write“ can be shortened to „f w“.

## iobroker version
Show version of adapter or of js-controller.

Version of js-controller:

```
>iobroker version
0.11.2
>iobroker -v
0.11.2
>iobroker --version
0.11.2
```

Version of admin adapter:

```
>iobroker version admin
1.5.4
>iobroker admin -v
1.5.4
>iobroker admin --version
1.5.4
```

## iobroker uuid
Show UUID of this ioBroker installation.

```
>iobroker uuid
8f73s7c9-2fd6-3066-189a-cccccccccc
```
## iobroker status
If ioBroker runs or not.

## iobroker repo
Show configured repositories or select one.

```
C:\ioBroker>ioBroker repo
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: fast
```

```
C:\ioBroker>ioBroker repo default
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: default
```

## iobroker info
Collect information about this host.

```
Platform       : Windows
Architecture   : x64
CPUs           : 4
Speed          : 2496 MHz
Model          : Intel(R) Core(TM) i7-7660U CPU @ 2.50GHz
RAM            : 15.9 GB
System uptime  : 13d. 13:18:04
Node.js        : v8.11.1
adapters count : 176
Disk size      : 949.9 GiB
Disk free      : 813.3 GiB
NPM            : v5.8.0
```
