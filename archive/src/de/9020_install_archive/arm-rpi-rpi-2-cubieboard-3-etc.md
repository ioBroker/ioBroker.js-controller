# Installation auf einem ARM-Einplatinencomputer

<span style="color: #ff0000; font-size: 18pt;">**Diese Anleitung ist nicht mehr aktuell. Die aktuelle Version finden Ihr hier.**</span>

<span style="font-size: 18pt;">**[LINK](http://www.iobroker.net/?page_id=3397&lang=de)**</span>



## Einleitung

Die wahrscheinlich verbreitetste Möglichkeit wird die Installation auf einem Einplatinencomputer mit ARM – Prozessor (wie z.B. Raspberry Pi und seine Nachfolger, jedoch auch diverse NAS-Systeme sein. Deswegen wird in der Anleitung darauf auch etwas ausführlicher eingegangen werden. Getestet wurde die Installation auf:

*   Raspberry Pi
*   Raspberry Pi 2
*   Cubieboard 3 (cubietruck)
*   Banana Pi
*   CuBox i4
*   ODROID-U3

* * *

## **ARM-Einplatinencomputer vorbereiten**

Zuerst besorgt man sich eine ausreichend große und schnelle micro-SD-Karte (Class 10). Dann lädt man das passende Image herunter: 

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
 [Image für Cubox](http://www.armbian.com/cubox-i/) 

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
 [Image für BananaPI](http://www.igorpecovnik.com/2014/09/07/banana-pi-debian-sd-image/) 

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
 [Image für Cubietruck](http://www.igorpecovnik.com/2013/12/24/cubietruck-debian-wheezy-sd-card-image/) [

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
 Image für Raspberry Pi oder Raspberry PI 2](http://www.raspberrypi.org/downloads/) (Empfohlen wird RASPBIAN WHEEZY) Die (Micro)-SD Karte wird jetzt am besten mit dem 

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
 [SD Formatter](https://www.sdcard.org/downloads/formatter_4/) mit der Option Size Adjustment „ON“ formatiert. Das Image wird nun entpackt und anschließend mit Hilfe des Programms 

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
[Win32 DiskImager](http://www.heise.de/download/win32-disk-imager-1192033.html) auf die SD-Karte geschrieben. Dazu wählt man die Datei nach anklicken des Ordnersymbols aus. ** Achtung:** Die Voreinstellung zeigt nur _.img-Dateien, diese Einstellung muss bei Images von Igor geändert werden auf *._, da die entpackte Datei eine *.raw-Datei ist. Bei den Images von Igor befindet sich jetzt noch der imagewriter dabei, der findet jedoch nur die *.raw Dateien. Jetzt wird die SD-Karte aus dem PC genommen und in den Einplatinencomputer gesteckt. Dort sollten Tastatur und Maus an die beiden USB-Anschlüsse und ein Monitor an den entsprechenden Anschluß. Weiterhin gehe ich davon aus, dass der LAN-Anschluss genutzt wird. Nun versorgen wir den Einplatinencomputer mit Strom. Dieser bootet jetzt das Betriebssystem von der SD-Karte, was beim ersten mal etwas länger (ca. 1 Minute, später nur wenige Sekunden) dauert. Bei den Images von Igor erscheint auf dem Bildschirm dementsprechend „firstrun“, bei Raspbian erscheint das Programm raspi-config, mit dem auch die weiteren Parameter geändert werden können. Als erstes wird der Speicherplatz auf der SD-Karte erweitert, so dass sie vollständig zur Verfügung steht, bei Igors Images geschieht das automatisch, bei Raspbian wählen wir dazu den Menüpunkt „expand filesystem“. Dann wird das komplette Wheezy konfiguriert. Zwischendurch wird ggf. neu gebooted. Wenn alles fertig ist erscheint das login. Username bei Igors Images ist root und das passwort ist 1234, bei raspbian ist der Username „pi“ und das passwort „raspberry“ Das Passwort MUSS bei Igors images als erstes geändert werden. Da die Installation von ioBroker als root durchgeführt werden muss, muss bei raspbian noch der root-Zugang freigeschaltet werden. Dazu loggen wir uns zunächst als user pi mit dem Passwort raspberry ein. Dann rufen wir auf: `sudo passwd root` Anschließend wird nach einem passwort und dessen Bestätigung gefragt. Danach verlassen wir die Konsole mit `exit` und loggen uns wieder als root ein. **Achtung:** root heißt auch root Bei statischen IPs muss man die Netzwerkparameter noch am Einplatinencomputer einstellen. 

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
[Hier](https://github.com/ioBroker/ioBroker/wiki/ARM---fixe-IP) Ansonsten können wir mit einer Fernkonsole z.B. 

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
[putty](http://www.chip.de/downloads/PuTTY_12997392.html) vom PC aus arbeiten. Putty aufrufen, die IP-Adresse des Einplatinenrechners und Port 22 eingeben und starten. Jetzt haben wir ebenso eine Konsole, wie ansonsten auf dem Rechner selbst. Die Ländereinstellungen (Sprache/Tastaturlayout/Zeitzone) müssen ggf. noch 

![](img/arm-rpi-rpi-2-cubieboard-3-etc_icon_link.png)
[angepasst werden.](http://www.iobroker.net/?page_id=371&lang=de "regionale Einstellungen") Anschließend bringen wir das System auf den neuesten Stand mit den Befehlen: `apt-get update` `apt-get upgrade -y` **Hinweis:** Manche node.js Pakete werden nativ auf dem System gebaut. Damit sie erheblich schneller als nur mit js  unter Debian ausgeführt werden können, noch die build-essentials und python installiert werden müssen: `sudo apt-get install build-essential sudo apt-get install python2.7 ln -s /usr/bin/python2.7 /usr/bin/python` Es kann jedoch dadurch im Moment beim Update von Adaptern zu Problemen führen. Dieses betrifft die Adapter _admin, web, socket.io,_ und _simple-api._Ein [Workaround ](http://forum.iobroker.net/viewtopic.php?f=17&p=9001&sid=c100c6d4ef2dd1a817082cd1eb65d6a1#p8996)wäre den entsprechenden Adapter vor dem Update zu stoppen, das Update durchzuführen und anschließend wieder zu starten.

* * *

## Installation auf Harddisk (Cubietruck, BananaPi, Cubox)

Da es bei einigen SD-Cards bei vielen Schreibzugriffen 
(z.B. der Archivierung vieler Datenpunkte) zu Fehlern im Dateisystem kommen kann, 
bietet es sich bei Einplatinencomputern mit SATA-Anschluß 
(Cubietruck, BananaPi, Cubox) an, das gesamte System auf einer Harddisk zu installieren. 
Igors images bieten dazu ein fertiges Script an. Dieses befindet sich im Ordner /root mit der Bezeichnung sata-install.sh Ist eine mit Ext4 formatierte Festplatte an die SATA Buchse angeschlossen, lässt sich der Rest ganz einfach bewerkstelligen. Wenn wir nicht bereits im Ordner /root sind wechseln wir dahin: `cd /root` Die Datei ist standardmäßig für die Ausführung gesperrt, das ändern wir mit: `chmod +x sata-install.sh` Anschließend führen wir die Datei aus mit: `./sata-install.sh` Nach einer Sicherheitsabfrage läuft die Installation auf der Festplatte jetzt automatisch ab. Nach einem reboot steht die ganze Partition für das weitere Arbeiten zur Verfügung. Die Installation benutzt die erste Partition der Festplatte. Ist nur eine Partition auf der HD steht die gesamte Harddiskt als rootfs zur Verfügung. Als SD-Karte reicht in diesen Fällen eine minimale Größe, da diese nur noch für den Bootvorgang benötigt wird.

* * *

## Vorbereitung der ioBroker Installation

ioBroker benötigt zwingend nodejs. Funktionierend auf ARM-Einplatinencomputern ist die Version 0.10.22, auch wenn es schon neuere Versionen gibt, ist das im Moment die empfohlene Version. Mit anderen Versionen kann es zu Problemen kommen. (jeden Block kopieren (STRG-C in Windows – dann zu putty wechseln – rechte Maustaste klicken und mit Enter bestätigen): `wget http://download.iobroker.net/nodejs0_12_6_armhf.deb` `dpkg -i nodejs0_12_6_armhf.deb` `rm nodejs0_12_6_armhf.deb` Will man eine neuere Version von nodejs installieren, wird die aktuellste Version [von hier](https://github.com/nathanjohnson320/node_arm) installiert mit: `wget http://node-arm.herokuapp.com/node_latest_armhf.deb` `dpkg -i node_latest_armhf.deb` `rm node_latest_armhf.deb` Die soeben installierte Version erfährt man mit `node -v` **Achtung!** Eventuell kann es mit einer neueren Version zu Problemen kommen. Die neueste Version ist nur noch mit Debian Jessie kompatibel! Die letzte Version für Debian Wheezy ist die 0.12.6.

* * *

## Die ioBroker Installation

Dazu den Ordner /opt/iobroker anlegen, dahin wechseln und ioBroker  installieren mit: 
`mkdir /opt/iobroker` 
`cd /opt/iobroker` 
`npm install iobroker --unsafe-perm` 

Die Installation endet mit der Info: 

```
Auto-start was enabled. Write „update-rc.d -f iobroker.sh remove“ to disable auto-start
iobroker is started Go to „http://ip-addr:8081“ to open the admin UI.
```

* * *

## Deinstallation von ioBroker

ioBroker kann restlos entfernt werden mit: 

`update-rc.d iobroker.sh remove` 
`rm /etc/init.d/iobroker.sh` 
`rm /opt/iobroker/* -R` 

In diesem Fall bleibt der Ordner /opt/iobroker bestehen. 
Falls dieser auch noch entefrnt werden soll kann das mit `rmdir /opt/iobroker/` geschehen.