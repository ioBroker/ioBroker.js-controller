---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: UhKFsvE/MazLo9kNokhslQ8lqDoHst5L1wvq4yedao0=
---
![Логотип](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![Количество установок (последнее)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![Статус зависимости](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![Известные уязвимости](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

# IoBroker.vis-material-advanced
## Адаптер vis-material-advanced для ioBroker
Этот адаптер предоставляет стандартизированные виджеты для vis в ioBroker. Множество различных предопределенных виджетов

Основы этого адаптера были созданы:

* (nisio) https://github.com/iobroker-community-adapters/ioBroker.vis-material
* (пикс ---) https://github.com/Pix---/ioBroker.vis-material

но переписан на 90%

Добавлено несколько исправлений и множество новых виджетов.

## Сейчас присутствуют следующие виджеты:
### Текущий
 - дверь
 - Окно
 - температура
 - влажность
 - Давление
 - Температура и влажность
 - Вместимость
 - Легкий
 - Диммер
 - Световая температура
 - Затвор
 - Объем
 - термостат
 - логический
 - Номер
 - текст
 - клапан

### В ходе выполнения
еще не окончательно:

 - Гаражная дверь
 - Радио станция

 много виджетов еще в планах

## Параметры
    В большинстве виджетов доступны следующие параметры:

    - цвет текста
    - cardIcon (пока не везде имеет смысл, например диммер)
    - цвет непрозрачности (стандартный цвет непрозрачности)
    - colorizeByValue (в зависимости от некоторых значений цвет непрозрачности может быть изменен, например, если он слишком горячий, сделайте его красным, на холодный синий)
    - ниже, выше, min, max (значения для colorizeByValue)
    - цвет низкий / высокий, средний ... (цвет, который будет использоваться, если граница приподнята)
    - только для чтения (некоторые виджеты можно установить в режим только для чтения только для отображения)
    - border-radius для включения и изменения круглого угла
    - valueAlign Выровнять поле Value по левому, центру или правому краю
    - значение-vetical Выровняйте поле Value вверху, внизу или по середине
    - borderColor Цвет границы, если активирован

### Начиная
установите адаптер и запустите VIS в режиме редактирования.
Слева выберите vis-material-adapter, и все виджеты будут показаны в предварительном просмотре.

............. многие документы отсутствуют ......................

** это example2.png, импортируйте его и посмотрите вживую ** ![](../../../en/adapterref/iobroker.vis-material-advanced/widgets/door_example.png)

** вы можете импортировать файл example.json в vis ** благодаря @ sigi234

## Changelog
<!--
    Placeholder
    ### __WORK IN PROGRESS__
* 
-->
### 1.2.0 (2020-11-04)
* added option to round every corner different/not 
* added option to change color of border
* added option for shadow and size of shadow

### 1.1.1 (2020-10-18)
* url wrong in package.json


### 1.1.0 (2020-10-15)
* Travis changes

### 1.0.0 (2020-10-14)
* no changes, upgrading to 1.0

### 0.9.1 (2020-10-13)
* some colorizeByValue options did not work

## License
MIT License

Copyright (c) 2020 EdgarM73 <edgar.miller@gmail.com>

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