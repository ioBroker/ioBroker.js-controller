# Schnellstartanleitung zur Installation von ioBroker auf einem Raspberry PI 2

<span style="color: #ff0000; font-size: 18pt;">**Diese Anleitung ist nicht mehr aktuell. Die aktuelle Version finden Ihr hier.**</span>

<span style="font-size: 18pt;">**[LINK](http://www.iobroker.net/?page_id=5106&lang=de)**</span>

1.  Raspberry 2 und 16 GB SD Karte verwenden
2.  Raspian Wheezy runterladen: https://www.raspberrypi.org/downloads/raspbian/
3.  Image auf SD karte Flaschen:- OSX: Mit PiBaker das Image auf die SD Karte- Windows: Mit Win32 Disk Imager das Image auf die SD Karte- Linux: hier ist die Anleitung
4.  SD Karte in den Pi und Booten (2 A Netzteil verwenden!)
5.  Über den Terminal/SSH mit dem Pi verbinden: `ssh pi@<hier-die-IP-des-PI>` Login: _pi_ Passwort: _raspberry_
6.  Das Filesystem mit expandieren (Punkt 1): `sudo raspi-config`
7.  Root Passwort setzen: `sudo passwd root`
8.  Mit `exit` diese SSH Sitzung beenden
9.  Neu anmelden als root mit: `ssh root@<hier-die-IP-des-PI>`
10.  Alle updaten (wichtig!) zum ersten: `apt-get update`
11.  und zum zweiten: `apt-get upgrade -y`
12.  Für einige Adapters ist build-Umgebung erforderlich. Um die zu installieren, schreiben Sie: `sudo apt-get install build-essential sudo apt-get install python2.7 sudo ln -s /usr/bin/python2.7 /usr/bin/python`
13.  Jetzt geht die Node.JS installieren (einfach Zeile für Zeile): `wget http://download.iobroker.net/nodejs0_12_6_armhf.deb` `dpkg -i nodejs0_12_6_armhf.deb` `rm nodejs0_12_6_armhf.deb`
14.  Jetzt ioBroker installieren: `mkdir /opt/iobroker` `cd /opt/iobroker` `npm install iobroker --unsafe-perm`
15.  jetzt unter http://<hier-die-IP-des-PI>:8081 im Browser kann es losgehen.

_Quelle: [Forum](http://forum.iobroker.com/viewtopic.php?f=17&t=1854#p16074)_