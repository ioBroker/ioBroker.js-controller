---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.linux-control/README.md
title: ioBroker.linux-control
hash: 4vljRlLuB+7ulE1Q6N15aOyRbqb2lmzu3vXqqu7mVDA=
---
![Логотип](../../../en/adapterref/iobroker.linux-control/admin/linux-control.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.linux-control.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.linux-control.svg)
![Количество установок (последнее)](http://iobroker.live/badges/linux-control-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/linux-control-stable.svg)
![Статус зависимости](https://img.shields.io/david/Scrounger/iobroker.linux-control.svg)
![Известные уязвимости](https://snyk.io/test/github/Scrounger/ioBroker.linux-control/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.linux-control.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/Scrounger/ioBroker.linux-control/master.svg)

# IoBroker.linux-control
## Адаптер управления Linux для ioBroker
[![PayPal] (https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

Управление устройствами Linux и получение информации о вашей системе

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Конфигурация
### Генеральный
![генеральный](../../../en/adapterref/iobroker.linux-control/docs/en/img/general.png)

| установка | описание |
|-------|-----------|
| enabled | включить или отключить обновление хоста |
| идентификатор точки данных | идентификатор, под которым должны храниться все точки данных |
| IP | IP-адрес вашего Linux-устройства |
| Порт | SSH Порт вашего Linux-устройства |
| интервал опроса | интервал опроса в минутах.<br> Чтобы отключить опрос, вы можете использовать «0» или оставить поле пустым |
| user | ssh пользователь для входа |
| пароль / пароль | ssh пароль для входа или пароль, если вы используете ключ RSA |
| использовать Судо | используя sudo |
| ключ rsa | путь и имя файла вашего ключа rsa. Права доступа должны быть доступны! |
| тайм-аут | тайм-аут соединения |

### Datapoints
![Точки данных](../../../en/adapterref/iobroker.linux-control/docs/en/img/datapoints.gif)

Адаптер создает предопределенные точки данных с информацией и возможностью управления устройством Linux. Их можно выбрать здесь.
Кроме того, для каждого отдельного хоста отдельные точки данных или целые каналы могут быть помещены в черный список путем перетаскивания, чтобы они не создавались для хоста.

Обратите внимание: если вы хотите добавить весь канал в черный список, вы должны перетащить узел канала в черный список. Только тогда весь канал будет проигнорирован - см. Снимок экрана ниже:

![Точки данных](../../../en/adapterref/iobroker.linux-control/docs/en/img/all_to_blacklist.gif)

** Из-за множества различных дистрибутивов Linux эта функция протестирована только с Debian 10, Ubuntu 18/20 LTS! **

### Сервисы
![Сервисы](../../../en/adapterref/iobroker.linux-control/docs/en/img/services.png)

Если активирован поиск сервисов по точкам данных, вы можете определить здесь для каждого хоста, для которого сервисы должны извлекать только информацию.

** Из-за множества различных дистрибутивов Linux эта функция протестирована только с Debian 10, Ubuntu 18/20 LTS! **

### Папки
![Папки](../../../en/adapterref/iobroker.linux-control/docs/en/img/folders.png)

Здесь вы можете получить информацию о размере папок, количестве файлов, включенных в эти папки, и отметку времени последнего изменения в этой папке.

** Из-за множества различных дистрибутивов Linux эта функция протестирована только с Debian 10, Ubuntu 18/20 LTS! **

| установка | описание |
|-------|-----------|
| включен | включить или отключить обновление папки |
| Хост | Хост, который следует использовать |
| идентификатор точки данных | идентификатор, под которым должны храниться все точки данных |
| Путь | путь к папке |
| шаблон имени файла | шаблон для имен файлов, которые должны быть преобразованы. |
| Единица | Единица по размеру |
| десятичных знаков | десятичных знаков |
| количество файлов | создать точку данных для подсчета файлов |
| последнее изменение | создать точку данных для отметки времени последнего изменения в этой папке |

### Мои команды
![Пользовательские команды](../../../en/adapterref/iobroker.linux-control/docs/en/img/myCommands.png)

Здесь можно определить очень индивидуальные команды, а затем записать их в ваши собственные определенные точки данных.
Важно, чтобы полученные данные передавались в правильном виде! Затем необходимо соответствующим образом настроить тип.

| установка | описание |
|-------|-----------|
| enabled | включить или отключить обновление команды |
| Хост | Хост, который следует использовать |
| идентификатор точки данных | идентификатор, под которым должны храниться точки данных |
| интервал опроса | разный интервал опроса в секундах только для команды. Для деактивации используйте `0` или оставьте поле пустым, тогда будет использоваться интервал опроса от хоста |
| команда | команда, которую следует использовать<br><br> Если вы используете пользователя, которому требуется `sudo`, тогда вам нужно добавить `sudo -S` в свою команду! |
| команда | команда, которую следует использовать<br><br> Если вы используете пользователя, которому требуется `sudo`, вы должны добавить` sudo -S` в свою команду! |
| тип | тип точки данных |
| unit | единица точки данных |

## Известные вопросы
* если невозможно получить соединение с вашим клиентом linux, проверьте, правильно ли установлен iputils-ping на клиенте

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 1.1.0 (2020-12-23)
* (paul53) datapoints type and role bug fixes
* (Scrounger) adapter settings card layout added

### 1.0.1 (2020-11-04)
* (Scrounger) translation for polling interval optimized

### 1.0.0 (2020-09-30)
* (Scrounger) bump to stable

### 0.3.7 (2020-09-19)
* (Scrounger) subscribe bug fix for user commands

### 0.3.6 (2020-09-17)
* (Scrounger) Bug fix for function needrestart if sudo is used

### 0.3.5 (2020-09-15)
* (Scrounger) Fixed some errors reported via Sentry

### 0.3.4 (2020-09-09)
* (Scrounger) bug fixes

### 0.3.3 (2020-09-09)
* (Scrounger) bug fix for datapoints creation

### 0.3.2 (2020-09-07)
* (Scrounger) performance optimizations
* (Scrounger) Fixed some errors reported via Sentry

### 0.3.1 (2020-08-23)
* (Scrounger) datapoint info lastRefresh added

### 0.3.0 (2020-08-23)
* (Scrounger) button to manual refresh a single host added
* (Scrounger) userCommand: ignore polling interval if type is button
* (Scrounger) userCommand: individual polling intervals added
* (Scrounger) userCommand: bug fix if sudo is used
* (Scrounger) refresh services info after using command
* (Scrounger) services command: bug fix for using sudo

### 0.2.7 (2020-08-17)
* (Scrounger) option to deactive polling for hosts added
* (Scrounger) bug fixes for using sudo

### 0.2.6 (2020-08-15)
* (Scrounger) Node-SSH bug fix

### 0.2.5 (2020-08-15)
* (Scrounger) sentry error handling optimized
* (Scrounger) info datapoints added, isOnline changed to info.is_online

### 0.2.4 (2020-08-12)
* (Scrounger) datapoint isOnline added
* (Scrounger) settings: styles optimized
* (Scrounger) userCommand: null values if response is null or empty
* (Scrounger) bug fixes

### 0.2.3 (2020-08-09)
* (Scrounger) bug fixes

### 0.2.2 (2020-08-09)
* (Scrounger) bug fixes

### 0.2.1 (2020-08-09)
* (Scrounger) bug fixes

### 0.2.0 (2020-08-08)
* (Scrounger) optional folder datapoints for count of files and last change added
* (Scrounger) enable options for hosts, folders and user commands added
* (Scrounger) using sudo implemented
* (Scrounger) type array for user commands added
* (Scrounger) ignore whole datapoints node by using drag and drop 
* (Scrounger) error handling for user commands improved
* (Scrounger) Sentry implemented
 

### 0.1.0 (2020-05-20)
* (Scrounger) added datapoints blacklist configurable for each host individually
* (Scrounger) added poll interval configurable for each host individually
* (Scrounger) configuration bug fixes

### 0.0.3 (2020-05-16)
* (Scrounger) added services whitelist configurable for each host individually

### 0.0.1
* (Scrounger) initial release

## License
MIT License

Copyright (c) 2020 Scrounger <scrounger@gmx.net>

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