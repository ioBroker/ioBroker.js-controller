# ioBroker Image für Raspberry Pi2/3/4 Buster 20190723

## Erzeugen einer µ-SD Karte
Dies ist ein SD-Karten Image für den Raspberry Pi2, Pi3, Pi3 B+ oder Pi4. 

Das Image wurde auf einem Raspberry Pi4 mit 2GB RAM erzeugt, sollte aber 
auch auf allen genannten laufen. Es ist für 4 GB Karten und größer passend. Eine 8 GB ist jedoch die empfohlene Mindestgröße. 16GB Karten sind sowieso empfohlen damit nicht immer die selben Zellen beschrieben werden.

Das Image wird entpackt und anschließend mit Hilfe des Programms Balena Etcher auf die SD-Karte geschrieben. Etcher gibt es für verschiedene Betriebssysteme.

## Bestandteile des Images
Das Image enthält das Raspbian lite, basierend auf Debian 10 “Buster” vom 10.07.2019 nach download von http://www.raspberrypi.org/downloads.

Zusätzlich wurden noch Pakete, die für  einige Adapter notwendig sind, installiert.

Folgender User ist angelegt:

* User: `pi`,
* Passwort: `raspberry`

Node-js ist in der Version 10.16.0 installiert sowie natürlich iobroker über den installer mit dem js-controller nach Stand vom 23.07.2019.

Es handelt sich um eine **Minimalinstallation**, die nur den admin und den discovery-Adapter** enthält. weitere Adapter sowie deren Instanzen müssen noch angelegt und konfiguriert werden.

Das Anlegen  von weiteren Adaptern und deren Instanzen wird [hier](/tutorial/adapter.md) beschrieben.

**Hinweis!**
Die folgende Anleitung wurde nach bestem Wissen mit den Informationen zum Zeitpunkt der Erstellung des Images erstellt. Durch Updates von Paketen oder des 
Kernels kann sich da jederzeit etwas ändern.

Das Image ist für Deutschland lokalisiert. Bei Nutzung in anderen Umgebungen bitte entsprechend anpassen. (`sudo raspi-config`; 4.) Localisation Options)
 

## Nach dem ersten Start
Nach dem ersten Starten des Rapberry Pi bitte mit `sudo raspi-config` folgende Einstellungen vornehmen:

Punkt 1: `Change User passwort` (Eigenes Passwort für den User `Pi` vergeben)
Punkt 2: `Network Options – Hostname` (Namen des Raspberry Pi ggf. ändern. Vorgabe ist `ioBroker-Pi`)
wenn der Hostname geändert wird, bitte anschließend in der Konsole im Installationsverzeichnis `iobroker host this` eingeben
Punkt 7: `Advanced Options – Expand filesystem` (Erweitern des root-filesystems bis zur maximalen Größe der verwendeten SD-Karte)
ggf. noch unter Punkt 4: `Localisation Options` Anpassungen vornehmen. Die Voreinstellungen gelten für Deutschland
 

 

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