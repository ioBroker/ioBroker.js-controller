#/bin/sh
redis-cli SHUTDOWN
sudo redis-server ${TRAVIS_BUILD_DIR}/test/redis-socket/redis-socket.config
redis-cli PING
