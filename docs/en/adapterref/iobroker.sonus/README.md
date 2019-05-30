![Logo](admin/sonus.png)
# ioBroker.sonus

[![NPM version](http://img.shields.io/npm/v/iobroker.sonus.svg)](https://www.npmjs.com/package/iobroker.sonus)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sonus.svg)](https://www.npmjs.com/package/iobroker.sonus)
[![Dependency Status](https://img.shields.io/david/GermanBluefox/iobroker.sonus.svg)](https://david-dm.org/GermanBluefox/iobroker.sonus)
[![Known Vulnerabilities](https://snyk.io/test/github/GermanBluefox/ioBroker.sonus/badge.svg)](https://snyk.io/test/github/GermanBluefox/ioBroker.sonus)

[![NPM](https://nodei.co/npm/iobroker.sonus.png?downloads=true)](https://nodei.co/npm/iobroker.sonus/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/GermanBluefox/ioBroker.sonus/master.svg)](https://travis-ci.org/GermanBluefox/ioBroker.sonus)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/GermanBluefox/ioBroker.sonus?branch=master&svg=true)](https://ci.appveyor.com/project/GermanBluefox/ioBroker-sonus/)

## sonus adapter for ioBroker

With this adapter you can control ioBroker with voice in many different languages.

It uses open source package snowboy to detect the hotword and google speech service to convert the recorded voice to text.
Only 5 seconds after the hot word will be recorded.

## Installation on linux
To compile the snowboy (before the installation of this adapter) you need some linux packages, wich can be installed as follow:

```
sudo apt-get install libmagic-dev 
sudo apt-get install libatlas-base-dev 
sudo apt-get install build-essential 
sudo apt-get install sox libsox-fmt-all
```

### Check microphone
For good recognition quality you need a good microphone.
I tested it with [UMA-8 USB mic array](https://www.minidsp.com/products/usb-audio-interface/uma-8-microphone-array).

List all record devices:

``` arecord -l```

If you have extra micro, you must set the default microphone:

```
**** List of CAPTURE Hardware Devices ****
card 1: SpkUAC20 [miniDSP VocalFusion Spk (UAC2.0], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

Edit `/usr/share/alsa/alsa.conf` and replace `defaults.pcm.card 0` with `defaults.pcm.card 1`, because in example there is a microphone on card 1.

You can test the microphone with `rec test.wav`.

### Google credentials
For text recognition after the hot word was detected this adapter uses google speech API. To enable it you must get your own credentials and paste it into configuration as JSON.

The instruction can be found here: [https://www.npmjs.com/package/@google-cloud/speech#using-the-client-library](https://www.npmjs.com/package/@google-cloud/speech#using-the-client-library) or [here](https://github.com/googleapis/nodejs-speech#using-the-client-library)

Google JSON file looks like:
```
{
  "type": "service_account",
  "project_id": "ыаыаыаыва",
  "private_key_id": "ун457567565",
  "private_key": "-----BEGIN PRIVATE KEY-----\шукгншугкнеушеуке\n-----END PRIVATE KEY-----\n",
  "client_email": "рапрарапрапр.iam.gserviceaccount.com",
  "client_id": "апрапрарапрапр",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/аапрарарапрапра.iam.gserviceaccount.com"
}
```

And just the whole copied text insert into iobroker configuration. 


### Own hot word
Default hotword is `snowboy` or `sonus`, but you can create your own "hot word" model here [https://snowboy.kitt.ai/hotword/](https://snowboy.kitt.ai/hotword/) and upload it to adapter.

## How to parse the text
 You have generally 2 possibilities to parse the text and trigger a command:
 - text2command
 - javascript
 
### text2command
You can set trigger words in text2command, for that you must select the text2command instance in the configuration.

### javascript
Write a script that will parse the text appeared in sonus.X.data.detected, where X is instance of sonus adapter.

Script should be like this one:

```
on({id: 'sonus.0.data.detected', change: 'any'), obj => {
    console.log('Detected words: ' + obj.state.val);
    let command = '';
    if (obj.state.val.match(/on|ein/)) {
        command = true;
    } else if (obj.state.val.match(/off|aus/)) {
        command = false;
    }
    
    if (command === '') {
        console.log('Cannot detect command');
    } else {
        if (obj.state.val.match(/light|backlight/) && obj.state.val.match(/living/)) {
            setState('hm-rpc.0.Q92837293.1.STATE'/* Living room light */, command);
        } else {
            console.log('Cannot detect room or function');
        }
    }  
});
```  

## Changelog


### 0.1.1 (2019-05-24)
* (bluefox) added sensitivity parameter

### 0.1.0 (2019-05-20)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019 bluefox

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
