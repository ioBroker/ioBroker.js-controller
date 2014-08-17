# 0.0.15 (2014-08-17)
* (hobbyquaker) adapter-settings

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

