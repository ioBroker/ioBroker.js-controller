---
BADGE-Number of Installations: http://iobroker.live/badges/zigbee-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.zigbee.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.zigbee.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.zigbee.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.zigbee.png?downloads=true
---
# Драйвер ioBroker для работы с Zigbee-устройствами
При помощи координатора Zigbee-сети на базе Texas Instruments SoC cc253x (и другими) создается собственная сеть, в которую подключаются zigbee-устройства. Взаимодействуя напрямую с координатором сети, драйвер позволяет управлять устройствами без дополнительных шлюзов/бриджей от производителей устройств (Xiaomi/TRADFRI/Hue). Про устройство Zigbee-сети можно прочитать [тут (на английском языке)](https://github.com/Koenkk/zigbee2mqtt/wiki/ZigBee-network). 

## Оборудование
Для работы необходимо одно из перечисленных устройств, прошитое специальной ZNP-прошивкой: [cc2531, cc2530, cc2530+RF](https://github.com/Koenkk/zigbee2mqtt/wiki/Supported-sniffer-devices#zigbee-coordinator)

![](img/CC2531.png)
![](img/sku_429478_2.png)
![](img/sku_429601_2.png)
![](img/CC2591.png)
Необходимое для прошивки оборудование и процесс подготовки устройства описан [тут (на английском языке)](https://github.com/Koenkk/zigbee2mqtt/wiki/Getting-started) или [тут (на русском языке)](https://github.com/kirovilya/ioBroker.zigbee/wiki/%D0%9F%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B0) 

Подключенные к Zigbee-сети устройства сообщают координатору своё состояние и информируют о событиях (нажатия кнопки, обнаружение движения, изменение температуры). Эти сведения отражаются в виде объектов-состояний ioBroker. Некоторые состояния имеют обратную связь и могут отправлять команды zigbee-устройству при изменении состояния (переключение состояния розетки и лампы, изменение сцены или яркости лампы).

## Работа с драйвером
Для запуска драйвера необходимо указать имя порта, на котором подключено устройство cc253x.
Как узнать порт написано [тут (на русском языке)](https://github.com/kirovilya/ioBroker.zigbee/wiki#%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80%D0%B0)

Для подключения устройств необходимо перевести координатор Zigbee-сети в режим сопряжения, нажав зеленую кнопку. Начнется обратный отсчет времени (60 сек) пока будет доступна возможность подключения устройств.
Для подключения Zigbee-устройств в большинстве случаев достаточно нажать кнопку сопряжения на самом устройстве. Но существуют особенности для некоторых устройств. Подробнее о сопряжении с устройствами читайте [тут (на английском языке)](https://github.com/Koenkk/zigbee2mqtt/wiki/Pairing-devices) или [тут (на русском языке)](https://github.com/kirovilya/ioBroker.zigbee/wiki#%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D0%B5%D0%BC%D1%8B%D0%B5-%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0).

После успешного сопряжения, устройство появится в панели устройств. Если устройство появилось в панели устройств, но имеет тип undefined, то это неизвестное устройство и с ним нельзя будет взаимодействовать. Если устройство есть в списке доступных устройств, но добавилось как undefined, то попробуйте удалить устройство и добавить заново.
Если не получается подключить устройство, то напиши issue.

## Дополнительные сведения
Существует [дружественный проект](https://github.com/koenkk/zigbee2mqtt) со схожим функционалом на тех же технологиях, в котором с этими же устройствами можно работать по протоколу MQTT.
Поэтому, если какие-либо улучшения или поддержка новых zigbee-устройств происходит в проекте Zigbee2MQTT, то можно перенести и добавить этот же функционал в этот драйвер. Если заметили это, то напиши issue - перенесем.

## Changelog

### 0.10.x (2019-04-03)
* (allofmex) security update
* (allofmex) brightness fix 

### 0.10.3 (2019-03-27)
* fixes
* (kirovilya) Aqara Wireless Relay Controller, Smart LED Driver
* (asgothian) eCozy Thermostat, Nue / 3A, Gledopto GL-C-006 GL-C-009, Philips SML002, OSRAM Outdoor Lantern W RGBW, TRADFRI motion sensor
* (arteck) sensor_86sw2 new states
* (allofmex) Improved device configuration and network map
* (allofmex) security update
* (allofmex) brightness fix 

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