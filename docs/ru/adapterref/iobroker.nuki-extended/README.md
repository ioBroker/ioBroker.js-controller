---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-продлен
hash: HELzK1mWNuZtbfH8Aj54qCOpgurEUn5UA1pWTD8tA+I=
---
![логотип](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Количество установок](http://iobroker.live/badges/nuki-extended-installed.svg)
![Стабильная версия](http://iobroker.live/badges/nuki-extended-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Трэвис CI](https://travis-ci.org/Zefau/ioBroker.nuki-extended.svg?branch=master)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)
![NPM](https://nodei.co/npm/iobroker.nuki-extended.png?downloads=true)

# IoBroker.nuki-extended Этот адаптер ioBroker (ранее ioBroker.Nuki2) позволяет контролировать и контролировать [Nuki Smart Lock] (https://nuki.io/de/smart-lock/) и / или [Nuki Opener] (https://nuki.io/de/opener/) с использованием [API-интерфейса Nuki Bridge] (v1.9.0, 06.05.2019)] (https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) и [Nuki Web API (v1. 2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
**Содержание**

1. [Особенности] (# функции)
2. [Установка] (# установка)
   1. [Получить токен API] (# get-a-api-token)
   2. [Функция обратного вызова] (# функция обратного вызова)
3. [Каналы и состояния] (# 3-каналы - состояния)
4. [Умный дом / интеграция Alexa с использованием ioBroker.javascript] (# умный дом - alexa -gration-using-iobrokerjavascript)
   1. [Закрывайте дверь в 10 вечера вечером] (# запирайте дверь в 10 вечера вечером)
   2. [Пусть Alexa сообщит вам об изменениях блокировки] (# let-alexa-inform-you-about-lock-changes)
   3. [Пусть Telegram сообщит вам об изменениях блокировки] (# let-telegram-inform-you-about-about-lock-changes)
5. [Changelog] (# changelog)
6. [Кредиты] (# кредитов)
7. [Лицензия] (# лицензия)

## Особенности
- Поддержка Nuki Smartlock и Nuki Opener
- Поддержка как Nuki Bridge API, так и Nuki Web API
- ~~ Поддержка хешированного токена на аппаратных мостах (см. Https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- Откат к Nuki Web API в случае сбоя прикладных действий над Nuki Bridge API, например, из-за ошибки моста 503 (см. https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Повторите попытку в случае сбоя прикладных действий в API Nuki Bridge (когда Nuki Web API не используется).
- Возможность регулярной синхронизации вместо использования обратного вызова Bridge API (что может быть отложено из-за аппаратного моста)
- Обновление всех состояний Nuki Web API при получении обратного вызова через Nuki Bridge API
- Получить авторизованных пользователей для Nuki Smartlock и Nuki Opener (см. Ниже [Каналы и состояния] (# общая информация))
- Получить конфигурацию для Nuki Smartlock и Nuki Opener (см. Ниже [Каналы и состояния] (# general-config))
- Получить настройки уведомлений Nuki (см. Ниже [Каналы и состояния] (# пользователи))
- Веб-интерфейс, который показывает последние события от вашего Nuki Smartlock и Nuki Opener:

  ![Расширенный веб-интерфейс Nuki](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Монтаж
### Nuki Bridge API
Как получить маркер аппаратного моста (не работает для программных мостов):

1. Вызвать `` `http:// <bridge_ip>: <bridge_port> / auth``` из любого браузера в вашей сети. Мост включает светодиод.
2. Нажмите кнопку моста в течение 30 секунд.
3. Результат вызова браузера должен выглядеть примерно так:

```
{
   "token":"token123",
   "success":true
}
```

4. Используйте сгенерированный токен в расширенном адаптере nuki.

### Nuki Web API
Чтобы использовать Nuki Web API, сделайте следующее:

1. Получите токен по адресу https://web.nuki.io/de/#/admin/web-api.
2. Используйте этот токен в расширенном адаптере nuki
3. Убедитесь, что ваши устройства nuki опубликованы в Nuki Web API (используйте приложение для смартфона через настройки «Activate Nuki Web»)

## Каналы и Штаты
Если вы успешно настроили ioBroker.nuki-extended, будут созданы следующие каналы и состояния:

### Мосты (с Nuki Bridge API)
Мост будет создан как устройство с шаблоном имени ```bridge__<name of bridge>```. Следующие каналы / состояния будут созданы в каждом мосту:

| Канал | Государство | Описание |
|:------- |:----- |:----------- |
| - | \ _connected | Флаг, указывающий, подключен ли мост к серверу Nuki |
| - | имя | Название моста / сервера |
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
| обратные вызовы | - | Обратные вызовы моста |
| обратные вызовы | список | Список обратных вызовов |
| callbacks._callbackId_ | \ _delete | Удалить обратный звонок |
| callbacks._callbackId_ | URL | URL обратного вызова |

### Основная информация
| Канал | Государство | Описание |
|:------- |:----- |:----------- |
| - | связь | Состояние подключения адаптера |
| - | bridgeApiSync | Указывает, активирована ли синхронизация через Bridge API |
| - | bridgeApiLast | Отметка времени последней синхронизации API Bridge |
| - | webApiSync | Указывает, активирована ли синхронизация через Web API |
| - | webApiLast | Отметка времени последней синхронизации веб-API |
| уведомления | - | Уведомления |
| notifications._notificationIndex_ | - | - |
| notifications._notificationIndex_.settings | - | Настройки уведомлений |
| notifications._notificationIndex_.settings._settingsIndex_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | Набор идентификаторов авторизации для фильтрации push-уведомлений для определенных пользователей или клавиатур. Если нет входных push-уведомлений для всех пользователей и клавиатур |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | Идентификатор смарт-блокировки, если не установлен, все интеллектуальные блокировки учетной записи включены для push-уведомлений |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | Набор, по которому должны срабатывать push-уведомления: блокировка, разблокировка, разблокировка, lockngo, открытие, звонок, датчик двери, предупреждения, smartlock |
| notifications._notificationIndex_ | язык | Язык push-сообщений |
| notifications._notificationIndex_ | lastActiveDate | Последняя активная дата |
| notifications._notificationIndex_ | NotificationId | Уникальный идентификатор уведомления для уведомления |
| notifications._notificationIndex_ | ос | Операционная система <br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | Идентификатор push или POST URL для веб-крючка |
| notifications._notificationIndex_ | referenceId | Ссылочный идентификатор, идентификатор для идентификации сторонней системы |
| notifications._notificationIndex_ | статус | Текущее состояние активации <br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| notifications._notificationIndex_ | статус | Текущее состояние активации <br> `{&quot; 0 &quot;: &#39;INIT&#39;,&quot; 1 &quot;: &#39;ACTIVE&#39;,&quot; 2 &quot;: &#39;FAILED&#39;}` |

### Smartlocks and Opener (с помощью API Nuki Bridge)
Блокировка будет создана как устройство с шаблоном имени ```door__<name of door>```. Следующие каналы / состояния будут создаваться в каждой блокировке (при использовании Nuki Bridge API):

| Канал | Государство | Описание |
|:------- |:----- |:----------- |
| - | \ _ACTION | Запустить действие на замке |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | bridgeId | Мост ID Нуки |
| статус | - | Текущее состояние блокировки |
| статус | BatteryCritical ** | Состояния критического уровня заряда батареи |
| статус | lockState ** | Текущее состояние блокировки Nuki |
| статус | заблокирован ** | Индикация, если дверь заперта |
| статус | обновился ** | Отметка времени последнего обновления |

_ ** отмеченные состояния будут обновлены в действии Nuki, если обратный вызов установлен_

### Smartlocks and Opener (с помощью Nuki Web API)
Блокировка будет создана как устройство с шаблоном имени ```door__<name of door>```. Следующие каналы / состояния будут создаваться в каждой блокировке (при использовании Nuki Web API):

| Канал | Государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| - | \ _ACTION | Запустить действие на замке |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | журналы | Журналы / История Нуки |
| - | bridgeId | Мост ID Нуки |

#### Информация
| Канал | Государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| информация | - | Дополнительная информация |
| информация | accountId | Идентификатор аккаунта |
| информация | authId | ID авторизации |
| информация | любимый | Любимый флаг |
| информация | прошивка версии | Версия прошивки |
| информация | HardwareVersion | Версия аппаратного обеспечения |
| информация | идентификатор операции | Идентификатор операции - если установлено, устройство заблокировано для другой операции |
| информация | serverState | Состояние сервера <br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| информация | adminPinState | Состояние пин-кода администратора <br> `{&quot; 0 &quot;: &#39;OK&#39;,&quot; 1 &quot;: &#39;MISSING&#39;,&quot; 2 &quot;: &#39;INVALID&#39;}` |
| информация | virtualDevice | Флаг, указывающий на виртуальный Smart Lock |
| информация | dateCreated | Дата создания |
| информация | dateUpdated | Дата обновления |

#### Государственный
| Канал | Государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| состояние | - | Текущее состояние блокировки |
| состояние | BatteryCritical | Состояния критического уровня заряда батареи |
| состояние | закрыто | Индикация, если дверь закрыта (логическое значение doorState) |
| состояние | doorState | Текущее состояние дверей Нуки |
| состояние | lastAction | Последнее инициированное действие |
| состояние | lockState | Текущее состояние блокировки Nuki |
| состояние | заблокирован | Индикация, если дверь заперта |
| состояние | режим | Режим smartlock <br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| состояние | ringToOpenTimer | Оставшееся кольцо, чтобы открыть время |
| состояние | триггер | Государственный триггер <br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| состояние | триггер | Государственный триггер <br> `{&quot; 0 &quot;: &#39;SYSTEM&#39;,&quot; 1 &quot;:&quot; MANUAL &quot;,&quot; 2 &quot;:&quot; BUTTON &quot;,&quot; 3 &quot;:&quot; AUTOMATIC &quot;,&quot; 4 &quot;:&quot; WEB &quot;,&quot; 5 &quot;:&quot; APP &quot;} `|

#### General Config
| Канал | Государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| конфиг | - | Конфигурация |
| конфиг | AdvertisingMode | Режим рекламы (экономия батареи) <br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| конфиг | autoUnlatch | True, если дверь должна быть разблокирована при разблокировке (ручка) |
| конфиг | buttonEnabled | Истина, если кнопка на Smartlock включена |
| конфиг | возможности | Возможности указывают, возможно ли открытие двери через приложение, RTO или оба |
| конфиг | fobAction1 | Действие брелка, если кнопка нажата один раз <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфиг | fobAction2 | Действие брелка, если кнопка нажата дважды <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфиг | fobAction3 | Действие брелка, если кнопка нажата 3 раза <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| конфиг | fobAction3 | Действие брелка, если кнопка нажата 3 раза <br> `{&quot; 0 &quot;: &#39;NONE&#39;,&quot; 1 &quot;: &#39;UNLOCK&#39;,&quot; 2 &quot;: &#39;LOCK&#39;,&quot; 3 &quot;: &#39;LOCK_N_GO&#39;,&quot; 4 &quot;: &#39;INTELLIGENT&#39;}` |
| конфиг | fobPaired | Истинно, если брелок соединен со SmartLock |
| конфиг | gpsLatitude | Широта |
| конфиг | homekitState | Государство homekit <br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| конфиг | homekitState | Государство homekit <br> `{&quot; 0 &quot;: &#39;НЕДОСТУПЕН&#39;,&quot; 1 &quot;:&quot; ОТКЛЮЧЕНО &quot;,&quot; 2 &quot;:&quot; ВКЛЮЧЕНО &quot;,&quot; 3 &quot;:&quot; ВКЛЮЧЕНО И СОЕДИНЕНО &quot;}` |
| конфиг | keypadPaired | Истинно, если клавиатура соединена со SmartLock |
| конфиг | ledBrightness | Яркость светодиода: от 0 (выключен) до 5 (максимум) |
| конфиг | ledEnabled | Истина, если включен светодиод на смарт-блокировке |
| конфиг | имя | Название смартлока для новых пользователей |
| конфиг | OperatingMode | Режим работы сошника |
| конфиг | pairingEnabled | True, если спаривание разрешено с помощью кнопки Smartlock |
| конфиг | singleLock | True, если смартлок должен блокироваться только один раз (вместо двух) |
| конфиг | timezoneId | ID часового пояса |
| конфиг | timezoneOffset | Смещение часового пояса (в минутах) |

#### Advanced Config
| Канал | Государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Расширенная настройка |
| advancedConfig | autoLockTimeout | Секунды, пока умная блокировка не разблокируется после того, как она была разблокирована. Нет автоматической блокировки, если значение равно 0. |
| advancedConfig | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| advancedConfig | batteryType | Тип батарей, присутствующих в умном замке <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | Желаемое действие, если кнопка нажата дважды <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | Желаемое действие, если кнопка нажата дважды <br> `{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| advancedConfig | lngTimeout | Тайм-аут в секундах для блокировки «n» go |
| advancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз <br> `{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| advancedConfig | singleLockedPositionOffsetDegrees | Смещение, изменяющее одиночную заблокированную позицию |
| advancedConfig | totalDegrees | Абсолютная общая позиция в градусах, которая была достигнута во время калибровки |
| advancedConfig | unlatchDuration | Продолжительность в секундах для удержания защелки в открытом положении |
| advancedConfig | unlockedPositionOffsetDegrees | Смещение, которое изменяет разблокированное положение |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | Смещение, изменяющее положение, в котором происходит переход из разблокированного в заблокированный |

#### Opener Advanced Config
| Канал | Государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Конфигурация новичка |
| openerAdvancedConfig | внутренняя связь | Идентификатор базы данных подключенного интеркома |
| openerAdvancedConfig | busModeSwitch | Способ переключения между данными и аналоговым режимом <br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | Длительность короткого замыкания для переключения режима шины в мс |
| openerAdvancedConfig | electricStrikeDelay | Задержка активации электрического удара в мс (после действия блокировки 3 - включение электрического удара-) |
| openerAdvancedConfig | randomElectricStrikeDelay | Произвольная задержка electricStrikeDelay (диапазон 3000 - 7000 мс) для того, чтобы симулировать человека внутри, приводящего в действие электрический удар |
| openerAdvancedConfig | electricStrikeDuration | Продолжительность в мс срабатывания электрического удара (блокирующее действие 3 - срабатывание электрического удара-) |
| openerAdvancedConfig | disableRtoAfterRing | Флаг для отключения RTO после звонка |
| openerAdvancedConfig | дверной звонок подавление | Режим подавления дверного звонка <br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | дверной звонок подавление | Режим подавления дверного звонка <br> `{&quot; 0 &quot;:« НИКОГДА »,« 1 »:« ВСЕГДА »,« 2 »:« RTO »,« 3 »:« НЕПРЕРЫВНЫЙ »,« 4 »:« НЕПРЕРЫВНЫЙ + RTO »}` |
| openerAdvancedConfig | дверной звонокSuppressionDuration | Длительность в мс подавления дверного звонка (только в режиме работы 2 -Цифровой интерком-) |
| openerAdvancedConfig | SoundRing | Звук для кольца |
| openerAdvancedConfig | soundOpen | Звук для открытых |
| openerAdvancedConfig | soundRto | Звук для RTO |
| openerAdvancedConfig | SoundCm | Звук для СМ |
| openerAdvancedConfig | подтверждение звука | Звуковое подтверждение |
| openerAdvancedConfig | soundLevel | Уровень звука |
| openerAdvancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз |
| openerAdvancedConfig | batteryType | Тип батарей, присутствующих в умном замке <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | batteryType | Тип батарей, присутствующих в умном замке <br> `{&quot; 0 &quot;: &#39;ALKALI&#39;,&quot; 1 &quot;: &#39;ACCUMULATOR&#39;,&quot; 2 &quot;: &#39;LITHIUM&#39;}` |
| openerAdvancedConfig | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| openerAdvancedConfig | идентификатор операции | Идентификатор операции - если установленное устройство заблокировано для другой операции |

#### Пользователи
| Канал | Государство | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| пользователи | - | Пользователи замка |
| users._userName_ | - | Пользователь _userName_ |
| users._userName_ | allowFromDate | Разрешено с даты |
| users._userName_ | allowUntilDate | Разрешено до даты |
| users._userName_ | allowWeekDays | Разрешенные будни <br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowFromTime | Разрешенное время (в минутах с полуночи) |
| users._userName_ | allowUntilTime | Разрешено до времени (в минутах от полуночи) |
| users._userName_ | authId | Идентификатор авторизации Smartlock |
| users._userName_ | dateCreated | Дата создания |
| users._userName_ | dateUpdated | Дата обновления |
| users._userName_ | dateLastActive | Последняя активная дата |
| users._userName_ | включен | True, если пользователь включен |
| users._userName_ | id | Уникальный идентификатор пользователя |
| users._userName_ | lockCount | Количество блокировок |
| users._userName_ | имя | Имя пользователя |
| users._userName_ | RemoteAllowed | Истинно, если авторизация имеет удаленный доступ |
| users._userName_ | тип | Тип авторизации <br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | тип | Тип авторизации <br> `{&quot; 0 &quot;: &#39;APP&#39;,&quot; 1 &quot;:&quot; МОСТ &quot;,&quot; 2 &quot;:&quot; FOB &quot;,&quot; 3 &quot;:&quot; КЛАВИАТУРА &quot;,&quot; 13 &quot;:&quot; КОД КЛАВИАТУРЫ &quot;,&quot; 14 &quot;:&quot; Z- KEY &#39;, &quot;15&quot;:&#39; VIRTUAL &#39;} `|

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
    var status = (getState('nuki-extended.0.smartlocks.home_door.state.lockState').val);
    var msg = 'Main Door door is ' + (states[status]) + '. ';

    if (status == '3')
    {
        setState('nuki-extended.0.smartlocks.home_door._ACTION', 2);
        msg += 'Locking door..'
    }
    else
        msg += 'No action taken.'

    log(msg, {m: 'Nuki', o: ['msg']});
});
```

__Заменить `nuki-extended.0.door__home_door.status.lockState` на lockState вашей блокировки! __ Вы также можете настроить сообщение через `msg`.

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

Вы можете использовать эту функцию в ioBroker.javascript, чтобы произнести фразу, используя Alexa ```say('Hello World')``` или ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` для голосового вывода с нескольких устройств.

Создайте сценарий в «общей» папке ioBroker.javascript и добавьте в него следующий прослушиватель. ВАЖНО: Замените #LOCK STATE ID # (также замените #) на состояние, содержащее состояние блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
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

Вы можете использовать эту функцию в ioBroker.javascript для отправки чего-либо в Telegram через ```msg('Hello World')``` (всем пользователям) или ```msg('Hello World', 'Zefau')``` (определенным пользователям).

Создайте сценарий в «общей» папке ioBroker.javascript и добавьте в него следующий прослушиватель. ВАЖНО: Замените #LOCK STATE ID # (также замените #) на состояние, содержащее состояние блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
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
on({id: 'nuki-extended.0.smartlocks.home_door.state.lockState', change: 'any'}, function(obj)
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

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

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