---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.moma/README.md
title: без названия
hash: 1+r5JGoGDjiFF8V8ugMr56Y2eJP7SQxhYzdYAXdoZts=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.moma.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.moma.svg)
![Статус зависимости](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![Известные уязвимости](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AWhiteKnight/ioBroker.moma?branch=master&svg=true)

<h1><img src="admin/moma.png" width="64"/> ioBroker.moma </h1>

## Адаптер moma для ioBroker
** MoMa **- это адаптер для** Mo **мониторинга и** Ma **обслуживания домашней автоматизации на базе ioBroker.
** MoMa** предназначена для домашних (автоматизированных) установок, которые немного сложнее, чем одна машина, работающая на одной или небольшом количестве машин, выполняющая некоторую базовую балансировку нагрузки в одной сети.

Он не предназначен для замены инструментов администрирования, таких как **Puppet** **Chef** **Salt** или **Ansible** Они предназначены для больших сред с большим количеством компьютеров и способны к удаленной установке пакетов. **MoMa** сможет только удаленно обновлять существующие установки, без удаленной установки и без удаленной конфигурации.

Я использую его для мониторинга своей ИТ-инфраструктуры дома (в том числе домашней автоматизации) и поддержания ее в актуальном состоянии.

MoMa использует независимую от платформы библиотеку 'systeminformation' (https://github.com/sebhildebrandt/systeminformation) для сбора информации о компьютере. Многие из вызовов могут быть использованы в интервальных таймерах - см. Ссылку ниже.

Для MoMa требуется как минимум версия nodejs 8 / ES6.

## Монтаж
Используйте «Адаптер - Установить с URL» с https://github.com/AWhiteKnight/ioBroker.moma

альтернатива

npm установить iobroker.moma

Работает также в средах с несколькими хостами - убедитесь, что перед установкой выбран правильный экземпляр.

## Основная концепция
все еще в стадии разработки - идеи, предложения, советы ... приветствуются!

Основная идея - иметь + дерево для каждого экземпляра (moma. \ <Instance-id \>), содержащее всю информацию о машине, на которой работает экземпляр.
+ общее дерево (moma.meta), ниже которого каждый экземпляр создает устройство \ <hostname \>, содержащее ссылку на экземпляр и некоторую информацию о мониторинге.

## Ссылка
Следующие функции системной информации библиотеки вызываются один раз при запуске:

* baseboard - информация о компьютерах материнской платы
* шасси - информация о компьютерах шасси
* bios - информация о компьютерах BIOS
* system - Информация о производителе компьютеров
* cpu - информация о компьютерах с процессором
* cpuFlags - доступны флаги процессора
* memLayout - информация о компьютерах с микросхемами памяти
* diskLayout - информация о жестких дисках компьютеров

Следующие функции системной информации библиотеки вызываются в интервале 0 (по умолчанию каждую секунду):

* время - фактическое время, часовой пояс и время работы
* cpuCurrentSpeed - Фактические частоты процессора и ядра
* networkConnections - фактические сетевые подключения
* currentLoad - фактическая загрузка процессора
* процессы - обзор процесса с process.list в виде HTML-таблицы

Следующие функции системной информации библиотеки вызываются в интервале 1 (по умолчанию каждые 10 секунд):

* mem - информация об использовании памяти
* CPU-температура - температура процессора и ядер
* networkStats - Сетевая статистика
* fullLoad - средняя загрузка с момента последней загрузки

Следующие функции системной информации библиотеки вызываются в интервале 2 (по умолчанию каждую минуту):

* батарея - состояние заряда и информация о батарее
* users - текущие сеансы пользователей
* fsSize - информация о файловой системе компьютера
* blockDevices - Подключенные блочные устройства
* fsStats - Статистика доступа к файлам
* diskIO - статистика ввода-вывода блочных устройств

Следующие функции системной информации библиотеки вызываются в интервале 3 (по умолчанию каждый час):

* networkInterfaceDefault - Сетевой интерфейс по умолчанию
* networkInterfaces - доступные сетевые интерфейсы
* графика - информация о компьютерах, видеокартах и подключенных мониторах

Следующие функции системной информации библиотеки вызываются в интервале 4 (по умолчанию каждый день):

* osInfo - информация о компьютерах с операционной системой
* uuid - UUID для установки
* shell - стандартная системная оболочка
* версии - версии установленных пакетов программного обеспечения

Следующие функции **MoMa** вызываются в интервале 4 (по умолчанию каждый день):

* updates - проверяет наличие ожидающих обновлений и показывает количество обновлений в moma.meta. \ <hostname \>. updates (в настоящее время только Ubuntu, Debian, openSUSE, RedHat)
* checkBatteries - проверяет переменные состояния батареи (текущие реализованные имена состояний: LOWBAT, LOW_BAT)

## Changelog

### 0.1.1 (2019-04-26)
* (AWhiteKnight) First implementation of moma admin-tab. Be careful, the table line buttons are always active!!

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list.

### 0.0.10 (2019-04-18)
* (AWhiteKnight) Reduction of footprint. Restructuring.

### 0.0.9 (2019-04-08)
* (AWhiteKnight) Systeminfolib upgraded to 4.1.1 and added some calls/variables. Testing (re)enabled. Merging to new adapter creation template part 2.

### 0.0.8 (2019-03-10)
* (AWhiteKnight) Started merging to new development method. Maintaining meta states.

### 0.0.7 (2018-10-29)
* (AWhiteKnight) Travis testing activated; Minor enhancements in meta data

### 0.0.6 (2018-10-27)
* (AWhiteKnight) UI text and translations; changed meta-path from moma.x to moma.meta

### 0.0.5 (2018-10-26)
* (AWhiteKnight) Checking for updates in interval 4

### 0.0.4 (2018-10-14)
* (AWhiteKnight) New intervals: 0 with high frequency, 4 daily. Extended configuration

### 0.0.3 (2018-10-02)
* (AWhiteKnight) Basic functions of 'systeminformation' implemented, some documentation

### 0.0.2 (2018-09-30)
* (AWhiteKnight) Library 'systeminformation' integrated. First set of calls implemented

### 0.0.1
* (AWhiteKnight) initial version

## License
MIT License

Copyright (c) 2019 AWhiteKnight

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