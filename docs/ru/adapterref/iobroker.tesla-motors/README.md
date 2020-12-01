---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: exSkZOo4rWuvSAZ3ldy3L4RuQ0nnHcTQRqgG2X6mVj8=
---
![Логотип](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![установлен](http://iobroker.live/badges/tesla-motors-installed.svg)
![Статус зависимости](https://img.shields.io/david/dbweb-ch/iobroker.tesla-motors.svg)
![Известные уязвимости](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors/badge.svg)
![Статус сборки](http://img.shields.io/travis/dbweb-ch/ioBroker.tesla-motors.svg)
![НПМ](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
## Адаптер tesla motors для ioBroker
Этот адаптер добавляет ioBroker контроль над вашим автомобилем Tesla.

## Конфигурация
1. Создайте новый экземпляр адаптера, для каждой машины нужен свой экземпляр.
2. Выберите желаемую частоту обновления (см. [Частота обновления] (# refreshRate)).
2. Введите свое имя пользователя Tesla и пароль Tesla.
3. Нажмите «получить токен», чтобы запросить токен и токен обновления у Tesla.
4. Выберите свой автомобиль в раскрывающемся списке.

###<a name="refreshRate"></a> Частота обновления
Чтобы сэкономить заряд батареи, автомобиль переходит в спящий режим после определенного времени бездействия.<br /> Получить информацию из машины можно только когда машина не спит.<br /> Пользователи сообщили, что автомобиль может потреблять до 10 км диапазона в день, если он не переходит в спящий режим.<br /> Чтобы этого не произошло, вы можете выбрать желаемую частоту обновления:

* **Выкл.** - Адаптер самостоятельно не будит машину. Он будит машину только по запросу (если вы установите состояние).

<br />Если автомобиль проснулся сам по себе, адаптер запросит данные об автомобиле один раз.

* **Умеренный** - Адаптер будит машину один раз в час, чтобы узнать его состояние.
* **Агрессивный** - Адаптер будит машину раз в минуту.
* **Умный** - Адаптер пытается быть умным. Он будет наблюдать за состоянием сна автомобиля. Когда машина просыпается,

он предполагает, что скоро кто-то будет за рулем, и запрашивает состояние каждую минуту в течение 10 минут.
Если ничего не случилось (нет климата, нет вождения, нет зарядки), адаптер перестает запрашивать 15 минут, чтобы автомобиль заснул. В любом случае он разбудит машину и получит данные через 12 часов.

## Использование адаптера
Адаптер создает несколько состояний. Они сгруппированы по темам:

* **chargeState** - о зарядке, аккумуляторе и запасе хода.
* **ClimateState** - температуры и состояния окон.
* **driveState** - положение и скорость
* **softwareUpdate** - информация об ожидающих обновлениях программного обеспечения.
* **vehicle** - информация о вашем автомобиле

Есть специальная группа под названием **команда** в которой вы можете найти все команды для управления автомобилем.
Некоторые из них работают в обоих направлениях, например, состояние климата изменится, когда климат выключен автомобилем. Вы можете увидеть это в столбце «Отправить / получить».

Имя | Описание | **S** end / **R** ecieve -------------- | -------------- | -------------- ChargePort | Открыть / закрыть порт зарядки | SR UnlockChargePort | Разблокирует порт зарядки | S Зарядка | Начать / остановить зарядку | SR Climate | Запуск / остановка климата | SR RemoteStart | Активировать / деактивировать удаленный запуск | SR SentryMode | Активировать / деактивировать сторожевой режим | SR SetChargeLimit | Установить лимит комиссии в% | SR SetTemperature | Установите целевую температуру. Не забудьте включить климат! | SR SpeedLimit | Активировать ограничение скорости | SR SpeedLimitValue | Значение ограничения скорости | SR StartSoftwareUpdate | Начать обновление программного обеспечения | SR SunRoofVent | Вентиляционное отверстие в крыше | SR ValetMode | Valet Mode | SR ValetPin | Булавка для камердинера | SR в режиме ожидания | Если автомобиль находится в режиме ожидания (установите это, чтобы просыпаться вручную) | Дверной замок SR | Замки / Открывает дверь | Фонари SR | Вспышка огнями | S honkHorn | Звуковой сигнал | S openFrunk | Открыть Frunk (без получения) | S openTrunk | Открытый багажник (без получения) | S seat_heater_left | Обогрев сиденья Левый уровень (0-3) | SR seat_heater_rear_center | Обогрев заднего центрального сиденья (0-3) | SR seat_heater_rear_left | Обогрев заднего левого сиденья (0-3) | SR seat_heater_rear_right | Обогрев заднего правого сиденья (0-3) | SR seat_heater_right | Обогрев сиденья Правый уровень (0-3) | SR cabin_wheel_heater | Обогрев рулевого колеса | SR windowVent | Оконное отверстие | SR

## Безопасность &amp; Полномочия
Tesla API использует подход безопасности на основе токенов.<br /> Срок действия токена истекает (в настоящее время через 45 дней), но система может получить новый токен с помощью токена обновления.<br /> Ваши учетные данные не должны храниться для работы адаптера, но если у вас возникают проблемы с обновлением токена, это может сделать его более стабильным, поскольку адаптер может получить полностью новый токен в любое время.<br /><aside class="warning"> Предупреждение:<br /> С вашими учетными данными Tesla вы можете управлять автомобилем, в том числе открывать Windows и даже ездить. Сохраните свои учетные данные!<br /> Чтобы отклонить все токены, измените пароль своей учетной записи Tesla!</aside>

## Авторы
* dbweb-ch
* Аполлон77
* Хомбах

## Changelog
### 0.3.0
* (Hombach) Removed tests for node 8; updated dependencies
### 0.2.3
* (dbweb-ch) Refresh info every 5 seconds when car is moving
### 0.2.2
* (dbweb-ch) Use decrypt from ioBrokerTools, fix issue with selecting car
### 0.2.1
* (dbweb-ch) Fix bug with odomoter, refactor object creation, fix issues with compact mode
### 0.2.0
* (dbweb-ch) Included testing
* (dbweb-ch) Encrypt passwords
### 0.1.2
* (dbweb-ch) Added Roles, refactor states. 
* Attention: "awake" replaced by "standby" and inverted!
* Attention: Door lock is inverted.
### 0.1.1
* (dbweb-ch) Fix for Wakeup plan "smart"
### 0.1.0
* (dbweb-ch) Small fixes for Beta-Version release
### 0.0.3
* (dbweb-ch) control all state, added wakeup strategy
### 0.0.2
* (dbweb-ch) added all states
### 0.0.1
* (dbweb-ch) initial release

## License
MIT License

Copyright (c) 2020 Dominic Blattmann <nick@dbweb.ch>

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