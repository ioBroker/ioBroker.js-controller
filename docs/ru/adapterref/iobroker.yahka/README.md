---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: WQ/YjLhugOj3gHo0ZPfKVI0A3f1acCv5zoT5UHnmU4Y=
---
![логотип](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![Количество установок](http://iobroker.live/badges/yahka-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.yahka.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)

# Iobroker.yahka
## Установка и использование
Подробнее о том, как установить и настроить этот адаптер, см. [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki)

## Предпосылки
Прежде чем вы сможете установить адаптер, вам нужно несколько пакетов (для Linux):

```sudo apt-get install libavahi-compat-libdnssd-dev```

## Установить последнюю **версию**
Просто нажмите кнопку «+» за «Homekit yahka adapter» в панели администратора ioBroker на странице «Адаптер»

## Установите последнюю **бета-версию**
Если вы хотите быть на грани и протестировать последнюю бета-версию, вы можете установить адаптер через URL-адрес github. <br> (Иногда требуется дополнительная загрузка [например, iobroker upload yahka] и перезапуск адаптера) <br>

## Исправление проблем
### Доступны не все новые функции:
Если не все новые функции доступны после обновления yahka, попробуйте загрузить (например, iobrober yahka upload) и перезапустите адаптер.

### Пропал демон Avahi (linux)
Если у вас есть следующая ошибка в журнале: <br>

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

Вы должны сделать несколько дополнительных шагов:

* установить демон avahi:

```sudo apt-get install avahi-daemon -y```

* Редактировать avahi-daemon.conf

```sudo nano avahi-daemon.conf ```<br>
change the following variables:
```host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### Отсутствует пакет pam-devel (linux)
Если у вас есть следующая ошибка в журнале: <br>

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

Вы должны установить пакет pam-devel:

* установить демон avahi:

```sudo apt-get install pam-devel -y```

### Отсутствует Bonjour (окна)
- Загрузить: `` `https:// www.samuelattard.com / files / bonjourcore2.msi```
- Выполнить: `` `msiexec / i bonjourcore2.msi / qn```
- удалить: `` `del bonjourcore2.msi```
- Загрузить: `` `https:// www.samuelattard.com / files / bonjoursdksetup.exe```
- Выполнить: `` `bonjoursdksetup.exe / quiet```
- Удалить: `` `del bonjoursdksetup.exe```
- Установить: `` `установить BONJOUR_SDK_HOME = C: \ Program Files \ Bonjour SDK```

И после этого установите адаптер yahka.

## Несколько слов о HomeKit
Архитектура HomeKit выглядит следующим образом: <br> Есть **устройства** как логические объекты. Каждое устройство может иметь несколько **сервисов** и каждый сервис имеет несколько **характеристик** <br> В конце признак является конечной точкой, где значения могут быть считаны или записаны. <br> Какие характеристики может иметь сервис, определяется Apple / HomeKit и определяется типом сервиса. Типы услуг также определяются Apple / HomeKit.

Пример: <br> Устройство открывания гаражных ворот - это устройство, которое может иметь две службы: <br>

1. Гаражные ворота
2. Свет

Сам сервис открывания гаражных ворот может иметь разные характеристики, такие как: CurrentDoorState, TargetDoorState и многие другие. <br> Также у Световой службы могут быть разные характеристики, такие как: Вкл (и многие другие для изменения цвета и т. Д.)

## Что делает Яхка
С помощью Yahka можно сопоставить точку привязки ioBroker с характеристикой HomeKit. <br> Поскольку иногда требуется сопоставление (например, значения «State» гаражных ворот отличаются между HomeKit и другими системами), существует также возможность указать функции для преобразования значений. Это описано ниже. <br> Чтобы избежать слишком большой административной работы, все устройства, которые вы создаете в Yahka, находятся за так называемым «мостом». С этим мостом вам нужно всего лишь соединить мост с вашим устройством iOS, чтобы получить доступ ко всем устройствам. В противном случае вам нужно было бы соединить каждое устройство Yahka с Homekit.

## Настройте Мост и создайте устройства и сервисы
Каждое устройство, которое должно быть сопряжено с Homekit, нуждается в «имени пользователя», которое имеет форму mac-адреса. Yahka автоматически генерирует случайное имя пользователя для каждого экземпляра yahka. <br> **Важно: если вы меняете имя пользователя после сопряжения Yahka с HomeKit, вам необходимо перенастроить все устройства в iOS (назначение комнаты, местоположение и т. Д.). Изменение имени пользователя означает для iOS, что это совершенно новое устройство!** <br> Рядом с именем пользователя необходимо указать PIN-код, который необходимо ввести на устройстве iOS. Все это можно указать, нажав «: yahka.0» в админ-панели Yahka. (Разверните панель справа после нажатия на запись в списке). Название моста также можно изменить там.

После настройки моста вы можете добавить нужные вам устройства с помощью кнопки «Добавить устройство» вверху. После того, как устройство добавлено / выбрано, вы можете добавить сервисы на это устройство. <br> Необходимо указать название сервиса и тип сервиса. <br> В зависимости от типа услуги, список доступных изменений характеристик <br>

## Настройка характеристик
Если вы хотите поддержать признак, вы должны поставить галочку «включено» в левой части признака.
Для каждой характеристики вы можете указать следующие свойства:

- InOutFunction: вы можете указать предопределенную функцию, которая отвечает за передачу значений из HomeKit в ioBroker и наоборот
- InOutParameter: здесь вы можете указать параметры для выбранной функции InOutFunction. Доступные / ожидаемые параметры зависят от выбранной функции. Краткий обзор функций и параметров приведен ниже.
- ConversionFunction: в дополнение к InOutFunction, вы также можете указать функцию, которая преобразует значение из HomeKit в ioBroker (и наоборот)
- ConversionParameter: так же, как InOutParameter - доступные / ожидаемые параметры зависят от выбранной функции.

## Обзор InOut-функций
| Функция | Ожидаемый параметр | Описание |
|---|---|---|

| const | Значение | Функция const всегда передает значение, указанное в «InOutParameter», в функцию преобразования, если HomeKit считывает значение. Если HomeKit хочет записать значение, это действие запрещается

| ioBroker.State | имя ioBroker datapoint | С помощью этой функции адаптер использует указанный ioBroker datapoint для операций чтения и записи. Все операции выполняются немедленно без буферизации или фильтрации (значения передаются указанным функциям преобразования) |
| ioBroker.State.Defered | имя точки данных ioBroker | С помощью этой функции адаптер использует указанную точку данных ioBroker для операций чтения и записи. Операции записи из HomeKit напрямую передаются в функцию преобразования. Изменения от ioBroker аннулируются в течение 150 мс - это означает, что значение передается в HomeKit, только если в течение 150 мс не произошло никаких других изменений. |
| ioBroker.State.OnlyACK | имя точки данных ioBroker | С помощью этой функции адаптер использует указанный элемент данных ioBroker для операций чтения и записи. Операции записи из HomeKit напрямую передаются в функцию преобразования. Изменения из ioBroker пересылаются в HomeKit только в том случае, если установлен «Acknowledged» -Flag значения. В противном случае последнее подтвержденное значение передается в HomeKit |
| ioBroker.homematic. <br> WindowCovering.TargetPosition | Идентификатор точки присоединения уровня HomeMatic <br> или <br> String-Array с идентификатором уровня Datapoint и идентификатором рабочего Datapoint | Эта функция специально предназначена для управления покрытием HomeMatic Window. Эта функция защищает передачу значений в HomeKit во время перемещения покрытия окна. Это необходимо, чтобы избежать мерцания ползунка покрытия окна в iOS |

## Обзор функций преобразования
| Функция | Ожидаемый параметр | Описание |
|---|---|---|

| passthrough | \ <none \> | Значение из ioBroker передается в HomeKit без преобразования (и наоборот)

| HomematicDirectionTo <br> HomekitPositionState | \ <none\> | Эта функция отображает перечисление направления покрытия окна Homematic на перечисление PositionState HomeKit (и обратно) |
| HomematicControlModeTo <br> HomekitHeathingCoolingState | \ <none\> | Эта функция отображает перечисление ControlMode Homematic в перечисление HeathingCoolingState HomeKit (и обратно) |
| scaleInt <br> scaleFloat | ```{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }``` | Эта функция похожа на «level255», но она более общая. Он преобразует значение ioBroker с диапазоном от «iobroker.min» (0, если опущен) в «iobroker.max» в значение HomeKit со значением в диапазоне от «homekit.min» (0, если опущен) в «homekit.max» (и назад). <br> **Пример:** Если поле параметра: ```{ "homekit.max": 500, "iobroker.max": 250}``` <br> значение ioBroker фактически умножается на 2 перед отправкой его в HomeKit. <br> **Минимальные параметры доступны только в версии 0.8.0 и выше** |
| обратный | номер | Эта функция используется для «инвертирования» значения из ioBroker. Параметр указывает максимум значения в ioBroker. Формула: ```Parameter - value``` <br> **Пример:** Если поле параметра равно ```100```, значение 100 из ioBroker отправляется как 0 в HomeKit, значение 80 отправляется как 20 в HomeKit и т. Д. |
| hue | \ <none \> | Эта функция является специализированной версией scaleInt с параметрами ```iobroker.max=65535``` и ```homekit.max=360```. |
| hue | \ <none \> | Эта функция является специализированной версией scaleInt с параметрами `` `iobroker.max = 65535``` и` `` homekit.max = 360```. |

## Привод слепой Homematic \ Покрытие окон
Для интеграции слепых приводов Homematic (например, HM-LC-Bl1PBU-FM) необходимы следующие настройки:

* Добавить услугу на устройство
* Установите имя службы на какое-то имя, а тип службы на «WindowCovering». Подтип сервиса можно оставить пустым
* Включите и заполните следующие характеристики:

| Имя признака | 1: Функция InOut <br> 2: Функция преобразования | 1: Параметры InOut <br> 2: Параметры преобразования |
|---|---|---|
| CurrentPosition | 1: ioBroker.State.OnlyACK <br> 2: прохождение | 1: _ \ <path to homematic object\> _.1.LEVEL <br> 2: \ <empty\> |
| PositionState | 1: ioBroker.State.OnlyACK <br> 2: HomematicDirectionToHomekitPositionState | 1: _ \ <path to homematic object\> _.1.DIRECTION <br> 2: \ <empty\> |
| TargetPosition | 1: ioBroker.homematic.WindowCovering.TargetPosition <br> 2: прохождение | 1: _ \ <path to homematic object\> _.1.LEVEL <br> 2: \ <empty\> |

Значение _ \ <path to homematic object \> _ необходимо заменить фактическим путем к устройству (например, hm-rpc.0.NEQ0012345)

Для получения общей информации о маске конфигурации см .: TODO <br> Для получения дополнительной информации о конфигурации, функциях InOut и функциях преобразования см .: [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

## Changelog
### 0.10.0 (2020-02-19)
  (apollon77) updated dependencies, nodejs 12 support<br>

### 0.10.0
  (jw) updated dependencies<br>
  (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)<br>

### 0.9.2
  (jw) fixed a bug where the adapter didn't start anymore<br>
  (jw) removed the reference to the git repository of the hap community types<br>

### 0.9.1
  (jw) fixed a bug where the adapter crashes if a state does not exist<br>
  (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))<br>
  (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
  (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))<br>

### 0.9.0
  (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)<br>
  (jw) improved admin interface to support individual editors for IO/Conversion functions<br>
  (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions<br>
  (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) <br>
  (jw) added ioFunction "MultiState" to get multiple states and/or seperate between read and write states <br>
  (jw) added conversion function "map" to customize mappings betwen ioBroker and HomeKit <br>
  (jw) added possibility to specifiy IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86))<br> 
  (jw) switched to webpack and refactored admin interface and io/conversion functions <br>
  (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))<br>
  (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))<br>
  (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))<br>
  (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))<br>
  (jw) added support for specifiyng device information via datapoints ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))<br>
  (SchumyHao) added Chinese support
  
### 0.8.2
  (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption<br>

### 0.8.1
  (jw) updated dependencies<br>
  (jw) change default name of new instances<br>
  (foxriver76) remove excessive logging<br>
  (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)<br>
  (arichter83) added "Duplicate Device" functionality<br>

### 0.7.1
  (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore<br>
  (jw) restructured repository to support install via url<br>

### 0.7.0 
  (bluefox) Fixed the ID select dialog in Admin3<br>
  (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve<br>
  (jw) added ip-package to dependencies to avoid errors on some installations<br>

### 0.6.1 
  (jw) fixed startup crash<br>

### 0.6.0
  (jw) add support for IP-Cameras<br>
  (jw) included iOS 11 device definitions<br>
  (jw) allowed negative temperatures for temperature sensors<br>
  (jw) fixed crashes due to duplicate device names<br>
  (oliverschulze) added conversion functions "hue" and "level255"<br>
  (jw) added conversion functions scaleInt, scaleFloat and inverse<br>
  (jw) devices are now sorted by name in the admin panel<br>

### 0.5.5
  (bluefox) allow select ID in configuration dialog<br>

### 0.5.4
  (jw) improve logoutput<br>
  (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping<br>

### 0.5.3
  (jw) internal release<br>

### 0.5.2
  (jw) fixed issues with empty characteristic values<br>
  (jw) fixed issue with empty adapter.systemConfig.system object<br>

### 0.5.1
  (jw) fixed issue with wrongly displayed logo<br>

### 0.5.0
  (jw) initial release<br>

## License
The MIT License (MIT)

Copyright (c) 2016-2020 Jens Weigele (iobroker.yahka@gmail.com)

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