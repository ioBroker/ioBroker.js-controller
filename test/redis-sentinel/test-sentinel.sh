#/bin/sh
set +e
./setup-sentinel-start.sh
npm run test-redis-sentinel
./setup-sentinel-stop.sh
