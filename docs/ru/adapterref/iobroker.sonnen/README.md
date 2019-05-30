---
BADGE-Build Status Travis: https://travis-ci.org/foxriver76/ioBroker.sonnen.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/9c3a9qlw4ut32hbu/branch/master?svg=true
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-Greenkeeper badge: https://badges.greenkeeper.io/foxriver76/ioBroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonnen/README.md
title: солнечный адаптер
hash: cRAG41z6WHo/8QW3c2dIJI3YbUgkBUJZhnQipGRKYaE=
---
![логотип](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

# Солнечный адаптер
Адаптер sonnen позволяет интегрировать sonnenBatterie в ioBroker.

## Обзор
### Солнечная батарея
С помощью sonnenBatterie самостоятельно генерируемая энергия из солнечной системы может храниться для личного использования и использоваться именно тогда, когда это необходимо. Это позволяет стать независимым от анонимных энергетических компаний и даже стать самодостаточным производителем электроэнергии. Благодаря встроенному диспетчеру энергопотребления интеллектуальное высокотехнологичное устройство для хранения электроэнергии гарантирует, что домашнее хозяйство обеспечено собственной энергией наилучшим образом.
Это не только экономически выгодно, но и экологично! SonnenBatterie доступен в различных и гибких моделях памяти.

### Солнцезащитный адаптер
Солнечный адаптер может контролировать и контролировать солнечную батарею в сети. Адаптер Discovery (TODO: Link) позволяет автоматически находить в сети солнечные батареи. <br/> Адаптер создает состояния для мониторинга и управления солнечной батареей в виде объектов. Большая часть состояний служит только для мониторинга батареи, а при описании некоторых состояний батареей можно дополнительно управлять.

## Предварительные условия перед установкой
Обязательным условием работы солнечной батареи с ioBroker является успешная установка батареи электриком. Кроме того, аккумулятор должен быть в той же сети, что и ioBroker.

### Установка
Экземпляр адаптера устанавливается через интерфейс администратора ioBroker. Подробные инструкции по необходимым шагам установки можно найти здесь (TODO: LINK). <br/><br/> После завершения установки экземпляра адаптера окно конфигурации открывается автоматически.

## Конфигурация
### Главное окно настроек
![Основные настройки](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "Основные настройки")

| Поле | Описание |
|:-------------|:-------------|
| IP-адрес | Здесь необходимо указать IP-адрес требуемой солнечной батареи. |

### Окно «Расширенные настройки»
![Расширенные настройки](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "Расширенные настройки")

| Поле | Описание |
|:-------------|:-------------|
| Интервал запроса | Здесь можно задать альтернативное значение в миллисекундах. В этом интервале состояния солнечной батареи обновляются |

После завершения настройки диалоговое окно конфигурации закрывается с `SPEICHERN UND SCHLIEßEN`.
Это приведет к последующему перезапуску адаптера.

## Экземпляры
Установка адаптера создала активный экземпляр солнечного адаптера в области `Objekte`. <br/><br/> ![пример](../../../de/adapterref/iobroker.sonnen/media/instance.png "пример") <span style="color:grey">* Первая инстанция *</span>

На сервере ioBroker можно создать несколько экземпляров адаптера Sun. И наоборот, солнечная батарея также может работать с несколькими серверами ioBroker. Если несколько устройств должны управляться одним сервером ioBroker, для каждой батареи должен быть создан один экземпляр. <br/><br/> Активизирован ли адаптер или подключен ли он к батарее, указывается цветом поля состояния экземпляра. Если указатель мыши указывает на символ, отображается дополнительная подробная информация.

## Объекты адаптера
В разделе `Objekte` все устройства и действия, распознаваемые адаптером в концентраторе, перечислены в древовидной структуре. Кроме того, предоставляется также информация о том, происходит ли связь с концентратором гладко.

![объекты](../../../de/adapterref/iobroker.sonnen/media/objects.png "солнечные объекты") <span style="color:grey">* объекты солнечного адаптера *</span>

Впоследствии объекты делятся на состояния и кнопки. Поскольку в зависимости от батареи есть два разных API, создаются только те состояния, которые поддерживаются соответствующей батареей.
Каждая точка данных связана с соответствующим типом данных и разрешениями.
Разрешения можно читать (R), а также писать (W). Каждая точка данных может быть по меньшей мере прочитана (R), тогда как другие также могут быть описаны. Для поиска конкретной точки данных рекомендуется поиск с использованием комбинации клавиш «CTRL + F».

### Говорится
#### Канал: информация
* info.connection

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логическое значение, которое имеет значение true, если установлено соединение между ioBroker и батареей.*

* info.lastSync

    | Тип данных | авторизация |
    |:---:|:---:|
    | Отметка | R |

   *Отметка времени только для чтения, обновляется каждый раз, когда обновляются данные.*

* info.configuration

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R |

   *Только для чтения строки JSON, с информацией о конфигурации солнечной батареи.*

#### Канал: статус
* статус.потребление

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

   *Только для чтения числовое значение, которое содержит текущее потребление дома в ваттах.*

* status.production

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

   *Числовое значение только для чтения, которое указывает, сколько ватт в настоящее время производится системой PV.*

* status.pacTotal

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

*Только для чтения числовое значение, которое указывает мощность переменного тока инвертора.
Если значение больше 0, батарея разряжается, а значение меньше 0 заряжается.*

* status.relativeSoc

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

   *Только для чтения числовое значение, представляющее текущий уровень заряда батареи.*

* status.userSoc

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

   *Только для чтения числовое значение, представляющее текущий уровень заряда батареи.*

* status.acFrequency

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

   *Только для чтения числовое значение, которое представляет частоту переменного тока в герцах.*

* status.acVoltage

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

   *Только для чтения числовое значение, которое представляет текущее переменное (переменное) текущее напряжение инвертора.*

* status.batteryVoltage

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

   *Только для чтения числовое значение, которое представляет текущее напряжение постоянного тока батареи.*

* status.systemTime

    | Тип данных | авторизация |
    |:---:|:---:|
    | Дата | R |

   *Только для чтения дата ISO, представляющая системное время батареи.*

* status.systemInstalled

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логическое значение, которое имеет значение true, если система установлена правильно.*

* status.batteryCharging

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логическое значение. Это верно, если солнечная батарея в данный момент заряжается.*

* status.flowConsumpBattery

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логическое значение. Это верно, если батарея в настоящее время разряжается.*

* status.flowConsumpGrid

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логическое значение, которое истинно, если мощность в настоящее время поступает из сетки.*

* status.flowConsitationProduction

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логическое значение. Это верно, если энергия в настоящее время потребляется непосредственно от фотоэлектрической системы.*

* status.flowGridBattery

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логический индикатор, который имеет значение true, если батарея в данный момент заряжается через сеть.*

* status.flowProductionBattery

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логическое значение, которое истинно, если батарея в данный момент заряжается напрямую через фотоэлектрическую систему.*

* status.flowProductionGrid

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   *Только для чтения логическое значение, которое истинно, если генерируемая мощность в данный момент подается в сеть.*

* status.gridFeedIn

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R |

*Числовое значение только для чтения, которое представляет количество энергии в ваттах, которое в настоящее время подается в сеть.
Если значение положительное, оно в настоящее время подается в сеть, а если оно отрицательное, количество электроэнергии будет извлечено из сетки.*

#### Канал: контроль
* control.charge

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R / W |

   *Числовое значение, которое позволяет установить максимальный разряд батареи в ваттах.*

*Примечание. Если установлено неверное значение, оно все равно будет подтверждено. Подтверждение (Подтверждение) значения означает только то, что команда была передана в батарею.*

   *Пример:*

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

* control.discharge

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R / W |

   *Number Value, позволяющее установить максимальный заряд батареи в ваттах.*

*Примечание. Если установлено неверное значение, оно все равно будет подтверждено. Подтверждение (Подтверждение) значения означает только то, что команда была передана в батарею.*

   *Пример:*

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

## Changelog

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

Copyright (c) 2018-2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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