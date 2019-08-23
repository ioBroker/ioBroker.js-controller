---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: 9m/tRvAGi2VZifTmIIULKck7p+PJMWQ9bsY5J7SZvFo=
---
![Logo](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Anzahl der Installationen](http://iobroker.live/badges/plex-installed.svg)
![stabile Version](http://iobroker.live/badges/plex-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.plex.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.plex.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.plex.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Zefau/ioBroker.plex.svg)
![NPM](https://nodei.co/npm/iobroker.plex.png?downloads=true)

# IoBroker.plex Integration des Plex Media Servers in ioBroker (mit oder ohne Plex Pass). Darüber hinaus Tautulli-Integration.
**Inhaltsverzeichnis**

1. [Funktionen] (Nr. 1-Funktionen)
2. [Setup Anweisungen] (# 2-Setup-Anweisungen)
   1. [Grundeinstellung] (# 21-Grundeinstellung)
   2. [Erweitertes Setup] (# 22-Erweitertes-Setup-Plex-Pass-or-Tautulli)
3. [Channels & States] (# 3-Kanäle - Staaten)
   1. [mit Basic Setup] (# 31-mit-Basis-Setup)
   2. [mit erweitertem Setup] (# 32-mit-erweitertem-Setup)
4. [Changelog] (# changelog)
5. [Lizenz] (# Lizenz)

## 1. Eigenschaften
- Empfangen Sie "Ereignisse" von Plex (über [Plex Webhook] (https://support.plex.tv/articles/115002267687-webhooks/#toc-0) und [Plex Notifications] (https://support.plex.tv) / articles / push-notifications / # toc-0) mit Plex Pass oder über Tautulli, [__se setup! __] (# 22-advanced-setup-plex-pass-or-tautulli)
- Wiedergabesteuerung für Spieler
- Holen Sie sich "Server"
- Holen Sie sich `Bibliotheken`
- Abrufen aller Elemente in einer Bibliothek
- Benutzer abrufen (nur mit Tautulli)
- Abrufen von Statistiken (nur mit Tautulli)
- Wiedergabelisten abrufen
- `Einstellungen` abrufen
- Webinterface, das die letzten Ereignisse von Plex anzeigt:

  ![Plex Web Interface](../../../en/adapterref/iobroker.plex/img/screenshot_adapter-interface.png)

## 2. Setup-Anweisungen
### 2.1. Grundeinstellung
Für die Grundeinstellung müssen Sie die IP-Adresse (und den Port) Ihrer Plex-Installation angeben. Darüber hinaus müssen Sie ein dediziertes Token für den Adapter abrufen, um Daten von Plex abzurufen.

Sobald dies angegeben ist, ruft ioBroker.plex alle grundlegenden Daten (einschließlich Server, Bibliotheken) ab. Die vollständige Liste der Grunddaten finden Sie in [Kanäle und Bundesstaaten](#21-with-basis-setup).

### 2.2. Erweitertes Setup (Plex Pass oder Tautulli)
#### 2.2.1. Plex Pass
__Webhook__

Wenn Sie ein Plex Pass-Benutzer sind, können Sie in den Plex-Einstellungen [einen Webhook einrichten](https://support.plex.tv/articles/115002267687-webhooks/#toc-0) das aktuelle Ereignis / die aktuelle Aktion von Ihrem Plex Media-Server abrufen (Abspielen, Anhalten, Fortsetzen, Stoppen, Anzeigen und Bewerten).

Navigieren Sie zu Ihrem Plex Media Server und gehen Sie zu ```Settings``` und ```Webhook```. Erstellt einen neuen Webhook, indem Sie auf ```Add Webhook``` klicken und Ihre ioBroker-IP-Adresse mit dem in den ioBroker.plex-Einstellungen angegebenen benutzerdefinierten Port eingeben und den ```/plex```-Pfad verfolgen, z. ```http://192.168.178.29:41891/plex```:

![Plex Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

__Veranstaltungen__

Informationen zu den Plex Notifications erhalten Sie unter [siehe die offizielle Dokumentation](https://support.plex.tv/articles/push-notifications/#toc-0). Um Benachrichtigungen auf Ihrem Plex Media Server zu aktivieren, gehen Sie zu `Settings`> `Server`> `General` und aktivieren Sie die Voreinstellung `Push Notifications`.

#### 2.2.2.Tautulli
[Tautulli ist eine Drittanbieteranwendung] (https://tautulli.com/#about), die Sie zusammen mit Ihrem Plex Media Server ausführen können, um Aktivitäten zu überwachen und verschiedene Statistiken zu verfolgen. Am wichtigsten ist, dass diese Statistiken enthalten, was gesehen wurde, wer es gesehen hat, wann und wo sie es gesehen haben und wie es gesehen wurde. Alle Statistiken werden in einer ansprechenden und übersichtlichen Oberfläche mit vielen Tabellen und Grafiken dargestellt, sodass Sie problemlos mit Ihren Servern für alle anderen prahlen können. Überprüfen Sie [Tautulli Preview] (https://tautulli.com/#preview) und [installieren Sie es auf Ihrem bevorzugten System](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation) wenn Sie interessiert sind.

Dieser Adapter stellt eine Verbindung zum [Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md) her und empfängt auch Webhook-Ereignisse von Tautulli.

##### 2.2.2.1. API
Öffnen Sie nach der Installation von Tautulli die Seite _Einstellungen_ im Tautulli-Dashboard und navigieren Sie zu _Webschnittstelle_. Scrollen Sie zum Abschnitt _API_ und vergewissern Sie sich, dass ```Enable API``` markiert ist. Kopieren Sie den ```API key``` und tragen Sie ihn in die ioBroker.plex-Einstellungen ein. Fügen Sie außerdem die Tautulli-IP-Adresse und den Port hinzu, um die API-Kommunikation zu ermöglichen.

##### 2.2.2.2. Webhook
###### Überblick
Befolgen Sie zum Einrichten eines Webooks mit Tautulli die nachstehenden Anweisungen und vergewissern Sie sich, dass Sie alle vier Schritte ausgeführt haben:

1. Fügen Sie den Notification Agent hinzu
2. Konfigurieren Sie Webhook im Notification Agent
3. Konfigurieren Sie die Trigger im Notification Agent
4. Konfigurieren Sie die Daten im Notification Agent
5. Konfigurieren Sie die Benachrichtigungsoptionen

###### Beschreibung
Nach der Installation öffnen Sie die Einstellungsseite im Tautulli-Dashboard und navigieren Sie zu Notification Agents (siehe unten):

![Tautulli-Einstellungen](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1. Klicken Sie auf "Neuen Benachrichtigungsagenten hinzufügen" und auf "Webhook".
2. Geben Sie Ihre ioBroker-IP-Adresse mit dem in den ioBroker.plex-Einstellungen angegebenen benutzerdefinierten Port ein und folgen Sie dem Pfad `` `/ tautulli```, z. `` `http://192.168.178.29: 41891 / tautulli```:

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png) Wählen Sie außerdem ```POST``` für die _Webhook-Methode_ und geben Sie eine beliebige Beschreibung in _Description_ ein.

3. Wechseln Sie als Nächstes zur Registerkarte _Triggers_, und wählen Sie die gewünschten (oder einfach alle) Benachrichtigungsagenten aus. Ein aktivierter Benachrichtigungsagent löst ein Ereignis aus, das dann an ioBroker gesendet wird. __Stellen Sie sicher, dass Sie im nächsten Schritt die erforderlichen Daten für jeden aktivierten Benachrichtigungsagenten bereitstellen!
4. Tragen Sie nun __wichtigst__ die entsprechende Datennutzlast in der Registerkarte _Data_ gemäß __ [Benachrichtigungskonfiguration hier] (README-tautulli.md # notification-configuration) __ ein.

   Kopieren Sie die Benachrichtigungskonfiguration der entsprechenden Benachrichtigungsagenten aus dem vorherigen Schritt (z. B. ```Playback Start```, ```Playback Stop```, ```Playback Pause``` und ```Playback Resume```) in jedes der folgenden Textfelder für § §JJJJJ_4§§:

   ![Tautulli-Benachrichtigung](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

5. Aktivieren Sie abschließend die Option "Aufeinanderfolgende Benachrichtigungen zulassen", um das Senden aufeinanderfolgender Benachrichtigungen zuzulassen (z. B. sowohl überwachte als auch gestoppte Benachrichtigungen):

   ![Tautulli-Benachrichtigungseinstellungen](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification_settings.png)

## 3. Kanäle und Bundesstaaten
Wenn sowohl die Grundkonfiguration als auch die erweiterte Konfiguration konfiguriert sind, werden die folgenden Kanäle angezeigt (Bibliotheken, Server und Benutzer sind natürlich nur Beispiele). Siehe weiter unten für [vollständige Liste der Kanäle und Bundesstaaten](#21-with-basis-setup).

![Beispiel für Kanäle und Bundesstaaten](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 3.1. Mit Basis Setup
Nach erfolgreicher Grundeinstellung werden die Kanäle gemäß folgender Tabelle angelegt. Für eine Liste aller Staaten, die erstellt werden, bitte [Siehe spezielle Liste der Bundesstaaten](README-states.md#with-basis-setup).

| Kanal / Ordner | Beschreibung |
| ------- | ----------- |
| __bibliotheken__ | Plex-Bibliotheken |
| __servers__ | Plex Server |
| __Einstellungen__ | Plex-Einstellungen |

### 3.2. Mit erweitertem Setup
Nach erfolgreichem Advanced Setup werden zusätzlich folgende Kanäle angelegt. Für eine Liste aller Staaten, die erstellt werden, bitte [Siehe spezielle Liste der Bundesstaaten](README-states.md#with-advanced-setup).

| Kanal / Ordner | Beschreibung | Bemerkung |
| ---------------- | ----------- | ------ |
| __ \ _ spielen__ | Plex Media wird abgespielt | mit Plex Pass oder Tautulli |
| __Statistik__ | Plex Watch Statistics | nur mit Tautulli |
| __users__ | Plex Benutzer | nur mit Tautulli |

## Changelog

### 1.0.0 (2019-xx-xx) [MILESTONES / PLANNED FEATURES FOR v1.0.0 RELEASE]
- Remote Player Control

### 0.6.0 (2019-08-19)
- (Zefau) replaced password with token authentication

### 0.5.0 (2019-08-18)
- (Zefau) added support for Plex Notifications ([#9](https://github.com/Zefau/ioBroker.plex/issues/9))
- (Zefau) added support for all Tautulli triggers
- (Zefau) added Adapter Web Interface that shows the recent events

### 0.4.3 (2019-08-11)
- (Zefau) Performance improvements (dutyCycleRun and state comparison)
- (Zefau) added refresh button (to scan library files) to libraries

### 0.4.1 / 0.4.2 (2019-08-03)
- (Zefau) fixed newly introduced playback control not working for certain players
- (Zefau) removed unnecessary dependencies

### 0.4.0 (2019-08-01)
- (Zefau) added playback control for players
- (Zefau) added configuration options to only retrieve specific objects from Plex

### 0.3.2 / 0.3.3 (2019-07-25)
- (Zefau) added file, streaming and transcoding information to Tautulli event
- (Zefau) fixed bug when no playlists exist
- (Zefau) fixed missing `EVENTS.json`

### 0.3.1 (2019-07-20)
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 0.3.0 (2019-05-16)
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#6](https://github.com/Zefau/ioBroker.plex/pull/6))
- (Zefau) added support / discovery in [iobroker.discovery](https://github.com/ioBroker/ioBroker.discovery) ([#62](https://github.com/ioBroker/ioBroker.discovery/pull/62))
- (Zefau) added playlists to states
- (Zefau) added state description for object tree ```_playing```
- (Zefau) updated German translation (instead of generating it from English)

### 0.2.0 (2019-05-14)
- (Zefau) added authentication method (using Plex user and Plex password)
- (Zefau) fixed @iobroker/adapter-core dependency

### 0.1.0 (2019-04-26)
- (Zefau) get initial data from Plex API
- (Zefau) receive events from Plex Webhook (Plex Pass only)
- (Zefau) receive events from Tatulli (if used)

## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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