---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nuki-extended/README.md
title: ioBroker.nuki-расширенный
hash: P4wBQswyXDfM+blJgnDZpc+52jPqKyTvebuLngSFV1M=
---
![Логотип](../../../en/adapterref/iobroker.nuki-extended/admin/nuki-extended.png)

![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Количество установок](http://iobroker.live/badges/nuki-extended-installed.svg)
![Стабильная версия](http://iobroker.live/badges/nuki-extended-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.nuki-extended.svg)
![Совершено с момента последнего выпуска](https://img.shields.io/github/commits-since/Zefau/ioBroker.nuki-extended/latest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nuki-extended.svg)
![НПМ](https://nodei.co/npm/iobroker.nuki-extended.png?downloads=true)

# IoBroker.nuki-extended Этот адаптер ioBroker (ранее ioBroker.Nuki2) позволяет контролировать и контролировать [Nuki Smart Lock] (https://nuki.io/de/smart-lock/) и / или [Nuki Opener] (https://nuki.io/de/opener/), используя оба [Nuki Bridge API (v1.9.0, 06.05.2019)] (https://developer.nuki.io/page/nuki-bridge-http-api-170/4/#heading--introduction) и [Nuki Web API (v1. 2.0, 31.05.2019)](https://developer.nuki.io/page/nuki-web-api-111/3/).
[![Travis CI] (https://travis-ci.com/Zefau/ioBroker.nuki-extended.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.nuki-extended)

**Оглавление**

1. [Функции] (# функций)
2. [Установка] (# установка)
   1. [Nuki Bridge API] (# nuki-bridge-api)
   2. [Веб-API Nuki] (# nuki-web-api)
3. [Каналы и состояния] (# каналов - состояния)
4. [Интеграция Smart Home / Alexa с использованием ioBroker.javascript] (# smart-home - alexa-integration-using-iobrokerjavascript)
   1. [Запирайте дверь в 22:00 вечера] (# lock-door-at-22 вечера-вечера)
   2. [Пусть Алекса сообщит вам об изменениях блокировки] (# let-alexa-inform-you-about-lock-changes)
   3. [Пусть Telegram сообщит вам об изменениях блокировки] (# let-telegram-inform-you-about-lock-changes)
   4. [Разрешите Alexa и Telegram сообщить вам о звонке через Opener] (# let-telegram-and-alexa-inform-you-about-something-ringing-via-opener)
5. [Список изменений] (# список изменений)
6. [Кредиты] (# кредитов)
7. [Лицензия] (# лицензия)

## Характеристики
- Поддержка Nuki Smartlock и Nuki Opener
- Поддержка Nuki Bridge API и Nuki Web API.
- ~~ Поддержка хешированного токена на аппаратных мостах (см. Https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)~~
- Откат к Nuki Web API в случае сбоя примененных действий к Nuki Bridge API, например из-за ошибки моста 503 (см. https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- Повторить попытку в случае сбоя примененных действий к Nuki Bridge API (когда Nuki Web API не используется)
- Возможность регулярной синхронизации вместо использования обратного вызова Bridge API (которая может быть отложена из-за аппаратного моста)
- Обновление всех состояний Nuki Web API при получении обратного вызова через Nuki Bridge API
- Получение авторизованных пользователей для Nuki Smartlock и Nuki Opener (см. Ниже [Каналы и состояния] (# общая информация))
- Получить конфигурацию для Nuki Smartlock и Nuki Opener (см. Ниже [Каналы и состояния] (# general-config))
- Получить уведомления о настройках Nuki (см. Ниже [Каналы и состояния] (# пользователей))
- Веб-интерфейс, который показывает последние события от вашего Nuki Smartlock и Nuki Opener:

  ![Расширенный веб-интерфейс Nuki](../../../en/adapterref/iobroker.nuki-extended/img/screenshot_adapter-interface.png)

## Монтаж
### Nuki Bridge API
Как получить токен аппаратного моста (не работает для программных мостов):

1. Вызовите http:// <bridge_ip>: <bridge_port> / auth`` из любого браузера в вашей сети. Мост включает свой светодиод.
2. Нажмите кнопку перемычки в течение 30 секунд.
3. Результат вызова браузера должен быть примерно таким:

```
{
   "token":"token123",
   "success":true
}
```

4. Используйте сгенерированный токен в адаптере nuki-extended.

### Nuki Web API
Чтобы использовать Nuki Web API, сделайте следующее:

1. Получите токен на https://web.nuki.io/de/#/admin/web-api.
2. Используйте этот токен в адаптере nuki-extended.
3. Убедитесь, что ваши устройства nuki опубликованы в Nuki Web API (используйте приложение для смартфона в настройках «Активировать Nuki Web»).

## Каналы и состояния
Если вы успешно настроили ioBroker.nuki-extended, будут созданы следующие каналы и состояния:

### Мосты (с Nuki Bridge API)
Мост будет создан как устройство с шаблоном имени ```bridge__<name of bridge>```. В каждом мосту будут созданы следующие каналы / состояния:

| Канал | Состояние | Описание |
|:------- |:----- |:----------- |
| - | \ _connected | Флаг, показывающий, подключен ли мост к серверу Nuki |
| - | имя | Имя моста / сервера |
| - | bridgeId | ID моста / сервера |
| - | bridgeIp | IP-адрес моста |
| - | bridgePort | Порт моста |
| - | bridgeType | Тип моста |
| - | hardwareId | ID аппаратного моста (только аппаратный мост) |
| - | обновленный | Отметка времени последнего обновления |
| - | время безотказной работы | Время безотказной работы моста в секундах |
| - | versFirmware | Версия прошивки мостов (только аппаратный мост) |
| - | versWifi | Версия прошивки модулей WiFi (только аппаратный мост) |
| - | versApp | Версия приложения моста (только программный мост) |
| обратные вызовы | - | Обратные вызовы моста |
| обратные вызовы | список | Список обратных вызовов |
| callbacks._callbackId_ | \ _delete | Удалить обратный вызов |
| callbacks._callbackId_ | url | URL обратного вызова |

### Главная Информация
| Канал | Состояние | Описание |
|:------- |:----- |:----------- |
| - | соединение | Состояние подключения адаптера |
| - | bridgeApiSync | Указывает, активирована ли синхронизация через Bridge API |
| - | bridgeApiLast | Отметка времени последней синхронизации Bridge API |
| - | webApiSync | Указывает, активирована ли синхронизация через веб-API |
| - | webApiLast | Отметка времени последней синхронизации веб-API |
| уведомления | - | Уведомления |
| notifications._notificationIndex_ | - | - |
| notifications._notificationIndex_.settings | - | Настройки уведомлений |
| notifications._notificationIndex_.settings._settingsIndex_ | - | - |
| notifications._notificationIndex_.settings._settingsIndex_ | authIds | Набор идентификаторов аутентификации для фильтрации push-уведомлений для определенных пользователей или клавиатур. Если нет входа, push-уведомления запускаются для всех пользователей и клавиатур |
| notifications._notificationIndex_.settings._settingsIndex_ | smartlockId | ID smartlock, если не установлен, для всех Smart Lock аккаунта включены push-уведомления |
| notifications._notificationIndex_.settings._settingsIndex_ | triggerEvents | Набор, по которому должны запускаться push-уведомления: блокировка, разблокировка, разблокировка, блокировка, открытие, звонок, датчик двери, предупреждения, смарт-блокировка |
| notifications._notificationIndex_ | язык | Язык push-сообщений |
| notifications._notificationIndex_ | lastActiveDate | Дата последней активности |
| notifications._notificationIndex_ | notificationId | Уникальный идентификатор notificationId для уведомления |
| notifications._notificationIndex_ | os | Операционная система <br> `{"0": 'Android', "1": 'iOS', "2": 'Webhook'}` |
| notifications._notificationIndex_ | pushId | Идентификатор push или URL-адрес POST для веб-перехватчика |
| notifications._notificationIndex_ | referenceId | Идентификатор ссылки, идентификатор для идентификации внешней системы |
| notifications._notificationIndex_ | статус | Текущее состояние активации <br> `{"0": 'INIT', "1": 'ACTIVE', "2": 'FAILED'}` |
| notifications._notificationIndex_ | статус | Текущее состояние активации <br> `{&quot; 0 &quot;: &#39;INIT&#39;,&quot; 1 &quot;: &#39;ACTIVE&#39;,&quot; 2 &quot;: &#39;FAILED&#39;}` |

### Смартлоки и открывалка (с Nuki Bridge API)
Блокировка будет создана как устройство с шаблоном имени ```door__<name of door>```. Следующие каналы / состояния будут созданы в каждой блокировке (при использовании Nuki Bridge API):

| Канал | Состояние | Описание |
|:------- |:----- |:----------- |
| - | \ _ACTION | Запустить действие на замок |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | bridgeId | Мост ID Нуки |
| статус | - | Текущее состояние замка |
| статус | batteryCritical ** | Заявляет о критическом уровне заряда батареи |
| статус | lockState ** | Текущее состояние блокировки Нуки |
| статус | заблокировано ** | Индикация блокировки двери |
| статус | обновлено ** | Отметка времени последнего обновления |

_ ** отмеченные состояния будут обновлены при действии Nuki, если установлен обратный вызов_

### Smartlocks и Opener (с Nuki Web API)
Блокировка будет создана как устройство с шаблоном имени ```door__<name of door>```. Следующие каналы / состояния будут созданы в каждой блокировке (при использовании Nuki Web API):

| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| - | \ _ACTION | Запустить действие на замок |
| - | id | ID Нуки |
| - | имя | Имя Нуки |
| - | тип | Тип устройства |
| - | журналы | Журналы / История Нуки |
| - | bridgeId | Мост ID Нуки |

#### Информация
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| информация | - | Дополнительная информация |
| информация | accountId | ID аккаунта |
| информация | authId | ID авторизации |
| информация | любимый | Любимый флаг |
| информация | Версия прошивки | Версия прошивки |
| информация | hardwareVersion | Аппаратная версия |
| информация | operationId | Идентификатор операции - если установлен, то устройство заблокировано для другой операции |
| информация | serverState | Состояние сервера <br> `{"0": 'OK', "1": 'UNREGISTERED', "2": 'AUTH UUID INVALID', "3": 'AUTH INVALID', "4": 'OFFLINE'}` |
| информация | adminPinState | Состояние пин-кода администратора <br> `{&quot; 0 &quot;: &#39;OK&#39;,&quot; 1 &quot;: &#39;MISSING&#39;,&quot; 2 &quot;: &#39;INVALID&#39;}` |
| информация | virtualDevice | Флаг, указывающий на виртуальный Smart Lock |
| информация | dateCreated | Дата создания |
| информация | dateUpdated | Дата обновления |

#### Государство
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| состояние | - | Текущее состояние замка |
| состояние | batteryCritical | Заявляет о критическом уровне заряда батареи |
| состояние | закрыто | Индикация закрытия двери (логическое значение для doorState) |
| состояние | doorState | Текущее состояние дверей Нуки |
| состояние | lastAction | Последнее сработавшее действие |
| состояние | lockState | Текущее состояние блокировки Нуки |
| состояние | заблокирован | Индикация блокировки двери |
| состояние | режим | Режим smartlock <br> `{"0": 'UNINITIALIZED', "1": 'PAIRING', "2": 'NORMAL', "3": 'UNKNOWN', "4": 'MAINTENANCE'}` |
| состояние | ringToOpenTimer | Оставшееся кольцо, чтобы открыть время |
| состояние | триггер | Состояние триггера <br> `{"0": 'SYSTEM', "1": 'MANUAL', "2": 'BUTTON', "3": 'AUTOMATIC', "4": 'WEB', "5": 'APP'}` |
| состояние | триггер | Состояние триггера <br> `{&quot; 0 &quot;: &#39;SYSTEM&#39;,&quot; 1 &quot;: &#39;MANUAL&#39;,&quot; 2 &quot;: &#39;BUTTON&#39;,&quot; 3 &quot;: &#39;AUTOMATIC&#39;,&quot; 4 &quot;: &#39;WEB&#39;,&quot; 5 &quot;: &#39;APP&#39;} `|

#### Общая конфигурация
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| config | - | Конфигурация |
| config | AdvertisingMode | Рекламный режим (экономия заряда батареи) <br> `{"0": 'AUTOMATIC', "1": 'NORMAL', "2": 'SLOW', "3": 'SLOWEST'}` |
| config | autoUnlatch | Верно, если дверь должна открываться при отпирании (ручка) |
| config | buttonEnabled | Верно, если кнопка на смартлоке включена |
| config | возможности | Возможности указывают, возможно ли открытие двери через приложение, RTO или оба |
| config | fobAction1 | Действие брелока при однократном нажатии кнопки <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction2 | Действие брелока при двойном нажатии кнопки <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Действие брелока при нажатии кнопки 3 раза <br> `{"0": 'NONE', "1": 'UNLOCK', "2": 'LOCK', "3": 'LOCK_N_GO', "4": 'INTELLIGENT'}` |
| config | fobAction3 | Действие брелока при нажатии кнопки 3 раза <br> `{&quot; 0 &quot;: &#39;NONE&#39;,&quot; 1 &quot;: &#39;UNLOCK&#39;,&quot; 2 &quot;: &#39;LOCK&#39;,&quot; 3 &quot;: &#39;LOCK_N_GO&#39;,&quot; 4 &quot;: &#39;INTELLIGENT&#39;}` |
| config | fobPaired | Верно, если брелок сопряжен со смартлоком |
| config | gpsLatitude | Широта |
| config | homekitState | Состояние homekit <br> `{"0": 'UNAVAILABLE', "1": 'DISABLED', "2": 'ENABLED', "3": 'ENABLED & PAIRED'}` |
| config | homekitState | Состояние homekit <br> `{&quot; 0 &quot;: &#39;НЕДОСТУПНО&#39;,&quot; 1 &quot;: &#39;ОТКЛЮЧЕНО&#39;,&quot; 2 &quot;: &#39;ВКЛЮЧЕНО&#39;,&quot; 3 &quot;: &#39;ВКЛЮЧЕНО И СОПРЯЖЕНО&#39;}` |
| config | keypadPaired | Верно, если клавиатура сопряжена со смартлоком |
| config | ledBrightness | Яркость светодиода: от 0 (выключено) до 5 (макс) |
| config | ledEnabled | Верно, если на смартлоке включен светодиод |
| config | имя | Название смартлока для новых пользователей |
| config | operatingMode | Режим работы сошника |
| config | pairingEnabled | Верно, если сопряжение разрешено через кнопку smartlock |
| config | singleLock | Истина, если смарт-блокировка должна блокироваться только один раз (а не дважды) |
| config | timezoneId | Идентификатор часового пояса |
| config | timezoneOffset | Смещение часового пояса (в минутах) |

#### Расширенная конфигурация
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| advancedConfig | - | Расширенная конфигурация |
| advancedConfig | autoLockTimeout | Секунды до повторной блокировки смарт-замка после разблокировки. Автоматическая повторная блокировка отсутствует, если значение равно 0. |
| advancedConfig | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| advancedConfig | batteryType | Тип батарейки в умном замке <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| advancedConfig | doubleButtonPressAction | Желаемое действие, если кнопку нажать дважды <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | doubleButtonPressAction | Желаемое действие, если кнопку нажать дважды <br> `{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| advancedConfig | lngTimeout | Тайм-аут в секундах для блокировки "n" |
| advancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз <br> `{"0": "NO_ACTION", "1": "INTELLIGENT", "2": "UNLOCK", "3": "LOCK", "4": "UNLATCH", "5": "LOCK_N_GO", "6": "SHOW_STATUS"}` |
| advancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз <br> `{&quot; 0 &quot;:&quot; NO_ACTION &quot;,&quot; 1 &quot;:&quot; INTELLIGENT &quot;,&quot; 2 &quot;:&quot; UNLOCK &quot;,&quot; 3 &quot;:&quot; LOCK &quot;,&quot; 4 &quot;:&quot; UNLATCH &quot;,&quot; 5 &quot;:&quot; LOCK_N_GO &quot;, &quot;6&quot;: &quot;SHOW_STATUS&quot;} `|
| advancedConfig | singleLockedPositionOffsetDegrees | Смещение, изменяющее одиночное заблокированное положение |
| advancedConfig | totalDegrees | Абсолютное общее положение в градусах, которое было достигнуто во время калибровки |
| advancedConfig | unlatchDuration | Время в секундах удержания защелки в открытом положении |
| advancedConfig | unlockedPositionOffsetDegrees | Смещение, изменяющее разблокированное положение |
| advancedConfig | unlockedToLockedTransitionOffsetDegrees | Смещение, изменяющее положение перехода из разблокированного состояния в заблокированное |

#### Расширенная конфигурация открывателя
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| openerAdvancedConfig | - | Конфигурация открывателя |
| openerAdvancedConfig | intercomId | ID базы данных подключенного домофона |
| openerAdvancedConfig | busModeSwitch | Способ переключения между режимом данных и аналоговым режимом <br> `{"0": 'DATA MODE', "1": 'ANALOGUE MODE'}` |
| openerAdvancedConfig | shortCircuitDuration | Длительность короткого замыкания при переключении режима шины в мс |
| openerAdvancedConfig | electricStrikeDelay | Задержка срабатывания электрического удара в мс (после срабатывания блокировки 3 -срабатывание электрического удара-) |
| openerAdvancedConfig | randomElectricStrikeDelay | Случайный electricStrikeDelay (диапазон 3000 - 7000 мс) для имитации человека внутри, активирующего электрический удар |
| openerAdvancedConfig | electricStrikeDuration | Продолжительность срабатывания электрического удара в мс (действие блокировки 3 -срабатывание электрического удара-) |
| openerAdvancedConfig | disableRtoAfterRing | Флаг для отключения RTO после звонка |
| openerAdvancedConfig | дверной звонокПодавление | Режим подавления дверного звонка <br> `{"0": 'NEVER', "1": 'ALWAYS', "2": 'RTO', "3": 'CONTINUOUS', "4": 'CONTINUOUS + RTO'}` |
| openerAdvancedConfig | дверной звонокПодавление | Режим подавления дверного звонка <br> `{&quot; 0 &quot;: &#39;НИКОГДА&#39;,&quot; 1 &quot;: &#39;ВСЕГДА&#39;,&quot; 2 &quot;: &#39;RTO&#39;,&quot; 3 &quot;: &#39;CONTINUOUS&#39;,&quot; 4 &quot;: &#39;CONTINUOUS + RTO&#39;}` |
| openerAdvancedConfig | дверной звонокSuppressionDuration | Продолжительность подавления дверного звонка в мс (только в режиме работы 2-цифровой домофон) |
| openerAdvancedConfig | soundRing | Звук для кольца |
| openerAdvancedConfig | soundOpen | Звук для открытых |
| openerAdvancedConfig | soundRto | Звук для RTO |
| openerAdvancedConfig | soundCm | Звук для CM |
| openerAdvancedConfig | soundConfirmation | Звуковое подтверждение |
| openerAdvancedConfig | soundLevel | Уровень звука |
| openerAdvancedConfig | singleButtonPressAction | Желаемое действие, если кнопка нажата один раз |
| openerAdvancedConfig | batteryType | Тип батарейки в умном замке <br> `{"0": 'ALKALI', "1": 'ACCUMULATOR', "2": 'LITHIUM'}` |
| openerAdvancedConfig | batteryType | Тип батарейки в умном замке <br> `{&quot; 0 &quot;: &#39;ЩЕЛЧКА&#39;,&quot; 1 &quot;: &#39;АККУМУЛЯТОР&#39;,&quot; 2 &quot;: &#39;ЛИТИЙ&#39;}` |
| openerAdvancedConfig | automaticBatteryTypeDetection | Флаг, указывающий, включено ли автоматическое определение типа батареи |
| openerAdvancedConfig | operationId | Идентификатор операции - если установленное устройство заблокировано для другой операции |

#### Пользователи
| Канал | Состояние | Описание (возможные значения) |
|:------- |:----- |:----------------------------- |
| пользователи | - | Пользователи замка |
| users._userName_ | - | Пользователь _userName_ |
| users._userName_ | allowedFromDate | Разрешенная с даты |
| users._userName_ | allowedUntilDate | Разрешено до даты |
| users._userName_ | allowedWeekDays | Разрешенные будние дни <br> `{64: 'Monday', 32: 'Tuesday', 16: 'Wednesday', 8: 'Thursday', 4: 'Friday', 2: 'Saturday', 1: 'Sunday'}` |
| users._userName_ | allowedFromTime | Разрешенное время (в минутах от полуночи) |
| users._userName_ | allowedUntilTime | Разрешенное до времени (в минутах от полуночи) |
| users._userName_ | authId | ID авторизации smartlock |
| users._userName_ | dateCreated | Дата создания |
| users._userName_ | dateUpdated | Дата обновления |
| users._userName_ | dateLastActive | Дата последней активности |
| users._userName_ | включен | Истинно, если пользователь включен |
| users._userName_ | id | Уникальный идентификатор пользователя |
| users._userName_ | lockCount | Количество блокировок |
| users._userName_ | имя | Имя пользователя |
| users._userName_ | remoteAllowed | Истина, если у авторизации есть удаленный доступ |
| users._userName_ | тип | Тип авторизации <br> `{"0": 'APP', "1": 'BRIDGE', "2": 'FOB', "3": 'KEYPAD', "13": 'KEYPAD CODE', "14": 'Z-KEY', "15": 'VIRTUAL'}` |
| users._userName_ | тип | Тип авторизации <br> `{&quot; 0 &quot;: &#39;APP&#39;,&quot; 1 &quot;: &#39;BRIDGE&#39;,&quot; 2 &quot;: &#39;FOB&#39;,&quot; 3 &quot;: &#39;KEYPAD&#39;,&quot; 13 &quot;: &#39;KEYPAD CODE&#39;,&quot; 14 &quot;: &#39;Z- KEY &#39;, &quot;15&quot;:&#39; VIRTUAL &#39;} `|

## Интеграция Smart Home / Alexa с использованием ioBroker.javascript
Некоторые примеры возможной интеграции в ваш умный дом.

### Запирайте дверь в 22:00 вечера
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

__Замените `nuki-extended.0.door__home_door.status.lockState` на lockState вашей блокировки! __ Вы также можете настроить сообщение с помощью `msg`.

### Пусть Alexa сообщит вам об изменениях блокировки
Для этого требуется адаптер ioBroker ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Чтобы использовать голосовой вывод Alexa, мы определяем функцию ```say```. Поместите следующую функцию в сценарий в «глобальной» папке ioBroker.javascript. ВАЖНО: замените # ВАШ ALEXA ID # (также замените #) своим идентификатором Alexa ID. Вы можете найти Alexa ID в дереве объектов ioBroker ```alexa2.0.Echo-Devices```.

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

Вы можете использовать эту функцию в ioBroker.javascript, чтобы произнести фразу, используя Alexa ```say('Hello World')``` или ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` для вывода голоса с нескольких устройств.

Создайте сценарий в «общей» папке ioBroker.javascript и добавьте к нему следующий слушатель. ВАЖНО: замените #LOCK STATE ID # (также замените #) на состояние, в котором хранится статус блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

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

### Пусть Telegram проинформирует вас об изменениях блокировки
Для этого требуется адаптер ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram).

Чтобы использовать вывод сообщений Telegram, мы определяем функцию ```msg``` и ```messenger```. Поместите следующую функцию в сценарий в «глобальной» папке ioBroker.javascript:

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

Вы можете использовать эту функцию в ioBroker.javascript для отправки чего-либо в Telegram через ```msg('Hello World')``` (для всех пользователей) или ```msg('Hello World', 'Zefau')``` (для определенных пользователей).

Создайте сценарий в «общей» папке ioBroker.javascript и добавьте к нему следующий слушатель. ВАЖНО: замените #LOCK STATE ID # (также замените #) на состояние, в котором хранится статус блокировки (например, ```nuki-extended.0.door__home_door.status.lockState```):

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

ПРИМЕЧАНИЕ. Если вы используете и Alexa, и сценарий Telegram, вы можете определить только одного слушателя для обоих действий:

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

### Пусть Telegram и Alexa сообщают вам о звонке через Opener
Для этого требуется адаптер ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram) и адаптер ioBroker ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

```javascript
/*
 * Alexa and Telegram to notify on Opener Ringing state
 *
 */
let phrase = 'Somebody is ringing the doorbell.'; // Es hat an der Tür geklingelt
on({id: 'nuki-extended.0.openers.opener.state.ringStateUpdate', change: "any", ack: true}, function (s) {
  let state= s && s.state;

  if (state.val === true) {
    setState("alexa2.0.Echo-Devices.#YOUR ALEXA ID#.Commands.speak"/*speak*/, phrase);
    sendTo("telegram", "send", { text: phrase });
  }
});
```

## Кредиты
Спасибо [@ Mik13] (https://github.com/Mik13) для [реализации Nuki Bridge API](https://github.com/Mik13/nuki-bridge-api#nuki-bridge-api).

Иконки, сделанные <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> ([Essential Set] (https://www.flaticon.com/packs/essential-set-2)) и <a href="https://www.freepik.com/" title="Freepik">Freepik</a> ([Doors](https://www.flaticon.com/packs/doors)) с <a href="https://www.flaticon.com/" title="Flaticon">сайта www.flaticon.com</a> , лицензированы <a href="http://creativecommons.org/licenses/by/3.0/" title="Лицензия Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

## Changelog

Please see [release page](https://github.com/Zefau/ioBroker.nuki-extended/releases) for changelog and detailed information.

### v2.3.0 (2020-08-10)
- (Zefau) added support for the door sensor of the Nuki Smartlock ([introduced with Bridge firmware 2.6.0 / 1.16.0](https://developer.nuki.io/t/bridge-beta-fw-2-6-0-1-16-0-with-door-sensor-state/6159))
- (Zefau) added support for the ring bell action of the Nuki Opener ([introduced with Bridge firmware 2.7.0 / 1.17.0](https://developer.nuki.io/t/bridge-beta-fw-2-7-0-1-17-0/6792))

### v2.2.6 (2020-07-14)
- (Zefau) fixed Web API not refreshing correctly (see [#59](https://github.com/Zefau/ioBroker.nuki-extended/issues/59))
- (Zefau) updated dependencies

### v2.2.5 (2020-03-19)
- (Zefau) fixed incorrect versioning

### v2.2.4 (2020-03-18)
- (Zefau) fixed incorrect dates of version history (see [#60](https://github.com/Zefau/ioBroker.nuki-extended/issues/60))

### v2.2.3 (2020-03-04)
- (Zefau) added refresh of configuration (via Nuki Web API) when any config item has been changed in ioBroker

### v2.2.2 (2020-03-04)
- (Zefau) fixed incorrect error message `Error triggering action via Nuki Bridge API: No Nuki Hex ID given!`
- (Zefau) added new error message if too many callbacks are already attached to Nuki Bridge (`Callback not attached because too many Callbacks attached to the Nuki Bridge already! Please delete a callback!`)

### v2.2.1 (2020-03-03)
- (Zefau) fixed incorrect state mapping of state `openerAdvancedConfig.doorbellSuppression`

  **Note:** Please delete the state `openerAdvancedConfig.doorbellSuppression` once manually and restart the adapter to take affect!
  
- (Zefau) updated dependencies

### v2.2.0 (2020-02-16)
- (Zefau) added possibility to change configuration of Nuki Smartlock or Nuki Opener (when using Web API)
- (Zefau) updated dependencies

### v2.1.0 (2020-02-03)
- (Zefau) added (optional) callback IP for Bridge API events (e.g. when ioBroker is run in docker; see [#51](https://github.com/Zefau/ioBroker.nuki-extended/issues/51))
- (Zefau) added dedicated buttons for each lock / opener action
- (Zefau) replaced `state.timestamp` with `state.lastDataUpdate` (indicates last data refresh from the APIs) and `state.lastStateUpdate` (indicates the last actual state change)

### v2.0.3 (2019-10-31)
- (Zefau) reintroduced support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)

### v2.0.2 (2019-10-31)
- (Zefau) added support for newly introduced nightmode (see https://nuki.io/de/blog/nuki-news-de/nuki-update-2019-der-winter-naht-sei-vorbereitet/)
- (Zefau) fixed incorrect behavior when bridges are defined insufficiently (no name, ip or token provided)

### v2.0.1 (2019-10-26)
- (Zefau) fixed missing `bridge_name`

### v2.0.0 (2019-10-24)
- (Zefau) added support for new Nuki Opener
- (Zefau) added support for hashed token on hardware bridges (see https://developer.nuki.io/page/nuki-bridge-http-api-190/4#heading--token)
- (Zefau) added fallback to Nuki Web API in case applied actions on Nuki Bridge API fail, e.g. due to bridge error 503 (see https://developer.nuki.io/t/random-http-503-unavailable/909/85?u=zefau)
- (Zefau) added retry in case applied actions on Nuki Bridge API fail (when Nuki Web API is not used)
- (Zefau) added option to regularly synchronise instead of using Bridge API callback
- (Zefau) added refreshing all states of Nuki Web API when callback is received via Nuki Bridge API
- (Zefau) added states for Nuki Notifications
- (Zefau) added support for multiple devices (including Nuki Opener) on adapter web interface
- (Zefau) added option to not retrieve all information (by deselecting `config` or `users`) via Nuki Web API

## License
The MIT License (MIT)

Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>

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