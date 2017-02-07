#!/bin/bash
iobroker stop
BASE=$(pwd)

if [ ! -f "$BASE/iobroker" ]
then
    echo "Script needs to be started in the iobroker base directory (normally /opt/iobroker on linux)"
    exit
fi

if [ -d ./node_modules ]
then
    ls -1 ./node_modules | grep iobroker. > reinstall.list.txt
    chmod 777 * -R
    cd node_modules
    rm -R *
    pwd

    while read IN
    do
        npm install $IN --production --prefix $BASE
        if [ $? -eq 0 ]
        then
            echo "DONE $IN"
        else
            echo "FAIL $IN"
        fi

    done < "$BASE/reinstall.list.txt"
    chmod 777 * -R
    rm "$BASE/reinstall.list.txt"
    iobroker upload all
fi
