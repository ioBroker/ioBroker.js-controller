---
title:       "Architektur"
lastChanged: "13.09.2018"
---

# Systemaufbau

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc),
   damit die Änderungen einfacher übernommen werden können.

## Architektur

ioBroker ist modular, d.h. aus vielen einzelnen Komponenten aufgebaut. Jedes Modul hat eine spezifische Aufgabe. Um den Überblick zu behalten, besitzt ioBroker deshalb einen zentralen Koordinator für alle seine Module. Dieser Koordinator ist der im Hintergrund arbeitende `js-controller`. Er ist zuständig für die zentrale Datenhaltung sowie Management und Kommunikation zwischen allen Modulen. Die Module selbst werden  `Adapter` genannt. Adapter werden vom Anwender
nur bei Bedarf installiert. Die webbasierte Administrationsoberfläche `admin` ist selbst auch ein
Adapter. Der Admin-Adapter oder kurz "Admin" ist die Managementoberfläche eines ioBroker-Systems. Der Admin wird in der Regel mit der Adresse [http://localhost:8081](http://localhost:8081) aufgerufen.

Wenn ein neuer Adapter mit dem Admin installiert wird, werden zuerst die Adapterdateien aus dem Internet geladen und auf die Server-Festplatte geschrieben. Soll ein Adapter gestartet werden, wird zuerst eine `Instanz` des Adapters erzeugt. Jede Adapterinstanz kann individuell konfiguriert und unabhängig mit dem Admin gestoppt und gestartet werden. Deshalb läuft jede Instanz in einem eigenen Prozess, der im Hintergrund mit dem ioBroker js-controller kommuniziert.

In einem `Multihost`-System mit mehreren ioBroker-Servern können Instanzen von Adaptern auch auf verschiedenen Servern verteilt werden. Dadurch kann die Last verteilt oder direkt vor Ort zusätzliche Hardware angebunden werden (z.B. IO-Ports, USB).

Die Kommunikation zwischen Adaptern, js-controller, Datenbanken und Webfrontends erfolgt über mehrere TCP/IP-Verbindungen. Der Datenaustausch erfolgt je nach gewählter Einstellung entweder im Klartext oder verschlüsselt.

ioBroker und Adapter sind vorwiegend in der Programmiersprache JavaScript geschrieben. Zur
Ausführung von JavaSript benötigt man eine entsprechende Laufzeitumgebung. ioBroker setzt deshalb
auf `Node.js` auf. Diese Laufzeitumgebung gibt es für verschiedenste Softwareplattformen wie Linux, Windows und macOS. Zur Installation von ioBroker und den Adaptern wird der JavaScript-Paketmanager `npm` genutzt.

@@@ Hübsches Bild mit Architekturschichten @@@
@@@ JS-Controller erklären und Überleitung zu Adapter & Instanzen @@@
