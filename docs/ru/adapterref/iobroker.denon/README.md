---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.denon/README.md
title: ioBroker.denon
hash: cRIoJ/jTJ5an0IAOxshQM3FTCC38XhcdeV5G/x/Iksw=
---
![логотип](../../../en/adapterref/iobroker.denon/admin/denon.png)

![Статус сборки Трэвис](https://travis-ci.org/foxriver76/ioBroker.denon.svg?branch=master)
![Статус сборки](https://ci.appveyor.com/api/projects/status/mwkeddgjpgnpef5n/branch/master?svg=true)
![Количество установок](http://iobroker.live/badges/denon-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.denon.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.denon.svg)
![NPM](https://nodei.co/npm/iobroker.denon.png?downloads=true)

# IoBroker.denon ===========================
[![Значок Greenkeeper] (https://badges.greenkeeper.io/foxriver76/ioBroker.denon.svg)](https://greenkeeper.io/)

## Монтаж
Вы можете установить адаптер через веб-интерфейс ioBroker или на свой локальный компьютер через npm.

### На основе браузера
1. Откройте веб-интерфейс ioBroker в браузере (например, 192.168.30.70:8081).
2. Нажмите на вкладку «Адаптеры»
3. Введите «Denon» в фильтре
4. Нажмите на три точки, а затем на символ «+» адаптера DENON AVR.

![Добавить адаптер](../../../en/adapterref/iobroker.denon/docs/en/media/plusAddAdapter.png)

### Локальная машина
Перейдите в папку iobroker и выполните следующую команду:

```bash
npm i iobroker.denon
```

## Настроить
В дополнение к установке адаптера вы должны убедиться, что ваш AVR правильно настроен.

### IoBroker
1. Откройте свой интерфейс ioBroker в браузере (например, 192.168.1.33:8081)
2. Перейдите на вкладку «Адаптеры»
3. Нажмите на три точки, а затем на символ «+» адаптера DENON AVR.

![Добавить адаптер](../../../en/adapterref/iobroker.denon/docs/en/media/plusAddAdapter.png)

4. Теперь вы можете увидеть страницу конфигурации адаптера -> введите IP-адрес вашего DENON AVR или нажмите на поиск

значок, чтобы найти AVR в вашей сети (через UPnP) ![Конфигурация адаптера](../../../en/adapterref/iobroker.denon/docs/en/media/fillInIp.png)

5. Если вы также хотите настроить интервал запроса / опроса, обязательно нажмите на вкладку «Дополнительные параметры».

Уменьшая интервал опроса, адаптер уменьшит время между обновлением содержимого дисплея.
При уменьшении интервала запроса время между отправкой команд будет уменьшено.
Настройки по умолчанию должны хорошо подходить для большинства пользователей.
![Расширенные настройки](../../../en/adapterref/iobroker.denon/docs/en/media/advancedSettings.png)

6. Нажмите Сохранить и закрыть

### Настройка сети AV-ресивера
1. Нажмите кнопку SETUP, затем на FL-дисплее появится меню (и GUI)
2. Выберите «Сеть» -> «Настройки»
3. Установите параметры, описанные ниже

   * DHCP: «ВКЛ.» (Используйте этот параметр, когда DHCP-сервер находится в локальной сети.) *

   * IP-адрес: если для <DHCP> установлено значение «Выкл.», Установите IP-адрес. *

   * Маска подсети: если для <DHCP> установлено значение «Выкл.», Установите маску подсети. *

   * Шлюз: установите адрес шлюза, когда шлюз находится в локальной сети. *

   * Основной DNS: не устанавливайте этот параметр. *

   * Второй DNS: не устанавливайте этот параметр. *

   * Proxy: установите для этого параметра значение «Off». *

4. Нажмите кнопку SETUP, затем на FL-дисплее появится меню (и GUI)
5. Выберите «Сеть» -> «Управление сетью / Управление IP»
6. Установите для этого параметра значение «Всегда включено».

## Использование
Обратите внимание, что AVR могут управлять только одним соединением telnet. Если у вас есть активное соединение Telnet e. г. с помощью адаптера javascript AVR откажется от подключения этого адаптера.
Здесь вы можете найти описание состояний и как их использовать.

### Кнопки
Адаптер создает следующие кнопки:

#### Канал: zoneMain / zone2 / zone3
* zoneMain.playPause

   * Воспроизведение и приостановка музыки из источников Bluetooth, Online, USB / iPod. *

* zoneMain.play

   * Воспроизведение музыки из источников Bluetooth, Online, USB / iPod. *

* zoneMain.pause

   * Приостановка музыки из источников Bluetooth, Online, USB / iPod. *

* zoneMain.skipMinus

   * Перейти к предыдущему названию. *

   * НЕ ПОЛНОСТЬЮ ПОДДЕРЖИВАЕТСЯ ДЛЯ HEOS AVR *

* zoneMain.skipPlus

   * Перейти к следующему названию. *

   * НЕ ПОЛНОСТЬЮ ПОДДЕРЖИВАЕТСЯ ДЛЯ HEOS AVR *

* zoneMain.volumeDown / zone2.volumeDown / zone3.volumeDown

   * Уменьшите громкость основной зоны / зоны2 / зоны3. *

* zoneMain.volumeUp / zone2.volumeUp / zone3.volumeUp

   * Увеличение громкости основной зоны / зоны2 / зоны3. *

* zoneMain.equalizerBassUp / zone2.equalizerBassUp / zone3.equalizerBassUp

   * Кнопка, которая увеличивает уровень низких частот в Зоне. *

   * Настройки низких и высоких частот можно отрегулировать, когда Dyn EQ установлен на OFF, а Tone Control включен *

* zoneMain.equalizerBassDown / zone2.equalizerBassDown / zone3.equalizerBassDown

   * Кнопка, которая уменьшает уровень низких частот в Зоне. *

   * Настройки низких и высоких частот можно отрегулировать, когда Dyn EQ установлен на OFF, а Tone Control включен *

* zoneMain.equalizerTrebleUp / zone2.equalizerTrebleUp / zone3.equalizerTrebleUp

   * Кнопка, которая увеличивает уровень высоких частот в Зоне. *

   * Настройки низких и высоких частот можно отрегулировать, когда Dyn EQ установлен на OFF, а Tone Control включен *

* zoneMain.equalizerTrebleDown / zone2.equalizerTrebleDown / zone3.equalizerTrebleDown

   * Кнопка, которая уменьшает уровень высоких частот в Зоне. *

   * Настройки низких и высоких частот можно отрегулировать, когда Dyn EQ установлен на OFF, а Tone Control включен *

#### Канал: настройки
* settings.subwooferLevelDown / settings.subwooferTwoLevelDown

   * Уменьшите уровень сабвуфера, нажав кнопку. *

* settings.subwooferLevelUp / settings.subwooferTwoLevelUp

   * Увеличьте уровень сабвуфера, нажав кнопку. *

* settings.containmentAmountDown

   * Уменьшить количество Audyssey LFC. Кнопка будет создана, только если она поддерживается вашим AVR. *

* settings.containmentAmountUp

   * Увеличить количество Audyssey LFC. Кнопка будет создана, только если она поддерживается вашим AVR. *

* settings.cursorUp / settings.cursorDown / settings.cursorLeft / settings.cursorRight

   * Имитирует кнопки курсора вашего пульта дистанционного управления *

* settings.enter

   * Имитирует кнопку ввода вашего пульта дистанционного управления *

* settings.return

   * Имитирует кнопку возврата / возврата вашего пульта дистанционного управления *

* settings.option

   * Имитирует кнопку выбора вашего пульта дистанционного управления *

* settings.info

   * Имитирует кнопку информации вашего пульта дистанционного управления *

### Состояния
Следующие состояния будут созданы адаптером:

#### Канал: информация
* info.connection

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R |

   * Только для чтения логический индикатор. Если ваш брокер подключен к вашему DENON AVR, состояние true, иначе false. *

* info.friendlyName

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

   * Только для чтения строки. Содержит понятное имя подключенного AVR. *

* info.onlinePresets

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

* Строка в формате массива JSON, которая представляет текущие сохраненные избранное по его идентификатору и каналу.
Названия каждого канала ограничены 20 цифрами. Вы можете сохранить текущий канал под идентификатором, установив settings.savePreset, и загрузить его, установив settings.loadPreset для соответствующего идентификатора. *

#### Канал: zoneMain / zone2 / zone3
* zoneMain.volume / zone2.volume / zone3.volume

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

* Числовое значение, которое представляет текущую громкость основной зоны / зоны 2 / зоны 3 вашего AVR. Вы также можете установить громкость здесь.
Объем также представлен в дБ в отдельных состояниях, т.е. г. mainVolumeDB *

   * Диапазон составляет от 0 до 98 (может быть ниже из-за максимального объема), где 80 = 0 дБ *

   *Пример:*

```javascript
setState('denon.0.zoneMain.volume', 45.5); // Sets volume of Main Zone to 45.5
```

* zoneMain.maximumVolume

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R |

   * Число только для чтения, которое представляет максимально возможную громкость, где 80 = 0 дБ. Громкость также устанавливается в дБ в состоянии MaximumVolumeDB. *

* zoneMain.muteIndicator / zone2.muteIndicator / zone3.muteIndicator

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

   * Логическое значение, которое имеет значение true, если основная зона / Zone2 / Zone3 отключена, в противном случае - false. Вы можете отключить AVR в этом состоянии. *

   *Пример:*

```javascript
setState('denon.0.zoneMain.muteIndicator', true); // Mutes the Main Zone of your AVR
```

* zoneMain.powerZone / zone2.powerZone / zone3.powerZone

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

   * Логическое значение, которое имеет значение true, если зона включена, в противном случае - значение false. В этом состоянии вы можете включать и выключать AVR / Zone. *

* zoneMain.selectInput / zone2.selectInput / zone3.selectInput

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Строковое значение содержит текущий источник ввода. Вы также можете установить источник входного сигнала в следующей кодировке: *

   * 0: ФОНО *

   * 1: CD *

   * 2: TUNER *

   * 3: DVD *

   * 4: BD *

   * 5: ТВ *

   * 6: SAT / CBL *

   * 7: MPLAY *

   * 8: ИГРА *

   * 9: NET *

   * 10: Spotify *

   * 11: LastFM *

   * 12: IRADIO *

   * 13: SERVER *

   * 14: FAVORITES *

   * 15: AUX1 *

   * 16: AUX2 *

   * 17: AUX3 *

   * 18: AUX4 *

   * 19: AUX5 *

   * 20: AUX6 *

   * 21: AUX7 *

   * 22: BT *

   * Обратите внимание, что не каждый источник входного сигнала доступен на каждой модели AVR. *

   *Пример:*

```javascript
 setState('denon.0.zoneMain.selectInput', '5'); // Selects TV as input for Main Zone
```

* zoneMain.quickSelect / zone2.quickSelect / zone3.quickSelect

   | Тип данных | Разрешение |
   |:---:|:---:|
   | Номер | R / W |

   * Эмулирует кнопки быстрого выбора на пульте дистанционного управления с номерами от 1 до 5 для основной зоны / зоны2 / зоны3. *

* zoneMain.sleepTimer / zone2.sleepTimer / zone3.sleepTimer

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

   * Числовое значение для чтения и установки таймера отключения для выбранной зоны. Значение будет обновлено менее чем за 10 секунд. *

* zoneMain.iconURL

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

   * Содержит ссылку, где вы можете найти обложку канала / песни, которая в данный момент воспроизводится. *

   * НЕ ПОДДЕРЖИВАЕТСЯ ДЛЯ HEOS AVR'S *

* zoneMain.equalizerBass / zone2.equalizerBass / zone3.equalizerBass

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

   * Числовое значение, представляющее уровень низких частот в Зоне. Диапазон значений от -6 до +6 дБ. *

   * Настройки низких и высоких частот можно отрегулировать, когда Dyn EQ установлен на OFF, а Tone Control включен *

* zoneMain.equalizerTreble / zone2.equalizerTreble / zone3.equalizerTreble

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

   * Числовое значение, представляющее уровень высоких частот в Зоне. Диапазон значений от -6 до +6 дБ. *

   * Настройки низких и высоких частот можно отрегулировать, когда Dyn EQ установлен на OFF, а Tone Control включен *

* zoneMain.channelVolumeFrontLeft / zone2.channelVolumeFrontLeft / zone3.channelVolumeFrontLeft / ...

   | Тип данных | Разрешение |
   |:---:|:---:|
   | Номер | R / W |

* Числовое значение, которое представляет текущую громкость канала для каждого динамика. Каждый оратор имеет отдельное состояние. Настройки влияют на текущий режим выбора ввода. Состояние можно регулировать от -12 дБ до +12 дБ. *

#### Канал: дисплей
* display.displayContent

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

   * Строка только для чтения, которая содержит содержимое вашего дисплея AVR. Имеет девять состояний 0 - 9. *

   * СОДЕРЖАНИЕ ДИСПЛЕЯ НЕ ПОДДЕРЖИВАЕТСЯ ДЛЯ HEOS AVR *

* яркость дисплея

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Строковое значение, которое представляет яркость дисплея. Значение также может установить яркость дисплея с помощью следующей кодировки: *

   * 0: выключено -> выключает дисплей *

   * 1: темный -> поворачивает дисплей темным *

   * 2: затемнено -> поворачивает дисплей затемнено *

   * 3: Яркий -> поворачивает дисплей ярким *

   *Пример:*

```javascript
setState('denon.0.display.brightness', '3'); // Sets display brightness to "Bright"
```

#### Канал: настройки
* settings.powerSystem

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

   * Логическое значение, которое равно true, если AVR включен, в противном случае - false. Вы также можете включать и выключать AVR в этом состоянии. *

* settings.surroundMode

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Строковое значение содержит текущий режим объемного звучания. Вы также можете изменить источник с помощью следующей кодировки: *

   * 0: STEREO *

   * 1: ВИРТУАЛЬНЫЙ *

   * 2: ВИДЕО ИГРА *

   * 3: МЧ СТЕРЕО *

   * 4: DTS SURROUND *

   * 5: DOLBY DIGITAL *

   * 6: MOVIE *

   * 7: МУЗЫКА *

   * 8: ПРЯМОЙ *

   * 9: ЧИСТАЯ ПРЯМАЯ *

   * 10: AUTO *

   * 11: ИГРА *

   * 12: AURO3D *

   * 13: AURO2DSURR *

   * 14: ШИРОКИЙ ЭКРАН *

   * 15: СУПЕР СТАДИОН *

   * 16: РОК АРЕНА *

   * 17: JAZZ CLUB *

   * 18: КЛАССИЧЕСКИЙ КОНЦЕРТ *

   * 19: МОНО ФИЛЬМ *

   * 20: MATRIX *

   * Обратите внимание, что не все режимы объемного звучания доступны на каждой модели AVR. *

   *Пример:*

```javascript
setState('denon.0.settings.surroundMode', '3'); // Sets Multi Channel Stereo as surround mode
```

* settings.expertCommand

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Вы можете отправлять свои собственные команды с этим состоянием. Вы можете найти обзор существующих команд в [AVR-Control-Protocol.pdf](docs/AVR-Control-Protocol.pdf) *

   *Пример:*

```javascript
setState('denon.0.settings.expertCommand', 'ECOON'); // Turns Main Zone ECO mode on
```

* settings.outputMonitor

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Выберите выходной монитор вашего AVR. Это состояние будет создано только в том случае, если ваш AVR поддерживает два выхода HDMI. Вы можете переключать состояние между: *

   * 0: АВТО -> Автоопределение монитора *

   * 1: 1 -> Выводит сигнал на монитор 1 *

   * 2: 2 -> Выводит сигнал на монитор 2 *

   *Пример:*

```javascript
setState('denon.0.settings.outputMonitor', '2'); // Sets monitor 2 as active monitor
```

* settings.videoProcessingMode

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Выберите режим обработки видео вашего AVR. Это состояние будет создано только в том случае, если ваш AVR поддерживает его. Вы можете переключать состояние между: *

   * 0: АВТО *

   * 1: ИГРА *

   * 2: ФИЛЬМ *

   *Пример:*

```javascript
setState('denon.0.settings.videoProcessingMode', '2'); // Sets Video Processing Mode to "MOVIE"
```

* settings.centerSpread

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

   * Булево-значение, которое истинно, если центральный спред настроен, иначе ложно. Вы также можете включить / выключить центральный спред с этим состоянием. *

* settings.dynamicEq

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

   * Логическое значение, которое представляет состояние динамического эквалайзера. Вы также можете включить или выключить динамический эквалайзер в этом состоянии. *

* settings.subwooferLevelState

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

   * Логическое значение, если оно истинно, вы можете вносить изменения на уровне сабвуфера. *

* settings.subwooferLevel / settings.subwooferTwoLevel

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

* Числовое значение, которое указывает текущий уровень сабвуфера. Значение имеет диапазон от -12 до 12 (от -12 дБ до +12 дБ).
Состояние SubwooferTwoLevel будет создано только в том случае, если оно поддерживается вашим AVR. *

* settings.audysseyLfc

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

* Булево значение, которое содержит и может контролировать состояние удержания низких частот Audyssey (вкл / выкл).
Состояние будет создано только в том случае, если оно поддерживается вашим AVR. *

* settings.containmentAmount

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

* Числовое значение, чтобы установить низкочастотное ограничение. Значение может быть в диапазоне от 1 до 7. Состояние будет создано только в том случае, если оно поддерживается вашим AVR. *

* settings.multEq

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Строковое значение, чтобы установить функцию MultEQ вашего AVR со следующей кодировкой: *

   * 0: ВЫКЛ *

   * 1: AUDYSSEY *

   * 2: BYP.LR *

   * 3: квартира *

   * 4: РУКОВОДСТВО *

* settings.dynamicVolume

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Строковое значение для выбора динамического тома в следующей кодировке: *

   * 0: ВЫКЛ. -> отключает динамическую громкость *

   * 1: LIT -> переводит динамическую громкость на свет *

   * 2: MED -> превращает динамический объем в средний *

   * 3: HEV -> превращает динамический объем в тяжелый *

* settings.referenceLevelOffset

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Строковое значение для выбора опорного уровня смещения следующей кодировкой: *

   * 0: 0 дБ *

   * 5: 5 дБ *

   * 10: 10 дБ *

   * 15: 15 дБ *

   *Пример:*

```javascript
setState('denon.0.settings.referenceLevelOffset', '5'); // Sets Reference Level Offset to 5 dB
```

* settings.pictureMode

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

   * Строковое значение для установки прямого изменения режима изображения. Это состояние будет создано только тогда, когда ваш AVR поддерживает его *

   * Вы можете установить следующие значения в виде строки: *

   * 'Off' *

   * 'Стандарт' *

   *'Кино'*

   * 'Vivid' *

   *'Поток'*

   * Пользовательский '*

   * День ISF *

   * 'ISF Night' *

   *Пример:*

```javascript
setState('denon.0.settings.pictureMode', 'Standard'); // Set Picture Mode Direct Change to Standard
```

* settings.toneControl

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

   * Логическое значение, которое указывает на статус управления тоном. Вы можете включить / выключить его в этом состоянии. *

   * Tone Control может быть включен только когда Dyn EQ установлен на OFF *

* settings.setupMenu

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

   * Логический индикатор, который показывает, открыто или закрыто меню настроек. Вы можете открыть и закрыть его в этом состоянии. *

* settings.savePreset

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

* Числовое значение, которое может быть установлено в значение info.onlinePresets. Тогда текущий канал будет сохранен в качестве предустановки для данного номера.
Можно использовать только те числа, которые содержатся в info.onlinePresets. Государство не получит подтверждения, независимо от того, была ли команда успешной или нет. Вы можете проверить info.onlinePresets, чтобы проверить, работала ли команда должным образом. *

* settings.loadPreset

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

* Числовое значение, которое может быть установлено в значение info.onlinePresets. Это загрузит соответствующий канал.
Это состояние не будет подтверждено, независимо от того, была ли команда успешной или нет. *

### Другие штаты
Из-за того, что некоторые AVR, такие как DENON POA-3012CI, используют другую логику, существуют некоторые различия в состояниях.
Состояния, которые равны перечисленным выше, являются: settings.powerSystem, settings.expertCommand, display.brightness и info.connection. Дополнительно для каждой зоны 2-12 (четные) создаются следующие состояния:

* zoneX.speakerOneVolume / zoneX.speakerTwoVolume

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R / W |

* Числовое значение, представляющее громкость динамика AVR. Если для параметра OperationMode установлено значение «BRIDGED», динамики не могут управляться независимо, а управление одним из них также регулирует громкость других. *

* zoneX.selectInputOne / zoneX.selectInputTwo

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

* Пара «ключ-значение», представляющая выбранный вход динамика AVR. Если для параметра OperationMode установлено значение «BRIDGED», динамики не могут управляться независимо, а управление одним из них также управляет входом других. *

    * Возможны следующие значения: *

    * '0': 'BUS L' *

    * '1': 'BUS R' *

    * '2': 'BUS M' *

    * '3': 'AUX' *

* zoneX.operationMode

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

* Пара ключ-значение, представляющая режим работы AVR. Если для параметра OperationMode установлено значение «BRIDGED», динамики не могут управляться независимо, и управление динамиком один также управляет двумя динамиками. *

    * Возможны следующие значения: *

    * '0': 'НОРМАЛЬНЫЙ' *

    * «1»: «МОСТ»

* zoneX.lowCutFilterSpeakerOne / zoneX.lowCutFilterSpeakerTwo

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

* Логическое значение, которое указывает, включен ли фильтр низких частот для динамика. В режиме моста оба динамика будут зависеть друг от друга. *

* zoneX.zoneTurnOnModeChange

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

* Пара ключ-значение, представляющая зону включения режима изменения зоны. Вы также можете контролировать свой AVR с этим состоянием. *

    * Возможны следующие значения: *

    * '0': 'Константа' *

    * «1»: «Запуск»

    * '2': 'Аудио сигнал' *

    * '3': 'Выкл' *

* zoneX.triggerInput

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

    * Включите или выключите триггерный вход с помощью этого логического значения. *

* zoneX.audioSignalInput

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R / W |

    * Логическое значение, которое указывает и контролирует вход аудиосигнала вашего AVR. *

## Отсутствующие функции и ошибки
Если вы упустили какие-либо функции или обнаружили ошибку, пожалуйста, откройте [вопрос](https://github.com/foxriver76/ioBroker.denon/issues).

Адаптер протестирован с DENON AVR-X1200W и Marantz SR5009.

## Changelog

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