---
title:       "Admin"
lastChanged: "14.09.2018"
---

# Das Adapter-Fenster

?> ***Dies ist ein Platzhalter***
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc), 
   damit die Änderungen einfacher übernommen werden können.


# Der Reiter Adapter
Hier werden die verfügbaren und installierten Adapter angezeigt und verwaltet.



## Die Titelzeile
in der Titelzeile befinden sich Icons für die wichtigsten Vorgänge. Zu jedem Icon gibt es eine Kontexthilfe. Dazu einfach mit der Maus eine Weile auf dem Icon bleiben.

![Der Reiter Admin](media/ADMIN_Adapter_Kachel_numbers.png)

### Die Icons im einzelnen:


1.)  Ansicht umschalten 
Mit diesem Button kann zwischen der Kachelansicht und der Tabellenansicht umgeschaltet werden (Toggle-Funktion)

2.) Anzeige aktualisieren
Bei jedem Neustart wird automatisch nach Updates gesucht. Über diesen Button kann man die Suche manuell anstoßen oder einen refresh der Seite auslösen.

3. ) nur installierte Adapter anzeigen
Bei Anwahl dieses Icons werden nur noch Adapter mit bereits installierten Instanzen angezeigt (Toggle-Funktion)

4.) Adapter mit Updates anzeigen
Bei Anwahl dieses Icons werden nur noch Adapter angezeigt, zu denen ein Update vorliegt (Toggle-Funktion)
Die Kacheln der updatebaren Adapter haben einen grünen Header. Sollte es kein Update zu einem Adapter geben, erscheint eine entsprechende Meldung.

Außerdem erscheint ein weiteres Icon in der Titelzeile:

![Der Reiter Admin](media/ADMIN_Adapter_Kachel_upgradeable.png)

Durch Anklicken dieses Icons (8) werden alle verfügbaren Adapter aktualisiert.

5.) Adapter aus eigener URL installieren
Über das Octocat-Icon können Adapter aus eigenen Pfaden (URL oder Dateipfade) oder Vorabversionen von GitHub installiert werden.

Nach Anklicken dieses Icons öffnet sich ein entsprechendes Auswahlfenster:

![Installieren von GitHub](media/ADMIN_Adapter_GitHub.png

Unter dem Reiter Von github wird einfach im Pulldownmenü der gewünschte Adapter ausgewählt und die neueste Vorabversion wird installiert.

Bei Anwahl des Reiters Beliebig kann ein beliebiger Dateipfad oder ein beliebiger URL (z.B. ein URL zu einem externen Adapterentwickler) in das Feld eingegeben werden und der entsprechende Adapter installiert werden.

**Die Nutzung dieser Option birgt einige Gefahren und geschieht daher auf eigene Gefahr.**

6.) Expertenmodus einschalten
Der Expertenmodus ermöglicht es auch ältere Versionen eines Adapters zu installieren. Wenn dieser Button angewählt ist, erscheint in der Kachel ein zusätzliches Icon über das frühere Versionen installiert werden können.

![Installieren anderer Versionen](media/ADMIN_Adapter_Kachel_versions.png


7.) Filter
Hier kann über einen Filterbegriff gezielt nach bestimmten Adaptern gesucht werden


