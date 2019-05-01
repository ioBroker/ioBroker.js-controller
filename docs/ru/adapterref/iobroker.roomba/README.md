---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.roomba/README.md
title: ioBroker.roomba
hash: tcLLym+E6nf8ooit8z1BQLV5IDQVg7GmVeVMaBTZqi0=
---
![логотип](../../../en/adapterref/iobroker.roomba/admin/roomba.png)

![Количество установок](http://iobroker.live/badges/roomba-installed.svg)
![Стабильная версия](http://iobroker.live/badges/roomba-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.roomba.svg)
![Трэвис CI](https://travis-ci.org/Zefau/ioBroker.roomba.svg?branch=master)
![Загрузки](https://img.shields.io/npm/dm/iobroker.roomba.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/Zefau/ioBroker.roomba.svg)
![NPM](https://nodei.co/npm/iobroker.roomba.png?downloads=true)

# IoBroker.roomba Подключите iRobot Roomba к ioBroker.
Основано на библиотеке dorita980 https://github.com/koalazak/dorita980#readme

**Оглавление**

1. [Установка] (# установка)
2. [Инструкции по настройке] (# инструкции по настройке)
3. [Поддерживаемые версии Roomba / прошивки] (# support-roombas - версии прошивки)
4. [Каналы и состояния] (# каналы - состояния)
5. [Описание предпочтений (неполное)] (# описание-предпочтений-неполное)
6. [Умный дом / интеграция Alexa с использованием ioBroker.javascript] (# smart-home - alexa -gration-using-iobrokerjavascript)
7. [Changelog] (# changelog)
8. [Кредиты] (# кредитов)
9. [Лицензия] (# лицензия)

## Монтаж
ioBroker.roomba нужен [холст](https://www.npmjs.com/package/canvas), чтобы нарисовать карты миссий Roomba. ioBroker попытается установить эту зависимость при установке ioBroker.roomba.

Тем не менее, вам, вероятно, придется установить зависимости пакета canvas с помощью следующей команды:

```
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Если вы получаете сообщение об ошибке, что canvas не установлен, попробуйте установить его вручную в папку ioBroker.roomba (через SSH), выполнив:

```
sudo npm install canvas --unsafe-perm=true
```

## Инструкция по настройке
### Автоматическая настройка
Для автоматической настройки ioBroker.roomba следуйте инструкциям в админ-панели ioBroker.roomba.

** ВНИМАНИЕ **: Учетные данные для аутентификации не совпадают с теми, которые вы используете в приложении для смартфона!

1. Убедитесь, что адаптер ioBroker.roomba запущен.
2. Убедитесь, что ваш робот находится на домашней базе и включен (зеленый свет включен).
3. Затем нажмите и удерживайте кнопку HOME на вашем роботе, пока он не воспроизведет серию тонов (около 2 секунд).
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
| Roomba® 9xx | [960] (https://forum.iobroker.net/user/jb_sullivan) [966] (https://forum.iobroker.net/user/thomaslpz), 980 | v2.4.6-3 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/529#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® i | [i7 (7150)] (https://forum.iobroker.net/post/240589), i7 + (7550) | v1.4 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/19549#rn_PageTitle) | ![# c5f015](https://placehold.it/15/c5f015/000000?text=+) **поддерживается (включая карту)** |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Примечания к выпуску](https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ![# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15 ](https://placehold.it/15/f03c15/000000?text=+) НИКАКОЙ карты) |
| Roomba® e5 | [e5] (https://forum.iobroker.net/topic/7657/irobot-roomba-adapter/158) | v3.4.42 | [Примечания к выпуску] (https://homesupport.irobot.com/app/answers/detail/a_id/6345#rn_PageTitle) | ! [# c5f015] (https://placehold.it/15/c5f015/000000?text=+) **поддерживается** (! [# f03c15] (https://placehold.it/15/f03c15/000000? текст = +) НЕТ карта) |

Пожалуйста, помогите мне относительно поддерживаемых устройств и позвольте мне [знать через проблему](https://github.com/Zefau/ioBroker.roomba/issues), поддерживается ли ваша модель Roomba!

## Каналы и Штаты
После успешной настройки будут созданы следующие каналы и состояния:

| Канал | Папка | Государство | Описание |
| ------- | ------ | ----- | ----------- |
| уборка | - | - | Команды и информация о процессе очистки |
| уборка | последний | - | Последние команды, отправленные роботу |
| уборка | последний | команда | Последняя команда, отправленная роботу |
| уборка | последний | метка времени | Отметка времени последней команды была отправлена |
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
| устройство | предпочтения | carpetBoostAuto | Автоматически: Roomba автоматически повысит мощность вакуума для чистки глубоких ковров. |
| устройство | предпочтения | carpetBoostHigh | Режим производительности: Roomba всегда будет увеличивать вакуум, чтобы максимально повысить эффективность очистки на всех поверхностях пола. |
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
| устройство | - | Mac | Mac-адрес робота |
| устройство | - | имя | Имя робота |
| устройство | - | тип | Тип робота |
| Штаты | - | - | Информация о статусе |
| Штаты | - | \ _connected | Состояние соединения |
| Штаты | - | аккумулятор | Уровень заряда батареи робота |
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
Следующая полезная информация будет получена при вызове ```getPreferences()``` (см. Https://github.com/koalazak/dorita980#getpreferences):

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

```
var _fs = require('fs');

/*
 * MISSION END: Send map
 *
 */
var ns = 'roomba.0';
var message = "%device.name% finished at %missions.current.endedDateTime% cleaning %missions.current.sqm% sqm in %missions.current.runtime% seconds (%missions.current.error% errors).";

on({id: ns + '.missions.current.ended', change: 'any'}, function(obj)
{
    if (!obj.val) return;

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
    var img = getState('roomba.0.missions.current.mapImage').val;

    if (img !== null && img.indexOf('data:image/png;base64,') > -1)
    {
        _fs.writeFile('/tmp/image.png', img.replace(/^data:image\/png;base64,/, ''), 'base64', function(err)
        {
            if (err !== null)
                log(err.message, 'warn');
            else
                sendTo('telegram', {text: '/tmp/image.png', message: message});
        });
    }
});
```

_2019-02-03 исправлена ошибка, при которой карта отправлялась в начале миссии_

Вы можете редактировать переменную ```message``` для любого уведомления, которое вы хотели бы получить с картой. Вы можете использовать ```%name-of-state%```, чтобы получить значение состояния в дереве объектов ioBroker.roomba.

## Кредиты
### Неофициальный API
Благодаря [@koalazak] (https://github.com/koalazak) для [неофициальной библиотеки iRobot Roomba 980 node.js (SDK)](https://github.com/koalazak/dorita980#readme).

### Иконы
Иконки, сделанные <a href="https://www.flaticon.com/authors/iconnice" title="Iconnice">Iconnice</a> от <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> , лицензированы <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a> </div>

## Changelog

### 1.0.0 (2019-04-xx) [IN DEVELOPMENT]
- bump to stable release

### 0.5.0 (2019-04-21)
- (zefau) Added command buttons to map page / web interface ([#17](https://github.com/Zefau/ioBroker.roomba/issues/17))
- (zefau) Removed button to end mission manually ```missions.current._endMission```
- (zefau) Run ```stop``` command in the background when ```dock``` command is received ([#14](https://github.com/Zefau/ioBroker.roomba/issues/14))
- (zefau) added Web Adapter as dependency

### 0.4.5 (2019-03-20)
- Refactored retrieval of preferences and added debug mode

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