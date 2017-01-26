#!/bin/bash
iobroker stop
BASE=$(pwd)

if [ -d ./node_modules ]
then
    ls -1 ./node_modules | grep iobroker. > reinstall.list.txt
    chmod 777 * -R
    cd node_modules
    rm -R *
    pwd

    while read IN
    do
        npm install $IN --production
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
