---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ф
hash: WHThC2C72ZK1XeH7fiMjD2Xk2dKMo/A1XKd1OFx4/oc=
---
![логотип](../../../en/adapterref/iobroker.procon-ip/admin/iobroker-procon-ip.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
![сооружения](http://iobroker.live/badges/procon-ip-installed.svg)
![Статус зависимости](https://img.shields.io/david/ylabonte/iobroker.procon-ip.svg)
![Известные уязвимости](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![Трэвис-CI](http://img.shields.io/travis/ylabonte/ioBroker.procon-ip/master.svg)
![NPM](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)

# IoBroker.procon-ip
## Адаптер управления пулом ProCon.IP для ioBroker
Адаптер ioBroker для базовой поддержки блока управления бассейном ProCon.IP. Он предназначен для интеграции с вашей домашней автоматизацией ioBroker, например.
для построения логики, которая включает другие устройства или просто для работы в паре с вашим любимым голосовым помощником (ами):

* Вы можете использовать [_cloud_] (https://github.com/ioBroker/ioBroker.cloud) или

[_IoT_](https://github.com/ioBroker/ioBroker.iot) адаптер для Alexa (а также Google Home, я думаю) и

* [_yahka_] (https://github.com/jensweigele/ioBroker.yahka) в качестве моста к

  Apple HomeKit будет доступен Siri или

* используйте [_javascript_] (https://github.com/ioBroker/ioBroker.javascript), чтобы

  создайте свою собственную логику.

См. [вики](https://github.com/ylabonte/ioBroker.procon-ip/wiki) для получения дополнительной информации.

### Что такое пул управления ProCon.IP?
![Изображение с сайта pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

ProCon.IP pool control - это недорогой сетевой блок управления для домашних бассейнов. Благодаря программно переключаемым реле, он может управлять несколькими насосами (для фильтра бассейна и различных аспектов дозирования) либо просто по расписанию, либо в зависимости от показаний / значений одного из множества входных каналов для измерений (например, потока ввода / вывода). датчики, термометры Dallas 1-Wire, электроды окислительно-восстановительного потенциала и pH). По крайней мере, есть также возможность переключать эти реле по запросу, что делает их также применимыми для включения / выключения освещения (или чего-то еще, что вы хотите).
Не все его функции доступны через API. Фактически существует один документированный API для чтения (опроса) значений в виде CSV (`/GetState.csv`). В моих воспоминаниях был еще один для включения / выключения реле по таймеру. Но второго я уже не могу найти. Так что даже не красиво, но функционально: ProCon.IP имеет два встроенных веб-интерфейса, которые можно анализировать, чтобы перепроектировать заданную функциональность (например, переключение реле).

Для получения дополнительной информации см. Следующую ссылку (извините, это только на немецком языке; пока не нашел английской документации / информации):

* [Интернет-магазин pooldigital.de] (https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [форум pooldigital.de] (http://forum.pooldigital.de/)

** Для ясности: я не имею ничего общего с разработкой, продажей, маркетингом или поддержкой блока управления бассейном. Я только что разработал решение для интеграции этого с ioBroker, чтобы сделать дом моих родителей немного умнее. **

### Подробная информация об адаптере
Адаптер использует API `/GetState.csv` из ProCon.IP для опроса его значений и другой - не задокументированный - API, который работает с поразрядными командами для переключения реле. Второй также используется в исходных веб-интерфейсах ProCon.IP. Так что в будущем могут появиться обновления прошивки, которые тормозят совместимость с этим адаптером или, по крайней мере, функциональность переключения реле.

#### Совместимость
На данный момент адаптер протестирован и разработан в сочетании с прошивкой ProCon.IP **версии 1.7.0.c**

## Дорожная карта
### 1.0.0
** Стабильный выпуск: ** Он должен стать кандидатом на выпуск официального репозитория адаптеров ioBroker. Так как это буквально веха для этого проекта, я создал такие для соответствующих вопросов, чтобы отслеживать прогресс и сделать его более прозрачным для вас.

* Исправьте все открытые [контрольные проблемы] (https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)

  относительно тех, которые возникли в результате [обзор адаптера](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248))

* ~~ Добавьте документацию (сделайте github wiki полезной / полезной) ~~
* ~~ Показать статус соединения, включая отметку времени последнего обновления и системную информацию

ProCon.IP в виде вкладок (можно активировать, активировав соответствующий пункт меню в адаптере администратора) ~~

* ~~ Автоматические тесты на функциональность адаптера (например, unit

  тесты) ~~

** Что произошло в пунктах выше, которые теперь зачеркнуты? ** Что ж, документация уже была улучшена. Теперь вам нужно расширить вики или попросить меня использовать вопросы для расширения вики или README.md в отношении определенного контента.
Мне показалась довольно интересной штука с вкладками. Если вам понравится такая функция, просто дайте мне знать ...
Отсутствие автоматических тестов, касающихся функциональности контроллера, довольно неприятно, но теперь ясно, что основное внимание уделяется стабилизации, и написание хороших и полезных тестов для всего существующего кода будет стоить много времени (в отношении использования в отношении сложность и целевая группа этого программного проекта) и может закончиться дальнейшим рефакторингом. Так что это будет что-то в будущем, но уже не актуально для версии 1.0.0.

## Развитие и участие
Не стесняйтесь обращаться ко мне, если вы хотите участвовать в разработке или документации этого адаптера.

Полезные ссылки по подходу будут

* [шаблон адаптера TypeScript] (https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

  Я начал с и

* [руководство для разработчиков адаптеров] (https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

## Changelog

### 0.4.1
Bugfix release:
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated or not
  and therefore decide on how to handle write actions to the corresponding relay state._

### 0.4.0
Public release version:
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### 0.3.1
Functional and security update:
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### 0.2.0
Minor update:
* Update npm dependencies
* Group admin settings input fields in rows

### 0.1.1
Security update:
* Update vulnerable eslint-utils

### 0.1.0
Functional update and minor fixes:
* Fix object attributes regarding the cloud adapter
* Optimization for the cloud adapter
    * Pre-defined `smartName` attributes for active relays and temperature sensors
    * Recognize relays with 'light', 'licht' or 'leucht' in its name as `smartType` _LIGHT_ 

### 0.0.4
Security update:
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### 0.0.3
Bugfix release:
* Fix missing `value` states
* Reduce logging output

### 0.0.2
Bugfix release:
* Fix sys info state values

### 0.0.1
Initial release with following features:
* All information from `GetState.csv` as readonly states
* Writable states for all relays to toggle auto/manual
* Writable states for relays not configured for dosage control to toggle on/off

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

Copyright (c) 2020 Yannic Labonte <yannic.labonte@gmail.com>