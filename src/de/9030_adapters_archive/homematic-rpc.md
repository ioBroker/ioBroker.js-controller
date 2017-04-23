
# simple web Adapter



Während der admin-Adapter über ein integriertes Web-Interface (default port 8081) verfügt, kann man mit dem web-Adapter weitere Web-Interfaces mit unterschiedlichen Zugangsrechten erzeugen.

Standardmäßig wird ein solches Web-Interface mit dem Port 8082 bei der Installation von vis, Rickshaw oder Flot angelegt.

[![](img/ioBroker_Adapter_Web_Konfig-e1484150966496.jpg)](img/ioBroker_Adapter_Web_Konfig-e1484150966496.jpg)


# Konfiguration

## Reiter Allgemein

[![](img/ioBroker_Adapter_Web_Konfig-e1484150966496.jpg)](img/ioBroker_Adapter_Web_Konfig-e1484150966496.jpg)

### IP

Hier wird die IP-Adresse eingegeben, von welcher diese Instanz des Web-Adapters erreichbar sein soll.

### [![](img/ioBroker_Adapter_Web_Konfig_IP.jpg)](img/ioBroker_Adapter_Web_Konfig_IP.jpg)

Die Standardeinstellung 0.0.0.0 bedeutet, dass von jeder IP das Web-Interface geöffnet werden darf. Es können über mehrere Instanzen des Adapters auch verschieden Zugänge mit unterschiedlichen Rechten realisiert werden. Das Format dieser Adresse muss bei IPv4 `192.168.xxx.yyy` sein (wobei es davon abhängt, in was für einem Netzwerk sich ioBroker befindet.

### Port

Hier wird der Port des ioBroker-Servers eingegeben, unter dem dieses Web-Interface erreichbar sein soll. Bitte vor dem Eintrag überprüfen, ob dieser Port nicht bereits verwendet wird.

### Verschlüsselung (HTTPS)

Mit dieser Checkbox wird der Zugang auf dieses Web-Interface nur über eine sichere Seite aufgebaut. Nach Aktivierung dieser Checkbox stehen weitere Menüpunkte zur Verfügung:

#### [![](img/ioBroker_Adapter_Web_Konfig_HTTPS.jpg)](img/ioBroker_Adapter_Web_Konfig_HTTPS.jpg)

#### Publikzertifikat

Hier kann man ein öffentliches Zertifikat eingeben, das zur Authentifizierung verwendet werden soll. Im Pulldownmenü werden die Zertifikate angeboten, die unter _**Systemeinstellungen - Zertifikate**_ angelegt wurden.

#### Privatzertifikat

Hier kann man ein persönliches Zertifikat eingeben, das zur Authentifizierung verwendet werden soll. Im Pulldownmenü werden die Zertifikate angeboten, die unter _**Systemeinstellungen - Zertifikate**_ angelegt wurden.

#### Kettenzertifikat (Chain certificate)

Hier kann man ein Kettenzertifikat eingeben, das zur Authentifizierung verwendet werden soll. Im Pulldownmenü werden die Zertifikate angeboten, die unter _**Systemeinstellungen - Zertifikate**_ angelegt wurden.

### Authentification

Diese Checkbox ist nur anwählbar, wenn auch Verschlüsselung (HTTPS) aktiviert ist. Nach Aktivierung dieser Checkbox erscheint das folgende Feld

#### Timeout

Hier wird ein Wert in Sekunden eingegeben, wie lange eine Inaktivität dauern darf, bevor es zum Abbruch der Verbindung kommt.

Das Pulldownmenü _**Laufen unter Anwender **_steht jetzt nicht mehr zur Verfügung, da der User sich entsprechend selbst auswählen kann wie er sich anmeldet, wenn er die entsprechenden Zugangsdaten besitzt.

### Puffer

Mithilfe dieser Checkbox aktiviert man die Puffer für die Web-Seiten. Die Option puffert alle angefragten Seiten in RAM und muss nicht jedes mal DB abfragen. Nachteil: es wird mehr RAM Speicher benutzt und die Änderungen von Web-Seiten erscheinen nur nach Web-Adapter restart. Vorteil: die Seiten werden schneller geladen.

### Socket.IO Instanz (Optional)

[![](img/ioBroker_Adapter_Web_Konfig_socketInstanz.jpg)](img/ioBroker_Adapter_Web_Konfig_socketInstanz.jpg)

<span style="font-size: 16px; line-height: 1.5;">Hier kann eine Instanz des SocketIO-Adapters angegeben werden, die für den Zugriff auf das Web-Interface benutzt werden soll. Standardmäßig wird eine ioBroker-interne Version dafür verwendet. Bei Zugriff von anderen Applikationen ist eine Instanz eines SocketIO-Adapters zu installieren und hier auszuwählen.</span>

### Nur Web-Sockets

Wenn dieser Checkbox aktiviert ist, dann wird die Socket.io Kommunikation auf  web-sockets zwangsweise umgestellt. Die Option ist wegen eines Bugs auf iPads implemetiert und ist für die Anwender wichtig, die die Probleme bei der Socket.IO Kommunikation mit iPads/iPhones haben.

### Internal 'Simple API'

Damit kann man die Simple API (RESTful) interface auf dem selben Port wie Web-Server aktivieren. Mehr darüber kann man [hier](https://github.com/ioBroker/ioBroker.simple-api) finden.

### Laufen unter Anwender

[![](img/ioBroker_Adapter_Web_Konfig_User.jpg)](img/ioBroker_Adapter_Web_Konfig_User.jpg)

In diesem Pulldownmenü stehen alle Anwender zur Verfügung, die unter dem Reiter Benutzer im Adapter Admin angelegt wurden. Der Zugriff auf ioBroker findet dann unter dem ausgewählten Benutzer mit den entsprechenden vergebenen Rechten statt.

### Benutzen Let's Encrypt Zertifikate

Diese Checkbox steht ebenfalls nur nach Aktivierung der Verschlüsselung zur Verfügung. Mit der Aktivierung dieser Checkbox werden let's encrypt Zertifikate zur Absicherung des Zugangs verwendet. Die notwendigen Einstellungen müssen unter _**Systemeinstellungen - Let's encrypt**_ gemacht werden.

## Reiter Whitelist

Mit dem Reiter Whitelist erreicht man eine Tabelle, in der weitere Berechtigungen bzw. Einschränkungen des Zugriffs geregelt werden können. Die Whitelist wird links oben über die Checkbox _**Enabled**_ aktiviert

[![](img/ioBroker_Adapter_Web_Konfig_WhiteList.jpg)](img/ioBroker_Adapter_Web_Konfig_WhiteList.jpg)

Weitere Regeln können über das (+) links oben hinzugefügt werden:


![](img/homematic-rpc_ioBroker_Adapter_Web_Konfig_WhiteList_New.jpg)


Hier wird jetzt die IP für die ankommende Anfrage und der Benutzer unter dem der Zugang erfolgen soll eingetragen.

# <span id="Bedienung">Bedienung</span>

Eine manuelle Bedienung des Adapters findet nicht statt.