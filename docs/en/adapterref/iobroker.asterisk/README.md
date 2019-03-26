![Logo](admin/asterisk.png)

# ioBroker Asterisk VoIP Adapter


[![Travis CI Build Status](https://travis-ci.org/schmupu/ioBroker.asterisk.svg?branch=master)](https://travis-ci.org/schmupu/ioBroker.asterisk)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.asterisk?branch=master&svg=true)](https://ci.appveyor.com/project/schmupu/ioBroker-asterisk/)
![Number of Installations](http://iobroker.live/badges/asterisk-installed.svg) ![Number of Installations](http://iobroker.live/badges/asterisk-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.asterisk.svg)](https://www.npmjs.com/package/iobroker.asterisk)
[![Downloads](https://img.shields.io/npm/dm/iobroker.asterisk.svg)](https://www.npmjs.com/package/iobroker.asterisk)

[![NPM](https://nodei.co/npm/iobroker.asterisk.png?downloads=true)](https://nodei.co/npm/iobroker.asterisk/)

[German manual / Deutsche Anleitung](README_DE.md) 

The Asterisk adapter converts text messages to audio files and calls then over Asterisk by VoIP any telephone number you want and plays the audio message.

## Install / Configurations

Asterisk has to connect for outgoing calls with your voip provider like Telekom or Vodfone  or with your FritzBox! Please follow one
of these installation guides. 

- Configuration [Asterisk via SIP with the FritzBox](docs/SIP_FRITZBOX.md) (the easiest way)
- Configuration [Asterisk via PJSIP with the FriztBox](docs/PJSIP_FRITZBOX.md) (pjsip is more modern as sip)
- Configuration [Asterisk via PJSIP with Telekom as provider](docs/PJSIP_TELEKOM.md) 
- Configuration [Asterisk via PJSIP with Sipgate as provider](docs/PJSIP_SIPGATE.md) 
- Configuration [ssh/scp ](docs/SSH.md) (ioBroker and asterisk runs on different server)  

## Using Asterisk

### Using Asterisk with objects / states for dialing out

The easiest way to use asterisk is through the ioBroker objects page. There, fill the following values under dialout parameter:
* call: push button to initiate a call
* callerid: telephonenumber which will be shown the callee
* dtmf: the callee pressed numbers on the keypad
* telnr: the number to be dialed
* text: the text that will be played to the callee 

![iobroker_dialout](docs/iobroker_dialout.png)

### Using Asterisk with objects / states for dialing in

If you configured your SIP Provider (for example Fritzbox, Sipgate, ...) and the Asterisk Configuration to allow dialin calls you can set following parameter

* callerid: telephonenumber which called asteriks
* dtmf: callers pressed numbers on the keypad
* text: the text that will be played to the caller  

![iobroker_dialin](docs/iobroker_dialin.png)

### Using Asterisk with javascript or blocky for dialing out

Now you can use the adapter in your javascript or blocky programms.

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

> You can use following parameter in the sendTo dial statement:
> - **language:** language take for text to speech (tts) function. (allowed values: 'DE', 'EN', ... Default is the ioBroker system language)
> - **repeat:** how many times shall the audio message repeated (allowed values 1 to n, default 5)
> - **priority:** if you send parallel many sendTo dial  statements, the messages with a smallest priority will be send first (allowed values 1 to n, default 1)
> - **text:** text message that will be send as audio
> - **timeout:** Timeout in milliseconds waiting for connection to be happen (defaults to 60000 ms)
> - **async:** Allows multiple calls to be generated without waiting for a response (allowed values: false/true, default false)
> - **audiofile:** if you using the text parameter. The converted text to audio will be saved in  audiofile. If the audiofile exist, it will be overwritten. If you do not use the parameter text, the audiofile will be played. 
> - **callerid:** Defines the identifier (your sender telephone number)	. If callerid is missing the transferred telephone number will be anonymous

## Resolving problems

If you have problems with asterisk, you can try to find something in the logfiles under /var/log/asterisk. After you started asterisk you can call asterisk with asterisk -rvvvvvv on the comand shell for debugging. After you started asterisk -rvvvvvv you can initialize a call by iobroker and see what happens.  

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
