---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech Squeezebox Adapter по протоколу JSON / RPC
hash: qKPsRUM5+1VQuVVtnDRARZTTlf1qsUsPvAGN0hZljgE=
---
![Логотип](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![Количество установок](http://iobroker.live/badges/squeezeboxrpc-installed.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Трэвис](https://img.shields.io/travis/oweitman/ioBroker.squeezeboxrpc.svg)
![Статус сборки AppVeyor](https://img.shields.io/appveyor/ci/oweitman/iobroker-squeezeboxrpc.svg)
![Проблемы с GitHub](https://img.shields.io/github/issues/oweitman/ioBroker.squeezeboxrpc.svg)

# IoBroker Адаптер Logitech Squeezebox по протоколу JSON / RPC
Это альтернативный адаптер, который использует JSON / RPC-Protokoll для получения данных и отправки команд на Logitech Media Server ([LMS](https://de.wikipedia.org/wiki/Logitech_Media_Server)) для управления подключенными устройствами, например

* родной [squeezebox] (https://de.wikipedia.org/wiki/Squeezebox),
* Raspberry Pi с дополнительным аудиомодулем и небольшими прошивками на базе Linux, такими как [picoreplayer] (https://picoreplayer.org/) или [max2play] (https://www.max2play.com).
* с плагинами chromecast, airplay или UPnP / DLNA-Devices

LMS-сервер может управлять / предоставлять очень большие музыкальные коллекции на жестких дисках или NAS, подключаться к различным поставщикам потоковой передачи, таким как Spotify, Deezer, Soundcloud, shoutcast, tunein, napster, pandora, tidal и т. Д.

Зачем нужен еще один адаптер squeezebox?

Существующий адаптер использует telnet для доступа к LMS. У телнета есть недостатки.
Фактический основной веб-интерфейс LMS также использует протокол rpc / json для получения всей необходимой информации или отправки команд на сервер / игроков.

## Характеристики
- большая часть данных, которые предоставляет LMS-Service, доступна в адаптере
- подробная информация о статусе плеера, название песни, исполнитель, альбом, обложка, плейлист
- множество функций управления для воспроизведения, паузы, остановки, вперед, перемотки назад, повтора, случайного воспроизведения, воспроизведения в избранном, перехода по времени (абсолютного и относительного), перехода к индексу списка воспроизведения (абсолютного и относительного), включения / выключения питания и кнопок предварительной настройки
- все избранное и все подуровни с сервера
- многие виджеты для компонента iobroker-vis включены для создания собственных пользовательских интерфейсов управления (выбор игрока, выбор избранного, управление группами синхронизации, кнопки для воспроизведения / паузы, перехода вперед, назад, режима повтора и выбора режима случайного воспроизведения)

Документация для виджетов vis доступна внутри vis или [Виджет-Документация / немецкий](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.squeezeboxrpc/blob/master/widgets/squeezeboxrpc/doc.html).

## Установка
- Установить пакет
- Создать экземпляр
- Настройте экземпляр с IP-адресом медиа-сервера logitech и портом (normal 9000)
- запустить / перезапустить экземпляр

## Обновить
- после изменения кода виджета и обновления адаптера iobroker должен загрузить веб-файлы на внутренний веб-сервер. Пользователь сообщил, что иногда этого не происходило или происходило с задержкой. вы можете запустить это действие с помощью следующей команды

iobroker загрузить squeezeboxpc

## Предоставленные состояния
### Сервер
| состояние | Описание |
| ----------------- | ------------------------------ |
| LastScan | отметка времени последнего сканирования музыки |
| PlayerCount | Количество известных игроков |
| PlayerCountOther | Количество известных других игроков |
| PlayerCountSN | Количество известных игроков SN |
| TotalAlbums | Количество всех известных альбомов |
| TotalArtists | Количество всех известных художников |
| TotalDuration | Суммарное время воспроизведения всех песен |
| TotalGenres | Количество всех известных жанров |
| TotalSongs | Количество всех известных песен |
| SyncGroups | Существующие группы синхронизации |
| Версия | Версия LMS |
| mac | MAC-ID сервера |
| uuid | uuid LMS-экземпляра |

дополнительная определенная кнопка для обновления избранного

кнопка | Описание ----------------- | --------------------------------------------- getFavorites | запросить все избранное с сервера

### Избранное
Для каждого избранного Все атрибуты доступны только для чтения

состояние | Описание ----------------- | ------------------------------ Имя | Название избранных хэшей | указывает, является ли это идентификатором каталога | id любимого изображения | изображение / значок избранного, если доступно isaudio | тип isaudio | Примеры типов: ссылка, текст, аудио, URL плейлиста | URL трека

 Доступны все подуровни (подкаталоги) избранного.

### Игроки
для каждого игрока Режим показывает, можете ли вы изменить значение. предпринятые действия описаны в атрибуте

состояние | режим | Описание -------------------- | ---- | -------------------------------------------------- --- Тревоги | R / - | Все зарегистрированные будильники для этого проигрывателя как JSON Album | R / - | Название текущего альбома Исполнитель | R / - | Имя художника ArtworkUrl | R / - | URL битрейта произведения искусства | R / - | Битрейт трека Connected | R / - | состояние подключения игрока (0/1) Продолжительность | R / - | Продолжительность трека Жанр | R / - | жанр трека IP | R / - | IP плеера Mode | R / - | воспроизведение / пауза / остановка Имя игрока | R / - | Имя игрока PlayerID | R / - | Плейлист ID игрока | R / - | Фактический список воспроизведения в формате JSON PlaylistCurrentIndex | R / W | перейти к абсолютной позиции, указав trackindex, или перейти к относительной позиции с + или - в начале. Пример 10, -3, + 2 PlaylistRepeat | R / W | Повтор песни (1) / список воспроизведения (2) / не повторять (0) PlaylistShuffle | R / W | перемешать плейлист (1) / перемешать альбом (2) / не перемешивать (0) Power | R / W | получить / установить состояние питания проигрывателя выключено (0) / включено (1) RadioName | R / - | Название радиостанции Ставка | R / - | Рейтинг песни Remote | R / - | Если удаленный поток (1) SyncMaster | R / - | ID / MAC-адрес Syncmaster SyncSlaves | R / - | ID / Mac игроков в Syncgroup Time | R / - | истекшее время песни Название | R / - | название песни Тип | R / - | тип носителя (например, MP3-радио) URL | R / - | URL трека / потока Volume | R / W | получить / установить Громкость плеера (0-100) состояние | R / W | получить / установить состояние воспроизведения: пауза (0), воспроизведение (1), остановка (2)

Список воспроизведения содержит следующие атрибуты, если они доступны в LMS.
Атрибуты Somme зависят от типа песен (поток / файл / ...) Все атрибуты доступны только для чтения

атрибут | Описание ----------------- | -------------------------------------------------- --- Альбом | Название текущего альбома Исполнитель | Имя художника ArtworkUrl | URL битрейта художественного произведения | Битрейт трека Продолжительность | Продолжительность трека RadioName | Название радиостанции Ставка | Рейтинг названия песни | название песни Тип | тип носителя (например, MP3-радио) url | URL индекса трека / потока | индекс песни в плейлисте id | id песни

дополнительные определенные кнопки:

кнопка | Описание ----------------- | --------------------------------------------- btnForward | Следующая песня btnRewind | Предыдущая песня btnPreset_ * | 1-6 кнопок для определения в плеере или сервере cmdGeneral | общее командное поле для отправки команд игроку. каждое поле должно быть заключено в кавычки. параметры необходимо разделять запятыми. Пример: «play», «1» cmdPlayFavorite | для воспроизведения избранного установите идентификатор избранного cmdPlayUrl | для воспроизведения URL-примера "http://50.7.77.114:8101/;" cmdGoTime | перейти в абсолютную позицию, указав количество секунд, или перейти в относительную позицию с помощью + или - в начале секунд. Пример 100, -50, + 50

Для получения дополнительной информации посетите CLI-документацию:

https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md

## Делать
* больше тестирования / исправления
* уменьшить зависимости от других пакетов (squeezenode)
* дополнительные настройки для включения / выключения функций для улучшения памяти и производительности
* добавить виджет плейлиста
* добавить виджет просмотра для просмотра в LMS-меню
* добавить виджет с круглой ручкой, управляемый игроком
* прекратить воспроизведение, если снова нажать кнопку «Избранное».
* cmdGeneral für Server.
* ~~ добавить связь по telnet для получения push-событий с сервера для оптимизации опроса ~~
* ~~ реализовать состояние команды для размещения индивидуальных команд пользователя (через json) для сервера и игрока ~~
* ~~ реализовать дополнительные функции управления (выбор позиции списка воспроизведения для воспроизведения, ffwd, frew, переход к временной позиции в песне, повтор песни, случайная песня) ~~
* ~~ добавить плейлист в playerdata как массив json ~~
* ~~ добавить обложку (логотип станции / обложку для плейлиста) в избранное ~~
* ~~ реализовать больше уровней (подкаталогов) избранного ~~
* ~~ автообнаружение logitech media server ~~

## Changelog
### 1.2.1
* fix small issue in last version
### 1.2.0
* improve handling of imageproxy artwork
### 1.1.0
* make request of favorites configurable
### 1.0.1
 * change setstate/createobject logic
 * fix role and type for Mode-state
 * update tests
 * update dependency versions
 * improve io-package.json
### 1.0.0
 * prepare for stable repository
### 0.8.32
 * the adapter function iobroker.deleteChannel didnt works as expected. it didnt delete the whole subtree of states. now i implement my own delete function 
### 0.8.31
 * change behaviour of deleting favorites
### 0.8.30
 * change from the issue of the adapter checker
### 0.8.29
 * optimize handling of player state power and connected
### 0.8.28
 * add advanced signaling function with telnet and fix some more authorization issues with LMS
### 0.8.27
 * initialization for the new calctype property if empty in volumebar
### 0.8.26
 * more improvement and fixing at volumebar / remove playlist widget from master. not ready yet
### 0.8.25
 * fixing css-settings on volumebar
### 0.8.24
 * volumebar didnt get events between the segments, change clickevent and calculation
### 0.8.23
 * adjust dependencies to remove vulnerabilities in dependend packages. alos remove travis due of unresolvable build-failures for win+node10/12
### 0.8.22
 * due to iobroker.controller 2.0 a command in the api changed (socket to vis.conn._socket)
### 0.8.21
 * add command für playing urls
### 0.8.20
 * remove node v6 test setting
### 0.8.19
 * shorten news history
### 0.8.18 (2019-06-27)
* last minute changes.
### 0.8.17 (2019-06-26)
* add more widges: playtime bar, string, number, datetime, image. add button margin to player and favorite widget, improve editing of viewindex. do some refactoring.
### 0.8.16 (2019-06-24)
* resolve a cross browser issue for firefox. the style.font attribute is empty and you have to construct the font string by yourself
### 0.8.15 (2019-06-19)
* minor issue with not ready states
### 0.8.14 (2019-06-19)
* add syncgroups as new server-datapoint,add syncgroup widget, change some jquery event logic
### 0.8.13 (2019-06-16)
* rename widgetset from squeezeboxrpcwidgets to squeezeboxrpc
### 0.8.12 (2019-06-16)
* sync version with npm
### 0.8.11 (2019-06-15)
* try to integrate the widgets into the main adapter
### 0.8.10 (2019-05-15)
* another try to fix the EADDRINUSE error of the server discovery
### 0.8.9 (2019-05-15)
* try to fix the EADDRINUSE error of the server discovery
### 0.8.8 (2019-05-14)
* make discover configurable
### 0.8.7 (2019-05-11)
* more control features (select playlist pos to play,ffwd,frew,jump to a time position in song,repeat song,random song)
### 0.8.6 (2019-05-10)
* move some configuration options into seperate tabs
### 0.8.5 (2019-05-08)
* change serverdiscovery interval method, remove some double cmd lines, additional minor changes advised from eslint
### 0.8.4
* move some files to lib directory
### 0.8.3
* close port for discovery on unload
### 0.8.2
* sync version with npm
### 0.8.1
* set compact mode flag
### 0.8.0
* implementation of compact mode, change version to represent a realistic feature completness
### 0.0.9
* debug options are now configurable
### 0.0.8
* More playlist attributes + remove trailing and leading spaces from source
### 0.0.7
* Add the playlist to each player as json
### 0.0.6
* More config options
### 0.0.5
* All levels/subdirectories of favorites are now available in iobroker
### 0.0.4
* added the cmdPlayFavorite for each player
### 0.0.3
* repair the no-data symbols for buttons in vis
### 0.0.2
* added autodiscovery
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2019-2020 oweitman

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