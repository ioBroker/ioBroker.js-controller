---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.squeezeboxrpc/README.md
title: ioBroker Logitech Squeezebox Adapter через JSON / RPC-протокол
hash: UHv5GS1FLdIKuxkNWHyEPRne5reo4FuXXuHCGhEUzn8=
---
![логотип](../../../en/adapterref/iobroker.squeezeboxrpc/admin/squeezeboxrpc.png)

![Количество установок](http://iobroker.live/badges/squeezeboxrpc-installed.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.squeezeboxrpc.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.squeezeboxrpc.svg)
![Travis](https://img.shields.io/travis/oweitman/ioBroker.squeezeboxrpc.svg)
![AppVeyor Статус сборки](https://img.shields.io/appveyor/ci/oweitman/iobroker-squeezeboxrpc.svg)
![GitHub вопросы](https://img.shields.io/github/issues/oweitman/ioBroker.squeezeboxrpc.svg)

# IoBroker Logitech Squeezebox Adapter через JSON / RPC-протокол
<!--
-->

Это альтернативный адаптер, который использует JSON / RPC-Protokoll для получения данных и отправки команд на сервер мультимедиа Logitech ([LMS](https://de.wikipedia.org/wiki/Logitech_Media_Server)) для управления подключенными устройствами, такими как

* native [squeezebox] (https://de.wikipedia.org/wiki/Squeezebox),
* raspberry pi с дополнительным аудиомодулем и небольшими прошивками на основе Linux, такими как [picoreplayer] (https://picoreplayer.org/) или [max2play] (https://www.max2play.com).
* с плагинами chromecast, airplay или UPnP / DLNA-Devices

LMS-сервер может управлять / предоставлять очень большие музыкальные коллекции на жестких дисках или NAS, подключаться к различным поставщикам потоковой передачи, таким как Spotify, Deezer, Soundcloud, shoutcast, tunein, napster, pandora, tidal и т. Д.

Почему другой адаптер squeezebox?

Существующий адаптер использует telnet для доступа к LMS. Телнет имеет некоторые недостатки.
Фактический основной веб-интерфейс LMS также использует протокол rpc / json для получения всей необходимой информации или отправки команд на сервер / проигрыватели.

## Характеристики
- большая часть данных, предоставляемых LMS-сервисом, доступна в адаптере
- подробная информация о статусе игрока, названии песни, исполнителе, альбоме, обложке, плейлисте
- множество функций управления воспроизведением, паузой, остановкой, перемоткой вперед, перемоткой назад, повтором, перемешиванием, воспроизведением избранного, переходом на время (абсолютное и относительное), переходом к индексу списка воспроизведения (абсолютное и относительное), включением / выключением и кнопками предварительной настройки.
- все избранное и все подуровни с сервера
- многие виджеты для компонента iobroker-vis включены для создания собственных пользовательских интерфейсов управления (выбор игрока, выбор избранного, управление синхронизирующими группами, кнопки воспроизведения / паузы, перемотки вперед, перемотки назад, режима повтора и выбора режима воспроизведения в случайном порядке)

Документация для vis-виджетов доступна внутри vis или [Виджет-Documentation / немецкий](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.squeezeboxrpc/blob/master/widgets/squeezeboxrpc/doc.html)

## Установка
- установить пакет
- Создать экземпляр
- Настройте экземпляр с IP-адресом медиа-сервера Logitech и портом (обычно 9000)
- запустить / перезапустить экземпляр

## Предоставленные состояния
### Сервер
| состояние | Описание |
| ----------------- | ------------------------------ |
| LastScan | метка времени последнего сканирования музыки |
| PlayerCount | Количество известных игроков |
| PlayerCountOther | Количество известных других игроков |
| PlayerCountSN | Количество известных игроков SN |
| TotalAlbums | Количество всех известных альбомов |
| TotalArtists | Количество всех известных художников |
| TotalDuration | Сумма воспроизведения всех песен |
| TotalGenres | Количество всех известных жанров |
| TotalSongs | Количество всех известных песен |
| SyncGroups | Существующие Синхронные группы |
| Версия | Версия LMS |
| Mac | MAC-ID сервера |
| UUID | UUID экземпляра LMS |

дополнительная определенная кнопка, чтобы обновить избранное

кнопка | Описание ----------------- | --------------------------------------------- getFlected | запросить все избранное с сервера

### Избранное
Для каждого любимого Все атрибуты доступны только для чтения

состояние | Описание ----------------- | ------------------------------ Имя | Имя любимых хаситемов | указывает, является ли это dir id | идентификатор любимого изображения | изображение / значок для избранного, если доступно isaudio | isaudio type | Типы примеров: ссылка, текст, аудио, URL плейлиста | URL трека

 Доступны все подуровни (подкаталоги) избранного.

### Игроки
для каждого игрока Режим показывает, можете ли вы изменить значение. предпринятые действия описаны в атрибуте

состояние | режим | Описание -------------------- | ---- | -------------------------------------------------- --- Альбом | R / - | Название текущего альбома Исполнитель | R / - | Имя исполнителя ArtworkUrl | R / - | URL к графическому изображению Битрейт | R / - | Битрейт трека Connected | R / - | состояние соединения игрока (0/1) Продолжительность | R / - | Длительность трека Жанр | R / - | жанр трека IP | R / - | IP плеера Режим | R / - | play / pause / stop Имя игрока | R / - | Имя игрока PlayerID | R / - | ID игрока Плейлист | R / - | Фактический плейлист как JSON PlaylistCurrentIndex | R / W | перейдите в абсолютную позицию, указав trackindex, или начните с относительного + или - в начале. Пример 10, -3, + 2 PlaylistRepeat | R / W | Повтор песни (1) / списка воспроизведения (2) / не повторять (0) PlaylistShuffle | R / W | список воспроизведения в случайном порядке (1) / альбом в случайном порядке (2) / не воспроизводить в случайном порядке (0) Power | R / W | получить / установить PowerState проигрывателя выкл (0) / вкл (1) RadioName | R / - | Название скорости радиостанции | R / - | Рейтинг песни Remote | R / - | Если удаленный поток (1) SyncMaster | R / - | ID / MAC Syncmaster SyncSlaves | R / - | ID / Mac игроков в синхрогруппе Время | R / - | истекшее время песни Название | R / - | название песни Тип | R / - | тип носителя (например, MP3-радио) Url | R / - | URL трека / потока Volume | R / W | получить / установить Объем игрока (0-100) состояние | R / W | получить / установить состояние воспроизведения: пауза (0), воспроизведение (1), остановка (2)

Список воспроизведения предоставляет следующие атрибуты, если они доступны в LMS.
Атрибуты Somme зависят от типа песен (поток / файл / ...). Все атрибуты доступны только для чтения.

атрибут | Описание ----------------- | -------------------------------------------------- --- Альбом | Название текущего альбома Исполнитель | Имя исполнителя ArtworkUrl | URL к обложке Битрейт | Битрейт трека Продолжительность | Длительность трека RadioName | Название скорости радиостанции | Рейтинг названия песни | название песни Тип | тип носителя (например, MP3-радио) url | URL трека / индекс потока | индекс песни в плейлисте id | идентификатор песни

дополнительные определяемые кнопки:

кнопка | Описание ----------------- | --------------------------------------------- btnForward | Следующая песня btnRewind | Предыдущая песня btnPreset_ * | 1-6 кнопок для определения в плеере или сервере cmdGeneral | общее командное поле для отправки команд игроку. каждое поле должно быть заключено в кавычки. параметры должны быть разделены запятой. Пример: "play", "1" cmdPlayFavorite | играть в избранное установить идентификатор любимого cmdPlayUrl | воспроизвести пример URL "http://50.7.77.114:8101/;" cmdGoTime | перейти к абсолютной позиции, указав количество секунд или перейти относительно + или - в начале секунд. Пример 100, -50, + 50

Для получения дополнительной информации посетите CLI-документацию:

https://github.com/elParaguayo/LMS-CLI-Documentation/blob/master/LMS-CLI.md

## Сделать
* больше тестирования / исправления
* добавление связи telnet для получения push-событий от сервера для оптимизации опроса
* добавить идентификатор в состояния Splayer
* уменьшить зависимость от других пакетов (squeezenode)
* реализовать состояние команды для размещения отдельных команд пользователя (через json) для сервера и проигрывателя
* больше настроек для опционального включения / выключения функций для улучшения памяти и производительности
* ~~ реализуйте больше функций управления (выберите плейлист pos для воспроизведения, ffwd, frew, перейти к временной позиции в песне, повторить песню, случайную песню) ~~
* ~~ добавить плейлист в playerdata как массив json ~~
* ~~ добавить обложку (station-logo / playlist-cover) для избранных ~~
* ~~ реализовать больше уровней (подкаталогов) избранного ~~
* ~~ автообнаружение медиа-сервера logitech ~~

## Changelog
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

Copyright (c) 2019 oweitman

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