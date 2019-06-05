---
title:       "Linux"
lastChanged: "28.03.2019"
---

# ioBroker Installation unter Linux


!> Diese Anleitung gilt NICHT für fertige Images der Webseite!!!

Die Installation-Routine für ioBroker wurde vollständig überarbeitet und einige 
Installations-Probleme (welcher Installationsuser, Autostart, usw.) wurden behoben.

Die Installation erfolgt nun über ein Script, welches zur Laufzeit die benötigten Installationsschritte 
und Softwarepakete. nachlädt. Während der Installation wird ein neuer Benutzer “iobroker” angelegt, 
sowie ein zugehöriges Home-Verzeichnis (/home/iobroker). Ab sofort läuft ioBroker unter dem User 
iobroker und nicht mehr als Root.

Wem das Nachladen eines Skripts zu gefährlich ist der kann das Skript vorher unter 
[diesem Link](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh) prüfen.

Diese Installationsanleitung für ioBroker zeigt die Installation auf Linux am Beispiel vom Raspberry PI 
mit dem System Stretch. Die eigentliche Anleitung zur Installation von nodejs und ioBroker kann 
für nahezu alle anderen Linux-Systeme verwendet werden.

Es kann auf Grund von Abhängigkeiten zu anderen Paketen oder zusätzlichen Installationen 
bei der Installation immer wieder zu Besonderheiten kommen.

Sollten noch Fragen offen sein, diese bitte im Forum posten.

Bei der hier veröffentlichen Anleitung wird bei jedem Kernel Update wenn vorhanden 
auch automatisch die node.js Versionen aktualisiert.

## benötigte Hardware
### Raspberry Pi 2/3, 
oder jede andere beliebige Hardware mit einem gängigen Linux (Debian, Ubuntu, 
usw.), oder auch ein Mac.

Wir raten davon ab, einen Pi 1 als Master einzusetzen. Dieser ist einfach nicht leistungsstark 
genug (500 MB RAM, usw.). Aufgrund der unterschiedlichen Hardware passt diese Anleitung 
ohnehin nicht für einen Pi 1.

Auch ein Pi 2 oder Pi 3 hat nur max. 1 GB RAM. Bei 15 Adapter-Instanzen sollte dieser noch 
ausreichen, aber darüberhinaus kann es knapp werden. Jede Adapter-Instanz benötigt etwa 40 MB 
(und auch schon mal 200MB und mehr) an RAM. Daher sollte man immer die RAM-Auslastung 
im Auge behalten werden, bevor weitere Adapter-Instanzen aktiviert werden – 1 GB RAM sind endlich.

### Netzteil
es ist wichtig ein gutes Netzteil zu haben. Mit schwachem Netzteil sind Stabilitätsprobleme zu erwarten

### Speicherkarte
oder SSD, USB-Stick, usw. (je nach verwendeter Hardware)

## benötigte / wichtige Links
* Download Image: https://www.raspberrypi.org/downloads/raspbian/
* Win32DiskImager: https://sourceforge.net/projects/win32diskimager/  **oder**
* Balena Etcher: https://www.balena.io/etcher/
* Putty: http://www.putty.org/

## Installationsanleitung
### Installation Betriebssystem

* Das gewünschte Basis-Betriebssystem (Raspian Stretch, Ubuntu, Debian, usw.) – je nach verwendeter Hardware installieren.

    Hilfe und Anleitungen zu den jeweiligen Versionen gibt es auf den entsprechenden Supportseiten, 
Youtube, usw.

* NUR wenn root-Zugang per SSH oder sftp unbedingt benötigt wird, **KANN** auch der 
Root Zugang für SSH freigeschaltet werden.

    Wir raten, aus den bekannten Sicherheitsaspekten, davon ab. Für die Installation von ioBroker 
reicht es aus, den Befehl sudo zu verwenden und dem jeweiligen Befehl voran zu stellen.

### Installation Node.js

Die folgende Anleitung ist auch bei einem Downgrade zu verwenden.

Die momentan empfohlene Version ist node 8.x; mit js-controller 1.5.7 auch node 10.x, dann in Schritt 4.1. die “8.x” gegen 10.x” austauschen.

<span style="color:red"> ungerade nodejs-Versionen sind grundsätzlich nicht empfohlen, da es sich um Entwicklerversionen handelt. </span>


1. System-Update: ``sudo apt-get update && sudo apt-get upgrade``

    Je nach verwendetem OS kann das Update auch mittels ``sudo apt update && sudo apt upgrade`` 
ausgeführt werden.

2. Auf bereits vorhandene Versionen von nodejs und npm testen.

    ``node -v``

    ``nodejs -v``

    ``npm -v``

    nur wenn **ALLE** diese Befehle kein Ergebnis bringen (also keine Versionsnummer mehr 
anzeigen) mit Schritt 4. dieses Abschnittes weitermachen, sonst, oder wenn die Version nicht der 
gewünschten entspricht folgendes vorher ausführen:

3. Die existierenden node & node.js Versionen deinstallieren

    ``sudo apt-get --purge remove node``

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4. Node.js neu installieren für Linux und Raspberry 2/3
    
    ``curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -``
    
    ``sudo apt-get install -y build-essential libavahi-compat-libdnssd-dev libudev-dev libpam0g-dev nodejs``

    ``sudo reboot``

    Nach der Installation müssen die Kommandos “node -v” und “nodejs -v” die gleiche 
Versionsnummer zurückgeben.
    
    Falls ``node -v`` eine Fehlermeldung wie “nicht gefunden” erzeugt, dann bitte ein 

    ``sudo ln -s /usr/local/bin/nodejs /usr/bin/node`` an der Konsole ausführen.

    Sind die Versionen unterschiedlich, bitte nochmals den Abschnitt 
[Installation Node.js](install/linux.md#installation-nodejs) abarbeiten

    Als letzte Überprüfung bitte noch die Version von npm mittels ``npm -v`` überprüfen.

    Ergibt dies eine Version < 6, bitte noch mit ``sudo -H npm install -g npm@6`` ein 
npm-Update durchführen

### Installation ioBroker
Die Installation kann mit dem User pi aber auch mit dem User root erfolgen. 

An der Konsole ausführen:

``curl -sL https://iobroker.net/install.sh | bash -``

---

Die Installation erfolgt in 4 Schritten:

``Installing prerequisites (1/4)``

``Creating ioBroker user and directory (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

Zum Abschluss kommt dann noch die Meldung

``ioBroker was installed successfully``
``Open http://localhost:8081 in a browser and start configuring!``

---

ioBroker nun über die angegebene IP im Webbrowser aufrufen: ``http://<IP-Adresse>:8081``
 

**Hinweis:**

mit der Installationsroutine funktionierten Anfang bis Mitte Januar die Befehle:

* iobroker stop
* iobroker start
* iobroker restart
* iobroker status

nicht mehr. Das ist ein Feature von Linux – nicht ioBroker!

statt dessen muss

* sudo systemctl stop iobroker

bzw. die anderen Entsprechungen benutzt werden

Außerdem konnte es zu Rechteproblemen kommen.

 

In diesem Fall bitte den Installations-Fixer anwenden:

``curl -sL https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/fix_installation.sh | bash -``


 

nähere Informationen im Forum:

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-verf%C3%BCgbar
