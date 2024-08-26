# File DB states classes for ioBroker
The Library contains the Database classes for File based states database client and server.

## Redis simulator
The states db client is always a redis client, but if the database type is file, it will communicate with a built-in redis simulator instead of a real redis db.

In the js-controller we use [ioredis](https://github.com/luin/ioredis), the library supports all redis commands by simply calling them on the client instance, like `redis.set("foo", "bar")`.
For an explanation of the commands in native redis, we refer to the [redis documentation](https://redis.io/commands).

Currently, the following commands are supported by the simulator for states db:

### Namespaces
The simulator supports five different namespaces:

- states (default: `io.`)
- messages (default: `messagebox.`)
- log (default: `log.`)
- session (default: `session.`)
- meta (default: `meta.`)

### Overview
| Command      | State of integration | namespace |
| ----------- | ----------- | ----------- |
| info      | partial       | independent |
| quit      | full       | independent |
| publish      | full       | all |
| mget      | full       | states |
| get      | full       | states, session, meta |
| set      | full       | states, meta |
| setex      | full       | states, session |
| del      | full       | states, session |
| keys      | full       | states |
| psubscribe      | full       | messages, log, states, meta |
| punsubscribe      | full       | messages, log, states |
| subscribe      | dummy       | independent |
| config      | dummy       | independent |
| client      | partial       | independent |

### info
Returns infomration about the simulator.

### quit
This will close the connection.

### publish
On publish the server will publish to all clients who have subscribed to the states, just like redis does.

### mget
`mget` is used to receive multiple states from the server.

### get
`get` is used to receive a single state from the server.

### set
`set` is used to set a state to the database.

### setex
`setex` is used to set a state to the database which automatically expires after a given time.

### del
`del` deletes a given state from the db.

### keys
It returns all matching keys.

### psubscribe
Subscribes for a pattern to receive state changes.

### punsubscribe
Unsubscribes a pattern to no longer receive state changes.

### subscribe
Just a dummy needed to acknowledge expiring keys.

### config
Mainly a dummy, just sends a positive response if `notify-keyspace-events` request received.

### client
Is used to handle `setname` and `getname` requests. `setname` is used to change the logging namespace. On `getname` the server will respond with the current connection name, which has been set via `getname`.

## License
The MIT License (MIT)

Copyright (c) 2014-2024 bluefox <dogafox@gmail.com>,
Copyright (c) 2014      hobbyquaker
