---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.link/README.md
title: ioBroker.link
hash: Nn78VuRacKp2zpDW3YbNLLypO0BwkRl4mmzl8m3Iun4=
---
![Logo](../../../en/adapterref/iobroker.link/admin/link.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.link.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.link.svg)
![NPM](https://nodei.co/npm/iobroker.link.png?downloads=true)

# IoBroker.link
Dieser Adapter ermöglicht eine sichere Verbindung über die [ioBroker.link](https://iobroker.link/) Cloud.

## FAQ
### Was kann ich mit diesem Adapter tun?
Mit diesem Adapter können Sie eine sichere Verbindung zu einer lokalen ioBroker-Installation und anderen Servern / Geräten in Ihrem lokalen Netzwerk hinter einem DSL-Modem / Router / Firewall herstellen. Die Verbindung wird über die öffentlich zugängliche ioBroker.link Cloud (Link-Cloud) hergestellt. Sogar mehrere lokale ioBroker-Installationen können über die Link-Cloud eingerichtet und aufgerufen werden.

### Was ist der Unterschied zu einer Portweiterleitung, die ich auf meinem Router konfigurieren kann?
Während Sie eine Portweiterleitung auf Ihrem Router konfigurieren und so von überall auf Ihre lokale ioBroker-Installation zugreifen können, bietet die Link-Cloud die folgenden Hauptvorteile:

- Auf Ihrem Router müssen keine Ports für das Internet geöffnet sein
- Für Ihre lokale ioBroker-Installation ist keine öffentliche IP-Adresse oder ein (dynamischer) DNS-Name erforderlich
- Link-Cloud kümmert sich um Authentifizierung und Autorisierung
- Link-Cloud sichert eine Verbindung mit SSL / TLS
- Link-Cloud stellt ein Überwachungsprotokoll bereit
- Auf mehrere lokale ioBroker-Installationen kann über dieselbe Benutzeroberfläche des Link-Cloud-Servers zugegriffen werden
- Der ioBroker.link-Adapter fungiert als Reverse-Proxy und ermöglicht den Zugriff auf andere Server / Geräte in Ihrem lokalen Netzwerk, die HTTP / TCP / UDP-Protokolle unterstützen
- Ihr können gewähren einen temporären oder permanenten Zugriff auf Ihre lokalen ioBroker Installation auf eine <sup>3.</sup> Person, zum Beispiel zu beheben Gerät Ausfälle, ohne die Notwendigkeit , Ihr Passwort zu offenbaren oder Anmeldeinformationen verwalten

### Wie kann eine Verbindung zu meiner lokalen ioBroker-Installation hergestellt werden, wenn keine öffentliche IP-Adresse und keine Ports geöffnet sind?
Die Link-Cloud stellt niemals eine Verbindung zu Ihrer lokalen Installation her. Es ist der ioBroker.link-Adapter, der lokal ausgeführt wird und eine Verbindung zur Link-Cloud herstellt, falls eine Verbindungsanforderung vorliegt.

### Was ist eine Verbindungsanforderung?
Eine Verbindungsanforderung ist die Absicht, eine Verbindung zu einer lokalen ioBroker-Installation herzustellen, die von einer authentifizierten und autorisierten Person über die Link-Cloud hergestellt wird.

### Wie erkennt der ioBroker.link-Adapter, dass eine Verbindungsanforderung vorliegt?
Ein ioBroker.link-Adapter sucht regelmäßig nach ausstehenden Verbindungsanforderungen, indem er die Link-Cloud abfragt. Sie können das Abfrageintervall in den Einstellungen des ioBroker.link-Adapters einrichten.

### Wie kann ich sicherstellen, dass der ioBroker.link-Adapter eine Verbindung zur Link-Cloud und nicht zu einem Mann in der Mitte herstellt?
Der ioBroker.link-Adapter kann nur eine Verbindung zu einem Server herstellen, der ein gültiges SSL-Zertifikat für ioBroker.link vorlegt.

### Wie identifiziert und autorisiert die Link-Cloud alle ioBroker.link-Adapter, die nach ausstehenden Verbindungsanforderungen abfragen oder eine Verbindung herstellen?
Jeder ioBroker.link-Adapter generiert ein eigenes eindeutiges 2048-Bit-Schlüsselpaar. Bei der Registrierung bei Link-Cloud überträgt ein Adapter seinen öffentlichen Schlüssel. Bei jeder nachfolgenden Anforderung an die Link-Cloud (auf ausstehende Verbindungsanforderungen prüfen, ausstehende Verbindung akzeptieren oder ablehnen, offene Verbindung schließen usw.) autorisiert sich der Adapter selbst, indem er ein JSON-Web-Token (JWT) bereitstellt, das mit dem privaten Schlüssel des Adapters signiert ist . Die Link-Cloud überprüft die Signatur von JWT mithilfe des gespeicherten öffentlichen Schlüssels und akzeptiert oder lehnt die Verbindung ab.

### Kann ein Adapter mit dem Adapter JWT eines anderen eine Verbindung zu einer Link-Cloud herstellen?
Nein. Ein Adapter signiert ein JWT mit seinem eigenen eindeutigen privaten Schlüssel, der die lokale Installation niemals verlässt. Die Link-Cloud verwendet den entsprechenden öffentlichen Schlüssel, um die Signatur zu überprüfen.

### Kann ich die Sicherheit erhöhen, indem ich die Tasten drehe, mit denen mein Adapter autorisiert wurde?
Ja. Die Schlüssel werden im Ordner / keys Ihrer Adapterinstallation gespeichert. Löschen Sie alle Dateien in diesem Ordner und starten Sie den Adapter neu. Der Adapter erstellt beim Start ein neues Schlüsselpaar und aktualisiert die Registrierung in der Link-Cloud, indem er den neuen öffentlichen Schlüssel sendet.

### Wie wird eine hergestellte Verbindung selbst gesichert?
Wenn eine Verbindungsanforderung aussteht, baut ein ioBroker.link-Adapter zuerst einen SSH-Tunnel zur Link-Cloud auf und akzeptiert die eingehende Verbindung. Beide Seiten autorisieren sich mittels Zertifikaten. Sobald der SSH-Tunnel eingerichtet ist, beginnt die Kommunikation selbst. Sobald die Verbindung geschlossen wird, z. B. durch einen Benutzer über die Benutzeroberfläche des Link-Cloud-Servers, wird der SSH-Tunnel geschlossen und es ist keine Kommunikation mehr möglich.

### Ist es auch möglich, über die Link-Cloud eine Verbindung zu meinen lokalen Geräten herzustellen?
Ja. Wenn Ihre Geräte das HTTP-Protokoll unterstützen, können Sie über die Link-Cloud darauf zugreifen. Jedes Gerät, mit dem Sie über die Link-Cloud eine Verbindung herstellen möchten, muss in den Einstellungen des ioBroker.link-Adapters explizit konfiguriert werden. Standardmäßig kann kein Gerät angeschlossen werden. Sogar die ioBroker.admin-Web-Benutzeroberfläche muss zuerst konfiguriert werden, um eine Verbindung herstellen zu können.

### Was muss ich installieren, um über die Link-Cloud eine Verbindung zu meinen lokalen Geräten herzustellen?
Eine Verbindung zu lokalen Geräten, die das HTTP-Protokoll unterstützen, wird über den Browser Ihrer Wahl hergestellt. Es ist keine zusätzliche Software erforderlich.

### Mein lokales Gerät unterstützt nur das TCP / UDP-Protokoll. Ist auch eine Verbindung zu TCP / UDP-Geräten möglich?
Ja. Um eine Verbindung zu lokalen TCP / UDP-Geräten herzustellen, verwenden Sie bitte die ioBroker.link-Box: https://www.npmjs.com/package/iobroker.link-box

### Wie erteile ich Zugriff auf meine lokale ioBroker-Installation?
Jeder, dem Zugriff auf eine lokale ioBroker-Installation gewährt werden soll, muss in den Einstellungen des ioBroker.link-Adapters explizit konfiguriert werden. Standardmäßig hat niemand Zugriff. Das bedeutet, dass Sie sich auch selbst konfigurieren müssen, um eine Verbindung zu Ihrer eigenen lokalen ioBroker-Installation herstellen zu können.

### Wie und wo erstelle ich den Benutzer, dem ich den Zugriff auf meine lokale Installation gewähren möchte?
Zuerst müssen Sie ein kostenloses Konto unter https://iobroker.pro erstellen. Nach der Erstellung können Sie die registrierte E-Mail in der Einstellung ioBroker.link Adapter _Allowed users_ konfigurieren. In der Adapterkonfiguration muss kein Passwort angegeben werden.

### Ich habe bereits ein Konto bei https://iobroker.pro. Kann ich es für die Link-Cloud verwenden?
Ja. Sie können bereits vorhandene https://iobroker.pro-Konten verwenden.

### Ist es möglich, https://iobroker.pro und Link-Cloud-Dienste gleichzeitig zu nutzen?
Ja. Es gibt keine Abhängigkeiten zwischen diesen beiden Diensten. Sie können sie separat oder parallel verwenden.

### Warum verwendet die Link-Cloud https://iobroker.pro Konten?
Die Link-Cloud verwendet die Konten https://iobroker.pro nicht. Es werden keine mit https://iobroker.pro verknüpften Informationen in die Link-Cloud übertragen / verfügbar. Die Link-Cloud verbindet die Authentifizierung lediglich mit https://iobroker.pro. Die Autorisierung wiederum wird vollständig von der Link-Cloud übernommen.

### Wie kann ich den Zugriff auf meine lokale Installation widerrufen?
Sie können die Zugriffsberechtigungen für einzelne Personen widerrufen, indem Sie deren E-Mails aus der Einstellung "Zulässiger Benutzer" des ioBroker.link-Adapters entfernen. Alternativ können Sie den Zugriff auf Ihre lokale Installation vollständig verhindern, indem Sie die Einstellung _Allowed users_ leer lassen. Auch das Stoppen oder Entfernen des ioBroker.link-Adapters verhindert den Zugriff über die Link-Cloud.

### Habe ich Gebühren für die Nutzung der Link-Cloud?
Momentan fallen keine Gebühren an und die Link-Cloud ist völlig kostenlos. Es ist auch unabhängig, ob Sie Ihr kostenloses oder kostenpflichtiges https://iobroker.pro Konto verwenden. Bitte beachten Sie, dass dies in Zukunft geändert werden kann.

### Warum planen Sie eine Gebühr für diesen einfachen Service?
Selbst dieser einfache Service erfordert eine rund um die Uhr laufende Infrastruktur und verursacht Kosten. Die Sicherstellung der Hochverfügbarkeit dieses Dienstes, die Behebung von Ausfällen und die Verbesserung oder Hinzufügung neuer Funktionen beanspruchen viel Zeit. Um uns für die weitere Entwicklung zu weihen, brauchen wir Chips. Das würde unseren Frauen erlauben, einkaufen zu gehen und uns mehr Zeit zu geben, diesem Projekt Aufmerksamkeit zu schenken.

### Was sind die Einschränkungen der Link-Cloud?
Derzeit kann nur eine einzige Verbindung zu einer lokalen ioBroker-Installation hergestellt werden. Das heißt, wenn mehreren Benutzern Zugriffsberechtigungen für eine lokale Installation erteilt werden, kann jeweils nur ein Benutzer eine Verbindung herstellen. Auch die einzige Verbindung pro Benutzer ist erlaubt. Dies bedeutet, dass derselbe Benutzer, dem die Zugriffsberechtigung für mehrere lokale Installationen erteilt wurde, jeweils nur auf eine Installation zugreifen kann.

### Wie kann ich verfolgen, wer und wann auf meine lokale Installation zugegriffen hat?
Die Metadaten aller angeforderten Verbindungen bleiben erhalten und können unter https://iobroker.link angezeigt werden.

### Welche Ports müssen in der Firewall verfügbar sein?
Folgende Ports auf dem iobroker.link-Server müssen erreichbar sein: 5000-5100 (ausgehend)

## Adapterkonfiguration :: Haupteinstellungen
### Kundenname
Dies ist der Name Ihrer lokalen ioBroker-Installation. Sie können es frei wählen. Es hilft Ihnen, verschiedene ioBroker-Installationen zu unterscheiden, während Sie eine Verbindungsanforderung über die Link-Cloud stellen.

### Server-URI
Dies ist der Domainname der Link-Cloud. Diese Einstellung ist mit https://iobroker.link vorkonfiguriert und sollte geändert werden.

### Proxy-URI
Wenn sich Ihre ioBroker-Installation hinter einem Proxy befindet, können Sie den Proxyserver hier konfigurieren. Proxy kann hier definiert werden als: *http:// Proxy: 8080* oder über die Umgebungsvariable **HTTPS_PROXY**

### Abfrageintervall (Sek.)
Legt fest, wie oft Ihr Adapter die Link-Cloud nach ausstehenden Verbindungsanforderungen abfragt.
Empfohlene Einstellung: 10

### Zulässige Benutzer
Definiert die vorhandenen https://iobroker.pro-Konten, denen Zugriffsberechtigungen für Ihre lokale ioBroker-Installation erteilt werden müssen.

Wenn Sie sich und Ihrer Frau Zugriff gewähren möchten und davon ausgehen, dass Sie beim Erstellen der Konten https://iobroker.pro me@gmail.com und darling@gmail.com angegeben haben, enthält die Einstellung _Allowed users_ diese beiden e- Mail-Adressen.

## Adapterkonfiguration :: Geräte
Hier definieren Sie eine Liste von Geräten, auf die über die Link-Cloud zugegriffen werden kann.

### Aktiviert
Definiert, ob auf das konfigurierte Gerät zugegriffen werden soll.

### Name
Der frei gewählte Name des Geräts. Es hilft, bei der Verbindung über die Link-Cloud zwischen verschiedenen Geräten zu unterscheiden.

### IP
Die IP-Adresse eines Geräts, das in Ihrem lokalen Netzwerk verbunden werden soll. Sie können anstelle der IP-Adresse einen Hostnamen angeben, z. B. _localhost_. Beachten Sie jedoch, dass dieser Name auf dem Computer aufgelöst werden muss, auf dem Ihr ioBroker-Link-Adapter ausgeführt wird, und dass Hostnamen nicht für UDP-Geräte verwendet werden können.

### Hafen
Die Portnummer, die Ihr Gerät auf eingehende Verbindungen überwacht.

### Art
- TCP - für Geräte, die das TCP- und / oder HTTP-Protokoll unterstützen
- UDP - für Geräte, die das UDP-Protokoll unterstützen

## Adapterkonfiguration :: Beispiel für die Gerätekonfiguration
Um Ihre ioBroker.admin-Web-Benutzeroberfläche über die Link-Cloud zugänglich zu machen, konfigurieren Sie sie unter _Adapter configuration :: Devices_ wie folgt:

- aktiviert: aktiviert
- Name: ioBrokerAdminWebUI (oder welcher Name auch immer Sie mögen)
- IP: localhost (oder 127.0.0.1)
- Port: 8081 (wenn Sie den Standardport von ioBroker.admin nicht geändert haben)
- Typ: TCP

Um auf die Web-Benutzeroberfläche Ihres Routers zuzugreifen, haben Sie möglicherweise folgende Konfiguration:

- aktiviert: aktiviert
- Name: Router
- IP: 192.168.0.1 (oder was auch immer die lokale Netzwerk-IP Ihres Routers ist)
- Port: 80 (wenn Sie den Standardport der Web-Benutzeroberfläche des Routers nicht geändert haben)
- Typ: TCP

Um auf den Snapshot oder Live-Stream Ihrer IP-Kamera zuzugreifen, konfigurieren Sie ein Gerät wie folgt:

- aktiviert: aktiviert
- Name: Front-Door-Snapshot (oder welcher Name auch immer Sie mögen)
- IP: Der HTTP-Endpunkt Ihrer Kamera, z. B.: _http://192.168.0.178: 8000 / tmpfs / snap.jpg_
- Port: ignoriert, soll Teil der HTTP-Enpoint-Konfiguration sein
- Typ: TCP

Geben Sie die Anmeldeinformationen Ihrer Kamera NICHT als Anforderungsparameter in den konfigurierten HTTP-Enpoint ein: _http://192.168.0.178: 8000 / tmpfs / snap.jpg? Usr = admin & pwd = admin_

Stellen Sie sie stattdessen bereit, wenn Sie beim Herstellen einer Verbindung dazu aufgefordert werden.

## Changelog
### 0.5.10 (2020-12-09)
* (bluefox) Ignore errors at 4:00 because of the server restart

### 0.5.6 (2019-12-02)
* (gh-got) multi-factor connection approval
* (gh-got) Implemented the acknowledgment via telegram

### 0.5.2 (2019-11-26)
* (bluefox) Added user disable/enable

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
* (bluefox) The download of SSF from github depending on plattform was added

### 0.2.7 (2018-06-17)
* (bluefox) UDP communication is now supported

### 0.2.6 (2018-06-10)
* (bluefox) HTTP proxy support

### 0.1.3 (2018-04-25)
* (bluefox) Initial commit

## License
Creative Common Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2018-2020 bluefox <dogafox@gmail.com>, gh-got

http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).