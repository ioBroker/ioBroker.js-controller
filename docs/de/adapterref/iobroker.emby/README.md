---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: s61YcNn5U2uccRdeMrSqE/NRr2cIAwEuwasYDW04BC4=
---
![Logo](../../../en/adapterref/iobroker.emby/admin/emby.png)

![Build Status](https://travis-ci.org/thewhobox/ioBroker.emby.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/emby-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.emby.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.emby.svg)
![NPM](https://nodei.co/npm/iobroker.emby.png?downloads=true)

# IoBroker.emby
Mit diesem Adapter können Sie eine Verbindung zu Ihrem Emby Server herstellen und diesen steuern.

Bitte befolgen Sie die Schritte, um sicherzustellen, dass der Adapter ordnungsgemäß funktioniert und Sie alle Geräte sehen können.

## Schritte
1. Installieren Sie den Adapter von Github

2. Bearbeiten Sie die Einstellungen und geben Sie die IP, den ApiKey und möglicherweise einige DeviceIds ein, die Sie ignorieren möchten.

```IP **with** Port => 192.168.0.100:8096```

3. Speichern Sie den Adapter und starten Sie ihn erneut.

4. Um die ersten Elemente anzuzeigen, müssen Sie einen Emby-Client öffnen, um Daten zu erhalten.

```The Adapter will not get Data if **no** client is open.```

## Objekte
### Infos
| Befehl | Beschreibung | Info |
| ------------- | ------------- | ------------- |
| x.info.deviceName | Zeigt den Namen des Geräts an |
| x.info.userName | Zeigt den Namen des auf dem Gerät angemeldeten Benutzers an |
| x.info.supportedCommands | Liste der unterstützten Befehle | |

### Medien
| Befehl | Beschreibung | Info |
| ------------- | ------------- | ------------- |
| x.media.description | Beschreibung der angezeigten Datei. | |
| x.media.isMuted | Wenn das Medium stummgeschaltet ist. | Nicht alle Geräte unterstützen dies und werden falsch sein. |
| x.media.state | Zustand der Medien. | spielen, pausiert, im Leerlauf |
| x.media.title | Der Titel der angezeigten Datei. | |
| x.media.type | Der Typ der angezeigten Datei. | Episode, Film, Audio, keine usw. |
| x.media.seasonName | Der Name der Saison | Nur wenn .media.type Episode ist, wird es sonst leer sein. |
| x.media.seriesName | Der Name der Serie | Nur wenn .media.type Episode ist, wird es sonst leer sein. |

### Befehle
| Befehl | Beschreibung | Info |
| ------------- | ------------- | ------------- |
| x.Befehl.dialog | Zeigt ein Dialogfeld auf dem ausgewählten Gerät an. | Zum Beispiel: Header \ | Ein Teil des Textes (wenn kein Header angegeben ist, ist ioBroker Header) |
| x.command.goHome | Sendet einen Befehl an das ausgewählte Gerät, das zum Homescreen | zurückkehrt |
| x.Befehlsnachricht | Zeigt eine Nachricht für 5 Sekunden auf dem ausgewählten Gerät an. | |
| x.command.play | Spielt Medien | Nur wenn Medien pausiert sind |
| x.Befehl.pause | Pausiert Medien | Nur wenn Medien abgespielt werden |
| x.command.toggleplay | Schaltet den Playstate um Abspielen / Pause |
| x.Befehl.stumm | Schaltet das Gerät stumm |
| x.Befehl.unmute | Stummschaltung des Geräts aufheben |
| x.command.togglemute | Schaltet die Stummschaltung des Geräts um |
| x.Befehl.Volumen | Legt die Lautstärke des ausgewählten Geräts fest. | Funktioniert auf den meisten Geräten nicht, da dies nicht die Lautstärke des Fernsehers beeinflusst. |

### Andere Befehle werden bald kommen

## Changelog

### 0.1.2
* Added more commands

### 0.1.1
* Added delay if you watch mor episodes

### 0.1.0
* Added automatic try reconnect after one minute

### 0.0.4
* added compact mode

### 0.0.3
* added new states, connection state and more improvment


### 0.0.2
* added more states
* added DisplayMessage

### 0.0.1
* Initial version