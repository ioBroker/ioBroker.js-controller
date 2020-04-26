---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.binance/README.md
title: ioBroker.binance
hash: g1ciorZTR3u5Yhaf5+j4iEvviAnfozU2ASrlfW4BtJo=
---
![логотип](../../../en/adapterref/iobroker.binance/admin/binance.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.binance.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.binance.svg)
![Количество установок (последняя)](http://iobroker.live/badges/binance-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/binance-stable.svg)
![Статус зависимости](https://img.shields.io/david/Kartax/iobroker.binance.svg)
![Известные уязвимости](https://snyk.io/test/github/Kartax/ioBroker.binance/badge.svg)
![NPM](https://nodei.co/npm/iobroker.binance.png?downloads=true)

# IoBroker.binance
## Введение
Адаптер для связи с криптографической торговой платформой

Адаптер вытягивает цены валют в настроенном интервале обновления.
Если вы настроите ключ API и соответствующий секретный ключ, он также потянет остатки на счетах.
Вы можете создать ключ API на binance.com - я предлагаю ограничить его только для чтения.

![screenshot-1] (screenshot-1.png)! [screenshot-2](../../../en/adapterref/iobroker.binance/screenshot-2.png)

## Changelog
### 1.1.0
- added 24hr data for selected symbols
### 1.0.5
- fixed interval handle
### 1.0.4
- npmjs repackage
### 1.0.3
- enrypted storage of apiKeySecret
### 1.0.2
- added translations
- additonal timeout options
- Travis CI
### 1.0.1
- some loggin cleanup
- adjusted documentation
### 1.0.0
- first fully functional release (polling of prices and account balances)
- introduces cropty-js to accomplish binance quthentication requirements
- moved from type schedule to daemon with setTimeout

## License
MIT License

Copyright (c) 2020 Kartax

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