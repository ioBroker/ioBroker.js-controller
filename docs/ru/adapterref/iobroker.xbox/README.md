---
BADGE-Build Status Travis: https://travis-ci.org/foxriver76/ioBroker.xbox.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/s1we3cpcbxm97upp/branch/master?svg=true
BADGE-Number of Installations: http://iobroker.live/badges/xbox-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xbox.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xbox.svg
BADGE-NPM: https://nodei.co/npm/iobroker.xbox.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xbox/README.md
title: Адаптер Xbox
hash: B+HOIdyHj0b3Mv2rWY8zlsmiUO0i+KPHylmETFM704c=
---
![логотип](../../../de/adapterref/iobroker.xbox/media/xbox.png)

# Адаптер Xbox
Адаптер Xbox позволяет интегрировать игровую консоль Xbox One или Xbox One X в систему ioBroker.

## Обзор
### Игровая консоль Xbox One
Xbox One - это игровая приставка, разработанная Microsoft, которая в настоящее время играет в популярные видеоигры. Кроме того, Xbox One может управлять различными компонентами системы домашнего кинотеатра и позволяет использовать Microsoft Apps. <br/> Другими характеристиками Xbox One в настоящее время являются Xbox One X и Xbox One S, которые предлагают те же функции, что и исходная консоль, но с улучшенной производительностью.

### Адаптер Xbox
Адаптер Xbox можно настроить на одну консоль Xbox One, что позволяет контролировать и считывать информацию. <br/> Адаптер автоматически создает все команды и состояния в виде объектов. Большая часть состояний также может быть считана, например: Например, текущий заголовок, состояние включения и т. Д. При назначении или чтении созданных объектов их статус может быть изменен и, таким образом, действия могут быть инициированы или запрошены.

## Предварительные условия перед установкой
1. Перед добавлением адаптера в хост-системе должен быть хотя бы Python 3.5

быть установленным

2. Если Xbox должен быть включен через адаптер,

[Режим быстрого запуска](https://support.xbox.com/de-DE/xbox-one/console/learn-about-power-modes) настраиваться в консоли.

## Выражение признательности
Большое спасибо [Team Open Xbox](https://openxbox.org/) за разработку и предоставление [Xbox-отдых-сервер](https://github.com/OpenXbox/xbox-smartglass-rest-python) и связанных библиотек.

## Установка
Экземпляр адаптера устанавливается через интерфейс администратора ioBroker. Подробные инструкции по необходимым шагам установки можно найти здесь (TODO: LINK). <br/><br/> После завершения установки экземпляра адаптера окно конфигурации открывается автоматически.

## Конфигурация
![Конфигурация адаптера](../../../de/adapterref/iobroker.xbox/media/adapter-configuration.png "конфигурация") <br/> <span style="color:grey">* Интерфейс администратора *</span>

| Поле | Описание |
|:-------------|:-------------|
| Xbox Live ID | Введите Live ID Xbox, который можно найти в настройках консоли.
| IP | Введите IP-адрес консоли здесь. |
| Аутентификация с Xbox Live | Если флажок установлен, адрес электронной почты и пароль будут входить в Xbox Live.
| Адрес электронной почты | Введите адрес электронной почты учетной записи Xbox Live здесь. |
| Пароль | Введите пароль для учетной записи Xbox Live.

После завершения настройки диалоговое окно конфигурации закрывается с `SPEICHERN UND SCHLIEßEN`.
Это приведет к последующему перезапуску адаптера.

## Экземпляры
В результате установки адаптера был создан активный экземпляр адаптера Xbox в разделе `Instanzen`. <br/><br/> ![пример](../../../de/adapterref/iobroker.xbox/media/instance.png "пример") <br/> <span style="color:grey">* Первый экземпляр *</span>

На сервере ioBroker можно создать несколько экземпляров адаптера Xbox. Кроме того, один может быть подключен к нескольким серверам ioBroker одновременно. Если несколько устройств должны контролироваться сервером ioBroker, экземпляр должен быть создан для каждого Xbox. <br/><br/> Включен ли адаптер или подключен к Xbox, указывается цветом поля «Состояние» экземпляра. Если указатель мыши указывает на символ, отображается дополнительная подробная информация.

## Объекты адаптера
В разделе `Objekte` вся информация и действия, поддерживаемые Xbox, перечислены в древовидной структуре. Кроме того, он также сообщает вам, работает ли связь с Xbox гладко.

![объекты](../../../de/adapterref/iobroker.xbox/media/objects.png "Xbox объекты") </br> <span style="color:grey">* Объекты адаптера Xbox *</span>

Впоследствии объекты подразделяются на каналы.
Каждая точка данных связана со своим типом данных и разрешениями. Если это кнопка, описание типа и прав опущено.
Разрешения можно читать (R), а также писать (W). Каждая точка данных может быть по меньшей мере прочитана (R), тогда как другие также могут быть описаны. Для поиска конкретной точки данных рекомендуется поиск с использованием комбинации клавиш «CTRL + F».

### Канал: Информация
* info.connection

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

   * Индикатор только для чтения, который имеет значение true, если ioBroker подключен к Xbox. *

* info.currentTitles

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R |

* Только для чтения JSON-строка, которая состоит из пар ключ-значение. Ключ - это имя текущего заголовка, а значение идентификатора заголовка преобразуется в шестнадцатеричную систему. Этот идентификатор можно использовать для запуска нужного заголовка с помощью settings.launchTitle State. *

* info.activeTitleName

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R |

    * Содержит имя активного заголовка (заголовок на переднем плане) в виде строки. *

* info.activeTitleId

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R |

    * Содержит идентификатор заголовка, преобразованный в шестнадцатеричное на переднем плане в виде строки. *

* info.activeTitleImage

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R |

* Содержит ссылку на изображение обложки заголовка на переднем плане в виде строки.
Состояние присутствует и работает только в том случае, если активирована аутентификация в настройках адаптера.

* info.activeTitleType

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R |

    * Содержит тип заголовка, который находится на переднем плане, в форме строки только для чтения. Например, «Игра». *

* info.gamertag

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R |

* Строковое значение, содержащее тег игрока в текущей учетной записи.
Состояние присутствует и работает только в том случае, если активирована аутентификация в настройках адаптера.

* info.authenticated

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R |

* Логическое значение, которое равно true, если аутентификация с Xbox Live прошла успешно, в противном случае - false.
Состояние присутствует и работает только в том случае, если активирована аутентификация в настройках адаптера.

### Канал: Настройки
* settings.power

    | Тип данных | авторизация |
    |:---:|:---:|
    | Boolean | R / W |

* Логическое значение, с которым Xbox может быть включен и выключен. Также служит индикатором включения или выключения Xbox. *

* settings.launchTitle

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R / W |

* Установив строковое значение в шестнадцатеричный идентификатор заголовка, заголовок может быть запущен на Xbox.
Идентификатор названия активной игры можно узнать по состоянию info.currentTitles.
Состояние подтверждается, как только оно передается в Xbox, это не означает, что команда была выполнена. *

   * Пример: *

```javascript
setState('settings.launchTitle', '2340236c', false); // Starte Red Dead Redemption 2
```

* settings.inputText

    | Тип данных | авторизация |
    |:---:|:---:|
    | Строка | R / W |

* При описании Строковых Состояний текст может быть вставлен в активное поле ввода, например. Б. отправить личное сообщение или ввести код.
Состояние подтверждается, как только оно передается в Xbox, это не означает, что команда была выполнена. *

   * Пример: *

```javascript
setState('settings.inputText', 'H1 M8 h0w d0 u do?', false); // Versendet einen nerdigen Text
```

* settings.gameDvr

* Кнопка, которая записывает последнюю минуту игры при нажатии. Кнопка доступна, если аутентификация была сделана в настройках.
Кроме того, аутентифицированная учетная запись должна быть зарегистрирована в Xbox, и игра должна быть на переднем плане.

### Канал: Геймпад
* gamepad.a

   * Эмулирует кнопку A контроллера. *

* gamepad.b

   * Эмулирует кнопку B контроллера. *

* gamepad.x

   * Эмулирует кнопку X контроллера. *

* gamepad.y

   * Эмулирует кнопку Y контроллера. *

* gamepad.clear

   * Эмулирует кнопку «Очистить» контроллера. *

* gamepad.dPadDown

   * Эмулирует кнопку DPAD вниз контроллера. *

* gamepad.dPadUp

   * Эмулирует верхнюю кнопку DPAD контроллера. *

* gamepad.dPadRight

   * Эмулирует правую кнопку DPAD контроллера. *

* gamepad.dPadLeft

   * Эмулирует левую кнопку DPAD контроллера. *

* gamepad.enroll

   * Эмулирует кнопку «Enroll» контроллера. *

* gamepad.leftShoulder

   * Эмулирует нажатие кнопки левого плеча контроллера. *

* gamepad.rightShoulder

   * Эмулирует нажатие кнопки правого плеча контроллера. *

* gamepad.leftThumbstick

   * Эмулирует нажатие левой ручки контроллера. *

* gamepad.rightThumbstick

   * Эмулирует нажатие правой ручки контроллера. *

* gamepad.menu

   * Эмулирует кнопку меню контроллера. *

* gamepad.nexus

   * Эмулирует кнопку контроллера Nexus (Xbox). *

* gamepad.view

   * Эмулируйте кнопку «Вид» на контроллере. *

### Канал: СМИ
* media.seek

    | Тип данных | авторизация |
    |:---:|:---:|
    | Количество | R / W |

* Числовое значение для перехода к определенному местоположению медиа-контента. Состояние подтверждается, как только оно поступает на сервер, что не означает, что оно было выполнено. *

* media.play

   * Кнопка для воспроизведения медиа-контента. *

* media.pause

   * Кнопка для приостановки медиа-контента. *

* media.playPause

   * Комбинированная кнопка воспроизведения / паузы для медиа-контента. *

* media.back

   * Кнопка возврата для медиа-контента. *

* media.channelDown

   * Кнопка, которая закрывает канал медиа-контента. *

* media.channelUp

   * Кнопка, которая перемещает канал вверх для медиа-контента. *

* media.fastForward

   * Кнопка для быстрой пересылки медиа-контента. *

* media.menu

   * Кнопка меню для медиа-контента. *

* media.nextTrack

   * Кнопка для перехода к следующей дорожке при воспроизведении мультимедийного содержимого. *

* media.previousTrack

   * Кнопка для перехода к предыдущей дорожке при воспроизведении мультимедийного содержимого. *

* media.record

   * Кнопка записи для медиа-контента. *

* media.rewind

   * Кнопка перемотки медиа-контента. *

* media.stop

   * Стоп кнопка для медиа-контента. *

* media.view

   * Кнопка просмотра для медиа-контента. *

## Changelog

### 0.5.6
* (foxriver76) if still logged in dont log warning/set auth false anymore
* (foxriver76) on logout only set auth to false, but keep gamertag

### 0.5.5
* (foxriver76) minor optimizations

### 0.5.3
* (foxriver76) improve log message quality
* (foxriver76) more promisification
* (foxriver76) minor fix for compact mode

### 0.5.0
* (foxriver76) support of compact mode
* (foxriver76) fixes and optimizations

### 0.4.4
* (foxriver76) small fixes and optimizations

### 0.4.2
* (foxriver76) use adapter-core module

### 0.4.1
* (foxriver76) minor type fix

### 0.4.0
* (foxriver76) Seek converted to number, to jump to specific position
* (foxriver76) try reauthentication when auth gets lost

### 0.3.0
* (foxriver76) new state activeTitleType added
* (foxriver76) minor fixes
* (foxriver76) authentication for 2 factor auth added

### 0.2.2
* (foxriver76) minor fix when currentTitles empty, activeTitle states should be too
* (foxriver76) dont set info.connection on power off, because will be
self detected and prevents reconnection on shutdown

### 0.2.1
* (foxriver76) minor fix on state name

### 0.2.0
* (foxriver76) Authentication for Xbox Live added
* (foxriver76) When logged in current titles contains the correct title full name
* (foxriver76) Added decryption and encryption
* (foxriver76) minor fixes
* (foxriver76) Added new states

### 0.1.7
* (foxriver76) rest-server will now be stopped on windows unload too
* (foxriver76) enhanced windows debug logging

### 0.1.6
* (foxriver76) fix rest-server start on win when nopy not in own node_modules folder

### 0.1.5
* (foxriver76) starting rest-server on windows fixed
* (foxriver76) stopping rest-server on windows fixed

### 0.1.4
* (foxriver76) set info.connection and settings.power to false on unload
* (foxriver76) not only rely on ping to check if xbox is on, use available too

### 0.1.3
* (foxriver76) minor fix
* (foxriver76) bump smartglass-rest requirement to 0.9.7
* (foxriver76) enables pwoer on for not multicastable consoles
* (foxriver76) only use discovery when Xbox disconnected and online

### 0.1.2
* (foxriver76) fix when currentTitles is empty

### 0.1.1
* (foxriver76) minor fixes
* (foxriver76) explicit require versions of python deps
* (foxriver76) fix for power on, when Xbox not in broadcast network

### 0.1.0
* (foxriver76) brought back live id to settings
* (foxriver76) input text state to enter text in an open text field
* (foxriver76) ability to find consoles which are not available via broadcast
* (foxriver76) info state for active titles & launch title state

### 0.0.13
* (foxriver76) minor fix
* (foxriver76) restart adapter on rest server error
* (foxriver76) log when losing connection without ping

### 0.0.12
* (foxriver76) when console unavailable, also do not connect
* (foxriver76) debug logging for unavailable console
* (foxriver76) only set power states on change

### 0.0.11
* (foxriver76) minor connection fix

### 0.0.10
* (foxriver76) when status is connecting, don't connect again

### 0.0.9
* (foxriver76) LiveID is not necessary anymore

### 0.0.8
* (foxriver76) If reconnect attempts fail often in a row, only log it once
* (foxriver76) removed unneeded objects from io-package and adjusted title

### 0.0.6
* (foxriver76) Stop making connect requests when already connected
* (foxriver76) more user friendly logging
* (foxriver76) more robustness in nopys path

### 0.0.5
* (foxriver76) using relative paths for starting server
* (foxriver76) adding commands for windows
* (foxriver76) enhanced installation manual

### 0.0.4
* (foxriver76) automatically install required Debian packages
* (foxriver76) updated Readme
* (foxriver76) make installation for Windows possible
* (foxriver76) improved logging
* (foxriver76) detect OS

### 0.0.3
* (foxriver76) fixed state handling
* (foxriver76) using ping to check consoles power status instead of connection
* (foxriver76) stop powering on if it is unsuccessful for 15 seconds
* (foxriver76) restarting adapter when REST snpm erver is down

### 0.0.2
* (foxriver76) fixed endpoints
* (foxriver76) automated installation of dependencies
* (foxriver76) readme updated
* (foxriver76) code optimized

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