---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.MieleCloudService
hash: NLdXDZESCf5j6ysJfVwBq9uCEljDcvRwQWn7UjjZg8M=
---
![Логотип](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![Количество установок](http://iobroker.live/badges/mielecloudservice-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Статус зависимости](https://img.shields.io/david/Grizzelbee/iobroker.mielecloudservice.svg)
![Известные уязвимости](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![Трэвис-Си](http://img.shields.io/travis/Grizzelbee/ioBroker.mielecloudservice/master.svg)
![НПМ](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)

# IoBroker.MieleCloudService
## Описание
Этот адаптер предназначен для получения информации обо всех ваших устройствах Miele @ Home из официального стороннего API Miele.
Независимо от того, подключены ли они напрямую через Wi-Fi или шлюз XGW3000. В нем реализован **API сторонних разработчиков Miele V1.0.3**

## Предварительные требования
* Miele @ Home User (приложение для смартфона)
* Miele @ Home Password (приложение для смартфона)
* Miele Client_id (с https://www.miele.com/developer/)
* Miele Client_secret (с https://www.miele.com/developer/)

## Монтаж
Для установки сделайте следующее:

1. Установите через Admin с помощью
 * стабильное репо - чтобы получить текущую стабильную версию
 * latest Repo - чтобы получить последнюю тестовую версию (может быть нестабильной)
 * через: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - чтобы получить последнюю версию для разработки
2. Создайте учетную запись для Miele @ Home в приложении для смартфона Miele.
3. Создайте учетную запись разработчика на странице https://www.miele.com/f/com/en/register_api.aspx.
4. Добавьте свои устройства Miele-Devices в приложение (если не добавляются автоматически)
6. Введите client_secret и client_id, полученные от команды разработчиков Miele, а также идентификатор учетной записи и пароль из приложения.

## Следующие шаги
* Новое: (увеличенный) интервал опроса, когда ни одно устройство не активно
* Новое: время сна для полного бездействия (например, ночью)

## Документация
В основном обращайтесь к основной документации API, опубликованной Miele.

* [Общая документация] (https://www.miele.com/developer/swagger-ui/index.html)
* [Предварительные условия для выполнения действия на устройстве] (https://www.miele.com/developer/swagger-ui/put_additional_info.html)

Существуют два типа точек данных. В виде удобочитаемого текста и числа.
Эти числовые поля данных, принадлежащие текстовому полю, имеют то же имя, но с добавлением «_raw».
Те поля, которые имеют общее значение, перечислены ниже.
Поля, которые не указаны в списке, различаются по своему значению от устройства к устройству и не исключаются Miele.
Если вам нужно ссылаться в скриптах на эти поля, всегда используйте значения _raw.
Значения текста могут измениться в будущем, а также зависят от языка.
Вот список того, что означают эти необработанные значения:

### Типы устройств
 | Исходное значение | Состояние |
 |----------|-------|
 | 1 | СТИРАЛЬНАЯ МАШИНА |
 | 2 | СУШИЛКА |
 | 7 | ПОСУДОМОЕЧНАЯ МАШИНА |
 | 8 | ПОСУДОМОЕЧНАЯ МАШИНА ПОЛУПРОФ |
 | 12 | ПЕЧЬ |
 | 13 | ПЕЧЬ СВЧ |
 | 14 | HOB HIGHLIGHT |
 | 15 | ПАРОВАЯ ПЕЧЬ |
 | 16 | СВЧ |
 | 17 | КОФЕЙНАЯ СИСТЕМА |
 | 18 | КАПОТ |
 | 19 | ХОЛОДИЛЬНИК |
 | 20 | МОРОЗИЛЬНИК |
 | 21 | КОМБИНАЦИЯ ХОЛОДИЛЬНИКА / МОРОЗИЛЬНИКА |
 | 23 | ВАКУУМНЫЙ ПЫЛЕСОС, АВТОМАТИЧЕСКИЙ РОБОТЫЙ ПЫЛЕСОС |
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
 | 42 | ДВОЙНОЙ СВЧ |
 | 43 | ДВОЙНАЯ МИКРОВОЛНОВАЯ ПЕЧЬ |
 | 45 | ПАРОВАЯ ПЕЧЬ СВЧ-КОМБИНАЦИЯ |
 | 48 | ВАКУУМНЫЙ ЯЩИК |
 | 67 | ДИАЛОГОВЕН |
 | 68 | ВИННЫЙ ШКАФ КОМБИНАЦИЯ МОРОЗИЛЬНИКОВ |

### Состояние / Статус
 | Исходное значение | Состояние |
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

### ProgramType / Programmart
| Исходное значение | Состояние |
|----------|-------|
| 0 | Нормальный режим работы |
| 1 | Собственная программа |
| 2 | Автоматическая программа |
| 3 | Программа очистки / ухода |

### DryStep / Trockenstufe
 | Исходное значение | Состояние |
 |----------|-------|
 | 0 | Экстра сухой |
 | 1 | Нормальный Плюс |
 | 2 | Нормальный |
 | 3 | Слегка сухая |
 | 4 | Под утюг, уровень 1 |
 | 5 | Под утюг 2-го уровня |
 | 6 | Машинный утюг |

### ProgramBezeichnung
| Исходное значение | Состояние | доступен для |
|----------|-------|---------------|
| 1 | «Баумволле» / «Хлопок» | Стиральная машина |
| 27 | "Imprägnieren" / | Стиральная машина |
| 48 | "Flusen ausspülen" | Стиральная машина с сушкой |
| 50 | "Dunkle Wäsche" / | Стиральная машина с сушкой |
| 123 | «Дунклз / Джинсы» | Стиральная машина |

### ProgramPhase
| Исходное значение | Состояние | доступен для |
|----------|-------|---------------|
| 260 | «Вашен» / «Стирка» | Стиральная машина |
| 261 | «Spülen» / «Полоскание» | Стиральная машина |
| 266 | «Шлейдерн» / «Спиннинг» | Стиральная машина |
| 267 | "Knitterschutz" / "" | Стиральная машина |
| 268 | «Энде» / «Конец» | Большинство устройств |
| 256 | "" | | |
| 514 | «Трокнен» | Стиральная машина с сушкой |
| 519 | «Абкюлен» | Стиральная машина с сушкой |
| 532 | "Flusen ausspülen" | Стиральная машина с сушкой |

## Авторское право
Авторские права (c) 2019, 2020 grizzelbee <hanjo@hingsen.de>

## Changelog
### 2.0.0 - Support for Miele API V1.0.3 (2020-08-25)
Some breaking changes in this release. Some datapoints changed their type. May require fixes in scripts. **Update with care!**
Due to the fix that datapoints with invalid values aren't created any longer, I recommend deleting all datapoints in Object view.
* (grizzelbee) Change: New Icon
* (grizzelbee) Fix: Number-datapoints are no longer created as strings due to their unit. They are correct numbers with units now.
* (grizzelbee) Fix: Unit °Celsius is now shown as °C - not longer °Celsius
* (grizzelbee) New: Introduced support for °Fahrenheit
* (grizzelbee) New: Introduced support for new Value "plateStep" for Hobs.
* (grizzelbee) New: Performing a LogOut from Miele API on shutdown to invalidate the Auth-Tokens. 
* (grizzelbee) Fix: Datapoints with invalid values (null/-32768) are no longer created.

### 1.2.4 (2020-06-09)
* (grizzelbee) Fix: fixed No-Data Bug (introduced in V1.2.3)

### 1.2.3 (2020-06-07)
* (grizzelbee) Upd: fixed snyk badge
* (grizzelbee) Upd: Improved error handling 

### 1.2.2 (2020-05-23)
* (grizzelbee) Upd: removed node 8 from testing on travis.com 
* (grizzelbee) Fix: signalActionRequired should work better now 
* (grizzelbee) Upd: Updated documentation 
* (grizzelbee) Upd: Improved error handling in function APISendRequest 
* (grizzelbee) Fix: Moved testing of Config to On(Ready) and fixed unit tests with this.

### 1.2.1 (2020-04-22)
* (grizzelbee) New: Introduced new boolean state (**signalActionRequired**) that indicates that the machine has finished running, but a human action, like putting the wet clothes to the dryer, ... is needed. State is cleared automatically when the door of the appliance is opened, or it is restarted. State is implemented for washing machines, tumbledryers, washer dryer and dishwashers. **Dosen't work perfectly currently.**  
* (grizzelbee) Upd: Updated Documentation 
* (grizzelbee) Fix: Fixed warnings with js-Controller >=3.0 (Issue #23)

### 1.2.0 (2020-04-18)
* (grizzelbee) New: Added new boolean state (**Connected**) that indicates whether the device is connected to WLAN or a gateway.
* (grizzelbee) New: Added new boolean state (**signalInUse**) that indicates whether the device is switched off (false) or in Use (true).
* (grizzelbee) Change: replaced the deprecated http-library **request** with **axios** 
* (grizzelbee) Change: Made functions communicating with API asynchronus 
  
### 1.1.0 (2020-03-07)
* (grizzelbee) New: Added Actions - Implemented all currently supported and documented Actions for all devices
               Please remember that Actions will only work if you put your device into the appropiate state (e.g. Mobile Control)
               please refer to [Miele-Documentation](#documentation) for more Information on actions. 
  
### 1.0.5 (2020-02-14)
* (grizzelbee) removed node-schedule as a dependency
* (grizzelbee) implemented scheduling via setTimeout, which raises the opportunity 
               to schedule with less than a minute in the future

### 1.0.4 (2020-02-12)
* (grizzelbee) removed unneeded setTimeout from main
* (grizzelbee) Clearing scheduler on unload of adapter
* (grizzelbee) Minor updates and fixed typos in Readme

### 1.0.3 (2020-02-06)
* (grizzelbee) removed an overseen logging of Passwords
* (grizzelbee) Fixed createTemperatureDatapoint to work with less than 3 values delivered from API
* (grizzelbee) Added some documentation
* (grizzelbee) Started implementation of DeviceActions 


### 1.0.2 (2020-02-05)
* (grizzelbee) removed any logging of Passwords
* (grizzelbee) Fixed bug in config interface introduced during password encryption that config values aren't loaded properly

### 1.0.1 (2020-02-04)
* (grizzelbee) Fixes in environment for getting Adapater into the Repo
* (grizzelbee) Passwords are stored encyrpted now

### 1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefor it's incompatible with prior versions and needs to be installed freshly. 
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug 
* (grizzelbee) Chg: removed Push-API checkbox (may be introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for Non german Miele-Accounts (ALL should be included)
* (grizzelbee) Completely new layout of datapoints
* (grizzelbee) Devicetypes are grouped now 

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values 
* (grizzelbee) New: Parent-Datapoint of timevalues will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.  

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