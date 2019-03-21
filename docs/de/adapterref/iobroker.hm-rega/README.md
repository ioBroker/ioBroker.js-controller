![](media/homematic.png) 
# HomeMatic ReGaHSS

## Homematic
>Homematic ist das Smart Home System von eQ-3, das die umfassende Steuerung
unterschiedlichster Funktionen mithilfe von Szenarien (von einfach bis komplex)
in Haus oder Wohnung ermöglicht.

>Die Geräte beinhaltet Produkte zur Licht-, Rollladen- und Heizungssteuerung,
Gefahrenmelder, Sicherheitssensoren und Produkte zur Wetterdatenmessung. Die
Funkkommunikation vereinfacht dabei das Nachrüsten. In Neubauten können
Drahtbus-Komponenten eingesetzt werden.

[Quelle](https://www.eq-3.de/produkte/homematic.html)

## Adapter Homematic ReGaHss
Dieser Adapter stellt eine Verbindung zur Homematic Logikschicht „ReGaHSS“ (**Re**sidential **Ga**teway) her.
Er synchronisiert Klarnamen, Systemvariablen, Räume, Gewerke und Programme
zwischen Homematic und ioBroker.

Falls mehrere Zentralen in ioBroker eingebunden werden sollen, ist für jede
Zentrale eine eigene Instanz zu installieren und konfigurieren.

Mit der Installation von ReGaHSS wird auch eine Instanz des Adapters <a href="https://github.com/ioBroker/ioBroker.docs/tree/master/docs/adapterref/docs/iobroker.hm-rpc/de" title="Dokumentation Adapter hm-rpc">hm-rpc</a>
installiert, die vorab konfiguriert und aktiviert werden sollte.

Eine Instanz dieses Adapters kann bis zu 5 unterschiedliche Instanzen des
Homematic RPC Adapters verwalten, die verschiedene Dienste zur Verfügung stellen
(jeder Dienst benötigt eine eigene RPC-Instanz):

-   rfd (CCU-Funkdienst für Standardkomponenten)
-   hs485d (Wired) (für Drahtbus-Komponenten)
-   CuxD (Zusatzsoftware zur Bereitstellung einer universellen Schnittstelle)
-   Homematic IP (IP-gestützte Komponenten)
-   Virtual Devices

### Voraussetzungen vor Installation
-   Homematic Gateway (CCU/CCU2/CCU3 …) *oder*
-   Funkmodul mit passender Software (piVCCU(*x)*, RaspberryMatic o.ä.)

## Installation

Eine Instanz des Adapters wird über die ioBroker Admin-Oberfläche installiert.

Nach Abschluss der Installation öffnet sich automatisch das
Konfigurationsfenster.

Vor der eigentlichen Konfiguration sollte die (zusammen mit diesem Adapter
erstellte) Instanz des HM-RPC-Adapters oder bei Bedarf weitere HM-RPC-Instanzen
angelegt und konfiguriert werden.

## Konfiguration

![](media/01c7dbc4da0240421b0711b331971d2d.png)
**Auswahlmenü oben**

Im oberen Auswahlmenü können drei verschiedenen Bereiche ausgewählt werden:

### Bereich Haupteinstellungen
![](media/3e0325b2bf61e508e131f8792e2c004d.png)
**Haupteinstellungen**

In diesem Bereich werden die grundlegenden Einstellungen vorgenommen.

Im Pulldown-Menü kann die IP-Adresse der CCU ausgewählt werden; auch der
Wiederverbindungsintervall (Standard 30 sec) kann vom User angepasst werden.

![](media/ce181cdbb3b8979e1233b57a4588cf1d.png)
**Zuordnung der RPC-Instanzen**

Danach werden die erforderlichen Dienste aktiviert und mit der passenden
HM-RPC-Instanz verknüpft.

Polling

Wenn aktiviert, erfolgt die regelmäßige Abfrage der RegaHSS-Daten von der CCU,
die sich nach dem im Feld Intervalle eingestellten Sekunden richtet. Der
Intervall sollte nicht zu niedrig eingestellt werden, da ein zu häufiges
Abfragen zum Absturz der CCU führen kann.

Trigger

Um die aktiven Abfragen von ioBroker an den RegaHSS zu minimieren, kann auf der
CCU innerhalb eines Programms auch ein Trigger die Daten bei Änderung pushen.
Dafür kann eine virtuelle Taste der CCU genutzt werden, die in einem
CCU-Programm ausgelöst wird. Standardmäßig ist dies die Taste
BidCosRF.50.PRESS_SHORT (s. Beispielprogramm).

### Bereich Synchronisiere

Hier kann der User festlegen, welche Information von der CCU in ioBroker
übernommen werden. Es werden dann die entsprechenden Objekte und Datenpunkte in
ioBroker angelegt.

-   DutyCycle: Aktivieret die Angabe des Duty Cycles (in %)
-   Variablen: Aktiviert die Übernahme der Systemvariablen von der CCU
-   Programme: Aktiviert die Übernahme der Programmbezeichnungen von der CCU
-   Namen: Aktiviert die Übernahme der Klartextnamen der Datenpunkte von der CCU
-   Favoriten: Aktiviert die Übernahme und Auflistung der Favoriten
-   Räume: Aktiviert die Übernahme der Räume und einer Auflistung derselben
-   Gewerke: Aktiviert die Übernahme der Gewerke und einer Auflistung derselben

### Bereich Zusätzliche Einstellungen

Hier kann der User entscheiden, ob https (verschlüsselte und abhörsichere
Verbindung) genutzt werden soll. Wenn aktiviert, ist die Eingabe des
Nutzernamens und das dazugehörige Passwort erforderlich

Sind alle Einstellungen erfolgt, wird die Konfigurationsseite mit dem Befehl
„speichern und schließen“ abgeschlossen (Button unterhalb des
Einstellungsbereiches). Der Adapter wird geschlossen und die Instanz mit den
neuen Werten gestartet.

### Instanz

![](media/44785b82964bcdc198565b1681787dc0.png)
**Instanz und Signal**

Im Bereich *Instanzen* des ioBrokers findet sich nun die erstellte(n)
Instanz(en). Links ist im Ampelsystem visualisiert, ob der Adapter aktiviert
oder mit der CCU verbunden ist.

Platziert man den Mauszeiger auf ein Symbol, erhält man Detailinformationen.

### Objekte des Adapters

Im Bereich Objekte werden in einer Baumstruktur alle vom Adapter von der CCU
übermittelten Werte und Informationen dargestellt.

Da die Objekte anwenderspezifisch sind, werden hier nur die allgemeinen und für
alle Anwender gleichen Objekte dargestellt.

![](media/c24d8382beda4c970093097959080524.png)
**Ordnerstruktur**

Die ersten Ordner (i.d.R. Ziffern-ID) sind die in der CCU enthaltenen Programme.

CCU- und Info-Ordner beinhalten die Basisinformationen des Gateways inkl.
prozentualer Angabe des Duty Cycles (sofern aktiviert).

Abschließend sind die in der CCU angelegten Variablen aufgelistet

### FAQ
