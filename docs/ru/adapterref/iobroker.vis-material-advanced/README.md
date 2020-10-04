---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: dHGIWO7/K7u161Br1l1mdAHBmXQiZkcMA3n9j5UqZ7Y=
---
![Логотип](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![Количество установок (последнее)](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![Статус зависимости](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![Известные уязвимости](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

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
 - Свет
 - Диммер
 - Световая температура
 - Затвор
 - Объем
 - термостат
 - логическое
 - Число
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

### Начиная
установите адаптер и запустите VIS в режиме редактирования.
Слева выберите vis-material-adapter, и все виджеты будут показаны в предварительном просмотре.

............. многие документы отсутствуют ......................

** вы можете импортировать файл example.json в vis ** благодаря @ sigi234

## Changelog
<!--
    Placeholder
    ### __WORK IN PROGRESS__
* 
-->

### 0.8.14 (2020-10-04)
* border-fix due to changes in css

### 0.8.13 (2020-10-03)
* bugfix LightIcon not switching
* bugfix Volume Icon not shown if no object is set

### 0.8.12 (2020-10-01)
* Value font-size can be changed now


### 0.8.11 (2020-09-30)
* bugfix fo rwrong htm lin Shutter Widget, thx Sigi234


### 0.8.10 (2020-09-30)
* rebase to iobroker-ocmmunity-adapter
* added option to center Icon
* added option to have ONLY Title and no subtitle

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