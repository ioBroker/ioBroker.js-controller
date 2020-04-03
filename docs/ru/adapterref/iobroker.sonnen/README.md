---
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-Greenkeeper badge: https://badges.greenkeeper.io/foxriver76/ioBroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonnen/README.md
title: солнечный адаптер
hash: dsD7u9HDDpnPSQsxuk9HjRkYv2Fu3q1EL6WtCUvPGCQ=
---
![логотип](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

# Солнечный адаптер
Адаптер sonnen позволяет интегрировать sonnenBatterie в ioBroker.

## Обзор
### SonnenBatterie
С sonnenBatterie, самогенерируемая энергия из солнечной системы может храниться для вашего собственного использования и использоваться, когда вам это нужно. Это позволяет стать независимым от анонимных энергетических компаний и стать самодостаточным производителем электроэнергии. Благодаря встроенному диспетчеру энергопотребления интеллектуальное высокотехнологичное хранилище электроэнергии гарантирует, что домашнее хозяйство обеспечено собственным электричеством наилучшим образом.
Это не только недорого, но и экологично! SonnenBatterie доступен в различных и гибких моделях хранения.

### Солнцезащитный адаптер
Адаптер sonnen может контролировать и контролировать батарею sonnen в сети. Используя адаптер обнаружения (TODO: Link), sonnenBatterie может быть автоматически найден в сети. <br/> Адаптер создает состояния для мониторинга и управления sonnenBatterie в виде объектов. Большая часть состояний используется только для контроля батареи, а путем описания некоторых состояний батареей также можно управлять.

## Требования перед установкой
Обязательным условием работы sonnenBatterie с ioBroker является успешная установка батареи электриком. Аккумулятор также должен быть в той же сети, что и ioBroker.

### Монтаж
Экземпляр адаптера устанавливается через интерфейс администратора ioBroker. Подробные инструкции по необходимым шагам установки можно найти здесь (TODO: LINK). <br/><br/> После завершения установки экземпляра адаптера окно конфигурации открывается автоматически.

## Конфигурация
### Главное окно настроек
![Основные настройки](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "Основные настройки")

| Поле | Описание |
|:-------------|:-------------|
| IP-адрес | IP-адрес требуемой sonnenBattery должен быть указан здесь. |

### Окно расширенных настроек
![Расширенные настройки](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "Расширенные настройки")

| Поле | Описание |
|:-------------|:-------------|
| Интервал опроса | Альтернативное значение может быть установлено здесь в миллисекундах. Состояния sonnenBatterie обновляются в этом интервале |

После завершения настройки выйдите из диалогового окна конфигурации, нажав `SPEICHERN UND SCHLIEßEN`.
Это затем перезапустит адаптер.

## Экземпляры
При установке адаптера был создан активный экземпляр адаптера sonnen в области §SSSSS_0§§. <br/><br/> ![Пример](../../../de/adapterref/iobroker.sonnen/media/instance.png "Пример") <span style="color:grey">* Первая инстанция *</span>

На сервере ioBroker можно создать несколько экземпляров адаптера sonnen. И наоборот, sonnenBatterie также может работать с несколькими серверами ioBroker. Если несколько устройств должны управляться одним сервером ioBroker, для каждой батареи должен быть создан один экземпляр. <br/><br/> Цвет поля состояния экземпляра указывает, активирован ли адаптер или подключен к аккумулятору. Если указатель мыши указывает на символ, отображается дополнительная подробная информация.

## Объекты адаптера
Все устройства и действия, распознаваемые адаптером в концентраторе, перечислены в древовидной структуре в области `Objekte`. Кроме того, также сообщается, является ли связь с концентратором гладкой.

![Объекты](../../../de/adapterref/iobroker.sonnen/media/objects.png "солнечные объекты") <span style="color:grey">* Предметы солнечного адаптера *</span>

Затем объекты делятся на состояния и кнопки. Поскольку в зависимости от батареи есть два разных API, создаются только те состояния, которые поддерживаются соответствующей батареей.
Каждая точка данных указана с соответствующим типом данных и ее полномочиями.
Полномочия можно читать (R) и писать (W). Каждая точка данных может быть прочитана, по крайней мере, (R), тогда как другие также могут быть записаны. Для поиска конкретной точки данных мы рекомендуем использовать комбинацию клавиш «CTRL + F».

### Состояния
#### Канал: информация
* info.connection

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только для чтения логическое значение, которое верно, когда установлено соединение между ioBroker и батареей.*

* info.lastSync

    | Тип данных | Авторизация |
    |:---:|:---:|
    | метка времени | R |

   *Только читаемая временная метка, которая обновляется каждый раз, когда обновляются данные.*

* info.configuration

    | Тип данных | Авторизация |
    |:---:|:---:|
    | строка | R |

   *Только читаемая строка JSON с информацией о конфигурации sonnenBatterie.*

* info.powerMeter

    | Тип данных | Авторизация |
    |:---:|:---:|
    | строка | R |

   *Только читаемая строка JSON с текущей информацией об измерении sonnenBatterie.*

* info.inverter

    | Тип данных | Авторизация |
    |:---:|:---:|
    | строка | R |

   *Только читаемая строка JSON с информацией об инверторе из sonnenBatterie.*

#### Канал: статус
* статус.потребление

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

   *Только читаемое числовое значение, которое содержит текущее потребление дома в ваттах.*

* status.production

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

   *Только читаемое числовое значение, которое указывает, сколько ватт в настоящее время производится системой PV.*

* status.pacTotal

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

*Только читаемое числовое значение, которое указывает на переменный ток инвертора.
Если значение больше 0, батарея разряжается, если значение меньше 0.*

* status.relativeSoc

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

   *Только читаемое числовое значение, которое представляет текущий уровень заряда батареи.*

* status.userSoc

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

   *Только читаемое числовое значение, которое представляет текущий уровень заряда батареи.*

* status.acFrequency

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

   *Только читаемое числовое значение, представляющее частоту переменного тока в герцах.*

* status.acVoltage

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

   *Только читаемое числовое значение, которое представляет текущее переменное (переменное напряжение) напряжение инвертора.*

* status.batteryVoltage

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

   *Только читаемое числовое значение, которое представляет текущее постоянное (постоянное напряжение) напряжение батареи.*

* status.systemTime

    | Тип данных | Авторизация |
    |:---:|:---:|
    | дата | р |

   *Только читаемая дата ISO, которая представляет системное время батареи.*

* status.systemInstalled

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только для чтения логическое значение, которое верно, если система установлена правильно.*

* status.batteryCharging

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только для чтения логическое значение. Это верно, если sonnenBatterie в настоящее время заряжается.*

* status.flowConsumpBattery

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только для чтения логическое значение. Это верно, если батарея в настоящее время разряжается.*

* status.flowConsumpGrid

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое имеет значение true, если в данный момент питание подается из сетки.*

* status.flowConsitationProduction

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только для чтения логическое значение. Это верно, если электричество в настоящее время используется непосредственно системой PV.*

* status.flowGridBattery

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемый логический индикатор, который является истинным, если батарея в данный момент заряжается от сети.*

* status.flowProductionBattery

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если батарея в данный момент заряжается напрямую системой PV.*

* status.flowProductionGrid

    | Тип данных | Авторизация |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если генерируемая электроэнергия в настоящее время подается в сеть.*

* status.gridFeedIn

    | Тип данных | Авторизация |
    |:---:|:---:|
    | число | R |

*Только читаемое числовое значение, которое представляет количество электроэнергии в ваттах, которое в настоящее время подается в сеть или подключается к ней.
Если значение положительное, сетка в настоящее время подается в сетку, если оно отрицательное, количество электроэнергии берется из сетки.*

#### Канал: контроль
* control.charge

    | Тип данных | Авторизация |
    |:---:|:---:|
    | номер | R / W |

   *Числовое значение, которое позволяет установить максимальный разряд батареи в ваттах.*

*Примечание. Если установлено неверное значение, оно все равно будет подтверждено. Подтверждение значения означает только то, что команда была передана в батарею.*

   *Пример:*

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

* control.discharge

    | Тип данных | Авторизация |
    |:---:|:---:|
    | номер | R / W |

   *Числовое значение, позволяющее определить максимальный заряд батареи в ваттах.*

*Примечание. Если установлено неверное значение, оно все равно будет подтверждено. Подтверждение значения означает только то, что команда была передана в батарею.*

   *Пример:*

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

## Changelog
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