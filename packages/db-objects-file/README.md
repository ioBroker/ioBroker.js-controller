# File objects DB base classes for ioBroker
The Library contains the Database classes for File based objects database client and server.

# Redis simulator
The objects db client is always a redis client, but if the databse type is file, it will communicate with a built-in redis simulator instead of a real redis db.
Currently, the following commands are supported by the simulator for objects db:

## Overview: Objects db and general functionalities
| Command      | State of integration |
| ----------- | ----------- |
| quit      | full       |
| script      | partial       |
| evalsha      | full       |
| publish      | full       |
| mget      | full       |
| get      | full       |
| set      | full       |
| del      | full       |
| exists      | full       |
| scan      | full       |
| keys      | full       |
| psubscribe      | full       |
| punsubscribe      | full       |
| config      | dummy       |
| client      | partial       |

## Overview: File db specific
| Command      | State of integration |
| ----------- | ----------- |
| mget      | full       |
| get      | full       |
| set      | full       |
| rename      | full       |
| del      | full       |
| exists      | full       |
| scan      | full       |
| keys      | full       |

## quit
This will close the connection.

## script
When receiving a script, the server mocks the methods `load` and `exists`, load will store a `func`or `design` script in memory. On an `exists` request, the server will return all known scripts.

## evalsha
Evalsha can be used to execute a stored script.

## publish
On publish the server will publish to all clients who have subscribed to the objects, just like redis does.

## mget
`mget` is used to receive multiple objects/files from the server.

## get
`get` is used to receive a single object/file from the server.

## set
`set` is used to set an object/file to the database.

## rename
`rename` allows renaming a `file`.

## del
`del` deletes a given object/file from the db.

## exists
`exists` checks if a given object/file exists in the database.

## scan
`scan` is just like `keys` and returns all matching keys, but addtionally it returns the counter (always 0) to satisfy the redis client.

## keys
It returns all matching keys.

## psubscribe
Subscribes for a pattern to receive object changes.

## punsubscribe
Unsubscribes a pattern to no longer receive object changes.

## config
Mainly a dummy, just sends a positive response if `lua-time-limit` change received.

## client
Is used to handle `setname` and `getname` requests. `setname` is used to change the logging namespace. On `getname` the server will respond with the current connection name, which has been set via `getname`.

## License
Apache 2.0
Copyright 2018-2020 bluefox <dogafox@gmail.com>  
