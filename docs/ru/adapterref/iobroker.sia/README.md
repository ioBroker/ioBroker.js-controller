---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sia/README.md
title: ioBroker.sia
hash: il7/UPEyrU92BmFdqvOBWwW0PIp9WsgXNkxmwPVIO84=
---
![логотип](../../../en/adapterref/iobroker.sia/admin/sia.png)

![Travis CI Статус сборки](https://travis-ci.org/schmupu/ioBroker.sia.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.sia?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/sia-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sia.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sia.svg)
![NPM](https://nodei.co/npm/iobroker.sia.png?downloads=true)

# IoBroker.sia
==================

Требуется node.js 6.0 или выше и Admin v3!

Протокол SIA DC-09 используется системами сигнализации для связи с центральными станциями.

Этот адаптер является сервером SIA. Когда срабатывает аварийное событие, система сигнализации отправляет по IP-адресу сообщение на центральную станцию.
Вы можете использовать ioBroker с этим адаптером в качестве центральной станции. Например. Вы можете послать для тревоги по телеграмме SIA.

[Протокол SIA DC-09](https://www.yumpu.com/en/document/view/47594214/dc-09-preparing-for-ansi-public-review-security-industry-)

## Установка и настройка
1. Установите адаптер
2. Конфигурация адаптера:

Выберите IP-адрес и порт для прослушивания запросов SIA.
![sia_adapter1](../../../en/adapterref/iobroker.sia/admin/sia_adapter1.png)

Зарегистрируйте номер счета. Если вы используете AES, вы должны ввести пароль (ключ). Длина ключа должна составлять 16, 24 или 32 символа (байта).
Если флажок «Пароль AES в шестнадцатеричном формате» активен, длина пароля должна составлять 32, 48 или 64 символа (байта).
В поле ACK timeout вы указываете возраст сообщения в секундах. Если вы зададите 0 секунд, проверка тайм-аута не будет выполнена.
![sia_adapter2](../../../en/adapterref/iobroker.sia/admin/sia_adapter2.png)

3. Настройте систему защиты от взлома для отправки сообщений SIA.

    * Lupusec XT1 + / XT2 / XT2 + / XT3:

Einstellungen -> ID контакта: ip: // подписчик @ ip-адрес-iobroker: порт / SIA Пример: ip: //test@192.168.20.1: 50001 / SIA

      ![sia_lupusec1](../../../en/adapterref/iobroker.sia/admin/sia_lupusec1.png)

    * Другие системы сигнализации:

Адаптер будет работать со всеми системами сигнализации, которые поддерживает SIA DC-09 proctocol

4. Объекты SIA / Государства

Если вы получаете сообщения SIA, вы видите их в дереве состояний

![sia_adapter3](../../../en/adapterref/iobroker.sia/admin/sia_adapter3.png)

## Changelog

### 1.0.1 (05.03.2019)
* (Stübi) Saving password encrypted. 
* (Stübi) ACK and NAC calculation extended.
* (Stübi) CRC can be send in 0xABCD (2 Byte) or ABCD (4 Byte, ASCII) format. Automatic recognizing
* (Stübi) AES Password can be in AES-128-CBC, AES-192-CBC or AES-256-CBC
* (Stübi) AES Password can be saved in byte or hex (length 16, 24 or 32 byte) format or hex (length 32, 48 or 64 hex) format
* (Stübi) Timeout for ACK (0 = disable, 1 - n sec)
* (Stübi) Set ioBroker States of message on ACK not on NACK

### 1.0.0 (05.01.2018)
* (Stübi) Support js-controller compact mode 

### 0.1.8 (27.12.2018)
* (Stübi) Update Adapter Core File

### 0.1.6 (23.10.2018)
* (Stübi) Bugfxing (NAK) and AES support

### 0.1.5 (01.10.2018)
* (Stübi) Translations

### 0.0.5 (09.08.2018)
* (Stübi) Requires nodejs 6.0 or higher

### 0.0.4 (08.06.2018)
* (Stübi) Cleanup

### 0.0.3 (08.06.2018)
* (Stübi) SIA regex optimized

### 0.0.2 (08.06.2018)
* (Stübi) bug fixing

### 0.0.1 (07.06.2018)
* (Stübi) first implementation

## License
The MIT License (MIT)

Copyright (c) 2018 Thorsten <thorsten@stueben.de>

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