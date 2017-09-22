## Log transporter
There is a special type of adapters, that consume logs. Normally all adapters 
write their messages into the log file with logger.
But some adapters must to show logs or to store them something else.

To create such a type of adapter it must have **logTransport** flag in common structure.

If such a flag is present, the adapter.js creates automatically the special state for it - "system.adapter.adapterName.X.logging".
This variable must be set by logTransport adapter to true, when this adapter wants to receive logs.

"system.adapter.adapterName.X.logging" is fifo queue of redis type list.

Other adapters monitor all variables "*.logging" and write into according lists the log messages. 
The list is limited by 1000 messages (by default).

The logTransport instance receives the event "log" with message. 

To control "system.adapter.adapterName.X.logging" state the adapter must use *requireLog* function. 
E.g. ```adapter.requireLog(true);``` to enable receiving of logs.

![Illustration](logging.png)

The functionality is implemented in *adapter.js* and the developer should just set the common flag *logTransport*
 and call *requireLog*. 
 
The functionality for non-logTransport adapters is implemented in *adapter.js* and the developer must not care about it.