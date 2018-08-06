# Adapter - DWD (Deutscher Wetter Dienst)



## Konfiguration bis Version 2.0.0

In der neuesten Version ist keine Eingabe der Zugangsdaten mehr notwendig. [caption id="attachment_3504" align="alignnone" width="300"][
![(http://iobroker.net/wp-content/uploads/Adapter-DWD.png) Konfiguration DWD Adapter](img/dwd-deutscher-wetter-dienst_Adapter-DWD-300x191.png)
 **Region:** Hier wird die benötigte Stadt / Kreis / Landkreis ausgewählt **Number of warnings:** Anzahl der maximalen Wetterwarnungen die heruntergeladen werden sollen (Beipiel: Bei 5 werden die 5 wichtigsten Wetterwarnungen heruntergeladen.)

## Konfiguration bis Version 1.0.1

### Voraussetzung zu Nutzung

Um den Adapter nutzen zu können benötigt man ein kostenloses Benutzerkonto für die Grundversorgung beim DWD über ftp. Dieses erhält man [
![](img/dwd-deutscher-wetter-dienst_icon_link.png)
[hier](http://www.dwd.de/bvbw/appmanager/bvbw/dwdwwwDesktop?_nfpb=true&_pageLabel=dwdwww_wetter_warnungen&T174800148261285830600274gsbDocumentPath=Navigation/Oeffentlichkeit/Homepage/Wetter__Ihre__Website/ftp-Zugriff__node.html?__nnn=true&_state=maximized&_windowLabel=T174800148261285830600274). Die Zugangsdaten erhält man dann per eMail. Aus Sicherheitsgründen wird der Zugang aber erst nach einer Stunde freigeschaltet.

### Konfiguration

[
![](img/dwd-deutscher-wetter-dienst_ioBroker_Adapter_DWD_Konfig-e1441887030628-300x188.jpg)
 Die Zugangsdaten (Benutzer, Passwort), die man nach der Anmeldung beim DWD erhalten hat, werden hier eingegeben. Um eine regionale Vorhersage zu bekommen gibt man noch Bundesland aus dem pulldown-Menü sowie das Autokennzeichen des Kreises oder der Stadt ein. Die Daten im Konfigurationsfenster speichern und das Fenster schließen. In der Liste die Zeile mit dem DWD-Adapter doppelklicken, dort wo bisher false stand einen Haken in die Checkbox setzen und mit Enter bestätigen. [
![](img/dwd-deutscher-wetter-dienst_ioBroker_DWD-300x70.jpg)
 Dann noch die Zeitplanung einstellen. Diese wird im Format eines Cronjobs angegeben, so bedeutet z.B.: `0,15,30,45 ****`, dass zu jeder Stunde hh:00; hh:15; hh:30; und hh:45 die Daten abgerufen werden.

* * *

## Bedienung

Eine manuelle Bedienung des Adapters findet nicht statt. Anhand des Zeitschemas werden die Daten über ftp vom Server des DWD heruntergeladen und in die Datenpunkte geschrieben.