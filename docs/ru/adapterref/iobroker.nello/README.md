---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nello/README.md
title: ioBroker.nello
hash: 9mYaOuhtrAZlJJyFGdwkd5IDvGd7MlrkrbIjH4DUI2U=
---
![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Количество установок](http://iobroker.live/badges/nello-installed.svg)
![Стабильная версия](http://iobroker.live/badges/nello-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.nello.svg)
![Трэвис CI](https://travis-ci.org/Zefau/ioBroker.nello.svg?branch=master)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nello.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/Zefau/ioBroker.nello.svg)
![NPM](https://nodei.co/npm/iobroker.nello.png?downloads=true)

: heavy_exclamation_mark: | **API nello был закрыт.** Этот адаптер, таким образом, не будет работать.
------------ | -------------

________________________

![логотип](../../../en/adapterref/iobroker.nello/admin/nello.png)

# IoBroker.nello Nello One соединяет ваш интерком с вашим смартфоном и Wi-Fi. Этот адаптер соединяет ваш nello one с ioBroker с помощью официального API (https://nellopublicapi.docs.apiary.io/).
Разработчики могут найти реализацию javascript API nello.io через https://github.com/Zefau/nello.io.

## [Немецкий Readme / Deutsche Anleitung](https://github.com/Zefau/ioBroker.nello/blob/master/README.de.md)
**Оглавление**

1. [Особенности] (# функции)
2. [Инструкции по настройке (Быстрая настройка)] (# быстрая настройка)
3. [Инструкции по настройке (расширенная настройка)] (# расширенная настройка)
4. [Использование / Действия] (# использование - действия)
   1. [Открытая дверь] (# открытая дверь)
   2. [Добавление временного окна] (# добавление нового временного окна)
   3. [Удаление временного окна] (# удаление временного окна)
5. [Умный дом / интеграция Alexa с использованием ioBroker.javascript] (# smart-home - alexa -gration-using-iobrokerjavascript)
   1. [Открыть дверь, используя Alexa] (# open-door-using-alexa)
   2. [Пусть Алекса сообщит вам о дверном звонке] (# let-alexa-inform-you-about-door-ring)
   3. [Пусть Telegram сообщит вам о дверном звонке] (# let-telegram-inform-you-about-door-ring)
   4. [Пусть цветные лампы сообщают вам о дверном звонке] (# пусть цветные лампы сообщают вам о дверном кольце)
6. [Кредиты] (# кредитов)
7. [Changelog] (# changelog)
8. [Лицензия] (# лицензия)

## Особенности
Следующие функции поставляются с этим адаптером:

- Получить __all location__ из nello, включая `address` и` time windows` (полный список см. В [States] (# states))
- Добавить и удалить временные окна через ioBroker
- Получайте всевозможные «события» от Нелло, когда звонит ваш дверной звонок
  - __deny__: когда nello обнаруживает звонок, но ни из-за временного окна, ни из-за события домашней зоны дверь не открывается.
  - __swipe__: когда дверь открывается авторизованным пользователем.
  - __geo__: Когда дверь открыта из-за функции разблокировки Homezone (со звонком).
  - __tw__: когда дверь открывается из-за времени (с звонком).
- Пусть Алекса проинформирует вас о дверном звонке ([см. Ниже] (# let-alexa-inform-you-about-door-ring))
- вызвать __открыть дверь__ от ioBroker
- __Web Interface__, который показывает последние события от nello:

  ![Интерфейс Nello](../../../en/adapterref/iobroker.nello/screenshots/interface.png)

## Инструкции по настройке
### Быстрая установка
API аутентификации nello отвечает за аутентификацию всех клиентских приложений nello. Этот сервис следует OAuth2 в качестве схемы аутентификации для аутентификации приложения / пользователя. Для получения дополнительной информации о стандарте OAuth2, пожалуйста, проверьте здесь: https://oauth.net/2/.
Чтобы использовать эту службу, учетные данные клиента должны быть получены из пользовательского интерфейса администратора nello, расположенного по адресу: https://auth.nello.io/admin. Обратите внимание, что в настоящее время вы можете получить только одну пару client_id и client_secret. Они состоят из client_id и client_secret.

1. Сгенерируйте идентификатор клиента и секрет клиента на https://auth.nello.io/admin.
2. В настройках адаптера ioBroker.nello введите оба идентификатора клиента / секрет клиента.
3. Нажмите кнопку «Получить токен», чтобы сгенерировать токен.
4. Сохраните и наслаждайтесь адаптером

Эта быстрая настройка извлечет ваши местоположения (все доступные двери) из API nello, включая соответствующий адрес. Кроме того, назначенные временные окна местоположений будут восстановлены. Кроме того, вы можете открыть дверь с помощью этой базовой установки.
Чтобы получать события (звонок в дверь), вы должны выполнить расширенную настройку.

#### Журнал
Если вы успешно быстро настроили ioBroker.nello, в журнале ioBroker вы найдете следующее:

```
nello.0	2018-11-24 21:29:48.132	info	Updating time windows of location XXXXX.
nello.0	2018-11-24 21:29:47.905	info	Updating location: {"location_id":"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX","address":{"number":"X","country":"XXXXX","street":"XXXXX ","zip":"XXXXX","city":"XXXXX","state":""}}
nello.0	2018-11-24 21:29:47.342	info	starting. Version X.X.X in /opt/iobroker/node_modules/iobroker.nello, node: vX.XX.X
```

#### Состояния
Если вы успешно быстро настроили ioBroker.nello, вы найдете ваши двери в качестве устройств в «** nello.0. **». Формат двери: _xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_. Внутри каждого устройства создаются следующие каналы и состояния:

| Канал | Государство | Описание |
|:------- |:----- |:------------- |
| адрес | - | Адресные данные местоположения |
| адрес | адрес | Полный адрес места нахождения |
| адрес | город | Город расположения |
| адрес | страна | Страна расположения |
| адрес | состояние | Состояние местоположения |
| адрес | улица | Улица с номером места |
| адрес | streetName | Название улицы местоположения |
| адрес | streetNumber | Улица номер места |
| адрес | почтовый индекс | Почтовый индекс местоположения |
| TimeWindows | - | Окно времени локации |
| TimeWindows | indexedTimeWindows | Индекс всех временных окон |
| TimeWindows | deleteAllTimeWindows | Удаление всех временных окон |
| TimeWindows | **createTimeWindow** \ * | JSON-объект для создания нового временного окна ([Документация](#adding-a-new-time-window)) |
| timeWindows.0000000000000000000 | - | Временное окно: описание временного окна |
| timeWindows.0000000000000000000 | включен | Укажите, включено ли временное окно |
| timeWindows.0000000000000000000 | icalObj | JSON объект календарных данных |
| timeWindows.0000000000000000000 | icalRaw | Текст данных календаря в формате iCal |
| timeWindows.0000000000000000000 | id | ID временного окна |
| timeWindows.0000000000000000000 | изображение | (не используется) |
| timeWindows.0000000000000000000 | имя | Название временного окна |
| timeWindows.0000000000000000000 | состояние | Государство |
| timeWindows.0000000000000000000 | **deleteTimeWindow** \ * | Удалить это временное окно |
| - | **& # 95; openDoor** \ * | Открытая дверь локации XXXXX |
| - | id | ID местоположения XXXXX |
| - | refreshedDateTime | Последнее обновление (DateTime) местоположения XXXXX |
| - | refreshedTimestamp | Последнее обновление (метка времени) местоположения XXXXX |

\ * _светящиеся состояния будут запускать / выполнять действие при изменении_

** Примечание: вы будете _только_ видеть эти состояния, если вы успешно настроили ioBroker.nello! **

### Дополнительные настройки
#### Вариант 1: ioBroker.cloud / ioBroker.iot Пользовательский URL (рекомендуется)
Для получения событий (звонков в дверь) рекомендуется использовать адаптер ioBroker.cloud или ioBroker.iot.
Adpater ioBroker.cloud / ioBroker.iot получит событие от nello и запишет его в состоянии, которое затем может быть прочитано адаптером ioBroker.nello.

##### IoBroker.iot
1. Перейдите в настройки адаптера ioBroker.iot и перейдите на вкладку _Services и IFTTT_.
2. Добавьте термин «_nello_» в «_White list for services_» и скопируйте ссылку для пользовательских служб («_Используйте следующую ссылку для custom service_»), которая выглядит как `` `https://service.iobroker.in / v1 / iotService? сервис = custom_ <SERVICE_NAME> &key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&user=email@domain.com&data= <some_text> `` `.

   ![Шаг 2](../../../en/adapterref/iobroker.nello/screenshots/step-2.jpg)

3. Замените `` `custom_ <SERVICE_NAME>` `` на имя службы `` `custom_nello``` (убедитесь, что термин, добавленный к` `` custom_````, соответствует слову из белого списка на шаге # 2). Кроме того, удалите `` `& data = <SOME_TEXT>` ``, потому что это не обязательно.
4. Перейдите в **конфигурацию адаптера nello** и вставьте ссылку в "_ioBroker.iot URL службы_" (в варианте 1).

   ![Шаг 4](../../../en/adapterref/iobroker.nello/screenshots/step-4.jpg)

5. Сохраните настройки адаптера nello и дождитесь, пока он не запустится. Затем позвоните в вашу дверь и убедитесь, что ioBroker.iot создал состояние. Вы найдете состояние под названием `` `custom_nello``` в объектах ioBroker через` `` iot.0.services```.

   ![Шаг 6](../../../en/adapterref/iobroker.nello/screenshots/step-6.jpg)

6. После успешного создания состояния перезапустите адаптер nello еще раз, чтобы убедиться, что адаптер nello подписывается на это вновь созданное состояние iot.

##### IoBroker.cloud
1. Перейдите в настройки адаптера ioBroker.cloud и перейдите на вкладку _Services и IFTTT_.
2. Добавьте термин «_nello_» в «_White list for services_» и скопируйте ссылку для пользовательских служб («_Используйте следующую ссылку для custom service_»), которая выглядит как `` `https://iobroker.net/service / `` `.
3. Добавьте `` `custom_nello``` (убедитесь, что термин, добавленный к` `` custom_```, соответствует слову из белого списка на шаге # 2).
4. Добавьте свой ключ API, чтобы URL в конечном итоге выглядел как `` `https:// iobroker.net / service / custom_nello / xxxxxx```.
5. Перейдите в **конфигурацию адаптера nello** и вставьте ссылку в «_ioBroker.iot URL службы» (в варианте 1).
6. Сохраните настройки адаптера nello и дождитесь, пока он не запустится. Затем позвоните в вашу дверь и убедитесь, что состояние было создано ioBroker.cloud. Вы найдете состояние `` `custom_nello``` внутри объектов ioBroker через` `` cloud.0.services```.
7. После успешного создания состояния перезапустите адаптер nello еще раз, чтобы убедиться, что адаптер nello подписывается на это вновь созданное состояние облака.

#### Вариант 2: URL-адрес DynDNS
Для получения событий (звонков в дверь) вы также можете указать внешний URL-адрес (с портом) в настройках адаптера ioBroker.nello.
Этот URL (включая порт) отправляется в API nello и регистрируется. Если API зарегистрировал звонок в дверь, API отправит эту информацию по указанному URL. Пожалуйста, обратитесь к https://en.wikipedia.org/wiki/Webhook для получения дополнительной информации.
Если у вас нет адреса DynDNS и вы не знаете, о чем я говорю, пожалуйста, обратитесь к https://www.howtogeek.com/66438/how-to-easily-access-your-home-network-from-anywhere- с-DDNS /.

1. Поместите внешний адрес DynDNS, включая выбранный вами порт, в настройках адаптера ioBroker.nello.
2. Откройте порт по вашему выбору в маршрутизаторе и направьте его на ioBroker
3. Готово. Теперь у вас будут дополнительные состояния в дереве nello в канале «events», а все события записываются в состояние с именем «feed».

#### Журнал
Независимо от выбранной вами опции, если вы успешно выполнили расширенную настройку ioBroker.nello, в журнале ioBroker вы найдете следующее:

```
nello.0	2018-11-24 21:29:48.220	info	Listener attached to uri https://XXXX.XXXXX.XX:YYYY.
```

В случае, если событие было распознано слушателем webook, вы найдете любую из этих записей в журнале ioBroker:

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -deny-).
```

** deny **: когда nello обнаруживает звонок, но ни из-за окна времени, ни из события домашней зоны дверь не открывается.

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -swipe-).
```

** Размах **: когда дверь открывается авторизованным пользователем.

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -geo-).
```

** geo **: когда дверь открыта из-за функции разблокировки Homezone (со звонком).

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -tw-).
```

** tw **: когда дверь открывается из-за времени (с звонком).

#### Состояния
Если вы успешно выполнили расширенную настройку ioBroker.nello, будут созданы следующие дополнительные каналы и состояния:

| Канал | Государство | Описание |
|:------- |:----- |:------------- |
| события | - | События локации |
| события | кормить | Лента активности / История событий |
| события | refreshedDateTime | DateTime последнего события |
| события | refreshedTimestamp | Отметка времени последнего события |

** Примечание: вы будете _только_ видеть эти состояния, если вы успешно выполнили расширенную настройку ioBroker.nello И первое событие, которое было распознано (кто-то позвонил вам)! **

Состояние «feed» предоставит JSON всех событий, зарегистрированных webhook. Это будет массив объектов, где каждый объект предоставляет следующие индексируемые значения (подробности см. В https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/add-/-update-webhook):

- **действие** отказать, провести, два или гео
- **данные**:
    - location_id
    - метка времени
    - user_id (только действия смахивания, tw или geo)
    - имя (только действия смахивание, два или гео)

## Использование / Действия
### Открытая дверь
Чтобы открыть дверь своего nello, нажмите кнопку состояния ```_openDoor```.

### Добавление нового временного окна Для добавления нового временного окна вставьте содержимое в состояние ```timeWindows.createTimeWindow```. Ожидается следующий формат:
```
{"name":"<NAME>","ical":"<iCal-String>"}
```

Формат iCal-String можно найти в документации по API Nello (https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/create-a-new-time-window). **Важно отделить отдельные элементы с помощью ```\r\n```**

Пример временного окна:

```
{"name":"Cleaner","ical":"BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nDTSTART:20190101T163000Z\r\nDTEND:20190101T170000Z\r\nSUMMARY:Cleaner\r\nEND:VEVENT\r\nEND:VCALENDAR"}
```

### Удаление временного окна
Чтобы удалить временное окно, нажмите кнопку в дереве объектов соответствующего временного окна.

## Умный дом / интеграция с Alexa с использованием ioBroker.javascript
Некоторые примеры возможной интеграции в вашем умном доме.

### Открыть дверь с помощью Alexa
Для этого требуется адаптер ioBroker ioBroker.cloud (https://github.com/ioBroker/ioBroker.cloud).

Сохраните следующую функцию в скрипте в «глобальной» папке на вкладке «Сценарии» ioBroker:

```javascript
/**
 * Register node in Cloud Adapter
 *
 * @param   {string}    node        Node to be published
 * @param   {string}    label       Name / label of the node within Cloud Adapter
 * @param   {object}    settings    (optional) Extra settings
 * @param   {string}    type        (optional) Type of node, e.g. LIGHT, SWITCH, THERMOSTAT, ACTIVITY_TRIGGER, SCENE_TRIGGER, SMARTPLUG, SMARTLOCK, CAMERA
 * @param   {string}    byOn        (optional) Default when turning on
 * @return  void
 */
function cloud(node, label, settings = {})
{
    log('Published '+node+' as '+label+' in Cloud Adapter.');

    settings = typeof settings === 'string' ? {type: settings} : settings;
    extendObject(node, {common: {smartName: {en: label, smartType: settings.type || 'SWITCH', byON: settings.byON || ''}}});
}
```

_ (обновлено 2018-11-22 и исправлены неправильные пустые настройки) _

Вы можете использовать эту функцию для каждого состояния в дереве объектов ioBroker, чтобы зарегистрировать состояние в адаптере ioBroker.cloud и использовать его в Alexa.
** ВАЖНО **: Зайдите в настройки адаптера ioBroker.javascript и установите флажок «Включить команду setObject»!

Теперь создайте новый скрипт в «общей» папке, используя функцию:

```javascript
cloud('nello.0.#YOUR DOOR ID#._openDoor', 'Tür öffnen');
```

Замените **# ВАШ ДВЕРИ ID #** (также замените #) идентификатором двери, которую вы хотите открыть. Вы найдете идентификатор в дереве состояний ioBroker.nello (вкладка «Объекты» в ioBroker).

В конце концов, найдите / откройте новые устройства в вашем приложении Alexa и создайте подпрограмму в приложении Alexa (например, «Alexa, open door») и назначьте ему новое обнаруженное состояние. Законченный! Теперь вы можете сказать Алексе, чтобы открыть вашу дверь для вас.

### Пусть Алекса проинформирует вас о дверном звонке
Для этого требуется адаптер ioBroker ioBroker.alexa2 (https://github.com/Apollon77/ioBroker.alexa2).

Чтобы использовать голосовой вывод Alexa, мы определяем функцию ```say```. Поместите следующую функцию в скрипт в «глобальную» папку ioBroker.javascript (вы можете поместить ее в ту же, что и выше). **ВАЖНО** замените #YOUR ALEXA ID # (также замените #) на ваш Alexa ID. Вы можете найти Alexa ID в дереве объектов ioBroker ```alexa2.0.Echo-Devices```.

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

_ (обновлено 2018-11-18 для поддержки голосового вывода с нескольких устройств alexa одновременно) _

Вы можете использовать эту функцию в ioBroker.javascript, чтобы произнести фразу, используя Alexa ```say('Hello World')``` или ```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])``` для голосового вывода с нескольких устройств.

Создайте сценарий в «общей» папке ioBroker.javascript (или используйте тот, который вы создали выше) и добавьте в него следующего слушателя:

```javascript
var L = {
   'actionRingUnknown': 'Es hat geklingelt',
   'actionOpenName': '%name% hat die Tür geöffnet',
   'actionOpenGeo': '%name% hat das Haus betreten',
   'actionOpen': 'Die Haustür wurde geöffnet'
};

on({id: 'nello.0.ID.events.feed', change: 'any'}, function(obj)
{
   var events = obj && obj.state && JSON.parse(obj.state.val);
   if (!events || events.length == 0) return;

   var event = events[events.length-1];
   if (event.action == 'deny')
      say(L.actionRingUnknown);

   else if (event.action == 'swipe')
      say(L.actionOpenName.replace(/%name%/gi, event.data.name));

   else if (event.action == 'geo')
      say(L.actionOpenGeo.replace(/%name%/gi, event.data.name));

   else
      say(L.actionOpen);
});
```

_ (обновлено 2019-01-02, чтобы также отражать гео-опцию с конкретной фразой Alexa) _

Основываясь на действии мероприятия, Алекса проинформирует вас об открываемой двери или распознавании дверного звонка.
** ВАЖНО **: замените #YOUR DOOR ID # (также замените #) на ваш nello ID двери.

### Пусть Telegram сообщит вам о дверном звонке
Для этого требуется адаптер ioBroker ioBroker.telegram (https://github.com/iobroker-community-adapters/ioBroker.telegram#iobroker-telegram-adapter).

Чтобы использовать мессенджер Telegram, мы определяем функцию ```msg```. Поместите следующую функцию в скрипт в «глобальную» папку ioBroker.javascript (вы можете поместить ее в ту же, что и выше).

```javascript
/**
 * Send something with Telegram
 *
 * @param       {string}        content         Content to send via Telegram
 * @param       {string}  		[user='']		User to send the content to
 * @return      void
 *
 */
function msg(content, user = '')
{
    const CONFIG = {
        text: content,
        parse_mode: 'HTML'
    };

    sendTo('telegram', user ? Object.assign({user: user}, CONFIG) : CONFIG);
}
```

Вы можете использовать эту функцию в ioBroker.javascript для отправки чего-либо в Telegram, используя ```msg('Hello World')```. Вы можете использовать ```msg('Hello World', 'User')``` для отправки контента определенному пользователю.

Создайте сценарий в «общей» папке ioBroker.javascript (или используйте тот, который вы создали выше) и добавьте в него следующего слушателя:

```javascript
var L = {
   'actionRingUnknown': 'Es hat geklingelt',
   'actionOpenName': '%name% hat die Tür geöffnet',
   'actionOpenGeo': '%name% hat das Haus betreten',
   'actionOpen': 'Die Haustür wurde geöffnet'
};

on({id: 'nello.0.ID.events.feed', change: 'any'}, function(obj)
{
   var events = obj && obj.state && JSON.parse(obj.state.val);
   if (!events || events.length == 0) return;

   var event = events[events.length-1];
   if (event.action == 'deny')
      msg(L.actionRingUnknown);

   else if (event.action == 'swipe')
      msg(L.actionOpenName.replace(/%name%/gi, event.data.name));

   else if (event.action == 'geo')
      msg(L.actionOpenGeo.replace(/%name%/gi, event.data.name));

   else
      msg(L.actionOpen);
});
```

В зависимости от действия мероприятия Telegram сообщит вам об открываемой двери или о том, что дверной звонок распознан.

### Пусть цветные лампы сообщат вам о дверном кольце
Для этой функции требуется адаптер, который может устанавливать цветные / RGB лампы, например, ioBroker.hue (https://github.com/ioBroker/ioBroker.hue).

Для использования цветных ламп необходимо определить функции ```color``` и ```colors```. Поместите следующие функции в скрипт в «глобальную» папку ioBroker.javascript (вы можете поместить его в ту же, что и выше):

```javascript
/**
 * Visualize a message using a color / hue.
 *
 * @param       {string|array}  devices         Device(s) the color shall be set
 * @param       {object}        hue             Color code to bet set
 * @param       {integer}       hue.r           (optional) Red part of the color to be set
 * @param       {integer}       hue.g           (optional) Green part of the color to be set
 * @param       {integer}       hue.b           (optional) Blue part of the color to be set
 * @param       {integer}       hue.w           (optional) White part of the color to be set
 * @param       {integer}       hue.bri         (optional) Brightness part of the color to be set
 * @param       {integer}       hue.rgb         (optional) All RGB parts of the color to be set
 * @return      void
 *
 */
function color(devices, hue)
{
    devices = typeof devices === 'string' ? [devices] : devices;
    devices.forEach(function(device)
    {
	    ['b', 'g', 'w', 'r', 'bri', 'rgb'].forEach(function(key)
    	{
    		if (hue[key] !== undefined)
    			setState(device + '.' + key, hue[key]);
    	});
    });
}
```

```javascript
/**
 * Append multiple messages using a delay to create a light sequence.
 *
 * @param       {string|array}  devices         Device(s) the color shall be set
 * @param       {array}         hues            Color code to bet set
 * @param       {number}        delay           (optional) Delay between steps
 * @param       {number}        start           (optional) Delayed start
 * @return      {number}                        Total delay used
 *
 */
function colors(devices, hues, delay = 3000, start = 0)
{
    var delayed = start;
    devices = typeof devices === 'string' ? [devices] : devices;
    devices.forEach(function(device)
    {
        // get initial state and colors
        var defaults = {};
        ['on', 'xy', 'bri'].forEach(function(initial) {defaults[initial] = getState(device + '.' + initial).val});

        // turn lights on if currently off
        if (defaults.on !== true)
        {
            setState(device + '.on', true);
            delayed += 800;
        }

        // loop through colors
        hues.forEach(function(hue, i)
    	{
            delayed += delay;
            setTimeout(function()
            {
                color(device, hue);
            }, delayed);
    	});

        // restore initial states
        delayed += 1000;
        setTimeout(function()
        {
            setState(device + '.xy', defaults['xy']);
            if (defaults['on'] === true)
                setState(device + '.bri', defaults['bri']);
        }, delayed);

        // turn off again (if it was off)
        if (defaults['on'] === false)
        {
            delayed += 2000;
            setTimeout(function() {setState(device + '.on', false)}, delayed); // delayed so colors is set before turned off
        }
    });

    return delayed;
}
```

_ (обновлено 2019-01-20 для устранения проблемы [# 11](https://github.com/Zefau/ioBroker.nello/issues/11)) _

Вы можете использовать эти функции в ioBroker.javascript для окрашивания любой лампы, например, с помощью ```color('hue.0.Philips_hue.Lamp', {'r': 0, 'g': 255, 'b': 0})``` (зеленый цвет) или ```color(['hue.0.Philips_hue.Lamp1', 'hue.0.Philips_hue.Lamp2'], {'r': 0, 'g': 255, 'b': 0})```, чтобы окрасить несколько устройств.

Создайте сценарий в «общей» папке ioBroker.javascript (или используйте тот, который вы создали выше) и добавьте в него следующего слушателя:

```javascript
var lamp = '#YOUR LAMP#'; // e.g. hue.0.Philips_hue.Lamp
var rgb = {
   'actionRingUnknown': {'r': 255, 'g': 0, 'b': 0, 'bri': 255},
   'actionOpenName': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'actionOpenGeo': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'actionOpen': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'reset': {'r': 255, 'g': 255, 'b': 255, 'bri': 255},
};

on({id: 'nello.0.#YOUR DOOR ID#.events.feed', change: 'any'}, function(obj)
{
   var events = obj && obj.state && JSON.parse(obj.state.val);
   if (!events || events.length == 0) return;

    var event = events[events.length-1];
    if (event.action == 'deny')
        colors(lamp, [
            rgb.actionRingUnknown,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else if (event.action == 'swipe')
        colors(lamp, [
            rgb.actionOpenName,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else if (event.action == 'geo')
        colors(lamp, [
            rgb.actionOpenGeo,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else
        colors(lamp, [
            rgb.actionOpen,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);
});
```

В зависимости от действия события лампы будут окрашены с заданными значениями.
** ВАЖНО **: замените ** # ВАШУ ЛАМПУ # ** (также замените #) на состояние лампы, которую вы хотите покрасить. Замените ** # ВАШ ДВЕРИ ID # ** (также замените #) на ваш номер двери Nello

## Кредиты
Иконки, сделанные <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> от <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> , лицензированы <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

## Changelog

### 2.0.8 (2019-08-11)
- (Zefau) Fixed Error `State not properly defined`

### 2.0.7 (2019-08-10)
- (Zefau) Performance improvements

### 2.0.6 (2019-07-20)
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 2.0.5 (2019-05-15)
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#25](https://github.com/Zefau/ioBroker.nello/pull/25))
- (Zefau) updated dependencies

### 2.0.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#17](https://github.com/Zefau/ioBroker.nello/pull/17)) and Update CI testing ([#19](https://github.com/Zefau/ioBroker.nello/pull/19))

### 2.0.3 (2019-03-03)
- (Zefau) added folder `.events.latest` with states `action`, `twName`, `userId` and `userName` reflecting the information of the latest event

### 2.0.2 (2019-02-09)
- (Zefau) fixed error incorrectly stating a missing token

### 2.0.1 (2019-02-01)
- (Zefau) added error stack trace in log debug output
- ([@ldittmar81](https://github.com/ldittmar81)) added support for gulp

### 2.0.0 (2019-01-27)
- (Zefau) added visual timeline of nello events
- (Zefau) support for [ioBroker compact mode](https://forum.iobroker.net/viewtopic.php?f=24&t=20387#p213466)
- (Zefau) updated API dependency

### 1.x.x
For earlier release, [please see Github branch for v1](https://github.com/Zefau/ioBroker.nello/tree/v1#changelog).

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Zefau <zefau@mailbox.org>

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