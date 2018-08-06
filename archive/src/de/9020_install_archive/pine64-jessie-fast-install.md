## Allgemein

Hier findet Ihr eine Installationsanleitung für ioBroker auf dem Pine64 mit dem System Jessie. Es bei der Installation immer wieder zu Besonderheiten kommen auf Grund von Abhängigkeiten zu anderen Paketen oder zusätzlichen Installationen. Wenn Ihr nicht mehr weiterkommt, dann postet bitte eure Fragen im Forum. Bei der hier veröffentlichen Anleitung werden bei jedem Kernel Update auch wenn vorhanden auch automatisch die node.js Versionen aktualisiert.

## benötigte Hardware

*   Pine64
*   Netzteil (es ist wichtig ein gutes Netzteil zu haben. Mit schwachem Netzteil sind Stabilitätsprobleme zu erwarten)
*   Speicherkarte

## benötigte / wichtige Links

*   Download Image: [http://files.pine64.org/os/debian/debian-mate-jessie-20160701-lenny.raposo-longsleep-pine64-8GB.zip](http://files.pine64.org/os/debian/debian-mate-jessie-20160701-lenny.raposo-longsleep-pine64-8GB.zip) von [hier](http://wiki.pine64.org/index.php/Pine_A64_Software_Release#Debian_Linux_Jessie_with_Mate_GUI_Image_.5B20160701.5D_by_lenny.raposo_with_Longsleep_kernel)
*   Win32DiskImager:[ https://sourceforge.net/projects/win32diskimager/](https://sourceforge.net/projects/win32diskimager/)
*   Putty: [http://www.putty.org/](http://www.putty.org/)

## Installationsanleitung

### Installation Debian

1.  Download Image
2.  Image auf die Karte installieren (Win32Diskimager)
3.  Pine64 starten
4.  Über Putty am Pine64 anmelden. Login: debian, Kennwort: debian
5.  mit` sudo resize_rootfs.sh `die Partition vergrössern

### Installation Node.js

1.  Kernel Update: `sudo apt-get update && sudo apt-get upgrade`
2.  über Putty anmelden
3.  Node.js installieren
1.  `sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get autoremove && sudo apt-get autoclean`
2.  `sudo apt-get remove libpcap0.8 -y`
3.  `sudo apt-get install -y build-essential libpcap-dev python git -y`
4.  `cd /tmp`
5.  `wget https://nodejs.org/dist/v4.6.1/node-v4.6.1-linux-arm64.tar.xz`
6.  `cd /usr/local`
7.  `sudo tar --strip-components=1 -xvf /tmp/node-v4.6.1-linux-arm64.tar.xz`
8.  `sudo npm install node-gyp -g`
4.  Nach der Installation das Kommando "`node -v`" muss node.js Version zurückgeben. Falls es nicht passiert, dann sollte noch Alies erzeugt werden: `sudo ln -s /usr/local/bin/nodejs /usr/bin/node`

### Installation ioBroker

1.  ioBroker installieren
1.  `sudo mkdir /opt/iobroker`
2.  `sudo chmod 777 /opt/iobroker`
3.  `cd /opt/iobroker`
4.  `sudo npm install iobroker --unsafe-perm`
2.  ioBroker über IP im Webbrowser aufrufen: `http://IP-Adresse:8081`

## GUI löschen (optional)

Um Platz auf SD Karte zu sparen und RAM zu befreien die grafische Oberfläche kann gelöscht werden: `sudo apt-get remove --purge x11-common` `sudo apt-get autoremove`

## feste IP vergeben (optional)

`sudo nano /etc/dhcpcd.conf` Pro interface anfügen (Beispiel): _interface eth0_ _static ip_address=192.168.0.10/24_ _static routers=192.168.0.1_ _static domain_name_servers=192.168.0.1_