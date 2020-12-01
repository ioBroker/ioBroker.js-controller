---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: YH5cKUNTTU8K0wtF+CA6cM8T+v+DJa8Rhu+Xc6Pid3o=
---
![Logo](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.svg)

![NPM-Version](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/frontier_silicon-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/halloamt/iobroker.frontier_silicon.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/halloamt/ioBroker.frontier_silicon/badge.svg)
![NPM](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)
![Build-Status](https://travis-ci.org/halloamt/ioBroker.frontier_silicon.svg?branch=master)

# IoBroker.frontier_silicon
## Frontier_silicon Adapter für ioBroker
Bietet Unterstützung für Mediaplayer, die mit einem Frontier Silicon-Chipsatz mit FSAPI ausgestattet sind.

## Eigenschaften
PRs und konstruktive Kritik sind immer willkommen.

### Implementierte Funktionen
- Stromschalter
- Modusauswahl
- Voreinstellung
- Benachrichtigungen für mehrere Staaten
- Lautstärkeregelung
- Benachrichtigungen

### Geplante Funktionen
- Automatische Erkennung
- Mehr Staaten
- Übersetzungen
- Mehr Ausnahmebehandlung
- Saubererer Code
- Mehrraumfunktionen

### Nicht geplante Funktionen
- Ändern der Systeminformationen

### Bekannte Fehler
- Der Media Player muss für die voreingestellte Erkennung eingeschaltet sein
- Keine Benachrichtigungen nach einiger Zeit

## Dokumentation
Mit diesem Adapter können Sie Internetradios und Mediaplayer basierend auf Frontier Silicon-Chipsätzen steuern. Viele Geräte, die über [Undok] (https://www.frontiersmart.com/undok) sollte funktionieren. Getestete Geräte stammen von [Revo] (https://revo.co.uk/de/products/), [Sangean] (https://www.sangean.eu/products/all_product.asp) und [SilverCrest](https://www.silvercrest-multiroom.de/produkte/produktuebersicht/) gesteuert werden können, sollten auch andere funktionieren.

Nach der Installation müssen die IP-Adresse und die PIN des Geräts im Konfigurationsdialog eingegeben werden. Wenn das Radio nach dem Einschalten über Undok oder diesen Adapter kein DAB wiedergibt, versuchen Sie es mit aktiviertem "DAB startet ohne Ton".

Wenn der Adapter zum ersten Mal gestartet wird, sammelt er Informationen über das Gerät. Dafür muss es alle Modi durchschalten. Während der Überprüfung der Einstellungen wird das Gerät einige Sekunden lang stummgeschaltet, um störende Geräusche zu vermeiden.

Während der Adapter die Einstellungen des Geräts liest, werden Objekte und Zustände erstellt. Zustände können schreibgeschützt (`ro`) oder schreibgeschützt (`rw`) sein *ok, schreibgeschützt für Schaltflächen ist ebenfalls möglich*

- Audio

  Grundlegende Audioeinstellungen. Es sind noch keine Equalizer-Steuerelemente implementiert.

  - maxVolume (`number, ro`)

    Die maximal wählbare Lautstärke

  - stumm (`boolean, rw`)

    `true` Wenn das Gerät stummgeschaltet ist, `false` andernfalls

  - Lautstärke (`number, rw`)
  - Steuerung
    - volumeDown und volumeUp

In- / oder verringert die Lautstärke um 1

- Gerät

  - friendName (`text, rw`)
  - Macht (`boolean, rw`)
  - radioId (`test, ro`)

    Ich vermute, dass dies der MAC des Geräts ist

  - Version (`text, ro`)

    Softwareversion

  - webfsapi (`text, ro`)

    Die Adresse der API

- die Info

  - Verbindung (`boolean, ro`)

    Verbindungsanzeige für den Adapter

- Medien

  - state (`number, rw`)

    Gültige Werte sind:

    - 0: Pause
    - 1: Spielen

  - Steuerung

    - Nächster
    - Beifall
    - abspielen
    - Bisherige

  Nehmen Sie die folgenden Namen nicht zu ernst. Das Radio verwendet sie in verschiedenen Modi unterschiedlich.

  - Album (`text, ro`)
  - Künstler (`text, ro`)
  - Grafik (`text, ro`)

    Verwenden Sie diese URL, um ein Albumcover oder das Logo eines Senders zu erhalten.

  - name (`text, ro`)
  - Text (`text, ro`)
  - Titel (`text, ro`)

- Modi

  - readPresets

    Liest alle Voreinstellungen erneut

  - selectPreset (`number, rw`)

    Dient zum Abrufen oder Auswählen einer Voreinstellung. Seien Sie gewarnt, dass der Adapter vermutet, dass dieser Wert nicht aus der API gelesen werden kann.

  - ausgewählt (`number, rw`)

    Zeigt den ausgewählten Modus an oder wählt ihn aus. Kann auch über `modes.{number}.switchTo` ausgewählt werden

  - `{number}`

    - id (`text, ro`)

      Der Name dieses Modus

    - Schlüssel (`Nummer, ro`)

      Der Index dieses Modus. Entspricht `mode.{number}` aus dem Objektbaum und kann in `modes.selected` geschrieben werden.

    - wählbar (`boolean, ro`)

      `true` wenn dieser Modus manuell ausgewählt werden kann.

    - streambar (`boolean, ro`)

      Nur auf Geräten mit mehreren Räumen verfügbar. `true` wenn dieser Modus als Quelle für mehrere Mehrraumgeräte verwendet werden kann.

    - wechseln zu

      Wählt diesen Modus aus.

    - Voreinstellungen

      - verfügbar (`boolean, ro`)

        Gibt an, ob Voreinstellungen für diesen Modus verfügbar sind

      - `{number}`

        Der Index dieser Voreinstellung. Gleich `mode.*.presets.{number}.key`.

        - Schlüssel

          Der Index dieser Voreinstellung. Entspricht `mode.*.presets.{number}` aus dem Objektbaum und kann in `modes.selectPreset` geschrieben werden.

        - name (`text, ro`)

          Der Name dieses Presets

        - wechseln zu

          Wählt diese Voreinstellung und den entsprechenden Modus aus.

Bitte beachten Sie, dass Sie manchmal zwischen "Drücken einer Taste" oder "Einstellen eines Werts" wählen können. Verwenden Sie, was für Sie bequemer ist.

## Entwicklerhandbuch
Dieser Abschnitt richtet sich an Entwickler. Es kann später gelöscht werden

### Beginnen
Sie sind fast fertig, nur noch wenige Schritte:

1. Erstellen Sie ein neues Repository auf GitHub mit dem Namen "ioBroker.frontier_silicon"

1. Schieben Sie alle Dateien in das GitHub-Repo. Der Ersteller hat das lokale Repository bereits für Sie eingerichtet:

	```bash
	git push origin master
	```

1. Fügen Sie unter https://github.com/halloamt/ioBroker.frontier_silicon/settings/secrets ein neues Geheimnis hinzu. Es muss den Namen "AUTO_MERGE_TOKEN" haben und ein persönliches Zugriffstoken mit Push-Zugriff auf das Repository enthalten, z. deine. Sie können unter https://github.com/settings/tokens ein neues Token erstellen.

1. Gehen Sie zu [main.js] (main.js) und starten Sie die Programmierung!

### Empfohlene Vorgehensweise
Wir haben einige [empfohlene Vorgehensweise](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) bezüglich der Entwicklung und Codierung von ioBroker im Allgemeinen gesammelt. Wenn Sie neu bei ioBroker oder Node.js sind, sollten Sie sie überprüfen. Wenn Sie bereits Erfahrung haben, sollten Sie sie sich auch ansehen - vielleicht lernen Sie etwas Neues :)

### Skripte in `package.json`
Für Ihre Bequemlichkeit sind mehrere npm-Skripte vordefiniert. Sie können sie mit `npm run <scriptname>` ausführen

| Skriptname | Beschreibung |
| `test:js` | Führt die Tests aus, die Sie in den Dateien `*.test.js` definiert haben. |
| `test:package` | Stellt sicher, dass Ihre `package.json` und `io-package.json` gültig sind. |
| `test` | Führt einen minimalen Testlauf für Paketdateien und Ihre Tests durch. |
| `lint` | Führt `ESLint` aus, um Ihren Code auf Formatierungsfehler und mögliche Fehler zu überprüfen. |
| `fussel` | Führt "ESLint" aus, um Ihren Code auf Formatierungsfehler und mögliche Fehler zu überprüfen. |

### Tests schreiben
Wenn es richtig gemacht wird, ist das Testen von Code von unschätzbarem Wert, da Sie so sicher sein können, Ihren Code zu ändern, während Sie genau wissen, ob und wann etwas kaputt geht. Eine gute Lektüre zum Thema testgetriebene Entwicklung ist https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92.
Das Schreiben von Tests vor dem Code mag zwar zunächst seltsam erscheinen, hat aber sehr klare Vorteile.

Die Vorlage bietet Ihnen grundlegende Tests für den Adapterstart und die Paketdateien.
Es wird empfohlen, dass Sie dem Mix Ihre eigenen Tests hinzufügen.

### Veröffentlichen des Adapters
Da Sie GitHub-Aktionen als CI-Dienst ausgewählt haben, können Sie automatische Releases auf npm aktivieren, wenn Sie ein neues Git-Tag verschieben, das dem Formular `v<major>.<minor>.<patch>` entspricht. Die notwendigen Schritte sind in `.github/workflows/test-and-release.yml` beschrieben.

Informationen zur Freigabe Ihres Adapters in ioBroker finden Sie in der Dokumentation zu [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Testen Sie den Adapter manuell bei einer lokalen ioBroker-Installation
Um den Adapter lokal ohne Veröffentlichung zu installieren, werden die folgenden Schritte empfohlen:

1. Erstellen Sie einen Tarball aus Ihrem Entwicklerverzeichnis:

	```bash
	npm pack
	```

1. Laden Sie die resultierende Datei auf Ihren ioBroker-Host hoch
1. Installieren Sie es lokal (Die Pfade sind unter Windows unterschiedlich):

	```bash
	cd /opt/iobroker
	npm i /path/to/tarball.tgz
	```

Für spätere Updates ist das oben beschriebene Verfahren nicht erforderlich. Gehen Sie einfach wie folgt vor:

1. Überschreiben Sie die geänderten Dateien im Adapterverzeichnis (`/ opt / iobroker / node_modules / iobroker.frontier_silicon`).
1. Führen Sie "iobroker upload frontier_silicon" auf dem ioBroker-Host aus

</ Details>

## Changelog
### 0.0.10 (2020-11-29)
* Übersetzungen

### 0.0.9
* (halloamt) Selected preset can be read now. The adapter guesses a little but this seems to work.
* (halloamt) Nicer readme
* (halloamt) (Hopefully) more robust session handling.
* (halloamt) Long polling should work more reliably
* (halloamt) Sleep timers are cleared on `onUnload`

### 0.0.7 und 0.0.8
* (halloamt) Formal but neccessary stuff for ioBroker

### 0.0.6
* (halloamt) Nothing really, small stuff for npm

### 0.0.5
* (halloamt) Media state controls
* (halloamt) Bugfixes

### 0.0.4
* (halloamt) Media and volume control buttons
* (halloamt) Bugfixes

### 0.0.3
* (halloamt) Get notifications from the radio
* (halloamt) Change volume / mute

### 0.0.1
* (halloamt) initial release
* (halloamt) Change mode
* (halloamt) Select Preset

<details>
<summary>Developer Manual</summary>

## License
MIT License

Copyright (c) 2020 halloamt <iobroker@halloserv.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.