---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wolf/README.md
title: ioBroker.wolf
hash: Rot/Djk/wBUnhJuUMYvWkk2S+OtcuUb2MEMu6oCNOgk=
---
![логотип](../../../en/adapterref/iobroker.wolf/admin/wolf_logo.png)

![Количество установок](http://iobroker.live/badges/wolf-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.wolf.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wolf.svg)
![NPM](https://nodei.co/npm/iobroker.wolf.png?downloads=true)

# IoBroker.wolf
======================

## Области применения: отопление / солнечная / домашняя вентиляция
Адаптер может оценить максимум 4 из следующих нагревателей через ISM8i:

* Газоконденсатная установка: КГБ-2 (включает в себя: CGW-2, CGS-2, CSZ-2), МГК-2
* Масляный конденсационный котел: TOB
* Сплит тепловой насос: BWL-1-S
* Вентиляция в гостиной CWL Отлично

Системный модуль управления BM-2 всегда требуется.
Кроме того, в системе eBus могут присутствовать дополнительные компоненты, такие как смесительный модуль MM, каскадный модуль KM, солнечный модуль SM1 или SM2.

Максимальное количество отдельных модулей:

* Макс. 4 нагревателя hg (1) -hg (4) (где BWL-1-S создается как hg0)
* Макс. 3 смесителя мм (1) - мм (3)
* Макс. 4 операторские панели (БМ-2) БМ (1) -БМ (4)
* Макс. 1 каскадный модуль км (1)
* Макс. 1 солнечный модуль (SM1 или SM2) см (1)

Жилой вентиляционный блок серии CWL Excellent также может быть оценен и эксплуатироваться с ISM8i.

## Einsatzbereiche: Heizung / Solar / Wohnraumlüftung
Der Adapter kann über das ISM8i максимальный 4 фонового разрешения: Heizgeräten auswerten:

  * Gasbrennwertgerät: CGB-2 (beinhaltet: CGW-2, CGS-2, CSZ-2), MGK-2
  * Öl Brennwertkessel: TOB
  * Split-Wärmepumpe: BWL-1-S
  * Wohnraumlüftung CWL Отлично

Es ist immer ein System-Bedienmodul BM-2 erforderlich.
Weiterhin können zusätzliche Komponenten wie Mischermodul MM, Kaskadenmodul KM, Solarmodul SM1 oder SM2, im eBusSystem.

  Maximale Anzahl der einzelnen Модуль:

  * Макс. 4 Heizgeräte hg (1) -hg (4) (wobei ein BWL-1-S и hg0 angelegt wird)
  * Макс. 3 Мишер мм (1) - мм (3)
  * Макс. 4 Bediengeräte (BM-2) BM (1) -BM (4)
  * Макс. 1 Kaskadenmodul км (1)
  * Макс. 1 Solarmodul (SM1 или SM2) см (1)

  Ein Wohnraumlüftungsgerät der Baureihe CWL Отлично подходит для ISM8i ebenfalls ausgewertet и bedient werden.

## Changelog
### 1.0.0 [2017.11.21]
* (bluefox) resize logo

### 0.9.1 [2016.12.19]
* (smiling_Jack) Add Bool option
* (smiling_Jack) Add Bar option
* (smiling_Jack) Bugfix Type 5.001 Scaling 

### 0.1.0 [2015.12.01]
* (smiling_Jack) Add writing to ism8

### 0.0.9 [2015.11.06]
* (smiling_Jack) Bugfix
* (smiling_Jack) Add test output

### 0.0.8 [2015.11.02]
* (smiling_Jack) Bugfix io-package

### 0.0.7 [2015.11.02]
* (smiling_Jack) new object management
* (smiling_Jack) Bugfixes

### 0.0.6 [2015.10.20]
* (smiling_Jack) Bugfix parsing

### 0.0.5 [2015.10.16]
* (smiling_Jack) Add support for multiple data
* (smiling_Jack) Add debug output 
* (smiling_Jack) Bugfixes

### 0.0.4 [2015.10.15]
* (smiling_Jack) Bugfix on parse error
* (smiling_Jack) Add DPT_HVACContrMode
* (smiling_Jack) Add DPT_HVACMode

### 0.0.3 [2015.10.14]
* (smiling_Jack) add CWL
* (smiling_Jack) remove ISM8 ip

### 0.0.2 [2015.10.12]
* (smiling_Jack) add BWL-1-S
* (smiling_Jack) update readme

### 0.0.1 [2015.10.08]
* (smiling_Jack) first release

## License

The MIT License (MIT)

Copyright (c) 2015-2017 smiling_Jack

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.