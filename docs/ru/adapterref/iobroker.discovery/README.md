---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovery/README.md
title: ioBroker Откройте для себя адаптер
hash: eMX91m7bjYz2QOdeleU7/zfucMqyuFWIb198ebp3poQ=
---
![логотип](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Количество установок](http://iobroker.live/badges/discovery-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.discovery.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.discovery.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.discovery.png?downloads=true)

# IoBroker Откройте для себя адаптер
** Обнаружение устройств всеми известными методами. **

Это специальные адаптеры, которые пытаются найти все возможные устройства, которые могут быть доступны с хоста.
Просто теперь он может обнаружить с помощью ping, UPnP (последовательный план).

## На самом деле поддерживается
### Обнаружено автоматически
- Bose Soundtouch
- Broadlink
- Chromecast
- климат-контроль Daikin
- deConz
- Денон / Маранц
- DoorBird
- Ebus
- эки
- энергетический менеджер (E.ON / Solarwatt)
- Epson Stylus PX830
- Факероку
- FHEM
- FireTV
- Фрониус
- пробки G-Homa
- Гармония
- Домашний помощник
- Homematic CCU (hm-rpc, hm-rega)
- Домашний пилот
- Philips HUE
- InfluxDB
- KLF-200
- KNX
- Landroid
- LGTV
- Освети
- локсон
- Lupusec
- МАКС! куб
- МегаД
- Миле
- Mi Home Smarthome
- Мост MiLight (v6)
- Musiccast
- Mysensors USB / Serial (9600, 38400, 57600, 115200)
- Орех
- OpenHAB
- Пинг
- Proxmox
- RFLink (последовательный 57600 бод)
- SamsungTV
- Соннен
- сонос
- Stiebel-Eltron / Tecalor ISG (плюс)
- SQL (MySQL, MSSQL, PostgreSQL)
- Squeezebox
- Stiebel-isg
- TR-064
- Trådfri
- UPnP
- Wifilight
- Yamaha
- Yeelight
- Z-wave USB (протестировано в Aeon Labs)

### Предлагается в качестве дополнительных адаптеров
- Облако
- История (если не найден SQL или InfluxDB)
- flot (предлагается при наличии адаптера истории)
- JavaScript
- мобильный
- Vis
- Интернет

## Сделать
- артнет? (Bluefox)
- B-Control-Em? (Bluefox)
- куль / макскул (блюфокс)
- Foobar200 (Установщик)
- fritzbox (ruhr70)
- км200 (франкжук)
- коди (установщик)
- мегаэсп (ausHaus)
- Modbus (Bluefox)
- mpd (установщик)
- mqtt / mqtt-client (Bluefox)
- Онкио (Блюфокс)
- owfs (Bluefox)
- rpi2 (если ioBroker работает на Raspberry)
- rwe-smarthome (PArns)
- S7 (Bluefox)
- смартметр (Apollon77)
- унифи (дженс маус)
- волк (улыбающийся джек)
- xs1 (франкжук)

## Changelog
### 1.3.0 (2019-01-04)
* (bluefox) Support of compact mode

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

Copyright (c) 2017-2019, bluefox <dogafox@gmail.com>

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