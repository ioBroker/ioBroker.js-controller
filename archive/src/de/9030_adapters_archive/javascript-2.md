
[node-red](http://www.nodered.org) ist ein mächtiges Werkzeug um verschiedene Hardware, APIs und Online-Dienste miteinander zu verbinden. Dieses findet über so genannte "Flows" statt, in denen Knoten ("nodes") mit Anweisungen zu einer Befehlskette zusammengefügt werden.

Eine sehr schöne Beschreibung gibt es unter [https://jaxenter.de/baukasten-fuer-das-internet-dinge-13532](https://jaxenter.de/baukasten-fuer-das-internet-dinge-13532).

Der Adapter kommt bereits mit den wichtigsten nodes. Weitere nodes und sogar ganze Flows für alle möglichen Anwendungsbereiche können unter [www.http://flows.nodered.org/](http://www.http://flows.nodered.org/) heruntergeladen werden.

Im [ioBroker-Forum](http://forum.iobroker.net/viewforum.php?f=32&sid=d3c8ef0d9fd9932f55035d208c456bd8) gibt es auch einige Threads mit Anwendungsmöglichkeiten und fertige Flows zum importieren für eigene Anwendungen.

Nach Aktivierung einer Instanz steht im admin ein weiterer Reiter "node-red" zur Verfügung


## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)Konfiguration

Für den node-red Adapter kann der port für den Webserver eingestellt werden. [![iobroker_adapter_nodered001](img/iobroker_adapter_nodered001.jpg)](img/iobroker_adapter_nodered001.jpg)

## Bedienung:

Die Bedienoberfläche des node-red Adapters setzt sich aus folgenden Teilen zusammen: [![iobroker_adapter_nodered006](img/iobroker_adapter_nodered006.jpg)](img/iobroker_adapter_nodered006.jpg) **1 - Die Arbeitsfläche** Hier werden die nodes platziert und mit Verbindern zu Flows zusammengefasst.   **2 - Die nodes** Von hier können die nodes per Drag & Drop auf die Arbeitsfläche gezogen werden. Es gibt nodes für Input von Informationen, nodes zur Bearbeitung dieser Informationen und nodes für den Output Mit einem Doppelklick auf einen node wird dessen Konfigurationsmenü geöffnet.   **3 - Die Info- / debug-Fläche** Bei aktivem Reiter "Info" werden hier die Informationen zu dem gerade aktivierten node angezeigt. Ist der Reiter "debug" aktiviert wird hier die Ausgabe des debug-nodes, der an jeder beliebigen Stelle eines Flows hinzugefügt werden kann, ausgegeben.    

## Einbinden von node-red in ioBroker

In ioBroker kann node-red sowohl als Quelle für Informationen, als auch zur Steuerung von Aktionen als Reaktion auf einen Datenpunkt von ioBroker eingesetzt werden.

Dazu werden entsprechend ioBroker-nodes input bzw. output  eingesetzt.

[![iobroker_adapter_nodered011](img/iobroker_adapter_nodered011.jpg)](img/iobroker_adapter_nodered011.jpg)

### **Beispiele**

**Input**

Eine mögliche Reaktion auf die Änderung von Datenpunkten ist das Senden von eMails oder Pushnachrichten. Der dafür benötigte Input-node wird auf die Arbeitsfläche gezogen und konfiguriert:

[![iobroker_adapter_nodered012](img/iobroker_adapter_nodered012.jpg)](img/iobroker_adapter_nodered012.jpg)

**Topic:** Hier wird der auslösende Datenpunkt ausgewählt. Über den Button rechts wird das Auswahlmenü für die Datenpunkte geöffnet

**Payload:** Hier wird festgelegt, was in den folgenden Flow eingegeben wird. Zur Verfügung stehen _value_, also der Wert des Datenpunktes und _Object_, also der Datenpunkt selber. In den meisten Fällen wird der Wert weiterverarbeitet werden.

**Name:** Hier kann dem node ein Name gegeben werden.

**Output**

Ein typisches Beispiel ist das Auslesen von Webseiten (Spritpreise, Wetter, uvm.) oder APIs, um Datenpunkte zu füllen. Dazu wird am Ende eines Flows, der die Daten einliest und aufarbeitet der output-node von ioBroker konfiguriert:

[![iobroker_adapter_nodered021](img/iobroker_adapter_nodered021.jpg)](img/iobroker_adapter_nodered021.jpg)

**Topic:** Hier wird der zu füllende Datenpunkt ausgewählt. Über den Button rechts wird das Auswahlmenü für die Datenpunkte geöffnet. Man kann hier auch einen Namen für einen Datenpunkt vergeben, der noch nicht existiert. Je nach den Einstellungen (s.u.) wird dieser dann angelegt.

**Name:** Hier kann dem node ein Name gegeben werden.

**Type:** Hier wird festgelegt, was mit dem Ergebnis des Flows in ioBroker passieren soll. Zur Verfügung stehen _value_, also der Wert des Datenpunktes und _command_. In den meisten Fällen wird der Wert weiterverarbeitet werden.

**Auto create:** Hier wird festgelegt, was passieren soll, wenn der Datenpunkt nicht existiert. Zur Verfügung stehen _create state if not exist_, also wird der Datenpunkt angelegt und der Wert dort herein geschrieben, und _Ignore messages for not existing states._ In diesem Fall wird der Wert nicht weiterverarbeitet werden.

Zum Abschluss muss noch der node-red Adapter neu gestartet werden, oder im Konfigurationsfenster des Adapters der Button "Update select dialog" angeklickt werden, damit die Datenpunkte in der Dateiauswahlbox sichtbar werden.

## Importieren von Flows

Komplette Flows können ganz einfach importiert werden. Dazu klickt man in der rechten oberen Ecke das Menü-Icon an, geht auf Import und wählt Clipboard aus. In das nun aufspringende Fenster kopiert man den Flow und klickt auf OK. Der Flow erscheint jetzt auf der Arbeitsfläche und kann an die gewünschte Stelle gezogen werden. Dort klickt man kurz mit der linken Maustaste und der Flow wird fixiert. Das Anklicken des jetzt rot markierten "Deploy"-Icons schließt die Aktion ab.  

## Exportieren von Flows

Komplette Flows können ebenfalls ganz einfachexportiert werden. Dazu markiert man mit gedrückter linken Maustaste alle Nodes des gewünschten Flows. Dann klickt man in der rechten oberen Ecke das Menü-Icon an, geht auf Export und wählt Clipboard aus. In dem nun aufspringenden Fenster wird der Flow im Textformat angezeigt. Wenn noch nicht automatisch geschehen, markiert man den Text mit Strg-A, kopiert ihn mit Strg-C in die Zwischenablage und klickt auf OK. Den Text in der Zwischenablage kann man jetzt weitergeben.  

## Importieren von weiteren nodes

Auf der Seite von [node-red](http://www.nodered.org) werden weitere nodes angeboten. Dort finden sich dann auch die jeweiligen Installationsanleitungen. Auf der iobroker-Installation geht man dazu in das node-red Verzeichnis (z.B. auf dem Raspberry2): `/opt/iobroker/node_modules/iobroker.node-red/node_modules` und ruft da den Installationsbefehl von der node-red Website auf, z.B. : `npm install node-red-node-fitbit` Anschließend muss der node-red Adapter neu gestartet werden. Danach steht der neue node zur Verfügung.