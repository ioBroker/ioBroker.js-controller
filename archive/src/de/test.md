# Adapter

Über sogenannte _Adapter_ kommuniziert ioBroker mit unterschiedlichsten Systemen, aus dem Bereich Smart Home z.B. mit HomeMatic, KNX, FS20 und EnOcean, aus dem Bereich Home Entertainment mit Sonos-Systemen, Dreamboxen, diversen AV-Receivern und SmartTVs, mit unterschiedlichsten Webservices und diverser Software wie z.B. MySQL oder Graphite.

* * *

## Erzeugen von Instanzen

Um die Adapter nutzen zu können, muss eine Instanz installiert und konfiguriert werden. Dazu klickt man in der WebUI des Administrators in dem Reiter _Adapter_ in der Zeile des gewünschten Adapters auf das (+) ganz rechts. 
![Adapter Übersicht](img/test_Admin-Übersicht-1-1024x467.jpg)
     Anschließend wird eine Instanz des Adapters erzeugt und in der Spalte _installiert_ erscheint in eckigen Klammern die Anzahl der erzeugten und der aktivierten Instanzen (z.B. [2/1]) Zusätzlich wird bei der Zahl der aktivierten Instanzen auch noch durch die Farbe grün signalisiert, dass alles in Ordnung läuft. Weiterhin erscheint die installierte Instanz jetzt in dem Reiter _Instanzen_. Von den meisten Adaptern können beliebig viele Instanzen erzeugt werden. Sollte dies bei einem Adapter nicht möglich sein, kommt beim Versuch eine weitere Instanz anzulegen eine entsprechende Fehlermeldung.

* * *

## Konfiguration der erzeugten Instanz

Um die soeben erzeugte Instanz zu konfigurieren muss auf den Reiter Instanzen gewechselt werden. Dort klickt man auf das Konfigurations-Icon oder den Namen der Instanz.   
![Instanzen Übersicht](img/test_Instanzen-Übersicht-1024x503.jpg)
 Ein adapterspezifisches Konfigurationsmenü öffnet sich. Die dort notwendigen Konfirurationen werden auf der Seite des entsprechenden Adapters beschrieben. Diese ist über das Menü auf der linken Seite erreichbar.

* * *

## Aktivieren einer Instanz

Die konfigurierte Instanz des Adapters muss jetzt noch aktiviert werden, damit sie in ioBroker zur Verfügung steht. Dazu klickt man in der Zeile der entsprechenden Instanz auf das rote _Play_-Icon. Zum Stoppen wird analog das grüne _Pause_-Icon geklickt. Anschließend können einige Felder in dieser Zeile aktiviert werden, um deren Inhalt zu ändern:

### Verbindung

Ganz links in jeder Zeile steht eine Anzeige über den Verbindungsstatus. Grün bedeutet _verbunden_. Eine Mouse-Over-Funktion gibt ebenfalls Informationen.

### Titel

Hier kann für die Instanz ein eindeutiger Name eingetragen werden, um bei der Installation mehrerer Instanzen eines Adapters diese voneinander unterscheiden zu können

### Server

Auf [Multihost](http://www.iobroker.net/?page_id=3068&lang=de) Systemen kann der Server gewählt werden

### Zeitplanung

Einige Adapter werden über eine Zeitplanung aktiviert. Sie führen eine Funktion aus und trennen sich dann wieder vom Server, bis zum nächsten Termin. Die Planung wird in Cron-Zeit vorgenommen.

* * *

## Adapter- / Instanzwebseite öffnen

Einige Adapter (allen voran VIS) lassen sich über eine eigene Webseite bedienen. Diese lässt sich seit [admin 1.0.1](http://www.iobroker.net/?page_id=2240&lang=de) auch mit dem Klick auf den fünften Button öffnen. 
![Zum Öffnen der Adapter-Webseite den fünften Button (hier in blau) klicken](img/test_Admin-Adapter-Webseite-1024x367.jpg)


* * *

## Experten-Modus

Der Modus lässt sich über den Knopf links oben einschalten. Es erscheinen zwei weitere Spalten für Experten-Einstellungen. In der Spalte _Log Stufe_ kann noch eingegeben werden wie hoch der loglevel dieser Instanz in dem ioBroker-log sein soll (_debug, info, warn, error_). Die Spalte _RAM-Level_ erlaubt die Begrenzung des Speicherbedarfs für diesen Adapter.

* * *

## Installation einer älteren Version

Sollte es mit einer Version Probleme geben, kann man eine ältere Version installieren mit `cd /opt/iobroker` `iobroker stop`

`npm install iobroker.adaptername@0.1.2 --production`

`iobroker upload adaptername`

`iobroker start`

Bitte adaptername und die Versionsnummer entsprechend anpassen