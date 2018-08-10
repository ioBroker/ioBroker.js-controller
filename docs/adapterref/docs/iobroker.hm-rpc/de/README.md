---
editLink:    "https://github.com/Pmant/ioBroker.hm-rpc/blob/master/README.md"
lastChanged: "03.08.2018"
---

![HM-RPC](media/homematic.png ':size=120' ':no-zoom')

# HM-RPC-Adapter
Der hm-rpc Adapter bietet die Anbindung an die Kommunikationsmodule einer Homematic-Zentrale.
Es werden die Module rfd (Funk), rfd-IP (HM-IP Funk), hs485d (wired), cuxd (Zusatzsoftware zur Anbindung externer Komponenten) und homegear (CCU Ersatz) unterstützt. Eine Instanz des Adapters ist für genau EINES dieser Module zuständig. Sollen mehrere Module parallel unterstützt werden, muss für jedes Modul eine eigene Instanz installiert werden.


<!-- Einführungsbild-->
![CCU1](media/CCU_600.png ':size=250' "HM-Cen-3-1-B") <span style="color:grey">  
*HM-Cen-3-1-B*</span>


## Steckbrief
> Achtung! Die folgende Tabelle dient nur als Beispiel. Sie wird vom 
  Dokumentengenerator dynamisch erzeugt und an dieser Stelle eingefügt.
  Je nach den ausgewählten Feldern sind die Datenquellen z.B. `frontmatter`,
  `io-package.json` und `package.json` des jeweilgen Adapters.

|                         |                              |
|-------------------------|:----------------------------:|
| Stand der Doku          | {date:}                      | 
| aktuelle Version stable | ![stable][logo]              |
| aktuelle Version latest | ![latest][logo]              | 
| OS                      | Linux, WIN, OS X             |
| node-Version            | >= 4.0                       |
| Entwickler              | hobbyquaker, bluefox   |
| Github                  | https://github.com/ioBroker/ioBroker.hm-rpc       |
| Lizenz                  | MIT                          |
| Kategorie               | gemäß Adapterliste           |
| Keywords                | Homematic, CCU                   |
| Abhängigkeiten          | `dependencies`               |      



## Beschreibung

### HM-RPC
Der **R**emote **P**rocedur **C**all, kurz RPC ist eine Technik zur Realisierung von 
Interprozesskommunikation. Sie ermöglicht den Aufruf von Funktionen in anderen Adressräumen. 
Im Normalfall werden die aufgerufenen Funktionen auf einem anderen Computer als das aufrufende 
Programm ausgeführt. Es existieren viele Implementierungen dieser Technik, die in der Regel 
untereinander nicht kompatibel sind.




### HM-RPC-Adapter
Der Adapter kommuniziert entweder über BIN-RPC oder XML-RPC mit dem entsprechenden Modul.
Je nach verbundenem Dienst ist das entsprechende Protokoll zu wählen.

Der Adapter arbeitet über eine Ereignisschnittstelle. Daher ist es wichtig, die Adapter 
Adresse korrekt anzugeben. Die CCU sendet dann automatisch Ereignisse an den Adapter, 
d.h. ein zyklisches Pollen wie z.B. bei hm-rega ist nicht notwendig. Zusätzlich verfügt 
der Adapter über die Funktionalität, die Verbindung zur CCU zyklisch zu überwachen. 
Werden neue Geräte an der CCU angelernt ist es notwendig, den Adapter neu zu starten 
mit der Konfigration “Initiere Geräte neu (einmalig)”. Dadurch werden die Informationen 
über die neuen Homematic-Geräte an den Adapter übertragen.



## Voraussetzungen vor der Installation
Der Anwender erhält hier Informationen, welche Schritte ggf. vor der Installation 
des Adapters u.a. auf externen Systemen auszuführen sind. Dazu gehören z.B. die
Registrierung von API-Keys oder die Konfiguration von angebundenen System 
nach Herstellerdokumentation. 



## Installation
Hier werden Besonderheiten zur Installation beschrieben, die den Umfang der
**hier** dokumentierten Standardinstallation überschreiten. Das kann z.B.
die manuelle Installation von Software vor der eigentlichen Adapterinstallation
oder die Freischaltung von Ports auf dem Server sein.

> Eine Instanz des Adapters wird über die ioBroker Admin-Oberfläche installiert. 
  Die ausführliche Anleitung für die dazu notwendigen Installatonschritte ist
  **hier** beschrieben.



<a name="konfiguration"/>

##  Konfiguration
Kurzer Einleitungssatz zur Konfiguration. Für jedes Admin-Fenster ist ein separter
Abschnitt vorzusehen.


<a name="{Eindeutiger Fensterbezeichner}"/>

### Fenster "{Fenstertitel}"
![{alt-Name}](media/{Formularfelderbild} "{Bildbeschreibung}")<span style="color:grey">  
*{Bildbeschreibung}*</span>

| Feld               | Beschreibung |                                                                       
|:-------------------|:-------------|
|**{Formularfeld 1}**|{Beschreibung}|
|**{Formularfeld 2}**|{Beschreibung}|
|**{Formularfeld n}**|{Beschreibung}|

Platz für besondere Hinweise.


<a name="{Eindeutiger Fensterbezeichner}"/>

### Fenster "{Fenstertitel}"
![{alt-Name}](media/{Formularfelderbild} "{Bildbeschreibung}")<span style="color:grey">  
*{Bildbeschreibung}*</span>

| Feld               | Beschreibung |                                                                       
|:-------------------|:-------------|
|**{Formularfeld 1}**|{Beschreibung}|
|**{Formularfeld 2}**|{Beschreibung}|
|**{Formularfeld n}**|{Beschreibung}|

Platz für besondere Hinweise.

Abschließender Text zur Konfiguration

> Nach Abschluß der Konfiguration wird der Konfigurationsdialog mit 
  `SPEICHERN UND SCHLIEßEN` verlassen. Dadurch efolgt im Anschluß ein 
  Neustart des Adapters.



<a name="instanz"/>

##  Instanzen
> Die Installation des Adapters hat im Bereich `Objekte` eine aktive Instanz des 
  {Adaptername}-Adapters angelegt.

![Instanz](media/a_harmony_instanz.png "Instanz")<span style="color:grey">  
*Erste Instanz*</span>

Platz für weitere Hinweise zu Instanzen des Adapters. Z.B. ob mehrere Instanzen
auf einen Server installierbar sind oder wie sich Instanzen auf 
Multihost-Systemen verhalten.

> Ob der Adapter aktiviert oder mit dem {Gerät}  verbunden ist, 
  wird mit der Farbe des Status-Feldes der Instanz verdeutlicht. Zeigt der 
  Mauszeiger auf das Symbol, werden weitere Detailinformationen dargestellt. 



<a name="objekte"/>

## Objekte des Adapters

> Im Bereich `Objekte` werden in einer Baumstruktur alle vom Adapter im Hub 
  erkannten Geräte und Aktivitäten aufgelistet. Zusätzlich wird auch noch 
  darüber informiert, ob die Kommunikation mit dem Hub reibungslos erfolgt. 

![alt-Objektename](media/{Bildname} ""{Bildbeschreibung}")<span style="color:grey">  
*{Bildbeschreibung}*</span>

> Die angelegten Objekte und ihre Bedeutungen sind wie folgt definiert:

Objekt                    | Zugriff | Bescheibung 
:-------------------------|:-------:|:-----------
**{Instanz}**                 |  R  | Name der ersten *Instanz* des Adapters
&emsp;**{Sub-Objekt}**        |  R  | Name des *{...}*, Liste, Bedeutung ...
&emsp;&emsp;**{Sub-Objekt}**  |  R  | Name des *{...}*, Liste, Bedeutung ... 
&emsp;&emsp;***{Datenpunkt}***| R/W | Beschreibung des Datenpunktes mit Funktion 
&emsp;&emsp;***{Datenpunkt}***| R/W | Beschreibung des Datenpunktes mit Funktion 

Mit der Tabelle wird versucht, den Objektbaum vereinfacht darzustellen
und dem Anwender die Bedeutung und Anwendung der einzelnen Objekte zu
veranschaulichen. Sie stellt die Referenzdokumentaion für den Anwender für 
z.B. den Zugriffe mit JavaScript auf die Objekthierarchie dar.

### {Weitere tiefergehende Erläuterungen zu Objektgruppierungen}
Hier könne Ausschnitte des Objektbaums hervorgehoben und besonders betrachtet 
werden. 

#### {Weitere tiefergehende Erläuterungen zu einzelnen Objekten oder Funktionen}
Da der Platz für Beschreibungen in der Objekttabelle in der Regel nicht ausreichen 
müssen hier z.B. einzelne Datenpunkte ausführlicher dokumentiert werden.

Beispiel für beschreibbare Datenpunkte:
#### Starten einer Aktivität
Aktivitäten werden gestartet, wenn man bei einer Aktivität 
`{Instanz}.{Hub Name}.activities.{Aktivität}` eine Zahl größer als 0 einträgt. 
Während der Ausführung der Aktivität ändert sich dieser Wert zuerst 
nach 1 (=startend) und dann nach 2 (=aktiv).

### {Weitere tiefergehende Erläuterungen zu Objektgruppierungen}
Entsprechend dem Aufbau des Objektbaums und der Funktion des Adapters
hier individuelle Gestaltungsmöglichkeiten gegeben.

Beispiel für die Beschreibung einzelner Datenpunkte:
#### Statuswerte
`{Instanz}.{Hub Name}.activities.currentActivity` liefert die aktuell ausgeführte
Aktivität als Zeichenfolge.

`{Instanz}.{Hub Name}.activities.currentStatus` zeigt den Status des Harmony Hubs 
an. Dabei bedeuten die Werte
- 0 = inaktiv
- 1 = startend
- 2 = aktiv






## Deinstallation
sollte die Instanz wieder entfernt werden sollen wird diese über das zugeordnete Mülleimer-Icon 
in der Rubrik Instanzen entfernt

<img src="media/adapter_AdapterName_delete_01.png">

Es erscheint eine Sicherheitsabfrage, die mit ***OK*** bestätigt werden muss

<img src="media/adapter_AdapterName_delete_02.png">

Anschließend erscheint wieder ein Fenster, dass die Abarbeitung der Deinstallationsbefehle zeigt

<img src="media/adapter_AdapterName_delete_03.png">

Bei dieser Deinstallation werden alle zu der Instanz gehörenden Objekte vollständig entfernt.

Sollten die Installationsdateien vollständig von dem Host gelöscht werden, muss dies über das Mülleimer-Icon 
in der Kachel des AdapterName-Adapters in der Rubrik Adapter geschehen.





## Beispiele/Demo
Lorem ipsum


## Besonderheiten
Backup
Multihost
History
Performance


## Bekannte Probleme

* was auch immer
  Lösung:

* und noch ein ganz böser
  Lösung:

* weiß der Teufel
  Lösung:



## Einbinden der States

### Blockly
Lorem ipsum

### Node-Red
Lorem ipsum

### vis
Lorem ipsum

### History
Lorem ipsum


## Links
Irgendwo kommen auch noch Links zu GitHub (Entwicklerbereich?) und
externen Ressourcen? Aber bitte nicht gleich am Doku-Anfang, eher am Ende.
Zuerst die leichte Kost.



----------





# Snippets


# Adapter - Homematic RPC

Der hm-rpc Adapter bietet die Anbindung an die Kommunikationsmodule einer Homematic-Zentrale CCU2 / CCU1\. Es werden die Module rfd (funk), hs485d (wired), cuxd (Zusatzsoftware zur Anbindung externer Komponenten wie EnOcean, FS20 usw.) und homegear (CCU Ersatz) unterstützt. Eine Instanz des Adapters ist für genau EINES dieser Module zuständig. Sollen mehrere Module parallel unterstützt werden, muss für jedes Modul eine eigene Instanz installiert werden. Der Adapter kommuniziert entweder über BIN-RPC oder XML-RPC mit dem entsprechenden Modul.  Der Adapter arbeitet über eine Ereignisschnittstelle. Daher ist es wichtig, die Adapter Adresse korrekt anzugeben. Die CCU sendet dann automatisch Ereignisse an den Adapter, d.h. ein zyklisches Pollen wie z.B. bei hm-rega ist nicht notwendig. Zustätzlich verfügt der Adapter über die Funktionalität, die Verbindung zur CCU zyklisch zu überwachen. Werden neue Geräte an der CCU angelernt ist es notwendig, den Adapter neu zu starten mit der Konfigration “Initiere Geräte neu (einmalig)”. Dadurch werden die Informationen über die neuen Homematic-Geräte an den Adapter übertragen.


## Konfiguration

  [![](img/ioBroker_HM-rpc_Konfig01.jpg)](img/ioBroker_HM-rpc_Konfig01.jpg)  

### HomeMatic Adresse

Hier wird die IP-Adresse der CCU eingegeben, deren Daten in ioBroker übernommen werden sollen. Es können über mehrere Instanzen des Adapters auch mehrere CCU eingebunden werden. Das Format dieser Adresse muss `192.168.xxx.yyy` sein.

* * *

### Adapter Adresse

Hier wird die IP-Adresse des Servers, auf dem ioBroker läuft eingegeben. Es stehen verschiedene Möglichkeiten mit ipv4 und ipv6 über das pulldown-Menü zur Verfügung. [![](img/ioBroker_HM-rpc_Konfig_Adresses.jpg)](img/ioBroker_HM-rpc_Konfig_Adresses.jpg) Standard ist ipv4 `0.0.0.0`; allerdings muss hier eine von außen (von der anzusprechenden CCU aus) erreichbare Adresse wie `192.168.xxx.yyy` eingegeben werden, da die CCU bei der Kommunikation die Ereignisse an diese Adresse sendet.

* * *

### Daemon

Der zu überwachende Daemon (derzeit _rfd_, _hs485d_, _cuxd, Homematic IP_ oder _homegear_) 
![](img/homematic-rpc-2_ioBroker_HM-rpc_Konfig_daemons.jpg)


* * *

### Homematic Port

Der Port in der CCU über den die Daten abgerufen werden können. Für jedes Modul ist hier bereits der passende Standardport eingetragen, er muss daher nur angepasst werden, wenn er auf der CCU selbst verändert wurde.

* * *

### Protokoll

Das Protokoll über das die Daten aus der CCU abgefragt werden sollen. Es stehen _XML-RPC_ und _BIN-RPC_ zur Verfügung. Das empfohlene Protokoll ist _BIN-RPC_.

* * *

### Adapter Port

Der Port auf dem ioBroker-Server. Ist der eingegebene Wert 0 wird hier der gleiche Port verwendet, wie er auch auf der Homematic-Zentrale verwendet wird. Ansonsten kann man hier einen Port frei wählen. z.B.: 3000

* * *

### Verbindungs-Check Intervall (sek)

Die Zeitabstände in denen die Verbindung geprüft werden soll (_default 180_)

* * *

### Synchronisiere Geräte neu (einmalig)

Wenn in der CCU neue Geräte konfiguriert oder Änderungen an bestehenden Geräten durchgeführt wurden, werden die neuen Daten anschließend in ioBroker geladen.

* * *

## <span id="Bedienung">Bedienung</span>

Eine manuelle Bedienung des Adapters findet nicht statt. Beim Start wird dem entsprechenden CCU Modul mitgeteilt, Änderungen automatisch an den Adapter zu senden. Diese Ereignisse werden dann in die Datenpunkte von ioBroker übernommen.
