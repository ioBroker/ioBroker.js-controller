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

