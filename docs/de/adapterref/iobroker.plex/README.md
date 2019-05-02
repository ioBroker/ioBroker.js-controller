---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: l6xyUvUj6ExFKf8tch/eSFY0XGrpGarqS5TzPHIQ/2I=
---
![Logo](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![Anzahl der Installationen](http://iobroker.live/badges/plex-installed.svg)
![stabile Version](http://iobroker.live/badges/plex-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.plex.svg)
![Travis CI](https://travis-ci.org/Zefau/ioBroker.plex.svg?branch=master)
![Downloads](https://img.shields.io/npm/dm/iobroker.plex.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/Zefau/ioBroker.plex.svg)
![NPM](https://nodei.co/npm/iobroker.plex.png?downloads=true)

# IoBroker.plex Integration des Plex Media Servers in ioBroker (mit oder ohne Plex Pass). Außerdem Tautulli-Integration.
**Inhaltsverzeichnis**

1. [Setup-Anweisungen] (# 1-Setup-Anweisungen)
   1. [Grundeinrichtung] (# 11-Grundeinrichtung)
   2. [Erweiterte Einstellungen] (# 12-Advanced-Setup-Plex-Pass-or-Tautulli)
2. [Channels & States] (# 2-Kanäle - Bundesstaaten)
   1. [mit Basic Setup] (# 21-mit-Basis-Setup)
   2. [mit erweiterten Einstellungen] (Nr. 22 mit erweiterten Einstellungen)
3. [Changelog] (# changelog)
4. [Lizenz] (# Lizenz)

## 1. Anweisungen zum Einrichten
### 1.1. Grundeinstellung
Für die Grundeinrichtung müssen Sie lediglich die IP-Adresse (und den Port) Ihrer Plex-Installation angeben. Sobald dies erfolgt ist, ruft ioBroker.plex alle grundlegenden Daten (einschließlich Server, Bibliotheken) ab. Die vollständige Liste der Basisdaten finden Sie in [Kanäle & Staaten](#21-with-basis-setup).

1.2. Erweitertes Setup (Plex Pass oder Tautulli)
#### 1.2.1. Plex Pass
Wenn Sie ein Plex Pass-Benutzer sind, können Sie in den Plex-Einstellungen unter [einen Webhook einrichten](https://support.plex.tv/articles/115002267687-webhooks/#toc-0) das aktuelle Ereignis / die aktuelle Aktion von Ihrem Plex Media Server abrufen (Wiedergabe, Pause, Fortsetzen, Beenden, Anzeigen und Bewerten).

Navigieren Sie zu Ihrem Plex Media Server und gehen Sie zu ```Settings``` und ```Webhook```. Erstellen Sie einen neuen Webhook, indem Sie auf ```Add Webhook``` klicken, und geben Sie Ihre IP-Adresse des ioBroker mit dem benutzerdefinierten Port ein, der in den Einstellungen von ioBroker.plex angegeben ist, und folgt dem Pfad nach ```/plex```, z. ```http://192.168.178.29:41891/plex```:

![Plex Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

#### 1.2.2.Tautulli
[Tautulli ist eine Drittanbieteranwendung] (https://tautulli.com/#about), die Sie neben Ihrem Plex Media Server ausführen können, um die Aktivitäten zu überwachen und verschiedene Statistiken zu verfolgen. Diese Statistiken enthalten vor allem das, was beobachtet wurde, wer es gesehen hat, wann und wo es gesehen wurde und wie es beobachtet wurde. Alle Statistiken werden in einer übersichtlichen und sauberen Benutzeroberfläche mit vielen Tabellen und Diagrammen dargestellt, sodass Sie Ihren Server mit allen anderen prahlen können. Schauen Sie sich [Tautulli Preview] (https://tautulli.com/#preview) an und installieren Sie es auf Ihrem bevorzugten System](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation) bei Interesse.

Dieser Adapter stellt eine Verbindung zu [Tautulli-API](https://github.com/Tautulli/Tautulli/blob/master/API.md) her und empfängt auch Webhook-Ereignisse von Tautulli.

##### 1.2.2.1. API
Öffnen Sie nach der Installation von Tautulli die Seite _Settings_ im Tautulli-Dashboard und navigieren Sie zu _Web Interface_. Blättern Sie nach unten zum Abschnitt _API_ und stellen Sie sicher, dass ```Enable API``` markiert ist. Kopieren Sie den ```API key``` und geben Sie ihn in den ioBroker.plex-Einstellungen ein. Fügen Sie außerdem die Tautulli-IP-Adresse und den Port hinzu, um die API-Kommunikation zu ermöglichen.

##### 1.2.2.2. Webhook
###### Überblick
Um ein Webook mit Tautulli einzurichten, befolgen Sie die folgenden Anweisungen und stellen Sie sicher, dass Sie alle 4 Schritte ausgeführt haben:

1. Fügen Sie den Benachrichtigungsagenten hinzu
2. Konfigurieren Sie Webhook im Notification Agent
3. Konfiguration wird im Benachrichtigungsagenten ausgelöst
4. Konfigurieren Sie die Daten im Benachrichtigungsagenten

###### Beschreibung
Nach der Installation öffnen Sie die Einstellungsseite im Tautulli-Dashboard und navigieren Sie zu den Benachrichtigungsagenten (siehe unten):

![Tautulli-Einstellungen](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1. Klicken Sie auf _Fügen Sie einen neuen Benachrichtigungsagenten_ und _Webhook_ hinzu.
2. Geben Sie Ihre ioBroker-IP-Adresse mit dem benutzerdefinierten Port ein, der in den ioBroker.plex-Einstellungen angegeben ist und hinter dem Pfad `` / tautulli`` `` http://192.168.178.29: 41891 / tautulli```

![Tautulli Webhook](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png) Wählen Sie für die _Webhook-Methode_ außerdem ```POST``` und geben Sie eine beliebige Beschreibung in _Description_ ein.

3. Gehen Sie als Nächstes auf die Registerkarte _Triggers_, und wählen Sie die gewünschten (oder einfach alle) Optionen aus
4. Füllen Sie schließlich __most important__ die entsprechende Datennutzlast auf der Registerkarte _Data_ entsprechend der [Benachrichtigungskonfiguration hier] (README-tautulli.md # notification-configuration) aus. Kopieren Sie den gesamten Inhalt in die ersten vier Benachrichtigungsagenten (`` `Playback Start``` ',` `Playback Stop```,` `` Playback Pause``` und `` Playback Resume```'), wie unten gezeigt für `` `Playback Start```:

   ![Tautulli-Benachrichtigung](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

## 2. Kanäle & Staaten
Wenn sowohl das grundlegende als auch das erweiterte Setup konfiguriert sind, werden die folgenden Kanäle angezeigt (Bibliotheken, Server und Benutzer sind nur Beispiele). Siehe weiter unten für [vollständige Liste der Kanäle und Bundesstaaten](#21-with-basis-setup).

![Channels & States Exeample](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 2.1. Mit Basiseinrichtung
Nach erfolgreicher Grundeinstellung werden folgende Kanäle und Zustände erstellt:

| Kanal / Ordner | Zustand | Beschreibung |
| ------- | ----- | ----------- |
| __Libraries__ | - | Plex-Bibliotheken |
| __servers__ | - | Plex-Server |
| __settings__ | - | Plex-Einstellungen |

2.2. Mit Advanced Setup
Nach erfolgreicher fortgeschrittener Einrichtung werden die folgenden Kanäle und Zustände _additionally_ erstellt:

| Kanal / Ordner | Zustand | Beschreibung | Bemerkung |
| ------- | ----- | ----------- | ------ |
| __ \ _ spielen__ | - | Plex Media wird abgespielt | mit Plex Pass oder Tautulli |
| __statistics__ | - | Plex Watch-Statistiken | nur bei Tautulli |
| statistics.libraries | - | Plex Watch-Statistiken | nur bei Tautulli |
| statistics.libraries ._ \ <Bibliotheksname \> _ | - | Bibliotheksüberwachungsstatistik _ \ <Bibliotheksname \> _ | nur bei Tautulli |
| statistics.users | - | Statistik der Benutzerüberwachung | nur bei Tautulli |
| statistics.users ._ \ <Benutzername \> _ | _ (gleiche Zustände wie in statistics.libraries) _ | Benutzerüberwachungsstatistik _ \ <Benutzername \> _ | nur bei Tautulli |
| __benutzer__ | - | Plex Benutzer | nur bei Tautulli |
| Benutzer ._ \ <Benutzername \> _ | - | Plex-Benutzer _ \ <Benutzername \> _ | nur bei Tautulli |

## Changelog

### 1.0.0 (2019-xx-xx) [MILESTONES / PLANNED FEATURES FOR v1.0.0 RELEASE]
- add Plex Pass Authentication by PIN (and removing current authentication with user / password)
- add playback control for players
- add support for all Tautulli triggers
- add state description for object tree ```_playing```
- add support / discovery in [iobroker.discovery](https://github.com/ioBroker/ioBroker.discovery)

### 0.2.0 (2019-05-xx) [UPCOMING RELEASE]
- fixed @iobroker/adapter-core dependency

### 0.1.0 (2019-04-26) [CURRENT RELEASE]
- get initial data from Plex API
- receive events from Plex Webhook (Plex Pass only)
- receive events from Tatulli (if used)

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