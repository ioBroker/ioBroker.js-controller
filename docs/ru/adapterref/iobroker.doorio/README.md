---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.doorio/README.md
title: ioBroker.doorio
hash: OXB7nvAFt6ITxkgbxen7gzRW89pXdtH3Gv4lsHTU1DE=
---
![логотип](../../../en/adapterref/iobroker.doorio/admin/doorio.png)

![Статус сборки](https://travis-ci.org/Bettman66/ioBroker.doorio.svg?branch=master)
![Версия NPM](http://img.shields.io/npm/v/iobroker.doorio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.doorio.svg)
![NPM](https://nodei.co/npm/iobroker.doorio.png?downloads=true)

# IoBroker.doorio
## Информация
Самодельный адаптер DoorStation для ioBroker

Этот адаптер подключается к Sip-клиенту Baresip через tcp.socket для связи с домофоном. В качестве триггера звонка можно использовать любой вход от ioBroker.
Адаптер также распознает тональные сигналы DTMF для переключения выходов. Для самодельной дверной станции можно использовать любую фурнитуру, на которую можно установить Баресип.

Адаптер Dieser позволяет использовать SIP-клиент с Baresip Sip-Client, подключенный к Türsprechstelle zu kommunizieren. Als Klingelauslöser kann jeder Eingang von ioBroker genutzt werden. Der Adapter erkennt auch DTMF-Töne um Ausgänge zu schalten. Für die Selbstgemachte Türsprechstelle, kann jede Hardware auf der sich Baresip installieren lässt genutzt werden.

## Ссылки
* https://forum.iobroker.net/topic/23413/ich-baue-eine-t%C3%BCrsprechstelle-ohne-cloud
* https://forum.iobroker.net/topic/22746/test-adapter-doorio-v0-0-x

## Changelog
### 1.0.10
* (bettman66) add detour

### 1.0.9
* (bettman66) fix userconfigerror

### 1.0.8
* (bettman66) fix dtmf-timeout

### 1.0.7
* (bettman66) check states

### 1.0.6
* (bettman66) clearTimeouts

### 1.0.5
* (bettman66) update stable

### 1.0.4
* (bettman66) new config

### 1.0.3
* (bettman66) update adapter-core

### 1.0.2
* (bettman66) add selectID.js

## License
The MIT License (MIT)

Copyright (c) 2020 Walter Zengel <w.zengel@gmx.de>

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