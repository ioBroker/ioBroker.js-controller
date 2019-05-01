---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: McBL6uZfelQ6fqPbZ7Rurv923UGe0gX3ayTNf29shsI=
---
![логотип](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Количество установок](http://iobroker.live/badges/comfoair-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# IoBroker.comfoair
Адаптер ioBroker для Zehnder Comfoair 'CA' -вентиляций (то есть ComfoAir CA350, НЕ ComfoAir Q350 ...)

Чтобы использовать этот адаптер, вам понадобится конвертер RS232 в LAN или WiFi, чтобы подключить ioBroker к вашему Zehnder Comfoair.
Установите оборудование для TCP-соединения с comfoair: то есть адаптер RS232-LAN к последовательному интерфейсу comfoair. Подключайте контакты 2, 3 и 5 только (должны работать также с TX, RX и GND - контакты соединения cc-Ease тоже).
На самом деле этот адаптер работает только с LAN-подключением. Прямая связь, основанная на прямом последовательном соединении, находится в стадии разработки.

Установите адаптер, создайте экземпляр.

## Config
Установите comfoair - IP-адрес, порт и опрос - intervall.

## Адаптер и простота CC
В общем случае не рекомендуется отправлять данные от 2 передатчиков на один приемник в последовательной связи RS232. Параллельное использование CCEase и адаптера может привести к ошибкам или, в худшем случае, к повреждению вашего comfoair-control! Поэтому, когда вы запускаете ComfoAir-адаптер, ваш CC Ease shold будет отключен или будет отключен.
Сам Comfoair знает 4 различных режима rs232: CCEaseonly, PConly, PCMaster, PCLogmode. В PConly и PCMaster функция CC-Ease отключена.
В экземпляре config вы можете выбрать один из следующих режимов подключения. Пожалуйста, отметьте только один из них! Когда адаптер работает только в адаптере или в параллельном режиме, вы можете переключать режим rs232 comfoair (что не рекомендуется, поскольку для определенного режима подключения требуется определенный режим rs232!).

### Только адаптер
CC Ease отключен (рекомендуется) или будет выключен при запуске адаптера. Вы можете управлять comfoair только с помощью ioBroker (rs232mode - PCMaster). Этот режим по умолчанию и рекомендуется.

### Только прослушивание
Адаптер ловит данные, отправленные с comfoair или CC Ease. CC Ease работает, команды не могут быть отправлены с адаптера. В этом режиме вы получаете только базовый набор значений (температуры, состояния вентиляции). В этом режиме также нет риска ошибок / повреждений связи, потому что нет связи от адаптера к comfoair.

### Параллельный режим
CC Ease и адаптер работают. comfoiar rs232mode установлен в «PCLogmode». Адаптер «прослушивает» базовые значения (температуры, уровни вентиляции) и опрашивает других (ошибки, таймер фильтра). Установите расширенный интервал опроса, чтобы уменьшить риск ошибок связи. Вы можете управлять своим ComfoAir с помощью ioBroker и с помощью модуля CC Ease. Перед отправкой команды (включая опрос) режим rs232 переключается на PC Master. С каждой отправленной командой также выполняется опрос. Тесты показали безошибочную работу в параллельном режиме в течение более длительного периода времени. Но: Вы запускаете этот режим на свой страх и риск.

### Параллельный режим в постоянном режиме PC-log
Некоторые пользователи получили положительный опыт постоянного запуска comfoair в PC-Logmode. Этот режим имеет те же функциональные возможности, что и режим «Только адаптер», но с запущенным CC Ease. Но: Вы запускаете этот режим на свой страх и риск.

## Использование адаптера
Значения вашего comfoair должны быть видны в «статус» и «температуры» канала. Пожалуйста, обновите объекты - просмотр после изменения режима подключения.

Устанавливая / изменяя значения в канале «control», вы управляете вентиляцией comfoair. Все значения в канале 'control' должны быть установлены с ACK = false, чтобы распознаваться как команды для адаптера.

Проверено на comfoair CA350.

## Changelog

### 0.3.1

-   new connection mode: parelell in constant PC-Logmode.

### 0.3.0

-   new connection modes, i.e. 'listening only', selftest-function and setting filter-timer added.

### 0.2.1

-   smaller bugfixes.

### 0.2.0

-   New rs232 - Modes, reading enthalpie-values, handling connection-errors.

### 0.1.4

-   README-Update 'NO PARALLEL USE', discard 'Safe-Mode'.

### 0.1.3

-   RS - 232 interface: manual- or safe - mode possible.

### 0.1.2

-   ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfig set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2019 forelleblau marceladam@gmx.ch

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