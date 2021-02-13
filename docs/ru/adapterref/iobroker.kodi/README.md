---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kodi/README.md
title: Адаптер Kodi для ioBroker (JSON-RPC API)
hash: 0uKdz3zEnf9fcfqHeXAdWAnnKpfhDdB0AHr4OFRxmzs=
---
![Логотип](../../../en/adapterref/iobroker.kodi/admin/kodi.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.kodi.svg)
![Количество установок](http://iobroker.live/badges/kodi-installed.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kodi.svg)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)
![NPM](https://nodei.co/npm/iobroker.kodi.png?downloads=true)

[![Тесты] (https://github.com/instalator/iobroker.kodi/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.kodi/actions/)

[Руководство на английском языке](https://github.com/instalator/ioBroker.kodi/wiki/en_EN)

# Адаптер Kodi для ioBroker (JSON-RPC API)
Вы можете найти официальную документацию KODI по API JSON-RCP [тут] (http://kodi.wiki/view/JSON-RPC_API) и полный список доступных команд (для протокола версии 6) [тут](http://kodi.wiki/view/JSON-RPC_API/v6).

*** Примечание: Этот адаптер требует Nodejs 8.0 + ***

## Конфигурация KODI
Включение удаленного управления и веб-сервера.
![Включение дистанционного управления.](../../../en/adapterref/iobroker.kodi/admin/remote.png)

JSON-RPC API использует **по умолчанию порт 9090** чтобы его изменить, необходимо внести изменения в файл [advancedsettings.xml](http://kodi.wiki/view/AdvancedSettings.xml)

_Примечание: Файл advancedsettings.xml не существует по умолчанию. Вы должны сначала создать его! _

```xml
<jsonrpc>
    <compactoutput>true</compactoutput>
    <tcpport>9999</tcpport>
</jsonrpc>
```

## Конфигурация драйвера
В настройках адаптера указывается IP-адрес и порт для JSON-RPC API (по умолчанию 9090), и логин / пароль для доступа на веб-сервер Kodi.

## Использование
### ShowNotif:
Один важный момент, если используется заголовок сообщения, то он должен всегда находится перед самим текстом сообщения (Внимание;Протечка воды), расположение остальных параметров не критично.

** Изображение: ** Уровень сообщения

  * 'info' - 0 (по умолчанию),
  * 'предупреждение' - 1,
  * 'ошибка' - 2.

** displaytime: ** Время отображения сообщения в миллисекундах, минимум 1500 макс 30000 мс.

**Пример:**

 * 1; Внимание; Протечка воды; 15000
 * Внимание; Протечка воды; 2; 10000
 * Внимание;Протечка воды
 * Протечка воды

Так же сообщения можно отправлять из драйвера javascript:

```js
sendTo("kodi.0", {
    message:  'Возможно протечка воды ', //Текст сообщения
    title:    'ВНИМАНИЕ!!!', //Заголовок сообщения
    image: 'https://raw.githubusercontent.com/instalator/ioBroker.kodi/master/admin/kodi.png', //Ссылка на иконку
    delay: 7000 //Время отображения сообщения миллисекундах (минимум 1500 макс 30000 мс)
});
```

### SwitchPVR:
Переключение PVR IPTV каналов по названию канала в плейлисте.
** Пример: ** ТВ канал - Discovery Science найдет как по полному наименованию так и по discover,

### YouTube:
Для открытия видео с сайта youtube достаточно записать код видео в данный статус. Начиная с версии 0.1.5 и выше можно вставлять прямую ссылку на видео, а также код или полную ссылку на плейлист.
Например: Для открытия этого [видео](https://www.youtube.com/watch?v=Bvmxr24D4TA), необходимо установить в статусе - Bvmxr24D4TA

### Открыть:
Сюда записывается ссылка на медиконтент в сети интернет либо путь до локального медиа файла.
После записи значения начнется воспроизведение на проигрывателе KODI.

### Позиция:
Текущая позиция в плейлисте, так же в этот статус можно записать специальную позицую и KODI тут же перейдет к воспроизведению позиции.

### Искать:
Текущее значение позиции воспроизведения в процентах от 0 до 100.

### Повторение:
Повтор воспроизведения, принимает следующие значения:

* off - повтор воспроизведения отключен
* on - повтор воспроизведения текущего трека
* все - повтор всего плейлиста

### Перемешать:
Перемешивание списка треков в плейлисте для случайного воспроизведения.
Принимает значения true и false

### Играть в:
Старт воспроизведения (true, false)

### Скорость:
Скорость воспроизведения. Фиксированные значения (-32, -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16, 32), а также «приращение» и «декремент»

### Каталог:
Сюда записывается путь до папки или диска, в ответ в этот статус записывается список каталогов указанной папки или диска.

### ActivateWindow:
Активизирует в проигрывателе окно. Поддерживает следующий список:

```
"home", "programs", "pictures", "filemanager", "files", "settings", "music", "video", "videos", "tv", "pvr", "pvrguideinfo", "pvrrecordinginfo", "pvrtimersetting", "pvrgroupmanager", "pvrchannelmanager", "pvrchannelmanager", "pvrguidesearch", "pvrchannelscan", "pvrupdateprogress", "pvrosdchannels", "pvrosdguide", "pvrosddirector", "pvrosdcutter", "pvrosdteletext", "systeminfo", "testpattern", "screencalibration", "guicalibration", "picturessettings", "programssettings", "weathersettings", "musicsettings", "systemsettings", "videossettings", "networksettings", "servicesettings", "appearancesettings", "pvrsettings", "tvsettings", "scripts", "videofiles", "videolibrary", "videoplaylist", "loginscreen", "profiles", "skinsettings", "addonbrowser", "yesnodialog", "progressdialog", "virtualkeyboard", "volumebar", "submenu", "favourites", "contextmenu", "infodialog", "numericinput", "gamepadinput", "shutdownmenu", "mutebug", "playercontrols", "seekbar", "musicosd", "addonsettings", "visualisationsettings", "visualisationpresetlist", "osdvideosettings", "osdaudiosettings", "videobookmarks", "filebrowser", "networksetup", "mediasource", "profilesettings", "locksettings", "contentsettings", "songinformation", "smartplaylisteditor", "smartplaylistrule", "busydialog", "pictureinfo", "accesspoints", "fullscreeninfo", "karaokeselector", "karaokelargeselector", "sliderdialog", "addoninformation", "musicplaylist", "musicfiles", "musiclibrary", "musicplaylisteditor", "teletext", "selectdialog", "musicinformation", "okdialog", "movieinformation", "textviewer", "fullscreenvideo", "fullscreenlivetv", "visualisation", "slideshow", "filestackingdialog", "karaoke", "weather", "screensaver", "videoosd", "videomenu", "videotimeseek", "musicoverlay", "videooverlay", "startwindow", "startup", "peripherals", "peripheralsettings", "extendedprogressdialog", "mediafilter".
```

### ExecuteAction:
Можно выполнить одно из следующих действий:

```
"left", "right", "up", "down", "pageup", "pagedown", "select", "highlight", "parentdir", "parentfolder", "back", "previousmenu", "info", "pause", "stop", "skipnext", "skipprevious", "fullscreen", "aspectratio", "stepforward", "stepback", "bigstepforward", "bigstepback", "osd", "showsubtitles", "nextsubtitle", "codecinfo", "nextpicture", "previouspicture", "zoomout", "zoomin", "playlist", "queue", "zoomnormal", "zoomlevel1", "zoomlevel2", "zoomlevel3", "zoomlevel4", "zoomlevel5", "zoomlevel6", "zoomlevel7", "zoomlevel8", "zoomlevel9", "nextcalibration", "resetcalibration", "analogmove", "rotate", "rotateccw", "close", "subtitledelayminus", "subtitledelay", "subtitledelayplus", "audiodelayminus", "audiodelay", "audiodelayplus", "subtitleshiftup", "subtitleshiftdown", "subtitlealign", "audionextlanguage", "verticalshiftup", "verticalshiftdown", "nextresolution", "audiotoggledigital", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "osdleft", "osdright", "osdup", "osddown", "osdselect", "osdvalueplus", "osdvalueminus", "smallstepback", "fastforward", "rewind", "play", "playpause", "delete", "copy", "move", "mplayerosd", "hidesubmenu", "screenshot", "rename", "togglewatched", "scanitem", "reloadkeymaps", "volumeup", "volumedown", "mute", "backspace", "scrollup", "scrolldown", "analogfastforward", "analogrewind", "moveitemup", "moveitemdown", "contextmenu", "shift", "symbols", "cursorleft", "cursorright", "showtime", "analogseekforward", "analogseekback", "showpreset", "presetlist", "nextpreset", "previouspreset", "lockpreset", "randompreset", "increasevisrating", "decreasevisrating", "showvideomenu", "enter", "increaserating", "decreaserating", "togglefullscreen", "nextscene", "previousscene", "nextletter", "prevletter", "jumpsms2", "jumpsms3", "jumpsms4", "jumpsms5", "jumpsms6", "jumpsms7", "jumpsms8", "jumpsms9", "filter", "filterclear", "filtersms2", "filtersms3", "filtersms4", "filtersms5", "filtersms6", "filtersms7", "filtersms8", "filtersms9", "firstpage", "lastpage", "guiprofile", "red", "green", "yellow", "blue", "increasepar", "decreasepar", "volampup", "volampdown", "channelup", "channeldown", "previouschannelgroup", "nextchannelgroup", "leftclick", "rightclick", "middleclick", "doubleclick", "wheelup", "wheeldown", "mousedrag", "mousemove", "noop".

```

### Система:
 - EjectOpticalDrive - Извлекает или закрывает дискиод оптических дисков (если имеется)
 - Гибернация - включение спящего режима
 - Reboot - перезагрузка системы
 - Shutdown - выключает систему
 - Suspend - приостанавливает Kodi

## Changelog

#### 2.0.5
* (instalator) changed css classes
* (instalator) fixed error

#### 2.0.4
* (instalator) fixed thumbnails widget
* (instalator) fixed info.tagline

#### 2.0.2
* (instalator) changed title in io-package.json
* (instalator) changed seek
* (instalator) fixed widgets
* (instalator) fixed for thumbnails

#### 2.0.1 (2020-04-13)
* (instalator) fixed error if not used PVR

#### 2.0.0 (2020-04-12)
* (instalator) support admin3
* (instalator) support compact mode
* (instalator) refactoring
* (instalator) fixed different error
* (instalator) added english manual
* (instalator) big change code

#### 1.0.0 (2017-11-13)
* (instalator) up to stable

#### 0.2.4 (2017-10-16)
* (instalator) fix error

#### 0.2.3 (2017-08-15)
* (instalator) fix error switchPVR
* (instalator) Added description "System" to readme

#### 0.2.2 (2017-08-14)
* (instalator) added object - System (EjectOpticalDrive, Hibernate, Reboot, Shutdown, Suspend)
* (instalator) fix playlist widget

#### 0.2.0 (2017-01-07)
* (instalator) added object - state
* (instalator) change repeat to bool


#### 0.1.9 (2017-01-05)
* (instalator) change for vis-players

#### 0.1.8 (2016-12-25)
* (instalator) change open youtube playlist

#### 0.1.6 (2016-12-23)
* (instalator) added Tests
* (instalator) added open youtube playlist and open youtube link

#### 0.1.4 (2016-07-05)
* (instalator) fix error for Open
* (instalator) fix method number

#### 0.1.3
* (bluefox) fix error milti instance

#### 0.1.2 (2016-07-05)
* (instalator) change pvr switch - add stop
* (instalator) change dependencies
* (instalator) fix change play/stop state

#### 0.1.1 (2016-05-30)
* (instalator) change admin setting
* (instalator) Fix error 'playerid' of undefined

#### 0.1.0 (2016-05-22)
* (instalator) beta

#### 0.0.6 (2016-05-08)
* (bluefox) fixed crash when the driver turned on the KODI
* (bluefox) make adapter disabled by default, because no IP set
* (instalator) Thumbnail widget
* (instalator) added GetDirectory, GetVideoLibrary
* (instalator) added Scan & Clean Library

#### 0.0.5 (2016-05-04)
* (instalator) change creating object
* (instalator) added info.connection state

#### 0.0.4 (2016-05-03)
* (instalator) fix error
* (instalator) added VIS widgets

#### 0.0.3 (2016-05-01)
* (instalator) fix error
* (instalator) added send message from JS

#### 0.0.2 (2016-04-24)
* (instalator) remote player
* (instalator) ShowNotification
* (instalator) info playing
* (instalator) GetPVRChannel

#### 0.0.1
* (instalator) initial (17.04.2016)

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