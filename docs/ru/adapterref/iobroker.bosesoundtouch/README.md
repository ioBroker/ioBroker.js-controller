---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch! [Логотип] (admin / bosesoundtouch.png)
hash: mbAV8qA2RDeNq6P2wPmscDyJNJgDnB6E4jRBgMEUAMA=
---
# IoBroker.bosesoundtouch ![логотип](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)
Адаптер Bose SoundTouch для платформы ioBroker IoT

## Контрольные состояния
Для управления динамиком можно написать следующие объекты:

| Государство | Описание |
| :---           | :---        |
| ключ | Один из следующих ключей для отправки: <br><br> ИГРАТЬ <br> ПАУЗА <br> СТОП <br> PREV_TRACK <br> NEXT_TRACK <br> ПАЛЬЦЫ ВВЕРХ <br> THUMBS_DOWN <br> ЗАКЛАДКИ <br> МОЩНОСТЬ <br> MUTE <br> УВЕЛИЧИТЬ ГРОМКОСТЬ <br> УБАВИТЬ ЗВУК <br> PRESET_1 <br> PRESET_2 <br> PRESET_3 <br> PRESET_4 <br> PRESET_5 <br> PRESET_6 <br> AUX_INPUT <br> SHUFFLE_OFF <br> SHUFFLE_ON <br> REPEAT_OFF <br> REPEAT_ONE <br> REPEAT_ALL <br> PLAY_PAUSE <br> ADD_FAVORITE <br> REMOVE_FAVORITE <br> INVALID_KEY |
| приглушенный | Отключить или включить звук устройства. |
| на | Включите или выключите устройство. |
| playEverywhere | Определите динамик как мастера зоны и воспроизведите его содержимое на всех остальных динамиках. |
| объем | Измените громкость устройства между 0 и 100. |

## Инфо Состояния
Следующая информация собрана у вашего докладчика (только для чтения):

### Информация об устройстве
| Государство | Описание |
| :---       | :---        |
| ipAddress | IP-адрес устройства, как правило, совпадает с тем, который вы указали в настройках адаптера. |
| macAddress | MAC-адрес устройства |
| имя | Имя, которое вы указали в приложении SoundTouch. |
| тип | Тип устройства (например, SoundTouch 300). |

### Сейчас играет
| Государство | Описание |
| :---       | :---        |
| альбом | Текущий альбом. |
| искусство | URL исходного искусства. |
| художник | В настоящее время играет художник. |
| жанр | Жанр текущего игрового трека. |
| источник | Тип или название воспроизводимой службы. Чтобы определить, находится ли продукт в режиме ожидания, проверьте, если источник == STANDBY. |
| станция | Название станции или списка воспроизведения. |
| трек | Текущий воспроизводимый трек. |

### Пресеты
Следующие состояния присутствуют для каждого из 6 доступных пресетов:

| Государство | Описание |
| :---       | :---        |
| iconUrl | URL исходного искусства. |
| имя | Название альбома, станции, списка воспроизведения, песни, телефона и т. Д. В зависимости от источника. |
| источник | Тип или название услуги. |

### Зоны
Следующее описание поможет вам создать группы с вашей системой мультирум. Поле readonly автоматически обновляется устройствами soundtouch, также если вы меняете группы самим приложением Soundtouch.

| Государство | Описание |
| :---       | :---        |

| masterOf | Отображение MAC-адресов ведомых динамиков (разделенных на «;») (только чтение) | memberOf | Показать MAC-адрес мастера этого динамика (только чтение) | addMasterOf | Добавьте MAC-адрес динамика, который вы хотите добавить к этому главному динамику. Также возможно установить более одного динамика (разделенный на «;»).
| removeMasterOf | Добавьте MAC-адрес динамика, который вы хотите удалить из этого основного динамика. Также возможно установить более одного динамика (разделенный на «;»).

## Changelog

### 0.2.3 (11.11.2018)
* fixed issue #24 "does not start"
 
### 0.2.2 (03.11.2018)
* Zones: objects moved to sub folder 'zones'

### 0.2.1 (12.10.2018)
* Update now playing info for source Deezer

### 0.2.0 (27.09.2018)
* Add support for zones

### 0.1.9 (07.03.2018)
* Update now playing info for source Amazon

### 0.1.8 (08.02.2018)
* Update now playing info for source Spotify
* now playing: added state 'genre'

### 0.1.7 (04.02.2018)
* fixed crash if no presets are defined

### 0.1.6 (17.01.2018)
* fixed crash if socket connection fails
* added setting: time to reconnect in seconds

### 0.1.5 (06.01.2018)
* added 'TUNEIN' to now playing info
* state playEverywhere falls back to false after activation
* admin/bose.png renamed to admin/bosesoundtouch.png to be shown corretly in adapter list
* added short adapter description in io-package.json

### 0.1.4 (30.12.2017)
* playEverywhere: support multi room (zones) to define one speaker as master for all others

### 0.1.3 (22.12.2017)
* revert last change

### 0.1.2 (22.12.2017)
* fixed typo in package.json

### 0.1.1 (20.12.2017)
* now playing: added state 'art' (URL to cover image if available)
* merged pull request from Apollon77 (basic config files for testing)
* renamed repository to 'ioBroker.bosesoundtouch'

### 0.1.0 (26.11.2017)
* objectChange/stateChange: log level 'debug'
* added 'STORED_MUSIC' to now playing info.

### 0.0.9 (22.11.2017)
* Merge pull request #1 from Apollon77/master: Add testing and fix things...

### 0.0.8 (19.11.2017)
* send value to correct instance when having multiple adapters installed
* first version of README.md

### 0.0.7 (09.11.2017)
* fixed logging in soundtouchsocket.js

### 0.0.6 (09.11.2017)
* renamed main.js to bosesoundtouch.js
* line ending: LF
* strings: single quote

### 0.0.5 and earlier (01.11.2017)
* Initial versions