---
title:       "Hosts"
lastChanged: "27.03.2019"
---

# Das Seite Hosts

Hier werden die verfügbaren Hosts angezeigt.

![Die Seite Hosts](media/ADMIN_Hosts_numbers.png)

Bei einem Standardsystem gibt es nur einen Host. Bei einem Multihostsystem 
entsprechend mehrere.

## Die Titelzeile

in der Titelzeile befinden sich Icons für die wichtigsten Vorgänge. Zu jedem Icon gibt es eine Kontexthilfe. Dazu einfach mit der Maus eine Weile auf dem Icon bleiben.


### Die Icons im einzelnen:

**1.) Ansicht umschalten**

Mit diesem Button kann man zwischen der Kachel- und der Listenansicht umschalten 
(Toggle-Funktion)


**2.) Updates abrufen**

Um zu überprüfen, ob ein Update für den js-controller vorliegt kann man auf diesen Button klicken. Wenn ein Update vorliegt erscheint in dem Punkt ***Hosts*** der Menüleiste eine der  upzudatenden Hosts 
entsprechende Zahl und in der Kachel unter verfügbar wird die neue Version angezeigt.

**3.) Filter**

In diesem Feld kann man die Liste der Hosts nach eigenen Wünschen filtern

## Der Seiteninhalt

Auf der Seite werden die vorhandenen Hosts aufgezählt.

Zu jedem Host gibt es eine Kachel (eine Zeile in der Listenansicht) in der die Daten des jeweiligen Hosts
angezeigt werden.

 

Die folgenden Icons dienen der Verwaltung der Hosts:

**4.) Editieren**

Hier kann der Name des Hosts geändert werden.  Dieser Name muss eindeutig sein.

 
**5.) Restart Host*

Mit diesem Button kann der entsprechende Host neu gestartet werden. Der Klick darauf entspricht dem Befehl reboot.
 

**6.) Host entfernen**

Dieser Button ist nur bei slaves vorhenden. Wurde ein Slave aus der Multihost-Umgebung entfernt, 
können damit auch alle zu diesem Host gehörenden Objekte entfernt werden.

**7.) Controller update**

liegt ein Update des js-controllers für das eingestellte Repository vor, erscheint ein weiteres Icon:

![Controller-Update](media/ADMIN_Hosts_update.png)

Klickt man dieses Icon an, wird jedoch im Gegensatz zu diesem Icon bei den Adaptern, das Update nicht gestartet, da dazu ioBroker beendet werden muss. Statt dessen erscheint eine Anleizung zum weiteren Vorgehen.:

![Anleitung zum Controller-Update](media/ADMIN_Hosts_update02.png)
