---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fronius/README.md
title: ioBroker.fronius
hash: e4eLXLM1VVzjytY4m6uIjTUlmxeHzZYTDWCuyQ4Wcgk=
---
![Логотип](../../../en/adapterref/iobroker.fronius/admin/fronius.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.fronius.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fronius.svg)
![Количество установок (последнее)](http://iobroker.live/badges/fronius-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/fronius-stable.svg)
![Статус зависимости](https://img.shields.io/david/ldittmar81/iobroker.fronius.svg)
![Известные уязвимости](https://snyk.io/test/github/ldittmar81/ioBroker.fronius/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.fronius.png?downloads=true)

# IoBroker.fronius
** Тесты: ** ![Тестирование и выпуск](https://github.com/ldittmar81/ioBroker.fronius/workflows/Test%20and%20Release/badge.svg)

## Адаптер инвертора Fronius для ioBroker
Это адаптер ioBroker для вашего фотоэлектрического инвертора Fronius с Fronius Datalogger Web начиная с версии 2.0.4-1, Fronius Datamanager начиная с версии 3.0.3-1 и позже и Symo Gen24.

## Changelog

### 1.1.0 (2020-11-24)
* (nkleber78) Implementation change for support of SYMO GEN24
* (nkleber78) Fix issue with adapters connected state

### 1.0.5 (2019-01-18)
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support

### 1.0.4
* (ldittmar) Fix assignment to constant variable error

### 1.0.3
* (ldittmar) Ready for Admin 3

### 1.0.2
* (tobintax) Bugfix - Inverter Query regarding PAC adjusted.

### 1.0.1
* (tobintax) Added more values from Smartmeter
* (tobintax) Added more Powerflow Values
* (tobintax) Removed Value "EnergyReal_WAC_Minus_Relative" . This Value had no result and is undocumented in the fronius api documentation.

### 1.0.0
* (ldittmar) Fixed little errors

### 0.0.5
* (ldittmar) Read storage data and error/status codes

### 0.0.4
* (ldittmar) Read more data

### 0.0.3
* (ldittmar) Improved installation routine

### 0.0.2
* (ldittmar) First data is read

### 0.0.1
* (ldittmar) initial commit

## License
The MIT License (MIT)

Copyright (c) 2020 ldittmar <iobroker@lmdsoft.de>

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