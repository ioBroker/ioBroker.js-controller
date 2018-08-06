Original: [http://forum.iobroker.net/viewtopic.php?f=17&t=2671](http://forum.iobroker.net/viewtopic.php?f=17&t=2671) Wie sagt man so schön: "Viele wege führen nach Rom" Dieses Tutorial zeigt die Art wie ich es angegangen bin, es ist möglich das es einige kniffe gibt die besser sind.

* * *

Ich Installiere in diesem Tutorial die 64bit Version von Debian. Je nach Nutzer müsste die ihm passendere Version heruntergeladen werden. Zuerst besorgen wir uns eine aktuelle Stable Version von Debian [https://www.debian.org/CD/http-ftp/#stable](https://www.debian.org/CD/http-ftp/#stable) Etwas weiter unten klicken wir unter CD auf **AMD64** Nun laden wir die "**debian-8.4.0-amd64-netinst.iso**" herunter Falls es ein neuere Version geben sollte benutzt diese, zum Downloadzeitpunkt war Debian 8.4.0 Aktuell. Ich nutze die Netinst, da die Datei klein ist und die Installation nur kleinigkeiten aus den Netz nachläd. Danach erzeugen wir eine neue Virtuelle Maschine und geben ihr einen Namen. In meinem Beispiel **ioBroker_Debian_Jessie_x64**

<div class="attachtitle">![Aufnahme87.jpg](http://forum.iobroker.net/download/file.php?id=4041)</div>

<div class="attachtitle">Dann geben die Größe des Hauptspeichers an, der wir der VM zuteilen möchten. In meinem Beispiel **4GB RAM**</div>

<div class="attachcontent">![Aufnahme88.jpg](http://forum.iobroker.net/download/file.php?id=4042)</div>

Klicken auf **Festplatte erzeugen**

<div class="attachcontent">![Aufnahme89.jpg](http://forum.iobroker.net/download/file.php?id=4043)</div>

Wählen **VDI (Virtual Image Box)**

<div class="attachcontent">![Aufnahme90.jpg](http://forum.iobroker.net/download/file.php?id=4044)</div>

Bei Art der Speicherung ist es jedem selbst überlassen was er wählt. In meinem Beispiel benutze ich **DYNAMISCH ALLOZIERT**

<div class="attachcontent">![Aufnahme91.jpg](http://forum.iobroker.net/download/file.php?id=4045)</div>

Jetzt können wir den Dateinamen der VM noch ändern (falls gewollt) und geben die Größe der zur Verfügung stellenden Partiotion für unsere VM In meinem Beispiel **10GB**

<div class="attachcontent">![Aufnahme92.jpg](http://forum.iobroker.net/download/file.php?id=4046)</div>

Nun ist die VM fertig eingestellt. Wenn wir jetzt auf **ÄNDERN** klicken, können wir noch einige weitere Sachen der VM einstellen. Wir gehen auf den Reiter **MASSENSPEICHER** Klicken UNTER **Controller: IDE** Auf der Rechten seite erscheint unter Attribute ein CD Logo. Dies klicken wir an und wählen **DATEI FÜR VIRTUELLES CD/DVD-Medium auswählen**. Nun Navigieren wir im Explorer zur heruntergeladenen ISO Datei von Debian und wählen diese aus. Das ganze sollte dann so aussehen:

<div class="attachcontent">[![Aufnahme93.jpg](http://forum.iobroker.net/download/file.php?id=4047&t=1)](img/file.php_id_4047_mode=view)</div>

Da ich ioBroker in meinem Netzwerk erreichen möchte und nicht in einem Sub, stelle ich unter dem Reiter NETZWERK Unter **ANGESCHLOSSEN AN**, die Auswahl auf **NETZWERKBRÜCKE**

<div class="attachcontent">[![Aufnahme94.jpg](http://forum.iobroker.net/download/file.php?id=4048&t=1)](img/file.php_id_4048_mode=view)</div>

Nun haben wir alles nötige eingestellt. Die Installation von Debian kann los gehen. Wir klicken auf **START** und landen in folgendem Bild. Wir wählen **INSTALL**

<div class="attachcontent">[![Aufnahme95.jpg](http://forum.iobroker.net/download/file.php?id=4049&t=1)](img/file.php_id_4049_mode=view)</div>

Sprache: Wählen **GERMAN** aus

<div class="attachcontent">[![Aufnahme96.jpg](http://forum.iobroker.net/download/file.php?id=4050&t=1)](img/file.php_id_4050_mode=view)</div>

Standort: Wählen **DEUTSCHLAND** aus

<div class="attachcontent">[![Aufnahme97.jpg](http://forum.iobroker.net/download/file.php?id=4051&t=1)](img/file.php_id_4051_mode=view)</div>

Tastaturlayout: Wählen **DEUTSCH** aus

<div class="attachcontent">[![Aufnahme98.jpg](http://forum.iobroker.net/download/file.php?id=4052&t=1)](img/file.php_id_4052_mode=view)</div>

Rechnername: Wir geben den Namen des zu Installierenden Rechners ein. In meinem Beispiel ioBrokerVM (falls jemand testweise Backups von seinem ioBroker Produktivsystem zurückspielen möchte, hier bitte den selben Nanem wir euer RasPi / Cubie / BananaPi etc. eingeben.)

<div class="attachcontent">[![Aufnahme100.jpg](http://forum.iobroker.net/download/file.php?id=4053&t=1)](img/file.php_id_4053_mode=view)</div>

Domain-Name: Das Feld kann man frei lassen

<div class="attachcontent">[![Aufnahme101.jpg](http://forum.iobroker.net/download/file.php?id=4054&t=1)](img/file.php_id_4054_mode=view)</div>

Root-Passwort: Euer Root-Passwort

<div class="attachcontent">[![Aufnahme102.jpg](http://forum.iobroker.net/download/file.php?id=4055&t=1)](img/file.php_id_4055_mode=view)</div>

Root-Passwort wiederholen: Nochmal euer Root-Passwort

<div class="attachcontent">[![Aufnahme103.jpg](http://forum.iobroker.net/download/file.php?id=4056&t=1)](img/file.php_id_4056_mode=view)</div>

Benutzer Anlegen: In meinem Beispiel NIPPY

<div class="attachcontent">[![Aufnahme104.jpg](http://forum.iobroker.net/download/file.php?id=4057&t=1)](img/file.php_id_4057_mode=view)</div>

Benutzername Anlegen: In meinem Beispiel NIPPY

<div class="attachcontent">[![Aufnahme105.jpg](http://forum.iobroker.net/download/file.php?id=4058&t=1)](img/file.php_id_4058_mode=view)</div>

Passwort für Benutzer: Euer Benutzer-Passwort

<div class="attachcontent">[![Aufnahme106.jpg](http://forum.iobroker.net/download/file.php?id=4059&t=1)](img/file.php_id_4059_mode=view)</div>

Benutzer-Passwort wiederholen: Nochmal euer Benutzer-Passwort

<div class="attachcontent">[![Aufnahme107.jpg](http://forum.iobroker.net/download/file.php?id=4060&t=1)](img/file.php_id_4060_mode=view)</div>

<div class="attachcontent">Zeitzone: Wir wählen **BERLIN**

<div class="attachcontent">[![Aufnahme108.jpg](http://forum.iobroker.net/download/file.php?id=4061&t=1)](img/file.php_id_4061_mode=view)</div>

Festplatte Partitionieren 1: Wir wählen **GEFÜHRT - VOLLSTÄNDIGE FESTPLATTE VERWENDEN**

<div class="attachcontent">[![Aufnahme109.jpg](http://forum.iobroker.net/download/file.php?id=4062&t=1)](img/file.php_id_4062_mode=view)</div>

Festplatte Partitionieren 2: Wir wählen unsere Festplatte aus

<div class="attachcontent">[![Aufnahme110.jpg](http://forum.iobroker.net/download/file.php?id=4063&t=1)](img/file.php_id_4063_mode=view)</div>

Festplatte Partitionieren 3: Wir wählen **ALLE DATEIEN AUF EINE PARTITION, FÜR ANFÄNGER EMPFOHLEN**

<div class="attachcontent">[![Aufnahme111.jpg](http://forum.iobroker.net/download/file.php?id=4064&t=1)](img/file.php_id_4064_mode=view)</div>

Festplatte Partitionieren 4: Wir wählen **PARTITIONIERUNG BEENDEN UND ÄNDERUNGEN ÜBERNEHMEN**

<div class="attachcontent">[![Aufnahme112.jpg](http://forum.iobroker.net/download/file.php?id=4065&t=1)](img/file.php_id_4065_mode=view)</div>

Festplatte Partitionieren 5: Wir wählen **JA**

<div class="attachcontent">[![Aufnahme113.jpg](http://forum.iobroker.net/download/file.php?id=4066&t=1)](img/file.php_id_4066_mode=view)</div>

<div class="attachcontent">Paket-Manager Konfigurieren 1: Wir wählen **DEUTSCHLAND**</div>

<div class="attachcontent">[![Aufnahme115.jpg](http://forum.iobroker.net/download/file.php?id=4067&t=1)](img/file.php_id_4067_mode=view)</div>

Paket-Manager Konfigurieren 2: Ich wählte **ftp.de.debian.org**

<div class="attachcontent">[![Aufnahme116.jpg](http://forum.iobroker.net/download/file.php?id=4068&t=1)](img/file.php_id_4068_mode=view)</div>

Paket-Manager Konfigurieren 3: kann man frei lassen und auf **WEITER** gehen

<div class="attachcontent">[![Aufnahme118.jpg](http://forum.iobroker.net/download/file.php?id=4069&t=1)](img/file.php_id_4069_mode=view)</div>

Populary-Contest: Ich wählte **NEIN**

<div class="attachcontent">[![Aufnahme119.jpg](http://forum.iobroker.net/download/file.php?id=4070&t=1)](img/file.php_id_4070_mode=view)</div>

Softwareauswahl: Wir wählen **SSH SERVER & STANDARD-SYSTEMWERKZEUGE** den rest wählen wir ab (falls angewählt)

<div class="attachcontent">[![Aufnahme120.jpg](http://forum.iobroker.net/download/file.php?id=4071&t=1)](img/file.php_id_4071_mode=view)</div>

GRUB-Bootloader 1: wir wählen **JA**

<div class="attachcontent">[![Aufnahme121.jpg](http://forum.iobroker.net/download/file.php?id=4072&t=1)](img/file.php_id_4072_mode=view)</div>

GRUB-Bootloader 2: wir wählen unsere HDD **/dev/sda (ata-Vbox.........)**

<div class="attachcontent">[![Aufnahme122.jpg](http://forum.iobroker.net/download/file.php?id=4073&t=1)](img/file.php_id_4073_mode=view)</div>

Installation Abgeschlossen:

<div class="attachcontent">[![Aufnahme123.jpg](http://forum.iobroker.net/download/file.php?id=4074&t=1)](img/file.php_id_4074_mode=view)</div>

Nun rebootet sich das System und wir landen im Login</div>

<div class="attachcontent">

<div class="postbody">Login:

<div class="attachcontent">[![Aufnahme124.jpg](http://forum.iobroker.net/download/file.php?id=4075&t=1)](img/file.php_id_4075_mode=view)</div>

Wir loggen und mit unseren Root Account an: **Login:** root **Password:** EUER VERGEBENES PASSWORT

<div class="attachcontent">[![Aufnahme125.jpg](http://forum.iobroker.net/download/file.php?id=4076&t=1)](img/file.php_id_4076_mode=view)</div>

Nun updaten wir das System:

<div class="codecontent">

<pre>apt-get install update</pre>

</div>

<div class="codecontent">

<pre>apt-get install upgrade</pre>

</div>

Da SUDO nicht installiert ist, machen wie dies:

<div class="codecontent">

<pre>aptitude install sudo</pre>

</div>

Es folgt die NPM Installation:

<pre class="codecontent">apt-get install npm</pre>

Dann Installieren wir CURL:

<pre class="codecontent">apt-get install curl</pre>

Vorbereitung und Installation von NodeJs

<pre class="codecontent">curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -</pre>

<pre class="codecontent">apt-get install nodejs</pre>

Wenn das erledigt ist, erfolgt die Installation von ioBroker Zuerst erstellen wir das Verzeichnis iobroker:

<pre class="codecontent">mkdir /opt/iobroker</pre>

Wir wechseln in das Verzeichnis iobroker:

<pre class="codecontent">cd /opt/iobroker</pre>

Nun Installieren wir iobroker:

<pre class="codecontent">npm install --unsafe-perm iobroker</pre>

Am ende der Installation sollte folgendes erscheinen:

<div class="attachcontent">[![Aufnahme137.jpg](http://forum.iobroker.net/download/file.php?id=4077&t=1)](img/file.php_id_4077_mode=view)</div>

--- Wer möchte kann sich noch htop installieren Ich nutze es im im Terminal mir die Speicherauslastung / CPU Last etc. anzusehen. Installiert wird dies mit:

<pre class="codecontent">apt-get install htop</pre>

ausgeführt wird es mit:

<pre class="codecontent">htop</pre>

Und sieht wie folgt aus:

<div class="attachcontent">[![Aufnahme139.jpg](http://forum.iobroker.net/download/file.php?id=4078&t=1)](img/file.php_id_4078_mode=view)</div>

</div>

<div class="attachcontent">Ich hoffe einigen Einsteigern die Einrichtung einer VM inkl. ioBroker erleichtert zu haben. Bei mir hat die Installation von ioBroker in einer VM öfters fehlgeschlagen, auf dem BananaPi lief sie ohne Probleme durch. Diese Installationsroutine hat bei mir auf der VM jedenfalls wunderbar fonktioniert.</div>

## Ergänzung:

### **VirtualBOX VM automatisch starten (Ubuntu 16.10):**

[https://www.freesoftwareservers.com/ind ... nd-vbox-5/](https://www.freesoftwareservers.com/index.php/2015/10/24/autostart-virtualbox-vm-headless-with-upstart-script-ubuntu-server-and-vbox-5/) Datei erstellen:

<pre class="codecontent">sudo nano /etc/init.d/StartVM && sudo chmod +x /etc/init.d/StartVM && sudo update-rc.d StartVM defaults 99 01</pre>

Dateiinhalt:

<dl class="codebox">

<dt>

<pre class="codecontent">#! /bin/sh
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
sudo -u $VMUSER VBoxHeadless --startvm $VMNAME &
sudo -u $VMUSER VBoxHeadless --startvm $VMNAME2 &
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

exit 0</pre>

</dt>

</dl>

### Die 3 Variablen anpassen! (ggf. die 3\. Variable auskommentieren oder weitere hinzufügen, je nach VM-Instanzen)

Im BIOS (falls es auf einem Rechner läuft) einstellen, dass bei Stromausfall der alte ON/OFF-Status wiederhergestellt werden soll. Bei Stromausfall startet er dann neu, und die VM startet anschließend ebenfalls. **Sicherungen mit VirtualBOX und Back in Time anlegen** In VirtualBOX kann man ganz einfach manuell Sicherungspunkte anlegen. Es dauert nur wenige Sekunden und 1 Klick. **Immer vor einem iobroker Update oder Skriptänderungen machen!**

<div class="attachcontent">[![Bildschirmfoto vom 2016-04-26 22-48-04.png](http://forum.iobroker.net/download/file.php?id=4214&t=1)](http://forum.iobroker.net/download/file.php?id=4214&mode=view)</div>

Mit einem Klick kann man die Vorgängerversion wiederherstellen. Speicherverbrauch: eine dynamische VM mit 10 GB und Ubuntu 16.10 Full + iobroker belegt ca. 1,7 GB Speicherplatz. Meine 11 Snapshots belegen 8,6 GB. Meinen ganzen persönlichen Bereich inkl. des VirtualBOX VM Verzeichnisses kopiere ich jede Nacht mit dem Programm "Back in Time" automatisch auf eine 2\. Festplatte. Dort werden mehrere Versionen vorgehalten und automatisch gelöscht nach bestimmten Zeiten.

<div class="attachcontent">[![Bildschirmfoto vom 2016-04-26 22-55-23.png](http://forum.iobroker.net/download/file.php?id=4215&t=1)](http://forum.iobroker.net/download/file.php?id=4215&mode=view)</div>

<div class="attachcontent">Damit läuft VirtualBox.</div>

</div>

<div class="attachcontent">

<pre class="codecontent">sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms</pre>

Man kann noch ein **Extension Pack** dazuinstallieren, es unterstützt zum Beispiel auch die Anbindung von USB 2.0 oder 3.0 Geräten vom Host auf dem Clienten, Webcam-Durchleitung vom host zum clienten und AES Verschlüsselung. Downloaden kann man es [URL:https://www.virtualbox.org/wiki/Downloads]hier - der 2\. Punkt (Extension Pack)[/url] Diese Datei läd man sich herunter und öffnet sie entweder als Admin oder öffnet und installiert es über VirtualBOX / Globale Einstellungen / Zusatzpakete (VirtualBOX aber als Admin starten). Die Mindesthardwareanforderungen sind sehr gering. Man muss für sich ausknobeln wie es passt. Theoretisch reichen 512 RAM und ein alter Intel-Prozessor. Es sollte zB auf allen Intel NUC Generationen problemlos laufen. Für den Dauerbetrieb ist es natürlich wichtig, einen stromsparenden Host zu haben. Man kann sich heutzutage problemlos kräftige unter-10-Watt-Rechner zusammenbasteln. Es gibt im Internet diverse 10-Watt-PC-Anleitungen. Wichtig ist, dass man möglichst auf eine (eigene) Grafikkarte verzichtet und ein im niederen Lastbereich effizientes Netzteil hat, und kein HighEnd-Mainboard benutzt, denn je mehr Funktionen es hat, desto mehr Chips nuckeln am Strom. Die Intel NUC-Reihe kann ich wirklich für Windows oder Ubuntu empfehlen. Ich zitiere mal meine Signatur:

<div class="quotecontent">`iobroker in einer Ubuntu VM mit VirtualBOX auf einem Intel NUC NUC6i3SYH (i3 Skylake), M.2 SSD, 8 GB RAM, Ubuntu 16.10\. 6-8 W Leerlauf.`</div>

</div>

<div class="quotecontent">In Virtualbox habe ich die Netzwerkkarte der Vm auf "Bridged" gestellt, also dass die VM sozusagen wie ein eigener Computer am LAN-Router hängt. Und die feste IP stellt man ganz normal innerhalb der VM über das installierte Betriebssystem ein. Das kann bei Debian so funktionieren: Terminal:

<pre class="codecontent">sudo nano /etc/network/interfaces</pre>

Dort könnte sowas stehen:

<pre class="codecontent">  auto eth0
allow-hotplug eth0
iface eth0 inet dhcp</pre>

Das änderst du um in (Achtung, die Zahlen auf die eigene Umgebung anpassen)

<pre class="codecontent"> auto eth0
iface eth0 inet static
address 192.168.1.7
netmask 255.255.255.0
gateway 192.168.1.1</pre>

Wobei eth0 der Name des eigenen LAN-Gerätes ist, es wird wahrscheinlich anders heißen in einer VM, bei der Änderung musst du dann die beiden eth0 - Wörter mit den richtigen Namen ersetzen.</div>