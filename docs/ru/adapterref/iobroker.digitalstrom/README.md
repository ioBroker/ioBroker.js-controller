---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.digitalstrom/README.md
title: ioBroker.digitalstrom
hash: p3HyAOTEgD43/+O9f2a5qnG8WoGMEn0a6EZf18OuRfg=
---
![Логотип](../../../en/adapterref/iobroker.digitalstrom/admin/digitalstrom.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.digitalstrom.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.digitalstrom.svg)
![Количество установок (последнее)](http://iobroker.live/badges/digitalstrom-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/digitalstrom-stable.svg)
![Статус зависимости](https://img.shields.io/david/Apollon77/iobroker.digitalstrom.svg)
![Известные уязвимости](https://snyk.io/test/github/Apollon77/ioBroker.digitalstrom/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.digitalstrom.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/Apollon77/ioBroker.digitalstrom/master.svg)

# IoBroker.digitalstrom
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Адаптер Digitalstrom для ioBroker
Поддержка устройств Digitalstrom через DSS

## Установка
Установите адаптер через интерфейс администратора как обычно.

Как только адаптер будет официально выпущен, он будет в репозитории, и его будет просто выбирать.

На этапе тестирования или для тестирования более новых версий (см. Соответствующие темы форума) вы также можете установить адаптер непосредственно из GitHub, используя https://github.com/ioBroker/ioBroker.digitalstrom в качестве URL-адреса. Для этого используйте параметр «Выборочная установка» администратора.

## Применение
После установки адаптера и создания экземпляра появится диалоговое окно администратора.
Прежде всего вам нужно ввести свой IP-адрес / имя хоста DSS. Затем вы можете выбрать, создали ли вы уже вручную токен приложения в веб-интерфейсе DSS или нет.
Если у вас нет токена приложения, просто введите свое имя пользователя и пароль, чтобы получить токен приложения автоматически.

В дополнение к настройкам аутентификации (см. Выше) вы можете изменить следующие настройки по своему усмотрению:

* **Интервал опроса данных** это интервал, в течение которого данные «Energy Meter» запрашиваются у ваших устройств DSM. По умолчанию 60-е годы. Вы можете установить 0, если не хотите опрашивать данные Engerymeter.
* **Использовать предустановленные значения сцены** система Digitalstrom на самом деле не предназначена для того, чтобы реальные выходные значения устройств были доступны все время, и больше всего работает со сценами. Для Light и Shader / Blinds некоторые выходные значения определены для многих доступных сцен. Адаптер знает их, и когда этот параметр активен, адаптер попытается найти эти значения при запуске сцены и напрямую установить эти значения в состояния. Реальные значения запрашиваются с задержкой. Этот метод может выдавать неверные значения при установке / использовании локальных приоритетов!
* **Активно запрашивать выходные значения устройства** адаптер инициализирует все выходные значения устройства при запуске, а также после сцен, которые являются эффективными для устройства. Есть задержки, но на самом деле все эти сообщения будут проходить по шине Digitalstrom. Если для вас это проблематично, вы можете попробовать отключить эту функцию.

После предоставления токена приложения и сохранения настроек адаптер автоматически перезапустится.

Когда данные верны, адаптер считывает структуру квартиры и устройств и создает их как объекты ioBroker. Это может занять некоторое время (в зависимости от количества устройств и этажей / зон / групп и производительности вашей системы несколько секунд). Пожалуйста, проявите терпение. И я действительно так имею в виду ... Здесь легко добраться до нескольких тысяч объектов! Дайте время адаптеру пожалуйста!

После этого адаптер подписывается на несколько событий DSS, чтобы получать уведомления о действиях в системе.

Индикатор состояния адаптера станет зеленым, и вы увидите «Подписан на состояния ...» в виде информационного журнала. После этого все готово, и вы можете, например:

* установка / отмена сцен для квартиры, зон, групп или устройств
* читать состояние и значения датчиков; для зон также можно нажимать значения датчиков
* см. значения для двоичных входов, датчиков, кнопок и выходов

## Состояние и структура объекта
Адаптер предоставляет две структуры данных. Структура квартиры с этажами, зонами (комнатами) и группами, а также структура цепей / dSM и подключенных устройств с их подробными данными.

В структуры включены несколько «типов» данных:

* Сцены: сцены реализованы как переключатели. Установка значения tro "true" отправит команду "callScene" для этой сцены. Значение «false» отправит команду «undoScene» для этой сцены - сервер DSS должен решить, является ли «отменить» допустимой командой! Когда callScene или undoScene запускается как событие от сервера DSS, для соответствующей сцены устанавливается значение «true» или «false» с ack = true.
* Состояния: состояния из системы и состояния, определенные пользователем через надстройку, отображаются и доступны только для чтения
* Значения датчиков обновляются при срабатывании события, а также могут частично изменяться ставки - изменения отправляются на сервер "pushSensorValue", и это зависит от сервера, если значение принято! В основном это касается значений температуры или влажности.

*

### Объект и состояния квартиры
![Квартирные объекты](../../../en/adapterref/iobroker.digitalstrom/img/dss-apartment.png)

Для Квартиры создается структура с «полом». «Зона» со следующими подконструкциями внутри нее:

* для каждой группы устройств создается подпапка, включающая доступные групповые сцены
* сцены для этой зоны
* состояния для этой зоны
* значения датчиков для этой зоны

На уровне квартиры доступны все группы устройств со сценами.

На уровне квартиры также включены датчики (также наружные значения), состояния и состояния пользователя.

### Устройства, объекты и состояния
![Объекты устройств](../../../en/adapterref/iobroker.digitalstrom/img/dss-devices.png)

Устройства структурированы с помощью "circuit / dSM". "DeviceID", а внутренняя подструктура включает:

* Сцены устройства будут запускаться только для этого устройства
* Датчики устройства, когда сообщается из системы. Значения могут быть пустыми
* Выходные значения (например, состояние / яркость для источников света и положение / угол для штор / жалюзи) расположены непосредственно под устройством. Только светильники и шторы / жалюзи пока будут иметь определенную функциональность.
* Кнопки и двоичные входы также будут представлены состояниями и доступны только для чтения

## Известные проблемы / Эффекты проектирования системы
* Система DSS в основном работает с использованием сцен, а не с помощью реальных значений устройства, а также получение реальных значений происходит очень медленно, потому что их нужно получать через шину.
* Значения могут быть пустыми, если они не были сообщены системой
* Бинарные входы были реализованы "слепыми", правильно знаю, потому что у меня нет таких устройств. Так что я рад получить несколько логов / отчетов с устройствами двоичного ввода :-)
* Значимое чтение и запись выходного значения реализовано только для световых (желтый) и затененных / слепых (серый) устройств.
* У меня пока не было возможности проверить, как система ведет себя с vDC. Поэтому мне нужны журналы и подробности, чтобы добавить это
* Вентиляция и управление температурой / устройства также не полностью реализованы ... что здесь имеет смысл?

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого GitHub issues.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог "log" в установочном каталоге ioBroker, а не из Admin, потому что Admin сокращает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале и в какое время.

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) prevent crashes (Sentry IOBROKER-DIGITALSTROM-5)

### 2.0.5 (2020-03-14)
* (Apollon77) BREAKING: binaryInput are now numbers intead of booleans because it can have values other then true/false
* (Apollon77) BREAKING: Some states are converted to strings to allow all values to be passed
* (Apollon77) Fixes on some outputValues 
* (Apollon77) add new sunelevation and sunazimuth values 

### 1.0.2 (2020-02-10)
* (Apollon77) trigger buttons on scene calls also if scene is normally not allowed but came from the device
* (Apollon77) fix button logic
* (Apollon77) also add sensor type 255, but without name and unit because unknown
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany
* (Apollon77) user states are optional now
* (Apollon77) add button states for devices wth more then 1 button

### 1.0.0 (2020-01-31)
* (Apollon77) bump version to 1.0.0
* (Apollon77) update dependecies
* (Apollon77) change default loglevel to info

### 0.5.5 (2020-01-29)
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