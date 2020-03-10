---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.MieleCloudService
hash: tnKz7m2fzyctXLChpilehEK9zJWfflzet92chku6PWE=
---
![логотип](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.png)

![Количество установок](http://iobroker.live/badges/mielecloudservice-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Статус зависимости](https://img.shields.io/david/Grizzelbee/iobroker.mielecloudservice.svg)
![Известные уязвимости](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg)
![Трэвис-CI](http://img.shields.io/travis/Grizzelbee/ioBroker.mielecloudservice/master.svg)
![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)

# IoBroker.MieleCloudService
## Описание
Этот адаптер предназначен для получения информации обо всех ваших устройствах Miele @ Home из официального стороннего API Miele.
Независимо от того, подключены ли они через WiFi или XGW3000 Gateway. Он реализует **Miele Сторонний API V1.0.0**

## Установка
Для установки выполните следующее:

1. Установите через Admin, используя стабильный или последний репо или через: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git
2. создать приложение-аккаунт для Miele @ Home в приложении Miele для смартфонов
3. Создайте учетную запись разработчика по адресу https://www.miele.com/f/com/en/register_api.aspx.
4. Добавьте свои Miele-устройства в приложение (если не добавлено автоматически)
6. Заполните client_secret и client_id, полученные от команды разработчиков Miele, а также идентификатор учетной записи и пароль из приложения.

## Предпосылки
* Miele @ Home User (приложение для смартфона)
* Miele @ Home Password (приложение для смартфонов)
* Miele Client_id (от https://www.miele.com/developer/)
* Miele Client_secret (из https://www.miele.com/developer/)

## Следующие шаги
* Новое: (более длинный) интервал опроса, когда ни одно устройство не активно
* Новое: время сна для полной неактивности (например, ночью)

## Документация
Пожалуйста, в основном обращайтесь к основной документации API, опубликованной Miele

* [Общая документация] (https://www.miele.com/developer/swagger-ui/index.html)
* [Предварительные условия для выполнения действий на устройстве] (https://www.miele.com/developer/swagger-ui/put_additional_info.html)

Существует несколько точек данных в 2 видах. Как читабельный текст и как число.
Эти числовые поля данных, принадлежащие текстовому полю, имеют то же имя, но с добавлением «_raw».
Те поля, которые имеют общее значение, перечислены ниже.
Поля, которые не перечислены, различаются по своему значению от устройства к устройству и не декументированы Miele.
Если вам нужно ссылаться в скриптах на эти поля, всегда используйте значения _raw.
Значения текста могут измениться в будущем, а также зависят от языка.
Вот список того, что означают эти необработанные значения:

### DeviceTypes
 | Необработанная стоимость | государство |
 |----------|-------|
 | 1 | СТИРАЛЬНАЯ МАШИНА |
 | 2 | Сушилка для белья |
 | 7 | DISHWASHER |
 | 8 | ПОЛУПРОМЫШЛЕННАЯ ПОСЫЛКА |
 | 12 | ПЕЧЬ |
 | 13 | ПЕЧЬ МИКРОВОЛНОВАЯ |
 | 14 | HOB HIGHLIGHT |
 | 15 | ПАРОВАЯ ПЕЧЬ |
 | 16 | МИКРОВОЛНОВЫЙ |
 | 17 | КОФЕ СИСТЕМА |
 | 18 | HOOD |
 | 19 | ХОЛОДИЛЬНИК |
 | 20 | FREEZER |
 | 21 | ХОЛОДИЛЬНАЯ / МОРОЗИЛЬНАЯ КОМБИНАЦИЯ |
 | 23 | ВАКУУМНЫЙ ОЧИСТИТЕЛЬ, АВТОМАТИЧЕСКИЙ РОБОТИЧЕСКИЙ ВАКУУМНЫЙ ОЧИСТИТЕЛЬ |
 | 24 | СТИРАЛЬНАЯ СУШКА |
 | 25 | БЛЮДА ДЛЯ БЛЮДА |
 | 27 | HOB INDUCTION |
 | 28 | ПЕЧЬ ГАЗА |
 | 31 | ПАРОВАЯ КОМБИНАЦИЯ |
 | 32 | ВИННЫЙ ШКАФ |
 | 33 | БЛОК КОНДИЦИОНИРОВАНИЯ ВИНА |
 | 34 | БЛОК КОНДИЦИОНИРОВАНИЯ ВИН |
 | 39 | ДВОЙНАЯ ПЕЧЬ |
 | 40 | ПЕЧЬ ДЛЯ ДВОЙНОГО ПАРА |
 | 41 | ДВУХКОМПОНЕНТНАЯ ДУХОВНАЯ КОМБИНАЦИЯ |
 | 42 | ДВОЙНОЙ МИКРОВОЛНОВОЙ |
 | 43 | ДВОЙНАЯ МИКРОВОЛНОВАЯ ПЕЧЬ |
 | 45 | ПАРОВОЙ МИКРОВОЛНОВОЙ КОМБИНАЦИИ |
 | 48 | ВАКУУМНЫЙ ЯЩИК |
 | 67 | DIALOGOVEN |
 | 68 | ВИННЫЙ КАБИНЕТ КОМБИНАЦИИ МОРОЗИЛЬНЫХ |

### Штат / Статус
 | Необработанная стоимость | государство |
 |----------|-------|
| 1 | OFF |
 | 2 | STAND_BY |
 | 3 | ПРОГРАММИРОВАНИЕ |
 | 4 | PROGRAMMED_WAITING_TO_START |
 | 5 | RUNNING |
 | 6 | PAUSE |
 | 7 | END_PROGRAMMED |
 | 8 | FAILURE |
 | 9 | PROGRAMME_INTERRUPTED |
 | 10 | IDLE |
 | 11 | RINSE_HOLD |
 | 12 | СЕРВИС |
 | 13 | суперзамораживания |
 | 14 | переохлаждение |
 | 15 | Перегрев |
 | 144 | DEFAULT |
 | 145 | LOCKED |
 | 146 | SUPERCOOLING_SUPERFREEZING |

### ProgramType / Programmart
| Необработанная стоимость | государство |
|----------|-------|
| 0 | Нормальный режим работы |
| 1 | Собственная программа |
| 2 | Автоматическая программа |
| 3 | Программа очистки / ухода |

### DryStep / Trockenstufe
 | Необработанная стоимость | государство |
 |----------|-------|
 | 0 | Экстра сухой |
 | 1 | Нормал Плюс |
 | 2 | Нормальный |
 | 3 | Слегка сухой |
 | 4 | Ручной утюг уровень 1 |
 | 5 | Ручной утюг уровень 2 |
 | 6 | Машинное железо |

## Changelog

### 1.1.0 (2020-03-07)
* (grizzelbee) New: Added Actions - Implemented all currently supported and documented Actions for all devices
               Please remember that Actions will only work if you put your device into the appropiate state (e.g. Mobile Control)
               please refer to https://www.miele.com/developer/swagger-ui/put_additional_info.html for more Information on actions. 
  
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

##Copyright
Copyright (c) 2019, 2020 grizzelbee <hanjo@hingsen.de>