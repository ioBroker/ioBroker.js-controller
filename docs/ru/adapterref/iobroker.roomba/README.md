---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: 4QSunjs5xSBvOiA0U5aoHQDA8EhXC1dTvTjqLGNsTDk=
---
![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Количество установок](http://iobroker.live/badges/roomba-installed.svg)
![Стабильная версия](http://iobroker.live/badges/roomba-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.roomba.svg)
![Трэвис CI](https://travis-ci.org/Zefau/ioBroker.roomba.svg?branch=master)
![Загрузки](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![NPM](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

: heavy_exclamation_mark: | **РАЗРАБОТКА ДВИЖЕНА В [СООБЩЕСТВО](https://github.com/iobroker-community-adapters/ioBroker.roomba).** ------------ | -------------

________________________

![логотип](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

# IoBroker.roomba Подключите iRobot Roomba к ioBroker.
Основано на библиотеке dorita980 https://github.com/koalazak/dorita980#readme

**Содержание**

1. [Особенности] (# функции)
2. [Установка] (# установка)
3. [Инструкции по настройке] (# инструкции по настройке)
4. [Поддерживаемые версии Roomba / прошивки] (# support-roombas - firmware-version)
5. [Каналы и состояния] (# каналы - состояния)
6. [Описание предпочтений (неполное)] (# описание-предпочтений-неполное)
7. [Умный дом / интеграция Alexa с использованием ioBroker.javascript] (# умный дом - alexa -gration-using-iobrokerjavascript)
8. [Changelog] (# changelog)
9. [Кредиты] (# кредитов)
10. [Лицензия] (# лицензия)

## Характеристики
Следующие функции поставляются с этим адаптером:

- __Отправить команды__ (`start`,` stop`, `resume`,` pause`, `dock`) на ваш Roomba
- Извлечение __device состояний__, таких как батарея, закрепленный, полный / вставленный лоток (полный список см. В разделе [Каналы и состояния] (# каналы - состояния))
- Получить __device configuration__, например, настройки, настройки сети или расписания (полный список см. В разделе [Каналы и состояния] (# каналы - состояния)).
- Получить статистику __device__, такую как общее количество миссий, количество часов на стыковочной станции и т. Д. (Полный список см. В разделе [Каналы и состояния] (# каналы - состояния))
- Получить информацию о __current mission__ (когда уборка Roomba), например время начала и окончания, общее время выполнения, очищенный sqm и т. Д. (Только для поддерживаемых Roomba см. [Поддерживаемые версии Roomba / Прошивки] (# support-roombas --firmware-версия))
- __Draw карта на основе полученных данных миссии__ (только на поддерживаемых Roomba's)
- __Web Interface__, который показывает статус и карту текущих, а также предыдущих / архивных миссий:

  ![Roomba Интерфейс](../../../en/adapterref/iobroker.roomba/img/roomba.interface.png)

## Установка
ioBroker.roomba нужен [холст](https://www.npmjs.com/package/canvas), чтобы нарисовать карты миссий Roomba. ioBroker попытается установить эту зависимость при установке ioBroker.roomba.

Тем не менее, вам, вероятно, придется установить зависимости пакета canvas (и самого canvas) с помощью следующей команды:

### Linux
```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Кроме того, выполните следующую команду __ в каталоге ioBroker.roomba__ (`/opt/iobroker/node_modules/iobroker.roomba`):

```
sudo npm install canvas --unsafe-perm=true
```

### Windows
1. Убедитесь, что у вас установлен `node-gyp` через

```
npm install -g node-gyp
```

2. Убедитесь, что вы установили основы сборки через

```
npm install --global --production windows-build-tools
```

3. Загрузите GTK 2 (для [Win32] (http://ftp.gnome.org/pub/GNOME/binaries/win32/gtk+/2.24/gtk+-bundle_2.24.10-20120208_win32.zip) или [Win64] (http://ftp.gnome.org/pub/GNOME/binaries/win64/gtk+/2.22/gtk+-bundle_2.22.1-20101229_win64.zip)) и распакуйте его (например, в `C: \ path \ to \ GTK2`)
4. Беги

```
node-gyp rebuild --GTK_Root=C:\path\to\GTK2
```

5. Установите холст из папки iobroker.roomba.

```
cd C:\path\to\iobroker\node_modules\iobroker.roomba
npm install canvas
```

Для получения дополнительной информации см. Https://github.com/Automattic/node-canvas/wiki/Installation:-Windows.

## Инструкции по настройке
### Автоматическая настройка
Для автоматической настройки ioBroker.roomba следуйте инструкциям в админ-панели ioBroker.roomba.

** ВНИМАНИЕ **: Учетные данные для аутентификации не совпадают с тем, что вы используете в приложении для смартфона!

1. Убедитесь, что адаптер ioBroker.roomba запущен.
2. Убедитесь, что ваш робот находится на домашней базе и включен (зеленый свет включен).
3. Затем нажмите и удерживайте кнопку HOME на своем роботе, пока он не воспроизведет серию тонов (около 2 секунд).
4. Отпустите кнопку, и ваш робот начнет мигать светом WIFI.
5. Затем вернитесь сюда и нажмите кнопку, чтобы получить IP и учетные данные.

Если автоматизированный процесс не может получить ваши учетные данные, используйте ручную настройку.

### Ручная настройка
Для ручной настройки см. Https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password.

## Поддерживаемые версии Roomba / прошивки
### Поддерживаемые версии прошивки
| Версия ПО | Информация о прошивке | Поддерживается |
| ---------------- | ------------- | --------- |
| v1.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) ** поддерживается (! [# c5f015](https://placehold.it/15/c5f015/000000?text=+) вкл. карта) ** |
| v3.2.xx | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) НИКАКОЙ карты) |
| v3.2.xx | [Примечания к выпуску] (https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15] (https://placehold.it/15/f03c15/000000? текст = +) НЕТ карта) |

### Поддерживаемые Roomba
| Серия | Модели _ (неполные) _ | Версия ПО | Информация о прошивке | Поддерживается |
| ----- | --------------------- | ---------------- | ------------- | --------- |
| Roomba® 6xx | 605, 606, 612, 616, 671, 676, 680, 696 | v3.2.40 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (скорее всего) |
| Roomba® 7xx | 774, 785, | - | | ![# f03c15](https://placehold.it/15/f03c15/000000?text=+) _Model не предлагает подключение к Wi-Fi, поэтому нет поддержки_ |
| Roomba® 8xx | 880, 886, 891, 896 | - | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | (скорее всего) |
| Roomba® 8xx | [895] ((https://forum.iobroker.net/post/245274)) | v3.2.10 / 40/69 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/541#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) НИКАКОЙ карты) |
| Roomba® 9xx | 965, 981 | - | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | (скорее всего) |
| Roomba® 9xx | [960] (https://forum.iobroker.net/user/jb_sullivan), [966] (https://forum.iobroker.net/user/thomaslpz), 980 | v2.4.6-3 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® i | [i7 (7150)] (https://forum.iobroker.net/post/240589), i7 + (7550) | v1.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) НИКАКОЙ карты) |
| Roomba® s | [S9 +] (https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® s | [S9 +] (https://github.com/Zefau/ioBroker.roomba/issues/34) | v3.2.4 | [Примечания к выпуску] (https://homesupport.irobot.com/app/answers/detail/a_id/26887/kw/s9%2B#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |

Пожалуйста, помогите мне относительно поддерживаемых устройств и позвольте мне [знать через проблему](https://github.com/Zefau/ioBroker.roomba/issues), поддерживается ли ваша модель Roomba!

## Каналы и Штаты
После успешной настройки будут созданы следующие каналы и состояния:

| Канал | Папка | Государство | Описание |
| ------- | ------ | ----- | ----------- |
| уборка | - | - | Команды и информация о процессе очистки |
| уборка | последний | - | Последние команды, отправленные роботу |
| уборка | последний | команда | Последняя команда, отправленная роботу |
| уборка | последний | отметка времени | Отметка времени последней команды была отправлена |
| уборка | последний | дата и время | DateTime последняя команда была отправлена |
| уборка | последний | инициатор | Инициатор последней команды |
| уборка | последний | цикл | Цикл |
| уборка | последний | фаза | Фаза |
| уборка | последний | ошибка | Указывает на ошибку во время последней миссии |
| уборка | график | - | Расписание информации |
| уборка | график | цикл | Расписание цикла (с воскресенья по субботу) |
| уборка | график | часов | Час начала цикла (с воскресенья по субботу) |
| уборка | график | минут | Минута до начала цикла (с воскресенья по субботу) |
| уборка | - | док | Отправить робота на док-станцию |
| уборка | - | пауза | Приостановить текущий процесс очистки |
| уборка | - | резюме | Возобновить текущий процесс очистки |
| уборка | - | начать | Начать процесс очистки |
| уборка | - | остановить | Остановить текущий процесс очистки |
| устройство | - | - | Информация об устройстве |
| устройство | сеть | - | Сетевая информация |
| устройство | сеть | Dhcp | Укажите, активирован ли DHCP |
| устройство | сеть | маршрутизатор | Mac-адрес роутера |
| устройство | сеть | IP | IP-адрес |
| устройство | сеть | подсеть | Адрес подсети |
| устройство | сеть | шлюз | Адрес шлюза |
| устройство | сеть | днс1 | Основной DNS-адрес |
| устройство | сеть | днс2 | Вторичный DNS-адрес |
| устройство | предпочтения | - | Установить предпочтения |
| устройство | предпочтения | binPause | **НЕИЗВЕСТНО** |
| устройство | предпочтения | carpetBoostAuto | Автоматически: Roomba автоматически увеличит мощность вакуума до глубокой чистки ковров. |
| устройство | предпочтения | carpetBoostHigh | Производительный режим: Roomba всегда будет увеличивать вакуум, чтобы максимизировать эффективность очистки на всех поверхностях пола. |
| устройство | предпочтения | ecoCharge | **НЕИЗВЕСТНО** |
| устройство | предпочтения | noAutoPasses | Один проход: Roomba покроет все области одним проходом очистки. |
| устройство | предпочтения | noPP | **НЕИЗВЕСТНО** |
| устройство | предпочтения | openOnly | **НЕИЗВЕСТНО** |
| устройство | предпочтения | schedHold | **НЕИЗВЕСТНО** |
| устройство | предпочтения | twoPass | Roomba будет охватывать все области во второй раз. Это может быть полезно в домах с домашними животными или для периодической глубокой очистки. |
| устройство | версии | - | Информация о версии |
| устройство | версии | hardwareRev | Версия оборудования |
| устройство | версии | batteryType | Тип батареи |
| устройство | версии | SoundVer | **НЕИЗВЕСТНО** |
| устройство | версии | uiSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | navSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | wifiSwVer | **НЕИЗВЕСТНО** |
| устройство | версии | mobilityVer | **НЕИЗВЕСТНО** |
| устройство | версии | bootloaderVer | Версия загрузчика |
| устройство | версии | UmiVer | **НЕИЗВЕСТНО** |
| устройство | версии | SoftwareVer | Версия программного обеспечения |
| устройство | - | \ _rawData | Необработанные данные о предпочтениях как json |
| устройство | - | Mac | Mac адрес робота |
| устройство | - | имя | Имя робота |
| устройство | - | тип | Тип робота |
| Штаты | - | - | Информация о статусе |
| Штаты | - | \ _connected | Состояние соединения |
| Штаты | - | батарея | Уровень заряда батареи робота |
| Штаты | - | binFull | Укажите, заполнен ли статус корзины |
| Штаты | - | binInserted | Укажите, вставлен ли bin |
| Штаты | - | состыкованный | Укажите, пристыкован ли робот |
| Штаты | - | сигнал | Сила сигнала |
| Штаты | - | статус | Текущее состояние робота |
| статистика | - | - | Статистическая информация |
| статистика | миссии | - | Статистика Миссии |
| статистика | миссии | не удалось | Количество неудачных работ по уборке |
| статистика | миссии | преуспеть | Количество успешных работ по уборке |
| статистика | миссии | всего | Количество работ по уборке |
| статистика | время | - | Статистика по времени |
| статистика | время | avgMin | **НЕИЗВЕСТНО** |
| статистика | время | hOnDock | **НЕИЗВЕСТНО** |
| статистика | время | nAvail | **НЕИЗВЕСТНО** |
| статистика | время | estCap | **НЕИЗВЕСТНО** |
| статистика | время | nLithChrg | **НЕИЗВЕСТНО** |
| статистика | время | nNimhChrg | **НЕИЗВЕСТНО** |
| статистика | время | nDocks | **НЕИЗВЕСТНО** |
| - | - | refreshedDateTime | ДатаВремя последнего обновления |
| - | - | refreshedTimestamp | Отметка времени последнего обновления |

## Описание настроек _ (не полностью) _
Следующая полезная нагрузка будет получена при вызове ```getPreferences()``` (см. Https://github.com/koalazak/dorita980#getpreferences):

| Объект | Индекс | Тип | Описание | ioBroker State |
| ------ | ----- | ---- | ----------- | -------------- |
| netinfo | - | объект | Сетевая информация о соединении Roomba | - |
| netinfo | .dhcp | логическое значение | Укажите, активирован ли DHCP | device.network.dhcp |
| netinfo | .addr | IP | IP-адрес | device.network.ip |
| netinfo | Маска IP | Адрес подсети | device.network.subnet |
| netinfo | .gw | IP | Адрес шлюза | device.network.gateway |
| netinfo | .dns1 | IP | Основной DNS-адрес | device.network.dns1 |
| netinfo | .dns2 | IP | Вторичный DNS-адрес | device.network.dns2 |
| netinfo | .bssid | Mac | Mac-адрес роутера | device.network.router |
| netinfo | .sec | целое число | Неизвестный | _ (не отображается) _ |
| вайфистат | - | объект | Неизвестный | - |
| вайфистат | .wifi | целое число | Неизвестный | _ (не отображается) _ |
| вайфистат | .uap | логическое значение | Неизвестный | _ (не отображается) _ |
| вайфистат | .cloud | целое число | Неизвестный | _ (не отображается) _ |
| wlcfg | - | объект | Неизвестный | - |
| wlcfg | .sec | целое число | Неизвестный | _ (не отображается) _ |
| wlcfg | .ssid | строка | Неизвестный | _ (не отображается) _ |
| Mac | - | Mac | Mac адрес Roomba | - |
| страна | - | строка | Неизвестный | - |
| cloudEnv | - | строка | Неизвестный | - |
| svcEndpoints | .svcDeplId | строка | Неизвестный | - |
| mapUploadAllowed | - | логическое значение | Неизвестный | - |
| localtimeoffset | - | целое число | Неизвестный | - |
| ... | - | ... | ... | - |

Пожалуйста, помогите мне относительно описания предпочтений. Если вам известно значение предпочтений, указанных в таблице как неизвестные, позвольте мне [знать их значение через проблему](https://github.com/Zefau/ioBroker.roomba/issues)!

## Умный дом / интеграция с Alexa с использованием ioBroker.javascript
### Отправить карту через Telegram после завершения миссии
Для этого требуется установить адаптер ioBroker ioBroker.telegram (https://github.com/ioBroker/ioBroker.telegram).

Создайте сценарий в «общей» папке ioBroker.javascript и добавьте в него следующий прослушиватель:

```javascript
var _fs = require('fs');

/*
 * MISSION END: Send map
 *
 */
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";
var ns = 'roomba.0';
var imagePath = 'tmp/';

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.state || !obj.state.val) return;

    // replace variables with state values
    var pos, variable, state, value;
    while (message.indexOf('%') > -1)
    {
        pos = message.indexOf('%');
        variable = message.substring(pos, message.indexOf('%', pos+1)+1);
        state = getState(ns + '.' + variable.replace(/%/g, ''));

        if (state !== null && state.val !== null)
            value = state.val
        else
        {
            log('State ' + variable.replace(/%/g, '') + ' not found!', 'warn');
            value =  '';
        }

        if (typeof value === "boolean") value = value === true ? 'with' : 'no';
        message = message.replace(RegExp(variable, 'gi'), value);
    }

    // console
    log(message);

    // get image
    var img = getState(ns + '.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile(imagePath + 'image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: imagePath + 'image.png', message: message});
        });
    }
});
```

_2019-05-04 исправлена ошибка, препятствовавшая отправке карты_

Вы можете редактировать переменную ```message``` для любого уведомления, которое вы хотели бы получить с картой. Вы можете использовать ```%name-of-state%```, чтобы получить значение состояния в дереве объектов ioBroker.roomba.

## Кредиты
### Неофициальный API
Благодаря [@koalazak] (https://github.com/koalazak) для [неофициальной библиотеки iRobot Roomba 980 node.js (SDK)](https://github.com/koalazak/dorita980#readme).

### Иконы
Иконки, сделанные <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> от <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> , лицензированы <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> </div>

## Changelog

### 1.1.0 (2020-02-06)
- (Zefau) added support to change schedule (see [#36](https://github.com/Zefau/ioBroker.roomba/issues/36))
- (Zefau) fixed bug with state `commands.last.dateTime` having incorrect value `NaN`
- (Zefau) fixed error message shown when robot is on a mission but map is not given

### 1.1.0 (2020-02-06)
- (Zefau) acknowledged support for S9+ (see [#34](https://github.com/Zefau/ioBroker.roomba/issues/34))

### 1.0.7 (2019-09-03)
- (Zefau) fixed bugs occurring when Roomba is on a mission
- (Zefau) added additional debug logging

### 1.0.6 (2019-08-19)
- (Zefau) added loading screen to web interface

### 1.0.5 (2019-08-18)
- (Zefau) fixed failing secure connection
- (Zefau) fixed broken credential retrieval
- (Zefau) fixed broken refresh

### 1.0.4 (2019-08-15)
- (Zefau) fixed password retrieval
- (Zefau) fixed German translations
- (Zefau) added donations button
- (Zefau) updated `dorita980` dependency to v3.1.3
- (Zefau) updated `canvas` dependency to v2.6.0

### 1.0.3 (2019-07-23)
- (Zefau) fixed bug _uncaught exception: Cannot read property 'x' of undefined_

### 1.0.2 (2019-07-20)
- (Zefau) reworked placing home icon ([#23](https://github.com/Zefau/ioBroker.roomba/issues/23))
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 1.0.1 (2019-05-15)
- (Zefau) fixed display error in Chrome ([#19](https://github.com/Zefau/ioBroker.roomba/issues/19#issuecomment-492963244))
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#18](https://github.com/Zefau/ioBroker.roomba/pull/18))
- (Zefau) updated dependencies

### 1.0.0 (2019-05-04)
- (zefau) No changes, only bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) Added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Zefau) Refactored retrieval of preferences and added debug mode

### 0.4.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#8](https://github.com/Zefau/ioBroker.roomba/pull/8))

### 0.4.3 (2019-02-10)
- (zefau) Improved compatibility for series 600

### 0.4.2 (2019-02-09)
- (zefau) Bug fixing

### 0.4.1 (2019-02-03)
- (zefau) Support for Compact Mode
- (zefau) Bug fixing

### 0.4.0 (2019-01-08)
- (zefau) Support for e5 and 600 series (due to support by [dorita980](https://github.com/koalazak/dorita980#readme))

### 0.3.x (2019-01-06)
- (zefau) Bug fixed (```Mission saved``` loop)

### 0.3.0 (2019-01-06)
- (zefau) Image / Map of the current cleaning mission will be created
- (zefau) Removed encryption of password

### 0.2.3 (2018-12-03)
- (zefau) Fixed an issue encrypting the password when entered by user (no automated retrieval)

### 0.2.2 (2018-12-02)
- (zefau) Password will now be stored encrypted

Note: If you are coming from an earlier version, you have to (1) empty your settings, (2) save, (3) restart the adapter and (4) enter / fetch credentials again (duo to the fact that password will be stored encrypted now)

### 0.2.1 (2018-11-25)
- (zefau) Fixed / improved automatically retrieving of authentication credentials

### 0.2.0 (2018-11-18)
- (zefau) improved admin interface to automatically retrieve authentication credentials

### 0.1.0 (2018-11-04)
- (zefau) initial version

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