---
title:       "Installation"
lastChanged: "13.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/install/virtualbox.md"
---

# Einrichtung und Installation von ioBroker in VirtualBox 

?> ***Dies ist ein Platzhalter***. 
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](appendix/style_guide), 
   damit die Änderungen einfacher übernommen werden können.

@@@ http://www.iobroker.net/docu/?page_id=5358&lang=de @@@


Zuerst besorgen wir uns eine aktuelle Stable Version von Debian
https://www.debian.org/CD/http-ftp/#stable

Etwas weiter unten klicken wir unter CD auf AMD64

Nun laden wir die “debian-8.4.0-amd64-netinst.iso” herunter
Falls es ein neuere Version geben sollte benutzt diese, zum Downloadzeitpunkt war Debian 8.4.0 Aktuell.
Ich nutze die Netinst, da die Datei klein ist und die Installation nur kleinigkeiten aus den Netz nachläd.

Danach erzeugen wir eine neue Virtuelle Maschine und geben ihr einen Namen.
In meinem Beispiel ioBroker_Debian_Jessie_x64
Aufnahme87.jpg
Dann geben die Größe des Hauptspeichers an, der wir der VM zuteilen möchten.
In meinem Beispiel 4GB RAM
Aufnahme88.jpg

Klicken auf Festplatte erzeugen
Aufnahme89.jpg

Wählen VDI (Virtual Image Box)
Aufnahme90.jpg

Bei Art der Speicherung ist es jedem selbst überlassen was er wählt.
In meinem Beispiel benutze ich DYNAMISCH ALLOZIERT
Aufnahme91.jpg

Jetzt können wir den Dateinamen der VM noch ändern (falls gewollt) und geben die Größe der zur Verfügung stellenden Partiotion für unsere VM
In meinem Beispiel 10GB
Aufnahme92.jpg

Nun ist die VM fertig eingestellt.
Wenn wir jetzt auf ÄNDERN klicken, können wir noch einige weitere Sachen der VM einstellen.

Wir gehen auf den Reiter MASSENSPEICHER
Klicken UNTER Controller: IDE

Auf der Rechten seite erscheint unter Attribute ein CD Logo.
Dies klicken wir an und wählen DATEI FÜR VIRTUELLES CD/DVD-Medium auswählen.
Nun Navigieren wir im Explorer zur heruntergeladenen ISO Datei von Debian und wählen diese aus.
Das ganze sollte dann so aussehen:
Aufnahme93.jpg

Da ich ioBroker in meinem Netzwerk erreichen möchte und nicht in einem Sub, stelle ich unter dem Reiter NETZWERK
Unter ANGESCHLOSSEN AN, die Auswahl auf NETZWERKBRÜCKE
Aufnahme94.jpg

Nun haben wir alles nötige eingestellt.
Die Installation von Debian kann los gehen.
Wir klicken auf START und landen in folgendem Bild.
Wir wählen INSTALL
Aufnahme95.jpg

Sprache:
Wählen GERMAN aus
Aufnahme96.jpg

Standort:
Wählen DEUTSCHLAND aus
Aufnahme97.jpg

Tastaturlayout:
Wählen DEUTSCH aus
Aufnahme98.jpg

Rechnername:
Wir geben den Namen des zu Installierenden Rechners ein.
In meinem Beispiel ioBrokerVM (falls jemand testweise Backups von seinem ioBroker Produktivsystem zurückspielen möchte, hier bitte den selben Nanem wir euer RasPi / Cubie / BananaPi etc. eingeben.)
Aufnahme100.jpg

Domain-Name:
Das Feld kann man frei lassen
Aufnahme101.jpg

Root-Passwort:
Euer Root-Passwort
Aufnahme102.jpg

Root-Passwort wiederholen:
Nochmal euer Root-Passwort
Aufnahme103.jpg

Benutzer Anlegen:
In meinem Beispiel NIPPY
Aufnahme104.jpg

Benutzername Anlegen:
In meinem Beispiel NIPPY
Aufnahme105.jpg

Passwort für Benutzer:
Euer Benutzer-Passwort
Aufnahme106.jpg

Benutzer-Passwort wiederholen:
Nochmal euer Benutzer-Passwort
Aufnahme107.jpg
Zeitzone:
Wir wählen BERLIN

Aufnahme108.jpg

Festplatte Partitionieren 1:
Wir wählen GEFÜHRT – VOLLSTÄNDIGE FESTPLATTE VERWENDEN
Aufnahme109.jpg

Festplatte Partitionieren 2:
Wir wählen unsere Festplatte aus
Aufnahme110.jpg

Festplatte Partitionieren 3:
Wir wählen ALLE DATEIEN AUF EINE PARTITION, FÜR ANFÄNGER EMPFOHLEN
Aufnahme111.jpg

Festplatte Partitionieren 4:
Wir wählen PARTITIONIERUNG BEENDEN UND ÄNDERUNGEN ÜBERNEHMEN
Aufnahme112.jpg

Festplatte Partitionieren 5:
Wir wählen JA
Aufnahme113.jpg
Paket-Manager Konfigurieren 1:
Wir wählen DEUTSCHLAND
Aufnahme115.jpg

Paket-Manager Konfigurieren 2:
Ich wählte ftp.de.debian.org
Aufnahme116.jpg

Paket-Manager Konfigurieren 3:
kann man frei lassen und auf WEITER gehen
Aufnahme118.jpg

Populary-Contest:
Ich wählte NEIN
Aufnahme119.jpg

Softwareauswahl:
Wir wählen SSH SERVER & STANDARD-SYSTEMWERKZEUGE den rest wählen wir ab (falls angewählt)
Aufnahme120.jpg

GRUB-Bootloader 1:
wir wählen JA
Aufnahme121.jpg

GRUB-Bootloader 2:
wir wählen unsere HDD /dev/sda (ata-Vbox………)
Aufnahme122.jpg

Installation Abgeschlossen:
Aufnahme123.jpg

Nun rebootet sich das System und wir landen im Login

Login:
Aufnahme124.jpg

Wir loggen und mit unseren Root Account an:
Login: root
Password: EUER VERGEBENES PASSWORT
Aufnahme125.jpg

Nun updaten wir das System:
apt-get install update
1
	
apt-get install update
apt-get install upgrade
1
	
apt-get install upgrade

Da SUDO nicht installiert ist, machen wie dies:
aptitude install sudo
1
	
aptitude install sudo

Es folgt die NPM Installation:
apt-get install npm
1
	
apt-get install npm

Dann Installieren wir CURL:
apt-get install curl
1
	
apt-get install curl

Vorbereitung und Installation von NodeJs
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
1
	
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

apt-get install nodejs
1
	
apt-get install nodejs

Wenn das erledigt ist, erfolgt die Installation von ioBroker

Zuerst erstellen wir das Verzeichnis iobroker:
mkdir /opt/iobroker
1
	
mkdir /opt/iobroker

Wir wechseln in das Verzeichnis iobroker:
cd /opt/iobroker
1
	
cd /opt/iobroker

Nun Installieren wir iobroker:
npm install --unsafe-perm iobroker
1
	
npm install --unsafe-perm iobroker

Am ende der Installation sollte folgendes erscheinen:
Aufnahme137.jpg

—

Wer möchte kann sich noch htop installieren
Ich nutze es im im Terminal mir die Speicherauslastung / CPU Last etc. anzusehen.

Installiert wird dies mit:
apt-get install htop
1
	
apt-get install htop

ausgeführt wird es mit:
htop
1
	
htop

Und sieht wie folgt aus:
Aufnahme139.jpg

Ich hoffe einigen Einsteigern die Einrichtung einer VM inkl. ioBroker erleichtert zu haben.

Bei mir hat die Installation von ioBroker in einer VM öfters fehlgeschlagen, auf dem BananaPi lief sie ohne Probleme durch.

Diese Installationsroutine hat bei mir auf der VM jedenfalls wunderbar fonktioniert.

    1 Ergänzung:
        1.1 VirtualBOX VM automatisch starten (Ubuntu 16.10):
        1.2 Die 3 Variablen anpassen! (ggf. die 3. Variable auskommentieren oder weitere hinzufügen, je nach VM-Instanzen)

Ergänzung:
VirtualBOX VM automatisch starten (Ubuntu 16.10):

https://www.freesoftwareservers.com/ind … nd-vbox-5/

Datei erstellen:
 

sudo nano /etc/init.d/StartVM &amp;&amp; sudo chmod +x /etc/init.d/StartVM &amp;&amp; sudo update-rc.d StartVM defaults 99 01
1
	
sudo nano /etc/init.d/StartVM &amp;&amp; sudo chmod +x /etc/init.d/StartVM &amp;&amp; sudo update-rc.d StartVM defaults 99 01

Dateiinhalt:

~~~bash
#! /bin/sh
# Start VirtualBox @boot 
# /etc/init.d/StartVM
#

#Edit these variables!
VMUSER=user
VMNAME=VM1
VMNAME2=Test

case "$1" in
  start)
    echo "Starting VirtualBox VM ..."
    sudo -u $VMUSER VBoxHeadless --startvm $VMNAME &amp;
    sudo -u $VMUSER VBoxHeadless --startvm $VMNAME2 &amp;
    ;;
  stop)
    echo "Saving state of Virtualbox VM ..."
    sudo -u $VMUSER VBoxManage controlvm $VMNAME savestate
    sudo -u $VMUSER VBoxManage controlvm $VMNAME2 savestate
    ;;
  *)
    echo "Usage: /etc/init.d/StartVM {start|stop}"
    exit 1
    ;;
esac

exit 0
~~~

Die 3 Variablen anpassen! (ggf. die 3. Variable auskommentieren oder weitere hinzufügen, je nach VM-Instanzen)

Im BIOS (falls es auf einem Rechner läuft) einstellen, dass bei Stromausfall der alte ON/OFF-Status wiederhergestellt werden soll. Bei Stromausfall startet er dann neu, und die VM startet anschließend ebenfalls.

Sicherungen mit VirtualBOX und Back in Time anlegen

In VirtualBOX kann man ganz einfach manuell Sicherungspunkte anlegen. Es dauert nur wenige Sekunden und 1 Klick. Immer vor einem iobroker Update oder Skriptänderungen machen!
Bildschirmfoto vom 2016-04-26 22-48-04.png

Mit einem Klick kann man die Vorgängerversion wiederherstellen.

Speicherverbrauch: eine dynamische VM mit 10 GB und Ubuntu 16.10 Full + iobroker belegt ca. 1,7 GB Speicherplatz. Meine 11 Snapshots belegen 8,6 GB.

Meinen ganzen persönlichen Bereich inkl. des VirtualBOX VM Verzeichnisses kopiere ich jede Nacht mit dem Programm “Back in Time” automatisch auf eine 2. Festplatte. Dort werden mehrere Versionen vorgehalten und automatisch gelöscht nach bestimmten Zeiten.
Bildschirmfoto vom 2016-04-26 22-55-23.png
Damit läuft VirtualBox.

~~~bash
sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms
~~~

Man kann noch ein Extension Pack dazuinstallieren, es unterstützt zum Beispiel auch die Anbindung von USB 2.0 oder 3.0 Geräten vom Host auf dem Clienten, Webcam-Durchleitung vom host zum clienten und AES Verschlüsselung. Downloaden kann man es [URL:https://www.virtualbox.org/wiki/Downloads]hier – der 2. Punkt (Extension Pack)[/url]
Diese Datei läd man sich herunter und öffnet sie entweder als Admin oder öffnet und installiert es über VirtualBOX / Globale Einstellungen / Zusatzpakete (VirtualBOX aber als Admin starten).

Die Mindesthardwareanforderungen sind sehr gering. Man muss für sich ausknobeln wie es passt. Theoretisch reichen 512 RAM und ein alter Intel-Prozessor. Es sollte zB auf allen Intel NUC Generationen problemlos laufen.
Für den Dauerbetrieb ist es natürlich wichtig, einen stromsparenden Host zu haben. Man kann sich heutzutage problemlos kräftige unter-10-Watt-Rechner zusammenbasteln. Es gibt im Internet diverse 10-Watt-PC-Anleitungen. Wichtig ist, dass man möglichst auf eine (eigene) Grafikkarte verzichtet und ein im niederen Lastbereich effizientes Netzteil hat, und kein HighEnd-Mainboard benutzt, denn je mehr Funktionen es hat, desto mehr Chips nuckeln am Strom.
Die Intel NUC-Reihe kann ich wirklich für Windows oder Ubuntu empfehlen. Ich zitiere mal meine Signatur:
iobroker in einer Ubuntu VM mit VirtualBOX auf einem Intel NUC NUC6i3SYH (i3 Skylake), M.2 SSD, 8 GB RAM, Ubuntu 16.10. 6-8 W Leerlauf.

In Virtualbox habe ich die Netzwerkkarte der Vm auf “Bridged” gestellt, also dass die VM sozusagen wie ein eigener Computer am LAN-Router hängt.

Und die feste IP stellt man ganz normal innerhalb der VM über das installierte Betriebssystem ein.
Das kann bei Debian so funktionieren:

Terminal:

~~~bash
sudo nano /etc/network/interfaces
~~~

Dort könnte sowas stehen:
~~~
  auto eth0
    allow-hotplug eth0
    iface eth0 inet dhcp
~~~

Das änderst du um in (Achtung, die Zahlen auf die eigene Umgebung anpassen)

~~~	
 auto eth0         
    iface eth0 inet static
        address 192.168.1.7
        netmask 255.255.255.0
        gateway 192.168.1.1
~~~

Wobei eth0 der Name des eigenen LAN-Gerätes ist, es wird wahrscheinlich anders heißen in einer VM, bei der Änderung musst du dann die beiden eth0 – Wörter mit den richtigen Namen ersetzen.
