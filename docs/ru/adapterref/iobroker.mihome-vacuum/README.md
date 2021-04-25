---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-вакуумный адаптер
hash: jgdNxfABFtQ+BGnw/Tb9ftp6aXkA/qjfHobhXoqS8nY=
---
![Логотип](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)
![Количество установок (последнее)](http://iobroker.live/badges/mihome-vacuum-installed.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.mihome-vacuum.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.mihome-vacuum/badge.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mihome-vacuum.png?downloads=true)

# IoBroker mihome-вакуумный адаптер
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.mihome-vacuum/workflows/Test%20and%20Release/badge.svg)

[Deutsche beschreibung hier](README_de.md)

Этот адаптер позволяет управлять пылесосом Xiaomi.

## Содержание
 - [Известные ошибки] (# известных_ошибок)
    - [Ошибка при установке (холст)] (# error_at_installation)
    - [Ошибка HTTP при получении токена cookie {}] (# http_error_when_getting_token_cookie {})
- [Настройка] (# конфигурация)
    - [Настроить адаптер] (# конфигурация адаптера)
        - [Управление через Alexa] (# control-over-alexa)
        - [Второй робот] (# второй робот)
    - [Настроить Valetudo] (# valetudo-config)
- [Функции] (# функций)
    - [Команды S50] (# команды-of-s50)
    - [Перейти] (# goto)
- [Очистка зоны] (# очистка зоны)
    - [комнаты] (# комнаты)
    - [таймер] (# таймер)
    - [Собственные команды] (# отправь свои собственные команды)
    - [sendTo hook] (# send-custom-commands-with-sendto)
- [виджет] (# виджет)
- [ошибки] (# ошибок)
- [Список изменений] (# список изменений)

## Поддерживаемые устройства и функции
| Устройство | Базовое управление | история | комнаты | карта |
|:------------------    |:-------------------:      |:-------------------:  |:-------------------:|:-------------------:|
| viomi.vacuum.v6 | : heavy_check_mark: | : x: |: x: | : x: |
| viomi.vacuum.v7 | : heavy_check_mark: | : x: |: x: | : x: |
| viomi.vacuum.v8 | : heavy_check_mark: | : x: |: x: | : x: |
| rockrobo.vacuum.v1 | : heavy_check_mark: | : Heavy_check_mark: |: x: |: Heavy_check_mark: |
| roborock.vacuum.s4 | : heavy_check_mark: | : Heavy_check_mark: |: Heavy_check_mark: |: Heavy_check_mark: |
| roborock.vacuum.s5 | : heavy_check_mark: | : Heavy_check_mark: |: Heavy_check_mark: |: Heavy_check_mark: |
| roborock.vacuum.s5e | : heavy_check_mark: | : Heavy_check_mark: |: Heavy_check_mark: |: Heavy_check_mark: |
| roborock.vacuum.m1s | : heavy_check_mark: | : Heavy_check_mark: |: Heavy_check_mark: |: Heavy_check_mark: |
| roborock.vacuum.a10 | : heavy_check_mark: | : Heavy_check_mark: |: Heavy_check_mark: |: Heavy_check_mark: |
| roborock.vacuum.a15 | : heavy_check_mark: | : Heavy_check_mark: |: Heavy_check_mark: |: Heavy_check_mark: |

## Известные ошибки
### Ошибка при установке
если ваша установка выполняется по ошибке. Пакет холста не может быть установлен

`` npm ERR! canvas@2.6.1 install: node-pre-gyp install --fallback-to-build npm ERR! Статус выхода 1 ''

Пожалуйста, установите холст и библиотеки вручную с помощью: `` sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ''

`` sudo npm установить холст --unsafe-perm = true ''

### Ошибка HTTP при получении токена cookie {}
иногда вы не можете подключиться к облаку xiaomi. Пожалуйста, откройте Browswer, перейдите в Mihome и войдите в систему. Введите код, который вы получили по почте. После этого соединение должно работать.

## Конфигурация
На данный момент поиск токена - самая большая проблема.
Пожалуйста, следуйте инструкциям в ссылке:

[Жетон турориал](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### Конфигурация адаптера
- Для IP-адреса IP-адрес робота должен быть введен в формате «192.168.178.XX».
- Порт робота по умолчанию установлен на "54321", это не должно быть изменено.
- Собственный порт, следует менять только вторым роботом
- Интервал запроса Время в мс, в течение которого извлекаются значения статуса робота (не должно быть <10000)

#### Контроль над Alexa
В конфигурации активируется добавление состояния alexa, здесь устанавливается хак, дополнительное состояние «clean_home» это переключатель, который запускается с «true» присоски, а при «false» он идет домой, он автоматически становится интеллектуальным устройством в облаке Адаптер создан с названием «пылесос», который можно изменить в облачном адаптере.

#### Возобновить приостановленную очистку зоны кнопкой запуска
Если эта опция включена, пылесос возобновит очистку зоны при установке состояния «старт» в значение «истина», если она была приостановлена во время выполнения очистки зоны.
Если этот параметр отключен, пылесос начнет новую «обычную очистку», когда вы отправите команду запуска, даже если она была приостановлена во время выполнения очистки зоны.

- Экспериментально: с помощью флажка «Отправлять собственные команды» создаются объекты, с помощью которых вы можете отправлять и получать свои собственные команды роботу.

#### Второй робот
Если двумя роботами нужно управлять через ioBroker, необходимо создать два экземпляра. Второй робот должен изменить свой собственный порт (по умолчанию: 53421), чтобы у обоих роботов были разные порты.

## Конфигурация карты
Есть два способа получить карту. Первые получают карту из облака. Для этого вам необходимо войти в систему и выбрать нужного робота из списка.

Второй способ - карта от valetudo (только локальная связь). Для этого вам необходимо выполнить рутинг и установить valetudo на свое устройство. Vatudo вы можете использовать [Valetudo RE] (https://github.com/rand256/valetudo) или нормальный [Valetudo](https://github.com/Hypfer/Valetudo)

![Конфиг](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- Чтобы использовать карту, вы должны выбрать valetudo или оригинальную карту в конфигурации
- Интервал запроса должен быть больше 1000 мс, это интервал для обновления карты html
- интервал карты должен быть более 5000 мс, этот интервал обновляет файл карты png (вы можете использовать это для Telegram, vis или что-то еще)
- цвет там вы можете выбрать цвета для примера карты:

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- роботы там вы можете выбрать разных роботов или другую технику для карты

### Виджет карты
Для отображения карты вы можете использовать обычный виджет html, например:

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.map.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

Второй способ - использовать виджет src img для интеграции файла png. но просмотр в формате html быстрее, как в режиме реального времени.

## Функции
### Команды S50 (второе поколение)
Размер карты всегда составляет 52000 мм x 52000 мм, поэтому возможны значения от 0 до 51999 мм.
К сожалению, положение и расположение карты невозможно запросить, это может измениться от всасывания до всасывания. За основу всегда берется последняя присоска, как и в приложении.
Если робот захватывает только одну область и всегда строит карту одинаково, вы можете надежно отправить ее по местам или очистить область пылесосом.

#### Перейти к
Чтобы подвести пылесос к точке, объект goTo должен быть заполнен следующим образом:

```
xVal, yval
```

Значения должны соответствовать указанной выше области и указывать координаты x и y на карте.

Пример:

```
24,850.26500
```

#### ZoneClean
Чтобы пропылесосить зону, ZoneClean необходимо заполнить следующим образом:

```
[X1, y1, x2, x2, count]
```

Где x и y - координаты прямоугольной области и «подсчитывают» операции очистки.
Вы также можете позволить сосать сразу нескольким участкам:

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

Пример:

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

#### Номера
новый пылесос с последним приложением Home поддерживает определение комнат, см. [видео](https://www.youtube.com/watch?v=vEiUZzoXfPg)

Каждая комната на текущей карте имеет индекс, который затем назначается комнате из приложения. От робота мы получаем только карту с номером комнаты и индексом. Адаптер опрашивает эти комнаты каждый раз при запуске адаптера и создает канал для каждой комнаты, который затем знает текущий индекс комнаты. То же самое происходит вручную с кнопкой loadRooms. Затем этот канал можно назначить комнатам ioBroker. При нажатии кнопки roomClean индекс карты определяется и отправляется роботу, чтобы он мог затем пропылесосить эту комнату. Перед этим мощность ВЕНТИЛЯТОРА устанавливается для всасывания в одном помещении. Если у вас еще нет возможности давать названия комнатам в приложении, есть также возможность создать такой канал вручную, указав индекс карты. Также возможно добавить координаты зоны вместо mapIndex.
Если вы хотите очистить несколько комнат спонтанно, вы можете сделать это с помощью multiRoomClean, назначив комнаты ioBroker этой точке данных, а затем нажав кнопку.

#### Таймер
Как только пылесос поддерживает функцию помещения (см. Выше), также можно создавать таймеры, которые затем запускают соответствующие каналы помещения или определяют их mapIndexes.
Таймер может запускаться напрямую через комнаты и / или каналы комнаты.
Сами таймеры создаются в области конфигурации, но затем становятся точками данных. Там каждый таймер можно активировать / деактивировать или пропустить один раз. Также возможен прямой пуск. Преимущество таймеров ioBroker заключается в том, что их можно отображать и использовать в ВИС, а также отключать робота от Интернета, поскольку таймеры приложения запускаются из Китая.

### Отправляйте свои собственные команды
ПРИМЕЧАНИЕ: эту функцию должны использовать только специалисты, так как присоска может быть повреждена неправильными командами.

Робот различает команды в методах (методах) и параметрах (params), которые служат для определения методов.
Под объектом «mihome-Vacuum.X.control.X_send_command» вы можете отправлять роботу свои собственные команды.
Структура объекта должна выглядеть следующим образом: метод; [параметры]

Под объектом «mihome-vacuum.X.control.X_get_response» ответ вводится роботом после отправки. Если параметры были запрошены, они отображаются здесь в формате JSON. Если была отправлена только одна команда, робот отвечает только «0».

Поддерживаются следующие методы и параметры:

| метод | параметры | Beschreibung |
|-----------      |-------                                                              |-------------------                                                                                     |
| get_timer | | Возвращает установленный таймер Установка времени всасывания BSp. 12 часов 30 через 5 дней |
| set_timer | [[«TIME_IN_MS», [«30 12 * * 1,2,3,4,5», [«start_clean», «»]]]] | Включить / выключить таймер |
| upd_timer | ["1481997713308", "вкл / выкл"] | |
| | | Спасает времена "Не беспокоить" |
| get_dnd_timer | | Удалить время "Не беспокоить" |
| close_dnd_timer | | Установка "Не беспокоить" ч, мин, ч, мин |
| set_dnd_timer | [22,0,8,0] | |
|                 |                                                                     |                                                                                                        |
| app_rc_start | | Запустите Romote Control |
| app_rc_end | | Завершить дистанционное управление |

| app_rc_move | [{"seqnum": '0-1000', "velocity": VALUE1, "omega": VALUE2, "duration": VALUE3}] | Двигаться. Порядковый номер должен быть непрерывным, VALUE1 (скорость) = -0,3-0,3, VALUE2 (вращение) = -3,1-3,1, VALUE3 (продолжительность)

дополнительные методы и параметры можно найти здесь ([Ссылка на сайт](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Отправка пользовательских команд с помощью sendTo
Вы также можете отправлять эти настраиваемые команды с других адаптеров с помощью `sendTo`. Использование с `method_id` и `params`, как определено выше:

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

Объект `response` имеет два свойства: `error` и (если ошибок не было) `result`.

Пара предопределенных команд также может быть запущена таким образом:

```
sendTo("mihome-vacuum.0",
    commandName,
    {param1: value1, param2: value2, ...},
    function (response) { /* do something with the result */}
);
```

Поддерживаемые команды:

| Описание | `commandName` | Обязательные параметры | Замечания |
| Начать процесс очистки | `startVacuuming` | - нет - | |
| Остановить процесс очистки | `stopVacuuming` | - нет - | |
| Приостановить процесс очистки | `pause` | - нет - | |
| Очистить ожидающие вакансии | `clearQueue` | - нет - | |
| Очистите небольшой участок вокруг робота | `cleanSpot` | - нет - | |
| Вернитесь на базу | `charge` | - нет - | |
| Скажите "Привет, я здесь!" | `findMe` | - нет - | |
| Проверить состояние расходных материалов (щетки и т. Д.) | `getConsumableStatus` | - нет - | |
| Сбросить статус расходных материалов (щетки и т. Д.) | `resetConsumables` | `consumable` | Строка: filter_work_time, filter_element_work_time, sensor_dirty_time, main_brush_work_time, side_brush_work_time |
| Получите сводку всех предыдущих процессов очистки | `getCleaningSummary` | - нет - | |
| Получите подробный отчет о предыдущем процессе очистки | `getCleaningRecord` | `recordId` | |
| Получить карту | `getMap` | - нет - | Неизвестно, что делать с результатом |
| Получить текущий статус робота | `getStatus` | - нет - | |
| Получить серийный номер робота | `getSerialNumber` | - нет - | |
| Получите подробную информацию об устройстве | `getDeviceDetails` | - нет - | |
| Получить таймер *не беспокоить* | `getDNDTimer` | - нет - | |
| Установить новый таймер *не беспокоить* | `setDNDTimer` | `startHour`, `startMinute`, `endHour`, `endMinute` | |
| Удалите таймер *не беспокоить* | `deleteDNDTimer` | - нет - | |
| Получить текущую скорость вращения вентилятора | `getFanSpeed` | - нет - | |
| Установите новую скорость вентилятора | `setFanSpeed` | `fanSpeed` | `fanSpeed` - это число от 1 до 100 |
| Запустить функцию дистанционного управления | `startRemoteControl` | - нет - | |
| Выдать команду перемещения для дистанционного управления | `move` | `velocity`, `angularVelocity`, `duration`, `sequenceNumber` | Порядковый номер должен указываться последовательно, Продолжительность в мс |
| Завершить функцию дистанционного управления | `stopRemoteControl` | - нет - | |
| чистая комната / комнаты | `cleanRooms` | `rooms` | `rooms` - это строка, разделенная запятыми, с enum.rooms.XXX |
| чистый сегмент | `cleanSegments` | `rooms` | `rooms` - это массив с mapIndex или строкой, разделенной запятыми с mapIndex |
| чистая зона | `cleanZone` | `coordinates` | `coordinates` - это строка с координатами и счетчиком, см. [zoneClean](#zoneClean) |
| чистая зона | `cleanZone` | `координаты` | `координаты` - это строка с координатами и количеством, см. [zoneClean] (# zoneClean) |

## Виджет
![Виджет](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Ошибки
- случайные отключения, однако, это происходит не из-за адаптера, а в основном из-за его собственных сетей
- Виджет в то время без функции

## Changelog
### 3.1.1 (18.4.2021)
 * Full rewrite
 * Fix map bug with multiple vacuums
 * fix performance Problems
 * better conntection to vacuum
 * fix bug in ReloadMap button
 * Show Goto and Zone States ti find places
 * and many more...
### 2.2.5 (2021-04-02)
* added S7 Support
* bugfixes for S5 Max and others
### 2.2.4 (2020-09-15)
* (dirkhe) add config for send Pause Before Home
### 2.2.3 (2020-08-20)
* (dirkhe) room DP are not deleted, on map change 
### 2.2.0 (2020-08-13)
* (MeisterTR) add test for Viomi and Dreame Api 
### 2.1.1 (2020-07-10)
* (bluefox) Refactoring
* (bluefox) Support of compact mode added

### 2.0.10 (2020-07-05)
* try to starting of cleaning 3 times, if robot not answers and some fixes

### 2.0.9 (2020-03-05)
* (dirkhe) add state info for room channels and change queue info from number to JSON

### 2.0.8 (2020-02-26)
* (dirkhe) decreased communication with robot

### 2.0.7 (2020-02-25)
* (dirkhe) add Resuming after pause for rooms

### 2.0.6 (2020-02-17)
* (MeisterTR) add roooms for s50 with map (cloud or Valetudo needed)

### 2.0.4 (2020-02-13)
* (MeisterTR) add cloud login to get token
* (MeisterTR) add cloud Map
* (MeisterTR) add new and old Map format
* (MeisterTR) rebuild config page

### 1.10.5 (2020-02-11)
* send Ping only if not connected, otherwise get_status
* set button states to true, if clicked
* move Timermanager and roomManager to own libs

### 1.10.4 (2020-02-06)
* (MeiserTR) add valetudo map support for gen3 and gen2 2XXX

### 1.10.1 (2020-01-20)
* (dirkhe) added zone as room handling
* (dirkhe) timer could room channels directly

### 1.10.0 (2020-01-17)
* (dirkhe) added room handling
* (dirkhe) added Timer 
* (dirkhe) changed featurehandling 

### 1.1.6 (2018-12-06)
* (JoJ123) Added fan speed for MOP (S50+).

### 1.1.5 (2018-09-02)
* (BuZZy1337) Added description for Status 16 and 17 (goTo and zonecleaning).
* (BuZZy1337) Added setting for automatic resume of paused zonecleaning.

### 1.1.4 (2018-08-24)
* (BuZZy1337) Added possibility to resume a paused zoneclean (State: mihome-vacuum.X.control.resumeZoneClean)

### 1.1.3 (2018-07-11)
* (BuZZy1337) fixed zoneCleanup state not working (vacuum was only leaving the dock, saying "Finished ZoneCleanup", and returned immediately back to the dock)

### 1.1.2 (2018-07-05)
* (BuZZy1337) fixed detection of new Firmware / Second generation Vacuum

### 1.1.1 (2018-04-17)
* (MeisterTR) error catched , added states for new fw

### 1.1.0 (2018-04-10)
* (mswiege) Finished the widget

### 1.0.1 (2018-01-26)
* (MeisterTR) ready for admin3
* (MeisterTR) support SpotClean and voice level (v1)
* (MeisterTR) support second generation (S50)
* (MeisterTR) Speed up data requests

### 0.6.0 (2017-11-17)
* (MeisterTR) use 96 char token from Ios Backup
* (MeisterTR) faster connection on first use

### 0.5.9 (2017-11-03)
* (MeisterTR) fix communication error without i-net
* (AlCalzone) add selection of predefined power levels

### 0.5.7 (2017-08-17)
* (MeisterTR) compare system time and Robot time (fix no connection if system time is different)
* (MeisterTR) update values if robot start by cloud

### 0.5.6 (2017-07-23)
* (MeisterTR) add option for crate switch for Alexa control

### 0.5.5 (2017-06-30)
* (MeisterTR) add states, fetures, fix communication errors

### 0.3.2 (2017-06-07)
* (MeisterTR) fix no communication after softwareupdate(Vers. 3.3.9)

### 0.3.1 (2017-04-10)
* (MeisterTR) fix setting the fan power
* (bluefox) catch error if port is occupied

### 0.3.0 (2017-04-08)
* (MeisterTR) add more states

### 0.0.2 (2017-04-02)
* (steinwedel) implement better decoding of packets

### 0.0.1 (2017-01-16)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2020 bluefox <dogafox@gmail.com>

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