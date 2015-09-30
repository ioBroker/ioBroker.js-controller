# 0.7.13 (2015-09-30)
* (bluefox) add vis-jqui-mfd
* (bluefox) allow install direct from github in admin
* (bluefox) add vis-fancyswitch, vis-rgraph
* (bluefox) fill state by createState even if no default value set
* (bluefox) add modbus

# 0.7.12 (2015-09-15)
* (bluefox) add terminal adapter
* (bluefox) inplement "iobroker url xxx"
* (bluefox) fix restore
* (bluefox) fix _failCounter entry in Adapters
* (bluefox) fix log outputs

# 0.7.11 (2015-08-23)
* (bluefox) fix installation of adapter

# 0.7.10 (2015-08-22)
* (bluefox) fix first installation

# 0.7.9 (2015-08-20)
* (bluefox) fix broker upgrade
* (bluefox) improve vis upload
* (bluefox) fix adapter.deleteChannel
* (bluefox) use regex by deleting of channel or instance
* (bluefox) fix delete instance errors
* (bluefox) add new console commands: set, host. To set settings of instance from console and change host name.

# 0.7.8 (2015-08-12)
* (bluefox) fix error with node-red
* (bluefox) move setup files into directories

# 0.7.7 (2015-08-11)
* (bluefox) add harmony to repository

# 0.7.6 (2015-08-06)
* (bluefox) change log file extension to .log
* (bluefox) enable destroyDB, but check before if ioBroker is running
* (bluefox) update packages
* (bluefox) add bars, plumbs, scenes

# 0.7.5 (2015-07-27)
* (bluefox) add "iobroker upload all" and "iobroker start all" commands
* (bluefox) fix "iobroker package"
* (bluefox) make it possible to allow OBJECTS and STATES only on localhost
* (bluefox) add new adapter pushbullet
* (bluefox) fix restart by installing.

# 0.7.4 (2015-07-19)
* (bluefox) fix restartAdapters flag.(for vis-metro and co)
* (bluefox) add vis-hqWidgets
* (bluefox) add vis-colorpicker
* (bluefox) normalize paths in backup
* (bluefox) add better backup


# 0.7.3 (2015-07-12) 
* (bluefox) add flot to repository
* (bluefox) add chmodFile for adapter
* (bluefox) implement rm
* (bluefox) fix permissions problem
* (bluefox) set permission by creation of file
* (bluefox) make possible upload of subtree
* (bluefox) fix user name
* (bluefox) fix update function

# 0.7.2 (2015-06-29)
* (bluefox) remove _failCounter from adapter list
* (bluefox) update license

# 0.7.1 (2015-06-28)
* (bluefox) support of permissions
* (bluefox) fix backup
* (bluefox) fix error with noFileCache
* (bluefox) add unsubscribeForeignObjects to adapters
* (bluefox) add icon sets to repository
* (bluefox) implement list: objets, states, instances, adapters
* (bluefox) support of "list hosts"
* (bluefox) verify version by install and start
* (bluefox) fix error with dependencies
* (bluefox) fix delete of logs
* (bluefox) fix getPort function in adapter.


# 0.7.0 (2015-05-07)
* (bluefox) support of permissions

# 0.6.6 (2015-05-07)
* (bluefox) implement daily rolling files.
* (bluefox) fix addChannelToEnum, deleteChannelFromEnum, deleteChannel if no device name
* (bluefox) fix "state set", "message" console commands
* (bluefox) fix errors in adapter.js

# 0.6.5 (2015-04-27)
* (bluefox) add default certificates

# 0.6.4 (2015-04-17)
* (bluefox) optimize install call
* (bluefox) backup/restore

# 0.6.3 (2015-04-16)
* (bluefox) use system npm for update and install
* (bluefox) generate uuid as hash of MAC
* (bluefox) delete empty adaptors from repository

# 0.6.0 (2015-03-22)
* (bluefox) try to implement backup/restore
* (bluefox) support of "--install" flag for sayIt
* (bluefox) add megad to repository
* (bluefox) enable subscribeStates() same as subscribeStates('*')
* (bluefox) replace "slient" mode with "install" mode

# 0.5.14 (2015-03-11)
* (bluefox) enable silent mode

# 0.5.14 (2015-03-08)
* (bluefox) update utils.js (silent mode)
* (bluefox) fix error by setup.js

# 0.5.12 (2015-03-07)
* (bluefox) fix error with sendTo('email')
* (bluefox) increase timeout for npm to 5000 ms

# 0.5.11 (2015-02-26)
* (bluefox) fix function deleteDevice in adapter.js

# 0.5.10 (2015-02-26)
* (bluefox) do not start more times the scheduled task after a long sleep

# 0.5.9 (2015-02-21)
* (bluefox) fix error with trimFifo (used for history adapter)
* (bluefox) use system "npm" by updating of js-controller

# 0.5.8 (2015-02-18)
* (bluefox) add start/stop/restart adapter from console.
* (bluefox) better wakeup of adapters.

# 0.5.7 (2015-01-14)
* (bluefox) add sayit adapter
* (bluefox) fix clear of log file

# 0.5.4 (2015-01-27)
* (bluefox) fix restart under windows

# 0.5.5 (2015-01-30)
* (bluefox) add yr as npm
* (bluefox) extend adapter.js with formatDate

# 0.5.6 (2015-02-06)
* (bluefox) add simple-api

# 0.5.3 (2015-01-27)
* (bluefox) fix log for restart

# 0.5.2 (2015-01-27)
* (bluefox) remove node-windows from dependencies

# 0.5.1 (2015-01-26)
* (bluefox) fix log
* (bluefox) show npm version and not git version
* (bluefox) use npm packet to install and not the exec npm

# 0.5.0 (2015-01-23)
* (bluefox) make it possible to install ioBroker with "npm install iobroker"

# 0.4.6 (2015-01-21)
* (bluefox) add developing flag "noFileCache" to do not cache web files.
* (bluefox) improve "adapter.getPort" on windows.
* (bluefox) create iobroker.sh with 0777 by install

# 0.4.5 (2015-01-20)
* (bluefox) fix problem with no objects after "setup" started

# 0.4.4 (2015-01-20)
* (bluefox) move "data" directory by "npm install" to "../../iobroker-data"

# 0.4.3 (2015-01-18)
* (bluefox) restart objects socket if some exception occurs

# 0.4.2 (2015-01-14)
* (bluefox) fix error in objectsInMemClient and objectsInMemServer

# 0.4.1 (2015-01-10)
* (bluefox) fix first setup

# 0.4.0 (2015-01-10)
* (bluefox) support of multiple hosts

# 0.3.17 (2015-01-10)
* (bluefox) fix problem with "hosts are not shown in admin"

# 0.3.16 (2015-01-09)
* (bluefox) support of multiple hosts

# 0.3.15 (2015-01-09)
* (bluefox) "chmod 777 * -R /opt/iobroker" => "chmod 777 -R /opt/iobroker"

# 0.3.14 (2015-01-09)
* (bluefox) fix error update of js-controller under linux/osx

# 0.3.13 (2015-01-08)
* (bluefox) fix error with publish/subscribe

# 0.3.12 (2015-01-07)
* (bluefox) support of "onlyWWW" flag

# 0.3.11 (2015-01-06)
* (bluefox) fix error if state is null or undefined
* (bluefox) store fifos from states in file

# 0.3.10 (2015-01-06)
* (bluefox) support of file manager in vis

# 0.3.9 (2015-01-04)
* (bluefox) try to fix update of controller

# 0.3.8 (2015-01-04)
* (bluefox) fix error with subscribes
* (bluefox) fix error with extendObject
* (bluefox) fix error with delete adapter
* (bluefox) fix error in deleteChannelFromEnum

# 0.3.7 (2015-01-03)
* (bluefox) fix upload problem

# 0.3.6 (2015-01-03)
* (bluefox) fix package.json

# 0.3.1 (2015-01-02)
* (bluefox) enable npm install

# 0.3.0 (2014-12-28)
* (bluefox) no redis any more

# 0.2.9 (2014-12-20)
* (bluefox) fix problem with restart controller
* (bluefox) check flag supportStopInstance before send signal to adapter

# 0.2.8 (2014-12-20)
* (bluefox) fix problem with upgrade adapter

# 0.2.7 (2014-12-19)
* (bluefox) fix problem with upload adapter

# 0.2.6 (2014-12-19)
* (bluefox) implement getConfigKeys in redis.
* (bluefox) new running mode: "once"

# 0.2.5 (2014-12-14)
* (bluefox) enable start of "no-daemon" adapters like "rickshaw" or "vis".

# 0.2.4 (2014-12-10)
* (bluefox) fix delObject function
* (bluefox) remove unused log message

# 0.2.3 (2014-12-08)
* (bluefox) optimize start/stop/restart.

# 0.2.2 (2014-12-06)
* (bluefox) fix error in redis.

# 0.2.1 (2014-12-06)
* (bluefox) fix error in redis.

# 0.2.0 (2014-12-04)
* (bluefox) remove couchDB and store everything in redis.

# 0.1.6 (2014-11-29)
* (bluefox) use npm to install some adapters.

# 0.1.5 (2014-11-26)
* (bluefox) fix log in controller.js one more time

# 0.1.4 (2014-11-26)
* (bluefox) fix log in controller.js

# 0.1.3 (2014-11-24)
* (bluefox) fix some errors and add restart.js

# 0.1.2 (2014-11-24)
* (bluefox) fix messageboxes

# 0.1.1 (2014-11-23)
* (bluefox) fix log output in admin.

# 0.1.0 (2014-11-22)
* (bluefox) new naming concept. No children and parents set extra.

# 0.0.37 (2014-11-16)
* (bluefox) fix adapter.js
* (bluefox) call "chmod +x iobroker" after updgrade of controller

# 0.0.36 (2014-11-15)
* (bluefox) fix adapter.js

# 0.0.35 (2014-11-09)
* (bluefox) add logging to controller

# 0.0.34 (2014-11-08)
* (bluefox) create restore/backup (from console)

# 0.0.33 (2014-11-04)
* (bluefox) support of node-red as adapter and defined exit codes for errors

# 0.0.32 (2014-11-04)
* (bluefox) support of node-red as adapter

# 0.0.31 (2014-11-02)
* (bluefox) fix error with binary states

# 0.0.30 (2014-11-01)
* (bluefox) fix error in "support of listDevices for configuration"

# 0.0.29 (2014-10-30)
* (bluefox) (bluefox) fix creatChannel for adapter

# 0.0.28 (2014-10-30)
* (bluefox) support of listDevices for configuration

# 0.0.27 (2014-10-30)
* (bluefox) check common.os (e.g. to install adapter only on linux)
* (bluefox) support of common.install adapter settings.

# 0.0.26 (2014-10-25)
* (bluefox) change state names to 'io.*'

# 0.0.25 (2014-10-24)
* (bluefox) show version in log

# 0.0.24 (2014-10-22)
* (bluefox) fix dependencies of packets

# 0.0.22 (2014-10-20)
* (bluefox) fix error in adapter.js

# 0.0.21 (2014-10-19)
* (bluefox) store repository in the DB

# 0.0.20 (2014-10-19)
* (bluefox) change example adapter for emitEvent
* (bluefox) support of certificates
* (bluefox) fix names for states

# 0.0.19 (2014-10-02)
* (bluefox) fix add/delete adapter
* (bluefox) fill source-dist.json with grunt
* (bluefox) call "npm install" after adapter updated

# 0.0.18 (2014-09-27)
* (bluefox) new concept of updates and repositories

# 0.0.17 (2014-09-04)
* (hobbyquaker) trimFifo calls callback with trimmed data
* (hobbyquaker) fix instance restart

# 0.0.16 (2014-08-22)
* (hobbyquaker) admin-ui: enums
* (hobbyquaker) admin-ui: ...
* (hobbyquaker) fixes

# 0.0.15 (2014-08-17)
* (hobbyquaker) admin-ui: adapter-settings
* (hobbyquaker) admin-ui: add instance
* (hobbyquaker) admin-ui: cmd execution

# 0.0.14 (2014-08-11)
* (bluefox) adapter admin: https
* (bluefox) adapter admin: auth
* (bluefox) admin-ui: user and group management
* (hobbyquaker) fixes
* (hobbyquaker) added adapter cul to sources-dist.json

# 0.0.13 (2014-07-31)
* (hobbyquaker) new object types user and group
* (hobbyquaker) iobroker setup: create user and group admin. Default password: iobroker

# 0.0.12
* (hobbyquaker) setup.js fixes
* (hobbyquaker) setup.js create multiple system objects


# 0.0.11
* (hobbyquaker) admin ui: instances

# 0.0.10

* (hobbyquaker) refactoring controller.js and setup.js
* (hobbyquaker) iobroker.js command line options
* (hobbyquaker) iobroker with shebang (needs chmod +x)
* (hobbyquaker) added dbdump.js
* (hobbyquaker) fixes and other stuff...

# 0.0.9

* (hobbyquaker) Javascript Script Engine
* (bluefox) Gruntfile.js
* (bluefox) SCHEMA.md


# 0.0.8

* (hobbyquaker) ctrl: instance mode schedule
* (hobbyquaker) iobroker.js add: set instanceObjects (new attribute in io-package.json)
* (hobbyquaker) added meta attribute to sources.json
* (hobbyquaker) added adapter yr to sources.json

# 0.0.7

* (hobbyquaker) fix Admin UI - handle IDs with spaces


# 0.0.6

* (hobbyquaker) download adapters via ```iobroker.js add <adapter-name>``` (has to be defined in conf/sources.json)
* (hobbyquaker) automatically install node dependencies on ```iobroker.js add```
* (hobbyquaker) restructuring
* (hobbyquaker) history adapter
* (hobbyquaker) renamed adapter web to admin (this adapters purpose is to do only the admin-ui)
* (hobbyquaker) renamed adapter legacy to web (this adapter should provide a ccu.io-like webserver for easy porting of dashui, scriptgui, yahui, ...)
* (hobbyquaker) renamed adapter dummy to example



# 0.0.5

* (hobbyquaker) hm-rpc Adapter checks Datapoint-Type and warns if readonly
* (hobbyquaker) Admin-UI - gridStates update on stateChange

# 0.0.4

* (hobbyquaker) hm-rega Adapter
* (hobbyquaker) ctrl restarts crashed adapters automatically

# 0.0.3

* (hobbyquaker) Adapter web
* (hobbyquaker) Admin UI

# 0.0.2

* (hobbyquaker) Installation/instancing of adapters via ```iobroker.js add```
* (hobbyquaker) Adapter command line param instead of IPC
* (hobbyquaker) Config-file iobroker.json

# 0.0.1

* (hobbyquaker) first release

