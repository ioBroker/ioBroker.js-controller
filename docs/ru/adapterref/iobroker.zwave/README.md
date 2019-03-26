---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zwave/README.md
title: ioBroker zwave Адаптер
hash: MOnafPN3SVLChdx3C9Oqj/6x3xtrLHFZZIq5xCd9rdg=
---
![логотип](../../../en/adapterref/iobroker.zwave/admin/zwave.png)

![Количество установок](http://iobroker.live/badges/zwave-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.zwave.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zwave.svg)
![NPM](https://nodei.co/npm/iobroker.zwave.png?downloads=true)

# IoBroker Адаптер zwave ==============
Поддержка Zwave с openzwave.

Для этого адаптера используется достаточно неплохой поддерживаемый модуль npm: https://github.com/OpenZWave/node-openzwave-shared Вы должны узнать, как называется USB-порт Z-Wave флешки и настроить его в настройках адаптера.

## Важная информация
- При первом запуске адаптеру требуется некоторое время, чтобы вычислить все объекты в iobroker.
- Если вы добавляете устройство, дайте адаптеру выполнить свою работу и немного подождите.
- Если устройство не отображается на включенном сайте регистрации, оно не полностью импортируется в ioBroker.

## Монтаж
Прежде всего, реализация протестирована только на ARM Linux (например, Raspberry Pi (2)).
Вам нужна полностью среда разработки (gcc, make, ...)

### Установить дополнительные пакеты
На некоторых системах необходимо будет установить дополнительные пакеты. Поэтому перед установкой адаптера выполните на консоли следующее:

```bash
apt-get install pkg-config libudev-dev build-essential curl unzip
```

### Только Raspberry Pi3: активировать GPIO UART
На Raspberry Pi 3 UART по умолчанию занят модулем Bluetooth. Чтобы активировать его для использования с модулем GPIO, выполните следующие действия:

1. `sudo nano / boot / cmdline.txt`
1. удалить `console = serial0,115200`
1. сохраните файл и закройте его

2. `sudo nano / boot / config.txt`

Посмотрите на каждую из следующих строк. Если они закомментированы в `#`, удалите это. Если они не существуют, добавьте их в конец файла:

* `dtoverlay = pi3-miniuart-bt`
* `enable_uart = 1`
* `force_turbo = 1`

3. перезагрузка

### Первый старт
Модуль GPIO обычно имеет адрес, подобный `/dev/ttyAMA0` или `/dev/ttyACM0`.
Флэш-накопитель USB находится в разделе `/dev/ttyUSB0` или `/dev/ttyUSB1`.

- Зайдите в админ iobroker и добавьте адаптер Zwave (установка довольно долгая, наберитесь терпения)
- Запустите новый экземпляр адаптера zwave и выберите адрес устройства контроллера из выпадающего меню в интерфейсе администратора.
- Если ваше устройство не обнаружено, проверьте его или попробуйте вручную ввести его адрес, когда адаптер выключен.
- Дождитесь, пока индикатор на вкладке «Экземпляры» не загорится зеленым или в журнале iobroker не появится сообщение «Сканирование завершено».

### Известные вопросы
Если вы получаете следующую (или похожую) ошибку после запуска адаптера

```
libopenzwave.so.1.4: cannot open shared object file: No such file or directory
```

Вы можете исправить это, запустив

```
sudo ldconfig
```

или же

```
sudo ldconfig /usr/local
```

или же

```
sudo ldconfig /usr/local/lib64
```

Если все эти команды не работают, следующий процесс может:

1. `sudo nano / etc / ld.so.conf.d / zwave.conf`
1. введите `/ usr / local / lib64`
1. выйдите из редактора с помощью `CTRL + X`, подтвердите нажатием` Y`, чтобы сохранить изменения

1. `sudo ldconfig`

## Конфигурация
В настройках администратора вы можете установить следующие атрибуты

- Принудительно повторно инициализировать объекты (Реинициализировать все объекты внутри ioBroker)
- USB-имя (USB-порт вашей Z-Wave флешки)
- ведение журнала (включите ведение журнала в OZW_Log.txt)
- Вывод на консоль (копирование логирования в консоль, запись всех в ioBroker.log)
- Сохранить конфигурацию (напишите сетевой макет XML, создайте /zwcfg_<HOMEID>.xml в linux)
- Попытки водителя (попробуйте это много раз, прежде чем сдаться)
- Интервал опроса (интервал между опросами в миллисекундах)
- Подавить обновление (не отправлять обновления, если ничего не изменилось)

![админ настройка](../../../en/adapterref/iobroker.zwave/img/admin-settings.png)

## Logfiles / Configuration Settings
Если вы установили iobroker в папку по умолчанию:

 - Лог-файл: /opt/iobroker/node_modules/iobroker.zwave/node_modules/openzwave-shared/OZW_Log.txt в Linux
 - Конфигурация: /opt/iobroker/node_modules/iobroker.zwave/node_modules/zwcfg_<HOMEID>.xml в Linux

## Устройство добавить или удалить
Если вы добавляете или удаляете устройство, это занимает 60 секунд. Затем страница автоматически перезагружается.

Если вы измените имя или местоположение, это займет 5 секунд. Затем страница автоматически перезагружается.

## Характеристики
В OpenZWave Configurator вы можете видеть все узлы и их классы.

Следующие действия в настоящее время поддерживаются (только с контекстным меню):

- Установить имя и установить местоположение для самого узла
- Изменить значение класса

В настоящее время поддерживаются следующие глобальные действия:

- Добавить узлы
- Удалить узлы
- Обновить узлы (Обновить узлы от ioBroker Communication)

## Сделать
### ZWave Specific
- Сцены
- Групповое управление
- опрос
- Команды контроллера
- Команды настройки

### Глобальный
- Проверьте больше оборудования
- Переместите конфигурацию и файл журнала в путь по умолчанию iobroker (/ opt / iobroker / log, / opt / iobroker / data / files / zwave)
- Языковая поддержка (английский, немецкий, русский)

## Проверенное оборудование
### ZWave
- USB-флешка ZME_UZB1
- RazBerry GPIO Board для RaspBerry (1/2)

### Фибаро
- FGBS001 Универсальный бинарный датчик
- Двойной Реле FGS222 2x1,5 кВт
- FGWPE Стенная вилка
- FGSS001 Датчик дыма
- датчик движения FGMS001
- FGS-223 Двойной выключатель 2
- Рольставни FGR-222 2
- FGDW-002 Датчик двери / окна 2

### Данфосс
- Комнатный термостат Danfoss Living Connect (тип 0003, id 8010)
- Danfoss Z Термостат 014G0013

## Changelog

### 1.3.2 (2018-11-28)
* (AlCalzone) Replace all chars in state IDs that are forbidden in JS-Controller 1.5+
* (AlCalzone) Include @types/iobroker and strongly type adapter config properties

### 1.3.0
* (AlCalzone) Experimental support for CentralScene

### 1.2.0 (2018-07-25)
* (AlCalzone) Forbidden chars in state IDs are replaced

### 1.1.0 (2018-05-01)
* (AlCalzone) Use new OZW version for compatibility with NodeJS 10

### 1.0.0 (2018-01-31)
* (AlCalzone) Simplified resolving the location of the JS-Controller

### 0.9.0 (2017-10-28)
* (AlCalzone) Fixed lifeline detection in admin UI
* (AlCalzone) Updated buttons to match their behaviour in OZW
* (AlCalzone) Only set adapter status to green after OZW is done initializing
* (AlCalzone) Fixed hard reset: also delete all nodes from ioBroker
* (Pmant/AlCalzone) Parse decimal values into floats, not strings

### 0.8.0 (2017-07-12)
* (Apollon77) Update to Openzwave-shared 1.4

### 0.7.0 (2017-07-12)
* (Pmant/AlCalzone) Several fixes and add association ui

### 0.6.0 (2017-05-01)
* (Pmant) Support secure devices

### 0.5.2 (2017-04-05)
* (AlCalzone) improved handling of instance status objects

### 0.5.0 (2017-01-08)
* (bluefox) Update openzwave-shared
* (ekarak) Change install process

### 0.4.4 (2016-11-27)
* (AlCalzone) Fix enumeration values

### 0.4.3 (2016-11-26)
* (bluefox) add state "info.scanCompleted"

### 0.4.2 (2016-11-15)
* (AlCalzone) Read devices from dev and not from serialport

### 0.4.1 (2016-11-14)
* (AlCalzone) Allow set of parameters

### 0.4.0 (2016-11-01)
* (bluefox) Rewrite adapter completely

### 0.2.5 (2015-12-21)
 - (husky-koglhof) Object tree build now on change/added/ready from zwave
 - Default Role/Type/State (needed for history)
 - openzwave-shared 1.1.6
 - last openzwave from github
 - OpenZWave Security

### 0.2.4 (2015-12-05)
 - (husky-koglhof) fixed hardcoded values
   Admin Page can Add / Remove ZWave Devices

### 0.2.3 (2015-11-11)
 - (bluefox) try to fix io-package.json

### 0.2.2 (2015-09-28)
 - (ekarak) API changes for openzwave-shared 1.0.8+

### 0.2.3 (2015-11-11)
 - (bluefox) try to fix io-package.json

### 0.2.2 (2015-09-28)
 - (ekarak) API changes for openzwave-shared 1.0.8+

### 0.2.1 (2015-08-24)
 - (husky-koglhof) Fixed Errors with Config save at OpenZwave Configurator

### 0.2.0 (2015-08-05)
 - (husky-koglhof) Added OpenZWave Configurator, changed Dependency from openzwave to openzwave-shared, Implemented stateChange, objectChange Functions, Implemented extended Settings

### 0.1.0 (2015-01-03)
 - enable npm install.

### 0.0.9 (2014-11-22)
 - Support of new naming concept.

### 0.0.8 (2014-10-31)
 - Fix names of classes.

### 0.0.6 (2014-10-30)
 - Show in config found tty ports.

### 0.0.3 (2014-10-30)
 - Classify channels.

### 0.0.2 (2014-10-28)
 - Initial commit. Still non-functional.

## License

Copyright (c) 2014-2018 bluefox <dogafox@gmail.com>, husky-koglhof <husky.koglhof@icloud.com>

SOFTWARE NOTICE AND LICENSE

OpenZWave is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License,
or (at your option) any later version.

OpenZWave is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with OpenZWave.  If not, see <http://www.gnu.org/licenses/>.