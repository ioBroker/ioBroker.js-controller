---
Title: "ioBroker Grundlagen"
lastChanged: "02.05.2021"
---


ioBroker ist eine reine Softwarelösung um verschiedene IoT-Systeme zu einem  
Gesamtsystem zu verbinden. Demnach wird auch zu jedem System weiterhin eine  
Zentrale (Gateway/Interface) benötigt um dessen Geräte einbinden zu können.

In Sonderfällen kann so eine Zentrale per Software nachgebildet werden, oder als  
Hardware (USB-Stick o.ä.) an den ioBroker Server angesteckt werden.

## Modularität
ioBroker ist modular aufgebaut. Diese Module heißen bei ioBroker ***Adapter***.  
Es gibt über 400 [Adapter] zur Anbindung von diverser Hardware oder Einbindung  
verschiedenster Informationen wie Wetter, Kalender usw.

Daher müssen in einer Installation nur die Adapter installiert werden, die für  
die individuellen Bedürfnisse benötigt werden. Dies spart Speicherplatz und  
Rechenpower.

Zu jedem Adapter werden so genannte ***Instanzen*** erstellt. Dieses sind die  
"Arbeitsversionen" der Adapter. Je nach Adapter können beliebig viele Instanzen  
erzeugt werden um verschiedene Subsysteme oder unterschiedliche Aufgabenbereiche  
voneinander abzugrenzen.

In diesen Instanzen findet die entsprechende Konfiguration statt.

## Architektur
### Server
Eine Besonderheit von ioBroker besteht darin, dass die Aufgaben auch auf mehrere  
Server verteilt werden **können**.  In so einem Fall spricht man von einem  
***Multihost-System***. Gründe für die Aufteilung können räumlicher Art oder  
eine Leistungsverteilung sein.

### Anforderungen an die Hardware
Ein ioBroker Server kann nahezu auf jeder Hardware installiert werden. Einzige  
Bedingung ist, dass es für das entsprechende Betriebssystem eine aktuelle  
Version von [nodejs] gibt.

Für eine größere Installation wird außerdem ein Arbeitsspeicher (RAM) von  
mindestens 2GB empfohlen. Zum Testen reicht ein Raspberry Pi 2/3 mit 1GB RAM,  
als Slave für einzelne Adapter in einer Multihost-Umgebung reichen teilweise  
sogar noch kleinere Kleinrechner.

### Software
ioBroker verwaltet die Daten in einer Datenbank. Dementsprechend ist auch die  
Struktur der Daten organisiert.

Zu jedem Adapter gibt es einen so genannten Namespace, der sämtliche Daten zu  
einer Instanz des Adapters enthält. Dementsprechend lautet der Name des  
Namespaces z.B.: ***AdapterName.0***

Innerhalb dieses Bereiches legt ioBroker die Geräte, deren Kanäle und wiederum  
deren Datenpunkte mit ihren Werten (Zuständen) an.

![Objektstruktur](../admin/media/ADMIN_Objekte_status_tree.png)

in diesem Beispiel handelt es sich um einen selbst angelegten Namespace für  
eigene Messwerte.

[Adapter]: http://download.iobroker.net/list.html
[nodejs]: https://nodejs.org