---
BADGE-Number of Installations: http://iobroker.live/badges/influxdb-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.influxdb.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.influxdb.svg
BADGE-Tests: http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.influxdb.png?downloads=true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.influxdb/README.md
title: no title
hash: 3NwDgz/ioa8U77f97f49AfeoC0uK8sBFk9+oqMjp09Y=
---
* * *

## <span id="Konfiguration">configuration</span>
### <span id="Storage-Einstellungen">DB settings</span>
Here, the settings made when influxDB is created are entered to allow the ioBroker server to access this database. [![] (Img / influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

#### Host
Host name or IP of the database server.

#### Port
Here the port is entered via which the database can be reached on the host.

#### Protocol
Here it is indicated if access to the database should be done via simple http or secured https

#### Login
The owner of the database (user) under whose ID the data should be recorded

#### Password
This is the password of the specified user in the SQL database. For safety reasons, this password must be entered repeatedly in the following field.

#### Round up
Indication of decimal places with which numbers should be stored.

#### Gather write actions
The value entered here determines how many new data should be available before it should be written back to the database. The higher the value, the less frequently written to the DB, the higher the data loss if the adapter fails. A 0 ensures immediate entry into the DB. Accordingly, the entry "0" means: Immediate writing to the database. This increases the load on the database and in the adapter.

#### Write interval
If a value is entered here, the data will be written to the database after the specified time in seconds, even if the number of data set in the last item has not yet been reached.

### <span id="Default_Einstellungen_fuer_Zustaende">Default settings for states</span>
These settings specify the values to be used as the default when configuring the logging of the individual data points. [![] (Img / influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

#### Record changes only
If this checkbox is checked, consecutive data must have different values so that they can be recorded. Sends a sensor, e.g. several times the same temperature, this is not recorded, only when a change is again created a record.

#### Record the same values
If, at the same value, these (unchanged) values are nevertheless to be stored from time to time, a time span in seconds can be defined here, how often this should happen. Accordingly, the input 0 means that no duplicate value should be stored.

#### Minimum deviation from the last value
If, however, these (changed) values should not be saved with constantly changing values, a minimum value can be specified here, which the value must change, so that a new value is saved again. This is useful, for example, with current measuring sockets, in which not every slight change should be logged. Accordingly, the entry 0 means that each value should be stored.

#### Save as
If necessary, the data type with which the data should be stored can be defined here. This should only be done before the first activation.

[![] (Img / influxdb_ioBroker_Adapter_SQL_objects_type.jpg)](../../../de/adapterref/iobroker.influxdb/img/iinfluxdb_oBroker_Adapter_SQL_objects_type.jpg) In an InfluxDB, the data type is defined with the first data record and must remain identical afterwards.

#### Storage retention time
Defines how long the values should be stored (infinite, 2 years, 1 year, ..., 1 day). [![] (Img / influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

#### Debounce time (ms)
Protection against too frequent changes of a value. This is the minimum distance in milliseconds until a value is written again.

* * *

## <span id="Einstellungen_fuer_Datenpunkte">Settings for data points</span>
The settings for the data points to be logged are carried out in the "Objects" tab at the corresponding data point. [![ioBroker_adapter_History_devices] (img / influxdb_ioBroker_adapter_History_devices.jpg)] (img / influxdb_ioBroker_adapter_History_devices.jpg) To do this, select the gear icon for the desired data point in the far right column. The configuration menu opens: [! [] (Img / influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Aktiviert">Activated</span>
Activate logging of the data point Only record changes: Only values are saved if the value of the data point changes. This saves storage space. Useful results are obtained by filtering the data points beforehand via the filter fields in the table header in such a way that, e.g. only filter out the "State" data points in order to then log them [![Filtern_loggen] (img / influxdb_Filtern_loggen.jpg)](../../../de/adapterref/iobroker.influxdb/img/Filtern_loggen.jpg)

1. Display the view as a list without grouping
2. Enter the filter term (s)
3. Select all filtered data points to log
    1. The configuration menu for the settings of the log parameters opens
4. Enable logging for all filtered data points at once
    1. Uniformly select other parameters such as "changes only" and lead time for all filtered data points
5. Save the changes

* * *

## <span id="Bedienung">** Operation **</span>
If you select "with" or "influxdb.0" in the title bar under History, only data points with logging will be displayed. [![] (img / influxdb_ioBroker_Adapter_SQL_objects_filter.jpg)] (img / influxdb_ioBroker_Adapter_SQL_objects_filter.jpg) A click on the gear icon opens the logged data: [! [] (img / influxdb_ioBroker_Adapter_SQL_objects_Data.jpg)] (img / influxdb_ioBroker_Adapter_SQL_objects_Data.jpg) In the Table tab, the Data displayed in tabular form. [! [IoBroker_Adapter_rickshaw03] (img / influxdb_ioBroker_Adapter_rickshaw03.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_rickshaw03.jpg) In the Chart tab, a history graphic can be displayed when the Rickshaw adapter is installed.

* * *

## Installation of an influxDB database
The description of installing an influxDB database follows.

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