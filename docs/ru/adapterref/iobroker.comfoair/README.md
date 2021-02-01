---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: LTfi9mFuDSsjCUQ4ChFSb+pQMDe+6XevF7mLBrqeslo=
---
![Логотип](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Количество установок](http://iobroker.live/badges/comfoair-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# IoBroker.comfoair
Адаптер ioBroker для систем вентиляции Zehnder Comfoair CA (например, ComfoAir CA350, НЕ ComfoAir Q350 ...).

## Подключение
### По IP / LAN
Используйте преобразователь RS232 в LAN или WiFi для подключения ioBroker к вашему Zehnder Comfoair.
Установите оборудование для TCP - подключение к comfoair: т.е. RS232 - адаптер LAN к последовательному интерфейсу comfoair. Подключите только контакты 2, 3 и 5 (также должны работать с TX, RX и GND - контакты соединения cc-Ease тоже).

### ПОСЛЕДОВАТЕЛЬНОЕ СОЕДИНЕНИЕ
Подключите последовательный интерфейс вашего comfoair к последовательному интерфейсу устройства, на котором работает ioBroker. То есть используйте кабель RS232toUSB или адаптер RS232toTTL для подключения к выводам Raspberry Pis UART.

## Конфиг
Выберите предпочтительный режим соединения (IP или последовательный), установите comfoair - IP-адрес и порт или укажите свое последовательное устройство, определите режим comfoair соединения (RS232) (см. «Адаптер и CC Ease») и определите интервал опроса.

## Адаптер и удобство CC
Как правило, не рекомендуется отправлять данные с двух передатчиков на один приемник по последовательной связи RS232. Параллельное использование CCEase и адаптера может привести к ошибкам или, в худшем случае, к повреждению вашего comfoair-control! Поэтому, когда вы запускаете ComfoAir - адаптер, ваш CC Ease должен быть отключен или будет выключен.
Сам comfoair знает 4 различных режима rs232: CCEaseonly, PConly, PCMaster, PCLogmode. В PConly и PCMaster CC-Ease отключена.
В instance-config вы можете выбрать один из следующих режимов подключения. Отметьте только одно из них! Когда адаптер работает только в адаптере или в параллельном режиме, вы можете переключить режим rs232 в comfoair (что не рекомендуется, потому что для определенного режима подключения требуется определенный режим rs232!).

### Только адаптер
CC Ease отключен (рекомендуется) или будет отключен при запуске адаптера, вы можете управлять своим comfoair только с помощью ioBroker (rs232mode - это PCMaster). Этот режим используется по умолчанию и рекомендуется.

### Только прослушивание
Адаптер улавливает данные, отправленные из comfoair или CC Ease. CC Ease запущен, с адаптера нельзя отправлять команды. В этом режиме вы получаете только базовый набор значений (температуры, состояния вентиляции). В этом режиме также нет риска ошибок / повреждений связи, потому что нет связи от адаптера к comfoair.

### Параллельный режим
CC Ease и адаптер работают. Для comfoiar rs232mode установлено значение «PCLogmode». Адаптер «прослушивает» основные значения (температуры, уровни вентиляции) и опрашивает другие (ошибки, таймер фильтра). Установите увеличенный интервал опроса, чтобы снизить риск ошибок связи. Вы можете управлять своим ComfoAir с помощью ioBroker и CC Ease. Перед отправкой команды (включая опрос) режим rs232 переключается на PC Master. С каждой отправленной командой также выполняется опрос. Тесты показали безошибочность - параллельная работа в течение более длительного периода времени. Но: Вы запускаете этот режим на свой страх и риск.

### Параллельный режим в постоянном режиме журнала ПК
Некоторые пользователи положительно оценили постоянную работу comfoair в режиме PC-Log. Этот режим имеет те же функции, что и режим «Только адаптер», но с запущенным CC Ease. Но: Вы запускаете этот режим на свой страх и риск.

## Использование адаптера
Значения вашего комфорта должны быть видны в канале «статус» и «температура». Обновите объекты - просмотр после изменения режима подключения.

Устанавливая / изменяя значения в «контрольном» канале, вы управляете своей комфортной вентиляцией. Все значения в «контрольном» канале должны быть установлены с ACK = false, чтобы их можно было распознать как команды для адаптера.

Boostmode: установите время разгона и начните. По истечении времени наддува вентиляция вернется на предыдущий уровень. Возврат отменяется, если уровень вентиляции изменяется во время наддува.

Проверено на comfoair CA350.

## Changelog

### 1.1.3

-   boostmode added

### 1.1.2

-   adapter - internal filter-h counter added

### 1.1.1

-   Periodical self-test with restart in case of fail added

### 1.1.0

-   displays now working hours of different ventilation levels, preheating, bypass and frost-protection.

### 1.0.0

-   offers now the possibility of a direct serial connection besides the connection over IP/LAN.

### 0.3.2

-   Bypass - error bug fixed.

### 0.3.1

-   new connection mode: parallel in constant PC-Logmode.

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

-   bugfix set vent levels.

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

Copyright (c) 2021 forelleblau marceladam@gmx.ch

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