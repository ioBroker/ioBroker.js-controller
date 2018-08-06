
# Adapter - iCal

Der ical Adapter liest Kalender im .ics Format von einer URL ein und stellt diese in iobroker.vis in einem Widget basic val string (unescaped) dar. Die Termine werden zeilenweise dargestellt und können mit Attributen versehen werden. Kalender können z.B. google Kalender oder Apple Kalender sein. Auch freigegebene Kalender mit einer URL auf einem NAS lassen sich einlesen.


## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-ical#konfiguration)Konfiguration

[![ioBroker_Adapter_iCal_kpl](img/ioBroker_Adapter_iCal_kpl.jpg)](img/ioBroker_Adapter_iCal_kpl.jpg)

**Tagesvorschau:** der hier angegebene Wert bestimmt wieviele Tage im Voraus Termine aus dem Kalender im Widget angezeigt werden sollen.

**Benutze Farben für HTML:** wird dies angehakt, werden Termine am heutigen Tag rot dargestellt, Termine am morgigen Tag orange, diese Option hat Vorrang vor der Option Jeder Kalender hat eigene Farbe.

**Default-Farbe für HTML:** die hier eingegeben Farbe legt die Standardfarbe der Kalendereinträge fest. (Eintrag als „white“, „red“, „blue“ usw.)

**Ersetze 00:00 mit:** Hier wird festgelegt durch welchen String bei ganztägigen Terminen die Uhrzeit 00:00 ersetzt wird. Bei Leerzeichen (zwischen den Hochkommas) wird die Uhrzeit bei ganztägigen Terminen weggelassen. (Eintrag z.B.: „ganztags“)

**Ersetze Datum mit Worten:** Ist dies angehakt wird bei heutigen Terminen das heutige Datum durch den String todayString ersetzt (z.B. "Heute"). Bei morgigen Terminen durch den String tomorrowString

**Jeder Kalendar hat eigene Farbe:** Ist dies angehakt wird bei mehreren Kalendern jeder Kalender in einer festzulegenden Farbe eingefärbt. Dieser Farben werden in der Kalendertabelle darunter definiert. Ist die Option Benutze Farben für HTML aktiviert, werden die Farben der Kalender ignoriert!

#### **Tabelle Kalender:** es können beliebig viele Kalender eingetragen werden. Kalender werden durch anklicken des (+) in der unteren linken Ecke hinzugefügt.

**Name:** Hier wird der Name des Kalenders eingegeben.

**URL:** Die URL zur .ics-Kalenderdatei<sup>*****</sup>

**Farbe:** die Farbe in der der jeweilige Kalender im Widget angezeigt werden soll. Farbe des Kalenders, wird nur benutzt, wenn die Option Jeder Kalender hat eigene Farbe gesetzt ist.

#### **Tabelle Ereignisse:** Durch Setzen eines Events (in diesem Beispiel „Vacation“), werden die Kalender nach dem String „Vacation“ durchsucht.

Ereignisse werden durch anklicken des **(+)** in der unteren linken Ecke hinzugefügt.

Sollte ein Termin am heutigen Tage (ganztägige Termine) oder zur aktuellen Uhrzeit mit dem Stichwort „Vacation“ in einem Kalender stehen, so wird automatisch eine Variable mit dem Namen ical.0.events.Vacation auf "true" gesetzt. Ist der Termin vorbei, wird die Variable wieder auf "false" gesetzt. Die Variablen werden automatisch unter ical.X.events.YYY angelegt.

**Achtung!** Es wird nach einem Substring gesucht, d.h. ein Eintrag im Kalender „Vacation“ wird genauso erkannt wie ein Eintrag „My parents Vacation“. Dies ist beim festlegen der Ereignisse zu berücksichtigen. Groß- und Kleinschreibung wird unterschieden.

**aktiviert:** legt fest, ob das Event bearbeitet wird.

**anzeigen:** legt fest, ob das Event auch in dem Feld data.html angezeigt wird, oder nur ausgewertet wird

### **<sup>*</sup>Einbinden externer Kalender**

#### [](https://github.com/ioBroker/ioBroker.ical/blob/master/README-de.md#apple-icloud)Apple iCloud

Apple iCloud Kalender können angezeigt werden, wenn sie vorher freigegeben werden. Am besten einen eigenen Kalender für die Homematic anlegen, da der Kalender fuer alle freigegeben wird. Dazu mit der rechten Maustaste auf dem Kalender in der Kalender App klicken und Freigabeeinstellungen auswählen. Jetzt einen Haken bei "Öffentlicher Kalender" setzen und die angezeigte URL kopieren. WICHTIG: die Url beginnt mit webcal://p0X-cale..... "webcal" muss durch "http" ersetzt werden. Diese URL dann entweder in den Settings bei defaultURL eintragen, oder sie bei "read URL" angeben, also z.B. "readURL [http://p-03-calendarws.icloud.com/xxxxxxxxx](http://p-03-calendarws.icloud.com/xxxxxxxxx)"

#### [](https://github.com/ioBroker/ioBroker.ical/blob/master/README-de.md#google-kalender)Google Kalender

Zum Einbinden eines Google Kalenders muss die Kalendereinstellung des Google Kalenders aufgerufen werden (mit der Maus auf "runter Pfeil" neben dem Kalender klicken). Die URL des Kalenders bekommt man durch klicken auf das "ICAL" Symbol neben dem Feld "Privatadresse". Diese URL dann entweder in den Settings bei defaultURL eintragen, oder sie bei "read URL" angeben, also z.B. "readURL [https://www.google.com/calendar/ical/xxxxxxxx/basic.ics](https://www.google.com/calendar/ical/xxxxxxxx/basic.ics)". Known BUGS: Probleme mit gleichen UUIDs von iCal Einträgen (bedingt durch Bibliothek); sich wiederholende Termine, in welchen einzelne Termine ausgenommen werden funktionieren nicht. Die Bibliothek verarbeitet keine EXDATES.

[![Logo](https://github.com/ioBroker/ioBroker.ical/raw/master/doc/google-de1.png)](https://github.com/ioBroker/ioBroker.ical/blob/master/doc/google-de1.png)

Danach diesen Link hier kopieren:

[![Logo](https://github.com/ioBroker/ioBroker.ical/raw/master/doc/google-de2.png)](https://github.com/ioBroker/ioBroker.ical/blob/master/doc/google-de2.png)

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-ical#bedienung)**Bedienung:**

Über das Icon „Bleistift“ wir die Instanz aktiviert, indem unter „Aktiviert“ ein Haken gesetzt wird.

Unter „Zeitplanung“ wird ein Zeitschema eingetragen, wie oft der Adapter den Kalender abrufen und auf neue Einträge überprüfen soll.

Diese wird im Format eines [Cronjobs](http://troubadix.dn.fh-koeln.de/unix/cronjobs_syntax.html) angegeben, so bedeutet die Voreinstellung von 0,30 ****, dass zu jeder vollen und halben Stunde die Daten neu eingelesen werden.

Anschließend mit dem Icon „Haken“ sichern und schließen.