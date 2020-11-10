---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartmeter/README.md
title: ioBroker.smartmeter
hash: cJvtg9H09nVIVUCkFepdcrH8lcR+QaJpUbDehwf07HM=
---
![Логотип](../../../en/adapterref/iobroker.smartmeter/admin/smartmeter.png)

![Значок Greenkeeper](https://badges.greenkeeper.io/Apollon77/ioBroker.smartmeter.svg)
![Количество установок](http://iobroker.live/badges/smartmeter-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.smartmeter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)
![Трэвис-Си](http://img.shields.io/travis/Apollon77/ioBroker.smartmeter/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.smartmeter?branch=master&svg=true)
![НПМ](https://nodei.co/npm/iobroker.smartmeter.png?downloads=true)

# IoBroker.smartmeter
[![Code Climate] (https://codeclimate.com/github/Apollon77/ioBroker.smartmeter/badges/gpa.svg)](https://codeclimate.com/github/Apollon77/ioBroker.smartmeter)

** Этот адаптер использует библиотеки Sentry для автоматического сообщения мне как разработчику об исключениях и ошибках кода. ** Подробнее см. Ниже!

Этот адаптер для ioBroker позволяет считывать и анализировать протоколы интеллектуальных счетчиков, которые следуют логике номеров OBIS, чтобы сделать их данные доступными.

*** Адаптеру для работы требуется nodejs 8.x +! ***

*** Этот адаптер должен иметь установленный git для установки! ***

## Описание параметров
ioBroker-Forum-Thread: http://forum.iobroker.net/viewtopic.php?f=23&t=5047&p=54973

### Протокол данных
Поддерживаемые протоколы:

* **Sml** SML (Smart Message Language) как двоичный формат
* **D0** D0 (на основе IEC 62056-21: 2002 / IEC 61107 / EN 61107) в формате ASCII (режим двоичного протокола E в настоящее время не поддерживается)
* **Json-Efr** данные OBIS из EFR Smart Grid Hub (формат JSON)

### Обмен данными
* **Последовательный прием** получение данных по последовательному каналу (интеллектуальный прибор отправляет данные без каких-либо запросов через равные промежутки времени). В основном используется для SML
* **Последовательная двунаправленная связь** протокол D0 в режимах A, B, C и D (режим E в настоящее время НЕ поддерживается!) С Wakeup-, Signon-, pot. ACK- и Data-сообщения для чтения данных (режим программирования / записи пока не реализован)
* **Http-Requests** чтение данных через HTTP путем запроса определенного URL
* **Локальные файлы** чтение данных из локального файла.

### Интервал запроса данных
Количество секунд ожидания следующего запроса или паузы последовательного приема, значение 0, возможен перезапуск сразу после завершения одного сообщения,

По умолчанию: 300 (= 5 минут)

### Скорость последовательного устройства в бодах
скорость передачи для начального последовательного соединения, если не определены значения по умолчанию для каждого типа транспорта (9600 для SerialResponseTransprt и 300 для SerialRequestResponseTransport)

### D0: Команда сообщения входа в систему
Команда для сообщения входа в систему, по умолчанию "?" для запроса обязательных полей, другие значения в зависимости от устройства.
Пример: 2WR5 Heatmeter использует "#" для запроса намного большего количества данных (необязательные поля вместе со всеми обязательными)

### D0: Режим перезаписи
Адаптер пытается определить режим протокола D0, как определено в спецификациях. Есть устройства, которые не соответствуют спецификациям и поэтому создают проблемы. Используя эту опцию, вы можете перезаписать определенный режим протокола.

* Режим A: без переключения скорости передачи, без сообщения подтверждения.
* Режим B: переключение скорости передачи, без сообщения подтверждения
* Режим C: требуется переключение скорости передачи и сообщение подтверждения.
* Режим D: без переключения скорости, всегда 2400 бод.
* Режим E: требуется переключение скорости передачи и сообщение с подтверждением, пользовательские протоколы, в настоящее время не поддерживается !! Свяжитесь со мной, если у вас есть такой смартметр

### D0: Baudrate-Change-Overwrite
Адаптер пытается определить скорость передачи сообщений данных, как определено в спецификациях протокола. Но, как и в случае с режимом, здесь некоторые смартметры предоставляют неверные данные. Итак, вы можете использовать это, чтобы при необходимости перезаписать скорость передачи для сообщения данных. Оставьте поле пустым, чтобы использовать изменение скорости передачи, определяемое интеллектуальным счетчиком.

## Адаптер протестирован с ...
... по крайней мере:

* Измеритель энергии Hager eHz (несколько, например, eHZ-IW8E2A5L0EK2P, EHZ363W5,)
* Счетчик энергии EMH
* EFR SmartGridHub
* Считыватель Siemens 2WR5 от тепловой станции
* Эльстер AS1440
* Iskraemeco MT174
* Iskraemeco MT175
* Itron EM214 Typ 720
* Landis & Gyr E220
* Голландский интеллектуальный счетчик с использованием протокола DSRM (используйте «только данные для чтения последовательного устройства» и «D0» в качестве протокола)
* DZG DWS7412.1T
  ** ВАЖНО* Кажется, есть ошибка прошивки, и иногда текущее потребление энергии становится отрицательным! Возможен ручной пересчет с использованием формул из https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736* ... и многих других

Пожалуйста, пришлите мне информацию об устройствах, на которых вы успешно использовали библиотеку, и я добавлю ее сюда.

## Специальные Smartmeter и проблемы
### DZG DVS74
Иногда кажется, что это ошибка в прошивке SML, и значения неправильно закодированы в сообщении SML, но само сообщение является действительным. Решение состоит в том, чтобы обработать значение с помощью Javascript. См. Https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого GitHub issues.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог «log» в установочном каталоге ioBroker, а не из Admin, потому что Admin сокращает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале и в какое время.

## Что такое Sentry и что передается на серверы?
Sentry.io - это способ для разработчиков получить обзор ошибок в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется на наш собственный сервер Sentry, расположенный в Германии. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш установочный идентификатор (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почты, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

## Changelog

### 3.1.5 (2020-09-21)
* (Apollon77) update dependencies to prevent some crash cases and optimize tcp mode

### 3.1.3 (2020-07-20)
* (Apollon77) update dependencies to prevent some crash cases

### 3.1.2 (2020-04-12)
* (Apollon77) catch errors when no memory is available anymore and stop processing

### 3.1.1 (2020-03-11)
* (Apollon77) fix admin when switching to TCPTransport
* (Apollon77) bugfixes and optimizations

### 3.1.0 (2020-03-08)
* (Apollon77) bugfixes and optimizations
* (Apollon77) experimental TCP support, please give feedback

### 3.0.10 (2020-02-05)
* (Apollon77) make sure HTTP based smartmeters are also polled frequently when responses are invalid
* (Apollon77) other optimizations
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.0.8 (2019-12-20)
* (Apollon77) errors prevented when stopping to process data

### 3.0.7 (2019-12-18)
* (Apollon77) errors prevented when stopping to process data

### 3.0.6 (2019-12-07)
* (Apollon77) serial port configuration further optimized
* (Apollon77) update smartmeter-obis lib to fix some edge case errors and serial close handling

### 3.0.3 (2019-11-30)
* (Apollon77) serial port configuration further optimized

### 3.0.2 (2019-11-29)
* (Apollon77) Fix use of "/dev/serial/by-id" paths on linux if available

### 3.0.1 (2019-11-27)
* (Apollon77) BREAKING CHANGE: Supports nodejs 8.x+ only, up to 12.x
* (Apollon77) support compact mode
* (Apollon77) update to latest library versions to fix problems and add special handling for some smart meters with broken firmware
* (Apollon77) Use "/dev/serial/by-id" paths on linux if available; add port selection to Admin
* (Apollon77) Add Sentry for error reporting

### 2.0.0 (2019-03-22)
* (Apollon77) BREAKING CHANGE: State names changed because * no longer supported. Is replaced by __ now because of possible collisions in state names with only one _

### 1.2.2 (2018-11-11)
* Update smartmeter library, fix HTTP-JSON-Transport

### 1.2.1 (2018-06-23)
* BREAKING CHANGE: State names changed because * no longer supported. Is replaced by _

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (26.03.2018)
* Add better support for devices with more then 16 values (OpenSML Library upgrade)

### 1.1.0 (31.01.2018)
* Allow multiple queries for D0 and Serial-Bidirectional communication
* a lot of bugfixing and Optimizations
* Switch to Serialport 6.0.4 to hopefully get more stable (less/no SIGSEGV/SIGABRT ...)

### 1.0.0 (25.08.2017)
* Update smartmeter library and fix some timing issues

### 0.5.12 (23.07.2017)
* update SML library

### 0.5.11 (21.06.2017)
* optimize D0 handling and add support for Dutch smartmeter using DSRM protocol.

### 0.5.8 (06.04.2017)
* optimize Serial handling on Windows (because pause and resume are not supported there)

### 0.5.6 (02.04.2017)
* update library

### 0.5.5 (19.03.2017)
* improved baudrate-changeover logic for D0 protocol (now hopefully finally)
* enhanced D0 protocol support for multiple values

### 0.5.0 (26.02.2017)
* maintenance update

### 0.4.2 (27.02.2017)
* one last try to fix the crashes SIGABRT/SIGSEGV

### 0.4.1 (24.02.2017)
* Fix potential hanging communication with D0 Serial

### 0.4.0 (23.02.2017)
* Optimize for D0 Message handling and baudrate changeovers

### 0.3.2 (22.02.2017)
* Optimize D0 protocol handling for mode E

### 0.3.1 (12.02.2017)
* Finalize Adapter config and added some informations

### 0.3.0 (11.02.2017)
* We now should be quiet stable

### 0.2.x
* Public release of Adapter after forum Tests
* remove all additional logging
* enhance Adapter config screenxw
* Add possibility to overwrite serial connections settings and also D0 Mode for devices that send a wrong identification
* update smartmeter-obis library for memory optimizations

### 0.1.1
* Update smartmeter-obis library to 0.2.5 to add Serial Timeout for Request/Response protocol

### 0.1.0
* Initial version for public testing

### 0.0.1
* Initial version for internal testing

## License

The MIT License (MIT)

Copyright (c) 2017-2020 Apollon77 <ingo@fischer-ka.de>

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