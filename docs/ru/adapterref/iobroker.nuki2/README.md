---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nuki2/README.md
title: ioBroker.nuki2
hash: iBD9a/svjQTZ/a4B6eO3MPhJxtZAPwnscD/AcWHJhAY=
---
![логотип](../../../en/adapterref/iobroker.nuki2/admin/nuki-logo.png)

![Количество установок](http://iobroker.live/badges/nuki2-installed.svg)
![Стабильная версия](http://iobroker.live/badges/nuki2-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.nuki2.svg)
![Трэвис CI](https://travis-ci.org/Zefau/ioBroker.nuki2.svg?branch=master)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nuki2.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/Zefau/ioBroker.nuki2.svg)
![NPM](https://nodei.co/npm/iobroker.nuki2.png?downloads=true)

# IoBroker.nuki2 Этот адаптер ioBroker позволяет контролировать и контролировать [Nuki Smart Lock] (https://nuki.io/de/) с использованием [Nuki Bridge API (v1.8.0, 06.03.2019)] (https://developer.nuki.io/page/nuki-bridge -http-api-170/4 / # заголовок - введение) и [Nuki Web API (v1.1.1, 30.08.2018)](https://developer.nuki.io/page/nuki-web-api-111/3/).
**Оглавление**

1. [Установка] (# установка)
   1. [Получить токен API] (# get-a-api-token)
   2. [Функция обратного вызова] (# функция обратного вызова)
   3. [Штаты] (# штаты)
2. [Умный дом / интеграция Alexa с использованием ioBroker.javascript] (# smart-home - alexa -gration-using-iobrokerjavascript)
   1. [Закрывайте дверь в 10 вечера вечером] (# запирайте дверь в 10 вечера вечером)
   2. [Пусть Alexa сообщит вам об изменениях блокировки] (# let-alexa-inform-you-about-lock-changes)
   3. [Пусть Telegram сообщит вам об изменениях блокировки] (# let-telegram-inform-you-about-about-lock-changes)
3. [Журнал изменений] (# changelog)
4. [Кредиты] (# кредитов)
5. [Лицензия] (# лицензия)

## Монтаж
### Получить API-токен
Как получить свой токен мостов:

1. Вызвать `` `http:// <bridge_ip>: <bridge_port> / auth``` из любого браузера в вашей сети
2. Мост включает светодиод
2. Нажмите кнопку моста в течение 30 секунд
3. Результат вызова браузера должен выглядеть примерно так: `` `

{"token": "token123", "success": true} `` `

### Функция обратного вызова
Если используется функция обратного вызова, адаптер попытается автоматически установить обратный вызов на мосту Nuki при сохранении экземпляра. Все состояния Nuki будут обновляться мостом Nuki, пока активирован обратный вызов.
Обратные вызовы также можно устанавливать и удалять вручную из любого браузера со следующими URL-адресами:

* set Callback: `` `http:// <bridge_ip>: <bridge_port> / callback / add? url = http% 3A% 2F% 2F <host_ip>% 3A <host_port>% 2Fapi% 2Fnuki & token = <bridgeToken>` ` `
* Remove Callback: `` `http:// <bridge_ip>: <bridge_port> / callback / remove? id = <callback_id> & token = <bridgeToken>` ``
* список всех обратных вызовов: `` `http:// <bridge_ip>: <bridge_port> / callback / list? token = <bridgeToken>` ``

### Состояния
Если вы успешно настроили ioBroker.nuki2, будут созданы следующие каналы и состояния:

#### Мосты (с Nuki Bridge API)
Мост будет создан как устройство с шаблоном имени ```bridge__<name of bridge>```. Следующие каналы / состояния будут созданы в каждом мосту:

| Канал | Государство | Описание |
|:------- |:----- |:----------- |
| - | \ _connected | Флаг, указывающий, подключен ли мост к серверу Nuki |
| - | bridgeId | ID моста / сервера |
| - | bridgeIp | IP-адрес моста |
| - | bridgePort | Порт моста |
| - | bridgeType | Тип моста |
| - | ID оборудования | Идентификатор аппаратного моста (только аппаратный мост) |
| - | обновленный | Отметка времени последнего обновления |
| - | время работы | Время работы моста в секундах |
| - | Версия Прошивки | Версия прошивки мостов (только аппаратный мост) |
| - | versWifi | Версия прошивки модулей WiFi (только аппаратный мост) |
| - | versApp | Версия приложения моста (только программный мост) |

#### Замки (с помощью API Nuki Bridge)
Блокировка будет создана как устройство с шаблоном имени ```door__<name of door>```. Следующие каналы / состояния будут создаваться в каждой блокировке (при использовании Nuki Bridge API):

| Канал | Государство | Описание |
|:------- |:----- |:----------- |
| - | действие | Запустить действие на замке |
| - | мост | Мост Нуки |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| статус | - | Текущее состояние блокировки |
| статус | BatteryCritical | Состояния критического уровня заряда батареи |
| статус | lockState | Текущее состояние блокировки Nuki |
| статус | заблокирован | Индикация, если дверь заперта |
| статус | обновленный | Отметка времени последнего обновления |

#### Блокировки (с помощью Nuki Web API)
Блокировка будет создана как устройство с шаблоном имени ```door__<name of door>```. Следующие каналы / состояния будут создаваться в каждой блокировке (при использовании Nuki Web API):

| Канал | Государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| - | действие | Запустить действие на замке |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| статус | - | Текущее состояние блокировки |
| статус | BatteryCritical | Состояния критического уровня заряда батареи |
| статус | закрыто | Индикация, если дверь закрыта (логическое значение doorState) |
| статус | doorState | Текущее состояние дверей Нуки |
| статус | lastAction | Последнее инициированное действие |
| статус | lockState | Текущее состояние блокировки Nuki |
| статус | заблокирован | Индикация, если дверь заперта |
| статус | режим | Режим smartlock <br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| статус | триггер | Государственный триггер <br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| статус | триггер | Государственный триггер <br> `{&quot; 0 &quot;: &#39;SYSTEM&#39;,&quot; 1 &quot;:&quot; MANUAL &quot;,&quot; 2 &quot;:&quot; BUTTON &quot;,&quot; 3 &quot;:&quot; AUTOMATIC &quot;,&quot; 4 &quot;:&quot; WEB &quot;,&quot; 5 &quot;:&quot; APP &quot;} `|
| конфиг | - | Конфигурация замка |
| конфиг | gpsLatitude | Широта |
| конфиг | gpsLongitude | Долгота |
| конфиг | autoUnlatch | True, если дверь должна быть разблокирована при разблокировке (ручка) |
| конфиг | pairingEnabled | True, если спаривание разрешено с помощью кнопки Smartlock |
| конфиг | buttonEnabled | Истина, если кнопка на Smartlock включена |
| конфиг | ledEnabled | Истина, если включен светодиод на смарт-блокировке |
| конфиг | ledBrightness | Яркость светодиода: от 0 (выключен) до 5 (максимум) |
| конфиг | fobAction1 | Действие брелка, если кнопка нажата один раз <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфиг | fobAction2 | Действие брелка, если кнопка нажата дважды <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфиг | fobAction3 | Действие брелка, если кнопка нажата 3 раза <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфиг | fobAction3 | Действие брелка, если кнопка нажата 3 раза <br> `{&quot; 0 &quot;: &#39;NONE&#39;,&quot; 1 &quot;: &#39;UNLOCK&#39;,&quot; 2 &quot;: &#39;LOCK&#39;,&quot; 3 &quot;: &#39;LOCK_N_GO&#39;,&quot; 4 &quot;: &#39;INTELLIGENT&#39;}` |
| конфиг | AdvertisingMode | Режим рекламы (экономия батареи) <br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| конфиг | AdvertisingMode | Режим рекламы (экономия батареи) <br> `{&quot; 0 &quot;: &#39;AUTOMATIC&#39;,&quot; 1 &quot;: &#39;NORMAL&#39;,&quot; 2 &quot;: &#39;SLOW&#39;,&quot; 3 &quot;: &#39;SLOWEST&#39;}` |
| конфиг | homekitState | Государство homekit <br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| конфиг | homekitState | Государство homekit <br> `{&quot; 0 &quot;: &#39;НЕДОСТУПЕН&#39;,&quot; 1 &quot;:&quot; ОТКЛЮЧЕНО &quot;,&quot; 2 &quot;:&quot; ВКЛЮЧЕНО &quot;,&quot; 3 &quot;:&quot; ВКЛЮЧЕНО И СОЕДИНЕНО &quot;}` |
| конфиг | timezoneId | ID часового пояса |
| config.advanced | - | Расширенная настройка замка |
| config.advanced | totalDegrees | Абсолютная общая позиция в градусах, которая была достигнута во время калибровки |
| config.advanced | unlockedPositionOffsetDegrees | Смещение, которое изменяет разблокированное положение |
| config.advanced | lockedPositionOffsetDegrees | Смещение, изменяющее заблокированное положение |
| config.advanced | singleLockedPositionOffsetDegrees | Смещение, изменяющее одиночную заблокированную позицию |
| config.advanced | unlockedToLockedTransitionOffsetDegrees | Смещение, изменяющее положение, в котором происходит переход из разблокированного в заблокированный |
| config.advanced | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| config.advanced | doubleButtonPressAction | Желаемое действие, если кнопка нажата дважды <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| config.advanced | doubleButtonPressAction | Желаемое действие, если кнопка нажата дважды <br> `{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| config.advanced | batteryType | Тип батарей, присутствующих в умном замке <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| config.advanced | batteryType | Тип батарей, присутствующих в умном замке <br> `{&quot; 0 &quot;: &#39;ALKALI&#39;,&quot; 1 &quot;: &#39;ACCUMULATOR&#39;,&quot; 2 &quot;: &#39;LITHIUM&#39;}` |
| config.advanced | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| config.advanced | unlatchDuration | Продолжительность в секундах для удержания защелки в открытом положении |
| config.advanced | autoLockTimeout | Секунды, пока умная блокировка не разблокируется после того, как она была разблокирована. Нет автоматической блокировки, если значение равно 0. |
| пользователи | - | Пользователи замка |
| users._userName_ | - | Пользователь _userName_ |
| users._userName_ | тип | Тип авторизации <br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | тип | Тип авторизации <br> `{&quot; 0 &quot;: &#39;APP&#39;,&quot; 1 &quot;:&quot; МОСТ &quot;,&quot; 2 &quot;:&quot; FOB &quot;,&quot; 3 &quot;:&quot; КЛАВИАТУРА &quot;,&quot; 13 &quot;:&quot; КОД КЛАВИАТУРЫ &quot;,&quot; 14 &quot;:&quot; Z- KEY &#39;, &quot;15&quot;:&#39; VIRTUAL &#39;} `|
| users._userName_ | id | Уникальный идентификатор пользователя |
| users._userName_ | authId | Идентификатор авторизации Smartlock |
| users._userName_ | включен | True, если пользователь включен |
| users._userName_ | RemoteAllowed | Истинно, если авторизация имеет удаленный доступ |
| users._userName_ | lockCount | Количество блокировок |
| users._userName_ | dateLastActive | Последняя активная дата |
| users._userName_ | dateCreated | Дата создания |
| users._userName_ | dateUpdated | Дата обновления |
| users._userName_ | allowFromDate | Разрешено с даты |
| users._userName_ | allowWeekDays | Разрешенные будни <br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowWeekDays | Разрешенные будни <br> `{64:« Понедельник », 32:« Вторник », 16:« Среда », 8:« Четверг », 4:« Пятница », 2:« Суббота », 1:« Воскресенье »}` |
| users._userName_ | allowFromTime | Разрешенное время (в минутах с полуночи) |
| users._userName_ | allowUntilTime | Разрешено до времени (в минутах от полуночи) |

## Умный дом / интеграция с Alexa с использованием ioBroker.javascript
Некоторые примеры возможной интеграции в вашем умном доме.

### Закрывать дверь в 10 вечера вечером
```javascript
var states = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

schedule('0 22 * * *', function()
{
    var status = (getState('nuki2.0.door__home_door.status.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki2.0.door__home_door.action', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__Заменить `nuki2.0.door__home_door.status.lockState` на lockState вашей блокировки! __ Вы также можете настроить сообщение через `msg`.

### Пусть Alexa сообщит вам об изменениях блокировки
Для этого требуется адаптер ioBroker ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Чтобы использовать голосовой вывод Alexa, мы определяем функцию ```say```. Поместите следующую функцию в скрипт в «глобальную» папку ioBroker.javascript. ВАЖНО: замените #YOUR ALEXA ID # (также замените #) своим Alexa ID. Вы можете найти Alexa ID в дереве объектов ioBroker ```alexa2.0.Echo-Devices```.

```javascript
/**
 * Say something with Alexa.
 *
 * @param       {string}        message         Message to say
 * @param       {string|array}  alexas          Alexa Device to say the voice message
 * @return      void
 *
 */
function say(message, alexas = '#YOUR ALEXA ID#') // use alexas = ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'] for default voice output from multiple devices (also replace #)
{
    alexas = typeof alexas === 'string' ? [alexas] : alexas;
    alexas.forEach(function(alexa)
    {
        setState('alexa2.0.Echo-Devices.' + alexa + '.Commands.speak', message);
    });
}
```

Вы можете использовать эту функцию в ioBroker.javascript для произнесения фразы, используя Alexa ```say('Hello World')``` или ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` для голосового вывода с нескольких устройств.

Создайте сценарий в «общей» папке ioBroker.javascript и добавьте в него следующего слушателя. ВАЖНО: Замените #LOCK STATE ID # (также замените #) на состояние, содержащее состояние блокировки (например, ```nuki2.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

### Пусть Telegram сообщит вам об изменениях блокировки
Для этого требуется адаптер ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

Чтобы использовать вывод сообщений Telegram, мы определяем функцию ```msg``` и ```messenger```. Поместите следующую функцию в скрипт в «глобальную» папку ioBroker.javascript:

```javascript
/**
 * Send something via telegram.
 *
 * @param       {string}        message         Message to print
 * @param       {string|array}  receiver        Users to send the message to
 * @return      void
 *
 */
function msg(message, receiver = 'ALL')
{
    if (receiver == 'ALL')
        messenger(message);

    else
    {
        receiver = typeof receiver == 'string' ? [receiver] : receiver;
        receiver.forEach(function(user)
        {
            messenger(message, user);
        });
    }
}
```

```javascript
/**
 * Sends a message / text.
 *
 * @param   {string}            content         Message to send
 * @param   {string}            user            (optional) Specific user to send the message to (defaults to all registered users)
 * @return  void
 *
 */
function messenger(content, user = '')
{
    var config = {
        text: content,
        parse_mode: 'HTML',
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: false
        }
    };

    sendTo('telegram', user ? Object.assign({user: user}, config) : config);
}
```

Вы можете использовать эту функцию в ioBroker.javascript для отправки чего-либо в Telegram через ```msg('Hello World')``` (всем пользователям) или ```msg('Hello World', 'Zefau')``` (конкретным пользователям).

Создайте сценарий в «общей» папке ioBroker.javascript и добавьте в него следующего слушателя. ВАЖНО: Замените #LOCK STATE ID # (также замените #) на состояние, содержащее состояние блокировки (например, ```nuki2.0.door__home_door.status.lockState```):

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
});
```

ПРИМЕЧАНИЕ. Если вы используете как скрипт Alexa, так и скрипт Telegram, вы можете определить только одного слушателя для обоих действий:

```javascript
const DOOR_STATES = {
    "0": "uncalibrated",
    "1": "locked",
    "2": "unlocking",
    "3": "unlocked",
    "4": "locking",
    "5": "unlatched",
    "6": "unlocked (lock n go)",
    "7": "unlatching",
    "254": "motor blocked",
    "255": "undefined"
};

/*
 * LISTEN TO CHANGES TO LOCK STATE
 *
 */
on({id: '#LOCK STATE ID#', change: 'any'}, function(obj)
{
    if (obj !== undefined && obj.state !== undefined)
    {
      say('Door is ' + DOOR_STATES[obj.state.val] + '!')
      msg('Door is ' + DOOR_STATES[obj.state.val] + '!')
    }
});
```

## Кредиты
Благодаря [@ Mik13] (https://github.com/Mik13) для [реализации API Nuki Bridge](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Иконки, сделанные <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> ([Essential Set] (https://www.flaticon.com/packs/essential-set-2)) и <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Двери](https://www.flaticon.com/packs/doors)) с <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> , лицензированы <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

## Changelog

### 1.0.0 (2019-04-xx) [IN DEVELOPMENT]
- (zefau) support for hashed token for hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-180/4/#heading--token) in the [nuki-bridge-api](https://github.com/Mik13/nuki-bridge-api/pull/9)
- (zefau) added Web Adapter as dependency
- (zefau) add Warning when opening web / log view but Nuki Web API has not been setup
- (zefau) removed empty folders when Nuki Web API has not been setup 
- (zefau) bump to stable release

### 0.9.4 / 0.9.5 (2019-03-22)
* (zefau) Useless versions to fix incorrect configuration in `io-package.json`

### 0.9.3 (2019-03-22)
* (zefau) Limited log retrieval to 1000 entries

### 0.9.2 (2019-02-11)
* (zefau) Updated dependency

### 0.9.1 (2019-02-10)
* (zefau) Added Web Interface to view logs

### 0.9.0 (2019-02-09)
* (zefau) Using both Bridge API and Web API
* (zefau) Support for multiple bridges
* (zefau) Support for discovery within admin panel
* (zefau) Additional states for bridges and better separation between software / hardware bridge
  * retrieve the basic and advanced configuration from your lock
  * retrieve all users having access to your lock

## License
The MIT License (MIT)

Copyright (c) 2019 Zefau <zefau@mailbox.org>

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