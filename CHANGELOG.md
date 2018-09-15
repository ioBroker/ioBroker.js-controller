## 1.5.3 (2018-09-15) Evolution release (Ann)
* (bluefox) disable the auto-control of quality codes

## 1.5.2 (2018-09-14) Evolution release (Ann)
* (bluefox) Let's encrypt fixes
* (bluefox) Fix SSL issue with authentication

## 1.5.1 (2018-09-14) Evolution release (Ann)
### Breaking changes:
* (bluefox) Breaking changes: "][*,;'"`<>?" are no more allowed in IDs

### Feature changes:
* (bluefox) the user by changing of states and objects is logged
* (bluefox) install specific version of missing adapter
* (bluefox) add disk info
* (bluefox) add memAvailable state
* (bluefox) add noChmod experimental settings
* (bluefox) stop instances only if they belongs to current host
* (bluefox) delete adapter only on current host and leave it on others
* (bluefox) Combine States and Objects (#203)
* (bluefox) Implement adapter.terminate('Because I need it') (#197)
* (alcalzone) add restart, disable, updateConfig methods to Adapter class
* (bluefox) add reinstall.js
* (bluefox) add "iob" as shortcut
* (bluefox) add getInterfaces to sendToHost
* (bluefox) implement backup of data folders via dataFolder flag
* (alcalzone) Add a wrapper method to safely expose ES6 classes to legacy code
* (bluefox) add information if instance is alive in "list instances"
* (stabilostick) added 'pidusage' for information about cpu and new states per adapter instance
* (bluefox) support of new mime types: pdf, doc, xls, ppt
* (bluefox) implement flag common.eraseOnUpload
* (bluefox) set quality codes on connection lost and adapter disconnect
* (alcalzone) Give adapters a chance to handle their own uncaught errors
* (alcalzone) Add call stack information to hard to trace error logs
* (bluefox) add pattern2RegEx to tools

### Fixes and Optimizations:
* (apollon77) the node10 testing was added
* (bluefox) the read file function was protected
* (bluefox) possible access rights problem was closed
* (bluefox) refactoring of memory calculations
* (bluefox) set default values of states by creation of new instances
* (alcalzone) Fix "install npm" messages, upgrade node typings to v6
* (bluefox) check if mem file could be read
* (buzzy1337) fix calculation of kilobyte to megabyte and fix reading /proc/meminfo
* (bluefox) Fix: Access to log files through admin does not work
* (bluefox) fix redis disconnect
* (bluefox) Update acme to V2 (#199)
* (bluefox) Improve deleteDevice (#186)
* (bluefox) fix cookie expiration
* (alcalzone) several async and testing fixes
* (bluefox) timeout for npm check added
* (bluefox) fix "object chmod 777 777 javascript.0.*" command
* (bluefox) do not send ready second time on reconnect db
* (Apollon77, Bluefox) prevent defaultObj to be overwritten with normal common details
* (bluefox) fix error if ID is empty
* (bluefox) check id by setObject
* (apollon77) Add amazon-dash to list of adapter to be installed with unsafe-perm
* (bluefox) leave backitup enabled after restore

## 1.4.2 (2018-04-12)
Main changes: add instance with desired number, Force using of socket.io 2.1.0, Bugfixes

* (bluefox) fix error with letsencrypt debug output
* (bluefox) fix delObject
* (bluefox) fix restore of backup
* (bluefox) allow to add instance with desired number
* (apollon77) fix auto multihost
* (bluefox) fix for adapter update
* (bluefox) Force using of socket.io 2.1.0

## 1.4.0 (2018-04-03)
Main changes: uninstall via npm, downgrade winston-syslog, refactored deleteAdapter, object.json auto-backups

* (AlCalzone) fix npm version pre-install check
* (bluefox) remove winston-syslog 2.0 and replace it with 1.2.6
* (AlCalzone) refactored and promisified `deleteAdapter` and `deleteInstance`
* (bluefox) remove controller from the adapters list in admin
* (bluefox) also uninstall adapters using npm
* (bluefox) backup object.json files every 2 hours for last 48 hours (warning! Disk usage)
* (bluefox) added cli command to update/add the vis/knx license

## 1.3.0 (2018-03-11)
Main changes: socket.io Version downgraded because of bug. Better npm5 support

* (AlCalzone) Remove the outdated npm package and disable package-lock before installing (#175)
* (AlCalzone) reworked npm adapter version check without `npm` package
* (AlCalzone) ignore local NPM for version check
* (AlCalzone) don't modify the parent's process PATH variable
* (AlCalzone) check npm version before installing and potentially disable package-lock
* (AlCalzone) don't cancel installation, or we're breaking ioBroker anyways
* (AlCalzone) ignore local npm version for preinstall check
* (bluefox) move socket.io from 2.0.4 to 1.5.1 because of bug
* (bluefox) add intro to default tabs

## 1.2.7 (2018-03-06)
Main changes: support of npm5, Multihost fixed, added promises to adapter.js

* (bluefox) fix multihost connect
* (bluefox) add "multihost status" command
* (bluefox) make statistics interval adjustable
* (bluefox) better scan of installed adapters
* (bluefox) better deletion of adapters
* (bluefox) fix requests like getStates('*.info.connection')
* (bluefox) create instance's objects by start.
* (AlCalzone) Add promisified methods to the adapter class
* (AlCalzone) enable basic type-checking and fix found error
* (Apollon77) fix potential error and check if that.log exists
* (bluefox) updates npm packets
* (Apollon77) log an error when npmInstallWithCheck throws
* (AlCalzone) [npm5] Disable package-lock.json before installing anything
* (Apollon77) use stable tag from admin in dependencies
* (bluefox) fix empty ID error

## 1.2.5 (2018-01-27)
* (bluefox) move buildRepository.js to ioBroker.repositories
* (bluefox) fix adapter download
* (Apollon77) also include npm5 fix into reinstall.sh
* (bluefox) add functions to standard enums
* (bluefox) check if pattern is valid
* (bluefox) catch error by deleting of adapter.
* (bluefox) better adapter directory search
* (Apollon77) another fix for reinstall.sh, add --unsafe-perm
* (Apollon77) exit mocha tests explicitely when completed, needed pot. with most current version of mocha
* (Apollon77) add npm5 check and "Block" to "iobroker install" commands

## 1.2.4 (2017-12-15)
* (bluefox) The fix for npm5

## 1.2.3 (2017-11-24)
* (bluefox) fix windows problem and storing of error messages
* (bluefox) fix logging level: silly
* (bluefox) fix dependency check
* (bluefox) fix small errors
* (bluefox) add repo commands to cli
* (bluefox) setTimeout(0) => setImmediate
* (bluefox) add timestamp and "from" information object
* (bluefox) allow to enable redis by setup
* (bluefox) catch backup errors
* (bluefox) ignore errors by setup first
* (bluefox) fix generate repository 
* (bluefox) calculate number of datapoints in vis and deliver it in statistics
* (bluefox) fix restoring of backup
* (AlCalzone) fix install urls ending with ".git"

## 1.2.0 (2017-09-24)
* (bluefox) fixed upgrade command
* (bluefox) allow install from custom repositories
* (bluefox) remove online and sources repositories
* (bluefox) fix multihosts command
* (bluefox) catch the error outputs of instances if they die
* (bluefox) no more support for node.js 0.10/0.12
* (bluefox) add new logging level: silly

## 1.1.3 (2017-08-13)
* (bluefox) Extend statistics (node.js versions and some HW parameters will be reported)
* (bluefox) Update npm packets
* (bluefox) catch semver error
* (bluefox) change interface of getDevices functions
* (bluefox) change interface of createChannel functions
* (bluefox) working on multihost service
* (bluefox) fix users cli
* (bluefox) implement defaultNewAcl
* (bluefox) remove 0.10 and add 8 by tests
* (bluefox) fix restart of adapters

## 1.1.2 (2017-07-13)
* (bluefox) Close sockets by default for external connects

## 1.1.1 (2017-06-29)
* (jens-maus) allow redis connections via unix sockets by specifying host as e.g. '/var/run/redis/redis.sock' and setting port to 0. This should slightly improve performance on busy installations.
* (Apollon77) optimizations for permission handling

## 1.1.0 (2017-06-08)
* (bluefox) BREAKING Changes: For multihost systems the user MUST explicit allow connections from other IPs in /opt/iobroker/iobroker-data/iobroker.json
  
```
"host": "127.0.0.1",
=>
"host": "0.0.0.0",
```

for objects (line 11)  and for states (line 21).

## 1.0.3 (2017-06-01)
* (bluefox) getHostInfo for new admin
* (bluefox) allow using of files for certificates
* (bluefox) always install zwave with unsafe-perm option
* (apollon77) add handling for undefined
* (apollon77) uptime is a number only and no String/List/Array beside the fact that also with a number a "toString" should exist, or it's undefined because an old host is listed with no value ...

## 1.0.1 (2017-05-03)
* (bluefox) Change repository generation (not relevant for users)
* (bluefox) small change for install porcess (not relevant for users)

## 1.0.0 (2017-04-23)
* (bluefox) No big changes, just version
* (bluefox) remove warning about iDs
* (bluefox) fix tests
* (bluefox) try to ignore npm error 1
* (bluefox) fix possible error.
* (bluefox) create states with ack=true by default
 
## 0.17.2 (2017-03-25)
* (bluefox) do not store logs and messages and just publish it
* (bluefox) remove mochawsome
 
## 0.17.1 (2017-03-15)
* (bluefox) add stable repository
* (bluefox) fix bug with user=>users (required for user rights)
* (bluefox) install discovery adapter too if exists at first start
* (bluefox) extend configuration with city, country and GPS coordinates
* (bluefox) send city and country in statistics and allow to disable it

## 0.16.2 (2017-03-08)
* (bluefox) fix "iobroker passwd username"

## 0.16.1 (2017-02-27)
* (bluefox) use SHA256 instead of SHA1 (All passwords must be reset via "iobroker passwd username")
* (bluefox) change cli commands for user: user add, user del, user set, user enable...
* (bluefox) replace letsencrypt with greenlock
* (bluefox) try to fix sha256 issue with node.js 0.10.x
* (bluefox) add uniti
* (Apollon77) change reinstall.sh script
* (bluefox) add setStateChanged
* (bluefox) implement event counters
* (bluefox) read values from cache if possible in adapter
* (bluefox) add parser adapter, smartmeter, fakeroku, wetty, fronius, Worx Landroid Rasenmäher
* (bluefox) fix log sources
* (bluefox) fix callbacks calls by setObjectNotExists
* (bluefox) fix getForeignObjects
* (bluefox) write tests
* (Patrick) adapter.namespace now always int (was int or string mixed)
* (Patrick) _fixId better results for empty obj and string (return namespace + '.')
* (bluefox) small fixes for multihost
* (bluefox) add getInstalledAdapter for autodiscovery

## 0.15.3 (2017-01-20)
* (bluefox) fix of autoSubscribe
* (bluefox) no extra uplaod if install of adapters from github

## 0.15.1 (2017-01-14)
* (bluefox) documentation of adapter
* (bluefox) support of autoSubscribe
* (bluefox) add innogy-smarthome, vis-players
* (bluefox) fix error with "preserve" settings
* (bluefox) restart adapter immediately if desired
* (bluefox) support of web extensions

## 0.14.0 (2016-12-17)
* (bluefox) add debug information for logging
* (bluefox) remove occ
* (bluefox) add mpd, icons-fatcow-hosting
* (bluefox) update node-schedule
* (bluefox) add cli command "show uuid"
* (bluefox) try to fix issue with npm3
* (bluefox) add console command "repo [name]"
* (bluefox) try to extract the information from local sources-dist.json it online not reachable
* (bluefox) add host remove
* (bluefox) install non enabled adapters
* (bluefox) install icons on backup too
* (bluefox) fix some sporadic errors

## 0.13.3 (2016-11-26)
* (bluefox) support of getLocationOnDisk message for admin
* (bluefox) allow upgrade to specific version, like adapter@0.1.0
* (bluefox) you can change any native parameter of instance with set
* (bluefox) add support of syslog (see iobroker.json to enable)
* (bluefox) add radar
* (bluefox) do not change title of instance by upload and update

## 0.13.2 (2016-11-04)
* (bluefox) fix new installation

## 0.13.1 (2016-10-31)
* (bluefox) fix renaming of host by start
* (bluefox) implement auto-objects and auto-states for adapter
* (bluefox) recursive deletion of folders with objects.unlink
* (bluefox) support of tarballs as install path
* (bluefox) rename rpi to rpi2, homekit to homekit2
* (bluefox) add upnp
* (bluefox) fix fileName of log file
* (bluefox) remove peerDependencies

## 0.13.0 (2016-10-21)
* (bluefox) fix letsencrypt to use fullchain.pem
* (bluefox) fix error with emitter
* (bluefox) fix formatDate for russian month
* (bluefox) backup letsencrypt files too
* (bluefox) install missing adapters one after other and not parallel.
* (bluefox) let remove UUID to prepare images with ioBroker
* (bluefox) using peerDependencies
* (bluefox) rename host automatically if singlehost
* (bluefox) add write/read properties to alive variable
* (bluefox) fix creation of package.json for npm 3
* (bluefox) try catch for parse of states
* (appolon77) add possibility to send messages with json
* (bluefox) updates some packages
* (bluefox) print node.js version at start
* (bluefox) force logger to use local time
* (appolon77) fix multi instance messaging
* (bluefox) using peerDependencies
* (bluefox) rename host automatically if singlehost
* (bluefox) update artnet
* (bluefox) add vis-canvas-gauges
* (bluefox) add rflink
* (bluefox) add foobar2000
* (bluefox) add mqtt client
* (bluefox) add lgtv
* (bluefox) add pushsafer

## 0.12.2 (2016-09-04)
* (bluefox) fix read versions by multihost
* (bluefox) add owntracks
* (bluefox) add amazon-dash
* (bluefox) control enabled for instance over system.adapter.NAME.INSTANCE.alive variable

## 0.12.1 (2016-09-02)
* (bluefox) fixed letsencrypt file

## 0.12.0 (2016-08-27)
* (bluefox) working on objects in redis
* (bluefox) add botvac adapter
* (bluefox) better multihost
* (bluefox) fix formatDate

## 0.11.3 (2016-08-24)
* (PArns) fix upgrade of adapters
* (bluefox) update "_design/xyz" by upgrade

## 0.11.2 (2016-08-13)
* (bluefox) fix upgrade of adapters

## 0.11.1 (2016-07-30)
* (bluefox) fix dependency if depend on js-controller

## 0.11.0 (2016-07-27)
* (bluefox) implement auto-restart of adapters (expert mode)
* (bluefox) add rights check for getBinaryState/setBinaryState
* (bluefox) support of default ttl for sessions
* (bluefox) fix custom setup
* (bluefox) fix upload binary files
* (bluefox) fix list of files in subdirectories

## 0.10.1 (2016-07-06)
* (bluefox) support of chained certificates
* (bluefox) add nut
* (bluefox) add vis-map

## 0.10.0 (2016-07-01)
* (bluefox) suport of exportand import
* (bluefox) activate redis for states
* (bluefox) fix install of adapter with singletonHost
* (bluefox) issue event if state deleted (redis)
* (bluefox) fix error with administrator users
* (bluefox) do not store repository if with errors
* (bluefox) fix checkPassword and setPassword
* (bluefox) update wrong SSL certificates
* (bluefox) add freemem state to host
* (bluefox) add milliseconds to formatDate
* (bluefox) update tar.gz

* (bluefox) add fhem
* (bluefox) add netatmo
* (bluefox) add tankerkoenig
* (bluefox) add vis-history
* (bluefox) add homepilot
* (bluefox) add cloud


## 0.9.0 (2016-05-23)
* (bluefox) make from seconds the ms
* (bluefox) add console command "isrun"
* (bluefox) add "--timeout 5000"
* (bluefox) fix small errors
* (bluefox) change function formatValue
* (bluefox) fix stop of scheduled adapters
* (bluefox) add "--logs" flag for adapter start (required by adapter debugging)
* (bluefox) make hostname configurable
* (bluefox) fix update of adapters and settings

## 0.8.10 (2016-04-25)
* (bluefox) fix restart script
* (bluefox) update default certificates

## 0.8.9 (2016-04-23)
* (bluefox) do not handle exceptions in logger
* (bluefox) change logger
* (bluefox) set valid mimeType for *.manifest
* (bluefox) add noolite adapter
* (bluefox) change download script
* (bluefox) change rename script
* (bluefox) add starline
* (bluefox) change repository building
* (bluefox) add 'delete' objects
* (bluefox) change behavior by exceptions
* (bluefox) workaround for DHCP delay
* (bluefox) fix passwd command
* (bluefox) do not write error under windows: "cannot delete log file"

## 0.8.8 (2016-02-29)
* (bluefox) replace winston with latest module
* (bluefox) add syslog support
* (bluefox) fix some LINT warnings
* (bluefox) add "host self" command (identical to "host this")
* (bluefox) fix error with npm 3 if no node_modules directory found
* (bluefox) support of noCache flag
* (bluefox) fix error if _data.json file broken
* (bluefox) support of file uploading: iobroker fileName /adapter/fileName

## 0.8.7 (2016-02-24)
* (bluefox) fix getForeignObjects
* (bluefox) add telegram
* (bluefox) enable OEM naming
* (bluefox) fix small error if multihost not available
* (bluefox) add reinstall script
* (bluefox) add vis-justgage adapter
* (bluefox) add mysensors

## 0.8.6 (2016-02-04)
* (bluefox) add text2command adapter
* (bluefox) fix upload problem
* (bluefox) use node-schedule 1.0.0
* (bluefox) extend node node_modules/iobroker.js-controller/lib/buildRepository.js command

## 0.8.5 (2016-02-01)
* (bluefox) update version of node-schedule to fix problem with Februar.2016
* (bluefox) update socket.io version
* (bluefox) add logo image
* (bluefox) add buildRepository.js
* (bluefox) If desired, that adapter must be terminated
* (bluefox) use isFloatComma in formatValue
* (soef)    formatDate extended and formatValue added
* (soef)    formatDate extended to use seconds as duratiorn
* (soef)    formatValue added to convert a value to a string with thousand separator....
* (bluefox) add homekit and miele
* (bluefox) fix upload of files

## 0.8.4 (2016-01-22)
* (bluefox) fix version
* (bluefox) fix log outputs

## 0.8.3 (2016-01-21)
* (bluefox) add commands like "npm start"
* (bluefox) check singletonHost one on host
* (bluefox) add memoryLimitMB for controller and adapters
* (bluefox) make install from NON-git sources possible again.
* (bluefox) add rpi, weatherunderground, chromecast, geofency, samsung, squeezebox, vcard, yamaha
* (husky-koglhof) occ und rpi Adapter
* (angelnu) visdebug - check for different adapter directories
* (bluefox) enable install of icons-open-icon-library-png


## 0.8.2 (2015-12-14)
* (bluefox) fix upgrade.

## 0.8.1 (2015-12-14)
* (bluefox) fix permissions for administrator group, but not admin user.
* (bluefox) support of getHistory command and defaultHistory
* (bluefox) implement "iobroker restart adapter"
* (bluefox) enable write dependencies as an object
* (bluefox) remove directory adapter and move example to iobroker.template
* (bluefox) prepare support of syslog
* (bluefox) add ioBroker.sql
* (bluefox) add ioBroker.influxdb
* (bluefox) remove example adapter (it is replaced with iobroker.template)
* (bluefox) start of renaming of js-controller to enable branding

## 0.7.15 (2015-11-10)
* (bluefox) add command visdebug
* (bluefox) add flag preserveSettings
* (bluefox) add vis-keyboard
* (bluefox) fix error with host rename
* (bluefox) fix sendTo and sendToHost with callback.
* (bluefox) update objects by upload of adapter (important for community adapters)
* (bluefox) add vis-google-fonts
* (bluefox) support of quality in setState
* (bluefox) add adapter mobile

## 0.7.14 (2015-10-13)
* (bluefox) fix restart under linux
* (bluefox) add wolf adapter to repository
* (smilingJack) increase timeout by update of repository
* (bluefox) fix set --ssl
* (bluefox) add "connectTimeout" parameter to iobroker.json. Try to fix EADDRINUSE error under raspi.

## 0.7.13 (2015-09-30)
* (bluefox) add vis-jqui-mfd
* (bluefox) allow install direct from github in admin
* (bluefox) add vis-fancyswitch, vis-rgraph
* (bluefox) fill state by createState even if no default value set
* (bluefox) add modbus

## 0.7.12 (2015-09-15)
* (bluefox) add terminal adapter
* (bluefox) inplement "iobroker url xxx"
* (bluefox) fix restore
* (bluefox) fix _failCounter entry in Adapters
* (bluefox) fix log outputs

## 0.7.11 (2015-08-23)
* (bluefox) fix installation of adapter

## 0.7.10 (2015-08-22)
* (bluefox) fix first installation

## 0.7.9 (2015-08-20)
* (bluefox) fix broker upgrade
* (bluefox) improve vis upload
* (bluefox) fix adapter.deleteChannel
* (bluefox) use regex by deleting of channel or instance
* (bluefox) fix delete instance errors
* (bluefox) add new console commands: set, host. To set settings of instance from console and change host name.

## 0.7.8 (2015-08-12)
* (bluefox) fix error with node-red
* (bluefox) move setup files into directories

## 0.7.7 (2015-08-11)
* (bluefox) add harmony to repository

## 0.7.6 (2015-08-06)
* (bluefox) change log file extension to .log
* (bluefox) enable destroyDB, but check before if ioBroker is running
* (bluefox) update packages
* (bluefox) add bars, plumbs, scenes

## 0.7.5 (2015-07-27)
* (bluefox) add "iobroker upload all" and "iobroker start all" commands
* (bluefox) fix "iobroker package"
* (bluefox) make it possible to allow OBJECTS and STATES only on localhost
* (bluefox) add new adapter pushbullet
* (bluefox) fix restart by installing.

## 0.7.4 (2015-07-19)
* (bluefox) fix restartAdapters flag.(for vis-metro and co)
* (bluefox) add vis-hqWidgets
* (bluefox) add vis-colorpicker
* (bluefox) normalize paths in backup
* (bluefox) add better backup


## 0.7.3 (2015-07-12) 
* (bluefox) add flot to repository
* (bluefox) add chmodFile for adapter
* (bluefox) implement rm
* (bluefox) fix permissions problem
* (bluefox) set permission by creation of file
* (bluefox) make possible upload of subtree
* (bluefox) fix user name
* (bluefox) fix update function

## 0.7.2 (2015-06-29)
* (bluefox) remove _failCounter from adapter list
* (bluefox) update license

## 0.7.1 (2015-06-28)
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


## 0.7.0 (2015-05-07)
* (bluefox) support of permissions

## 0.6.6 (2015-05-07)
* (bluefox) implement daily rolling files.
* (bluefox) fix addChannelToEnum, deleteChannelFromEnum, deleteChannel if no device name
* (bluefox) fix "state set", "message" console commands
* (bluefox) fix errors in adapter.js

## 0.6.5 (2015-04-27)
* (bluefox) add default certificates

## 0.6.4 (2015-04-17)
* (bluefox) optimize install call
* (bluefox) backup/restore

## 0.6.3 (2015-04-16)
* (bluefox) use system npm for update and install
* (bluefox) generate uuid as hash of MAC
* (bluefox) delete empty adaptors from repository

## 0.6.0 (2015-03-22)
* (bluefox) try to implement backup/restore
* (bluefox) support of "--install" flag for sayIt
* (bluefox) add megad to repository
* (bluefox) enable subscribeStates() same as subscribeStates('*')
* (bluefox) replace "slient" mode with "install" mode

## 0.5.14 (2015-03-11)
* (bluefox) enable silent mode

## 0.5.14 (2015-03-08)
* (bluefox) update utils.js (silent mode)
* (bluefox) fix error by setup.js

## 0.5.12 (2015-03-07)
* (bluefox) fix error with sendTo('email')
* (bluefox) increase timeout for npm to 5000 ms

## 0.5.11 (2015-02-26)
* (bluefox) fix function deleteDevice in adapter.js

## 0.5.10 (2015-02-26)
* (bluefox) do not start more times the scheduled task after a long sleep

## 0.5.9 (2015-02-21)
* (bluefox) fix error with trimFifo (used for history adapter)
* (bluefox) use system "npm" by updating of js-controller

## 0.5.8 (2015-02-18)
* (bluefox) add start/stop/restart adapter from console.
* (bluefox) better wakeup of adapters.

## 0.5.7 (2015-01-14)
* (bluefox) add sayit adapter
* (bluefox) fix clear of log file

## 0.5.4 (2015-01-27)
* (bluefox) fix restart under windows

## 0.5.5 (2015-01-30)
* (bluefox) add yr as npm
* (bluefox) extend adapter.js with formatDate

## 0.5.6 (2015-02-06)
* (bluefox) add simple-api

## 0.5.3 (2015-01-27)
* (bluefox) fix log for restart

## 0.5.2 (2015-01-27)
* (bluefox) remove node-windows from dependencies

## 0.5.1 (2015-01-26)
* (bluefox) fix log
* (bluefox) show npm version and not git version
* (bluefox) use npm packet to install and not the exec npm

## 0.5.0 (2015-01-23)
* (bluefox) make it possible to install ioBroker with "npm install iobroker"

## 0.4.6 (2015-01-21)
* (bluefox) add developing flag "noFileCache" to do not cache web files.
* (bluefox) improve "adapter.getPort" on windows.
* (bluefox) create iobroker.sh with 0777 by install

## 0.4.5 (2015-01-20)
* (bluefox) fix problem with no objects after "setup" started

## 0.4.4 (2015-01-20)
* (bluefox) move "data" directory by "npm install" to "../../iobroker-data"

## 0.4.3 (2015-01-18)
* (bluefox) restart objects socket if some exception occurs

## 0.4.2 (2015-01-14)
* (bluefox) fix error in objectsInMemClient and objectsInMemServer

## 0.4.1 (2015-01-10)
* (bluefox) fix first setup

## 0.4.0 (2015-01-10)
* (bluefox) support of multiple hosts

## 0.3.17 (2015-01-10)
* (bluefox) fix problem with "hosts are not shown in admin"

## 0.3.16 (2015-01-09)
* (bluefox) support of multiple hosts

## 0.3.15 (2015-01-09)
* (bluefox) "chmod 777 * -R /opt/iobroker" => "chmod 777 -R /opt/iobroker"

## 0.3.14 (2015-01-09)
* (bluefox) fix error update of js-controller under linux/osx

## 0.3.13 (2015-01-08)
* (bluefox) fix error with publish/subscribe

## 0.3.12 (2015-01-07)
* (bluefox) support of "onlyWWW" flag

## 0.3.11 (2015-01-06)
* (bluefox) fix error if state is null or undefined
* (bluefox) store fifos from states in file

## 0.3.10 (2015-01-06)
* (bluefox) support of file manager in vis

## 0.3.9 (2015-01-04)
* (bluefox) try to fix update of controller

## 0.3.8 (2015-01-04)
* (bluefox) fix error with subscribes
* (bluefox) fix error with extendObject
* (bluefox) fix error with delete adapter
* (bluefox) fix error in deleteChannelFromEnum

## 0.3.7 (2015-01-03)
* (bluefox) fix upload problem

## 0.3.6 (2015-01-03)
* (bluefox) fix package.json

## 0.3.1 (2015-01-02)
* (bluefox) enable npm install

## 0.3.0 (2014-12-28)
* (bluefox) no redis any more

## 0.2.9 (2014-12-20)
* (bluefox) fix problem with restart controller
* (bluefox) check flag supportStopInstance before send signal to adapter

## 0.2.8 (2014-12-20)
* (bluefox) fix problem with upgrade adapter

## 0.2.7 (2014-12-19)
* (bluefox) fix problem with upload adapter

## 0.2.6 (2014-12-19)
* (bluefox) implement getConfigKeys in redis.
* (bluefox) new running mode: "once"

## 0.2.5 (2014-12-14)
* (bluefox) enable start of "no-daemon" adapters like "rickshaw" or "vis".

## 0.2.4 (2014-12-10)
* (bluefox) fix delObject function
* (bluefox) remove unused log message

## 0.2.3 (2014-12-08)
* (bluefox) optimize start/stop/restart.

## 0.2.2 (2014-12-06)
* (bluefox) fix error in redis.

## 0.2.1 (2014-12-06)
* (bluefox) fix error in redis.

## 0.2.0 (2014-12-04)
* (bluefox) remove couchDB and store everything in redis.

## 0.1.6 (2014-11-29)
* (bluefox) use npm to install some adapters.

## 0.1.5 (2014-11-26)
* (bluefox) fix log in controller.js one more time

## 0.1.4 (2014-11-26)
* (bluefox) fix log in controller.js

## 0.1.3 (2014-11-24)
* (bluefox) fix some errors and add restart.js

## 0.1.2 (2014-11-24)
* (bluefox) fix messageboxes

## 0.1.1 (2014-11-23)
* (bluefox) fix log output in admin.

## 0.1.0 (2014-11-22)
* (bluefox) new naming concept. No children and parents set extra.

## 0.0.37 (2014-11-16)
* (bluefox) fix adapter.js
* (bluefox) call "chmod +x iobroker" after updgrade of controller

## 0.0.36 (2014-11-15)
* (bluefox) fix adapter.js

## 0.0.35 (2014-11-09)
* (bluefox) add logging to controller

## 0.0.34 (2014-11-08)
* (bluefox) create restore/backup (from console)

## 0.0.33 (2014-11-04)
* (bluefox) support of node-red as adapter and defined exit codes for errors

## 0.0.32 (2014-11-04)
* (bluefox) support of node-red as adapter

## 0.0.31 (2014-11-02)
* (bluefox) fix error with binary states

## 0.0.30 (2014-11-01)
* (bluefox) fix error in "support of listDevices for configuration"

## 0.0.29 (2014-10-30)
* (bluefox) (bluefox) fix creatChannel for adapter

## 0.0.28 (2014-10-30)
* (bluefox) support of listDevices for configuration

## 0.0.27 (2014-10-30)
* (bluefox) check common.os (e.g. to install adapter only on linux)
* (bluefox) support of common.install adapter settings.

## 0.0.26 (2014-10-25)
* (bluefox) change state names to 'io.*'

## 0.0.25 (2014-10-24)
* (bluefox) show version in log

## 0.0.24 (2014-10-22)
* (bluefox) fix dependencies of packets

## 0.0.22 (2014-10-20)
* (bluefox) fix error in adapter.js

## 0.0.21 (2014-10-19)
* (bluefox) store repository in the DB

## 0.0.20 (2014-10-19)
* (bluefox) change example adapter for emitEvent
* (bluefox) support of certificates
* (bluefox) fix names for states

## 0.0.19 (2014-10-02)
* (bluefox) fix add/delete adapter
* (bluefox) fill source-dist.json with grunt
* (bluefox) call "npm install" after adapter updated

## 0.0.18 (2014-09-27)
* (bluefox) new concept of updates and repositories

## 0.0.17 (2014-09-04)
* (hobbyquaker) trimFifo calls callback with trimmed data
* (hobbyquaker) fix instance restart

## 0.0.16 (2014-08-22)
* (hobbyquaker) admin-ui: enums
* (hobbyquaker) admin-ui: ...
* (hobbyquaker) fixes

## 0.0.15 (2014-08-17)
* (hobbyquaker) admin-ui: adapter-settings
* (hobbyquaker) admin-ui: add instance
* (hobbyquaker) admin-ui: cmd execution

## 0.0.14 (2014-08-11)
* (bluefox) adapter admin: https
* (bluefox) adapter admin: auth
* (bluefox) admin-ui: user and group management
* (hobbyquaker) fixes
* (hobbyquaker) added adapter cul to sources-dist.json

## 0.0.13 (2014-07-31)
* (hobbyquaker) new object types user and group
* (hobbyquaker) iobroker setup: create user and group admin. Default password: iobroker

## 0.0.12
* (hobbyquaker) setup.js fixes
* (hobbyquaker) setup.js create multiple system objects


## 0.0.11
* (hobbyquaker) admin ui: instances

## 0.0.10

* (hobbyquaker) refactoring controller.js and setup.js
* (hobbyquaker) iobroker.js command line options
* (hobbyquaker) iobroker with shebang (needs chmod +x)
* (hobbyquaker) added dbdump.js
* (hobbyquaker) fixes and other stuff...

## 0.0.9

* (hobbyquaker) Javascript Script Engine
* (bluefox) Gruntfile.js
* (bluefox) SCHEMA.md


## 0.0.8

* (hobbyquaker) ctrl: instance mode schedule
* (hobbyquaker) iobroker.js add: set instanceObjects (new attribute in io-package.json)
* (hobbyquaker) added meta attribute to sources.json
* (hobbyquaker) added adapter yr to sources.json

## 0.0.7

* (hobbyquaker) fix Admin UI - handle IDs with spaces


## 0.0.6

* (hobbyquaker) download adapters via ```iobroker.js add <adapter-name>``` (has to be defined in conf/sources.json)
* (hobbyquaker) automatically install node dependencies on ```iobroker.js add```
* (hobbyquaker) restructuring
* (hobbyquaker) history adapter
* (hobbyquaker) renamed adapter web to admin (this adapters purpose is to do only the admin-ui)
* (hobbyquaker) renamed adapter legacy to web (this adapter should provide a ccu.io-like webserver for easy porting of dashui, scriptgui, yahui, ...)
* (hobbyquaker) renamed adapter dummy to example



## 0.0.5

* (hobbyquaker) hm-rpc Adapter checks Datapoint-Type and warns if readonly
* (hobbyquaker) Admin-UI - gridStates update on stateChange

## 0.0.4

* (hobbyquaker) hm-rega Adapter
* (hobbyquaker) ctrl restarts crashed adapters automatically

## 0.0.3

* (hobbyquaker) Adapter web
* (hobbyquaker) Admin UI

## 0.0.2

* (hobbyquaker) Installation/instancing of adapters via ```iobroker.js add```
* (hobbyquaker) Adapter command line param instead of IPC
* (hobbyquaker) Config-file iobroker.json

## 0.0.1

* (hobbyquaker) first release

