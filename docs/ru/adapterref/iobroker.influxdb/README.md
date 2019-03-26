---
BADGE-Number of Installations: http://iobroker.live/badges/influxdb-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.influxdb.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.influxdb.svg
BADGE-Tests: http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.influxdb.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.influxdb/README.md
title: без названия
hash: 3NwDgz/ioa8U77f97f49AfeoC0uK8sBFk9+oqMjp09Y=
---
* * *

## <span id="Konfiguration">конфигурация</span>
### <span id="Storage-Einstellungen">Настройки БД</span>
Здесь вводятся настройки, сделанные при создании influenxDB, чтобы сервер ioBroker мог получить доступ к этой базе данных. [![] (Img / influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

#### Хост
Имя хоста или IP сервера базы данных.

#### Порт
Здесь вводится порт, через который можно получить доступ к базе данных на хосте.

#### Протокол
Здесь указывается, должен ли доступ к базе данных осуществляться через простой http или защищенный https

#### Войти
Владелец базы данных (пользователь), под чьим ID должны регистрироваться данные

#### Пароль
Это пароль указанного пользователя в базе данных SQL. В целях безопасности этот пароль необходимо вводить повторно в следующем поле.

#### Округлить
Указание десятичных разрядов, с которыми следует хранить числа.

#### Собирай пиши действия
Введенное здесь значение определяет, сколько новых данных должно быть доступно, прежде чем они будут записаны обратно в базу данных. Чем выше значение, тем реже записывается в БД, тем выше потеря данных в случае сбоя адаптера. 0 обеспечивает немедленный вход в БД. Соответственно, запись «0» означает: немедленная запись в базу данных. Это увеличивает нагрузку на базу данных и адаптер.

#### Интервал записи
Если здесь ввести значение, данные будут записаны в базу данных по истечении указанного времени в секундах, даже если количество данных, заданных в последнем элементе, еще не достигнуто.

### <span id="Default_Einstellungen_fuer_Zustaende">Настройки по умолчанию для состояний</span>
Эти параметры определяют значения, которые будут использоваться по умолчанию при настройке регистрации отдельных точек данных. [![] (Img / influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

#### Запись только изменений
Если этот флажок установлен, последовательные данные должны иметь разные значения, чтобы их можно было записать. Посылает датчик, например Несколько раз ту же температуру, это не записывается, только когда изменение снова создает запись.

#### Записывать одинаковые значения
Если при одном и том же значении эти (неизменные) значения, тем не менее, необходимо время от времени сохранять, здесь можно определить временной интервал в секундах, как часто это должно происходить. Соответственно, ввод 0 означает, что дублирующее значение не должно сохраняться.

#### Минимальное отклонение от последнего значения
Однако, если эти (измененные) значения не следует сохранять с постоянно меняющимися значениями, здесь можно указать минимальное значение, которое должно измениться, чтобы новое значение сохранялось снова. Это полезно, например, для текущих измерительных разъемов, в которых должны регистрироваться не все незначительные изменения. Соответственно, запись 0 означает, что каждое значение должно быть сохранено.

#### Сохранить как
При необходимости, тип данных, с которыми должны храниться данные, может быть определен здесь. Это следует делать только перед первой активацией.

[![] (Img / influxdb_ioBroker_Adapter_SQL_objects_type.jpg)](../../../de/adapterref/iobroker.influxdb/img/iinfluxdb_oBroker_Adapter_SQL_objects_type.jpg) В InfluxDB тип данных определяется с первой записью данных и впоследствии должен оставаться идентичным.

#### Время хранения
Определяет, как долго должны храниться значения (бесконечно, 2 года, 1 год, ..., 1 день). [![] (Img / influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

#### Время отката (мс)
Защита от слишком частых изменений стоимости. Это минимальное расстояние в миллисекундах, пока значение не будет записано снова.

* * *

## <span id="Einstellungen_fuer_Datenpunkte">Настройки для точек данных</span>
Настройки регистрируемых точек данных выполняются на вкладке «Объекты» в соответствующей точке данных. [![ioBroker_adapter_History_devices] (img / influenxdb_ioBroker_adapter_History_devices.jpg)] (img / influenxdb_ioBroker_adapter_History_devices.jpg) Чтобы сделать это, выберите значок шестеренки для требуемой точки данных в крайнем правом столбце. Откроется меню конфигурации: [! [] (Img / influenxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Aktiviert">Активировано</span>
Активировать запись точки данных. Только запись изменений: только значения сохраняются, если значение точки данных изменяется. Это экономит место для хранения. Полезные результаты получают путем предварительной фильтрации точек данных через поля фильтра в заголовке таблицы таким образом, чтобы, например, отфильтровывайте только точки данных «State», чтобы затем регистрировать их [![Filtern_loggen] (IMG / influxdb_Filtern_loggen.jpg)](../../../de/adapterref/iobroker.influxdb/img/Filtern_loggen.jpg)

1. Отображение представления в виде списка без группировки
2. Введите термин (и) фильтра
3. Выберите все отфильтрованные точки данных для входа
    1. Откроется меню настройки параметров журнала.
4. Включите ведение журнала для всех отфильтрованных точек данных одновременно
    1. Равномерно выберите другие параметры, такие как «только изменения» и время выполнения для всех отфильтрованных точек данных.
5. Сохраните изменения

* * *

## <span id="Bedienung">** Операция **</span>
Если вы выберете «with» или «influenxdb.0» в строке заголовка в разделе «История», будут отображаться только точки данных с ведением журнала. [![] (img / influenxdb_ioBroker_Adapter_SQL_objects_filter.jpg)] (img / influenxdb_ioBroker_Adapter_SQL_objects_filter.jpg) щелчок по значку шестеренки открывает зарегистрированные данные: [! Данные отображаются в виде таблицы. [! [IoBroker_Adapter_rickshaw03] (IMG / influxdb_ioBroker_Adapter_rickshaw03.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_rickshaw03.jpg) На вкладке «Диаграмма» может отображаться графический журнал, если установлен адаптер Rickshaw.

* * *

## Установка базы данных infxDB
Описание установки базы данных infxDB приведено ниже.

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2015-2018 bluefox

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