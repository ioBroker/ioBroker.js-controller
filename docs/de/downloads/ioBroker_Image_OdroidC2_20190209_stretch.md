# ioBroker Image für Odroid C2 mit Stretch 20190209

Dies ist ein Minimal SD-Karten Image für den Odroid C2. Es ist für 4 GB Karten und größer passend. Da es jetzt schon nur gerade auf eine 4 GB-Karte 
passt ist eine 8 GB die empfohlene Mindestgröße. 16GB Karten sind sowieso empfohlen.

!> **ACHTUNG**: Der Odroid C2 ist bei µSD-Karten recht wählerisch. Er mag nur relativ flotte karten. Sollte es nicht auf Anhieb funktionieren, bitte eine andere Karte probieren.

Das Image wird entpackt und anschließend mit Hilfe des Programms  Win32 DiskImager auf die SD-Karte geschrieben. Dazu wählt man die Datei nach 
Anklicken des Ordnersymbols aus und startet mit dem Button Write. Sehr zu empfehlen ist auch Etcher. Dies gibt es für verschiedenen Betriebssysteme.

Das Image enthält Armbian 5.71, basierend auf Debian “Stretch” vom 10.01.2019 nach download von [https://dl.armbian.com/odroidc2/](https://dl.armbian.com/odroidc2/).

Folgende User sind angelegt:
- **User:** `root`,  **Passwort:** 1234
- **User:** `pi`, **Passwort:** `raspberry`

Weiterhin ist node-js v 8.15.0 installiert sowie natürlich iobroker mit dem js-controller nach Stand vom 09.02.2019.

Es sind **nur der admin- und der discovery-Adapter** vorinstalliert und dazu Instanzen angelegt.

-----------------

*Diese Dokumentation spiegelt den Stand bei der Erstellung des Images wieder. Durch Updates kann es zu Änderungen kommen.*

Das Image ist für Deutschland lokalisiert. Bei Nutzung in anderen Umgebungen bitte entsprechend anpassen. (armbian-config; Personal)

## Nach dem ersten Start
Sollte man nach dem ersten Starten des Odroid nicht aufgefordert 
werden ein neues Passwort für den root und einen neuen User 
anzulegen, bitte aus Sicherheitsgründen wie folgt vorgehen:
- Um die volle Größe der Speicherkarte zu nutzen muss man  außerdem das Filesystem mit `sudo /usr/lib/armbian/armbian-resize-filesystem start` 
auf die Größe der SD-Karte anpassen.
- Eventuell liegen bereits Updates zu dem zugrunde liegenden Linux und zu nodejs vor. Um dieses auf den aktuellen Stand zu bringen geht man auf 
der Konsole wie folgt vor: `sudo apt-get update && sudo apt-get upgrade -y`
- Unbedingt das root-Passwort ändern mit `sudo passwd root` Danach das Standardpasswort `1234` eingeben und anschließend ein neues Passwort 
eingeben und im nächsten Schritt bestätigen.
- Das gilt auch für den User `pi`. Dies ändert man mit `sudo passwd pi` Danach das Standardpasswort `raspberry` eingeben und anschließend ein neues 
Passwort eingeben und im nächsten Schritt bestätigen.

Weitere Einstellungen kann man mit dem Konfigurations-Utility durchführen, dass man aufruft mit:

`sudo armbian-config`

Näher Informationen zu diesem Utility unter [https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)

Da zum Zeitpunkt des Downloads bereits einige Zeit seit der Erstellung des Images vergangen sein kann, sollte man als erstes überprüfen, ob bereits Updates zu 
den bereits installierten Adaptern und dem js-controller vorliegen (siehe Reiter Hosts)

Neben der möglichst geringen Größe eines Images ist dies auch der Grund, dass nur wenige Adapter bereits vorinstalliert sind.

In solchen Fällen immer zuerst den js-controller über die Konsole gemäß der Anleitung im Reiter Hosts durchführen, anschließend wenn nötig den Adapter Admin 
und anschließend alle weiteren Adapter.


## Installation von Redis
Diese Images enthalten nicht mehr die Datenbank Redis um die States zu speichern. Bei schwachen Rechnern und geringem RAM erhöht die Verwendung von 
Redis die Performance teilweise erheblich.

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
Host of states DB (file), default[cubie]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```
 
Besonderheiten bei der Installation in einem Multihost-System werden hier beschrieben:

[Hier klicken](config/multihost.md)

Freigabe von redis für den User iobroker
Damit z.B. der backitup -Adapter auch auf redis zugreifen kann, muss dem User dafür das notwendige Recht gegeben werden mit:

`sudo usermod -a -G redis iobroker`