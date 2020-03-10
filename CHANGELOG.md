# Changelog

## 3.0.0 (2020-03-xx) Release Elena
* BREAKING CHANGE: Nodejs 8.x will be no longer officially supported!
* WIP!

# 2.2.10 (2020-03-08) Release Dina - Windows Edition
**This version is especially for the new Windows Installer and will be used by it. It is not offered as normal update for the users on Linux (will not break, but not needed)!**
* (AlCalzone) do not execute npm installs with --prefix but inside a given directory on windows

## 2.2.9 (2020-02-12) Release Dina
* (Apollon77) fix pot. crash for edge cases
* (Apollon77) allow to deactivate logfile zipping by iobroker.json (for non-windows systems)
* (Apollon77) make sure sigKill state only handles number values (fixes #638)
* (bluefox) add better checks for file CLI commands
* (Apollon77) make sure directly is created before writing meta data and send redis error correctly, prevent controller crash (fixes #644)
* (foxriver76) optimize package manager handling  (fixes #631)
* (Apollon77) make sure deleting running instances does not crash js-controller (fixes #658)
* (Apollon77) Downgrade semver to stay compatible with nodejs 8

## 2.2.8 (2020-01-24) Release Dina
* (bluefox) Add for delObject the recursive flag to recursively delete objects; use feature flag ADAPTER_DEL_OBJECT_RECURSIVE in your adapter code to detect if the js-controller supports it or not!
* (bluefox) add check for sudo for package manager
* (Apollon77) Fix error on restore/validate when no name is provided
* (Apollon77) add/change checks for some calls (fixes #611 too ;-))
* (Apollon77) Add feature flag ADAPTER_DEL_OBJECT_RECURSIVE
* (Apollon77) adapter.restart used "terminate" directly which do not call unload and broke compact mode, changed to use stop()
* (foxriver76) Fix bug in nodejs version check and really disable adapter when requiring unsupported nodejs version
* (foxriver76) fixing issues in backup validation + add some missing commands to cli help
* (Apollon77) Do not have ioredis autoResubscribe because we do it by our own
* (Apollon77) change stopTimeout to prevent killing wrong process for long running "stopTimeouts" that were then fast in the end
* (bluefox) add CLI command "file rm" to delete files from iobroker storage via command line
* (AlCalzone) fix some errors
* (AlCalzone) make sure repository hash is always checked correctly
* (Apollon77) make sure scheduled starts are also removed when a scheduled instance is stopped
* (Apollon77) make sure Multihost discovery server does not unexpectedly restart  when trying to stop ioBroker Master
* (Apollon77) add feature flag ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE for adapter class
* (Apollon77) allow sessions to run longer then 24days (fixes #618, addresses ioBroker/ioBroker.admin#467)
* (Apollon77) Check a wrong check for os on installation
* (Apollon77) Also check nodejs minimum version on adapter install
* (bluefox) fix CLI "state set"
* (Apollon77) Add some more logging to Objects/States DB
* (foxriver76) check if controller is running on `upgrade self` before controller upgrade (fixes #511)
* (bluefox) Restart iobroker after applying vendor information
* (Apollon77) fix pot. crashes happening while logs are rotated or packaged (thanx @mattberther and @rogerc)

## 2.2.7 (2020-01-03) Release Dina
* (Apollon77) Update deps
* (bluefox) disable log-symlink on windows because only admins are allowed to create symlinks here
* (foxriver76) fix async version of getEncryptedConfig
* (bluefox) obj type 'adapter' not set if installing adapter via octocat (#539)
* (bluefox) fixes Change settings of onlyWWW adapter cause exception (#549) 
* Note: In order to remove custom settings you need Admin 3.7.6+

## 2.2.6 (2020-01-01) Release Dina
* (Apollon77) fix some more places where checks for not connected objects db were not triggered

## 2.2.5 (2019-12-31) Release Dina
* (Apollon77) add certificate handling if a local file is specified and do not overwrite if invalid in `setup first`
* (Apollon77) add check in objects lib
* (Apollon77) only initialize PacketManager when needed to prevent error messages shown when not relevant
* (Apollon77) change logging when no packetmanageer found to info
* (Apollon77) disable gz-log-rotation on windows; remove added logging from debugging
* (Apollon77) make sure adapters and instances can be deleted again
* (Apollon77) make sure Redis simulator only set object data, all other logic is done in objects lib

## 2.2.4 (2019-12-29) Release Dina
* (Apollon77) create symlink to current logfile (fixes #578)

## 2.2.3 (2019-12-29) Release Dina
* (Apollon77) add some logging for archiving logfiles on windows
* (Apollon77) add warning messge for getMessage method to make deprecation more visible
* (bluefox) Fix wrong error handling for adapter deletions; should work again! Fixes #576
* (bluefox) Add Package installation by js-controller for Linux based systems (apt/yum package managers) via io-package common.osDependencies[process.platform]

## 2.2.2 (2019-12-27) Release Dina
* (Apollon77) readd getMessages to adapter.js and remove in controller 2.4 later to prevent to many adapter incompatibilities now

## 2.2.1 (2019-12-27) Release Dina
* (bluefox) CLI: check if object exists by "state set" command and other fixes
* (Apollon77) Make sure adapter with longer stopTimeouts can be restarted as usual; the "stopping" flag was blocking the restart logic
* (Apollon77) make sure adapters can be stopped again with setting .alive to false
* (Apollon77) optimize questions on `setup custom`
* (Apollon77) fix log file rotation; additionally old logs are now packed with gz
* (bluefox) Fixed rights by object creation
* (bluefox) Add support for vendor specific logic and database initialization
* (Apollon77) make sure restart of instances work in all cases
* (AlCalzone) fix `iobroker start all` to not hang after starting all instances
* (Apollon77) make sure auto rotation for logs work now with winston and make sure "old style manual cleanup" too
* (Apollon77) fix error when 'iobroker url' is called without any parameter
* (Apollon77) separate system and user/adapter subscribes, introduce "changeUser" trigger for States and Objects
* (Apollon77) Also allow ÄÖÜäöüа-яА-Я as characters for first character
* (Apollon77) Also log exceptions for compact group controller
* (Apollon77) Update dependencies
* (bluefox) remove getMessage and lenMessage from adapter methods because deprecated since long time
* (Apollon77) Remove Socket.io compatibility layer - master/slave systems coming from 1.5 need to update to 2.0 or manually!
* (Apollon77) make options parameter for getObjectList optional again

## 2.1.1 (2019-11-22) Release Christina
* (bluefox) Fix host deletion
* (Apollon77) update objects lib to prevent one crash case and make sure extendObject works as intended also for JavaScript adapter
* (Apollon77) make sure adapters are also reinstalled correctly when used in compact groups

## 2.1.0 (2019-11-15) Release Christina
* (Apollon77) Stable Release as minor update to separate from development/testing phase

## 2.0.44 (2019-11-14) Release Bella Stable-RC5
* (Apollon77) optimize stopping and restarting behaviour (again)

## 2.0.43 (2019-11-12) Release Bella Stable-RC4
* (Apollon77) enhance backup error handling for invalid files - they now display errors and not break the backup process
* (Apollon77) make sure new enabled/moved instances are started directly
* (Apollon77) increase object init timeout for adapter starts before complaining/stopping
* (Apollon77) fix file read/write to not allow invalid locations and add some more checking
* (Apollon77) add some more logging for ioredis initializations

## 2.0.42 (2019-11-10) Release Bella Stable-RC3
* (Apollon77) Correct error message if certificate can not be parsed
* (bluefox) Fix upload of material adapter
* (Apollon77) prevent crash when adapter instance is deleted which is also running currently and if stopped by deletion
* (bluefox) make sure getForeignStates do not modify the input ids list
* (Apollon77) enhance `list instances` and only show compact infos if adapter supports it

## 2.0.41 (2019-11-08) Release Bella Stable-RC2
* (Stabilostick) enhance certificate methods and add certificate checks in setup first
* (Stabilostick) add `iobroker cert view <name>` CLI command
* (Apollon77) fix problems in stop controller handling

## 2.0.40 (2019-11-08) Release Bella Stable-RC1
* (Apollon77) make sure multiple instances of same adapter do not disturb each other in compact mode, finalize compact mode
* (AlCalzone) correctly handle git commits and branches as custom install sources
* (Apollon77) make sure callbacks with setImmediate return the real values from code execution and not pot. changed values from other actions (fixing file content being undefined when write/read happen in parallel)
* (Apollon77) handle more cases for aliases automatically (On/Ein is converted to true case insensitive now)
* (bluefox) getForeignStates() return correct ids when used with aliases
* (Apollon77) optimize controller group stopping
* (Apollon77) when target state is deleted also emit "null" onChange events to adapters for alias states
* (Apollon77) optimize controller stop behaviour with compact groups
* (Apollon77) make sure that schedules instances can start even after a "once" run that set a sigKill value
* (Apollon77) add method to synchronize file directories with file DB storage
  * add new CLI command "iobroker file sync <id>" to do the sync
  * integrate the sync with "iobroker setup first"

## 2.0.39 (2019-10-29) Release Bella
* (Apollon77) "upgrade name" for a controller will return an error to use "upgrade self"
* (Apollon77) "upgrade all" will no longer update controller too
* (Apollon77) add some more checks in adapter.js for existence of states/objects
* (Apollon77) enhance `iobroker setup custom` for Redis sentinel usage
* (Apollon77) make sure flot store works again also with objects with empty names

## 2.0.38 (2019-10-26) Release Bella
* (Apollon77) Add some more logic to prevent access with invalid ids
* (Apollon77) change "enhancedLogging" to not be global but "per DB"
* (Apollon77) Fix compact mode on Windows systems
* (Apollon77) make sure multiple callbacks to "unload" will be ignored
* (bluefox) Rise all user in admin group to administrators
* (Apollon77) Allow buffers to be passed in messages again
* (bluefox) Fix session storage
* (Apollon77) Introduce 0_userdata as new home for user specific files, objects and states
* (Apollon77) Enhance logging
* (bluefox) fix letsencrypt (was broken n 2.0.35)
* (Apollon77) fix install adapter starts like vis installation when db is not available
* (Stabilostick) Auto generated self-signed certificates need to have a max duration of 2 years according to new Apple rules

## 2.0.35 (2019-10-19) Release Bella
* (Apollon77) Allow to use Redis password as "pass" parameter for States and Objects
* (Apollon77) Prevent hangs on "iobroker upgrade self" from 1.5 to 2.0
* (bluefox) Update IPs information periodically
* (bluefox) Remove safe-replace, bluebird, pyconf packages
* (paul53/AlCalzone/Apollon77) Fix datatype of system.host.cpu and system.adapter.XY.Z.cpu
* (Apollon77) Make sure alias.0 and other controller objects are also checked and created if needed on setup first when updating
* (bluefox) Allow one state to multiple aliases connections
* (Apollon77) Make sure required adapters are also checked correctly when using compact mode and groups
* (Apollon77) Enhance logging for unsupported (should not happen) commands

## 2.0.34 (2019-10-17) Release Bella
* (Apollon77) Allow custom settings to be removed again if objects are "file"
* (Apollon77) Remove default value for "switch" and "level.dimmer" roles
* (bluefox) fix user authentication

## 2.0.33 (2019-10-15) Release Bella
* (Apollon77) Sync objects and states retry max delay defaults
* (Apollon77) Re-Add the certificate check and automatic re-creation for old certificates as in 1.5.14

## 2.0.32 (2019-10-15) Release Bella
* (Apollon77) Also restart controller if only states connection disconnects

## 2.0.31 (2019-10-14) Release Bella
* (Apollon77) fix undefined variable on one place

## 2.0.30 (2019-10-14) Release Bella
* (Apollon77) enhance reconnection handling (system tries to reconnect up to 40s including re-sending all data changes  before restart happens, on no connection to db on start a restart is tried every 30s)
* (Apollon77) fix file handing issue
* (bluefox) handle empty states correctly in Redis scenarios

## 2.0.29 (2019-10-13) Release Bella
* (Apollon77) fix backup on empty/null states

## 2.0.28 (2019-10-13) Release Bella
* (Apollon77) Correct meta data return for some special cases

## 2.0.27 (2019-10-13) Release Bella
* (Apollon77) Correct some potential object issues

## 2.0.26 (2019-10-13) Release Bella
* (Apollon77) Make sure Logs are only streamed to admin for selected loglevel
* (Apollon77) Fix "iobroker file write"
* (Apollon77) Make sure invalid ids are handled correctly without throwing errors
* (bluefox) Add alias.0 as object to be added
* (bluefox) Allow Arrays as state values
* (bluefox) Translate object names

## 2.0.25 (2019-10-09) Release Bella
**This is the First version which is released into Latest Repository.**

**[Discussion Thread in Forum](https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im-latest-repo)**
* (Apollon77) Also allow states/objects with capital letters as first letter
* (Apollon77) fix adapter/instance deletion
* (AlCalzone) fix CLI get state getvalue
* (Apollon77) increase LUA script timeout
* (Apollon77) update in objects lib, also update other dependencies
* (bluefox) small logging optimization


## 2.0.24 (2019-10-02) Release Bella
* (Apollon77) optimize performance, especially for file/file systems
* (Apollon77) enhance path sanitization
* (Apollon77) hopefully prevent Redis errors on connection close
* (Apollon77) fix adapter logging with --debug flag
* (Apollon77) fix Adapter Restarts also for widgets

## 2.0.22 (2019-10-02) Release Bella
* (Apollon77) work on some performance optimizations
* (Apollon77) Fix binary state handling

## 2.0.21 (2019-10-02) Release Bella
* (Apollon77) make sure also states starting with "io" will be notified on stateChange
* (Apollon77) fix Loglevel change via instance state
* (Apollon77) make sure subscribes for instances states are correctly passed through to adapter for all cases he subscribed them (also for special states like logLevel or sigKill)
* (Apollon77) make sure id filtering also works correct for >10 instances of the same adapter
* (Apollon77) some more small fixes and optimizations
* (Bluefox) Do not kill instance in debug mode on PID mismatch

## 2.0.19 (2019-10-02) Release Bella
* (Apollon77) fix migration
* (Apollon77) fix potential cases where objects/states files were not stored

## 2.0.18 (2019-10-01) Release Bella
* (Apollon77) allow to specify network family for redis library, defaults to 0 (IPv4 and IPv6)

## 2.0.17 (2019-10-01) Release Bella
* (Apollon77) delay parallel start of scheduled instances to prevent system overload scenarios (same rules asd for adapterstart, basically 4s delay)
* (Apollon77) Optimize some Migration questions
* (Apollon77) smaller fixes and optimization

## 2.0.16 (2019-09-30) Release Bella
* (Apollon77) streamline redis vs file States handling which was different also before controller 2.0:
  * not set states will always return null now
  * States will set to null completely (not only value) when they expire
  * States will also be published to onChanged handlers when states are in Redis
* (Apollon77) rework expiry handling for File-States to use Timouts

## 2.0.14 (2019-09-29) Release Bella
* (Apollon77) fix checking if iobroker is running (bug in 2.0.13)
* (Apollon77) upgrade socketio deps
* (Stabilostick) Randomize Certificate Serial numbers

## 2.0.13 (2019-09-28) Release Bella
* (Apollon77) optimize `iobroker status` CLI command
* (Apollon77) some other small fixes
* (Apollon77) remove clearAllLogs logic

## 2.0.12 (2019-09-27) Release Bella
* (Apollon77) Correct selections with wildcards at the beginning, should solve the admin issues

## 2.0.10 (2019-09-26) Release Bella
* (Apollon77) Optimize Compact mode CLI commands (fixes #468, fixes #471, fixes #470)
* (Apollon77) fixes #475, #476
* (Apollon77) only use quit from redis and let ioredis handle the disconnect, hopefully fixes #472, update objects-ha-lib to 1.1.20
* (Apollon77) object changes are only logged as debug from now on, fixes #473
* (Apollon77) Some adapter tweaks when running in "--install" mode (no reporting, don't check sigKill)

## 2.0.9 (2019-09-24) Release Bella
* (Apollon77) Optimize Adapter and Controller stopping processes further
* (Apollon77) Optimize redis connection handling on exit
* (Apollon77) Update objects-ha lib to 1.1.19

## 2.0.8 (2019-09-23) Release Bella
* (Apollon77) Optimize Adapter and Controller stopping processes

## 2.0.7 (2019-09-22) Release Bella
* (Apollon77) Correct file based internal structure to prevent entries with "//" in the path
* (Apollon77) Check for existing of states DB in some more places to prevent problems in compact end scenarios
* (Apollon77) try to add a better retry logic on disconnect to the DBs, restart after 30s
* (Apollon77) make some file operations with Paths more compatible to former versions

## 2.0.6 (2019-09-21) Release Bella
* (Apollon77) prevent "keys Not found" error in log, be more redis compatible, fixes #461
* (Apollon77) prevent "invalid instance object" errors for channel objects, fixes #462
* (Apollon77) optimize further on compact- and general adapter starting mechanisms to better prevent multistarts
* (Apollon77) update objects-ha lib to 1.1.17 to normalize filenames to prevent problems on double-slashes

## 2.0.5 (2019-09-20) Release Bella
* (Apollon77) fix some error while accessing custom directories, fixes #455
* (Apollon77) Add more logic to better handle migration edge cases (especially slaves vs migrations), fixes #458
* (Apollon77) Make sure invalid alias values do not crash controller process (logger was missing), fixes #456
* (Apollon77) Add better error and fallback handling for compact mode, fixes #460

## 2.0.4 (2019-09-19) Release Bella
* (Apollon77) fixes #434, host command
* (Apollon77) Add one more confirmation question when migrating objects

## 2.0.3 (2019-09-19) Release Bella
* (Apollon77) Log Process-ID for all adapter log messages
* (Apollon77) When Objects/States connection dies and is no longer able to be restored for adapters we end the adapter process. This prevents us from hanging processes
* (Apollon77) End adapters with code 11 when they decide to end themself because they are not the current process, so that no additional restarts happen

## 2.0.2 (2019-09-17) Release Bella

### Breaking changes
* Minimum requirement for js-controller 2.0 is nodejs 8.x
* Manually uploaded files into `iobroker-data/files/...` may no be fully supported. Please make sure to put them into officially allowed directories, e.g. vis.0
* The following Adapters needs to be updated to the listed versions to be compatible with js-controller 2.0
  * simple-api 2.1.2 or higher
  * email 1.0.5 or higher
  * pushover 1.1.1 or higher
  * hue 1.2.4 or higher
  * node-red 1.10.1 or higher
  * vis 1.2.1 or higher
  * iqontrol 0.2.6 or higher
  * socketio 2.1.2 or higher
  * radar2 1.0.9 (1.2.0 from Github needs a manual fix!)
  * ring 1.0.5 or higher

### New user features
* **(Bluefox/Apollon77) Add Compact Mode and compact groups, see [Compact Information in README](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#start-adapter-instances-in-compact-mode)** (Technology Preview)
* **(bluefox) Add build-in Alias handling for Objects/States, see [Alias Information in README](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#object-and-state-aliases)** (Technology Preview)
* **(Bluefox/Apollon77) Add support to also use Redis for Objects and Files, see [Redis Objects Information in README](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#using-redis-as-objectsfile-db)**
* **(Apollon77) Add Redis sentinel support, see [Redis Sentinel Information in README](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#using-redis-sentinel-as-objectsfile-db)**
* (Apollon77) Allow dynamic change of Loglevel for adapter instance and js-controller hosts processes, see [Dynamic Loglevel changes Information in README](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#dynamic-loglevel-changes)
* (Bluefox) Add optional migration for State and/or Objects values when using `setup custom`.
* (Apollon77) add monitoring for event-Loop-Lag as host and adapter objects. This can be used to analyze if an node.js process is blocked too much
* (foxriver76) add possibility to validate backup files
* (alcalzone) Support command `iobroker logs`
* (Stabilostick) `cert create` CLI commands
* (Apollon77) Remember installation location for reinstallations. For GitHub installs it gets the exact commit hash to reinstall really the correct version
* (Apollon77) Use remembered installation location for automatic adapter installs (e.g. if missing, host move cases)

### New adapter developer features
* (Apollon77) adds adapter.supportsFeature('NAME') method to check if a certain feature exists. fixes #244, see  [Adapter Feature Detection Information in README](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#adapter-feature-dtection) for information and the full list of allowed features
* (foxriver76) Ability to define secured objects in io-pack access only via own adapter and admin, details see #287
* (foxriver76) added getObjectView and getObjectViewAsync on adapter object
* (foxriver76) added getObjectList and getObjectListAsync on adapter object
* (bluefox) allow the deletion of multiple objects with wildcard
* (foxriver76) setObject/setObjectNotExists now also sets default value of state after object creation
* (Apollon77) allow getPort to check for the port optionally on a certain host/IP
* (Apollon77) Streamline redis vs file States handling which was different also before controller 2.0:
  * not set states will always return null now
  * States will set to null completely (not only value) when they expire
  * States will also be published to onChanged handlers when states are in Redis

### Further changes
* **(Apollon77) Rewrite InMem databases (States & Objects) to TCP (redis compatible) protocol and deprecate socket.io version; will be removed approx. in v2.1. This change should prevent us from "Reconnection to DB" errors**
* (bluefox) Add adapter handling to prevent "error 7" (adapters will stop themself as soon as PID is not as expected)
* (Apollon77) upgrade all dependencies, means: 0 vulnerabilities :-)
* (AlCalzone) Don't chmod 777 after controller upgrade
* (alcalzone) refactoring of many CLI commands
* (bluefox) add possibility to return zip file as a link and not as base64
* (bluefox) standardize error codes
* (alcalzone) Root should always npm install with --unsafe-perm
* (bluefox) enable gzip to read repositories
* (bluefox) read hash of sources.json before read the whole file
* (bluefox) Add some information to user-agent, like chrome, IE and Firefox do by update checks - the information is absolutely anonymous
* (bluefox) verify the version of node.js by start of the instance
* (bluefox) hide cmd window on windows
* (AlCalzone) Include certificate creation in `setup first`
* (bluefox) suppress warning by npm install
* (bluefox) allow optional dependencies being installed
* (Apollon77) optimize `setup custom`and add more user guidance
* (Apollon77) Add Feature overview to README
* (bluefox) forward upload console outputs from slave to master
* (Apollon77) make sure to upload and upgrade all relevant objects on installations and updates of adapters
* (Apollon77) always upgrade instance objects after successful installs or upgrades
* (Apollon77) optimize adapter start processes and such, especially when combined with needed automatic installations of adapters, also for error cases
* (Apollon77) after 2 installation tries with "last-installedFrom" use the installedVersion field to try to install from npm
* (Apollon77) hosts now ignore object changes when the affected instances is still in installQueue
* and much more code refactoring and optimizations in various places

### Bugfixes
* (Apollon77) log scheduled restarts as info only (fixes #315)
* (Apollon77) fixes #340 to maintain restartSchedule on updates
* (Apollon77) fix bug where "ack" was possible to set to any value via cli
* (alcalzone) Enable ESLint and fix most issues
* (bluefox) optimize multi host upload
* (Apollon77) Restart stopped adapters at the end of the upload and not before to make sure to not have two adapter restarts on upgrade cases
* (Apollon77) Enhance checks for failed installations in cli and controller
* (Apollon77) also update adapter instance statistic objects when no instanceObejcts are defined
* (Apollon77) "alive" state values are only checked on adapter start if ack=true to allow to start a process if not running
* (Apollon77) fixes for mutlihost detection
* (Apollon77) fix backup of states
* (bluefox) Make sure also VIS global CSS is included in backup and restored
* and many more fixes in various places

## 1.5.13 (2019-06-12) Evolution release (Ann)
* (Stabilostick) Make sure Info Adapter Tab is displayed automatically on install
* (Stabilostick) Add CLI host commands to CLI usage help
* (Stabilostick) Replace winston-syslog dependency to prevent build errors on node.js 10+ when installing or updating iobroker (not needed in 2.0.0)
* (Stabilostick) Replace default self signed SSL certificate to prevent errors in Node.Js 10.16+
* (Apollon77) Also replace default certificate used for all Web and Admin instances if the old cerfificate was used, so restart will use the new certificate

## 1.5.12 (2019-06-01) Evolution release (Ann)
* (Apollon77) Install instance of info adapter too on first setup of controller

## 1.5.11 (2019-05-26) Evolution release (Ann)
* (Apollon77) Allow to install specific versions/fix installing specific versions

## 1.5.9 (2019-05-16) Evolution release (Ann)
* (bluefox) Read cache of repository before download the whole file
* (AlCalzone) if npm returns code 1 it is OK
* (AlCalzone) fix instances enumeration
* revert greenlock version to 2.7.1

## 1.5.7 (2019-02-12) Fixes for Evolution release (Ann)
* Required version for normal functionality: javascript 3.6.5, dasWetter: 2.7.1, upnp: 1.0.0
* (bluefox) Fix let's encrypt
* (bluefox) Fix "iob" script
* (Dominic Griesel) Revert the changes to `del[Foreign]State`, so the object is not deleted.
* (bluefox) always install the version from repository and not the latest from npm
* (Ingo Fischer) Root should always npm install with --unsafe-perm
* (bluefox) fix iobroker stop
* (bluefox) fix Empty ID error
* (bluefox) fix error with formatDate

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

