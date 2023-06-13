# Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	## __WORK IN PROGRESS__
-->
## 5.0.2 (2023-06-11) - Jana
**BREAKING CHANGES**
* Support for Node.js 12 is dropped! Supported are Node.js 14.18.0+, 16.4.0+ and 18.x
* Backups created with the new js-controller version cannot be restored on hosts with lower js-controller version!
* Update recommended npm version to 8
* Deprecate binary states, Adapters will change to use Files instead!

**Features**
* (foxriver76) Show npm error message on failing adapter installations and update also without debug parameter
* (foxriver76) Introduce iobroker setting (dnsResolution) to choose between verbatim and ipv4 first dns resolution order
* (foxriver76) Add support for windows for `iob fix`
* (bluefox) Added CLI option to restart/start/stop all instances of an adapter (e.g. `iob stop admin` now also works)
* (foxriver76) Allow to use `iob host oldname` command when new host already exists but has no instances
* (foxriver76) Added an admin notification if redis is misconfigured and info how to fix it
* (foxriver76) Enable upgrade of js-controller via Admin UI (Linux only)

**Optimizations and Fixes**
* (foxriver76) Speedup "getStates" calls with many IDs often used by visualizations: JSONL 17 times faster, Redis 23 times faster
* (foxriver76) significantly reduce backup size
* (foxriver76) Enhance CLI help for list command to show all possible types to list
* (foxriver76) Also stop instances before updating from GitHub
* (foxriver76) Conversion of big parts of the js-controller codebase to typeScript and address all found issues
* (Apollon77) Only log error on "enable/disable via .alive" if there is an error
* (foxriver76) Optimize adapter unload and stop handling for edge cases
* (AlCalzone) Carefully normalize jsonlOptions
* (bluefox) Do not show warning on a requested adapter stop/termination
* (bluefox) Make sure that the first log line is not missing in Admin
* (foxriver76) Fix wrong formatting of cli get binary state if no encoding is passed
* (foxriver76) Fix restoring backups from pre js-controller 4.x which were created without config.system
* (foxriver76) Preserve tier setting on adapter upload
* (foxriver76) update apt sources before installing os dependencies
* (foxriver76) Only skip erase on upload if opted out explicitly to always cleanup unneeded files
* (foxriver76) Try to fix strange alias errors, inform us if it happens again!
* (foxriver76) Remove windows bat files completely, installer will create them when needed
* (AlCalzone/Apollon77) Update jsonl db to prevent locking issues
* (foxriver76) Fixes `iob file sync` not working for jsonl
* (foxriver76) Do not crash if we cannot initialize db backup directory on start
* (foxriver76) Fixed issue with certificate validity on leap years
* (Apollon77/foxriver76) Make sure that all relevant files are removed when eraseOnUpload is used
* (foxriver76) fix wrong hostname after backup restore
* (bluefox) allow CLI vendor update without explicitly specifying vendor file (default file is used)
* (Apollon77, foxriver76, bluefox, AlCalzone) Several fixes and refactorings to prevent potential crash cases reported by Sentry and other sources

**Developer relevant DEPRECATIONS/WARNINGS**
* Deprecate binary states, Migrate your adapters to use Files instead!
* If you need to access special js-controller common tools please use adapter-core instead of js-controller directly - see https://github.com/ioBroker/adapter-core#commontools
* Parameter that contain patterns (e.g. `mqtt.*`) are now checked for allowed characters and general correctness!

**Developer relevant new Features**
* (bluefox) Added options to subscribe to file changes: subscribeForeignFiles, unsubscribeForeignFiles, onAdapterFileChanged (event contains id, fileName, size and not the whole content of the file!)
* (foxriver76) Introduce on("install") handler for adapter which is automatically called when adapter process is started with --install
* (foxriver76) Introduce io-package flag common.nodeProcessParams to allow to pass adapter specific nodejs process parameters (disables compact mode for the adapter!)
* (foxriver76) Respect dns resolution (ipv4/ipv6 first) from config internally and provide relevant methods via adapter-core
* (foxriver76) Add JSON-Schema for iobroker.json
* (bluefox) Allowed export of password.js (to be used with adapter-core)
* (bluefox) Added _design/chart to the system designs
* (foxriver76) Automatically generated Code-Docs for Adapter class https://github.com/ioBroker/ioBroker.js-controller/tree/master/packages/controller/doc 
* (foxriver76) Added (foreign)objectExists to adapter methods
* (bluefox) Extend getSuitableLicenses to look for other licenses
* (buefox/foxriver76) Added new category for notifications: blocked and respect js-controller common.blockedVersions to block versions from starting
* (bluefox) Added new system view "custom-full" to return the full objects for objects with a custom part and not only the custom details
* (foxriver76) Added support for getForeignObjects with an array of strings as pattern
* (AlCalzone) Preparations to allow js-controller Dev version to be used with dev-server
* (foxriver76) Validate max timeout value (max 32bit max number) on setTimeout/setInterval and throw on error to prevent issues
* (foxriver76) new `io-package` flag `common.supportedMessages` to replace `messagebox` and other messagebox-related properties
* (foxriver76) `adapter.sendTo` now accepts an optional `timeout` argument

* **Developer relevant Optimizations and Fixes**
* (foxriver76) Ensure setObjectNotExists returns id on success
* (foxriver76) Fix Typings for sendTo/sendToHost
* (Bluefox) Add User permission check to requireLog
* (foxriver76) added `nonEdit` property of objects to types and document functionality
* (foxriver76) introduced constants for state quality
* (foxriver76) `subscribeStates` now also accepts an array of ids
* general dependency updates
* code style optimizations and streamline code

## 4.0.24 (2022-12-16)
* (Bluefox) Excluded iot and cloud from masking special properties
* (AlCalzone) Added time based JSONL compaction (once a day)
* (Apollon77/foxriver76) Optimized message sequence id generation
* (Apollon77) Use ipv4 as primary DNS lookup option also in Node.js 18+
* (buanet) Extended Docker detection to prevent issues in new Debian

## 4.0.23 (2022-04-19)
* (AlCalzone) normalize JSONL options to prevent issues because of admin adding empty setting objects
* (Apollon77/foxriver76) Prevent some crash cases reported by Sentry

## 4.0.21 (2022-03-12)
* (Apollon77) Fix Backup Restore crash case

## 4.0.20 (2022-03-12)
* (foxriver76) Add missing axios dependency
* (Apollon77) Only log an error if an error is happening when activating/deactivating adapter via .alive states
* (foxriver76) Fix edge case in redis simulator MULTI/EXEC logic
* (Apollon77/foxriver76) Prevent some crash cases reported by Sentry

## 4.0.19 (2022-03-05)
* (foxriver76) Fix Adapter restarting on install/update
* (foxriver76) Really fix invalid backup period warning

## 4.0.18 (2022-03-04)
* (foxriver76) Also stop instances before GitHub installs on windows
* (Apollon77) Fix eraseOnUpload logic
* (Apollon77) Fix invalid backup period warning
* (Apollon77) Fix maxSize property for logging in dist file
* (Apollon77/foxriver76) Prevent some crash cases reported by Sentry

## 4.0.15 (2022-02-03 - 2022-02-20) Release Isabelle
**BREAKING CHANGES**
* Support for Node.js 10 is dropped! Supported are Node.js 12.x, 14.x and 16.x
* CLI command `iob update --updateable` changed to `iob update --updatable`
* CLI command `iob update http://download.iobroker.net/sources-dist.json` is not supported anymore
* CLI command `iob rebuild adaptername` is no longer supported because of the new way of automatic rebuilds and some unwanted side effects
* CLI command `iob state get <id>` will no longer handle binary state values (which was never really working before). We added `iob state getBinary <id> <encoding>` as new way.
* Ensure that on a backup-restore the same adapters and adapter versions are restored as existing on backup time. Also check js-controller version and error on mismatch (is allowed to be forced accepted by --force parameter for restore)
* The "file" database will be automatically converted into JSONL and the database types that use "file" are adjusted to "jsonl" on installation (and backup restore). This means that a rollback of js-controller is only possible to 3.3 after 4.0 was installed! Rollback to former versions require a manual migration to "file" DB before the downgrade! (COMMUNICATION, TESTFOKUS)

**Features**
* (bluefox) Added complexity rules for user passwords: New created passwords need to follow the following rules (TODO ADMIN UI INFO ISSUE):
  * minimum length is 8
  * contains at least one digit
  * contains at least one lower case letter
  * contains at least one upper case letter 
* (foxriver76) Introduce option "--custom" when deleting instances or adapter to also clean up relevant custom entries from all objects (TODO ADMIN ISSUE ADD CHECKBOX!, TESTFOKUS)
* (foxriver76) Added new host objects to provide Node.js version and PID
* (foxriver76) Updated the Linux capabilities on js-controller start when a Node.js version change was detected (and initial on first run)
* (AlCalzone/foxriver76) Further optimize strategy for required Node.js module rebuilds. We first try to run rebuild in root package and if still packages are left (or it fails) we try to rebuild the really affected modules alone. Should give better results then former strategy (TESTFOKUS)
* (bluefox) Added support for configuring multiple repositories (TODO LINK+INFO FLAG)
* (Apollon77) Streamline logging configuration for all available transports: A set Loglevel in config means that this loglevel is pinned for the transport for all cases. An Empty/not set level ("Default" in Admin) means that logging is dynamic and can be adjusted per Instance controller or loglevel state on the fly.
* (foxriver76) Added installedFrom info to adapter start log line when not installed from npm normally

**Optimizations and Fixes**
* (Apollon77/foxriver76) Improve performance of object deletions (also when deleting instances or adapters) significantly (file-db 4x faster, jsonl-db 14x faster, redis 360x% !! faster)
* (foxriver76/Apollon77) Improve performance for redis object searches by up to 2,5x by using lookup structures for object types and custom object properties. This optimization is only active for single host redis systems automatically, but can be activated for multihost redis systems too after all hosts are (and stay!) on js-controller 4.0! (TODO DOCS)
* (foxriver76/Apollon77) Improve performance for object searches in general by limiting search namespaces to the relevant ones automatically
* (foxriver76) Improve handling of backup restores when custom hostnames were used (especially relevant for Docker usage)
* (foxriver76) Optimize backup to make sure invalid user-generated JSONs do not prevent backups from being considered valid
* (foxriver76/klein0r) Improved CLI help
* (foxriver76) Preserve changed instance names also when updating adapter (name was reset before)
* (foxriver76) stop adapters on Windows prior update to prevent EBUSY
* (foxriver76) Prevent crashes for uploads with invalid adapter installations
* (bluefox) Removed news from instance/adapter objects on install/update because taken from repository in Admin5 (TODO CHECK ADMIN4 EFFECTS)
* (AlCalzone) Removed extraneous "npm install" inside adapter directory
* (foxriver76/AlCalzone) reduce `JSONL` compression frequency to reduce I/O (relevant when experimental `JSONL` database modules are used)
* (foxriver76) prevent uploading js-controller (creating system.adapter.js-controller object) and remove existing cases on setup first
* (foxriver76) prevent crash when multihost password is invalid  and multihost active
* (bluefox/foxriver76) bigger internal refactorings in cli commands (TESTFOKUS)
* (foxriver76) made logging of not fulfilled adapter dependencies more user-friendly
* (foxriver76) Check user and group assignments and remove unknown users from groups (could have happened in earlier versions) in setup first
* (foxriver76) Prevent crash on adapter install/update if version string in repo is invalid
* (AlCalzone) Update and optimize JSONL database integration and configuration options
* (foxriver76) make sure that settings for file/jsonl DB in configfile are also respected
* (foxriver76) Update seq integration for logging
* (foxriver76) If logging can not be initialized because of a fatal error do not start js-controller
* (foxriver76) Prevent start of a debug session for an instance that is already running
* (Apollon77) Fix an edge case for file db which could lead to main and backup file being broken in strange situations with multiple crashes in a row
* (foxriver76) make sure that admin, backitup and discovery instances are created when update of controller happens if installed and no instance exists
* (Apollon77) Optimize Stop Handling to prevent errors
* (Apollon77) Optimize Adapter process initialization to prevent edge case errors
* (foxriver76) Optimize meta object sync
* (Apollon77) make sure to really end CLI process when they should end in error cases
* (Apollon77) catch error when streaming data to stdout and this is closed already
* (Apollon77) Optimize some special cases on adapter start
* (AlCalzone) Prevent issues when backup interval is configured with invalid values
* (AlCalzone) Prevent db-file-locking issues for jsonl database; the connectTimeout for databases is now minimum 5s (overrides lower values from configuration)
* (foxriver76) allow instance deletion when executed from an other host
* (foxriver76) stop the database before executing upgrade self; Will be effective for all upgrades >4.0.5
* (Apollon77/foxriver76) Optimize database initialization and destroys
* (Apollon77) Update winston-syslog to prevent errors
* (Apollon77, foxriver76, bluefox, AlCalzone) Several fixes and refactorings to prevent potential crash cases reported by Sentry and other sources

**Developer relevant DEPRECATIONS/WARNINGS**
* **js-controller is no longer installable from GitHub because is now a monorepo. Use `@dev` tag on npm to get the nightly build of master js-controller!**
* log info when `setState` is used for an object of type file - use `setBinaryState` instead!
* log info when default value of an object is invalid (e.g. does not match object type)
* log info when `common.states` is used and not an object (deprecate String usage)
* log info when `common.min`/`common.max` exists on non numbers and contain invalid values/types
* add get/setForeignBinaryState methods as copy from get/setBinaryState allow adapter to migrate; get/setBinaryState will be changed in 4.1 to be "non Foreign"
* Enhanced object checks: adapter need to have a name as string
* Decline calls for getForeignObjects with non string pattern (was pot. crashing before)
* adapter.tools is deprecated and replaced by a shim. Use methods in adapter class or adapter-core instead or open issues if you need more internal functions
The object view definition "custom/state" is now removed from js-controller after being replaced by "system/custom" in js-controller 3.3. All relevant adapters are updated (COMMUNICATION)
* remove all *Fifo* Methods from adapter.js because deprecated since 1.x
* remove adapter.objects.* methods because deprecated since 2.x

**Developer relevant new Features**
* (jogibear9988) Add new "unload-safe" promise based "adapter.delay" method to delay further code execution, but still make sure code do not continue after unload was called. This method can **not** be used inside the "unload" method itself!
* (jogibear9988/AlCalzone/foxriver76/Apollon77) Revamp adapter.*Timeout and adapter.*Interval methods to be "unload-safe" and also clear missing timeouts without warnings for more developer convenience! The methods to set a timeout or interval can **not** be used inside the "unload" method itself!
* (foxriver76) Allow to set "null" for common.states and not log error for object (also for extend)
* (AlCalzone) Introduce new methods in tools for Node.js module management: installNodeModule, uninstallNodeModule (TODO Issues adapter that use npm install -> Move))
* (bluefox) Add license management functionality to host. Adapters can use adapter.getSuitableLicenses to get available relevant licenses (TODO DOCS)
* (AlCalzone) Switch NPM relevant handling to library pak to be more flexible for the future which package manager we want to use. Important: There are still parts that rely on npm for now!
* (bluefox) Also report docker info when sending diag data
* (foxriver76) Add server time to getHostInfo message
* (foxriver76) For multihost clusters with js-controller 4.0+ the hosts automatically determine a "primary" host that can be used js-controller internally (right now, preparation for future topics)
* (Apollon77) Add database types to crash data reported to sentry

**Developer relevant Optimizations and Fixes**
* (foxriver76) fixed permissionError on setBinaryState
* (foxriver76) preserve "native" content for instanceObjects when updating the objects on adapter start
* (Apollon77/foxriver76) Limit the search scope for object types host, adapter, instance, instanceStats, enum, script, group, user, config to the relevant namespaces when no search start/end is provided to speedup these calls in general
* (foxriver76) Optimize deleteDevice/deleteChannel methods to just delete all objects the relevant device/channel
* (foxriver76) Removed some magic path lookups  to be compatible to npm 7/8. `Appname` of controller is now always "iobroker" ("ioBroker" in dev cases)
* (foxriver76) Also use Sentry (if enabled/allowed) in CLI commands whenever database is initialized to report crashes from CLI if they happen
* (foxriver76) Introduce a database protocol version number to allow detection of the available database features in multihost environments
* (bluefox) Prevent issues when using adapter.addChannelToEnum because of missing callback
* (foxriver76) make sure autoSubscribe works as expected in all cases
* (Apollon77) Correctly return null when a session is expired 
* general dependency updates
* code style optimizations and streamline code

## 3.3.22 (2021-12-20)
* (bluefox) Fixed addChannelToEnum function

## 3.3.21 (2021-11-28)
* (Apollon77/foxriver76) we fixed issues with multihost setup, that existed in 3.3.19/3.3.20

## 3.3.19 (2021-07-26 - 2021-11-17) Release Hannah
**BREAKING CHANGES**
* None, Supported are nodejs 10.x, 12.x and 14.x (Node.js 16.x is also working WHEN USED WITH npm 6!!, but officially not yet supported because we do not have enough results)
* The experimental `JSONL` db libraries are now included in js-controller directly too
* (Apollon77) Do not install info adapter by default
* (foxriver76) changed default behaviour of cli update command -> only list installed, allow --all as parameter to see all again

**Features**
* (foxriver76) start instances ordered by their defined tiers (details see https://github.com/ioBroker/ioBroker.js-controller#tiers-start-instances-in-an-ordered-manner)
* (foxriver76) respect adapter dependencies on "upgrade" CLI command
* (Apollon77) Create a `backitup` instance on initial installation
* (Apollon77) Also allow `iobroker url iobroker.adaptername[@version]` as command

**Optimizations and Fixes**
* (foxriver76) correctly encrypt native attributes from instances when set via cli
* (Apollon77) give DB a bit more time to startup for CLI
* (foxriver76) fixed logging undefined w/o meta data when deleting log files
* (Apollon77/oweitman) prevent errors when listening for multihost messages
* (Apollon77) made sure to await the database destroy in all places
* (Apollon77) fixed crash case when Lets encrypt config is not provided but LE is activated
* (AlCalzone) understand .tar.gz as a valid extension for GitHub URLs
* (foxriver76) only renew Let's encrypt when configured that way
* (foxriver76) if free memory reaches threshold, also add a notification
* (bluefox) fixed applyViewFunc if the name is a localized object
* (Apollon77) optimize db initialization for fileDB and enhance error case handling
* (bluefox/Apollon77) made sure all object types are deleted on recursive object deletion
* (Apollon77/foxriver76) several optimizations and fixes in database modules and update
* (foxriver76) Made sure getStates uses write attribute of aliases instead of read
* (Apollon77) prevent crash in disconnect cases on startup
* (foxriver76) allowed defaultNewAcl updates on the fly
* (Apollon77) initialize new default ACLs in any case, only controller sets it for all objects
* (foxriver76) do not send null as diag info in error cases or if user has selected none
* (foxriver76) revive config.dataDir if deleted via bug in admin5 config editor
* (foxriver76) fixed a bug which lead to an infinite loop if the repo was invalid and no cached sources available
* (foxriver76) check host existence before adding instance
* (Apollon77) Check that password is provided when multihost discovery server should be started in secure mode
* (foxriver76) only send diagnose data if license and diag dialog has been confirmed on new installations
* (foxriver76) made sure adapters are added only once to upgrade queue if it has no dependencies
* (Apollon77) Optimize Database save handling on write
* (Apollon77) Optimize restart logic
* (foxriver76) optimize cli help
* (AlCalzone) Optimize search for adapter start file to also respect main property from package.json
* (Apollon77/foxriver76) Optimize Database storage behaviour for file database
* (Apollon77/Stabilostick) Try to fix restart on Windows
* (bluefox) Do not delete objects recursively that have dontDelete flag
* (AlCalzone) Fixed restart logic for linux systems to prevent processes started aside systemd
* (Apollon77) "upgrade self" CLI command should not start controller because we require it to be stopped before (will be effective for all upgrades from 3.3.2 to higher versions only)
* (Apollon77) fixed "iobroker upgrade" call that crashed when no updates were available
* (foxriver/Apollon77) fixed invalid logging in package manager
* (foxriver76) avoid deleting too many metaobjects starting with the same name as adapter
* (foxriver76) we fixed a crash due to multilingual instance objects
* (bluefox) Fixed compact group host check

* (Apollon77, foxriver, bluefox, AlCalzone) Several fixes and refactorings to prevent potential crash cases reported by Sentry and other sources

**Developer relevant DEPRECATIONS/WARNINGS**
* (foxriver76) added new checks for setState:
  * if strictObjectChecks are activated we now perform additional checks 
  * require `common.type` on state objects
  * if state is read only, and we get ack false -> not allowed
  * check type of the state.val matching the `common.type` of the obj
  * if it's a number and min/max is defined on object we perform additional checks for min and max
* (bluefox) checkPassword(Async) is now returning two parameters in callback/resolve (first is boolean if password/user are valid, second is the final internal username in form system.user.xxx)
* (bluefox) added _design/custom to the controller objects - this should deprecate the own custom view over time, please update if relevant!
* (bluefox) Adjust generation of installation UUID

**Developer relevant new Features**
* (AlCalzone) support executing TypeScript adapters: If the adapter main file ends with ".ts" we automatically transpile the typeScript file before starting the adapter
* (bluefox) Implemented chownFile in adapter.js
* (foxriver76) introduce `common.step` attribute of states and round state value if needed
* (bluefox) Added restartController sendToHost command
* (bluefox) Allowed npm install to be executed with debug flag
* (bluefox) Added messages to read logs
* (bluefox) Added location of ioBroker as information to getHostInfo
* (bluefox) Added new system config values to set a default loglevel for new created instances

**Developer relevant Optimizations and Fixes**

* general dependency updates
* code style optimizations

## 3.2.16 (2021-02-01) Release Grace
**BREAKING CHANGES**
* None, Supported are nodejs 10.x, 12.x and 14.x (Node.js 15.x is also working WHEN USED WITH npm 6!! in the automated tests, but formally not supported)
* If you have enabled Multihost Discovery please disable and enable it again if you really need it persistent running. By re-enabling it you update the used passphrase with a better encryption mechanism.
* (Foxriver76) Harmonize username handling between admin and js-controller by transforming the object id to lowercase. With these usernames will be treated case-insensitive from now on!

**Features**
* (raintonr) Updated Let's encrypt implementation; all relevant adapters (web and such) need updates to use it! NEEDS NODE.JS 12.x+! (see DOCS LINK TODO)
* (bluefox) Restart adapters that use Let's encrypt after certificates were updated
* (bluefox) Provide min/max for convert alias functions
* (foxriver76) handling major adapter upgrades more carefully (CLI on upgrade will show if it's a major upgrade  and major upgrades will be skipped on upgrade all when executed by admin
* (AlCalzone) detect and allow short GitHub URL format when (auto-)installing adapters (`iobroker url User/repo#branchorcommit`)
* (AlCalzone) Support more GitHub URL formats for `iobroker url` command
* (AlCalzone) support GitHub branch names with slashes on adapter install
* (foxriber76) Added notification system (see DOCS LINK TODO)
* (foxriver76) enhance setup (and setup first) with redis to all port configuration
* (foxriver76) set connectionName for redis connections and simulator support
* (bluefox) Added "http" and "stream" options for logs
* (Apollon77) added seq logging support to js-controller
* (foxriver76) Fixed wrong logger pattern that caused issues on Windows
* (Apollon77) fixed potential crash when restoring backup
* (Apollon77) restore old logfile deletion logic because rotator library do not work as expected
* (Apollon77) Optimize File DBs to lower write i/o by 50% (backup file is now renamed instead of rewritten)
* (AlCalzone/Apollon77) Restructure DB code to allow easier new DB types
* (Apollon77) enhance letsencrypt to also allow to specify alternative names for certs

**Optimizations and Fixes**
* (foxriver76) Detect adapter restart loops and stop restarting after 3 crashes (an adapter is considered "working" when no crash by an exception happens within 10 minutes)
* (foxriver76) Fixed failed logins if username is uppercase, be reworking user logic and caching
* (bluefox) Set for def states the quality: QUALITY_SUBS_INITIAL
* (AlCalzone) fixed npm uninstall loglevel argument
* (foxriver76) delete `pids.txt` when iobroker was stopped
* (bluefox) Added missing attributes by multihost if Redis is used for objects/states, Remove unused settings from iobroker-dist.json, Remove pass and user from connection settings. Use options.auth_pass
* (AlCalzone) Package-Manager: log which packages were (already) installed
* (foxriver76) replace redis "KEYS" command by "SCAN" to optimize redis access performance
* (foxriver76) optimize redis library usage to prevent errors on redis outages
* (bluefox) Catch errors when plugins initialize. At least log will work and could be checked for errors.
* (foxriver76) allowed migration of instances to already existing host 
* (foxriver76) also allow <adapter>.<instance-nr> for install/add cli command
* (AlCalzone) buffer streams that are piped to stdout to fix weird Windows logging cases
* (foxriver76/AlCalzone) Optimize upgrade/downgrade logic for adapters, ask for a downgrade only if lower version is to be installed
* (foxriver76) allowed redis<->redis migration when changing host of redis - fix bug where process crashes when controller is running when migrating
* (bluefox) Catch errors for subscribe on alias without target
* (foxriver76) only perform auto-scaling on alias if not null
* (foxriver76) if repository request fails also use cached sources on updating repository
* (foxriver76) prevent host deletion from same host - otherwise it will remove the `system.host` states but instances will still be on the removed host, because transfer happens to itself
* (foxriver76) use instanceObjects from system.adapter.* object instead from io-package.json
* (foxriver76) notify of errors on readFileCertificates to show permission problems etc.
* (foxriver76) multihost discovery now logs ignored messages on debug and also logs the senders address
* (foxriver76) sync up created objects on instance start and instance creation by using helper function in tools.js, e.g. `.loglevel` was missing on instance creation
* (bluefox) Package-Manager: Filter empty packets out to suppress error message
* (foxriver76) rename repository names for new installations and on updates to beta/stable
* (foxriver76) rewrite collectDiagInfo to Promises and fix minor issue with it
* (foxriver76) only scale aliases if target or source is represented by unit %
* (foxriver76) create `meta.user` on file sync cli, if not existing
* (Apollon77) also create `meta.user` on setup first if not existing
* (foxriver76) fixed enumInstances used by CLI commands
* (foxriver76) when missing rights to access log dir do not crash hard anymore, instead fallback to default directory
* (bluefox) Fixed error if type of native data changed in the new version from basic type e.g. 'string' to 'object'.
* (AlCalzone) Removed hardcoded references to GitHub master branch because newer repositories use "main"
* (Apollon77) updated `_design` objects also on js-controller `upgrade/setup` first
* (Apollon77) optimize deletion of files in ioBroker file storage
* (foxriver76) do not return an error if object does not exist on del*Object
* (Apollon77) optimize logs when instance is restarted
* (foxriver76) Preserve name field on instance object creation/update
* (foxriver76) optimize parameters and flags on CLI
* (foxriver76) Use yargs helper instead of building our own string output to allow showing --help for a specific command instead of the whole output and allow support for auto completion (`iobroker _createCompletion >> ~/.bashrc`)
* (foxriver76, Apollon77) also accept pre-release version in some semver checks for dependencies
* (foxriver76) replace outdated encryption mechanism of multihost
* (Apollon77) prevent an endless loop when lua script initialization was not possible
* (Apollon77) catch semver errors in upgrade commands
* (foxriver76) ensure setAdapterInstanceEnabled can not hang
* (Apollon77, foxriver, bluefox, AlCalzone) Several fixes and refactorings to prevent potential crash cases reported by Sentry and other sources

**Developer relevant DEPRECATIONS/WARNINGS**
* (foxriver76) we warn if object not exists when setting a state via `adapter.setState`. Adjust your code that a state value is NOT set before the object is successfully created. If this deep check is NOT wanted for performance reasons the adapter needs to be initialized with strictObjectChecks = false!!  (see DOCS LINK TODO)
* (foxriver76) readFile should not validate metaobject, we now throw on writeFile if id is no valid metaobject
* (AlCalzone) updated Forbidden ID Characters: use Unicode properties to define which characters are allowed instead of blacklisting. For ASCII the allowed characters are the same as before - for other languages mainly character class of Unicode are allowed! (see DOCS LINK TODO)
* (foxriver76) Throw on invalid setState objects; was logged as deprecated before
* (foxriver76) removed getMessage shim, no adapter uses it anymore; was logged as deprecated before

**Developer relevant new Features**
* (foxriver76) use aes-192-cbc as encryption - backward compatible with current encryption, nothing to do for adapter-developers (see DOCS LINK TODO)
* (bluefox) Added system view to filter for "folder" objects
* (bluefox) added set/clearTimeout and set/clearInterval to adapter methods and check on unload that they were all cleared and clear if needed with logging, so developers are reminded to clean up!
* (AlCalzone) Added ...Async version for getChannels - make sure to check before using or use correct js-controller version dependency!
* (Apollon77) modularize databases into own npm packages and basically support adding new types of databases; add deprecation infos and logging to "old legacy" files in lib/states and lib/objects to not be used anymore; requires mostly updates in testing (see DOCS LINK TODO)
* (foxriver76) allowed to specify the instance for debug starts (`iobroker debug adaptername.1`) 
* (foxriver76) Enhance extendObject to allow to preserve specified fields (e.g. common.name)
* (foxriver76) added adapter method getUserId

**Developer relevant Optimizations and Fixes**
* (foxriver76) implemented maybeCallback and maybeCallbackWithError and use it in adapter.js
* (AlCalzone) use fs-extra instead of mkdirp
* (AlCalzone) read JSON files using fs-extra's readJSONSync
* (AlCalzone) fixed callback definitions in adapter.js, We have signatures for (almost) everything in @types/iobroker, and we should use them
* (AlCalzone) move from Promises to async/await in some places, use a single readyPromise instead of an array
* (foxriver76) migrated ci tests to GitHub actions
* (foxriver76) resolve adapter main file as tools.js method
* (foxriver76) optimize extendObject with def value
* (AlCalzone) Handle existing, but undefined properties in validateSetStateObjectArgument
* (foxriver76) also escape + char on regex, it's not forbidden
* (bluefox) Set default state only for objects of type "state"
* (AlCalzone) include folders in the result of getAdapterObjects
* (Apollon77) Made sure to not trigger subscribes or messages when unload is called
* (Apollon77) deleting a not existing object is handled as success instead of Not-Exists error
* general dependency updates
* code style optimizations

## 3.1.6 (2020-06-18) Release Francesca
* (foxriver76) fixed output of `iobroker plugin status` command
* (foxriver76) fixed deletion of states on instance-deletion
* (Apollon77) added additional checks to prevent Errors (Sentry)
* (Apollon77) Made sure Sentry activation info is also shown on `upgrade self` command
* (Apollon77) Upgrade winston-daily-rotate-file library to prevent a crash case

## 3.1.5 (2020-06-05) Release Francesca
* (Apollon77) Return empty array on non-existing directory for readDir
* (foxriver76) fixed "host this" command

## 3.1.4 (2020-05-10) Release Francesca
* (Apollon77) Updated Sentry plugin to be more transparent on temporary disabling reasons
* (foxriver76) fixed error when writing binary States

## 3.1.3 (2020-05-09) Release Francesca
* (foxriver76) catch error on alias ids with empty objects
* (Apollon77) made sure promise rejections without error are not crashing the controller 
* (bluefox) Added Controller messages to allow read and write controller base settings (iobroker.json); introduce adapter feature flag CONTROLLER_READWRITE_BASE_SETTINGS
* (Apollon77) handle edge case where hostName is not a string when sending messages (Sentry IOBROKER-ADMIN-B)
* (Apollon77) handle case where letsencrypt directory can not be created (Sentry IOBROKER-ADMIN-C/IOBROKER-WEB-B)
* (bluefox) added IDs to some log messages
* (foxriver76) fixed some logging in objects lib
* (Apollon77) made sure to catch error when reading log directory (Sentry IOBROKER-JS-CONTROLLER-1F)
* (foxriver76) Made decrypt and encrypt methods available in adapter object for developers. System secret is read automatically so only the value is passed to the function
* (AlCalzone) Added adapter exit code 13 (ADAPTER_REQUESTED_REBUILD) to also allow to tell js-controller to rebuild this adapter.
* (Apollon77) changed logging for invalid readFile actions to debug because ca be triggered also by other cases then planned ones. Update objects lib
* (Apollon77) made sure command on cmdExec is a string (Sentry IOBROKER-JS-CONTROLLER-1H)
* (Apollon77) Check more cases for existence of variables before accessing them (Sentry IOBROKER-JS-CONTROLLER-E)  
* (Apollon77) Added a node.js version check and output special error message if node.js version is not satisfied
* (AlCalzone) Added missing parameter `digest` to crypto calls
* (AlCalzone) further code optimizations
* (AlCalzone) Allowed reverse lookup of exit codes (exit code -> error name)
* (Apollon77) made sure Objects/States backup files are deleted correctly according to backup settings
* (foxriver76) Made sure default state value is only set if state is not existing also in setObject
* (foxriver76) check that alias is of type state when adding subscribing pattern
* (Apollon77) Made sure error are checked correctly (Sentry IOBROKER-JS-CONTROLLER-1N) 
* (Apollon77) Inform about sentry activation if not configured on "iobroker setup first"
* (bluefox) implemented maintenance mode for adapter methods
* (bluefox) store for binary states the binary flag in objects  
* (Apollon77) updated Plugin system
* (Apollon77) updated Sentry plugin to respect all options to disable reporting including new disableDataReporting flag ( will be integrated into Admin later)
* (AlCalzone) Added Plugin CLI commands to enable/disable plugins

## 3.0.20 (2020-04-28) Release Elena
* (Apollon77) made sure disabling instances while installation is running do not crash the controller (Sentry IOBROKER-JS-CONTROLLER-Z) 
* (From Forum) prevent error on backup restore
* (Apollon77) Made sure error handing do not throw exception
* (Apollon77) Catch all errors when trying to store the File DB (Sentry IOBROKER-JS-CONTROLLER-14/15)
* (Apollon77) Made sure also edge cases on start adapter are handled correctly (Sentry IOBROKER-JS-CONTROLLER-12)
* (Apollon77) Use 3.3.4 of objects library to prevent an error from 3.3.3

## 3.0.19 (2020-04-26) Release Elena
* (Apollon77) made sure to correctly create empty logfile on "delLogs" (Sentry IOBROKER-JS-CONTROLLER-Q) 
* (foxriver76) made callback consistent when client has closed connection (Sentry IOBROKER-JS-CONTROLLER-R)
* (foxriver76) added missing Error for DB closed, which was used but undefined in tools.js
* (foxriver76) if buffer is of type object and not a buffer object log a warning - also bufferFrom null will also result in an error, prevent it (Sentry IOBROKER-JS-CONTROLLER-S)
* (foxriver76) in edge cases def can be an object, we also support this on extend*Object*
* (foxriver76) made sure stacktrace is there on validateId
* (foxriver76) avoid error on installAdapters function due to downloadRetry (Sentry IOBROKER-JS-CONTROLLER-V)
* (Apollon77) made sure Logfile is rewritten with empty content (Sentry IOBROKER-JS-CONTROLLER-Q)
* (Apollon77) Updated Sentry Plugin to 1.0.0, adds pathBlacklist option, fixes pot. crash reason
* (foxriver76) ensure backward compatibility with auto decrypt function
* (Apollon77) Re-allow states to be set with no val property but check that there is at least one property
* (foxriver76) also call enumerateAdapterDocs when deleting all instances

## 3.0.18 (2020-04-23) Release Elena
* (Apollon77) correct error handling for letsencrypt challenge server
* (foxriver76) fixed default value of extend*Object
* (AlCalzone) Added 'CONTROLLER_NPM_AUTO_REBUILD' to supported features

## 3.0.17 (2020-04-22) Release Elena
* (Apollon77) made sure system.config objects has correct type
* (foxriver76) made sure that callback of extend*Object returns object as before (was broken in 3.0.15)

## 3.0.16 (2020-04-22) Release Elena
* (Apollon77) made sure error cases are handled on zip file creation for objects (Sentry IOBROKER-JS-CONTROLLER-J)
* (Apollon77) made sure to check id when iterating over it (Sentry IOBROKER-WEB-3)
* (foxriver76) fixed path on getInstalledInfo (was broken in 3.0.15)

## 3.0.15 (2020-04-21) Release Elena
* (Apollon77) Adjust ID checking to allow numbers for non-foreign id's for now but log warn
* (foxriver76/Apollon77) Adjust extendObject logic and only set state when state was not defined before
* (Apollon77) check that path is found before using it on rebuild CLI command (Sentry issue)
* (foxriver76) fixed error on caught process exceptions
* (foxriver76)  made sure that `procs[id]` is not undefined in some cases (Sentry IOBROKER-JS-CONTROLLER-E/G)
* (foxriver76/Apollon77) handle weird case where io-package.json from controller is not on normal place when getInstalledInfo is called (Sentry IOBROKER-JS-CONTROLLER-B/C/D/F/H)
* (foxriver76) fixed bug for some cases where `common.def` is used on creation of foreign objects
* (Apollon77) made sure error cases are handled on zip file creation for objects (Sentry IOBROKER-JS-CONTROLLER-J)

## 3.0.14 (2020-04-20) Release Elena
* First version for latest repository
* (Apollon77) catch errors when letsencrypt server can not bind to port 80 (Sentry IOBROKER-WEB-1)

## 3.0.13 (2020-04-18) Release Elena
* (Apollon77) fixed in objects lib when db connection closes while loading view results
* (bluefox) fixes and optimizations

## 3.0.12 (2020-04-17) Release Elena
* (Apollon77) prevent logged error from file DB where it ws tried to write meta file for already deleted folders
* (Apollon77) display errors on npm uninstall
* (foxriver76) delete adapter and adapter.admin folders even if no corresponding meta objects exist
* (foxriver76) streamline dependencies/globalDependency checks in all places and allow different versions

## 3.0.11 (2020-04-15) Release Elena
* (Apollon77) fixed crash when system views are not correctly initialized (Sentry IOBROKER-JS-CONTROLLER-9)

## 3.0.10 (2020-04-15) Release Elena
* (Apollon77) consider the Adapter Stop Timeout also for adapter restarts to give adapters enough time to stop before restarting

## 3.0.9 (2020-04-15) Release Elena
* (Apollon77) fixed reported crash on obsolete object deletion (Sentry IOBROKER-JS-CONTROLLER-8)
* (Apollon77) fixed reported crash when a new process can not be started because of ENOMEM (Sentry IOBROKER-JS-CONTROLLER-7)
* (foxriver76) made sure errors are return the same in two places

## 3.0.8 (2020-04-14) Release Elena
* (foxriver76/bluefox/Apollon77) small code optimizations
* (Apollon77) dependency updates

## 3.0.7 (2020-04-12) Release Elena
* (foxriver76) also allow to set user property for states
* (Apollon77) changed FeatureFlag for Auto decrypt to ADAPTER_AUTO_DECRYPT_NATIVE

## 3.0.6 (2020-04-11) Release Elena
* (bluefox) Fixed vis debug
* (foxriver76/Apollon77) optimize and fix dependency checks to consider all dependencies correctly on install, upgrade and adapter start
* (AlCalzone) added `iobroker object extend` command
* (AlCalzone) optimize performance when objects are duplicated and checked internally
* (AlCalzone) Added command `iobroker debug adapter` to start Node.js debug sessions for an adapter
* (foxriver76) validate id also has to allow objects with correct properties (device, channel ...)
* (Apollon77) prevent crash if udp membership can not be added (Sentry IOBROKER-JS-CONTROLLER-5)
* (Apollon77) changed object type for compact groups to "folder"
* (Apollon77) added adapter flag ALIAS_SEPARATE_READ_WRITE_ID

## 3.0.5 (2020-04-09) Release Elena
* (foxriver76) Removed mock for adapter.states.getState again, fixed two adapters
* (foxriver76) fixed crash of redis setState when undefined is passed and refuse undefined as value in general
* (Apollon77) Made sure objects update from/ts/user when extending objects in all cases

## 3.0.4 (2020-04-07) Release Elena
* (Apollon77) Added "lc" property to list of allowed properties to set (prevent false positive errors with hm-rpc adapter)
* (Apollon77) Added mock for adapter.states.getState to prevent crashed with `Soef` Adapters
* (Apollon77) Made sure extendObject is checking object parts differently, prevent false positive logging

## 3.0.3 (2020-04-07) Release Elena
**BREAKING CHANGES**
* Nodejs 8.x will be no longer officially supported! Supported are nodejs 10.x, 12.x and (most likely) 14.x

**Features**
* (Apollon77) Enable zip Archive setting that it is on by default again. All Logs on Linux will be packaged to .gz on rotation. This can be deactivated by configuration ([see Documentation](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#file-based-logging))
* (Apollon77) Introduce CLI command "iobroker rebuild <adaptername>" or "iobroker rebuild self" (for controller) to execute a npm install/rebuild for the specified adapter
* (Apollon77) Detect the need for a rebuild because of a nodejs update by checking adapter crash error message and execute the "iobroker rebuild" command for the affected adapter up to 3 times.
* (foxriver76) Added ability to define separate read and write id for aliases ([see Documentation](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#object-and-state-aliases))
* (foxriver76) Made file write intervals of objects and state file dbs configurable ([see Documentation](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#iobroker-in-memory-database-with-json-file-storage))
* (foxriver76) Check available RAM of the system before a new adapter process is started. If it is below 50/100MB log an error/warn and make it configurable via iobroker.json ([see Documentation](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#check-available-ram-before-adapters-are-started))
* (Apollon77) Added plugin system for js-controller and adapters ([see Documentation](https://github.com/ioBroker/ioBroker.js-controller/blob/master/README.md#plugin-system-for-adapters-and-js-controller))
* (Apollon77) Added and automatically enable Sentry as plugin for js-controller (see infos in README.md), can be disabled per host via system.host.name.plugins.sentry.enabled ([see Documentation](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#error-reporting-via-iobroker-sentry))

**Optimizations and Fixes**
* (bluefox) Show options for start/stop/restart if more than one instance exists for the adapter
* (AlCalzone) Validate arguments for `iobroker del ...` CLI command
* (bluefox) Log js-controller version by start of adapter too
* (Stabilostick) Set default certificate validity to 12 months, according to new Apple rules! Existing certificates will be recreated on controller installation if no custom certificate is used
* (bluefox) Also initialize objects with local redis connection details if setup command is called with "useRedis" parameter
* (foxriver76) Increase timeout of `hostinfo` command to prevent errors on systems with low CPU
* (foxriver76) The end of schedule adapters is no longer logged as error
* (foxriver76) Allowed CLI commands to check status of an adapter instance
* (foxriver76) Enhancements and fixes for `iobroker list files` command, allow to specify exact meta folder name as parameter and not only the adapter
* (foxriver76) Added forced repository update to help, add logging to show that it is used
* (foxriver76) Also delete uploaded vis widgets on adapter deletion
* (foxriver76) Restart referenced restart-adapters after uninstall also
* (foxriver76) Prevent dot as last char of an object or state id
* (foxriver76) Improve performance on filter actions (getObjectView) when redis is used as objects database
* (Apollon77) Optimize sigKill handling to prevent restart loops for edge cases and slow system
* (Apollon77) Optimize errormessage for invalid protocol on database connection and make easier understandable
* (Apollon77) Also catch unhandled promise rejections in adapters and handle like exceptions to allow error detection and automatic restart
* (foxriver76) Also remove objects from Enums on object deletion
* (foxriver76) Fixed adapter exiting with wrong exit codes
* (bluefox) Fixed restart CLI command
* (foxriver) Updated cache manifest correctly on visdebug and fix process exit on non-existing vis dir
* (foxriver76) No longer require restart of instance after alias object changes and other alias optimizations
* (foxriver76) Made sure files in internal file storage are always stored with correct path and also  automatically fix existing entries

**Developer relevant DEPRECATIONS/WARNINGS**
* (foxriver76) Do not allow access to `adapter.states` and `adapter.objects` anymore and add warning logs to deprecate the usage. js-controller 3.1+ will remove these methods. Please adjust your adapters
* (foxriver76) Verify that a proper object of type "meta" exists when files are accessed in the internal ioBroker storage and output deprecation logging, these actions will be declined in js-controller 3.1+
* (AlCalzone) Validate the object argument to set[Foreign]State[Changed] and log warnings, such invalid set commands will be declined with js-controller 3.1
* (Apollon77) Move deprecation of getMessage to next controller version (3.1+)
* (foxriver76/Apollon77) Validate that id in several state and object methods is of type string and log warnings
* (foxriver76) Added basic checking for `obj.common` properties including logging. Please check logs and fix them, such invalid objects will be declined with js-controller 3.1

**Developer relevant new Features**
* (bluefox/foxriver76) Automatically encrypt all config attributes that are listed in common.encryptedNative in io-package, introduce ADAPTER_AUTO_DECRYPT_NATIVE ([see Documentation](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#automatically-encryptdecrypt-configuration-fields)) **Admin support missing as of now!**
* (bluefox) Introduce new dependency field for io-package called common.globalDependencies to check for global dependencies ([see Documentation](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#define-adapter-dependencies-to-other-adapters)). **Admin support missing as of now!**

**Developer relevant Optimizations and Fixes**
* (Apollon77) Made sure that all places in adapters for states and objects that can return "really async" (e.g. because of DB communication) ALWAYS return async! (else callback !--count constructs can fail)
* (foxriver76) Also set default values of instanceObjects defined in io-package.json
* (bluefox) Improve extension mode for web extensions
* (foxriver76) Optimize extendObjects function of adapter.js (use from and ack)
* (foxriver76) Use from and ack when creating instanceObjects on installation of an instance
* (Apollon77) Fixed potential crash where name is no string in some file object operations
* (foxriver76) Fixed `this.stop` being undefined on daemon adapters 
* (foxriver76) Also respect def values of io-package.json on automatic object recreation due to instance start
* (foxriver76) Respect `state.from` if provided on setState
* (Apollon77) Enhance checks for getObjectsView response
* general dependency updates
* code style optimizations

## 2.2.10 (2020-03-08) Release Dina - Windows Edition
**This version is especially for the new Windows Installer and will be used by it. It is not offered as normal update for the users on Linux (will not break, but not needed)!**
* (AlCalzone) do not execute npm installs with --prefix but inside a given directory on Windows

## 2.2.9 (2020-02-12) Release Dina
* (Apollon77) fixed pot. crash for edge cases
* (Apollon77) allowed to deactivate logfile zipping by iobroker.json (for non-windows systems)
* (Apollon77) made sure sigKill state only handles number values (fixes #638)
* (bluefox) added better checks for file CLI commands
* (Apollon77) made sure directory is created before writing metadata and send redis error correctly, prevent controller crash (fixes #644)
* (foxriver76) optimize package manager handling  (fixes #631)
* (Apollon77) made sure deleting running instances does not crash js-controller (fixes #658)
* (Apollon77) Downgrade semver to stay compatible with nodejs 8

## 2.2.8 (2020-01-24) Release Dina
* (bluefox) Added for delObject the recursive flag to recursively delete objects; use feature flag ADAPTER_DEL_OBJECT_RECURSIVE in your adapter code to detect if the js-controller supports it or not!
* (bluefox) added check for sudo for package manager
* (Apollon77) Fixed error on restore/validate when no name is provided
* (Apollon77) added/changed checks for some calls (fixes #611 too ;-))
* (Apollon77) Added feature flag ADAPTER_DEL_OBJECT_RECURSIVE
* (Apollon77) `adapter.restart` used "terminate" directly which do not call unload and broke compact mode, changed to use stop()
* (foxriver76) Fixed bug in nodejs version check and really disable adapter when requiring unsupported nodejs version
* (foxriver76) fixing issues in backup validation + add some missing commands to cli help
* (Apollon77) Do not have ioredis autoResubscribe because we do it by our own
* (Apollon77) changed stopTimeout to prevent killing wrong process for long-running "stopTimeouts" that were then fast in the end
* (bluefox) added CLI command "file rm" to delete files from ioBroker storage via command line
* (AlCalzone) fixed some errors
* (AlCalzone) made sure repository hash is always checked correctly
* (Apollon77) made sure scheduled starts are also removed when a scheduled instance is stopped
* (Apollon77) made sure Multi-host discovery server does not unexpectedly restart  when trying to stop ioBroker Master
* (Apollon77) added feature flag ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE for adapter class
* (Apollon77) allowed sessions to run longer then 24days (fixes #618, addresses ioBroker/ioBroker.admin#467)
* (Apollon77) Check a wrong check for os on installation
* (Apollon77) Also check nodejs minimum version on adapter install
* (bluefox) fixed CLI "state set"
* (Apollon77) Added some more logging to Objects/States DB
* (foxriver76) check if controller is running on `upgrade self` before controller upgrade (fixes #511)
* (bluefox) Restart ioBroker after applying vendor information
* (Apollon77) fixed pot. crashes happening while logs are rotated or packaged (thanks @mattberther and @rogerc)

## 2.2.7 (2020-01-03) Release Dina
* (Apollon77) Updated deps
* (bluefox) disabled log-symlink on Windows because only admins are allowed to create symlinks here
* (foxriver76) fixed async version of getEncryptedConfig
* (bluefox) obj type 'adapter' not set if installing adapter via `octocat` (#539)
* (bluefox) fixes Change settings of onlyWWW adapter cause exception (#549) 
* Note: In order to remove custom settings you need Admin 3.7.6+

## 2.2.6 (2020-01-01) Release Dina
* (Apollon77) fixed some more places where checks for not connected objects db were not triggered

## 2.2.5 (2019-12-31) Release Dina
* (Apollon77) added certificate handling if a local file is specified and do not overwrite if invalid in `setup first`
* (Apollon77) added check in objects lib
* (Apollon77) only initialize PacketManager when needed to prevent error messages shown when not relevant
* (Apollon77) changed logging when no packet manager found to info
* (Apollon77) disabled gz-log-rotation on Windows; remove added logging from debugging
* (Apollon77) made sure adapters and instances can be deleted again
* (Apollon77) made sure Redis simulator only set object data, all other logic is done in objects lib

## 2.2.4 (2019-12-29) Release Dina
* (Apollon77) create symlink to current logfile (fixes #578)

## 2.2.3 (2019-12-29) Release Dina
* (Apollon77) added some logging for archiving logfiles on Windows
* (Apollon77) added warning message for getMessage method to make deprecation more visible
* (bluefox) Fixed wrong error handling for adapter deletions; should work again! Fixes #576
* (bluefox) Added Package installation by js-controller for Linux based systems (apt/yum package managers) via io-package common.osDependencies[process.platform]

## 2.2.2 (2019-12-27) Release Dina
* (Apollon77) readd getMessages to adapter.js and remove in controller 2.4 later to prevent to many adapter incompatibilities now

## 2.2.1 (2019-12-27) Release Dina
* (bluefox) CLI: check if object exists by "state set" command and other fixes
* (Apollon77) Made sure adapter with longer stopTimeouts can be restarted as usual; the "stopping" flag was blocking the restart logic
* (Apollon77) made sure adapters can be stopped again with setting .alive to false
* (Apollon77) optimize questions on `setup custom`
* (Apollon77) fixed log file rotation; additionally old logs are now packed with gz
* (bluefox) Fixed rights by object creation
* (bluefox) Added support for vendor specific logic and database initialization
* (Apollon77) made sure restart of instances work in all cases
* (AlCalzone) fixed `iobroker start all` to not hang after starting all instances
* (Apollon77) made sure auto-rotation for logs work now with winston and make sure "old style manual cleanup" too
* (Apollon77) fixed error when 'iobroker url' is called without any parameter
* (Apollon77) separate system and user/adapter subscribes, introduce "changeUser" trigger for States and Objects
* (Apollon77) Also allow ÄÖÜäöüа-яА-Я as characters for first character
* (Apollon77) Also log exceptions for compact group controller
* (Apollon77) Updated dependencies
* (bluefox) removed getMessage and lenMessage from adapter methods because deprecated since long time
* (Apollon77) Removed Socket.io compatibility layer - master/slave systems coming from 1.5 need to update to 2.0 or manually!
* (Apollon77) made options parameter for getObjectList optional again

## 2.1.1 (2019-11-22) Release Christina
* (bluefox) Fixed host deletion
* (Apollon77) updated objects lib to prevent one crash case and make sure extendObject works as intended also for JavaScript adapter
* (Apollon77) made sure adapters are also reinstalled correctly when used in compact groups

## 2.1.0 (2019-11-15) Release Christina
* (Apollon77) Stable Release as minor update to separate from development/testing phase

## 2.0.44 (2019-11-14) Release Bella Stable-RC5
* (Apollon77) optimize stopping and restarting behaviour (again)

## 2.0.43 (2019-11-12) Release Bella Stable-RC4
* (Apollon77) enhance backup error handling for invalid files - they now display errors and not break the backup process
* (Apollon77) made sure new enabled/moved instances are started directly
* (Apollon77) increase object init timeout for adapter starts before complaining/stopping
* (Apollon77) fixed file read/write to not allow invalid locations and add some more checking
* (Apollon77) added some more logging for ioredis initializations

## 2.0.42 (2019-11-10) Release Bella Stable-RC3
* (Apollon77) Correct error message if certificate can not be parsed
* (bluefox) Fixed upload of material adapter
* (Apollon77) prevent crash when adapter instance is deleted which is also running currently and if stopped by deletion
* (bluefox) made sure getForeignStates do not modify the input ids list
* (Apollon77) enhance `list instances` and only show compact infos if adapter supports it

## 2.0.41 (2019-11-08) Release Bella Stable-RC2
* (Stabilostick) enhance certificate methods and add certificate checks in setup first
* (Stabilostick) added `iobroker cert view <name>` CLI command
* (Apollon77) fixed problems in stop controller handling

## 2.0.40 (2019-11-08) Release Bella Stable-RC1
* (Apollon77) made sure multiple instances of same adapter do not disturb each other in compact mode, finalize compact mode
* (AlCalzone) correctly handle git commits and branches as custom install sources
* (Apollon77) made sure callbacks with setImmediate return the real values from code execution and not pot. changed values from other actions (fixing file content being undefined when write/read happen in parallel)
* (Apollon77) handle more cases for aliases automatically (On/Ein is converted to true case insensitive now)
* (bluefox) getForeignStates() return correct ids when used with aliases
* (Apollon77) optimize controller group stopping
* (Apollon77) when target state is deleted also emit "null" onChange events to adapters for alias states
* (Apollon77) optimize controller stop behaviour with compact groups
* (Apollon77) made sure that schedules instances can start even after a "once" run that set a sigKill value
* (Apollon77) added method to synchronize file directories with file DB storage
  * add new CLI command "iobroker file sync <id>" to do the sync
  * integrate the sync with "iobroker setup first"

## 2.0.39 (2019-10-29) Release Bella
* (Apollon77) "upgrade name" for a controller will return an error to use "upgrade self"
* (Apollon77) "upgrade all" will no longer update controller too
* (Apollon77) added some more checks in adapter.js for existence of states/objects
* (Apollon77) enhance `iobroker setup custom` for Redis sentinel usage
* (Apollon77) made sure flot store works again also with objects with empty names

## 2.0.38 (2019-10-26) Release Bella
* (Apollon77) Added some more logic to prevent access with invalid ids
* (Apollon77) changed "enhancedLogging" to not be global but "per DB"
* (Apollon77) Fixed compact mode on Windows systems
* (Apollon77) made sure multiple callbacks to "unload" will be ignored
* (bluefox) Rise all user in admin group to administrators
* (Apollon77) Allowed buffers to be passed in messages again
* (bluefox) Fixed session storage
* (Apollon77) Introduce 0_userdata as new home for user specific files, objects and states
* (Apollon77) Enhance logging
* (bluefox) fixed letsencrypt (was broken n 2.0.35)
* (Apollon77) fixed install adapter starts like vis installation when db is not available
* (Stabilostick) Auto generated self-signed certificates need to have a max duration of 2 years according to new Apple rules

## 2.0.35 (2019-10-19) Release Bella
* (Apollon77) Allowed to use Redis password as "pass" parameter for States and Objects
* (Apollon77) Prevent hangs on "iobroker upgrade self" from 1.5 to 2.0
* (bluefox) Updated IPs information periodically
* (bluefox) Removed safe-replace, bluebird, pyconf packages
* (paul53/AlCalzone/Apollon77) Fixed datatype of system.host.cpu and system.adapter.XY.Z.cpu
* (Apollon77) Made sure alias.0 and other controller objects are also checked and created if needed on setup first when updating
* (bluefox) Allowed one state to multiple aliases connections
* (Apollon77) Made sure required adapters are also checked correctly when using compact mode and groups
* (Apollon77) Enhance logging for unsupported (should not happen) commands

## 2.0.34 (2019-10-17) Release Bella
* (Apollon77) Allowed custom settings to be removed again if objects are "file"
* (Apollon77) Removed default value for "switch" and "level.dimmer" roles
* (bluefox) fixed user authentication

## 2.0.33 (2019-10-15) Release Bella
* (Apollon77) Sync objects and states retry max delay defaults
* (Apollon77) Re-Add the certificate check and automatic re-creation for old certificates as in 1.5.14

## 2.0.32 (2019-10-15) Release Bella
* (Apollon77) Also restart controller if only states connection disconnects

## 2.0.31 (2019-10-14) Release Bella
* (Apollon77) fixed undefined variable on one place

## 2.0.30 (2019-10-14) Release Bella
* (Apollon77) enhance reconnection handling (system tries to reconnect up to 40s including re-sending all data changes  before restart happens, on no connection to db on start a restart is tried every 30s)
* (Apollon77) fixed file handing issue
* (bluefox) handle empty states correctly in Redis scenarios

## 2.0.29 (2019-10-13) Release Bella
* (Apollon77) fixed backup on empty/null states

## 2.0.28 (2019-10-13) Release Bella
* (Apollon77) Correct meta data return for some special cases

## 2.0.27 (2019-10-13) Release Bella
* (Apollon77) Correct some potential object issues

## 2.0.26 (2019-10-13) Release Bella
* (Apollon77) Made sure Logs are only streamed to admin for selected loglevel
* (Apollon77) Fixed "iobroker file write"
* (Apollon77) Made sure invalid ids are handled correctly without throwing errors
* (bluefox) Added alias.0 as object to be added
* (bluefox) Allowed Arrays as state values
* (bluefox) Translate object names

## 2.0.25 (2019-10-09) Release Bella
**This is the First version which is released into Latest Repository.**

**[Discussion Thread in Forum](https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im-latest-repo)**
* (Apollon77) Also allow states/objects with capital letters as first letter
* (Apollon77) fixed adapter/instance deletion
* (AlCalzone) fixed CLI get state getValue
* (Apollon77) increase LUA script timeout
* (Apollon77) updated in objects lib, also update other dependencies
* (bluefox) small logging optimization

## 2.0.24 (2019-10-02) Release Bella
* (Apollon77) optimize performance, especially for file/file systems
* (Apollon77) enhance path sanitization
* (Apollon77) hopefully prevent Redis errors on connection close
* (Apollon77) fixed adapter logging with --debug flag
* (Apollon77) fixed Adapter Restarts also for widgets

## 2.0.22 (2019-10-02) Release Bella
* (Apollon77) work on some performance optimizations
* (Apollon77) Fixed binary state handling

## 2.0.21 (2019-10-02) Release Bella
* (Apollon77) made sure also states starting with "io" will be notified on stateChange
* (Apollon77) fixed Loglevel change via instance state
* (Apollon77) made sure subscribes for instances states are correctly passed through to adapter for all cases he subscribed them (also for special states like logLevel or sigKill)
* (Apollon77) made sure id filtering also works correct for >10 instances of the same adapter
* (Apollon77) some more small fixes and optimizations
* (Bluefox) Do not kill instance in debug mode on PID mismatch

## 2.0.19 (2019-10-02) Release Bella
* (Apollon77) fixed migration
* (Apollon77) fixed potential cases where objects/states files were not stored

## 2.0.18 (2019-10-01) Release Bella
* (Apollon77) allowed to specify network family for redis library, defaults to 0 (IPv4 and IPv6)

## 2.0.17 (2019-10-01) Release Bella
* (Apollon77) delay parallel start of scheduled instances to prevent system overload scenarios (same rules asd for adapter start, basically 4s delay)
* (Apollon77) Optimize some Migration questions
* (Apollon77) smaller fixes and optimization

## 2.0.16 (2019-09-30) Release Bella
* (Apollon77) streamline redis vs file States handling which was different also before controller 2.0:
  * not set states will always return null now
  * States will set to null completely (not only value) when they expire
  * States will also be published to onChanged handlers when states are in Redis
* (Apollon77) rework expiry handling for File-States to use Timeouts

## 2.0.14 (2019-09-29) Release Bella
* (Apollon77) fixed checking if ioBroker is running (bug in 2.0.13)
* (Apollon77) upgrade socket-io deps
* (Stabilostick) Randomize Certificate Serial numbers

## 2.0.13 (2019-09-28) Release Bella
* (Apollon77) optimize `iobroker status` CLI command
* (Apollon77) some other small fixes
* (Apollon77) removed clearAllLogs logic

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
* (Apollon77) Updated objects-ha lib to 1.1.19

## 2.0.8 (2019-09-23) Release Bella
* (Apollon77) Optimize Adapter and Controller stopping processes

## 2.0.7 (2019-09-22) Release Bella
* (Apollon77) Correct file based internal structure to prevent entries with "//" in the path
* (Apollon77) Check for existing of states DB in some more places to prevent problems in compact end scenarios
* (Apollon77) try to add a better retry logic on disconnect to the DBs, restart after 30s
* (Apollon77) made some file operations with Paths more compatible to former versions

## 2.0.6 (2019-09-21) Release Bella
* (Apollon77) prevent "keys Not found" error in log, be more redis compatible, fixes #461
* (Apollon77) prevent "invalid instance object" errors for channel objects, fixes #462
* (Apollon77) optimize further on compact- and general adapter starting mechanisms to better prevent multi-starts
* (Apollon77) updated objects-ha lib to 1.1.17 to normalize filenames to prevent problems on double-slashes

## 2.0.5 (2019-09-20) Release Bella
* (Apollon77) fixed some error while accessing custom directories, fixes #455
* (Apollon77) Added more logic to better handle migration edge cases (especially slaves vs migrations), fixes #458
* (Apollon77) Made sure invalid alias values do not crash controller process (logger was missing), fixes #456
* (Apollon77) Added better error and fallback handling for compact mode, fixes #460

## 2.0.4 (2019-09-19) Release Bella
* (Apollon77) fixes #434, host command
* (Apollon77) Added one more confirmation question when migrating objects

## 2.0.3 (2019-09-19) Release Bella
* (Apollon77) Log Process-ID for all adapter log messages
* (Apollon77) When Objects/States connection dies and is no longer able to be restored for adapters we end the adapter process. This prevents us from hanging processes
* (Apollon77) End adapters with code 11 when they decide to end itself because they are not the current process, so that no additional restarts happen

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
  * radar2 1.0.9 (1.2.0 from GitHub needs a manual fix!)
  * ring 1.0.5 or higher

### New user features
* **(Bluefox/Apollon77) Added Compact Mode and compact groups, see [Compact Information in README](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#start-adapter-instances-in-compact-mode)** (Technology Preview)
* **(bluefox) Added build-in Alias handling for Objects/States, see [Alias Information in README](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#object-and-state-aliases)** (Technology Preview)
* **(Bluefox/Apollon77) Added support to also use Redis for Objects and Files, see [Redis Objects Information in README](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#using-redis-as-objectsfile-db)**
* **(Apollon77) Added Redis sentinel support, see [Redis Sentinel Information in README](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#using-redis-sentinel-as-objectsfile-db)**
* (Apollon77) Allowed dynamic change of Loglevel for adapter instance and js-controller hosts processes, see [Dynamic Loglevel changes Information in README](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#dynamic-loglevel-changes)
* (Bluefox) Added optional migration for State and/or Objects values when using `setup custom`.
* (Apollon77) added monitoring for event-Loop-Lag as host and adapter objects. This can be used to analyze if an node.js process is blocked too much
* (foxriver76) added possibility to validate backup files
* (alcalzone) Support command `iobroker logs`
* (Stabilostick) `cert create` CLI commands
* (Apollon77) Remember installation location for re-installations. For GitHub installs it gets the exact commit hash to reinstall really the correct version
* (Apollon77) Use remembered installation location for automatic adapter installs (e.g. if missing, host move cases)

### New adapter developer features
* (Apollon77) added adapter.supportsFeature('NAME') method to check if a certain feature exists. fixes #244, see  [Adapter Feature Detection Information in README](https://GitHub.com/ioBroker/ioBroker.js-controller/blob/master/README.md#adapter-feature-dtection) for information and the full list of allowed features
* (foxriver76) Ability to define secured objects in io-pack access only via own adapter and admin, details see #287
* (foxriver76) added getObjectView and getObjectViewAsync on adapter object
* (foxriver76) added getObjectList and getObjectListAsync on adapter object
* (bluefox) allowed the deletion of multiple objects with wildcard
* (foxriver76) setObject/setObjectNotExists now also sets default value of state after object creation
* (Apollon77) allowed getPort to check for the port optionally on a certain host/IP
* (Apollon77) Streamline redis vs file States handling which was different also before controller 2.0:
  * not set states will always return null now
  * States will set to null completely (not only value) when they expire
  * States will also be published to onChanged handlers when states are in Redis

### Further changes
* **(Apollon77) Rewrite InMem databases (States & Objects) to TCP (redis compatible) protocol and deprecate socket.io version; will be removed approx. in v2.1. This change should prevent us from "Reconnection to DB" errors**
* (bluefox) Added adapter handling to prevent "error 7" (adapters will stop itself as soon as PID is not as expected)
* (Apollon77) upgrade all dependencies, means: 0 vulnerabilities :-)
* (AlCalzone) Don't chmod 777 after controller upgrade
* (alcalzone) refactoring of many CLI commands
* (bluefox) added possibility to return zip file as a link and not as base64
* (bluefox) standardize error codes
* (alcalzone) Root should always npm install with --unsafe-perm
* (bluefox) enabled gzip to read repositories
* (bluefox) read hash of sources.json before read the whole file
* (bluefox) Added some information to user-agent, like chrome, IE and Firefox do by update checks - the information is absolutely anonymous
* (bluefox) verified the version of node.js by start of the instance
* (bluefox) hide cmd window on Windows
* (AlCalzone) Include certificate creation in `setup first`
* (bluefox) suppressed warning by npm install
* (bluefox) allowed optional dependencies being installed
* (Apollon77) optimize `setup custom`and add more user guidance
* (Apollon77) Added Feature overview to README
* (bluefox) forward upload console outputs from slave to master
* (Apollon77) made sure to upload and upgrade all relevant objects on installations and updates of adapters
* (Apollon77) always upgrade instance objects after successful installs or upgrades
* (Apollon77) optimize adapter start processes and such, especially when combined with needed automatic installations of adapters, also for error cases
* (Apollon77) after 2 installation tries with "last-installedFrom" use the installedVersion field to try to install from npm
* (Apollon77) hosts now ignore object changes when the affected instances is still in installQueue
* and much more code refactoring and optimizations in various places

### Bugfixes
* (Apollon77) log scheduled restarts as info only (fixes #315)
* (Apollon77) fixes #340 to maintain restartSchedule on updates
* (Apollon77) fixed bug where "ack" was possible to set to any value via cli
* (alcalzone) Enable ESLint and fix most issues
* (bluefox) optimize multi host upload
* (Apollon77) Restart stopped adapters at the end of the upload and not before to make sure to not have two adapter restarts on upgrade cases
* (Apollon77) Enhance checks for failed installations in cli and controller
* (Apollon77) also update adapter instance statistic objects when no instanceObjects are defined
* (Apollon77) "alive" state values are only checked on adapter start if ack=true to allow to start a process if not running
* (Apollon77) fixes for multi-host detection
* (Apollon77) fixed backup of states
* (bluefox) Made sure also VIS global CSS is included in backup and restored
* and many more fixes in various places

## 1.5.13 (2019-06-12) Evolution release (Ann)
* (Stabilostick) Made sure Info Adapter Tab is displayed automatically on install
* (Stabilostick) Added CLI host commands to CLI usage help
* (Stabilostick) Replace winston-syslog dependency to prevent build errors on node.js 10+ when installing or updating ioBroker (not needed in 2.0.0)
* (Stabilostick) Replace default self signed SSL certificate to prevent errors in Node.Js 10.16+
* (Apollon77) Also replace default certificate used for all Web and Admin instances if the old certificate was used, so restart will use the new certificate

## 1.5.12 (2019-06-01) Evolution release (Ann)
* (Apollon77) Install instance of info adapter too on first setup of controller

## 1.5.11 (2019-05-26) Evolution release (Ann)
* (Apollon77) Allowed to install specific versions/fix installing specific versions

## 1.5.9 (2019-05-16) Evolution release (Ann)
* (bluefox) Read cache of repository before download the whole file
* (AlCalzone) if npm returns code 1 it is OK
* (AlCalzone) fixed instances enumeration
* revert greenlock version to 2.7.1

## 1.5.7 (2019-02-12) Fixes for Evolution release (Ann)
* Required version for normal functionality: javascript 3.6.5, dasWetter: 2.7.1, upnp: 1.0.0
* (bluefox) Fixed let's encrypt
* (bluefox) Fixed "iob" script
* (Dominic Griesel) Revert the changes to `del[Foreign]State`, so the object is not deleted.
* (bluefox) always install the version from repository and not the latest from npm
* (Ingo Fischer) Root should always npm install with --unsafe-perm
* (bluefox) fixed iobroker stop
* (bluefox) fixed Empty ID error
* (bluefox) fixed error with formatDate

## 1.5.3 (2018-09-15) Evolution release (Ann)
* (bluefox) disabled the auto-control of quality codes

## 1.5.2 (2018-09-14) Evolution release (Ann)
* (bluefox) Let's encrypt fixes
* (bluefox) Fixed SSL issue with authentication

## 1.5.1 (2018-09-14) Evolution release (Ann)
### Breaking changes:
* (bluefox) Breaking changes: "][*,;'"`<>?" are no more allowed in IDs

### Feature changes:
* (bluefox) the user by changing of states and objects is logged
* (bluefox) install specific version of missing adapter
* (bluefox) added disk info
* (bluefox) added memAvailable state
* (bluefox) added noChmod experimental settings
* (bluefox) stop instances only if they belong to current host
* (bluefox) delete adapter only on current host and leave it on others
* (bluefox) Combine States and Objects (#203)
* (bluefox) Implemented adapter.terminate('Because I need it') (#197)
* (alcalzone) added restart, disable, updateConfig methods to Adapter class
* (bluefox) added reinstall.js
* (bluefox) added "iob" as shortcut
* (bluefox) added getInterfaces to sendToHost
* (bluefox) implemented backup of data folders via dataFolder flag
* (alcalzone) Added a wrapper method to safely expose ES6 classes to legacy code
* (bluefox) added information if instance is alive in "list instances"
* (stabilostick) added 'pidusage' for information about cpu and new states per adapter instance
* (bluefox) added support of new mime types: pdf, doc, xls, ppt
* (bluefox) implemented flag common.eraseOnUpload
* (bluefox) set quality codes on connection lost and adapter disconnect
* (alcalzone) Give adapters a chance to handle their own uncaught errors
* (alcalzone) Added call stack information to trace error logs
* (bluefox) added pattern2RegEx to tools

### Fixes and Optimizations:
* (apollon77) the node10 testing was added
* (bluefox) the read file function was protected
* (bluefox) possible access rights problem was closed
* (bluefox) refactoring of memory calculations
* (bluefox) set default values of states by creation of new instances
* (alcalzone) Fixed "install npm" messages, upgrade node typings to v6
* (bluefox) check if mem file could be read
* (buzzy1337) fixed calculation of kilobyte to megabyte and fix reading /proc/meminfo
* (bluefox) Fix: Access to log files through admin does not work
* (bluefox) fixed redis disconnect
* (bluefox) Updated acme to V2 (#199)
* (bluefox) Improve deleteDevice (#186)
* (bluefox) fixed cookie expiration
* (alcalzone) several async and testing fixes
* (bluefox) timeout for npm check added
* (bluefox) fixed "object chmod 777 777 javascript.0.*" command
* (bluefox) do not send ready second time on reconnect db
* (Apollon77, Bluefox) prevent defaultObj to be overwritten with normal common details
* (bluefox) fixed error if ID is empty
* (bluefox) check id by setObject
* (apollon77) Added amazon-dash to list of adapter to be installed with unsafe-perm
* (bluefox) leave backitup enabled after restore

## 1.4.2 (2018-04-12)
Main changes: add instance with desired number, Force using of socket.io 2.1.0, Bugfixes

* (bluefox) fixed error with letsencrypt debug output
* (bluefox) fixed delObject
* (bluefox) fixed restore of backup
* (bluefox) allowed to add instance with desired number
* (apollon77) fixed auto multi-host
* (bluefox) fixed for adapter update
* (bluefox) Force using of socket.io 2.1.0

## 1.4.0 (2018-04-03)
Main changes: uninstall via npm, downgrade winston-syslog, refactored deleteAdapter, object.json auto-backups

* (AlCalzone) fixed npm version pre-install check
* (bluefox) removed winston-syslog 2.0 and replace it with 1.2.6
* (AlCalzone) refactored and promisified `deleteAdapter` and `deleteInstance`
* (bluefox) removed controller from the adapters list in admin
* (bluefox) also uninstall adapters using npm
* (bluefox) backup object.json files every 2 hours for last 48 hours (warning! Disk usage)
* (bluefox) added cli command to update/add the vis/knx license

## 1.3.0 (2018-03-11)
Main changes: socket.io Version downgraded because of bug. Better npm5 support

* (AlCalzone) Removed the outdated npm package and disable package-lock before installing (#175)
* (AlCalzone) reworked npm adapter version check without `npm` package
* (AlCalzone) ignore local NPM for version check
* (AlCalzone) don't modify the parent's process PATH variable
* (AlCalzone) check npm version before installing and potentially disable package-lock
* (AlCalzone) don't cancel installation, or we're breaking ioBroker anyways
* (AlCalzone) ignore local npm version for preinstall check
* (bluefox) move socket.io from 2.0.4 to 1.5.1 because of bug
* (bluefox) added intro to default tabs

## 1.2.7 (2018-03-06)
Main changes: support of npm5, Multihost fixed, added promises to adapter.js

* (bluefox) fixed multi-host connect
* (bluefox) added "multi-host status" command
* (bluefox) made statistics interval adjustable
* (bluefox) better scan of installed adapters
* (bluefox) better deletion of adapters
* (bluefox) fixed requests like getStates('*.info.connection')
* (bluefox) create instance's objects by start.
* (AlCalzone) Added promisified methods to the adapter class
* (AlCalzone) enabled basic type-checking and fix found error
* (Apollon77) fixed potential error and check if that.log exists
* (bluefox) updates npm packets
* (Apollon77) log an error when npmInstallWithCheck throws
* (AlCalzone) [npm5] Disable package-lock.json before installing anything
* (Apollon77) use stable tag from admin in dependencies
* (bluefox) fixed empty ID error

## 1.2.5 (2018-01-27)
* (bluefox) move buildRepository.js to ioBroker.repositories
* (bluefox) fixed adapter download
* (Apollon77) also include npm5 fix into reinstall.sh
* (bluefox) added functions to standard enums
* (bluefox) check if pattern is valid
* (bluefox) catch error by deleting of adapter.
* (bluefox) better adapter directory search
* (Apollon77) another fix for reinstall.sh, add --unsafe-perm
* (Apollon77) exit mocha tests explicitely when completed, needed pot. with most current version of mocha
* (Apollon77) added npm5 check and "Block" to "iobroker install" commands

## 1.2.4 (2017-12-15)
* (bluefox) The fix for npm5

## 1.2.3 (2017-11-24)
* (bluefox) fixed Windows problem and storing of error messages
* (bluefox) fixed logging level: silly
* (bluefox) fixed dependency check
* (bluefox) fixed small errors
* (bluefox) added repo commands to cli
* (bluefox) setTimeout(0) => setImmediate
* (bluefox) added timestamp and "from" information object
* (bluefox) allowed to enable redis by setup
* (bluefox) catch backup errors
* (bluefox) ignore errors by setup first
* (bluefox) fixed generate repository
* (bluefox) calculate number of datapoints in vis and deliver it in statistics
* (bluefox) fixed restoring of backup
* (AlCalzone) fixed install urls ending with ".git"

## 1.2.0 (2017-09-24)
* (bluefox) fixed upgrade command
* (bluefox) allowed to install from custom repositories
* (bluefox) removed online and sources repositories
* (bluefox) fixed multihosts command
* (bluefox) catch the error outputs of instances if they die
* (bluefox) no more support for node.js 0.10/0.12
* (bluefox) added new logging level: silly

## 1.1.3 (2017-08-13)
* (bluefox) Extend statistics (node.js versions and some HW parameters will be reported)
* (bluefox) Updated npm packets
* (bluefox) caught semver error
* (bluefox) changed interface of getDevices functions
* (bluefox) changed interface of createChannel functions
* (bluefox) working on multi-host service
* (bluefox) fixed users cli
* (bluefox) implemented defaultNewAcl
* (bluefox) removed 0.10 and add 8 by tests
* (bluefox) fixed restart of adapters

## 1.1.2 (2017-07-13)
* (bluefox) Close sockets by default for external connects

## 1.1.1 (2017-06-29)
* (jens-maus) allowed redis connections via unix sockets by specifying host as e.g. '/var/run/redis/redis.sock' and setting port to 0. This should slightly improve performance on busy installations.
* (Apollon77) optimizations for permission handling

## 1.1.0 (2017-06-08)
* (bluefox) BREAKING Changes: For multi-host systems the user MUST explicit allow connections from other IPs in /opt/iobroker/iobroker-data/iobroker.json

```
"host": "127.0.0.1",
=>
"host": "0.0.0.0",
```

for objects (line 11)  and for states (line 21).

## 1.0.3 (2017-06-01)
* (bluefox) getHostInfo for new admin
* (bluefox) allowed using of files for certificates
* (bluefox) always install zwave with unsafe-perm option
* (apollon77) added handling for undefined
* (apollon77) uptime is a number only and no String/List/Array beside the fact that also with a number a "toString" should exist, or it's undefined because an old host is listed with no value ...

## 1.0.1 (2017-05-03)
* (bluefox) Change repository generation (not relevant for users)
* (bluefox) small change for install process (not relevant for users)

## 1.0.0 (2017-04-23)
* (bluefox) No big changes, just version
* (bluefox) removed warning about iDs
* (bluefox) fixed tests
* (bluefox) try to ignore npm error 1
* (bluefox) fixed possible error.
* (bluefox) create states with ack=true by default

## 0.17.2 (2017-03-25)
* (bluefox) do not store logs and messages and just publish it
* (bluefox) removed mochawsome

## 0.17.1 (2017-03-15)
* (bluefox) added stable repository
* (bluefox) fixed bug with user=>users (required for user rights)
* (bluefox) install discovery adapter too if exists at first start
* (bluefox) extend configuration with city, country and GPS coordinates
* (bluefox) send city and country in statistics and allow to disable it

## 0.16.2 (2017-03-08)
* (bluefox) fixed "iobroker passwd username"

## 0.16.1 (2017-02-27)
* (bluefox) use SHA256 instead of SHA1 (All passwords must be reset via "iobroker passwd username")
* (bluefox) changed cli commands for user: user add, user del, user set, user enable...
* (bluefox) replace letsencrypt with greenlock
* (bluefox) try to fix sha256 issue with node.js 0.10.x
* (bluefox) added uniti
* (Apollon77) changed reinstall.sh script
* (bluefox) added setStateChanged
* (bluefox) implemented event counters
* (bluefox) read values from cache if possible in adapter
* (bluefox) added parser adapter, smartmeter, fakeroku, wetty, fronius, Worx Landroid Rasenmäher
* (bluefox) fixed log sources
* (bluefox) fixed callbacks calls by setObjectNotExists
* (bluefox) fixed getForeignObjects
* (bluefox) write tests
* (Patrick) `adapter.namespace` now always int (was int or string mixed)
* (Patrick) _fixId better results for empty obj and string (return namespace + '.')
* (bluefox) small fixes for multi-host
* (bluefox) added getInstalledAdapter for autodiscovery

## 0.15.3 (2017-01-20)
* (bluefox) fixed of autoSubscribe
* (bluefox) no extra upload if install of adapters from GitHub

## 0.15.1 (2017-01-14)
* (bluefox) documentation of adapter
* (bluefox) support of autoSubscribe
* (bluefox) added `innogy-smarthome`, `vis-players`
* (bluefox) fixed error with `preserve` settings
* (bluefox) restart adapter immediately if desired
* (bluefox) support of web extensions

## 0.14.0 (2016-12-17)
* (bluefox) added debug information for logging
* (bluefox) removed occ
* (bluefox) added `mpd`, `icons-fatcow-hosting`
* (bluefox) updated node-schedule
* (bluefox) added cli command `show uuid`
* (bluefox) try to fix issue with npm3
* (bluefox) added console command `repo [name]`
* (bluefox) try to extract the information from local sources-dist.json it online not reachable
* (bluefox) added host remove
* (bluefox) install non enabled adapters
* (bluefox) install icons on backup too
* (bluefox) fixed some sporadic errors

## 0.13.3 (2016-11-26)
* (bluefox) support of getLocationOnDisk message for admin
* (bluefox) allowed upgrade to specific version, like adapter@0.1.0
* (bluefox) you can change any native parameter of instance with set
* (bluefox) added support of syslog (see iobroker.json to enable)
* (bluefox) added radar
* (bluefox) do not change title of instance by upload and update

## 0.13.2 (2016-11-04)
* (bluefox) fixed new installation

## 0.13.1 (2016-10-31)
* (bluefox) fixed renaming of host by start
* (bluefox) implemented auto-objects and auto-states for adapter
* (bluefox) recursive deletion of folders with objects.unlink
* (bluefox) support of tarballs as install path
* (bluefox) rename rpi to rpi2, homekit to homekit2
* (bluefox) added upnp
* (bluefox) fixed fileName of log file
* (bluefox) removed peerDependencies

## 0.13.0 (2016-10-21)
* (bluefox) fixed letsencrypt to use `fullchain.pem`
* (bluefox) fixed error with emitter
* (bluefox) fixed formatDate for russian month
* (bluefox) backup letsencrypt files too
* (bluefox) install missing adapters one after other and not parallel.
* (bluefox) let remove UUID to prepare images with ioBroker
* (bluefox) using peerDependencies
* (bluefox) rename host automatically if single host
* (bluefox) added write/read properties to alive variable
* (bluefox) fixed creation of package.json for npm 3
* (bluefox) try catch for parse of states
* (appolon77) added possibility to send messages with json
* (bluefox) updates some packages
* (bluefox) print node.js version at start
* (bluefox) force logger to use local time
* (appolon77) fixed multi instance messaging
* (bluefox) using peerDependencies
* (bluefox) rename host automatically if single host
* (bluefox) updated artnet
* (bluefox) added vis-canvas-gauges
* (bluefox) added rflink
* (bluefox) added foobar2000
* (bluefox) added mqtt client
* (bluefox) added lgtv
* (bluefox) added pushsafer

## 0.12.2 (2016-09-04)
* (bluefox) fixed read versions by multi-host
* (bluefox) added `owntracks`
* (bluefox) added `amazon-dash`
* (bluefox) control enabled for instance over system.adapter.NAME.INSTANCE.alive variable

## 0.12.1 (2016-09-02)
* (bluefox) fixed letsencrypt file

## 0.12.0 (2016-08-27)
* (bluefox) working on objects in redis
* (bluefox) added `botvac` adapter
* (bluefox) better multi-host
* (bluefox) fixed formatDate

## 0.11.3 (2016-08-24)
* (PArns) fixed upgrade of adapters
* (bluefox) updated `_design/xyz` by upgrade

## 0.11.2 (2016-08-13)
* (bluefox) fixed upgrade of adapters

## 0.11.1 (2016-07-30)
* (bluefox) fixed dependency if depend on js-controller

## 0.11.0 (2016-07-27)
* (bluefox) implemented auto-restart of adapters (expert mode)
* (bluefox) added rights check for getBinaryState/setBinaryState
* (bluefox) support of default ttl for sessions
* (bluefox) fixed custom setup
* (bluefox) fixed upload binary files
* (bluefox) fixed list of files in subdirectories

## 0.10.1 (2016-07-06)
* (bluefox) support of chained certificates
* (bluefox) added nut
* (bluefox) added vis-map

## 0.10.0 (2016-07-01)
* (bluefox) support of export and import
* (bluefox) activate redis for states
* (bluefox) fixed the installation of adapter with `singletonHost`
* (bluefox) issue event if state deleted (redis)
* (bluefox) fixed error with administrator users
* (bluefox) do not store repository if with errors
* (bluefox) fixed checkPassword and setPassword
* (bluefox) updated wrong SSL certificates
* (bluefox) added freemem state to host
* (bluefox) added milliseconds to formatDate
* (bluefox) updated tar.gz

* (bluefox) added fhem
* (bluefox) added netatmo
* (bluefox) added tankerkoenig
* (bluefox) added vis-history
* (bluefox) added homepilot
* (bluefox) added cloud

## 0.9.0 (2016-05-23)
* (bluefox) made from seconds the ms
* (bluefox) added console command "isrun"
* (bluefox) added `--timeout 5000`
* (bluefox) fixed small errors
* (bluefox) changed function formatValue
* (bluefox) fixed stop of scheduled adapters
* (bluefox) added "--logs" flag for adapter start (required by adapter debugging)
* (bluefox) made hostname configurable
* (bluefox) fixed update of adapters and settings

## 0.8.10 (2016-04-25)
* (bluefox) fixed restart script
* (bluefox) updated default certificates

## 0.8.9 (2016-04-23)
* (bluefox) do not handle exceptions in logger
* (bluefox) changed logger
* (bluefox) set valid mimeType for *.manifest
* (bluefox) added noolite adapter
* (bluefox) changed download script
* (bluefox) changed rename script
* (bluefox) added starline
* (bluefox) changed repository building
* (bluefox) added 'delete' objects
* (bluefox) changed behavior by exceptions
* (bluefox) workaround for DHCP delay
* (bluefox) fixed passwd command
* (bluefox) do not write error under Windows: "cannot delete log file"

## 0.8.8 (2016-02-29)
* (bluefox) replace winston with the latest module
* (bluefox) added syslog support
* (bluefox) fixed some LINT warnings
* (bluefox) added "host self" command (identical to "host this")
* (bluefox) fixed error with npm 3 if no node_modules directory found
* (bluefox) support of noCache flag
* (bluefox) fixed error if _data.json file broken
* (bluefox) support of file uploading: iobroker fileName /adapter/fileName

## 0.8.7 (2016-02-24)
* (bluefox) fixed getForeignObjects
* (bluefox) added telegram
* (bluefox) enabled OEM naming
* (bluefox) fixed small error if multi-host not available
* (bluefox) added reinstall script
* (bluefox) added vis-justgage adapter
* (bluefox) added `mysensors`

## 0.8.6 (2016-02-04)
* (bluefox) added text2command adapter
* (bluefox) fixed upload problem
* (bluefox) use node-schedule 1.0.0
* (bluefox) extend node node_modules/iobroker.js-controller/lib/buildRepository.js command

## 0.8.5 (2016-02-01)
* (bluefox) updated version of node-schedule to fix problem with Februar.2016
* (bluefox) updated socket.io version
* (bluefox) added logo image
* (bluefox) added buildRepository.js
* (bluefox) If desired, that adapter must be terminated
* (bluefox) use isFloatComma in formatValue
* (soef)    formatDate extended and formatValue added
* (soef)    formatDate extended to use seconds as duration
* (soef)    formatValue added to convert a value to a string with a thousand separator....
* (bluefox) added `homekit` and `miele`
* (bluefox) fixed upload of files

## 0.8.4 (2016-01-22)
* (bluefox) fixed version
* (bluefox) fixed log outputs

## 0.8.3 (2016-01-21)
* (bluefox) added commands like "npm start"
* (bluefox) check singletonHost one on host
* (bluefox) added memoryLimitMB for controller and adapters
* (bluefox) made install from NON-git sources possible again.
* (bluefox) added rpi, weatherunderground, chromecast, geofency, samsung, squeezebox, vcard, yamaha
* (husky-koglhof) occ und rpi Adapter
* (angelnu) visdebug - check for different adapter directories
* (bluefox) enabled install of icons-open-icon-library-png

## 0.8.2 (2015-12-14)
* (bluefox) fixed upgrade.

## 0.8.1 (2015-12-14)
* (bluefox) fixed permissions for administrator group, but not admin user.
* (bluefox) support of getHistory command and defaultHistory
* (bluefox) implemented "iobroker restart adapter"
* (bluefox) enabled write dependencies as an object
* (bluefox) removed directory adapter and move example to iobroker.template
* (bluefox) prepare support of syslog
* (bluefox) added ioBroker.sql
* (bluefox) added ioBroker.influxdb
* (bluefox) removed example adapter (it is replaced with iobroker.template)
* (bluefox) start of renaming of js-controller to enable branding

## 0.7.15 (2015-11-10)
* (bluefox) added command `visdebug`
* (bluefox) added flag `preserveSettings`
* (bluefox) added `vis-keyboard`
* (bluefox) fixed error with host rename
* (bluefox) fixed `sendTo` and `sendToHost` with callback.
* (bluefox) updated objects by upload of adapter (important for community adapters)
* (bluefox) added `vis-google-fonts`
* (bluefox) added support of quality in setState
* (bluefox) added adapter mobile

## 0.7.14 (2015-10-13)
* (bluefox) fixed restart under linux
* (bluefox) added wolf adapter to repository
* (smilingJack) increase timeout by update of repository
* (bluefox) fixed set --ssl
* (bluefox) added "connectTimeout" parameter to iobroker.json. Try to fix EADDRINUSE error under raspi.

## 0.7.13 (2015-09-30)
* (bluefox) added `vis-jqui-mfd`
* (bluefox) allowed to install direct from GitHub in admin
* (bluefox) added `vis-fancyswitch`, `vis-rgraph`
* (bluefox) fill state by createState even if no default value set
* (bluefox) added modbus

## 0.7.12 (2015-09-15)
* (bluefox) added terminal adapter
* (bluefox) implemented "iobroker url xxx"
* (bluefox) fixed restore
* (bluefox) fixed _failCounter entry in Adapters
* (bluefox) fixed log outputs

## 0.7.11 (2015-08-23)
* (bluefox) fixed installation of adapter

## 0.7.10 (2015-08-22)
* (bluefox) fixed first installation

## 0.7.9 (2015-08-20)
* (bluefox) fixed broker upgrade
* (bluefox) improve vis upload
* (bluefox) fixed adapter.deleteChannel
* (bluefox) use regex by deleting of channel or instance
* (bluefox) fixed delete instance errors
* (bluefox) added new console commands: set, host. To set settings of instance from console and change host name.

## 0.7.8 (2015-08-12)
* (bluefox) fixed error with node-red
* (bluefox) move setup files into directories

## 0.7.7 (2015-08-11)
* (bluefox) added harmony to repository

## 0.7.6 (2015-08-06)
* (bluefox) changed log file extension to .log
* (bluefox) enabled destroyDB, but check before if ioBroker is running
* (bluefox) updated packages
* (bluefox) added bars, plumbs, scenes

## 0.7.5 (2015-07-27)
* (bluefox) added `iobroker upload all` and `iobroker start all` commands
* (bluefox) fixed `iobroker package`
* (bluefox) made it possible to allow OBJECTS and STATES only on localhost
* (bluefox) added new adapter pushbullet
* (bluefox) fixed restart by installing.

## 0.7.4 (2015-07-19)
* (bluefox) fixed restartAdapters flag. (for `vis-metro` and co)
* (bluefox) added `vis-hqWidgets`
* (bluefox) added `vis-colorpicker`
* (bluefox) normalized paths in backup
* (bluefox) added better backup

## 0.7.3 (2015-07-12)
* (bluefox) added flot to repository
* (bluefox) added chmodFile for adapter
* (bluefox) implemented rm
* (bluefox) fixed permissions problem
* (bluefox) set permission by creation of file
* (bluefox) made possible upload of subtree
* (bluefox) fixed user name
* (bluefox) fixed update function

## 0.7.2 (2015-06-29)
* (bluefox) removed _failCounter from adapter list
* (bluefox) updated license

## 0.7.1 (2015-06-28)
* (bluefox) support of permissions
* (bluefox) fixed backup
* (bluefox) fixed error with noFileCache
* (bluefox) added unsubscribeForeignObjects to adapters
* (bluefox) added icon sets to repository
* (bluefox) implemented list: objets, states, instances, adapters
* (bluefox) support of "list hosts"
* (bluefox) verified version by install and start
* (bluefox) fixed error with dependencies
* (bluefox) fixed delete of logs
* (bluefox) fixed getPort function in adapter.

## 0.7.0 (2015-05-07)
* (bluefox) support of permissions

## 0.6.6 (2015-05-07)
* (bluefox) implemented daily rolling files.
* (bluefox) fixed addChannelToEnum, deleteChannelFromEnum, deleteChannel if no device name
* (bluefox) fixed "state set", "message" console commands
* (bluefox) fixed errors in adapter.js

## 0.6.5 (2015-04-27)
* (bluefox) added default certificates

## 0.6.4 (2015-04-17)
* (bluefox) optimize install call
* (bluefox) backup/restore

## 0.6.3 (2015-04-16)
* (bluefox) use system npm for update and install
* (bluefox) generate uuid as hash of MAC
* (bluefox) delete empty adaptors from repository

## 0.6.0 (2015-03-22)
* (bluefox) try to implement backup/restore
* (bluefox) support of `--install` flag for sayIt
* (bluefox) added `megad` to repository
* (bluefox) enabled subscribeStates() same as subscribeStates('*')
* (bluefox) replace "silent" mode with "install" mode

## 0.5.14 (2015-03-11)
* (bluefox) enabled silent mode

## 0.5.14 (2015-03-08)
* (bluefox) updated utils.js (silent mode)
* (bluefox) fixed error by setup.js

## 0.5.12 (2015-03-07)
* (bluefox) fixed error with sendTo('email')
* (bluefox) increase timeout for npm to 5000 ms

## 0.5.11 (2015-02-26)
* (bluefox) fixed function deleteDevice in adapter.js

## 0.5.10 (2015-02-26)
* (bluefox) do not start more times the scheduled task after a long sleep

## 0.5.9 (2015-02-21)
* (bluefox) fixed error with trimFifo (used for history adapter)
* (bluefox) use system "npm" by updating of js-controller

## 0.5.8 (2015-02-18)
* (bluefox) added start/stop/restart adapter from console.
* (bluefox) better wakeup of adapters.

## 0.5.7 (2015-01-14)
* (bluefox) added sayit adapter
* (bluefox) fixed clear of log file

## 0.5.4 (2015-01-27)
* (bluefox) fixed restart under Windows

## 0.5.5 (2015-01-30)
* (bluefox) added yr as npm
* (bluefox) extend adapter.js with formatDate

## 0.5.6 (2015-02-06)
* (bluefox) added simple-api

## 0.5.3 (2015-01-27)
* (bluefox) fixed log for restart

## 0.5.2 (2015-01-27)
* (bluefox) removed node-windows from dependencies

## 0.5.1 (2015-01-26)
* (bluefox) fixed log
* (bluefox) show npm version and not git version
* (bluefox) use npm packet to install and not the exec npm

## 0.5.0 (2015-01-23)
* (bluefox) made it possible to install ioBroker with "npm install iobroker"

## 0.4.6 (2015-01-21)
* (bluefox) added developing flag "noFileCache" to do not cache web files.
* (bluefox) improve "adapter.getPort" on Windows.
* (bluefox) create iobroker.sh with 0777 by install

## 0.4.5 (2015-01-20)
* (bluefox) fixed problem with no objects after "setup" started

## 0.4.4 (2015-01-20)
* (bluefox) move "data" directory by "npm install" to `../../iobroker-data`

## 0.4.3 (2015-01-18)
* (bluefox) restart objects socket if some exception occurs

## 0.4.2 (2015-01-14)
* (bluefox) fixed error in objectsInMemClient and objectsInMemServer

## 0.4.1 (2015-01-10)
* (bluefox) fixed first setup

## 0.4.0 (2015-01-10)
* (bluefox) support of multiple hosts

## 0.3.17 (2015-01-10)
* (bluefox) fixed problem with "hosts are not shown in admin"

## 0.3.16 (2015-01-09)
* (bluefox) support of multiple hosts

## 0.3.15 (2015-01-09)
* (bluefox) "chmod 777 * -R /opt/iobroker" => "chmod 777 -R /opt/iobroker"

## 0.3.14 (2015-01-09)
* (bluefox) fixed error update of js-controller under linux/osx

## 0.3.13 (2015-01-08)
* (bluefox) fixed error with publish/subscribe

## 0.3.12 (2015-01-07)
* (bluefox) support of "onlyWWW" flag

## 0.3.11 (2015-01-06)
* (bluefox) fixed error if state is null or undefined
* (bluefox) store fifos from states in file

## 0.3.10 (2015-01-06)
* (bluefox) support of file manager in vis

## 0.3.9 (2015-01-04)
* (bluefox) try to fix update of controller

## 0.3.8 (2015-01-04)
* (bluefox) fixed error with subscribes
* (bluefox) fixed error with extendObject
* (bluefox) fixed error with delete adapter
* (bluefox) fixed error in deleteChannelFromEnum

## 0.3.7 (2015-01-03)
* (bluefox) fixed upload problem

## 0.3.6 (2015-01-03)
* (bluefox) fixed package.json

## 0.3.1 (2015-01-02)
* (bluefox) enabled npm install

## 0.3.0 (2014-12-28)
* (bluefox) no redis anymore

## 0.2.9 (2014-12-20)
* (bluefox) fixed problem with restart controller
* (bluefox) check flag supportStopInstance before send signal to adapter

## 0.2.8 (2014-12-20)
* (bluefox) fixed problem with upgrade adapter

## 0.2.7 (2014-12-19)
* (bluefox) fixed problem with upload adapter

## 0.2.6 (2014-12-19)
* (bluefox) implemented getConfigKeys in redis.
* (bluefox) new running mode: `once`

## 0.2.5 (2014-12-14)
* (bluefox) enabled start of `no-daemon` adapters like `rickshaw` or `vis`.

## 0.2.4 (2014-12-10)
* (bluefox) fixed delObject function
* (bluefox) removed unused log message

## 0.2.3 (2014-12-08)
* (bluefox) optimize start/stop/restart.

## 0.2.2 (2014-12-06)
* (bluefox) fixed error in redis.

## 0.2.1 (2014-12-06)
* (bluefox) fixed error in redis.

## 0.2.0 (2014-12-04)
* (bluefox) removed couchDB and store everything in redis.

## 0.1.6 (2014-11-29)
* (bluefox) use npm to install some adapters.

## 0.1.5 (2014-11-26)
* (bluefox) fixed log in controller.js one more time

## 0.1.4 (2014-11-26)
* (bluefox) fixed log in controller.js

## 0.1.3 (2014-11-24)
* (bluefox) fixed some errors and add restart.js

## 0.1.2 (2014-11-24)
* (bluefox) fixed messageboxes

## 0.1.1 (2014-11-23)
* (bluefox) fixed log output in admin.

## 0.1.0 (2014-11-22)
* (bluefox) new naming concept. No children and parents set extra.

## 0.0.37 (2014-11-16)
* (bluefox) fixed adapter.js
* (bluefox) call `chmod +x iobroker` after upgrade of controller

## 0.0.36 (2014-11-15)
* (bluefox) fixed adapter.js

## 0.0.35 (2014-11-09)
* (bluefox) added logging to controller

## 0.0.34 (2014-11-08)
* (bluefox) create restore/backup (from console)

## 0.0.33 (2014-11-04)
* (bluefox) support of node-red as adapter and defined exit codes for errors

## 0.0.32 (2014-11-04)
* (bluefox) support of node-red as adapter

## 0.0.31 (2014-11-02)
* (bluefox) fixed error with binary states

## 0.0.30 (2014-11-01)
* (bluefox) fixed error in "support of listDevices for configuration"

## 0.0.29 (2014-10-30)
* (bluefox) (bluefox) fixed creatChannel for adapter

## 0.0.28 (2014-10-30)
* (bluefox) support of listDevices for configuration

## 0.0.27 (2014-10-30)
* (bluefox) check common.os (e.g. to install adapter only on linux)
* (bluefox) support of common.install adapter settings.

## 0.0.26 (2014-10-25)
* (bluefox) changed state names to 'io.*'

## 0.0.25 (2014-10-24)
* (bluefox) show version in log

## 0.0.24 (2014-10-22)
* (bluefox) fixed dependencies of packets

## 0.0.22 (2014-10-20)
* (bluefox) fixed error in adapter.js

## 0.0.21 (2014-10-19)
* (bluefox) store repository in the DB

## 0.0.20 (2014-10-19)
* (bluefox) changed example adapter for emitEvent
* (bluefox) support of certificates
* (bluefox) fixed names for states

## 0.0.19 (2014-10-02)
* (bluefox) fixed add/delete adapter
* (bluefox) fill source-dist.json with grunt
* (bluefox) call "npm install" after adapter updated

## 0.0.18 (2014-09-27)
* (bluefox) new concept of updates and repositories

## 0.0.17 (2014-09-04)
* (hobbyquaker) trimFifo calls callback with trimmed data
* (hobbyquaker) fixed instance restart

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
* (hobbyquaker) added `dbdump.js`
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
* (hobbyquaker) fixed Admin UI - handle IDs with spaces

## 0.0.6
* (hobbyquaker) download adapters via `iobroker.js add <adapter-name>` (has to be defined in conf/sources.json)
* (hobbyquaker) automatically install node dependencies on `iobroker.js add`
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
* (hobbyquaker) Installation/instancing of adapters via `iobroker.js add`
* (hobbyquaker) Adapter command line param instead of IPC
* (hobbyquaker) Config-file iobroker.json

## 0.0.1
* (hobbyquaker) first release
