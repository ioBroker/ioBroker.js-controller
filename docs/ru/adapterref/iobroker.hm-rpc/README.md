---
lastChanged: 09.01.2019
local: true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hm-rpc/README.md
title: HomeMatic RPC
hash: 1O7kQJdss1SQKcqoLSdzCOhUQWxAXD2BjOmS727c/E4=
---
![логотип](../../../de/adapterref/iobroker.hm-rpc/media/homematic.png)

# HomeMatic RPC
## Homematic
> Homematic - это система умного дома eQ-3, которая обеспечивает полный контроль над широким спектром функций, от сценариев (от простых до сложных) в доме или квартире.

&gt; Устройства включают продукты для управления освещением, рольставнями и обогревом, детекторы опасности, датчики безопасности и продукты для измерения погодных данных. Радиосвязь упрощает модернизацию. В новых зданиях могут использоваться компоненты проводной шины. <a href="https://www.eq-3.de/produkte/homematic.html" title="Домашняя страница производителя eQ3">источник</a>

## Администрирование и контроль компонентов homematic с помощью ioBroker
Для оптимального управления и контроля компонентов homematic с помощью ioBroker требуются два адаптера:

### 1. Homematic ReGaHss
Этот адаптер подключается к гомематическому логическому слою "ReGaHSS" (** Re **sidential** Gateway).
Он синхронизирует реальные имена, системные переменные, комнаты, сделки и программы между Homematic и ioBroker.

### 2. Homematic RPC
** R ** emote ** P ** rocedur ** C ** all, RPC для краткости - это метод реализации межпроцессного взаимодействия. Этот адаптер обеспечивает подключение к коммуникационным модулям центрального блока homematic (CCU / CCU2 / CCU3 ...). Поддерживаются модули rfd (радио), HMIP-rfd, hs485d (проводной), CuxD (дополнительное программное обеспечение для подключения внешних компонентов, таких как EnOcean, FS20 и т. Д.) И Homegear (замена CCU).

Эта диаграмма иллюстрирует структуру и интерфейсы связи:

![](../../../de/adapterref/iobroker.hm-rpc/media/Homematic_Aufbau.png)

[источник](http://www.wikimatic.de/wiki/Datei:Homematic_Aufbau.png)

## Адаптер Homematic RPC
Этот адаптер обеспечивает подключение к коммуникационным модулям центрального блока homematic (CCU / CCU2 / CCU3 ...). Экземпляр адаптера отвечает только за включенные модули (RFD, проводной и т. Д.). Если несколько модулей должны поддерживаться параллельно, для каждого модуля должен быть установлен отдельный экземпляр.

Адаптер связывается с соответствующим модулем через BIN-RPC или XML-RPC. Поскольку используется интерфейс событий, правильная адресация важна. Таким образом, события автоматически передаются на адаптер, и циклический опрос не требуется.

Кроме того, адаптер имеет функции для циклического контроля подключения к CCU.

Если новые устройства обучаются в CCU, то адаптер должен быть перезапущен с конфигурацией «Инициируйте новые устройства (один раз)». Это позволит передать информацию с новых устройств homematic на адаптер.

## Конфигурация
### Основные настройки
### HomeMatic address
IP-адрес CCU или хоста, на котором запущен сервис Homematic BidCos.

### HomeMatic Port
Настройка порта зависит от требуемого модуля связи, вводится автоматически при выборе демона и должна изменяться только в том случае, если порты отличаются от стандартных.

По умолчанию предоставляются следующие порты:

| Модуль связи | Стандартный порт | Порт HTTPS |
|---------------------|--------------|------------|
| Радио (RFD) | 2001 | 42001 |
| Проводной | 2000 | 42000 |
| CUxD | 8701 | \ - |
| Homematic IP | 2010 | 42010 |

### Демон
CCU / Homematic поддерживает различные типы устройств (проводные, беспроводные, HMIP, CUxD). Для каждого типа должен быть создан отдельный экземпляр.

### Протокол
Для связи предусмотрено два протокола: XML-RPC и BIN-RPC.

* CUxD требует протокола BIN-RPC; HMIP и RFD протокол XML-RPC. *

### Синхронизировать устройства снова (один раз)
При первом запуске адаптера все устройства считываются. Если позже в CCU будут сделаны изменения (переименование устройств, добавление новых устройств и т. Д.), Активируйте этот выбор и перезапустите адаптер с помощью «Сохранить и закрыть».

### Адрес адаптера
Выпадающее меню выбирает IP хоста, на котором установлен адаптер. Выбор «0.0.0.0 Listen to all IPs» и «127.0.0.1» зарезервирован для особых случаев.

### Порт адаптера
По умолчанию порт «0» установлен здесь для автоматического выбора порта ioBroker и должен изменяться только в исключительных случаях.

## Дополнительные настройки
### Адрес обратного вызова адаптера
Если ioBroker работает за маршрутизатором (например, в контейнере Docker), адреса входа и выхода могут отличаться. Если здесь введен IP-адрес маршрутизатора, проблемы можно избежать, поскольку маршрутизатор переходит к пересылке в ioBroker.

### Интервал проверки соединения (сек)
С заданным интервалом запрос проверки связи отправляется в CCU.

### Интервал повторного подключения (сек)
Время, после которого начинается новая попытка подключения.

### Не удалять устройства
По умолчанию устройства также удаляются из списка объектов, если они были изучены в CCU. Чтобы сохранить эти устройства в списке объектов, например, потому что они были только временно удалены, эту опцию можно активировать.

### Использовать HTTPS
Если эта опция активирована, защищенное соединение установлено.
Работает только с протоколом XML-RPC.

### Имя пользователя и пароль
При использовании HTTPS или если API CCU требует аутентификации, данные должны быть введены здесь.

## Экземпляр
![пример](../../../de/adapterref/iobroker.hm-rpc/media/10d34a2bc1518fa34233bdb04219e444.png)

В разделе *Экземпляры* ioBroker вы найдете установленный экземпляр адаптера. Слева светофорная система визуализирует, активирован ли адаптер и подключен ли он к CCU.

Если вы поместите указатель мыши на символ, вы получите подробную информацию.

## Объекты адаптера
В области «Объекты» все значения и информация, передаваемые блоком управления в адаптер, отображаются в виде древовидной структуры.

Отображаемые объекты и значения зависят от устройств (функции и каналов) и структуры внутри CCU.

Панель управления помечена идентификатором BidCoS-RF (который включает в себя все виртуальные ключи), устройства создаются под их серийным номером, а группы помечены INT000000 *x*

### Канал 0 (все устройства)
Этот канал создается для каждого устройства и содержит функциональные данные после краткого обзора:

| *Точка данных* | *Значение* |
|--------------------------------|--------------------------------------------------------|
| AES_Key | Зашифрованная активация активная / неактивная |
| Config (Ожидание / Ожидание тревоги) | В ожидании конфигурации |
| Dutycycle / Dutycycle Alarm | Airtime Homematic Devices |
| RSSI (Device / Peer) | Радиосила (устройство \ <-> Центральная) |
| Low Bat / Low Bat Alarm | низкий заряд батареи |
| Липкая недостижимая / недоступная тревога | Ошибка связи с системным сообщением (произошла ошибка) |
| Достигнуть / Достигнуть тревоги | Ошибка связи системного сообщения (текущее состояние) |

### Каналы 1-6
Здесь перечислены измеренные значения, данные управления и состояния; в зависимости от функции устройства отображаются разные данные. Вот короткая выдержка:

| *Функция* | *Канал* | *Возможные значения* |
|-------------------------|---------|-----------------------------------------------------------|
| Датчики | 1 | Температура, влажность, уровень, условия открытия и т. Д. |
| Нагревательные термостаты | 4 | Режимы работы, заданная / фактическая температура, положение клапана и т. Д. |
| Приводы | 1 | Уровень (рольставни, диммеры), направление движения (рольставни) и т. Д. |
| Приборы с измерительной функцией | 3 | Статус |
| | 6 | Расходомер, напряжение, мощность и т. Д. |

## FAQ

## Changelog
### 1.14.3 (2020-05-18)
* (foxriver76) catch edge case error if row.value has no native 

### 1.14.2 (2020-04-24)
* (foxriver76) catch errors on rpc client creation

### 1.14.1 (2020-04-23)
* (foxriver76) catch potential errors on createServer
* (foxriver76) new meta data approach: we only store meta data gathered by the user,
otherwise cached meta data can be very old and outdated, we have to monitor performance
of this approach (more requests to CCU on first setup)
* (foxriver76) add name and icon to meta folder
* (foxriver76) minor code improvements

### 1.13.0 (2020-04-02)
* (foxriver76) sentry plugin support

### 1.12.10 (2020-03-05)
* (foxriver76) fixed no 'dpType for ..' error in all cases

### 1.12.9 (2020-02-29)
* (foxriver76) replace DISPLAY_DATA_STRING by DIN_66003 encodings

### 1.12.8 (2020-02-26)
* (foxriver76) improved error handling on undefined methods

### 1.12.7 (2020-02-16)
* (foxriver76) if role "value.window" is a boolean it is now correctly a "sensor.window"

### 1.12.6 (2020-01-08)
* (foxriver76) make all LEVEL dps of unit % if they are w.o. unit and have min/max

### 1.12.5 (2020-01-06)
* (foxriver76) handle some meta data more abstract
* (foxriver76) make DIMMER_REAL.LEVEL of unit '%' even it is not by definition

### 1.12.2 (2019-12-19)
* (foxriver76) fix issue on https with less robust ccu emulations

### 1.12.1 (2019-12-06)
* (foxriver76) fixed problem with max values of value lists

### 1.12.0 (2019-12-05)
* (foxriver76) no longer use adapter.objects
* (foxriver76) js-controller v > 2 required

### 1.11.1 (2019-11-20)
* (foxriver76) LOCK.OPEN is now of type button to prevent misunderstandings

### 1.11.0 (2019-11-10)
* (foxriver76) make OFFSET and REPEATS of epaper configurable
* (foxriver76) EPAPER_SIGNAL is now type string

### 1.10.3 (2019-10-27)
* (foxriver76) fixed info channel

### 1.10.2 (2019-10-24)
* (foxriver76) replace min max values of hmip with correct numbers 

### 1.10.0 (2019-08-12)
* (foxriver76) new meta data handling procedure
* __js-controller >= 1.4.2 required__

### 1.9.17 (2019-08-04)
* (foxriver76) handle meta values with max 1.01 as 1

### 1.9.16 (2019-07-18)
* (foxriver76) no longer use adapter.objects if not necessary
* (foxriver76) added meta data

### 1.9.15 (2019-07-01)
* (foxriver76) added meta and icon for HB-UNI-Sen-CAP-MOIST
* (foxriver76) fix type of EPAPER_TONE to string

### 1.9.14 (2019-06-29)
* (foxriver76) small bug fix for HM-Dis-EP-WM55
* (foxriver76) catch async errors on bin-rpc connection

### 1.9.13 (2019-06-03)
* (foxriver76) fixed bug where some meta values where stored in the wrong index

### 1.9.12 (2019-05-27)
* (foxriver76) fix maintenance channel of HM-Dis-EP-WM55
* (foxriver76) meta data added

### 1.9.11 (2019-04-21)
* (foxriver76) create OPERATING_VOLTAGE with unit V
* (foxriver76) create RSSI_* with unit dBm

### 1.9.10 (2019-04-12)
* (foxriver76) fix meta
* (foxriver76) added new meta data

### 1.9.9 (2019-03-17)
* (foxriver76) window states are now role `value.window`

### 1.9.8 (2019-02-27)
* (foxriver76) fixes for epaper line and icon type
* (foxriver76) metas added

### 1.9.7 (2019-02-13)
* (foxriver76) added metas
* (foxriver76) when max is 1.005 then set max to 1

### 1.9.6 (2019-02-02)
* (foxriver76) fix meta for virtual devices

### 1.9.5 (2019-01-29)
* (foxriver76) ignore alarm states because handled by rega

### 1.9.4 (2019-01-26)
* (foxriver76) added image
* (foxriver76) removed homematic path from ui

### 1.9.3 (2019-01-25)
* (foxriver76) added meta data

### 1.9.2 (2019-01-14)
* (foxriver76) added chinese
* (foxriver76) minor optimizations

### 1.9.1 (2019-01-08)
* (foxriver76) fix compact mode

### 1.9.0 (2019-01-07)
* (foxriver76) adding custom commands to documentation and logging
* (Holuba & foxriver76) fixes for virtual devices API
* (bluefox) enabling compact mode
* (marvingrieger) adjusting HmIP shutters to a max value of 1

### 1.8.3 (2019-01-04)
* (foxriver76) fixing dependency

### Older entries
[here](OLD_CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>

Copyright (c) 2014 hobbyquaker

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