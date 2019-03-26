---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.squeezebox/README.md
title: ioBroker Logitech Squeezebox Адаптер
hash: ekS2ohwzWNTJBxDf+mja5LYVVNoiC5NOygUYuD9GSyk=
---
![логотип](../../../en/adapterref/iobroker.squeezebox/admin/squeezebox.png)

![Количество установок](http://iobroker.live/badges/squeezebox-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.squeezebox.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.squeezebox.svg)
![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.squeezebox.svg)
![AppVeyor Статус сборки](https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-squeezebox.svg)
![GitHub вопросы](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.squeezebox.svg)

# IoBroker Logitech Squeezebox Adapter
Управляет сервером Squeezebox a.k.a. Logitech Media Server и его проигрывателями.

## Установить
Установите этот адаптер через ioBroker Admin.

1. Откройте диалоговое окно конфигурации экземпляра.
2. Введите IP-адрес или имя хоста вашего сервера Squeezebox
3. Уменьшите значение интервала обновления времени, если в вашей системе достаточно производительности.
4. Сохраните конфигурацию
5. Запустите адаптер

## Конфигурация
### Адрес сервера мультимедиа Logitech
Это IP-адрес или имя хоста вашего сервера Squeezebox.

### Порт Logitech Media Server
Это порт TCP вашего сервера Squeezebox.
Необязательно, значение по умолчанию - 9090.
Сервер должен прослушивать команды telnet на этом порту (не путайте это с веб-портом (HTTP), который всегда будет другим).

### Имя пользователя (необязательно)
Это имя пользователя вашего сервера Squeezebox.
По умолчанию это можно оставить пустым. Это необходимо, только если на вашем сервере включена защита паролем.

### Пароль (необязательно)
Это пароль вашего сервера Squeezebox.
По умолчанию это можно оставить пустым. Это необходимо, только если на вашем сервере включена защита паролем.

### Отслеживать интервал обновления времени (сек)
Каждые N секунд истекшее время воспроизведения треков обновляется.
Оставьте это на 5 секунд, если вы не используете это для визуализации.
Если вам нужно больше точности, установите его на 2 или 1 секунду.

## Состояния
Адаптер автоматически подключается к настроенному серверу Squeezebox и создает следующие состояния для каждого проигрывателя, подключенного к серверу Squeezebox.

Названия состояний форматируются следующим образом: squeezebox. & Lt; instance & gt;. & Lt; player & gt;. & Lt; state & gt;

- & lt; instance & gt; индекс экземпляра адаптера ioBroker (обычно "0")
- & lt; player & gt; это имя, которое вы дали игроку при настройке (пробелы заменены символами подчеркивания "_")
- & lt; состояние & gt; описано в следующих разделах

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .power
Логическое, чтение-запись

- true: плеер включен
- false: plyer находится в режиме ожидания

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .state
Перечисление, чтение-запись

- 0: пауза
- 1: играть
- 2: Стоп

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .volume
Целое число (0 ... 100), чтение-запись

Громкость воспроизведения от нуля (0) до максимума (100). Будьте осторожны при установке высоких значений (& gt; 50), так как это может повредить вашим ушам (или вашим близким)!

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .muting
Логическое, чтение-запись

- true: проигрыватель отключен (воспроизведение продолжается, но громкоговоритель выключен)
- false: плеер находится в обычном режиме воспроизведения

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .pathUrl
Строка, чтение-запись

URL текущей воспроизводимой (или приостановленной) песни или потока.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .currentTitle
Строка, только для чтения

Название текущей воспроизводимой (или приостановленной) песни или потока. Может быть пустым.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .currentAlbum
Строка, только для чтения

Название альбома текущей воспроизводимой (или приостановленной) песни или потока. Может быть пустым.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .currentArtist
Строка, только для чтения

Имя исполнителя текущей (или приостановленной) песни или потока. Может быть пустым.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .currentArtwork
Строка (URL), только для чтения

URL-адрес обложки для текущей воспроизводимой (или приостановленной) песни или потока. Никогда не должно быть пустым.
Если поток воспроизводится, используется его художественный URL (см. Тег CLI «songinfo» «K»).
Если URL-адрес обложки недоступен (например, для обычного MP3 от LMS), используется общая ссылка «текущая обложка плеера».
К общей ссылке обложки адаптер добавляет «случайное» число, чтобы убедиться, что URL меняется при изменении песни.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .currentDuration
Целое число, только для чтения

Общая длина в секундах текущей песни или потока.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .currentDurationText
Строка, только для чтения

Отформатированная общая длина текущей песни или потока. (Формат: «[чч:] мм: сс»)

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .elapsedTime
Целое число, только для чтения

Количество секунд, в течение которых текущая песня или поток уже были воспроизведены. Это значение обновляется каждый «интервал обновления времени отслеживания» (см. Выше «Конфигурация»)

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .elapsedTimeText
Строка, только для чтения

Отформатированное время текущей песни или потока уже воспроизведено. Это значение обновляется каждый «интервал обновления времени отслеживания» (см. Выше «Конфигурация»)

### Squeezebox. & lt; instance & gt;. & player & gt; .sleep
Целое число, чтение-запись

Количество секунд, пока игрок не засыпает.
Установите это состояние, чтобы исчезнуть и выключить игрока с заданным количеством секунд в качестве продолжительности.
Если это значение равно нулю, игрок либо выключен, либо не будет спать; в противном случае этот игрок будет спать.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .buttons.forward
Кнопка, только для записи

Переходит к следующей дорожке в списке воспроизведения.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .buttons.rewind
Кнопка, только для записи

Переход к предыдущему треку в списке воспроизведения.

### Squeezebox. & lt; instance & gt;. & lt; player & gt; .buttons.preset_ & lt; 1-6 & gt;
Кнопка, только для записи

Переключение на заданный номер предустановки, сохраненный в плеере.

## Дорожная карта / Todo
- Состояние для плейлиста [Arminhh]
- Синхронизация игроков [Арминхх]
- Управление LMS от ioBroker (например, выбрать радиостанцию из избранных) [ak1]

## Changelog
### 1.0.0 (2018-12-23)
* (mrMuppet) Fixed title error in streams and artwork.
* (mafof) Added buttons for forward/rewind and presets.
* (mafof) Added playlist path URL and sleep states.

### 0.2.1 (2017-10-08)
* (UncleSamSwiss) Fixed issue with more than 9 players (fix in logitechmediaserver package)

### 0.2.0 (2017-07-24)
* (UncleSamSwiss) Added support for optional TCP port number (default is still 9090)
* (UncleSamSwiss) Added support for optional login using username and password (by default still no authentication is used)

### 0.1.0 (2016-01-16)
* (UncleSamSwiss) Ready to be published to NPM (no further changes)

### 0.0.2 (2016-01-10)
* (UncleSamSwiss) Support for artwork (will use stream artwork if available, otherwise server artwork)

### 0.0.1 (2015-12-07)
* (UncleSamSwiss) Initial version

## License

Apache 2.0

Copyright (c) 2015 UncleSamSwiss