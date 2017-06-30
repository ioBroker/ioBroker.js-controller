#/bin/sh
redis-cli SHUTDOWN
sudo redis-server ${TRAVIS_BUILD_DIR}/test/redis-socket/redis-socket.config &
sleep 15
redis-cli -s /tmp/redis.sock PING
npm run test-redis-socket
