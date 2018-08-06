# Glossar

### Adapter
Ein Modul oder Treiber für ein Gerät, Service oder zur Bereistellung von Daten.
Durch den sehr modularen Aufbau von ioBroker ist quasi alles ein Adapter: Admin-Oberfläche, Visualisierung, Scripting, ...

### Admin
Der Admin-Adapter stellt die Weboberfläche zur Konfiguration von ioBroker bereit Dies umfasst die Installation von Adaptern, erstellen von Instanzen, anlegen und prüfen von Objekten, Zuständen, editieren von Skripten und vielem mehr.

### Aufzählung
englischer Begriff: enum(eration)

Eine Aufzählung ist eine Liste bestimmter Objekte, die zu einer Gruppe zusammengefügt wurden.

### Blockly

Mittels Blockly ist es möglich, mit Hilfe von verknüpfbaren Funktionsblöcken einfache Steuerungen und Skripte grafisch zusammenzubauen. Programmierkenntnisse sind dabei nicht nötig.

Wenn ein Blockly-Skript gespeichert wird, so wird JavaScript Code erzeugt, welcher dann ausgeführt wird.

### CCU
Ist die Homematic Smarthome-Zentrale des Herstellers eQ-3. Es gibt 2 Versionen, die ältere CCU1 und das aktuelle Modell CCU2.

Mit der CCU2 können alle Homematic -und HomematicIP-Geräte gesteuert werden. Die CCU1 kann nur mit Homematic-Geräten umgehen.
Homematic-Geräte gibts es in Funk- und auch in Wired-Ausführungen (drahtgebundener Bus).

### CSS
Cascading Style Sheets. Mittels CSS kann die Darstellung von Webseiten unhabhängig vom Inhalt beschrieben werden. Als Ergänzung zur in HTML definierten Seitenstruktur definiert CSS wie die Seite dargestellt wird.

### Cubietruck/Cubieboard 3
Einplatinencomputer ähnlich wie Raspberry PI/Odroid, aber mit SATA-Interface und 2GB RAM

### Gerät
englischer Begriff: Device

In ioBroker ist ein Gerät häufig die nächste Ebene unter einem Adapter und gruppiert alle Kanäle und Zustände des Gerätes.

### Homematic
Homematic ist ein von eQ-3 hergestelltes und von elv vertriebenes Smart Home System. Siehe auch CCU.

### Host
Der Host ist der Computer/Server auf dem ioBroker ausgeführt wird.

Im Multihost-Modus gibt es mehrere Hosts, einer davon ist der Master, die anderen sind die Slaves

### HTML
Hypertext Markup Language. Eine Seitenbeschreibungssprache (Grundlage des WWW), die dazu dient in Webbrowsern Inhalte (Text, Links, Grafiken, Videos usw.) darzustellen.


### Instanz
Jeder Adapter hat mindestens eine Instanz, es können aber auch mehrere sein. Es gibt Unterschiedliche Gründe warum mehrere Instanzen verwendet werden. Zum Beispiel kann man mit einer zweiten Instanz vom JavaScript Adapter testen, ohne das Risiko eines Ausfalls von wichtigen Skripten zu haben, da im Fehlerfall nur die Test Instanz betroffen ist.

Von den meisten Adaptern können mehrere Instanzen gestartet werden, um die Möglichkeit zu haben, mehrere Geräte gleichen Typs bzw. mit gleichem Protokoll ansprechen zu können. Eine Instanz entspricht einem laufenden Prozess auf dem Host.
Beispiel: 2 Hue-Bridges sollen in ioBroker eingebunden werden. Da pro Adapter aber nur eine Bridge konfiguriert werden kann, wird einfach eine 1. und eine 2. Instanz des Hue-Adapters erstellt und jede Bridge in der entsprechenden Instanz des Adapters konfiguriert.
Durch die Instanzierung lassen sich die Datenpunkte auch einfach auseinanderhalten, da der Objektstruktur der Instanzname voransteht (z.B. hue.0 und hue.1).

### Javascript
Programmiersprache mit der bei ioBroker alles programmiert ist und auch eigene Skripte programmiert werden.

### js-controller
Der js-controller ist der Hauptprozess von ioBroker und stellt die nötige zentrale Basisfunktionalität für alle weiteren Module zur Verfügung. Weiterhin stellt er den Zugriff auf die zentralen Objekts- und Zustandsdatenbanken her, koordiniert alle laufenden Adapter-Instanzen und -Prozesse und überwacht diese. Falls nötig, werden Adapter vom js-controller neu gestartet.

### Kanal
Ein Kanal gruppiert thematisch zusammengehörige Zustände und ist normalerweise unter einem Gerät angesiedelt. Es kann pro Gerät mehrere Kanäle geben.

### Master
Der Master ist der Host, welcher zentral für die Verwaltung aller Instanzen (auch der Instanzen der Slaves!) verwantwortlich ist.
Wenn der Master beendet wird, werden auch die Slave-Instanzen beendet.
Der Master stellt für alle Slaves die zentralen Objekt- und Zustandsdatenbanken zur Verfügung, zu denen sich alle Slaves verbinden.

Weitere Informationen, siehe Multihost-Modus

### Multihost-Modus

Der Multihost-Modus von ioBroker kann zur Verteilung der Steuerungsaufgaben auf mehere Rechner genutzt werden, wenn diese spezielle Schnittstellen benötgen (z.B. Auslesen von Stromzählern im Keller). Weiterhin können mehrere Hosts genutzt werden, um die Last oder den Speicherverbrauch gleichmäßig zu verteilen.
Im Multihost-Modus wird ein Host als Master definiert; alle anderen sind Slaves. Der Master steuert alle Slaves und auch die Verteilung der Instanzen auf die Slaves.

### Node-Red
Grafische Programmieroberfläche bei der fertige Module (Nodes) durch einfache Verkettung (Flow) zu komplexen Programmen verknüpft werden können.

### Objekte und Zustände

Grundsätzliche Definitonen dazu sind unter https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md zu finden

#### Zustand oder State
Ein Zustand enthält den aktuellen Wert eines Datenpunktes in ioBroker.
Zusätzlich beschreibt er den Zeitstempel, den Zeitpunkt der letzten Änderung und die Bestätigung durch den Sender oder Empfänger.

Zustände können in einem JSON-File oder einer Redis-DB gespeichert werden.

#### Objekte
Objekte beschreiben einen Zustand ausführlicher und geben Meta-Informationen, Konfiguration und Beschreibung zu diesem an.
Ein Objekt hat einen Typ, z.B. Host, Adapter, Instanz, Aufzählung, Gerät, Kanal oder Datenpunkt...

Die Meta-Daten definieren auch den Datentyp des States, z.B. number, boolean, string und auch wie der Zustand in Visualisierungsoberflächen dargestellt werden soll.


### Odroid
Einplatinencomputer ähnlich einem Raspberry PI. Es gibt mehrere Versionen mit unterschiedlicher Hardwareausstattung.

### Parser-Adapter
Ein Adapter, das aus Texten egal welcher Herkunft durch Angabe von sog. Regular-Expressions, Teile ausschneidet, die dann in Zustände geschrieben werden können. Diese Werte können dann in Skripten u.ä. weiterverarbeitet werden.

### Raspberry PI
Kreditkartengrosser Einplatinencomputer (entwickelt von der Raspberry PI Foundation). Auf der Platine befinden sich alle Bauteile, die für den Betrieb eines Rechners erforderlich sind (CPU, GPU,RAM etc.). Vorteil gegenüber herkömmlichen Rechnern, ist die minimale Leistungsaufname und die Baugröße. Nachteil: CPU, RAM usw. können nicht getauscht oder aufgerüstet werden.

### Redis
Eine No-SQL Datenbank, die Ihre Daten im Speicher hält und in ioBroker zur Speicherung von Zustandsdaten verwendet werden kann. Wird optional benutzt um die Performance zu steigern, da bei Schreib- und Leseaktionen kein Zugriff auf eine Festplatte, SSD oder SD-Karte nötig sind.
Zur Nutzung einer Redis-DB mit ioBroker muss dies in der js-controller-Grundkonfiguration angegeben werden.

### State
siehe Zustand bzw. Objekte

### vis
Der VIS-Adapter erlaubt es, eigene Bedienungs- und Visualisierungsoberflächen für ioBroker zu erstellen und auf verschiedenen Geräten darzustellen. Die Oberflächen werden hierbei aus anpassbaren Widgets und eigenem HTML-Code zusammengestellt und können per CSS im Aussehen verändert werden.

### Widget
Ein Steuerelement in Vis. Widgets dienen dazu, Zustände anzuzeigen oder zu steuern; zum Beispiel eine Lampe ein -und ausschalten über einen Button, der abhängig vom Schaltzustand sein Aussehen verändert.

