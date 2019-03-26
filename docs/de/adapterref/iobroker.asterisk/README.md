---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.asterisk/README.md
title: ioBroker Asterisk VoIP Adapter
hash: H+/GtnFRdWUaR0uoJ4mzoeBUIoXKSQKmphpnfeqpC/0=
---
![Logo](../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.asterisk.svg?branch=master)
![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.asterisk?branch=master&svg=true)
![Anzahl der Installationen](http://iobroker.live/badges/asterisk-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.asterisk.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.asterisk.svg)
![NPM](https://nodei.co/npm/iobroker.asterisk.png?downloads=true)

# IoBroker Asterisk VoIP Adapter
[Deutsche Anleitung](README_DE.md)

Der Asterisk-Adapter wandelt Textnachrichten in Audiodateien um und ruft dann über Asterisk per VoIP eine beliebige Telefonnummer an und spielt die Audionachricht ab.

## Install / Konfigurationen
Asterisk muss sich für ausgehende Gespräche mit Ihrem VoIP-Provider wie Telekom oder Vodfone oder mit Ihrer FritzBox verbinden! Bitte folgen Sie einer dieser Installationsanleitungen.

- Konfiguration [Asterisk über SIP mit der FritzBox](docs/SIP_FRITZBOX.md) (der einfachste Weg)
- Konfiguration [Sternchen über PJSIP mit der FriztBox](docs/PJSIP_FRITZBOX.md) (pjsip ist moderner als sip)
- Konfiguration [Asterisk via PJSIP mit Telekom als Provider](docs/PJSIP_TELEKOM.md)
- Konfiguration [Asterisk via PJSIP mit Sipgate als Provider](docs/PJSIP_SIPGATE.md)
- Konfiguration [ssh / scp](docs/SSH.md) (IoBroker und Sternchen laufen auf verschiedenen Servern)

## Sternchen verwenden
### Verwenden von Asterisk mit Objekten / Zuständen zum Wählen
Die einfachste Möglichkeit, Sternchen zu verwenden, ist die Seite mit den ioBroker-Objekten. Füllen Sie dort die folgenden Werte unter dialout-Parameter:

* anrufen: Taste drücken, um einen Anruf einzuleiten
* callerid: telefonnummer, die dem anrufer angezeigt wird
* dtmf: Der Aufseher drückte Zahlen auf der Tastatur
* telnr: die zu wählende Nummer
* text: der Text, der dem Aufgerufenen vorgespielt wird

![iobroker_dialout](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialout.png)

### Verwenden von Asterisk mit Objekten / Zuständen für die Einwahl
Wenn Sie Ihren SIP-Provider (zum Beispiel Fritzbox, Sipgate, ...) und die Asterisk-Konfiguration so konfiguriert haben, dass Einwahlrufe zugelassen werden, können Sie folgende Parameter einstellen

* callerid: Telefonnummer, die Sternchen genannt hat
* dtmf: Anrufer drückten Nummern auf der Tastatur
* text: der Text, der dem Anrufer abgespielt wird

![iobroker_dialin](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialin.png)

### Verwendung von Asterisk mit Javascript oder Blocky für das Wählen
Jetzt können Sie den Adapter in Ihren Javascript- oder Blocky-Programmen verwenden.

```sh
var number   = "040 666-7766";
var callerid = '040 123 999'; // optional, if not set anonymous call
var msg      = "Hello, this textmessage will be converted to audio";

// call telephone nummber 040 666-7766 and play text message as audio
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, text:  msg},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// call telephone nummber 040 666-7766 and play mp3 audio file
// mp3 file has to exist on asterix server
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, aufiofile: '/tmp/audio.mp3'},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// call telephone nummber 040 666-7766 and play gsm audio file
// gsm file has to exist on asterix server
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, aufiofile: '/tmp/audio.gsm'},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// Show entered DTMF code
on({ id: "asterisk.0.dialin.dtmf"/*DTMF Code*/ },  (obj) => {
    let dtmf = obj.state.val;
    console.log("DTMF: " + dtmf);
});

// Show entered DTMF code
on({ id: "asterisk.0.dialout.dtmf"/*DTMF Code*/ },  (obj) => {
    let dtmf = obj.state.val;
    console.log("DTMF: " + dtmf);
});

```

> In der Anweisung sendTo dial können Sie folgende Parameter verwenden:> - **Sprache:** Sprachannahme für Text to Speech (tts). (Erlaubte Werte: 'DE', 'EN', ... Die Standardsprache ist die ioBroker-Systemsprache.)> - **Wiederholung:** Wie oft soll die Audionachricht wiederholt werden (zulässige Werte 1 bis n, Standardeinstellung 5)> - **Priorität:** Wenn Sie parallel viele Send-To-Dial-Anweisungen senden, werden die Nachrichten mit der niedrigsten Priorität zuerst gesendet (zulässige Werte 1 bis n, Standardeinstellung 1) audio> - **timeout:** Timeout in Millisekunden, bis die Verbindung hergestellt wird (Standardeinstellung 60000 ms)> - **async:** Ermöglicht das Generieren mehrerer Anrufe, ohne auf eine Antwort zu warten (zulässige Werte: false / true , default false)> - **audiofile:** wenn Sie den Textparameter verwenden. Der konvertierte Text in Audio wird in einer Audiodatei gespeichert. Wenn das Audiofile vorhanden ist, wird es überschrieben. Wenn Sie den Parametertext nicht verwenden, wird das Audiofile abgespielt.
> - **callerid:** Definiert die Kennung (Ihre Absendertelefonnummer). Wenn die Anrufer-ID fehlt, ist die übermittelte Telefonnummer anonym

## Probleme lösen
Wenn Sie Probleme mit Sternchen haben, können Sie versuchen, in den Protokolldateien unter / var / log / asterisk etwas zu finden. Nachdem Sie Sternchen gestartet haben, können Sie Sternchen mit Sternchen -rvvvvvv in der Befehls-Shell zum Debuggen aufrufen. Nachdem Sie asterisk -rvvvvvv gestartet haben, können Sie einen Anruf über Iobroker initiieren und sehen, was passiert.

## Changelog

[Changelog](CHANGELOG.md)

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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