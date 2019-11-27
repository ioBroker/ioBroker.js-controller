---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.moma/README.md
title: без названия
hash: /18eY0rfu6ZFjyRax1iWpVkbXlO+pvLYm5mjCn/7nQc=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.moma.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.moma.svg)
![Количество установок](http://iobroker.live/badges/moma-stable.svg)
![Статус зависимости](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![Известные уязвимости](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![NPM](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/AWhiteKnight/ioBroker.moma?branch=master&svg=true)

<h1><img src="admin/moma.png" width="64"/> ioBroker.moma </h1>

## Адаптер moma для ioBroker
** MoMa **- это адаптер для** Mo **мониторинга и** Ma **поддержки установки домашней автоматизации на базе ioBroker.
** MoMa** предназначена для домашних (автоматизированных) установок, которые немного сложнее, чем одна машина, работающая на одной или небольшом количестве машин, выполняющая некоторую базовую балансировку нагрузки в одной сети.

Он не предназначен для замены инструментов администрирования, таких как **Puppet** **Chef** **Salt** или **Ansible** Они предназначены для больших сред с большим количеством компьютеров и способны к удаленной установке пакетов. **MoMa** сможет только удаленно обновлять существующие установки, без удаленной установки и без удаленной конфигурации.

Я использую его для мониторинга своей ИТ-инфраструктуры дома (в том числе домашней автоматизации) и поддержания ее в актуальном состоянии.

MoMa использует независимую от платформы библиотеку 'systeminformation' (https://github.com/sebhildebrandt/systeminformation) для сбора информации о компьютере. Многие из вызовов могут быть использованы в интервальных таймерах - см. Ссылку ниже.

Для MoMa требуется как минимум версия nodejs 8 / ES9 / ECMAScript2018.

## Монтаж
Доступно в репозитории ioBroker «последние»

альтернатива:

npm установить iobroker.moma

Работает также в средах с несколькими хостами - убедитесь, что перед установкой выбран правильный экземпляр.

** Внимание: ** В настоящее время вам нужно установить экземпляр Admin-Adapter на каждом подчиненном устройстве в качестве обходного пути.
Admin-Adapter не обязательно должен быть активным!

## Основная концепция
все еще в стадии разработки - идеи, предложения, советы ... приветствуются!

Форум: https://forum.iobroker.net/topic/22026/neuer-adapter-iobroker-moma

GitHub: https://github.com/AWhiteKnight/ioBroker.moma

Основная идея - иметь + дерево для каждого экземпляра (moma. \ <Instance-id \>), содержащее всю информацию о машине, на которой работает экземпляр.
+ общее дерево (moma.meta), ниже которого каждый экземпляр создает устройство \ <hostname \>, содержащее ссылку на экземпляр и некоторую информацию мониторинга.
+ админка для обслуживания (обновления операционной системы, js-контроллера, адаптеров)

## Ссылка
Вкладка администратора MoMa доступна для запуска обновлений или при необходимости начать перезагрузку.

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
* fsStats - статистика доступа к файлам - не поддерживается в Windows
* diskIO - статистика ввода-вывода блочных устройств - не поддерживается в Windows

Следующие функции системной информации библиотеки вызываются в интервале 3 (по умолчанию каждый час):

* networkInterfaceDefault - Сетевой интерфейс по умолчанию
* networkInterfaces - доступные сетевые интерфейсы
* графика - информация о компьютерах, видеокартах и подключенных мониторах
* inetLatency - проверка интернет-задержки на 8.8.8.8
* dockerInfo - Общая информация о docker - для правильной работы необходим «adduser iobroker docker» на машине
* dockerContainers - список всех Docker-контейнеров - требуется, чтобы на компьютере был установлен «adduser iobroker docker», прежде чем он будет работать правильно

Следующие функции системной информации библиотеки вызываются в интервале 4 (по умолчанию каждый день):

* osInfo - информация о компьютерах с операционной системой
* uuid - UUID для установки
* shell - системная оболочка по умолчанию - не поддерживается в Windows
* версии - версии установленных пакетов программного обеспечения

Следующие функции **MoMa** вызываются в интервале 4 (по умолчанию каждый день):

* updates - проверяет наличие ожидающих обновлений и показывает количество обновлений в moma.meta. \ <hostname \>. updates (в настоящее время только Ubuntu, Debian, openSUSE, RedHat)
* checkIob - проверяет все адаптеры и js-контроллер на наличие обновлений
* checkBatteries - проверяет переменные состояния батареи (текущие реализованные имена состояний: LOWBAT, LOW_BAT)

## Changelog

### 1.2.3 (20??-??-??)
* (AWhiteKnight) bugfixing, code cleanup 

### 1.2.2 (2019-09-12)
* (AWhiteKnight) ioBroker adapter/controller updates for windows, issue #24 

### 1.2.1 (2019-08-12)
* (AWhiteKnight) Bugfixing on 1.2.0 

### 1.2.0 (2019-07-26)
* (AWhiteKnight) Library 'systeminformation' version 4.14.4, 
                 check for update of Adapters and JS-Controller in Interval 4,
				 dockerInfo, dockerContainers in Interval 3,
				 moma admin-tab with update buttons for os, js-controller, adapters.

### 1.1.0 (2019-05-20)
* (AWhiteKnight) Performance optimization,
				 partial fix of Issu #24,
				 Check internet latency.

### 1.0.0 (2019-05-11)
* (AWhiteKnight) First release for adapter list 'stable'.

### 0.1.0 (2019-04-18)
* (AWhiteKnight) First release for adapter list 'latest'.

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