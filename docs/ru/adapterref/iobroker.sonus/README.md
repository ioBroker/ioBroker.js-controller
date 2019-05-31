---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonus/README.md
title: ioBroker.sonus
hash: f/UNNn9ThmG+ZNMzYnqolr5P5GUUFagnCxNbFzENobU=
---
![логотип](../../../en/adapterref/iobroker.sonus/admin/sonus.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.sonus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonus.svg)
![Статус зависимости](https://img.shields.io/david/GermanBluefox/iobroker.sonus.svg)
![Известные уязвимости](https://snyk.io/test/github/GermanBluefox/ioBroker.sonus/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sonus.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/GermanBluefox/ioBroker.sonus/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/GermanBluefox/ioBroker.sonus?branch=master&svg=true)

# IoBroker.sonus
## Адаптер Sonus для ioBroker
С помощью этого адаптера вы можете управлять ioBroker с помощью голоса на разных языках.

Он использует пакет Snowboy с открытым исходным кодом для обнаружения горячих слов и речевой сервис Google для преобразования записанного голоса в текст.
Только через 5 секунд после того, как горячее слово будет записано.

## Установка на Linux
Для компиляции Snowboy (перед установкой этого адаптера) вам понадобятся пакеты linux, которые можно установить следующим образом:

```
sudo apt-get install libmagic-dev
sudo apt-get install libatlas-base-dev
sudo apt-get install build-essential
sudo apt-get install sox libsox-fmt-all
```

### Проверьте микрофон
Для хорошего качества распознавания нужен хороший микрофон.
Я проверил это с [UMA-8 USB микрофонный массив](https://www.minidsp.com/products/usb-audio-interface/uma-8-microphone-array).

Список всех записывающих устройств:

``` arecord -l```

Если у вас есть дополнительный микро, вы должны установить микрофон по умолчанию:

```
**** List of CAPTURE Hardware Devices ****
card 1: SpkUAC20 [miniDSP VocalFusion Spk (UAC2.0], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```

Отредактируйте `/usr/share/alsa/alsa.conf` и замените `defaults.pcm.card 0` на `defaults.pcm.card 1`, потому что, например, на плате 1 есть микрофон.

Вы можете проверить микрофон с помощью `rec test.wav`.

### Google учетные данные
Для распознавания текста после того, как горячее слово было обнаружено, этот адаптер использует Google Speech API. Чтобы включить его, вы должны получить свои собственные учетные данные и вставить его в конфигурацию как JSON.

Инструкцию можно найти здесь: [https://www.npmjs.com/package/@google-cloud/speech#using-the-client-library](https://www.npmjs.com/package/@google-cloud/speech#using-the -клиент-библиотека) или [здесь](https://github.com/googleapis/nodejs-speech#using-the-client-library)

Файл Google JSON выглядит так:

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

И просто весь скопированный текст вставьте в конфигурацию iobroker.

### Собственное горячее слово
Горячее слово по умолчанию - `snowboy` или `sonus`, но вы можете создать здесь свою собственную модель «горячего слова» [https://snowboy.kitt.ai/hotword/](https://snowboy.kitt.ai/hotword/) и загрузить ее в адаптер.

## Как разобрать текст
 Обычно у вас есть 2 возможности для разбора текста и запуска команды:

 - text2command
 - JavaScript

### Text2command
Вы можете установить триггерные слова в text2command, для этого вы должны выбрать экземпляр text2command в конфигурации.

### Javascript
Напишите скрипт, который будет анализировать текст, появившийся в sonus.X.data.detected, где X - экземпляр адаптера sonus.

Сценарий должен быть таким:

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