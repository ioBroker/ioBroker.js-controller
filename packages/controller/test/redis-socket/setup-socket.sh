#/bin/sh
redis-cli SHUTDOWN
sudo redis-server packages/controller/test/redis-socket/redis-socket.config &
sleep 15
redis-cli -s /var/run/redis.sock PING
npm run test-redis-socket
redis-cli -s /var/run/redis.sock PING
redis-cli -s /var/run/redis.sock SHUTDOWN
