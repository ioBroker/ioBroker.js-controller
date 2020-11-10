---
BADGE-Number of Installations: http://iobroker.live/badges/xbox-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xbox.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xbox.svg
BADGE-NPM: https://nodei.co/npm/iobroker.xbox.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xbox/README.md
title: Адаптер Xbox
hash: gJUPhFPBZB+5r5FRM0+F0rvSIBZIOpQQ2Jsy0KuoTkE=
---
![логотип](../../../de/adapterref/iobroker.xbox/media/xbox.png)

# Адаптер Xbox
Адаптер Xbox позволяет интегрировать игровую консоль Xbox One или Xbox One X в систему ioBroker.

## Обзор
### Игровая консоль Xbox One
Xbox One - это игровая консоль, разработанная Microsoft, которая в настоящее время может воспроизводить популярные видеоигры. Кроме того, Xbox One может управлять различными компонентами системы домашнего кинотеатра и позволяет использовать приложения Microsoft.<br/> Следующими версиями Xbox One в настоящее время являются Xbox One X и Xbox One S, которые предлагают те же функции, что и исходная консоль, но с улучшенной производительностью.

### Адаптер Xbox
Адаптер Xbox можно настроить для каждой консоли Xbox One, что позволяет контролировать и считывать информацию.<br/> Адаптер автоматически создает все команды и статусы в виде объектов. Также можно прочитать большинство статусов, например B. текущий заголовок, статус включения и т. Д. Посредством преднамеренной записи или чтения созданных объектов их статус может быть изменен, а действия инициированы или запрошены.

## Требования перед установкой
1. Перед добавлением адаптера в хост-системе должен быть хотя бы Python 3.5.

быть установлен.

2. Если Xbox должен быть включен через адаптер,

[Режим «Быстрый запуск»](https://support.xbox.com/de-DE/xbox-one/console/learn-about-power-modes) необходимо настроить в консоли.

## Благодарность
Большое спасибо [Команда Open Xbox](https://openxbox.org/) за разработку и предоставление [xbox-rest-сервер](https://github.com/OpenXbox/xbox-smartglass-rest-python) и связанных библиотек.

## Установка
Экземпляр адаптера устанавливается через интерфейс администратора ioBroker. Подробные инструкции по необходимым этапам установки можно найти здесь (TODO: LINK).<br/><br/> После завершения установки экземпляра адаптера автоматически открывается окно конфигурации.

## Конфигурация
![Конфигурация адаптера](../../../de/adapterref/iobroker.xbox/media/adapter-configuration.png "конфигурация")<br/> <span style="color:grey">* Интерфейс администратора *</span>

| Поле | Описание |
|:-------------|:-------------|
| Xbox Live ID | Введите здесь Xbox Live ID, который можно найти в настройках консоли. |
| IP | Здесь необходимо ввести IP-адрес консоли. |
| Аутентификация в Xbox Live | Если этот флажок установлен, вы войдете в Xbox Live со своим адресом электронной почты и паролем. |
| Адрес электронной почты | Здесь необходимо ввести адрес электронной почты учетной записи Xbox Live. |
| Пароль | Здесь необходимо ввести связанный пароль для учетной записи Xbox Live. |

После завершения настройки диалоговое окно конфигурации закрывается с `SPEICHERN UND SCHLIEßEN`.
Это приводит к перезапуску адаптера.

## Экземпляров
При установке адаптера был создан активный экземпляр адаптера Xbox в разделе `Instanzen`.<br/><br/> ![Пример](../../../de/adapterref/iobroker.xbox/media/instance.png "Пример")<br/> <span style="color:grey">* Первый случай *</span>

На сервере ioBroker можно создать несколько экземпляров адаптера Xbox. Также можно подключиться к нескольким серверам ioBroker одновременно. Если несколько устройств должны управляться одним сервером ioBroker, необходимо создать экземпляр для каждого Xbox.<br/><br/> Активирован ли адаптер или подключен к Xbox, отображается цветом поля состояния экземпляра. Если указатель мыши указывает на символ, отображается более подробная информация.

## Объекты адаптера
В разделе `Objekte` вся информация и действия, поддерживаемые Xbox, перечислены в древовидной структуре. Кроме того, предоставляется информация о том, нормально ли работает связь с Xbox.

![Объекты](../../../de/adapterref/iobroker.xbox/media/objects.png "Объекты Xbox")</br> <span style="color:grey">* Объекты адаптера Xbox *</span>

Далее объекты разделены по каналам.
Каждая точка данных перечислена с соответствующим типом данных и полномочиями. Поскольку это кнопка, описание типа и прав не требуется.
Авторизации можно читать (R) и писать (W). Каждая точка данных может быть как минимум прочитана (R), а другие также могут быть записаны. Для поиска определенной точки данных мы рекомендуем использовать комбинацию клавиш «CTRL + F».

### Канал: Информация
* info.connection

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

   *Индикатор только для чтения, действующий, когда ioBroker подключен к Xbox.*

* info.currentTitles

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

*Только читаемая строка JSON, состоящая из пар ключ-значение. Ключ - это имя текущего заголовка, а значение преобразует идентификатор заголовка в шестнадцатеричную систему. Этот идентификатор можно использовать для запуска желаемого заголовка с помощью параметра settings.launchTitle State.*

* info.activeTitleName

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

    *Содержит имя активного заголовка (заголовок на переднем плане) в виде строки.*

* info.activeTitleId

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

    *Содержит идентификатор заголовка, преобразованный в шестнадцатеричную систему на переднем плане в виде строки.*

* info.activeTitleImage

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

*Содержит ссылку на изображение обложки заголовка на переднем плане в виде строки.
Состояние доступно и работает только в том случае, если аутентификация была активирована в настройках адаптера.*

* info.activeTitleType

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

    *Содержит тип заголовка, который находится на переднем плане в виде строки, доступной только для чтения, например Б. «Игра».*

* info.gamertag

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R |

*Строковое значение, которое содержит тег игрока аутентифицированной в данный момент учетной записи.
Состояние доступно и работает только в том случае, если аутентификация была активирована в настройках адаптера.*

* info.authenticated

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R |

*Логическое значение, которое истинно, если аутентификация в Xbox Live прошла успешно, иначе ложно.
Состояние доступно и работает только в том случае, если аутентификация была активирована в настройках адаптера.*

### Канал: Настройки
* settings.power

    | Тип данных | авторизация |
    |:---:|:---:|
    | логическое | R / W |

*Логическое значение, с помощью которого Xbox можно включать и выключать. Значение также служит индикатором того, включен или выключен Xbox.*

* settings.launchTitle

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R / W |

*Установив в качестве строкового значения шестнадцатеричный идентификатор заголовка, заголовок можно запустить на Xbox.
Идентификатор названия активной игры можно узнать из состояния info.currentTitles.
Состояние подтверждается, как только оно было передано на Xbox, что не означает, что команда действительно была выполнена.*

   *Пример:*

```javascript
setState('settings.launchTitle', '2340236c', false); // Starte Red Dead Redemption 2
```

* settings.inputText

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | R / W |

*Описывая состояние строки, текст может быть вставлен в активное поле ввода, например Б. отправить личное сообщение или ввести код.
Состояние подтверждается, как только оно было передано на Xbox, что не означает, что команда действительно была выполнена.*

   *Пример:*

```javascript
setState('settings.inputText', 'H1 M8 h0w d0 u do?', false); // Versendet einen nerdigen Text
```

* settings.gameDvr

    | Тип данных | авторизация |
    |:---:|:---:|
    | строка | W |

* Записываемая строка, которая записывает определенное время игры. Состояние доступно, если в настройках произведена аутентификация.
Аутентифицированная учетная запись также должна быть зарегистрирована на Xbox, и игра должна быть на переднем плане.

    *Пример:*

```javascript
setState('settings.gameDvr', '-60,30', false); // zeichne die letzten 60 Sekunden bis zu den nächsten 30 Sekunden auf (90 Sekunden gesamt)
```

### Канал: Геймпад
* gamepad.a

   *Имитирует кнопку A на контроллере.*

* gamepad.b

   *Имитирует кнопку B на контроллере.*

* gamepad.x

   *Эмулирует кнопку X на контроллере.*

* gamepad.y

   *Имитирует кнопку Y на контроллере.*

* gamepad.clear

   *Имитирует кнопку «Очистить» на контроллере.*

* gamepad.dPadDown

   *Эмулирует кнопку вниз DPAD на контроллере.*

* геймпад.dPadUp

   *Имитирует кнопку DPAD вверх на контроллере.*

* gamepad.dPadRight

   *Имитирует кнопку DPAD справа от контроллера.*

* gamepad.dPadLeft

   *Имитирует кнопку DPAD слева от контроллера.*

* gamepad.enroll

   *Имитирует кнопку контроллера «Enroll».*

* gamepad.leftShoulder

   *Имитирует нажатие левой плечевой кнопки на контроллере.*

* gamepad.rightShoulder

   *Имитирует нажатие кнопки на правом плече на контроллере.*

* gamepad.leftThumbstick

   *Имитирует нажатие на левый стик контроллера.*

* gamepad.rightThumbstick

   *Имитирует нажатие правого стика контроллера.*

* gamepad.menu

   *Эмулирует кнопку меню на контроллере.*

* gamepad.nexus

   *Эмулирует кнопку Nexus (Xbox) на контроллере.*

* gamepad.view

   *Имитирует кнопку «Просмотр» на контроллере.*

### Канал: СМИ
* media.seek

    | Тип данных | авторизация |
    |:---:|:---:|
    | номер | R / W |

*Числовое значение для перехода к определенной точке медиа-контента. Состояние подтверждается, как только оно поступает на сервер, что не означает, что оно действительно было выполнено.*

* media.play

   *Кнопка для воспроизведения медиаконтента.*

* media.pause

   *Кнопка для приостановки мультимедийного контента.*

* media.playPause

   *Комбинированная кнопка воспроизведения / паузы для мультимедийного контента.*

* media.back

   *Кнопка возврата для мультимедийного контента.*

* media.channelDown

   *Кнопка, которая переключает канал медиаконтента вниз.*

* media.channelUp

   *Кнопка, переключающая канал для медиаконтента вверх.*

* media.fastForward

   *Кнопка для быстрой перемотки мультимедийного содержимого.*

* media.menu

   *Кнопка меню для медиа-контента.*

* media.nextTrack

   *Кнопка для перехода к следующей дорожке при воспроизведении мультимедийного содержимого.*

* media.previousTrack

   *Кнопка для перехода к предыдущему заголовку при воспроизведении мультимедийного содержимого.*

* media.record

   *Кнопка записи для медиаконтента.*

* media.rewind

   *Кнопка для перемотки медиаконтента.*

* media.stop

   *Кнопка остановки для медиаконтента.*

* media.view

   *Кнопка просмотра для медиаконтента.*

## Changelog
### 0.7.0 (2020-11-04)
* (foxriver76) replaced deprecated requests module by axios
* (foxriver76) migrated to xbox-smartglass 1.3
* (foxriver76) removed Python3.6 support 
* (foxriver76) event based rest server startage (faster and more robust)
* (foxriver76) GameDVR now supports custom time

### 0.6.9 (2020-11-02)
* (foxriver76) dependency upgrade, fixes installation problems

### 0.6.8 (2020-09-24)
* (foxriver76) minor optimization

### 0.6.5 (2020-05-28)
* (foxriver76) fixed problem with auth-only states

### 0.6.4 (2020-05-11)
* (foxriver76) compatibility with controller v3

### 0.6.3 (2020-04-02)
* (foxriver76) try specific python versions first on install
* (foxriver76) bump dependency, because of auth bug in smartglass

### 0.6.1 (2020-03-17)
* (foxriver76) fixes for compact mode compatibility
* (foxriver76) more translations added
* (foxriver76) minor optimizations

### 0.6.0 (2020-03-01)
* (foxriver76) dependency upgrade (smartglass has been refactored)
* __python 3.6 required!__

### 0.5.12 (2020-01-17)
* (foxriver76) let js-controller know which apt packages are required

### 0.5.11 (2019-11-27)
* (foxriver76) we not try to install apt packages any longer if already installed

### 0.5.8
* (foxriver76) increased stopTimeout to successfully shut down adapter on windows based systems
* (foxriver76) now using setStateChanged instead of own implementation

### 0.5.7
* (foxriver76) fix gamertag not set if no state on the object exists yet

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