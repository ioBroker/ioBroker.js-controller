---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecovacs-deebot/README.md
title: Ecovacs Deebot адаптер для ioBroker
hash: fGU3XZWbDJ3WUMjci6Cz3amIKEhpbk5T9s+kF6SQOnE=
---
![логотип](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![Трэвис-CI](https://travis-ci.org/mrbungle64/ioBroker.ecovacs-deebot.svg?branch=master)

# Ecovacs Deebot адаптер для ioBroker
Этот адаптер использует библиотеку [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Модели
Пока что работают только устройства, взаимодействующие с протоколом **XMPP**

Вы можете проверить это с помощью значения состояния `info.communicationProtocol` после успешного установления соединения (значения: `XMPP`, `MQTT`).

### Работает правильно
Основные команды, такие как `clean` (`auto`), `charge`, `stop`, а также `battery`, `charge`, `clean` и § Для этого требуется статус §SSSSS_7§§, который отдельно здесь не указан.

| модель | пауза | пятно | spotArea | customArea * | край | playSound |
|------ |------ |------ |------ |------ |------ |------ |
| Deebot Ozmo 930 | х | | х | х | | х |
| Deebot Slim 2 | | х | | | х | |

*) вкл. номер `cleanings`

### Должно сработать
* Deebot N79T
* Deebot 601
* Deebot Ozmo 610

#### Эти модели вряд ли будут работать
* Deebot 900
* Deebot Ozmo 900
* Deebot Ozmo 950

## Контроль
### Кнопки
| имя | описание |
| --- | --- |
| заряд | вернуться на зарядную станцию |
| чистый | начать автоматическую очистку |
| край | начать очистку кромок |
| playSound | играть звук для поиска бота |
| пятно | начать уборку пятна |
| остановить | остановить процесс очистки |
| пауза | приостановить процесс очистки |
| spotArea `0`-`9` | до 9 кнопок * для областей, определенных в приложении Ecovacs |

*) См. Конфигурация адаптера

### Очистка зоны / зоны
#### SpotArea
* разделенный запятыми список чисел, начинающийся с `0` (например,` 1,3`) для очищаемых областей.
* кнопки для «0» - «9» точечных областей (см. «Конфигурация адаптера»)

#### CustomArea
* разделенный запятыми список точно из 4 значений позиции для `x1, y1, x2, y2` (например,` -3975.000000,2280.000000, -1930.000000,4575.000000`)
    * позиция `0,000000,0,000000,0,000000,0,000000` позиция зарядной станции

#### Уровень воды
* Контроль и отображение уровня воды («низкий», «средний», «высокий» и «максимальный»)

## Расходуемые
| имя | описание |
| --- | --- |
| фильтр | Срок службы фильтра |
| main_brush | Основной срок службы щетки |
| side_brush | Срок службы боковой щетки |

## Информация
| имя | описание |
| --- | --- |
| аккумулятор | аккумулятор |
| шаргестатус | состояние во время зарядки |
| Cleanstatus | состояние во время уборки |
| коммуникационный протокол | XMPP или MQTT |
| deviceClass | Deebot устройство класса |
| имя_устройства | Имя устройства, определенное в приложении Ecovacs |
| deviceStatus | состояние устройства |
| ошибка | Текущее сообщение об ошибке |

## Конфигурация адаптера
| имя | описание |
| --- | --- |
| Email | Адрес электронной почты, используемый для вашей учетной записи Ecovacs |
| Пароль | Passsword используется для вашей учетной записи Ecovacs |
| Код страны (континент) | Выбор предварительно определенных кодов стран (включая континент) |
| Номер устройства | Выбор текущего экземпляра, если вы используете несколько устройств |
| Количество спотовых площадок | Количество спортивных площадок, определенных в приложении Ecovacs (по умолчанию `0`) |

*) Серверы Ecovacs очень часто выдают странную ошибку, поэтому мы хотим повторить попытку автоматически.

## Спасибо и кредиты
* @joostth ([sucks.js] (https://github.com/joostth/sucks.js))
* @wpietri ([отстой] (https://github.com/wpietri/sucks))
* @ bmartin5692 ([отстой] (https://github.com/bmartin5692/sucks), [bumber] (https://github.com/bmartin5692/bumper))
* @Ligio ([ozmo] (https://github.com/Ligio/ozmo))

## Changelog

### 0.3.4
* (mrbungle64) Feature Release
   * Implemented handling water level
   * Preparing for latest repo

### 0.3.3
* (mrbungle64) Feature release
   * Implemented lifespan values of components
   
### 0.3.2
* (mrbungle64) Feature release
   * Implemented spotArea buttons
   
### 0.3.1
* (mrbungle64) Feature release (alpha)
   * Implemented spotArea command
   * Implemented customArea command
   * Implemented playSound command
   
### 0.3.0
* (mrbungle64) alpha release

### 0.2.0
* (mrbungle64) Pre-release (alpha)

### 0.1.0
* (mrbungle64) Initial release (pre-alpha)

### 0.0.1
* (mrbungle64) Initial development release

## License
MIT License

Copyright (c) 2020 Sascha Hölzel <mrb1232@posteo.de>

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