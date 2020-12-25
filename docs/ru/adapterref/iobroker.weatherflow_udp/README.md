---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weatherflow_udp/README.md
title: Weatherflow UDP
hash: yxgr2MEMcXFzQZVMqmC5+baOM6kYCy8UA0/+Jotrft4=
---
![Логотип](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.weatherflow_udp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weatherflow_udp.svg)
![Количество установок (последнее)](http://iobroker.live/badges/weatherflow_udp-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![Статус зависимости](https://img.shields.io/david/woessmich/iobroker.weatherflow_udp.svg)
![Известные уязвимости](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![NPM](https://nodei.co/npm/iobroker.weatherflow_udp.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/woessmich/ioBroker.weatherflow_udp/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/woessmich/ioBroker.weatherflow_udp?branch=master&svg=true)

# Weatherflow UDP
** Тесты: **

## Адаптер weatherflow_udp для ioBroker
Приемник Weatherflow UDP Адаптер для приема и анализа [Сообщения UDP] (https://weatherflow.github.io/Tempest/api/udp/v143/) с интеллектуальных метеостанций [Weatherflow] (www.weatherflow.com), таких как [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/).
Адаптер также должен уметь анализировать старые станции, такие как «Air» и «Sky» (но это не проверено).
Стандартный порт, который прослушивает adpater, - 50222, но его можно изменить в настройке.

## Настройки
Адаптер предоставляет минимальный набор параметров настройки.
Порт прослушивания может быть изменен, что не требуется, поскольку порт, отправляемый концентратором метеостанции, не может быть изменен, насколько мне известно.

Высота станции в метрах над уровнем моря используется для расчета пониженного давления на основе местного давления, предоставляемого станцией. Просто используйте ту же высоту, что и в приложении. В зависимости от используемой формулы могут быть небольшие отличия от значения пониженного давления в приложении. Адаптер использует формулу, которую использует немецкий погодный сервис DWD (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [его](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)).

Когда установлен флажок отладки, адаптер создает большой объем вывода в файле журнала. Следует использовать только для отладки.

## Данные и состояния по погодным потокам
Адаптер предоставляет все параметры, которые отправляются по протоколу UDP. Состояния отображаются в дереве под идентификатором концентратора и станции. <b>Внимание</b> : при отправке данных в базы данных для долгосрочного архивирования следует использовать псевдонимы для состояний, чтобы не потерять серию, если блок нуждается в замене. Есть некоторые отличия от того, что предоставляет Tempest-App, поскольку приложение возвращает уже обработанные данные с серверов weatherflow. При достаточном заряде батареи данные &quot;device_status&quot; и &quot;obs_st&quot; обновляются каждую минуту, &quot;rapid_wind&quot; обновляется каждые 3 секунды. «evt_precip» и «evt_strike» обновляются (и создаются) только тогда, когда они происходят. &quot;hub_status&quot; обновляется каждые 10 секунд. Значения, рассчитанные станцией и адаптером (см. Ниже), создаются только при получении или сроке для расчета. Это означает, что может потребоваться до 24 часов, чтобы увидеть все, кроме событий начала дождя и удара молнии, которые могут появиться через несколько дней, недель, месяцев ;-)

## Расчетные состояния адаптера
В дополнение к данным, предоставленным системой, адаптер вычисляет некоторые дополнительные данные, все из которых имеют суффикс имени «адаптер вычислен»:

- Средний ветер, порывы и затишье в [Бофорте] (https://en.wikipedia.org/wiki/Beaufort_scale)
- точка росы рассчитывается исходя из температуры и влажности
- похоже на температуру, рассчитанную на основе температуры, влажности и среднего ветра. В зависимости от температуры и ветра, температуры или влажности отображается либо только температура воздуха, либо [холодный ветер] (https://en.wikipedia.org/wiki/Wind_chill) или [индекс тепла] (https://en.wikipedia. org / wiki / Heat_index).
- Количество и продолжительность осадков, а также [продолжительность солнечного сияния] (https://en.wikipedia.org/wiki/Sunshine_duration) (> = 120 Вт / м2) указаны для текущего и прошедшего часа, а также сегодня и вчера. Использование предыдущего часа и вчерашнего дня позволяет легко сохранять данные в базе данных об изменении значений.
- Интенсивность осадков представлена по этой шкале: нет (0): 0 мм / час; очень легкий (1):> 0, <0,25 мм / час; свет (2): ≥ 0,25, <1,0 мм / час; умеренный (3): ≥ 1,0, <4,0 мм / час; тяжелые (4): ≥ 4,0, <16,0 мм / час; очень тяжелые (5): ≥ 16,0, <50 мм / час; крайний (6):> 50,0 мм / час
- Дождь также отображается как логическое состояние (истина, ложь) в команде gap_evt. Будет установлено значение true, если получено событие об осадках и если значение осадков> 0. Через 3 минуты он сбрасывается, если дождь больше не идет
- Солнечный свет также отображается как логическое состояние: истина, если> = 120 Вт / м2, и ложь, если меньше.
- Направление ветра в кардинальных буквах (NSWE), рассчитанное по направлению ветра в градусах.

Далее в адаптере предусмотрена подборка полезных минимальных и максимальных значений параметров на сегодня и вчера.

- sensor_status в виде текста, чтобы легко увидеть, какой датчик (и) вышел из строя, если это произойдет.
- Из битов sensor_status извлекается режим мощности (экспериментальный)

## Расстояние до молнии
Протокол отправляет молнию на расстоянии 0, если молния не обнаружена. Значения 0 изменены на 999, чтобы избежать впечатления, что удары молнии находятся прямо над головой.

## Changelog
### 0.0.11
* (womi) Corrected more programming issues from review
### 0.0.10
* (womi) Corrected programming issues from review
### 0.0.9
* (womi) Assigned roles to states; fixes for status 'latest'
### 0.0.8
* (womi) Corrected rain accumulation/duration; added precipitation intensity; added experimental power mode; added raining and sunshine as boolean states
### 0.0.7
* (womi) Updated parts of adapter calculated data structure, added last message per message type instead of one for all; corrected calculation of feels like temperature
### 0.0.6
* (womi) initial release after testing with real tempest

## License
MIT License

Copyright (c) 2020 womi <woessmich@gmail.com>

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