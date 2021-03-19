---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: FWruI73yp9zrKb04C0x3SjjvJj222EL77NS/r/h1XD8=
---
![Логотип](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Количество установок](http://iobroker.live/badges/musiccast-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![Статус сборки](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)

# IoBroker.musiccast
адаптер для устройств Yamaha MusicCast, таких как WX-010/030, YSP-1600

## Установка:
Для установки требуется как минимум nodejs v10

от npm

```javascript
npm install iobroker.musiccast
```

актуальная версия с github (может не каждый раз работать, когда идет разработка)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Настройки
На странице администратора знак «+» можно использовать для добавления вручную IP-адреса, DeviceID, типа и имени.
Нажмите кнопку поиска для открытия. Если у вас несколько устройств, вам нужно нажимать кнопку несколько раз, пока не будут обнаружены все устройства. К сожалению, обнаружение одновременно возвращает только один объект, и это может быть любое из ваших устройств MusicCast. Если возврат такой же, как уже часть стола, вам нужно снова нажать кнопку. Иногда помогает сохранить и снова открыть страницу damin.

В том маловероятном случае, когда 2 или более устройств передают один и тот же идентификатор, немного измените один идентификатор. В противном случае адаптер не сможет различить 2 устройства.

Если вы хотите, чтобы время воспроизведения обновлялось для треков, которые вы слушаете, установите / установите соответствующий флажок. Имейте в виду, что увеличивается количество сообщений (каждую секунду для каждого устройства пинг-понг обновлений).

## Доступные объекты
В настоящее время реализованы следующие объекты:

### Базовый (зона)
| Объект | Значение | настраиваемое | Описание |
|--------|-------|:-:|--------|
| {zone} .power | boolean | x | true / false -> ON / Standby |
| {zone} .zone_b | boolean |? | true / false -> целевая зона - зона B |
| {зона} .mute | boolean | x | true / false -> отключен / не отключен |
| {zone} .volume | value | x | 0 ... max (макс. в зависимости от устройства) |
| {zone} .act_vol_mode | text |? | фактическая громкость в режиме дБ |
| {zone} .act_vol_val | value |? | фактическая громкость в значении дБ |
| {zone} .act_vol_unit | text | - | фактическая единица громкости (должна быть дБ) |
| {zone} .act_vol_mode_list | text | - | фактическая громкость в режимах дБ |
| {zone} .input | text | x | входы в зависимости от устройства |
| {zone} .input_list | text | - | возможные входы |
| {zone} .sound_program | text | x | установить звуковую программу |
| {zone} .sound_program_list | text | - | возможные звуковые программы |
| {zone} .surr_decoder_type | text |? | установить тип объемного звука |
| {zone} .surr_decoder_type_list | text | - | возможный декодер окружающего звука |
| {zone} .link_control | text | x | установить элемент управления ссылкой |
| {zone} .link_control_list | text | - | возможные настройки управления ссылками |
| {zone} .link_audio_delay | text | x | установить задержку звука ссылки |
| {zone} .link_audio_delay_list | text | - | возможные настройки задержки звука ссылки ссылки |
| {zone} .clearVoice | boolean | x | clear Голосовое управление |
| {zone} .low | значение | x | level EQ low |
| {zone} .mid | значение | x | level EQ mid |
| {zone} .high | значение | x | level EQ high |
| {zone} .subwoofer_volume | value | x | level громкость сабвуфера |
| {zone} .bass | значение | x | уровень низких частот |
| {zone} .treble | значение | x | уровень высоких частот |
| {zone} .tone_control_mode_list | text | - | возможный режим регулировки тембра |
| {zone} .tone_mode | логический |? | режим регулировки тембра |
| {зона} .balance | значение | x | баланс уровня |
| {zone} .direct | логическое | x | установить прямое |
| {zone} .pure_direct | логическое | x | установить чистый прямой |
| {zone} .enhancer | boolean | x | установить усилитель |
| {zone} .bass_extension | boolean | x | установить расширение баса |
| {zone} .sleep | значение | x | таймер сна |

### Netusb
| Объект | Значение | настраиваемое | Описание |
|--------|-------|:-:|--------|
| netusb.input | значение | x | заданный / фактический ввод |
| netusb.playPause | boolean | x | set Play / Pause |
| netusb.playback | text | - | status net player |
| netusb.stop | boolean | x | set Stop |
| netusb.auto_stop | boolean | - | остановлен автоматически |
| netusb.next | boolean | x | установить вперед |
| netusb.prev | boolean | x | set Rewind |
| netusb.shuffle | boolean | x | переключить в случайном порядке |
| netusb.shuffle_stat | text | - | статус перемешивания |
| netusb.repeat | boolean | x | toggle repeat |
| netusb.repeat_stat | text | - | статус повтора |
| netusb.artist | текст | - | имя исполнителя |
| netusb.album | text | - | название альбома |
| netusb.track | text | - | название дорожки |
| netusb.albumart_url | text | - | http-адрес для обложек альбомов |
| netusb.albumart_id | value | - | идентификатор обложки альбома |
| netusb.play_time | значение | - | время воспроизведения в с |
| netusb.play_queue_type | text | - | тип очереди netusb |
| netusb.total_time | значение | - | общее время игры в с |
| netusb.recent_info | json | - | история воспроизведенных элементов |
| netusb.preset_info | json | - | сохраненные пресеты / избранное |
| netusb.presetrecallnumber | value | x | вспомнить # в списке избранного |
| netusb.usb_devicetype | text | - | тип подключенного USB-устройства |
| netusb.attribute | значение | - | какие возможности имеет сервис, подлежащий декодированию |

### Система
| Объект | Значение | настраиваемое | Описание |
|--------|-------|:-:|--------|
| system.api_version | значение | - | Версия API |
| system.system_version | значение | - | Версия системы |
| system.inputs. {service} | value | - | доступная служба ввода |
| system.inputs. {service} .account_enable | value | - | доступная служба ввода включена |
| system.inputs. {service} .distribution_enable | value | - | доступная служба ввода распространяемая |
| system.inputs. {service} .play_info_type | value | - | доступный тип службы ввода |

### СиДи плэйер
| Объект | Значение | настраиваемое | Описание |
|--------|-------|:-:|--------|
| cd.playPause | boolean | x | set Play / Pause |
| cd.playback | text | - | status CD-проигрыватель |
| cd.stop | boolean | x | set Stop |
| cd.next | boolean | x | установить вперед |
| cd.prev | boolean | x | set Rewind |
| cd.shuffle | boolean | x | toggle shuffle |
| cd.shuffle_stat | text | - | статус перемешивания |
| cd.repeat | boolean | x | toggle repeat |
| cd.repeat_stat | text | - | статус повтора |
| cd.device_stat | text | - | статус устройства |
| cd.playtime | значение | - | текущее время воспроизведения |
| cd.totaltime | значение | - | общее время текущего трека |
| cd.disctime | value | - | Общее время CD |
| cd.tracknumber | значение | - | текущий трек при воспроизведении |
| cd.totaltracks | value | - | общее количество треков на компакт-диске |
| cd.artist | текст | - | имя исполнителя |
| cd.album | text | - | название альбома |
| cd.track | text | - | название дорожки |

### Тюнер
| Объект | Значение | настраиваемое | Описание |
|--------|-------|:-:|--------|
| tuner.common_preset_info | array | - | Информация о предустановках |
| tuner.am.preset_info | array | - | Предустановленная информация AM |
| tuner.fm.preset_info | array | - | Информация о предустановках FM |
| tuner.dab.preset_info | array | - | Предустановленная информация DAB |
| tuner.am.preset | number | x | номер предустановки AM |
| tuner.am.freq | number | x | Частота AM в кГц |
| tuner.am.tuned | boolean | - | AM настроен |
| tuner.fm.preset | number | x | номер предустановки FM |
| tuner.fm.freq | number | x | FM частота в кГц |
| tuner.fm.tuned | boolean | - | FM настроен |
| tuner.fm.audio_mode | string | - | FM моно / стерео |
| tuner.dab.preset | number | x | номер предустановки DAB |
| tuner.dab.id | number | - | ID станции DAB |
| tuner.dab.status | string | - | DAB status |
| tuner.dab.freq | number | - | Частота DAB |
| tuner.dab.category | строка | - | первичный / вторичный |
| tuner.dab.audio_mode | string | - | DAB моно / стерео |
| tuner.dab.bit_rate | number | - | Скорость передачи данных DAB в кбит / с |
| tuner.dab.quality | number | - | Качество DAB 0-100 |
| tuner.dab.tune_aid | number | - | DAB signal strenth 0-100 |
| tuner.dab.off_air | boolean | - | DAB вне эфира |
| tuner.dab.dab_plus | логическое | - | DAB + |
| tuner.dab.program_type | string | - | Тип программы DAB |
| tuner.dab.ch_label | string | - | Метка DAB CH |
| tuner.dab.service_label | string | - | Метка службы DAB |
| tuner.dab.dls | string | - | DAB DLS |
| tuner.dab.ensemble_label | string | - | DAB Ensmble label |
| tuner.dab.initial_scan_progress | number | - | Начальный ход сканирования DAB 0-100 |
| tuner.dab.total_station_num | number | - | Тахеометры DAB 0-255 |
| tuner.rds.program_type | string | - | Тип программы RDS |
| tuner.rds.program_service | string | - | сервис программы RDS |
| tuner.rds.radio_text_a | string | - | RDS text A |
| tuner.rds.radio_text_b | string | - | RDS text B |

### Часы
| Объект | Значение | настраиваемое | Описание |
|--------|-------|:-:|--------|
| clock.auto_sync | boolean | x | Автосинхронизация часов |
| clock.format | string | x | Формат часов 12ч / 24ч |
| clock.alarm_on | boolean | x | Вкл / выкл статус будильника |
| clock.volume | number | x | Громкость будильника |
| clock.fade_interval | number | x | Интервал исчезновения будильника |
| clock.fade_type | number | x | Тип затухания будильника |
| clock.mode | string | x | Режим будильника на день / неделю |
| clock.repeat | boolean | x | Повтор будильника, если задан один день |
| clock. {day} .enable | boolean | x | Срок действия установки часов |
| clock. {day} .time | string | - | Время включения будильника ччмм 00-23,00-59 |
| clock. {day} .beep | boolean | x | Срок действия звукового сигнала часов |
| clock. {day} .playback_type | string | - | Тип воспроизведения будильника: резюме / предустановка |
| clock. {day} .resume_input | string | - | Идентификатор входа возобновления будильника |
| clock. {day} .preset_type | string | - | Тип предустановки будильника |
| clock. {day} .preset_num | number | - | ID предустановленного входа будильника |
| clock. {day} .preset_netusb_input | string | - | ID входа netusb будильника |
| clock. {day} .preset_netusb_text | string | - | Будильник netusb text |
| clock. {day} .preset_tuner_band | string | - | Диапазон настройки будильника |
| clock. {day} .preset_tuner_number | number | - | Частота тюнера будильника или идентификатор станции |

## Сделать
* поддержка списков
* изменение значений взаимодействия на красивое именование
* fastforward / fastrewind для NETUSB / CD
* Bluetooth
* уровень диалога

## Changelog
#### 0.2.0
* refactoring with "create adaptor"
* async/await

#### 0.1.5
* (Scrounger) error handling when device is not reachable

#### 0.1.4
* (Scrounger) correction of type mismatch (array object)

#### 0.1.3
* (foxthefox) added writing for linkControl/linkAudioDelay/linkAudioQuality

#### 0.1.2
* (Scrounger) correction of type mismatch (string boolean)

#### 0.1.1
* correction for clock "oneday"

#### 0.1.0
* compact mode
* yamaha-yxc-nodejs 0.0.8
* widget update

#### 0.0.9
* adminV3 uses values2table and add button back again
* zone2/3/4 now working
* extended automatic testing
* button in admin for collection of JSON responses

#### 0.0.8
* automatic testing update
* given name in admin page to appear in object (device)

#### 0.0.7
* tuner support
* clock support (information mainly)
* support of more zones
* support of mc-link
* setting of min and max values according features
* admin v3

#### 0.0.6
* widget set matching the objects and control
* cd.shuffle_stat boolean -> text
* new netusb.shuffle_stat (text)
* status update via subscribing UDP messages
* switch for update on playtime info (disabling reduces traffic)

#### 0.0.5
* cleanup in admin page
* improvement for object creation
* more objects on netusb
* more objects in system
* added support of CD

#### 0.0.4
* new objects and functions (input, sound_prog, EQ, clearVoice)
* search/discovery in admin page

#### 0.0.3
* more objects implemented

#### 0.0.2
* minor corrections

#### 0.0.1
* initial release with setting of IP in config-page, 
* available commands power, mute, volume

## License

The MIT License (MIT)

Copyright (c) 2017 - 2021 foxthefox <foxthefox@wysiwis.net>