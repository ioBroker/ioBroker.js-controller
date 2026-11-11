#!/bin/sh
cd "$(dirname "$0")"
./setup-sentinel-start.sh
(cd ../../../.. && npm run test-redis-sentinel)
RC=$?
./setup-sentinel-stop.sh
exit $RC
