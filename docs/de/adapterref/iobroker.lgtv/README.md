---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lgtv/README.md
title: ioBroker.lgtv
hash: 9PTarqLZmBfNEPK/Fa5CvxUzVwaHGZYD/EpD21P4SO0=
---
![Logo](../../../en/adapterref/iobroker.lgtv/admin/lgtv.png)

![Anzahl der Installationen](http://iobroker.live/badges/lgtv-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.lgtv.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lgtv.svg)
![NPM](https://nodei.co/npm/iobroker.lgtv.png?downloads=true)
![Travis-CI](https://travis-ci.org/SebastianSchultz/ioBroker.lgtv.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/xx55hgsuff4fas47/branch/master?svg=true)

# IoBroker.lgtv ===================
LG WebOS SmartTV-Adapter für ioBroker

Fernsteuerung eines LG WebOS SmartTV (ab 2013) ab [ioBroker](https://www.iobroker.net).

---

## Verwendungszweck:
Installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.
Geben Sie in der Adapterkonfiguration die IP-Adresse Ihres LG WebOS TV ein.
Bei der ersten Verbindung erhalten Sie auf Ihrem Fernsehbildschirm eine Aufforderung zum Pairing, bei der Sie die Verbindung zulassen sollten.

## Einige Beispiele:
```setState('lgtv.0.states.popup', 'Some text!');```

Daraufhin wird ein Popup mit dem Text "Etwas Text!" Angezeigt. im Fernsehen.
Sie können HTML-Zeilenumbrüche (br) im Text verwenden.

```setState('lgtv.0.states.turnOff', true);```

Fernseher ausschalten.

```setState('lgtv.0.states.mute', true);```

Schalten Sie den Fernseher aus.

```setState('lgtv.0.states.mute', false);```

Stummschalten des Fernsehers

```setState('lgtv.0.states.volumeUp', true);```

Dadurch wird die Lautstärke des Fernsehgeräts erhöht.

```setState('lgtv.0.states.volumeDown', true);```

Verringern der Lautstärke des Fernsehgeräts.

```setState('lgtv.0.states.channelUp', true);```

Erhöhen des aktuellen Fernsehkanals.

```setState('lgtv.0.states.channelDown', true);```

Verringern des aktuellen Fernsehkanals.

```setState('lgtv.0.states.3Dmode', true);```

Aktiviert den 3D-Modus am Fernsehgerät

```setState('lgtv.0.states.3Dmode', false);```

Deaktiviert den 3D-Modus am Fernsehgerät.

```setState('lgtv.0.states.channel', 7);```

Umschalten des Live-Fernsehers auf Kanalnummer 7.

```setState('lgtv.0.states.launch', 'livetv');```

Umschalten in den Live-TV-Modus.

```setState('lgtv.0.states.launch', 'smartshare');```

Öffnen der SmartShare App auf dem Fernsehgerät.

```setState('lgtv.0.states.launch', 'tvuserguide');```

Führt die TV-Benutzerhandbuch-App auf dem Fernsehgerät aus.

```setState('lgtv.0.states.launch', 'netflix');```

Öffnen der Netflix-App auf dem Fernsehgerät.

```setState('lgtv.0.states.launch', 'youtube');```

Öffnet die Youtube-App auf dem Fernseher.

```setState('lgtv.0.states.launch', 'prime');```

Öffnet die Amazon Prime App auf dem Fernseher.

```setState('lgtv.0.states.launch', 'amazon');```

Bei einigen Fernsehgeräten öffnet dieser Befehl die Amazon Prime App.

```setState('lgtv.0.states.openURL', 'http://www.iobroker.net');```

Öffnet den Webbrowser auf dem Fernsehgerät und navigiert zu www.iobroker.net.
Kann auch zum Öffnen von Bildern oder Videos (im Browser) verwendet werden.

```setState('lgtv.0.states.input', 'AV_1');```

Schaltet den iPod auf den AV1 um.

```setState('lgtv.0.states.input', 'SCART_1');```

Schaltet den Iput des Fernsehers auf Scart um.

```setState('lgtv.0.states.input', 'COMP_1');```

Schaltet den Iput des Fernsehers auf Component um.

```setState('lgtv.0.states.input', 'HDMI_1');```

Schaltet den iput des Fernsehgeräts auf HDMI 1 um.

```setState('lgtv.0.states.input', 'HDMI_2');```

Schaltet den iput des Fernsehgeräts auf HDMI 2 um.

```setState('lgtv.0.states.input', 'HDMI_3');```

Schaltet den iput des Fernsehgeräts auf HDMI 3 um.

---

## Zustände
Kanal

hält den aktuellen Kanal

Volumen

hält den aktuellen Lautstärkepegel und kann die Lautstärke ändern

auf

ist wahr, wenn das Fernsehgerät eingeschaltet ist, und falsch, wenn das Fernsehgerät ausgeschaltet ist

---

## Changelog

### 1.0.8 (2019-03-15)
* (SebastianSchultz) general NPM update

### 1.0.7 (2019-01-28)
* (SebastianSchultz) grouping of all states/objects under a device

### 1.0.6 (2019-01-21)
* (SebastianSchultz) added compact mode

### 1.0.5 (2018-04-15)
* (SebastianSchultz) added Travis-CI and AppVeyor tests

### 1.0.4 (2018-04-07)
* (SebastianSchultz) added support for increasing (channelUp) or decreasing (channelDown) the current TV channelDown
* (SebastianSchultz) added the state "volume" which holds the current volume level

### 1.0.3 (2018-01-11)
* (SebastianSchultz) added support for launching Amazon Prime app via "amazon" (used on some TV's instead of "prime")
* (SebastianSchultz) fixed issue that state "on" was not set when in an app on TV

### 1.0.2 (2017-05-23)
* (SebastianSchultz) added support for launching Amazon Prime app

### 1.0.0 (2016-09-26)
* (SebastianSchultz) added channel polling
* (SebastianSchultz) added switching input

### 0.0.4 (2016-09-12)
* (SebastianSchultz) solved saving IP address within adapter configuration

### 0.0.3 (2016-09-05)
* (SebastianSchultz) added volumeUp true|false
* (SebastianSchultz) added volumeDown true|false
* (SebastianSchultz) added 3Dmode true|false
* (SebastianSchultz) added launch livetv|smartshare|tvuserguide|netflix|youtube|<URL>
* (SebastianSchultz) added channel <channelNumber>
* (SebastianSchultz) some code cleaned

### 0.0.2 (2016-09-02)
* (SebastianSchultz) removed reconnect function, not used
* (SebastianSchultz) improved error handling and logging

### 0.0.1 (2016-08-31)
* (SebastianSchultz) initial commit


---

## License

The MIT License (MIT)

Copyright (c) 2019 Sebastian Schultz.

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