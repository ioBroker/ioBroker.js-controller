#/bin/sh
set +e
redis-cli -p 26382 SHUTDOWN || true
redis-cli -p 26381 SHUTDOWN || true
redis-cli -p 26380 SHUTDOWN || true
redis-cli -p 6382 SHUTDOWN || true
redis-cli -p 6381 SHUTDOWN || true
redis-cli -p 6380 SHUTDOWN || true
