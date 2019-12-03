---
BADGE-Build Status: https://travis-ci.org/ioBroker/ioBroker.ical.svg?branch=master
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
BADGE-Github Issues: http://githubbadges.herokuapp.com/ioBroker/ioBroker.ical/issues.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ical.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ical/README.md
title: ioBroker iCal адаптер
hash: DZCkUIn1B1AZbmeLAANTZPSFa6IEXmSQOOSolqZeJ00=
---
![логотип](../../../en/adapterref/iobroker.ical/ical.png)

# ioBroker Адаптер iCal Этот адаптер позволяет считывать файлы .ics с определенного URL-адреса и анализировать его (Календарь Google или iCal).
В качестве альтернативы можно использовать локальный файл `.ics` (использовать абсолютный путь к файлу вместо URL)
## Использование
На основе адаптера iCal для (CCU.IO) [https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] от vader722

### Адаптер iCal
Адаптер iCal для ioBroker считывает файлы календаря в формате `.ics` с указанного URL-адреса и записывает события, которые находятся в заданном интервале времени, в переменную ioBroker. В качестве альтернативы можно использовать локальный файл .ics (используйте абсолютный путь к файлу вместо URL).
Они могут отображаться в VIS с помощью виджета `basic html - String (unescaped)`.

Создаются две переменные:

- `iCalReadTrigger`
- `iCalEvents`

Переменная `iCalReadTrigger` используется для запуска процесса чтения.
В настройках можно указать несколько URL-адресов, с которых читается календарь.
Затем календари читаются последовательно, и результат суммируется.
В качестве альтернативы, команде чтения также может быть задан URL, например, временно читать другой календарь.

Для чтения в defaultURL, строка `read` должна быть записана в переменную `iCalReadTrigger`.

Чтобы прочитать любой URL-адрес, строка `read https: // ...` должна быть записана в переменную `iCalReadTrigger`.

Результат возвращает адаптер iCal в переменной `iCalEvents`.

При записи `check` в` iCalReadTrigger` проверка событий запускается для считанных данных без повторного считывания данных.

Кроме того, адаптер также может автоматически запрашивать календари через определенный интервал (только с помощью `defaultURL`).
Для этого установите в настройках интервал опроса (в минутах) с помощью переменной runEveryMinutes.

Значение параметров в файле конфигурации:

- `Предварительный просмотр ': 7 # означает, что встречи отображаются за 7 дней
- `runEveryMinutes`: 30 # означает, что адаптер автоматически перематывает календарь каждые 30 минут. Если 0 не читается автоматически
- `colorize`: true # Сегодняшние встречи будут окрашены в красный цвет, завтрашние встречи будут оранжевыми, эта опция переопределяет опцию everyCalOneColor
- `debug`: false # если true, расширенный вывод записывается в журнал CCU.IO
- `defColor`:` white` # устанавливает цвет по умолчанию для записей календаря
- `fulltime`:` `# определяет, на какую строку время 00:00 заменяется для встреч на весь день. Для пробелов (между кавычками) время пропускается для встреч на весь день
- `replaceDates`: true # Если true, сегодняшняя дата заменяется строкой todayString (например, Today). Завтра встречи через строку
- `everyCalOneColor`: false # Если true, для нескольких календарей каждый календарь будет окрашен в цвет, который будет указан. Если опция colorize установлена, это не будет работать!
- `Calendar1`:
- "calURL": "http://11111.ics", URL-адрес календаря
- «calColor»: «белый» цвет календаря, если установлена опция «everyCalOneColor».

Можно ввести любое количество календарей. Стандартный файл конфигурации содержит 2 календаря.

- «События»:
- `имя`:" отпуск ":
- `enabled`: true # определяет, будет ли событие редактироваться
- `display`: false # определяет, будет ли событие также отображаться в iCalEvents или только оценивается

Устанавливая событие (в данном примере «отпуск»), в календарях ищется строка «отпуск».
Если в календаре есть встреча с ключевым словом «отпуск», то автоматически устанавливается состояние «Праздник имени», установленное в «Истина». Если встреча закончена, состояние сбрасывается на false.
Статус создается для каждого дня периода предварительного просмотра. Опасность! Ищется подстрока, т.е. Запись в календаре «Отпуск» признается так же, как и Запись «Отпуск родителей». Это необходимо учитывать при настройке событий.

Настраивая CSS в VIS, можно установить стили сегодняшних (стандартный красный) и завтрашних дат (стандартный оранжевый):

- `iCalWarn` - Новая запись календаря сегодня
- `iCalPreWarn` - начало записи в календаре завтра
- `iCalNormal` - конец строки с сегодняшнего дня
- `iCalNormal2` - завтрашний конец строки

### Календарь
#### Apple iCloud Calendar
Календари Apple iCloud можно просматривать, если они были опубликованы ранее. Лучше всего создать свой собственный календарь для Homematic, так как календарь будет доступен всем.
Для этого щелкните правой кнопкой мыши календарь в приложении «Календарь» и выберите «Настройки общего доступа». Теперь проверьте «Public Calendar» и скопируйте отображаемый URL. ВАЖНО: URL начинается с webcal: // p0X-cale .....
`webcal` должен быть заменен ` http`. Затем введите этот URL либо в настройках по умолчаниюURL, либо укажите его в `read URL`, например. `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Календарь Google
Чтобы включить Календарь Google, необходимо перейти к настройке календаря Календаря Google (щелкнуть мышью на «стрелке вниз» рядом с календарем). URL-адрес календаря можно найти, нажав на символ `ICAL` рядом с полем «Частный адрес». Затем введите этот URL либо в настройках по умолчаниюURL, либо укажите его в `read URL`, например. `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`.

#### Календарь OwnCloud
Чтобы включить жесткий календарь OwnCloud, вы должны утвердить этот календарь в представлении календаря в OwnCloud как календарь Hardcourt и указать ссылку.

### CSS
В сгенерированный HTML включены два вида классов CSS, чтобы обеспечить свободу проектирования.

#### Классы CSS на основе времени
* _iCalNormal _ / _ iCalNormal2_: Событие, начатое до сегодняшнего дня (и продолжающее выполняться) или позднее, как через 3 дня, цвет по умолчанию без CSS и без цвета календаря - это настроенный цвет адаптера
* _iCalWarn _ / _ iCalWarn2_: Событие начинается сегодня, цвет по умолчанию без CSS и без календаря - «красный»
* _iCalPreWarn _ / _ iCalPreWarn2_: Событие начнется завтра, цвет по умолчанию без CSS и без календаря - «оранжевый»
* _iCalPrePreWarn _ / _ iCalPrePreWarn2_: Событие начинается послезавтра, цвет по умолчанию без CSS и без цвета календаря - «желтый»

Первый класс CSS (например, iCalNormal) используется для части даты и времени HTML, а второй класс CSS (например, iCalNormal2) используется для имени события.

Пример CSS для этих классов CSS для форматирования вывода немного по-другому (например, дата / время слева + полужирный и Имя события справа ...):

```
.icalWarn{
    color:red;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPreWarn{
    color:yellow;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPrePreWarn{
    color:white;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPrePreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalNormal{
    color:green;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalNormal2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### CSS-классы на основе календаря
Каждый диапазон также имеет класс CSS, назначенный на основе имени календаря, в котором находится событие. Для этого используется «имя календаря», определенное в конфигурации адаптера (пробелы заменяются подчеркиванием).

* _iCal- <calendername> _: этот класс используется для части даты и времени HTML
* _iCal-> calendername2> _: этот класс используется для имени события

Чтобы установить эти классы CSS, вам также нужно использовать класс CSS, основанный на времени, например, _.icalNormal2.iCal- <calendername> 2_:

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Пример сгенерированного html
```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

## Фильтр
В опциях экземпляра можно поддерживать фильтр по календарю. Это должен быть список, разделенный точкой с запятой. Если вы включите опцию `Filter as regular expression`, фильтр будет интерпретирован как регулярное выражение. Во время обновления календаря исключаются все события, соответствующие описанию, местоположению или сводке.

Шаблон поиска:

```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

Черный список: если вы хотите исключить все события определенного местоположения, используйте `LOCATION:MyLocation` или простой `MyLocation` или 2 местоположения `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Белый список: если вы хотите включить только события определенного местоположения, используйте регулярное выражение, например, `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` или для 2 местоположений `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
### 1.7.2 (2019-12-02)
* (bluefox) Documentation was changed

### 1.7.1 (2019-01-08)
* (twonky4) Fixed issue with UTC of until in recurring appointments
* (twonky4) Fixed possible empty color

### 1.7.0 (2018-11-27)
* (twonky4) Add filter option
* (twonky4) Add support of events for configured date period; changed state names from `events.*` to `events.0.today.*`
* (twonky4) Add Count of events for tomorrow - state `data.countTomorrow`
* (twonky4) Events without time part and same start and end are interpreted as full day events
* (twonky4) Remove special chars from event states

### 1.6.6 (2018-10-22)
* (twonky4) Fixed html for disabled colorize
* (twonky4) Fixed timezone handling for events during change from daylight saving time back to standard time
* (twonky4) Fixed events without end date moved to different day

### 1.6.5 (2018-10-13)
* (twonky4) Simplify timezone solution
* (twonky4) Fix calendars without timezones

### 1.6.4 (2018-10-12)
* (twonky4) Support windows timezones
* (twonky4) Don't fail on invalid timezones

### 1.6.3 (2018-10-10)
* (twonky4) Fixes timezone issue in fullday recurring appointments

### 1.6.2 (2018-10-08)
* (twonky4) Fixes timezone issue in recurring appointments

### 1.6.1 (2018-06-04)
* (Apollon77) Several fixes and optimizations

### 1.6.0 (2018-04-13)
* (Apollon77) Several fixes and optimizations
* (Apollon77) Upgrade node-ical library to allow big files to work
* (Apollon77) Better handling of full day events
* (Apollon77) Allow "Replace 0:00" to have 30 characters

### 1.5.3 (2018-03-24)
* (Apollon77) Also make location available in data table

### 1.5.2 (2018-03-23)
* (Apollon77/BuZZy1337) Fix several display issues

### 1.5.0 (2018-03-07)
* (bluefox) ready for Admin3

### 1.4.2 (2018-02-21)
* (Apollon77) Also display events that started before today

### 1.4.1 (2018-02-05)
* (Apollon77) also allow events without end parameter and assume an 0minute event then and set end = start

### 1.4.0 (2018-01-01)
* (Apollon77) allow multiple Events to be contained in one calendar entry. Make sure the names are unique enough because the search only checks for existance of the event name in the text.
* (Apollon77) correctly detect events that started before 0:00
* (Apollon77) also show events with no duration (sometimes used as reminders)
* (Apollon77) correctly show end times for events that are longer then 1 day (including "+x" to show day duration)
* (Apollon77) many enhancements and optimizations in formatting the infos (especially when event has already started but not ended)
* (Apollon77) add option to hide year numbers
* (Apollon77) add own CSS classes to each entry with the names iCal-<calendername> and iCal-<calendername>2 to be able to really design it as needed
* (Apollon77) Known issue: For recurring events it works to delete single events, but it do not work to move them

### 1.3.3 (2017-10-30)
* (DutchmanNL) Translate to Netherlands

### 1.3.2 (2017-02-24)
* (jens-maus) added singular form for 'days'

### 1.3.1 (2017-02-20)
* (jens-maus) implemented support for date excludes for recurring events

### 1.3.0 (2017-02-17)
* (jens-maus) switched ical module to use 'node-ical' which should improve ics format compatibility

### 1.2.2 (2017-02-17)
* (jens-maus) added changes to show "Noch X Tage" for fullday events (e.g. school holidays)

### 1.2.1 (2017-02-11)
* (jens-maus) applied workaround of ics files with TZID before DATE in DTSTART/DTEND

### 1.2.0 (2016-07-23)
* (bluefox) allow read from files
* (bluefox) add tests
* (bluefox) fix all day indication

### 1.1.3 (2016-07-19)
* (bluefox) fix error if entry is invalid
* (bluefox) use newer ical packet version

### 1.1.2 (2015-06-30)
* (jens-maus) implemented some more text replacement terms
* (jens-maus) we only colorize the date+time for imminent appointments
* (jens-maus) added cloneextend dependency definition and fix for dayafter mods
* (jens-maus) ported the "dayafter" change of the ccu.io ical adapter to the iobroker

### 1.1.1 (2015-08-16)
* (bluefox) enable auth only if user set.

### 1.1.0 (2015-08-13)
* (elmars) Added ability to provide username/password to authenticate against protected ics files. Tested with owncloud.

### 1.0.2 (2015-07-21)
* (bluefox) fix error if ICS file has empty lines

### 1.0.1 (2015-07-21)
* (bluefox) change readme title

### 1.0.0 (2015-07-21)
* (bluefox) fix error with set event to false

### 0.1.1 (2015-06-14)
* (bluefox) add additional fields for ioBroker.occ

### 0.1.0 (2015-03-24)
* (bluefox) make it compatible with new concept

### 0.0.2 (2015-02-22)
* (bluefox) fix error with configuration
* (bluefox) fix error with event object creation

### 0.0.1 (2015-02-17)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2019, bluefox <dogafox@gmail.com>

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