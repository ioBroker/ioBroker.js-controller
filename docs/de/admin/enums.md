---
title:       "Admin"
lastChanged: "14.09.2018"
---

# Das Aufzählungen-Fenster

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc), 
   damit die Änderungen einfacher übernommen werden können.


# Der Reiter Aufzählungen

Hier werden die Favoriten, Gewerke und Räume aufgelistet. Gibt es eine HomeMatic Installation werden die dort enthaltenen Aufzählungen übernommen. Es können 
auch eigene Aufzählungen angelegt werden, die dann z.B. in Scripts verwendet werden können.

![Die Aufzählungen in der Kachelansicht](media/ADMIN_Aufzaehlungen_kachel.png)

Über das erste Icon in der Titelzeile kann in die Listenansicht umgeschaltet werden. Diese Ansicht wird im folgenden verwendet:

![Die Aufzählungen in der Listenansicht](media/ADMIN_Aufzaehlungen_liste_numbers.png)
 


## Die Titelzeile

in der Titelzeile befinden sich Icons für die wichtigsten Vorgänge. Zu jedem Icon gibt es eine Kontexthilfe. Dazu einfach mit der Maus eine Weile auf dem Icon bleiben.



### Die Icons im einzelnen:

**1.) Umschalten der Ansicht**

Mit diesem Button kann zwischen Kachelansicht und Listenansicht umgeschaltet werden 
(Toggle-Funktion)
 

**2.) Neue Aufzählung erstellen**

Mit diesem Button wird eine neue Aufzählung angelegt. Dazu öffnet sich ein neues Fenster

![Neue Aufzählung erstellen](media/ADMIN_Aufzaehlungen_liste_erstellen.png) 

**Name**

Hier wird der gewünschte Name für die Aufzählung eingegeben. Optional kann zusätzlich 
hier auch ein Icon für diese Aufzählung per Drag and Drop in dieses Feld gezogen werden.

**ID beibehalten**

Diese Checkbox ist bei der Erstellung einer neuen Aufzählung standardmäßig abgewählt, da hier eine neue ID angelegt wird. 

Im Editiermodus (s.u.) einer bestehenden Aufzählung kann man so den Namen ohne die 
ID verändern.

**Vorschau**

Hier wird die komplette ID der Aufzählung angezeigt.

**Farbe**

An dieser Stelle kann eine Farbe ausgewählt werden mit der Die Aufzählung markiert 
werden soll.

In der Kachelansicht wird die Kachel in dieser Farbe eingefärbt, in der Listenansicht 
wird die Zeile mit der Bezeichnung der Aufzählung in dieser Farbe unterstrichen.
 


**3.) Neue Kategorie erstellen**

Mit diesem Button wird analog zu einer Aufzählung eine neue Kategorie (wie 
functions/rooms usw.) angelegt.



**4) Editieren**

Über diesen Button können die Datenpunkte einer Aufzählung veraltet werden. Man 
markiert zuerst per Mausklick die gewünschte Aufzählung und aktiviert dann den
Editiermodus.

Der Bildschirm wird jetzt zweigeteilt:

![Aufzählung bearbeiten](media/ADMIN_Aufzaehlungen_liste_hinzufuegen.png)

Der Aufbau der rechten Hälfte entspricht dem der [Objekte-Seite](opbjects.md).

Datenpunkte können von der rechten Seite durch einfaches Ziehen in die gewünschte 
Aufzählung auf der linken Seite gezogen werden.

Das Löschen eines Datenpunktes in der Aufzählung geschieht über das Mülleimer-Icon 

11.) Element löschen
Mit dem Mülleimer-Icon wird das Element in dieser Zeile gelöscht

 

12.) Information
Nach Anklicken dieses Icons wird ein weiteres Fenster mit erweiterten Informationen zu dem angewählten Element angezeigt.

iobroker_adapter_admin_enums_info