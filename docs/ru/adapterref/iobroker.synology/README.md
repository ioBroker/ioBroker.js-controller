---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synology/README.md
title: ioBroker Synology адаптер
hash: OhfbYWN/EDHPMTrcO9ZK7r1UZjp03raEDfDHfPdA2lg=
---
![логотип](../../../en/adapterref/iobroker.synology/admin/synology.png)

![Количество установок](http://iobroker.live/badges/synology-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.synology.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synology.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.synology/master.svg)
![NPM](https://nodei.co/npm/iobroker.synology.png?downloads=true)
![жертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker Synology адаптер
## Описание
Драйвер позволяет получать данные и управлять сервером Synology NAS.

### SendMethod
Вы можете отправить любую команду (метод), установив объект sendMethod, например: Получить информацию SurveillanceStation - это метод getInfo без дополнительных параметров.

```{"method": "getInfo", "params": {}}```

### Control
** commands.reboot ** - перезагрузить NAS

** commands.shutdown ** - выключение NAS

. ***SurveillanceStation.cameras {NAMECAM}*** :

* enabled - текущее состояние и включение / отключение камеры
* linkSnapshot - URL для снимка

*** SurveillanceStation.HomeMode.status_on *** - Текущий статус и включение / отключение режима дома

*** SurveillanceStation.getSnapshotCamera *** - Получить снимок по номеру камеры, файл сохраняется в каталоге *... iobroker-data \ synology_0 \ snapshotCam_2.jpg*

. ***AudioStation.players {PLAYERID}*** :

* play, pause, stop, next, prev - управление воспроизведением (кнопка, только true)
* repeat - повторное управление (Off, All, One)
* shuffle - Shuffle control (true / false)
* громкость - громкость дистанционного проигрывателя (0-100)
* seek - Управление поиском воспроизведения (0-100)
* play_folder - добавляет треки из папки в список воспроизведения (например, папка id *dir_5816*
* play_track - воспроизведение трека по его идентификатору (например, *music_120847*
* current_play - управление и статус текущей дорожки по ее номеру в списке воспроизведения (например, *14*

### Окно сообщения
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

## Changelog

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

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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