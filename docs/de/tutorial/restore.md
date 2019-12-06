---
title:       "ioBroker Restore ausführen"
lastChanged: "03.12.2019"
---

# Grundlagen
Wie wird ein Restore der ioBroker Installation auf einem Linux-System richtig durchgeführt?

### Vorwort:
Da sich einige User mit einem Restore sehr schwer tun, soll hier eine Schritt für Schritt Anleitung für den Restore nach einem Crash, oder auch nach einem 
Hardwarewechsel, Systemwechsel oder sonstiges helfen.

Grundsätzlich kann man im Vorfeld aber eines sagen: ein Restore ist bei richtiger Ausführung in wenigen Minuten erledigt und niemand braucht davor Angst zu haben.

Am Ende sind alle Daten wieder vorhanden und ein neues System wurde aufgesetzt.

### Vorbereitung:

Für die Vorbereitung ist eine lauffähige ioBroker Installation zwingend notwendig.

Um dies hinzubekommen, gibt es 2 Wege.
Entweder ein fertiges Image aus dem [Downloadbereich](https://www.iobroker.net/#de/download) nehmen,  ein eigenes Linux OS aufsetzen und ioBroker nach dieser 
[Anleitung](https://www.iobroker.net/#de/documentation/install/linux.md) installieren.

### nächster Schritt

Wenn das alte System die States und/oder Objekte in Redis gespeichert hatte, muss zuerst auch das neue System mit dem Redis-Server ausgestattet werden.

Sollte es nicht sicher sein, ob  Redis verwendet wurde und noch Zugriff auf das alte System bestehen, dann mit dem Befehl `iobroker status` die benötigten Informationen abrufen“
Die Ausgabe sieht bei einer Verwendung von Redis wie folgt aus:

```
iobroker is running on this host.

At least one iobroker host is running.

Objects type: redis
States  type: redis
```

Steht in Objects type und/oder States type "redis", müsst ihr zwingend auf dem neuen System den Redis Server installieren.
Steht hingehen bei beiden Typen "file", wird der Redis Server nicht benötigt.

Solltet ihr keinen Zugriff mehr auf das alte System haben und ihr wisst nicht, was da vorher genau konfiguriert war, dann installiert auf jeden Fall den Redis-Server im Vorfeld.

####  Redis installierten:
Dafür per Putty in das Terminal  gehen und folgende Befehle ausführen:

```
sudo apt-get update
sudo apt-get install redis-server
sudo usermod -a -G redis iobroker
sudo reboot now
```
Als nächstes sollte man den Installer Fix mal durchlaufen lassen, falls irgendwo noch nicht alle Rechte auf dem System passen sollten.
Dieser Schritt ist nur eine Empfehlung und ist nicht zwingend notwendig.

```
curl -sL https://iobroker.net/fix.sh | bash –
```

Mit dem kleinen Tool "htop" kann man sehr gut alle laufenden Prozesse einsehen, was nicht nur für den restore Interessant sondern generell sehr nützlich sein kann.
dieses wird wie folgt installiert:

In der Konsole den folgenden Befehl ausführen:

```
sudo apt-get install htop
``` 

Nachdem dies erfolgt ist, kann es zu dem eigentlichen Restore kommen.

### Restore:

Hier gibt es auch 2 Möglichkeiten:

#### **1. Automatischer Restore mit Backitup**

Da hier keinerlei Linux Kenntnisse erforderlich, und das Ganze über die Weboberfläche von Iobroker erfolgt zuerst die Variante des automatischen Restore mittels 
[Backitup](https://github.com/simatec/ioBroker.backitup/blob/master/README.md) .

Dazu muss der Adapter Backitup installiert werden.
Dies geschieht über den Reiter "Adapter". Dort nach Backitup suchen und über das (+) eine Instanz installierenn.

Ist die Installation abgeschlossen, legt ihr euer zuvor vom alten System erstelltes „ioBroker Backup“ auf eurem neuen System mit einem sftp Programm wie zum Beispiel 
FileZilla oder WinSCP in dem Pfad /opt/iobroker/backups ab.

Backitup kann auch eine Restore vom NAS, Dropbox oder Google Drive ausführen, aber die lokale Variante birgt am wenigsten Möglichkeiten für Probleme.

Wenn bereits Erfahrungen mit dem mounten vom NAS vorliegen, kann dies auch gerne genutzt werden,zumal man dann auch direkt auf das bestehende Verzeichnis der alten Installation zugreifen kann.
Diese Tutorial bezieht sich aber auf ein lokal gespeichertes Backup.

Wenn ioBroker Backup erfolgreich abgelegt wurde, wird jetzt Backitup geöffent und der Tab „Wiederherstellen“ geöffnet.
Dort die „Backup-Quelle“ auf Lokal stellen und im Anschluss speichern.

![Restore Tab](media/restore/1575301096581-restoretab.jpg) 

Wenn ALLE  Instanzen nach dem Restore automatisch starten sollen, muss dafür die Option „Start aller Adapter nach dem Restore“ aktiviert und im Anschluss gespeichert werden.
Sollte das Backup auf einem anderen Host wiederhergestellt werden, sollte diese Option nicht genutzt werden, da vor dem Start der einzelnen Instanzen die IP-Adressen gegebenenfalls angepasst werden müssen.

Nach dem Speichern können über den Button „Backups abrufen“ die vorhandenen Backups auf dem lokalen Pfad abgerufen werden.

Das gerade per FTP kopierte Backup sollte in der Liste unter „iobroker“ auftauchen.
Dieses nun auswählen.

![Auswahl Backups](media/restore/1575301146928-restoreliste.jpg) 

Nach der Auswahl gibt es einen Hinweis, dass iobroker für den Restore gestoppt und im Anschluss wieder gestartet wird.

![Start Restore](media/restore/1575301175231-restorestart.jpg) 

Hier habt ihr den eigentlichen Wiederherstellungsvorgang gestartet.

![Restore läuft](media/restore/1575301208033-restore.jpg) 

Dies kann je nach Leistung des Systems und Größe der alten ioBroker Installation etwas Zeit brauchen.
Im Normalfall sollte der restore nach ca. 10-15 Minuten erledigt und ioBroker wieder gestartet sein.

![Restore fertig](media/restore/1575301228008-restorefinish.jpg) 

Falls sich die Anzeige nicht ändert,  ab und an mal das Browserfenster mit F5 aktualisieren.

In ganz seltenen Fällen kommt es vor, dass ioBroker nicht automatisch nach Restore startet.
Falls dies der Fall oder nicht sicher ist, ob der Restore noch läuft,kann man mit dem installierten Tool htop schauen, ob der Restore noch läuft, oder bereits beendet ist.
Dafür gebt im Terminal einfach ```htop``` eingeben. Die Ausgabe sollte dann in etwa so ausschauen.

![htop](media/restore/1575363981959-htop.jpg) 

In den Prozessen, die von htop angezeigt werden darf **keiner** der im Bild markierten Prozesse mehr vorhanden sein.
Sollte dies der Fall sein, dann htop mit "F10" beenden und über das Terminal folgenden Befehl ausführen.

```
iobroker start
```
Nun sollte  ioBroker wieder starten und  im Reiter „Log“ ist zu sehen, dass alle Adapter, die auf dem alten System installiert waren, gerade neu vom npm installiert werden.

Hier muss jetzt ein wenig Geduld aufgebracht werden und iobroker einfach machen lassen.
In den Instanzen kann man sehen, welche Adapter so nach und nach installiert sind.
Alle Adapter die noch bei der Installation bzw. in der Warteschleife sind, haben noch kein Icon in den Instanzen.
IoBroker bitte nicht neu starten, höchstens ab und zu die Ansicht mit F5 aktualisieren bis alle Instanzen mit einem Icon versehen sind.

Je nach Größe der Installation und Geschwindigkeit eures Rechners und der Internetverbindung kann dies locker 2-3 Stunden dauern.

Herzlichen Glückwunsch, nunist das neu installierte System mit allen Einstellungen, Skripten, Visualisierungen usw.  fertig.

Mit Backitup besteht jetzt noch die Möglichkeit weitere Daten wiederherzustellen, falls diese im Vorfeld auch auf dem alten System gesichert wurden.
Ihr könnt die Redis-Datenbank, die Zigbee-Datenbank, die mySql-Datenbank und eure History-Daten mit den gleichen Schritten, wie oben beschrieben wiederherstellen.

Die Liste der abgerufenen Backups würde dann wie hier im Beispiel aussehen.

![komplette Liste](media/restore/1575362131512-fullliste.jpg) 

*****************************************************************************************************************************************

#### **2. manueller Restore mit den Terminal Befehlen**

Als erstes müssen über Putty oder ähnliches ein paar Befehle abgesetzt werden.

Zuerst muss ein Backup-Ordner erstellt werden:

```
sudo mkdir /opt/iobroker/backups
```
Auch hier wird im Anschluss mit einem sftp Programm wie z.B. FileZilla oder WinSCP das auf dem alten System erstellte Backup und gegebenenfalls auch Redis Backup, zigbee Backup usw. 
in den Ordner /opt/iobroker/backups abgelegt.

Wenn States und Objekte in der Redis DB gespeichert waren, sollte hier zuerst die gesicherte Redis Datenbank wiederherstellt werdeen. 
Wenn lediglich die States unter Redis liefen, muss dies nicht zwingend im Vorfeld sein.

Ist dies erfolgt, führt stoppt ihr euren ioBroker wie folgt:

```
iobroker stop
```
Im Anschluss bitte prüfen, ob alles gestoppt ist mit folgenden Befehlen:

```
iobroker status
```

Wenn alle Ausgaben korrekt sind und iobroker gestoppt wurde, kann nun mit folgenden Befehlen der Restore über die Konsole ausgeführt werden:

```
cd /opt/iobroker
iobroker restore <Dateiname eures Backups>
```

!> **Hierbei ist aber ganz wichtig, dass nur ein ioBroker Backup mit dieser Methode wiederherstellt werden kann. 
Ein Redis-Backup, Zigbee-Backup, mySql-Backup, oder die History-Daten kann mit diesem Befehl nicht herstellt werden**.

Hierfür wird Backitup benötigt, da diese speziell mit Backitup erstellt wurden.

Dies kann jetzt je nach System ein paar Minuten dauern. Der Fortschritt wird im Terminal angezeigt.
Wenn der Restore abgeschlossen ist mit folgenden Befehl ioBroker wieder starten:

```
iobroker start
```

Auch hier werden nun alle Adapter einzeln von ioBroker über npm neu installiert.
Dies kann je nach Größe eurer Installation, der Internetgeschwindigkeit und Leistung des Systems eine Weile dauern.
Der momentane Statuskann  im Reiter „Log“ verfolgt werden.

Damit ist es nun geschafft und das System ist neu installiert und alle Einstellungen, Skripte, Visualisierungen usw. wiederhergestellt.

### Fazit:
Grundsätzlich führen beide Varianten zum gleichen Ergebnis.
Wer wenig Erfahrungen mit Terminal Befehlen hat und sich da unsicher fühlt, der ist mit Backitup auf der sicheren Seite.

Wer allerdings genau sehen möchte, was gerade auf seinem System passiert, der sollte die manuelle Variante über die Konsole wählen. Hier sieht man jeden einzelnen Vorgang im Detail im Terminal.
