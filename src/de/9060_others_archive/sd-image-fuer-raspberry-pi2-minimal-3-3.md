# ioBroker Neuanfang mit Images



## Vorbedingungen

Nach dem Download eines Images wird dieses zuerst auf eine (Mikro-) SD-Karte gemäß der Anleitung zu dem jeweiligen Image (Download-Tabelle rechte Spalte) geschrieben. Auf diesen Seiten stehen auch die bereits angelegten User und die entsprechenden Passworte mit denen man auf die Installation via SSH oder sftp zugreifen kann. Aus Sicherheitsgründen sollten diese geändert werden. Dazu muss man mit z.B. putty auf den Rechner zugreifen.

Die Karte wird dann in den entsprechenden Microcomputer eingelegt, dieser wird ans Netzwerk angeschlossen und anschließend mit Strom versorgt.

Das Image enthält das jeweils spezifische Betriebssystem für den entsprechenden Microcomputer sowie die zum Zeitpunkt der Erstellung aktuellste Installation von ioBroker.

Die Installation enthält node-js v 4.5.0 sowie natürlich iobroker mit dem js-controller und redis.

Es sind **nur die wichtigsten** Adapter vorinstalliert und dazu Instanzen angelegt. Diese müssen noch konfiguriert werden.

Folgende Adapter sind installiert (Versionen beispielhaft):

<table class="aligncenter" style="height: 443px; width: 301px; border-color: #1833cc; background-color: #addcf0;" border="4">

<thead>

<tr style="height: 24px;">

<td style="width: 119px; height: 24px; text-align: center;">**Adapter**</td>

<td style="width: 160px; height: 24px; text-align: center;">**Version**</td>

</tr>

</thead>

<tbody>

<tr style="height: 24px;">

<td style="width: 119px; height: 24px; text-align: center;">js-controller</td>

<td style="width: 160px; height: 24px; text-align: center;">0.12.2</td>

</tr>

<tr style="height: 24px;">

<td style="width: 119px; height: 24px; text-align: center;">admin</td>

<td style="width: 160px; height: 24px; text-align: center;"> 1.6.1</td>

</tr>

<tr style="height: 24px;">

<td style="width: 119px; height: 24px; text-align: center;">hm-rpc</td>

<td style="width: 160px; height: 24px; text-align: center;">1.3.1</td>

</tr>

<tr style="height: 24px;">

<td style="width: 119px; height: 24px; text-align: center;">hm-rega</td>

<td style="width: 160px; height: 24px; text-align: center;">1.3.0</td>

</tr>

<tr style="height: 24px;">

<td style="width: 119px; height: 24px; text-align: center;">vis</td>

<td style="width: 160px; height: 24px; text-align: center;">0.10.9</td>

</tr>

<tr style="height: 25px;">

<td style="width: 119px; height: 25px; text-align: center;">history</td>

<td style="width: 160px; height: 25px; text-align: center;">1.3.0</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 119px;">flot</td>

<td style="text-align: center; height: 24px; width: 160px;">1.4.1</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 119px;">Javascript</td>

<td style="text-align: center; height: 24px; width: 160px;">3.0.7</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 119px;">Socket</td>

<td style="text-align: center; height: 24px; width: 160px;">1.5.2</td>

</tr>

<tr style="height: 24px;">

<td style="text-align: center; height: 24px; width: 119px;">Web</td>

<td style="text-align: center; height: 24px; width: 160px;">1.7.0</td>

</tr>

<tr style="height: 24.6875px;">

<td style="text-align: center; height: 24.6875px; width: 119px;">mobile</td>

<td style="text-align: center; height: 24.6875px; width: 160px;"> 0.4.5</td>

</tr>

</tbody>

</table>

##  Erster Aufruf von ioBroker

Man sucht sich im Router die IP-Adresse, die für den neuen Rechner vergeben wurde. Diese ruft man dann mit dem Port 8081 auf, z.B.:

_**192.168.178.123:8081**_

Zu Beginn öffnet sich ein Fenster mit der Lizenzvereinbarung. Dieses natürlich mit _ok_ quittieren. Jetzt öffnet sich das Webinterface des admin-Adapters. Hier werden alle verfügbaren [Adapter](http://www.iobroker.net/?page_id=14&lang=de) mit den aktuellen (und ggf. bereits installierten) Versionen angezeigt. Zur Übersicht ist der Entwicklungsstand farblich gekennzeichnet.


![](img/sd-image-fuer-raspberry-pi2-minimal-3-3_ioBroker_Image_BPi_20160910.jpg)


### Update

Da seit der Erstellung des Images einige Updates erscheinen konnten, bringt man zuerst das System auf den neuesten Stand, indem auf das vierte Icon von links unter der Reiterleiste (Kreisverkehr) geklickt wird. Jetzt holt sich ioBroker die Liste mit den neuesten Versionen.

Als erstes sieht man im Reiter _Hosts_ nach, ob eine neue Version des js-controllers, dem zentralen Modul von ioBroker, bereitsteht und führt hier ein update durch.

Sollten neue Versionen vorliegen, erscheint diese in der Spalte _Version_ und in der Spalte _installiert_ erscheint wieder ein update Button. Über diese Buttons werden updatefähige Adapter als erstes auf den neuesten Stand gebracht.

### Die Adapter

Vorinstalliert sind für eine Homematic Installation, bei der ioBroker zur Visualisierung und Bedienung genutzt werden soll, die Adapter mit den Funktionen:

*   HM-RPC zur Einbindung der Datenpunkte
*   HM-REGA zur Einbindung von u.a. Systenmvariablen, Programmen und Namen der Datenpunkte
*   .vis als Basis der Visualisierung (mit dem dafür notwendigen web Adapter, der das Web-Interface für vis und flot bereitstellt)
*   History zum Loggen von Datenpunkten
*   Flot zur Darstellung von zeitlichen Verläufen der Zustände von Datenpunkten
*   mobile für eine schlichte Oberfläche auf einem Smartphone
*   javascript zur Programmierung mit **Blockly**, einer visuellen drag and drop Oberfläche zum Erstellen von Skripten ohne Kenntnisse von javascript.

### Die Konfiguration

Um die Adapter nutzen zu können müssen sie z.B. an die heimische Homematic Installation angepasst und entsprechend konfiguriert werden.

Man beginnt mit den Adaptern [HM-RPC](http://www.iobroker.net/?page_id=2829&lang=de) und  [HM-REGA](http://www.iobroker.net/?page_id=2825&lang=de). Diese müssen als erstes konfiguriert werden.

#### HM-RPC

Der hm-rpc Adapter meldet sich an der CCU an und fordert die CCU auf die Werte der Datenpunkte bei Änderung sofort an ioBroker zu senden. Daher werden die Datenpunkte in ioBroker immer aktuell gehalten. Allerdings sind bei einem Neustart teilweise nicht die echten Zustände vorhanden, sondern erst bei eine Änderung.

Damit diese Verbindung funktioniert, muss unter **_homematic-Adresse_** die IP-Adresse der CCU in einem vom Netzt aus zugänglichen Format, etwa 192.168.178.111 eingegeben werden. Unter **_Adapter-Adresse_** sollte die IP-Adresse des ioBroker-Servers ausgewählt werden. Als _**Daemon**_ muss der gewüschte Dienst auf der CCU ausgewählt werden, von dem die Daten abgerufen werden sollen. <span style="color: #ff0000;">Für jeden Dienst muss eine eigene Instanz des hm-rpc Adapters installiert werden!</span> Als **_Protokoll_** sollte bin-rpc gewählt werden. Bei der Erstkonfiguration oder nach Hinzufügen neuer Geräte in der CCU muss der Haken bei _**Synchronisiere Geräte neu (einmalig)**_ gesetzt werden. Das Ganze dann mit _**Speichern**_ beenden.

#### HM-REGA

Der hm-rega Adapter wird je CCU einmal angelegt und sorgt u.a. dafür, dass den Datenpunkten de hm-rpc in ioBroker auch die Namen aus der CCU zugeordnet werden können. Außerdem werden hiermit die Datenpunkte aus den Systemvariablen und die Programme sowie die Favoriten, Räume und Gewerke in ioBroker eingelesen.

Unter _**Homematic CCU-Adresse**_ wird bereits die in einem hm-rpc Adapter festgelegte IP der CCU angegeben. Hat man dort mehrere CCU angelegt, so kann man hier eine auswählen. In den folgenden Zeilen werden die verwendeten Dienste ausgewählt und die jeweiligen hm-rpc Instanzen zugeordnet.

Im Gegensatz zu dem hm-rpc-Adapter werden die Datenpunkte des hm-rega Adapters aktiv von der CCU abgerufen. Um die CCU nicht zu überlasten ist das Abfrageintervall per default auf 30 Sekunden konfiguriert, kann aber unter _**Polling**_ entweder komplett deaktiviert oder die Zeit geändert werden. Alternativ kann bei einer Aktion auf der CCU bei der z.B. ein Wert einer Systemvariablen geändert wird, als weiterer Befehl eine virtuelle Tste gedrückt werden. Diese führt dann eine Aktualisierung der Rega-Werte durch. Standardmäßig ist dies die BidCos-RF:50.PRESS_SHORT.

Die beiden Adapter müssen jetzt noch aktiviert werden. Dazu werden sie unter dem [Reiter Instanzen](http://iobroker.net/wp-content/uploads/Instanzen-Übersicht.jpg) über den play-Button gestartet. Dieser schaltet nach einiger Zeit von rot auf grün, und die Ampel ganz links wechselt ebenfalls auf grün.

Im Reiter _**LOG**_ sieht man jetzt, dass die Datenpunkte angelegt und eingelesen werden. Diese Datenpunkte kann man jetzt auch unter dem Reiter _**Objekte**_ finden

Möchte man das Ganze jetzt visualisieren wird noch der [.vis Adapter](http://www.iobroker.net/?page_id=2754&lang=de) benötigt.

#### .vis-Adapter

Eine Instanz des .vis-Adapter wird ebenso angelegt, wie die anderen Adapter, nur dass dort keine Ampel erscheint, da der Adapter nicht dauerhaft läuft. Auch ist hier nur eine Instanz möglich.

Auf die Bedienung des .vis Adapters soll hier nicht intensiv eingegangen werden. Eine ausführlicher Beschreibung befindet sich [hier](http://www.iobroker.net/?page_id=2754&lang=de).

Der .vis Adapter kommt mit nur wenigen widgets. Weitere widgetsätze können jederzeit hinzugeladen werden. Dabei ist jedoch zu beachten welche Hardware zur Verfügung steht. Sowohl Server, als auch Frontend (Tablet) benötigen entsprechend Ressourcen.

#### .vis-Widgetsätze

Die Widgetsätze dienen der Darstellung der Datenpunkte. Diese sind zum einen nach Funktionen (time_and_weather) oder Aussehen (Lcars, Metro-Design) sortiert. Zu Beginn sollte man nur mit wenigen Widgetsätzen arbeiten. Diese Widgetsätze werden ebenso wie die anderen Adpter aktiviert, auch hier nur mit max. einer Instanz je Installation.