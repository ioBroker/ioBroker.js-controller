---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.km200/README.md
title: ioBroker.km200
hash: 0jOL48Jt7HVKEcKPFioyMHDFRzdxzYyUjNfUNvtkCA8=
---
# IoBroker.km200

![Версия NPM](http://img.shields.io/npm/v/iobroker.km200.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.km200.svg)
![Количество установок](http://iobroker.live/badges/km200-installed.svg)
![Трэвис-CI](http://img.shields.io/travis/frankjoke/ioBroker.km200/master.svg)
![NPM](https://nodei.co/npm/iobroker.km200.png?downloads=true)

## Для Buderus KM50 / KM100 / KM200 / KM300 и Junkers / Bosch MB LANi
![логотип](../../../en/adapterref/iobroker.km200/admin/km200.png)

[Немецкий мануал](README_DE.md)

Адаптер поддерживает следующую систему отопления:

* Buderus с [сетевыми адаптерами] (https://www.buderus.de/de/produkte/catalogue/alle-produkte/7719_gateway-logamatic-web-km200-km100-km50) KM50, KM100, KM200 и KM300
* Юнкерс с [сетевым адаптером] (https://www.bosch-smarthome.com/de/mblani) MB LANi
* Bosch с [Сетевым адаптером] (https://www.bosch-smarthome.com/en/mblani) MB LANi

Для доступа к системам я использую код, первоначально разработанный Андреасом Ханом и описанный в его блоге [запись здесь] (https://www.andreashahn.info/2014/07/kernthema-am-eigenen-leibe) и [запись там](https://www.andreashahn.info/2014/08/easycontrol-pro-unter-der-lupe-oder-m).

Система отопления может управляться через веб-сайт Buderus ([https://www.buderus-connect.de]) или с помощью приложения «EasyControl» с вашего мобильного телефона. Сайт App и Buderus также работает с системами отопления Junkers и Bosch.

Теперь это удалось в обоих направлениях, и адаптер уже полностью пригоден для использования.

Для этого необходимо сначала установить приложение на мобильный телефон и установить личный пароль.
Приложение запрашивает пароль устройства и имя для входа с устройства.

Адаптеру все еще нужны IP (или имя сети, например, «BuderusKM200.fritz.box») и адрес порта (порт 80 на устройстве, но если вы изменили его через маршрутизатор ...).

Если вы добавите '!' в конце адреса адаптер будет работать в режиме отладки и предоставлять много информации!

Поскольку адаптер должен запрашивать данные из системы, для которой я определил интервал обновления, он устанавливается не менее 5 минут, поскольку каждое обновление требует отдельного запроса.

Моя система (2 контура отопления и контур горячей воды) обеспечивает более 180 точек данных, которые я не могу использовать чаще всего, а некоторые являются двойными.

Вот почему я ввел черный / push-список, чтобы скрыть или показать определенные данные.
Этот список состоит из строк, похожих на RegExp (которые они преобразовывают с помощью адаптера), и сервисы в нагревателе затем фильтруются вместе с ними.

Синтаксис: `+` в самом начале означает, что это поле не должно быть пропущено, даже если другое правило заблокирует его.
A `-` не похож на ничто и подразумевает, что математическое состояние должно быть заблокировано.
каждое совпадение отделяется `,` и может включать в себя `/` или `^` для начала, `*`, которые соответствуют всему, и `Синтаксис: `+` в самом начале означает, что это поле не должно быть пропущено, даже если другое правило заблокирует его.
A `-` не похож на ничто и подразумевает, что математическое состояние должно быть заблокировано.
каждое совпадение отделяется `,` и может включать в себя `/` или `^` для начала, `*`, которые соответствуют всему, и  в конце, чтобы соответствовать концу.
Строки чувствительны к регистру! Если вы хотите узнать, какие состояния были найдены, включите режим отладки и удалите все блокировки, тогда вы найдете все заявленные созданные и можете заблокировать ненужную дату с помощью списка блокировки.
Примеры: с помощью `+*temp*` вы можете добавить все, что содержит 'temp', а с помощью `_HourlyСинтаксис: `+` в самом начале означает, что это поле не должно быть пропущено, даже если другое правило заблокирует его.
A `-` не похож на ничто и подразумевает, что математическое состояние должно быть заблокировано.
каждое совпадение отделяется `,` и может включать в себя `/` или `^` для начала, `*`, которые соответствуют всему, и `Синтаксис: `+` в самом начале означает, что это поле не должно быть пропущено, даже если другое правило заблокирует его.
A `-` не похож на ничто и подразумевает, что математическое состояние должно быть заблокировано.
каждое совпадение отделяется `,` и может включать в себя `/` или `^` для начала, `*`, которые соответствуют всему, и  в конце, чтобы соответствовать концу.
Строки чувствительны к регистру! Если вы хотите узнать, какие состояния были найдены, включите режим отладки и удалите все блокировки, тогда вы найдете все заявленные созданные и можете заблокировать ненужную дату с помощью списка блокировки.
Примеры: с помощью `+*temp*` вы можете добавить все, что содержит 'temp', а с помощью  вы можете заблокировать все, что имеет '_Hourly' в конце, оба вместе будут блокировать все _Hourly в конце, которые не имеют Темп в их имени.

Мой список выглядит как `/gateway*, /recordings*,*SwitchPrograms*,/HeatSource*, *HolidayModes*` И скрывает около 90 из ~ 180 записей о моем заводе.

Сейчас доступны два других расписания: быстрое (для состояний, опрашиваемых быстрее, чем каждые 30 минут) и медленное для состояний, опрашиваемых по часам или многочасовым циклам.
Это позволяет отслеживать некоторую информацию, такую как температура в циклах 1-5 минут, и другие элементы в обычных циклах 20 минут. Те, которые обычно не меняются в течение часа (например, _Daily $ или _Monthly $ и несколько других общих данных), не нужно читать даже каждые 30 минут, потому что они не изменятся.
Эта стратегия помогает получать более быстрые показания для важных данных и более медленные показания для не столь важных.

Данные для записи являются (небольшими) историческими данными в системе отопления. Есть 3 различных варианта: _Hourly, _Daily и Monthly.
Ежечасно покрывает последние 48 часов. _Дни последние 2 месяца и Ежемесячно не более года, все с текущего времени отсчета. Некоторые точки данных показывают меньше точек данных.
Вы должны понимать, что адаптер собирает данные из 3 отдельных вызовов для каждого записанного назначения данных!

`switchPrograms` также можно повторить и записать, это строка JSON, которая отражает массив дней недели. Пожалуйста, не меняйте формат, только цифры при загрузке. Кажется, цифры в минутах могут быть установлены только с шагом 15 минут!

Начиная с версии 1.1.2, скобки и запятые могут быть опущены, а заблокированные / вставленные значения могут быть записаны только через запятую!

Система работает со службами, которые структурированы как дерево каталогов, и это реплицируется в адаптере.

### Важно, если km200 обновлен с версии 1.1. *
Если вы ввели 64-значный ключ доступа, вам не нужен пароль, но его не следует оставлять пустым, просто напишите что-нибудь!

## Важный
*Для адаптера требуется узел> = v6.1.*

## Делать
* Дополнительная языковая поддержка и перевод текста

## Changelog

### 2.0.3

* Adapter config update
* Blacklist is working now for any combination
* Added option not to delete unsused states

### 1.9.9

* Beta for v2.0.0
* Implemented recordings for hourly, daily and monthly data
* Changed readout for 'mins' units to enable these fields for read/write
* Implemented 2 additional time schedule where you can define fast cycle (1-30 minutes), normal with 30-60 minutes and slow with 1-24 hours. You define the lists whjich go to fast or slow in a similar way than the blocklist.
* Blocklist syntax changed sligly. `/` or `^` first is for from beginning, `*` can now be everywhere and `$` can be the end
* `switchPrograms` are supported now for read and write!  

### 1.2.4

* Beta for next version, recordings supported

### 1.2.3 
* Implemented a correction to show also switchPrograms

### 1.2.2
* Adapter works also only with accesskey iin old 64 digit hex format without private passwort.

### 1.2.1 
* Adapter supports now compact mopde
* Adapter uses other module and removes need for mcrypt which makes it working on all platforms
* Adapter can now have debug mode set via '!' at end of address
* Adapter needs node >=v6


### 1.2.0
* Integrating Schupu's changes and also make the adapter ready for compact mode
* Update of adapter should continue to work with old settings

### 1.1.7
* (Schmupu) Supports Admin3
* (Schmupu) Only device password and own password needed. You do not have to get the access code anymore.

### 1.1.6
Adapter communication and retries more often to catch more errors.
* Writes are also retried
Added blocklist text in config screen

### 1.1.2
* Adapter handles better communication and retries if he got an error.
* you can set debug-mode by adding 'debug!' in front of host.
* Host port is not required and can be added to hostname with: xxx at end.
* Simpler blocklist handling, which does not ask for device which services are blocked

### 0.4.3
* Renamed repository to ioBroker.km200

### 0.4.3
Cleaning of objects / states for current adapters instance which are not part of scanned services anymore.

### 0.4.2
* Some small bug fixes and added some debug logs. Removed so dependency of 'request' and 'async' modules.

### 0.4.1
  Have only 'request' and 'async' with --save now also registered in the package.json ... Remember: Nuícht --save forget :(!

### 0.4.0
  Strings with allowedValues ​​are now converted to ioBroker states in both directions (read & write)

### 0.3.0
  Setting variables with numbers or strings now works.
  Thus, e.g. Target temperatures are changed.
  TODO: Enums and set tables

### 0.2.0
  Adapter now works with blacklist and in read-only mode.
  TODO: Implement setting values ​​in the heating system
  TODO: Implement variables with ENUMS (value lists)

### 0.1.0
  First test

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Frank Joke <frankjoke@hotmail.com>
Includes communications and crypto routines copyright (c) 2014 Andreas Hahn km200@andreashahn.info

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