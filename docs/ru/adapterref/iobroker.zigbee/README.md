---
BADGE-Number of Installations: http://iobroker.live/badges/zigbee-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.zigbee.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.zigbee.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.zigbee.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.zigbee.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zigbee/README.md
title: Адаптер ioBroker для устройств Zigbee
hash: veWf6Ic8BYSpHiwxg87GNeC9GPi+9HS7kqOpfNOSH9c=
---
# IoBroker Адаптер для устройств Zigbee
С помощью координатора сети Zigbee на основе Texas Instruments SoC cc253x (и других) создаст собственную сеть, к которой могут присоединиться другие устройства Zigbee. Благодаря прямому взаимодействию с координатором, адаптер Zigbee позволяет управлять устройствами без каких-либо шлюзов / мостов производителей (Xiaomi / Tradfri / Hue). О функционировании сетей Zigbee можно [читать здесь (на английском)](https://github.com/Koenkk/zigbee2mqtt/wiki/ZigBee-network).

## Аппаратное обеспечение
Для реализации используется одно из перечисленных устройств / флешек, которые прошиваются специальной прошивкой ZNP: [CC2530, CC2530, CC2530 + RF.](https://github.com/Koenkk/zigbee2mqtt/wiki/Supported-sniffer-devices#zigbee-coordinator)

![](img/CC2531.png) ![](../../../de/adapterref/iobroker.zigbee/img/sku_429478_2.png) §IIIIIII_2§§ §IIIII_3§§

Требуемый мигалка / программатор и процесс подготовки описаны в [здесь (английский)] (https://github.com/Koenkk/zigbee2mqtt/wiki/Getting-started) или [здесь (русский)](https://github.com/kirovilya/ioBroker.zigbee/wiki/%D0%9F%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B0).

Устройства, подключенные к сети Zigbee, передают свое состояние координатору и уведомляют их о событиях (кнопка, обнаружение движения, изменение температуры). Эта информация отображается в адаптере под соответствующими объектами. Кроме того, можно отправлять некоторые события / статусы обратно на устройство Zigbee (состояние, изменение розеток и источников света, настройки цвета и яркости).

## Настройки и сопряжение
![](https://raw.githubusercontent.com/kirovilya/files/master/config.PNG)

В начале должен быть указан USB-порт, к которому подключен cc253x. Как распознать это [описано здесь (русский)](https://github.com/kirovilya/ioBroker.zigbee/wiki#%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80%D0%B0)

Чтобы подключить устройства, переведите Zigbee Network Coordinator в режим сопряжения, нажав зеленую кнопку на адаптере. Режим сопряжения теперь активен в течение 60 секунд. Для подключения устройств в обычном случае достаточно нажать кнопку на подключаемом устройстве. Но есть и «специальные» устройства. Как их соединить, описано [здесь английский] (https://github.com/Koenkk/zigbee2mqtt/wiki/Pairing-devices) [или русский](https://github.com/kirovilya/ioBroker.zigbee/wiki#%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D0%B5%D0%BC%D1%8B%D0%B5-%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0).

После успешного сопряжения устройство отображается в адаптере. Если устройство (из списка) имеет имя «undefined», попробуйте удалить его и выполнить сопряжение снова. Если это все еще не работает, пожалуйста, напишите проблему.
Устройства Zigbee, которых нет в списке, могут быть сопряжены, но адаптер не может связываться с ними.

## Дополнительная информация
Существует также [проект дружбы](https://github.com/koenkk/zigbee2mqtt) с теми же функциями и той же технологией, который связывается с теми же устройствами через протокол MQTT. Если какие-либо улучшения или новые поддерживаемые устройства включены в проект Zigbee2MQTT, они также могут быть добавлены в этот проект. Если вы заметили различия, пожалуйста, напишите вопрос, мы позаботимся об этом

## Changelog

### 0.10.2 (2019-03-15)
* some fixes
* (allofmex) Visualize mesh newtwork map, "available" state, configuration requests
* (Apollon77) Update test framework
* (sonntam) Tint remote
* (arteck) OSRAM Lightify Switch Mini, rwl021 dimmer
* (asgothian) TRADFRI signal repeater, Innr SP 120, Xiaomi Gas detector

### 0.9.2 (2019-02-25)
No support of node.js 4 any more
* (bluefox) Xiaomi Lock was added
* (nisiode) Some fixes
* (sonntam) Some fixes
* (arteck) Heiman SmokeSensor
* (asgothian, allofmex) Eurotronic support

### 0.9.1 (2019-01-29)
* Groups and new Developer tab were added

### 0.9.0 (2019-01-28)
* (arteck) Many new devices
* (allofmex) Developer tab
* (modmax) Reading attributes
* (kirovilya) Groups support

### 0.8.0 (2018-11-29)

**BREAKING CHANGES**:
* (kirovilya) Rename state "isopen" to "opened".
* (kirovilya) Change brightness interval from 0..254 to 0..100 

Other changes:
* (kirovilya) Fix for admin2
* (kirovilya) + Gledopto
* (kirovilya) + Mijia vibration sensor
* (kirovilya) Common state "link_quality"
* (arteck) + Philips LLC010, LLC011, LLC012, LTW001, LTW004, LTW010, LTW012, LTC001, LCT024
* (arteck) + Osram PAR 16 50 RGBW - LIGHTIFY
* (arteck) + Innr RS 128 T, RS 185 C
* (arteck) + DE FLS-PP3
* (arteck) + Ilux LEColorLight
* (kirovilya) Light state "transition_time" for brightness, color, colortemp


### 0.7.7 (2018-10-21)
* (arteck) Fix 'is open' state

### 0.7.6 (2018-10-19)
* (kirovilya, arteck) New models and devices

### 0.7.5 (2018-10-02)
* (kirovilya) Support zigbee-shepherd-converters 4.*

### 0.7.4 (2018-10-01)
* (kirovilya) Allow enter port without selector

### 0.7.3 (2018-09-27)
* (arteck) Bugfix and new devices: Classic A60 W clear - LIGHTIFY and Surface Light TW
* (kirovilya) Occupancy timeout state for motion sensor
* (kirovilya) Serialport selector

### 0.7.1 (2018-08-14)
* (kirovilya) Network map feature
* (kirovilya) Allow pairing through router
* (kirovilya) Change battery percent interval to 2700..3200
* (arteck) New devices: Hue LTW010, Osram Flex RGBW
* (kirovilya) Triple and quadruple clicks for WXKG11LM
* (kirovilya) isopen - magnet state, in contrast to contact
* (kirovilya) Option "Disable LED for cc2531"

### 0.6.0 (2018-07-05)
* (kirovilya) More new devices from zigbee-shepherd-converters
* (kirovilya) Some layout fixes in admin
* (kirovilya) Fix battery for smoke sensor

### 0.5.9 (2018-06-27)
* (arteck) New devices: Osram LED PAR16, Osram Smart+ plug, Philips Hue bulb
* (kirovilya) Turn on/off lights when change brightness > 0 and = 0

### 0.5.8 (2018-06-26)
* (kirovilya) Allow backup/restore zigbee-database for js-controller 1.5.0
* (kirovilya) New device - Jiawen bulb
* (kirovilya) Allow remove device with setup key
* (from zigbee-shepherd-converters) Change battery percent interval to 3000-2700

### 0.5.7 (2018-06-19)
* (kirovilya) Update states on adapter start (for restored shepherd.db)
* (kirovilya) Brightness - not percent - range 0..255

### 0.5.6 (2018-06-14)
* (kirovilya) Configuration panID (zigbee network identifier)
* (kirovilya) Moved to ioBroker organization

### 0.5.5 (2018-06-11)
* (kirovilya) Return runing on NodeJS 4.*

### 0.5.4 (2018-06-10)
* (kirovilya) Public version

### 0.5.0 (2018-06-06)
* (kirovilya) All refactored

### 0.0.1 (2018-02-07)
* (kirovilya) First version

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Kirov Ilya <kirovilya@gmail.com>

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