---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: 53hn13Dh6RRRv4n3c+VoxnzrU3iuVzgw/v9Ik5WnRtU=
---
![логотип](../../../en/adapterref/iobroker.history/admin/history.png)

![Количество установок](http://iobroker.live/badges/history-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.history.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.history.svg)
![тесты](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

# IoBroker.history
Этот адаптер сохраняет историю состояний в два этапа.
Сначала точки данных сохраняются в оперативной памяти, как только они достигают максимальной длины, они сохраняются на диске.

Чтобы настроить некоторые точки данных для хранения, они должны быть настроены на вкладке «Объекты» администратора (последняя кнопка).

Для включения графиков необходимо установить **flot** адаптер.

## Настройки
- **Каталог хранения** - Путь к каталогу, в котором будут храниться файлы. Это можно сделать относительно «iobroker-data» или абсолютного, например «/ mnt / history» или «D: / History»
- **Максимальное количество сохраняемых в ОЗУ значений** - После достижения этого количества значений в ОЗУ они будут сохранены на диске.
- **Сохранить источник значения** - Если будет сохранено поле «from». Можно сохранить место на диске.
- **Интервал отмены отказов** - Защита от слишком частых изменений некоторого значения и определенного времени в мс, в течение которого после одного изменения значения другие изменения не регистрируются
- **Сохранение хранилища** - Сколько значений в прошлом будет храниться на диске.
- **Записывать неизмененные значения any (s)** - При использовании «только изменения журнала» вы можете установить здесь временной интервал в секундах, после которого неизмененные значения будут повторно зарегистрированы в БД

Большинство из этих значений будут предварительно заполнены в подробных настройках для точки данных и могут быть изменены там. Кроме того, вы можете указать «псевдоним» на странице назначения данных. С этим вы можете, например, после переключения устройства и изменения имен точек данных сохраните данные в прежнем идентификаторе, просто введя этот идентификатор, и все данные будут зарегистрированы как этот.

## Доступ к значениям из адаптера Javascript
Доступ к отсортированным значениям можно получить из адаптера Javascript. Например. с помощью следующего кода вы можете прочитать список событий за последний час:

```
// Get 50 last stored events for all IDs
sendTo('history.0', 'getHistory', {
    id: '*',
    options: {
        end:       new Date().getTime(),
        count:     50,
        aggregate: 'onchange'
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});

// Get stored values for "system.adapter.admin.0.memRss" in last hour
var end = new Date().getTime();
sendTo('history.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'onchange'
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

Возможные варианты:

- **начало** - (необязательно) время в мс - *новая дата (). getTime ()* '
- **end** - (необязательно) время в мс - *new Date (). getTime ()* ', по умолчанию (сейчас + 5000 секунд)
- **шаг** - (необязательно) используется в совокупном (м4, макс, мин, среднее, общее) шаг в мс интервалов
- **count** - количество значений, если агрегат равен «onchange», или количество интервалов, если используется другой метод агрегирования. Счет будет игнорироваться, если задан шаг.
- **из** - если в ответе должно быть указано поле *из*
- **ack** - если поле *ack* должно быть включено в ответ
- **q** - если поле *q* должно быть включено в ответ
- **addId** - если поле *id* должно быть включено в ответ
- **лимит** - не возвращать больше записей, чем лимит
- **ignoreNull** - если нулевые значения должны быть включены (false), заменены последним ненулевым значением (true) или заменены на 0 (0)
- **агрегат** - метод агрегирования:
  - *minmax* - используется специальный алгоритм. Склейте весь временной интервал с небольшими интервалами и найдите для каждого интервала максимальные, минимальные, начальные и конечные значения.
  - *max* - Соединить весь временной интервал с небольшими интервалами, найти для каждого интервала максимальное значение и использовать его для этого интервала (нули будут игнорироваться).
  - *min* - То же, что и max, но принимать минимальное значение.
  - *Среднее* - То же, что и Макс, но принять среднее значение.
  - *total* - То же, что и max, но рассчитывается общее значение.
  - *count* - То же, что и max, но рассчитывается количество значений (будут вычислены значения NULL).
  - *нет* - Нет агрегации вообще. Только необработанные значения в данный период.

Первая и последняя точки будут рассчитаны для агрегации, кроме агрегации «нет».
Если вы вручную запрашиваете некоторую агрегацию, вы должны игнорировать первое и последнее значения, потому что они вычисляются из значений вне периода.

## StoreState
Если вы хотите записать другие данные в InfluxDB, вы можете использовать встроенную системную функцию **storeState** Эта функция также может использоваться для преобразования данных из других адаптеров History, таких как History или SQL.

Указанные идентификаторы не проверяются в базе данных ioBroker и не требуют настройки там, а доступны только напрямую.

Сообщение может иметь один из следующих трех форматов:

* один идентификатор и один объект состояния
* один идентификатор и массив объектов состояния
* массив из нескольких идентификаторов с объектами состояния

## Управление журналом истории через Javascript
Адаптер поддерживает включение и отключение ведения журнала истории через JavaScript, а также получение списка включенных точек данных с их настройками.

### Включить
Сообщение должно иметь «id» точки данных. Дополнительно необязательные «options» определяют специфические настройки точки данных:

```
sendTo('history.0', 'enableHistory', {
    id: 'system.adapter.history.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ''
    }
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

### Отключить
Сообщение требует, чтобы у него был "id" точки данных.

```
sendTo('history.0', 'disableHistory', {
    id: 'system.adapter.history.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

### Получить список
Сообщение не имеет параметров.

```
sendTo('history.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.history.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        }
        ...
    }
});
```

## Конвертер данных
### Главная идея
Если у вас больше данных со временем, адаптер истории может оказаться не лучшим выбором, а реальная база данных - лучше. Для этого есть еще два адаптера истории для баз данных SQL (PostgreSQL, MS-SQL, MySQL, SQLite) и InfluxDB.
С этим изменением возникает вопрос, как преобразовать собранные данные из прошлого в эти новые адаптеры.

Для этого были подготовлены некоторые скрипты конвертера, которые могут помочь и сделать работу. Эти скрипты вызываются из командной строки.

### Подготовить и проанализировать существующие данные в цели передачи
При преобразовании данных должны передаваться только те данные, которых там еще нет. Поэтому существует первый набор сценариев, называемый **analysis <db> .js** Этот сценарий следует вызывать один раз в начале, чтобы собрать некоторые данные для существующих данных и сохранить их в локальных файлах .json, которые будут использоваться сценарием реального конвертера.
Собираются два вида данных:

- **самое раннее значение для идентификатора точки данных** временная метка самой первой записи для каждой существующей точки данных сохраняется и используется импортированной для игнорирования всех новых значений по умолчанию. Предполагается, что данные заполняются полностью, начиная с этой первой записи, а все более ранние значения будут дублироваться. Это предположение может быть переписано при импорте по параметрам.
- **существующие значения в день для каждого идентификатора точки данных** существующие данные анализируются на основе каждого дня, и каждый день сохраняется там, где данные уже существуют. Это может использоваться в качестве альтернативы первым данным, чтобы иметь возможность также заполнить «дыры» в данных.

#### Analyinflux.js
Analyininflux.js можно найти в каталоге «конвертер».
Этот скрипт будет собирать вышеупомянутые данные для экземпляра InfluxDB.

** Использование **: nodejs analysisinflux.js [<InfluxDB-Instance>] [<Loglevel>] [--deepAnalyze] ** Пример **: nodejs analysisinflux.js infxdb.0 info --deepAnalyze

Параметры:

- **<InfluxDB-Instance>** какой экземпляр inflxdb-Adapter следует использовать? По умолчанию: influenxdb.0. Если значение должно быть первым параметром после имени скрипта.
- **<Уровень логирования>** Уровень логирования для вывода (по умолчанию: информация). Если установлено, это должен быть второй параметр после имени скрипта.
- **- deepAnalyze** также собирать существующие значения за день, по умолчанию запрашивается только самое раннее значение.

Затем скрипт сгенерирует один или три файла .json с собранными данными. Эти файлы затем используются сценарием реального конвертера.

#### Analysisql.js
Analysisql.js можно найти в каталоге «конвертер».
Этот сценарий будет собирать части вышеупомянутых данных для экземпляра SQL.

** Использование **: nodejs analysisql.js [<SQL-экземпляр>] [<Loglevel>] ** Пример **: nodejs analysisql.js sql.0 info

Параметры:

- **<SQL-экземпляр>** какой экземпляр SQL-адаптера следует использовать? По умолчанию: sql.0. Если задано, должен быть первый параметр после имени скрипта.
- **<Уровень логирования>** Уровень логирования для вывода (по умолчанию: информация). Если установлено, это должен быть второй параметр после имени скрипта.

Затем скрипт сгенерирует два файла .json с собранными данными. Эти файлы затем используются сценарием реального конвертера.
В настоящее время --processNonExistingValuesOnly для скрипта конвертера не может использоваться, поскольку данные не собираются.

### Преобразование исторических данных в БД
History2db.js можно найти в каталоге «конвертер».

Сценарий будет напрямую использовать сгенерированные файлы JSON из адаптера истории на диске для передачи их в базу данных.
Кроме того, он использует предварительно созданные файлы данных для уже существующих значений в целевой БД, чтобы преобразовывать только несуществующие данные.

Сценарий может быть запущен без какого-либо шага анализа заранее, тогда вам нужно установить стартовые данные в качестве параметра, и он просто преобразует что-либо с этого момента времени назад.
Если вы ранее выполнили анализ и файл earliestDBValues.json существует, то преобразуются только эти точки данных, если только вы не используете параметры для их изменения.
Когда анализ выполнялся ранее и файлы данных используются, они также обновляются со всеми преобразованными данными, поэтому второй прогон обычно не генерирует дубликаты.
Чтобы сбросить данные, удалите файл «earliestDBValues.json», «istingDBValues.json »и / или« существующий DBTypes.json ».

Затем конвертер возвращается во времени на все дни, доступные в качестве данных, и определяет, какие данные следует перенести в InfluxDB.

Если вы хотите прервать процесс, вы можете нажать «x» или «<CTRL-C>», и конвертер прервет работу после текущего файла данных.

Сам скрипт-конвертер должен работать со всеми адаптерами History, которые поддерживают методы storeState.

Примечание. Миграция многих данных приведет к определенной нагрузке на систему, особенно когда конвертер и целевой экземпляр базы данных работают на одном компьютере. Контролируйте нагрузку и производительность вашей системы во время действия и, возможно, используйте параметр delayMultiplicator, чтобы увеличить задержки в конвертере.

** Использование: ** nodejs history2influx.js DB-Instance [Уровень логирования] [Дата начала | 0] [путь к данным] [delayMultiplicator] [--logChangesOnly [relog-Interval (m)]] [- -ignoreExistingDBValues] [--processNonExistingValuesOnly] [--processAllDPs] [--simulate] ** Пример **: nodejs history2influx.js infxdb.0 info 20161001 / path / to / data 2 --logChangesOnly 30 --processNonExistingValuesOnly

Возможные варианты и параметр:

- **DB-Instance** DB-Instance для отправки данных в параметр .Required. Должен быть первым параметром после имени скрипта.
- **Loglevel** Уровень логирования для вывода (по умолчанию: информация). Если установлено, это должен быть второй параметр после имени скрипта.
- **Дата начала** день начала в формате ггггммдд (например, 20161028). Используйте «0», чтобы использовать обнаруженные самые ранние значения. Если установлено, должен быть третий параметр после имени скрипта.
- **путь к данным** путь к файлам данных. По умолчанию используется iobroker-install-directory / iobroker-data / history-data. Если установлено, это должен быть четвертый параметр после имени скрипта.
- **<delayMultiplicator>** Изменить задержки между несколькими действиями в сценарии с помощью мультипликатора. «2» будет означать, что задержки, рассчитанные самим преобразованным, удваиваются. Если установлено, должен быть пятым параметром после имени скрипта.
- **- logChangesOnly [relog-Interval (m)]** когда установлено значение --logChangesOnly, данные анализируются и уменьшаются, поэтому в InfluxDB сохраняются только измененные значения. Кроме того, "relog-Interval (s)" "может быть установлен в минутах, чтобы повторно регистрировать неизмененные значения после этого интервала.
- **- ignoreExistingDBValues** с помощью этого параметра все существующие данные игнорируются и все данные вставляются в БД. Пожалуйста, убедитесь, что дубликаты не генерируются. Эта опция полезна для исправления «дыр» в данных, где некоторые данные отсутствуют. По умолчанию он заполняет все точки данных хотя бы одной записью в БД. Это может быть перезаписано --processAllDPs
- **- processNonExistingValuesOnly** с этим параметром используется файл «существующие точки данных по дням» из сценария анализа, который проверяется для каждого дня и точки назначения данных. В этом режиме существующие-DB-значения всегда игнорируются, а также не обновляются, поэтому, пожалуйста, сделайте еще один анализ после использования этого режима !!!
- **- processAllDPs** с помощью этого параметра вы убедитесь, что все существующие точки данных из файлов истории перенесены в БД, даже если их пока нет в этой БД.
- **- моделировать** с помощью этого параметра вы включаете режим моделирования, что означает, что никакие реальные записи не происходят, а также файлы данных анализа не будут обновляться при выходе.

## Changelog
### 1.8.5 (2018-07-02)
* (Apollon77) Error fixed in storeState

### 1.8.4 (2018-06-24)
* (Apollon77) Fixing/allow to disable writing of start and end values

### 1.8.0 (2018-06-19/24)
* (Apollon77) Add option to write data to a different ID to make device changes easier. Retrieving data works for both IDs

### 1.7.4 (2018-04-03)
* (AlCalzone) Fix filename handling for states with special characters

### 1.7.3 (2018-03-28)
* (Apollon77) Respect 'keep forever' setting for retention from datapoint configuration

### 1.7.2 (2018-02-05)
* (bondrogeen) Admin3 Fixes

### 1.7.1 (2018-01-31)
* (Bluefox) Admin3 Fixes

### 1.7.0 (2018-01-17)
* (bluefox) Ready for Admin3

### 1.6.6 (2017-12-20)
* (bluefox) translations

### 1.6.5 (2017-10-05)
* (Apollon77) fix relog value feature

### 1.6.4 (2017-08-12)
* (bluefox) add "save last value" option

### 1.6.3 (2017-08-03)
* (Apollon77) fix behaviour of log interval to always log the current value

### 1.6.2 (2017-04-07)
* fix in datatype conversions

### 1.6.0 (2017-02-28)
* (Apollon77) Replace some characters in history filenames

### 1.5.3 (2017-02-22)
* (Apollon77) Small fix for older configurations

### 1.5.2
* (Apollon77) Enhance Min-Delta logic for datapoints from type mixed

### 1.5.1 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.5.0 (2016-12-01)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers
* (Apollon77) Fixing aggregate calculation

### 1.4.0 (2016-10-29)
* (Apollon77) add option to re-log unchanged values to make it easier for visualization
* (Apollon77) added converter scripts to move history data to db

### 1.3.1 (2016-09-25)
* (Apollon77) Fixed: ts is assigned as val
* (bluefox) Fix selector for history objects

### 1.3.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) change name of object from history to custom

### 1.1.0 (2016-08-27)
* (bluefox) fix aggregation of last point
* (bluefox) aggregation none just deliver the raw data without any aggregation

### 1.0.5 (2016-07-24)
* (bluefox) fix aggregation on large intervals

### 1.0.4 (2016-07-05)
* (bluefox) fix aggregation on seconds

### 1.0.3 (2016-05-31)
* (bluefox) draw line to the end if ignore null

### 1.0.2 (2016-05-29)
* (bluefox) switch max and min with each other

### 1.0.1 (2016-05-28)
* (bluefox) calculate end/start values for "on change" too

### 1.0.0 (2016-05-20)
* (bluefox) change default aggregation name

### 0.4.1 (2016-05-14)
* (bluefox) support sessionId

### 0.4.0 (2016-05-05)
* (bluefox) use aggregation file from sql adapter
* (bluefox) fix the values storage on exit
* (bluefox) store all cached data every 5 minutes
* (bluefox) support of ms

### 0.2.1 (2015-12-14)
* (bluefox) add description of settings
* (bluefox) place aggregate function into separate file to enable sharing with other adapters
* (smiling-Jack) Add generate Demo data
* (smiling-Jack) get history in own fork
* (bluefox) add storeAck flag
* (bluefox) mockup for onchange

### 0.2.0 (2015-11-15)
* (Smiling_Jack) save and load in adapter and not in js-controller
* (Smiling_Jack) aggregation of data points
* (Smiling_Jack) support of storage path

### 0.1.3 (2015-02-19)
* (bluefox) fix small error in history (Thanks on Dschaedl)
* (bluefox) update admin page

### 0.1.2 (2015-01-20)
* (bluefox) enable save&close button by config

### 0.1.1 (2015-01-10)
* (bluefox) check if state was not deleted

### 0.1.0 (2015-01-02)
* (bluefox) enable npm install

### 0.0.8 (2014-12-25)
* (bluefox) support of de-bounce interval

### 0.0.7 (2014-11-01)
* (bluefox) store every change and not only lc != ts

### 0.0.6 (2014-10-19)
* (bluefox) add configuration page

## License

The MIT License (MIT)

Copyright (c) 2014-2018 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.