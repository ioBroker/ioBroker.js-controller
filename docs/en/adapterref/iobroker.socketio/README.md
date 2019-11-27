![Logo](admin/socketio.png)
# ioBroker socket.io
=================

![Number of Installations](http://iobroker.live/badges/socketio-installed.svg) ![Number of Installations](http://iobroker.live/badges/socketio-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.socketio.svg)](https://www.npmjs.com/package/iobroker.socketio)
[![Downloads](https://img.shields.io/npm/dm/iobroker.socketio.svg)](https://www.npmjs.com/package/iobroker.socketio)

[![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)](https://nodei.co/npm/iobroker.socketio/)


This adapter used by some WEB applications and adapters to communicate with ioBroker.

Users can use this adapter to connect their products to ioBroker via web sockets. Actually this adapter is used by Flot, Rickshaw, Vis and mobile to extract data from ioBroker.

You can find in the example [directory](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) simple application that uses this interface to show some data.

By using of socket.io interface user should understand the [basics and concept](https://github.com/ioBroker/ioBroker) of the system.

It is useful to read about the [structure of the objects](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) too. 

## Brief description of concept
### Object
Object is description of data point or group. Group could content other datapoints in this case it called channel. If group consists of other channels in this case it called device. 

Object is meta information that describes data point and could content: max/min value, unit, name, default value, type of value, information for adapter for communication (e.g. ip address) and so on.

### State
State is actual value of the data point and presented by javascript object: 
```
{
    val: VALUE, 
    ack: ACKNOWLEDGED, 
    ts: TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    lc: TIMESTAMP of last change, 
    from: ADAPTER_NAME, 
    q: QUALITY
}
```

States change itself very frequently in compare to objects. (Normally objects should be changed once by creation and that's all) 

### Acknowledgment
Every state has attribute "ack". It shows the direction of command. 
- If ack=false, it means some other adapter wants to control (write) this variable, so that command will be executed (e.g. light will be switched on).
- If ack=true, it means that device informs about new value. (e.g. light was switched on manually or motion was detected)
 
**Example**: we have some home automation adapter (HAA) that has one lamp connected under address *haa.0.lamp1*. 
- Lamp can be switched on manually with physical switch or via wifi with he help of HAA. 
- If vis wants to switch the lamp on via wifi it should set the new value with ```{value: true, ack: false}```. 
- When the lamp is switched on it is normally inform HAA about new state and the value should be immediately overwritten with ```{value: true, ack: true}```.
- If the lamp is switched off manually via physical switch it informs HAA about new state with ```{value: false, ack: true}```. 

### Quality
Every data point has attribute **q** - *quality*. 


## Usage
It is suggested to use example/conn.js for communication. 

After inclusion of conn.js file the global object **servConn** could be used to establish the communication with socketio adapter.

**servConn** object has hollowing methods:

### init
- function (connOptions, connCallbacks, objectsRequired)

**connOptions** - is optional parameter:

```
connOptions = {
    name:          'name of the connection', // optional - default 'vis.0', used to distinguish connections in socket-io adapter.
    connLink:      'http://localhost:8084',  // optional - URL of the socket.io adapter. By default it is same URL where the WEB server is. 
    socketSession: ''                        // optional - default 'nokey', and used by authentication
};
```

You can pass these parameters by defining the global variables before call of "init" too:

```
var socketUrl      = 'http://localhost:8084';  // is connOptions.connLink
var socketSession  = '';                       // is connOptions.socketSession
servConn.namespace = 'myapp';                  // is connOptions.name
```

**connCallbacks** - object with callbacks:

```
connCallbacks = {
    onConnChange:   function (isConnected) {}, // optional - called if connection state changed.
    onObjectChange: function (id, obj)     {}, // optional - called if content of some object is changed, new object created or object was deleted (obj = null)
    onUpdate:       function (id, state)   {}, // optional - called if state of some object is changed, new state for object is created or state was deleted (state = null)
    onError:        function (error)       {}  // optional - called if some error occurs
};
```

### setState
- function (pointId, value, callback)

set new value of some data point.
 
E.g. ```servConn.setState('adapter.0.myvalue', true)``` writes ```{val: true, ack: false}``` into *adapter.0.myvalue*.

- **pointId** - is ID of the state, like *adapter.0.myvalue*,
- **value**   - new value of the state, could be simple value (string, number, boolean) or object like ```{val: newValue, ack: false, q: 0}```. 
In case if used simple value, "ack" will be set to "false".
- **callback** - ```function (error) {}``` - called when the write of new value into DB is performed (not when the device was controlled).  


### getStates
- function (IDs, callback)

get the states of more than one state. This command normally is called after the connection is established to get the actual states of used data points.

- **IDs** - pattern or array with IDs. Could be omitted to get all states. Patterns could have wildcards, like: '*.STATE', 'haa.0.*' 
- **callback** - ```function (error, states) {}``` - *states* is object like ```{'id1': 'state1', 'id2': 'state2', ...}```. *stateX* are objects with the structure described [above](#state). 

### httpGet
- function (url, callback)

calls this URL from PC, where socketio adapter runs.
- **url** - is address to call. 
- **callback** - ```function (data) {}``` - result of the request (html body). 

### logError
- function (errorText)

writes error message into controller's log.

### getConfig
- function (callback)

reads controller configuration like language, temperature units, point or comma delimiter in floats, date format.

- **callback** - ```function (err, config) {}``` - config looks like:

```
{
  "_id": "system.config",
  "type": "config",
  "common": {
    "name":             "System configuration",
    "language":         "de",
    "tempUnit":         "°C",
    "currency":         "€",
    "dateFormat":       "DD.MM.YYYY",
    "isFloatComma":     true,
    "licenseConfirmed": true,
    "activeRepo":       "fast-online",
    "diag":             "extended",
    "defaultHistory":   ""
  }
}
```

### getObject
- function (id, callback)

read specific object from DB. With this function the meta information of some object could be read.

- **id** - id of the state, like "haa.0.light1",
- **callback** - ```function (error, obj)``` - obj looks like:
  
```
{
  "_id": "haa.0.light1",
  "type": "state",
  "common": {
    "def": false,
    "type": "boolean",
    "read": false,
    "write": true,
    "role": "switch",
    "name": "light in floor"
  },
  "native": {
    "CONTROL": "BUTTON.LONG",
    "DEFAULT": false,
    "FLAGS": 1,
    "ID": "PRESS_LONG",
    "MAX": true,
    "MIN": false,
    "OPERATIONS": 6,
    "TAB_ORDER": 1,
    "TYPE": "ACTION",
    "UNIT": ""
  },
  "enums": ['enum.rooms.floor'],
  "acl": {
    "object": 1638,
    "state": 1638
  }
}  
```

### getObjects
- function (callback)

read all objects from DB. 

- **callback** - ```function (error, objs)``` - objs looks like:  ```{'id1': 'object1', 'id2': 'object2', ...}```

### readDir
- function (dirName, callback)

reads files and directories in specified directory.

Files are stored in DB (or similar) and normally should not be accessed directly. File name consist of path, filename and file extension, like "/mobile.0/data/fileName.txt".  

- dirName - name of the directory like */mobile.0/data*
- callback - ```function (error, list)``` - list looks like:

```
[
    {
        file:       'file1.txt',
        stats:      {
                      mode: 33188,
                      size: 527,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      false,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    {
        file:       'main',
        stats:      {
                      mode: 33188,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      true,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    ...
]                
```

### mkdir
- function (dirName, callback)

- **callback** - ```function (error) {}```

### unlink
- function (name, callback)

deletes file or directory. Directory must be empty to be deleted. 

- dirName - name of the directory or file like */mobile.0/data*.
- **callback** - ```function (error) {}```

### readFile
- function (filename, callback)

- **callback** - ```function (error, fileData, mimeType)```

### readFile64
- function (filename, callback)

- **callback** - ```function (error, data)``` - data is ```{mime: mimeType, data: base64data}```

### writeFile
- function (filename, data, mode, callback)

- **callback** - ```function (error) {}```

### writeFile64
- function (filename, data, mode, callback)

- **callback** - ```function (error) {}```

### renameFile
- function (oldName, newName, callback)

- **callback** - ```function (error) {}```

### getHistory
- function (instance, options, callback)

- **callback** - ```function (error, data, step, sessionId) {}```

### requireLog
- function (isRequire, callback)

activates/deactivates log receiving for this socket.

- **callback** - ```function (error) {}```

### authEnabled
- function ()

reads if the authentication is enabled and which user is logged in

- **callback** - ```function (authEnabled, currentUser) {}```

If authentication is enabled, so current logged in user will be returned, if auth is disabled, so the default user "running as" will be returned.

## Tuning Web-Sockets
On some web-sockets clients there is performance problem with communication. Sometimes this problem is due to fallback of socket.io communication on long polling mechanism.
You can set option *Force Web-Sockets* to force using only web-sockets transport.

## Changelog
### 2.1.2 (2019-09-28)
* (Apollon77) optimize shutdown for compact mode

### 2.1.1 (2018-06-09)
* (bluefox) Used socket.io Version 1.7.2
* (bluefox) Fix authentication problem

### 2.1.0 (2018-05-04)
* (bluefox) Used socket.io Version 1.7.4

### 2.0.1 (2018-02-28)
* (bluefox) Dropped support of old browsers. Please do not update if you have iPad 1 and so on.

### 1.9.0 (2018-01-14)
* (bluefox) Ready for admin3

### 1.8.7 (2017-11-29)
* (bluefox) Tune cloud work

### 1.8.5 (2017-10-22)
* (bluefox) Escape [] in subscriptions

### 1.8.4 (2017-10-16)
* (bluefox) Check callback validity

### 1.8.3 (2017-10-09)
* (bluefox) Allow authentication via URL

### 1.8.2 (2017-09-20)
* (bluefox) Fix cmdExec command

### 1.8.1 (2017-09-13)
* (bluefox) Fix user access rights for sendToHost

### 1.8.0 (2017-08-06)
* (bluefox) Support the access to admin via iobroker.pro

### 1.7.5 (2017-05-24)
* (bluefox) fix error if subscribe is empty

### 1.7.4 (2017-01-04)
* (bluefox) fix error with authentication

### 1.7.3 (2016-11-13)
* (bluefox) support of socket extensions

### 1.7.2 (2016-11-06)
* (bluefox) Fix unsubscribe of states

### 1.7.1 (2016-10-11)
* (bluefox) Fix authentication for app

### 1.7.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.6.1 (2016-08-29)
* (bluefox) fix error by checking user name

### 1.6.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.5.4 (2016-08-26)
* (bluefox) fix error in socket.js

### 1.5.3 (2016-08-14)
* (bluefox) support of force only web sockets transport

### 1.5.2 (2016-07-06)
* (bluefox) support of chained certificates

### 1.5.1 (2016-06-28)
* (bluefox) add sendToHost command

### 1.5.0 (2016-06-17)
* (bluefox) preparations for cloud

### 1.4.1 (2016-05-13)
* (bluefox) change getHistory function

### 1.4.0 (2016-04-24)
* (bluefox) encode json files

### 1.3.0 (2016-03-17)
* (bluefox) rename files

### 1.2.3 (2015-12-24)
* (bluefox) support of authentication over URL

### 1.2.2 (2015-12-09)
* (bluefox) remove unused parameter "cache"

### 1.2.0 (2015-11-15)
* (bluefox) add version compatibility check

### 1.1.0 (2015-11-14)
* (Smiling_Jack) add getHistory

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.4.5 (2015-08-11)
* (bluefox) update packets

### 0.4.4 (2015-07-07)
* (bluefox) extend writeFile with mode

### 0.4.3 (2015-07-06)
* (bluefox) add chmodFile

### 0.4.1 (2015-06-13)
* (bluefox) add default ttl
* (bluefox) enable run from "web" and add permissions check

### 0.4.0 (2015-06-13)
* (bluefox) add permissions support

### 0.3.1 (2015-05-19)
* (bluefox) support of subscribe on objectChanged

### 0.3.0 (2015-04-23)
* (bluefox) enable security

### 0.2.3 (2015-03-07)
* (bluefox) extend getStates to support list of objects

### 0.2.2 (2015-02-14)
* (bluefox) fix error with objectChanged event

### 0.2.0 (2015-01-16)
* (bluefox) make socket usable as module

### 0.1.6 (2015-01-08)
* (bluefox) support of subscribe for different sockets. Support of socket names. Diagnostic info in socket.0.connected

### 0.1.5 (2015-01-07)
* (bluefox) fix error with update of states and objects

### 0.1.4 (2015-01-06)
* (bluefox) support of file manager in vis

### 0.1.3 (2015-01-02)
* (bluefox) enable adapter by default

### 0.1.2 (2015-01-02)
* (bluefox) add "request" module to package.json

### 0.1.1 (2015-01-02)
* (bluefox) enable npm install

### 0.1.0 (2014-12-28)
* (bluefox) support of read/write files

### 0.0.5 (2014-12-19)
* (bluefox) support of setObjects command

### 0.0.4 (2014-12-10)
* (bluefox) support of https sockets

### 0.0.3 (2014-12-05)
* (bluefox) support of https sockets

### 0.0.2 (2014-11-24)
* (bluefox) fix error by start

### 0.0.1 (2014-10-10)
* (bluefox) authentication works

## License

The MIT License (MIT)

Copyright (c) 2014-2018 bluefox <dogafox@gmail.com>