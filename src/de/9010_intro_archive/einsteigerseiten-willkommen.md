# Willkommen zu ioBroker!

IoBroker ist ein mächtiges Werkzeug um verschiedene Elemente der Hausautomation miteinander zu verbinden und deren Status und Bedienung zu visualisieren.

Der Funktionsumfang kann einen Einsteiger beim ersten Kontakt mit ioBroker schon mal verschrecken, weil man den Wald vor lauter Bäumen nicht mehr sieht. Dieses muss nicht sein! Daher möchte ich auf dieser und den verlinkten Einsteigerseiten jedem einen leichten Einstieg in ioBroker ermöglichen.

Was muss man unbedingt wissen?

*   ioBroker ist eine so genannte Middleware und vermittelt (Broker = Makler) zwischen diversen Geräten und Systemen
*   ioBroker ist modular aufgebaut. Man kann ganz klein anfangen und später immer weiter ausbauen. Diese Module nenne sich Adapter und können nach Bedarf installiert werden.
*   ioBroker kann weitestgehend auch ohne Programmierkenntnisse bedient werden. Mit Javascript sind die Möglichkeiten dann nahezu unendlich.
*   ioBroker bietet mit ioBroker.vis eine der umfangreichsten Visualisieruungsmöglichkeiten
*   Hier gilt das oben gesagte analog  - es kann sehr viel es reicht sehr wenig!

Da die meisten Anwender aus dem Bereich Homematic kommen werden, werde ich im Rahmen der Einsteigerseiten beispielhaft eine Installation und Konfiguration von ioBroker bis hin zu eiiner einfachen Visualisierung mit ioBroker.vis erklären.

Für jede Frage stehen wir immer im [ioBroker-Forum](http://forum.ioBroker.net) zur Verfügung! Dort sind wir froh über jedes Feedback. Wir wollen ja auch immer besser werden.

* * *

**Ein Wort in eigener Sache:**

Um die Seiten besser pflegen zu können werde ich auf den Einsteigerseiten immer wieder auf bestehende Seiten verlinken. Diese Seiten werden in einem separaten Tab geöffnet werden, so dass die Ursprungsseite weiterhin zur Verfügung steht. Hier befindet sich nur eine Kurzanleitung.

* * *



# [Aufsetzen eines ioBroker-Servers](http://www.iobroker.net/?page_id=6335)

Um mit ioBroker arbeiten zu können benötigt man einen "Server" auf dem ioBroker läuft.

Prinzipiell lässt sich ioBroker auf nahezu allen Betriebssystemen installieren. Auch wenn je nach Umfang und gewünschter Funktionalität es später einmal notwendig sein sollte eine anspruchsvollere Hardware als Basis zu nutzen sollte für den Einstieg ein Raspberry Pi2 (oder 3) vollkommen ausreichend sein. So ein Raspberry Pi 2/3 mit µSD-Karte, Gehäuse und Netzteil bekommt man bereits ab 50€.

Auch hier gilt: Keine Angst vor Linux! Wir haben [in unserem Downloadbereich](http://www.iobroker.net/?page_id=2563&lang=de) fertige Images u.a. für den Raspberry Pi 2/3 die einen sofortigen Start ermöglichen. Darauf werden wir uns auch in diesem Tutorial beziehen. Der Raspberry Pi wird dabei stellvertretend für Einplatinencomputer genannt.

## Benötigte Software

### Image Raspbian mit ioBroker

Im [Downloadbereich](http://www.iobroker.net/?page_id=2563&lang=de) wird das neueste Image für den Raspberry Pi 2/3 heruntergeladen.

Die heruntergeladene *.zip-Datei wird auf dem Rechner entpackt. Die darin enthalten *.img Datei wird für die weiteren Schritte benötigt.

### Win32 Disk Imager (für Windows)

Unter Windows wird mit dem [Win32Diskimager](https://www.heise.de/download/product/win32-disk-imager-92033) das aus dem zip-Archiv entpackte Image auf eine µSD-Karte geschrieben. Empfohlen wird eine Größe von 16GB.

Nach dem sicheren Entfernen der SD-Karte wird diese in den Raspberry Pi eingelegt und dieser gestartet.

### PuTTY (SSH-Client)

Um möglichst viele Ressourcen auf dem Raspberry Pi einzusparen wird bei den Images ein so genanntes headless Betriebssystem benutzt. Das bedeutet, das dort keine grafische Oberfläche vorhanden ist. Man kann zwar direkt an den Raspberry Pi Monitor, Tastatur und Maus anschließen, kommt dort aber nur auf eine Kommandozeile im Terminal.

Alternativ kann man diesen Terminal auch über das Netzwerk mit einem SSH Client (z.B. [PuTTY](https://www.heise.de/download/product/putty-7016)) vom normalen PC aus erreichen. Dies erleichtert bei späteren möglichen Wartungsarbeiten die Bedienung, da Befehle einfach mit cut & paste aus dem Windows in das Linux-System übertragen werden können. Ich werde PuTTY hier benutzen, die Bedienung am Terminal des Raspberry selbst ist aber identisch.

Jetzt loggen wir uns auf dem Raspberry Pi ein. Der Username ist standardmäßig _**pi**_ und das Passwort _**raspberry.**_ Die Zugangsdaten für andere Images befinden sich in der Downloadtabelle und den Seiten mit den Zusatzinformationen.

Als erstes rufen wir mit `sudo raspi-config` die Konfiguration auf.

Um die volle Größe der SD-Karte, die ja deutlich größer als das Image (2GB) ist, nutzen zu können, muss das Dateisystem über Punkt1 _**Expand filesystem**_ erweitert werden.

Außerdem sollte das Passwort für den User pi über den Menüpunkt 2 _**change user password**_ aus Sicherheitsgründen geändert werden.

Weitere Einstellungen sind möglich, sollten aber bei Verwendung des Images nicht notwendig sein.

Anschließend wird noch ein reboot ausgeführt.

Damit ist die Installation des ioBroker-Servers beendet.

* * *

# [Konfiguration der ersten Adapter](http://www.iobroker.net/?page_id=5063&lang=de)

Nachdem der ioBroker Server läuft muss jetzt die Verbindung zu der Homematic Installation konfiguriert werden.

Dazu wird das Web-Interface des Admin-Adapters geöffnet indem in der Adresszeile des Browsers eingegeben wird:

`<IP_des_ioBroker_Servers>:8081`

Die für die Kommunikation mit Homematic zuständigen Adapter sind _**hm-rpc**_ und _**hm-rega**_. Die Namen klingen anfangs noch etwas technisch (das sind sie auch; sie könnten auch Anna, Maria und Egon heißen), aber wenn man später das System verstanden hat sind diese Namen sogar einfacher zu behalten.

Der Adapter _**hm-rpc**_ verbindet sich mit **einem** Dienst auf der CCU (also entweder Funkmodule **oder** Wired **oder** HMIP **oder** CuxD). Benutzt man mehrere Dienste müssen entsprechend viele Instanzen dieses Adapters angelegt werden (dazu mehr in der verlinkten Seite)

Der Adapter _**hm-rega**_ verbindet sich mit der Logikschicht der CCU (der sogenannten RegaHSS). Über diesen Adapter kommt man an die Klarnamen, Programme, Gewerke und Favoriten. Hier muss nur eine Instanz angelegt werden, in der alle verschiedenen Dienste zusammengefasst werden.

Bevor das zu theoretisch wird, bitte den Link in der Kapitelüberschrift öffnen und dort weiter machen.

Nachdem ioBroker jetzt die Daten aus der CCU bekommt werden wir eine kleine Visualisierung mit .vis erstellen.

* * *

#  [Erstellen einer Visualisierung](http://www.iobroker.net/?page_id=6365&lang=de)

Eine Visualisierung mit .vis dient zum einen der Darstellung von Zuständen oder Messwerten von Sensoren, zum anderen kann es auch als Bedienpanel für Aktoren benutzt werden. Um .vis nutzen zu können muss eine Instanz des Adapters _**vis**_ installiert werden. Eine Instanz des .vis-Adapter wird ebenso angelegt, wie die anderen Adapter, nur dass dort keine Ampel erscheint, da der Adapter nicht dauerhaft läuft. Auch ist hier nur eine Instanz möglich.

Dabei wird automatisch eine Instanz des Adapters _**web**_ mitinstalliert. Dieser stellt standardmäßig ein eigenes Webinterface für den Zugriff auf die Visualisierung unter `<IP_des_ioBroker_Servers>:8082/vis/` zur Verfügung.

In der Grundinstallation stehen nur wenige _**Widgets**_ zur Verfügung. Dies sind Elemente mit denen der Zustand von Geräten angezeigt und bedient werden können. Diese sind zum einen nach Funktionen (time_and_weather) oder Aussehen (Lcars, Metro-Design) sortiert. Zu Beginn sollte man nur mit wenigen Widgetsätzen arbeiten. Weitere Widgetsätze werden ebenso wie die anderen Adapter aktiviert, auch hier nur mit max. einer Instanz je Installation. Dabei ist jedoch zu beachten welche Hardware zur Verfügung steht. Sowohl Server, als auch Frontend (Tablet) benötigen entsprechend Ressourcen.

Das gleiche gilt für Icons, die als Designelemente verwendet werden.

Bei einer Neuinstallation aus einem Image sind diese Adapter bereits installiert und die notwendigen Instanzen erzeugt.

Der Link in der Kapitelüberschrift führt auf eine Seite in der eine einfache Visualisierung Schritt für Schritt erstellt wird.

* * *

# [Loggen von Daten](http://www.iobroker.net/?page_id=6548&lang=de)

Um bei ioBroker Werte oder Zustände von Datenpunkten loggen zu können später deren Verlauf darzustellen oder die Werte zu vergleichen, muss ein für geeigneter Adapter installiert und eine Instanz davon erstellt worden sein. mögliche Adapter dafür wären:

*   **History:**
*   Dieser Adapter schreibt alle Daten in eine json Tabelle, ist daher langsamer und unflexibler (alte Doku: [http://www.iobroker.net/?page_id=144&lang=de](http://www.iobroker.net/?page_id=144&lang=de) )
*   **influxDB:**
*   Dieser Adapter schreibt in eine Datenbank, die auch auf einem anderen Rechner liegen kann. Diese Datenbank bietet genau die Funktionalität, die ioBroker benötigt. Die Datenbank muss vorher installiert werden, ist aber nicht bei einem Betrieb auf einer SD-Karte empfohlen.
*   **<span class="posthilit">sql:</span>**
*   Dieser Adapter schreibt ebenfalls in eine Datenbank, die auch auf einem anderen Rechner liegen kann. SQL ist sehr weit verbreitet und bietet einen großen Funktionsumfang. SQL muss ebenfalls vorher installiert werden.

In den fertigen Images ist bereits ein History-Adapter installiert und eine Instanz davon angelegt. Wie die notwendigen Schritte zum Aufzeichnen von Datenpunkten durchgeführt werden, befindet sich in dem Link in der Kapitelüberschrift.

* * *

# [Darstellung von geloggten Daten](http://www.iobroker.net/?page_id=6562&lang=de)

Um bei ioBroker die geloggten Daten visualisieren muss ein entsprechender Adapter installiert sein. mögliche Adapter dafür wären:

*   **Rickshaw:** Dieser Adapter hat nur einen begrenzten Funktionsumfang und wird nicht mehr weiterentwickelt
*   **flot: **Dieser Adapter hat einen sehr umfangreichen Funktionsumfang und wird daher für die Visualisierung historischer Daten empfohlen.

In den fertigen Images ist bereits ein flot-Adapter installiert und eine Instanz davon angelegt. Auf diesen beziehen wir uns in diesem Tutorial Auch hier gilt: der Adapter besitzt sehr umfangreiche und komplexe Funktionen. Die kann man nutzen, muss es aber nicht. Also keine Angst davor. Später wird man sogar immer etwas finden, das nicht implementiert ist.   Wie die Konfiguration eines Charts zur Darstellung von Datenpunkten durchgeführt wird, befindet sich in dem Link in der Kapitelüberschrift.