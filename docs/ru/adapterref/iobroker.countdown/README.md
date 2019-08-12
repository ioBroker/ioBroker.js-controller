---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: Zev4uVyABT0yxwZxD5Oz+mujy9UL8xc4M5AO6iz8v3A=
---
![логотип](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Значок Greenkeeper](https://badges.greenkeeper.io/jack-blackson/ioBroker.countdown.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Количество установок](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.countdown
=================

Адаптер обратного отсчета для ioBroker ---------------------------------------------- --------------------------------

Цель адаптера - предоставить вам возможность запустить обратный отсчет для будущих событий, с годами, месяцами, днями, часами и минутами. Он предоставит вам каждую из этих групп отдельно, а также две строки с короткой и длинной версией даты.

## Отображение обратного отсчета
Адаптер автоматически предоставит вам таблицу json. Вам просто нужно использовать его с таблицей json. Пожалуйста, отметьте "Нет заголовка" там. Можно отображать краткий или длинный текст.
![логотип](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

## Как создать обратный отсчет
Есть два способа установить обратный отсчет:

* Вы можете создать ручное состояние в устройстве «Настройка». Имя объекта - это имя тревоги, а значением будет дата. Дата должна быть в формате "ДД.ММ.ГГГГ ЧЧ: мм: сс".
* Вы можете создать будильник с sendto. Там вы можете отправить компоненты (минимум - год, месяц, дата) или строку даты. Для строки даты вы можете настроить формат в настройках адаптера.

![логотип](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

* Вы можете добавить дни, месяцы и годы с sendto к сегодняшней дате. Поэтому, пожалуйста, отправьте компонент "name" и либо "addminutes", "addhours", "adddays", "addmonths", либо "addyears" в качестве значения int.

![логотип](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

## Как удалить обратный отсчет
Вы можете удалить обратный отсчет с помощью sendto. Поэтому отправьте только имя с sendto на адаптер, и обратный отсчет будет удален автоматически.

## Доступные результаты
| Тип данных | Описание |
|:---:|:---:|
| минут | Минут до конца обратного отсчета (не всего!) |
| часов | Часов до конца обратного отсчета (не всего!) |
| дней | Дней до конца обратного отсчета (не всего!) |
| месяцы | Месяцы до конца обратного отсчета (не всего!) |
| лет | лет до конца обратного отсчета (не всего!) |
| имя | Обратный отсчет имя |
| endDate | Дата окончания обратного отсчета - формируется как в настройке, определенной |
| inWordsShort | Совокупное значение минут, часов, ... - например, 1Y 5M 4D |
| inWordsLong | Совокупное значение минут, часов, ... - например, 1 год 5 месяцев 4 дня |
| totalHours | Общее количество часов до даты окончания |
| totalDays | Общее количество дней до даты окончания |
| totalWeeks | Общее количество недель до даты окончания |
| достигла | Логическое поле, определяющее, была ли достигнута дата окончания или нет |

## Особенности для добавления
* Возможность добавить скрипт в качестве параметра и запустить его по окончании обратного отсчета.
* Возможность использовать плюс и минус в addminutes и другие функции добавления

## 0.5.0 (2019-07-04)
* (Джек-Блэксон) настроить данные в таблице
* (Джек-Блэксон) исправление даты импорта

## 0.6.0 (2019-07-06)
* (Джек-Блэксон) регулируемый формат даты для ввода и вывода
* (Джек-Блэксон) удалить отсчет с помощью sendto
* (Джек-Блэксон) возможность добавлять обратный отсчет на «дни / месяцы / недели с этого момента»

## 0.7.0 (2019-07-07)
* (Джек-Блэксон) Исправления
* (Джек-Блэксон) addminutes и addhours теперь возможны
* (jack-blackson) точка данных в настройках теперь редактируема
* (Джек-Блэксон) добавлено всего нет. недель

## 1.0.2 (2019-07-22)
* (Джек-Блэксон) Релиз-версия

## 1.0.3 (2019-08-10)
* (Джек-Блэксон) Изменения в компактном режиме
* (Джек-Блэксон) Различные исправления
* (Джек-Блэксон) Теперь возможно использование нескольких экземпляров адаптера.

## Changelog
### 0.1.0 (2019-04-29)
* (jack-blackson) initial version

### 0.2.0 (2019-05-21)
* (jack-blackson) adjusted packages

### 0.3.0 (2019-05-24)
* (jack-blackson) added total No. of days and hours

### 0.4.0 (2019-06-04)
* (jack-blackson) restructuring - creation of alarms with sendto or manually with datapoint is now possible

## License
The MIT License (MIT)

Copyright (c) 2019 jack-blackson <blacksonj7@gmail.com>

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