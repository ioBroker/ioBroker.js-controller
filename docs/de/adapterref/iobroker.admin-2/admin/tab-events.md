---
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
---
# Der Reiter Ereignisse

In diesem Reiter werden die aktuellen Zustände von allen Datenpunkten angezeigt. Die Werte können auch geändert werden.

![iobroker_admin_states_columns](img/tab-events_States_columns.jpg)

## Der Seiteninhalt

Auf der Seite werden die vorhandenen Objekte tabellarisch dargestellt. Die Spalten können durch Anklicken der Spaltenköpfe nach den Inhalten der entsprechenden Spalten alphabetisch auf- oder absteigend sortiert werden (Toggle-Funktion). Die Felder darunter dienen der Filterung der Datenpunkte nach eigenen Kriterien.

Die Tabelle besteht aus folgenden Spalten:

### **1.) ID**

Dies ist der eindeutige Name des entsprechenden Datenpunktes, gemäß der Struktur bestehend aus z.B. Name des Adapters.Nummer der Instanz.Gerätename.Kanalname.Datenpunktname.

### **2.) Eltern Name**

Der selbe Inhalt wie in Spalte 3 Name.

### **3.) Name**

Der Name des Datenpunktes. Dies kann ein automatisch generierter oder ein manuell 
vergebener Name sein, der verständlicher ist. Dieser Name muss nicht eindeutig sein.

### **4.) Wert**

Hier wird der aktuelle Wert des Datenpunktes angegeben.

Dieser Wert ist editierbar

### **5.) Bestätigt**

Wurde dieser Wert geändert und dieses vom System übernommen ist der Wert _true_, ansonsten _false._

### **6.) Quelle**

Hier wird angegeben, welche Instanz die letzte Änderung des Datenpunktes durchgeführt hat.

### **7.) Zeit**

Dies ist der Zeitstempel zu dem der Datenpunkt zuletzt aktualisiert wurde.

### **8.) geändert**

Dies ist der Zeitstempel zu dem sich der Wert des Datenpunktes zuletzt geändert hat.

## Der Seitenfuß

Im Seitenfuß gibt es noch ein paar Informationen 

![iobroker_admin_states_footer](img/tab-events_States_footer.jpg)

### **1.) neu laden**

Dieses Icon kann angeklickt werden um die Tabelle auf den neuesten Stand zu bringen.

### **2.) Seiteninformationen**

Der Info-Block in der Mitte des Seitenfußes gibt zum einen mit dem Pulldownmenü die 
Möglichkeit die Zeilen pro Seite einzustellen. Zur Verfügung stehen 20, 100, 200, 500 und 1000 
Zeilen pro Seite. Weiterhin gibt es hier die Information wieviele Seiten es insgesamt gibt, 
sowie die Möglichkeit mit den Pfeil-Icons die Seiten vor oder zurück zu blättern.

### **3.) Datenpunktinformation**

Diese Information gibt die Gesamtanzahl der existierenden Datenpunkte an sowie den davon auf der aktuellen Seite angezeigten Bereich.