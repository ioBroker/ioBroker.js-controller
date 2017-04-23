# Erste Schritte mit ioBroker

Um eine Installation für Homematic User zur Visualisierung und Bedienung der Datenpunkte über z.B. ein Tablet als Minimalkonfiguration zu erstellen muss ioBroker zuerst die Daten aus der CCU erhalten.

Neben der benötigten Hardware für den ioBroker Server benötigt man je nach Ausbauwünschen folgende Module:

*   HM-RPC zur Einbindung der Datenpunkte
*   HM-REGA zur Einbindung von u.a. Systenmvariablen, Programmen und Namen der Datenpunkte
*   .vis als Basis der Visualisierung
*   .vis-Widgetsätze
*   History zum Loggen von Datenpunkten
*   Flot oder rickshaw zur Darstellung von zeitlichen Verläufen der Zustände von Datenpunkten



## Erster Start

Nach der Installation von ioBroker auf einer der [möglichen Plattformen](http://www.iobroker.net/?page_id=3334&lang=de) wird die Software zum ersten Mal durch den Aufruf der <IPdesServers>:8081 gestartet.

Es erscheint das [Web-Frontend des Administrators](http://www.iobroker.net/?page_id=2240&lang=de).  Hier werden die zu installierenden Module (Adapter) ausgewählt, indem man ganz rechts in der Spalte _**Installieren**_ auf das (+) klickt.


![](img/konfiguration-der-adapter-ueber-die-webui_Admin-Übersicht-1.jpg)


Man beginnt mit den Adaptern [HM-RPC](http://www.iobroker.net/?page_id=2829&lang=de) und  [HM-REGA](http://www.iobroker.net/?page_id=2825&lang=de).

Diese beiden müssen als erstes konfiguriert werden.

### HM-RPC

Der hm-rpc Adapter meldet sich an der CCU an und fordert die CCU auf die Werte der Datenpunkte bei Änderung sofort an ioBroker zu senden. Daher werden die Datenpunkte in ioBroker immer aktuell gehalten. Allerdings sind bei einem Neustart teilweise nicht die echten Zustände vorhanden, sondern erst bei eine Änderung.

Damit diese Verbindung funktioniert, muss unter **_homematic-Adresse_** die IP-Adresse der CCU in einem vom Netzt aus zugänglichen Format, etwa 192.168.178.111 eingegeben werden. Unter **_Adapter-Adresse_** sollte die IP-Adresse des ioBroker-Servers ausgewählt werden. Als _**Daemon**_ muss der gewüschte Dienst auf der CCU ausgewählt werden, von dem die Daten abgerufen werden sollen. <span style="color: #ff0000;">Für jeden Dienst muss eine eigene Instanz des hm-rpc Adapters installiert werden!</span> Als **_Protokoll_** sollte bin-rpc gewählt werden. Bei der Erstkonfiguration oder nach Hinzufügen neuer Geräte in der CCU muss der Haken bei _**Synchronisiere Geräte neu (einmalig)**_ gesetzt werden. Das Ganze dann mit _**Speichern**_ beenden.

### HM-REGA

Der hm-rega Adapter wird je CCU einmal angelegt und sorgt u.a. dafür, dass den Datenpunkten de hm-rpc in ioBroker auch die Namen aus der CCU zugeordnet werden können. Außerdem werden hiermit die Datenpunkte aus den Systemvariablen und die Programme sowie die Favoriten, Räume und Gewerke in ioBroker eingelesen.

Unter _**Homematic CCU-Adresse**_ wird bereits die in einem hm-rpc Adapter festgelegte IP der CCU angegeben. Hat man dort mehrere CCU angelegt, so kann man hier eine auswählen. In den folgenden Zeilen werden die verwendeten Dienste ausgewählt und die jeweiligen hm-rpc Instanzen zugeordnet.

Im Gegensatz zu dem hm-rpc-Adapter werden die Datenpunkte des hm-rega Adapters aktiv von der CCU abgerufen. Um die CCU nicht zu überlasten ist das Abfrageintervall per default auf 30 Sekunden konfiguriert, kann aber unter _**Polling**_ entweder komplett deaktiviert oder die Zeit geändert werden. Alternativ kann bei einer Aktion auf der CCU bei der z.B. ein Wert einer Systemvariablen geändert wird, als weiterer Befehl eine virtuelle Tste gedrückt werden. Diese führt dann eine Aktualisierung der Rega-Werte durch. Standardmäßig ist dies die BidCos-RF:50.PRESS_SHORT.

Die beiden Adapter müssen jetzt noch aktiviert werden. Dazu werden sie unter dem [Reiter Instanzen](http://iobroker.net/wp-content/uploads/Instanzen-Übersicht.jpg) über den play-Button gestartet. Dieser schaltet nach einiger Zeit von rot auf grün, und die Ampel ganz links wechselt ebenfalls auf grün.

Im Reiter _**LOG**_ sieht man jetzt, dass die Datenpunkte angelegt und eingelesen werden. Diese Datenpunkte kann man jetzt auch unter dem Reiter _**Objekte**_ finden

Möchte man das Ganze jetzt visualisieren wird noch der [.vis Adapter](http://www.iobroker.net/?page_id=2754&lang=de) benötigt.

### .vis-Adapter

Eine Instanz des .vis-Adapter wird ebenso angelegt, wie die anderen Adapter, nur dass dort keine Ampel erscheint, da der Adapter nicht dauerhaft läuft. Auch ist hier nur eine Instanz möglich.

Auf die Bedienung des .vis Adapters soll hier nicht intensiv eingegangen werden.

Der .vis Adapter kommt mit nur wenigen widgets. Weitere widgetsätze können jederzeit hinzugeladen werden. Dabei ist jedoch zu beachten welche Hardware zur Verfügung steht. Sowohl Server, als auch Frontend (Tablet) benötigen entsprechend Ressourcen.

### .vis-Widgetsätze

Die Widgetsätze dienen der Darstellung der Datenpunkte. Diese sind zum einen nach Funktionen (time_and_weather) oder Aussehen (Lcars, Metro-Design) sortiert. Zu Beginn sollte man nur mit wenigen Widgetsätzen arbeiten. Diese Widgetsätze werden ebenso wie die anderen Adpter aktiviert, auch hier nur mit max. einer Instanz je Installation.

## Erstellen eines Views mit .vis