---
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonnen/README.md
title: адаптер sonnen
hash: sji7Vk7L1ru2xOORB4OM6cKSlk2BrONMW9eFqpQMHLs=
---
![логотип](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

# Sonnen адаптер
Адаптер sonnen позволяет интегрировать sonnenBatterie в ioBroker.

## Обзор
### SonnenBatterie
С sonnenBatterie энергия, генерируемая солнечной системой, может храниться для личного использования и использоваться именно тогда, когда это необходимо. Это дает возможность стать независимым от анонимных энергетических компаний и стать самодостаточным производителем электроэнергии. Благодаря встроенному энергоменеджеру интеллектуальная высокотехнологичная система хранения электроэнергии гарантирует, что домашнее хозяйство будет снабжаться собственной электроэнергией наилучшим образом.
Это не только недорого, но и экологически безопасно! SonnenBatterie доступен в различных и гибких моделях хранения.

### Адаптер sonnen
Адаптер sonnen может контролировать и управлять sonnenBatterie в сети. С помощью адаптера Discovery (TODO: Link) sonnenBatterien можно автоматически найти в сети.<br/> Адаптер создает состояния для мониторинга и управления sonnenBatterie в виде объектов. Большинство состояний используются только для контроля заряда батареи, в то время как батареей можно дополнительно управлять, описывая некоторые состояния.

## Требования перед установкой
Необходимым условием для работы sonnenBatterie с ioBroker является успешная установка аккумулятора электриком. Аккумулятор также должен быть в той же сети, что и ioBroker.

### Установка
Экземпляр адаптера устанавливается через интерфейс администратора ioBroker. Подробные инструкции по необходимым этапам установки можно найти здесь (TODO: LINK).<br/><br/> После завершения установки экземпляра адаптера автоматически открывается окно конфигурации.

## Конфигурация
### Окно «Основные настройки»
![Основные настройки](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "Основные настройки")

| Поле | Описание |
|:-------------|:-------------|
| IP-адрес | Здесь необходимо ввести IP-адрес желаемого sonnenBatterie. |

| Поле | Описание |
|:-------------|:-------------|
| Auth-Token | Здесь необходимо ввести Auth-Token, который можно найти в веб-интерфейсе sonnen в разделе «Интеграция программного обеспечения». Если Auth-Token не введен, используется неофициальный API, который можно отключить в любое время. |

### Окно «Дополнительные настройки»
![Расширенные настройки](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "Расширенные настройки")

| Поле | Описание |
|:-------------|:-------------|
| Интервал запроса | Здесь можно установить альтернативное значение в миллисекундах. Состояния sonnenBatterie обновляются в этом интервале. |

После завершения настройки диалоговое окно конфигурации закрывается с `SPEICHERN UND SCHLIEßEN`.
Это приводит к перезапуску адаптера.

## Экземпляров
При установке адаптера был создан активный экземпляр адаптера sonnen в разделе `Objekte`.<br/><br/> ![Пример](../../../de/adapterref/iobroker.sonnen/media/instance.png "Пример") <span style="color:grey">* Первая инстанция *</span>

На сервере ioBroker можно создать несколько экземпляров sonnen Adapter. И наоборот, sonnenBatterie также может работать с несколькими серверами ioBroker. Если несколько устройств должны управляться одним сервером ioBroker, необходимо создать экземпляр для каждой батареи.<br/><br/> Активирован ли адаптер или подключен ли он к аккумулятору, отображается цветом поля состояния экземпляра. Если указатель мыши указывает на символ, отображается более подробная информация.

## Объекты адаптера
В разделе `Objekte` все устройства и действия, распознаваемые адаптером в концентраторе, перечислены в древовидной структуре. Кроме того, также сообщается, работает ли связь с хабом.

![Объекты](../../../de/adapterref/iobroker.sonnen/media/objects.png "солнечные объекты") <span style="color:grey">* Объекты</span> соннен- <span style="color:grey">адаптера *</span>

Далее объекты делятся на состояния и кнопки. Поскольку существует два разных API в зависимости от батареи, создаются только те состояния, которые поддерживаются соответствующей батареей.
Каждая точка данных перечислена с соответствующим типом данных и полномочиями.
Авторизации можно читать (R) и писать (W). Каждая точка данных может быть как минимум прочитана (R), а другие также могут быть записаны. Для поиска определенной точки данных мы рекомендуем использовать для поиска комбинацию клавиш «CTRL + F».

### Состояния
#### Канал: информация
* info.connection

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если соединение между ioBroker и аккумулятором установлено.*

* info.lastSync

    | Тип данных | авторизация |
    |:---:|:---:|
    | отметка времени | R |

   *Временная метка только для чтения, которая обновляется каждый раз при обновлении данных.*

* info.configuration

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

   *Только читаемая строка JSON с информацией о конфигурации sonnenBatterie.*

* info.powerMeter

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

   *Только читаемая строка JSON с текущей информацией об измерениях sonnenBatterie.*

* info.inverter

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

   *Только читаемая строка JSON с инверторной информацией от sonnenBatterie.*

#### Канал: статус
* статус. потребление

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

   * Читаемое числовое значение, которое содержит текущее потребление дома в ваттах.

* status.production

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

   *Только читаемое числовое значение, которое указывает, сколько ватт в настоящее время вырабатывается фотоэлектрической системой.*

* status.pacTotal

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

*Только читаемое числовое значение, которое указывает мощность переменного тока инвертора.
Если значение больше 0, батарея разряжена, если значение меньше 0, она заряжена.*

* status.relativeSoc

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

   *Только читаемое числовое значение, которое представляет текущий уровень заряда аккумулятора.*

* status.userSoc

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

   *Только читаемое числовое значение, которое представляет текущий уровень заряда аккумулятора.*

* status.acFrequency

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

   *Только читаемое числовое значение, которое представляет частоту переменного тока в герцах.*

* status.acVoltage

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

   *Только читаемое числовое значение, которое представляет текущее напряжение переменного тока (переменного тока) инвертора.*

* status.batteryVoltage

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

   *Только читаемое числовое значение, которое представляет текущее постоянное напряжение батареи.*

* status.systemTime

    | Тип данных | авторизация |
    |:---:|:---:|
    | дата | R |

   *Дата ISO только для чтения, которая представляет собой системное время аккумулятора.*

* status.systemInstalled

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если система правильно установлена.*

* status.batteryCharging

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение. Это верно, если sonnenBatterie в настоящее время заряжается.*

* status.flowConsumingBattery

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение. Это верно, если батарея в данный момент разряжается.*

* status.flowConsumingGrid

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если питание в настоящее время потребляется из сети.*

* status.flowConsumingProduction

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение. Это верно, если электричество в настоящее время потребляется непосредственно фотоэлектрической системой.*

* status.flowGridBattery

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Логический индикатор только для чтения, который верен, если аккумулятор в настоящее время заряжается от сети.*

* status.flowProductionBattery

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если аккумулятор в настоящее время заряжается напрямую от фотоэлектрической системы.*

* status.flowProductionGrid

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если произведенная электроэнергия в настоящее время подается в сеть.*

* status.gridFeedIn

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R |

*Только для чтения числовое значение, которое представляет количество электроэнергии в ваттах, которая в настоящее время подается в сеть или потребляется.
Если значение положительное, сеть в настоящее время подается в сеть; если отрицательное, количество электроэнергии забирается из сети.*

* status.onlineStatus

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, sonnenBatterie находится в сети.*

#### Канал: контроль
* control.charge

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R / W |

   *Числовое значение, позволяющее указать максимальный разряд батареи в ваттах.*

*Примечание: если установлено недопустимое значение, оно все равно будет подтверждено. Подтверждение (подтверждение) значения означает только то, что команда была передана на аккумулятор.*

*Соответствующее значение уставки сохраняется до тех пор, пока аккумулятор не получит новое значение заряда или разряда.
Если VPP активен, запрос будет отклонен.*

   *Пример:*

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

* контроль. разряд

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R / W |

   *Числовое значение, позволяющее указать максимальный заряд аккумулятора в ваттах.*

*Примечание: если установлено недопустимое значение, оно все равно будет подтверждено. Подтверждение (подтверждение) значения означает только то, что команда была передана на аккумулятор.*

*Соответствующее значение уставки сохраняется до тех пор, пока аккумулятор не получит новое значение заряда или разряда.
Если VPP активен, запрос будет отклонен.*

   *Пример:*

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

#### Канал: измеритель мощности
Этот канал имеет два подканала, например `4_1` и `4_2`, где один представляет потребление, а другой представляет производство.

Два канала имеют одинаковый статус. Все состояния защищены от записи и имеют тип `number`.

### Канал: инвертор
Канал состоит из защищенных от записи состояний типа `number`, которые предоставляют информацию об инверторе солнечной батареи.

## Changelog
### 1.7.0 (2020-11-12)
* (foxriver76) new channels for powermeter and inverter

### 1.6.1 (2020-11-11)
* (foxriver76) fixed charge and discharge not working with api v2

### 1.6.0 (2020-08-09)
* (foxriver76) added support for official api, automatically used when auth token is given by user

### 1.5.3 (2020-05-18)
* (foxriver76) poll online status always again if not confirmed that there are differences in api (old solution could lead to false negative)
* (foxriver76) more specific error handling 

### 1.5.2 (2020-05-16)
* (foxriver76) check if onlineStatus is supported at adapter start - else do not poll it

### 1.5.0 (2020-05-04)
* (foxriver76) added online status indicator

### 1.4.2 (2020-04-16)
* (foxriver76) added more translations
* (foxriver76) optimizations for compact mode

### 1.4.0
* (foxriver76) introducing new states with power metering and inverter information (supported on :8080 API)
* (foxriver76) only minimum support until we know what users need as states

### 1.3.0
* (foxriver76) introducing new state with configuration information (supported on :8080 API)

### 1.2.0
* (foxriver76) support of another sonnen api

### 1.1.2
* (foxriver76) bugfix for control states

### 1.1.1
* (foxriver76) add compact mode compatibility

### 1.0.2
* (foxriver76) use adapter-core module

### 1.0.1
* (foxriver76) take timezone offset into account on time states

### 1.0.0
* (foxriver76) formal version increment

### 0.0.8
* (foxriver76) Enhanced debug logging
* (foxriver76) Prevent crashing when a return code is received

### 0.0.7
* (foxriver76) Only set info.connection on change

### 0.0.6
* (foxriver76) Only set states if request was successfull --> prevents adapter crash

### 0.0.5
* (foxriver76) translations on index_m.html
* (foxriver76) use 7000 as interval if poll interval is undefined

### 0.0.3
* (foxriver76) fixed links to bugs, repo etc

### 0.0.2
* (foxriver76) bugfixes on control states
* (foxriver76) big readme update
* (foxriver76) addded more states
* (foxriver76) added advanced settings

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2020 Moritz Heusinger <moritz.heusinger@gmail.com>

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