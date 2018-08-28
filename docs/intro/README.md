---
lastChanged: "28.08.2018"
---

# ioBroker

ioBroker ist ein zentraler Server für Automatisierungsaufgaben rund um Smart Home, der Gebäudeautomatisation sowie Active Assisted Living. ioBroker kann über modulare `Adapter` mit vielen bestehenden Systemen und Geräten kommunizieren. Über Regeln lassen sich Funktionsabläufe herstellerunabhängig erstellen. Mit ioBroker bereitgestellte graphische Oberflächen helfen, die Bedienung bzw. Überwachung von Geräten zu vereinfachen.

Diese Dokumentation ist die zentrale Referenz für alle ioBroker-Anwender:

* Für Einsteiger empfehlen wir, zuerst einige Grundlagen über IOBroker nachzulesen. Dazu mehr im Kapitel [Einführung](#Einführung).
* Erfahrene Anwender finden auf der [Download]()-Seite vorbereitete Images für verschiedene Systeme. Dort stehen auch detailierte Installationsanweisungen für einige Hardwareplattformen bereit.
* Informationen zu allen Adaptern bietet die zentrale [Adapter-Referenz]().
* Die Erstellung von Steuerungsregeln wird im Abschnitt [Logik]() beschrieben. 

Für jede helfende Hand sind wir dankbar. Falls Sie zur Weiterentwicklung von ioBroker betragen möchten, finden Sie Informationen in unsrem [Developer Guide]().

Auch diese Dokumentation wird stetig erweitert. Wenn Sie der Meinung sind, dass etwas fehlt oder besser beschrieben werden sollte, [helfen Sie uns dabei](), die Dokumentation zu verbessern! 

## Einführung

>- [Konzepte]() lesen
>- Im [Installation Guide]() die richtige HW heraussuchen (da müssen Empfehlungen rein, was wir für HW/Docker/Image für was gut finden)
>- Experimente mit raspberry sind einfach
>- [Einsteiger Tutorial]() folgen, dann
>- Detailierte Infos zu den Einstellungen im [Configuration Guide]()
>- Alles zur [Visualisierung]() (VIS,Materialize,habpanel)
>- Regeln anlegen in Javasccript, Blockly oder Node Red mit [Logik]()
>- Hinweis auf die Community

## ioBroker Community

> Wir stellen uns vor  
[Forum]()  
[Blog]()  

## Architektur

ioBroker ist modular, d.h. aus vielen einzelnen Komponenten aufgebaut. Jedes Modul hat eine spezifische Aufgabe. Um den Überblick zu waren, besitzt ioBroker deshalb einen zentralen Koordinator für alle seine Module. Dieser Koordinator ist der im Hintegrund arbeitende `js-controller`. Er ist zuständig für die zentrale Datenhaltung sowie Management und Kommunikation zwischen allen Modulen. Die Module selbst werden  `Adapter` genannt und nur bei 
Bedarf installiert. Die webbasierte Administrationsoberfläche `admin` ist selbst solch ein Adapter. Der Admin-Adapter oder kurz "Admin" ist die Managementoberfläche eines ioBroker-Systems da. Der Admin kann standardmäßig mit der Adresse [http://localhost:8081](http://localhost:8081) aufgerufen werden.

Wenn ein neuer Adapter mit dem Admin installiert wird, werden zuerst die Adapterdateien aus dem Internet geladen und auf die Server-Festplatte geschrieben. Soll ein Adapter gestartet werden, wird zuerst eine `Instanz` des Adapters erzeugt. Jede Adapterinstanz kann individuell konfiguriert und unabhängig mit dme Admin gestoppt und gestartet werden. Deshalb läuft jede Instanz in einem eigenen Prozess, der wieder mit dem ioBroker js-controller kommuniziert. In einem `Multihost`-System mit mehreren ioBroker-Servern können Instanzen von Adaptern auch auf verschiedenen Servern verteilt werden. Dadurch kann die Last verteilt oder direkt vor Ort zusätzliche Hardware angebunden werden (z.B. IO-Ports, USB).

> Hübsches Bild mit Architektur

> Überleitung zu den Konzepten

