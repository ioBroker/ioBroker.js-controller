---
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-Greenkeeper badge: https://badges.greenkeeper.io/foxriver76/ioBroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
---
![Logo](media/sonnen.png)

# sonnen Adapter
Der sonnen Adapter ermöglicht die Einbindung einer sonnenBatterie in den ioBroker.

## Überblick

### sonnenBatterie

Mit der sonnenBatterie kann selbst erzeugte Energie aus der Solaranlage für den Eigenbedarf gespeichert werden 
und genau dann genutzt werden, wenn sie gerade benötigt wird. Dadurch ist es möglich sich von anonymen Energiekonzernen 
unabhängig zu machen und selbst zum autarken Stromproduzenten zu werden. Der intelligente High-Tech-Stromspeicher 
sorgt dank des integrierten Energiemanagers dafür, dass der Haushalt bestmöglich mit eigenem Strom versorgt wird. 
Dies ist nicht nur kostengünstig, sondern auch umweltfreundlich! Die sonnenBatterie gibt es in verschiedenen und 
flexiblen Speichermodellen.

### sonnen Adapter
Der sonnen Adapter kann eine sonnenBatterie im Netzwerk überwachen und steuern. Mithilfe des Discovery Adapters (TODO: Link)
können sonnenBatterien im Netzwerk automatisch gefunden werden.
<br/>
Der Adapter legt States zur Überwachung und Steuerung der sonnenBatterie in Form von Objekten an. Ein Großteil der 
States dient lediglich zur Überwachung der Batterie, während durch das beschreiben einiger States die Batterie zusätzlich 
gesteuert werden kann.

## Voraussetzungen vor der Installation
Voraussetzungen für den Betrieb einer sonnenBatterie mit dem ioBroker, ist die erfolgreiche Einrichtung der Batterie
durch einen Elektriker. Ebenfalls muss sich die Batterie im gleichen Netzwerk wie der ioBroker befinden.

### Installation
Eine Instanz des Adapters wird über die ioBroker Admin-Oberfläche installiert. 
Die ausführliche Anleitung für die dazu notwendigen Installatonschritte kann hier (TODO:LINK) nachgelesen werden.
<br/><br/>
Nach Abschluss der Installation einer Adapterinstanz öffnet sich automatisch ein Konfigurationsfenster.

## Konfiguration

### Fenster "Haupteinstellungen"
![Main Settings](media/mainSettings.png "Haupteinstellungen")

| Feld         | Beschreibung |                                                                       
|:-------------|:-------------|
|IP-Adresse    |Hier soll die IP-Adresse der gewünschten sonnenBatterie angegeben werden.|


### Fenster "Erweiterte Einstellungen"
![Advanced Settings](media/advancedSettings.png "Erweiterte Einstellungen")

| Feld         | Beschreibung |                                                                       
|:-------------|:-------------|
|Abfrageintervall|Hier kann ein alternativer Wert in Millisekunden gesetzt werden. In diesem Intervall werden die States der sonnenBatterie aktualisiert.|


Nach Abschluss der Konfiguration wird der Konfigurationsdialog mit `SPEICHERN UND SCHLIEßEN` verlassen. 
Dadurch efolgt im Anschluß ein Neustart des Adapters.

## Instanzen
Die Installation des Adapters hat im Bereich `Objekte` eine aktive Instanz des sonnen Adapters angelegt.
<br/><br/>
![Instanz](media/instance.png "Instanz")
<span style="color:grey">*Erste Instanz*</span>

Auf einem ioBroker Server können mehrere sonnen Adapter Instanzen angelegt werden. Umgekehrt kann eine sonnenBatterie auch
mit mehreren ioBroker Servern betrieben werden. Sollen mehrere Geräte von einem ioBroker Server gesteuert werden, 
sollte je Batterie eine Instanz angelegt werden.
<br/><br/>
Ob der Adapter aktiviert oder mit der Batterie verbunden ist, wird mit der Farbe des Status-Feldes der 
Instanz verdeutlicht. Zeigt der Mauszeiger auf das Symbol, werden weitere Detailinformationen dargestellt. 

## Objekte des Adapters
Im Bereich `Objekte` werden in einer Baumstruktur alle vom Adapter im Hub 
erkannten Geräte und Aktivitäten aufgelistet. Zusätzlich wird auch noch 
darüber informiert, ob die Kommunikation mit dem Hub reibungslos erfolgt.

![Objekte](media/objects.png "sonnen Objekte")
<span style="color:grey">*Objekte des sonnen Adapters*</span>

Nachfolgend werden die Objekte in States und Buttons unterteilt. Da es zwei unterschiedliche APIs je nach Batterie gibt,
werden nur die States angelegt, die von der jeweiligen Batterie unterstützt werden.
Jeder Datenpunkt ist mit seinem zugehörigen Datentyp sowie seinen Berechtigungen aufgehführt. 
Berechtigungen können lesend (R) sowie schreibend (W) sein. Jeder Datenpunkt kann mindestens gelesen (R) werden, während
andere ebenfalls beschrieben werden können. Zur Suche nach einem bestimmten Datenpunkt empfiehlt sich die Suche mittels 
der Tastenkombination "STRG + F".

### States

#### Channel: info

* info.connection

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, wenn die Verbindung zwischen ioBroker und Batterie hergestellt ist.*
   
* info.lastSync

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |timestamp|R|

   *Nur lesbarer Zeitstempel, der bei jeder Aktualisierung der Daten, aktualisiert wird.*
   
* info.configuration

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbarer JSON String, mit Konfigurationsinformationen der sonnenBatterie.*
   
#### Channel: status
   
* status.consumption

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher den aktuellen Verbrauch des Hauses in Watt beinhaltet.*
   
* status.production

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher angibt, wie viel Watt derzeit von der PV-Anlage produziert werden.*
   
* status.pacTotal

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher die Wechselrichter AC-Leistung angibt. 
   Wenn der Wert größer als 0 ist wird die Batterie entladen, bei einem Wert kleiner 0, geladen.*
   
* status.relativeSoc

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher den aktuellen Batterieladestand repräsentiert.*
   
* status.userSoc

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher den aktuellen Batterieladestand repräsentiert.*
   
* status.acFrequency

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher die AC Frequenz in Hertz repräsentiert.*
   
* status.acVoltage

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher die aktuelle AC (Wechselstrom) Stromspannung des Wechselrichters darstellt.*
   
* status.batteryVoltage

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher die derzeitige DC (Gleichstrom) Stromspannung der Batterie darstellt.*
   
* status.systemTime

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |date|R|

   *Nur lesbares ISO Datum, welches die Systemzeit der Batterie repräsentiert.*
   
* status.systemInstalled

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, wenn das System korrekt installiert ist.*
   
* status.batteryCharging

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert. Dieser ist true, wenn die sonnenBatterie derzeit geladen wird.*
   
* status.flowConsumptionBattery

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert. Dieser ist True, wenn die Batterie derzeit entladen wird.*
   
* status.flowConsumptionGrid

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, wenn derzeit Strom vom Netz bezogen wird.*
   
* status.flowConsumptionProduction

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert. Dieser ist true, wenn derzeit Strom direkt von der PV-Anlage verbraucht wird.*
   
* status.flowGridBattery

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Indikator, welcher true ist, wenn die Batterie derzeit durch das Netz geladen wird.*
   
* status.flowProductionBattery

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, wenn die Batterie derzeit direkt durch die PV-Anlage geladen wird.*
   
* status.flowProductionGrid

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, wenn der erzeugte Strom derzeit in das Netz eingespeist wird.*
   
* status.gridFeedIn

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbarer number Wert, welcher die Menge an Strom in Watt repräsentiert, die derzeit in das Netz eingespeist 
   oder bezogen wird.
   Wenn der Wert positiv ist, wird derzeit in das Netz eingespeist, wenn dieser negativ ist, wird die Menge an Strom 
   vom Netz bezogen.*
   
#### Channel: control

* control.charge

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number Wert, welcher es ermöglicht die maximale Entladung der Batterie in Watt festzulegen.*
   
   *Hinweis: Wenn ein ungültiger Wert gesetzt wird, wird dieser trotzdem bestätigt. Die Bestätigung (Acknowledge) des Wertes bedeutet
   lediglich, dass das Kommando an die Batterie übertragen wurde.*
   
   *Example:*
    ```javascript
    setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
    ```
   
* control.discharge

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R/W|

   *Number Wert, welcher es ermöglicht die maximale Ladung der Batterie in Watt festzulegen.*
    
    *Hinweis: Wenn ein ungültiger Wert gesetzt wird, wird dieser trotzdem bestätigt. Die Bestätigung (Acknowledge) des Wertes bedeutet
    lediglich, dass das Kommando an die Batterie übertragen wurde.*
   
   *Example:*
    ```javascript
    setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
    ```

## Changelog

### 1.3.0
* (foxriver76) introducing new state with configuration information (supported on :8080 API)

### 1.2.0
* (foxriver76) support of another sonnen api

### 1.1.2
* (foxriver76) bugfix for control states

### 1.1.1
* (foxriver76) add compact mode compatibility

### 1.0.2
* (foxriver76) use adapter-core module

### 1.0.1
* (foxriver76) take timezone offset into account on time states

### 1.0.0
* (foxriver76) formal version increment

### 0.0.8
* (foxriver76) Enhanced debug logging
* (foxriver76) Prevent crashing when a return code is received

### 0.0.7
* (foxriver76) Only set info.connection on change

### 0.0.6
* (foxriver76) Only set states if request was successfull --> prevents adapter crash

### 0.0.5
* (foxriver76) translations on index_m.html
* (foxriver76) use 7000 as interval if poll interval is undefined

### 0.0.3
* (foxriver76) fixed links to bugs, repo etc

### 0.0.2
* (foxriver76) bugfixes on control states
* (foxriver76) big readme update
* (foxriver76) addded more states
* (foxriver76) added advanced settings

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Moritz Heusinger <moritz.heusinger@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.