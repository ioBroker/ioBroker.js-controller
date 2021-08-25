#/bin/sh
set +e

if [ -z "$TRAVIS_BUILD_DIR" ]
then
    TRAVIS_BUILD_DIR="$(pwd)/../.."
fi
rm -f ${TRAVIS_BUILD_DIR}/test/redis-sentinel/dump.rdb
rm -f ${TRAVIS_BUILD_DIR}/test/redis-sentinel/log/*.log
rm -f ${TRAVIS_BUILD_DIR}/test/redis-sentinel/*.config
