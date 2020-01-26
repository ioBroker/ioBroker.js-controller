---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.digitalstrom/README.md
title: ioBroker.digitalstrom
hash: s2n0zU09+s3oPtTs4nWMfeTPXXlhP8veObmZYbcTZMo=
---
![логотип](../../../en/adapterref/iobroker.digitalstrom/admin/digitalstrom.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.digitalstrom.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.digitalstrom.svg)
![Количество установок (последняя)](http://iobroker.live/badges/digitalstrom-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/digitalstrom-stable.svg)
![Статус зависимости](https://img.shields.io/david/Apollon77/iobroker.digitalstrom.svg)
![Известные уязвимости](https://snyk.io/test/github/Apollon77/ioBroker.digitalstrom/badge.svg)
![NPM](https://nodei.co/npm/iobroker.digitalstrom.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/Apollon77/ioBroker.digitalstrom/master.svg)

# IoBroker.digitalstrom
** Этот адаптер использует библиотеки Sentry, чтобы автоматически сообщать об исключениях и ошибках кода и новых схемах устройств мне как разработчику. ** Подробнее см. Ниже!

## Адаптер Digitalstrom для ioBroker
Поддержка устройств Digitalstrom через DSS

## Установка
Пожалуйста, установите адаптер через интерфейс администратора как обычно.

Как только адаптер будет официально выпущен, он будет в репо и будет доступен для выбора.

На этапе тестирования или для тестирования более новых версий (см. Соответствующие темы на форуме) вы также можете установить адаптер непосредственно из GitHub, используя https://github.com/ioBroker/ioBroker.digitalstrom в качестве URL-адреса. Пожалуйста, используйте опцию Admin "Custom Install" для этого.

## Использование
После установки адаптера и создания экземпляра появится диалоговое окно администратора.
Прежде всего, вам нужно ввести свой DSS IP / Hostname. Затем вы можете выбрать, если вы уже вручную создали токен приложения в веб-интерфейсе DSS или нет.
Если у вас нет токена приложения, просто введите имя пользователя и пароль, чтобы автоматически получить токен приложения.

В дополнение к настройкам аутентификации (см. Выше) вы можете отредактировать следующие настройки в соответствии со своими потребностями:

* **Интервал опроса данных** это интервал, когда данные «Счетчика энергии» запрашиваются с ваших устройств DSM. По умолчанию 60-х годов. Вы можете установить 0, если вы не хотите опрашивать данные Engerymeter.
* **Использование предустановленных значений сцены** Система Digitalstrom на самом деле не рассчитана на постоянную доступность реальных выходных значений устройств и работает в основном со сценами. Для Light и Shader / Blinds некоторые выходные значения определены для многих доступных сцен. Адаптер знает их, и когда этот параметр активен, он попытается найти эти значения при запуске сцены и установить эти значения непосредственно в состояния. Реальные значения запрашиваются с задержкой. Этот метод может выдавать неправильные значения, когда локальные приоритеты установлены / используются!
* **Активно запрашивать выходные значения устройства** адаптер инициализирует все выходные значения устройства при запуске, а также после сцен, действующих на устройство. Есть задержки, но на самом деле все эти сообщения будут передаваться по шине Digitalstrom. Если это проблематично для вас, вы можете попробовать отключить эту функцию.

После предоставления токена приложения и сохранения настроек адаптер автоматически перезагрузится.

Когда данные верны, адаптер считывает структуру квартиры и устройства и создает их как объекты ioBroker. Это может занять некоторое время (в зависимости от количества устройств и этажей / зон / групп и производительности вашей системы несколько секунд). Пожалуйста, будьте терпеливы. И я действительно имею в виду это так ... Несколько тысяч объектов легко добраться здесь! Дайте время адаптеру, пожалуйста!

После этого адаптер подписывается на несколько событий DSS, чтобы получать уведомления о действиях в системе.

Индикатор состояния адаптера загорится зеленым, и вы увидите «Подписан на состояния ...» в виде журнала информации. После этого все готово, и вы можете, например:

* установить / отменить сцены для квартиры, зон, групп или устройств
* читать состояние и значения датчика; для зон также можно задавать значения датчика
* см. значения для двоичных входов, датчиков, кнопок и выходов

## Состояние и структура объекта
Адаптер предоставляет две структуры данных. Структура квартиры с этажами, зонами (комнатами) и группами, а также структура цепей / dSM и подключенных устройств с их подробными данными.

В структуры включены несколько «типов» данных:

* Сцены: Сцены реализованы в виде переключателей. Установка значения tro «true» отправит команду «callScene» для этой сцены. Значение «false» отправит команду «undoScene» для этой сцены - сервер DSS должен решить, является ли «undo» допустимой командой! Когда callScene или undoScene запускается как событие от сервера DSS, соответствующая сцена устанавливается на «true» или «false» с ack = true
* Состояния: состояния из системы и пользовательские состояния через аддон отображаются и доступны только для чтения.
* Значения датчика обновляются при срабатывании события и могут частично также делать ставку на изменение - изменения отправляют «pushSensorValue» на сервер, и он остается на сервере, если значение принято! Это в основном относится к значениям температуры или влажности

*

### Квартирный объект и состояния
![Квартира Объекты](../../../en/adapterref/iobroker.digitalstrom/img/dss-apartment.png)

Для квартиры создается структура с «полом». «Зона» со следующими подструктурами внутри:

* для каждой группы устройств создается подпапка, включающая доступные групповые сцены
* сцены для этой зоны
* государства для этой зоны
* значения датчика для этой зоны

На уровне квартиры все группы устройств доступны со своими сценами.

На уровне квартиры также включены датчики (также наружные значения), состояния и состояния пользователей.

### Устройства объекты и состояния
![Устройства Объекты](../../../en/adapterref/iobroker.digitalstrom/img/dss-devices.png)

Устройства структурированы с использованием «circuit / dSM». «DeviceID», а внутренняя структура включает в себя:

* Сцены устройства, будут сработать только для этого устройства
* Датчики устройства, когда сообщается из системы. Значения могут быть пустыми
* Выходные значения (например, состояние / яркость для источников света и положение / угол для оттенков / жалюзи) расположены непосредственно под устройством. Пока только Lights и Shades / Blinds будут иметь определенную функциональность.
* Кнопки и двоичные входы также будут представлены состояниями и доступны только для чтения.

## Известные проблемы / Эффекты проектирования системы
* Система DSS в основном работает с использованием сцен, а не через значения реальных устройств, а также получение реальных значений происходит очень медленно, потому что их нужно выбирать через шину.
* Значения могут быть пустыми, если они не были сообщены системой
* Двоичные входы были реализованы «слепыми», точно знаю, потому что у меня нет таких устройств. Так что я рад получить некоторые журналы / отчеты с бинарными устройствами ввода :-)
* Значимое чтение и запись выходных значений реализовано только для устройств Ligh (желтый) и Shade / Blind (серый).
* До сих пор у меня не было шансов проверить, как система ведет себя с виртуальными постоянными компьютерами. Поэтому мне нужны журналы и подробности здесь, чтобы добавить его
* Вентиляция и управление температурой / устройства также не полностью реализованы ... что здесь имеет смысл?

## Как сообщать о проблемах и пожеланиях
Пожалуйста, используйте проблемы GitHub для этого.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Тогда, пожалуйста, получите файл журнала с диска (подкаталог «log» в каталоге установки ioBroker, а не от Admin, потому что Admin обрезает строки). Если вам не нравится предоставлять его в GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Пожалуйста, добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале в какое время.

## Что такое Sentry и что сообщается на серверы?
Sentry.io позволяет разработчикам получить обзор ошибок в своих приложениях. И именно это реализовано в этом адаптере.

Когда происходит сбой адаптера или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в мой собственный Sentry, размещенный в Германии. Когда вы разрешили iobroker GmbH собирать диагностические данные, включался и ваш установочный идентификатор (это просто уникальный идентификатор **без** каких-либо дополнительных сведений о вас, адрес электронной почты, имя или тому подобное). Это позволяет Sentry группировать ошибки и показывать, на сколько уникальных пользователей влияет такая ошибка. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не выходят из строя.

## Changelog

### 0.5.2 (2020-01-26)
* (Apollon77) fix smaller errors
* (Apollon77) send Sentry reports to own server

### 0.5.0 (2020-01-19)
* (Apollon77) add buttons for more device types (also vDC) and try to detect button triggers

### 0.4.10 (2020-01-19)
* (Apollon77) state changes added
* (Apollon77) Fixed shade position control

### 0.4.9 (2020-01-18)
* (Apollon77) add unknown weather sensor "windgust"
* (Apollon77) change handling of Input types
* (Apollon77) Fix controlling of shaders 

### 0.4.7 (2020-01-17)
* (Apollon77) fix error when writing vdc output values

### 0.4.6 (2020-01-17)
* (Apollon77) fix missing datatypes for some states (mainly sensors and output values)

### 0.4.5 (2020-01-17)
* (Apollon77) fix error in sentry reporting

### 0.4.4 (2020-01-17)
* (Apollon77) fix error (Sentry IOBROKER-DIGITALSTROM-7)

### 0.4.2 (2020-01-16)
* (Apollon77) fix wrong scene state updates if same scene is triggered twice
* (Apollon77) also trigger scene update for all groups if scene was called on zone or to all zones and groups when done on apartment

### 0.4.1 (2020-01-16)
* (Apollon77) also add basic scenes to room groups

### 0.4.0 (2020-01-15)
* (Apollon77) add userActions as states and allow to trigger the actions

### 0.3.3 (2020-01-15)
* (Apollon77) fixes for scene lists
* (Apollon77) add some special szenes to more groups 

### 0.3.2 (2020-01-14)
* (Apollon77) fixes for adapter start

### 0.3.1 (2020-01-14)
* (Apollon77) fixes
* (Apollon77) make sure to initialize scenes, states and sensors really on startup - values will be overwritten if delivered with ack=true!
* (Apollon77) add all Presets (0-44) to Room/Zone and Group states 
* (Apollon77) also for unknown device types try to initialize output value IF only one is there (assuming it is offset/index 0!) Please check and report back!
* (Apollon77) make some initial processing async to block eventLoop less

### 0.3.0 (2020-01-14)
* (Apollon77) further optimize (lower) delays and timeouts, please give feedback!
* (Apollon77) add "stateId" State for each scenes folder with the scene number. This is updated with the scenes and also controllable.
* (Apollon77) scenes will not be cleared at the beginning and initialized with the "lastSceneId" returned from DSS; initialization may take some seconds longer!
* (Apollon77) update dependencies
* (Apollon77) increase loglevel of some "invalid cases" to warn to better see if they happen
* (Apollon77) fix handling of binaryInput events

### 0.2.2 (2020-01-13)
* (Apollon77) optimize event subscription logic and timeouts (should prevent "error 500 cases", now tries to resubscribe)

### 0.2.1 (2020-01-13)
* (Apollon77) optimize brightness handling
* (Apollon77) optimize error and reconnection handling

### 0.2.0 (2020-01-12)
* (Apollon77) initial official testing release (still GitHub)

### 0.1.x
* (Apollon77) initial release and finalization

## License
MIT License

Copyright (c) 2020 Apollon77 <iobroker@fischer-ka.de>

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