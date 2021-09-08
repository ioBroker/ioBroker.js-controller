#/bin/sh
set +e
./setup-sentinel-cleanup.sh

if [ -z "$TRAVIS_BUILD_DIR" ]
then
    TRAVIS_BUILD_DIR="$(pwd)/../.."
fi
cp ${TRAVIS_BUILD_DIR}/test/redis-sentinel/config/*.config ${TRAVIS_BUILD_DIR}/test/redis-sentinel/
echo "Starting 3 nodes Redis cluster with Sentinels"
sudo redis-server ${TRAVIS_BUILD_DIR}/test/redis-sentinel/redis1.config 2>&1 >> ${TRAVIS_BUILD_DIR}/test/redis-sentinel/log/redis1.log &
sudo redis-server ${TRAVIS_BUILD_DIR}/test/redis-sentinel/redis2.config 2>&1 >> ${TRAVIS_BUILD_DIR}/test/redis-sentinel/log/redis2.log &
sudo redis-server ${TRAVIS_BUILD_DIR}/test/redis-sentinel/redis3.config 2>&1 >> ${TRAVIS_BUILD_DIR}/test/redis-sentinel/log/redis3.log &
sleep 15
echo "Checking all 3 redis servers"
redis-cli -p 6380 PING
redis-cli -p 6381 PING
redis-cli -p 6382 PING
sudo redis-sentinel ${TRAVIS_BUILD_DIR}/test/redis-sentinel/sentinel1.config 2>&1 >> ${TRAVIS_BUILD_DIR}/test/redis-sentinel/log/sentinel1.log &
sudo redis-sentinel ${TRAVIS_BUILD_DIR}/test/redis-sentinel/sentinel2.config 2>&1 >> ${TRAVIS_BUILD_DIR}/test/redis-sentinel/log/sentinel2.log &
sudo redis-sentinel ${TRAVIS_BUILD_DIR}/test/redis-sentinel/sentinel3.config 2>&1 >> ${TRAVIS_BUILD_DIR}/test/redis-sentinel/log/sentinel3.log &
sleep 15

echo "Checking all 3 sentinel servers"
redis-cli -p 26380 PING
redis-cli -p 26381 PING
redis-cli -p 26382 PING
