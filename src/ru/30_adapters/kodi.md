
## <span id="i-2">Информация</span>


## Описание

Kodi — бесплатный кроссплатформенный медиаплеер и программное обеспечение для организации HTPC (_<span lang="en" xml:lang="en">Home Theatre Personal Computer)</span>_ с открытым исходным кодом. Простыми словами это медиа-центр для воспроизведения видео, музыки, картинок, игр и многое другое из локальных, сетевых источников, а так же из сети интернет. Официальная документация Kodi JSON-RPC API находится [здесь](http://kodi.wiki/view/JSON-RPC_API), а полный список доступных команд (для протокола версии 6) можно посмотреть на этой [странице](http://kodi.wiki/view/JSON-RPC_API/v6).

### Поддерживаемые платформы

<table style="height: 65px;" width="578">

<tbody>

<tr>

<td style="width: 89px; text-align: center;">![](http://www.iobroker.net/wp-content/uploads//DL_Icons_Windows-new.png)</td>

<td style="width: 89px; text-align: center;">![](http://www.iobroker.net/wp-content/uploads//DL_Icons_Linux-new.png)</td>

<td style="width: 90px; text-align: center;">![](http://www.iobroker.net/wp-content/uploads//DL_Icons_RaspberryPi-new.png)</td>

<td style="width: 90px; text-align: center;">![](http://www.iobroker.net/wp-content/uploads//DL_Icons_Android-new.png)</td>

<td style="width: 90px; text-align: center;">![](http://www.iobroker.net/wp-content/uploads//DL_Icons_Apple_iOS-new.png)</td>

<td style="width: 90px; text-align: center;">![](http://www.iobroker.net/wp-content/uploads//DL_Icons_Apple-new.png)</td>

</tr>

<tr>

<td style="width: 89px; text-align: center;">**Windows**</td>

<td style="width: 89px; text-align: center;">**Linux**</td>

<td style="width: 90px; text-align: center;">**Raspberry Pi**</td>

<td style="width: 90px; text-align: center;">**Android**</td>

<td style="width: 90px; text-align: center;">**iOS (jailbroken)**</td>

<td style="width: 90px; text-align: center;">**Mac OS X**</td>

</tr>

</tbody>

</table>

Скачать kodi для вашей платформы можно на официальном [сайте](https://kodi.tv/download/).

## <span id="i-2"></span>Настройка Kodi

После установки проигрывателя Kodi, его необходимо настроить для возможности управления проигрывателем через драйвер kodi. В меню **Настройки** - **Службы** - **Удаленное управление** активируем два чек бокса:![](http://www.iobroker.net/wp-content/uploads//kodi_jarvis.png) По умолчанию JSON-RPC API использует порт **9090**, для того чтобы его изменить необходимо внести изменения в файл [advancedsettings.xml](http://kodi.wiki/view/AdvancedSettings.xml)*.  добавив в него следующие настройки:

<pre class="lang:default decode:true"><jsonrpc>
    <compactoutput>true</compactoutput>
    <tcpport>9999</tcpport> //9999 это нужный вам порт
</jsonrpc></pre>

> * Изначально этого файла у вас нет и  его необходимо сначала создать.

Для возможности отображения картинок в IoBroker необходимо включить **Удаленное управление по HTTP**.![](http://www.iobroker.net/wp-content/uploads//kodi_jarvis2.png) В Kodi v17.0 "Krypton" эти настройки находятся на одном экране: [![](http://www.iobroker.net/wp-content/uploads//kodi_krypt.png)](http://www.iobroker.net/wp-content/uploads//kodi_krypt.png)  

## Настройка драйвера

Окно настроек драйвера: ![](http://www.iobroker.net/wp-content/uploads//kodi_set.png) **IP адрес KODI**: IP Kodi в вашей сети **Порт jsonrpc**: порт для JSON-RPC API (по-умолчанию kodi использует порт **9090**) **Port Webserver KODI**: порт подключения к веб серверу Kodi **Логин**: логин для подключения к веб серверу Kodi **Пароль**: пароль для подключения к веб серверу Kodi После нажатия кнопки сохранить, драйвер перезапускается с новыми параметрами и если драйвер настроен верно и установлено соединение с Kodi, то индикатор состояния (значок) слева от названия инстанции драйвера (kodi.0) будет **зеленый**. Если он **желтый** (kodi.1) то это означает, что драйвер запущен, но не установлено соединение с Kodi. ![](http://www.iobroker.net/wp-content/uploads//kodi_set2.png)

## Использование

<table>

<tbody>

<tr style="height: 24px;">

<td style="width: 135px; text-align: center; height: 24px;">Объект</td>

<td style="width: 130px; text-align: center; height: 24px;">Назначение</td>

<td style="width: 919px; text-align: center; height: 24px;">Описание</td>

</tr>

<tr style="height: 392px;">

<td style="width: 135px; height: 392px;">youtube</td>

<td style="width: 130px; height: 392px;">Для открытия видео с сайта youtube.</td>

<td style="width: 919px; height: 392px;">При записи в этот объект ссылки на видео с сайта youtube, kodi останавливает текущее воспроизведение, и запускает на воспроизведение видео по ссылке:

<pre class="lang:default decode:true">https://www.youtube.com/watch?v=Bvmxr24D4TA</pre>

Так же можно открывать плейлисты youtube видео:

<pre class="lang:default decode:true">https://www.youtube.com/watch?v=lngFnEqFKj8&list=PLClwfs4Slb6Fr4kAQnIoizVvi_cu19hQk</pre>

Можно так же передавать не полную ссылку, а только код видео:

<pre class="lang:default decode:true">Bvmxr24D4TA</pre>

или плейлиста:

<pre class="lang:default decode:true">PLClwfs4Slb6Fr4kAQnIoizVvi_cu19hQk</pre>

</td>

</tr>

<tr style="height: 752px;">

<td style="width: 135px; height: 752px;"> ShowNotif</td>

<td style="width: 130px; height: 752px;"> Отображение всплывающего сообщения на экране Kodi</td>

<td style="height: 752px;"> **Формат сообщения:** Полный формат:

<pre class="lang:default decode:true ">1;Заголовок;Текст сообщения;15000</pre>

где 1 - это **image** (стандартная иконка), 15000 - **displaytime** (время отображения в миллисекундах).

<pre class="lang:default decode:true ">Заголовок;Текст сообщения;2;10000</pre>

где 2 - это **image**, 10000 - **displaytime** . Формат - Заголовок, текст, без картинки. Время отображения 5000 миллисекунд:

<pre class="lang:default decode:true">Заголовок;Текст сообщения
</pre>

Формат - простой текст, без заголовков и картинок:

<pre class="lang:default decode:true">Текст сообщения</pre>

**image:** Стандартная иконка для отображения уровня сообщения:

*   'info' - **0** (default),
*   'warning' - **1**,
*   'error' - **2**.

**displaytime:** Время отображения сообщения в милисекундах, минимум 1500 макс 30000 мс. Так же сообщения можно отправлять из драйвера javascript:

<pre class="lang:javascript decode:true">sendTo("kodi.0", {
    message:  'Возможно протечка воды ', 
//Текст сообщения
    title:    'ВНИМАНИЕ!!!',
 //Заголовок сообщения
    image: 'https://raw.githubusercontent.com/instalator/ioBroker.kodi/master/admin/kodi.png',
 //Ссылка на иконку
    delay: '7000' 
//Время отображения сообщения миллисекундах (минимум 1500 макс 30000 мс)
});</pre>

**Важно**:_ Если используется заголовок сообщения, то он должен всегда находится перед самим текстом сообщения (Внимание;Протечка воды), расположение остальных параметров не критично. _</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">SwitchPVR</td>

<td style="width: 130px; height: 24px;">Переключение PVR IPTV каналов по названию канала в плейлисте.</td>

<td style="width: 919px; height: 24px;">При записи значения в объект, драйвер ищет в плейлисте (объект **pvr.playlist_tv**) совпадения и если находит то включает найденный канал из плейлиста. Поиск регистронезависимый и ищет все вхождения в строке названия канала. Например: ТВ канал - **Discovery Science** найдет как по полному наименованию так и по **discover**, но если при поиске по ключевой фразе **discover** первым в списке окажется канал **Discovery HD**, то включится именно он.</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;"> Open</td>

<td style="width: 130px; height: 24px;"> Начинает воспроизведение файла по указанной ссылке</td>

<td style="width: 919px; height: 24px;">Ссылка может быть как на локальный файл (путь до файла), так и URL на файл или поток в сети интернет.</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">Position</td>

<td style="width: 130px; height: 24px;"> Текущая позиция в плейлисте</td>

<td style="width: 919px; height: 24px;"> В этот объект можно записать необходимый номер позиции(трека) текущего плейлиста и Kodi тут же перейдет к воспроизведению этого трека.</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">Speed</td>

<td style="width: 130px; height: 24px;"> Скорость воспроизведения</td>

<td style="width: 919px; height: 24px;"> Фиксированные значения -32, -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16, 32, а также increment и decrement</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">Directory</td>

<td style="width: 130px; height: 24px;"> Содержимое каталога</td>

<td style="width: 919px; height: 24px;"> Сюда записывается путь до папки или диска, в ответ в этот статус записывается JSON объект со списком каталогов и файлов указанной папки или диска. Используется для навигации по каталогу. Пример реализации можно посмотреть в VIS виджете **winamp browser** из группы виджетов [ioBroker.vis-players](http://www.iobroker.net/?page_id=6489&lang=ru)</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">ActivateWindow</td>

<td style="width: 130px; height: 24px;"> Активизирует в проигрывателе окно.</td>

<td style="width: 919px; height: 24px;">Список названий вызываемых окон: "home", "programs", "pictures", "filemanager", "files", "settings", "music", "video", "videos", "tv", "pvr", "pvrguideinfo", "pvrrecordinginfo", "pvrtimersetting", "pvrgroupmanager", "pvrchannelmanager", "pvrchannelmanager", "pvrguidesearch", "pvrchannelscan", "pvrupdateprogress", "pvrosdchannels", "pvrosdguide", "pvrosddirector", "pvrosdcutter", "pvrosdteletext", "systeminfo", "testpattern", "screencalibration", "guicalibration", "picturessettings", "programssettings", "weathersettings", "musicsettings", "systemsettings", "videossettings", "networksettings", "servicesettings", "appearancesettings", "pvrsettings", "tvsettings", "scripts", "videofiles", "videolibrary", "videoplaylist", "loginscreen", "profiles", "skinsettings", "addonbrowser", "yesnodialog", "progressdialog", "virtualkeyboard", "volumebar", "submenu", "favourites", "contextmenu", "infodialog", "numericinput", "gamepadinput", "shutdownmenu", "mutebug", "playercontrols", "seekbar", "musicosd", "addonsettings", "visualisationsettings", "visualisationpresetlist", "osdvideosettings", "osdaudiosettings", "videobookmarks", "filebrowser", "networksetup", "mediasource", "profilesettings", "locksettings", "contentsettings", "songinformation", "smartplaylisteditor", "smartplaylistrule", "busydialog", "pictureinfo", "accesspoints", "fullscreeninfo", "karaokeselector", "karaokelargeselector", "sliderdialog", "addoninformation", "musicplaylist", "musicfiles", "musiclibrary", "musicplaylisteditor", "teletext", "selectdialog", "musicinformation", "okdialog", "movieinformation", "textviewer", "fullscreenvideo", "fullscreenlivetv", "visualisation", "slideshow", "filestackingdialog", "karaoke", "weather", "screensaver", "videoosd", "videomenu", "videotimeseek", "musicoverlay", "videooverlay", "startwindow", "startup", "peripherals", "peripheralsettings", "extendedprogressdialog", "mediafilter".</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">ExecuteAction</td>

<td style="width: 130px; height: 24px;">Выполняет указанную команду</td>

<td style="width: 919px; height: 24px;">Можно выполнить одно из следующих действий: "left", "right", "up", "down", "pageup", "pagedown", "select", "highlight", "parentdir", "parentfolder", "back", "previousmenu", "info", "pause", "stop", "skipnext", "skipprevious", "fullscreen", "aspectratio", "stepforward", "stepback", "bigstepforward", "bigstepback", "osd", "showsubtitles", "nextsubtitle", "codecinfo", "nextpicture", "previouspicture", "zoomout", "zoomin", "playlist", "queue", "zoomnormal", "zoomlevel1", "zoomlevel2", "zoomlevel3", "zoomlevel4", "zoomlevel5", "zoomlevel6", "zoomlevel7", "zoomlevel8", "zoomlevel9", "nextcalibration", "resetcalibration", "analogmove", "rotate", "rotateccw", "close", "subtitledelayminus", "subtitledelay", "subtitledelayplus", "audiodelayminus", "audiodelay", "audiodelayplus", "subtitleshiftup", "subtitleshiftdown", "subtitlealign", "audionextlanguage", "verticalshiftup", "verticalshiftdown", "nextresolution", "audiotoggledigital", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "osdleft", "osdright", "osdup", "osddown", "osdselect", "osdvalueplus", "osdvalueminus", "smallstepback", "fastforward", "rewind", "play", "playpause", "delete", "copy", "move", "mplayerosd", "hidesubmenu", "screenshot", "rename", "togglewatched", "scanitem", "reloadkeymaps", "volumeup", "volumedown", "mute", "backspace", "scrollup", "scrolldown", "analogfastforward", "analogrewind", "moveitemup", "moveitemdown", "contextmenu", "shift", "symbols", "cursorleft", "cursorright", "showtime", "analogseekforward", "analogseekback", "showpreset", "presetlist", "nextpreset", "previouspreset", "lockpreset", "randompreset", "increasevisrating", "decreasevisrating", "showvideomenu", "enter", "increaserating", "decreaserating", "togglefullscreen", "nextscene", "previousscene", "nextletter", "prevletter", "jumpsms2", "jumpsms3", "jumpsms4", "jumpsms5", "jumpsms6", "jumpsms7", "jumpsms8", "jumpsms9", "filter", "filterclear", "filtersms2", "filtersms3", "filtersms4", "filtersms5", "filtersms6", "filtersms7", "filtersms8", "filtersms9", "firstpage", "lastpage", "guiprofile", "red", "green", "yellow", "blue", "increasepar", "decreasepar", "volampup", "volampdown", "channelup", "channeldown", "previouschannelgroup", "nextchannelgroup", "leftclick", "rightclick", "middleclick", "doubleclick", "wheelup", "wheeldown", "mousedrag", "mousemove", "noop".</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">CleanAudioLibrary</td>

<td style="width: 130px; height: 24px;">Очистка аудио библиотеки</td>

<td style="width: 919px; height: 24px;"> При записи значения происходит очистка аудио библиотеки</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">CleanVideoLibrary</td>

<td style="width: 130px; height: 24px;">Очистка видео библиотеки</td>

<td style="width: 919px; height: 24px;">При записи значения происходит очистка видео библиотеки</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;"> ScanAudioLibrary</td>

<td style="width: 130px; height: 24px;"> Сканирование аудио библиотеки</td>

<td style="width: 919px; height: 24px;">При записи значения начинается сканирование и обновление аудио библиотеки</td>

</tr>

<tr style="height: 24.3438px;">

<td style="width: 135px; height: 24.3438px;"> ScanVideoLibrary</td>

<td style="width: 130px; height: 24.3438px;"> Сканирование видео библиотеки</td>

<td style="width: 919px; height: 24.3438px;"> При записи значения начинается сканирование и обновление видео библиотеки</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;"> add</td>

<td style="width: 130px; height: 24px;"> Добавляет в текущий плейлист файлы из папок</td>

<td style="width: 919px; height: 24px;"> Записываемое значение представляет собой путь до папки или файла. При добавлении папки в плейлист добавятся все файлы включая вложенные папки.</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;">clear</td>

<td style="width: 130px; height: 24px;">Очистить текущий плейлист</td>

<td style="width: 919px; height: 24px;"> Очищает текущий плейлист.</td>

</tr>

<tr style="height: 24px;">

<td style="width: 135px; height: 24px;"> Input.*</td>

<td style="width: 130px; height: 24px;"> Навигация по GUI</td>

<td style="width: 919px; height: 24px;">

*   Back - возврат на предыдущий экран в меню
*   ContextMenu - вызывает контекстное меню (аналогично нажатию правой клавиши мыши)
*   Down - навигация вниз
*   ExecuteAction - аналогично оьбъекту ExecuteAction
*   Home - На главный экран
*   Info - вызывает окно информации
*   Left - навигация влево
*   Right -навигация вправо
*   Select - выбор/подтверждение действия
*   SendText - отправляет текст, например в окно поиска. (unicode)
*   ShowCodec - отображает кодек воспроизводимого файла
*   ShowOSD - отображает OSD
*   Up - навигация вверх

</td>

</tr>

</tbody>

</table>

  **Таблица стандартных ролей для медиапроигрывателей и соответствующих им объектов:**

<table dir="ltr" style="width: 100%; height: 1766px;" border="1" cellspacing="0" cellpadding="0">

<thead>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px; text-align: center;">Роль</td>

<td style="width: 105px; height: 24px; text-align: center;">common.type</td>

<td style="width: 366px; height: 24px; text-align: center;">Комментарий</td>

<td style="width: 137px; height: 24px; text-align: center;">Объект Kodi</td>

</tr>

</thead>

<colgroup><col width="225"> <col width="113"> <col width="105"> <col width="138"> <col width="128"> <col width="146"> <col width="144"></colgroup>

<tbody>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">button.stop</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">only write</td>

<td style="width: 137px; height: 24px;">stop</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">button.play</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">only write</td>

<td style="width: 137px; height: 24px;">play</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">button.next</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">only write</td>

<td style="width: 137px; height: 24px;">next</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">button.prev</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">only write</td>

<td style="width: 137px; height: 24px;">previous</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">button.pause</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">only write</td>

<td style="width: 137px; height: 24px;">pause</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">level.volume</td>

<td style="width: 105px; height: 24px;">number</td>

<td style="width: 366px; height: 24px;">[0-100]</td>

<td style="width: 137px; height: 24px;">volume</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.seek</td>

<td style="width: 105px; height: 24px;">number</td>

<td style="width: 366px; height: 24px;">%</td>

<td style="width: 137px; height: 24px;">seek</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.mode.shuffle</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">read/write</td>

<td style="width: 137px; height: 24px;">shuffle</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.mode.repeat</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">read/write</td>

<td style="width: 137px; height: 24px;">repeat</td>

</tr>

<tr style="height: 15px;">

<td style="width: 154px; height: 15px;">media.state</td>

<td style="width: 105px; height: 15px;">string / boolean</td>

<td style="width: 366px; height: 15px;">[play,stop,pause] or [true/false]</td>

<td style="width: 137px; height: 15px;">state</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.artist</td>

<td style="width: 105px; height: 24px;">string</td>

<td style="width: 366px; height: 24px;"></td>

<td style="width: 137px; height: 24px;">info.artist</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.album</td>

<td style="width: 105px; height: 24px;">string</td>

<td style="width: 366px; height: 24px;"></td>

<td style="width: 137px; height: 24px;">info.album</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.title</td>

<td style="width: 105px; height: 24px;"></td>

<td style="width: 366px; height: 24px;"></td>

<td style="width: 137px; height: 24px;">info.title</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.cover</td>

<td style="width: 105px; height: 24px;">string  (URL)</td>

<td style="width: 366px; height: 24px;"></td>

<td style="width: 137px; height: 24px;">info.thumbnail</td>

</tr>

<tr style="height: 17px;">

<td style="width: 154px; height: 17px;">media.duration.text</td>

<td style="width: 105px; height: 17px;">string (optional)</td>

<td style="width: 366px; height: 17px;">e.g "2:35"</td>

<td style="width: 137px; height: 17px;">playing_time_total</td>

</tr>

<tr style="height: 16px;">

<td style="width: 154px; height: 16px;">media.elapsed.text</td>

<td style="width: 105px; height: 16px;">string (optional)</td>

<td style="width: 366px; height: 16px;">e.g "1:30"</td>

<td style="width: 137px; height: 16px;">playing_time</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.mute</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">read/write</td>

<td style="width: 137px; height: 24px;">mute</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.bitrate</td>

<td style="width: 105px; height: 24px;">number</td>

<td style="width: 366px; height: 24px;">kbps</td>

<td style="width: 137px; height: 24px;">bitrate</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.genre</td>

<td style="width: 105px; height: 24px;">string</td>

<td style="width: 366px; height: 24px;">genre song</td>

<td style="width: 137px; height: 24px;">info.genre</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.track</td>

<td style="width: 105px; height: 24px;">number</td>

<td style="width: 366px; height: 24px;">current play track id [0 - ~]</td>

<td style="width: 137px; height: 24px;">position</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.playid</td>

<td style="width: 105px; height: 24px;">number</td>

<td style="width: 366px; height: 24px;">play track id</td>

<td style="width: 137px; height: 24px;">playid</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.add</td>

<td style="width: 105px; height: 24px;">string (path)</td>

<td style="width: 366px; height: 24px;">add current playlist</td>

<td style="width: 137px; height: 24px;">add</td>

</tr>

<tr style="height: 24px;">

<td style="width: 154px; height: 24px;">media.clear</td>

<td style="width: 105px; height: 24px;">boolean</td>

<td style="width: 366px; height: 24px;">clear current playlist</td>

<td style="width: 137px; height: 24px;">clear</td>

</tr>

<tr style="height: 230px;">

<td style="width: 154px; height: 230px;">media.playlist</td>

<td style="width: 105px; height: 230px;">string</td>

<td style="width: 366px; height: 230px;">

<pre class="lang:javascript decode:true">[{
     "artist": "",
     "album": "",
     "bitrate":0,
     "title": "",
     "file": "",
     "genre": "",
     "year": 0,
     "len": "00:00",
     "rating": "",
     "cover": ""
}]</pre>

</td>

<td style="width: 137px; height: 230px;">playlist</td>

</tr>

<tr style="height: 416.438px;">

<td style="width: 154px; height: 416.438px;">media.browser</td>

<td style="width: 105px; height: 416.438px;">string</td>

<td style="width: 366px; height: 416.438px;">

<pre class="lang:javascript decode:true">"files": [
  {
     "fanart": "",
     "file": "path",
     "filetype": "directory or file",
     "label": "",
     "lastmodified": "",
     "mimetype": "",
     "size": 0,
     "thumbnail": "",
     "title": "",
     "type": "",
     "lastmodified": "2016-02-27 16:05:46",
     "time": "time in sec",
     "track": "number",
     "date": "year",
     "artist": "artist",
     "album": "album",
     "genre": "genre"
   }
]</pre>

</td>

<td style="width: 137px; height: 416.438px;">Directory</td>

</tr>

</tbody>

</table>