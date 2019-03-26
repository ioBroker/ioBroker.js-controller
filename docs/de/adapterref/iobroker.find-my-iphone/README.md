---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.find-my-iphone/README.md
title: kein Titel
hash: daxyieolHhbAq9VrluwQm72qUxweTgb7gdFxgwRZXyk=
---
![Logo](../../../en/adapterref/iobroker.find-my-iphone/admin/find-my-iphone.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.find-my-iphone.svg)
![Tests](http://img.shields.io/travis/soef/ioBroker.find-my-iphone/master.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Build-Status](https://ci.appveyor.com/api/projects/status/9n5s1wgam59b4fv9?svg=true)

### IoBroker.find-my-iphone
#### Beschreibung
ioBroker-Adapter zum Auffinden von Apple-Geräten

#### Info
Der Adapter versucht, seinen eigenen Speicherort aus dem Adapter ioBroker.javascript zu lesen. Ist sie nicht verfügbar, wird der Ort der externen IP ermittelt. Andernfalls werden 0,0 + 0,0 genommen. Die Position wird verwendet, um die Entfernung zum Gerät zu berechnen.

#### Bestätigung in zwei Schritten (2FA-Authentisierung)
Wenn Sie die "neue" Zwei-Schritt-Überprüfung / -Authentifizierung verwenden, gehen Sie folgendermaßen vor:

- Schritt 1: Verbinden Sie den Adapter mit Ihrem Benutzernamen und Passwort.
- Schritt 2: Bestätigen Sie Ihre Registrierung auf einem Ihrer Geräte
- Schritt 3: Ändern Sie das Passwort im Adapter, indem Sie einfach den 6-stelligen Code hinzufügen

<br><br> Danke an Thorsten Voß für diesen [Spitze](https://github.com/soef/ioBroker.find-my-iphone/issues/3#issuecomment-289200613).

#### Zustände
- **Aktualisierung**: <br>

root: Alle Geräte aktualisieren.
unter einem Gerät: Erzwingen, dass das Gerät neu positioniert und aktualisiert wird

- **Benachrichtigung** <br>

Geben Sie einen Ton auf dem Gerät wieder. <br> Der Text des Alarmstatus wird auf dem Gerät angezeigt. <br> Parmeter: [Text] <br> Text ist optional. Wenn angegeben, wird es auf dem Gerät angezeigt

- **hat verloren**: <br>

Schalten Sie das Gerät in den **Lost Mode** <br> *Parameter: usertext [; anzurufende Telefonnummer [; Passcode]]* <br> Wenn der Passcode-Parameter angegeben ist, wird der Passcode des Geräts festgelegt, sofern er noch nicht festgelegt wurde. <br> Hinweis: Nach dem Entsperren des Geräts kann es wie gewohnt verwendet werden. Wenn kein Passcode angegeben wurde und das Gerät keinen Passcode hatte, reicht ein Wischvorgang aus, um ihn zu verwenden. <br> Tipp: Kann auch verwendet werden, um zu verhindern, dass Kinder mit dem Gerät spielen

- **lostMode** <br>

  boolean Wenn Sie sich im verlorenen Modus befinden, können Sie diesen Wert auf false setzen, um den verlorenen Modus zu stoppen.

- **Standort**: <br>

  Adresse der Geräteposition

- **map-url** <br>

  Google ordnet die URL mit der Position des Geräts zu

- **positionType** <br>

  WiFi | GPS

- **Selbsterklärend**: <br>

  batteryLevel, Längengrad, Breitengrad, Zeit, ZeitStatus

#### Installation
Führen Sie den folgenden Befehl im iobroker-Stammverzeichnis aus (z. B. in / opt / iobroker).

```
npm install iobroker.find-my-iphone
```

<!--

## License
The MIT License (MIT)

Copyright (c) 2016-2017 soef <soef@gmx.net>

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
-->