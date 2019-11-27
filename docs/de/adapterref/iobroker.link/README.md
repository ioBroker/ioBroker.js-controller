---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.link/README.md
title: ioBroker.link
hash: 9ros7x9xULUX5EdRrAUPqZSbv5lizmiKP7T4wtj6fOM=
---
![Logo](../../../en/adapterref/iobroker.link/admin/link.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.link.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.link.svg)
![NPM](https://nodei.co/npm/iobroker.link.png?downloads=true)

# IoBroker.link
Dieser Adapter ermöglicht eine sichere Verbindung über die [ioBroker.link](https://iobroker.link/) Cloud.

## FAQ
### Was kann ich mit diesem Adapter machen?
Mit diesem Adapter können Sie eine sichere Verbindung zu einer lokalen ioBroker-Installation und anderen Servern / Geräten in Ihrem lokalen Netzwerk hinter einem DSL-Modem / Router / einer Firewall herstellen. Die Verbindung wird über die öffentlich zugängliche ioBroker.link-Cloud (Link-Cloud) hergestellt. Auch mehrere lokale ioBroker-Installationen können über die Link-Cloud eingerichtet und aufgerufen werden.

### Was ist der Unterschied zu einer Portweiterleitung, die ich auf meinem Router konfigurieren könnte?
Während Sie auf Ihrem Router einen Port forwading konfigurieren können, um von überall auf Ihre lokale ioBroker-Installation zuzugreifen, bietet die Link-Cloud die folgenden Hauptvorteile:

- Es müssen keine Ports zum Internet auf Ihrem Router geöffnet sein
- Für Ihre lokale ioBroker-Installation ist weder eine öffentliche IP-Adresse noch ein (dynamischer) DNS-Name erforderlich
- Link-Cloud kümmert sich um Authentifizierung und Autorisierung
- Link-Cloud sichert eine Verbindung mit SSL / TLS
- Link-Cloud bietet ein Audit-Protokoll
- Auf mehrere lokale ioBroker-Installationen kann über dieselbe Benutzeroberfläche des Link-Cloud-Servers zugegriffen werden
- Der ioBroker.link-Adapter fungiert als Reverse-Proxy und ermöglicht den Zugriff auf andere Server / Geräte in Ihrem lokalen Netzwerk, die HTTP / TCP / UDP-Protokolle unterstützen
- Ihr können gewähren einen temporaly oder permanenten Zugriff auf Ihre lokalen ioBroker Installation auf eine <sup>3.</sup> Person, zum Beispiel zu beheben Gerät Ausfälle, ohne die Notwendigkeit , Ihr Passwort zu offenbaren oder Anmeldeinformationen verwalten

### Wie kann eine Verbindung zu meiner lokalen ioBroker-Installation hergestellt werden, wenn keine öffentliche IP und keine Ports geöffnet sind?
Die Link-Cloud stellt keine Verbindung zu Ihrer lokalen Installation her. Der ioBroker.link-Adapter wird lokal ausgeführt und initiiert eine Verbindung zur Link-Cloud, falls eine Verbindungsanforderung vorliegt.

### Was ist eine Verbindungsanforderung?
Eine Verbindungsanfrage ist die Absicht, eine Verbindung zu einer lokalen ioBroker-Installation herzustellen, die von einer authentifizierten und autorisierten Person über die Link-Cloud hergestellt wurde.

### Woran erkennt der ioBroker.link-Adapter, dass eine Verbindungsanforderung vorliegt?
Ein ioBroker.link-Adapter prüft regelmäßig, ob Verbindungsanforderungen vorliegen, indem er die Link-Cloud abfragt. Sie können das Abfrageintervall in den Einstellungen des ioBroker.link-Adapters einrichten.

### Wie kann ich sicherstellen, dass der ioBroker.link-Adapter eine Verbindung zur Link-Cloud und nicht zu einem Mann in der Mitte herstellt?
Der ioBoker.link-Adapter kann nur eine Verbindung zu einem Server herstellen, der ein für iobroker.link ausgestelltes gültiges SSL-Zertifikat aufweist.

### Wie identifiziert und autorisiert die Link-Cloud alle ioBroker.link-Adapter, die anstehende Verbindungsanfragen abfragen oder eine Verbindung herstellen?
Jeder ioBroker.link-Adapter generiert ein eigenes eindeutiges 2048-Bit-Schlüsselpaar. Bei der Registrierung bei link-cloud überträgt ein Adapter seinen öffentlichen Schlüssel. Bei jeder nachfolgenden Anforderung an die Link-Cloud (Prüfung auf ausstehende Verbindungsanforderungen, Akzeptieren oder Ablehnen einer ausstehenden Verbindung, Schließen einer offenen Verbindung usw.) autorisiert sich der Adapter selbst, indem er ein JSON-Web-Token (JWT) bereitstellt, das mit dem privaten Schlüssel des Adapters signiert ist . Die Link-Cloud überprüft die Signatur von JWT anhand des gespeicherten öffentlichen Schlüssels und akzeptiert die Verbindung oder lehnt sie ab.

### Kann ein Adapter mit dem Adapter JWT eines anderen eine Verbindung zu einer Link-Cloud herstellen?
Nein. Ein Adapter signiert eine JWT mit seinem eigenen privaten Schlüssel, der die lokale Installation nie verlässt. Die Link-Cloud verwendet den entsprechenden öffentlichen Schlüssel, um die Signatur zu überprüfen.

### Kann ich die Sicherheit erhöhen, indem ich die zur Autorisierung meines Adapters verwendeten Schlüssel drehe?
Ja. Die Schlüssel werden im Ordner / keys Ihrer Adapterinstallation gespeichert. Löschen Sie alle Dateien in diesem Ordner und starten Sie den Adapter neu. Der Adapter erstellt beim Start ein neues Schlüsselpaar und aktualisiert die Registrierung in der Link-Cloud, indem er den neuen öffentlichen Schlüssel sendet.

### Wie wird eine bestehende Verbindung selbst gesichert?
Wenn eine Verbindungsanforderung aussteht, baut ein ioBroker.link-Adapter zunächst einen SSH-Tunnel zur Link-Cloud auf und akzeptiert die eingehende Verbindung. Beide Seiten autorisieren sich mittels Zertifikaten. Sobald der SSH-Tunnel eingerichtet ist, beginnt die Kommunikation. Sobald die Verbindung geschlossen wird, z. B. von einem Benutzer über die Benutzeroberfläche des Link-Cloud-Servers, wird der SSH-Tunnel geschlossen und es ist keine Kommunikation mehr möglich.

### Kann ich mich auch über die Link-Cloud mit meinen lokalen Geräten verbinden?
Ja. Wenn Ihre Geräte das HTTP-Protokoll unterstützen, können Sie über die Link-Cloud darauf zugreifen. Jedes Gerät, zu dem Sie über die Link-Cloud eine Verbindung herstellen möchten, muss explizit in den ioBroker.link-Adaptereinstellungen konfiguriert werden. Standardmäßig kann kein Gerät angeschlossen werden. Sogar das ioBroker.admin Web-UI muss zuerst konfiguriert werden, um eine Verbindung herstellen zu können.

### Was muss ich installieren, um über die Link-Cloud eine Verbindung zu meinen lokalen Geräten herzustellen?
Eine Verbindung zu lokalen Geräten, die das HTTP-Protokoll unterstützen, wird über den Browser Ihrer Wahl hergestellt. Es ist keine zusätzliche Software erforderlich.

### Mein lokales Gerät unterstützt nur das TCP / UDP-Protokoll. Ist auch eine Verbindung zu TCP / UDP-Geräten möglich?
Ja. Um eine Verbindung zu lokalen TCP / UDP-Geräten herzustellen, verwenden Sie bitte die ioBroker.link-box: https://www.npmjs.com/package/iobroker.link-box

### Wie gewähre ich einen Zugriff auf meine lokale ioBroker-Installation?
Jeder, dem Zugriff auf eine lokale ioBroker-Installation gewährt werden soll, muss explizit in den ioBroker.link-Adaptereinstellungen konfiguriert werden. Standardmäßig hat niemand Zugriff. Das bedeutet, dass Sie sich selbst konfigurieren müssen, um eine Verbindung zu Ihrer eigenen lokalen ioBroker-Installation herstellen zu können.

### Wie und wo erstelle ich den Benutzer, dem ich den Zugriff auf meine lokale Installation gewähren möchte?
Zuerst müssen Sie ein kostenloses Konto unter https://iobroker.pro erstellen. Nach der Erstellung können Sie die registrierte E-Mail in der Einstellung _Allowed users_ des ioBroker.link-Adapters konfigurieren. In der Adapterkonfiguration muss kein Passwort angegeben werden.

### Ich habe bereits ein Konto bei https://iobroker.pro. Kann ich es für die Link-Cloud verwenden?
Ja. Sie können das bereits vorhandene Konto https://iobroker.pro verwenden.

### Ist es möglich, https://iobroker.pro und Link-Cloud-Dienste gleichzeitig zu nutzen?
Ja. Es gibt keine Abhängigkeiten zwischen diesen beiden Diensten. Sie können sie separat oder parallel verwenden.

### Warum verwendet die Link-Cloud https://iobroker.pro Accounts?
Die Link-Cloud verwendet nicht die Konten https://iobroker.pro. Der Link-Cloud werden keine mit https://iobroker.pro-Konten verbundenen Informationen übertragen / zur Verfügung gestellt. Die Link-Cloud fügt die Authentifizierung nur der https://iobroker.pro hinzu. Die Autorisierung wird wiederum vollständig von der Link-Cloud übernommen.

### Wie kann ich den Zugriff auf meine lokale Installation widerrufen?
Sie können die einzelnen Personen gewährten Zugriffsberechtigungen widerrufen, indem Sie deren E-Mails aus der Einstellung _Allowed user_ des ioBroker.link-Adapters entfernen. Alternativ können Sie den Zugriff auf Ihre lokale Installation vollständig verhindern, indem Sie die Einstellung _Allowed users_ leer lassen. Auch das Stoppen oder Entfernen des ioBroker.link-Adapters verhindert den Zugriff über die Link-Cloud.

### Muss ich für die Nutzung der Link-Cloud Gebühren bezahlen?
Momentan fallen keine Gebühren an und die Nutzung der Link-Cloud ist völlig kostenlos. Es ist auch unabhängig davon, ob Sie Ihr kostenloses oder bezahltes https://iobroker.pro Konto verwenden. Bitte beachten Sie, dass sich dies in Zukunft ändern kann.

### Warum planen Sie, diesen einfachen Service in Rechnung zu stellen?
Selbst dieser einfache Service erfordert eine Infrastruktur, die rund um die Uhr läuft und Kosten verursacht. Das Sicherstellen der hohen Verfügbarkeit dieses Dienstes, das Beheben von Ausfällen und das Verbessern oder Hinzufügen neuer Funktionen beanspruchen einen erheblichen Teil unserer Zeit. Um uns der Weiterentwicklung zu widmen, brauchen wir Chips. Das würde es unseren Frauen ermöglichen, einkaufen zu gehen und uns mehr Zeit zu geben, diesem Projekt Aufmerksamkeit zu schenken.

### Was sind die Einschränkungen der Link-Cloud?
Derzeit kann nur eine einzige Verbindung zu einer lokalen ioBroker-Installation hergestellt werden. Wenn also mehreren Benutzern Zugriffsberechtigungen für eine lokale Installation erteilt werden, kann jeweils nur ein Benutzer eine Verbindung herstellen. Auch die einzige Verbindung pro Benutzer ist erlaubt. Dies bedeutet, dass derselbe Benutzer, dem die Zugriffsberechtigung für mehrere lokale Installationen erteilt wurde, jeweils nur auf eine Installation zugreifen kann.

### Wie kann ich verfolgen, wer und wann auf meine lokale Installation zugegriffen hat?
Die Metadaten aller angeforderten Verbindungen bleiben erhalten und können unter https://iobroker.link eingesehen werden.

## Adapterkonfiguration :: Haupteinstellungen
### Kundenname
Dies ist der Name Ihrer lokalen ioBroker-Installation. Sie können es frei wählen. Es hilft Ihnen, verschiedene ioBroker-Installationen zu unterscheiden, während Sie eine Verbindungsanfrage über die Link-Cloud stellen.

### Server-URI
Dies ist der Domainname der Link-Cloud. Diese Einstellung ist mit https://iobroker.link vorkonfiguriert und sollte geändert werden.

### Proxy-URI
Befindet sich Ihre ioBroker-Installation hinter einem Proxy, können Sie den Proxy-Server hier konfigurieren. Proxy kann hier definiert werden als: *http:// proxy: 8080* oder über die Umgebungsvariable **HTTPS_PROXY**

### Abfrageintervall (Sek.)
Legt fest, wie oft Ihr Adapter die Link-Cloud nach ausstehenden Verbindungsanfragen abfragt.
Empfohlene Einstellung: 10

### Zulässige Benutzer
Definiert die vorhandenen https://iobroker.pro-Konten, denen Zugriffsberechtigungen für Ihre lokale ioBroker-Installation erteilt werden müssen.

Wenn Sie sich und Ihrer Frau den Zugriff gewähren möchten und annehmen, dass Sie mich@gmail.com und darling@gmail.com beim Erstellen der https://iobroker.pro-Konten angegeben haben, enthält die Einstellung _Erlaubte Benutzer_ diese beiden E-Mails. E-Mail-Adressen.

## Adapterkonfiguration :: Geräte
Hier definieren Sie eine Liste von Geräten, auf die über die Link-Cloud zugegriffen werden kann.

### Aktiviert
Legt fest, ob auf das konfigurierte Gerät zugegriffen werden soll.

### Name
Der frei gewählte Name des Geräts. Es hilft bei der Verbindung über die Link-Cloud, zwischen verschiedenen Geräten zu unterscheiden.

### IP
Die IP-Adresse eines Geräts, das in Ihrem lokalen Netzwerk verbunden werden soll. Sie können anstelle der IP-Adresse einen Hostnamen, z. B. _localhost_, angeben. Beachten Sie jedoch, dass dieser Name auf dem Computer, auf dem der ioBroker-Link-Adapter ausgeführt wird, auflösbar sein muss und Hostnamen nicht für UDP-Geräte verwendet werden können.

### Hafen
Die Portnummer, über die Ihr Gerät eingehende Verbindungen empfängt.

### Art
- TCP - für Geräte, die das TCP- und / oder HTTP-Protokoll unterstützen
- UDP - für Geräte, die das UDP-Protokoll unterstützen

## Adapter configuration :: Beispiel für die Gerätekonfiguration
Um Ihr ioBroker.admin-Web-UI über die Link-Cloud zugänglich zu machen, konfigurieren Sie es unter _Adapter configuration :: Devices_ wie folgt:

- aktiviert: aktiviert
- name: ioBrokerAdminWebUI (oder welcher Name auch immer)
- IP: localhost (oder 127.0.0.1)
- Port: 8081 (wenn Sie den Standardport von ioBroker.admin nicht geändert haben)
- Geben Sie Folgendes ein: TCP

Um auf die Web-UI Ihres Routers zuzugreifen, haben Sie möglicherweise folgende Konfiguration:

- aktiviert: aktiviert
- Name: Router
- IP: 192.168.0.1 (oder was auch immer die lokale Netzwerk-IP Ihres Routers ist)
- Port: 80 (wenn Sie den Standardport der Router-Webbenutzeroberfläche nicht geändert haben)
- Geben Sie Folgendes ein: TCP

## Changelog
### 0.5.2 (2019-11-26)
* (bluefox) Added user enability

### 0.4.4 (2019-07-16)
* (gh-got) closing tunnels in case server considers an agent as offline
* (gh-got) fixed timeout to query active connection status

### 0.4.2 (2019-03-28)
* (gh-got) agents will report own version by registration

### 0.4.0 (2019-03-10)
* (bluefox) Made this adapter to be compatible with the new server

### 0.3.7 (2018-09-23)
* (bluefox) Do not connect to the cloud if no configuration defined

### 0.3.6 (2018-06-26)
* (bluefox) The download of SSF from github depending on platform was added

### 0.2.7 (2018-06-17)
* (bluefox) UDP communication is now supported

### 0.2.6 (2018-06-10)
* (bluefox) HTTP proxy support

### 0.1.3 (2018-04-25)
* (bluefox) Initial commit

## License
Creative Common Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2018-2019 bluefox <dogafox@gmail.com>, gh-got

http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).