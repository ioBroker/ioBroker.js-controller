---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.stockmarket/README.md
title: ioBroker.stockmarket
hash: xWJJynnsydVfVGFj/C4zT8ffzjIIGiWDYjb9wRP2XAk=
---
![логотип](../../../en/adapterref/iobroker.stockmarket/admin/stockmarket.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.stockmarket.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.stockmarket.svg)
![Статус зависимости](https://img.shields.io/david/waoler/iobroker.stockmarket.svg)
![Известные уязвимости](https://snyk.io/test/github/waoler/ioBroker.stockmarket/badge.svg)
![NPM](https://nodei.co/npm/iobroker.stockmarket.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/waoler/ioBroker.stockmarket/master.svg)

# IoBroker.stockmarket
## Адаптер биржи для ioBroker
Этот адаптер ioBroker интегрирует фондовый рынок в ioBroker. Вы можете выбрать, какие акции вы хотите посмотреть.

### Конфигурация
1. Получите свой собственный ключ API от https://www.alphavantage.co/support/#api-key
2. Поместите сгенерированный ключ в конфигурацию адаптера.
3. Вставьте нужные символы в конфигурацию адаптера (через запятую)
4. (необязательно) Чтобы найти нужные символы акций, вы можете проверить их по следующему URL: https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=STOCKNAME&apikey=YOUR_API_KEY

Замените STOCKNAME на Акции, которую вы ищете, а YOUR_API_KEY на ваш ключ Api :). Затем используйте команду find your stock и используйте показанный символ SYMBOL для конфигурации вашего адаптера.

5. Сохраните настройки

Вы можете изменить настройки расписания, если хотите (по умолчанию каждые 15 минут).

## Changelog

### 0.0.2
* (waoler) fixed error handling
* (waoler) fixed "instance already running "-Error

### 0.0.1
* (waoler) initial release

## License
MIT License

Copyright (c) 2019 waoler <waoler@web.de>

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