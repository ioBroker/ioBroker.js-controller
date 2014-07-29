#!/usr/bin/env bash

# IMPORTANT 
# Protect agaisnt mispelling a var and rm -rf /
set -u
set -e

rm -f ioBroker-@@version.deb

rm -rf dest
mkdir -p dest
rm -f *.deb
#unpack data
mkdir sysroot
cd sysroot
echo "Unpack DATA"
tar -xf ../data.tar.gz
cd ..

find sysroot/ -type d -exec chmod 0755 {} \;
find sysroot/ -type f -exec chmod go-w {} \;
chown -R root:root sysroot/
find DEBIAN/ -type d -exec chmod 0755 {} \;
find DEBIAN/ -type f -exec chmod go-w {} \;
chown -R root:root DEBIAN/

#let SIZE=`du -s ${SYSROOT} | sed s'/\s\+.*//'`+8
cd sysroot
echo "Create DEB"
echo tar czf ../dest/data.tar.gz [a-z]*
tar czf ../dest/data.tar.gz [a-z]*
cd ..
#sed s"/SIZE/${SIZE}/" -i ${DEBIAN}/control
cd DEBIAN
tar czf ../dest/control.tar.gz *
cd ..

cd dest
echo 2.0 > ./debian-binary

find ./ -type d -exec chmod 0755 {} \;
find ./ -type f -exec chmod go-w {} \;
chown -R root:root ./
ar r ../ioBroker-@@version.deb debian-binary control.tar.gz data.tar.gz
rm * -R
cd ..
rmdir dest
cd sysroot
rm * -R
cd ..
rmdir sysroot
