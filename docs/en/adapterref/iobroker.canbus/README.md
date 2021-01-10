# ioBroker.canbus

![Logo](admin/canbus.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.canbus.svg)](https://www.npmjs.com/package/iobroker.canbus)
[![Downloads](https://img.shields.io/npm/dm/iobroker.canbus.svg)](https://www.npmjs.com/package/iobroker.canbus)
![Number of Installations (latest)](https://iobroker.live/badges/canbus-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/canbus-stable.svg)
[![Dependency Status](https://img.shields.io/david/crycode-de/iobroker.canbus.svg)](https://david-dm.org/crycode-de/iobroker.canbus)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.canbus.png?downloads=true)](https://nodei.co/npm/iobroker.canbus/)

**Tests:** ![Test and Release](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## CAN bus adapter for ioBroker

This adapter connects ioBroker to a Controller Area Network (CAN bus).

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
## Features

* Receive and send raw messages using standard frames and extended frames
* Each message may be configured for receiving and/or sending data
* Ability to automatically add objects for seen CAN messages which are not already configured
* Configure parsers for each message to read/write data from/to the raw message buffer
  * Nummeric types
  * Booleans including bitmask support
  * Strings in differenct character encodings
  * Custom scripts to read/write from/to the buffer of raw data
* Optional support for the RTR flag
* Optional raw states cotaining raw CAN message objects

## Requirements

* Linux operating system (because of the used socketcan library)
* CAN Hardware which creates an interface like `can0`
* Some knowledge about the messages send on you CAN bus

## Parsers

Using parsers you are able to read data from or write data to the CAN message buffer.

There are predefined parsers for the following data types.  
Additionally you may write you own scripts to read/write values with a *custom parser*.

### Nummeric types in *big-endian* and *little-endian* reperesentation

* Signed and unsigned 8, 16 and 32 bit integer
* 32 bit float
* 64 bit double

### Boolean

* 1 byte including bitmask support

### String

* 1 to 8 byte length
* Encoding: *ascii*, *base64*, *hex*, *latin1*, *utf8*, *utf16le*

### Custom

For a custom parser you have to provide you own read and write script.  
These scripts should be pure javascript and will run in a sandbox.

In the scripts you are able to use the following features:

* Most of Node.js build in functions
* `async`/`await`
* Adapter log functions `log.warn('something')`, `log.info('something')`, `log.debug('something')`
* `getStateAsync('id')` and `getObjectAsync('id')` where `id` is the full ID of the state/object

Errors in the scripts will be logged by the adapter.

In both scripts the variables `buffer` and `value` are predefined.  
`buffer` always contains the current CAN message content as a Node.js Buffer.  

#### Custom read script

In a read script you have to read the `value` from the `buffer` variable.

At the beginning of the custom read script, `buffer` will be the received/current CAN message data (like in the `.json` state).
`value` will be `undefined` and should be set by the script.

The content of the `value` variable at the end of the custom read script will be used as new value for the state.  
If `value` is `undefined`, it will be ignored. Using this you are able to filter messages in the custom read script by data parts.

#### Custom write script

In a write script you have to modify (or replace) the `buffer` variable.

At the beginning of the custom write script, `buffer` will be the current CAN message data (like in the `.json` state).
`value` is set to the value of the state which should be written into the `buffer`.

The content of the `buffer` variable at the end of the custom write script will be used as new data for the CAN message.

## Usage in scripts

You can handle/modify the `<messageId>.json` or `<messageId>.<parserId>` states in your scripts.

Additionally you may use the `raw.received` and `raw.send` states, if you have them enabled in the adapter config.  
They hold the stringified JSON data of the message data and can be used to handle each received or send message independent from the configured messages.
By writing JSON data to the `raw.send` state you are able to send CAN messages containing any data you like.

### Raw message object example
```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext` and `rtr` are optional and default to `false`.


## Changelog

### 1.0.0-beta.5 (2021-01-09)
* (crycode-de) Added Sentry error reporting in admin
* (crycode-de) Added check for multiple times configured message IDs in admin
* (crycode-de) Message IDs are now transformed to upper case automatically in admin
* (crycode-de) Updated dependencies

### 1.0.0-beta.4 (2020-12-01)
* (crycode-de) Ignore read value if a parser returned `undefined`
* (crycode-de) Updated dependencies

### 1.0.0-beta.3 (2020-11-25)
* (crycode-de) Fixed js-controller dependency
* (crycode-de) Custom parsers `getStateAsync` function now uses `getForeignStateAsync` internally
* (crycode-de) Added parses readme
* (crycode-de) Updated dependencies

### 1.0.0-beta.2 (2020-11-23)
* (crycode-de) Added Sentry error reporting
### 1.0.0-beta.1 (2020-11-17)
* (crycode-de) Added optional raw states.
* (crycode-de) Added option to enable/disable rtr states.

### 0.1.0-alpha.1 (2020-11-09)
* (crycode-de) New React UI
* (crycode-de) Support for messages with specific DLC
* (crycode-de) Parsers read on json state change with ack=false

### 0.0.1
* (crycode-de) initial development release

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2021 Peter Müller <peter@crycode.de> (https://crycode.de/)
