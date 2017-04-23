# Ein erster Chart

Um mit ioBroker einen Chart zu erstellen müssen noch wenige Schritte vorbereitet werden

Dazu müssen je eine Instanz von folgenden Adapter installiert werden

*   _**History, influxDB oder SQL**_ zum Loggen der Datenpunkte die im Chart dargestellt werden sollen
*   _**flot**_ zur Erzeugung und Darstellung der Charts

## Installation von flot

Über das [Web-Frontend des Administrators](http://www.iobroker.net/?page_id=2240&lang=de) wird Eine Instanz des zu installierende Adapter flot ausgewählt, indem man ganz rechts in der Spalte _**Installieren**_ auf das (+) klickt.

[![](img/ioBroker_Admin_Adapter_Inhalt01.jpg)](img/ioBroker_Admin_Adapter_Inhalt01.jpg)


## Aufrufen des Editors

Der Aufruf des flot-Editors erfolgt mit`<IP_des_ioBroker_Servers>:8082/flot/edit.html`

Sollte bereits vorher ein Chart bearbeitet worden sein, wird immer der zuletzt aufgerufene Chart geöffnet. Ansonsten gibt es ein leeres Template.

![](konfiguration-der-adapter-ueber-die-webui-3_ioBroker_Einsteiger_vis_first_call-e1485088663244.jpg)

[![](img/ioBroker_Adapter_Flot_002.jpg)](img/ioBroker_Adapter_Flot_002.jpg)

## Anlegen eines neuen Charts

Sollte bereits ein Entwurf geöffnet werden kann dieser durch das Anklicken des Mülleimer-Icons ganz links oben geleert werden.

Wir werden in diesem Tutorial einen einfachen Chart aus zwei Linien und zwei Markierungen erstellen. Außerdem werden wir dabei die wichtigsten Designelemente verwenden.

### Input Data

#### Linie hinzufügen

Standardmäßig ist bereits eine Linie vorgegeben, also werden wir eine zweite durch Anklicken des Buttons _**Linie hinzufügen**_ in den Entwurf aufnehmen.

Hinter diesem Button befindet sich die Checkbox Auto-Update, die wir aktivieren. Dadurch wird jede Änderung am Entwurf automatisch in der unten liegenden Vorschau angezeigt. Der Button Update Preview , rechts über dem Vorschaufenster verschwindet dann.

Die Parameter für jede Linie werden in der entsprechenden Reihe der Tabelle angegeben. Die _**Instanz**_ ist die History-Instanz, aus der die geloggten Daten visualisiert werden sollen. Standardmäßig steht hier _**default**_, was bedeutet, dass bei mehreren Instanzen die in den Systemeinstellungen ausgewählte History-Instanz benutzt wird. Alternativ kann hier eine Instanz im Pulldownmenü fest zugeordnet werden.

Um die Datenpunkte für die Darstellung auszuwählen wird das Ordner-Icon neben dem Feld ID angeklickt und im sich öffnenden ID-Selector ggf. durch Filterung vereinfacht, der gewünschte Datenpunkt ausgesucht.

[![](img/ioBroker_Einsteiger_flot_ID.jpg)](img/ioBroker_Einsteiger_flot_ID.jpg)

In diesem Beispiel nehmen wir eine Außentemperatur und eine Innentemperatur.

[![](img/ioBroker_Einsteiger_flot_lines.jpg)](img/ioBroker_Einsteiger_flot_lines.jpg)

##### Linienparameter

Hier sind jetzt folgende Parameter ausgewählt ([weiterführende Infos](http://www.iobroker.net/?page_id=198&lang=de#Datenpunktparameter)):

*   **Art:** Dies gibt an, wie die Werte dargestellt werden sollen, die aus mehreren Werten zu einem zusammengefasst werden. Hier MinMax, was bedeutet, sowohl der höchste als auch der niedrigste Wert in dem aggregierten Bereich wird angezeigt.
*   **Chart Type:** Dies ist die Art der Linie, hier Linie, also von angezeigtem Punkt zum angezeigten Punkt verbunden. Alternativ Schritte: ergibt eine horizontale Linie bis zur nächsten Änderung.
*   die **Farbe** kann über einen Colorpicker ausgesucht werden.
*   der minimale und maximale Wert der jeweiligen Y-Achse mit deren Einheit.
*   **Y-Achse:** gibt die Lage der zu diesem Datenpunkt zugeordneten Y-Achse an. Farblich bedeutet, dass die Achsenbeschriftung die gleiche Farbe besitzt, wie die Linie.
*   **X-Achse:** gibt die Lage der zugehörigen X-Achse an. Soll nur eine angezeigt werden, sind alle anderen auf _**nichts**_ zu stellen.
*   **Name:** gibt die Bezeichnung an, die in der Legende verwendet werden soll. Wird hier nichts eingegeben wird die Datenpunktbezeichnung genommen.

**mehr:**<span style="line-height: 1.5;"> Hinter diesem Icon verbergen sich weitere Einstellungen</span>

[![](img/ioBroker_Adapter_Flot_Input_Data_more.jpg)](img/ioBroker_Adapter_Flot_Input_Data_more.jpg)

für uns sind im Moment wichtig

**ØL:** Dicke der Linie in Pixeln

**ØS: **Dicke des Schattens in Pixeln

**Gemeinsame Y-Achse:** default = jede Linie eine eigene Achse, jede Ziffer steht für die Y-Achse entsprechende Linie, die auch für die angewählte Linie benutzt werden soll.

**NULL als:** Hier wird festgelegt wie die Linie gezeichnet werden soll, wenn keine Daten vorliegen.

> default: keine Linie; null-Werte ignorieren: Linie wird horizontal weitergeführt 0 statt null benutzen: die Linie wird auf den Wert 0 gezogen.

**Nach Komma:** Anzahl der Nachkommastellen.


### Markierungen

Nachdem die Parameter für die Datenpunkte abgeschlossen sind, geht es mit der Dekoration des Charts weiter. Markierungen bieten die Möglichkeit horizontale Bereiche oder Linien hinzuzufügen, um bestimmte Eigenschaften hervorzuheben.

In diesem Chart wollen wir zum einen den Wohlfühlbereich der Raumtemperatur und zum anderen die Frostgrenze in der Außentemperatur markieren. öffnen wir den Block _**Markierungen**_ und klicken zweimal auf den Button _**Markierung hinzufügen**_.

[![](img/ioBroker_Einsteiger_flot_Markierungen.jpg)](img/ioBroker_Einsteiger_flot_Markierungen.jpg)

**Linie-ID:** Hier wird die Linie angegeben auf die sich die Markierung beziehen soll, damit sie sich an die entsprechende Skalierung anpasst.

**oberer Wert oder ID:** gibt die obere Grenze der Markierung als fixer Wert oder variabel in Abhängigkeit eines Datenpunktes an.

**unterer Wert oder ID:** gibt die untere Grenze der Markierung als fixer Wert oder variabel in Abhängigkeit eines Datenpunktes an.

**Farbe:** Hier kann über einen Colorpicker die Farbe der Markierung ausgesucht werden.

**Text:** die Beschreibung der Markierung mit den weiteren Werten für Position, Größe und Farbe

### Zeit

In diesem Block kann der zeitliche Bereich der dargestellten Daten festgelegt werden. Dies kann entweder absolut mit Angebe von Datum und Zeit oder relativ zu einem bestimmten Zeitpunkt mit einer bestimmten Zeitspanne sein.


![](img/konfiguration-der-adapter-ueber-die-webui-3_ioBroker_Einsteiger_flot_Zeit.jpg)


Unter Aggregation kann man zwischen Zeit und Anzahl wählen. Diese Parameter geben an, wie viele Datenpunkte je Linie auf dem Chart dargestellt werden sollen, bzw. wie groß ein zusammengefasster Zeitbereich sein soll.

### Options

Dieses ist ebenfalls ein sehr umfangreicher Block. Die Komplettbeschreibung gibt es [hier](http://www.iobroker.net/?page_id=198&lang=de#Options_4). In diesem Tutorial werden wir nur auf die wichtigsten Punkte eingehen.

[![](img/ioBroker_Adapter_Flot_Options_all.jpg)](img/ioBroker_Adapter_Flot_Options_all.jpg)

Zuerst wählen wir einen fertigen Hintergrund, dann geben wir einen Titel ein und formatieren diesen in Größe und Farbe.

[![](img/ioBroker_Einsteiger_flot_options.jpg)](img/ioBroker_Einsteiger_flot_options.jpg)

Ebenso verfahren wir mit der Legende. Wenn die Checkbox _**Hover Details**_ aktiviert ist, werden beim Überfahren der Kurve mit der Maus, die Messwerte angezeigt.

### Änderungen speichern

Änderungen an einem Chart werden nie automatisch gespeichert! Dies wird am besten durch bookmarken der Seite erledigt nachdem wir auf den Button _**Zeige im Fenster**_ geklickt haben.

Diese lange Adresse kann in .vis in einem iFrame-Widget als Quelle angegeben und so in einen View eingebunden werden. Soll dieser View auch mit der Adroid-App aufgerufen werden muss diese Adresse relativ sein, d.h. die IP 192.168... muss gelöscht werden, so dass die Adresse mit /flot/index.html..... beginnt.


## Editor schließen

Um sich den Erfolg ansehen zu können schließen wir den Editor über das Kreuz rechts oben oder das daneben liegende pulldownmenü (rot). Nach einem kurzen Hinweis, wie man den Editor wieder aufruft befindet man sich im Anzeigemodus von .vis


## Weiterführende Dokumentation von flot

Eine sehr ausführliche Dokumentation aller Funktionen von ioBroker.flot befindet sich [hier](http://www.iobroker.net/?page_id=2754&lang=de).