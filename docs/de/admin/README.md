---
title:       "Admin"
lastChanged: "25.03.2019"
---

# Die Admin-Oberfläche

!> **Wegen des Umfangs der Dokumentation ist dies nur eine Übersicht, ausführliche 
Informationen sind in den Seiten hinterlegt, die über die Überschriften der 
Abschnitte zu den Reitern verlinkt sind. Bitte die Überschriften anklicken.**


Der Adapter Admin dient der Bedienung der gesamten ioBroker-Installation. 
Er stellt ein Webinterface zur Verfügung. Dieses wird unter der 
``<IP-Adresse des Servers>:8081`` aufgerufen.

Dieser Adapter wird direkt bei der Installation von ioBroker angelegt eine manuelle 
Installation ist nicht notwendig

![Der Admin in der Kachelansicht](media/ADMIN_Adapter_Kachel.png)

Über das vom Adapter zur Verfügung gestellte GUI können u.a. folgende 
Funktionen abgerufen werden:

* Eingabe von systemweiten Einstellungen
* Installation weiterer Adapter und Instanzen
* Zugriff auf die Konfiguration der Instanzen
* Zugriff auf Objektübersicht
* Zugriff auf die Zustandsübersicht der Objekte
* Zugriff auf die Administration von Benutzern und Gruppen
* Zugriff auf das Logfile
* Verwaltung der Hosts

Die Adapteransicht teilt sich in drei Bereiche auf:

![Die Struktur des Admin](media/ADMIN_Screen_numbers.png)

1. Menü-Sidebar 
2. Hauptfenster
3. Systemeinstellungen


## Menüpunkte
Die Menüleiste enthält mehrere Menüpunkte. In der Grundinstallation werden diese 
Punkte wie in der Abbildung angezeigt. Über das Dreieck-Icon links oben (1) können 
nach der Installation zusätzlicher Adapter weitere Punkte hinzugefügt oder deaktiviert 
werden um eine bessere Übersicht zu erhalten.

![Menüpunkte](media/ADMIN_Screen01_menuitems_numbers.png)

Über das **X**  (2) kann die Menüleiste mit den Reitern ausgeblendet werden um 
auf mobilen Geräten mehr Platz zu schaffen.

![Menü eingeklappt](media/ADMIN_Screen01_menucollapsed.png)

über das "Burger-Icon" kann die Menüleiste wieder angezeigt werden


Ausführliche Informationen sind in den Seiten hinterlegt, die über die Überschriften 
verlinkt sind.

### [Übersicht](overview.md)
Hier werden alle Seiten mit eigenem Webinterface sowie Informationen zu den 
Hosts angezeigt.

### [Adapter](adapter.md)
Hier werden die verfügbaren und installierten Adapter angezeigt und verwaltet.

### [Instanzen](instances.md)
Hier werden die bereits über den Reiter Adapter installierten Instanzen aufgelistet 
und können entsprechend konfiguriert werden.

### [Objekte](objects.md)
Die verwalteten Objekte Strukturen und Datenpunkte der Geräte, die über Adapter 
eingebunden sind. Hier können Objekte angelegt und gelöscht werden. Über die 
"Pfeil hoch"" und ""Pfeil runter"" Buttons können ganze Objektstrukturen 
hoch- oder runtergeladen werden.

Werden Werte in roter Schrift angezeigt, sind sie noch nicht vom Empfänger 
bestätigt (ack = false).

### [Aufzählungen](enums.md)
Hier werden die Favoriten, Gewerke und Räume aus der Homematic-CCU aufgelistet.

### [Log](log.md)
Hier wird das log angezeigt

Im Reiter Instanzen kann bei den einzelnen Instanzen der zu loggende Loglevel 
eingestellt werden. In dem Auswahlmenü wird der anzuzeigende Mindest-Loglevel 
ausgewählt. Sollte ein Error auftreten, erscheint die Beschriftung des Reiters in roter Farbe.


### [Ereignisse](events.md)
Eine Liste der laufenden Aktualisierung der Zustände.

### [Benutzer](users.md)
Hier können Benutzer angelegt und zu den bestehenden Gruppen hinzugefügt werden.

### [Skripte](scripts.md)
Auf dieser Seite könne eigene Skripte mit javascript, Blocly oder Typescript erstellt werden.

### [Hosts](hosts.md)
Informationen über den Rechner, auf dem ioBroker installiert ist.  Liegt eine neue Version vor, 
erscheint ein Hinweis in diesem Eintrag der Menüleiste.


## Das Hauptfenster
Das Hauptfenster zeigt den jeweils zum ausgewählten Menüpunkt gehörenden Inhalt an.


## [Systemeinstellungen](settings.md) (Schraubenschlüssel-Icon)
In dem sich hier öffnenden Menü werden Einstellungen wie Sprache, Zeit- und 
Datumsformat sowie weitere systemweite Einstellungen getätigt.

Auch die Repositories und Sicherheitseinstellungen können hier eingestellt werden.
