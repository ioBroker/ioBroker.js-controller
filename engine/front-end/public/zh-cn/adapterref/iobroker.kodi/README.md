---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/instalator/ioBroker.kodi/edit/master//README.md
title: KODI adapter
hash: 1OhuxWO9MIT4xrWNmR5Oi3uSr8Tluol5qvxu4WziQXU=
adapter: true
license: MIT
authors: instalator
description: KODI Adapter
keywords: iobroker.kodi, vis, GUI, graphical
readme: https://github.com/instalator/ioBroker.kodi/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2016-05-22T15:47:37.487Z
version: 1.0.0
BADGE-NPM版本: https://img.shields.io/npm/v/iobroker.kodi.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.kodi.svg
BADGE-测试: http://img.shields.io/travis/instalator/ioBroker.kodi/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.kodi.png?downloads=true
BADGE-安装数量: http://iobroker.live/badges/kodi-stable.svg
---
![商标](zh-cn/adapterref/iobroker.kodi/../../../en/adapterref/iobroker.kodi/admin/kodi.png)


#Kodi的IoBroker的JSON-RPC API
***注意：此适配器需要节点0.12+（因此不支持0.10）***

##КонфигурацияKODI
远程控制启用。
！[远程控制启用。]（admin / remote.jpg）JSON-RPC APIиспользует**поумолчаниюпорт9090**，длятогочтобыегоизменитьнеобходимовнестиизменениявфайл[advancedsettings.xml](http://kodi.wiki/view/AdvancedSettings.xml)

_注意：默认情况下，advancedsettings.xml文件不存在。你必须先创建它！_

```xml
<jsonrpc>
    <compactoutput>true</compactoutput>
    <tcpport>9999</tcpport>
</jsonrpc>
```

![http启用。](zh-cn/adapterref/iobroker.kodi/../../../en/adapterref/iobroker.kodi/admin/web.jpg)

## Конфигурация драйвера
ВнайстройкахдрайверауказываетсяIPаарресKODIипортдляJSON-RPC API（поумолчанию9090）。

##使用
### ShowNotif：
Один важный момент, если используется заголовок сообщения, то он должен всегда находится перед самим текстом сообщения (Внимание;Протечка воды), расположение остальных параметров не критично.

**图片：**Уровеньсообщения

  *'info' -  0（默认），
  *'警告' -  1，
  *'错误' -  2。

** displaytime：**Времяотображениясообщениявмилисекундах，минимум1500макс30000мс。

**Пример:**

 * 1;Внимание;Протечкаводы; 15000
 *Внимание;Протечкаводы; 2; 10000
 * Внимание;Протечка воды
 * Протечка воды

Такжесообщенияможноотправлятьиздрайвераjavascript：

```js
sendTo("kodi.0", {
    message:  'Возможно протечка воды ', //Текст сообщения
    title:    'ВНИМАНИЕ!!!', //Заголовок сообщения
    image: 'https://raw.githubusercontent.com/instalator/ioBroker.kodi/master/admin/kodi.png', //Ссылка на иконку
    delay: 7000 //Время отображения сообщения милисекундах (минимум 1500 макс 30000 мс)
});
```

### SwitchPVR：
ПереключениеPVRIPTVканаловпоназваниюканалавплейлисте。
**Пример：**ТВканал - 发现科学найдеткакпополномунаименованиютакипо发现，

### Youtube：
Дляоткрытиявидеоссайтаytubeдостаточнозаписатькодвидеовданныйстатус。 Начинаясверсии0.1.5和вышеможновставлятьпрямуюссылкунавидео，атакжекодилиполнуюссылкунаплейлист。
Например：Дляоткрытияэтого[видео](https://www.youtube.com/watch?v=Bvmxr24D4TA)，необходимоустановитьвстатус -  Bvmxr24D4TA

###打开：
Сюдазаписываетсяссылканамедиконтентвсетиинтернетлибопутьдолокальногомедиафайла。
KODI，ПослезаписизначенияначнетсявоспроизведениенапроигрователеKODI。

###职位：
Текущаяпозициявплейлисте，такжевэтотстатусможнозаписатьнеобходимуюпозицуюиKODIтутжеперейдетквоспроизведениюэтойпозиции。

###寻求：
Текущеезначениепозициивоспроизведениявпроцентахот0до100。

###重复：
Повтор воспроизведения, принимает следующие значения:

*关闭 - повторвоспроизведенияотключен
*上 - повторвоспроизведениятекущеготрека
*全部 - повторвсегоплейлиста

###随机播放：
Перемешиваниеспискатрековвплейлистедляслучайноговоспроизведения。
Принимаетзначения真和假

###播放：
Стартвоспроизведения（true，false）

###速度：
Скоростьвоспроизведения。 Фиксированныезначения-32，-16，-8，-4，-2，-1,0,1,2,4,8,16,32，атакжеincrementиmentment

＃＃＃ 目录：
Сюда записывается путь до папки или диска, в ответ в этот статус записывается список каталогов указанной папки или диска.

### ActivateWindow：
Активизирует в проигрывателе окно. Поддерживает следующий список:

```
"home", "programs", "pictures", "filemanager", "files", "settings", "music", "video", "videos", "tv", "pvr", "pvrguideinfo", "pvrrecordinginfo", "pvrtimersetting", "pvrgroupmanager", "pvrchannelmanager", "pvrchannelmanager", "pvrguidesearch", "pvrchannelscan", "pvrupdateprogress", "pvrosdchannels", "pvrosdguide", "pvrosddirector", "pvrosdcutter", "pvrosdteletext", "systeminfo", "testpattern", "screencalibration", "guicalibration", "picturessettings", "programssettings", "weathersettings", "musicsettings", "systemsettings", "videossettings", "networksettings", "servicesettings", "appearancesettings", "pvrsettings", "tvsettings", "scripts", "videofiles", "videolibrary", "videoplaylist", "loginscreen", "profiles", "skinsettings", "addonbrowser", "yesnodialog", "progressdialog", "virtualkeyboard", "volumebar", "submenu", "favourites", "contextmenu", "infodialog", "numericinput", "gamepadinput", "shutdownmenu", "mutebug", "playercontrols", "seekbar", "musicosd", "addonsettings", "visualisationsettings", "visualisationpresetlist", "osdvideosettings", "osdaudiosettings", "videobookmarks", "filebrowser", "networksetup", "mediasource", "profilesettings", "locksettings", "contentsettings", "songinformation", "smartplaylisteditor", "smartplaylistrule", "busydialog", "pictureinfo", "accesspoints", "fullscreeninfo", "karaokeselector", "karaokelargeselector", "sliderdialog", "addoninformation", "musicplaylist", "musicfiles", "musiclibrary", "musicplaylisteditor", "teletext", "selectdialog", "musicinformation", "okdialog", "movieinformation", "textviewer", "fullscreenvideo", "fullscreenlivetv", "visualisation", "slideshow", "filestackingdialog", "karaoke", "weather", "screensaver", "videoosd", "videomenu", "videotimeseek", "musicoverlay", "videooverlay", "startwindow", "startup", "peripherals", "peripheralsettings", "extendedprogressdialog", "mediafilter".
```

### ExecuteAction：
Можно выполнить одно из следующих действий:

```
"left", "right", "up", "down", "pageup", "pagedown", "select", "highlight", "parentdir", "parentfolder", "back", "previousmenu", "info", "pause", "stop", "skipnext", "skipprevious", "fullscreen", "aspectratio", "stepforward", "stepback", "bigstepforward", "bigstepback", "osd", "showsubtitles", "nextsubtitle", "codecinfo", "nextpicture", "previouspicture", "zoomout", "zoomin", "playlist", "queue", "zoomnormal", "zoomlevel1", "zoomlevel2", "zoomlevel3", "zoomlevel4", "zoomlevel5", "zoomlevel6", "zoomlevel7", "zoomlevel8", "zoomlevel9", "nextcalibration", "resetcalibration", "analogmove", "rotate", "rotateccw", "close", "subtitledelayminus", "subtitledelay", "subtitledelayplus", "audiodelayminus", "audiodelay", "audiodelayplus", "subtitleshiftup", "subtitleshiftdown", "subtitlealign", "audionextlanguage", "verticalshiftup", "verticalshiftdown", "nextresolution", "audiotoggledigital", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "osdleft", "osdright", "osdup", "osddown", "osdselect", "osdvalueplus", "osdvalueminus", "smallstepback", "fastforward", "rewind", "play", "playpause", "delete", "copy", "move", "mplayerosd", "hidesubmenu", "screenshot", "rename", "togglewatched", "scanitem", "reloadkeymaps", "volumeup", "volumedown", "mute", "backspace", "scrollup", "scrolldown", "analogfastforward", "analogrewind", "moveitemup", "moveitemdown", "contextmenu", "shift", "symbols", "cursorleft", "cursorright", "showtime", "analogseekforward", "analogseekback", "showpreset", "presetlist", "nextpreset", "previouspreset", "lockpreset", "randompreset", "increasevisrating", "decreasevisrating", "showvideomenu", "enter", "increaserating", "decreaserating", "togglefullscreen", "nextscene", "previousscene", "nextletter", "prevletter", "jumpsms2", "jumpsms3", "jumpsms4", "jumpsms5", "jumpsms6", "jumpsms7", "jumpsms8", "jumpsms9", "filter", "filterclear", "filtersms2", "filtersms3", "filtersms4", "filtersms5", "filtersms6", "filtersms7", "filtersms8", "filtersms9", "firstpage", "lastpage", "guiprofile", "red", "green", "yellow", "blue", "increasepar", "decreasepar", "volampup", "volampdown", "channelup", "channeldown", "previouschannelgroup", "nextchannelgroup", "leftclick", "rightclick", "middleclick", "doubleclick", "wheelup", "wheeldown", "mousedrag", "mousemove", "noop".

```

###系统：
  -  EjectOpticalDrive  - Извлекаетилизакрываетдисководоптическихдисков（еслиимеется）
  -  Hibernate  - включениеспящегорежима
  - 重新启动 - перезагрузкасистемы
  - 关机 - выключаетсистему
  - 暂停 - приостанавливаетKodi

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