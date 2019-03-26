---
title:       "Admin"
lastChanged: "26.03.2019"
---

# Das Ereignisse-Fenster

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc), 
   damit die Änderungen einfacher übernommen werden können.


# Der Reiter Ereignisse

In diesem Reiter werden die aktuellen Zustände von allen Datenpunkten angezeigt. 
Die Werte können hier nicht geändert werden.

![Die Ereignisseite](media/ADMIN_Ereignisse_numbers.png)
 
## Die Titelzeile

in der Titelzeile befinden sich Icons für die wichtigsten Vorgänge. Zu jedem Icon gibt es eine Kontexthilfe. Dazu einfach mit der Maus eine Weile auf dem Icon bleiben.


### Die Icons im einzelnen:

**1.) Ansicht pausieren**

Mit diesem Button kann man die laufende Anzeige der neuesten Ereignisse anhalten. Der 
Button ändert sich dann in einen gelben Hintergrund auf dem die Anzahl der "verpassten" 
Ereignisse hochgezählt wird.

!> Da die Ereignisse teilweise im Millisekundenbereich aktualisiert werden, kann es zu 
Verzögerungen bis hin zum Einfrieren der Darstellung kommen

Ein erneutes Anklicken des Buttons startet die Live-Darstellung wieder.


**2.) Anzeige löschen**

Dieser Button löscht den Bildschirm


## Der Seiteninhalt

Auf der Seite werden die vorhandenen Ereignisse tabellarisch dargestellt. Das jeweils jüngste 
Ereignis steht oben.

![Die Ereignisseite](media/ADMIN_Ereignisse_numbers02.png)

Durch Anklicken der Spaltenköpfe kann nach gewissen Kriterien gefiltert werden.


###Die Tabelle besteht aus folgenden Spalten:


**1.) Typ**

Hier steht entweder ***stateChange*** also eine Aktualisierung eines Wertes, oder ***objectChange*** Dies sind auch die beiden Filtermöglichkeiten.


**2.) ID**

Dies ist der eindeutige Name des entsprechenden Datenpunktes, gemäß der Struktur 
bestehend aus z.B. Name des Adapters.Nummer der 
Instanz.Gerätename.Kanalname.Datenpunktname.

Hier kann nach kompletten IDs gefiltert werden, aber auch nach Teilen davon, z.B. nach 
allen TEMPERATURE Datenpunkten.

 
**3.) Wert**
Dies ist der aktuelle Wert des jeweiligen Datenpunktes.


**4.) Bestätigt

Wurde dieser Wert geändert und dieses vom System übernommen ist der Wert true, ansonsten false.

Dieses sind auch die Filtermöglichkeiten

 

**5.) Quelle**

Hier wird angegeben, welche Instanz die letzte Änderung des Datenpunktes durchgeführt hat.

Nach diesen kann in dieser Spalte gefiltert werden.

 

**6.) Zeit**

Dies ist der Zeitstempel zu dem der Datenpunkt zuletzt aktualisiert wurde.


**7.) geändert

Dies ist der Zeitstempel zu dem sich der Wert des Datenpunktes zuletzt geändert hat.