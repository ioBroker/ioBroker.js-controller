---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.musiccast/README.md
title: ioBroker.musiccast
hash: tt/h/le4GOU9PDRh7t6r+yzRzstX8rUJyno2AOEsUHM=
---
![логотип](../../../en/adapterref/iobroker.musiccast/admin/musiccast.png)

![Количество установок](http://iobroker.live/badges/musiccast-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.musiccast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.musiccast.svg)
![Статус сборки](https://travis-ci.org/foxthefox/ioBroker.musiccast.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.musiccast.png?downloads=true)

# IoBroker.musiccast
адаптер для устройств Yamaha MusicCast, таких как WX-010/030, YSP-1600

## Монтаж:
Для установки требуется как минимум nodejs v4

с нпм

```javascript
npm install iobroker.musiccast
```

актуальная версия из github (это может работать не каждый раз, когда идет разработка)

```javascript
npm install https://github.com/foxthefox/ioBroker.musiccast/tarball/master --production
```

## Настройки
Страницу администратора «+» можно использовать для добавления вручную IP-адреса, DeviceID, Type и Name.
Нажмите кнопку поиска для обнаружения. Если у вас есть несколько устройств, вы должны нажимать кнопку несколько раз, пока все устройства не будут обнаружены. К сожалению, обнаружение возвращает только один объект за раз, и это может быть любое из ваших устройств MusicCast. Если возврат такой же, как уже в таблице, вам нужно снова нажать кнопку. Иногда это помогает сохранить и открыть страницу Damin снова.

В маловероятном случае, когда 2 или более устройств предоставляют один и тот же идентификатор, слегка измените один идентификатор. В противном случае адаптер не сможет различить 2 устройства.

Если вы хотите, чтобы время воспроизведения обновлялось для треков, которые вы слушаете, включите / установите соответствующий флажок. Имейте в виду, что увеличивается количество сообщений (каждую секунду для каждого устройства пинг-понг обновлений).

## Доступные объекты
В настоящее время реализованы следующие объекты:

### Базовый (зона)
| Объект | Значение | устанавливаемое | Описание |
|--------|-------|:-:|--------|
| {zone} .power | логический | x | true / false -> ON / Standby |
| {zone} .zone_b | boolean |? | true / false -> целевой зоной является зона B |
| {zone} .mute | логический | x | true / false -> отключен / не отключен |
| {zone} .volume | значение | x | 0 ... max (max в зависимости от устройства) |
| {zone} .act_vol_mode | text |? | фактическая громкость в режиме дБ |
| {zone} .act_vol_val | value |? | фактический объем в значении дБ |
| {зона} .act_vol_unit | текст | - | фактическая единица объема (должна быть дБ) |
| {zone} .act_vol_mode_list | text | - | фактическая громкость в режимах дБ |
| {зона} .вход | текст | х | ввод в зависимости от устройства |
| {zone} .input_list | text | - | возможные входы |
| {zone} .sound_program | текст | x | установить звуковую программу |
| {zone} .sound_program_list | text | - | возможные звуковые программы |
| {zone} .surr_decoder_type | text |? | установить тип объемного звучания |
| {zone} .surr_decoder_type_list | text | - | возможный декодер окружающего звука |
| {zone} .link_control | text | x | установить управление ссылками |
| {zone} .link_control_list | text | - | возможные настройки управления ссылками |
| {zone} .link_audio_delay | text | x | установить задержку аудио ссылки |
| {zone} .link_audio_delay_list | text | - | возможные настройки ссылки link аудио задержки |
| {zone} .clearVoice | логический | x | clear Голосовое управление |
| {zone} .low | value | x | level EQ low |
| {zone} .mid | значение | x | уровень EQ mid |
| {зона} .high | значение | x | уровень EQ высокий |
| {zone} .subwoofer_volume | значение | x | уровень громкости сабвуфера |
| {zone} .bass | значение | x | уровень баса |
| {zone} .treble | значение | x | уровень высоких частот |
| {zone} .tone_control_mode_list | text | - | возможный режим управления тоном |
| {zone} .tone_mode | логический |? | режим управления тоном |
| {зона} .balance | значение | x | уровень баланса |
| {zone} .direct | логический | x | установить прямой |
| {zone} .pure_direct | логический | x | установить чистый прямой |
| {zone} .enhancer | логический | x | установить энхансер |
| {zone} .bass_extension | логическое значение | x | установить расширение басов |
| {zone} .sleep | значение | x | таймер отключения |

### Netusb
| Объект | Значение | устанавливаемое | Описание |
|--------|-------|:-:|--------|
| netusb.input | значение | x | набор / фактический ввод |
| netusb.playPause | boolean | x | set Play / Pause |
| netusb.playback | text | - | status net player |
| netusb.stop | логическое значение | x | установить Stop |
| netusb.auto_stop | логический | - | автоматически останавливается |
| netusb.next | логическое значение | x | установить вперед |
| netusb.prev | логическое значение | x | установить перемотку |
| netusb.shuffle | логическое значение | x | переключение в случайном порядке |
| netusb.shuffle_stat | text | - | статус в случайном порядке |
| netusb.repeat | логическое значение | x | переключение повтора |
| netusb.repeat_stat | text | - | повторить статус |
| netusb.artist | text | - | имя исполнителя |
| netusb.album | текст | - | название альбома |
| netusb.track | text | - | название трека |
| netusb.albumart_url | text | - | http адрес для обложки альбома |
| netusb.albumart_id | value | - | идентификатор обложки альбома |
| netusb.play_time | value | - | время воспроизведения в s |
| netusb.play_queue_type | text | - | тип очереди netusb |
| netusb.total_time | value | - | общее время воспроизведения в с |
| netusb.recent_info | json | - | история проигранных предметов |
| netusb.preset_info | json | - | сохраненные пресеты / избранное |
| netusb.presetrecallnumber | value | x | вызвать # в списке избранных |
| netusb.usb_devicetype | text | - | тип подключенного USB-устройства |
| netusb.attribute | value | - | какие возможности имеет сервис, подлежащий декодированию |

### Система
| Объект | Значение | устанавливаемое | Описание |
|--------|-------|:-:|--------|
| system.api_version | value | - | Версия API |
| system.system_version | value | - | Версия системы |
| system.inputs. {service} | value | - | доступный сервис ввода |
| system.inputs. {service} .account_enable | value | - | доступная служба ввода включена |
| system.inputs. {service} .distribution_enable | value | - | доступные службы ввода распространяемые |
| system.inputs. {service} .play_info_type | value | - | доступный тип службы ввода |

### СиДи плэйер
| Объект | Значение | устанавливаемое | Описание |
|--------|-------|:-:|--------|
| cd.playPause | логическое значение | x | set Play / Pause |
| cd.playback | text | - | статус проигрывателя компакт-дисков |
| cd.stop | логическое значение | x | set Stop |
| cd.next | логическое значение | x | установить вперед |
| cd.prev | логическое значение | x | установить перемотку |
| cd.shuffle | логическое значение | x | переключение в случайном порядке |
| cd.shuffle_stat | текст | - | статус в случайном порядке |
| cd.repeat | логическое значение | x | переключение повтора |
| cd.repeat_stat | text | - | повторить статус |
| cd.device_stat | text | - | состояние устройства |
| cd.playtime | value | - | текущее время воспроизведения |
| cd.totaltime | значение | - | текущий трек общее время |
| cd.disctime | значение | - | CD общее время |
| cd.tracknumber | value | - | отслеживать текущий в воспроизведении |
| cd.totaltracks | value | - | всего треков CD |
| cd.artist | text | - | имя исполнителя |
| cd.album | текст | - | название альбома |
| cd.track | text | - | название трека |

### Тюнер
| Объект | Значение | устанавливаемое | Описание |
|--------|-------|:-:|--------|
| tuner.common_preset_info | array | - | Предварительная информация |
| tuner.am.preset_info | array | - | Preset AM Information |
| tuner.fm.preset_info | array | - | Предустановленная информация FM |
| tuner.dab.preset_info | array | - | Предустановленная информация DAB |
| tuner.am.preset | number | x | AM предустановленный номер |
| tuner.am.freq | число | x | частота AM в кГц |
| tuner.am.tuned | логический | - | AM настроенный |
| tuner.fm.preset | number | x | Номер предустановки FM |
| tuner.fm.freq | число | x | частота FM в кГц |
| tuner.fm.tuned | логический | - | FM настроенный |
| tuner.fm.audio_mode | string | - | FM моно / стерео |
| tuner.dab.preset | number | x | Номер предустановки DAB |
| tuner.dab.id | номер | - | идентификатор станции DAB |
| tuner.dab.status | string | - | DAB status |
| tuner.dab.freq | число | - | частота DAB |
| Tuner.dab.category | строка | - | первичный / вторичный |
| tuner.dab.audio_mode | string | - | DAB моно / стерео |
| tuner.dab.bit_rate | число | - | Скорость передачи DAB в кбит / с |
| tuner.dab.quality | номер | - | качество DAB 0-100 |
| tuner.dab.tune_aid | number | - | Сигнал DAB, сила 0-100 |
| tuner.dab.off_air | логический | - | DAB от эфира |
| Tuner.dab.dab_plus | логическое | - | DAB + |
| tuner.dab.program_type | string | - | Тип программы DAB |
| tuner.dab.ch_label | string | - | DAB CH label |
| tuner.dab.service_label | string | - | Метка обслуживания DAB |
| tuner.dab.dls | string | - | DAB DLS |
| tuner.dab.ensemble_label | string | - | DAB enmble label |
| tuner.dab.initial_scan_progress | число | - | Ход первоначального сканирования DAB 0-100 |
| tuner.dab.total_station_num | номер | - | Тахеометры DAB 0-255 |
| tuner.rds.program_type | string | - | Тип программы RDS |
| tuner.rds.program_service | string | - | Служба программ RDS |
| tuner.rds.radio_text_a | string | - | RDS текст A |
| tuner.rds.radio_text_b | string | - | RDS текст B |

### Часы
| Объект | Значение | устанавливаемое | Описание |
|--------|-------|:-:|--------|
| clock.auto_sync | логическое значение | x | Синхронизация часов |
| clock.format | string | x | Формат часов 12ч / 24ч |
| clock.alarm_on | boolean | x | Состояние будильника вкл / выкл |
| clock.volume | number | x | Громкость будильника |
| clock.fade_interval | number | x | Интервал замирания будильника |
| clock.fade_type | number | x | Часы с будильником исчезают |
| clock.mode | string | x | Режим будильника однодневный / еженедельный |
| clock.repeat | boolean | x | Повтор будильника, если указан один день |
| clock. {день} .enable | логический | x | Срок действия установки часов |
| часы. {день} .time | строка | - | Время запуска будильника ччмм 00-23,00-59 |
| clock. {day} .beep | логический | x | Срок действия Clock Beep |
| часы. {день} .playback_type | строка | - | Тип воспроизведения будильника возобновить / предварительно установить |
| часы. {день} .resume_input | строка | - | Будильник возобновил ввод идентификатора |
| часы. {день} .preset_type | строка | - | Тип пресета будильника |
| часы. {день} .preset_num | номер | - | Идентификатор предустановки входа будильника |
| часы. {день} .preset_netusb_input | строка | - | ID входа netusb будильника |
| clock. {day} .preset_netusb_text | string | - | Текст будильника netusb |
| clock. {day} .preset_tuner_band | string | - | Диапазон настройки будильника |
| часы. {день} .preset_tuner_number | номер | - | Частота тюнера будильника или идентификатор станции |

## Сделать
* поддержка списков
* изменение значений взаимодействия на приятное именование
* fastforward / fastrewind для NETUSB / CD
* блютус
* уровень диалога

## Changelog
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

Copyright (c) 2017 - 2019 foxthefox <foxthefox@wysiwis.net>