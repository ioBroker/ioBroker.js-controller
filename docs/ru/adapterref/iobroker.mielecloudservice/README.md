---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.MieleCloudService
hash: TVWPynVxQGOLdsNkmmd5Cj1LxQC+xmZzN/NcAKQqdPE=
---
![Логотип](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![Количество установок](http://iobroker.live/badges/mielecloudservice-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Известные уязвимости](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![НПМ](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)

# IoBroker.MieleCloudService [![Статус сборки] (https://travis-ci.com/Grizzelbee/ioBroker.mielecloudservice.svg?branch=master)](https://travis-ci.com/Grizzelbee/ioBroker.mielecloudservice)
## Описание
Этот адаптер предназначен для получения информации обо всех ваших устройствах Miele @ Home из официального стороннего API Miele.
Независимо от того, подключены ли они напрямую через Wi-Fi или шлюз XGW3000. В нем реализован **API сторонних разработчиков Miele V1.0.4**

## Sentry.io
Этот адаптер использует sentry.io для сбора сведений о сбоях и автоматического сообщения автору. Для этого используется плагин [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry). Пожалуйста, обратитесь к [домашняя страница плагина](https://github.com/ioBroker/plugin-sentry) для получения подробной информации о том, что делает плагин, какая информация собирается и как его отключить, если вы не хотите поддерживать автора своей информацией о сбоях.

## Предварительные требования
* Miele @ Home User (приложение для смартфона)
* Miele @ Home Password (приложение для смартфона)
* Miele Client_id (с https://www.miele.com/developer/)
* Miele Client_secret (с https://www.miele.com/developer/)

## Монтаж
Для установки сделайте следующее:

1. Установите через Admin с помощью
 * стабильное репо - чтобы получить текущую стабильную версию
 * latest Repo - чтобы получить последнюю тестовую версию (возможно, не стабильную)
 * через: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - чтобы получить последнюю версию для разработки
2. Создайте учетную запись для Miele @ Home в приложении для смартфона Miele.
3. Создайте учетную запись разработчика на странице https://www.miele.com/f/com/en/register_api.aspx.
4. Добавьте свои устройства Miele-Devices в приложение (если не добавляются автоматически)
6. Введите client_secret и client_id, полученные от команды разработчиков Miele, а также идентификатор учетной записи и пароль из приложения.

## Управление вашими устройствами
Реализованы все поддерживаемые и документированные в настоящее время Действия для всех устройств (API V1.0.4).
> Помните, что Действия будут работать только в том случае, если вы переведете свое устройство в соответствующее состояние (например, Mobile Control, powerOn, ...).
Пожалуйста, обратитесь к [Miele-Документация](#documentation) для получения дополнительной информации о действиях.

## Известные проблемы
* никто

## Документация
В основном обращайтесь к основной документации API, опубликованной Miele.

* [Общая документация] (https://www.miele.com/developer/swagger-ui/index.html)
* [Предварительные условия для выполнения действия на устройстве] (https://www.miele.com/developer/swagger-ui/put_additional_info.html)

Есть несколько точек данных, доступных в 2-х видах. В виде удобочитаемого текста и числа.
Эти числовые поля данных, принадлежащие текстовому полю, имеют то же имя, но с добавлением «_raw».
Те поля, которые имеют общее значение, перечислены ниже.
Поля, которые не указаны в списке, различаются по своему значению от устройства к устройству и не документируются Miele.
Если вам нужно ссылаться в скриптах на эти поля, всегда используйте значения _raw.
Текстовые значения могут измениться в будущем, а также зависят от языка.
Вот список того, что означают эти необработанные значения:

### Типы устройств
 | Исходное значение | Государство |
 |----------|-------|
 | 1 | СТИРАЛЬНАЯ МАШИНА |
 | 2 | СУШИЛКА |
 | 7 | ПОСУДОМОЕЧНАЯ МАШИНА |
 | 8 | ПОСУДОМОЕЧНАЯ МАШИНА ПОЛУПРОФ |
 | 12 | ПЕЧЬ |
 | 13 | ПЕЧЬ СВЧ |
 | 14 | HOB HIGHLIGHT |
 | 15 | ПАРНАЯ ПЕЧЬ |
 | 16 | СВЧ |
 | 17 | КОФЕЙНАЯ СИСТЕМА |
 | 18 | КАПОТ |
 | 19 | ХОЛОДИЛЬНИК |
 | 20 | МОРОЗИЛЬНИК |
 | 21 | КОМБИНАЦИЯ ХОЛОДИЛЬНИКА / МОРОЗИЛЬНИКА |
 | 23 | ВАКУУМНЫЙ ПЫЛЕСОС, АВТОМАТИЧЕСКИЙ РОБОТ-ПЫЛЕСОС |
 | 24 | СТИРАЛЬНАЯ МАШИНА |
 | 25 | ПОДОГРЕВАТЕЛЬ |
 | 27 | ИНДУКЦИОННАЯ ПАНЕЛЬ |
 | 28 | ВАРОЧНЫЙ ГАЗ |
 | 31 | ПАРОВАЯ ПЕЧЬ КОМБИНАЦИЯ |
 | 32 | ВИННЫЙ ШКАФ |
 | 33 | КОНДИЦИОНЕР ВИНА |
 | 34 | КОНДИЦИОНЕР ДЛЯ ХРАНЕНИЯ ВИНА |
 | 39 | ДВОЙНАЯ ПЕЧЬ |
 | 40 | ДВОЙНАЯ ПАРОВАЯ ПЕЧЬ |
 | 41 | ДВОЙНАЯ ПЕЧЬ КОМБИНАЦИЯ |
 | 42 | ДВОЙНОЕ СВЧ |
 | 43 | ДВОЙНАЯ СВЧ-ПЕЧЬ |
 | 45 | ПАРОВАЯ ПЕЧЬ СВЧ-КОМБИНАЦИЯ |
 | 48 | ВАКУУМНЫЙ ЯЩИК |
 | 67 | ДИАЛОГОВЕН |
 | 68 | ВИННЫЙ ШКАФ КОМБИНАЦИЯ МОРОЗИЛЬНИКОВ |

### Состояние / Статус
 | Исходное значение | Государство |
 |----------|-------|
 | 1 | ВЫКЛ |
 | 2 | STAND_BY |
 | 3 | ПРОГРАММИРОВАННАЯ |
 | 4 | PROGRAMMED_WAITING_TO_START |
 | 5 | РАБОТАЕТ |
 | 6 | ПАУЗА |
 | 7 | END_PROGRAMMED |
 | 8 | ОТКАЗ |
 | 9 | PROGRAMME_INTERRUPTED |
 | 10 | IDLE |
 | 11 | RINSE_HOLD |
 | 12 | СЕРВИС |
 | 13 | СУПЕРЗАМОРАЖИВАНИЕ |
 | 14 | ПЕРЕОХЛАЖДЕНИЕ |
 | 15 | ПЕРЕГРЕВ |
 | 144 | ПО УМОЛЧАНИЮ |
 | 145 | ЗАБЛОКИРОВАНО |
 | 146 | SUPERCOOLING_SUPERFREEZING |
 | 255 | Устройство не в сети |

### ProgramType / Programmart
| Исходное значение | Государство |
|----------|-------|
| 0 | Нормальный режим работы |
| 1 | Собственная программа |
| 2 | Автоматическая программа |
| 3 | Программа очистки / ухода |

### СушкаStep / Trockenstufe
 | Исходное значение | Государство |
 |----------|-------|
 | 0 | Экстра сухой |
 | 1 | Нормальный Плюс |
 | 2 | Нормальный |
 | 3 | Слегка сухая |
 | 4 | Подручный утюг 1-го уровня |
 | 5 | Подручный утюг 2-го уровня |
 | 6 | Машинный утюг |

### Programmbezeichnung
| Исходное значение | Государство | доступно для |
|-----------|-------------------------|-----------------|
| 1 | «Баумволле» / «Хлопок» | Стиральная машина |
| 3 | "Pflegeleicht" | Стиральная машина |
| 4 | "Feinwäsche" | Стиральная машина |
| 8 | "Волле" | Стиральная машина |
| 9 | «Сайд» | Стиральная машина |
| 21 | "Pumpen / Schleudern" | Стиральная машина |
| 23 | «Оберхемден» | Стиральная машина |
| 27 | "Imprägnieren" | Стиральная машина |
| 29 | "Sportwäsche" | Стиральная машина |
| 31 | «Автомат плюс» | Стиральная машина |
| 37 | «На открытом воздухе» | Стиральная машина |
| 48 | "Flusen ausspülen" | Стиральная машина с сушкой |
| 50 | "Dunkle Wäsche" | Стиральная машина с сушкой |
| 52 | "Нур Спюлен / Стэркен" | Стиральная машина |
| 122 | «Экспресс 20» | Стиральная машина с сушкой |
| 123 | «Дунклз / Джинсы» | Стиральная машина |

### ProgramPhase
| Исходное значение | Государство | доступно для |
|----------|-------|---------------|
| 260 | «Вашен» / «Стирка» | Стиральная машина |
| 261 | «Spülen» / «Полоскание» | Стиральная машина |
| 265 | «Помпа» | Стиральная машина |
| 266 | «Шлейдерн» / «Прядение» | Стиральная машина |
| 267 | "Knitterschutz" / "" | Стиральная машина |
| 268 | «Энде» / «Конец» | Большинство устройств |
| 256 | "Vorbügeln" | Стиральная машина |
| 514 | «Трокнен» | Стиральная машина с сушкой |
| 519 | «Абкюлен» | Стиральная машина с сушкой |
| 532 | "Flusen ausspülen" | Стиральная машина с сушкой |

## Авторские права
Авторские права (c) 2019, 2021 grizzelbee <open.source@hingsen.de>

## Changelog

### V4.0.17 (2021-04-27) (Ghost in the moon)
* (grizzelbee) New: Added ioBroker sentry plugin to report issues automatically
* (grizzelbee) New: Added Light-Switch to washing machines, Tumble Dryers, Washer dryers and Dish washers
* (grizzelbee) Upd: Updated dependencies

> **Hint:** 
> The behavior of the light-switch has slightly changed with this release. It not only tests the action capabilities of 
> the device but also shows the state of the light state delivered by the API. If no actions are reported by the API, the 
> switch will be without function and only show the current state. If actions have been reported the switch will work as you expect.
> If your device reports no light state and no actions the switch will show 'None' and won't do anything.

### V4.0.16 (2021-04-21) (Black Orchid)
* (grizzelbee) Fix: Units for EcoFeedback will be shown now, even machine is not running during setup
* (stan23)     New: added new program states

### V4.0.15 (2021-04-19) (Moonglow)
* (grizzelbee) Fix: [130](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/130) targetTemp for fridges and freezers will now correctly been updated in action section with current values

### V4.0.14 (2021-04-18) (Alchemy)
* (grizzelbee) Fix: [127](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/127) targetTemp for fridges caused exception and crash of adapter

### V4.0.13 (2021-04-12) (The toy master)
* (grizzelbee) Fix: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) targetTemp addresses zones for fridges and freezers dynamically now

### V4.0.12 (2021-04-12) (Promised land)
* (grizzelbee) Fix: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) targetTemp addresses zones for fridges and freezers dynamically now

### V4.0.11 (2021-04-11) (Cry just a little)
* (grizzelbee) Fix: targetTemp min and max values are now taken from API - no constant values anymore

### V4.0.10 (2021-04-10) (Another angel down)
* (grizzelbee) Fix: targetTemp min and max values are now taken from API - no constant values anymore

### V4.0.9 (2021-04-09) (Farewell)
* (grizzelbee) Fix: Errors during action execution will be shown correctly
* (grizzelbee) Fix: Actions will be executed correctly

### V4.0.8 (2021-04-09) (The seven angels)
* (grizzelbee) Fix: fixed datatype of VentilationStep data point
* (grizzelbee) Fix: fixed ventilation step switch for hoods (attempt 4)

### V4.0.7 (2021-04-09) (Lost in space)
* (grizzelbee) Fix: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) added missing path to object ID; data point will be created in the correct place now
* (grizzelbee) New: targetTemp min and max values are now taken from API - no constant values anymore

### V4.0.6 (2021-04-08) (The great mystery)
* (grizzelbee) Fix: fixes Light switch for hoods and other devices supporting light
* (grizzelbee) Fix: fixes ventilation step switch for hoods (attempt 3)

### V4.0.5 (2021-04-08) (The haunting)
* (grizzelbee) Fix: fixes ventilation step switch for hoods (attempt 2)
* (grizzelbee) Fix: fixes error on creating TargetTemperature data points

### V4.0.4 (2021-04-07) (Wastelands)
* (grizzelbee) Fix: fixes ventilation step switch for hoods
* (grizzelbee) Fix: fixed missing getLightState

### V4.0.3 (2021-04-07) (The raven child)
* (grizzelbee) Fix: [109](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/109) fixes 404 error when querying possible actions for device.
* (grizzelbee) Fix: fixes errors when executing actions on devices with API-Id!=fabNumber

### V4.0.2 (2021-04-07) (Angel of Babylon)
* (grizzelbee) Fix: [107](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/107) fixes #107 and 404 error when device is unknown.

### V4.0.1 (2021-04-06) (Sign of the cross)
* (grizzelbee) Fix: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) setting the targetTemperature should work now.
* (grizzelbee) Fix: [96](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/96) Added missing ACTIONS.Action_Information again
* (grizzelbee) Fix: [97](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/97) removed unneeded additional "VentilationStep/Lüfterstufe" in path and fixed warning with this. VentilationStep-switch should work properly now.
* (grizzelbee) Fix: [98](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/98) Color-Action has now valid type 'String'
* (grizzelbee) Fix: [102](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/102) Fixed ACTIONS.VentilationStep has no existing object
* (grizzelbee) Fix: Power switch is write protected now when in state 'None'. State 'None' means: No action permitted.
* (grizzelbee) Fix: Light switch is write protected now when in state 'None'. State 'None' means: No action permitted.
* (grizzelbee) Fix: http error 404 will be catched when requesting device actions

### V4.0.0 (2021-03-18) (Symphony of life)
> ***Hint:*** The adapter received a complete code refactoring! This means that most of the code has been changed and some parts are working now differently than ever before. Update with care and read the change log!
* (grizzelbee) New: FULL support of Miele cloud API v1.0.4
* (grizzelbee) Upd: [83](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/83) estimatedEndTime isn't shown anymore after the device has finished
* (grizzelbee) Upd: [85](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/85) full code refactoring and split into multiple files. 
* (grizzelbee) Upd: [86](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/86) every folder and device now gets a nice little icon
* (grizzelbee) Upd: [89](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/89) Washer dryers are fully supported now
* (grizzelbee) Upd: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) implemented targetTemperature for fridges & freezers
* (grizzelbee) Upd: Devices get fully created on startup and aren't modified afterwards - only updated
* (grizzelbee) Upd: New folder ecoFeedback to group ecoFeedback states 
* (grizzelbee) Upd: New folder IDENT to group ident states
* (grizzelbee) Upd: Removed signalActionRequired - since there is no signalDoor for washing machines, dryers and dishwashers this approach doesn't work
* (grizzelbee) Upd: All folders and states which are being created depend on the capabilities of their devices as described in [this Miele documentation](https://www.miele.com/developer/assets/API_V1.x.x_capabilities_by_device.pdf). So there shouldn't be useless states anymore caused by the generic Miele cloud API.

### V3.0.2 (2021-03-05)
* (grizzelbee) Fix: [79](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/79) When a devices serial is missing, the identNumber is assigned instead.
* (grizzelbee) Upd: Changed folder name cooktops to hobs since this is the more common name
* (grizzelbee) Upd: added PowerOn/Off buttons for Coffee-systems & hoods
* (grizzelbee) Upd: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) testing actions better before sending to permit errors

### V3.0.1 (2021-02-25)
> *Hint:* Action_Information and Action_Status objects are created on first action execution and contain infos to the last executed action.
> Please take care of notes regarding [Controlling your devices](#Controlling your devices).
* (grizzelbee) Upd: Improved logging in some parts - objects get stringified.
* (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Actions are working again
* (grizzelbee) Upd: Actions are tested before sending whether they are permitted in current device state
* (grizzelbee) Upd: estimatedEndTime doesn't show seconds anymore
* (grizzelbee) Upd: Improved documentation
* (grizzelbee) Upd: removed unused function decrypt
* (grizzelbee) Upd: removed superfluent parameters


### V3.0.0 (2021-02-18)
> Hint: ecoFeedback objects are created on the first run of the device. This allows to only create them, when they contain data.
* (grizzelbee) New: BREAKING CHANGE: Making use of build-in password de-/encryption. This raises the need to re-enter your passwords again, because the old ones can't be decrypted anymore.
* (grizzelbee) New: [70](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/70) Implements Miele API 1.0.4
* (grizzelbee) New: [64](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/64) Introduces data point estimatedFinishingTime
* (grizzelbee) New: [54](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/54) Poll interval can now freely be selected in seconds and minutes
* (grizzelbee) Upd: [73](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/73) BREAKING CHANGE: Removed white-spaces from any ID in device tree. This creates completely new device trees. So please delete the old ones.
* (grizzelbee) Upd: removed david-dm badge
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Fix: added passwords to encryptedNative
* (grizzelbee) Fix: added passwords to protectedNative
* (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) added missing info.connection object to io-package
* (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) Fixed new Warnings introduced with js-controller 3.2
* (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Light-Actions should work now

### V2.0.3 (2020-09-15)
* (grizzelbee) Upd: Updated country list in config dialog
* (grizzelbee) New: Some more debug code

### V2.0.2 (2020-09-15)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on failed authentication preventing a valid error message

### V2.0.1 (2020-09-14)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on logout while invalidating token

### V2.0.0 - Support for Miele API V1.0.3 (2020-08-25)
Some breaking changes in this release. Some data points changed their type. May require fixes in scripts. **Update with care!**
Due to the fix that data points with invalid values aren't created any longer, I recommend deleting all data points in Object view.
* (grizzelbee) Change: New Icon
* (grizzelbee) Fix: Number-data points are no longer created as strings due to their unit. They are correct numbers with units now.
* (grizzelbee) Fix: Unit °Celsius is now shown as °C - not longer °Celsius
* (grizzelbee) New: Introduced support for °Fahrenheit
* (grizzelbee) New: Introduced support for new Value "plateStep" for Hobs.
* (grizzelbee) New: Performing a LogOut from Miele API on shutdown to invalidate the Auth-Tokens.
* (grizzelbee) Fix: Data points with invalid values (null/-32768) are no longer created.

### V1.2.4 (2020-06-09)
* (grizzelbee) Fix: fixed No-Data Bug (introduced in V1.2.3)

### V1.2.3 (2020-06-07)
* (grizzelbee) Upd: fixed snyk badge
* (grizzelbee) Upd: Improved error handling

### V1.2.2 (2020-05-23)
* (grizzelbee) Upd: removed node 8 from testing on travis.com
* (grizzelbee) Fix: signalActionRequired should work better now
* (grizzelbee) Upd: Updated documentation
* (grizzelbee) Upd: Improved error handling in function APISendRequest
* (grizzelbee) Fix: Moved testing of Config to On(Ready) and fixed unit tests with this.

### V1.2.1 (2020-04-22)
* (grizzelbee) New: Introduced new boolean state (**signalActionRequired**) that indicates that the machine has finished running, but a human action, like putting the wet clothes to the dryer, ... is needed. State is cleared automatically when the door of the appliance is opened, or it is restarted. State is implemented for washing machines, tumble dryers, washer dryer and dishwashers. **Doesn't work perfectly currently.**
* (grizzelbee) Upd: Updated Documentation
* (grizzelbee) Fix: Fixed warnings with js-Controller >=3.0 (Issue #23)

### V1.2.0 (2020-04-18)
* (grizzelbee) New: Added new boolean state (**Connected**) that indicates whether the device is connected to WLAN or a gateway.
* (grizzelbee) New: Added new boolean state (**signalInUse**) that indicates whether the device is switched off (false) or in Use (true).
* (grizzelbee) Change: replaced the deprecated http-library **request** with **axios**
* (grizzelbee) Change: Made functions communicating with API asynchronous

### V1.1.0 (2020-03-07)
* (grizzelbee) New: Added Actions - Implemented all currently supported and documented Actions for all devices.
> Please remember that Actions will only work if you put your device into the appropriate state (e.g. Mobile Control)
please refer to [Miele-Documentation](#documentation) for more Information on actions.

### V1.0.5 (2020-02-14)
* (grizzelbee) removed node-schedule as a dependency
* (grizzelbee) implemented scheduling via setTimeout, which raises the opportunity
  to schedule with less than a minute in the future

### V1.0.4 (2020-02-12)
* (grizzelbee) removed unneeded setTimeout from main
* (grizzelbee) Clearing scheduler on unload of adapter
* (grizzelbee) Minor updates and fixed typos in Readme

### V1.0.3 (2020-02-06)
* (grizzelbee) removed an overseen logging of Passwords
* (grizzelbee) Fixed createTemperatureDatapoint to work with less than 3 values delivered from API
* (grizzelbee) Added some documentation
* (grizzelbee) Started implementation of DeviceActions


### V1.0.2 (2020-02-05)
* (grizzelbee) removed any logging of Passwords
* (grizzelbee) Fixed bug in config interface introduced during password encryption that config values aren't loaded properly

### V1.0.1 (2020-02-04)
* (grizzelbee) Fixes in environment for getting adapter into the Repo
* (grizzelbee) Passwords are stored encrypted now

### V1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefore it's incompatible with prior versions and needs to be installed freshly.
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug
* (grizzelbee) Chg: removed Push-API checkbox (maybe introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for non-german Miele-Accounts (ALL should be included)
* (grizzelbee) Complete new layout of data points
* (grizzelbee) Device types are grouped now

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values
* (grizzelbee) New: Parent-Datapoint of time values will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
  - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

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