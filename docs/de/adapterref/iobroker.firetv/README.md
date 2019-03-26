---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.firetv/README.md
title: kein Titel
hash: /Cz3gDgOPpGgPIThLnFhQpr1VYtUyYP/Jt1QSmkhE58=
---
![Logo](../../../en/adapterref/iobroker.firetv/admin/firetv.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.firetv.svg)
![Tests](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Build-Status](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)

### IoBroker.firetv
<!--
[![NPM-Version] (https://badge.fury.io/js/iobroker.firetv.svg)](https://www.npmjs.com/package/iobroker.firetv)
-->

Mit diesem Adapter können Sie einige Funktionen Ihres Fire TV oder Fire TV Stick steuern.
Z.B.:

- An aus
- Senden Sie wichtige Ereignisse
- Textstrings an Eingabefelder senden
- Apps starten / stoppen
- neu starten
- Kommando-Kommandos ausführen

#### Einige Infos
Dieser Adapter verwendet Funktionen der "Android Debug Bridge", die als "Adb" bezeichnet wird. Adb ist Teil des Android Developer SDK. Da Fire TV ein Android-Betriebssystem hat, kann es von adb gesteuert werden.

#### Bedarf
Um diesen Adapter zu verwenden, müssen Sie mindestens das Adb-Paket des Anroid SDK installieren. Um das vollständige Android SDK nicht zu installieren, sollten Sie das installieren

- *Minimaler ADB und Fastboot*

Suchen Sie bei Google (Minimal ADB und Fastboot) nach dem neuesten Download-Link.

Alternativ können Sie *adbLink* verwenden.

#### Installation
Führen Sie den folgenden Befehl im iobroker-Stammverzeichnis aus (z. B. in / opt / iobroker).

```
npm install iobroker.firetv
```