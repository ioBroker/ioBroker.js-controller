---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-вакуумный адаптер
hash: jgAFr69EafUJFMKZTLdoBfXb9BHAbRyRHuy0LScVqGQ=
---
![логотип](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Количество установок](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)
![тесты](https://travis-ci.org/iobroker-community-adapters/ioBroker.mihome-vacuum.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mihome-vacuum.png?downloads=true)

# IoBroker mihome-вакуумный адаптер
[Deutsche beschreibung hier](README_de.md)

Этот адаптер позволяет управлять пылесосом Xiaomi.

## Содержание
- [Настройка] (# конфигурация)
    - [Настроить адаптер] (# настройка адаптера)
        - [Контроль через Алекса] (# контроль над Алекса)
        - [Второй робот] (# Второй робот)
    - [Настроить Valetudo] (# valetudo-config)
- [Функции] (# функции)
    - [Команды S50] (# команды-о-s50)
    - [Перейти] (# Перейти)
- [Чистая зона] (# zoneclean)
    - [комнаты] (# комнаты)
    - [таймер] (# таймер)
    - [Собственные команды] (# send-your-own-команды)
    - [sendTo hook] (# send-custom-commands-with-sendto)
- [виджет] (# виджет)
- [ошибки] (# ошибки)
- [Список изменений] (# список изменений)

## Конфигурация
В настоящее время поиск токена является самой большой проблемой.
Пожалуйста, следуйте инструкциям в ссылке:

[Жетон турориал](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### Ошибка при установке
если ваша установка запускается по ошибке. Не удалось установить пакет canvas

`` npm ERR! canvas@2.6.1 install: node-pre-gyp install - Fallback-to-build npm ERR! Статус выхода 1``

Пожалуйста, установите canvas и libs вручную:

`` sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev ``

`` sudo npm install canvas --unsafe-perm = true ``

### Конфигурация адаптера
- Для IP-адреса IP-адрес робота должен быть введен в формате «192.168.178.XX».
- Порт робота по умолчанию установлен на «54321», это не должно быть изменено.
- Собственный порт, должен быть изменен только со вторым роботом
- Интервал запроса Время в мс, в течение которого извлекаются значения состояния робота (не должно быть <10000)

#### Контроль над Alexa
В конфиге добавлено состояние alexa, здесь активируется взлом, устанавливается дополнительное состояние «clean_home», это переключатель, который запускается при «true» присоске, а при «false» он возвращается домой, он автоматически становится интеллектуальным устройством в облаке Адаптер создан с именем «пылесос», который можно изменить в облачном адаптере.

#### Возобновить приостановленную очистку зоны кнопкой пуска
Если эта опция включена, Вакуум возобновит очистку зоны при установке состояния «Пуск» в значение «истина», если оно было приостановлено во время выполнения очистки зоны.
Если эта опция отключена, пылесос начнет новую «нормальную очистку» при отправке команды запуска, даже если она была приостановлена во время работы zoneclean.

- Эксперимент: с помощью флажка «Отправить свои собственные команды» создаются объекты, с помощью которых вы можете отправлять и получать свои собственные команды роботу.

#### Второй робот
Если два робота должны управляться через ioBroker, необходимо создать два экземпляра. Второй робот должен изменить свой собственный порт (по умолчанию: 53421), чтобы оба робота имели разные порты.

## Map Config
Есть два способа получить карту. Первыми достанут карту из облака. Для этого вам необходимо авторизоваться и выбрать нужного робота из списка.

Второй способ - карта от valetudo (только локальная связь). Для этого вам нужно получить root права и установить valetudo на ваше устройство. Vatudo вы можете использовать [Valetudo RE] (https://github.com/rand256/valetudo) или обычный [Valetudo](https://github.com/Hypfer/Valetudo)

![конфиг](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- Чтобы использовать карту, вы должны выбрать valetudo или оригинальную карту в конфиге
- Интервал запроса должен быть больше 1000 мс, это интервал для обновления html-карты
- интервал карты должен быть больше 5000 мс, этот интервал обновляет файл карты png (вы можете использовать это для Telegram или vis или чего-либо еще)
- цвет там вы можете выбрать цвета для примера карты:

```
- #2211FF
- rbg(255,200,190)
- rgba(255,100,100,0.5) //for Transparent
- green
```

- роботы там вы можете выбрать разные роботы или другие транспортные средства для карты

### Виджет карты
Для отображения карты вы можете использовать обычный HTML-виджет, например:

```
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.map.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

Второй способ - использовать виджет src img для интеграции файла png. но просмотр html быстрее, это как просмотр в реальном времени.

## Функции
### Команды S50 (второе поколение)
Размер карты всегда составляет 52000 мм x 52000 мм, поэтому возможны значения от 0 до 51999 мм.
К сожалению, положение и местоположение карты не могут быть запрошены, это может измениться от всасывания к всасыванию. В качестве основы всегда используется последняя всасывающая карта, а также в приложении.
Если робот выбирает только одну область и всегда строит карту одинаково, вы можете надежно отправить ее в разные места или очистить область пылесосом.

#### Перейти к
Чтобы привести пылесос в точку, объект «goTo» должен быть заполнен следующим образом:

```
xVal, yval
```

Значения должны соответствовать вышеуказанному объему и указывать координаты x и y на карте.

Пример:

```
24,850.26500
```

#### ZoneClean
Чтобы очистить зону, ZoneClean необходимо заполнить следующим образом:

```
[X1, y1, x2, x2, count]
```

Где x и y - координаты прямоугольной области и «подсчитывают» операции очистки.
Вы также можете позволить нескольким областям сосать одновременно:

```
[X1, y1, x2, x2, count], [x3, y3, x4, x4, count2]
```

Пример:

```
[24117,26005,25767,27205,1], [24320,24693,25970,25843,1]
```

#### Номера
Более новый пылесос с последней версией Home App поддерживает определение номеров, см. [видео](https://www.youtube.com/watch?v=vEiUZzoXfPg)

Каждая комната на текущей карте имеет индекс, который затем назначается комнате из приложения. От робота мы получаем только отображение с номером комнаты и индексом. Адаптер запрашивает эти комнаты каждый раз, когда адаптер запускается, и создает канал для каждой комнаты, которая затем знает текущий индекс комнаты. То же самое происходит вручную с кнопкой loadRooms. Этот канал затем может быть назначен на комнаты ioBroker. Если кнопка roomClean нажата, индекс карты определяется и отправляется роботу, чтобы он мог затем пылесосить эту комнату. Перед этим мощность ВЕНТИЛЯТОРА устанавливается для всасывания в одной комнате. Если у вас пока нет возможности назвать комнаты в приложении, есть возможность создать такой канал вручную, указав индекс карты. Также возможно добавить координаты зоны вместо mapIndex.
Если вы хотите очистить несколько комнат спонтанно, вы можете сделать это с помощью функции multiRoomClean, назначив комнаты ioBroker этой точке данных, а затем нажав кнопку.

#### Таймер
Как только пылесос поддерживает функцию помещения (см. Выше), также можно создавать таймеры, которые затем запускают соответствующие каналы помещения или определяют их mapIndexes.
Таймер может сработать через комнаты и / или комнатные каналы напрямую.
Сами таймеры создаются через область конфигурации, но затем становятся точкой данных. Там каждый таймер может быть активирован / деактивирован или пропущен один раз. Прямой запуск также возможен. Преимущество таймеров ioBroker заключается в том, что они могут отображаться и использоваться в VIS, и вы можете отключить робота от Интернета, поскольку таймеры приложения запускаются из Китая.

### Отправить свои собственные команды
ПРИМЕЧАНИЕ: эта функция должна использоваться только экспертами, так как присоска может быть повреждена неправильными командами

Робот различает команды в методах (методы) и параметры (параметры), которые служат для определения методов.
Под объектом «mihome-вакуум.X.control.X_send_command» вы можете отправлять свои собственные команды роботу.
Структура объекта должна выглядеть следующим образом: метод; [PARAMS]

Под объектом «mihome -uum.X.control.X_get_response» ответ вводится роботом после отправки. Если параметры были запрошены, они отображаются здесь в формате JSON. Если была отправлена только одна команда, робот отвечает только «0».

Поддерживаются следующие методы и параметры:

| метод | параметры | Beschreibung |
|-----------      |-------                                                              |-------------------                                                                                     |
| get_timer | | Возвращает установленное timerSetting время всасывания BSp. 12 часов 30 за 5 дней |
| set_timer | [["TIME_IN_MS", ["30 12 * * 1,2,3,4,5", ["start_clean", ""]]]]] | Включить / отключить таймер |
| upd_timer | ["1481997713308", "вкл / выкл"] | |
| | | Спасает времена Не Не Друба |
| get_dnd_timer | | Удалить DND раз |
| close_dnd_timer | | Настройка DND ч, мин, ч, мин |
| set_dnd_timer | [22,0,8,0] | |
|                 |                                                                     |                                                                                                        |
| app_rc_start | | Запустить Romote Control |
| app_rc_end | | Готово Пульт дистанционного управления |

| app_rc_move | [{"seqnum": '0-1000', "скорость": VALUE1, "омега": VALUE2, "duration": VALUE3}] | Переехать. Порядковый номер должен быть непрерывным, VALUE1 (скорость) = -0,3-0,3, VALUE2 (вращение) = -3.1-3.1, VALUE3 (продолжительность)

другие методы и параметры вы можете найти здесь ([Ссылка на сайт](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Отправка пользовательских команд с помощью sendTo
Вы также можете отправлять эти пользовательские команды с других адаптеров с помощью `sendTo`. Использование с `method_id` и `params`, как определено выше:

```
sendTo("mihome-vacuum.0", "sendCustomCommand",
    {method: "method_id", params: [...] /* optional*/},
    function (response) { /* do something with the result */}
);
```

Объект `response` имеет два свойства: `error` и (если не было ошибки) `result`.

Пара предопределенных команд также может быть выполнена следующим образом:

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
| Очистить ожидание работы | `clearQueue` | - нет - | |
| Очистить небольшую область вокруг робота | `cleanSpot` | - нет - | |
| Вернуться на базу | `charge` | - нет - | |
| Скажи "Привет, я здесь!" | `findMe` | - нет - | |
| Проверить состояние расходных материалов (щетка и т. Д.) | `getConsumableStatus` | - нет - | |
| Сбросить состояние расходных материалов (кисти и т. Д.) | `resetConsumables` | `resetConsumables` | `consumable` | Строка: filter_work_time, filter_element_work_time, sensor_dirty_time, main_brush_work_time, side_brush_work_time |
| Получить сводку всех предыдущих процессов очистки | `getCleaningSummary` | - нет - | |
| Получить подробную сводку предыдущего процесса очистки | `getCleaningRecord` | `recordId` | |
| Получить карту | `getMap` | - нет - | Неизвестно, что делать с результатом |
| Получить текущий статус робота | `getStatus` | - нет - | |
| Получить серийный номер робота | `getSerialNumber` | - нет - | |
| Получить подробную информацию об устройстве | `getDeviceDetails` | - нет - | |
| Получить *не беспокоить* таймер | `getDNDTimer` | - нет - | |
| Установить новый *не беспокоить* таймер | `setDNDTimer` | `startHour`, `startMinute`, `endHour`, `endMinute` | |
| Удалить *не беспокоить* таймер | `deleteDNDTimer` | - нет - | |
| Получить текущую скорость вентилятора | `getFanSpeed` | - нет - | |
| Установите новую скорость вентилятора | `setFanSpeed` | `fanSpeed` | `fanSpeed` это число от 1 до 100 |
| Запустите функцию дистанционного управления | `startRemoteControl` | - нет - | |
| Выполните команду перемещения для удаленного управления | `move` | `velocity`, `angularVelocity`, `duration`, `sequenceNumber` | Порядковый номер должен быть последовательно, Длительность в мс |
| Завершить функцию дистанционного управления | `stopRemoteControl` | - нет - | |
| чистая комната / комнаты | `cleanRooms` | `rooms` | `rooms` - это строка, разделенная запятыми, с enum.rooms.XXX |
| чистый сегмент | `cleanSegments` | `rooms` | `rooms` - массив с mapIndex или разделенная запятыми строка с mapIndex |
| чистая зона | `cleanZone` | `coordinates` | `coordinates` - это строка с координатами и количеством, см. [zoneClean](#zoneClean) |
| чистая зона | `cleanZone` | `координаты` | `координаты` - это строка с координатами и количеством, см. [zoneClean] (# zoneClean) |

## Виджет
Извините, еще не закончил.
![Виджет](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Ошибки
- случайные разъединения, однако, это не из-за адаптера, но главным образом в его собственных сетях
- Виджет на тот момент без функции

## Changelog
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