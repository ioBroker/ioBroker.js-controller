---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lg-ess-home/README.md
title: ioBroker.lg-ess-home
hash: 2eL0UVFcmdRSjNgOgVhDCAy9KFCsDkov29qCT4hXbg0=
---
![Логотип](../../../en/adapterref/iobroker.lg-ess-home/admin/lg-ess-home.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.lg-ess-home.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lg-ess-home.svg)
![Количество установок (последнее)](http://iobroker.live/badges/lg-ess-home-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/lg-ess-home-stable.svg)
![Статус зависимости](https://img.shields.io/david/Morluktom/iobroker.lg-ess-home.svg)
![Известные уязвимости](https://snyk.io/test/github/Morluktom/ioBroker.lg-ess-home/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lg-ess-home.png?downloads=true)

# IoBroker.lg-ess-home
** Тесты: ** ![Тестирование и выпуск](https://github.com/Morluktom/ioBroker.lg-ess-home/workflows/Test%20and%20Release/badge.svg)

## Домашний адаптер LG ESS для ioBroker
Адаптер iobroker для гибридного инвертора LG ESS. С помощью этого адаптера можно прочитать состояние инвертора. Также возможно управление инвертором.

## Конфигурация
### Получение пароля
1. Загрузите файл [LG_Ess_Password.exe] (https://github.com/Morluktom/ioBroker.lg-ess-home/tree/master/tools)
1. Подключите компьютер к WLAN системы LG_ESS. (Пароль WLAN указан на заводской табличке)
1. Запустите LG_Ess_Password.exe (требуется как минимум .Net Framework 4.5)
1. Запишите свой пароль.

Для тех, кому не нравится exe: (спасибо grex1975) \ вы можете использовать любой REST-клиент для получения пароля:

1. подключитесь к WLAN LG_ESS
1. Выполните запрос GET \

URL: https://192.168.23.1/v1/user/setting/read/password \ Headers: "Charset": "UTF-8", "Content-Type": "application / json" \ Body: "key": "lgepmsuser! @ #"

Это должно дать вам пароль и статус взамен.

## Changelog

### 0.0.8 (2021-02-06)
* (Morluktom) Code cleanup

### 0.0.7 (2021-02-01)
* (Morluktom) Code cleanup

### 0.0.6 (2020-12-23)
* (Morluktom) Data type recognition fixed

### 0.0.5 (2020-12-15)
* (Morluktom) ScalingFactor moved to nativ
* password encryption => auto encryption (Maybe you have to set the password new)

### 0.0.4
* (Morluktom) W => kW, values confirmed

### 0.0.3
* (Morluktom) Structure of the channel and states changed

### 0.0.2
* (Morluktom) Separate Intervall for Common and Home

### 0.0.1
* (Morluktom) initial release

## License
MIT License

Copyright (c) 2020 - 2021 Morluktom <strassertom@gmx.de>

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