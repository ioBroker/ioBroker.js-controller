---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.epson_ecotank_et_2750/README.md
title: ioBroker.epson_ecotank_et_2750
hash: sMVzlTihy9ysKVgQVZZUYunBRCD+Fcv0WL750HstFeY=
---
![Логотип](../../../en/adapterref/iobroker.epson_ecotank_et_2750/admin/epson_ecotank_et_2750.png)

![Количество установок](https://iobroker.live/badges/epson_ecotank_et_2750-stable.svg?dummy=unused)
![Версия NPM](https://img.shields.io/npm/v/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![Загрузки](https://img.shields.io/npm/dm/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![НПМ](https://nodei.co/npm/iobroker.epson_ecotank_et_2750.png?downloads=true)

# IoBroker.epson_ecotank_et_2750
[![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/epson_ecotank_et_2750/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер EPSON EcoTank ET-2750 для ioBroker
Этот адаптер считывает уровень в резервуаре и другую информацию из [EPSON EcoTank ET-2750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2750) и сохраняет в ioBroker.

[EPSON EcoTank ET-4750] (https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-4750) также поддерживается (проверено [Homoran](https://forum.iobroker.net/user/homoran)) [EPSON EcoTank ET-3750] (https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-3750) также поддерживается (проверено [christofkac](https://github.com/christofkac)) [EPSON EcoTank ET-2721] (https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2721) также поддерживается (проверено [mikepiko](https://github.com/mikepiko))

## Конфигурация
1. Создайте новый экземпляр адаптера.
2. Заполните URL / IP и порт EPSON EcoTank ET-2750.
3. Настройте Synctime (по умолчанию 10 минут).
4. Сохраните настройки.

## Changelog

<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release minor -- --all 0.9.8 -> 0.10.0
    npm run release patch -- --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.0.5 (2021-05-01)

-   (o0shojo0o) fix js-controller 3.3.x warnings

### 0.0.4 (2021-02-01)

-   (o0shojo0o) bugfix first_print_date for 4750
-   (o0shojo0o) code cleaning and refactoring

### 0.0.3 (2021-01-14)

-   (o0shojo0o) add compact mode
-   (o0shojo0o) all necessary changes for EPSON EcoTank ET-2750
-   (o0shojo0o) new tree structure
-   (o0shojo0o) replacing the request with axios npm module

### 0.0.1 (2021-01-03)

-   (o0shojo0o) forked from iobroker.epson_stylus_px830 0.2.1

## License

The MIT License (MIT)

Copyright (c) 2021 o0shojo0o

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

---

_Dank an die Erfinder des Basisskripts zum Parsen der Daten, Idittmar und MistyReblaus aus dem [Homematic-Forum](http://homematic-forum.de/forum/viewtopic.php?f=31&t=25140)._ :+1:

\*Dank an pix und rr0v1 für die Vorlage