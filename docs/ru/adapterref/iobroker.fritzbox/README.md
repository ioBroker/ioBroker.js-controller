---
local: true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fritzbox/README.md
title: AVM Fritz! Box®
hash: 06n8lqJfS16vyM7UWTux0cNEVIYcWNRv2KMVnS9ngnA=
---
![логотип](../../../de/adapterref/iobroker.fritzbox/media/fritzbox.png)

# AVM Fritz! Box®
В Fritz! Box (собственное правописание производителя AVM) представлены наиболее широко используемые роутеры на рынке.

В настоящее время существуют модели для всех распространенных типов подключения к Интернету: DSL, кабельный, мобильный и оптоволоконный доступ.

## Адаптер Fritzbox
Адаптер устанавливает соединение между Fritzbox (короткий FB) и ioBroker и предоставляет данные и списки вызовов.

## Предварительные условия перед установкой
Обмен данными происходит через *Callmonitor* встроенный в FB. Чтобы активировать его, позвоните по следующему номеру с подключенного телефона:

* ```\#96\*5\*``` - Включить монитор вызовов
* ```\#96\*4\*``` - выключить монитор вызовов

## Конфигурация
### Настройки
Здесь только для активации, какие данные должны быть переданы в какой форме. Лейтенант Разработчикам нужны лишние поля данных (см. Графику и ветку на форуме); Нет обновлений для этого адаптера, так как его можно заменить более мощным адаптером "TR-064".

![Пост с форума](../../../de/adapterref/iobroker.fritzbox/media/konfig_fehler.png)

Дополнительная информация на форуме [в этой теме](https://forum.iobroker.net/viewtopic.php?f=20&t=3344&hilit=fritzbox).

### Autosetup
см. [настройки](#settings)

## Экземпляр
В разделе *Экземпляры* ioBrokers вы можете найти установленный экземпляр адаптера. Слева на светофоре визуализируется, активирован ли адаптер и подключен ли.

![пример](../../../de/adapterref/iobroker.fritzbox/media/instanz.png)

Если вы поместите указатель мыши на символ, вы получите подробную информацию.

## Объекты адаптера
В области Объекты все значения, списки и информация, передаваемые FB адаптеру, отображаются в древовидной структуре (см. Настройки).

Непосредственно в папке экземпляра *fritzbox.x* вы найдете точку данных *Сообщение* с датой, временем и типом последнего действия.

![иерархия папок](../../../de/adapterref/iobroker.fritzbox/media/ordnerbaum.png)

Соответствующие каналы и созданные в них точки данных кратко описаны ниже.

### Callmonitor канала
Точки данных показывают звонки в режиме реального времени

| **точка данных** | **Описание** |
|----------------|-----------------------------------------------------------------------|
| все | Отображение даты, времени и номера телефона; и выключать |
| звонок | Отображение даты, времени и номера телефона; начиная |
| подключиться | Отображение даты, времени и номера телефона существующего соединения |
| кольцо | Отображение даты, времени и количества исходящих звонков |

### Канал звонков
В этом канале создаются еще 2 канала и несколько точек данных:

![Канал Звонки](../../../de/adapterref/iobroker.fritzbox/media/calls.png)

| **точка данных** | **Описание** |
|----------------------|---------------------------------------------|
| callLastNumber | Последний набранный номер телефона |
| connectNumber | Последний продолжающийся разговор |
| connectNumbers | все текущие звонки |
| missedCount | Счетчик пропущенных звонков |
| missedDateReset | Дата последнего сброса счетчика |
| кольцо | Сигнал входящего звонка |
| ringActualNumber | Номер телефона входящего звонка |
| RingActualNumbers | Номера всех текущих входящих звонков |
| ringLastMissedNumber | Последний звонок |
| ringLastNumber | Номер телефона последнего входящего звонка |

#### CounterActualCalls
Здесь значения различных текущих счетчиков вызовов перечислены в реальном времени:

| **точка данных** | **Описание** |
|----------------|------------------------------------------------------|
| allActiveCalls | Количество активных звонков (существующих, входящих) |
| callCount | Количество исходящих звонков |
| connectCount | Количество существующих подключений |
| ringCount | Количество входящих звонков |

#### TelLinks
Точки данных, перечисленные ниже, отформатированы как ссылки, так что соответствующий номер может быть выбран по ссылке (например, через виджет в VIS):

| **точка данных** | **Описание** |
|-------------------------|----------------------------------------------|
| callLastNumberTel | Последний входящий звонок |
| ringLastMissedNumberTel | Последний пропущенный звонок |
| ringLastNumberTel | Повторный набор, последний набранный номер телефона |

### Канал cdr
Эти точки данных предоставляют информацию в отформатированном виде.
настройки)

| **точка данных** | **Описание** |
|----------------|--------------------------|
| HTML | Последний звонок |
| JSON | |
| missedHTML | Последний пропущенный звонок |
| missedJSON | |
| TXT | Последний звонок |

### История канала
Эти точки данных предоставляют таблицы в отформатированном виде. Передаваемая информация может быть определена в настройках

| **точка данных** | **Описание** |
|-----------------|------------------|
| allTableHTML | |
| allTableJSON | Все звонки |
| allTableTxt | |
| missedTableHTML | Пропущенные звонки |
| missedTablejSON | |

### Канальная система
| **точка данных** | **Описание** |
|----------------|------------------------------------------------------------|
| deltaTime | Время дельты между системным временем ioBroker и Fritzbox в секундах |
| deltaTimeOK | Результат теста (true / false) |

## FAQ
Q: Есть Fritzbox и адаптер TR-064, который также обращается к монитору вызовов FB. В чем различия, нужно ли устанавливать оба адаптера?

A: Адаптер Fritzbox приходит с начальной фазы и из возможной информации маршрутизатора делает только доступные данные о соответствующих вызовах.

TR-064 можно считать дальнейшим развитием, поскольку этот адаптер предлагает гораздо более обширную информацию, например, об устройствах, зарегистрированных в ФБ.

В принципе, достаточно, если установлен один из двух адаптеров. Однако, поскольку многие давние пользователи используют адаптер FB и построили на нем свою визуализацию, он остается доступным, но больше не разрабатывается.

Новичкам рекомендуется установить [TR-064 адаптер](https://github.com/ioBroker/ioBroker.docs/tree/master/docs/adapterref/docs/iobroker.tr-064/de).

## Changelog
### 0.3.1 (2016-07-24)
* (BasGo) enhanced TR-064 configuration
* (BasGo) added rudimentary phonebook download into object store

### 0.3.0 (2015-06-26)
* (UncleSamSwiss) added support for wlan.enabled (using TR-064)

### 0.2.1 (2015-06-28)
* (ruhr) more configuration options

### 0.2.0 (2015-06-26)
* (ruhr)

## License

The MIT License (MIT)

Copyright (c) 2015, ruhr70

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