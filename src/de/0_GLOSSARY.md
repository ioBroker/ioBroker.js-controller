# Glossar

### js-controller
Hauptprogramm, das erst eine Datenbank startet (falls erforderlich) und danach alle Adapter startet und beobachtet sie noch Leben.

### Adapter
Ein Modul oder Treiber für ein Gerät oder Service. ioBroker ist sehr modular aufgebaut 
und bei ioBroker ist alles ein Adapter: Admin-Oberfläche, Visualisierung, Scripting, ... einfach alles.

### Instanz
Jeder Adapter hat mindestens eine Instanz, es können aber auch mehrere sein. Es gibt Unterschiedliche Gründe warum mehrere Instanzen verwendet werden. Zum Beispiel kann man mit einer zweiten Instanz vom JavaScript Adapter Testen ohne das Risiko einen Ausfall von Wichtigen Scripten zu haben. Da im Fehlerfall nur die Test Instanz abstürzt.

### Redis
Eine No-SQL Datenbank. Wird optional benutzt um Performance zu gewinnen. Diese Option muss extra eingeschaltete werden.

### Objekt
Ein Objekt in der Datenbank. Es ist vergleichbar mit so gennanten Datenpunkten in anderen Umgebungen. Es gibt verschiedene Objekte die unterschiedliche Sachen beschreiben: Adapter, Host, Instanz, Aufzählung, Zustand(State), Kanal oder Gerät.

Das ist eine so genannte Meta-Information. 

### Zustand oder State
Das ist der eigentliche Wert oder Zustand eines Objekts. Folgende Arten von Zuständen/States gibt es: boolean, string, number,field, object, mixed. 

### Kanal

### Gerät

### Host
Der Host ist der Computer/Server auf dem ioBroker ausgeführt wird.

### Aufzählung

### Admin

### vis

### CCU
Die CCU ist die Zentrale des Homematic Systems.

### Homematic
Homematic ist ein von eQ3 hergestelltes und von elv vertriebenes Smart Home System.

### Raspberry PI

### Odroid

### Cubietrack

