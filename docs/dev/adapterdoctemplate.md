---
title:       "Entwicklung"
lastChanged: "14.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/dev/adapterdoctemplate.md"
---

# Template für die Erstellung einer Adapterdokumentation

?> ***Dies ist ein Platzhalter***. 
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](dev/styleguidedoc), 
   damit die Änderungen einfacher übernommen werden können.

~~~markdown
---
title:       "{Seitentitel}"
lastChanged: "{Änderungsdatum des Artikels}"
editLink:    "{Link auf diese Datei auf GitHub}"
---


!>Achtung!   
Dieses Template ist bei weitem noch nicht final!  
Beispielimplementierung ist der [harmony-Adapter](adapterref/docs/iobroker.harmony/de/README).

# <img src="media/{Adaptericon}" width=150 hight=150/>&emsp;{Adaptername}-Adapter
In diesem Abschnitt wird eine endanwenderfreundliche Zusammenfassung des 
Anwendungszwecks des Adapters gegeben. Diese Zusammenfassung soll kurz
 gehalten sein (maximal 1-3 kleine Absätze). Sie soll gerade so viele
 Informationen enthalten, dass das Interesse des Anwenders geweckt wird 
 und er entscheiden kann, ob der Adapter für ihn relevant ist. 

Technische Hintergrundinformationen zum Adapter und ggf. Geräten stehen 
im Abschnitt "Überblick". 


<!-- Einführungsbild-->
![{alt BildName}](media/{Bild} "{Bildbeschreibung") <span style="color:grey">  
*{Bildbeschreibung}*</span>



<details open><summary>Inhaltsverzeichnis</summary><p>

| Navigation                          |
|-------------------------------------|
| 1  [Steckbrief](#steckbrief)        |  
| 2  [Überblick](#überblick)          |
| 3  [Installation](#installation)    |
| 4  [Konfiguration](#konfiguration)  |
| 5  [Instanz](#instanz)              |
| 6  [Objekte](#objekte)              |
| 7  [Besonderheiten](#besonderheiten)|
| 8  [FAQ](#faq)                      |
| 9  [Beispiele](#beispiele)          |
| 10 [Deinstallation](#deinstallation)|
| 11 [Links](#links)                  |
| 12 [Historie](#historie)            |
</p></details>



<a name="steckbrief"/>

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
| OS                      | unterstützte OS              |
| node-Version            | unterstützte node-Versionen  |
| Entwickler              | Name/Alias des Entwicklers   |
| Github                  | LINK                         |
| Lizenz                  | MIT                          |
| Kategorie               | gemäß Adapterliste           |
| Keywords                | `Suchworte`                  |
| Abhängigkeiten          | `dependencies`               |      



<a name="überblick"/>

## Überblick

### {Angebundenes System}
In diesem Abschnitt wird Grundlegendes zu einem eventuell angebundenen System
oder Verfahren gesagt. Wofür ist es gut? Was kann man damit machen? Wie erfolgt
die Kommunikation? Wie ist der Systemaufbau? Welche Rahmenbedingungen gibt es? 

### {Adaptername}-Adapter
Hier werden Hintergrundinformationen zum Adapter gegeben. Dies kann im Rahmen 
eines Geräteadapters Information zu dem Gerät sein, oder bei einem Adapter für 
ein Kommunikationsprotokoll Grundlagen zu dem Protokoll.
Trotzdem sollte dieser Text allgemeinverständlich auch für Einsteiger sein.



<a name="voraussetzungen"/>

## Voraussetzungen vor der Installation
Der Anwender erhält hier Informationen, welche Schritte ggf. vor der Installation 
des Adapters u.a. auf externen Systemen auszuführen sind. Dazu gehören z.B. die
Registrierung von API-Keys oder die Konfiguration von angebundenen System 
nach Herstellerdokumentation. 



<a name="installation"/>

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

* und noch ein ganz böser Bug
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



## Entwicklerbereich
~~~


