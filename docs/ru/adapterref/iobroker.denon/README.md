---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.denon/README.md
title: ioBroker.denon
hash: JYREJt7gT3z33R1WkTzC1mRy5Fp2M+2eeCHRIxmYS5E=
---
![Логотип](../../../en/adapterref/iobroker.denon/admin/denon.png)

![Количество установок](http://iobroker.live/badges/denon-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.denon.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.denon.svg)
![NPM](https://nodei.co/npm/iobroker.denon.png?downloads=true)

# IoBroker.denon
===========================

![Статус сборки](https://github.com/foxriver76/ioBroker.denon/workflows/Test%20and%20Release/badge.svg)

## Установка
Вы можете установить адаптер через веб-интерфейс ioBroker или на локальный компьютер через npm.

### На основе браузера
1. Откройте веб-интерфейс ioBroker в браузере (например: 192.168.30.70:8081)
2. Щелкните вкладку «Адаптеры».
3. Введите "Denon" в фильтр.
4. Щелкните три точки, а затем символ «+» адаптера DENON AVR.

![Добавить адаптер](../../../en/adapterref/iobroker.denon/docs/en/media/plusAddAdapter.png)

### Локальный компьютер
Перейдите в папку iobroker и выполните следующую команду:

```bash
npm i iobroker.denon
```

## Настроить
В дополнение к установке адаптера вы должны убедиться, что ваш AVR правильно настроен.

### IoBroker
1. Откройте интерфейс ioBroker в браузере (например: 192.168.1.33:8081)
2. Перейдите на вкладку «Адаптеры».
3. Щелкните три точки, а затем символ «+» адаптера DENON AVR.

![Добавить адаптер](../../../en/adapterref/iobroker.denon/docs/en/media/plusAddAdapter.png)

4. Теперь вы можете увидеть страницу конфигурации адаптера -> введите ip-адрес вашего DENON AVR или нажмите на поиск

значок, чтобы найти AVR в вашей сети (через UPnP) ![Конфигурация адаптера](../../../en/adapterref/iobroker.denon/docs/en/media/fillInIp.png)

5. Если вы также хотите настроить интервал запроса / опроса, не забудьте щелкнуть вкладку «Дополнительные настройки».

Уменьшая интервал опроса, адаптер сократит время между обновлением содержимого дисплея.
При уменьшении интервала запроса время между отправкой команд будет уменьшено.
Настройки по умолчанию должны подходить большинству пользователей.
![Расширенные настройки](../../../en/adapterref/iobroker.denon/docs/en/media/advancedSettings.png)

6. Нажмите "Сохранить и закрыть".

### Настройка сети AV-ресивера
1. Нажмите кнопку SETUP, затем на FL-дисплее (и в графическом интерфейсе пользователя) появится меню.
2. Выберите «Сеть» -> «Настройки».
3. Установите параметры, описанные ниже.

   *DHCP: «ВКЛ.» (Используйте этот параметр, если DHCP-сервер находится в локальной сети.)*

   *IP-адрес: если для <DHCP> установлено значение «Выкл.», Установите IP-адрес.*

   *Маска подсети: если для <DHCP> установлено значение «Выкл.», Установите маску подсети.*

   *Шлюз: установите адрес шлюза, когда шлюз находится в локальной сети.*

   *Первичный DNS: не устанавливайте этот параметр.*

   *Второй DNS: не устанавливайте этот параметр.*

   *Прокси: установите для этого параметра «Выкл.».*

4. Нажмите кнопку SETUP, затем на FL-дисплее (и в графическом интерфейсе пользователя) появится меню.
5. Выберите «Сеть» -> Управление сетью / IP-контроль ».
6. Установите для этого параметра значение «Всегда включен».

## Применение
Обратите внимание, что AVR могут управлять только одним соединением Telnet. Если у вас есть активное соединение Telnet e. г. с адаптером javascript AVR откажется от подключения этого адаптера.
Здесь вы можете найти описание состояний и способы их использования.

### Кнопки
Адаптер создает следующие кнопки:

#### Канал: zoneMain / zone2 / zone3
* zoneMain.playPause

   *Воспроизведение и приостановка музыки из источников Bluetooth, Online, USB / iPod.*

* zoneMain.play

   *Воспроизведение музыки с источников Bluetooth, онлайн, USB / iPod.*

* zoneMain.pause

   *Приостановите воспроизведение музыки из источников Bluetooth, Online, USB / iPod.*

* zoneMain.skipMinus

   *Перейти к предыдущему заголовку.*

   *НЕ ПОЛНОСТЬЮ ПОДДЕРЖИВАЕТСЯ ДЛЯ HEOS AVR*

* zoneMain.skipPlus

   *Перейти к следующему заголовку.*

   *НЕ ПОЛНОСТЬЮ ПОДДЕРЖИВАЕТСЯ ДЛЯ HEOS AVR*

* zoneMain.volumeDown / zone2.volumeDown / zone3.volumeDown

   *Уменьшите громкость в основной зоне / зоне 2 / зоне 3.*

* zoneMain.volumeUp / zone2.volumeUp / zone3.volumeUp

   *Увеличьте громкость Main Zone / Zone2 / Zone3.*

* zoneMain.equalizerBassUp / zone2.equalizerBassUp / zone3.equalizerBassUp

   *Кнопка увеличения уровня низких частот Зоны.*

   *Настройки низких и высоких частот можно регулировать, если для параметра Dyn EQ установлено значение OFF, а для параметра Tone Control включено*

* zoneMain.equalizerBassDown / zone2.equalizerBassDown / zone3.equalizerBassDown

   *Кнопка уменьшения уровня низких частот Зоны.*

   *Настройки низких и высоких частот можно регулировать, если для параметра Dyn EQ установлено значение OFF, а для параметра Tone Control включено*

* zoneMain.equalizerTrebleUp / zone2.equalizerTrebleUp / zone3.equalizerTrebleUp

   *Кнопка увеличения высоких частот Зоны.*

   *Настройки низких и высоких частот можно регулировать, если для параметра Dyn EQ установлено значение OFF, а для параметра Tone Control включено*

* zoneMain.equalizerTrebleDown / zone2.equalizerTrebleDown / zone3.equalizerTrebleDown

   *Кнопка уменьшения высоких частот Зоны.*

   *Настройки низких и высоких частот можно регулировать, если для параметра Dyn EQ установлено значение OFF, а для параметра Tone Control включено*

#### Канал: настройки
* settings.subwooferLevelDown / settings.subwooferTwoLevelDown

   *Уменьшите уровень сабвуфера, нажав кнопку.*

* settings.subwooferLevelUp / settings.subwooferTwoLevelUp

   *Увеличьте уровень сабвуфера, нажав кнопку.*

* settings.containmentAmountDown

   *Уменьшите количество Audyssey LFC. Кнопка будет создана только в том случае, если она поддерживается вашим AVR.*

* settings.containmentAmountUp

   *Увеличьте количество Audyssey LFC. Кнопка будет создана только в том случае, если она поддерживается вашим AVR.*

* settings.cursorUp / settings.cursorDown / settings.cursorLeft / settings.cursorRight

   *Имитирует кнопки курсора вашего пульта дистанционного управления*

* settings.enter

   *Имитирует кнопку ввода вашего пульта дистанционного управления*

* settings.return

   *Имитирует кнопку возврата / возврата вашего пульта дистанционного управления*

* settings.option

   *Имитирует кнопку выбора вашего пульта дистанционного управления*

* settings.info

   *Имитирует информационную кнопку вашего пульта дистанционного управления*

### Состояния
Адаптер создаст следующие состояния:

#### Канал: информация
* info.connection

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Логический индикатор только для чтения. Если ваш брокер подключен к вашему DENON AVR, состояние истинно, иначе - ложно.*

* info.friendlyName

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R |

   *Только чтение строки. Содержит понятное имя подключенного AVR.*

* info.onlinePresets

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R |

*Строка в формате массива JSON, которая представляет текущее сохраненное избранное по его идентификатору и каналу.
Названия каждого канала ограничены 20 цифрами. Вы можете сохранить текущий канал с идентификатором, установив settings.savePreset и загрузить один, установив settings.loadPreset на соответствующий идентификатор.*

#### Канал: zoneMain / zone2 / zone3
* zoneMain.volume / zone2.volume / zone3.volume

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

*Числовое значение, которое представляет текущую громкость основной зоны / зоны 2 / зоны 3 вашего AVR. Вы также можете установить громкость здесь.
Громкость также отображается в дБ в отдельных состояниях, т.е. г. mainVolumeDB*

   *Диапазон от 0 до 98 (может быть меньше из-за максимальной громкости), где 80 = 0 дБ*

   *Пример:*

```javascript
setState('denon.0.zoneMain.volume', 45.5); // Sets volume of Main Zone to 45.5
```

* zoneMain.maximumVolume

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Число только для чтения, которое представляет максимально возможную громкость, где 80 = 0 дБ. Громкость также устанавливается в дБ в состоянии maximumVolumeDB.*

* zoneMain.muteIndicator / zone2.muteIndicator / zone3.muteIndicator

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

   *Логическое значение, которое истинно, если основная зона / Zone2 / Zone3 отключена, в противном случае - false. В этом состоянии вы можете отключить звук AVR.*

   *Пример:*

```javascript
setState('denon.0.zoneMain.muteIndicator', true); // Mutes the Main Zone of your AVR
```

* zoneMain.powerZone / zone2.powerZone / zone3.powerZone

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

   *Логическое значение, которое истинно, если Зона включена, иначе ложно. В этом состоянии вы можете включать и выключать свой AVR / Zone.*

* zoneMain.selectInput / zone2.selectInput / zone3.selectInput

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *Строковое значение содержит текущий источник ввода. Вы также можете установить источник входного сигнала со следующей кодировкой:*

   *0: PHONO*

   *1: CD*

   *2: ТЮНЕР*

   *3: DVD*

   *4: BD*

   *5: ТВ*

   *6: SAT / CBL*

   *7: MPLAY*

   *8: ИГРА*

   *9: НЕТТО*

   *10: ОБНАРУЖИТЬ*

   *11: LASTFM*

   *12: ИРАДИО*

   *13: СЕРВЕР*

   *14: ИЗБРАННОЕ*

   *15: AUX1*

   *16: AUX2*

   *17: AUX3*

   *18: AUX4*

   *19: AUX5*

   *20: AUX6*

   *21: AUX7*

   *22: BT*

   *23: USB*

*Обратите внимание, что не все источники входного сигнала доступны на каждой модели AVR. Если ваш AVR имеет дополнительные входы, они будут добавлены в список, как только они будут обнаружены.*

   *Пример:*

```javascript
 setState('denon.0.zoneMain.selectInput', '5'); // Selects TV as input for Main Zone
```

* zoneMain.quickSelect / zone2.quickSelect / zone3.quickSelect

   | Тип данных | Разрешение |
   |:---:|:---:|
   | номер | R / W |

   *Имитирует кнопки быстрого выбора на вашем пульте дистанционного управления с номерами от 1 до 5 для Main Zone / Zone2 / Zone3.*

* zoneMain.sleepTimer / zone2.sleepTimer / zone3.sleepTimer

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

   *Числовое значение для чтения и установки таймера сна для выбранной зоны. Значение будет обновлено менее чем через 10 секунд.*

* zoneMain.iconURL

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R |

   *Содержит ссылку, по которой вы можете найти обложку канала / песни, которая воспроизводится в данный момент.*

   *НЕ ПОДДЕРЖИВАЕТСЯ ДЛЯ HEOS AVR*

* zoneMain.equalizerBass / zone2.equalizerBass / zone3.equalizerBass

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

   *Числовое значение, представляющее уровень низких частот Зоны. Диапазон значений от -6 до +6 дБ.*

   *Настройки низких и высоких частот можно регулировать, если для параметра Dyn EQ установлено значение OFF, а для параметра Tone Control включено*

* zoneMain.equalizerTreble / zone2.equalizerTreble / zone3.equalizerTreble

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

   *Числовое значение, представляющее уровень высоких частот Зоны. Диапазон значений от -6 до +6 дБ.*

   *Настройки низких и высоких частот можно регулировать, если для параметра Dyn EQ установлено значение OFF, а для параметра Tone Control включено*

* zoneMain.channelVolumeFrontLeft / zone2.channelVolumeFrontLeft / zone3.channelVolumeFrontLeft / ...

   | Тип данных | Разрешение |
   |:---:|:---:|
   | номер | R / W |

*Числовое значение, представляющее текущую громкость канала для каждого динамика. У каждого динамика есть отдельное состояние. Настройки влияют на текущий режим выбора входа. Состояние можно регулировать от -12 дБ до +12 дБ.*

#### Канал: дисплей
* display.displayContent

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R |

   *Строка только для чтения, которая содержит содержимое вашего дисплея AVR. Он имеет девять состояний от 0 до 9.*

   *ДИСПЛЕЙ НЕ ПОДДЕРЖИВАЕТСЯ ДЛЯ HEOS AVR*

* display.brightness

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *Строковое значение, представляющее яркость дисплея. Значение также может установить яркость дисплея, используя следующую кодировку:*

   *0: Off -> выключает дисплей*

   *1: Темный -> дисплей темнеет*

   *2: Затемненный -> затемняет дисплей*

   *3: Яркий -> делает дисплей ярким*

   *Пример:*

```javascript
setState('denon.0.display.brightness', '3'); // Sets display brightness to "Bright"
```

#### Канал: настройки
* settings.powerSystem

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

   *Логическое значение, которое истинно, если AVR включен, иначе ложно. Вы также можете включать и выключать AVR в этом состоянии.*

* settings.surroundMode

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *Строковое значение содержит текущий режим объемного звука. Вы также можете изменить источник с помощью следующей кодировки:*

   *0: СТЕРЕО*

   *1: ВИРТУАЛЬНЫЙ*

   *2: ВИДЕО ИГРА*

   *3: MCH STEREO*

   *4: DTS ОБЪЕМНОЕ*

   *5: DOLBY DIGITAL*

   *6: ФИЛЬМ*

   *7: МУЗЫКА*

   *8: ПРЯМОЙ*

   *9: ЧИСТЫЙ ПРЯМОЙ*

   *10: АВТО*

   *11: ИГРА*

   *12: AURO3D*

   *13: AURO2DSURR*

   *14: ШИРОКИЙ ЭКРАН*

   *15: СУПЕР СТАДИОН*

   *16: РОК-АРЕНА*

   *17: ДЖАЗ-КЛУБ*

   *18: КЛАССИЧЕСКИЙ КОНЦЕРТ*

   *19: МОНО ФИЛЬМ*

   *20: МАТРИЦА*

   *Обратите внимание, что не все режимы объемного звучания доступны на каждой модели AVR.*

   *Пример:*

```javascript
setState('denon.0.settings.surroundMode', '3'); // Sets Multi Channel Stereo as surround mode
```

* settings.lfeAmount

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

*Количество дополнительного сигнала сабвуфера, направленного на динамики в дБ.
Диапазон от 0 дБ до -10 дБ. Где 10 = -10 дБ.*

* settings.expertCommand

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *В этом состоянии вы можете отправлять свои собственные команды. Вы можете найти обзор существующих команд в [AVR-Control-Protocol.pdf](docs/AVR-Control-Protocol.pdf)*

   *Пример:*

```javascript
setState('denon.0.settings.expertCommand', 'ECOON'); // Turns Main Zone ECO mode on
```

* settings.expertReadingPattern

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

*Если вы хотите получить конкретные ответы, хранящиеся в `settings.expertReadingResult`, вы должны установить RegEx в это состояние.
RegEx должен быть установлен, чтобы его мог использовать конструктор RegEx. Рекомендуется использовать [Тестер RegEx](https://regexr.com/).
Не устанавливайте `/` в начале или конце RegEx.*

    *Пример:*

```javascript
setState('denon.0.settings.expertReadingPattern', '(MV.+)|(SSINFAISFSV.+)');

ttings.expertReadingResult

|Data type|Permission|
|:---:|:---:|
|string|R|

*Incoming data, which matches the RegEx of `settings.expertReadingPattern` will be set to this state.*

ttings.outputMonitor

|Data type|Permission|
|:---:|:---:|
|string|R/W|

Select the output monitor of your AVR. This state will only be created if your AVR supports two HDMI outputs. You can switch the state between:*

0: AUTO --> Auto detection of monitor*

1: 1 --> Outputs signal to monitor 1*

2: 2 --> Outputs signal to monitor 2*

Example:*

``javascript
etState('denon.0.settings.outputMonitor', '2'); // Sets monitor 2 as active monitor
``

* settings.videoProcessingMode

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *Выберите режим обработки видео вашего AVR. Это состояние будет создано, только если ваш AVR поддерживает его. Вы можете переключать состояние между:*

   *0: АВТО*

   *1: ИГРА*

   *2: ФИЛЬМ*

   *Пример:*

```javascript
setState('denon.0.settings.videoProcessingMode', '2'); // Sets Video Processing Mode to "MOVIE"
```

* settings.centerSpread

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

   *Логическое значение, которое истинно, если центральное распространение усечено, иначе ложно. Вы также можете включить / выключить центральный разворот в этом состоянии.*

* settings.dynamicEq

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

   *Логическое значение, которое представляет состояние Dynamic EQ. В этом состоянии также можно включать и выключать динамический эквалайзер.*

* settings.subwooferLevelState

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

   *Логическое значение, если оно истинно, вы можете вносить изменения на уровне сабвуфера.*

* settings.subwooferLevel / settings.subwooferTwoLevel

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

*Числовое значение, указывающее текущий уровень сабвуфера. Значение находится в диапазоне от -12 до 12 (от -12 дБ до +12 дБ).
Состояние SubwooferTwoLevel будет создано только в том случае, если оно поддерживается вашим AVR.*

* settings.audysseyLfc

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

*Логическое значение, которое содержит и может контролировать состояние низкочастотного сдерживания Audyssey (вкл. / Выкл.).
Состояние будет создано только в том случае, если оно поддерживается вашим AVR.*

* settings.containmentAmount

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

*Числовое значение для установки уровня сдерживания низкой частоты. Значение может быть от 1 до 7. Состояние будет создано только в том случае, если оно поддерживается вашим AVR.*

* settings.multEq

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *Строковое значение, чтобы установить функцию MultEQ вашего AVR со следующей кодировкой:*

   *0: ВЫКЛ*

   *1: ОДИССИ*

   *2: BYP.LR*

   *3: ПЛОСКИЙ*

   *4: РУЧНОЙ*

* settings.dynamicVolume

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *Строковое значение для выбора динамического объема в следующей кодировке:*

   *0: ВЫКЛ -> отключает динамическую громкость*

   *1: LIT -> загорается динамический объем*

   *2: MED -> переключает динамическую громкость на средний*

   *3: HEV -> превращает динамический объем в тяжелый*

* settings.referenceLevelOffset

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *Строковое значение для выбора опорного уровня смещения следующей кодировкой:*

   *0: 0 дБ*

   *5: 5 дБ*

   *10: 10 дБ*

   *15: 15 дБ*

   *Пример:*

```javascript
setState('denon.0.settings.referenceLevelOffset', '5'); // Sets Reference Level Offset to 5 dB
```

* settings.pictureMode

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

   *Строковое значение для установки прямого изменения режима изображения. Это состояние будет создано только в том случае, если ваш AVR поддерживает его*

   *Вы можете установить следующие значения в виде строки:*

   *'Выкл.'*

   *'Стандартный'*

   *'Фильм'*

   *'Яркий'*

   *'Поток'*

   *'Пользовательский'*

   *«День ISF»*

   *'ISF Night'*

   *Пример:*

```javascript
setState('denon.0.settings.pictureMode', 'Standard'); // Set Picture Mode Direct Change to Standard
```

* settings.toneControl

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

   *Логическое значение, которое указывает состояние управления тоном. Вы можете выключить / включить его в этом состоянии.*

   *Управление тоном можно включить, только если для параметра Dyn EQ установлено значение OFF*

* settings.setupMenu

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

   *Логический индикатор, который указывает, открыто или закрыто меню настройки. Вы можете открывать и закрывать его в этом состоянии.*

* settings.savePreset

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

*Числовое значение, которое может быть установлено равным значению info.onlinePresets. Затем текущий канал будет сохранен в качестве предустановки под заданным номером.
Могут использоваться только числа, содержащиеся в info.onlinePresets. Состояние не получит подтверждения, независимо от того, была команда успешна или нет. Вы можете проверить info.onlinePresets, чтобы проверить, правильно ли работает команда.*

* settings.loadPreset

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

*Числовое значение, которое может быть установлено равным значению info.onlinePresets. Это загрузит связанный канал.
Это состояние не получит подтверждения, независимо от того, была команда успешна или нет.*

### Другие состояния
Из-за того, что некоторые AVR, такие как DENON POA-3012CI, используют другую логику, есть некоторые различия в состояниях.
Состояниями, которые равны перечисленным выше, являются: settings.powerSystem, settings.expertCommand, display.brightness и info.connection. Для каждой зоны 2-12 (четная) дополнительно создаются следующие состояния:

* zoneX.speakerOneVolume / zoneX.speakerTwoVolume

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R / W |

*Числовое значение, которое представляет громкость динамика AVR. Если для параметра operationMode установлено значение «BRIDGED», динамики не могут управляться независимо, а управление одним из них также регулирует громкость других.*

* zoneX.selectInputOne / zoneX.selectInputTwo

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

*Пара ключевых значений, которая представляет выбранный вход динамика AVR. Если для параметра operationMode установлено значение «BRIDGED», динамики не могут управляться независимо, и управление одним из них также управляет входом других.*

    *Возможны следующие значения:*

    *'0': 'ШИНА L'*

    *'1': 'АВТОБУС R'*

    *'2': 'АВТОБУС M'*

    *'3': 'AUX'*

* zoneX.operationMode

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

*Пара «ключ-значение», представляющая режим работы AVR. Если для параметра operationMode установлено значение «BRIDGED», динамики не могут управлять независимо друг от друга, а управление первым динамиком также управляет вторым динамиком.*

    *Возможны следующие значения:*

    *'0': 'НОРМАЛЬНЫЙ'*

    *'1': 'МОСТ'*

* zoneX.lowCutFilterSpeakerOne / zoneX.lowCutFilterSpeakerTwo

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

*Логическое значение, которое указывает, включен или отключен фильтр низких частот для динамика. В мостовом режиме оба динамика будут зависеть друг от друга.*

* zoneX.zoneTurnOnModeChange

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R / W |

*Пара ключ-значение, представляющая изменение режима включения зоны. Вы также можете управлять своим AVR в этом состоянии.*

    *Возможны следующие значения:*

    *'0': 'Константа'*

    *'1': 'Триггер в'*

    *'2': 'Аудиосигнал'*

    *'3': 'Выкл.'*

* zoneX.triggerInput

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

    *Включите или выключите вход триггера с помощью этого логического значения.*

* zoneX.audioSignalInput

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R / W |

    *Логическое значение, которое указывает и контролирует вход аудиосигнала вашего AVR.*

## Отсутствующие функции и ошибки
Если у вас отсутствуют какие-либо функции или обнаружена ошибка, откройте [выпуск](https://github.com/foxriver76/ioBroker.denon/issues).

Адаптер протестирован с DENON AVR-X1200W и Marantz SR5009.

## Changelog
### 1.10.0 (2021-01-17)
* (foxriver76) auto-detect selectInput of all zones

### 1.9.4 (2021-01-03)
* (foxriver76) added missing rear height speaker states
* (foxriver76) revert the last added options because they are not working as intended
* (foxriver76) no longer remove digits and spaces from surroundMode response

### 1.9.2 (2021-01-03)
* (foxriver76) added some missing options for surroundMode

### 1.9.1 (2020-12-03)
* (foxriver76) prevent writing in destroyed socket on adapter unload
* (foxriver76) add subwoofer states for main zone
* (foxriver76) internal optimizations

### 1.8.1 (2020-11-29)
* (foxriver76) added states for atmos speakers `channelVolumeSurroundDolbyRight/Left` and `channelVolumeFrontDolbyLeft/Right`
* (foxriver76) fixed bug with setting channelVolume of other zones than main
* (foxriver76) added states `channelVolumeFrontHeightRight/Left` and `channelVolumeSurroundHeightLeft/Right`

### 1.7.7 (2020-04-28)
* (foxriver76) fixed timing issue which could lead to state creation procedure triggered more than once

### 1.7.5 (2020-04-21)
* (foxriver76) better error handling

### 1.7.4 (2020-04-01)
* (foxriver76) fix potential timeout issues

### 1.7.2 (2020-01-08)
* (foxriver76) another fix for DENON Picool to keep connection alive when turned off

### 1.7.1 (2019-11-19)
* (foxriver76) added ability to read desired data by expertReading states

### 1.6.1 (2019-10-08)
* (foxriver76) fixed bug with selectInput for zone2 and 3

### 1.6.0
* (foxriver76) added new state settings.lfeAmount

### 1.5.1
* (foxriver76) fix to detect DENON Ceol

### 1.5.0
* (foxriver76) added channel volumes for zone2 + 3
* (foxriver76) other optimizations
* (foxriver76) support of DENON POA-3012CI and similar AVRs
* (foxriver76) create db volumes everytime

### 1.3.2
* (foxriver76) compact mode compatibility added

### 1.2.7
* (foxriver76) make sure states are never set before creation
* (foxriver76) minor fixes and improvements

### 1.2.6
* (foxriver76) only updating sleep timer and quick select on change
* (foxriver76) using promises wherever possible
* (foxriver76) minor improvements

### 1.2.4
* (foxriver76) fix verbose logging on network issues
* (foxriver76) as long as connection error stays the same, logging happens on debug

### 1.2.3
* (foxriver76) add missing usb to selectInput for all zones

### 1.2.2
* (foxriver76) use adapter core

### 1.2.1
* (foxriver76) info.onlinePresets converted to JSON array to work properly with widgets

### 1.2.0
* (foxriver76) added info.onlinePresets which is a JSON string containing all presets
* (foxriver76) settings.savePreset and loadPreset to save and load presets according to the info.onlinePresets

### 1.1.0
* (foxriver76) added Bluetooth as select input (BT)

### 1.0.0
* (foxriver76) formal version increment

### 0.6.0
* (foxriver76) fix that enables Marantz receiver to use the quickSelect functionality
* (foxriver76) quick select is now acknoledged
* (foxriver76) remove old quick select buttons

### 0.5.0
* (foxriver76) added possibility to control channelVolume per speaker for Main Zone
* (foxriver76) new states added to readme and documentation

### 0.4.4
* (foxriver76) fix bug where picture mode command was sent as undefined

### 0.4.3
* (foxriver76) fallback for advanced settings
* (foxriver76) fix double reconnection when AVR closes the socket
* (foxriver76) fix a problem where callback for pictureMode is called to early

### 0.4.2
* (foxriver76) pictureMode role fixed

### 0.4.1
* (foxriver76) added picture mode direct change

### 0.3.9
* (foxriver76) only create containment amount, audyssey lfc, subwoofer two level if supproted
* (foxriver76) readme updated

### 0.3.8
* (foxriver76) add state to control center spread
* (foxriver76) readme updated
* (foxriver76) addded video processing mode control
* (foxriver76) optimizations and minor fixes

### 0.3.7
* (foxriver76) minor code optimization
* (foxriver76) fixes on readme
* (foxriver76) logging undhandled commands on debug

### 0.3.6
* (foxriver76) fixed displayState non-readable chars for old AVRs
* (foxriver76) fixes on readme
* (foxriver76) capital chars in mainZone volumeUp/down names, are now lowercase

### 0.3.5
* (foxriver76) removed isPlaying state, because not working properly
* (foxriver76) update readme

### 0.3.4
* (foxriver76) fix that HEOS does not create http and display content related states

### 0.3.3
* (foxriver76) added state for setup button
* (foxriver76) added cursors and remote control buttons
* (foxriver76) readme update

### 0.3.2
* (foxriver76) Added isPlaying state for non-HEOS AVR's, thanks to bluefox
* (foxriver76) Added link to cover for non-HEOS AVR's
* (foxriver76) displayContent, isPlaying, coverURL will only be generated for non-HEOS
* (foxriver76) Updated readme

### 0.3.1
* (foxriver76) Added placeholder ip in config gui
* (foxriver76) fixed volume in db for main zone

### 0.3.0
* (bluefox & foxriver76) Names and roles were refactored
* (bluefox) Discovery added
* (foxriver76) Update Readme
* (foxriver76) Implemented separate Play & Pause button
* (bluefox & foxriver76) Internal improvements

### 0.2.4
* (foxriver76) prevent adapter from doing more than one reconnect attempt at the same time
* (foxriver76) improved stability
* (foxriver76) update readme

### 0.2.3
* (foxriver76) added possibility to handle states in dB additional
* (foxriver76) minor changes

### 0.2.2
* (foxriver76) removed unneeded files
* (foxriver76) state lists are now of type string due to better compatibility
* (foxriver76) optimized matching for state lists
* (foxriver76) some state lists can be set by the value additionaly to the key

### 0.2.1
* (foxriver76) small bug fixes on connection error handling
* (foxriver76) improvements on module size

### 0.2.0
* (foxriver76) preparations for offical repository

### 0.1.9
* (foxriver76) improved stability
* (foxriver76) improved fault tolerance on volume (e. g. for use as smart device)

### 0.1.8
* (foxriver76) adapter sepcific connection error handling
* (foxriver76) minor reconnect fix

### 0.1.7
* (foxriver76) subwoofer level is now in dB
* (foxriver76) added control of treble, bass and tone control state
* (foxriver76) readme updated

### 0.1.6
* (foxriver76) connection stability improvements
* (foxriver76) some parameter settings added
* (foxriver76) readme updated

### 0.1.5
* (foxriver76) sleep timer for every zone
* (foxriver76) admin2 compatibility
* (foxriver76) minor fixes

### 0.1.4
* (foxriver76) HEOS bug fix (timeout)
* (foxriver76) new state for custom commands (expertCommand)
* (foxriver76) enhanced readme

### 0.1.3
* (foxriver76) bug fixes for Zone3
* (foxriver76) new state for main zone power
* (foxriver76) minor other improvements

### 0.1.2
* (foxriver76) Performance optimization
* (foxriver76) Faster display update
* (foxriver76) More appropriate reconnect intervall

### 0.1.1
* (foxriver76) new readme for npm

### 0.1.0
* (foxriver76) handling up to three zones
* (foxriver76) handling display content
* (foxriver76) setting display brightness

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