---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/stateroles.md
title: Государственные роли
hash: fPczIN+A8fhimFqliqumTtytg8IMyIRCQwP5964BVAE=
---
# Государственные роли
## Common
* состояние - очень распространенная цель. Если вы не знаете, какую роль имеет государство, используйте эту.
* text (common.type = string)
* text.url (common.type = string) состояние val содержит URL для использования в привязке, iframe или img
* html (common.type = string)
* json (common.type = string)
* list (common.type = array)
* date (common.type = string - анализируется строкой «new Date (ddd)»
* date (common.type = number - время эпохи * 1000

## Датчик (логическое, только для чтения)
*common.type = логический, common.write = false*

* sensor.window - окно открыто (true) или закрыто (false)
* sensor.door - дверь открыта (true) или закрыта (false)
* sensor.alarm - обычная тревога
* sensor.alarm.flood - утечка воды
* sensor.alarm.fire - датчик пожара
* sensor.alarm.secure - дверь открыта, окно открыто или обнаружено движение во время тревоги.
* sensor.alarm.power - Нет питания (напряжение = 0)
* sensor.light - сигнал от лампы, что она включена
* sensor.lock - фактическое положение блокировки
* sensor.motion - датчик движения
* sensor.rain - обнаружен дождь
* sensor.noise - обнаружен шум

## Кнопки (логические, только для записи)
*common.type = boolean, common.write = true, common.read = false*

* кнопка
* button.long
* button.stop - например, остановка,
* button.start
* button.open.door
* button.open.window
*button.mode.*
* button.mode.auto
* button.mode.manual
* button.mode.silent

## Значения (числа, только для чтения)
*common.type = число, common.write = false*

* стоимость
* value.window (common.states = {"0": "CLOSED", "1": "TILTED", "2": "OPEN"}) Важно иметь (CLOSED / TILTED / OPEN). Значения могут отличаться.
* значение.температура (общ. единица = «°C» или «°F» или «K»)
* value.humidity
* value.brightness - уровень яркости (единица измерения: люкс,)
* value.min
* value.max
* value.default
* value.battery - уровень заряда батареи
* value.valve - уровень клапана
* value.time - getTime () объекта Date ()
* value.interval (common.unit = 'sec') - Интервал в секундах (может быть 0,1 или меньше)
* ~~ value.date (common.type = string) - Дата в форме 2015.01.01 (без времени) ~~
* ~~ value.datetime (common.type = string) - Дата и время в системном формате ~~
* value.gps.longitude - координаты долготы gps
* value.gps.latitude - широта GPS
* value.gps.elevation - высота GPS
* value.gps - долгота и широта вместе, как '5.56; 43.45'
* value.power.cons Потребление (единица измерения = Wh или KWh)
* value.direction - (common.type = число ~~ или строка ~~, указывает вверх / вниз, влево / вправо, 4-позиционные переключатели, направление ветра, ...)
* value.curtain - фактическая позиция занавеса
* value.blind - фактическая позиция слепого
* value.tilt - фактическая позиция наклона
* value.lock - фактическая позиция блокировки
* value.speed - скорость ветра
* значение.давление - (единица измерения: мбар)
* value.distance
* value.distance.visibility
* value.severity - некоторая серьезность (могут быть предоставлены состояния), важнее Higher
* value.warning - некоторые предупреждения (могут быть предоставлены состояния), более важное значение имеет значение Higher.
* value.sun.elevation - высота солнца в °
* value.sun.azimuth - азимут солнца в °
* value.voltage - напряжение в вольт, единица измерения = V
* value.current - ток в амперах, ед. = A
* value.fill - уровень заполнения, ед. = л, мл, м3,%
* value.blood.sugar - уровень сахара в крови, единица измерения = ммоль, мгдл

## Индикаторы (булево, только для чтения)
*common.type = логический, common.write = false*

Отличие *Indicators* от *Sensors* в том, что индикаторы будут отображаться в виде маленького значка. Датчики как реальная ценность.
Так что индикатор может быть не один в канале. Это должно быть какое-то другое основное состояние внутри канала.

* показатель
* Indicator.working - указывает, что целевые системы выполняют что-то, например, блайнды или открытие замка.
* Indicator.reachable - если устройство онлайн
* Indicator.connected - используется только для экземпляров. Используйте индикатор. Доступен для устройств
* Indicator.maintenance - указывает системные предупреждения / ошибки, аварийные сигналы, сервисные сообщения, разряженный аккумулятор или тому подобное
* Indicator.maintenance.lowbat
* Indicator.maintenance.unreach
* Indicator.maintenance.alarm
* Indicator.lowbat - истина, если батарея разряжена
* Indicator.alarm - так же, как индикатор
* Indicator.alarm.fire - пожар обнаружен
* Indicator.alarm.flood - обнаружен наводнение
* Indicator.alarm.secure - дверь или окно открыто
* Indicator.alarm.health - проблема со здоровьем

## Уровни (цифры, чтение-запись)
С **уровнями** вы можете контролировать или устанавливать некоторые числовые значения.

*common.type = число, common.write = true*

* уровень
* level.co2 - 0-100% качества
* level.dimmer - яркость тоже тусклее
* level.blind - установить слепую позицию
* level.tempera - установить желаемую температуру
* level.valve - уставка для положения клапана
* level.color.red
* level.color.green
* level.color.blue
* level.color.white - rgbW
* level.color.hue - цвет в ° 0-360; 0 = красный, 120 = зеленый, 240 = синий, 360 = красный (циклический)
* level.color.saturation
* level.color.rgb - шестнадцатеричный цвет, например "#rrggbb"
* level.color.luminance
* level.color.tength - цветовая температура в K ° 2200 теплый белый, 6500 ° холодный белый
* level.timer
* level.timer.sleep - таймер сна. 0 - выключено или в минутах
* ...
* level.volume - (min = 0, max = 100) - громкость звука, но min, max могут отличаться. мин <макс
* level.volume.group - (min = 0, max = 100) - громкость звука, для группы устройств
* level.curtain - установить положение занавеса
* level.tilt - установить положение наклона блайндов

## Переключатели (логические, чтение-запись)
Переключатель управляет логическим устройством (true = ON, false = OFF)

*common.type = логический, common.write = true*

* переключатель
* switch.lock - блокировка (true - открыть блокировку, false - закрыть блокировку)
* switch.lock.door - дверной замок
* switch.lock.window - блокировка окна
* switch.boost - запуск / остановка режима повышения термостата
* switch.light
* switch.comfort - комфортный режим
* switch.enable
* switch.power - включение / выключение питания
*switch.mode.*
* switch.mode.auto - автоматический режим вкл / выкл
* switch.mode.manual - ручной режим вкл / выкл
* switch.mode.silent - включение / выключение бесшумного режима
* switch.mode.moonlight - включение / выключение режима лунного света
* switch.mode.color - цветовой режим вкл / выкл

## СМИ
Специальные роли для медиаплееров

* button.stop
* button.play
* button.next
* button.prev
* button.pause
* switch.pause
* button.forward
* button.reverse
* button.fastforward
* button.fastreverse
* button.volume.up
* button.volume.down
* media.seek - (common.type = number)%
* media.mode.shuffle - (common.type = number) 0 - нет, 1 - все, 2 - один
* media.mode.repeat - (common.type = boolean)
* media.state - ['play', 'stop', 'pause'] или [0 - pause, 1 - play, 2 - stop] или [true - воспроизведение / false - пауза]
* media.artist
* media.album
* media.title
* media.title.next
* media.cover - URL обложки
* media.cover.big - URL большой обложки
* media.cover.small - крошечный URL-адрес обложки
* media.duration.text - например, 2:35
* media.duration - (common.type = number) секунд
* media.elapsed.text - например, «1:30»
* media.elapsed - (common.type = number) секунд
* media.broadcastDate - (common.type = string) Дата трансляции
* media.mute - (common.type = boolean) true отключен
* media.season - (common.type = string) номер сезона (важно, чтобы тип был действительно "string", чтобы иметь возможность указать отсутствие сезона с помощью "")
* media.episode - (common.type = string) номер эпизода (важно, чтобы тип был действительно "string", чтобы иметь возможность указать отсутствие эпизода с помощью "")
* media.mute.group - (common.type = логическое) отключение группы устройств
* media.tts - текст в речь
* media.bitrate - кбит / с
* media.genre - жанровая песня
* media.date - песня года
* media.track - (common.type = string) идентификатор текущей воспроизводимой дорожки [0 - ~] (важно, чтобы тип действительно был "string", чтобы иметь возможность указать отсутствие дорожки с помощью "")
* media.playid - идентификатор трека медиаплеера
* media.add - добавить текущий плейлист
* media.clear - очистить текущий список воспроизведения (только для записи)
* media.playlist - как массив json
* media.url - URL для воспроизведения или текущий URL
* media.url.announcement - URL для воспроизведения объявления
* media.jump - количество элементов для перехода в плейлист (может быть отрицательным)
* media.content - тип воспроизводимого мультимедиа, например аудио / mp3.
* media.link - состояние с текущим файлом
* media.input - номер или строка ввода (AUX, AV, TV, SAT, ...)
* level.bass - уровень баса
* level.treble - Уровень высоких частот
* switch.power.zone - зона питания

```
[
    {
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
    }
]
```

* media.browser - массив json, подобный файлам

```
[
    {
        "fanart": "",
        "file": "",//smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", //directory
        "label": "",
        "lastmodified": "",
        "mimetype": "",
        "size": 0,
        "thumbnail": "",
        "title": "",
        "type": "",
        "lastmodified": "2016-02-27 16:05:46",
        "time": "88",
        "track": "01",
        "date": "2005",
        "artist": "yonderboy (H)",
        "album": "splendid isolation",
        "genre": "Trip-Hop"
    }
]
```

## Погода
* значение.температура - фактическая температура
* value.tempera.ru.windchill - фактический ветер
* значение.температура. точка росы - фактическая точка росы
* value.tempera.ru.feelslike - Фактическая температура "по ощущениям"
* value.teuration.min - минимальная температура за последние 24 часа
* value.teuration.max - максимальная температура за последние 24 часа
* value.humidity - фактическая или средняя влажность
* value.humidity.min - фактическая влажность
* value.humidity.max - фактическая влажность
* value.speed.wind - фактическая или средняя скорость ветра
* value.speed.max.wind - максимальная скорость ветра за последние 24 часа
* value.speed.min.wind - минимальная скорость ветра за последние 24 часа
* value.speed.wind.gust - фактическая скорость ветра
* value.direction.wind - фактическое или среднее направление ветра в градусах
* value.direction.max.wind - фактическое направление ветра в градусах
* value.direction.min.wind - фактическое направление ветра в градусах
* weather.direction.wind - фактическое или среднее направление ветра в виде текста, например ВСВ
* date - фактическая дата или дата последней прочитанной информации
* date.sunrise - восход солнца на сегодня
* date.sunset - Закат на сегодня
* dayofweek - день недели как текст
* location - Текстовое описание местоположения (например, адрес)
* weather.icon - фактический URL-адрес значка состояния на данный момент
* weather.icon.wind - фактический URL-адрес значка ветра на данный момент
* weather.icon.name - фактическое имя значка состояния на данный момент
* weather.state - Актуальное описание погоды
* value.precipitation - (тип: число, единица измерения: мм) количество осадков за последние 24 часа дождь / снег (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождь)
* value.precipitation.hour - фактический уровень осадков за последний час
* value.precipitation.today - фактический уровень осадков на сегодня (до 0:00)
* value.radiation - Фактический уровень солнечного излучения
* value.uv - Фактический уровень УФ
* value.clouds - облака на небе. 0% - нет облаков, 100% - много облаков.
* value.rain - фактический уровень дождя за последние 24 часа
* value.rain.hour - фактический уровень дождя за последний час
* value.rain.today - фактический уровень дождя на сегодня (до 0:00)
* value.snow - фактический уровень снега за последние 24 часа
* value.snow.hour - фактический уровень снега за последний час
* value.snow.today - фактический уровень снега на сегодня (до 0:00)
* value.snowline - фактическая линия снега в метрах
* weather.chart.url - URL-адрес диаграммы для истории погоды
* weather.chart.url.forecast - URL-адрес диаграммы для прогноза погоды
* weather.html - HTML-объект с описанием погоды
* weather.title - очень краткое описание
* weather.title.short - очень очень краткое описание (одним словом)
* weather.type - тип информации о погоде
* weather.json - объект JSON с конкретными данными
* value.speed.wind.forecast.0 - прогноз скорости ветра на сегодня
* weather.state.forecast.0 - описание погоды на сегодня
* value.direction.wind.forecast.0 - прогноз направления ветра на сегодня в градусах
* weather.direction.wind.forecast.0 - прогноз направления ветра на сегодня в виде текста
* value.pressure.forecast.0 - прогноз давления на сегодня
* value.teuration.min.forecast.0 - минимальный прогноз температуры на сегодня
* value.teuration.max.forecast.0 - прогноз максимальной температуры на сегодня
* value.precipitation.forecast.0 - (тип: число, единица измерения:%) Прогноз вероятности выпадения осадков на сегодня
* value.precipitation.forecast.0 - (тип: число, единица измерения: мм) Прогноз уровня осадков на сегодня
* weather.title.forecast.0 - очень краткое описание на завтра
* value.precipitation.day.forecast.0 - Прогноз осадков на дневное время
* value.precipitation.night.forecast.0 - Прогноз осадков в ночное время.

* date.forecast.1 - завтрашняя дата
* weather.icon.forecast.1 - значок завтрашнего дня
* weather.state.forecast.1 - прогноз погоды на завтра
* значение.темпр.мин.прогноз1
* значение.температура.макс.прогноз1
* value.precipitation.forecast.1 - (тип: число, единица измерения:%) Прогноз вероятности осадков на завтра
* value.precipitation.forecast.1 - (тип: число, единица измерения: мм) Прогноз уровня осадков на завтра
* value.direction.wind.forecast.1
* value.speed.wind.forecast.1
* value.pressure.forecast.1

## Информация
* info.ip - ip устройства
* info.mac - mac устройства
* info.name - название устройства
* info.address - другой адрес (например, KNX)
* info.port - порт TCP
* info.standby - true, если устройство находится в режиме ожидания
* info.status - статус устройства
* info.display - информация отображается на дисплее устройства
* date.start - строка или число
* date.end - строка или число

## Здоровье
(common.type = число, common.read = true, common.write = false)

* value.health.fat - индекс жира в%
* value.health.weight - масса тела в кг, фунты
* value.health.bmi - индекс bmi
* value.health.calories - сожженные калории
* value.health.steps - выполненные шаги
* value.health.bpm - сердцебиение в минуту

## Другие
* URL
* url.icon - значок (дополнительно каждый объект может иметь common.icon)
* url.cam - URL веб-камеры
* url.blank - открыть URL в новом окне
* url.same - открыть URL в этом окне
* url.audio - URL для аудио файла
* text.phone - номер телефона

* adapter.messagebox (common.type = object, common.write = true), используемый для отправки сообщений на электронную почту, pushover и другие адаптеры
* adapter.wakeup (common.type = boolean, common.write = true) включить адаптер из режима ожидания