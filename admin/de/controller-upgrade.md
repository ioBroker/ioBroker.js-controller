# js-controller Upgrade Anleitung

Aufgrund der verschiedenen Hardware und Platformen unter denen ioBroker läuft, muss der js-controller manuell aktualisiert werden. Weitere Details können dem passenden Abschnitt entnommen werden.

## Generelle Informationen für alle Plattformen

**Für ein Update von js-controller 1.x auf 2.x bitte in jedem Fall die Informationen unter https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im-latest-repo lesen und beachten!**

Ansonsten bitte bei einem Update von Master-Slave-Systemen die Slaves zuerst aktualisieren und den Master als letztes! 

## Linux/macOS (neuer Installer)
Dies ist die Empfohlene Variante!!

Bitte in einer SSH-Shell (Konsole) folgende Befehle ausführen:
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start` oder Server rebooten, danach sollte ioBroker neu starten und man kann sicher sein das alle alten Prozesse beendet waren.

Falls beim Upgrade-Befehl Fehler wegen Zugriffsrechten/Permissions angezeigt werden, dann bitte den Installation-Fixer nutzen (`curl -sL https://iobroker.net/fix.sh | bash -`) um diese Probleme zu beheben und Upgrade-Befehl erneut ausführen.

## Linux/macOS (manuell installiert)

Eine manuelle Installation erfolgt meist unter root als User und daher ist vor den Befehlen ein "sudo" nötig.

Bitte in einer SSH-Shell (Konsole) folgende Befehle ausführen:
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start` oder Server rebooten, danach sollte ioBroker neu starten und man kann sicher sein das alle alten Prozesse beendet waren.

Falls beim Upgrade-Befehl Fehler wegen Zugriffsrechten/Permissions angezeigt werden, müssen diese behoben werden. Teilweise reicht "sudo" nicht aus und man muss die Installation als echter Root (Vorher einfach `sudo su -` eingeben) ausführen.

## Windows (neuer Windows Installer)

In diesem Fall bitte einen aktualisierten Installer von der Download-Seite herunterladen und mit diesem das Update vornehmen.

## Windows (manuell installiert)
Eine manuelle Installation erfolgt meist mit Administrator-Rechten

Bitte in einer Administrator-SSH-Shell (Konsole) folgende Befehle ausführen:
* `cd C:\iobroker` (oder wo ioBroker installiert wurde)
* ?? ioBroker Service stoppen
* `iobroker update`
* `iobroker upgrade self`
* ioBroker Service starten oder Rechner rebooten, danach sollte ioBroker neu starten und man kann sicher sein das alle alten Prozesse beendet waren.

## Notfall (manuelle Reinstallation) (wenn nach dem Update irgendwie nichts mehr tut)
Bitte ins ioBroker Verzeichnis wechseln und dort `npm install iobroker.js-controller` ausführen. Eine bestimmte Version kann mittels `npm install iobroker.js-controller@x.y.z` (x.y.z mit der gewollten Version ersetzen) installiert werden.

Falls es bei der Ausführung zu Problemen mit Zugriffsrechten kommen muss der Befehl leicht abgeändert werden:
* Für Systeme die mit dem neuen Linux-Installer erstellt wurden: `sudo -u iobroker -H npm install iobroker.js-controller`
* Für Systeme die manuell unter Linux installiert wurden ggf `sudo` voranstellen oder als Root ausführen.
* Für Windows-Systeme sollte eine Administrator-Shell ausreichen

Dieser Weg ist nur in sehr wenigen Fällen nötig und vorher bitte das Forum konsultieren!