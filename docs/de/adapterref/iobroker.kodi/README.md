---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.kodi/README.md
title: JSON-RPC-API von Kodi für IoBroker
hash: 1OhuxWO9MIT4xrWNmR5Oi3uSr8Tluol5qvxu4WziQXU=
---
![Logo](../../../en/adapterref/iobroker.kodi/admin/kodi.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.kodi.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.kodi.svg)
![Tests](http://img.shields.io/travis/instalator/ioBroker.kodi/master.svg)
![NPM](https://nodei.co/npm/iobroker.kodi.png?downloads=true)
![Anzahl der Installationen](http://iobroker.live/badges/kodi-stable.svg)

# Kodis JSON-RPC-API für IoBroker
*** Hinweis: Dieser Adapter erfordert Node 0.12+ (daher wird 0.10 nicht unterstützt). ***

## Конфигурация KODI
Fernsteuerung aktivieren.
[Fernbedienung]. / J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J J 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90 90

_Hinweis: Die Datei advancedsettings.xml ist standardmäßig nicht vorhanden. Sie müssen es zuerst erstellen! _

```xml
<jsonrpc>
    <compactoutput>true</compactoutput>
    <tcpport>9999</tcpport>
</jsonrpc>
```

![http aktivieren.](../../../en/adapterref/iobroker.kodi/admin/web.jpg)

## Конфигурация драйвера
В найстройках драйвера указывается IP адрес KODI и порт для JSON-RPC-API (î умолчанию 9090).

## Verwenden von
### ShowNotif:
Один важный момент, если используется заголовок сообщения, то он должен всегда находится перед самим текстом сообщения (Внимание;Протечка воды), расположение остальных параметров не критично.

** Image: ** Уровень сообщения

  * 'info' - 0 (Standardeinstellung),
  * 'Warnung' - 1,
  * 'error' - 2.

** Anzeigezeit: ** Время отображения сообщения в милисекундах, минимум 1500 макс 30000 мс.

**Пример:**

 * 1; Внимание; Протечка воды; 15000
 * Внимание; Протечка воды; 2; 10000
 * Внимание;Протечка воды
 * Протечка воды

Deutsch-Russisch-Englisch-Übersetzung:

```js
sendTo("kodi.0", {
    message:  'Возможно протечка воды ', //Текст сообщения
    title:    'ВНИМАНИЕ!!!', //Заголовок сообщения
    image: 'https://raw.githubusercontent.com/instalator/ioBroker.kodi/master/admin/kodi.png', //Ссылка на иконку
    delay: 7000 //Время отображения сообщения милисекундах (минимум 1500 макс 30000 мс)
});
```

### SwitchPVR:
Переключение PVR IPTV по названию канала в плейлисте.
** Пример: ** ТВ канал - Discovery Science Entdecken Sie die neuesten Erkenntnisse,

### Youtube:
Для открытия видео с сайта youtube достаточно записать код видео в данный статус. Начиная с версии 0.1.5 и выше можно вставлять прямую ссылку на видео;
Например: Для открытия этого [видео](https://www.youtube.com/watch?v=Bvmxr24D4TA), необходимо установить в статус - Bvmxr24D4TA

### Öffnen:
Сюда записывается ссылка на медиконтент в сети интернет либо поть до локального медиа фельный.
После записи значения начнется воспроизведение на проигрователе KODI.

Position:
Е к з

### Suchen:
Текущее значение позиции воспроизведения в процентах von 0 bis 100.

### Wiederholung:
Повтор воспроизведения, принимает следующие значения:

* aus - повтор воспроизведения отключен
* ein - повтор воспроизведения текущего трека
* alle - повтор всего плейлиста

### Mischen:
Перемешивание списка треков в плейлисте для случайного воспроизведения.
Принимает значения wahr und falsch

### Abspielen:
Старт воспроизведения (wahr, falsch)

### Geschwindigkeit:
Скорость воспроизведения. Фиксированные значения -32, -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16, 32, und erhöhen das Dekrement

### Verzeichnis:
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

### System:
 - EjectOpticalDrive - Benutzerhandbuch или закрывает дисковод оптических дисков (если имеется)
 - Winterschlaf - включение спящего режима
 - Reboot - перезагрузка системы
 - Herunterfahren - выключает систему
 - Aussetzen - приостанавливает Kodi

## Changelog

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