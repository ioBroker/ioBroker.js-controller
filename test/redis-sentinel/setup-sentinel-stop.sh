#/bin/sh
redis-cli -p 26382 SHUTDOWN
redis-cli -p 26381 SHUTDOWN
redis-cli -p 26380 SHUTDOWN
redis-cli -p 6382 SHUTDOWN
redis-cli -p 6381 SHUTDOWN
redis-cli -p 6380 SHUTDOWN
