# ioBroker Image für Tinkerboard (S) mit piVCCU  20190813

## Erzeugen einer µ-SD Karte
Dies ist ein All-In-One SD-Karten Image für Homematic mit ioBroker  auf dem Asus Tinkerboard oder Tinkerboard S. 

Das Image wurde auf einem Tinkerboard erzeugt, sollte aber auch auf allen genannten laufen. Es ist für 4 GB Karten 
und größer passend. Eine 8 GB ist jedoch die empfohlene Mindestgröße. 16GB Karten sind sowieso 
empfohlen damit nicht immer die selben Zellen beschrieben werden, was zu einem schnellern Verschleiss der SD-Karte führen würde.

Das Image wird entpackt und anschließend mit Hilfe des Programms Balena Etcher auf die SD-Karte geschrieben. Etcher gibt es für verschiedene Betriebssysteme.

## Bestandteile des Images
Das Image enthält das Raspbian lite, basierend auf Debian 9 “Stretch” vom 03.04.2019 nach download von https://dl.armbian.com/tinkerboard/Debian_stretch_default.7z.

Zusätzlich wurden noch Pakete, die für  einige Adapter notwendig sind, installiert.

Außerdem enthalten ist piVCCU3 vom 19.07.2019 nach Download von  https://www.pivccu.de/images/?dir=piVCCU3

Folgender User ist angelegt:

* User: `pi`,
* Passwort: `raspberry`

Node-js ist in der Version 10.16.2 installiert sowie natürlich iobroker über den installer mit dem js-controller nach Stand des stable Repositories vom 13.08.2019.

Es handelt sich um eine **Minimalinstallation**, die **nur den admin und den discovery-Adapter** enthält. weitere Adapter sowie deren Instanzen müssen noch angelegt und konfiguriert werden.

Das Anlegen  von weiteren Adaptern und deren Instanzen wird [hier](/tutorial/adapter.md) beschrieben.

**Hinweis!**
Die folgende Anleitung wurde nach bestem Wissen mit den Informationen zum Zeitpunkt der Erstellung des Images erstellt. Durch Updates von Paketen oder des 
Kernels kann sich da jederzeit etwas ändern.

Das Image ist für Deutschland lokalisiert. Bei Nutzung in anderen Umgebungen bitte entsprechend anpassen. (`sudo raspi-config`; 4.) `Localisation Options`)
 

## Nach dem ersten Start
Sollte man nach dem ersten Starten des Tinkerboards nicht aufgefordert werden ein neues Passwort für den root und einen neuen User 
anzulegen, bitte aus Sicherheitsgründen wie folgt vorgehen:
- Um die volle Größe der Speicherkarte zu nutzen muss man das Filesystem mit `sudo /usr/lib/armbian/armbian-resize-filesystem start` 
  auf die Größe der SD-Karte anpassen.
- Eventuell liegen bereits Updates zu dem zugrunde liegenden Linux und zu nodejs vor. Um dieses auf den aktuellen Stand zu bringen geht 
man auf der Konsole wie folgt vor: `sudo apt-get update && sudo apt-get upgrade -y`
- Unbedingt das root-Passwort ändern mit `sudo passwd root` Danach das Standardpasswort `1234` eingeben und anschließend 
ein neues Passwort eingeben und im nächsten Schritt bestätigen.
- Das gilt auch für den User `pi`. Dies ändert man mit `sudo passwd pi` Danach das Standardpasswort `raspberry` 
eingeben und anschließend ein neues Passwort eingeben und im nächsten Schritt bestätigen.

Weitere Einstellungen kann man mit dem Konfigurations-Utility durchführen, dass man aufruft mit:

`sudo armbian-config`

Näher Informationen zu diesem Utility unter [https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)
 

 

## Systemupdate
Da zum Zeitpunkt des Downloads bereits einige Zeit seit der Erstellung des Images vergangen sein kann, sollte man als erstes das System auf den neuesten Stand bringen.

Um Linux und nodejs auf aktuelle Versionen zu bringen geht man auf der Konsole wie folgt vor:

```sudo apt-get update && sudo apt-get upgrade -y```

Außerdem sollte man überprüfen, ob bereits Updates zu den bereits installierten Adaptern und dem js-controller vorliegen (siehe Reiter Hosts).

Neben der möglichst geringen Größe eines Images ist dies auch der Grund, dass nur wenige Adapter bereits vorinstalliert sind.

In solchen Fällen immer zuerst den js-controller über die Konsole gemäß der Anleitung im Reiter Hosts durchführen, anschließend wenn nötig den Adapter Admin und anschließend alle weiteren Adapter.


## Installation von Redis
Diese Images enthalten nicht mehr die Datenbank Redis um die States zu speichern. Bei schwachen Rechnern und geringem RAM erhöht die Verwendung von Redis 
die Performance teilweise erheblich. Bei schnelleren Rechnern reduziert es die Schreibzugriffe und verlängert so das Leben der SD-Karte.

Sollte Redis installiert werden sollen muss bei den aktuellen Images wie folgt vorgegangen werden.

### Installation des Redis-Servers
Nach dem Befehl:

`sudo apt install redis-server`

Ist der Redis-Server bereit und steht unter Port 6379 zur Verfügung

### Umstellen der States auf Redis
Die Nutzung von Redis zur Speicherung der States in ioBroker muss dies in der Konsole konfiguriert werden mit:

`iobroker setup custom`

In dem nun folgenden Dialog wird wie folgt eingegeben (Achtung in der 4. Zeile) :

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```
 
Besonderheiten bei der Installation in einem Multihost-System werden hier beschrieben:

[Hier klicken](config/multihost.md)

Freigabe von redis für den User iobroker
Damit z.B. der backitup -Adapter auch auf redis zugreifen kann, muss dem User dafür das notwendige Recht gegeben werden mit:

`sudo usermod -a -G redis iobroker`

## Das installierte piVCCU3
In diesem Image ist ebenfalls eine virtualisierte CCU3 installiert, die es ermöglicht ohne weitere separate Hardware Homematic und HM-IP Geräte zu steuern. 
Lediglich das Funkmodul HM-MOD-RPI-PCB oder RPI-RF-MOD muss dazu auf die Stifleiste des Raspberry-Pi aufgesteckt werden.

Die piVCCU erhält vom DHCP-Server eine andere IP-Adresse als der RaspberryPi selber. Diese erhält man mit dem Befehl `sudo pivccu-info`

Ruft man diese IP-Adresse auf kann man sich auf der Oberfläche der CCU3 anmelden.
