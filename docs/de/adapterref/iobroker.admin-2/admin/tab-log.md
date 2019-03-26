---
chapters: {"pages":{"de/adapterref/iobroker.admin-2/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin-2/README.md"},"de/adapterref/iobroker.admin-2/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin-2/admin/tab-adapters.md"},"de/adapterref/iobroker.admin-2/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-instances.md"},"de/adapterref/iobroker.admin-2/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin-2/admin/tab-objects.md"},"de/adapterref/iobroker.admin-2/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin-2/admin/tab-states.md"},"de/adapterref/iobroker.admin-2/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-groups.md"},"de/adapterref/iobroker.admin-2/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin-2/admin/tab-users.md"},"de/adapterref/iobroker.admin-2/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin-2/admin/tab-events.md"},"de/adapterref/iobroker.admin-2/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin-2/admin/tab-hosts.md"},"de/adapterref/iobroker.admin-2/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-enums.md"},"de/adapterref/iobroker.admin-2/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin-2/admin/tab-log.md"},"de/adapterref/iobroker.admin-2/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin-2/admin/tab-system.md"}}}
---
# Der Reiter Log

Hier werden die Meldungen des Systems kontinuierlich ausgegeben. 
Die neueste Meldung befindet sich oben.

![](img/tab-log_01.jpg)

## Die Titelzeile

in der Titelzeile befinden sich Icons für die wichtigsten Vorgänge. 
Zu jedem Icon gibt es eine Kontexthilfe. Dazu einfach mit der Maus eine Weile auf dem Icon bleiben.

![](img/tab-log_icons.jpg)

### **Die Icons im einzelnen:**

### **1.) Aktualisierung anhalten**

Bei einem Klick auf diesen Button wird die ständige Aktualisierung der Liste angehalten. 
Statt des Pause-Icons erscheint jetzt die Anzahl der neuen, nicht angezeigten Meldungen.

### **2.) Log aktualisieren**

Mit diesem Button wird die die Liste aktualisiert.

### **3.) Log kopieren**

Nach Anklicken dieses Icons erscheint die Liste als Text. Mit CTRL-A wird der gesamte 
Text ausgewählt und mit CTRL-C in die Zwischenablage zur weiteren Bearbeitung eingefügt.

### **4.) Liste löschen**

Mit dem Klick auf dieses Icon wird nur die auf dem Bildschirm befindliche Liste gelöscht

### **5.) Log löschen**

Mit dem Klick auf dieses Icon wird das gesamte Log auf dem Host endgültig gelöscht.

### Die Pulldown-Menüs

### **Instanzen Filter**

![](img/tab-log_instances.jpg)

Mit diesem Pulldownmenü können die Meldungen nach der loggenden Instanz gefiltert werden. 
In dem Menü werden nur die Instanzen angezeigt, zu denen es auch Einträge auf der Seite gibt.

### **angezeigter Loglevel**

![](img/tab-log_loglevel.jpg)

Mit diesem Menü kann eingestellt werden welcher Schweregrad der Meldung angezeigt werden soll. 
Hierbei handelt es sich jedoch nur um einen Filter der vorhandenen Liste. Um für eine Instanz das Logging in einem bestimmten Level festzulegen muss dieses im Reiter _**Instanzen**_ eingestellt werden.