---
BADGE-Number of Installations: http://iobroker.live/badges/s7-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.s7.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.s7.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.s7.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.s7.png?downloads=true
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.s7/README.md
title: ioBroker.S7
hash: I6x/U3+nhImauYGf++qbdsGE3FrGTXoqptKnNB87LBo=
---
# IoBroker.S7
## Detaillierte Beschreibung
Der mit ioBroker gelieferte S7-Adapter basiert auf Snap7 \. Snap7 wird bei der Erstinstallation des Adapters installiert und übernimmt die TCP / IP-Kommunikation zwischen der S7-Steuerung und dem ioBroker. Daher ist es zwingend erforderlich, dass die S7 mit einer Ethernet-Schnittstelle (integrierter oder externer CP) ausgestattet ist, um über TCP / IP mit der Hardware zu kommunizieren, auf der ioBroker läuft. Voraussetzung ist, dass der Anwender die Grundlagen der TCP / IP-Kommunikation kennt und die S7-Steuerung mit der Step7-Software konfigurieren kann. Dies sollte jedoch keine Herausforderung für jemanden sein, der die Anbindung einer S7 an den ioBroker in Betracht zieht.

## Installation
Dieses Handbuch basiert auf der folgenden Konfiguration:

* S7-315 mit integrierter Ethernet-Schnittstelle
* Raspberry Pi 2, ioBroker unter Debian GNU / Linux 7.8 (Wheezy)
* IP-Adressbereich 192.168.1.xxx
* PC läuft:
    * Tabellenkalkulationsprogramm wie MS Excel, Apache Open Office
    * Google Chrome Browser
    * Schritt 7 V5.5 SP4 HF5

** benötigtes zusätzliches Dokument: (iobroker_adapter_S7.xlsx) [iobroker_adapter_S7.xlsx] **

### Kommunikation über Datenbausteine (DBs)
Dieses Handbuch beschreibt die Kommunikation zwischen dem ioBroker und der S7-SPS über Datenbausteine. Idealerweise können dedizierte DBs für die Kommunikation generiert werden. Die DBs müssen in den Code der S7 \ eingebunden sein. Der Vorteil dieser Vorgehensweise ist, dass Sie sicher sein können, dass Sie keine Daten versehentlich überschreiben, beispielsweise in einem Instanzdatenbaustein, was zu unerwünschten oder unerwarteten Reaktionen in Ihrer S7-Software führen kann. Wenn Sie vorhandene Datenbausteine aufgrund von Speichereinschränkungen verwenden müssen oder wenn Sie keine Änderungen an der S7-Software vornehmen können, stellen Sie sicher, dass Sie die relevanten Daten nur in ioBroker eingeben, um Konflikte zu vermeiden.

### Kommunikations-DBs erzeugen
Wir werden mit 4 DBs arbeiten:

* DB20 - Binärwerte, die vom ioBroker an die S7 gesendet werden (Digitaleingang aus einer S7-Ansicht)
* DB21 - Binärwerte, die von der S7 an den ioBroker gesendet werden (Digitalausgang aus einer S7-Ansicht)
* DB22 - Reelle Werte, die vom ioBroker an die S7 gesendet werden (analoger Eingang aus einer S7-Ansicht)
* DB23 - Reale Werte, die von der S7 an den ioBroker gesendet werden (analoger Ausgang aus einer S7-Ansicht)

Die DBs werden mit einem Tabellenblatt mit einer Tabelle pro Datenblock generiert.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_1.png)

#### Vorbereitung von DB20 - Binärwerte, die vom ioBroker an die S7 gesendet werden
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_3.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

Die Spalten A bis M basieren auf der Struktur im ioBroker und müssen vom Benutzer auf Basis der S7-Software ausgefüllt werden. Möglicherweise möchten Sie Teile der S7-Symboltabelle verwenden (Kopieren - Einfügen). In Spalte O wird der Code für den S7-DB vom Inhalt in Spalte A bis M abgeleitet.

* Spalte A: DB = DB-Nummer in der S7 und erster Teil der Adresse im ioBroker
* Spalte B: Byte = Byte in der DB in der S7 und zweiter Teil der Adresse in ioBroker
* Spalte C: Bit = Bit in DB in der S7 und dritter Teil der Adresse in ioBroker
* Spalte D: Name = Name in DB in der S7 und Name in ioBroker
* Spalte E: Beschreibung = Kommentar in DB in der S7 und Beschreibung in ioBroker
* Spalte F: Typ = DB in S7 eingeben und ioBroker eingeben
* Spalte G: Länge = Länge in ioBroker
* Spalte H: Einheit = Einheit in ioBroker
* Spalte I: Rolle = Rolle in ioBroker
* Spalte J: Raum = Raum im ioBroker
* Spalte K: Poll = Datenpunkt wird zyklisch abgefragt (true / false)
* Spalte L: RW = Datenpunkt kann geschrieben werden (true / false) è "true" im DB20, da wir Daten in die S7 schreiben wollen
* Spalte M: WP = Datenpunkt wird nur für die unter "Allgemein - Allgemein" definierte "Impulszeit" auf "1" gesetzt.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_config_1.png)

* Spalte N: absichtlich leer gelassen
* Spalte O: DB-Inhalt = Inhalt, der zur DB-Generierung in Step7 kopiert wird. Formel: `` = CONCATENATE (D2; ":"; F2; ": ="; "false;"; "//"; E2 ) `` `

#### Vorbereitung von DB21 - Binärwerte, die von der S7 an ioBroker gesendet werden
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_3.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Spalte L: RW ist im DB21 "falsch", da wir Daten von der S7 lesen wollen

#### Vorbereitung des DB22 - Reelle Werte, die vom ioBroker an die S7 gesendet werden
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_4.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Spalte B: Byte = Startbyte des reellen Wertes (0, 4, 8,…)
* Spalte C: Bit = leer gelassen
* Spalte L: RW ist im DB22 "true", da Daten in die S7 geschrieben werden sollen
* Spalte O: Formel: `` = CONCATENATE_ _ (D2; ":"; F2; ": ="; "0,000000e + 000;"; "//"; E2) ``

#### Vorbereitung des DB23 - Von der S7 an ioBroker gesendete reelle Werte
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_5.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Spalte B: Byte = Startbyte des reellen Wertes (0, 4, 8,…)
* Spalte C: Bit = leer gelassen
* Spalte L: RW ist im DB23 "falsch", da wir Daten von der S7 lesen wollen
* Spalte O: Formel: `` = CONCATENATE_ _ (D2; ":"; F2; ": ="; "0,000000e + 000;"; "//"; E2) ``

#### Erstellen Sie DB-Quellen in Step7
Wir werden jetzt die DBs in Step7 mit dem Code in Spalte O unserer Tabellenkalkulation generieren. Fügen Sie in Ihr Step7-Programm eine AWL-Quelle ein, indem Sie mit der rechten Maustaste auf "Quellen" klicken. [![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_1.png)

Benennen Sie die neue Quelle in "DB20" um.
Fügen Sie den folgenden Code in die leere Quelle ein:

```
DATA_BLOCK DB 20
    TITLE =
    VERSION : 0.1
    STRUCT
    END_STRUCT ;
    BEGIN
END_DATA_BLOCK
```

Die Quelle sollte so aussehen:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_2.png)

Kopieren Sie die Quelle "DB20" dreimal und benennen Sie die Kopien DB21, DB22, DB23.

* `` `DATA_BLOCK DB 21```
* `` `DATA_BLOCK DB 22```
* `` `DATA_BLOCK DB 23```

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_3.png)

Gehen Sie nun zum Tabellenblatt DB20 und kopieren Sie den Code in Spalte O (ohne Überschrift):

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_4.png)

Fügen Sie die Zellen in der Quelle "DB20" in Schritt 7 zwischen "STRUCT" und "END_STRUCT;" ein:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_5.png)

Starten Sie den Compiler und das Ergebnis sollte 0 Fehler, 0 Warnungen sein. Der DB20 ist jetzt generiert und Sie finden den neuen Baustein in Ihrem S7-Programm unter "Bausteine".

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_6.png)

Der Block sieht so aus:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_7.png)

 Die Adresse sollte mit der Adresse in der Tabellenkalkulation übereinstimmen. Führen Sie einfach eine Überprüfung der Integrität durch, indem Sie die Kombination aus Byte und Bit vergleichen:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_8.png)

Wiederholen Sie diesen Vorgang für DB21, DB22, DB23 und stellen Sie sicher, dass Sie die Spalte O aus der rechten Tabelle auswählen und in die richtige Quelle einfügen (Tabelle DB21 bis Quelle DB21 usw.) Die Blöcke werden aussehen.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_9.png)

Auch hier sollte die Adresse mit der Tabelle (Byte) übereinstimmen:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_10.png)

Wir haben jetzt die 4 DBs, die für die Kommunikation erforderlich sind:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_11.png)

Sie sollten dementsprechend einen symbolischen Namen geben, damit die Übersichtlichkeit gewahrt bleibt. Vergessen Sie nicht, sie an die S7-Logik anzuschließen und den geänderten Code herunterzuladen.

### Füllen Sie DBs mit ioBroker auf
Da nun die 4 DBs Teil des in der S7 laufenden Codes sind, werden wir dem ioBroker mitteilen, wie er mit der S7 kommunizieren soll.

#### Installation der S7-Adapter-Instanz
Adapter - Hardware - Siemens S7 Adapter - +

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_1.png)

Mehrere Instanzen sind möglich, falls Ihr ioBroker eine Verbindung mit mehreren S7-CPUs herstellen soll. Aktivieren Sie die neue Adapterinstanz:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_2.png)

Der Titel des Adapters (Standard: Siemens S7 Adapter) kann in diesem Schritt ebenfalls geändert werden. Die Verwendung der IP-Adresse als Teil des Titels wäre eine Idee. Öffnen Sie die Adapterkonfiguration

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_3.png)

und starten Sie den S7-Adapter zu konfigurieren:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_4.png)

* Tab "Allgemein"
    * SPS-Verbindung
        * SPS-IP-Adresse IP-Adresse der SPS, wie in Step7 HW-Konfig definiert

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_5.png)

* S7 LOGO! Wenn Sie eine LOGO verwenden, keine S7-SPS
* PLC Rack Racknummer der CPU, wie in Step7 HW Config (R0 / S2) angegeben.
* PLC Slot Steckplatznummer der CPU wie in Step7 HW Config (R0 / S2) angegeben

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_6.png)

* Allgemeines
    * Runden auf: Anzahl der Ziffern, auf die die tatsächlichen Werte gerundet werden, z. B .: 2 -> 12.12 3 -> 12.123… 9 -> 12.123456789
    * Poll delay: Kommunikationsaktualisierungszyklus in Millisekunden
* <span style="line-height: 1.5;">Wiederverbindungszeit</span> : Die <span style="line-height: 1.5;">Dauer in Millisekunden nach einer Wiederverbindung wird versucht, wenn die Verbindung zur S7 unterbrochen wurde</span>
* Impulszeit: <span style="line-height: 1.5;">Zeit in Millisekunden für &quot;1&quot; für Datenpunkte, die als WP = true konfiguriert sind</span>
* Import Symboldatei:
    * Symbole laden Funktion zum Importieren von Step7-Symbolen aus einer ASCII-Datei - hier nicht verwendet
* DB-Datei importieren:
    * Fügen Sie ein DB-Feature hinzu, um Step7-DBs aus einer ASCII-Datei zu importieren - hier nicht verwendet

#### Konfigurieren Sie ioBroker für die Kommunikation
Wir überspringen die Registerkarten "Eingänge", "Ausgänge" und "Marker" und gehen direkt zu "DBs":

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_7.png)

Hier finden Sie die Struktur der Tabellenkalkulation. Wir sind wieder bereit für das Bulk Engineering. Klicken Sie auf die Schaltfläche "Import from CSV" [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_8.png)

und du bekommst ein leeres Feld. Gehen Sie nun erneut zum Tabellenblatt DB20 und kopieren Sie die Spalten A bis M (ohne Überschriften). [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_9.png)

Fügen Sie die Zellen in das leere Importfeld in ioBroker ein und bestätigen Sie mit "Export" - was "Import" heißen soll. [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_10.png)

Die erste DB ist fertig und bereit für die Kommunikation:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_11.png)

Wiederholen Sie dies für DB21, DB22, DB23 \. Jedes Mal, wenn Sie auf "Import from CSV" klicken, wird ein leeres Feld angezeigt, der Inhalt wird jedoch zur Liste hinzugefügt. Sie sollten in kürzester Zeit fertig sein, egal wie viele Datenpunkte Sie füllen möchten. Wenn Sie die Funktionen von ioBroker nutzen möchten, indem Sie Länge, Einheit, Rolle, Raum ausfüllen, können Sie dies auch im Arbeitsblatt tun, um das Bulk-Engineering zu nutzen. Wenn Sie sich später oder nur für einige Datenpunkte entscheiden, können Sie dies auch direkt im ioBroker unter „DBs“ mit den integrierten Bearbeitungsoptionen tun. Vergessen Sie nicht zu sparen! 12 [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_12.png)

#### Kommunikationstest
Wechseln Sie im ioBroker auf die Registerkarte "Objekte" und suchen Sie die S7-Instanz (z. B. s7.0, nicht system.adapter.S7.0). Wenn Sie etwas vermissen: F5 (Webseiten-Update) ist König! Sie finden zwei Gruppen:

* DBs mit den 4 konfigurierten DBs:
    * DB20
    * DB21
    * DB22
    * DB23
* Info mit Informationen zur Verbindung:
    * Verbindung: "true", wenn die S7 im Netzwerk gefunden werden kann
    * pdu: PDU-Größe Snap7 ist mit der S7 verbunden (normalerweise 240 für S7-300, 480 für S7-400)
    * poll_time: Zeit in Millisekunden, die Snap7 für die Kommunikation benötigt - sollte niedriger sein als die unter "Allgemein" - "Allgemein" in der Adapterinstanzkonfiguration konfigurierte Abrufverzögerung.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_13.png)

 Wir haben DB21 und DB23 als DBs konfiguriert, die Informationen an ioBroker senden, d. H. Wenn Sie die DBs unter "Objekte" öffnen, sollten Sie bereits Werte sehen, die angeben, dass die DBs Daten aus dem S7-Code erhalten.

## Überwachung und Betrieb in Vis
Starten Sie ioBroker.vis über die Registerkarte "Instanzen". Ich empfehle die vis-hqwidgets zu installieren. Beginnen wir mit einem Schalter:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_14.png)

Ziehen Sie ein Switch-Widget per Drag & Drop in Ihre Ansicht, verbinden Sie es mit der Objekt-ID eines Switches in DB20, und Sie sind fertig. Wenn Sie jetzt den Schalter betätigen, werden Sie feststellen, dass der Datenpunkt unter "Objekte" - "s7.x" - "DBs" - "DB20" wechselt und die S7 ein- und ausschaltet, was immer mit dem DB verbunden ist. Wenn Sie den DB in Step7 online überwachen, werden Sie feststellen, dass sich der Datenpunkt im DB von "0" auf "1" ändert. Ein binärer Status funktioniert genauso: Ziehen Sie ein Widget in Ihre Ansicht und stellen Sie eine Verbindung her der relevante Datenpunkt von DB21 zu ihm. Und für reale Werte gilt dasselbe:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_15.png)

Wichtig: Der Benutzer ist dafür verantwortlich, die richtigen Datenpunkte mit den Widgets zu verbinden. Sie können einen realen Wert mit einem binären Status verbinden (z. B. Glühbirne), sodass die Glühbirne nach dem realen Wert> 1,0 "Ein" zeigt. Das ist alles, Leute, ziemlich einfach und unkompliziert, oder?

## Changelog
### 1.1.4 (2018.07.10)
* (Apollon77) Support for nodejs 10 on windows

### 1.1.3 (2018.01.19)
* (bluefox) The time offset was added

### 1.1.1 (2018.01.05)
* (Apollon77) Fix LOGO! support

### 1.1.0 (2018.01.03)
* (bluefox) Fix strings
* (bluefox) fix names if they have more than one space

### 1.0.6 (2017.12.18)
* (bluefox) Decode error codes

### 1.0.5 (2017.12.17)
* (bluefox) Error by the DB import is fixed

### 1.0.4 (2017.11.30)
* (bluefox) Fix read of DB (range error)

### 1.0.2 (2017.10.30)
* (Apollon77) Enhance object data to allow writing if available
* (bluefox) Add export from Graphpic

### 1.0.1 (2017.10.24)
* (bluefox) Detect DB and db in addresses

### 1.0.0 (2017.09.25)
* (bluefox) Activate save button if something was deleted

### 0.3.2 (2017.09.20)
* (bluefox) Fix DB bit offset bug if starting not from 0

### 0.3.0 (2017.07.12)
* (Apollon77) Upgrade node-snap7 library to current version

### 0.2.6 (2017.05.19)
* (Apollon77) Fix history handling

### 0.2.5 (2016.12.09)
* (bluefox) Fix button text: Import

### 0.2.4 (2015.10.29)
* (bluefox) add comment about python
* (bluefox) implement string read and write
* (bluefox) implement auto-increment of addresses.
* (bluefox) fix length
* (bluefox) implement export import from/to CSV
* (bluefox) fix small errors in config
* (bluefox) implement import/export for inputs and outputs too.
* (bluefox) add translation

### 0.2.3 (2015.09.24)
* (bluefox) add suppor of Logo!

### 0.2.2 (2015.09.11)
* (bluefox) add S7time
* (bluefox) support rooms and roles
* (bluefox) it works
* (bluefox) update packets

### 0.2.1 (2015.09.09)
* (bluefox) fix creation of objects

### 0.2.0 (2015.08.15)
* (bluefox) improve performance and enable DB2 3.9 addresses.

### 0.1.8 (2015.08.10)
* (smiling_Jack) Bugfix send info states
* (smiling_Jack) Remove unneeded conole.log

### 0.1.7 (2015.08.06)
* (smiling_Jack) Bugfix send to SPS
* (smiling_Jack) Bugfix reconnect on connection lost

### 0.1.6 (2015.07.31)
* (smiling_Jack) Bugfix typo (Adress, Merkers)

### 0.1.5 (2015.07.29)
* (smiling_Jack) Bugfix translation Admin

### 0.1.4 (2015.07.28)
* (smiling_Jack) Add S5Time as Type
* (smiling_Jack) Bugfix History
* (smiling_Jack) Bugfix (fast value change)

### 0.1.3 (2015.06.04)
* (bluefox) translate admin
* (bluefox) remove jshint warnings
* (bluefox) add info.connected and rename info.connection to info.state

### 0.1.2
* Bugfix startup
* Bugfix add states

### 0.1.1
* change import options

### 0.1.0
* redesign Admin UI
* add write as Pulse
* Bugfix delete unused objects

### 0.0.8
* Bugfix start file
* Bugfix DB import
* Working on Admin style
* Add Units

### 0.0.6
* Bugfix start file