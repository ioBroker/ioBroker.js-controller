# Installation unter Windows



## Allgemeine Hinweise

ioBroker wird unter Windows als Windows-Dienst ausgeführt. Damit ist sichergestellt, daß er als Service läuft und z.B. bei einem Neustart des Systems automatisch wieder gestartet wird. ioBroker verwendet _Node.js_ als Plattform und setzt diese voraus. (Download: _http://nodejs.org/download/_)

* * *

## Automatische Installation

Am einfachsten kann ioBroker über die Installationsroutine von Bluefox installiert werden. 
![](img/windows_icon_link.png)
[Downloadseite](http://www.iobroker.net/?page_id=2283&lang=de) Die Installationsroutine benötigt eine aktive Internetverbindung. Sie installiert zuerst _node.js_, anschliessend wird ioBroker installiert, als Dienst eingerichtet und gestartet. Nach der Installation steht die ioBroker-Administrationsseite unter `http://localhost:8081 `zur Verfügung. Manche Adapter brauchen für die Installation Kompilierung-Umgebung. Das konnte mit dem Kommando: `c:\>cd iobroker c:\>npm install --global --production windows-build-tools ` installiert werden. Das Paket kann nur aus Konsole als Administrator installiert werden.

* * *

## Manuelle Installation

Alle Schritte, die von der Installationsroutine - der automatischen Installation - durchgeführt werden, können auch manuell ausgeführt werden: Zuerst muss _node.js_ auf dem System installiert werden (Download: _http://nodejs.org/download/_) Dann erstellt man sich einen Zielordner für die ioBroker-Installation, startet eine Eingabeaufforderung mit Administratorrechten, wechselt dort in den Zielordner und ruft dann auf: `npm install iobroker` `npm install iobroker.js-controller` Nun kann man unter Dienste ioBroker starten und die ioBroker-Administrationsseite steht unter `http://localhost:8081` zur Verfügung.

* * *

## Befehle für ioBroker im Terminal (im Installationsverzeichnis)

*   `./iobroker start` - startet ioBroker
*   `./iobroker stop` - beendet ioBroker
*   `./ioBroker restart` - führt einen Neustart durch
*   `./iobroker backup` - erstellt ein Backup von ioBroker
*   `./iobroker add _adaptername_` - erstellt eine (weitere) Instanz des Adapters _adaptername_
*   `./iobroker update` - sucht nach möglichen Updates der installierten Adapter
*   `./iobroker upgrade` - bringt alle installierten Adapter auf den neuesten Stand