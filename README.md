![Logo](iobroker.png)
# ioBroker.js-controller
![Number of Installations](https://iobroker.live/badges/js-controller-installed.svg)
![Number of Installations](https://iobroker.live/badges/js-controller-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.js-controller.svg)](https://www.npmjs.com/package/iobroker.js-controller)

![Test and Release](https://github.com/ioBroker/iobroker.js-controller/workflows/CI/badge.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.js-controller.svg)](https://www.npmjs.com/package/iobroker.js-controller)

The ioBroker.js-controller is the heart of any ioBroker installation. The controller is owning the central configuration of the ioBroker installation and controls and monitors all adapter processes for the current host.

**Please check the js-controller compatibility information below which version runs on your Node.js version**

## Overview
- [Compatibility](#compatibility)
- [Links](#links)
- [Usage](#usage)
- [Configuration](#configuration)
- [Feature Overview](#feature-overview)
- [Release cycle and Development process overview](#release-cycle-and-development-process-overview)
- [License](#license)

## Compatibility
* js-controller 6.x (Kiera) works with Node.js 18.x, 20.x and probably 22.x
* js-controller 5.x works with Node.js 16.x, 18.x and probably 20.x
* js-controller 4.x works with Node.js 12.x, 14.x, 16.x (incl. up to NPM 8) and probably 18.x
* js-controller 3.x works with Node.js 10.x, 12.x, 14.x and probably 16.x (first tests look good, NPM 7 still has some issues, so NPM6 is best)
* js-controller 2.x works with Node.js 8.x, 10.x, 12.x and probably 14.x (untested)
* js-controller 1.x works with Node.js 4.x, 6.x, 8.x and probably 10.x (untested)

Please try to stay current with your Node.js version because the support is limited in time. As of now (May 2024) all Node.js versions below 18.x are no longer supported by Node.js and considered EOL (End Of Life).
To upgrade your Node.js version and ioBroker, please follow https://forum.iobroker.net/topic/44566/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten-2021-edition!

As it is hard to keep a lot of the decentralized adapters up-to-date, up from controller version 6.0.4 the js-controller will override the `@iobroker/adapter-core` dependency of single adapters to ensure compatibility with the current js-controller version.

* js-controller 6.x (Kiera) specifies this version as `^3.1.6`.

## Links
* [Changelog](CHANGELOG.md)
* Official website: https://www.iobroker.net
* Forum: https://forum.iobroker.net
* Explanation of the concept: https://github.com/iobroker/iobroker

----------------------------------------------------------------------

## Usage
Example how to install on a Debian-based system:
```
curl -sLf https://iobroker.net/install.sh | bash -
```

### Install ioBroker
See [Linux instructions](https://www.iobroker.net/#en/documentation/install/linux.md),
[Windows instructions](https://www.iobroker.net/#en/documentation/install/windows.md) and

after that, ioBroker should be running and available in the browser under `http://<ip>:8081/`.

### Start ioBroker controller
#### Linux
* run `iobroker start` to start the ioBroker controller in the background
* watch the logfile `iobroker logs --watch`

or

* run `node node_modules/iobroker.js-controller/controller.js` in the ioBroker directory to start the ioBroker controller in foreground and watch the log on console.

### Windows
* run `iobroker start` in the ioBroker directory to start the ioBroker controller as service. The name of the service is "iobroker(<servicename>)"
* check the logfile `log/iobroker.log`

or

* run `node node_modules/iobroker.js-controller/controller.js` in the ioBroker directory to start the ioBroker controller in foreground and watch the log on console

## Configuration
The main configuration is stored in `iobroker-data/iobroker.json`. Normally, there is no need to edit this file because the ioBroker CLI commands can control most of the settings.

## Feature Overview
- [Admin UI](#admin-ui)
- [Automatic adapter upgrade](#automatic-adapter-upgrade)
- [Command Line Interface](#command-line-interface)
- [Adapter Upgrade with Webserver](#adapter-upgrade-with-webserver)
- [Controller UI Upgrade](#controller-ui-upgrade)
- [Per host adapter objects](#per-host-adapter-objects)
- [Operating system package management](#operating-system-package-management)
- [Hostname](#hostname)
- [Adapter process memory limitation](#adapter-process-memory-limitation)
- [Directly executing TypeScript adapters](#directly-executing-typescript-adapters)
- [Statistics](#statistics)
- [Error Reporting via ioBroker Sentry](#error-reporting-via-iobroker-sentry)
- [Notification System](#notification-system)
- [Disk space warnings](#disk-space-warnings)
- [Controlling and monitoring of adapter processes](#controlling-and-monitoring-of-adapter-processes)
- [Multihost](#multihost)
- [TIERS: Start instances in an ordered manner](#tiers-start-instances-in-an-ordered-manner)
- [Custom Node.js process arguments](#custom-nodejs-process-arguments)
- [IPv6 DNS resolution support](#ipv6-dns-resolution-support)
- [Object and State Aliases](#object-and-state-aliases)
- [State and objects databases and files](#state-and-objects-databases-and-files)
- [Certificate Handling](#certificate-handling)
- [js-controller Host Messages](#js-controller-host-messages)
- [Adapter Development](#adapter-development)
- [Environment Variables](#environment-variables)

### Admin UI
**Feature status:** stable

The admin adapter is installed automatically and starts a web-server that hosts the Admin UI. Default port is 8081, so just open `http://<iobroker-ip>:8081/`

If port 8081 is occupied, you can install a second Admin UI on an alternate port and change the port for the first admin UI. To do so, run `iobroker add admin --enabled --port 8090` and go to the `http://<iobroker-ip>:8090/`. Of course you can change port 8090 to a different one.

### Automatic adapter upgrade
**Feature status:** New in 6.0.0

Whenever the repository changes, the controller will perform an automatic upgrade of the adapters, w.r.t. the auto-upgrade policy.
The policy can be configured system-wide and per adapter. Whenever there is no policy on adapter-level the system-wide policy is used as a fallback.

Technically, the system-wide policy is configured in the `system.config` object in `common.adapterAutoUpgrade.defaultPolicy`. The policy is only active for the
repositories which are set to `true` in `common.adapterAutoUpgrade.repositories`. On adapter level, the policy is configured in `common.automaticUpgrade` 
of each `system.adapter.<adapterName>` object.

Valid values for the policy are `none`, `patch`, `minor` and `major`. These relate to the version ranges, which will be automatically upgraded. 
**It is strongly recommended to not configure `major` upgrades to be performed automatically, as these do often contain breaking changes and need manual 
intervention by the user.**

A successful as well as a failed auto-upgrade will generate a notification in the ioBroker notification system (see [Notification System](#notification-system)).

### Command Line Interface
**Feature status:** stable

The command line interface is described at https://www.iobroker.net/#de/documentation/config/cli.md

### Adapter Upgrade with Webserver
**Feature status:** New in 5.0.0

**Feature Flag for detection:** `ADAPTER_WEBSERVER_UPGRADE`

An adapter can be upgraded via `sendToHost`. The adapter sends parameters to the `js-controller` which contain the 
information of the adapter to upgrade as well as information to start a webserver. The webserver can be polled by a UI,
even if the adapter itself is stopped during upgrade or does not know of the upgrade.

Example: 

```typescript
sendToHostAsync('system.host.test', 'upgradeAdapterWithWebserver', { 
    version: '1.0.5', 
    adapterName: 'hm-rpc', 
    useHttps: true, 
    port: 8081, 
    certPrivateName: 'defaultPrivate',
    certPublicName: 'defaultPublic' 
});
```

In this example the controller will upgrade the adapter `hm-rpc` to version `1.0.5`. During the upgrade, 
the log and status information is provided by a webserver running on port `8081`, and using `https` with 
the given certificates.

During the update, you can perform a `GET` request against the webserver to get the current status of the upgrade.

The webserver response is defined as following:

```typescript
interface ServerResponse {
    /** If the update is still running */
    running: boolean;
    /** Stderr log during the upgrade */
    stderr: string[];
    /** Stdout log during the upgrade */
    stdout: string[];
    /** If installation process succeeded */
    success?: boolean;
}
```

### Controller UI Upgrade
**Feature status:** New in 5.0.0

**Feature Flag for detection:** `CONTROLLER_UI_UPGRADE`

The controller can be updated via `sendToHost`. This feature is used by Admin UI to allow upgrades without usage of CLI.
The controller will start a detached process, and host a web server on the same port as the provided Admin instance.

Example:

```typescript
sendToHostAsync('system.host.test', 'upgradeController', { version: '5.0.5', adminInstance: 0 });
```

In this example, the controller will be upgraded to version `5.0.5` and the web server will 
take the configuration (http/s, port, certificates) of `system.adapter.admin.0`.
During the update, you can perform a `GET` request against the webserver to get the current status of the upgrade.

The webserver response is defined as following:

```typescript
interface ServerResponse {
    /** If the update is still running */
    running: boolean;
    /** Stderr log during the upgrade */
    stderr: string[];
    /** Stdout log during the upgrade */
    stdout: string[];
    /** If installation process succeeded */
    success?: boolean;
}
```

### Managing node modules
**Feature status:** New in 6.0.0

In the past, adapters which needed additional user-defined node modules directly interacted with `npm` to install them. 
With the ongoing development of `npm` it turned out to be problematically as additional packages get removed during other `npm` operations.

Hence, the controller now provides convenience methods to manage additional node modules.

To install a node module, execute:

```typescript
const result = await adapter.installNodeModule('axios', { version: '1.0.0' });

if (result.success) {
    // successfully installed
}
```

Instead of specifying a module name you can also specify a URL to e.g. install a package from GitHub.
To use the installed node module, you can import it:

```typescript
const module = await adapter.importNodeModule('axios');
```

Note, that the behavior mimics the one of [JavaScript's "import" operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import). 

If you are just interested in the `default export`, use the example below.

```typescript
const module = (await adapter.importNodeModule('axios')).default;
// now we can call axios specific methods
const result = await module.get('https://www.iobroker.net/');
```

> **_NOTE:_** Always use the provided adapter method to import the module, importing the module directly with `import` or `require` statements will not work!

To remove a no longer needed module:

```typescript
const result = await adapter.uninstallNodeModule('axios');

if (result.success) {
    // successfully uninstalled
}
```

To list all installed node modules by your adapter:

```typescript
const installedNodeModules = await adapter.listInstalledNodeModules();

adapter.log.info(`Installed modules are: ${installedNodeModules.join(', ')}`);
```

To get the adapter scoped package identifier you can use: 

```typescript
// e.g. @iobroker-javascript.0/axios
const packageIdentifier = adapter.getAdapterScopedPackageIdentifier('axios');
```

### Per host `adapter` objects
**Feature status:** New in 6.0.0

Previous to js-controller 6.0.0 all adapter objects were only created as `system.adapter.<adapterName>`. This had the downside, that 
it was not possible to determine if an adapter is installed on a specific host on database level. Furthermore, in multihost environments
the content of `system.adapter.<adapterName>` was filled with the last uploaded version of this adapter. Thus having different versions of an adapter
on different hosts lead to an inconsistent object. 

Up from controller 6.0.0 the objects of type `adapter` are additionally created under `system.host.<hostName>.adapter.<adapterName>`.
If you need to interact with objects of type `adapter`, please use them from there. For now the objects are additionally created under 
their previous `system.adapter.<adapterName>` structure to ensure backward compatibility.

Furthermore, instances and their states will not move to another structure and will stay at `system.adapter.<adapterName>.<instanceNumber>`. 
Note, that instances are unique across the whole system and are thus not affected by the described problem. Also objects of `type` instance have a `common.host` attribute
to find the corresponding host.

### Ignoring specific adapter version
**Feature status:** New in 6.0.0

If you know, that a specific version of an adapter is not suitable for you, you may want to ignore this update to avoid accidentally installing it. 
You can do so by using the cli command `iobroker version <adapter> --ignore <version>` and to recognize all updates again use `iobroker version <adapter> --recognize`.
If a version of an adapter is ignored, you will not be able to update to this specific version on this ioBroker host. 
If you use a multihost environment you might need to execute the commands once per host.

Internally this will set `common.ignoreVersion` to the specified version on the `system.host.<hostName>.adapter.<adapterName>` object.
The version to be ignored can be specified via a semver range. So an absolute version is fine if you only want to ignore one specific update, e.g. `1.5.1`.
Another example, if you want to ignore all updates in the `1.5.x` range, you can specify `~1.5.0`.

### Operating system package management
**Feature status:** New in 6.0.0

**Feature Flag for detection:** `CONTROLLER_OS_PACKAGE_UPGRADE`

The controller can upgrade OS packages on Linux via `yum` and `apt`.
To upgrade a package, you have to send a message to the controller with the following this example:

```ts
sendToHostAsync('system.host.test', 'upgradeOsPackages', {
    packages: [{
      // the package name
      name: 'google-chrome-stable',
      // the optional version
      version: '120.0.6099.199-1' 
    }],
    // if the controller should be restarted afterwards
    restart: true,
});
```

Note, that specifying a `version` is optional. The answer by the controller has the property `success` which is `true`, if the upgrade was successful for all packages.
If a package fails, the response will have a value of `false` for `success` and an additional property `error` which contains the error message as a string.

Currently only upgrading of packages is supported. If you need a specific OS dependency for your adapter, you can specify it inside `io-package.json` with the field `osDependencies`.

### Custom install logic
**Feature status:** New in 5.0.0

If an adapter needs to execute custom install logic, one possibility is to use the `scripts` attribute of `package.json`. 
However, often adapters already want to interact with the ioBroker databases during the installation logic.

Hence, you can set `ioPackage.common.install` flag to true, to indicate that the js-controller should perform an installation run with your adapter after the npm installation is successfully done.
During the installation run, the `install` instead of the `ready` event will be emitted. 
Alternatively, you can also pass an `install` function to the constructor the same way as for `ready`.

```typescript
this.on('install', () => {
    this.log.info('Performing installation logic ...')
    // Perform your installation logic
});
```

### Hostname
**Feature status:** stable

By default, the hostname for the js-controller instance will be taken from the official hostname of the server ioBroker is running on. The hostname should not be changed after the first start of ioBroker on this host.

If changes are needed there are CLI commands available to update the hostname. Look under https://www.iobroker.net/#de/documentation/config/cli.md for the `iobroker host ...` commands

If you need to set a specific hostname before the first start of iobroker you can also edit the iobroker.json file:

```
{
  "system": {
    ...
    "hostname":"local",
    ...
  },
```

### Adapter process memory limitation
**Feature status:** stable

By default, the memory management is done by Node.js automatically. A Garbage Collector (GC) will clean up unused objects automatically from time to time.

If needed, especially for low memory situations the memory limit for all adapter processes can be set in `iobroker.json`. Only set this if really needed, and you know what you are doing. Leave the value at 0 to not set a special memory limitation.

```
{
...
  "system": {
    ...
    "memoryLimitMB": 0,
    ...
  },
...
}
```

### Directly executing TypeScript adapters
**Feature status:** Technology preview since js-controller 3.3.0

The js-controller is able to execute `.ts` files, which removes the need of compiling to JavaScript first.
To use this feature, simply define the adapter main file as the required `.ts` file.

E.g. in `package.json`:

```json
{
  "main": "src/main.ts"
}
```

Note, that the sources need to be presence on every installation and thus need to be included in the npm package.
Vice versa, the build folder is no longer required and should not be published to npm any longer.

Technically, the sources are compiled with ESBuild at every startup; hence this feature should not be used on adapters 
consisting of many sources to prevent noticeably delayed adapter starts.

### Statistics
**Feature status:** stable

The js-controller is collecting statistics for the host (`system.host.hostname.*`), running compact groups (`system.host.hostname.compaczgroupX.*`) and for each adapter (`system.adapter.adaptername.*`). The data contains memory usage, free memory, number of events and also the event loop lag of the Node.js process.

### Error Reporting via ioBroker Sentry
**Feature status:** stable since js-controller 3.0.0

Sentry.io is a way for developers to get an overview about errors from their applications. The js-controller uses this method to make sure application crashes are reported to us. With this, we can make sure to provide fixes for problems very fast.

Especially with the automatic restart behavior of ioBroker, some crashes happen and no one really realizes them. And so we also do not get bug reports for them. With this method the information is provided to us. 

When the js-controller crashes or another Code error happens (and only then!), this error that also appears in the ioBroker log is submitted to our own Sentry server hosted in Germany. If you have allowed iobroker GmbH to collect diagnostic data, then also your anonymous installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. IP addresses are not stored with the crash report! 

All of this helps me to provide an error-free smart home system that basically never crashes.

If you want to disable the error reporting, you can do this by setting the state "system.host.NAME.plugins.sentry.enabled" to false. You should see a log message stating that sentry was disabled. After disabling the plugin no crashes from your system are reported and so cannot be fixed without reporting them by yourself manually!

### Notification System
**Feature status:** Stable since js-controller 5.0.0

The notification system in ioBroker allows setting, detecting and storing notifications per Host and allows querying the details.

Notifications need to be defined in the io-package.json of the adapter in the key `notifications`. Notifications are grouped in `scopes` and contain `categories` of different notification types. Notifications can contain a regex for automatic detection in strings or adapter exception texts.
The definition also contains localized names and descriptions that can be used to display it to the users.

Registered notifications are stored per host and can be requested via messages to the host. They are also stored when the controller stops and loaded on next start.
Additionally, a summary of the stored categories per scope with a number of stored notifications and the last added timestamp is available in the state `system.host.hostname.notifications.scopeid` as a JSON.

The js-controller defines in its io-package the system scope together with all details. You can use this as an example, and the JSON schema will help you validate your notifications.

```json
{
  "notifications": [
    {
      "scope": "system",
      "name": {
        "en": "System Notifications",
        "de": "System-Benachrichtigungen",
        "ru": "Системные уведомления",
        "pt": "Notificações do sistema",
        "nl": "Systeemmeldingen",
        "fr": "Notifications système",
        "it": "Notifiche di sistema",
        "es": "Notificaciones del sistema",
        "pl": "Powiadomienia systemowe",
        "zh-cn": "系统通知"
      },
      "description": {
        "en": "These notifications are collected by the ioBroker system and point to issues you should check and fix.",
        "de": "Diese Benachrichtigungen werden vom ioBroker-System erfasst und weisen auf Probleme hin, die überprüft und behoben werden sollten.",
        "ru": "Эти уведомления собираются системой ioBroker и указывают на проблемы, которые вы должны проверить и исправить.",
        "pt": "Essas notificações são coletadas pelo sistema ioBroker e apontam para problemas que você deve verificar e corrigir.",
        "nl": "Deze meldingen worden verzameld door het ioBroker-systeem en wijzen op problemen die u moet controleren en oplossen.",
        "fr": "Ces notifications sont collectées par le système ioBroker et indiquent des problèmes que vous devez vérifier et résoudre.",
        "it": "Queste notifiche vengono raccolte dal sistema ioBroker e indicano problemi che dovresti controllare e correggere.",
        "es": "Estas notificaciones son recopiladas por el sistema ioBroker y señalan problemas que debe verificar y solucionar.",
        "pl": "Te powiadomienia są zbierane przez system ioBroker i wskazują problemy, które należy sprawdzić i naprawić.",
        "zh-cn": "这些通知由ioBroker系统收集，并指出您应检查并修复的问题"
      },
      "categories": [
        {
          "category": "memIssues",
          "name": {
            "en": "Issues with RAM availability",
            "de": "Probleme mit der Arbeitsspeicher-Verfügbarkeit",
            "ru": "Проблемы с доступностью оперативной памяти",
            "pt": "Problemas com disponibilidade de RAM",
            "nl": "Problemen met de beschikbaarheid van RAM",
            "fr": "Problèmes de disponibilité de la RAM",
            "it": "Problemi con la disponibilità della RAM",
            "es": "Problemas con la disponibilidad de RAM",
            "pl": "Problemy z dostępnością pamięci RAM",
            "zh-cn": "RAM可用性问题"
          },
          "severity": "alert",
          "description": {
            "en": "Your system is running out of memory. Please check the number of running adapters and processes or if single processes need too many memory.",
            "de": "Es steht nicht genug Arbeitsspeicher zur Verfügung. Die Anzahl der laufenden Adapter und Prozesse sollte geprüft werden, oder ob einzelne Prozesse zuviel Speicher benötigen.",
            "ru": "В вашей системе не хватает памяти. Пожалуйста, проверьте количество работающих адаптеров и процессов, или если отдельным процессам требуется слишком много памяти.",
            "pt": "Seu sistema está ficando sem memória. Verifique o número de adaptadores e processos em execução ou se processos únicos precisam de muita memória.",
            "nl": "Uw systeem heeft onvoldoende geheugen. Controleer het aantal actieve adapters en processen of als afzonderlijke processen te veel geheugen nodig hebben.",
            "fr": "Votre système manque de mémoire. Veuillez vérifier le nombre d'adaptateurs et de processus en cours d'exécution ou si des processus uniques nécessitent trop de mémoire.",
            "it": "Il tuo sistema sta esaurendo la memoria. Controllare il numero di adattatori e processi in esecuzione o se i singoli processi richiedono troppa memoria.",
            "es": "Su sistema se está quedando sin memoria. Verifique el número de adaptadores y procesos en ejecución o si los procesos individuales necesitan demasiada memoria.",
            "pl": "W Twoim systemie kończy się pamięć. Sprawdź liczbę działających adapterów i procesów lub czy pojedyncze procesy wymagają zbyt dużej ilości pamięci.",
            "zh-cn": "您的系统内存不足。请检查正在运行的适配器和进程的数量，或者单个进程是否需要太多内存。"
          },
          "regex": [
            "^Exception-Code: ENOMEM",
            "buffer allocation failed"
          ],
          "limit": 10
        }
      ]
    }
  ]
}
```

#### How to define own scopes?
Each adapter can define its own "scopes" for own notifications with its own categories which then will be available in the system.
You can use the name of your adapter as a scope, e.g. `hm-rpc` to avoid conflicts with other scopes.
If you plan on using a general purpose scope, please contact the core development group so that scope names can be checked to stay unique.
The same applies if you see the need to enhance the system scope by additional categories. 
Let's discuss the requirements that they can also be added officially into upcoming js-controller versions.

A scope and category definition needs to contain all relevant UI texts in the JSON.

#### How to register own notifications?
An adapter can use the __method__ `registerNotification` to register own notifications to the system. To find out if the used controller version supports this feature, check if the method exists (or require at least js-controller 3.2.0).

This method takes the following parameters:
* scope: scope to be addressed
* category: category to be addressed, if a null message will be checked by regex of given scope
* message: message to be stored/checked
* options: Available with js-controller version 7.0. Additional options for the notification, currently you can provide additional `contextData` which is also stored with the notification information. Notification processing adapters can use this data

Note, that the structure of the `contextData` which can be stored via the options object is not defined by the controller. Adapters which handle messages can use individual data attributes. 
Currently, it is planned to support individual notification customization in the `admin` adapter. More information will be available in the `admin` adapter as soon as this feature is ready.

As a best practice the top-level of `contextData` should not be populated with individual data belonging to instances. Use a `key` specific to the adapter or if a feature is supported by all adapters of a type, the type (e.g. `messaging`) is also fine.

When a regex is defined then `console.error` output from the adapter is always checked by the regex and notifications are registered automatically when the regex matches! 

#### How to read notifications?
The host supports the __message__ command `getNotifications` to query the stored notifications together with the localized names and descriptions.

The message needs to take the following parameters in the message object:
* `scope` - scope of notifications
* `category` - category of notifications
* `instance` - instance of notifications

All three are optional and can be a string or null/undefined if omitted.

#### How to clear notifications?
The host supports the __message__ command `clearNotifications` to clear specific notifications after they are handled.

**Please only clear notifications that really were handled and displayed to the user especially for "system" scope!**

The message needs to take the following parameters in the message object:
* `scope` - scope of notifications
* `category` - category of notifications
* `instance` - instance of notifications

All three are optional and can be a string or null/undefined if omitted.

### Disk space warnings
**Feature status:** New in 6.0.0

The js-controller will generate a notification of in the scope `system` and the category `diskSpaceIssues` on warning level, if your free disk space falls under a specified threshold. 
By default, this threshold is 5 % of disk space. Via the state `system.host.<hostname>.diskWarning` you can override this level to any level between `0` and `100`. 

### Logging
#### Log levels
**Feature status:** stable

The js-controller and each adapter can define their own log level. By default, `info` is used. The following log levels can be used:
* silly (most logging)
* debug
* info
* warn
* error (only errors are logged)

The log level for js-controller is configured in iobroker.json in the logs section:

```
{
  ...
  "log": {
    "level": "info",
    ...
  }
  ...
}
```

#### Dynamic Loglevel change
**Feature status:** stable since js-controller 2.0.0

The log level can be changed dynamically for adapter-instance and host (main controller and compact group controllers) after they have been started. Initially, the configured loglevel is always used!

The states `system.adapter.xy.logLevel` and `system.host.hostname.logLevel` are updated on instance/controller start with the configured log level and can afterward be used to change the loglevel during runtime. These changes are __not__ persisted, so the next restarts resets the loglevel to the configured one.

The Loglevel change is only effective if there is no loglevel (property "level") defined on the transport configuration.

This possibility allows debugging adapters better and during runtime.

#### File-based logging
**Feature status:** stable

The default logging will log file based in the log directory inside the ioBroker directory. The logfile will be stored with a name that contains the date and will be deleted after 7 days. It only contains the logs from the current host.

The logging is configured in the `iobroker.json` file and can be changed there:

```
{
  ...
  "log": {
    "level": "info",
    "maxDays": 7,
    "noStdout": true,
    "transport": {
      "file1": {
        "type": "file",
        "enabled": true,
        "filename": "log/iobroker",
        "fileext": ".log",
        "maxsize": null,
        "maxFiles": null
      },
    },
  ...
}
```

If you want to pin a special loglevel for the file transport, you can add a property "level" with a hard defined loglevel. Then no dynamic control is possible.

Since js-controller 3.0 Logfiles on non-Windows-based systems are compressed in rotation, so that the older Files need less space in your storage. 

If you do not want to compress the files, this behavior can be deactivated by `iobroker.json`:

```
{
  ...
  "log": {
    ...
    "transport": {
      "file1": {
        ...
        "zippedArchive": false,
        ...
      },
    },
  ...
}
```


#### Syslog logging
**Feature status:** stable

ioBroker also supports logging to a syslog server. The configuration is also stored in the `iobroker.json` configuration file. A section for syslog is pre-created but disabled by default.

```
{
  ...
  "log": {
    ...
    "transport": {
      ...
      "syslog1": {
        "type": "syslog",
        "enabled": false,
        "host": "localhost",
        "host_comment": "The host running syslogd, defaults to localhost.",
        "port_comment": "The port on the host that syslog is running on, defaults to syslogd's default port(514/UDP).",
        "protocol": "udp4",
        "protocol_comment": "The network protocol to log over (e.g. tcp4, udp4, unix, unix-connect, etc).",
        "path_comment": "The path to the syslog dgram socket (i.e. /dev/log or /var/run/syslog for OS X).",
        "facility_comment": "Syslog facility to use (Default: local0).",
        "localhost": "iobroker",
        "localhost_comment": "Host to indicate that log messages are coming from (Default: localhost).",
        "sysLogType_comment": "The type of the syslog protocol to use (Default: BSD).",
        "app_name_comment": "The name of the application (Default: process.title).",
        "eol_comment": "The end of line character to be added to the end of the message (Default: Message without modifications)."
      }
    }
  }
  ...
}
```

If you want to pin a special loglevel for the file transport, you can add a property "level" with a hard defined loglevel. Then no dynamic control is possible.

#### Other Log transports
See the iobroker.json and Admin for more transports and their settings.

If you want to pin a special loglevel for the file transport, you can add a property "level" with a hard defined loglevel. Then no dynamic control is possible.

#### Adapters are allowed to subscribe log messages
**Feature status:** stable

ioBroker allows adapters to subscribe to log messages from the whole system. E.g., admin adapter is using this logic

More details for this feature can be found at https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/logging.md

### Controlling and monitoring of adapter processes
The full definition for adapter settings can be found at https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#adapter

#### Multiple adapter instances
**Feature status:** stable

ioBroker allows installing multiple adapters on the system. For each adapter, the JavaScript code is installed once.
For each adapter, multiple instances can be created and started with independent configurations.

#### Adapter types
**Feature status:** stable

ioBroker supports multiple Adapter modes. These are:
* `deamon`:    The adapter is started and runs all the time. If the process gets killed, it will be restarted automatically. This adapter type is mainly used for all situations where communications or actions are done continuously. These adapters also support a restart schedule where the controller restarts the instances. The adapter needs RAM and some CPU resources also when doing nothing.
* `schedule`:  The adapter is started based on a defined schedule (e.g., once per hour, once a day, all 10 minutes ...), then is doing its work and is stopping itself when finished. The adapter is only using RAM and CPU when needed.
* `once`:      The adapter ist started only once after it's object got modified. No restarting happens after the adapter stops.
* `none`:      The adapter is officially not having any process, but could be a webExtension (so iis included by a web instance on the same host or is only running client side and so offering www files)

> **_NOTE:_** Up from controller v6 for adapters of type `schedule` and if `connectionType` is set to `cloud`
>
> If the schedule consists of a CRON tab without specifically specifying seconds, the execution will be delayed randomly up to 60 seconds. This is to prevent unwanted DDoS attacks. If your adapter needs to exactly run at a specified second, please specify the second in your CRON tab so no delay will be introduced by the controller.

#### Start adapter instances as normal processes
**Feature status:** stable

By default, adapters are started by the js-controller as separate Node.js processes. They connect to the state and object DBs to read and write their data and some statistical information.

The js-controller is monitoring the process ids of the started processes and also controls stopping or restarting these processes.

With this approach, the whole iobroker system is very robust. A faulty adapter will only affect his own process, and the js-controller and the other adapter processes are unaffected.

The downside is that more RAM is required because each Node.js process needs 20-30 MB RAM for the Node.js part of it. With this, a 1 GB system is usually limited to run approximately 10 to 15 adapter processes. Aside from using systems with more RAM, distributing adapters onto multiple hosts in a multihost environment is possible.

#### Start adapter instances in compact mode
The compact mode is developed especially for systems with low memory. All adapters configured to run in compact mode will run inside the same process as js-controller.

As a result, each adapter needs 20-30 MB less RAM because it does not need to have its own Node.js process handling. This way, even a system with only 512 MB RAM can run several adapter instances.

The downside is that as soon as one adapter is crashes or generates an unhandled error, the whole js-controller process will be restarted.

To minimize the risk, adapter instances are run by default in compact group 1 which means that a second process is created for all adapters. A problem there would also not crash the js-controller itself. If you need less RAM usage you can manually change that and configure the instances to run on group 0 (=inside js-controller).

##### Compact mode
**Feature status:** Technology preview (since 2.0.0)

To enable compact mode for a js-controller instance, you can use the new "compact" CLI commands, or you can manually change the `iobroker.json` configuration file

```
{
  ...
  "system": {
    ...
    "compact":true
  }
  ...
}
```
and restart the js-controller.

##### Compact groups
**Feature status:** Technology preview (since 2.0.0)

To be able to handle the risk of crashed controller processes affecting the whole system, it is possible to assign the adapter instances to different compact groups. Each group will be run in their own process, only group 0 is handled directly by the main js-controller process.

Using several compact groups, you can, by using a bit more memory, lower the risk of a crashing js-controller main process.

Compact groups can be configured for the respective instances using the compact CLI commands (see ìobroker compact commands on https://www.iobroker.net/#de/documentation/config/cli.md).

##### Implementation details
https://forum.iobroker.net/topic/18338/experimentell-js-controller-compact-mode

##### Testing details for development
For testing, set up your js-controller to use compact mode and change the `io-package.json` and javascript files accordingly. Do not forget to `iobroker upload adaptername` after changing `io-package.json`.

Please check that your adapter starts and runs as expected also when compact mode is used.

For adapters running in compact mode, special care must be taken to clean up used resources without throwing errors. You need to make sure that **all** initialized connections, timers and intervals are closed and stopped in the `unload` handler.

#### Check available RAM before adapters are started
**Feature status:** stable, since js-controller 3.0

The js-controller checks the available RAM of the system before starting a new adapter process. If the available RAM is below 50/100 MB by default, an error/warn is logged. The limits can be configured in iobroker.json

```
    "system": {
        "memLimitWarn": 100,
        "memLimitWarnComment": "If the available RAM is below this threshold on adapter start, a warning will be logged.",
        "memLimitError": 50,
        "memLimitErrorComment": "If the available RAM is below this threshold on adapter start, an error will be logged."
    }
    ...
```

Later versions of js-controller might prevent the start of a new adapter process if system resources are too low! 

#### Manually run adapter instances for debugging
**Feature status:** stable

For debugging reasons, sometimes it is necessary to start an adapter instance via the command line to get more detailed logging.

To do so, manually execute the adapter's main javascript file, which is usually named `main.js` or `<adaptername>.js` (where "adaptername" is the name of the adapter):
```
node node_modules/iobroker.adaptername/main.js --force --logs
```
All log output will now be printed to the console.

### Multihost
**Feature status:** stable

When local interfaces are required or the host system is reaching its resource limits, the ioBroker system can be distributed to additional hosts. All hosts in a multihost environment are connected to the same states and objects databases and are thus synchronized with each other.

When the states and/or objects databases are provided by a js-controller process on one host, this "master" host needs to be configured so the databases are available on the local network. To do so, enter 0.0.0.0 as the address in `iobroker setup custom` instead of 127.0.0.1.

All other hosts are configured to connect to this master host.

For detailed setup instructions see https://www.iobroker.net/docu/index-24.htm?page_id=3068&lang=de

### TIERS: Start instances in an ordered manner
**Feature status:** Technology preview (since 3.3.0)

Starting from js-controller 3.3.0, you can define the `common.tier` attribute in the io-package.json.
Lower TIERS will start before higher TIERS. Currently, 3 TIER levels are supported.
Note, that the admin adapter as the central control platform will always be started first.

#### TIER 1
Logic and scripting engines, which should be able to act as fast as possible 
to work with states delivered by higher TIER adapters.

#### TIER 2
Adapters which deliver data from external APIs, which are important and can change at any time.
This also often includes messaging adapters.

#### TIER 3
Adapters which are not time-critical like Visualization, Backup adapters, and adapters whose information does 
not necessarily need to be up-to-date. These are often `schedule` adapters, whose information is always a bit delayed.

### Custom Node.js process arguments
**Feature status:** New in 5.0.0

**Passing custom arguments to the Node.js adapter process**

To use this feature, use the `nodeProcessParams` in the `common` section of `io-package.json`.
Using this feature will disable the possibility to start the adapter in `compact mode`, as then
other adapters would also be affected by the passed parameters. The property `nodeProcessParams` needs 
to be an array of strings.

Example: `"nodeProcessParams": ["--tls-min-v1.0"]`

### IPv6 DNS resolution support
**Feature status:** New in 5.0.0

You can decide to use IPv6 first as DNS resolution method instead of IPv4 first (default). 
To use this, configure `dnsResolution` to `verbatim` in `iobroker.json`.

For handling IPv6 and IPv4 in adapters, we provide some convenience methods.
These are available via [ioBroker Adapter Core](https://github.com/ioBroker/adapter-core#commontools) starting with version 2.7.0.

Ensure that DNS resolution is performed according to ioBroker config 
if you need to ensure this for non-standard adapter processes (e.g., own started subprocesses).

### Object and State Aliases
**Feature status:** stable (since 2.0.0)

**Feature Flag for detection:** `ALIAS, ALIAS_SEPARATE_READ_WRITE_ID`

The Alias Feature allows defining one object/state to be the "alias" of another object/state.

All Aliases will be created in the Object namespace `alias.0`

Effectively an `alias` object will mirror the state value of the target object.
If allowed, both states can be changed and are synced automatically by the ioBroker core system.
Also, both states can be used to subscribe in scripts and should behave exactly identical.

Additionally, to defining the target ID, the alias object can also define "read and write functions" to do easy value conversions, so e.g.
the target state could contain a power measurement value in Wh (because an adapter delivers the value that way)
and the alias could use the same value calculated as kWh.

Some devices have separate states for semantically one state. One to read the current status from and one to write to, to
control the device. You can combine these states into one alias by using a separate alias id to write to and another to read from.

We recommend to use the `devices` adapter to manage aliases. 
Alternatively, you can use Admin interface on the "Objects" tab to create aliases. Just open the context menu on the state, for which you want to create an alias, and select "Create Alias".

To create an alias object simple create a new object with an own name in the `alias.0` namespace and add the alias definition in the common section (here for an alias with the id `"alias.0.aliasName"`):

```
{
    _id: "alias.0.aliasName",
    common: {
        name: 'Test AliasC',
        type: 'number',
        role: 'state',
        min: -10,
        max: 10,
        alias: {
            id: 'state.id.of.target',
            read: 'val * 10 + 1',
            write: '(val - 1) / 10'
        }
    },
    native: {},
    type: 'state'
}
```

or using different read and write ids (supported starting js-controller 3.0, check using feature flag `ALIAS_SEPARATE_READ_WRITE_ID`):

```
{
    _id: "alias.0.aliasName",
    common: {
        name: 'Test AliasC',
        type: 'number',
        role: 'state',
        min: -10,
        max: 10,
        alias: {
            id: {
                read: 'state.id.to.read.from',
                write: 'state.id.to.write.to'
            }
            read: 'val * 10 + 1',
            write: '(val - 1) / 10'
        }
    },
    native: {},
    type: 'state'
}
```

The following fields are allowed in the alias structure:

* `alias.id` contains the ID of the target object/state to mirror OR (since js-controller 3.0) represents an object with the following two properties:
    * `alias.id.write` contains the ID of the object which will be set when alias is written
    * `alias.id.read` contains the ID of the object which will be mirrored to the alias object/state   
* `alias.read` can optionally contain a "read" script (will be evaluated) to calculate the alias value when the target state changes
* `alias.write` can optionally contain a "write" script (will be evaluated) to calculate the target value if the alias value is changed

Note, that alias states will be automatically scaled if the following conditions match:

* target and source state are of type `number`
* either the alias state or (not both) the source state are of unit `%`
* no `read` or `write` function is defined
* the state which is not of unit `%` has a valid `min` and `max` property

To set the alias properties without a JavaScript or in adapter code you can also use the cli commands like:

```
iobroker object set alias.0.aliasName common.alias.id=state.id.of.target
iobroker object set alias.0.aliasName common.alias.read="read-func"
iobroker object set alias.0.aliasName common.alias.write="write-func"
```

> **_NOTE:_** The permissions of the source object are ignored and only the permissions set on the alias object itself are relevant for database operations. 

Additional information about aliases could be found [here](https://www.iobroker.net/#en/documentation/dev/aliases.md).

### State and objects databases and files
ioBroker is storing three different types of data:
* **objects** contain the metadata, descriptions and configuration values for all objects and states stored by ioBroker. Objects are created initially and sometimes updated, but usually not changed very frequently
* **files** are all JSON, image and other files that are accessible for all ioBroker adapters. A `meta.user` object needs to exist for the adapter or instance to define allowed root directories. As example see `sayIt` adapter `io-package`.
* **states** contain the real data from sensors, devices and objects which are updated frequently

#### ioBroker in-memory database with JSON file storage
By default, the js-controller process is offering in-memory DBs at ports 9000 (for states) and 9001 (for objects/file). All adapter processes and js-controller processes from other hosts connect to these databases to read and store data.

The in-memory DBs for states and objects use JSON files to store the data. The files are stored after changes every 30 seconds and are backed up automatically. The files are stored in iobroker-data directory, the backups in a subfolder.

The in-memory DBs work well for up to 10000 objects and normal state update frequencies. When your system has more objects and states or its states are updated very often, it is a better idea to use Redis as the database engine. A good indicator for this if the js-controller process is using a lot of CPU and/or the system feels slow.

js-controller 1.x was using socket.io as the communication protocol between the adapters and the in-memory DBs. Starting with js-controller 2.0, the communication protocol was changed to be a lightweight Redis protocol. This simplifies the logic and should increase performance.

For the objects and states databases, special additional logging of the redis protocol messages can be activated in iobroker.json

```
"objects": {
  ...
  "enhancedLogging": false
}
```

When not configured differently, the file databases are persisted every 15s (15000ms) after data are changed. The interval in ms can be changed by configuration in iobroker.json starting js-controller 3.0.
> **_NOTE:_** If you do that be aware that you may lose data when the js-controller crashes unexpectedly!

```
"objects": {
  ...
  "writeFileInterval": 60000
}
```


#### Redis as database
Redis is a well-known industrial grade in-memory database optimized for speed and stability. It performs better than the ioBroker In-Memory database which is written in JavaScript.

##### Install Redis
- Linux from here: https://redis.io/download
- Windows from here: [https://github.com/MSOpenTech/redis/releases](https://github.com/MSOpenTech/redis/releases)

e.g. for Linux:
https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04

##### Configure Redis
###### make sure Locale is set correctly
ioBroker requires the "Locale" for the redis-server process to be set to "LANG=C" instead of other locales in order to get correct sorted results when Objects are stored in Redis.

On Linux, ideally set the LC_ALL environment variable for the redis-server process correctly.
For more information to see if changes are needed and how to do them see https://forum.iobroker.net/topic/52976/wichtiger-hinweis-f%C3%BCr-redis-installationen (German right now).

###### Allow Network access
Ideally, the Redis server should be installed on the same host as the js-controller process because as soon as Redis is configured to be used, the ioBroker installation will not work without it.

If you plan to install Redis on a different host than the js-controller or use a multi-host environment (see below), you must allow connections to redis from any address (the default only accepts connections from 127.0.0.1).
To do that edit the file `/etc/redis/redis.conf` (`sudo nano /etc/redis/redis.conf`) and replace `bind 127.0.0.1` with `bind 0.0.0.0` .
Don't forget to restart redis after that. (`sudo systemctl restart redis-server`)

###### Redis Slaves
If you have multiple hosts, you can install Redis to all of them and configure the other hosts to be slaves of the Master host. With this, all data is available on all hosts, so even if one host crashes completely, you still have the database content from the other hosts.

More details can be found at https://redis.io/topics/replication#configuration and https://redis.io/commands/replicaof

Redis slaves will be not writable by default.

In case of a crash of the master, you can reconfigure one of the slaves to be the new master and it will use the current content. After reconfiguring all slaves to sync with the new Master, the redis database is functional again.

After reconfiguring Redis, you also need to update all ioBroker states/objects DB settings to connect to the new Redis Master host.

###### Redis persistence
By default, Redis is a pure in-memory Database which means that it has no content when it starts. In the default configuration, the content of the redis DB is stored on disk after a certain number of changed keys.

Depending on how many changes your system is doing, it will update the data on disk roughly every 5 minutes by default.
Please consider this if your system runs from an SD card (like Raspberry Pi).

If you are not working on an SD card and want to have real up-to-date data on disk, you can use the second persistence method called AOF. Else the latest dumped data is used, which could be some minutes old.

Please see https://redis.io/topics/persistence for details, differences, and configuration information for both persistence options.

##### Using Redis as States-DB
**Feature status:** stable

There is a possibility to use Redis as a state database. It is reasonable to do that for big installations or for systems with performance problems.
It is possible to switch anytime between Redis and in-memory Javascript DB.

**Note for js-controller <2.0**: After changing to Redis, all states must be updated by the adapters again (the previous values will be lost). Please especially note this for the state values from own JavaScript states! Objects and configuration are not affected.

To switch to Redis, execute the following on the console:

```
iobroker stop
iobroker setup custom
```

And then enter `redis` as the states DB type (line 4):

```
Type of objects DB [file, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]:
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]: redis
Host of states DB (redis), default[127.0.0.1]:
Port of states DB (redis), default[6379]:
Data directory (file), default[../../../iobroker-data/]:
Host name of this machine [FastPC]:
creating conf/iobroker.json
```

Now ioBroker can be started.
If it does not start, please check the log at `log/iobroker.*.log` in the ioBroker directory. Please also check the redis is running (use e.g. `redis-cli`) and that the firewall set up correctly.

To switch back to file-based states, write the same commands again, just instead of **redis** in the fourth line, write nothing and press ENTER.

##### Using Redis as objects/File-DB
**Feature status:** New in 2.0.0

Starting with js-controller 2.0.0, objects and files can also be stored in Redis. Since Redis holds all data in the RAM, this setup uses much more RAM because uploaded files and image assets are also stored in Redis. Please think carefully about this step and make sure your system has enough RAM available!

The setup is comparable to the setup for states in Redis by using `iobroker setup custom`, but enter **redis** as type of the objects' database. You can use the same redis server for states and objects/files database.

##### Using Redis Sentinel as objects/File-DB
**Feature status:** New in 2.0.0

Redis Sentinel is an industry standard to achieve a highly available redis database. It is based on a Redis master-slave setup with at least three nodes. Additional so-called sentinel processes monitor all redis instances in the master-slave setup.

If the master is going offline, the sentinel processes react and coordinate to select a new master. After this is done, the master-slave cluster is reconfigured and the new master is taking over.

More details about the Redis sentinel can be found in the official documentation at https://redis.io/topics/sentinel .

ioBroker allows using a Redis Sentinel system. For this you use `iobroker custom` like above, but provide a comma-separated list of the sentinel hosts. For the sentinel ports you can either enter a comma-separated list with the same number of entries, or a single one which is then used for all hosts.

With such a setup, ioBroker will connect to one of these sentinel processes to get the current Master Redis and then connect to it. When the connection to the Master is disconnected, all data updates are cached and transmitted as soon as a connection to the new master has been established.

##### Using Password for Redis Databases
**Feature status:** Stable

### Certificate Handling
... CLI
... Files vs PEM content
... TODO

### js-controller Host Messages

... TODO
#### shell
... TODO

#### cmdExec
... TODO

#### getRepository
... TODO

#### getInstalled
... TODO

#### getInstalledAdapter
... TODO

#### getVersion
... TODO

#### getDiagData
... TODO

... TODO

#### getLocationOnDisk
... TODO

#### getDevList
... TODO

#### getLogs
... TODO

#### getHostInfo
... TODO

#### getHostInfoShort
... TODO

#### delLogs
... TODO

#### readDirAsZip
... TODO

#### writeDirAsZip
... TODO

#### readObjectsAsZip
... TODO

#### writeObjectsAsZip
... TODO

#### updateMultihost
... TODO

#### getInterfaces
... TODO

#### upload
... TODO

#### rebuildAdapter
... TODO

#### readBaseSettings
... TODO

#### writeBaseSettings
... TODO

### Adapter Development
**Feature status:** Stable

TODO: Link to Adapter Development docs

#### Automatically Encrypt/Decrypt configuration fields
**Feature status:** Stable, since js-controller 3.0

Since js-controller 3.0, the adapter developer can define an array or field names in io-package.json as encryptedNative to define which fields should be automatically encrypted before being stored by Admin and decrypted when the adapter process starts.
The values are not decrypted when the object itself is read!

With this change and the Admin support for this soon, the adapter developer does not need to struggle around with encryption or decryption of adapter values and can simply configure this.

To preserve backward compatibility, you can check for the feature flag `ADAPTER_AUTO_DECRYPT_NATIVE` or add a global Admin dependency to the respective Admin (>=4.0.10) version. 

#### Protect free reading of adapter configuration fields
**Feature status:** Stable, since js-controller 2.0

Normally, all objects can be read by any adapter using getObject or getForeignObject. To make sure sensible adapter configuration values are protected from that free reading they can be secured.

If an array with field names from native is defined in io-package.json as common.protectedNative the ioBroker system will sort these fields out when the object is read. Only the adapter itself is allowed to read the full object.

It is best practice adding the field names of encrypted fields to the protectedNative array too to make sure the fields stay protected (even if encrypted). Only let other adapters read your encrypted values if there is a need to (e.g. adapter interoperability)

#### Define Adapter dependencies to other adapters
**Feature status:** Stable

Dependencies are defined in an array and can contain an adapter name of an object.

When using the object style, you can define a semver version range for this adapter:
```
"dependencies": [
      {
        "js-controller": ">=2.0.0"
      }
    ],
```

If the version do not matter and just the adapter itself needs to be present you can also use:
```
"dependencies": [
      "web"
    ],
```

There are two types of adapter dependencies that can be defined in io-package.json and will be checked on installation and adapter start.

**common.dependencies for Same Host dependencies**
With `common.dependencies` in io-package.json you can define if an adapter needs to be present on the same host and optionally in which version.
This is mainly used to define the needed "js-controller" version for yor adapter and can also be relevant e.g. for web extension adapters (adapters that can be plugged in into the web adapter, so the code needs to be on the same host).

**common.globalDependencies for dependencies on any Host**
With common.globalDependencies in io-package.json and starting with js-controller 3.0, you can define a global dependency that will be checked over all hosts. Irrelevant where on the system the referenced adapter is installed it needs to match the version and at least one instance needs to exist.
This can mainly be used for more loose dependencies where adapters are split over multiple hosts but still work together, e.g. Admin. 

#### Subscribe to Logs from other adapters
**Feature status:** Stable

The js-controller allows adapters to subscribe to log messages from other adapters and react on them.
For details see https://github.com/ioBroker/ioBroker.js-controller/blob/master/doc/LOGGING.md

#### Adapter Feature Detection
**Feature status:** Stable since js-controller 2.0.0

Since js-controller 2.0, there exists a dedicated method to detect if certain features exist for an adapter.

The preferred way to use it (also because of backward compatibility reasons) is:

```js
if (adapter.supportsFeature && adapter.supportsFeature('NAME')) {
    // ...
}
```

The following features can be checked using this method:

* **ALIAS**: checks if the Alias feature is existing (since `js-controller` 2.0)
* **ALIAS_SEPARATE_READ_WRITE_ID**: allows specifying separate IDs for reading and writing (since `js-controller` 3.0)
* **ADAPTER_GETPORT_BIND**: the adapter.getPort method allows an optional second parameter to bind the port only on a special network interface (since `js-controller` 2.0) 
* **ADAPTER_SET_OBJECT_SETS_DEFAULT_VALUE**: adapter.setObject(*) methods now sets the default value (def) after the object was created (since `js-controller` 2.0)
* **ADAPTER_DEL_OBJECT_RECURSIVE**: adapter.delObjects supports `options.recursive` flag to delete whole object structures (since js-controller 2.2)
* **ADAPTER_AUTO_DECRYPT_NATIVE**: The Controller supports auto decryption of encrypted native properties (since js-controller 3.0)
* **PLUGINS**: Plugins are supported by this js-controller and adapters, see the section below for more details (since js-controller 3.0)
* **CONTROLLER_NPM_AUTO_REBUILD**: Automatic rebuild when node version mismatch is detected (since js-controller 3.0)
* **CONTROLLER_READWRITE_BASE_SETTINGS**: Allow reading and writing of js-controller base settings file (iobroker.json) via host messages (since js-controller 3.0)
* **CONTROLLER_MULTI_REPO**: indicates that the controller supports multiple repository sources, which will be combined in one (since js-controller 4.0)
* **CONTROLLER_LICENSE_MANAGER**: js-controller can read licenses from iobroker.net (since js-controller 4.0)
* **DEL_INSTANCE_CUSTOM**: indicates that controller is able to delete all custom attributes of an adapter and instance if it is deleted via `--custom` flag (since js-controller 4.0)

To check if certain adapter methods itself are existing, please simply check for their existence like

```js
if (adapter.getObjectView) {
    // ...
}
```

or

```js
if (typeof adapter.getObjectView === 'function') {
    // ...
}
```

#### Plugin-System for Adapters and js-controller
**Feature status:** Stable since js-controller 3.0.0

Starting with js-controller 3.0, a flexible plugin system is available to the js-controller and also to adapters.
Plugins are custom modules that can be configured in io-package.json in a new "plugins" section and provide central functionality on the level of the adapter or js-controller process. The modules are automatically loaded and configured. Depending on the plugin they can be enabled or disabled by setting `system.host` or `system.adapter` states.

More details about plugins and their development can be found at the [Plugin-Base repository](https://github.com/ioBroker/plugin-base/blob/master/README.md). A simple implementation can be found at the [Sentry-Plugin](https://github.com/ioBroker/plugin-sentry/blob/master/README.md)

New Plugins should always be developed, reviewed and published by ioBroker Core developers! Contact @Apollon77 or @GermanBluefox for this.

Since js-controller 3.0, the sentry plugin is integrated and activated by default in js-controller. See the information above.

#### Maintenance mode
There is a special maintenance mode. It is used by some special adapters, that will clean the objects and states from invalid entries.
Invalid entries could be: 
- has invalid ID (e.g., null, empty or with prohibited chars, very long IDs over 2000 chars),
- has an empty object or with no object type.
- states that have no according entry in object DB

To make it possible to get such an entries, the maintenance mode was implemented.
To make a call in maintenance mode, you must provide `options` object with the at least following attributes:
```
{
    user: 'system.user.admin',
    maintenance: true,
}
```    

Following adapter methods support maintenance mode:
```
- adapter.getForeignState
- adapter.getForeignObject
- adapter.setObjectWithDefaultValue
- adapter.setForeignObject
- adapter.setObjectNotExists
- adapter.delForeignObject

- adapter.getForeignState
- adapter.delForeignState
```

*** Do not use this mode for any other purposes except sanitizing/cleaning/repairing of existing DBs (Object and States)***

### Environment Variables
Feature status: **stable**

There are several environment variables which are respected by the js-controller. 

#### `IOB_NO_SETCAP` (up from js-controller 7.0.X)
By default, the js-controller sets some capabilities on the Node.js executable. 
Currently, `cap_net_admin`, `cap_net_bind_service`, `cap_net_raw` are set to e.g. allow Node.js to start/stop BLE advertising without root privileges. On installation these are set by the ioBroker installer. 
However, on upgrades of Node.js these get lost. If js-controller detects a Node.js upgrade, it will ensure that these capabilities are set again.

In some scenarios, e.g. during development it may be useful to deactivate this feature. You can do so by settings the `IOB_NO_SETCAP` environment variable to `true`.

## Release cycle and Development process overview
The goal is to release an update for the js-controller roughly all 6 months (April/September). The main reasons for this are shorter iterations and fewer changes that can be problematic for the users (and getting fast feedback) and also trying to stay up-to-date with the dependencies.

For the dependencies, we will use depend-a-bot. In general, the goal is still to support a certain range of Node.js LTS versions. Currently, js-controller 3.0 will start with nodes 10.x up to 12/14.x. If dependency updates break that and would require a major-release, this will be discussed and decided on core developer level BEFORE merging such a dependency change!

For the planned changes, we use a backlog approach. This means that out of the existing issues for the project, the core developers select issues to put into a prioritized backlog in the project view. Other users also can propose tickets. All merged PRs (also when unplanned/not prioritized before) are included as finished tickets in the project (so a project is assigned to them manually on merge).
When a ticket is contained in the backlog, this does not mean that it will be done in the next version! But it helps if developers have some time to see what’s considered important. The current project will always get the name „Next Release“. All older projects will get the respective release version number to know the history.

Roughly at the end of each first/third quarter (so 31.3. and 30.9.) we will finalize the next release version, update change logs. A version branch for this version is created that will allow hotfixes. 1-2 weeks before that cut-off date, no new feature PRs should be added. Changes are flagged as [Bugfix], [Feature] or [Breaking Change] in changelog (ideally also in PRs) and the version increase is depending on the type of the changes.

After this, we will have a testing phase for this version. Once tests ended successfully, it will be published to „latest“ repository to get feedback from the community. After this it goes too stable. Depending on the problems, bugs and feedback the goal is to release the stable version roughly 1 - 1.5 months after cut-off date from the version.

All changes should be added via PRs that are reviewed and merged by the core developers. PRs are flagged as [Bugfix], [Feature] or [Breaking Change].

It is also allowed to introduce unfinished new features, as soon as they do not break the system. We will also start to introduce „testing quality features“ that only may be configured manually in JSON files or via CLI. They are then flagged as „Technology Preview“. This means we will not delay a new js-controller version because a new feature is not possible to configure via admin. The feature list and details in js-controller README needs to be updated as soon as the feature is ready in general (including "Technology preview"). Unfinished features are not included in the README even if existing partly in the code.

This new process and rules are introduced with js-controller 2.0 and updated to a 6-months cycle with js-controller 3.0.

## License

The MIT License (MIT)

Copyright (c) 2014-2024 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker
