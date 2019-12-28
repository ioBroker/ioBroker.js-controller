---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-моторы
hash: kp6leltbRQIjsPgMbOLtAqkQ38kWJ0diAbSaBIGbx/w=
---
![логотип](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![установлены](http://iobroker.live/badges/tesla-motors-installed.svg)
![Статус зависимости](https://img.shields.io/david/dbweb-ch/iobroker.tesla-motors.svg)
![Известные уязвимости](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors/badge.svg)
![Статус сборки](http://img.shields.io/travis/dbweb-ch/ioBroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
## Тесла мотор адаптер для ioBroker
Этот адаптер добавляет контроль над вашей машиной Tesla в ioBroker.

## Конфигурация
1. Создайте новый экземпляр адаптера, каждому автомобилю нужен свой экземпляр.
2. Выберите предпочитаемую частоту обновления (см. [Частота обновления] (# refreshRate))
2. Введите имя пользователя Tesla и пароль Tesla.
3. Нажмите «получить токен», чтобы запросить токен и токен обновления у Tesla.
4. Выберите свой автомобиль в раскрывающемся списке.

### <a name="refreshRate"></a> Частота обновления
Для экономии заряда аккумулятора автомобиль переходит в спящий режим через определенное время бездействия. <br /> Получить информацию из машины можно только тогда, когда машина не спит. <br /> Пользователи сообщили, что автомобиль может потреблять до 10 км Range в день, если он не переходит в состояние сна. <br /> Чтобы избежать этого, вы можете выбрать желаемую частоту обновления:

* **Выкл.** - Адаптер не разбудит автомобиль самостоятельно. Автомобиль просыпается только по запросу (если вы установили штат).

<br /> Если автомобиль проснулся сам по себе, адаптер запросит данные автомобиля один раз.

* **Умеренный** - Адаптер разбудит машину один раз в час, чтобы получить его состояние.
* **Агрессивный** - Адаптер будит автомобиль раз в минуту.
* **Умный** - Адаптер пытается быть умным. Будет наблюдать состояние сна автомобиля. Когда машина просыпается,

Предполагается, что кто-то скоро будет за рулем, и запрашивает состояние каждую минуту в течение 10 минут.
Если ничего не произошло (нет климата, нет вождения, нет зарядки), адаптер перестает запрашивать в течение 15 минут, чтобы позволить автомобилю заснуть. В любом случае, он разбудит машину и получит данные через 12 часов.

## Использование адаптера
Адаптер создает несколько состояний. Они сгруппированы по темам:

* **chargeState** - о зарядке, батарее и дальности.
* **ClimateState** - Температура и состояние окон.
* **driveState** - Положение и скорость
* **softwareUpdate** - Информация об ожидающих обновлениях программного обеспечения
* **автомобиль** - информация о вашем автомобиле

Существует специальная группа под названием **команда** где вы можете найти все команды для управления вашим автомобилем.
Некоторые из них работают в обоих направлениях, например, климатическое состояние изменится, когда автомобиль выключит климат. Вы можете увидеть это в столбце «Отправить / Получить».

Имя | Описание | **S** end / **R** ecieve -------------- | -------------- | -------------- ChargePort | Открыть / закрыть порт зарядки | SR UnlockChargePort | Разблокирует порт зарядки | S Зарядка | Начать / остановить зарядку | СР Климат | Старт / Стоп Климат | SR RemoteStart | Активировать / Деактивировать удаленный запуск | SR SentryMode | Активировать / Деактивировать часовой режим | SR SetChargeLimit | Установить лимит заряда в% | SR SetTength | Установите целевую температуру. Не забудьте включить климат! | SR SpeedLimit | Активировать ограничение скорости | SR SpeedLimitValue | Значение ограничения скорости | SR StartSoftwareUpdate | Начать обновление программного обеспечения | SR SunRoofVent | Sun Roof Vent | SR ValetMode | Valet Mode | СР ВалетПин | Valet Pin | SR ожидания | Если автомобиль находится в режиме ожидания (установите, чтобы он просыпался вручную) | SR дверной замок | Замки / Открывает дверь | SR фонари | Вспышка света | S honkHorn | Хонк рог | S openFrunk | Открытый Фрунк (Нет получения) | S openTrunk | Открытый багажник (нет получения) | S seat_heater_left | Подогрев сидений Левый уровень (0-3) | SR seat_heater_rear_center | Обогрев заднего сиденья (0-3) | SR seat_heater_rear_left | Обогрев заднего левого сиденья (0-3) | SR seat_heater_rear_right | Обогрев заднего правого сиденья (0-3) | SR seat_heater_right | Подогрев сидений Правый уровень (0-3) | СР рулевого колеса Обогрев рулевого колеса | SR windowVent | Окно Vent | SR

## Безопасность и усиление полномочия
В API Tesla используется подход безопасности на основе токенов. <br /> Срок действия токена истекает (в настоящее время через 45 дней), но система может получить новый токен с помощью токена обновления. <br /> Ваши учетные данные не должны храниться для работы адаптера, но если у вас возникают проблемы с обновлением токена, это может сделать его более стабильным, так как адаптер может получить новый токен в любое время. <br /><aside class="warning"> Предупреждение: <br /> С вашими учетными данными Tesla вы можете управлять автомобилем, включая открытые окна и даже ездить. Сохраняйте свои учетные данные! <br /> Чтобы отклонить все токены, измените пароль своей учетной записи Tesla! </aside>

## Участники
* dbweb-ch
* Apollon77

## Changelog
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

Copyright (c) 2019 Dominic Blattmann <nick@dbweb.ch>

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