npm install --production
node iobroker.js setup
node iobroker.js object get system.adapter.admin > /dev/null
RETVAL=$?
if [ $RETVAL -ne 0 ]
    then
        echo "Install admin adapter"
        node iobroker.js add admin --enabled
fi
