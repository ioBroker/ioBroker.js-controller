
Der javascript-Adapter dient dazu komfortabel Skripte zu erstellen, editieren und zu verwalten. Der Adapter beherrscht javascript, coffeescript und die visuelle Oberfläche Blockly für javascript Hier wird die Bedienung über Blockly behandelt.


## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)Konfiguration

[caption id="attachment_3389" align="alignnone" width="842"]![Einstellungen Javascript Adapter](http://www.iobroker.net/wp-content/uploads/Einstellungen-Javascript.png) Einstellungsmenü Javascript Adapter[/caption]   Die eigentliche Konfiguration besteht aus der Eingabe von zusätzlichen zu ladenden npm-Module (durch Komma getrennt), sowie der Geo-Koordinaten, die für diverse Berechnungen benutzt werden sollen. Um die Koordinaten zu erhalten, kann man z.B. _google maps_ ziemlich weit aufzoomen und an der gewünschten Stelle anklicken. Die Koordinaten werden dann angezeigt. Nach dem Speichern muss der Adapter noch über die rote Play-Taste aktiviert werden aktiviert werden.

* * *

## Bedienung

### Anlegen eines Scripts

Bei der Installation wird ein weiterer Reiter _Scripte_ in der _Admin_-Oberfläche gezeigt, wenn man diesen nach der Installation über das Bleistift-Icon rechts oben aktiviert. Hier werden die Skripte angelegt, indem auf das 5\. Icon in der Symbolleiste (roter Kreis) geklickt wird. [![iobroker_blockly_001](img/ioBroker_Blockly_001.jpg)](img/ioBroker_Blockly_001.jpg)

#### Ordner- und Dateiliste

Die Ordnerstruktur kann nach eigenem Wunsch angelegt werden. Der Speicherort hat keine Auswirkungen auf die Funktionalität des Skriptes. Neben der Baumstruktur gibt es eine Listenansicht (Umschalten über das 2\. Icon). Ein Suchfeld erleichtert das Wiederfinden von Skripten. Damit ein Skript läuft, muss es links in der Ordnerstruktur durch klick auf den roten _Play_-Knopf aktiviert werden. Zum Stoppen auf den grünen _Pause_-Knopf drücken. Für jedes Skript wird ein neues Objekt angelegt. Es trägt den Skriptnamen mit dem Zusatz `_enabled` und liegt im Ordner `javascript.Instanz.ScriptEnabled`. Das Objekt zeigt mit (`true/false`) an, ob das Skript läuft. Der Zustand kann auch gesetzt werden, um das Skript ein-/auszuschalten. Skripte, die im Ordner _global_ gespeichert wurden, sind globale Skripte. Eine Kopie dieser Skripte wird intern an jedes andere Skript angehängt. Somit lassen sich globale Funktionen auf mehrere Skripte anwenden.  

#### Editor

Nach dem Anlegen öffnet sich rechts der Editor für _Javascript_.

#### Name

Hier kann man den Namen für das neue Skript vergeben, dieses wird beim Speichern in der Dateiliste gezeigt und kann hier jederzeit geändert werden.

#### Enginetyp

hier kann ausgewählt werden, ob mit der _javascript_ oder der _coffeescript_ engine oder mit Blockly gearbeitet werden soll.

#### Log

Rechts unten findet sich das Log-Fenster für die Ausgabe aller das markierte Skript betreffende Logs. Die Logs werden nach dem Abspeichern/Neustart des Skriptes angezeigt.

* * *

### Das Editorfenster

Das Editorfenster besteht aus der Block-Sidebar links und der eigentlichen Arbeitsfläche

#### Block Sidebar

Hier befinden sich die Blöcke mit denen die Scripts erstellt werden, sie werden nach anklicken der Kategorie per Drag and Drop auf die Arbeitsfläche gezogen. Zur Verfügung stehen folgende Kategorien:

##### System

![iobroker_blockly_blocks_system](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_System.jpg)  

##### Aktionen

![iobroker_blockly_blocks_aktionen](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Aktionen.jpg)  

##### SendTo

![iobroker_blockly_blocks_sendto](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_SendTo.jpg)  

##### Datum und Zeit

![iobroker_blockly_blocks_datum_zeit](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Datum_Zeit.jpg)  

##### Konvertierung

![iobroker_blockly_blocks_konvertierung](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Konvertierung.jpg)  

##### Trigger

![iobroker_blockly_blocks_trigger](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Trigger.jpg)  

##### Timeouts

![iobroker_blockly_blocks_timeouts](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Timeouts.jpg)  

##### Logik

![iobroker_blockly_blocks_logik](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Logik.jpg)  

##### Schleifen

![iobroker_blockly_blocks_schleifen](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Schleifen.jpg)  

##### Mathematik

![iobroker_blockly_blocks_mathematik](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Mathematik.jpg)  

##### Text

![iobroker_blockly_blocks_text](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Text.jpg)  

##### Listen

![iobroker_blockly_blocks_listen](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Listen.jpg)  

##### Farbe

![iobroker_blockly_blocks_farben](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Farben.jpg)  

##### Variablen

![iobroker_blockly_blocks_variablen](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Variablen.jpg)  

##### Funktionen

![iobroker_blockly_blocks_funktionen](http://www.iobroker.net/wp-content/uploads//ioBroker_Blockly_Blocks_Funktionen.jpg)  

#### Anwenden der Blöcke

Die Blöcke werden zu einem Skript zusammengeschoben. Hier ein einfaches Beispiel: [![iobroker_blockly_script_simple](img/ioBroker_Blockly_Script_simple.jpg)](img/ioBroker_Blockly_Script_simple.jpg)

* * *

## Tipps

### Backup

Um Skripte im Zweifel wiederherstellen zu können, sei die Sicherung per _Copy & Paste_ empfohlen.

### Test-Instanz

Es hat sich bewährt, zum Testen von neuen Skripten, eine weitere Javascript-Instanz anzulegen und das Skript in dieser Instanz zu starten. Hinter dem Skriptnamen lässt sich per Dropdown die gewünschtes Instanz einstellen. Sollte im Skript ein schwerwiegender Fehler sein, beendet sich nur diese zusätzliche Testinstanz, nicht die Produktivinstanz. [caption id="" align="alignleft" width="450"]![Instanz Javascript Adapter wählen](http://forum.iobroker.net/download/file.php?id=4393) Instanz Javascript Adapter wählen[/caption]