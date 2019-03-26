---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.contactid/README.md
title: ioBroker.contactid
hash: h7GfJ7f0d+XC/uERT7rhtunUIr+ortt6zJG4VANPgXU=
---
![логотип](../../../en/adapterref/iobroker.contactid/admin/contactid.png)

![Travis CI Статус сборки](https://travis-ci.org/schmupu/ioBroker.contactid.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.contactid?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/contactid-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.contactid.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.contactid.svg)
![NPM](https://nodei.co/npm/iobroker.contactid.png?downloads=true)

# IoBroker.contactid
==================

Протокол Contact ID, используемый системами сигнализации для связи с центральными станциями.

Этот адаптер является сервером Contact ID. При возникновении события тревоги система сигнализации отправляет через IP сообщение ID контакта на центральную станцию.
Вы можете использовать ioBroker с этим адаптером в качестве центральной станции. Например. Вы можете отправить для тревоги по Conntact ID сообщение телеграммы.

Сообщение с идентификатором контакта

  SSSS 18QEEEGGZZZC

  * SSSS - подписчик. Эти четыре цифры обозначают конкретную систему сигнализации или клиента на центральной станции. ioBroker позволяет использовать более длинные имена подписчиков.

  * 18 - Тип сообщения. В основном это поле всегда должно быть «18».
  * Q - Event Qualifier.
  * EEE - Код события.
  * GG - номер группы / раздела.
  * ZZZ - номер зоны (001 - 999). Это номер зоны, которая вызвала тревогу.
  * C - Контрольная сумма.

[Протокол идентификации контакта](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

## Установка и настройка
1. Установите адаптер
2. Конфигурация адаптера:

Выберите IP-адрес и порт для прослушивания запросов Conctact-ID.
Зарегистрируйте ваше имя подписчика, чтобы идентифицировать вас сообщения о тревоге о взломе и выбрать тип вашей тревоги.

3. Сконфигурируйте свою систему взломщика для отправки сообщений Contact ID

    Lupusec XT1:

Einstellungen -> ID контакта: rptn: // subcriber @ ip-address-iobroker: port Пример: rptn: //test@192.168.20.1: 50000

    Lupusec XT1 + / XT2 / XT2 + / XT3:

Einstellungen -> ID контакта: ip: // subcriber @ ip-address-iobroker: порт / CID Пример: ip: //test@192.168.20.1: 50000 / CID

4. Тестирование Adpater

  Откройте командную оболочку и введите

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

Теперь вы можете отправить сообщение Conntact ID. Для систем охранной сигнализации Lupsec сообщение начинается и заканчивается на [и]. Введите в своем сеансе telnet:

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

  Теперь вы можете увидеть сообщение в объектах ioBroker

## Changelog

### 1.0.0 (2019.01.05)
* (Stübi) Support js-controller compact mode 

### 0.1.6 (2018.12.27)
* (Stübi) Update Core Adapter

### 0.1.5 (2018.06.07)
* (Stübi) Translations

### 0.1.3 (2018.06.07)
* (Stübi) Cleanup

### 0.1.2 (2018.06.07)
* (Stübi) Improvements

### 0.1.1 (2018.06.03)
* (Stübi) Lupusec XT1 Plus, XT2 Plus and XT3 added

### 0.1.0 (18.05.2018)
* (Stübi) First Beta Release

### 0.0.6 (2018.05.18)
* (Stübi) fixed error i
* (Stübi) correction of README.md

### 0.0.5 (2018.05.17)
* (Stübi) fixed error in drop down menu

### 0.0.4 (15.05.2018)
* (Stübi) code improvements

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