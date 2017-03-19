
# Adapter - HomeMatic ReGaHSS

Durch den Adapter wird eine Verbindung zu Homematic Logikschicht hergestellt "ReGaHSS". Hierdurch wird das Auslesen und Schreiben von Daten aus der Homematic Zentrale ermöglicht. Während der hm-rpc Adapter die Datenpunkte ausliest und schreibt, werden über den hm-rega Adapter die Klarnamen, Systemvariablen, Räume, Gewerke und Programme synchronisiert.


## Konfiguration

  [![](img/iobroker_HM-rega_Konfig001.jpg)](img/iobroker_HM-rega_Konfig001.jpg)   **Zuerst muss mindestens ein hm-rpc Adapter konfiguriert werden und aktiv sein!** Mit der Installation von hm-rega wird auch ein hm-rpc installiert. Sollen mehrere Zentralen in ioBroker eingebunden werden muss für jede Zentrale eine Instanz des hm-rega Adapters installiert werden und die jeweils entsprechende IP unter Adresse eingestellte werden (s.u.).

* * *

  <span style="font-size: 18pt;">**Haupteinstellungen**</span>

### HomeMatic CCU Address

Hier wird die IP-Adresse der CCU aus einem pulldown-Menü ausgewählt, deren Daten in ioBroker übernommen werden sollen. Die verfügbaren IP-Adressen entsprechen den bisher konfigurierten hm-rpc Adaptern

* * *

### rfd

Ist diese Checkbox aktiviert, werden die Daten des CCU-Funkdienstes in ioBroker übernommen. Dazu muss die entsprechenden hm-rpc Instanz angelegt sein und in dem Pulldownmenü hier ausgewählt werden.

* * *

### hs485d (Wired)

Ist diese Checkbox aktiviert, werden die Daten des CCU-hs485-Dienstes (HM-Wired)  in ioBroker übernommen. Dazu muss die entsprechenden hm-rpc Instanz angelegt sein und in dem Pulldownmenü hier ausgewählt werden.

* * *

### CuxD

Ist diese Checkbox aktiviert, werden die Daten des CuxD-Dienstes in ioBroker übernommen. Dazu muss die entsprechenden hm-rpc Instanz angelegt sein und in dem Pulldownmenü hier ausgewählt werden.

* * *

### Homematic IP

Ist diese Checkbox aktiviert, werden die Daten des HM-IP Dienstes von der CCU in ioBroker übernommen. Dazu muss die entsprechenden hm-rpc Instanz angelegt sein und in dem Pulldownmenü hier ausgewählt werden.

* * *

### Polling

Mit der Checkbox _**aktiviert**_ wird die regelmäßige Abfrage der RegaHSS-Daten von der CCU gestartet. In dem Feld _**Intervalle**_ wird der Abfrageabstand in Sekunden eingegeben,  in der die Daten von der REGA-HSS von der CCU geladen werden sollen. Ein zu häufiges Abfragen kann zum Absturz der CCU führen.

* * *

### Trigger

Um die aktiven Abfragen von ioBroker an den RegaHSS zu minimieren, kann auf der CCU innerhalb eines Programms auch ein Trigger die Daten bei Änderung pushen. Dafür kann eineVirtuelle Taste der CCU genutzt werden, die in einem CCU-Programm ausgelöst wird. Standardmäßig ist dies die Taste _**BidCosRF.50.PRESS_SHORT.**_

* * *

  <span style="font-size: 18pt;">**Synchronisiere**</span>

### Variablen

Aktiviert die Übernahme der Systemvariablen von der CCU

* * *

### Programme

Aktiviert die Übernahme der Programmbezeichnungen von der CCU

* * *

### Namen

Aktiviert die Übernahme der Klartextnamen der Datenpunkte von der CCU

* * *

### Favoriten

Aktiviert die Übernahme der Favoriten und einer Auflistung derselben

* * *

### Räume

Aktiviert die Übernahme der Räume und einer Auflistung derselben

* * *

### Gewerke

Aktiviert die Übernahme der Gewerke und einer Auflistung derselben

* * *

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-hm-rega#bedienung)Bedienung

Eine manuelle Bedienung des Adapters findet nicht statt. Gemäß dem init-Intervall wird die CCU zyklisch abgefragt und die aktuellen Werte in die Datenpunkte geschrieben.