# File objects DB base classes for ioBroker
The Library contains the Database classes for File based objects database client and server.

## Redis simulator
The objects db client is always a redis client, but if the database type is file, it will communicate with a built-in redis simulator instead of a real redis db.

In the js-controller we use [ioredis](https://github.com/luin/ioredis), the library supports all redis commands by simply calling them on the client instance, like `redis.set("foo", "bar")`. 
For an explanation of the commands in native redis, we refer to the [redis documentation](https://redis.io/commands).

Currently, the following commands are supported by the simulator for objects db:

### Namespaces
The simulator supports four different namespaces:

- files (default: `cfg.f.`)
- objects (default: `cfg.o.`)
- sets (default: `cfg.s.`)
- meta (default: `meta.`)

### Overview: Objects db and general functionalities
| Command      | State of integration | namespace |
| ----------- | ----------- | ----------- |
| quit      | full       | independent |
| script      | partial       | independent |
| evalsha      | full       | independent |
| publish      | full       | objects, meta |
| mget      | full       | objects, files |
| get      | full       | objects, files, meta |
| set      | full       | objects, files, meta |
| del      | full       | objects, files |
| exists      | full       | objects, files, sets |
| scan      | full       | objects, files, sets |
| keys      | full       | objects, files, sets |
| psubscribe      | full       | objects, meta |
| punsubscribe      | full       | objects |
| config      | dummy       | independent |
| client      | partial       | independent |
| multi/exec | partial | independent |
| sadd | dummy | independent |
| srem | dummy | independent |
| sscan |full | objects, files, sets |
| eval | dummy | independent |

### Overview: File db specific
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

### quit
This will close the connection.

### script
When receiving a script, the server mocks the methods `load` and `exists`, load will store a `func`or `design` script in memory. On an `exists` request, the server will return all known scripts.

### evalsha
Evalsha can be used to execute a stored script.

### publish
On publish the server will publish to all clients who have subscribed to the objects, just like redis does.

### mget
`mget` is used to receive multiple objects/files from the server.

### get
`get` is used to receive a single object/file from the server.

### set
`set` is used to set an object/file to the database.

### rename
`rename` allows renaming a `file`.

### del
`del` deletes a given object/file from the db.

### exists
`exists` checks if a given object/file exists in the database. For sets this is just a dummy.

### scan
`scan` is just like `keys` and returns all matching keys, but addtionally it returns the counter (always 0) to satisfy the redis client.
For sets this is just a dummy.

### keys
It returns all matching keys. For sets this is just a dummy.

### psubscribe
Subscribes for a pattern to receive object changes.

### punsubscribe
Unsubscribes a pattern to no longer receive object changes.

### config
Mainly a dummy, just sends a positive response if `lua-time-limit` change received.

### client
Is used to handle `setname` and `getname` requests. `setname` is used to change the logging namespace. On `getname` the server will respond with the current connection name, which has been set via `getname`.

### multi/exec
Multi/exec is fully integrated but only works with pipelines and will give a piped response. It will not respond until `exec` is called.
On `exec` the simulator responds with `OK` (for `multi`), `QUEUED` for every command and the real results as an array for `exec`.

### sadd
Just a dummy, always responds with `1`, which means we have added the item to the set.

### srem
Just a dummy, always responds with `1`, which means we have removed the item from set.

### sscan
Does the same as `scan`.

### eval
Just a dummy, always responds with `null`.

## License
Apache 2.0
Copyright 2018-2024 bluefox <dogafox@gmail.com>  
