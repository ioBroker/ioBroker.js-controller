---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-client
hash: 6qFhuG22DX3ZziD5rAKORxAIVJLyjGaQEtw6IgmNcKo=
---
![Logo](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![Anzahl der Installationen](http://iobroker.live/badges/mqtt-client-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mqtt-client.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mqtt-client.svg)
![NPM](https://nodei.co/npm/iobroker.mqtt-client.png?downloads=true)

# IoBroker.mqtt-client =====================
## Adaptereinstellungen
![Adapter](../../../en/adapterref/iobroker.mqtt-client/settings.png)

### Zu Thema und Nachricht verbinden
Der ```on connect message``` wird bei jedem Verbindungsaufbau des Clients mit dem Server in den ```on connect topic``` veröffentlicht.

### Last wird Thema und Nachricht
Der ```last will message``` wird bei jedem Verbindungsaufbau des Clients mit dem Server in den ```last will topic``` veröffentlicht.
Der Server speichert diese Nachricht und sendet sie an seine Abonnenten, wenn der Client die Verbindung trennt.

### Abonnements
Kommagetrennte Liste von Themen, die nicht durch vorhandene Zustände abgedeckt werden.
Empfangene Nachrichten werden in Zustände innerhalb des Namensraums des Adapters (z. B. mqtt.0) konvertiert und abonniert.
Sie können Themen entfernen, nachdem alle Status erstellt wurden.

### Veröffentlichungspräfix
Bei der Veröffentlichung wird dies allen Themen vorangestellt.
Standard ist leer (kein Präfix).

### Abonnieren Präfix
Bei der Anmeldung wird dies allen Themen vorangestellt.
Standard ist leer (kein Präfix).

## Zustandseinstellungen
![Zustand](../../../en/adapterref/iobroker.mqtt-client/dialog.png)

### Aktiviert
Aktiviert oder deaktiviert die mqtt-Client-Funktionalität für diesen Status.
Durch das Deaktivieren werden alle Einstellungen des Mqtt-Clients aus diesem Status gelöscht.

### Thema
Das Thema, in dem dieser Status veröffentlicht und von diesem veröffentlicht wurde.
default: state-ID in ein Mqtt-Thema konvertiert.

### Veröffentlichen
* `` `` `` `Zustand wird veröffentlicht
* `` `changes only``` wird nur veröffentlicht, wenn sich der Wert ändert
* `` `as object``` full state wird als Objekt veröffentlicht
* `` `qos``` siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* `` `` ```` siehe <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### Abonnieren
* `` `` `` `Thema wird abonniert und der Status wird entsprechend aktualisiert
* `` `changes only``` state wird nur geschrieben, wenn sich der Wert geändert hat
* `` `as object```-Nachrichten werden als Objekte interpretiert
* `` `qos``` siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* `` `ack``` bei Statusaktualisierungen wird das Ack-Flag entsprechend gesetzt

#### Hinweis
* Wenn ack auf true gesetzt ist, werden Objekte ack überschrieben, siehe `` as object '`
* Um Nachrichtenschleifen zu verhindern, wenn sowohl Publizieren als auch Abonnieren aktiviert sind, ist `` changes only``` für das Abonnieren immer aktiviert

## MACHEN
* Test Präfixe
* Verbinden / Wiederverbinden ohne saubere Sitzung

## Changelog
### 1.1.1 (2018-01-30)
* (bluefox) small fixes

### 1.1.0 (2017-12-30)
* (bluefox) Translations
* (bluefox) Udpate of MQTT module

### 1.0.1 (2017-11-16)

### 1.0.0 (2017-11-16)
* (bluefox) Update io-package.json

### 0.3.2 (2016-11-18)
* (Pmant) fix initial object parsing
* (Pmant) fix objects view
 
### 0.3.1 (2016-11-16)
* (Pmant) fix crash

### 0.3.0 (2016-09-08)
* (Pmant) add optional publish and subscribe prefixes

### 0.2.5 (2016-09-08)
* (Pmant) reduce logging -> debug

### 0.2.0 (2016-09-08)
* (Pmant) use new custom settings

### 0.1.1 (2016-06-09)
* (Pmant) fix possible loop

### 0.1.0 (2016-06-08)
* (Pmant) initial commit