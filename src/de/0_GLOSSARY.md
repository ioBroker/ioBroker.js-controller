# Glossar

### js-controller
Hauptprogramm, das eine Sammlung von Funkionen für Adapter zur Verfügung stellt. Es startet erst eine Datenbank (falls erforderlich) und danach alle freigegebenen Adapter-Instanzen und überwacht diese, ob sie noch laufen.

### Adapter
Ein Modul oder Treiber für ein Gerät oder Service. ioBroker is sehr modular aufgebaut 
und bei ioBroker ist alles ein Adapter: Admin-Oberfläche, Visualisierung, Scripting, ... einfach alles.

### Instanz

### Redis
Eine No-SQL Datenbank. Wird optional benutzt um Performance zu gewinnen. Diese Option muss extra eingeschaltete werden.

### Objekt
Javascript-Objekte mit definierten Eigenschaften, die unterschiedliche Dinge beschreiben: Host, Adapter, Instanz, Aufzählung, Gerät, Kanal oder Datenpunkt ... Objekte werden in einer Datenbank oder in einer JSON-Datei gespeichert.

### Datenpunkt oder State
Ein Datenpunkt-Objekt (Typ: 'state') besteht aus einem statischen Teil (.common, .native) und einem dynamischen Teil (.state, .oldState), dem aktuellen Zustand. Beide Teile werden in getrennten Datenbanken bzw. JSON-Dateien gespeichert.

### Kanal

### Gerät

### Host

### Aufzählung

### Admin

### vis

### CCU

### Homematic

### Raspberry PI

### Odroid

### Cubietrack

