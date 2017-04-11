## Allgemein

Hier findet Ihr eine Installationsanleitung für ioBroker auf Linux am Beispiel vom Raspberry PI mit dem System Jessie. Die [eigentliche Anleitung zur Installation von nodejs und ioBroker](#Installation_Nodejs) kann für sehr viele andere Linux-Systeme verwendet werden. Es kann bei der Installation immer wieder zu Besonderheiten kommen auf Grund von Abhängigkeiten zu anderen Paketen oder zusätzlichen Installationen. Wenn Ihr nicht mehr weiterkommt, dann postet bitte eure Fragen im Forum. Bei der hier veröffentlichen Anleitung wird bei jedem Kernel Update wenn vorhanden auch automatisch die node.js Versionen aktualisiert.

## benötigte Hardware

*   Raspberry PI
*   Netzteil (es ist wichtig ein gutes Netzteil zu haben. Mit schwachem Netzteil sind Stabilitätsprobleme zu erwarten)
*   Speicherkarte

## benötigte / wichtige Links

*   Download Image: [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)
*   Win32DiskImager:[ https://sourceforge.net/projects/win32diskimager/](https://sourceforge.net/projects/win32diskimager/)
*   Putty: [http://www.putty.org/](http://www.putty.org/)
*   Grundkonfiguration einen Raspberry PI: [http://www.raspifun.de/viewtopic.php?t=4](http://www.raspifun.de/viewtopic.php?t=4)

## Installationsanleitung

### Installation Raspbian

1.  Download Image (RASPBIAN JESSIE oder RASPBIAN JESSIE LITE)
2.  Image auf die Karte installieren (Win32Diskimager)
3.  Raspberry starten
4.  Über Putty am Raspberry anmelden. Login: pi, Kennwort: raspberry
5.  mit `sudo raspi-config`die nötige Grundkonfiguration durchführen
6.  Root Zugang freischalten
1.  `sudo nano /etc/ssh/sshd_config`
2.  Datei anpassen: PermitRootLogin without-password in PermitRootLogin yes ändern und speichern
3.  SSH neu starten: `sudo /etc/init.d/ssh restart`
4.  `sudo su` (jetzt ist der Root Modus gestartet)
5.  mit `passwd` ein Passwort vergeben
7.  Ausloggen und als Root über Putty anmelden

### Installation Node.js

1.  Kernel Update: `sudo apt-get update && sudo apt-get upgrade`
2.  Die alten node & node.js Versionen deinstallieren (bei Jessie Light nicht notwendig)
1.  `apt-get --purge remove node`
2.  `apt-get --purge remove nodejs`
3.  `apt-get autoremove`
4.  `reboot`
3.  als Root über Putty anmelden
4.  Node.js neu installieren für Raspbery 2/3
1.  `curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`
2.  `sudo apt-get install -y build-essential python nodejs`
3.  `reboot`
5.  Node.js neu installieren <span style="color: #ff0000;">**nur für Raspbery 1**</span>
1.  `wget [http://node-arm.herokuapp.com/node_archive_armhf.deb](http://node-arm.herokuapp.com/node_archive_armhf.deb)`
2.  `sudo dpkg -i node_archive_armhf.deb`
3.  `sudo apt-get install build-essential python python-rpi.gpio`
4.  `reboot`
6.  als Root über Putty anmelden
7.  Nach der Installation muss das Kommando "`node -v`" die Version von node.js zurückgeben. Falls es nicht passiert, dann sollte noch ein Alias erzeugt werden: `sudo ln -s /usr/local/bin/nodejs /usr/bin/node`

### Installation ioBroker

1.  ioBroker installieren
1.  `sudo mkdir /opt/iobroker`
2.  `sudo chmod 777 /opt/iobroker`
3.  `cd /opt/iobroker`
4.  `sudo npm install iobroker --unsafe-perm`
2.  ioBroker über IP im Webbrowser aufrufen: `http://IP-Adresse:8081`

**weiter geht es [Hier](http://www.iobroker.net/?page_id=5219&lang=de#Die_Konfiguration)!**

## feste IP vergeben (optional)

`sudo nano /etc/dhcpcd.conf` Pro interface anfügen (Beispiel): _interface eth0_ _static ip_address=192.168.0.10/24_ _static routers=192.168.0.1_ _static domain_name_servers=192.168.0.1_