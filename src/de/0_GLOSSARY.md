# Glossar

### js-controller
Hauptprogramm, das eine Sammlung von Funkionen für Adapter zur Verfügung stellt. 
Es startet erst eine Datenbank (falls erforderlich) und danach alle freigegebenen Adapter-Instanzen 
und überwacht diese, ob sie noch laufen.

### Adapter
Ein Modul oder Treiber für ein Gerät oder Service. ioBroker ist sehr modular aufgebaut. 
Bei ioBroker ist alles ein Adapter: Admin-Oberfläche, Visualisierung, Scripting, ... einfach alles.

### Instanz
Jeder Adapter hat mindestens eine Instanz, es können aber auch mehrere sein. Es gibt Unterschiedliche Gründe warum mehrere Instanzen verwendet werden. Zum Beispiel kann man mit einer zweiten Instanz vom JavaScript Adapter Testen ohne das Risiko einen Ausfall von Wichtigen Scripten zu haben. Da im Fehlerfall nur die Test Instanz abstürzt.

Die meisten Adapter können mehrfach installiert werden, um die Möglichkeit zu haben, mehrere Geräte gleichen Typs, bzw. mit gleichem Protokoll, ansprechen zu können. Um die Prozesse klar zuordnen zu können, gibt es so genannte Instanzen.
Beispiel: 2 Hue-Bridges sollen in ioBroker eingebunden werden. Da pro Adapter aber nur eine Bridge konfiguriert werden kann, wird einfach eine 1. und eine 2.Instanz des Hue-Adapters installiert und jede Bridge, in der entsprechenden Instanz des Adapters konfiguriert.
Durch die Instanzierung lassen sich die Datenpunkte auch einfach auseinanderhalten, da der Objektstruktur der Instanzname voransteht (z.B. hue.0 und hue.1).

### Redis
Eine No-SQL Datenbank. Wird optional benutzt um die Performance zu steigern. Diese Option muss extra eingeschaltete werden.

### Objekte und Zustände
#### Objekte
Javascript-Objekte in der Datenbank mit definierten Eigenschaften, die unterschiedliche Dinge beschreiben: 
Host, Adapter, Instanz, Aufzählung, Gerät, Kanal oder Datenpunkt... 
Datenpunkte haben noch zusätzlich Zustand (sehe weiter).

Objekte werden in einer Datenbank oder in einer JSON-Datei gespeichert.

Das ist eine so genannte Meta-Information, Konfiguration oder Beschreibung von dem Datenpunkten und Struktur. 

Ein Datenpunkt-Objekt (Typ: 'state') besteht aus einem statischen Teil (.common, .native) 
und einem dynamischen Teil (.state, .oldState), dem aktuellen Zustand. 

Beide Teile werden in getrennten Datenbanken bzw. JSON-Dateien gespeichert.

#### Zustand oder State
Das ist der eigentliche Wert oder Zustand eines Datenpunktes. 

Folgende Arten von Zuständen/States gibt es: boolean, string, number, field, object, mixed. 

Ist im einfachsten Falle ein Wert, der den Zustand bzw. Status eines Gerätes beschreibt. 

Ein einfaches Beispiel: Eine Lampe ist aus, somit hat sie den State: false. 
Ist die Lampe eingeschaltet hat sie den State **true**. 

Statt true/false kann der State auch 1/0 oder on/off sein. Ein State kann aber auch Zahlen, 
Zeichen oder Zeichenketten (Strings) enthalten. 

### Kanal

### Gerät

### Host
Der Host ist der Computer/Server auf dem ioBroker ausgeführt wird.

In dem Falle, der Rechner auf dem ioBroker läuft.

### Aufzählung

### Admin

### vis

Weboberfläche mit der eigene Visualisierungen erstellt werden können (mittels anpassbarer Widgets, eigenem HTML-Code, CSS).

### Widget

Ein Steuerelement in Vis. Widgets dienen dazu, Zustände anzuzeigen oder zu Steuern. Zum Beispiel eine Lampe ein -und ausschalten über einen Button, der abhängig vom Schaltzustand sein Aussehen verändert.

### HTML

Hypertext Markup Language. Eine Seitenbeschreibungssprache (Grundlage des WWW), die dazu dient in Webbrowsern Inhalte (Text, Links, Grafiken, Videos usw.) darzustellen.

### CSS

Cascading Style Sheets. Eine Programmiersprache um die Darstellung von Webseiten unhabhängig vom Inhalt zu beschreiben. Kann als Ergänzung zu HTML angesehen werden. 

### CCU
Die CCU ist die Zentrale des Homematic Systems.

Ist die Smarthome-Zentrale des Herstellers EQ-3. Es gibt 2 Versionen, die CCU1 und das aktuelle Modell CCU2.
Mit der CCU2 können alle Homematic -und HomematicIP-Geräte gesteuert werden. Die CCU1 kann nur mit Homematic-Geräten umgehen.
Homematic-Geräte gibts es in Funk(BidCos) -und auch in Wired-Ausführungen (drahtgebundener Bus).

### Homematic
Homematic ist ein von eQ3 hergestelltes und von elv vertriebenes Smart Home System.

siehe CCU

### Raspberry PI

Kreditkartengrosser Einplatinencomputer (entwickelt von der Raspberry PI Foundation). Auf der Platine befinden sich alle Bauteile, die für den Betrieb eines Rechners erforderlich sind (CPU, GPU,RAM etc.). Vorteil gegenüber herkömmlichen Rechnern, ist die minimale Leistungsaufname und die Baugröße. Nachteil: CPU, RAM usw. können nicht getauscht oder aufgerüstet werden. 

### Odroid

Einplatinencomputer ähnlich einem Raspberry PI. Es gibt mehrere Versionen mit unterschiedlicher Hardwareausstattung.

### Cubietruck

Einplatinencomputer ähnlich wie Raspberry PI/Odroid.

### Javascript

### Node-Red

### Parser

### ioBroker Cloud
Das ist ein [Service](https://iobroker.net) von ioBroker Team um Zugrif aus dem Internet auf ioBroker Gerät zu ermöglichen.  

Dabei braucht man keine Einstellungen am Ruter zu machen. Cloud wird auch für Alexa oder Google Home verwendet. 
