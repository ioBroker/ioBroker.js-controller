---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synology/README.md
title: ioBroker адаптер Synology
hash: tmY0K1EQ19t8kcb8dvdFpborvlzzMaoGF8O4LaDq7og=
---
![Логотип](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Количество установок](http://iobroker.live/badges/synology-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.synology.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synology.svg)
![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker Адаптер Synology
[![Тесты] (https://github.com/instalator/iobroker.synology/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.synology/actions/)

## Описание
Драйвер позволяет получать данные и управлять сервером Synology NAS.

### Настройки 2FA
Если вы используете 2FA, см. Инструкции [Вот](docs/en/template.md).

### SendMethod
Вы можете отправить любую команду (метод), установив объект sendMethod, например: Get the SurveillanceStation info - это метод getInfo без дополнительных параметров.

```{"method": "getInfo", "params": {}}```

### Контроль
** commands.reboot ** - перезагрузить NAS

** commands.shutdown ** - выключить NAS

*** SurveillanceStation.cameras. {NAMECAM} ***:

* enabled - Текущий статус и включение / отключение камеры
* linkSnapshot - URL для снимка

*** SurveillanceStation.HomeMode.status_on *** - Текущий статус и включение / отключение домашнего режима

*** SurveillanceStation.getSnapshotCamera *** - Получение снимка по номеру камеры, файл сохраняется в каталоге ``...iobroker-data\synology_0\snapshotCam_2.jpg``

*** AudioStation.players. {PLAYERID} ***:

* play, pause, stop, next, prev - Управление воспроизведением (кнопка, только true)
* repeat - Повторить контроль (Выкл., Все, Один)
* shuffle - управление перемешиванием (true / false)
* volume - Громкость удаленного плеера (0-100)
* seek - Управление поиском при воспроизведении (0-100)
* play_folder - Добавить треки из папки в плейлист (id папки, например, `` dir_5816``)
* play_track - проигрывать трек по его id (например, music_120847)
* current_play - Контроль и статус текущего трека по его номеру в плейлисте (например, `` 14 '')

*** DownloadStation ***:

* activeTask - количество незавершенных загрузок
* listTasks - массив с незавершенными загрузками
* shedule_enabled, shedule_emule_enabled - Статус и контроль запланированных или немедленных загрузок
* add_hash_download - добавить в хеш-загрузку (например, `` 8BD3CAD02FC9ECB661A12378414FA310D3F3FE03 '')
* add_url_download - добавить ссылку для скачивания или магнитную ссылку
* папка - папка для загрузки, задается перед добавлением загрузки, в противном случае она загружается в папку по умолчанию
* pause_task, resume_task - Приостановить загрузку и возобновить. (например, dbid_170 или 170 или all)

### Окно сообщения
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog

### 0.1.20
* (instalator) fixed error

### 0.1.18
* (instalator) change link for album cover

### 0.1.17
* (instalator) added Sentry plugin support

### 0.1.16
* (instalator) fixed error

### 0.1.15
* (instalator) fixed error in parse Info
* (instalator) fixed api undefined

### 0.1.14
* (instalator) fixed missing [datapoints](https://github.com/instalator/ioBroker.synology/issues/43)
* (instalator) refactoring
* (instalator) Changed the logging of some errors
* (instalator) Changed format session in syno package

### 0.1.11
* (instalator) added motionDetected state
* (SpectreKr*) Adding to FS Sharing

### 0.1.10
* (instalator) fixed copy cover file
* (instalator) fix get packages for DSM 5.x
* (instalator) Added option to select services for receiving data

### 0.1.8
* (instalator) fix error addDownload
* (instalator) fixed listRadios
* (instalator) fixed get cover

### 0.1.7
* (instalator) fixed 2FA
* (instalator) Added setup guide 2FA

### 0.1.6
* (instalator) fix for 2fa
* (instalator) fix error
* (instalator) change error log
* (instalator) fix io-package
* (instalator) fix error status player

### 0.1.4
* (instalator) change for DownloadStation
* (instalator) added playlist favorite radio
* (instalator) added clearPlaylist button
* (instalator) refactoring

### 0.1.3
* (instalator) change obj for ss info fix for cover song 
* (instalator) fix for info.connection 
* (instalator) add 6.2.3 fix for player browser files 
* (instalator) fix for 2FA
* (instalator) fixed error add download 
* (instalator) added DownloadStation task list

### 0.1.2
* (instalator) fixed error

### 0.1.1
* (instalator) added messagebox for snapshot
* (instalator) update readme
* (instalator) added ss link for different streams
* (instalator) fix error
* (instalator) refactoring

### 0.1.0
* (instalator) added HomeMode switch 
* (instalator) change for audiostation 
* (instalator) change for as and ss
* (instalator) added snapshot functional 
* (instalator) fixed systemConfig 
* (instalator) fixed many error 

### 0.0.4 (2018-10-07)
* (instalator) Изменен репозиторий библиотеки
* (instalator) Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
* (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.