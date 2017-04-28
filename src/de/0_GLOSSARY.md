# Glossar

### js-controller
Hauptprogramm, das zuerst eine Datenbank startet (falls erforderlich) und danach alle Adapter startet und beobachtet , ob diese noch laufen.

### Adapter
Ein Modul oder Treiber für ein Gerät oder Service. ioBroker ist sehr modular aufgebaut. 
Bei ioBroker ist alles ein Adapter: Admin-Oberfläche, Visualisierung, Scripting, ... einfach alles.

### Instanz

### Redis
Eine No-SQL Datenbank. Wird optional benutzt um die Performance zu steigern. Diese Option muss extra eingeschaltete werden.

### Objekt
Ein Objekt in der Datenbank. Es gibt verschiedene Objekte die 
unterschiedliche Dinge beschreiben: Adapter, Host, Instanz, Aufzählung, Zustand(State), Kanal oder Gerät.

Das ist so genannte Meta-Information. 

### Zustand oder State

Ist im einfachsten Falle ein Wert, der den Zustand bzw. Status eines Gerätes beschreibt. Ein einfaches Beispiel: Eine Lampe ist aus, somit hat sie den State: false. Ist die Lampe eingeschaltet hat sie den State true. Statt true/false kann der State auch 1/0 oder on/off sein. Ein State kann aber auch Zahlen, Zeichen oder Zeichenketten (Strings) enthalten. 

### Kanal

### Gerät

### Host

In dem Falle, der Rechner auf dem ioBroker läuft.

### Aufzählung

### Admin

### vis

### CCU

Ist die Smarthome-Zentrale des Herstellers EQ-3. Es gibt 2 Versionen, die CCU1 und das aktuelle Modell CCU2.
Mit der CCU2 können alle Homematic -und HomematicIP-Geräte gesteuert werden. Die CCU1 kann nur mit Homematic-Geräten umgehen.
Homematic-Geräte gibts es in Funk(BidCos) -und auch in Wired-Ausführungen.

### Homematic

siehe CCU

### Raspberry PI

Kreditkartengrosser Einplatinencomputer (entwickelt von der Raspberry PI Foundation). Auf der Platine befinden sich alle Bauteile, die für den Betrieb eines Rechners erforderlich sind (CPU, GPU,RAM etc.). Vorteil gegenüber herkömmlichen Rechnern, ist die minimale Leistungsaufname und die Baugröße. Nachteil: CPU, RAM usw. können nicht getauscht oder aufgerüstet werden. 

### Odroid

Einplatinencomputer ähnlich einem Raspberry PI. Es gibt mehrere Versionen mit unterschiedlicher Hardwareausstattung.

### Cubietruck

