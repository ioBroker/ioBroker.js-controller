---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-вакуумный адаптер
hash: 1rN6gv/iKzQTmZqSG+CZXVeAzOoKce1RuBNJFljJHwY=
---
![логотип](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Количество установок](http://iobroker.live/badges/mihome-vacuum-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.mihome-vacuum.svg?branch=master)
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
    - [Собственные команды] (# send-your-own-команды)
    - [sendTo hook] (# send-custom-commands-with-sendto)
- [виджет] (# виджет)
- [ошибки] (# ошибки)
- [Список изменений] (# список изменений)

## Конфигурация
В настоящее время поиск токена является самой большой проблемой.
Пожалуйста, следуйте инструкциям в ссылке:

[Жетон турориал](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/).

### Конфигурация адаптера
- Для IP-адреса, IP-адрес робота должен быть введен в формате «192.168.178.XX»
- Порт робота по умолчанию установлен на «54321», это не должно быть изменено.
- Собственный порт, должен быть изменен только со вторым роботом
- Интервал запроса Время в мс, в течение которого значения состояния робота извлекаются (не должно быть <10000)

#### Контроль над Alexa
В конфигурации добавлено состояние alexa, здесь активируется взлом, устанавливается дополнительное состояние «clean_home», это переключатель, который начинается с «true» присоски, а при «false» он возвращается домой, он автоматически становится интеллектуальным устройством в облаке Адаптер создан с именем «пылесос», который можно изменить в облачном адаптере.

#### Возобновить приостановленную очистку зоны кнопкой пуска
Если эта опция включена, Вакуум возобновит очистку зоны при установке состояния «Пуск» в состояние «истина», если оно было приостановлено во время выполнения очистки зоны.
Если эта опция отключена, пылесос начнет новую «нормальную очистку» при отправке команды запуска, даже если она была приостановлена во время работы zoneclean.

- Эксперимент: с помощью флажка «Отправить свои собственные команды» создаются объекты, с помощью которых вы можете отправлять и получать свои собственные команды роботу.

#### Второй робот
Если два робота должны управляться через ioBroker, необходимо создать два экземпляра. Второй робот должен изменить свой собственный порт (по умолчанию: 53421), чтобы оба робота имели разные порты.

## Valetudo Config
Для этого вам нужно получить root права и установить valetudo на ваше устройство. Vatudo вы можете использовать [Valetudo RE] (https://github.com/rand256/valetudo) или обычный [Valetudo](https://github.com/Hypfer/Valetudo)

![конфиг](../../../en/adapterref/iobroker.mihome-vacuum/admin/valetudo_conf.png)

- Активировать Valetudo активирует интерфейс Valetudo
- Интервал запроса должен быть больше 1000 мс, это интервал для обновления html-карты.
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
[{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":false,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"html":"{mihome-vacuum.0.valetudo.map64}"},"style":{"left":"0","top":"0","width":"100%","height":"100%"},"widgetSet":"basic"}]
```

Второй способ - использовать виджет src img для интеграции файла png. но просмотр html быстрее, это как просмотр в реальном времени.

## Функции
### Команды S50 (второе поколение)
Размер карты всегда составляет 52000 мм x 52000 мм, поэтому возможны значения от 0 до 51999 мм.
К сожалению, положение и местоположение карты не могут быть запрошены, это может измениться от всасывания к всасыванию. В качестве основы всегда используется последняя всасывающая карточка, а также в приложении.
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

### Отправить свои собственные команды
ПРИМЕЧАНИЕ: эта функция должна использоваться только экспертами, так как присоска может быть повреждена неправильными командами

Робот различает команды в методах (методы) и параметры (параметры), которые служат для определения методов.
Под объектом «mihome-вакуум.X.control.X_send_command» вы можете отправлять свои собственные команды роботу.
Структура объекта должна выглядеть следующим образом: метод; [PARAMS]

Под объектом «mihome-вакуум.X.control.X_get_response» ответ вводится роботом после отправки. Если параметры запрашиваются, они отображаются здесь в формате JSON. Если была отправлена только одна команда, робот отвечает только «0».

Поддерживаются следующие методы и параметры:

| метод | параметры | Beschreibung |
|-----------      |-------                                                              |-------------------                                                                                     |
| get_timer | | Возвращает установленное timerSetting время всасывания BSp. 12 часов 30 за 5 дней |
| set_timer | [["TIME_IN_MS", ["30 12 * * 1,2,3,4,5", ["start_clean", ""]]]]] | Включить / отключить таймер |
| upd_timer | ["1481997713308", "вкл / выкл"] | |
| | | Спасает времена Не Не Други |
| get_dnd_timer | | Удалить DND раз |
| close_dnd_timer | | Настройка DND ч, мин, ч, мин |
| set_dnd_timer | [22,0,8,0] | |
|                 |                                                                     |                                                                                                        |
| app_rc_start | | Запустить Romote Control |
| app_rc_end | | Готово Пульт дистанционного управления |

| app_rc_move | [{"seqnum": '0-1000', "скорость": VALUE1, "омега": VALUE2, "duration": VALUE3}] | Переехать. Порядковый номер должен быть непрерывным, VALUE1 (скорость) = -0,3-0,3, VALUE2 (вращение) = -3,1-3,1, VALUE3 (длительность)

другие методы и параметры вы можете найти здесь ([Ссылка на сайт](https://github.com/MeisterTR/XiaomiRobotVacuumProtocol)).

### Отправка пользовательских команд с помощью sendTo
Вы также можете отправлять эти пользовательские команды из других адаптеров с помощью `sendTo`. Использование с `method_id` и `params`, как определено выше:

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
| Очистить небольшую область вокруг робота | `cleanSpot` | - нет - | |
| Вернуться на базу | `charge` | - нет - | |
| Скажи "Привет, я здесь!" | `findMe` | - нет - | |
| Проверьте состояние расходных материалов (щетка и т. Д.) | `getConsumableStatus` | - нет - | |
| Сбросить состояние расходных материалов (кисти и т. Д.) | `resetConsumables` | - нет - | Звонок подпись неизвестна |
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
| Завершить функцию дистанционного управления | `stopRemoteControl` | - нет - | |

## Виджет
Извините, еще не закончил.
![Виджет](../../../en/adapterref/iobroker.mihome-vacuum/widgets/mihome-vacuum/img/previewControl.png)

## Ошибки
- случайные разъединения, однако, это не из-за адаптера, но главным образом в его собственных сетях
- Виджет на тот момент без функции

## Changelog
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