---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovery/README.md
title: Адаптер ioBroker Discover
hash: YYvgZGQYh0gr84LLbiD+zRsUnQ8XcY5RRBU51PaAi8Y=
---
![логотип](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Количество установок](http://iobroker.live/badges/discovery-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.discovery.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.discovery.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.discovery.png?downloads=true)

# IoBroker Откройте для себя адаптер
** Обнаруживайте устройства всеми известными методами. **

Это специальные адаптеры, которые пытаются найти все возможные устройства, доступные с хоста.
Только сейчас он может обнаруживать через ping, UPnP (планируется серийный).

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Фактически поддерживается
### Обнаруживается автоматически
- ПЛК Beckhoff
- Умный дом Bosch
- Bose Soundtouch
- Broadlink
- Chromecast
- климат-контроль Daikin
- deConz
- Denon / Marantz
- DoorBird
- ebus
- ekey
- Энергоменеджер (E.ON / Solarwatt)
- энет (Юнг)
- Epson Stylus PX830
- Факероку (гармония)
- FHEM
- FireTV
- Фрицдект
- Фрониус
- Заглушки G-Homa
- Гармония
- Домашний помощник
- Homematic CCU (hm-rpc, hm-rega)
- Homepilot
- HP-lio
- Philips HUE
- Plex
- InfluxDB
- КЛФ-200
- KNX (фактически отключен)
- Коди
- Ландроид
- LGTV
- Осветить
- Локсон
- Лупусек
- МАКС! куб
- Маклайтинг
- MegaD
- Miele
- Облачная служба Miele
- Умный дом Mi Home
- Микротик
- Мост MiLight (v6)
- Мпд
- Musiccast
- myDlink
- Mysensors USB / последовательный (9600, 38400, 57600, 115200)
- световые панели / холст nanoleaf
- Нуки2
- Орех
- Onkyo
- OpenHAB
- Пинг
- Plex
- Proxmox
- RFLink (серийный 57600 бод)
- SamsungTV
- Smappee
- Соларлог
- Соннен
- Сонос
- Stiebel-Eltron / Tecalor ISG (плюс)
- SQL (MySQL, MSSQL, PostgreSQL)
- Соковыжималка
- SqueezeboxRPC
- Synology
- TR-064
- Trådfri
- UPnP
- Wifilight
- Ямаха
- Yeelight
- Z-wave USB (протестировано в Aeon Labs)

### Предлагаются как дополнительные адаптеры
- Облако
- История (если SQL или InfluxDB не найдены)
- flot (предлагается при наличии History-Adapter)
- JavaScript
- Информация
- мобильный
- Vis
- Интернет

## Делать
- артнет? (Bluefox)
- B-Control-Em? (Bluefox)
- Cul / Maxcul (Bluefox)
- Foobar200 (установщик)
- фрицбокс (ruhr70)
- км200 (откровенный шутник)
- мегаэсп (ausHaus)
- Modbus (Bluefox)
- mqtt / mqtt-клиент (Bluefox)
- owfs (Bluefox)
- rpi2 (если ioBroker работает на Raspberry)
- rwe-smarthome (PArns)
- S7 (Bluefox)
- смартметр (Apollon77)
- унифи (jens-maus)
- волк (улыбается-валет)
- xs1 (откровенный шутник)

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 2.3.11 (2020-08-08)
* (Grizzelbee) Added MieleCloudService 

### 2.3.10 (2020-07-26)
* (MiSchroe) Discovery Velux KLF-200 updated to new firmware

### 2.3.9 (2020-07-17)
* (Apollon77) Add error handling to onvif discovery (Sentry IOBROKER-DISCOVERY-13)
* (Apollon77) Add error handling to smapee discovery (Sentry IOBROKER-DISCOVERY-14)
* (Apollon77) Add error handling to synology discovery (Sentry IOBROKER-DISCOVERY-1A)
* (Apollon77) Update mndp library to prevent crashes (Sentry IOBROKER-DISCOVERY-15+)

### 2.3.7 (2020-06-11)
* (Apollon77) Add error handling for Synology detection (Sentry IOBROKER-DISCOVERY-E)

### 2.3.6 (2020-05-02)
* (Garfonso) add mydlink adapter
* (haba1234) New adapter added: Onvif
* (Apollon77) serial device discovery fixed

### 2.3.4 (2020-04-30)
* (Apollon77) make sure to check if initialization was done when ending (Sentry IOBROKER-DISCOVERY-8) 
* (APollon77) fix megad discovery error

### 2.3.3 (2020-04-23)
* (Apollon77) correct access to wrong variable (Sentry IOBROKER-DISCOVERY-3)
* (Apollon77) catch http errors better (Sentry IOBROKER-DISCOVERY-2)

### 2.3.2 (2020-04-18)
* (Apollon77) Fix potential crash in knx discovery

### 2.3.1 (2020-04-16)
* (instalator) Add Synology, Onkyo, Mpd, Mikrotik
* (instalator) Fixed eKey, Mihome, Broadlink2, Plex
* (instalator) Several optimizations and fixing of crash causes
* (Apollon77) Add Sentry Crash Reporting for js-controller 3.0
* (bluefox) Refactoring

### 2.2.2 (2020-02-13)
* (dkleber89) Add discovery for Beckhoff PLC
* (forelleblau) Add discovery for Solarlog
* (oweitman) Add discovery for SqueezeboxRPC

### 2.1.0 (2020-01-21)
* (foxriver76) no longer use adapter.objects
* __js-controller > 2.0.0 required__

### 2.0.0 (2019-05-15)
* (thewhobox) Code refactoring
* (thewhobox) add emby detection
* (frankjoke) boradlink => broadlink2
* (bluefox) Small fixes
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.3.0 (2019-01-04)
* (bluefox) Support of compact mode
* (ldittmar) info Adapter added

### 1.2.4 (2018-09-22)
* (bluefox) Small GUI update was made
* (rg-engineering) Added ebus

### 1.2.3 (2018-09-13)
* (bluefox) Proxmox was fixed
* (unltdnetworx) solarwatt
* (Michael Schroeder) klf200
* (bluefox) Use OpenStreetMap
* (MeisterTR) yeelight
* (unltdnetworx) stiebel-isg
* (BuZZy1337) doorbird

### 1.2.1 (2018-07-28)
* (bluefox) New adapter added: DENON

### 1.1.1 (2018-03-27)
* (bluefox) New adapter added: ekey, Home Assistant, FHEM

### 1.1.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-13)
* (bluefox) ready for admin3

### 1.0.1 (2017-12-28)
* Fix Epson Stylus PX830
* Add Bose Soundtouch

### 1.0.0 (2017-10-18)
* (pix) Add Epson Stylus PX830
* (pix) Add Homepilot
* (Samuel Weibel) Loxone

### 0.4.5 (2017-08-25)
* (Apollon77) Fixes in mihome

### 0.4.4 (2017-06-01)
* (bluefox) Add lgtv
* (bluefox) disable serial by default. It must be explicit enabled every time
* (bluefox) add mihome

### 0.4.2 (2017-05-17)
* (bluefox) Add discovery methods selection

### 0.4.0 (2017-05-01)
* (soef) add SamsungTV, Lightify, Miele and yamaha
* (soef) add new discovery method mDNS
* (bluefox) add openhab, Broadlink

### 0.3.3 (2017-04-15)
* (bluefox) add philips HUE

### 0.3.2 (2017-04-12)
* (bluefox) Add mysensors USB/Serial

### 0.3.1 (2017-04-01)
* (apollon77) Add Daikin climate control

### 0.3.0 (2017-03-27)
* (bluefox) Fixed serial discovery

### 0.2.3 (2017-03-18)
* (bluefox) fix license dialog
* (bluefox) add zwave
* (bluefox) add sqllite and flot
* (bluefox) ack => ignore
* (bluefox) add megad
* (apollon77) add history
* (apollon77) enhance/fix sql-sqlite
* (apollon77) add InfluxDB
* (ykuendig) german translation updated

### 0.2.2 (2017-03-18)
* (bluefox) Fix typo

### 0.2.1 (2017-03-15)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2020, Bluefox <dogafox@gmail.com>

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