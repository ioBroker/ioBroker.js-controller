# Installationsanleitung für ioBroker mit Cloud Anbindung auf NAS QNAP-453a

# <span style="font-size: 14pt;">(Stand 07.02.2017)</span>



## Vorbereitung

1.  Auf dem NAS die Linux-Station aus dem APP-Store laden und starten
2.  Ubuntu 14.04 installieren und starten
3.  Remote Desktop aktivieren Durch Remote Desktop können Sie über Ihren Webbrowser sehen, was per NAS-HDMI-Ausgang angezeigt wird, wird benötigt um per Weboberfläche auf die Linux-Station zugreifen zu können.
4.  Auf die Linux-Station wechseln, dafür den angezeigten Link verwenden (am besten Link im neuen Tab öffnen)
5.  Mit Administrator anmelden, Login-Name und Passwort sind identisch mit Nas
6.  Aus dem Ubuntu-Software-Center nach ssh suchen
7.  Aus der Liste dann Secure Shell Client und Server (metapackage) auswählen und installieren, dafür ist dann wieder das Administratorpasswort nötig.
8.  Zurück auf die NAS-Oberfläche wechseln
9.  Dort steht in der Linux.Station unter externe Verbindung die Ubuntu-IP-Adresse, diese kopieren und in PuTTY eingeben
10.  Als Administrator anmelden
11.  sudo su (jetzt ist der Root Modus gestartet)
12.  Administrator Passwort eingeben

## Installation Node.js

1.  Kernel Update: sudo apt-get update && sudo apt-get upgrade
2.  Node.js neu installieren
3.  curl –sL https://deb.nodesource.com/setup_4.x | sudo -E bash –
4.  sudo apt-get install –y build-essential python nodejs
5.  reboot
6.  Wieder über PuTTY als Root anmelden, dafür die Schritte 8\. bis 12\. Wiederholen
7.  Nach der Installation muss das Kommando „node –v“ die Version von node.js zurückgeben

## Installation ioBroker

1.  sudo mkdir / opt/iobroker
2.  sudo chmod 777 /opt/iobroker
3.  cd /opt/iobroker
4.  sudo npm install iobroker –unsafe-perm
5.  ioBroker über IP im Webbrowser aufrufen: http://Ubuntu-IP-Adresse:8081

Weiter geht es [HIER](http://www.iobroker.net/?page_id=5219&lang=de#Die_Konfiguration)