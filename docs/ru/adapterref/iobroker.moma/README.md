---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.moma/README.md
title: без названия
hash: kib0AXGWoomKdqx4mLxIEgJU6gVuZDaqYBslywZ/meE=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.moma.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.moma.svg)
![Количество установок](http://iobroker.live/badges/moma-installed.svg)
![Стабильная версия](http://iobroker.live/badges/moma-stable.svg)
![Статус зависимости](https://img.shields.io/david/AWhiteKnight/iobroker.moma.svg)
![Известные уязвимости](https://snyk.io/test/github/AWhiteKnight/ioBroker.moma/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.moma.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/AWhiteKnight/ioBroker.moma/master.svg)

<h1><img src="admin/moma.png" width="64"/>ioBroker.moma</h1>

## Адаптер moma для ioBroker
** MoMa **- это адаптер для** мониторинга и **обслуживания установки домашней автоматизации на базе ioBroker.
** MoMa** предназначена для домашних (автоматических) установок, которые немного сложнее, чем одна машина, работающая все в одном, или небольшое количество машин, выполняющих некоторую базовую балансировку нагрузки в одной сети.

Он не предназначен для замены таких инструментов администрирования, как **Puppet** **Chef** **Salt** или **Ansible** Они предназначены для больших сред с большим количеством компьютеров и допускают удаленную установку пакетов. **MoMa** сможет только удаленно обновлять существующие установки, без удаленной установки и без удаленной настройки.

**Внимание:**

При использовании адаптера JavaScript установите для флага «не регистрировать все состояния при запуске» значение true при появлении ошибки «RangeError: Превышен максимальный размер стека вызовов».<br> Когда вы регистрируете все состояния при запуске, каждое событие изменения состояния также генерирует событие для адаптера JavaScript. Это большое количество событий может стать проблемой, особенно для Windows.<br> Другое решение - увеличить значение времени для interval0.

MoMa использует независимую от платформы библиотеку systeminformation (https://github.com/sebhildebrandt/systeminformation) для сбора информации о компьютере. Многие из вызовов доступны для использования в интервале таймера - см. Ссылку ниже.

MoMa требуется как минимум nodejs версии 10.

## Установка
Доступно в репозитории ioBroker 'latest'

альтернатива:

npm установить iobroker.moma

Работает также в многоузловых средах - перед установкой убедитесь, что выбран правильный экземпляр.

** Внимание: ** В настоящее время вам необходимо установить экземпляр Admin-Adapter на каждом подчиненном устройстве в качестве обходного пути.
Админ-адаптер не обязательно должен быть активным!

## Основная концепция
еще в разработке - идеи, предложения, подсказки, ... приветствуются!

Форум: https://forum.iobroker.net/topic/22026/neuer-adapter-iobroker-moma

GitHub: https://github.com/AWhiteKnight/ioBroker.moma

Основная идея состоит в том, чтобы иметь + дерево для каждого экземпляра (moma. \ <Instance-id \>), содержащее всю информацию о машине, на которой запущен экземпляр.
+ общее дерево (moma.meta), под которым каждый экземпляр создает устройство \ <hostname \>, содержащее ссылку на экземпляр и некоторую информацию для мониторинга.
+ админка для обслуживания (обновления операционной системы, js-контроллера, адаптеров)

## Справка
Вкладка администратора MoMa доступна для запуска обновлений или, при необходимости, перезагрузки.

При запуске однократно вызываются следующие функции информации о библиотечной системе:

* baseboard - Информация о материнской плате компьютера
* шасси - Информация о шасси компьютера.
* bios - Информация о BIOS компьютеров
* system - Информация о производителе компьютеров.
* cpu - Информация о процессоре компьютера
* cpuFlags - доступные флаги процессора
* memLayout - Информация о микросхемах памяти компьютеров
* diskLayout - Информация о жестких дисках компьютеров

Следующие функции информации о библиотечной системе вызываются в интервале 0 (по умолчанию каждую секунду):

* time - Фактическое время, часовой пояс и время безотказной работы
* cpuCurrentSpeed - Фактические частоты процессора и ядра
* networkConnections - Фактические сетевые подключения
* currentLoad - Фактическая загрузка процессора
* процессы - Обзор процесса с process.list в виде HTML-таблицы

Следующие функции информации о библиотечной системе вызываются в интервале 1 (по умолчанию каждые 10 секунд):

* mem - Информация об использовании памяти
* cpuTemperature - Температура процессора и ядер
* networkStats - Сетевая статистика
* fullLoad - Средняя загрузка с момента последней загрузки

Следующие функции информации о библиотечной системе вызываются с интервалом 2 (по умолчанию каждую минуту):

* battery - состояние заряда и информация о батарее
* users - Текущие пользовательские сеансы
* fsSize - Информация о файловой системе компьютера
* blockDevices - Подключенные блочные устройства
* fsStats - Статистика доступа к файлам - не поддерживается в Windows
* disksIO - IO статистика блочных устройств - не поддерживается в Windows

В интервале 3 вызываются следующие функции информации о библиотечной системе (по умолчанию каждый час):

* networkInterfaceDefault - сетевой интерфейс по умолчанию
* networkInterfaces - Доступные сетевые интерфейсы
* графика - Информация о видеокартах компьютеров и подключенных мониторах
* inetLatency - Проверить задержку интернета по сравнению с 8.8.8.8
* dockerInfo - Общая информация о докере - требуется "докер adduser iobroker" на машине, прежде чем он будет работать должным образом.
* dockerContainers - список всех контейнеров докеров - требуется «докер adduser iobroker» на машине, прежде чем он будет работать должным образом.

В интервале 4 вызываются следующие функции информации о библиотечной системе (по умолчанию каждый день):

* osInfo - Информация об операционной системе компьютера
* uuid - UUID установки
* shell - системная оболочка по умолчанию - не поддерживается в Windows
* версии - Версии установленных программных пакетов

Следующие функции **MoMa** вызываются в интервале 4 (по умолчанию каждый день):

* updates - проверяет наличие ожидающих обновлений и показывает количество обновлений в moma.meta. \ <hostname \>. updates (в настоящее время только Ubuntu, Debian, openSUSE, RedHat)
* checkIob - проверяет все адаптеры и js-контроллер на наличие доступных обновлений
* checkBatteries - проверяет переменные состояния батареи (текущие реализованные названия состояний: LOWBAT, LOW_BAT)

## Changelog

### 1.2.8 (2021-03-26)
* (AWhiteKnight) eliminate warning messages (issue #52), upgrade to systeminformation lib 5.6.8
	- in systeminformation many states of currentLoad have been renamed. The old ones will be deleted and the new ones created. Have a look into the logs.

### 1.2.7 (2020-10-18)
* (AWhiteKnight) remove leading i in names that are not a number, systeminformation lib 4.27.0 

### 1.2.6 (2020-04-27)
* (AWhiteKnight) fix typo, precise error location, systeminformation lib 4.23.6 

### 1.2.5 (2020-04-12)
* (AWhiteKnight) minor bugfixing, prepare stable release 

### 1.2.4 (2020-03-20)
* (AWhiteKnight) bugfixing: issues #45 #42 #24, controller update working again 

### 1.2.3 (2019-11-06)
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

Copyright (c) 2020 AWhiteKnight