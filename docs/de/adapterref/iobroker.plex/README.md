---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: jXJT6rWqMtSZBhI5P93fF0BtQxWaPG/3qBnjz5B9ryA=
---
![Logo](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Anzahl der Installationen](http://iobroker.live/badges/plex-installed.svg)
![Stabile Version](http://iobroker.live/badges/plex-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.plex.svg)
![Commits seit der letzten Veröffentlichung](https://img.shields.io/github/commits-since/Zefau/ioBroker.plex/latest.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.plex.svg)
![NPM](https://nodei.co/npm/iobroker.plex.png?downloads=true)

# IoBroker.plex Integration des Plex Media Servers in ioBroker (mit oder ohne Plex Pass). Darüber hinaus Tautulli Integration.
[![Travis CI] (https://travis-ci.com/Zefau/ioBroker.plex.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.plex)

**Inhaltsverzeichnis**

1. [Funktionen] (# 1-Funktionen)
2. [Setup-Anweisungen] (# 2-Setup-Anweisungen)
   1. [Grundeinstellung] (# 21-Grundeinstellung)
   2. [Advanced Setup] (# 22-Advanced-Setup-Plex-Pass-or-Tautulli)
3. [Kanäle & Zustände] (# 3-Kanäle - Zustände)
   1. [mit Grundeinstellung] (# 31-mit-Basis-Setup)
   2. [mit erweitertem Setup] (# 32 mit erweitertem Setup)
4. [Changelog] (# changelog)
5. [Lizenz] (# Lizenz)

## 1. Funktionen
- Erhalten Sie detaillierte Medieninformationen zum aktuell wiedergegebenen Medienelement (z. B. Videobitrate, Codec, Untertitelinformationen, Audio; siehe [Erweiterte Einrichtung] (https://github.com/Zefau/ioBroker.plex/blob/master/README-) state.md # with-advanced-setup) für eine vollständige Liste)
- Empfangen Sie "Ereignisse" von Plex (über [Plex Webhook] (https://support.plex.tv/articles/115002267687-webhooks/#toc-0) und [Plex Notifications] (https://support.plex.tv) / articles / push-notifications / # toc-0) mit Plex Pass oder über Tautulli, [__see setup! __] (# 22-advanced-setup-plex-pass-or-tautulli))
- Wiedergabesteuerung für Spieler
- `Server` abrufen
- `Bibliotheken` abrufen
- Rufen Sie alle Elemente in einer Bibliothek ab
- Benutzer abrufen (nur mit Tautulli)
- Statistiken abrufen (nur mit Tautulli)
- Abrufen von Wiedergabelisten
- `Einstellungen` abrufen
- Webinterface, das die letzten Ereignisse von Plex anzeigt:

  ![Plex Webinterface](../../../en/adapterref/iobroker.plex/img/screenshot_adapter-interface.png)

## 2. Anweisungen zum Einrichten
### 2.1. Grundeinstellung
Für die Grundeinstellung müssen Sie die IP-Adresse (und den Port) Ihrer Plex-Installation angeben. Darüber hinaus müssen Sie ein dediziertes Token abrufen, damit der Adapter Daten von Plex abrufen kann.

Sobald dies angegeben ist, ruft ioBroker.plex alle Basisdaten (einschließlich Server, Bibliotheken) ab. Die vollständige Liste der Basisdaten finden Sie in [Kanäle & Staaten](#21-with-basis-setup).

### 2.2. Erweitertes Setup (Plex Pass oder Tautulli)
#### 2.2.1. Plex Pass
__Webhook__

Wenn Sie ein Plex Pass-Benutzer sind, können Sie in den Plex-Einstellungen [Richten Sie einen Webhook ein](https://support.plex.tv/articles/115002267687-webhooks/#toc-0) das aktuelle Ereignis / die aktuelle Aktion von Ihrem Plex Media Server abrufen (Abspielen, Anhalten, Fortsetzen, Stoppen, Anzeigen und Bewerten).

Navigieren Sie zu Ihrem Plex Media Server und gehen Sie zu ```Settings``` und ```Webhook```. Erstellen Sie einen neuen Webhook, indem Sie auf ```Add Webhook``` klicken und Ihre ioBroker-IP-Adresse mit dem benutzerdefinierten Port eingeben, der in den Einstellungen von ioBroker.plex angegeben ist, und dem nachfolgenden Pfad ```/plex```, z. ```http://192.168.178.29:41891/plex```:

![Plex Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

__Veranstaltungen__

Informationen zu den Plex-Benachrichtigungen finden Sie in [siehe die offizielle Dokumentation](https://support.plex.tv/articles/push-notifications/#toc-0). Um Benachrichtigungen auf Ihrem Plex Media Server zu aktivieren, gehen Sie zu `Settings`> `Server`> `General` und aktivieren Sie dann die Einstellung `Push Notifications`.

#### 2.2.2.Tautulli
[Tautulli ist eine Drittanbieteranwendung (https://tautulli.com/#about), die Sie zusammen mit Ihrem Plex Media Server ausführen können, um Aktivitäten zu überwachen und verschiedene Statistiken zu verfolgen. Am wichtigsten ist, dass diese Statistiken enthalten, was gesehen wurde, wer es gesehen hat, wann und wo sie es gesehen haben und wie es gesehen wurde. Alle Statistiken werden in einer schönen und übersichtlichen Oberfläche mit vielen Tabellen und Grafiken dargestellt, die es einfach macht, allen anderen mit Ihrem Server zu prahlen. Schauen Sie sich [Tautulli Preview] (https://tautulli.com/#preview) an und [installieren Sie es auf Ihrem bevorzugten System](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation) wenn Sie interessiert sind.

Dieser Adapter stellt eine Verbindung zu den [Tautulli API](https://github.com/Tautulli/Tautulli/blob/master/API.md) her und empfängt auch Webhook-Ereignisse von Tautulli.

##### 2.2.2.1. API
Öffnen Sie nach der Installation von Tautulli die Seite "Einstellungen" im Tautulli-Dashboard und navigieren Sie zu "Webschnittstelle". Scrollen Sie zum Abschnitt _API_ und stellen Sie sicher, dass ```Enable API``` aktiviert ist. Kopieren Sie die ```API key``` und geben Sie sie in die Einstellungen von ioBroker.plex ein. Fügen Sie außerdem die Tautulli-IP-Adresse und den Port hinzu, um die API-Kommunikation zu ermöglichen.

##### 2.2.2.2. Webhook
###### Überblick
Befolgen Sie die nachstehenden Anweisungen, um ein Webook mit Tautulli einzurichten, und stellen Sie sicher, dass Sie alle 4 Schritte ausgeführt haben:

1. Fügen Sie Notification Agent hinzu
2. Konfigurieren Sie Webhook in Notification Agent
3. Konfigurieren Sie Trigger in Notification Agent
4. Konfigurieren Sie die Daten in Notification Agent
5. Konfigurieren Sie die Benachrichtigungsoptionen

###### Beschreibung
Öffnen Sie nach der Installation die Einstellungsseite im Tautulli-Dashboard und navigieren Sie wie unten gezeigt zu Benachrichtigungsagenten:

![Tautulli-Einstellungen](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1. Klicken Sie auf Neuen Benachrichtigungsagenten hinzufügen und auf Webhook.
2. Geben Sie Ihre ioBroker-IP-Adresse mit dem in den ioBroker.plex-Einstellungen angegebenen benutzerdefinierten Port und dem nachfolgenden Pfad `` `/ tautulli``` ein, z. `` `http://192.168.178.29: 41891 / tautulli```:

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png) Wählen Sie außerdem ```POST``` für die _Webhook-Methode_ und geben Sie eine beliebige Beschreibung in _Description_ ein.

3. Gehen Sie als Nächstes zur Registerkarte _Trigger_ und wählen Sie die gewünschten (oder einfach alle) Benachrichtigungsagenten aus. Ein aktivierter Benachrichtigungsagent löst ein Ereignis aus, das dann an ioBroker gesendet wird. __Stellen Sie sicher, dass Sie im nächsten Schritt die erforderlichen Daten für jeden aktivierten Benachrichtigungsagenten bereitstellen!
4. Geben Sie nun, was am wichtigsten ist, die entsprechenden Datennutzdaten auf der Registerkarte _Data_ gemäß der __ [Benachrichtigungskonfiguration hier gefunden] (README-tautulli.md # Benachrichtigungskonfiguration) __ ein.

   Kopieren Sie die Benachrichtigungskonfiguration der relevanten Benachrichtigungsagenten aus dem vorherigen Schritt (z. B. ```Playback Start```, ```Playback Stop```, ```Playback Pause``` und ```Playback Resume```) in jedes der unten für § gezeigten Textfelder §JJJJJ_4§§:

   ![Tautulli-Benachrichtigung](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

5. Aktivieren Sie abschließend die Option "Aufeinanderfolgende Benachrichtigungen zulassen", um das Senden aufeinanderfolgender Benachrichtigungen zu ermöglichen (z. B. sowohl überwachte als auch gestoppte Benachrichtigungen):

   ![Tautulli-Benachrichtigungseinstellungen](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification_settings.png)

## 3. Kanäle & Staaten
Wenn sowohl das grundlegende als auch das erweiterte Setup konfiguriert sind, werden die folgenden Kanäle angezeigt (Bibliotheken, Server und Benutzer sind natürlich nur Beispiele). Siehe weiter unten für [vollständige Liste der Kanäle und Staaten](#21-with-basis-setup).

![Kanäle & Staaten Beispiel](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 3.1. Mit Basis Setup
Nach erfolgreicher Grundeinstellung werden die Kanäle gemäß der folgenden Tabelle erstellt. Für eine Liste aller Staaten, die erstellt werden, bitte [siehe dedizierte Liste der Staaten](README-states.md#with-basis-setup).

| Kanal / Ordner | Beschreibung |
| ------- | ----------- |
| __bibliotheken__ | Plex-Bibliotheken |
| __servers__ | Plex Server |
| __Einstellungen__ | Plex Einstellungen |

### 3.2. Mit erweitertem Setup
Nach erfolgreichem erweiterten Setup werden die folgenden Kanäle zusätzlich erstellt. Für eine Liste aller Staaten, die erstellt werden, bitte [siehe dedizierte Liste der Staaten](README-states.md#with-advanced-setup).

| Kanal / Ordner | Beschreibung | Bemerkung |
| ---------------- | ----------- | ------ |
| __ \ _ spielen__ | Plex Media wird abgespielt | mit Plex Pass oder Tautulli |
| __statistics__ | Plex Watch Statistik | nur mit Tautulli |
| __users__ | Plex-Benutzer | nur mit Tautulli |

## Changelog

### 0.9.0 (2020-05-23)
- (Zefau) added option for webhook Ip address in case Plex is running in a Docker environment (see [#53](https://github.com/Zefau/ioBroker.plex/issues/53))
- (Zefau) updated dependencies

### 0.8.11 (2020-02-26)
- (Zefau) fixed error with state retrieval on startup when no states are given
- (Zefau) updated dependencies

### 0.8.10 (2020-02-16)
- (Zefau) fixed error with state retrieval on startup when no states are given
- (Zfeau) fixed incorrect handling of certificates when using secure connection
- (Zefau) updated dependencies

### 0.8.9 (2019-12-14)
- (Zefau) updated dependencies
- (Zefau) fixed missing spaces in events (and thus Adapter Web View)
- (Zefau) fixed using username instead of email for statistics (see [#17](https://github.com/Zefau/ioBroker.plex/issues/17))

### 0.8.8 (2019-12-05)
- (Zefau) fixed player controls

### 0.8.7 (2019-12-02)
- (Zefau) fixed error with http / https settings

### 0.8.6 (2019-12-02)
- (Zefau) added further states to Tautulli Notification (see [README-tautulli.md](https://github.com/Zefau/ioBroker.plex/blob/master/README-tautulli.md))
- (Zefau) fixed design issue with select-box in the adapter settings
- (Zefau) fixed not showing thumbnails in adapter web view (when not using a secure connection)

### 0.8.5 (2019-12-01)
- (Zefau) fixed missing user / library statistics
- (Zefau) fixed using username instead of email for statistics (see [#17](https://github.com/Zefau/ioBroker.plex/issues/17))

### 0.8.4 (2019-11-07)
- (Zefau) added support for remote player control via cloud / iot adapter
- (Zefau) added thumbnail to notifications as well as web interface of adapter
- (Zefau) fixed icons within the web interface of adapter

### 0.8.3 (2019-11-06)
- (Zefau) fixed player controls (error when triggering `start`, `stop`, etc.)
- (Zefau) added additional states to `event` channel

### 0.8.1 (2019-11-02)
- (Zefau) fixed error `Cannot read property 'forEach' of undefined`

### 0.8.0 (2019-10-28)
- (Zefau) added support for Plex Notifications including customization in adapter settings
- (Zefau) added count of streams (see [#14](https://github.com/Zefau/ioBroker.plex/issues/14))
- (Zefau) reworked cleaning up states when new webhook is received (see [#11](https://github.com/Zefau/ioBroker.plex/issues/11))

### 0.7.0 (2019-10-17)
- (Zefau) reworked duty cycle (clean up of outdated / old states)
- (Zefau) fixed incorrect states (see [#15](https://github.com/Zefau/ioBroker.plex/issues/15))

### 0.6.0 (2019-08-19)
- (Zefau) replaced password with token authentication

### 0.5.0 (2019-08-18)
- (Zefau) added support for Plex Notifications (see [#9](https://github.com/Zefau/ioBroker.plex/issues/9))
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
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 (see [#6](https://github.com/Zefau/ioBroker.plex/pull/6))
- (Zefau) added support / discovery in [iobroker.discovery](https://github.com/ioBroker/ioBroker.discovery) (see [#62](https://github.com/ioBroker/ioBroker.discovery/pull/62))
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

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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