
Der Fritzbox Adapter ermöglicht das Auslesen der Zustände der AVM fritzbox. So können z.B. eingehende Anrufe in von ioBroker detektiert und in VIS angezeigt werden.


## Installation

Die Installation erfolgt über die Admin Oberfläche.

* * *

## Konfiguration

Um die Daten aus der Fritzbox zu lesen, muss deren Port 1012 freigeschaltet werden. Dazu an einem angeschlossenen Telefon einmalig `#96*5*` wählen. Um den Port wieder zu schließen, nutzt man die Folge `#96*4*` 
![](img/fritzbox_Fritzbox-Adapter-Einstellungen.png)


* * *

## Übersicht Datenpunkte

Unter **fritzbox.x.** legt der Adapter folgende Channel und Datenpunkte an:

*   message (Meldung aus der Fritzbox)
*   calls. (CHANNEL)
*   calls.ring (true/false, steht ein Ruf an?)
*   calls.missedCount (Integer, read & write, Anzahl verpasster Anrufe)
*   calls.missedDateReset (Datum, zu dem calls.missedCount auf 0 gesetzt wurde
*   calls.ringActualNumber (aktuell anstehender Ruf (der Letzte, wenn es mehrere gibt))
*   calls.ringActualNumbers (alle aktuell anstehenden Rufe)
*   calls.ringLastNumber (letzter Anrufer)
*   calls.ringLastMissedNumber (letzter verpasster Anrufer)
*   calls.callLastNumber (Wahlwiederholung, letzte gewählte Rufnummer)
*   calls.connectNumber (letztes aktuell verbundenes Gespräch)
*   calls.connectNumbers (alle aktuell verbundenen Gespräche)
*   calls.counterActualCalls. (CHANNEL - Realtime)
*   calls.counterActualCalls.ringCount (Anzahl der anstehenden Anrufe (RING))
*   calls.counterActualCalls.callCount (Anzahl der gehenden Anrufversuche (CALL))
*   calls.counterActualCalls.connectCount (Anzahl der bestehenden Gespräche (CONNECT))
*   calls.counterActualCalls.allActiveCount (Anzahl aktiver Anrufe (CALL, RING & CONNECT)
*   calls.telLinks. (CHANNEL - wählbare Rufnummern tel:+...)
*   calls.telLinks.ringLastNumberTel (letzter Anrufer als wählbarer Link)
*   calls.telLinks.ringLastMissedNumberTel (letzter verpasster Anrufer als wählbarer Link)
*   calls.telLinks.callLastNumberTel (Wahlwiederholung, letzte gewählte Rufnummer, wählbar)
*   history. (CHANNEL)
*   history.allTableTxt (...)
*   history.allTableHTML (Anruferliste als html Tabelle)
*   history.allTableJSON (Anruferliste als JSON)
*   history.missedTableHTML (Liste verpasste Anrufe als html)
*   history.missedTableJSON (Liste verpasste Anrufe als JSON)
*   history.cdr. (CHANNEL)
*   history.cdr.json (CDR als JSON)
*   history.cdr.html (CDR als html)
*   history.cdr.txt (CDR als txt)
*   history.cdr.missedJSON (letzter verpasster Anruf als JSON)
*   history.cdr.missedHTML (letzte verpasster Anruf als html)
*   callmonitor. (CHANNEL - Realtime)
*   callmonitor.all (html Liste: alle aktiven Anrufe in allen Zuständen)
*   callmonitor.ring (html Liste: alle aktiven Anrufe
*   callmonitor.call (html Liste: alle gehenden Gespräche)
*   callmonitor.connect (html Liste: alle verbundenen Gespräche)
*   system. (CHANNEL)
*   system.deltaTime (Deltazeit zwischen System und Fritzbox in Sek.)
*   system.deltaTimeOK (true/false Deltazeit zwischen System und Fritzbox in der Tolereanz)
*   wlan. (CHANNEL)
*   wlan.enabled (true/false, read & write, Zustand des WLANs, nur verfügbar wenn Passwort konfiguriert ist)

* * *

## Beispiel Widgets für VIS

### Fritzbox Widget in groß

[ddownload id="2861" button="grey"]   Enthält u.a.:

*   beim aktuellen Anruf einen roten Balken mit der Rufnummer des Anrufers
*   grafischen zeitlichen Verlauf für die Anzahl der Gespräche nach Anrufen, Rufaufbau und Gespräch
*   Zähler für verpasste Anrufe mit einem Button zum zurücksetzen
*   Liste der verpassten Anrufe
*   Liste aller Anrufe mit farblicher Markierung (Gespräch/kein Gespräch) und der Richtung
*   Zähler für: aktuell anstehende Anrufe, aktuelle Rufaufbauten für gehende Gespräche, verbundene Gespräche, Gesamtanzahl von Gesprächen/Gesprächsversuchen
*   ein Infofeld, welches gelb eingeblendet wird, wenn die Fritzboxzeit von der ioBroker-Systemzeit zu stark abweicht

[
![](img/fritzbox_iobroker_fritzbox_widget_gross-258x300.png)
[
![](img/fritzbox_zoom61_black.png)
