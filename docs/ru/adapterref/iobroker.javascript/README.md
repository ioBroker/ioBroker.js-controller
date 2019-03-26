---
BADGE-Number of Installations: http://iobroker.live/badges/javascript-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.javascript.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.javascript.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.javascript.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.javascript.png?downloads=true
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.javascript/README.md
title: без названия
hash: 5W14HpUieIRGZnOboj1ymbUuSrVhwKc1726J97hsB8M=
---
Адаптер javascript используется для удобного создания, редактирования и управления сценариями.

## [](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)Конфигурация
![Меню настроек Javascript Adapter](../../../de/adapterref/iobroker.javascript/img/javascript_Einstellungen-Javascript.png) Фактическая конфигурация состоит из ввода дополнительных модулей npm (разделенных запятыми), а также гео-координат, которые будут использоваться для различных расчетов. Чтобы получить координаты, можно, например, _google maps_ немного увеличьте масштаб и нажмите на нужное место. Координаты затем отображаются. После сохранения адаптер все еще должен быть активирован с помощью красной кнопки воспроизведения.

* * *

## Операция
Во время установки в интерфейсе _Admin_ отображается другая вкладка _Scripte_. Здесь новая папка создается путем нажатия на (+) на панели инструментов (красный круг). Новый скрипт создается с помощью значка «пустой лист» слева. Откроется окно с запросом имени и местоположения в структуре папок.
![Javascript адаптер](../../../de/adapterref/iobroker.javascript/img/javascript_Javascript-Adapter.png)

### Список папок и файлов
Структура папок может быть создана по вашему желанию. Расположение не влияет на функциональность скрипта. Рядом с древовидной структурой находится список. Поле поиска облегчает получение сценариев. Для запуска сценария его необходимо активировать в структуре папок слева, нажав красную кнопку _Play_. Чтобы остановить, нажмите зеленую кнопку _Pause_. Для каждого скрипта создается новый объект. Он имеет имя сценария с добавлением `_enabled` и находится в папке `javascript.Instanz.ScriptEnabled`. Объект указывает (`true/false`), запущен ли сценарий. Состояние также может быть установлено для включения / выключения сценария. Скрипты, хранящиеся в папке _global_, являются глобальными скриптами. Они копируются внутри любого другого сценария, т.е. обрабатываются заранее. Таким образом, глобальные функции могут применяться к нескольким сценариям. Переменные в глобальных сценариях могут использоваться в других сценариях. Но будьте осторожны: каждый скрипт имеет свое собственное пространство переменных. Вы не можете использовать переменные в глобальных сценариях для обмена значениями между сценариями. Для этого должны использоваться объекты (состояния).

### Редактор
После создания редактор _Javascript_ открывается справа. Некоторые примеры сценариев можно найти в [здесь](http://www.iobroker.net/docu/?page_id=2786&lang=de).

#### Имя
Если вы ранее дали имя, оно будет отображено здесь и может быть изменено.

#### Местоположение
В этом раскрывающемся списке отображаются все созданные папки. В настоящее время они отсортированы в хронологическом порядке их создания.

#### Тип двигателя
Здесь вы можете работать с _javascript_ или движком _coffeescript_

#### Журнал
Внизу справа находится окно журнала для вывода всех журналов, касающихся выбранного сценария. Журналы отображаются после того, как скрипт был сохранен / перезапущен.

* * *

## Советы
### Резервное копирование
Для восстановления сценариев в случае сомнений рекомендуется выполнить резервное копирование через _Copy & Paste_.

### Тестовый экземпляр
Это оказалось полезным для тестирования новых сценариев, создания другого экземпляра JavaScript и запуска сценария в этом экземпляре.
За именем скрипта желаемый экземпляр можно установить с помощью выпадающего списка.
Если в скрипте есть фатальная ошибка, завершается только этот дополнительный экземпляр теста, а не производительный экземпляр.

![Выберите экземпляр Javascript Adapter](../../../de/adapterref/iobroker.javascript/img/screen.jpg)

## Changelog
### 4.1.12 (2019-03-07)
* (bluefox) Schedule was corrected

### 4.1.8 (2019-02-03)
* (jkuehner) Updated the blockly to the latest code
* (bleufox) scriptEnabled variables not only for experts
* (bleufox) fixed one error with "cannot extract blockly"
* (bluefox) GUI fixes
* (bluefox) show problem scripts as yellow pause icon

### 4.0.12 (2019-01-20)
* (Apollon77/AlCalzone) fixes unwanted changes in last version
* (SchumyHao) Add Chinese support

### 4.0.11 (2019-01-14)
* (bluefox) add set/getBinaryState

### 4.0.7 (2018-12-25) Breaking changes - no IE support anymore
* (bluefox) Material UI
* (AlCalzone) monaco javascript editor

### 3.7.0 (2018-05-05)
* (bluefox) Used VM2 as sandbox. The script errors will be caught.
* (bluefox) refactoring: split into many modules
* (AlCalzone) Change TypeScript version range to include TS 3.0+

### 3.6.5 (2019-02-13)
* (bluefox) Error with formatDate was fixed

### 3.6.4 (2018-02-05)
* (bluefox) Pattern error is fixed

### 3.6.3 (2018-01-31)
* (bluefox) Fixing the CSS for CRON dialog
* (bluefox) Fixing the reorder of scripts

### 3.6.1 (2018-01-23)
* (bluefox) Pattern error is fixed

### 3.6.0 (2017-12-28)
* (bluefox) more translations are added
* (bluefox) update blockly engine

### 3.5.1 (2017-11-14)
* (bluefox) fixed: sometimes MSG is not defined
* (AlCalzone) TypeScript support (preparations)
* (bluefox) add sendToHost call
* (bluefox) protect exec call
* (bluefox) add getStateDelayed function

### 3.4.4 (2017-09-12)
* (soef) typo error in line number correction fixed

### 3.4.1 (2017-08-12)
* (soef) patternMatching optimized

### 3.4.0 (2017-08-06)
* (bluefox) Support of new admin

### 3.3.12 (2017-07-24)
* (bluefox) file and line info added to log outputs

### 3.3.11 (2017-07-18)
* (bluefox) fix build CRON block

### 3.3.9 (2017-06-18)
* (bluefox) Add the toggle blockly block

### 3.3.8 (2017-05-22)
* (Apollon77/bluefox) Accept for subscribes arrays of IDs

### 3.3.6 (2017-05-17)
* (bluefox) add the genitive month for formatDate

### 3.3.4 (2017-04-01)
* (bluefox) Catch error by request if host unavailable
* (bluefox) add "request" to script namespace

### 3.3.3 (2017-03-27)
* (bluefox)Fix stopScript

### 3.3.2 (2017-03-18)
* (bluefox) Support of system coordinates

### 3.3.1 (2017-03-15)
 * (bluefox) fix error if no scripts exists

### 3.3.0 (2017-03-14)
* (bluefox) all callbacks in try/catch

### 3.2.8 (2017-03-08)
* (bluefox) Translations

### 3.2.7 (2017-03-03)
* (bluefox) allow creation of states for other javascript instances

### 3.2.6 (2017-02-14)
* (bluefox) Fix import of scripts
* (bluefox) Ask to save before start the script

### 3.2.5 (2017-01-23)
* (bluefox) Extend compareTime function with astro features

### 3.2.4 (2017-01-13)
* (bluefox) fix stopScript

### 3.2.3 (2017-01-05)
* (bluefox) Try to fix error with sayit

### 3.2.2 (2016-12-17)
* (bluefox) Allow with stopScript() to stop itself

### 3.2.1 (2016-11-24)
* (bluefox) Fix error with subscribe for only required states

### 3.2.0 (2016-11-14)
* (bluefox) Fix error with of blocks in adapters
* (bluefox) Support of subscribe for only required states
* (bluefox) add delFile
* (bluefox) fix error with names

### 3.1.0 (2016-10-12)
* (bluefox) Support of blocks in adapters
* (bluefox) Move sendTo blocks into adapters

### 3.0.10 (2016-09-30)
* (bluefox) New blocks: compare time, write state
* (bluefox) Documentation

### 3.0.9 (2016-09-20)
* (bluefox) Bugfixing of blockly

### 3.0.7 (2016-09-09)
* (bluefox) add ack for trigger in blockly
* (bluefox) add block to get info about trigger
* (bluefox) start description of blockly
* (bluefox) add runScript functions
* (bluefox) disable zoom on wheel in blockly
* (bluefox) fix block: time compare

### 3.0.6 (2016-09-07)
* (bluefox) add extendObject function
* (bluefox) add custom sendTo block
* (bluefox) add multiple trigger block

### 3.0.5 (2016-09-03)
* (bluefox) Fix sendTo blocks

### 3.0.4 (2016-09-01)
* (bluefox) Support of convert day of week into text in blockly

### 3.0.3 (2016-08-29)
* (bluefox) Fixed the convert date block

### 3.0.2 (2016-08-28)
* (bluefox) Change name of sandbox debug variable

### 3.0.1 (2016-08-27)
* (bluefox) Fix disabling of script

### 3.0.0 (2016-08-27)
* (bluefox) Beta Release with Blockly

## License

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>,

Copyright (c) 2014      hobbyquaker