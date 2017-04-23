# Aufsetzen eines ioBroker-Servers

Um mit ioBroker arbeiten zu können benötigt man einen "Server" auf dem ioBroker läuft.

Prinzipiell lässt sich ioBroker auf nahezu allen Betriebssystemen installieren. Auch wenn je nach Umfang und gewünschter Funktionalität es später einmal notwendig sein sollte eine anspruchsvollere Hardware als Basis zu nutzen sollte für den Einstieg ein Raspberry Pi2 (oder 3) vollkommen ausreichend sein. So ein Raspberry Pi 2/3 mit µSD-Karte, Gehäuse und Netzteil bekommt man bereits ab 50€.

Auch hier gilt: Keine Angst vor Linux! Wir haben [in unserem Downloadbereich](http://www.iobroker.net/?page_id=2563&lang=de) fertige Images u.a. für den Raspberry Pi 2/3 die einen sofortigen Start ermöglichen. Darauf werden wir uns auch in diesem Tutorial beziehen. Der Raspberry Pi wird dabei stellvertretend für Einplatinencomputer genannt.



## Benötigte Software

### Image Raspbian mit ioBroker

Im [Downloadbereich](http://www.iobroker.net/?page_id=2563&lang=de) wird das neueste Image für den Raspberry Pi 2/3 heruntergeladen.

[![](img/ioBroker_Einsteiger_Downloads.jpg)](img/ioBroker_Einsteiger_Downloads.jpg)

Die Tabelle ist so sortiert, dass die neuesten Images weiter oben stehen.

Zu (fast) jedem Image gibt es weitere Informationen, die über das Lupen(+)-Icon in der letzten Spalte aufgerufen werden können. Diese enthält die Informationen über die verwendeten Versionen sowie Anweisungen für das weitere Vorgehen:

[![](img/ioBroker_Einsteiger_Images01.jpg)](img/ioBroker_Einsteiger_Images01.jpg)

Die heruntergeladene *.zip-Datei wird auf dem Rechner entpackt. Die darin enthalten *.img Datei wird für die weiteren Schritte benötigt.

### Win32 Disk Imager (für Windows)

Unter Windows wird mit dem [Win32Diskimager](https://www.heise.de/download/product/win32-disk-imager-92033) das aus dem zip-Archiv entpackte Image auf eine µSD-Karte geschrieben. Empfohlen wird eine Größe von 16GB.


![](img/einsteigerseiten-server-aufsetzen_ioBroker_Einsteiger_Images_Win32_Items.jpg)


Dazu wird der Pfad zu der *.img Datei im Feld (1) eingetragen. Über den File-Explorer (2) kann man nach der Datei suchen.

im Pulldownmenü _**Device**_ wird der Kartenleser mit der µSD-Karte ausgewählt.

<span style="color: #ff0000;">**Achtung:**</span> Der Win32 Disk Imager gibt hier zwar nur externe Laufwerke an. Allerdings auch USB-Laufwerke. Bitte genau vergewissern, dass sich in dem ausgewählten Laufwerk auch die zu beschreibende Karte befindet!

Mit anklicken des Buttons _**Write**_ (4) beginnt nach vorheriger Sicherheitsabfrage der Schreibvorgang auf die SD-Karte.

Nach dem sicheren Entfernen der SD-Karte wird diese in den Raspberry Pi eingelegt und dieser gestartet.

### PuTTY (SSH-Client)

Um möglichst viele Ressourcen auf dem Raspberry Pi einzusparen wird bei den Images ein so genanntes headless Betriebssystem benutzt. Das bedeutet, das dort keine grafische Oberfläche vorhanden ist. Man kann zwar direkt an den Raspberry Pi Monitor, Tastatur und Maus anschließen, kommt dort aber nur auf eine Kommandozeile im Terminal.

Alternativ kann man diesen Terminal auch über das Netzwerk mit einem SSH Client (z.B. [PuTTY](https://www.heise.de/download/product/putty-7016)) vom normalen PC aus erreichen. Dies erleichtert bei späteren möglichen Wartungsarbeiten die Bedienung, da Befehle einfach mit cut & paste aus dem Windows in das Linux-System übertragen werden können. Ich werde PuTTY hier benutzen, die Bedienung am Terminal des Raspberry selbst ist aber identisch.

Um mit Putty auf den Raspberry zugreifen zu können muss der Zugang noch konfiguriert werden.

[![](img/ioBroker_Einsteiger_Images_Putty_Items.jpg)](img/ioBroker_Einsteiger_Images_Putty_Items.jpg)

Im Feld **_Host Name_** (1) wird die IP des Raspberry eingegeben (Da standardmäßig keine festen IP-Adressen vergeben sind, kann man im Router nachsehen, welche IP-Adresse der Router dem Raspberry vergeben hat)

Der Zugriffsport für SSH ist 22\. Dies ist üblicherweise voreingestellt. Sollte das nicht der Fall sein kann es über die Felder (2) oder (3) eingestellt werden.

Im Feld (4) kann man jetzt einen Namen vergeben und über den Button _**Save**_ (5) abspeichern, damit die Verbindung für den nächsten Zugriff gespeichert wird.

Mit dem Button _**Open**_ (6) wird dann die Sitzung gestartet.

[![](img/ioBroker_Einsteiger_Images_Putty_login.jpg)](img/ioBroker_Einsteiger_Images_Putty_login.jpg)

Jetzt loggen wir uns auf dem Raspberry Pi ein. Der Username ist standardmäßig _**pi**_ und das Passwort _**raspberry.**_ Die Zugangsdaten für andere Images befinden sich in der Downloadtabelle und den Seiten mit den Zusatzinformationen.

* * *

Als erstes rufen wir mit sudo raspi-config die Konfiguration auf. [![](img/ioBroker_Einsteiger_Images_Putty_raspi-config.jpg)](img/ioBroker_Einsteiger_Images_Putty_raspi-config.jpg) Um die volle Größe der SD-Karte, die ja deutlich größer als das Image (2GB) ist, nutzen zu können, müssen das Dateisystem erweitert werden. Außerdem sollte das Passwort für den User pi über den Menüpunkt 2 ebenfalls aus Sicherheitsgründen geändert werden. Weitere Einstellungen sind möglich, sollten aber bei Verwendung des Images nicht notwendig sein. Anschließend wird noch ein reboot ausgeführt. Damit ist die Installation des ioBroker-Servers beendet.